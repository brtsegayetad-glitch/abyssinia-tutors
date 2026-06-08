import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  User as UserIcon, 
  Mail, 
  Phone, 
  BookOpen, 
  Plus, 
  X, 
  CheckCircle2, 
  Loader2, 
  Send,
  Video
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { updateTutorAvailability, updateTutorProfile } from '../../services/dataService';
import { cn } from '../../lib/utils';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const HOURS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', 
  '18:00', '19:00', '20:00'
];

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

export default function TutorSettings() {
  const { user, reloadUser } = useAuth() as any;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    displayName: '',
    phone: '',
    expertise: '',
    classroomLink: ''
  });

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

  useEffect(() => {
    if (user) {
      setProfileForm({
        displayName: user.displayName || user.fullName || '',
        phone: user.phone || '',
        expertise: user.expertise || user.specializedSyllabus || 'Amharic Instruction',
        classroomLink: user.classroomLink || ''
      });
      if (user.availability) {
        setAvailability(convertUTCAvailabilityToLocal(user.availability));
      }
    }
  }, [user]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    try {
      // 1. Update Profile Fields
      await updateTutorProfile(user.uid, {
        displayName: profileForm.displayName,
        fullName: profileForm.displayName,
        phone: profileForm.phone,
        expertise: profileForm.expertise,
        specializedSyllabus: profileForm.expertise,
        classroomLink: profileForm.classroomLink
      }, user.tutorId);

      // 2. Update Availability
      const utcAvail = convertLocalAvailabilityToUTC(availability);
      await updateTutorAvailability(user.uid, utcAvail, user.tutorId);

      // Reload auth context so header syncs
      if (reloadUser) {
        await reloadUser();
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Error saving setup parameters.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
            <Settings size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-950 tracking-tight font-sans">Tutor Profile & Setup</h1>
            <p className="text-slate-400 text-sm mt-1">Manage physical contact metrics, specialized syllabus tags, and weekly availabilities.</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        {saveSuccess && (
          <div className="bg-emerald-50 border border-emerald-250 p-4 rounded-xl flex items-center gap-3 text-emerald-800 animate-in slide-in-from-top-4 duration-300">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
            <div className="text-xs font-semibold">
              <strong>Success:</strong> Your profile metrics and weekly availability lists have been synchronized.
            </div>
          </div>
        )}

        {/* 1. Profile Information */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-150 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <UserIcon size={18} className="text-slate-400" />
            <span>Personal Information</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Display Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  required
                  type="text"
                  value={profileForm.displayName}
                  onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none font-medium text-slate-850"
                  placeholder="e.g. Mizan Amanuel"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Login Email (Read-only)</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  disabled
                  type="email"
                  value={user?.email || ''}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none text-slate-400 cursor-not-allowed font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Specialized Syllabus / Expertise</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  required
                  type="text"
                  value={profileForm.expertise}
                  onChange={(e) => setProfileForm({ ...profileForm, expertise: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-800"
                  placeholder="e.g. Ge'ez Literacy & Beginner Conversational Amharic"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Personal Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-800 font-medium"
                  placeholder="e.g. +251 912 345 678"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Google Meet / Zoom Classroom Link
              </label>
              <div className="relative">
                <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="url"
                  value={profileForm.classroomLink}
                  onChange={(e) => setProfileForm({ ...profileForm, classroomLink: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-850 font-medium font-sans"
                  placeholder="e.g. https://meet.google.com/abc-defg-hij"
                />
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                Provide your permanent Google Meet or Zoom space link here. This link will dynamically bind to the "Enter Class" buttons on the student and parent dashboards whenever they have an upcoming lesson with you.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Availability Setup Checkbox Matrix Grid */}
        <div id="weekly-availability-grid-container" className="bg-white rounded-3xl p-6 md:p-8 border border-slate-150 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Weekly Availability Checkbox Grid</h2>
            <p className="text-slate-500 text-xs mt-1">Check individual grid boxes corresponding to hours you are open for class bookings. This matrix is lightweight, highly visual, and optimized for Chromebook systems.</p>
          </div>

          {/* Time Zone Indicator */}
          <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-sm">🌐</span>
              <span>Your schedule is running in: <strong className="text-slate-800 font-bold">{Intl.DateTimeFormat().resolvedOptions().timeZone}</strong></span>
            </div>
            <span className="text-[10px] text-indigo-600 bg-indigo-50 font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">Local Detector</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[160px]">Time Block</th>
                  {DAYS.map(day => (
                    <th key={day} className="py-3 px-2 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest capitalize">
                      {day.substring(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {HOURS.map(hour => {
                  const hourNumber = parseInt(hour.split(':')[0]);
                  const formattedTime = hourNumber >= 12 
                    ? `${hourNumber === 12 ? 12 : hourNumber - 12}:00 PM` 
                    : `${hourNumber}:00 AM`;
                  return (
                    <tr key={hour} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-3 px-4 text-xs font-extrabold text-slate-700 font-mono">
                        {formattedTime}
                      </td>
                      {DAYS.map(day => {
                        const dayObj = availability[day] || { active: false, slots: [] };
                        const slots = dayObj.slots || [];
                        const isChecked = slots.includes(hour) && (dayObj.active !== false);

                        return (
                          <td key={day} className="py-2.5 px-2 text-center">
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                let newSlots = [...slots];
                                if (e.target.checked) {
                                  if (!newSlots.includes(hour)) {
                                    newSlots.push(hour);
                                  }
                                  newSlots.sort();
                                } else {
                                  newSlots = newSlots.filter(s => s !== hour);
                                }
                                setAvailability({
                                  ...availability,
                                  [day]: {
                                    active: newSlots.length > 0,
                                    slots: newSlots
                                  }
                                });
                              }}
                              className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm transition-all hover:scale-105"
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] text-slate-400 leading-normal font-medium flex items-center gap-2">
            <span>💡</span>
            <span>Checking boxes saves 50-minute teaching intervals. Unchecked time blocks are hidden from families during permanent slot scheduling.</span>
          </div>
        </div>

        {/* Save Submission */}
        <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center justify-center gap-2 px-10 py-4 rounded-xl shadow-lg shadow-indigo-600/10 hover:scale-[1.01] transition-all cursor-pointer font-bold text-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Synchronizing Profile...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Save Setup Parameters</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
