import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  MoreHorizontal,
  Plus,
  Loader2,
  X,
  Star,
  Send,
  Sparkles,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import LessonViewer from '../../components/LessonViewer';
import { useAuth } from '../../context/AuthContext';
import { 
  subscribeToSessions, 
  subscribeToStudentProgress, 
  completeTrialSession, 
  updateTutorAvailability,
  sendMessage
} from '../../services/dataService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const DAYS_ORDER = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function getSlotTimeString(slot: any): string {
  if (typeof slot === 'string') return slot;
  if (slot && typeof slot === 'object') {
    if (typeof slot.start === 'string') return slot.start;
    if (typeof slot.startTime === 'string') return slot.startTime;
    if (typeof slot.slot === 'string') return slot.slot;
  }
  return String(slot || '');
}

function localSlotToUTC(dayName: string, slotTime: any): { day: string; slot: string } {
  const dayIndex = DAYS_ORDER.indexOf(dayName.toLowerCase());
  const str = getSlotTimeString(slotTime);
  if (dayIndex === -1 || !str.includes(':')) return { day: dayName, slot: str || '09:00' };
  
  const now = new Date();
  const currentLocalDay = now.getDay();
  const diff = dayIndex - currentLocalDay;
  const targetDate = new Date(now);
  targetDate.setDate(now.getDate() + diff);
  
  const [h, m] = str.split(':').map(Number);
  targetDate.setHours(h, m, 0, 0);
  
  const utcDayIndex = targetDate.getUTCDay();
  const utcDayName = DAYS_ORDER[utcDayIndex];
  
  const utcH = String(targetDate.getUTCHours()).padStart(2, '0');
  const utcM = String(targetDate.getUTCMinutes()).padStart(2, '0');
  
  return { day: utcDayName, slot: `${utcH}:${utcM}` };
}

function utcSlotToLocal(dayName: string, slotTime: any): { day: string; slot: string } {
  const dayIndex = DAYS_ORDER.indexOf(dayName.toLowerCase());
  const str = getSlotTimeString(slotTime);
  if (dayIndex === -1 || !str.includes(':')) return { day: dayName, slot: str || '09:00' };
  
  const now = new Date();
  const currentUTCDay = now.getUTCDay();
  const diff = dayIndex - currentUTCDay;
  const targetDate = new Date(now);
  targetDate.setUTCDate(now.getUTCDate() + diff);
  
  const [h, m] = str.split(':').map(Number);
  targetDate.setUTCHours(h, m, 0, 0);
  
  const localDayIndex = targetDate.getDay();
  const localDayName = DAYS_ORDER[localDayIndex];
  
  const localH = String(targetDate.getHours()).padStart(2, '0');
  const localM = String(targetDate.getMinutes()).padStart(2, '0');
  
  return { day: localDayName, slot: `${localH}:${localM}` };
}

function convertLocalAvailabilityToUTC(localAvail: any): any {
  if (!localAvail) return null;
  const utcAvail: any = {
    monday: { active: false, slots: [] },
    tuesday: { active: false, slots: [] },
    wednesday: { active: false, slots: [] },
    thursday: { active: false, slots: [] },
    friday: { active: false, slots: [] },
    saturday: { active: false, slots: [] },
    sunday: { active: false, slots: [] }
  };
  
  Object.entries(localAvail).forEach(([day, dayData]: [string, any]) => {
    if (!dayData?.slots) return;
    dayData.slots.forEach((slot: string) => {
      const utc = localSlotToUTC(day, slot);
      if (utcAvail[utc.day]) {
        if (!utcAvail[utc.day].slots.includes(utc.slot)) {
          utcAvail[utc.day].slots.push(utc.slot);
        }
      }
    });
  });
  
  Object.keys(utcAvail).forEach(day => {
    utcAvail[day].slots.sort();
    utcAvail[day].active = utcAvail[day].slots.length > 0;
  });
  
  return utcAvail;
}

function convertUTCAvailabilityToLocal(utcAvail: any): any {
  if (!utcAvail) return null;
  const localAvail: any = {
    monday: { active: false, slots: [] },
    tuesday: { active: false, slots: [] },
    wednesday: { active: false, slots: [] },
    thursday: { active: false, slots: [] },
    friday: { active: false, slots: [] },
    saturday: { active: false, slots: [] },
    sunday: { active: false, slots: [] }
  };
  
  Object.entries(utcAvail).forEach(([day, dayData]: [string, any]) => {
    if (!dayData?.slots) return;
    dayData.slots.forEach((slot: string) => {
      const local = utcSlotToLocal(day, slot);
      if (localAvail[local.day]) {
        if (!localAvail[local.day].slots.includes(local.slot)) {
          localAvail[local.day].slots.push(local.slot);
        }
      }
    });
  });
  
  Object.keys(localAvail).forEach(day => {
    localAvail[day].slots.sort();
    localAvail[day].active = localAvail[day].slots.length > 0;
  });
  
  return localAvail;
}

/**
 * Robust helper to format Firestore timestamps, JS Dates, or schedule objects {start, end}
 */
const formatDateTime = (val: any, options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }): string => {
  if (!val) return '00:00';
  
  let date: Date;
  
  // 1. Handle Firestore Timestamp
  if (val && typeof val.toDate === 'function') {
    date = val.toDate();
  } 
  // 2. Handle { start, end } object
  else if (val && typeof val === 'object' && ('start' in val || 'startTime' in val)) {
    const startVal = val.start || val.startTime;
    if (startVal && typeof startVal.toDate === 'function') {
      date = startVal.toDate();
    } else if (typeof startVal === 'string' || typeof startVal === 'number') {
      const parsed = new Date(startVal);
      date = isNaN(parsed.getTime()) ? new Date() : parsed;
    } else if (startVal instanceof Date) {
      date = startVal;
    } else {
      return typeof startVal === 'string' ? startVal : JSON.stringify(startVal);
    }
  }
  // 3. Handle Date object
  else if (val instanceof Date) {
    date = val;
  }
  // 4. Handle string/number
  else if (typeof val === 'string' || typeof val === 'number') {
    const parsed = new Date(val);
    if (!isNaN(parsed.getTime())) {
      date = parsed;
    } else {
      return String(val);
    }
  }
  // 5. Fallback
  else if (typeof val === 'object') {
    return val.start || val.time || JSON.stringify(val);
  }
  else {
    return String(val);
  }

  return date.toLocaleTimeString([], options);
};

/**
 * Specifically for rendering slot times which might be objects or strings
 */
const renderSlotTime = (time: any) => {
  if (typeof time === 'string') return time;
  if (time && typeof time === 'object') {
    if (time.start && typeof time.start === 'string') return time.start;
    if (time.startTime && typeof time.startTime === 'string') return time.startTime;
    return formatDateTime(time.start || time.startTime || time, { hour: '2-digit', minute: '2-digit' });
  }
  return String(time || '');
};

export default function TutorDashboard() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 3-Dots Dropdown menu
  const [openMenuSessionId, setOpenMenuSessionId] = useState<string | null>(null);

  // Student Bio Modal state
  const [activeBioStudent, setActiveBioStudent] = useState<any>(null);
  const [isFetchingBio, setIsFetchingBio] = useState(false);
  const [bioModalOpen, setBioModalOpen] = useState(false);

  // Reschedule Form State
  const [reschedulingSession, setReschedulingSession] = useState<any>(null);
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);

  // Global Library State
  const [libraryModalOpen, setLibraryModalOpen] = useState(false);

  const handleViewStudentBio = async (session: any) => {
    setBioModalOpen(true);
    setIsFetchingBio(true);
    setActiveBioStudent(null);
    try {
      if (session.studentId) {
        const docRef = doc(db, 'students', session.studentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const sData = docSnap.data();
          setActiveBioStudent({
            id: docSnap.id,
            ...sData,
            studentAge: sData.studentAge || session.studentAge || 'N/A',
            learningGoal: sData.learningGoal || session.learningGoal || 'No goals specified'
          });
          setIsFetchingBio(false);
          return;
        }
      }
      
      // Fallback or trial mode info if student document not indexed yet
      setActiveBioStudent({
        id: session.studentId || 'trial-id',
        name: session.studentName || 'Student',
        studentAge: session.studentAge || 'N/A',
        progress: 0,
        isTrial: true,
        plan: 'Trial Class',
        learningGoal: session.learningGoal || 'No goals specified',
        schedulePattern: 'Trial Period'
      });
    } catch (err) {
      console.error("Error fetching student bio:", err);
      setActiveBioStudent({
        id: session.studentId || 'fallback-id',
        name: session.studentName || 'Student',
        studentAge: session.studentAge || 'N/A',
        progress: 0,
        isTrial: true,
        learningGoal: session.learningGoal || 'No goals specified',
        schedulePattern: 'Pre-schedule'
      });
    }
    setIsFetchingBio(false);
  };

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reschedulingSession || !user) return;
    setIsSubmitting(true);
    
    try {
      const timeFormatted = formatDateTime(reschedulingSession.startTime, {
        weekday: 'long', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
      });

      const messageText = `[Reschedule Request] Request to reschedule class for student "${reschedulingSession.studentName}" originally scheduled at ${timeFormatted}. Reason: ${rescheduleReason}`;

      const result = await sendMessage({
        senderId: user.uid,
        senderName: user.displayName || user.email || 'Tutor',
        senderRole: 'tutor',
        recipientId: 'admin',
        text: messageText
      });

      if (result.success) {
        setRescheduleSuccess(true);
        setTimeout(() => {
          setRescheduleSuccess(false);
          setRescheduleModalOpen(false);
          setReschedulingSession(null);
          setRescheduleReason('');
        }, 2200);
      } else {
        alert("Failed to deliver your request to scheduling operators.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting reschedule request.");
    }
    setIsSubmitting(false);
  };
  const [activeTab, setActiveTab] = useState<'agenda' | 'availability'>('agenda');
  const [agendaTab, setAgendaTab] = useState<'today' | 'upcoming' | 'past'>('today');
  const [searchQuery, setSearchQuery] = useState('');

  // Completion Modal State
  const [completingSession, setCompletingSession] = useState<any>(null);
  const [evaluation, setEvaluation] = useState('');
  const [level, setLevel] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Availability State
  const [availability, setAvailability] = useState<any>({
    monday: { active: true, slots: ['09:00', '10:00', '11:00'] },
    tuesday: { active: true, slots: ['09:00', '10:00', '11:00'] },
    wednesday: { active: true, slots: ['09:00', '10:00', '11:00'] },
    thursday: { active: true, slots: ['09:00', '10:00', '11:00'] },
    friday: { active: true, slots: ['09:00', '10:00', '11:00'] },
    saturday: { active: false, slots: [] },
    sunday: { active: false, slots: [] },
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const saveAvailability = async () => {
    if (!user) return;
    setIsSubmitting(true);
    const utcAvail = convertLocalAvailabilityToUTC(availability);
    const result = await updateTutorAvailability(user.uid, utcAvail, user.tutorId);
    setIsSubmitting(false);
    if (result.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      alert('Failed to save availability. Please try again.');
    }
  };

  useEffect(() => {
    if (!user) return;
    
    // Load initial availability if exists
    if (user.availability) {
      setAvailability(convertUTCAvailabilityToLocal(user.availability));
    }

    let sessionsLoaded = false;
    let progressLoaded = false;

    const checkLoading = () => {
      if (sessionsLoaded && progressLoaded) {
        setLoading(false);
      }
    };

    const targetTutorId = user.tutorId || user.uid;

    const unsubscribeSessions = subscribeToSessions('tutor', targetTutorId, 
      (data) => {
        setSessions(data);
        sessionsLoaded = true;
        checkLoading();
      },
      () => {
        sessionsLoaded = true;
        checkLoading();
      }
    );

    const unsubscribeProgress = subscribeToStudentProgress(targetTutorId, 
      (data) => {
        setStudents(data);
        progressLoaded = true;
        checkLoading();
      },
      () => {
        progressLoaded = true;
        checkLoading();
      }
    );

    return () => {
      unsubscribeSessions();
      unsubscribeProgress();
    };
  }, [user]);

  const handleCompleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!completingSession) return;

    setIsSubmitting(true);
    const result = await completeTrialSession(
      completingSession.id,
      completingSession.leadId,
      { 
        evaluation, 
        recommendedLevel: level, 
        completedAt: new Date() 
      },
      { 
        email: completingSession.parentEmail, 
        name: completingSession.parentName 
      }
    );

    if (result.success) {
      setCompletingSession(null);
      setEvaluation('');
      setLevel('1');
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="animate-spin text-secondary" size={32} />
        <p className="text-sm font-medium">Preparing your classroom...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1 tracking-tight">Tutor Dashboard</h1>
          <p className="text-slate-500 text-sm">Hello, Teacher. Manage your classes and availability here.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab('agenda')}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold transition-all",
              activeTab === 'agenda' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
            )}
          >
            Daily Agenda
          </button>
          <button 
            onClick={() => setActiveTab('availability')}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold transition-all",
              activeTab === 'availability' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
            )}
          >
            My Availability
          </button>
        </div>
      </header>

      {activeTab === 'agenda' ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Daily Agenda with Sub-Tabs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Time Zone Indicator */}
            <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <span className="text-sm">🌐</span>
                <span>Your schedule is running in: <strong className="text-slate-800 font-bold">{Intl.DateTimeFormat().resolvedOptions().timeZone}</strong></span>
              </div>
              <span className="text-[10px] text-indigo-600 bg-indigo-50 font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">Local Detector</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 tracking-tight text-xl">Daily Agenda</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              {/* Sub-Tabs & Search */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                  <button 
                    onClick={() => setAgendaTab('today')}
                    className={cn(
                      "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                      agendaTab === 'today' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
                    )}
                  >
                    Today
                  </button>
                  <button 
                    onClick={() => setAgendaTab('upcoming')}
                    className={cn(
                      "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                      agendaTab === 'upcoming' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
                    )}
                  >
                    Upcoming
                  </button>
                  <button 
                    onClick={() => setAgendaTab('past')}
                    className={cn(
                      "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                      agendaTab === 'past' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
                    )}
                  >
                    Past History
                  </button>
                </div>

                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-2 pl-9 text-xs focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none w-full md:w-64 transition-all"
                  />
                  <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {(() => {
                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);

                const filtered = sessions
                  .filter(s => {
                    if (!s.startTime) return false;
                    const date = s.startTime.toDate ? s.startTime.toDate() : new Date(s.startTime);
                    
                    // Date Filter
                    let passDate = false;
                    if (agendaTab === 'today') {
                      passDate = date >= today && date < tomorrow;
                    } else if (agendaTab === 'upcoming') {
                      passDate = date >= tomorrow;
                    } else {
                      passDate = date < today;
                    }

                    // Search Filter
                    const matchesSearch = (s.studentName || '').toLowerCase().includes(searchQuery.toLowerCase());

                    return passDate && matchesSearch;
                  })
                  .sort((a, b) => {
                    // Sorting logic:
                    // 1. Status (active/scheduled first)
                    // 2. Time
                    if (a.status !== b.status) {
                       if (a.status === 'scheduled') return -1;
                       if (b.status === 'scheduled') return 1;
                    }

                    const dA = a.startTime.toDate ? a.startTime.toDate() : new Date(a.startTime);
                    const dB = b.startTime.toDate ? b.startTime.toDate() : new Date(b.startTime);
                    
                    if (agendaTab === 'past') return dB.getTime() - dA.getTime();
                    return dA.getTime() - dB.getTime();
                  });

                if (filtered.length === 0) {
                  return (
                    <div className="py-12 bg-white rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-xs italic font-medium">
                      No {agendaTab} sessions found {searchQuery && `matching "${searchQuery}"`}.
                    </div>
                  );
                }

                return filtered.map((session) => (
                  <div key={session.id} className="bg-white p-5 rounded-xl border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-lg flex flex-col items-center justify-center text-slate-900 font-bold shadow-sm">
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">
                          {agendaTab === 'today' ? 'Start' : (session.startTime.toDate ? session.startTime.toDate().toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Time')}
                        </span>
                        <span className="text-sm">
                          {formatDateTime(session.startTime)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-900 leading-tight">{session.studentName || 'Student'}</h4>
                          <span className={cn(
                            "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
                            session.type === 'trial' ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-500"
                          )}>
                            {session.type || 'Session'}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 text-[11px] text-slate-400 font-medium">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Users size={12} className="text-slate-300" />
                              Age {session.studentAge || 'N/A'}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} className="text-slate-300" />
                              60 mins
                            </div>
                          </div>
                          {session.learningGoal && (
                            <div className="flex items-start gap-1 mt-1 text-slate-500 italic line-clamp-1 max-w-xs">
                               <BookOpen size={12} className="text-secondary shrink-0 mt-0.5" />
                               {session.learningGoal}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {session.status === 'scheduled' ? (
                        (() => {
                          const student = students.find((s: any) => s.id === session.studentId);
                          const isExpired = student?.status === 'expired' || (student && student.remainingClassCredits !== undefined && student.remainingClassCredits <= 0);
                          
                          if (isExpired) {
                            return (
                              <div className="flex flex-col items-end gap-1">
                                <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                                  🔐 Suspended / Credits 0
                                </span>
                                <span className="text-[8px] text-slate-400 font-medium">Classroom Locked</span>
                              </div>
                            );
                          }
                          
                          return (
                            <div className="flex items-center gap-2">
                               <a 
                                 href={(user as any)?.classroomLink || 'https://meet.google.com'} 
                                 target="_blank" 
                                 rel="noopener noreferrer" 
                                 className="btn-primary text-[10px] py-1.5 px-3 shadow-none uppercase tracking-widest cursor-pointer inline-flex items-center hover:scale-[1.01] transition-all"
                               >
                                 Enter Class
                               </a>
                               <button 
                                 onClick={() => setCompletingSession(session)}
                                 className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase border border-emerald-100 transition-all cursor-pointer"
                               >
                                 Complete
                               </button>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg text-[11px] border border-emerald-100">
                          <CheckCircle2 size={14} />
                          Report Sent
                        </div>
                      )}
                      <div className="relative">
                        <button 
                          onClick={() => setOpenMenuSessionId(openMenuSessionId === session.id ? null : session.id)}
                          className="p-1 text-slate-300 hover:text-primary transition-colors cursor-pointer"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        {openMenuSessionId === session.id && (
                          <div 
                            className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 w-48 z-20 text-left animate-in fade-in slide-in-from-top-2 duration-100"
                            onMouseLeave={() => setOpenMenuSessionId(null)}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuSessionId(null);
                                handleViewStudentBio(session);
                              }}
                              className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors"
                            >
                              <BookOpen size={14} className="text-slate-400" />
                              <span>View Student Bio</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuSessionId(null);
                                setReschedulingSession(session);
                                setRescheduleReason('');
                                setRescheduleModalOpen(true);
                              }}
                              className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors"
                            >
                              <Calendar size={14} className="text-slate-400" />
                              <span>Request Reschedule</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

        {/* Resources & Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-xl shadow-xl relative overflow-hidden">
            <h3 className="text-lg font-bold mb-3 tracking-tight">Open Library</h3>
            <p className="text-slate-400 text-xs mb-8 leading-relaxed">Quick access to interactive flashcards and visual Ge'ez charts for today's sessions.</p>
            <button 
              onClick={() => {
                setLibraryModalOpen(true);
              }}
              className="btn-secondary w-full text-[10px] uppercase font-bold tracking-widest border-none py-2 bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
            >
              <BookOpen size={14} />
              Open Global Library
            </button>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-slate-900">Student Progress</h3>
                <Plus size={16} className="text-slate-400 cursor-pointer hover:text-secondary" />
             </div>
             <div className="space-y-5">
                {students.map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[11px] font-bold mb-2">
                       <span className="text-slate-700">{s.name}</span>
                       <span className="text-slate-400 uppercase tracking-widest">{s.progress || 0}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                       <div 
                        className="h-full transition-all duration-1000" 
                        style={{ width: `${s.progress || 0}%`, backgroundColor: '#0f172a' }}
                       />
                    </div>
                  </div>
                ))}
                {students.length === 0 && (
                  <p className="text-[10px] text-slate-400 italic text-center font-medium">No assigned students yet.</p>
                )}
             </div>
          </div>
        </div>
      </div>
      ) : (
        <div className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-2">Weekly Availability</h2>
            <p className="text-slate-500 mb-8 text-sm">Set your recurring weekly teaching hours. These will be visible to parents booking trials.</p>
            
            {/* Time Zone Indicator */}
            <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl flex items-center justify-between text-[11px] text-slate-500 font-medium mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm">🌐</span>
                <span>Your schedule is running in: <strong className="text-slate-800 font-bold">{Intl.DateTimeFormat().resolvedOptions().timeZone}</strong></span>
              </div>
              <span className="text-[10px] text-indigo-600 bg-indigo-50 font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">Local Detector</span>
            </div>

            <div className="space-y-6">
              {Object.entries(availability).map(([day, data]: [string, any]) => (
                <div key={day} className={cn(
                   "p-6 rounded-2xl border transition-all",
                   data.active ? "bg-white border-slate-200 shadow-sm" : "bg-slate-50 border-transparent opacity-60"
                )}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={data.active}
                        onChange={(e) => setAvailability({
                          ...availability,
                          [day]: { ...data, active: e.target.checked }
                        })}
                        className="w-5 h-5 rounded border-slate-300 text-secondary focus:ring-secondary cursor-pointer"
                      />
                      <span className="font-bold text-slate-900 capitalize tracking-tight">{day}</span>
                    </div>
                    {data.active && (
                      <span className="text-[10px] font-bold text-secondary bg-secondary/5 px-2 py-0.5 rounded uppercase">Accepting Regular Students</span>
                    )}
                  </div>
                  
                  {data.active && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {data.slots.map((slot: string, idx: number) => (
                          <div key={idx} className="relative group">
                            <input 
                              type="time" 
                              value={slot}
                              onChange={(e) => {
                                const newSlots = [...data.slots];
                                newSlots[idx] = e.target.value;
                                setAvailability({ ...availability, [day]: { ...data, slots: newSlots }});
                              }}
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-3 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none font-bold text-slate-700"
                            />
                            <button 
                              onClick={() => {
                                const newSlots = data.slots.filter((_: any, i: number) => i !== idx);
                                setAvailability({ ...availability, [day]: { ...data, slots: newSlots }});
                              }}
                              className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-red-500 rounded-full p-1 border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            setAvailability({ ...availability, [day]: { ...data, slots: [...data.slots, '09:00'] }});
                          }}
                          className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-100 rounded-xl p-3 text-slate-400 hover:border-secondary hover:text-secondary transition-all group"
                        >
                          <Plus size={16} className="group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Add Slot</span>
                        </button>
                      </div>
                      <p className="text-[9px] text-slate-400 font-medium italic">* Each session is 50 minutes. Please allow 10 minutes buffer between slots.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-end gap-6 pt-8 border-t border-slate-100">
               {saveSuccess && (
                 <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs animate-in fade-in slide-in-from-right-4">
                    <CheckCircle2 size={16} />
                    Changes saved successfully!
                 </div>
               )}
               <button 
                 disabled={isSubmitting}
                 onClick={saveAvailability}
                 className="btn-primary px-12 py-4 shadow-xl shadow-primary/20 flex items-center gap-2"
               >
                 {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (
                   <>
                     <Send size={16} />
                     Save Availability Changes
                   </>
                 )}
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {completingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-emerald-600 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg leading-tight">Post-Trial Evaluation</h3>
                <p className="text-emerald-100 text-xs mt-1">Student: {completingSession.studentName}</p>
              </div>
              <button 
                onClick={() => setCompletingSession(null)} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCompleteSubmit} className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Initial Assessment Score</label>
                <div className="flex gap-2">
                  {['1', '2', '3', '4', '5'].map((l) => (
                    <button 
                      key={l}
                      type="button"
                      onClick={() => setLevel(l)}
                      className={cn(
                        "flex-1 py-3 rounded-xl border-2 transition-all font-bold text-sm",
                        level === l 
                          ? "bg-slate-900 text-white border-slate-900 scale-105 shadow-lg shadow-slate-900/20" 
                          : "bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-200"
                      )}
                    >
                      Lvl {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tutor Evaluation & Feedback</label>
                <textarea 
                  required
                  rows={4}
                  value={evaluation}
                  onChange={(e) => setEvaluation(e.target.value)}
                  placeholder="Describe student's current proficiency, strengths, and recommended focus areas for the curriculum..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none resize-none"
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex gap-3">
                <Star className="text-emerald-600 shrink-0" size={18} />
                <p className="text-[11px] text-emerald-700 leading-relaxed font-medium">
                  <strong>Parent Notification:</strong> Submitting this report will automatically send a professional email to <strong>{completingSession.parentName}</strong> with your high-level evaluation and invitation to subscribe.
                </p>
              </div>

              <button 
                disabled={isSubmitting}
                type="submit" 
                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all uppercase tracking-widest text-xs"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (
                  <>
                    <Send size={16} />
                    Finalize & Send Report
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Amharic Lesson Viewer */}
      <LessonViewer isOpen={libraryModalOpen} onClose={() => setLibraryModalOpen(false)} />

      {/* Student Bio Modal */}
      {bioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-150">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl text-secondary">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-none text-white">Student Profile Bio</h3>
                  <p className="text-slate-400 text-[10px] mt-1 font-medium">Active Classroom Index Row</p>
                </div>
              </div>
              <button 
                onClick={() => setBioModalOpen(false)} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {isFetchingBio ? (
              <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400">
                <Loader2 size={24} className="animate-spin text-secondary" />
                <span className="text-xs font-bold uppercase tracking-wider">Loading record...</span>
              </div>
            ) : activeBioStudent ? (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-xl font-black shadow-sm">
                    {activeBioStudent.name ? activeBioStudent.name[0] : 'S'}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-lg leading-tight">{activeBioStudent.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                      {activeBioStudent.isTrial ? 'Trial Assessment' : `${activeBioStudent.plan || 'Standard'} Subscriber`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Student Age</span>
                    <span className="text-xs text-slate-950 font-bold">{activeBioStudent.studentAge || 'N/A'}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Class Pattern</span>
                    <span className="text-xs text-slate-950 font-bold truncate block">{activeBioStudent.schedulePattern || 'Ongoing'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>Curriculum Progress</span>
                    <span>{activeBioStudent.progress || 0}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900 rounded-full transition-all duration-500"
                      style={{ width: `${activeBioStudent.progress || 0}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Syllabus Focus & Goals</span>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed font-semibold italic">
                    "{activeBioStudent.learningGoal}"
                  </div>
                </div>

                {activeBioStudent.isTrial && (
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-[10px] text-amber-800 leading-normal font-semibold">
                    * This is a pre-enrollment classroom slot. Completion evaluation will automatically index this member in the system archive.
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-400 italic">
                Could not retrieve student bio record.
              </div>
            )}

            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setBioModalOpen(false)}
                className="btn-primary text-[10px] uppercase font-bold tracking-widest px-6 py-2 bg-slate-900 text-white cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Request Modal */}
      {rescheduleModalOpen && reschedulingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-150">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl text-secondary">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-none text-white">Request Reschedule</h3>
                  <p className="text-slate-400 text-[10px] mt-1 font-medium">Notifies Master Administration Operators</p>
                </div>
              </div>
              <button 
                onClick={() => setRescheduleModalOpen(false)} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="p-6 space-y-5">
              <div className="bg-slate-50 p-4 rounded-xl space-y-1.5 border border-slate-100 text-[11px] text-slate-600 font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-400 uppercase text-[9px]">Student:</span>
                  <span className="text-slate-900 font-bold">{reschedulingSession.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 uppercase text-[9px]">Original Class Time:</span>
                  <span className="text-slate-900 font-bold">
                    {formatDateTime(reschedulingSession.startTime, {
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Reason for Rescheduling</label>
                <textarea 
                  required
                  rows={3}
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  placeholder="Please specify your request and suggested timeslots (e.g. reschedule to Friday afternoon at 4pm due to school exams)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-slate-950/10 focus:border-slate-900 transition-all outline-none resize-none font-semibold text-slate-800"
                />
              </div>

              {rescheduleSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-emerald-800 text-[11px] font-bold animate-in zoom-in-95">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={16} />
                  <span>Request delivered successfully to Admin console inbox.</span>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-[10px] text-amber-800 leading-normal font-semibold">
                  * Live reschedule request maintains slot ledger integrity. An administrative coordinator will contact the parent to adjust their active recurring session.
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setRescheduleModalOpen(false)}
                  className="text-slate-500 hover:text-slate-800 font-bold text-[10px] uppercase tracking-widest px-4 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  disabled={isSubmitting || rescheduleSuccess}
                  type="submit"
                  className="btn-primary text-[10px] uppercase font-bold tracking-widest px-8 py-3 bg-slate-900 text-white flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
