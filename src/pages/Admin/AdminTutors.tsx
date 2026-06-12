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
  Briefcase,
  Check
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
  const [appStatusFilter, setAppStatusFilter] = useState<'all' | 'pending' | 'reviewed' | 'onboarded' | 'rejected'>('all');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);

  // Onboard Review & Edit Modal State
  const [reviewingApplicant, setReviewingApplicant] = useState<any | null>(null);
  const [editedApplicant, setEditedApplicant] = useState<any>({
    fullName: '',
    email: '',
    whatsapp: '',
    expertise: '',
    timezone: '',
    hourlyRate: '25',
    yearsOfExperience: '3-5 years',
    quote: '',
    detailedBio: '',
    videoUrl: '',
    avatarUrl: '',
    targetAge: 'Beginners (Ages 6-12)'
  });
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

  const handleOnboardApplicant = async (appId: string) => {
    setIsSubmitting(true);
    
    // Parse years of experience to numeric value
    const expStr = editedApplicant.yearsOfExperience;
    const yearsNum = expStr === '10+ years' ? 10 : (expStr === '5-10 years' ? 7 : (expStr === '3-5 years' ? 4 : 2));

    const result = await createTutor({
      displayName: editedApplicant.fullName,
      email: editedApplicant.email.trim().toLowerCase(),
      expertise: editedApplicant.expertise || 'Heritage Language Tutor',
      bio: editedApplicant.detailedBio || '',
      languages_taught: ['Amharic', 'English', 'Ge\'ez'],
      years_of_experience: yearsNum,
      avatar: editedApplicant.avatarUrl,
      videoUrl: editedApplicant.videoUrl || '',
      rating: '5.0',
      reviewsCount: '1',
      location: `Ethiopia / Remote Partner`,
      stats: 'Newly Approved • Verified Partner',
      quote: editedApplicant.quote,
      ageSpecialty: editedApplicant.targetAge,
      hourlyRate: editedApplicant.hourlyRate
    });

    if (result.success) {
      await updateTutorApplicationStatus(appId, 'onboarded');
      alert(`Success! Onboarded and published ${editedApplicant.fullName} to the live trial bookings registry.`);
      setReviewingApplicant(null); // Close modal
    } else {
      alert(`Onboard failed: ${result.error || 'Unknown database issue'}`);
    }
    setIsSubmitting(false);
  };

  const startOnboardReview = (app: any) => {
    setReviewingApplicant(app);
    setEditedApplicant({
      id: app.id,
      fullName: app.fullName || '',
      email: app.email || '',
      whatsapp: app.whatsapp || '',
      expertise: app.expertise || 'Amharic',
      timezone: app.timezone || 'EST (New York / DC)',
      hourlyRate: app.hourlyRate || '25',
      yearsOfExperience: app.yearsOfExperience || '3-5 years',
      quote: app.quote || '',
      detailedBio: app.detailedBio || app.experience || '',
      videoUrl: app.videoUrl || '',
      avatarUrl: app.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=260',
      targetAge: app.targetAge || 'All Children (Ages 6-12)'
    });
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

  const activeApplications = filteredApplications.filter(a => {
    if (appStatusFilter === 'all') return true;
    if (appStatusFilter === 'rejected') return a.status === 'rejected';
    if (appStatusFilter === 'pending') return a.status === 'pending' || !a.status;
    return a.status === appStatusFilter;
  });

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
          Tutor Applications ({applications.length})
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
          <div className="p-6 bg-white border border-slate-100 rounded-2xl flex flex-col gap-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
              <p className="text-slate-400 text-xs font-bold">Manage and view tutor candidate profiles submitted via the web portal.</p>
            </div>

            {/* Application Stages filter */}
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-50 pt-4">
              <span className="text-xs font-semibold text-slate-400 mr-2 uppercase tracking-wide">Stage:</span>
              {(['all', 'pending', 'reviewed', 'onboarded', 'rejected'] as const).map((status) => {
                const count = applications.filter(a => {
                  if (status === 'all') return true;
                  if (status === 'rejected') return a.status === 'rejected';
                  if (status === 'pending') return a.status === 'pending' || !a.status;
                  return a.status === status;
                }).length;

                return (
                  <button
                    key={status}
                    onClick={() => setAppStatusFilter(status)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all relative cursor-pointer outline-none uppercase tracking-wider",
                      appStatusFilter === status 
                        ? "bg-primary text-white shadow-sm" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {status === 'rejected' ? 'dismissed' : status}
                    <span className={cn(
                      "ml-1.5 px-1.5 py-0.5 rounded-full text-[9px]",
                      appStatusFilter === status ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                    )}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
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
                        {app.avatarUrl ? (
                          <img 
                            src={app.avatarUrl} 
                            alt={app.fullName} 
                            className="w-10 h-10 rounded-xl object-cover border border-slate-100 shadow-sm"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=260';
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-indigo-50 text-indigo-700 font-bold rounded-xl flex items-center justify-center text-sm uppercase">
                            {app.fullName?.slice(0, 2) || "TU"}
                          </div>
                        )}
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
                      <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Experience & Credentials</span>
                        {app.hourlyRate && <span className="text-emerald-650 font-bold font-sans">Proposed Rate: ${app.hourlyRate}/Hr</span>}
                      </div>
                      <p className="text-slate-505 text-xs leading-relaxed line-clamp-3 hover:line-clamp-none transition-all cursor-pointer bg-slate-50/50 p-2.5 rounded-lg border border-dashed hover:bg-white">
                        {app.detailedBio || app.experience}
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
                    <div className="flex items-center gap-3 border-t border-slate-100 pt-5 mt-5">
                      {app.status !== 'rejected' ? (
                        <>
                          <button
                            onClick={() => startOnboardReview(app)}
                            className="bg-indigo-650 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center gap-1.5 text-xs font-bold shrink-0 cursor-pointer shadow-sm hover:shadow transition-all"
                          >
                            <UserPlus size={13} />
                            Review & Onboard...
                          </button>

                          {app.status === 'pending' && (
                            <button
                              onClick={() => handleReviewApplicant(app.id)}
                              className="bg-sky-50 text-sky-750 border border-sky-100 hover:bg-sky-100 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer"
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
                        </>
                      ) : (
                        <button
                          onClick={async () => {
                            await updateTutorApplicationStatus(app.id, 'pending');
                            alert(`Application restored! Moved back to the Pending list.`);
                          }}
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 py-2.5 px-4 rounded-lg text-xs font-bold ml-auto transition-all cursor-pointer border border-emerald-100 shadow-sm"
                        >
                          Restore Application as Pending
                        </button>
                      )}
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
      {/* Review, Edit, & Approved Onboard Applicant Modal */}
      {reviewingApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center shrink-0">
              <div>
                <span className="text-[10px] font-black uppercase bg-indigo-500 text-white px-2.5 py-1 rounded-full tracking-wider">
                  Reviewing Application Profile
                </span>
                <h3 className="font-bold text-lg mt-2 leading-tight">Review & Refine Profile</h3>
                <p className="text-slate-400 text-xs mt-0.5">Edit this applicant's profile before approving and posting live to parents</p>
              </div>
              <button 
                onClick={() => setReviewingApplicant(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Form Scrollable */}
            <form onSubmit={(e) => { e.preventDefault(); handleOnboardApplicant(reviewingApplicant.id); }} className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-405 uppercase tracking-widest">Public Display Name</label>
                  <input 
                    required
                    type="text" 
                    value={editedApplicant.fullName}
                    onChange={(e) => setEditedApplicant({...editedApplicant, fullName: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-405 uppercase tracking-widest">Email (Private Profile Record)</label>
                  <input 
                    required
                    type="email" 
                    value={editedApplicant.email}
                    onChange={(e) => setEditedApplicant({...editedApplicant, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-505/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-405 uppercase tracking-widest">WhatsApp Number</label>
                  <input 
                    required
                    type="text" 
                    value={editedApplicant.whatsapp}
                    onChange={(e) => setEditedApplicant({...editedApplicant, whatsapp: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Syllabus Specialty Focus</label>
                  <select 
                    value={editedApplicant.expertise}
                    onChange={(e) => setEditedApplicant({...editedApplicant, expertise: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer outline-none"
                  >
                    <option value="Amharic">Amharic</option>
                    <option value="Ge'ez">Ge'ez</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-405 uppercase tracking-widest">Hourly Lesson Rate ($/hr)</label>
                  <input 
                    required
                    type="number" 
                    value={editedApplicant.hourlyRate}
                    onChange={(e) => setEditedApplicant({...editedApplicant, hourlyRate: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-405 uppercase tracking-widest">Years of Experience</label>
                  <select 
                    value={editedApplicant.yearsOfExperience}
                    onChange={(e) => setEditedApplicant({...editedApplicant, yearsOfExperience: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 transition-all outline-none cursor-pointer"
                  >
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-405 uppercase tracking-widest flex items-center justify-between">
                  <span>Welcome Speech Quote / Tagline</span>
                  <span className="text-[9px] text-amber-600 font-bold">Visible inside the dialog card</span>
                </label>
                <input 
                  required
                  type="text" 
                  value={editedApplicant.quote}
                  onChange={(e) => setEditedApplicant({...editedApplicant, quote: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500/20 transition-all italic font-serif"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-405 uppercase tracking-widest">Public Biography (Methodology & Tone)</label>
                <textarea 
                  required
                  value={editedApplicant.detailedBio}
                  onChange={(e) => setEditedApplicant({...editedApplicant, detailedBio: e.target.value})}
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-405 uppercase tracking-widest">Introductory Presentation Video link (YouTube)</label>
                <input 
                  type="text" 
                  value={editedApplicant.videoUrl}
                  onChange={(e) => setEditedApplicant({...editedApplicant, videoUrl: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-505/20 transition-all font-mono"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-white rounded-xl object-cover border border-slate-200 shadow-sm overflow-hidden shrink-0">
                  <img 
                    src={editedApplicant.avatarUrl} 
                    alt="Current upload preview"
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=260';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800">Tutor Portrait File Preview</h4>
                  <p className="text-[10px] text-slate-500 leading-snug">
                    This represents the candidate's real profile photo uploaded through the recruitment portal. It will represent them on the interactive parent checkout dashboard.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-405 uppercase tracking-widest">Portrait Picture URL (Override if needed)</label>
                <input 
                  type="text" 
                  value={editedApplicant.avatarUrl}
                  onChange={(e) => setEditedApplicant({...editedApplicant, avatarUrl: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[10px] focus:ring-1 focus:ring-indigo-500 font-mono text-slate-500"
                />
              </div>

              {/* Action Buttons in footer inside form for perfect overflow handling */}
              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setReviewingApplicant(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-indigo-650 hover:bg-indigo-750 text-white font-bold py-3 px-5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin text-white" size={15} />
                      Publishing Registry Record...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      Approve & Post to Live Trial Bookings!
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
