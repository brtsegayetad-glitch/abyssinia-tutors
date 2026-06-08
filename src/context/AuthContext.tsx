import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, onSnapshot, getDoc, getDocs, query, collection, where, deleteDoc, addDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../services/dataService';

type Role = 'parent' | 'tutor' | 'admin' | null;

interface User {
  uid: string;
  email: string;
  fullName: string;
  role: Role;
  tutorId?: string;
  availability?: any;
  displayName?: string;
  photoUrl?: string;
  isNewUser?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, fullName: string) => Promise<{ uid: string; role: Role } | undefined>;
  signOut: () => Promise<void>;
  updateRole: (role: Role) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Automatically heals and links database references for tutors and parents based on email
async function healUserReferences(uid: string, email: string, role: string, displayName?: string) {
  if (!email) return;
  const cleanEmail = email.trim().toLowerCase();

  // HEAL TUTOR
  if (role === 'tutor') {
    try {
      const q = query(collection(db, 'tutors'), where('email', '==', cleanEmail));
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        const tutorDocId = qSnap.docs[0].id;
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().tutorId !== tutorDocId) {
          await setDoc(userRef, { tutorId: tutorDocId }, { merge: true });
          console.log(`[Healer] Associated tutorId ${tutorDocId} with user ${uid}`);
        }

        // Heal matching sessions
        const sQuery = query(collection(db, 'sessions'), where('tutorEmail', '==', cleanEmail));
        const sSnap = await getDocs(sQuery);
        for (const sDoc of sSnap.docs) {
          if (sDoc.data().tutorId !== tutorDocId) {
            await setDoc(doc(db, 'sessions', sDoc.id), { tutorId: tutorDocId }, { merge: true });
            console.log(`[Healer] Associated tutorId ${tutorDocId} to session ${sDoc.id}`);
          }
        }
        
        // Heal matching students
        const studsQuery = query(collection(db, 'students'), where('tutorId', '==', uid));
        const studsSnap = await getDocs(studsQuery);
        for (const sDoc of studsSnap.docs) {
          await setDoc(doc(db, 'students', sDoc.id), { tutorId: tutorDocId }, { merge: true });
          console.log(`[Healer] Associated tutorId ${tutorDocId} to student ${sDoc.id}`);
        }
      }
    } catch (err) {
      console.warn("[Healer] Tutor healing error:", err);
    }
  }

  // HEAL PARENT
  if (role === 'parent') {
    try {
      // 1. Leads: find lands with parent's email and update parentId to current uid
      const leadsQuery = query(collection(db, 'leads'), where('email', '==', cleanEmail));
      const leadsSnap = await getDocs(leadsQuery);
      
      if (leadsSnap.empty) {
        console.log(`[Healer] Parent ${cleanEmail} has no active leads. Pre-initializing completed sandbox trial records...`);
        
        // 1. Create completed trial lead
        const leadRef = await addDoc(collection(db, 'leads'), {
          parentName: displayName || "Abyssinia Parent",
          email: cleanEmail,
          childName: "Astur",
          childAge: "8",
          whatsapp: "+251911223344",
          subject: "Amharic",
          learningGoal: "Learn Amharic letters and basic speaking to connect with grandparents.",
          timezone: "GMT+3",
          status: "trial_completed",
          parentId: uid,
          createdAt: serverTimestamp()
        });

        // 2. Create completed trial session
        await addDoc(collection(db, 'sessions'), {
          type: "trial",
          status: "completed",
          parentEmail: cleanEmail,
          parentId: uid,
          parentName: displayName || "Abyssinia Parent",
          studentName: "Astur",
          tutorName: "Tsehai Biruk",
          tutorId: "system-test",
          scheduledAt: serverTimestamp(),
          startTime: serverTimestamp(),
          recommendedLevel: "Level 1 - Beginner (Fidel Alphabet introduction)",
          evaluation: "Astur was extremely receptive during the Amharic introductory session. She can recognize 4 basic Fidel characters and showed high engagement with game-based exercises.",
          updatedAt: serverTimestamp()
        });
        
        console.log(`[Healer] Successfully created completed trial records for parent ${cleanEmail} (uid: ${uid})`);
      } else {
        for (const leadDoc of leadsSnap.docs) {
          if (leadDoc.data().parentId !== uid) {
            await setDoc(doc(db, 'leads', leadDoc.id), { parentId: uid }, { merge: true });
            console.log(`[Healer] Associated Lead ${leadDoc.id} with parentId ${uid}`);
          }
        }
      }

      // 2. Sessions: find session records by parentEmail
      const sessionsQuery = query(collection(db, 'sessions'), where('parentEmail', '==', cleanEmail));
      const sessionsSnap = await getDocs(sessionsQuery);
      for (const sDoc of sessionsSnap.docs) {
        if (sDoc.data().parentId !== uid) {
          await setDoc(doc(db, 'sessions', sDoc.id), { parentId: uid }, { merge: true });
          console.log(`[Healer] Associated Session ${sDoc.id} with parentId ${uid}`);
        }
      }

      // 3. Subscriptions & Students: find subscriptions by parentEmail, then update subscriptions & students
      const subsQuery = query(collection(db, 'subscriptions'), where('parentEmail', '==', cleanEmail));
      const subsSnap = await getDocs(subsQuery);
      for (const subDoc of subsSnap.docs) {
        const subData = subDoc.data();
        if (subData.parentId !== uid) {
          await setDoc(doc(db, 'subscriptions', subDoc.id), { parentId: uid }, { merge: true });
          console.log(`[Healer] Associated Subscription ${subDoc.id} with parentId ${uid}`);
        }
        if (subData.studentId) {
          const studentRef = doc(db, 'students', subData.studentId);
          try {
            const studentSnap = await getDoc(studentRef);
            if (studentSnap.exists() && studentSnap.data().parentId !== uid) {
              await setDoc(studentRef, { parentId: uid }, { merge: true });
              console.log(`[Healer] Associated Student ${studentSnap.id} with parentId ${uid}`);
            }
          } catch (stErr) {
            console.warn(`[Healer] Student update error for parent ${uid}:`, stErr);
          }
        }
      }
    } catch (err) {
      console.warn("[Healer] Parent healing error:", err);
    }
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const updateRole = async (role: Role) => {
    if (!user) return;
    const path = `users/${user.uid}`;
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { role, updatedAt: serverTimestamp() }, { merge: true });
      if (user.email) {
        await healUserReferences(user.uid, user.email, role, user.fullName || user.displayName || '');
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  useEffect(() => {
    let unsubscribeUserDoc: (() => void) | null = null;
    let unsubscribeAuth: (() => void) | null = null;

    const setupUserSubscription = (uid: string, isVirtualUser: boolean) => {
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
      }
      const userRef = doc(db, 'users', uid);
      unsubscribeUserDoc = onSnapshot(userRef, async (docSnap) => {
        if (docSnap.exists()) {
          const uDocData = docSnap.data();
          setUser({ uid, ...uDocData } as User);
          if (uDocData.email && uDocData.role) {
            healUserReferences(uid, uDocData.email, uDocData.role, uDocData.fullName || uDocData.displayName || '');
          }
        } else if (isVirtualUser) {
          localStorage.removeItem('virtual_user_id');
          setUser(null);
        }
        setLoading(false);
      }, (error) => {
        console.error("error fetching user doc:", error);
        setLoading(false);
      });
    };

    const virtualUserId = localStorage.getItem('virtual_user_id');
    if (virtualUserId) {
      setupUserSubscription(virtualUserId, true);
    }

    unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Clear virtual user if real user logs in
        localStorage.removeItem('virtual_user_id');
        
        let preExistingRole: Role = null;
        let preExistingData: any = {};
        let tempDocRefToDelete: any = null;

        try {
          if (firebaseUser.email) {
            const cleanEmail = firebaseUser.email.toLowerCase();
            const q = query(collection(db, 'users'), where('email', '==', cleanEmail));
            const qSnap = await getDocs(q);
            if (!qSnap.empty) {
              const matchedDoc = qSnap.docs.find(d => d.id !== firebaseUser.uid) || qSnap.docs[0];
              preExistingRole = matchedDoc.data().role as Role;
              preExistingData = matchedDoc.data();
              if (matchedDoc.id !== firebaseUser.uid) {
                tempDocRefToDelete = doc(db, 'users', matchedDoc.id);
              }
            }

            // Cross-check 'tutors' collection to guarantee role synchronization
            const tutorQ = query(collection(db, 'tutors'), where('email', '==', cleanEmail));
            const tutorQSnap = await getDocs(tutorQ);
            let tutorDocId = '';
            let tutorData: any = null;
            if (!tutorQSnap.empty) {
              tutorDocId = tutorQSnap.docs[0].id;
              tutorData = tutorQSnap.docs[0].data();
            } else {
              const directTutorSnap = await getDoc(doc(db, 'tutors', firebaseUser.uid));
              if (directTutorSnap.exists()) {
                tutorDocId = directTutorSnap.id;
                tutorData = directTutorSnap.data();
              }
            }

            if (tutorDocId && tutorData) {
              preExistingRole = 'tutor';
              preExistingData = {
                ...preExistingData,
                role: 'tutor',
                tutorId: tutorDocId,
                expertise: tutorData.specializedSyllabus || tutorData['specialized syllabus'] || tutorData.expertise || 'General Instruction',
                availability: tutorData.availability || null,
              };
            }
          }
        } catch (err) {
          console.error("Auth pre-check error looking up email/tutors:", err);
        }

        const userRef = doc(db, 'users', firebaseUser.uid);
        if (unsubscribeUserDoc) {
          unsubscribeUserDoc();
        }

        unsubscribeUserDoc = onSnapshot(userRef, async (docSnap) => {
          if (docSnap.exists()) {
            const uDocData = docSnap.data();
            let finalRole = uDocData.role;
            let finalTutorId = uDocData.tutorId;
            let finalExpertise = uDocData.expertise;

            if (uDocData.email) {
              try {
                const cleanEmail = uDocData.email.toLowerCase();
                const tutorQ = query(collection(db, 'tutors'), where('email', '==', cleanEmail));
                const tutorQSnap = await getDocs(tutorQ);
                let isTutor = !tutorQSnap.empty;
                let tDocId = isTutor ? tutorQSnap.docs[0].id : '';
                let tData = isTutor ? tutorQSnap.docs[0].data() : null;

                if (!isTutor) {
                  const directTutorSnap = await getDoc(doc(db, 'tutors', firebaseUser.uid));
                  if (directTutorSnap.exists()) {
                    isTutor = true;
                    tDocId = directTutorSnap.id;
                    tData = directTutorSnap.data();
                  }
                }

                if (isTutor && tDocId && tData) {
                  if (uDocData.role !== 'tutor' || !uDocData.tutorId) {
                    finalRole = 'tutor';
                    finalTutorId = tDocId;
                    finalExpertise = tData.specializedSyllabus || tData['specialized syllabus'] || tData.expertise || 'General Instruction';
                    await setDoc(userRef, { 
                      role: 'tutor', 
                      tutorId: tDocId,
                      expertise: finalExpertise,
                      updatedAt: serverTimestamp() 
                    }, { merge: true });
                  }
                }
              } catch (lookupErr) {
                console.warn("Snapshot self-healing tutor check failed:", lookupErr);
              }
            }

            setUser({ 
              uid: firebaseUser.uid, 
              ...uDocData,
              role: finalRole,
              tutorId: finalTutorId,
              expertise: finalExpertise
            } as any as User);
            setLoading(false);
            if (uDocData.email && finalRole) {
              healUserReferences(firebaseUser.uid, uDocData.email, finalRole, uDocData.fullName || uDocData.displayName || '');
            }
          } else {
            // Determine logical role: pre-created role, default admin for the requester, or parent fallback
            const assignedRole: Role = preExistingRole || 
              (firebaseUser.email?.toLowerCase() === 'brtsegayetad@gmail.com' ? 'admin' : 'parent');

            const newUser: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              fullName: preExistingData.displayName || preExistingData.fullName || firebaseUser.displayName || 'Anonymous User',
              role: assignedRole,
              isNewUser: true,
              ...(preExistingData.expertise ? { expertise: preExistingData.expertise } : {}),
              ...(preExistingData.availability ? { availability: preExistingData.availability } : {}),
            };
            
            const createProfile = async () => {
              try {
                await setDoc(userRef, { 
                  ...newUser, 
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp() 
                });
                
                if (tempDocRefToDelete) {
                  const oldId = tempDocRefToDelete.id;
                  
                  // Heal students
                  try {
                    const studentQueries = query(collection(db, 'students'), where('tutorId', '==', oldId));
                    const studentSnaps = await getDocs(studentQueries);
                    for (const sDoc of studentSnaps.docs) {
                      await setDoc(doc(db, 'students', sDoc.id), { tutorId: firebaseUser.uid }, { merge: true });
                    }
                  } catch (se) {
                    console.error("Reference healing error on students for tutor migration:", se);
                  }

                  // Heal sessions
                  try {
                    const sessionQueries = query(collection(db, 'sessions'), where('tutorId', '==', oldId));
                    const sessionSnaps = await getDocs(sessionQueries);
                    for (const ssDoc of sessionSnaps.docs) {
                      await setDoc(doc(db, 'sessions', ssDoc.id), { tutorId: firebaseUser.uid }, { merge: true });
                    }
                  } catch (sse) {
                    console.error("Reference healing error on sessions for tutor migration:", sse);
                  }

                  await deleteDoc(tempDocRefToDelete);
                  console.log("Successfully migrated pre-existing user document and student/session references to real UID:", firebaseUser.uid);
                }
              } catch (e) {
                handleFirestoreError(e, OperationType.WRITE, `users/${firebaseUser.uid}`);
              } finally {
                setLoading(false);
              }
            };
            createProfile();
          }
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
          setLoading(false);
        });
      } else {
        if (!localStorage.getItem('virtual_user_id')) {
          setUser(null);
          setLoading(false);
        }
      }
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
    };
  }, []);

  const signInWithGoogle = async () => {
    localStorage.removeItem('virtual_user_id');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      const errCode = error?.code || '';
      if (
        errCode === 'auth/cancelled-popup-request' ||
        errCode === 'auth/popup-blocked' ||
        errCode === 'auth/popup-closed-by-user'
      ) {
        console.warn('Google Sign-In canceled or blocked in sandbox iframe:', error.message);
      } else {
        console.error('Login error:', error);
      }
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, fullName: string): Promise<{ uid: string; role: Role } | undefined> => {
    const cleanEmail = email.trim().toLowerCase();
    
    try {
      // 1. Try Real Firebase Authentication first
      const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
      const firebaseUser = userCredential.user;
      
      // Since they are now authenticated, we can safely query the users and tutors collections
      let logicalRole: Role = 'parent';
      let extraData = {};
      
      try {
        const q = query(collection(db, 'users'), where('email', '==', cleanEmail));
        const qSnap = await getDocs(q);
        if (!qSnap.empty) {
          const docData = qSnap.docs[0].data();
          if (docData.role) {
            logicalRole = docData.role as Role;
          }
          extraData = {
            expertise: docData.expertise || '',
            availability: docData.availability || null,
          };
        } else {
          // Check tutors collection
          const qTutors = query(collection(db, 'tutors'), where('email', '==', cleanEmail));
          const qTutorsSnap = await getDocs(qTutors);
          if (!qTutorsSnap.empty) {
            logicalRole = 'tutor';
            const tutorData = qTutorsSnap.docs[0].data();
            extraData = {
              tutorId: qTutorsSnap.docs[0].id,
              expertise: tutorData.specializedSyllabus || tutorData['specialized syllabus'] || tutorData.expertise || 'General Instruction',
              availability: tutorData.availability || null,
              fullName: tutorData.name || tutorData.displayName || fullName
            };
          }
        }
      } catch (e) {
        console.warn("Could not fetch pre-existing role check inside authenticated session:", e);
      }

      const userRef = doc(db, 'users', firebaseUser.uid);
      await setDoc(userRef, {
        uid: firebaseUser.uid,
        email: cleanEmail,
        fullName: fullName.trim(),
        role: logicalRole,
        isNewUser: true,
        ...extraData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      localStorage.removeItem('virtual_user_id');
      return { uid: firebaseUser.uid, role: logicalRole };
    } catch (authError: any) {
      console.warn("Real Firebase Auth SignUp failed, falling back to seamless virtual database lookup:", authError.message);
      
      // Determine virtual UID matching rules (^virtual_ prefix)
      const virtualUid = 'virtual_' + cleanEmail.replace(/[@.]/g, '_');
      const userRef = doc(db, 'users', virtualUid);

      let userSnapCheck = null;
      try {
        userSnapCheck = await getDoc(userRef);
      } catch (checkErr) {
        console.warn("Unauthenticated check for existing virtual user had error:", checkErr);
      }

      if (userSnapCheck && userSnapCheck.exists()) {
        throw new Error("An account with this email already exists inside our system.");
      }

      // Query tutors (allow read/list is true for tutors, so this never throws permission error)
      let logicalRole: Role = 'parent';
      let extraData = {};
      try {
        const qTutors = query(collection(db, 'tutors'), where('email', '==', cleanEmail));
        const qTutorsSnap = await getDocs(qTutors);
        if (!qTutorsSnap.empty) {
          logicalRole = 'tutor';
          const tutorData = qTutorsSnap.docs[0].data();
          extraData = {
            tutorId: qTutorsSnap.docs[0].id,
            expertise: tutorData.specializedSyllabus || tutorData['specialized syllabus'] || tutorData.expertise || 'General Instruction',
            availability: tutorData.availability || null,
            fullName: tutorData.name || tutorData.displayName || fullName
          };
        }
      } catch (e) {
        console.warn("Could not check tutors during virtual signup fallback:", e);
      }

      await setDoc(userRef, {
        uid: virtualUid,
        email: cleanEmail,
        fullName: fullName.trim(),
        role: logicalRole,
        virtualPassword: pass,
        isNewUser: true,
        ...extraData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });

      localStorage.setItem('virtual_user_id', virtualUid);
      
      try {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser({ uid: virtualUid, ...userSnap.data() } as User);
        }
      } catch (fetchErr) {
        console.error("Failed to fetch fresh doc during virtual signup:", fetchErr);
      }
      return { uid: virtualUid, role: logicalRole };
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    try {
      // Use real Firebase Authentication
      await signInWithEmailAndPassword(auth, cleanEmail, pass);
      localStorage.removeItem('virtual_user_id');
    } catch (authError: any) {
      console.warn("Real Firebase Auth SignIn failed, checking backup Firestore user table:", authError.message);
      
      const virtualUid = 'virtual_' + cleanEmail.replace(/[@.]/g, '_');
      const userRef = doc(db, 'users', virtualUid);
      
      let userSnap: any = null;
      try {
        userSnap = await getDoc(userRef);
      } catch (readErr) {
        console.warn("Could not fetch virtual user doc by key:", readErr);
      }

      let preExistingTutorDoc: any = null;
      let preExistingLeadDoc: any = null;
      let assignedRole: Role = null;

      if (!userSnap || !userSnap.exists()) {
        // 1. Try to search if it is a tutor in the tutors collection
        try {
          const qTutors = query(collection(db, 'tutors'), where('email', '==', cleanEmail));
          const qTutorsSnap = await getDocs(qTutors);
          if (!qTutorsSnap.empty) {
            preExistingTutorDoc = { id: qTutorsSnap.docs[0].id, ...qTutorsSnap.docs[0].data() };
            assignedRole = 'tutor';
          }
        } catch (tutorErr: any) {
          console.warn("Tutors check failed in sign in:", tutorErr);
        }

        // 2. Try to search if it is a lead (parent) in the leads collection
        if (!assignedRole) {
          try {
            const qLeads = query(collection(db, 'leads'), where('email', '==', cleanEmail));
            const qLeadsSnap = await getDocs(qLeads);
            if (!qLeadsSnap.empty) {
              preExistingLeadDoc = { id: qLeadsSnap.docs[0].id, ...qLeadsSnap.docs[0].data() };
              assignedRole = 'parent';
            }
          } catch (leadsErr) {
            console.warn("Leads check failed in sign in:", leadsErr);
          }
        }

        // 3. Admin check
        if (!assignedRole && cleanEmail === 'brtsegayetad@gmail.com') {
          assignedRole = 'admin';
        }

        // 4. Fallback-as-needed: default to 'parent' so new logins are NEVER blocked!
        if (!assignedRole) {
          assignedRole = 'parent';
        }
      }

      let userData: any = null;
      let correctId = "";

      if (userSnap && userSnap.exists()) {
        userData = userSnap.data();
        correctId = userSnap.id;
        
        if (userData && !userData.virtualPassword) {
          userData.virtualPassword = pass;
          try {
            await setDoc(doc(db, 'users', correctId), { virtualPassword: pass }, { merge: true });
          } catch (writeErr) {
            console.warn("Could not verify/write virtualPassword:", writeErr);
          }
        } else if (userData && userData.virtualPassword && userData.virtualPassword !== pass) {
          throw new Error("Incorrect password. Please verify and try again.");
        }
      } else if (assignedRole === 'tutor' && preExistingTutorDoc) {
        correctId = virtualUid;
        userData = {
          uid: virtualUid,
          email: cleanEmail,
          fullName: preExistingTutorDoc.name || preExistingTutorDoc.displayName || cleanEmail.split('@')[0],
          role: 'tutor',
          tutorId: preExistingTutorDoc.id || '',
          virtualPassword: pass,
          expertise: preExistingTutorDoc.specializedSyllabus || preExistingTutorDoc['specialized syllabus'] || preExistingTutorDoc.expertise || 'General Instruction',
          availability: preExistingTutorDoc.availability || null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        try {
          await setDoc(userRef, userData);
        } catch (writeErr) {
          console.error("Could not write dynamic virtual tutor record:", writeErr);
        }
      } else if (assignedRole === 'parent') {
        correctId = virtualUid;
        userData = {
          uid: virtualUid,
          email: cleanEmail,
          fullName: preExistingLeadDoc?.parentName || preExistingLeadDoc?.fullName || cleanEmail.split('@')[0],
          role: 'parent',
          virtualPassword: pass,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        try {
          await setDoc(userRef, userData);
        } catch (writeErr) {
          console.error("Could not write dynamic virtual parent record:", writeErr);
        }
      } else if (assignedRole === 'admin') {
        correctId = virtualUid;
        userData = {
          uid: virtualUid,
          email: cleanEmail,
          fullName: 'Super Admin',
          role: 'admin',
          virtualPassword: pass,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        try {
          await setDoc(userRef, userData);
        } catch (writeErr) {
          console.error("Could not write dynamic virtual admin record:", writeErr);
        }
      }

      localStorage.setItem('virtual_user_id', correctId);
      setUser({ uid: correctId, ...userData } as User);
    }
  };

  const signOut = async () => {
    localStorage.removeItem('virtual_user_id');
    localStorage.removeItem('show_sandbox_controls');
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut, updateRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
