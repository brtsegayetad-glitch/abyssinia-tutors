import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Users, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { subscribeToSessions } from '../../services/dataService';
import { cn } from '../../lib/utils';

export default function TutorCalendar() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Calendar Year/Month State
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    const targetTutorId = user.tutorId || user.uid;

    const unsubscribe = subscribeToSessions('tutor', targetTutorId, (data) => {
      setSessions(data);
      setLoading(false);
    }, () => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Calendar Grid math
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // Sunday=0, Monday=1...

  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  const tempDays: { day: number; isCurrentMonth: boolean; date: Date }[] = [];

  // Add previous month filler days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const year = currentMonth === 0 ? currentYear - 1 : currentYear;
    const month = currentMonth === 0 ? 11 : currentMonth - 1;
    tempDays.push({
      day: d,
      isCurrentMonth: false,
      date: new Date(year, month, d)
    });
  }

  // Add current month days
  for (let i = 1; i <= daysInMonth; i++) {
    tempDays.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(currentYear, currentMonth, i)
    });
  }

  // Next month filler days to complete grid cells (7 column rows)
  const remainingCells = 42 - tempDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    const year = currentMonth === 11 ? currentYear + 1 : currentYear;
    const month = currentMonth === 11 ? 0 : currentMonth + 1;
    tempDays.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(year, month, i)
    });
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Safe Date parsing helper
  const parseSafeDate = (val: any): Date | null => {
    if (!val) return null;
    if (val.toDate && typeof val.toDate === 'function') return val.toDate();
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d;
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
            <CalendarIcon size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-950 tracking-tight font-sans">Monthly Grid Classroom</h1>
            <p className="text-slate-400 text-sm mt-1">Cross-check all schedule slot vectors, live regular periods, and trial evaluations.</p>
          </div>
        </div>

        {/* Date Selector Header Controls */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-150 shadow-sm">
          <button 
            onClick={prevMonth} 
            className="p-2 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-bold text-slate-800 px-3 uppercase tracking-wider select-none font-sans">
            {monthName} {currentYear}
          </span>
          <button 
            onClick={nextMonth} 
            className="p-2 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </header>

      {loading ? (
        <div className="h-[50vh] flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="animate-spin text-secondary" size={32} />
          <p className="text-sm font-medium">Syncing school session parameters...</p>
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-slate-150 shadow-sm overflow-hidden" id="tutor-calendar-view">
          {/* Days of week row */}
          <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-150 py-3 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <span key={day} className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-sans">
                {day}
              </span>
            ))}
          </div>

          {/* Calendar Grid cells */}
          <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 bg-slate-100/20">
            {tempDays.map((cell, idx) => {
              const cellDateStr = cell.date.toDateString();
              
              // Find matching sessions on this cell's physical date
              const daySessions = sessions.filter(s => {
                const sDate = parseSafeDate(s.startTime);
                return sDate ? sDate.toDateString() === cellDateStr : false;
              });

              const isToday = cell.date.toDateString() === new Date().toDateString();

              return (
                <div 
                  key={idx} 
                  className={cn(
                    "min-h-[120px] p-2 flex flex-col justify-between transition-all bg-white relative",
                    !cell.isCurrentMonth && "bg-slate-50/50 text-slate-350",
                    isToday && "ring-2 ring-inset ring-secondary/50 bg-secondary/5"
                  )}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn(
                      "text-xs font-bold font-mono px-1.5 py-0.5 rounded-md",
                      isToday ? "bg-secondary text-white font-extrabold" : "text-slate-600"
                    )}>
                      {cell.day}
                    </span>
                    {daySessions.length > 0 && cell.isCurrentMonth && (
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                        {daySessions.length} {daySessions.length === 1 ? 'class' : 'classes'}
                      </span>
                    )}
                  </div>

                  {/* Sessions entries inside cell */}
                  <div className="flex-1 space-y-1 overflow-y-auto max-h-[85px] mt-1 pr-1">
                    {cell.isCurrentMonth && daySessions.map((s, sIdx) => {
                      const sDate = parseSafeDate(s.startTime);
                      const timeStr = sDate ? sDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '00:00';
                      
                      return (
                        <div 
                          key={sIdx} 
                          title={`${s.studentName} at ${timeStr}`}
                          className={cn(
                            "p-1.5 rounded-lg border text-[10px] leading-tight space-y-0.5 font-sans shadow-2xs hover:scale-[1.02] transition-transform",
                            s.type === 'trial' 
                              ? "bg-orange-50/80 border-orange-100 text-orange-850" 
                              : "bg-indigo-50/80 border-indigo-10 border-indigo-100 text-indigo-950",
                            s.status === 'completed' && "bg-emerald-50 border-emerald-100 text-emerald-900"
                          )}
                        >
                          <div className="flex items-center gap-1 font-bold truncate">
                            <Users size={10} className="shrink-0 text-slate-400" />
                            <span className="truncate">{s.studentName}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[9px] font-mono text-slate-550 truncate">
                            <Clock size={10} className="shrink-0" />
                            <span>{timeStr}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
