import React, { useState } from 'react';
import { 
  Mail, 
  Shield, 
  Check, 
  X, 
  Loader2, 
  Edit2,
  Trash2,
  BookOpen,
  Briefcase,
  Languages
} from 'lucide-react';
import { updateTutor, deleteTutor } from '../services/dataService';
import { cn } from '../lib/utils';

interface TutorsListProps {
  tutors: any[];
  students: any[];
  sessions?: any[];
}

export default function TutorsList({ tutors, students, sessions = [] }: TutorsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editExpertise, setEditExpertise] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editLanguagesTaught, setEditLanguagesTaught] = useState('');
  const [editYearsOfExperience, setEditYearsOfExperience] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const handleDelete = async (tutor: any) => {
    setDeletingId(tutor.id);
    try {
      const res = await deleteTutor(tutor.id, tutor.email || '');
      if (res.success) {
        setConfirmDeleteId(null);
      } else {
        alert(res.error || "Failed to remove tutor.");
      }
    } catch (err: any) {
      alert(err.message || "An unexpected error occurred.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStartEdit = (tutor: any) => {
    setEditingId(tutor.id);
    setEditName(tutor.displayName || tutor.name || '');
    setEditExpertise(tutor.expertise || tutor.specializedSyllabus || '');
    setEditBio(tutor.bio || '');
    setEditLanguagesTaught(tutor.languages_taught ? tutor.languages_taught.join(', ') : '');
    setEditYearsOfExperience(tutor.years_of_experience || 0);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName('');
    setEditExpertise('');
    setEditBio('');
    setEditLanguagesTaught('');
    setEditYearsOfExperience(0);
  };

  const handleSave = async (tutor: any) => {
    if (!editName.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    setIsSaving(true);
    try {
      const parsedLangs = editLanguagesTaught
        .split(',')
        .map((lang: string) => lang.trim())
        .filter((lang: string) => lang.length > 0);

      const res = await updateTutor(tutor.id, {
        displayName: editName.trim(),
        expertise: editExpertise.trim(),
        email: tutor.email,
        bio: editBio.trim(),
        languages_taught: parsedLangs,
        years_of_experience: Number(editYearsOfExperience) || 0
      });
      if (res.success) {
        setEditingId(null);
      } else {
        alert(res.error || "Failed to update tutor.");
      }
    } catch (err: any) {
      alert(err.message || "An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* View Switcher Controls */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
            👥 Active Teaching Staff
          </h3>
          <p className="text-xs text-slate-500">
            Edit profiles, customize expertises, or remove tutors from standard student assignments.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold gap-1 self-start sm:self-auto shrink-0 shadow-inner">
          <button
            onClick={() => setViewMode('grid')}
            type="button"
            className={cn(
              "px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5",
              viewMode === 'grid' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
            )}
          >
            <span>📇</span>
            <span>Card Deck</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            type="button"
            className={cn(
              "px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5",
              viewMode === 'table' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
            )}
          >
            <span>📊</span>
            <span>Spreadsheet Table</span>
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        /* ==================== CARD DECK GRID VIEW ==================== */
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => {
            const isEditing = editingId === tutor.id;
            const assignedStudentsCount = students.filter(s => s.tutorId === tutor.id).length;
            const tutorSessions = sessions.filter(s => s.tutorId === tutor.id);
            const totalAssigned = tutorSessions.length;
            const completed = tutorSessions.filter(s => s.status === 'completed').length;
            const pct = totalAssigned > 0 ? Math.round((completed / totalAssigned) * 100) : 0;

            return (
              <div 
                key={tutor.id} 
                className={cn(
                  "bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all",
                  isEditing ? "border-primary/50 ring-2 ring-primary/5 bg-slate-50/25" : "border-slate-100 hover:shadow"
                )}
              >
                {isEditing ? (
                  /* Edit State Card Form */
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-3 mb-2">
                      <span className="text-xs font-black text-primary uppercase tracking-wider">Editing Tutor Profile</span>
                      <span className="text-[10px] text-slate-400 font-mono">{tutor.email}</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Display Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                        placeholder="Tutor Name"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Syllabus Focus Specialty</label>
                      <input
                        type="text"
                        value={editExpertise}
                        onChange={(e) => setEditExpertise(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                        placeholder="e.g. Amharic, Ge'ez, Beginner Level"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Years Exp (Num)</label>
                        <input
                          type="number"
                          min={0}
                          value={editYearsOfExperience}
                          onChange={(e) => setEditYearsOfExperience(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Languages Spoken</label>
                        <input
                          type="text"
                          value={editLanguagesTaught}
                          onChange={(e) => setEditLanguagesTaught(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                          placeholder="e.g. Amharic, English"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Public Bio description</label>
                      <textarea
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm resize-none"
                        placeholder="Public tagline or methodology bio..."
                        rows={3}
                      />
                    </div>

                    {/* Editor Action Bar */}
                    <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => handleSave(tutor)}
                        disabled={isSaving}
                        type="button"
                        className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                      >
                        {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        type="button"
                        className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Standard Card Layout */
                  <div className="space-y-4 flex flex-col justify-between h-full flex-1">
                    <div className="space-y-3">
                      {/* Avatar and Info Header */}
                      <div className="flex items-start gap-3">
                        {tutor.avatar ? (
                          <img 
                            src={tutor.avatar} 
                            alt={tutor.displayName} 
                            className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=260';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-primary/10 text-primary font-black rounded-xl flex items-center justify-center text-sm uppercase">
                            {(tutor.displayName || tutor.name || tutor.email || 'TU').slice(0, 2)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-slate-900 text-sm truncate tracking-tight">
                            {tutor.displayName || tutor.name || 'Tutor Record'}
                          </h4>
                          <span className="text-slate-450 text-[10px] block truncate font-mono">
                            {tutor.email}
                          </span>
                        </div>
                      </div>

                      {/* Bio Quote */}
                      {tutor.bio ? (
                        <p className="text-xs text-slate-550 leading-relaxed italic bg-emerald-50/20 p-3 border border-slate-100 rounded-2xl tracking-tight line-clamp-3 hover:line-clamp-none transition-all cursor-pointer">
                          "{tutor.bio}"
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 italic bg-slate-50 p-2.5 rounded-xl border border-dashed text-center">
                          No bio description provided.
                        </p>
                      )}

                      {/* Core details */}
                      <div className="space-y-2 pt-1">
                        <div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Specialties & Syllabus</span>
                          <div className="flex flex-wrap gap-1">
                            {(tutor.expertise || tutor.specializedSyllabus || 'General Instruction').split(',').map((skill: string, index: number) => (
                              <span key={index} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-[6px] text-[10px] font-bold border border-slate-200/50">
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Languages Spoken</span>
                          {tutor.languages_taught && tutor.languages_taught.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {tutor.languages_taught.map((lang: string, idx: number) => (
                                <span key={idx} className="bg-indigo-50/75 text-indigo-700 px-2 py-0.5 rounded-[6px] text-[10px] font-bold border border-indigo-100/50">
                                  {lang.trim()}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs italic font-medium">Amharic (Native Speaker)</span>
                          )}
                        </div>
                      </div>

                      {/* Badges footer */}
                      <div className="flex items-center gap-1.5 pt-1.5">
                        <span className="text-[9px] bg-slate-900 text-white font-extrabold uppercase px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Shield size={10} />
                          {tutor.role || 'tutor'}
                        </span>
                        <span className="text-[9px] bg-amber-50 text-amber-800 font-extrabold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-100">
                          ⭐ {tutor.rating || '5.0'}
                        </span>
                        <span className="text-[9px] bg-sky-50 text-sky-800 font-extrabold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 border border-sky-100">
                          {tutor.years_of_experience ?? 0} Yrs Exp
                        </span>
                      </div>

                      {/* Performance analytics snippet */}
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/80 space-y-1.5 mt-3">
                        <div className="flex justify-between text-[9px] font-bold text-slate-450 uppercase mb-0.5">
                          <span>Active Students: {assignedStudentsCount}</span>
                          <span>Complete: {completed}/{totalAssigned} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-slate-200/60 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Card Actions bar */}
                    <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5 mt-3 shrink-0">
                      {confirmDeleteId === tutor.id ? (
                        <div className="flex items-center gap-2 w-full animate-in slide-in-from-right-2">
                          <span className="text-[10px] font-bold text-rose-500 mr-auto shrink-0">Confirm Delete?</span>
                          <button
                            onClick={() => handleDelete(tutor)}
                            disabled={deletingId === tutor.id}
                            className="py-1.5 px-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors text-xs font-bold shadow-sm cursor-pointer"
                          >
                            {deletingId === tutor.id ? <Loader2 size={10} className="animate-spin" /> : "Yes, remove"}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            disabled={deletingId === tutor.id}
                            className="py-1.5 px-2 bg-slate-150 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors text-xs font-bold cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStartEdit(tutor)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-black text-primary bg-primary/15 hover:bg-primary/25 rounded-xl transition-all cursor-pointer"
                          >
                            <Edit2 size={11} />
                            <span>Edit Profile</span>
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(tutor.id)}
                            className="inline-flex items-center justify-center p-2 text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all cursor-pointer"
                            title="Remove from listed faculty"
                          >
                            <Trash2 size={13} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {tutors.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400 italic">
              No tutors found. Use the Add New Tutor button at the top to build profiles.
            </div>
          )}
        </div>
      ) : (
        /* ==================== SPREADSHEET TABLE SPREADSHEEET VIEW ==================== */
        <div className="overflow-x-auto text-[13px]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Tutor Profile</th>
                <th className="px-6 py-4">Expertise & Languages</th>
                <th className="px-6 py-4">Students</th>
                <th className="px-6 py-4">Tutor Performance</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Onboarded</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tutors.map((tutor) => {
                const isEditing = editingId === tutor.id;
                const assignedStudentsCount = students.filter(s => s.tutorId === tutor.id).length;
                const tutorSessions = sessions.filter(s => s.tutorId === tutor.id);
                const totalAssigned = tutorSessions.length;
                const completed = tutorSessions.filter(s => s.status === 'completed').length;
                const pct = totalAssigned > 0 ? Math.round((completed / totalAssigned) * 100) : 0;

                return (
                  <tr key={tutor.id} className="hover:bg-slate-50/85 transition-colors group align-top">
                    <td className="px-6 py-5 max-w-sm">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold shrink-0">
                          {isEditing ? (editName ? editName[0] : 'T') : ((tutor.displayName || tutor.name || tutor.email || '?')[0])}
                        </div>
                        <div className="space-y-1.5 flex-1 w-full min-w-0">
                          {isEditing ? (
                            <div className="space-y-3">
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded text-sm font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                                placeholder="Tutor Name"
                              />
                              <textarea
                                value={editBio}
                                onChange={(e) => setEditBio(e.target.value)}
                                className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                                placeholder="Brief profile bio/background..."
                                rows={2}
                              />
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Years of Experience</span>
                                <input
                                  type="number"
                                  min={0}
                                  value={editYearsOfExperience}
                                  onChange={(e) => setEditYearsOfExperience(Number(e.target.value))}
                                  className="w-20 px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-bold text-slate-900 tracking-tight">{tutor.displayName || tutor.name || 'No Name'}</div>
                              {tutor.bio ? (
                                <p className="text-xs text-slate-550 leading-relaxed italic bg-emerald-50/30 p-2 border border-slate-100 rounded-xl mt-1 tracking-tight">
                                  "{tutor.bio}"
                                </p>
                              ) : (
                                <p className="text-xs text-slate-400 italic">No bio written yet.</p>
                              )}
                              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                                <span className="text-[9px] bg-slate-100 text-slate-600 font-bold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 border border-slate-150/40 shadow-sm">
                                  <Shield size={10} className="text-slate-450" />
                                  {tutor.role || 'tutor'}
                                </span>
                                <span className="text-[9px] bg-amber-50 text-amber-800 font-bold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-100 shadow-sm">
                                  <Briefcase size={10} className="text-amber-600" />
                                  {tutor.years_of_experience ?? 0} Years Exp
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 max-w-xs font-medium">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <span className="text-[9px] font-bold text-slate-455 uppercase block mb-1">Syllabus Focus</span>
                            <input
                              type="text"
                              value={editExpertise}
                              onChange={(e) => setEditExpertise(e.target.value)}
                              className="px-2 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-600 w-full focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                              placeholder="e.g. Amharic, Oromo"
                            />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-455 uppercase block mb-1">Languages Taught</span>
                            <input
                              type="text"
                              value={editLanguagesTaught}
                              onChange={(e) => setEditLanguagesTaught(e.target.value)}
                              className="px-2 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-600 w-full focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                              placeholder="Amharic, Ge'ez, English"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Syllabus Expertise</span>
                            <div className="flex flex-wrap gap-1">
                              {(tutor.expertise || tutor.specializedSyllabus || 'General Instruction').split(',').map((skill: string, index: number) => (
                                <span key={index} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-[6px] text-[10px] font-semibold border border-slate-200/50 text-slate-600 font-bold">
                                  {skill.trim()}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">Languages Spoken</span>
                            {tutor.languages_taught && tutor.languages_taught.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {tutor.languages_taught.map((lang: string, idx: number) => (
                                  <span key={idx} className="bg-indigo-50/75 text-indigo-700 px-1.5 py-0.5 rounded-[6px] text-[10px] font-bold border border-indigo-100/50">
                                    {lang.trim()}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-400 text-xs italic">Amharic (Native)</span>
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold">
                          {assignedStudentsCount}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 min-w-[140px]">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-slate-700">{completed} / {totalAssigned} Completed</span>
                          <span className={cn(
                            "px-1.5 py-0.5 rounded text-[9px] font-extrabold", 
                            pct >= 80 ? "bg-emerald-50 text-emerald-600" :
                            pct >= 50 ? "bg-indigo-50 text-indigo-600" :
                            totalAssigned > 0 ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-400"
                          )}>
                            {pct}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              pct >= 80 ? "bg-emerald-505" :
                              pct >= 50 ? "bg-indigo-505" : "bg-amber-505"
                            )}
                            style={{ width: `${pct}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                          <Mail size={12} className="text-slate-400" />
                          {tutor.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs text-slate-500">
                        {tutor.createdAt?.toDate ? tutor.createdAt.toDate().toLocaleDateString() : 'New'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleSave(tutor)}
                            disabled={isSaving}
                            title="Save Changes"
                            className="p-1.5 px-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-1 text-xs font-semibold shadow-sm cursor-pointer border-none"
                          >
                            {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleCancel}
                            disabled={isSaving}
                            title="Cancel"
                            className="p-1.5 px-3 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer border-none"
                          >
                            <X size={12} />
                            <span>Cancel</span>
                          </button>
                        </div>
                      ) : confirmDeleteId === tutor.id ? (
                        <div className="flex items-center justify-end gap-2 animate-in slide-in-from-right-2 duration-150">
                          <span className="text-[10px] font-bold text-rose-500 mr-1">Confirm delete?</span>
                          <button
                            onClick={() => handleDelete(tutor)}
                            disabled={deletingId === tutor.id}
                            className="p-1.5 px-3.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center gap-1 text-xs font-semibold shadow-sm cursor-pointer border-none"
                            title="Permanently remove tutor"
                          >
                            {deletingId === tutor.id ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                            <span>Yes</span>
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            disabled={deletingId === tutor.id}
                            className="p-1.5 px-2.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer border-none"
                            title="Cancel removal"
                          >
                            <X size={12} />
                            <span>No</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStartEdit(tutor)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition-all cursor-pointer border-none"
                            title="Edit tutor info"
                          >
                            <Edit2 size={10} />
                            <span>✏️ Edit</span>
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(tutor.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all cursor-pointer border-none"
                            title="Delete tutor profile"
                          >
                            <Trash2 size={10} />
                            <span>🗑️ Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {tutors.length > 0 && (() => {
                const totalSessionsAll = tutors.reduce((acc, tutor) => acc + sessions.filter(s => s.tutorId === tutor.id).length, 0);
                const totalCompletedAll = tutors.reduce((acc, tutor) => acc + sessions.filter(s => s.tutorId === tutor.id && s.status === 'completed').length, 0);
                const totalStudentsAll = tutors.reduce((acc, tutor) => acc + students.filter(s => s.tutorId === tutor.id).length, 0);
                const pctAll = totalSessionsAll > 0 ? Math.round((totalCompletedAll / totalSessionsAll) * 105) : 0;
                const safePctAll = pctAll > 100 ? 100 : pctAll;

                return (
                  <tr className="bg-slate-50/80 font-bold border-t-2 border-slate-100 text-slate-800 select-none">
                    <td className="px-6 py-4" colSpan={2}>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-extrabold">Total across all tutors</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="px-2.5 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold">
                          {totalStudentsAll}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Students</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 min-w-[140px]">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-slate-800 font-extrabold">{totalCompletedAll} / {totalSessionsAll} Sessions</span>
                          <span className="text-primary hover:text-primary bg-primary/10 px-1.5 py-0.5 rounded text-[9px] font-extrabold">
                            {safePctAll}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200/65 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full transition-all duration-300" 
                            style={{ width: `${safePctAll}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4" colSpan={2}>
                      <span className="text-xs text-slate-505 font-semibold">{tutors.length} Active Tutors Listed</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Summary Ledger</span>
                    </td>
                  </tr>
                );
              })()}
              {tutors.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-slate-400 italic text-sm">
                    No tutors found in the table.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
