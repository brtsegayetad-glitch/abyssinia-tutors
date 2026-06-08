import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { scheduleTrial } from '../../services/dataService';

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

function utcSlotToLocal(dayName: string, slotTime: any): { day: string; slot: string } {
  const dayIndex = DAYS_ORDER.indexOf(dayName.toLowerCase());
  const str = getSlotTimeString(slotTime);
  if (dayIndex === -1 || !str.includes(':')) return { day: dayName, slot: str || '09:00' };
  
  const now = new Date();
  const currentUTCDay = now.getUTCDay();
  const diff = dayIndex - currentUTCDay;
  const targetDate = new Date(now);
  targetDate.setDate(now.getUTCDate() + diff);
  
  const [h, m] = str.split(':').map(Number);
  targetDate.setUTCHours(h, m, 0, 0);
  
  const localDayIndex = targetDate.getDay();
  const localDayName = DAYS_ORDER[localDayIndex];
  
  const localH = String(targetDate.getHours()).padStart(2, '0');
  const localM = String(targetDate.getMinutes()).padStart(2, '0');
  
  return { day: localDayName, slot: `${localH}:${localM}` };
}

function getLocalAvailability(utcAvail: any): any {
  if (!utcAvail) return null;
  
  const localAvail: any = {
    monday: { active: false, slots: [] },
    tuesday: { active: false, slots: [] },
    wednesday: { active: false, slots: [] },
    thursday: { active: false, slots: [] },
    friday: { active: false, slots: [] },
    saturday: { active: false, slots: [] },
    sunday: { active: false, slots: [] },
  };
  
  Object.entries(utcAvail).forEach(([day, dayData]: [string, any]) => {
    if (!dayData?.slots) return;
    dayData.slots.forEach((slot: string) => {
      const local = utcSlotToLocal(day, slot);
      const target = localAvail[local.day];
      if (target && !target.slots.includes(local.slot)) {
        target.slots.push(local.slot);
      }
    });
  });
  
  // Sort slots chronologically and mark active if slots present
  Object.keys(localAvail).forEach((day) => {
    localAvail[day].slots.sort();
    localAvail[day].active = localAvail[day].slots.length > 0;
  });
  
  return localAvail;
}

interface SchedulingModalProps {
  lead: any;
  tutors: any[];
  onClose: () => void;
}

export default function SchedulingModal({ lead, tutors, onClose }: SchedulingModalProps) {
  const [selectedTutorId, setSelectedTutorId] = useState('');
  const [trialTime, setTrialTime] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [schedulingStatus, setSchedulingStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const getSelectedDayAndHour = (timeVal: string) => {
    if (!timeVal) return null;
    try {
      const dt = new Date(timeVal);
      if (isNaN(dt.getTime())) return null;
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const dayName = days[dt.getDay()];
      const hourVal = `${String(dt.getHours()).padStart(2, '0')}:00`;
      return { dayName, hourVal };
    } catch {
      return null;
    }
  };

  const selectedInfo = getSelectedDayAndHour(trialTime);

  const sortedTutors = [...tutors].sort((a, b) => {
    if (!selectedInfo) return 0;
    const aAvailData = getLocalAvailability(a.availability);
    const bAvailData = getLocalAvailability(b.availability);
    const aAvail = !!aAvailData?.[selectedInfo.dayName]?.slots?.includes(selectedInfo.hourVal);
    const bAvail = !!bAvailData?.[selectedInfo.dayName]?.slots?.includes(selectedInfo.hourVal);
    if (aAvail && !bAvail) return -1;
    if (!aAvail && bAvail) return 1;
    return 0;
  });

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead || !selectedTutorId || !trialTime) return;

    setIsScheduling(true);
    setSchedulingStatus('idle');

    const tutor = tutors.find(t => t.id === selectedTutorId);
    if (!tutor) return;

    const result = await scheduleTrial(
      lead.id,
      { id: tutor.id, name: tutor.displayName || tutor.email, email: tutor.email },
      new Date(trialTime),
      lead
    );

    if (result.success) {
      setSchedulingStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setSchedulingStatus('error');
    }
    setIsScheduling(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg leading-tight">Schedule Trial Session</h3>
            <p className="text-slate-400 text-xs mt-1">Assigning {lead.childName}'s first session</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleScheduleSubmit} className="p-6 space-y-5">
          {schedulingStatus === 'success' ? (
            <div className="py-10 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Trial Scheduled!</h4>
                <p className="text-sm text-slate-500">Emails dispatched to parent and tutor.</p>
              </div>
            </div>
          ) : schedulingStatus === 'error' ? (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 flex gap-3 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <p>Failed to schedule trial. Please try again or check logs.</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Heritage Tutor</label>
                  {tutors.length === 0 && (
                     <Link to="/admin/tutors" className="text-[10px] text-primary hover:underline font-bold flex items-center gap-1">
                        <Plus size={10} /> Add Tutor First
                     </Link>
                  )}
                </div>
                <select 
                  required
                  value={selectedTutorId}
                  onChange={(e) => setSelectedTutorId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                >
                  <option value="">{tutors.length === 0 ? "No tutors onboarded yet..." : "Choose a tutor..."}</option>
                  {sortedTutors.map(t => {
                    const localAvail = getLocalAvailability(t.availability);
                    const isAvailable = selectedInfo && localAvail?.[selectedInfo.dayName]?.active && localAvail?.[selectedInfo.dayName]?.slots?.includes(selectedInfo.hourVal);
                    return (
                      <option key={t.id} value={t.id}>
                        {t.displayName || t.email} {selectedInfo ? (isAvailable ? " (✅ Available Match)" : " (❌ Selected Time Conflict)") : ""}
                      </option>
                    );
                  })}
                </select>
                {tutors.length === 0 && (
                   <p className="text-[10px] text-orange-500 font-medium">You need to add at least one tutor in the "Tutors" section before assigning sessions.</p>
                )}
                {/* Tutor Availability Showroom */}
                {selectedTutorId && (() => {
                  const tutor = tutors.find(t => t.id === selectedTutorId);
                  if (!tutor) return null;
                  const avail = getLocalAvailability(tutor.availability);
                  if (!avail) {
                    return (
                      <p className="text-[9px] text-slate-400 italic mt-1.5">* No structured weekly availability map has been saved by this tutor yet.</p>
                    );
                  }
                  const activeEntries = Object.entries(avail).filter(([_, data]: [string, any]) => data && data.active && data.slots?.length > 0);
                  if (activeEntries.length === 0) {
                    return (
                      <p className="text-[9px] text-amber-600 font-semibold italic mt-1.5">⚠️ Selected tutor is currently marked as fully unavailable in their Checkbox Grid.</p>
                    );
                  }
                  return (
                    <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 space-y-1.5 animate-in fade-in duration-150 mt-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Checked Weekly Hours:</span>
                      <div className="space-y-1 max-h-[105px] overflow-y-auto">
                        {activeEntries.map(([day, data]: [string, any]) => (
                          <div key={day} className="flex justify-between text-[10px]">
                            <span className="capitalize font-bold text-slate-705">{day.substring(0, 3)}:</span>
                            <span className="font-semibold text-slate-600 max-w-[180px] truncate text-right">
                              {data.slots.map((s: any) => {
                                const str = getSlotTimeString(s);
                                const h = parseInt(str.split(':')[0] || '9');
                                return h >= 12 ? `${h === 12 ? 12 : h - 12}:00 PM` : `${h}:00 AM`;
                              }).join(', ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl space-y-4">
                  <div className="flex items-center gap-2 text-amber-800">
                    <Calendar size={14} className="shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Parent's Preferences</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { label: 'Option 1 (Gold)', time: lead.preferredTime },
                      { label: 'Option 2 (Silver)', time: lead.preferredTime2 },
                      { label: 'Option 3 (Bronze)', time: lead.preferredTime3 }
                    ].map((opt, i) => opt.time && (
                      <div key={i} className="flex items-center justify-between bg-white/60 p-2 rounded-lg border border-amber-200/50">
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold text-amber-600 uppercase">{opt.label}</span>
                          <span className="text-xs font-bold text-slate-800">{opt.time}</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => {
                            // Note: We'd ideally parse the string if it were a date, 
                            // but for now we just show it so Admin can type it below.
                            // If it's just a text string, the date input might not accept it directly.
                          }}
                          className="text-[9px] font-bold text-primary hover:underline px-2"
                        >
                          Reference
                        </button>
                      </div>
                    ))}
                    {!lead.preferredTime && <p className="text-[10px] italic text-amber-600">No specific preferences provided.</p>}
                  </div>
                  <p className="text-[10px] text-amber-700 leading-tight">
                    <strong>Note:</strong> Select a definitive date/time below based on these options and your tutor's availability.
                  </p>
                </div>

                <div className={cn("space-y-2", tutors.length === 0 && "opacity-50 pointer-events-none")}>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confirm Final Session Time (GMT)</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      required
                      disabled={tutors.length === 0}
                      type="datetime-local" 
                      value={trialTime}
                      onChange={(e) => setTrialTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none" 
                    />
                  </div>
                </div>

              <button 
                disabled={isScheduling || tutors.length === 0}
                type="submit" 
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScheduling ? <Loader2 className="animate-spin" size={18} /> : "Dispatch Invites"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
