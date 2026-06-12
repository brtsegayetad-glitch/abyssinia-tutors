import React, { useEffect, useState } from 'react';
import { ActiveTab, UserProgress } from '../types';
import { BookOpen, Award, Trophy, BarChart2, ShieldCheck, Zap, User, Grid, Search, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  progress: UserProgress;
  setOpenSettings: (open: boolean) => void;
  onBackToHome?: () => void;
}

export default function Navbar({ activeTab, setActiveTab, progress, setOpenSettings, onBackToHome }: NavbarProps) {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // Calculate generic level based on XP (e.g. 100 XP per level, min Level 1)
  const currentLevel = Math.max(1, Math.floor(progress.xp / 400) + 1);
  const xpNeededForNextLevel = 400;
  const currentLevelXP = progress.xp % 400;
  const progressPercent = Math.min(100, Math.round((currentLevelXP / xpNeededForNextLevel) * 100));

  const navItems: { tab: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'lessons', label: 'Lessons', icon: <BookOpen className="w-4 h-4" /> },
    { tab: 'dictionary', label: 'Ge\'ez Dictionary', icon: <Search className="w-4 h-4" /> },
    { tab: 'flashcards', label: 'Flashcards', icon: <Grid className="w-4 h-4" /> },
    { tab: 'quiz', label: 'Quizzes', icon: <Award className="w-4 h-4" /> },
    { tab: 'grammar', label: 'Grammar Guide', icon: <ShieldCheck className="w-4 h-4" /> },
    { tab: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> },
    { tab: 'progress', label: 'Progress Tracker', icon: <BarChart2 className="w-4 h-4" /> },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-[#EDE7DD]/90 backdrop-blur-md border-b border-[#E0D8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div id="brand-container" className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="p-1 px-2.5 py-1.5 rounded-xl bg-[#5A6A51] hover:bg-[#3D4736] text-white cursor-pointer transition flex items-center justify-center gap-1 text-xs font-bold font-sans"
                title="Go back to main library menu"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            )}
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-mono font-black text-2xl select-none leading-none">ሰ</span>
            </div>
            <div>
              <h1 className="font-sans font-bold text-lg text-zinc-900 tracking-tight leading-none">
                Ge'ez Academy
              </h1>
              <p className="text-xs font-mono text-zinc-500 mt-1 select-none">Abyssinia Series</p>
            </div>
          </div>

          {/* Quick Stats Toolbar */}
          <div id="stats-toolbar" className="hidden md:flex items-center gap-6">
            
            {/* Offline Status indicator */}
            <div 
              id="offline-indicator" 
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${
                isOffline 
                  ? 'bg-amber-50 text-amber-700 border-amber-200' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
              {isOffline ? 'Offline Mode' : 'Offline Saved'}
            </div>

            {/* Streak count */}
            <div id="streak-stat" className="flex items-center gap-1 text-zinc-700 font-medium text-sm">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>{progress.streak} Day streak</span>
            </div>

            {/* XP Count & Level Radial */}
            <div id="xp-radial-stat" className="flex items-center gap-3 bg-zinc-100/80 px-3 py-1.5 rounded-lg border border-zinc-200/50">
              <div className="text-right">
                <span className="block text-xs font-mono text-zinc-500">Level {currentLevel} Scholar</span>
                <span className="block text-xs font-bold text-zinc-800">{progress.xp} XP</span>
              </div>
              <div className="w-16 bg-zinc-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-amber-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* User Profile trigger */}
            <button 
              id="profile-trigger-btn"
              onClick={() => setOpenSettings(true)}
              className="flex items-center gap-2 text-sm text-zinc-700 hover:text-amber-600 font-medium transition cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center text-lg shadow-sm">
                {progress.userAvatar || '🎓'}
              </div>
              <span className="max-w-[100px] truncate">{progress.userName}</span>
            </button>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div id="tab-nav-wrapper" className="flex overflow-x-auto no-scrollbar py-2 gap-2 border-t border-zinc-100">
          {navItems.map((item) => {
            const isSelected = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                id={`nav-tab-${item.tab}`}
                onClick={() => setActiveTab(item.tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#5A6A51] text-white shadow-sm font-semibold'
                    : 'text-[#5C564D] hover:bg-[#E0D8CC]/60 hover:text-[#2D3329]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
