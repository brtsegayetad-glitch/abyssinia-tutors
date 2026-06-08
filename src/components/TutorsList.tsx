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
                <td className="px-6 py-5 max-w-xs">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-bold text-slate-450 uppercase block mb-1">Syllabus Focus</span>
                        <input
                          type="text"
                          value={editExpertise}
                          onChange={(e) => setEditExpertise(e.target.value)}
                          className="px-2 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-600 w-full focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                          placeholder="e.g. Amharic, Oromo"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-450 uppercase block mb-1">Languages Taught</span>
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
                            <span key={index} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-[6px] text-[10px] font-semibold border border-slate-200/50">
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
                              <span key={idx} className="bg-indigo-50/75 text-indigo-700 px-1.5 py-0.5 rounded-[6px] text-[10px] font-bold tracking-tight border border-indigo-100/50">
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
                          pct >= 80 ? "bg-emerald-500" :
                          pct >= 50 ? "bg-indigo-500" : "bg-amber-500"
                        )}
                        style={{ width: `${pct}%` }} 
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
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
                        className="p-1 px-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-1 text-xs font-semibold shadow-sm cursor-pointer"
                      >
                        {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        title="Cancel"
                        className="p-1 px-2.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
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
                        className="p-1 px-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center gap-1 text-xs font-semibold shadow-sm cursor-pointer"
                        title="Permanently remove tutor"
                      >
                        {deletingId === tutor.id ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                        <span>Yes</span>
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        disabled={deletingId === tutor.id}
                        className="p-1 px-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
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
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition-all cursor-pointer"
                        title="Edit tutor info"
                      >
                        <Edit2 size={10} />
                        <span>✏️ Edit</span>
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(tutor.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all cursor-pointer"
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
            const pctAll = totalSessionsAll > 0 ? Math.round((totalCompletedAll / totalSessionsAll) * 100) : 0;

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
                        {pctAll}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200/65 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full transition-all duration-300" 
                        style={{ width: `${pctAll}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4" colSpan={2}>
                  <span className="text-xs text-slate-500 font-semibold">{tutors.length} Active Tutors Listed</span>
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
                No tutors found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
