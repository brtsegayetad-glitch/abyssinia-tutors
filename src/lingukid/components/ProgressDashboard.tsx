import React, { useState } from 'react';
import { UserProgress } from '../types';
import { GEEZ_CURRICULUM } from '../data';
import { BarChart, Trophy, Key, Star, ShieldCheck, RefreshCw, Eye, Edit2, Smile, Sparkles, CheckCircle2 } from 'lucide-react';
import SageCertificate from './SageCertificate';

interface ProgressDashboardProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onNavigateToTab: (tab: 'lessons' | 'flashcards' | 'quiz') => void;
}

const AVATAR_POOL = ['🎓', '🦁', '🌟', '🦊', '🐯', '🦄', '🦅', '👑', '🏀', '🍒', '🎨', '🚀'];

export default function ProgressDashboard({ progress, onUpdateProgress, onNavigateToTab }: ProgressDashboardProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(progress.userName);
  const [profileAvatar, setProfileAvatar] = useState(progress.userAvatar);

  // Stats derivations
  const totalLessons = GEEZ_CURRICULUM.length;
  const completedCount = progress.completedLessons.length;
  const completionPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  const totalPossibleVocab = GEEZ_CURRICULUM.flatMap((l) => l.vocabulary).length;
  const masteredVocabCount = progress.masteredVocab.length;
  const vocabMasteryPercent = Math.min(100, Math.round((masteredVocabCount / totalPossibleVocab) * 100));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) return;

    onUpdateProgress((prev) => ({
      ...prev,
      userName: profileName.trim(),
      userAvatar: profileAvatar,
    }));
    setIsEditingProfile(false);
  };

  const handleResetProgressConfirm = () => {
    if (window.confirm("Are you sure you want to reset your Ge'ez learning progress? This will delete your XP, streak, scores, and mastered vocabulary list.")) {
      onUpdateProgress(() => ({
        userName: progress.userName || "Scholar Child",
        userAvatar: progress.userAvatar || "🎓",
        completedLessons: [],
        masteredVocab: [],
        xp: 40,
        streak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        quizAttempts: {},
      }));
    }
  };

  return (
    <div id="progress-dashboard-section" className="space-y-6 max-w-4xl mx-auto py-4 px-2">
      
      {/* 2-Column top layer: Profile customization and quick state dials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Card component */}
        <div id="dashboard-profile-card" className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 text-center relative space-y-4">
          
          <div className="mx-auto w-24 h-24 rounded-full bg-amber-50 border-4 border-amber-500/35 flex items-center justify-center text-5xl shadow-sm relative select-none">
            {progress.userAvatar}
            <button 
              id="edit-profile-avatar-hint"
              onClick={() => setIsEditingProfile(true)}
              className="absolute bottom-0 right-0 p-1.5 bg-zinc-900 leading-none text-white rounded-full hover:bg-zinc-800 transition shadow cursor-pointer border border-white"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-sans font-bold text-zinc-900 tracking-tight flex items-center justify-center gap-1">
              <span>{progress.userName}</span>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-300" />
            </h3>
            <span className="inline-block bg-zinc-100 text-zinc-600 font-mono text-xs px-2.5 py-0.5 rounded-full font-semibold border border-zinc-200">
              Rank Title: {progress.xp >= 1500 ? "Senior Ge'ez Sage" : progress.xp >= 600 ? "Adept Scribe" : "Abyssinia Novice"}
            </span>
          </div>

          <div className="pt-2">
            {!isEditingProfile ? (
              <button
                id="edit-profile-btn"
                onClick={() => setIsEditingProfile(true)}
                className="w-full py-2.5 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 rounded-xl transition text-xs font-mono font-medium cursor-pointer"
              >
                Customize Scholar Profile
              </button>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-left border-t border-zinc-100 pt-4 mt-2">
                
                {/* Text name input */}
                <div className="space-y-1">
                  <label htmlFor="student-name-input" className="block text-[10px] font-mono uppercase text-zinc-400 font-bold">Student Name</label>
                  <input
                    id="student-name-input"
                    type="text"
                    maxLength={18}
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full text-sm rounded-lg bg-zinc-50 border border-zinc-300 text-zinc-800 px-3 py-2 outline-none focus:border-amber-500"
                    placeholder="Enter kid name"
                  />
                </div>

                {/* Avatar emojis Selection list */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold">Select Symbol</label>
                  <div className="grid grid-cols-6 gap-1.5 justify-center">
                    {AVATAR_POOL.map((em) => (
                      <button
                        type="button"
                        key={em}
                        id={`avatar-option-${em}`}
                        onClick={() => setProfileAvatar(em)}
                        className={`text-2xl p-1 rounded-lg border transition ${
                          profileAvatar === em 
                            ? 'border-amber-500 bg-amber-50' 
                            : 'border-zinc-100 hover:bg-zinc-50'
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confirm buttons */}
                <div className="flex gap-2 pt-1.5">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="w-1/2 py-2 border border-zinc-200 text-zinc-600 rounded-lg text-xs font-medium bg-white hover:bg-zinc-50 cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 cursor-pointer text-center"
                  >
                    Save Changes
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>

        {/* Dynamic statistics and progress bars */}
        <div id="dashboard-stats-column" className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 grid grid-cols-2 gap-4">
          
          {/* Box 1: XP Stat */}
          <div className="bg-zinc-100/50 p-4 rounded-xl border border-zinc-200/50 flex flex-col justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block font-bold">Experience Power</span>
            <div className="my-2">
              <span className="text-3xl font-extrabold font-mono text-zinc-950 block">{progress.xp}</span>
              <span className="text-xs font-mono text-zinc-500">Points acquired</span>
            </div>
            <div className="h-1 text-xs font-mono text-amber-700 font-semibold pt-1">
              🎯 Mastery Goal: 1,500 XP
            </div>
          </div>

          {/* Box 2: Streak counter */}
          <div className="bg-zinc-100/50 p-4 rounded-xl border border-zinc-200/50 flex flex-col justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block font-bold">Retention Streak</span>
            <div className="my-2">
              <span className="text-3xl font-extrabold font-mono text-zinc-950 block">{progress.streak} Day</span>
              <span className="text-xs font-mono text-zinc-500">Consecutive logging</span>
            </div>
            <div className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 self-start">
              🔥 Active Streak
            </div>
          </div>

          {/* Box 3: Lesson Tracker progress bar */}
          <div className="col-span-2 bg-zinc-100/30 p-4 rounded-xl border border-zinc-200/50 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-600 font-semibold font-sans">Chapters Cleared:</span>
              <span className="text-zinc-800 font-bold">{completedCount} of {totalLessons} Lessons ({completionPercent}%)</span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-amber-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-zinc-500 font-sans">
              To complete a chapter, take the quiz and pass with at least 50% accuracy!
            </p>
          </div>

          {/* Box 4: Flashcards status masteries */}
          <div className="col-span-2 bg-zinc-100/30 p-4 rounded-xl border border-zinc-200/50 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-600 font-semibold font-sans">Mastered Vocabulary List:</span>
              <span className="text-zinc-800 font-bold">{masteredVocabCount} of {totalPossibleVocab} words ({vocabMasteryPercent}%)</span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-emerald-600 h-3 rounded-full transition-all duration-300 animate-pulse"
                style={{ width: `${vocabMasteryPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-zinc-500 font-sans">
              Swipe flashcards to set items as mastered to increase points!
            </p>
          </div>

        </div>

      </div>

      {/* Global Academic Certification - Framed Literacy Program */}
      <SageCertificate progress={progress} />

      {/* List of mastered words explicitly targeting user-learning review */}
      <div id="mastered-vocabulary-review-drawer" className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 space-y-4">
        <div>
          <h3 className="text-lg font-sans font-bold text-zinc-900 tracking-tight">Mastered Vocabulary Locker</h3>
          <p className="text-xs text-zinc-500 font-sans mt-0.5">Below are words you marked as memorized. Keep practicing!</p>
        </div>

        {progress.masteredVocab.length === 0 ? (
          <div className="text-center py-10 bg-zinc-50 border border-zinc-100 rounded-xl">
            <p className="text-sm font-sans text-zinc-500">You haven't marked any words as mastered yet.</p>
            <button
              id="navigate-to-flashcards-shortcut"
              onClick={() => onNavigateToTab('flashcards')}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono text-amber-700 hover:underline cursor-pointer font-bold"
            >
              Go to Flashcard Deck
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {progress.masteredVocab.map((word) => {
              // Find details
              const origin = GEEZ_CURRICULUM.flatMap(l => l.vocabulary).find(v => v.geez === word);
              if (!origin) return null;

              return (
                <div key={word} className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 flex items-center justify-between gap-2.5">
                  <div className="space-y-0.5 truncate">
                    <span className="font-serif font-bold text-zinc-900 text-lg block">{word}</span>
                    <span className="font-mono text-[11px] text-amber-700 block truncate font-semibold">"{origin.english_transliteration}"</span>
                    <span className="font-sans text-xs text-zinc-600 block truncate">{origin.english_translation}</span>
                  </div>
                  <div className="bg-emerald-100 p-1.5 rounded-full flex-shrink-0 border border-emerald-200 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Offline indicators information card and diagnostic reset */}
      <div id="dashboard-diagnostics-bar" className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-mono font-semibold text-xs text-zinc-700">Offline Compliance & Security</p>
          <p className="text-xs font-sans text-zinc-500 leading-normal">
            No internet is required. All Ge'ez learning units, audio simulations, level parameters, and standings are saved securely inside your browser's persistent sandbox.
          </p>
        </div>

        <button
          id="system-reset-progress-btn"
          onClick={handleResetProgressConfirm}
          className="px-4 py-2 border border-red-200 hover:border-red-300 text-red-700 bg-red-50/50 hover:bg-red-50 rounded-xl transition text-xs font-mono font-bold whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          Reset Learning Data
        </button>
      </div>

    </div>
  );
}
