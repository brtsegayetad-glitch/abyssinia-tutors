import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Users, 
  BookOpen,
  DollarSign
} from 'lucide-react';
import { 
  subscribeToAllSessions, 
  subscribeToTutors, 
  subscribeToAllStudents,
  subscribeToSettings
} from '../../services/dataService';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '../../lib/utils';

export default function AdminReports() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [tutors, setTutors] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState<any>({
    standardPrice: 160,
    proPrice: 240,
    masteryPrice: 320
  });

  useEffect(() => {
    let sessionsLoaded = false;
    let tutorsLoaded = false;
    let studentsLoaded = false;

    const checkLoading = () => {
      if (sessionsLoaded && tutorsLoaded && studentsLoaded) {
        setLoading(false);
      }
    };

    const unsubSessions = subscribeToAllSessions((data) => {
      setSessions(data);
      sessionsLoaded = true;
      checkLoading();
    }, () => {
      sessionsLoaded = true;
      checkLoading();
    });

    const unsubTutors = subscribeToTutors((data) => {
      setTutors(data);
      tutorsLoaded = true;
      checkLoading();
    }, () => {
      tutorsLoaded = true;
      checkLoading();
    });

    const unsubStudents = subscribeToAllStudents((data) => {
      setStudents(data);
      studentsLoaded = true;
      checkLoading();
    }, () => {
      studentsLoaded = true;
      checkLoading();
    });

    const unsubSettings = subscribeToSettings((data) => {
      if (data) {
        setSettings(data);
      }
    });

    return () => {
      unsubSessions();
      unsubTutors();
      unsubStudents();
      unsubSettings();
    };
  }, []);

  // Compute analytics
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  const scheduledSessions = sessions.filter(s => s.status === 'scheduled').length;
  
  // Real-time attendance ratio (completed vs total)
  const attendanceRatio = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 100;

  // Active student plan values
  const totalRevenue = students.reduce((sum, s) => {
    if (!s.plan) return sum;
    const planKey = s.plan.toLowerCase();
    let price = settings.standardPrice;
    if (planKey === 'pro') price = settings.proPrice;
    if (planKey === 'mastery') price = settings.masteryPrice;
    return sum + price;
  }, 0);

  // Analyze volume trend by week (or compile pseudo real timestamps from raw documents)
  // Let's bucket sessions in days of week or status
  const volumeData = [
    { name: 'Mon', completed: 0, scheduled: 0 },
    { name: 'Tue', completed: 0, scheduled: 0 },
    { name: 'Wed', completed: 0, scheduled: 0 },
    { name: 'Thu', completed: 0, scheduled: 0 },
    { name: 'Fri', completed: 0, scheduled: 0 },
    { name: 'Sat', completed: 0, scheduled: 0 },
    { name: 'Sun', completed: 0, scheduled: 0 },
  ];

  sessions.forEach(session => {
    if (!session.startTime) return;
    const date = session.startTime.toDate ? session.startTime.toDate() : new Date(session.startTime);
    const dayIndex = (date.getDay() + 6) % 7; // Adjust Sunday index
    const dayBucket = volumeData[dayIndex];
    if (dayBucket) {
      if (session.status === 'completed') {
        dayBucket.completed += 1;
      } else {
        dayBucket.scheduled += 1;
      }
    }
  });

  // Split active students plans into revenue structure for Area / Pie Chart
  const planBreakdown = [
    { name: 'Heritage Standard', value: students.filter(s => s.plan?.toLowerCase() === 'standard').length, price: settings.standardPrice, color: '#10b981' },
    { name: 'Heritage Pro', value: students.filter(s => s.plan?.toLowerCase() === 'pro').length, price: settings.proPrice, color: '#1e293b' },
    { name: 'Heritage Mastery', value: students.filter(s => s.plan?.toLowerCase() === 'mastery').length, price: settings.masteryPrice, color: '#6366f1' },
  ];

  const revenueBreakdownData = planBreakdown.map(b => ({
    name: b.name,
    subscribers: b.value,
    revenue: b.value * b.price
  }));

  // Compiling active enrollment counts per tutor
  const tutorPerformance = tutors.map(tutor => {
    const activePupils = students.filter(s => s.tutorId === tutor.id).length;
    const assignedSessions = sessions.filter(s => s.tutorId === tutor.id);
    const doneCount = assignedSessions.filter(s => s.status === 'completed').length;
    
    return {
      id: tutor.id,
      name: tutor.displayName || tutor.email || 'Heritage Expert',
      expertise: tutor.expertise || 'General Instruction',
      activeStudents: activePupils,
      completedClasses: doneCount,
      totalAssigned: assignedSessions.length
    };
  }).sort((a, b) => b.activeStudents - a.activeStudents);

  const COLORS = ['#10b981', '#1e293b', '#6366f1'];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 font-sans">Performance & Analytics Reports</h1>
          <p className="text-sm text-slate-400 mt-1">
            Auditing educational metrics, attendance indexes, and active tutor loads derived in real-time.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          <p className="text-xs text-slate-400 font-medium">Computing historical data metrics...</p>
        </div>
      ) : (
        <>
          {/* Metrics Card Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Metric 1: Attendance ratio */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150/80 shadow-xs space-y-3 text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendance Ratio</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-slate-900 leading-none">{attendanceRatio}%</span>
                <span className="text-xs text-slate-400 font-semibold">completed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-150 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${attendanceRatio}%` }}
                ></div>
              </div>
              <p className="text-[9px] text-slate-400 font-medium">Attendance performance benchmark</p>
            </div>

            {/* Metric 2: Completed count */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150/80 shadow-xs text-left flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed Classes</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-slate-940 leading-none">{completedSessions}</span>
                  <span className="text-xs text-slate-400 font-medium">sessions</span>
                </div>
                <p className="text-[9px] text-slate-400 font-medium leading-relaxed">Verified study-hours logged</p>
              </div>
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center border border-emerald-100">
                <CheckCircle2 size={18} />
              </div>
            </div>

            {/* Metric 3: Scheduled upcoming */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150/80 shadow-xs text-left flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scheduled Classes</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-indigo-600 leading-none">{scheduledSessions}</span>
                  <span className="text-xs text-slate-400 font-medium">upcoming</span>
                </div>
                <p className="text-[9px] text-slate-400 font-medium leading-relaxed">Booked slots on calendar</p>
              </div>
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center border border-indigo-100">
                <Clock size={18} />
              </div>
            </div>

            {/* Metric 4: Projected billing */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150/80 shadow-xs text-left flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Billing Inflow</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-slate-900 leading-none">${totalRevenue.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 font-medium">/mo</span>
                </div>
                <p className="text-[9px] text-slate-400 font-medium leading-relaxed">Active roster projection values</p>
              </div>
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center border border-amber-100">
                <TrendingUp size={18} />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Chart Block 1: Volume Trend */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs text-left space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Weekly Class Volume</h3>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Session logs bucketed chronologically across days of weekly calendar</p>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[4, 4, 0, 0]} barSize={14} />
                    <Bar dataKey="scheduled" name="Scheduled" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart Block 2: Revenue breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs text-left space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Monthly Revenue Distribution</h3>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Plan values aggregated from current active subscriptions</p>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueBreakdownData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e293b" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Area type="monotone" dataKey="revenue" name="Monthly Projected ($)" stroke="#1e293b" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Table Block: Tutors Performance Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-150 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between text-left">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tutor Loads & Class Analytics</h3>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Aggregated teaching logs and concurrent student loads</p>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                {tutors.length} Experts Registry
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                    <th className="px-6 py-4">Tutor Details</th>
                    <th className="px-6 py-4">Syllabus Focus</th>
                    <th className="px-6 py-4 text-center">Active Pupils</th>
                    <th className="px-6 py-4 text-center">Total Assigned Sessions</th>
                    <th className="px-6 py-4 text-center">Completed Work-hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {tutorPerformance.map((tutor) => (
                    <tr key={tutor.id} className="hover:bg-slate-50/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                            {tutor.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 leading-none">{tutor.name}</p>
                            <p className="text-[10px] text-slate-400 mt-1 font-medium">Tutor ID: {tutor.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 border border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                          {tutor.expertise}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-bold text-slate-800">
                        {tutor.activeStudents}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs text-slate-600 font-semibold">
                        {tutor.totalAssigned} classes
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-xs text-emerald-600 font-bold">
                        {tutor.completedClasses} Done
                      </td>
                    </tr>
                  ))}

                  {tutorPerformance.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-xs italic">
                        No tutors loaded found in systems database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-3.5 bg-slate-50/50 border-t border-slate-100 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                ✔ Educational ledger reconciled in real time
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
