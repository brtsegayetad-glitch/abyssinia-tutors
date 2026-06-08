import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  BookOpen, 
  Search,
  MoreHorizontal,
  X,
  Loader2,
  CheckCircle2,
  Shield,
  UserCheck,
  Globe,
  Award,
  Clock,
  Briefcase
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { 
  subscribeToTutors, 
  createTutor, 
  subscribeToAllStudents, 
  subscribeToAllSessions,
  subscribeToTutorApplications,
  updateTutorApplicationStatus
} from '../../services/dataService';
import TutorsList from '../../components/TutorsList';

export default function AdminTutors() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'staff' | 'applications'>('staff');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTutor, setNewTutor] = useState({ 
    displayName: '', 
    email: '', 
    expertise: '',
    bio: '',
    languages_taught: '',
    years_of_experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    let tutorsLoaded = false;
    let studentsLoaded = false;
    let sessionsLoaded = false;
    let appsLoaded = false;

    const checkLoading = () => {
      if (tutorsLoaded && studentsLoaded && sessionsLoaded && appsLoaded) {
        setLoading(false);
      }
    };

    const unsubscribeTutors = subscribeToTutors((data) => {
      setTutors(data);
      tutorsLoaded = true;
      checkLoading();
    });

    const unsubscribeStudents = subscribeToAllStudents((data) => {
      setStudents(data);
      studentsLoaded = true;
      checkLoading();
    });

    const unsubscribeSessions = subscribeToAllSessions((data) => {
      setSessions(data);
      sessionsLoaded = true;
      checkLoading();
    });

    const unsubscribeApps = subscribeToTutorApplications((data) => {
      setApplications(data);
      appsLoaded = true;
      checkLoading();
    });

    return () => {
      unsubscribeTutors();
      unsubscribeStudents();
      unsubscribeSessions();
      unsubscribeApps();
    };
  }, []);

  const handleAddTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const parsedLangs = newTutor.languages_taught
      .split(',')
      .map((lang: string) => lang.trim())
      .filter((lang: string) => lang.length > 0);

    const result = await createTutor({
      displayName: newTutor.displayName,
      email: newTutor.email,
      expertise: newTutor.expertise,
      bio: newTutor.bio,
      languages_taught: parsedLangs,
      years_of_experience: Number(newTutor.years_of_experience) || 0
    });

    if (result.success) {
      setSubmitStatus('success');
      setTimeout(() => {
        setShowAddModal(false);
        setNewTutor({ 
          displayName: '', 
          email: '', 
          expertise: '',
          bio: '',
          languages_taught: '',
          years_of_experience: ''
        });
        setSubmitStatus('idle');
      }, 2000);
    } else {
      setSubmitStatus('error');
      // Show error alert for better debugging
      alert(result.error || "Failed to onboard tutor. Check your permissions.");
    }
    setIsSubmitting(false);
  };

  const handleOnboardApplicant = async (app: any) => {
    setIsSubmitting(true);
    const candidateLangs = app.expertise 
      ? app.expertise.split(',').map((x: string) => x.trim()).filter((x: string) => x.length > 0)
      : ['Amharic'];

    const result = await createTutor({
      displayName: app.fullName,
      email: app.email,
      expertise: app.expertise || 'Heritage Instructor',
      bio: app.experience || '',
      languages_taught: candidateLangs,
      years_of_experience: 2
    });

    if (result.success) {
      await updateTutorApplicationStatus(app.id, 'onboarded');
      alert(`Success! Onboarded ${app.fullName} to active teaching staff.`);
    } else {
      alert(`Onboard failed: ${result.error || 'Unknown error'}`);
    }
    setIsSubmitting(false);
  };

  const handleReviewApplicant = async (appId: string) => {
    await updateTutorApplicationStatus(appId, 'reviewed');
  };

  const handleRejectApplicant = async (appId: string) => {
    if (window.confirm("Are you sure you want to dismiss this application?")) {
      await updateTutorApplicationStatus(appId, 'rejected');
    }
  };

  const filteredTutors = tutors.filter(t => 
    t.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.expertise?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications.filter(a => {
    const search = searchTerm.toLowerCase();
    return (
      a.fullName?.toLowerCase().includes(search) ||
      a.email?.toLowerCase().includes(search) ||
      a.expertise?.toLowerCase().includes(search) ||
      a.experience?.toLowerCase().includes(search)
    );
  });

  const activeApplications = filteredApplications.filter(a => a.status !== 'rejected');

  // Compute tutor stats from real data
  const totalTutorsCount = tutors.length;
  const assignedTutorsCount = tutors.filter(t => students.some(s => s.tutorId === t.id)).length;
  const staffUtilizationRate = totalTutorsCount > 0 ? Math.round((assignedTutorsCount / totalTutorsCount) * 100) : 0;
  
  const allSubexpertises = tutors.flatMap(t => 
    (t.expertise || '').split(',').map((e: string) => e.trim()).filter(Boolean)
  );
  const uniqueExpertisesList = Array.from(new Set(allSubexpertises));

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="animate-spin" size={32} />
        <p className="text-sm font-medium">Syncing heritage tutors...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1 tracking-tight animate-fade-in">Tutor Management</h1>
          <p className="text-slate-500 text-sm">Onboard and manage your heritage language teaching staff.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-lg shadow-primary/20 cursor-pointer"
        >
          <UserPlus size={18} />
          <span>Add New Tutor</span>
        </button>
      </header>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 text-slate-400 mb-4">
            <Users size={20} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Tutors</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalTutorsCount}</div>
          <div className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1">
             <span>Active Teaching Staff</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 text-slate-400 mb-4">
            <UserCheck size={20} className="text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Staff Utilization</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{staffUtilizationRate}%</div>
          <div className="text-[10px] text-indigo-500 font-bold mt-2 flex items-center gap-1">
             <span>{assignedTutorsCount} of {totalTutorsCount} assigned to students</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 text-slate-400 mb-4">
            <Globe size={20} className="text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Languages Covered</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{uniqueExpertisesList.length}</div>
          <div className="text-[10px] text-amber-500 font-bold mt-2 flex items-center gap-1 truncate max-w-full">
             <span>{uniqueExpertisesList.slice(0, 3).join(', ') || 'General Instruction'}</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-100 gap-6">
        <button
          onClick={() => { setActiveTab('staff'); setSearchTerm(''); }}
          className={cn(
            "pb-4 text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer",
            activeTab === 'staff' ? "text-primary border-b-2 border-primary" : "text-slate-400 hover:text-slate-600"
          )}
        >
          Staff Directory ({totalTutorsCount})
        </button>
        <button
          onClick={() => { setActiveTab('applications'); setSearchTerm(''); }}
          className={cn(
            "pb-4 text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer flex items-center gap-2",
            activeTab === 'applications' ? "text-primary border-b-2 border-primary" : "text-slate-400 hover:text-slate-600"
          )}
        >
          Tutor Applications ({applications.filter(a => a.status === 'pending' || a.status === 'reviewed').length})
          {applications.filter(a => a.status === 'pending').length > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse shrink-0">
              {applications.filter(a => a.status === 'pending').length}
            </span>
          )}
        </button>
      </div>

      {/* Main Grid View */}
      {activeTab === 'staff' ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[300px]">
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, email or expertise..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              />
            </div>
          </div>

          <TutorsList tutors={filteredTutors} students={students} sessions={sessions} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 bg-white border border-slate-100 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search applicants (name, email, experience)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              />
            </div>
            <p className="text-slate-400 text-xs font-semibold">Active candidate profiles submitted via web portal.</p>
          </div>

          {activeApplications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                <Briefcase size={24} />
              </div>
              <p className="font-semibold text-sm">No matching applicant filings found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeApplications.map((app) => (
                <div 
                  key={app.id} 
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-700 font-bold rounded-xl flex items-center justify-center text-sm uppercase">
                          {app.fullName?.slice(0, 2) || "TU"}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">{app.fullName}</h4>
                          <span className="text-[10px] text-slate-450 font-bold tracking-tight block">
                            Timezone: {app.timezone}
                          </span>
                        </div>
                      </div>

                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md",
                        app.status === 'pending' && "bg-amber-55 text-amber-900",
                        app.status === 'reviewed' && "bg-sky-50 text-sky-800",
                        app.status === 'onboarded' && "bg-emerald-50 text-emerald-800"
                      )}>
                        {app.status || 'pending'}
                      </span>
                    </div>

                    {/* Expertise banner */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Focus Expertise</p>
                      <p className="text-xs font-semibold text-slate-705 leading-relaxed flex items-center gap-1.5">
                        <BookOpen size={12} className="text-slate-400" />
                        {app.expertise || 'Heritage Language'}
                      </p>
                    </div>

                    {/* Details and Description */}
                    <div className="space-y-2">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Experience & Credentials</p>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 hover:line-clamp-none transition-all cursor-pointer bg-slate-50/50 p-2.5 rounded-lg border border-dashed hover:bg-white">
                        {app.experience}
                      </p>
                    </div>

                    {/* Contacts info */}
                    <div className="flex items-center gap-3 text-xs pt-1">
                      <a 
                        href={`mailto:${app.email}`} 
                        className="text-primary hover:underline font-bold flex items-center gap-1.5"
                      >
                        <Mail size={12} />
                        Email applicant
                      </a>
                      <span className="text-slate-300">|</span>
                      <span className="font-mono text-slate-500 flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-400" />
                        WhatsApp: <strong className="text-slate-700">{app.whatsapp}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Operational controls */}
                  {app.status !== 'onboarded' && (
                    <div className="flex items-center gap-3 border-t border-slate-50 pt-5 mt-5">
                      <button
                        onClick={() => handleOnboardApplicant(app)}
                        className="btn-primary py-2 px-4 rounded-lg flex items-center gap-1.5 text-xs font-bold shrink-0 cursor-pointer"
                      >
                        <UserPlus size={13} />
                        Onboard Tutor
                      </button>

                      {app.status === 'pending' && (
                        <button
                          onClick={() => handleReviewApplicant(app.id)}
                          className="bg-sky-50 text-sky-700 border border-sky-100 hover:bg-sky-100 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                          Mark Reviewed
                        </button>
                      )}

                      <button
                        onClick={() => handleRejectApplicant(app.id)}
                        className="bg-rose-50 text-rose-700 hover:bg-rose-100 py-2 px-3 rounded-lg text-xs font-bold ml-auto transition-all cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Tutor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg leading-tight">Add Heritage Tutor</h3>
                <p className="text-slate-400 text-xs mt-1">Expanding the teaching faculty</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddTutor} className="p-8 space-y-6">
              {submitStatus === 'success' ? (
                <div className="py-10 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Tutor Added Successfully</h4>
                    <p className="text-sm text-slate-500">The profile is now active and ready for assignments.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                       <input 
                         required
                         type="text" 
                         value={newTutor.displayName}
                         onChange={(e) => setNewTutor({...newTutor, displayName: e.target.value})}
                         placeholder="e.g. Biruk Tadegesa"
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                       <div className="relative">
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                         <input 
                           required
                           type="email" 
                           value={newTutor.email}
                           onChange={(e) => setNewTutor({...newTutor, email: e.target.value})}
                           placeholder="tutor@academy.com"
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                         />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Syllabus Focus</label>
                       <div className="relative">
                         <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                         <input 
                           required
                           type="text" 
                           value={newTutor.expertise}
                           onChange={(e) => setNewTutor({...newTutor, expertise: e.target.value})}
                           placeholder="e.g. Amharic, Oromo, Intermediate Level"
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                         />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Languages Taught</label>
                       <div className="relative">
                         <input 
                           type="text" 
                           value={newTutor.languages_taught}
                           onChange={(e) => setNewTutor({...newTutor, languages_taught: e.target.value})}
                           placeholder="e.g. Amharic, Ge'ez, Oromo (comma-separated)"
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                         />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Years of Experience</label>
                       <div className="relative">
                         <input 
                           type="number" 
                           min={0}
                           value={newTutor.years_of_experience}
                           onChange={(e) => setNewTutor({...newTutor, years_of_experience: e.target.value})}
                           placeholder="e.g. 5"
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                         />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Professional Bio</label>
                       <div>
                         <textarea 
                           value={newTutor.bio}
                           onChange={(e) => setNewTutor({...newTutor, bio: e.target.value})}
                           placeholder="Tell us about the tutor's background, accomplishments or heritage language credentials..."
                           rows={3}
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none resize-none"
                         />
                       </div>
                    </div>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full btn-primary py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Onboard Tutor"}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
