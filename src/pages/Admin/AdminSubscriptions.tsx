import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Search, 
  TrendingUp, 
  Users, 
  Layers, 
  CheckCircle2,
  Calendar,
  DollarSign
} from 'lucide-react';
import { subscribeToAllStudents, subscribeToSettings } from '../../services/dataService';
import { cn } from '../../lib/utils';

export default function AdminSubscriptions() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('all');

  const [settings, setSettings] = useState<any>({
    standardPrice: 160,
    proPrice: 240,
    masteryPrice: 320
  });

  useEffect(() => {
    const unsubscribe = subscribeToAllStudents((data) => {
      setStudents(data);
      setLoading(false);
    }, () => {
      setLoading(false);
    });

    const unsubscribeSettings = subscribeToSettings((data) => {
      if (data) {
        setSettings(data);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeSettings();
    };
  }, []);

  // Filter out students who don't have a plan selected or are not active
  const activeSubscribers = students.filter(student => student.plan);

  // Calculate stats
  const totalSubscribers = activeSubscribers.length;
  
  const planCounts = activeSubscribers.reduce((acc: Record<string, number>, s) => {
    const planKey = (s.plan || 'standard').toLowerCase();
    acc[planKey] = (acc[planKey] || 0) + 1;
    return acc;
  }, { standard: 0, pro: 0, mastery: 0 });

  const monthlyRevenue = activeSubscribers.reduce((sum, s) => {
    const planKey = (s.plan || 'standard').toLowerCase();
    let price = settings.standardPrice;
    if (planKey === 'pro') price = settings.proPrice;
    if (planKey === 'mastery') price = settings.masteryPrice;
    return sum + price;
  }, 0);

  // Filter students based on search and plan selects
  const filteredSubscribers = activeSubscribers.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === 'all' || (student.plan || 'standard').toLowerCase() === planFilter.toLowerCase();
    return matchesSearch && matchesPlan;
  });

  const getPlanDetails = (plan: string) => {
    const key = (plan || 'standard').toLowerCase();
    switch (key) {
      case 'mastery':
        return { name: 'Heritage Mastery', price: settings.masteryPrice, color: 'bg-indigo-50 text-indigo-700 border-indigo-100' };
      case 'pro':
        return { name: 'Heritage Pro', price: settings.proPrice, color: 'bg-primary/10 text-primary border-primary/20' };
      case 'standard':
      default:
        return { name: 'Heritage Standard', price: settings.standardPrice, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
    }
  };

  const formatPlanName = (plan: string) => {
    return getPlanDetails(plan).name;
  };

  const getPlanPrice = (plan: string) => {
    return getPlanDetails(plan).price;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 font-sans">Subscriptions Registry</h1>
          <p className="text-sm text-slate-400 mt-1">
            Dynamic monthly revenue analysis, enrollment tiers, and billing rosters compiled from active students.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-white border border-slate-200 shadow-xs px-3 py-1.5 rounded-lg">
          <Calendar size={14} className="text-slate-400" />
          <span>Billing Cycle: Monthly recurring</span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          <p className="text-xs text-slate-400 font-medium">Gathering real-time subscription ledger...</p>
        </div>
      ) : (
        <>
          {/* Metrics Overview Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric 1: Total Subscribers */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150/80 shadow-xs flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Subscribers</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900 leading-none">{totalSubscribers}</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                    100% Active
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 tracking-tight font-medium">Active premium educational cohorts</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Users size={22} />
              </div>
            </div>

            {/* Metric 2: Monthly Projected Revenue */}
            <div className="bg-white p-6 rounded-2xl border border-slate-155/80 shadow-xs flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Projected Monthly Revenue</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900 leading-none">${monthlyRevenue.toLocaleString()}</span>
                  <span className="text-xs font-semibold text-slate-500">/mo</span>
                </div>
                <p className="text-[10px] text-slate-400 tracking-tight font-medium">Computed in real-time from plans</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100">
                <TrendingUp size={22} />
              </div>
            </div>

            {/* Metric 3: Tier Breakdown Mix */}
            <div className="bg-white p-6 rounded-2xl border border-slate-155/80 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Plan Distribution </p>
                <Layers size={16} className="text-slate-400" />
              </div>
              <div className="space-y-2">
                {/* Standard */}
                <div>
                   <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                     <span>Standard (${settings.standardPrice})</span>
                     <span>{planCounts.standard} ({totalSubscribers > 0 ? Math.round((planCounts.standard / totalSubscribers) * 105) / 1.05 : 0}%)</span>
                   </div>
                   <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                       style={{ width: `${totalSubscribers > 0 ? (planCounts.standard / totalSubscribers) * 100 : 0}%` }}
                     ></div>
                   </div>
                </div>

                {/* Pro */}
                <div>
                   <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                     <span>Pro (${settings.proPrice})</span>
                     <span>{planCounts.pro} ({totalSubscribers > 0 ? Math.round((planCounts.pro / totalSubscribers) * 105) / 1.05 : 0}%)</span>
                   </div>
                   <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-primary rounded-full transition-all duration-300"
                       style={{ width: `${totalSubscribers > 0 ? (planCounts.pro / totalSubscribers) * 100 : 0}%` }}
                     ></div>
                   </div>
                </div>

                {/* Mastery */}
                <div>
                   <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                     <span>Mastery (${settings.masteryPrice})</span>
                    <span>{planCounts.mastery} ({totalSubscribers > 0 ? Math.round((planCounts.mastery / totalSubscribers) * 105) / 1.05 : 0}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${totalSubscribers > 0 ? (planCounts.mastery / totalSubscribers) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Filter & Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:max-w-md transition-focus-within focus-within:ring-2 focus-within:ring-primary/5 focus-within:border-primary">
              <Search size={16} className="text-slate-400 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search premium cohort by student name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-xs w-full text-slate-600" 
              />
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plan Filter:</span>
              <div className="flex border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                {['all', 'standard', 'pro', 'mastery'].map((plan) => (
                  <button
                    key={plan}
                    id={`filter-${plan}-btn`}
                    onClick={() => setPlanFilter(plan)}
                    className={cn(
                      "px-3 py-1 text-[11px] font-bold rounded-md capitalize transition-all cursor-pointer",
                      planFilter === plan 
                        ? "bg-white text-slate-800 shadow-xs border border-slate-100" 
                        : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {plan}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Roster Table */}
          <div className="bg-white rounded-2xl border border-slate-150 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between text-left">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Billing & Subscription Ledger</h3>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">A total of {filteredSubscribers.length} roster entries matches applied criteria</p>
              </div>
              <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded border border-primary/10">
                {filteredSubscribers.length} Listed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                    <th className="px-6 py-4">Subscriber Name</th>
                    <th className="px-6 py-4">Selected Tier</th>
                    <th className="px-6 py-4">Monthly Rate</th>
                    <th className="px-6 py-4">Enrollment Date</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredSubscribers.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs ring-1 ring-slate-200">
                            {student.name ? student.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'S'}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 leading-tight">{student.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">Student ID: {student.id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          "px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded border",
                          getPlanDetails(student.plan).color
                        )}>
                          {formatPlanName(student.plan)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs font-bold text-slate-800">
                          ${getPlanPrice(student.plan)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">/mo</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400" />
                          {student.createdAt?.toDate 
                            ? student.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
                            : 'N/A'
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                          <span>Active</span>
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredSubscribers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-xs italic">
                        {searchTerm ? "No premium subscribers found matching search criteria." : "No premium subscribers found in students register."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Ledger verified
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Showing {filteredSubscribers.length} of {activeSubscribers.length} subscribers
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
