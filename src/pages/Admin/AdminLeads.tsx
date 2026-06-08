import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  UserPlus,
  Loader2,
  MessageSquare,
  Calendar,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { subscribeToLeads, subscribeToTutors } from '../../services/dataService';
import SchedulingModal from '../../components/Admin/SchedulingModal';

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Scheduling Modal State
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [viewingReport, setViewingReport] = useState<any>(null);

  useEffect(() => {
    let leadsLoaded = false;
    let tutorsLoaded = false;

    const checkLoading = () => {
      if (leadsLoaded && tutorsLoaded) {
        setLoading(false);
      }
    };

    const unsubscribeLeads = subscribeToLeads(
      (data) => {
        setLeads(data);
        leadsLoaded = true;
        checkLoading();
      },
      () => {
        leadsLoaded = true;
        checkLoading();
      }
    );

    const unsubscribeTutors = subscribeToTutors(
      (data) => {
        setTutors(data);
        tutorsLoaded = true;
        checkLoading();
      },
      () => {
        tutorsLoaded = true;
        checkLoading();
      }
    );

    return () => {
      unsubscribeLeads();
      unsubscribeTutors();
    };
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'all' || lead.status === filter;
    const matchesSearch = lead.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lead.childName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="animate-spin text-secondary" size={32} />
        <p className="text-sm font-medium">Loading lead infrastructure...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1 tracking-tight">Lead Pipeline</h1>
          <p className="text-slate-500 text-sm">Managing enrollment process from interest to conversion.</p>
        </div>
        <button className="btn-primary text-xs py-2 px-4 shadow-none">
          <UserPlus size={16} />
          Create New Lead
        </button>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', count: leads.length, color: 'text-primary' },
          { label: 'Recent Trials', count: leads.filter(l => l.status === 'scheduled').length, color: 'text-secondary' },
          { label: 'New Today', count: leads.filter(l => l.status === 'new').length, color: 'text-accent' },
          { label: 'Conv. Rate', count: '42%', color: 'text-emerald-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</span>
            <span className={cn("text-2xl font-bold tracking-tight", s.color)}>{s.count}</span>
          </div>
        ))}
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex gap-1 p-1 bg-slate-50 rounded-lg w-full md:w-fit overflow-x-auto">
          {['all', 'new', 'trial_pending', 'scheduled', 'trial_completed', 'converted'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-md text-[10px] font-bold capitalize transition-all uppercase tracking-widest whitespace-nowrap",
                filter === f ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>
        
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full md:w-72 focus-within:ring-2 focus-within:ring-primary/5 focus-within:border-primary">
          <Search size={14} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search leads..." 
            className="bg-transparent border-none focus:outline-none text-xs w-full text-slate-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="data-table">
            <thead>
              <tr>
                <th>Parent & Child</th>
                <th>Channel</th>
                <th>Goal</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                          {lead.parentName?.[0] || 'U'}{lead.parentName?.split(' ')[1]?.[0] || ''}
                       </div>
                       <div>
                        <p className="font-semibold text-slate-900 leading-tight">{lead.parentName}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{lead.childName} ({lead.childAge}) • {lead.country || lead.timezone}</p>
                        {lead.children && Array.isArray(lead.children) && (
                          <div className="flex flex-wrap gap-1 mt-1.5 max-w-sm">
                            {lead.children.map((c: any, ci: number) => (
                              <span key={ci} className="bg-slate-50 text-[9px] font-semibold text-slate-600 px-2 py-0.5 rounded border border-slate-100 flex items-center gap-1">
                                👦 {c.name} ({c.age} yrs): <span className="text-primary font-bold">{(c.subjects || []).join(' & ')}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-md flex items-center justify-center">
                        <MessageSquare size={12} />
                      </div>
                      <span className="text-[10px] font-medium text-slate-600 tracking-tight">{lead.whatsapp || lead.phone || 'N/A'}</span>
                    </div>
                  </td>
                  <td>
                    <p className="text-[11px] text-slate-500 max-w-xs truncate font-medium" title={lead.learningGoal || lead.targetCourse}>{lead.learningGoal || lead.targetCourse}</p>
                  </td>
                  <td>
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider",
                      (lead.status === 'new' || !lead.status) && "bg-amber-100 text-amber-700",
                      (lead.status === 'trial_pending' || lead.status === 'TRIAL PENDING') && "bg-amber-100 text-amber-700 border border-amber-300/40 font-extrabold",
                      lead.status === 'contacted' && "bg-blue-100 text-blue-700",
                      lead.status === 'scheduled' && "bg-purple-100 text-purple-700",
                      lead.status === 'trial_completed' && "bg-slate-100 text-slate-600",
                      lead.status === 'converted' && "bg-emerald-100 text-emerald-700"
                    )}>
                      {(lead.status || 'new').replace('_', ' ')}
                    </span>
                  </td>
                  <td className="text-right">
                     <div className="flex justify-end gap-2">
                       {(lead.status === 'new' || !lead.status || lead.status === 'trial_pending' || lead.status === 'TRIAL PENDING') && (
                         <button 
                           onClick={() => setSelectedLead(lead)}
                           className="bg-primary/5 text-primary hover:bg-primary hover:text-white px-2 py-1 rounded text-[9px] font-bold uppercase transition-all cursor-pointer"
                         >
                            Assign Tutor
                         </button>
                       )}
                       {lead.status === 'trial_completed' && (
                         <button 
                           onClick={() => setViewingReport(lead)}
                           className="bg-secondary/10 text-secondary hover:bg-secondary hover:text-white px-2 py-1 rounded text-[9px] font-bold uppercase transition-all"
                         >
                            View Report
                         </button>
                       )}
                       <button className="text-slate-300 hover:text-primary p-1">
                          <MoreHorizontal size={16} />
                       </button>
                     </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-slate-400 text-xs italic font-medium">No results found for your search/filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scheduling Modal */}
      {selectedLead && (
        <SchedulingModal 
          lead={selectedLead} 
          tutors={tutors} 
          onClose={() => setSelectedLead(null)} 
        />
      )}

      {/* Trial Report Modal */}
      {viewingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden">
              <div className="p-8 bg-slate-900 text-white flex justify-between items-start">
                 <div>
                    <div className="flex items-center gap-2 mb-2">
                       <CheckCircle2 size={16} className="text-secondary" />
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Post-Trial Report</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">Lead: {viewingReport.childName}</h3>
                    <p className="text-slate-400 text-xs mt-1">Parent: {viewingReport.parentName} • Level {viewingReport.recommendedLevel || 'TBD'}</p>
                 </div>
                 <button onClick={() => setViewingReport(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={20} />
                 </button>
              </div>

              <div className="p-10 space-y-8">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tutor Evaluation</h4>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm text-slate-600 italic leading-relaxed">
                       "{viewingReport.evaluation || 'No evaluation logic found. Please check manual tutor logs.'}"
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="p-5 bg-white border border-slate-100 rounded-2xl">
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Recommended Level</p>
                       <p className="text-lg font-bold text-slate-900">Level {viewingReport.recommendedLevel || 'Assessment Done'}</p>
                    </div>
                    <div className="p-5 bg-white border border-slate-100 rounded-2xl">
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                       <p className="text-lg font-bold text-emerald-600 uppercase">Ready to Enroll</p>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-slate-100 flex gap-4">
                    <button 
                      onClick={() => {
                        setViewingReport(null);
                        // Maybe trigger enrollment follow-up
                      }}
                      className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                    >
                       Contact Parent
                    </button>
                    <button 
                      onClick={() => setViewingReport(null)}
                      className="px-8 py-4 bg-slate-50 text-slate-400 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                    >
                       Close
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
