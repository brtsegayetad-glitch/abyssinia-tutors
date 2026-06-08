import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  where,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', errInfo);
  // We no longer throw to avoid crashing the app in async contexts
  return errInfo;
}

// Leads
export async function captureLead(leadData: any) {
  const path = 'leads';
  try {
    const currentUid = auth.currentUser?.uid;
    const docRef = await addDoc(collection(db, path), {
      ...leadData,
      parentId: currentUid || '',
      status: 'new',
      createdAt: serverTimestamp(),
    });

    const triggerSecondaryTasks = async () => {
      try {
        // 1. AI Assessment
        const aiResponse = await fetch('/api/assess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            childName: leadData.childName,
            childAge: leadData.childAge,
            goals: leadData.learningGoal
          })
        });
        
        const assessment = await aiResponse.json();
        
        // 2. WhatsApp Notification
        await fetch('/api/notify/whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: leadData.whatsapp,
            message: `Welcome ${leadData.parentName}! We received your request for ${leadData.childName}. ${assessment.heritageFact}`
          })
        });

        // 3. Professional Email to Parent
        await fetch('/api/notify/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: leadData.email || 'parent@example.com',
            role: 'parent',
            subject: 'Welcome to Heritage Language Academy!',
            body: `Dear ${leadData.parentName},\n\nThank you for booking a trial for ${leadData.childName}. We have received your request and our team is currently matching you with the best heritage tutor.\n\nSummary of Goals: ${leadData.learningGoal}\n\nWe will reach out shortly to confirm the schedule.`
          })
        });

        return assessment;
      } catch (err) {
        console.warn("Secondary tasks failed:", err);
        return null;
      }
    };

    // We return success once the database is updated.
    // Secondary tasks (assessment, notification) run in the background.
    triggerSecondaryTasks().then(assessment => {
      console.log("Secondary tasks completed:", assessment);
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("captureLead Error:", error);
    return { success: false };
  }
}

// Real-time Listeners
export function subscribeToLeads(callback: (leads: any[]) => void, onError?: () => void) {
  const q = query(collection(db, 'leads'));
  return onSnapshot(q, (snapshot) => {
    const leads = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a: any, b: any) => {
        const t1 = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
        const t2 = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
        return t2 - t1; // Descending
      });
    callback(leads);
  }, (error) => {
    console.error("Firestore error in subscribeToLeads:", error);
    onError?.();
  });
}

const processedReminders = new Set<string>();

async function triggerClientSideReminders(sessions: any[]) {
  const now = new Date();
  for (const session of sessions) {
    if (session.status !== 'scheduled' || session.reminderSent === true) {
      continue;
    }
    if (processedReminders.has(session.id)) {
      continue;
    }

    let startDate: Date;
    if (session.startTime && typeof session.startTime.toDate === 'function') {
      startDate = session.startTime.toDate();
    } else if (session.startTime && (session.startTime.seconds || session.startTime._seconds)) {
      const seconds = session.startTime.seconds || session.startTime._seconds;
      const nanoseconds = session.startTime.nanoseconds || session.startTime._nanoseconds || 0;
      startDate = new Date(seconds * 1000 + nanoseconds / 1000000);
    } else if (session.startTime) {
      startDate = new Date(session.startTime);
    } else {
      continue;
    }

    const diffMs = startDate.getTime() - now.getTime();
    if (diffMs > 0 && diffMs <= 24 * 60 * 60 * 1000) {
      processedReminders.add(session.id);
      
      const formattedTime = startDate.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });

      const tutorName = session.tutorName || "Heritage Tutor";
      const studentName = session.studentName || "your child";
      const parentName = session.parentName || "Parent";

      // 1. Dispatch to Tutor (if tutorEmail exists)
      if (session.tutorEmail) {
        try {
          await fetch('/api/notify/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: session.tutorEmail,
              role: 'tutor',
              subject: `Session Reminder: ${studentName}`,
              body: `Dear ${tutorName},\n\nThis is a friendly reminder that you have an upcoming Heritage Session scheduled.\n\nStudent: ${studentName}\nType: ${session.type || 'regular'} session\nScheduled Time: ${formattedTime}\n\nPlease join the meeting via your Tutor Dashboard 5 minutes before your class.`
            })
          });
        } catch (err) {
          console.error("Client failed sending email reminder to tutor:", err);
        }
      }

      // 2. Dispatch to Parent (if parentEmail exists)
      if (session.parentEmail) {
        try {
          await fetch('/api/notify/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: session.parentEmail,
              role: 'parent',
              subject: `Heritage Session Reminder: ${studentName}`,
              body: `Dear ${parentName},\n\nThis is a friendly reminder that ${studentName} has an upcoming Heritage Session scheduled.\n\nAssigned Tutor: ${tutorName}\nType: ${session.type || 'regular'} session\nScheduled Time: ${formattedTime}\n\nYou can access your classroom meeting link via your Parent Dashboard 5 minutes before the class starts.`
            })
          });
        } catch (err) {
          console.error("Client failed sending email reminder to parent:", err);
        }
      }

      // 3. Mark in DB as reminderSent: true
      try {
        await updateDoc(doc(db, 'sessions', session.id), {
          reminderSent: true,
          updatedAt: serverTimestamp()
        });
        console.log(`[CLIENT-REMINDER] Marked session ${session.id} as reminderSent: true`);
      } catch (err) {
        console.error("Failed to mark session as reminderSent on client:", err);
        processedReminders.delete(session.id);
      }
    }
  }
}

export function subscribeToSessions(
  role: 'tutor' | 'parent', 
  uid: string, 
  callback: (sessions: any[]) => void, 
  onError?: () => void,
  email?: string
) {
  if (role === 'tutor') {
    const q = query(collection(db, 'sessions'), where('tutorId', '==', uid));
    return onSnapshot(q, (snapshot) => {
      const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(sessions);
    }, (error) => {
      console.error("Firestore error in subscribeToSessions:", error);
      onError?.();
    });
  }

  // If role is parent, listen on parentId == uid OR parentEmail == email
  const parentIdCheck = uid;
  const parentEmailCheck = (email || '').trim().toLowerCase();

  const qById = query(collection(db, 'sessions'), where('parentId', '==', parentIdCheck));
  let qByEmail: any = null;
  if (parentEmailCheck) {
    qByEmail = query(collection(db, 'sessions'), where('parentEmail', '==', parentEmailCheck));
  }

  let sessionsById: any[] = [];
  let sessionsByEmail: any[] = [];

  const handleMerge = () => {
    const allSessionsMap = new Map();
    sessionsById.forEach(s => allSessionsMap.set(s.id, s));
    sessionsByEmail.forEach(s => allSessionsMap.set(s.id, s));
    const merged = Array.from(allSessionsMap.values())
      .sort((a: any, b: any) => {
        const t1 = a.startTime?.toDate ? a.startTime.toDate().getTime() : 0;
        const t2 = b.startTime?.toDate ? b.startTime.toDate().getTime() : 0;
        return t1 - t2;
      });
    triggerClientSideReminders(merged);
    callback(merged);
  };

  const unsubById = onSnapshot(qById, (snapshot) => {
    sessionsById = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    handleMerge();
  }, (error) => {
    console.warn("error in subscribeToSessions parentId listener:", error);
    handleMerge();
  });

  let unsubByEmail = () => {};
  if (qByEmail) {
    unsubByEmail = onSnapshot(qByEmail, (snapshot) => {
      sessionsByEmail = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      handleMerge();
    }, (error) => {
      console.warn("error in subscribeToSessions parentEmail listener:", error);
      handleMerge();
    });
  }

  return () => {
    unsubById();
    unsubByEmail();
  };
}

export function subscribeToStudentProgress(tutorId: string, callback: (students: any[]) => void, onError?: () => void) {
  const q = query(collection(db, 'students'), where('tutorId', '==', tutorId));
  return onSnapshot(q, (snapshot) => {
    const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(students);
  }, (error) => {
    console.error("Firestore error in subscribeToStudentProgress:", error);
    onError?.();
  });
}

export function subscribeToParentData(parentId: string, callback: (data: any) => void, onError?: () => void, email?: string) {
  const parentEmailCheck = (email || '').trim().toLowerCase();
  
  const qById = query(collection(db, 'students'), where('parentId', '==', parentId));
  
  let unsubById = () => {};
  let unsubByEmail = () => {};
  
  let studentsById: any[] = [];
  let studentsByEmail: any[] = [];
  
  const handleMerge = async () => {
    const studentMap = new Map();
    studentsById.forEach(s => studentMap.set(s.id, s));
    studentsByEmail.forEach(s => studentMap.set(s.id, s));
    let students = Array.from(studentMap.values());
    
    try {
      // Look up all subscriptions for this parent to run the automated lifecycle checker
      let subs: any[] = [];
      const subsSnapById = await getDocs(query(collection(db, 'subscriptions'), where('parentId', '==', parentId)));
      subs = subsSnapById.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

      if (parentEmailCheck) {
        const subsSnapByEmail = await getDocs(query(collection(db, 'subscriptions'), where('parentEmail', '==', parentEmailCheck)));
        const subsByEmail = subsSnapByEmail.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        // Merge without duplicates
        const subMap = new Map();
        subs.forEach(s => subMap.set(s.id, s));
        subsByEmail.forEach(s => subMap.set(s.id, s));
        subs = Array.from(subMap.values());
      }

      // Ensure any student matching the subscription studentId is also fetched in case of parentId transitions
      const studentIds = new Set(students.map(s => s.id));
      for (const sub of subs) {
        if (sub.studentId && !studentIds.has(sub.studentId)) {
          const studentDoc = await getDoc(doc(db, 'students', sub.studentId));
          if (studentDoc.exists()) {
            students.push({ id: studentDoc.id, ...studentDoc.data() as any });
            studentIds.add(studentDoc.id);
          }
        }
      }

      const now = new Date();
      for (const student of students) {
        // Find latest subscription for this student
        const studentSub = subs.find(s => s.studentId === student.id);
        
        let shouldExpire = false;
        let expireReason = '';

        if (studentSub) {
          const endDate = studentSub.billingCycleEnd?.toDate ? studentSub.billingCycleEnd.toDate() : new Date(studentSub.billingCycleEnd);
          if (endDate < now) {
            shouldExpire = true;
            expireReason = 'calendar_expired';
          }
        }

        const remainingCredits = student.remainingClassCredits;
        if (remainingCredits !== undefined && remainingCredits <= 0) {
          shouldExpire = true;
          expireReason = 'credits_exhausted';
        }

        if (shouldExpire && student.status !== 'expired') {
          console.log(`Auto-expiring student ${student.id} subscription. Reason: ${expireReason}`);
          
          // 1. Flip student state to 'expired'
          const studentRef = doc(db, 'students', student.id);
          await updateDoc(studentRef, { 
            status: 'expired',
            expireReason: expireReason
          });
          student.status = 'expired';
          student.expireReason = expireReason;
          
          // 2. Flip subscription ledger record to 'expired'
          if (studentSub) {
            const subRef = doc(db, 'subscriptions', studentSub.id);
            await updateDoc(subRef, { status: 'expired' });
            studentSub.status = 'expired';
          }
        } else if (student.status === 'expired') {
          // Ensure they carry someexpireReason to aid UI warnings
          const rCredits = student.remainingClassCredits;
          student.expireReason = student.expireReason || (rCredits !== undefined && rCredits <= 0 ? 'credits_exhausted' : 'calendar_expired');
        }
      }
      callback({ students, subscriptions: subs });
    } catch (err) {
      console.error("Lifecycle checker error:", err);
      callback({ students, subscriptions: [] });
    }
  };

  unsubById = onSnapshot(qById, (snapshot) => {
    studentsById = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    handleMerge();
  }, (error) => {
    console.error("error in subscribeToParentData parentId listener:", error);
    handleMerge();
  });

  if (parentEmailCheck) {
    const qByEmail = query(collection(db, 'students'), where('parentEmail', '==', parentEmailCheck));
    unsubByEmail = onSnapshot(qByEmail, (snapshot) => {
      studentsByEmail = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      handleMerge();
    }, (error) => {
      console.error("error in subscribeToParentData email listener:", error);
      handleMerge();
    });
  }

  return () => {
    unsubById();
    unsubByEmail();
  };
}

export async function updateStudentSchedule(studentId: string, recurringTimes: string[], schedulePattern: string[]) {
  try {
    const studentRef = doc(db, 'students', studentId);
    await updateDoc(studentRef, {
      recurringTimes,
      schedulePattern,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("updateStudentSchedule Error:", error);
    return { success: false };
  }
}

export async function completeTrialSession(sessionId: string, leadId: string, evaluation: any, parentData: { email: string, name: string }) {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      ...evaluation,
      status: 'completed',
      updatedAt: serverTimestamp()
    });

    const sessionSnap = await getDoc(sessionRef);
    let sData: any = {};
    if (sessionSnap.exists()) {
      sData = sessionSnap.data();
    }

    if (leadId) {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        status: 'trial_completed',
        evaluation: evaluation.evaluation,
        recommendedLevel: evaluation.recommendedLevel,
        updatedAt: serverTimestamp()
      });

      // Send professional email after trial
      await fetch('/api/notify/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: parentData.email,
          role: 'parent',
          subject: 'Trial Session Completed!',
          body: `Dear ${parentData.name},\n\nYour child has completed the trial session! Our tutor has provided an evaluation of their current level and goals.\n\nYou can now log in to your dashboard to view the evaluation and choose a subscription plan to continue the learning journey.\n\nThank you for choosing Heritage Academy!`
        })
      });

      // Use request requirement: make subscription active immediately upon completing trial
      const parentEmailVal = parentData.email || sData.parentEmail || '';
      const studentNameVal = sData.studentName || 'Student';
      const tutorIdVal = sData.tutorId || '';

      let finalParentId = sData.parentId || 'guest';
      if (parentEmailVal) {
        const usersQ = query(collection(db, 'users'), where('email', '==', parentEmailVal.trim().toLowerCase()));
        const usersSnap = await getDocs(usersQ);
        if (!usersSnap.empty) {
          finalParentId = usersSnap.docs[0].id;
        }
      }

      // Check if student with this name and parentId already exists
      let existingDocId = '';
      if (finalParentId && finalParentId !== 'guest') {
        const studentQ = query(
          collection(db, 'students'), 
          where('parentId', '==', finalParentId),
          where('name', '==', studentNameVal)
        );
        const studentSnap = await getDocs(studentQ);
        if (!studentSnap.empty) {
          existingDocId = studentSnap.docs[0].id;
        }
      }

      if (!existingDocId) {
        console.log(`[Automated Activation] Creating active subscription for parent ${finalParentId} and student ${studentNameVal}`);
        await createSubscription(
          finalParentId,
          'pro',
          studentNameVal,
          tutorIdVal,
          [],
          'Heritage Scheduled Weekly Classes',
          parentEmailVal
        );
      } else {
        console.log(`[Automated Activation] Activating existing student ${existingDocId}`);
        const studentRef = doc(db, 'students', existingDocId);
        await updateDoc(studentRef, {
          status: 'active',
          updatedAt: serverTimestamp()
        });
        
        const subsQ = query(collection(db, 'subscriptions'), where('studentId', '==', existingDocId));
        const subsSnap = await getDocs(subsQ);
        for (const subDoc of subsSnap.docs) {
          await updateDoc(doc(db, 'subscriptions', subDoc.id), {
            status: 'active',
            updatedAt: serverTimestamp()
          });
        }
      }
    } else {
      // Regular scheduled tutoring class consumption logic: subtract 1 credit
      if (sData.studentId) {
        const studentRef = doc(db, 'students', sData.studentId);
        const studentSnap = await getDoc(studentRef);
        if (studentSnap.exists()) {
          const currentCredits = studentSnap.data().remainingClassCredits !== undefined 
            ? studentSnap.data().remainingClassCredits 
            : 4;
          const newCredits = Math.max(0, currentCredits - 1);
          await updateDoc(studentRef, {
            remainingClassCredits: newCredits,
            updatedAt: serverTimestamp()
          });
          console.log(`Deducted 1 credit for student ${sData.studentId}: ${currentCredits} -> ${newCredits}`);
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error("completeTrialSession Error:", error);
    return { success: false };
  }
}

export async function updateSessionEvaluation(sessionId: string, evaluation: any) {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      ...evaluation,
      status: 'completed',
      updatedAt: serverTimestamp()
    });

    const sessionSnap = await getDoc(sessionRef);
    if (sessionSnap.exists()) {
      const sData = sessionSnap.data();
      if (sData.studentId) {
        const studentRef = doc(db, 'students', sData.studentId);
        const studentSnap = await getDoc(studentRef);
        if (studentSnap.exists()) {
          const currentCredits = studentSnap.data().remainingClassCredits !== undefined 
            ? studentSnap.data().remainingClassCredits 
            : 4;
          const newCredits = Math.max(0, currentCredits - 1);
          await updateDoc(studentRef, {
            remainingClassCredits: newCredits,
            updatedAt: serverTimestamp()
          });
          console.log(`Deducted 1 credit (eval) for student ${sData.studentId}: ${currentCredits} -> ${newCredits}`);
        }
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `sessions/${sessionId}`);
  }
}

export async function updateLeadStatus(leadId: string, status: string) {
  try {
    const leadRef = doc(db, 'leads', leadId);
    await updateDoc(leadRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("updateLeadStatus Error:", error);
    return { success: false };
  }
}

export async function createSubscription(
  parentId: string, 
  plan: string, 
  studentName: string, 
  tutorId: string, 
  schedule?: string[], 
  schedulePatternInput?: string[] | string,
  parentEmail?: string,
  rate?: number,
  remainingClassCredits?: number
) {
  try {
    let schedulePattern = '';
    
    if (typeof schedulePatternInput === 'string') {
      schedulePattern = schedulePatternInput;
    } else if (Array.isArray(schedulePatternInput) && schedulePatternInput.length > 0) {
      schedulePattern = schedulePatternInput.join(', ');
    } else if (schedule && schedule.length > 0) {
      // compile short pattern from ISO schedule times
      schedulePattern = schedule.map(timeStr => {
        try {
          const d = new Date(timeStr);
          if (!isNaN(d.getTime())) {
            const day = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
            const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            return `${day} @ ${time}`;
          }
        } catch (e) {
          console.error(e);
        }
        return timeStr;
      }).join(', ');
    } else {
      schedulePattern = 'Not Set';
    }

    const initialCredits = remainingClassCredits !== undefined ? remainingClassCredits : (plan === 'mastery' ? 12 : plan === 'pro' ? 8 : 4);

    // 1. Create student record (converting lead to student)
    const studentRef = await addDoc(collection(db, 'students'), {
      parentId,
      tutorId,
      name: studentName,
      status: 'active',
      plan: plan,
      progress: 0,
      schedule: schedule || [],
      schedulePattern: schedulePattern,
      remainingClassCredits: initialCredits,
      createdAt: serverTimestamp()
    });

    // 2. Create the explicit 'subscriptions' Firestore ledger record
    const now = new Date();
    const billingCycleStart = now;
    const billingCycleEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from start

    await addDoc(collection(db, 'subscriptions'), {
      studentId: studentRef.id,
      parentId,
      parentEmail: parentEmail || '',
      planType: plan,
      rate: rate || (plan === 'mastery' ? 320 : plan === 'pro' ? 240 : 160),
      billingCycleStart,
      billingCycleEnd,
      status: 'active',
      remainingClassCredits: initialCredits,
      createdAt: serverTimestamp()
    });

    return { success: true, studentId: studentRef.id };
  } catch (error) {
    console.error("createSubscription Error:", error);
    return { success: false };
  }
}

export async function renewSubscription(
  studentId: string,
  parentId: string,
  parentEmail: string,
  planType: string,
  rate: number,
  tutorId: string,
  schedulePatternInput?: string[] | string,
  purchasedCredits?: number
) {
  try {
    let schedulePattern = '';
    if (typeof schedulePatternInput === 'string') {
      schedulePattern = schedulePatternInput;
    } else if (Array.isArray(schedulePatternInput)) {
      schedulePattern = schedulePatternInput.join(', ');
    } else {
      schedulePattern = 'Heritage Class Schedule';
    }

    const creditsToAdd = purchasedCredits !== undefined ? purchasedCredits : (planType === 'mastery' ? 12 : planType === 'pro' ? 8 : 4);

    // Fetch existing credits of student, and add the credits newly purchased!
    const studentRef = doc(db, 'students', studentId);
    const studentSnap = await getDoc(studentRef);
    let currentCredits = 0;
    if (studentSnap.exists()) {
      currentCredits = studentSnap.data().remainingClassCredits || 0;
    }
    const newCreditsTotal = currentCredits + creditsToAdd;

    // 1. Reset student status to active
    await updateDoc(studentRef, {
      status: 'active',
      plan: planType,
      schedulePattern,
      remainingClassCredits: newCreditsTotal,
      expireReason: null, // Clear expiration reason
      updatedAt: serverTimestamp()
    });

    // 2. Create subscription ledger record
    const now = new Date();
    const billingCycleStart = now;
    const billingCycleEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await addDoc(collection(db, 'subscriptions'), {
      studentId,
      parentId,
      parentEmail,
      planType,
      rate,
      billingCycleStart,
      billingCycleEnd,
      status: 'active',
      remainingClassCredits: creditsToAdd,
      createdAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error("renewSubscription Error:", error);
    return { success: false };
  }
}

export async function updateTutorProfile(uid: string, profileData: any, tutorId?: string) {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    });

    let targetTutorId = tutorId;
    if (!targetTutorId) {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        targetTutorId = userSnap.data().tutorId;
      }
    }

    if (targetTutorId) {
      const tutorRef = doc(db, 'tutors', targetTutorId);
      await updateDoc(tutorRef, {
        name: profileData.displayName || profileData.fullName || '',
        'specialized syllabus': profileData.expertise || '',
        specializedSyllabus: profileData.expertise || '',
        classroomLink: profileData.classroomLink || '',
        updatedAt: serverTimestamp()
      });
    } else {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().email) {
        const q = query(collection(db, 'tutors'), where('email', '==', userSnap.data().email.trim().toLowerCase()));
        const qSnap = await getDocs(q);
        if (!qSnap.empty) {
          const tutorRef = doc(db, 'tutors', qSnap.docs[0].id);
          await updateDoc(tutorRef, {
            name: profileData.displayName || profileData.fullName || '',
            'specialized syllabus': profileData.expertise || '',
            specializedSyllabus: profileData.expertise || '',
            classroomLink: profileData.classroomLink || '',
            updatedAt: serverTimestamp()
          });
        }
      }
    }
    return { success: true };
  } catch (error) {
    console.error("updateTutorProfile Error:", error);
    return { success: false };
  }
}

export async function scheduleRecurringSessions(studentData: { id: string, name: string }, tutorData: { id: string, name: string }, startTime: Date, parentId: string) {
  try {
    const sessions = [];
    // Creating 4 sessions (weekly)
    for (let i = 0; i < 4; i++) {
      const sessionDate = new Date(startTime);
      sessionDate.setDate(sessionDate.getDate() + (i * 7));
      
      const sessionPromise = addDoc(collection(db, 'sessions'), {
        studentId: studentData.id,
        studentName: studentData.name,
        tutorId: tutorData.id,
        tutorName: tutorData.name,
        parentId,
        startTime: sessionDate,
        status: 'scheduled',
        type: 'regular',
        createdAt: serverTimestamp()
      });
      sessions.push(sessionPromise);
    }

    await Promise.all(sessions);
    return { success: true };
  } catch (error) {
    console.error("scheduleRecurringSessions Error:", error);
    return { success: false };
  }
}

export function subscribeToMyLeads(email: string, callback: (leads: any[]) => void, onError?: () => void) {
  const q = query(collection(db, 'leads'), where('email', '==', email));
  return onSnapshot(q, (snapshot) => {
    const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(leads);
  }, (error) => {
    console.error("Firestore error in subscribeToMyLeads:", error);
    onError?.();
  });
}

export async function updateTutorAvailability(uid: string, availability: any, tutorId?: string) {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      availability,
      updatedAt: serverTimestamp()
    });

    let targetTutorId = tutorId;
    if (!targetTutorId) {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        targetTutorId = userSnap.data().tutorId;
      }
    }

    if (targetTutorId) {
      const tutorRef = doc(db, 'tutors', targetTutorId);
      await updateDoc(tutorRef, {
        availability,
        updatedAt: serverTimestamp()
      });
    } else {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().email) {
        const q = query(collection(db, 'tutors'), where('email', '==', userSnap.data().email.trim().toLowerCase()));
        const qSnap = await getDocs(q);
        if (!qSnap.empty) {
          const tutorRef = doc(db, 'tutors', qSnap.docs[0].id);
          await updateDoc(tutorRef, {
            availability,
            updatedAt: serverTimestamp()
          });
        }
      }
    }
    return { success: true };
  } catch (error) {
    console.error("updateTutorAvailability Error:", error);
    return { success: false };
  }
}

export async function getTutorsWithAvailability() {
  try {
    const q = query(collection(db, 'users'), where('role', '==', 'tutor'));
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((t: any) => t.availability);
  } catch (error) {
    console.error("getTutorsWithAvailability Error:", error);
    return [];
  }
}
export async function createTutor(tutorData: { 
  displayName: string; 
  email: string; 
  expertise: string; 
  bio?: string;
  languages_taught?: string[];
  years_of_experience?: number;
}) {
  const path = 'tutors';
  try {
    const cleanEmail = tutorData.email.trim().toLowerCase();
    const virtualUid = 'virtual_' + cleanEmail.replace(/[@.]/g, '_');

    // 1. Explicitly create in dedicated 'tutors' collection
    const tutorRef = await addDoc(collection(db, 'tutors'), {
      name: tutorData.displayName,
      email: cleanEmail,
      'specialized syllabus': tutorData.expertise,
      specializedSyllabus: tutorData.expertise,
      bio: tutorData.bio || '',
      languages_taught: tutorData.languages_taught || [],
      years_of_experience: Number(tutorData.years_of_experience) || 0,
      role: 'tutor',
      createdAt: serverTimestamp()
    });
    
    // 2. Mirror into users collection for authentication context using deterministic virtualUid
    await setDoc(doc(db, 'users', virtualUid), {
      displayName: tutorData.displayName,
      fullName: tutorData.displayName,
      email: cleanEmail,
      expertise: tutorData.expertise,
      bio: tutorData.bio || '',
      languages_taught: tutorData.languages_taught || [],
      years_of_experience: Number(tutorData.years_of_experience) || 0,
      role: 'tutor',
      tutorId: tutorRef.id, // Explicitly link the tutor auto ID!
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      uid: virtualUid
    }, { merge: true });

    console.log("Tutor created with ID inside tutors collection:", tutorRef.id);
    return { success: true, id: tutorRef.id };
  } catch (error: any) {
    console.error("createTutor Error:", error);
    handleFirestoreError(error, OperationType.CREATE, path);
    if (error.code === 'permission-denied') {
      return { success: false, error: 'Permission denied. Make sure you are an administrator.' };
    }
    return { success: false, error: error.message };
  }
}

export async function updateTutor(
  tutorId: string, 
  tutorData: { 
    displayName: string; 
    expertise: string; 
    email: string; 
    bio?: string;
    languages_taught?: string[];
    years_of_experience?: number;
  }
) {
  try {
    const tutorDocRef = doc(db, 'tutors', tutorId);
    await updateDoc(tutorDocRef, {
      name: tutorData.displayName,
      displayName: tutorData.displayName,
      specializedSyllabus: tutorData.expertise,
      'specialized syllabus': tutorData.expertise,
      expertise: tutorData.expertise,
      bio: tutorData.bio ?? '',
      languages_taught: tutorData.languages_taught ?? [],
      years_of_experience: Number(tutorData.years_of_experience) ?? 0
    });

    const q = query(collection(db, 'users'), where('email', '==', tutorData.email.toLowerCase()));
    const snapshot = await getDocs(q);
    for (const userDoc of snapshot.docs) {
      await updateDoc(doc(db, 'users', userDoc.id), {
        displayName: tutorData.displayName,
        expertise: tutorData.expertise,
        bio: tutorData.bio ?? '',
        languages_taught: tutorData.languages_taught ?? [],
        years_of_experience: Number(tutorData.years_of_experience) ?? 0
      });
    }
    return { success: true };
  } catch (error: any) {
    console.error("updateTutor Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTutor(tutorId: string, email: string) {
  try {
    const tutorDocRef = doc(db, 'tutors', tutorId);
    await deleteDoc(tutorDocRef);

    if (email) {
      const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase()));
      const snapshot = await getDocs(q);
      for (const userDoc of snapshot.docs) {
        await deleteDoc(doc(db, 'users', userDoc.id));
      }
    }
    return { success: true };
  } catch (error: any) {
    console.error("deleteTutor Error:", error);
    return { success: false, error: error.message };
  }
}

export function subscribeToAllSessions(callback: (sessions: any[]) => void, onError?: () => void) {
  const q = query(collection(db, 'sessions'));
  return onSnapshot(q, (snapshot) => {
    const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Check reminders asynchronously
    triggerClientSideReminders(sessions);
    
    callback(sessions);
  }, (error) => {
    console.error("Firestore error in subscribeToAllSessions:", error);
    onError?.();
  });
}

export function subscribeToTutors(callback: (tutors: any[]) => void, onError?: () => void) {
  const qTutors = query(collection(db, 'tutors'));
  let unsubscribeUsers: (() => void) | null = null;

  const unsubscribeTutors = onSnapshot(qTutors, (snapshot) => {
    if (!snapshot.empty) {
      if (unsubscribeUsers) {
        unsubscribeUsers();
        unsubscribeUsers = null;
      }
      const tutors = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          displayName: data.name || data.displayName || '',
          expertise: data.specializedSyllabus || data['specialized syllabus'] || data.expertise || 'General Instruction',
          role: data.role || 'tutor'
        };
      });
      callback(tutors);
    } else {
      // Graceful fallback to users collection for matching role: 'tutor'
      if (!unsubscribeUsers) {
        const qUsers = query(collection(db, 'users'), where('role', '==', 'tutor'));
        unsubscribeUsers = onSnapshot(qUsers, (usersSnap) => {
          const tutorsFromUsers = usersSnap.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              displayName: data.displayName || data.name || '',
              expertise: data.expertise || data.specializedSyllabus || data['specialized syllabus'] || 'General Instruction',
              role: data.role || 'tutor'
            };
          });
          callback(tutorsFromUsers);
        }, (err) => {
          console.error("Firestore fallback error in subscribeToTutors:", err);
          onError?.();
        });
      }
    }
  }, (error) => {
    console.error("Firestore error in subscribeToTutors:", error);
    onError?.();
  });

  return () => {
    unsubscribeTutors();
    if (unsubscribeUsers) {
      unsubscribeUsers();
    }
  };
}

// Manually Add Lead
export async function addManualLead(leadData: {
  studentName: string;
  parentName: string;
  parentEmail: string;
  phone: string;
  targetCourse: string;
}) {
  const path = 'leads';
  try {
    const docRef = await addDoc(collection(db, path), {
      childName: leadData.studentName,
      studentName: leadData.studentName,
      parentName: leadData.parentName,
      email: leadData.parentEmail,
      parentEmail: leadData.parentEmail,
      whatsapp: leadData.phone,
      phone: leadData.phone,
      learningGoal: leadData.targetCourse,
      targetCourse: leadData.targetCourse,
      status: 'trial_pending',
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return { success: false, error };
  }
}

// Global Settings Subscriptions & Writes
export function subscribeToSettings(callback: (settings: any) => void, onError?: () => void) {
  const path = 'settings';
  const q = doc(db, 'settings', 'global');
  return onSnapshot(q, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data() || {};
      const sanitized = { ...data };
      if (!sanitized.academyName || sanitized.academyName.includes('Selam')) {
        sanitized.academyName = "Abyssinia Tutors";
      }
      sanitized.facebookUrl = data.facebookUrl || 'https://www.facebook.com/abyssiniatutors';
      sanitized.youtubeUrl = data.youtubeUrl || 'https://www.youtube.com/@abyssiniatutors';
      sanitized.instagramUrl = data.instagramUrl || 'https://www.instagram.com/abyssiniatutors';
      sanitized.whatsappUrl = data.whatsappUrl || 'https://wa.me/15550192834';
      callback(sanitized);
    } else {
      // Return beautiful default configurations in fallback
      callback({
        standardPrice: 160,
        proPrice: 240,
        masteryPrice: 320,
        academyName: "Abyssinia Tutors",
        supportEmail: "info@abyssiniatutors.com",
        supportPhone: "+1 (555) 019-2834",
        welcomeMotto: "Expanding heritage language tutoring and curriculum worldwide",
        instagramUrl: "https://www.instagram.com/abyssiniatutors",
        whatsappUrl: "https://wa.me/15550192834",
        facebookUrl: "https://www.facebook.com/abyssiniatutors",
        youtubeUrl: "https://www.youtube.com/@abyssiniatutors"
      });
    }
  }, (error) => {
    console.error("Firestore error in subscribeToSettings:", error);
    onError?.();
  });
}

export async function saveSettings(settingsData: any) {
  const path = 'settings';
  try {
    const docRef = doc(db, 'settings', 'global');
    await setDoc(docRef, {
      ...settingsData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/global`);
    return { success: false, error };
  }
}

export function subscribeToAllStudents(callback: (students: any[]) => void, onError?: () => void) {
  const q = query(collection(db, 'students'));
  return onSnapshot(q, (snapshot) => {
    const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(students);
  }, (error) => {
    console.error("Firestore error in subscribeToAllStudents:", error);
    onError?.();
  });
}

export async function scheduleTrial(leadId: string, tutorData: { id: string, name: string, email: string }, sessionTime: Date, leadData: any) {
  try {
    // 1. Update lead status
    const leadRef = doc(db, 'leads', leadId);
    await updateDoc(leadRef, {
      status: 'scheduled',
      tutorId: tutorData.id,
      scheduledAt: sessionTime,
      updatedAt: serverTimestamp()
    });

    // 2. Create session entry
    const sessionRef = await addDoc(collection(db, 'sessions'), {
      leadId,
      tutorId: tutorData.id,
      tutorName: tutorData.name,
      tutorEmail: tutorData.email,
      parentId: leadData.parentId || 'guest',
      parentEmail: leadData.email,
      parentName: leadData.parentName,
      studentName: leadData.childName || 'Student',
      studentAge: leadData.childAge || 'N/A',
      learningGoal: leadData.learningGoal || 'No goals specified',
      startTime: sessionTime,
      status: 'scheduled',
      type: 'trial',
      createdAt: serverTimestamp()
    });

    // 3. Trigger Professional Emails
    const triggerEmails = async () => {
      // Email to Parent
      await fetch('/api/notify/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: leadData.email,
          role: 'parent',
          subject: 'Trial Session Scheduled!',
          body: `Dear ${leadData.parentName},\n\nWe have scheduled your trial session with ${tutorData.name}.\n\nTime: ${sessionTime.toLocaleString()}\n\nLink: Your dashboard will show the meeting link 5 minutes before the session starts.`
        })
      });

      // Email to Tutor
      await fetch('/api/notify/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: tutorData.email,
          role: 'tutor',
          subject: 'New Trial Session Assigned',
          body: `Dear ${tutorData.name},\n\nYou have been assigned a new trial session with ${leadData.parentName}.\n\nTime: ${sessionTime.toLocaleString()}\n\nPlease review the student's goals in your dashboard.`
        })
      });
    };

    triggerEmails().catch(e => console.error("Scheduling emails failed", e));

    return { success: true, sessionId: sessionRef.id };
  } catch (error) {
    console.error("scheduleTrial Error:", error);
    return { success: false };
  }
}

export function subscribeToMessages(callback: (messages: any[]) => void, onError?: () => void) {
  const path = 'messages';
  const q = query(collection(db, path), orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, path);
    onError?.();
  });
}

export async function sendMessage(messageData: {
  senderId: string;
  senderName: string;
  senderRole: string;
  recipientId: string;
  text: string;
}) {
  const path = 'messages';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...messageData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return { success: false };
  }
}

/**
 * Automates the synchronization of all tutors inside the 'tutors' collection
 * to the virtual 'users' collection to ensure they can log in seamlessly.
 */
export async function syncAllExistingTutorsToUsers(): Promise<{ success: boolean; count: number }> {
  try {
    const qTutors = query(collection(db, 'tutors'));
    const tutorSnap = await getDocs(qTutors);
    let count = 0;
    
    for (const docObj of tutorSnap.docs) {
      const tutor = docObj.data();
      if (!tutor.email) continue;
      
      const cleanEmail = tutor.email.trim().toLowerCase();
      const virtualUid = 'virtual_' + cleanEmail.replace(/[@.]/g, '_');
      const userRef = doc(db, 'users', virtualUid);
      const userSnap = await getDoc(userRef);
      
      // Always merge/update the document to ensure tutorId is linked properly for already signed in tutors
      await setDoc(userRef, {
        uid: virtualUid,
        email: cleanEmail,
        displayName: tutor.name || tutor.displayName || cleanEmail.split('@')[0],
        fullName: tutor.name || tutor.displayName || cleanEmail.split('@')[0],
        role: 'tutor',
        tutorId: docObj.id, // Always mapped to the Firestore tutors document auto ID
        expertise: tutor.specializedSyllabus || tutor['specialized syllabus'] || tutor.expertise || 'General Instruction',
        updatedAt: serverTimestamp()
      }, { merge: true });
      count++;
      console.log(`Synced tutor ${cleanEmail} (uid: ${virtualUid}) with tutorId: ${docObj.id}`);
    }
    return { success: true, count };
  } catch (e) {
    console.warn("Could not sync tutors to users database:", e);
    return { success: false, count: 0 };
  }
}

// Tutor Applications Submissions & Subscriptions
export async function submitTutorApplication(appData: { 
  fullName: string; 
  email: string; 
  whatsapp: string; 
  experience: string; 
  expertise: string; 
  timezone: string; 
}) {
  const path = 'tutor_applications';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...appData,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export function subscribeToTutorApplications(callback: (apps: any[]) => void, onError?: () => void) {
  const q = query(collection(db, 'tutor_applications'));
  return onSnapshot(q, (snapshot) => {
    const apps = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).sort((a: any, b: any) => {
      const t1 = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
      const t2 = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
      return t2 - t1;
    });
    callback(apps);
  }, (error) => {
    console.error("Firestore error in subscribeToTutorApplications:", error);
    onError?.();
  });
}

export async function updateTutorApplicationStatus(appId: string, status: string) {
  const path = `tutor_applications/${appId}`;
  try {
    const ref = doc(db, 'tutor_applications', appId);
    await updateDoc(ref, {
      status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
    return { success: false };
  }
}


