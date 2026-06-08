import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  TrendingUp, 
  Plus, 
  Loader2, 
  BookOpen, 
  Smile, 
  Clock 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { subscribeToStudentProgress } from '../../services/dataService';
import { cn } from '../../lib/utils';

export default function TutorStudents() {
  const { user } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    const targetTutorId = user.tutorId || user.uid;

    const unsubscribe = subscribeToStudentProgress(targetTutorId, (data) => {
      setStudents(data);
      setLoading(false);
    }, () => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredStudents = students.filter(s => 
    (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.plan || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-950 tracking-tight font-sans">Assigned Student Cohort</h1>
            <p className="text-slate-400 text-sm mt-1">Review student proficiency levels, plan metrics, weekly progress arrays, and schedule patterns.</p>
          </div>
        </div>

        {/* Search Input bar */}
        <div className="relative">
          <input 
            type="text"
            placeholder="Search cohort..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 pl-9 text-xs focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none w-full md:w-64 transition-focus-within shadow-2xs"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </header>

      {loading ? (
        <div className="h-[40vh] flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="animate-spin text-secondary" size={32} />
          <p className="text-sm font-medium">Syncing roster metrics...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="tutor-students-list">
          {filteredStudents.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-150 shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-600 font-sans">
                      {s.name ? s.name[0] : 'S'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 leading-tight">{s.name}</h4>
                      <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">{s.plan || 'Standard'} Plan</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider",
                    s.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  )}>
                    {s.status || 'Active'}
                  </span>
                </div>

                {s.schedulePattern && (
                  <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100 space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Class Schedule Pattern</span>
                    <span className="text-[10px] text-slate-600 font-semibold">{s.schedulePattern}</span>
                  </div>
                )}

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                    <span>Curriculum Level {s.level || '1'} Progress</span>
                    <span>{s.progress || 0}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900 rounded-full transition-all duration-1000" 
                      style={{ width: `${s.progress || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <Smile size={12} className="text-indigo-400" />
                  <span>Level {s.level || '1'} Recommended</span>
                </div>
                <div>ID: {s.id.slice(0, 5).toUpperCase()}</div>
              </div>
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400 text-xs italic font-medium bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              No assigned student documents matched your query criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
