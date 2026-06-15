import { useState, useEffect } from 'react';
import { ActiveTab, UserProgress, Lesson } from './types';
import { GEEZ_CURRICULUM, getChapterTitle } from './data';
import Navbar from './components/Navbar';
import VocabularyFlashcards from './components/VocabularyFlashcards';
import InteractiveExercises from './components/InteractiveExercises';
import GrammarGuide from './components/GrammarGuide';
import Leaderboard from './components/Leaderboard';
import ProgressDashboard from './components/ProgressDashboard';
import GeezDictionary from './components/GeezDictionary';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, BookOpen, Flame, Compass, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'geez_academy_tracker_v3';

interface AppProps {
  onBackToHome?: () => void;
}

export default function App({ onBackToHome }: AppProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lessons');
  const [activeLessonIdForQuiz, setActiveLessonIdForQuiz] = useState<number>(1);
  const [activeLessonIdForFlashcards, setActiveLessonIdForFlashcards] = useState<number | 'all'>('all');
  const [moduleFilter, setModuleFilter] = useState<'all' | 'greetings' | 'questions' | 'demonstratives' | 'anatomy' | 'food' | 'family' | 'animals' | 'education' | 'health' | 'mourning' | 'proverbs' | 'time' | 'numbers'>('all');
  const [progress, setProgress] = useState<UserProgress>({
    userName: "Kid Scholar",
    userAvatar: "🎓",
    completedLessons: [],
    masteredVocab: [],
    xp: 220, // Starting seed XP
    streak: 3, // Starting seed streak
    lastActiveDate: new Date().toISOString().split('T')[0],
    quizAttempts: {},
  });
  const [openSettings, setOpenSettings] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Verify last active date for streak retention
        const today = new Date().toISOString().split('T')[0];
        const lastActive = parsed.lastActiveDate;
        
        let checkedStreak = parsed.streak || 1;
        if (lastActive && lastActive !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          if (lastActive === yesterdayStr) {
            // Consecutive day logging: increase streak
            checkedStreak += 1;
          } else {
            // Missed a day: reset streak to 1
            checkedStreak = 1;
          }
        }

        setProgress({
          ...parsed,
          streak: checkedStreak,
          lastActiveDate: today,
        });
      }
    } catch (e) {
      console.warn("Failed to retrieve offline storage learning progress", e);
    }
  }, []);

  // Update progress helper and write to local storage
  const handleUpdateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn("Failed to write progress changes inline to offline storage", e);
      }
      return next;
    });
  };

  // Nav shortcuts
  const handleStartFlashcardsForLesson = (lessonId: number) => {
    setActiveLessonIdForFlashcards(lessonId);
    setActiveTab('flashcards');
  };

  const handleStartQuizForLesson = (lessonId: number) => {
    setActiveLessonIdForQuiz(lessonId);
    setActiveTab('quiz');
  };

  return (
    <div className={onBackToHome ? "flex-1 overflow-y-auto h-full bg-[#F8F5F1] text-zinc-900 font-sans flex flex-col selection:bg-amber-100 selection:text-amber-950" : "min-h-screen bg-[#F8F5F1] text-zinc-900 font-sans flex flex-col selection:bg-amber-100 selection:text-amber-950"}>
      
      {/* Top Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        progress={progress}
        setOpenSettings={setOpenSettings}
        onBackToHome={onBackToHome}
      />

      {/* Main Container Area */}
      <main id="app-viewport-wrapper" className="flex-grow py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            
            {/* View Tab A: Lessons Directory Grid */}
            {activeTab === 'lessons' && (
              <div id="lessons-directory-wrapper" className="space-y-8">
                
                {/* Onboarding Welcome Hero */}
                <div id="welcome-onboarding-panel" className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-zinc-200 grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative overflow-hidden">
                  
                  {/* Subtle graphical shape */}
                  <div className="absolute right-0 top-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -z-10 pointer-events-none" />

                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 border border-amber-200 text-xs px-2.5 py-1 rounded-full font-mono font-bold w-fit">
                      <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
                      <span>ABYSSINIA GLOBAL LITERACY SERIES</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-zinc-900 tracking-tight leading-tight">
                      Master Ge'ez: High-Quality Global Literacy Framework
                    </h2>

                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-sans max-w-2xl">
                      Welcome to Ge'ez Academy! Our global-literacy program transforms classical language acquisition into simple, scalable milestones. Developed for English-speaking students, our interactive framework tackles advanced greetings, structural grammar rules, and vocabulary mastery, complete with verifiable academic certificates.
                    </p>

                    {/* Stats milestone bar */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <div className="flex items-center gap-1 font-mono text-xs font-semibold text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span>Completed {progress.completedLessons.length} / {GEEZ_CURRICULUM.length} Chapters</span>
                      </div>

                      <div className="flex items-center gap-1 font-mono text-xs font-semibold text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200">
                        <Flame className="w-4 h-4 text-amber-500 fill-amber-300" />
                        <span>Streak: {progress.streak} Active Days</span>
                      </div>
                    </div>
                  </div>

                  {/* Beautiful Side Callout banner */}
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white text-center space-y-3 shadow-md self-stretch flex flex-col justify-between">
                    <div>
                      <span className="text-xs uppercase font-mono font-bold text-amber-100 tracking-widest block mb-1">Scholar Profile</span>
                      <p className="text-4xl font-bold select-none">{progress.userAvatar} {progress.userName}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="block text-2xl font-extrabold font-mono text-zinc-50">{progress.xp} XP</span>
                      <span className="text-xs text-amber-100 block">Gain 600 XP for next rank</span>
                    </div>

                    <button
                      id="view-detailed-progress-shortcut"
                      onClick={() => setActiveTab('progress')}
                      className="w-full py-2 bg-white text-orange-700 hover:bg-orange-50 transition font-sans font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                    >
                      View Detailed Progress
                    </button>
                  </div>
                </div>

                {/* Interactive Curriculum Categories Selector Picker */}
                <div id="curriculum-selector-container" className="bg-[#EDE7DD]/40 rounded-3xl p-6 border border-[#E0D8CC] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-serif font-bold text-[#2D3329] tracking-tight">Ge'ez Language Modules</h3>
                    <p className="text-xs text-[#5C564D] font-sans font-medium">Toggle packages to explore Greetings, Questions, Demonstratives, Body Parts, Foods, Family, Animals, Health, Mourning, Proverbs, Time, Numbers, or Education</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      id="filter-greetings-btn"
                      onClick={() => setModuleFilter('greetings')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'greetings'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      👋 Greetings ({GEEZ_CURRICULUM.filter(l => !l.module || l.module === 'greetings').length} Ch.)
                    </button>
                    <button
                      id="filter-questions-btn"
                      onClick={() => setModuleFilter('questions')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'questions'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      ❔ Questions ({GEEZ_CURRICULUM.filter(l => l.module === 'questions').length} Ch.)
                    </button>
                    <button
                      id="filter-demonstratives-btn"
                      onClick={() => setModuleFilter('demonstratives')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'demonstratives'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      📍 Demonstratives ({GEEZ_CURRICULUM.filter(l => l.module === 'demonstratives').length} Ch.)
                    </button>
                    <button
                      id="filter-anatomy-btn"
                      onClick={() => setModuleFilter('anatomy')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'anatomy'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      🦾 Body Parts ({GEEZ_CURRICULUM.filter(l => l.module === 'anatomy').length} Ch.)
                    </button>
                    <button
                      id="filter-food-btn"
                      onClick={() => setModuleFilter('food')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'food'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      🍎 Foods ({GEEZ_CURRICULUM.filter(l => l.module === 'food').length} Ch.)
                    </button>
                    <button
                      id="filter-family-btn"
                      onClick={() => setModuleFilter('family')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'family'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      👨‍👩‍👧 Family ({GEEZ_CURRICULUM.filter(l => l.module === 'family').length} Ch.)
                    </button>
                    <button
                      id="filter-animals-btn"
                      onClick={() => setModuleFilter('animals')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'animals'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      🦁 Animals ({GEEZ_CURRICULUM.filter(l => l.module === 'animals').length} Ch.)
                    </button>
                    <button
                      id="filter-health-btn"
                      onClick={() => setModuleFilter('health')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'health'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      🏥 Health ({GEEZ_CURRICULUM.filter(l => l.module === 'health').length} Ch.)
                    </button>
                    <button
                      id="filter-mourning-btn"
                      onClick={() => setModuleFilter('mourning')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'mourning'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      🖤 Mourning ({GEEZ_CURRICULUM.filter(l => l.module === 'mourning').length} Ch.)
                    </button>
                    <button
                      id="filter-proverbs-btn"
                      onClick={() => setModuleFilter('proverbs')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'proverbs'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      💬 Proverbs ({GEEZ_CURRICULUM.filter(l => l.module === 'proverbs').length} Ch.)
                    </button>
                    <button
                      id="filter-time-btn"
                      onClick={() => setModuleFilter('time')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'time'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      ⏳ Time & Dates ({GEEZ_CURRICULUM.filter(l => l.module === 'time').length} Ch.)
                    </button>
                    <button
                      id="filter-numbers-btn"
                      onClick={() => setModuleFilter('numbers')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'numbers'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      🔢 Numbers ({GEEZ_CURRICULUM.filter(l => l.module === 'numbers').length} Ch.)
                    </button>
                    <button
                      id="filter-education-btn"
                      onClick={() => setModuleFilter('education')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'education'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      📓 Education ({GEEZ_CURRICULUM.filter(l => l.module === 'education').length} Ch.)
                    </button>
                    <button
                      id="filter-all-btn"
                      onClick={() => setModuleFilter('all')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer select-none active:scale-95 ${
                        moduleFilter === 'all'
                          ? 'bg-[#5A6A51] text-white shadow-sm ring-1 ring-[#5A6A51]/50'
                          : 'bg-white hover:bg-[#EDE7DD]/35 text-[#5C564D] border border-[#E0D8CC]'
                      }`}
                    >
                      📚 All ({GEEZ_CURRICULUM.length})
                    </button>
                  </div>
                </div>

                {/* Lessons interactive grid */}
                <div id="lessons-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {GEEZ_CURRICULUM.filter((lesson) => {
                    if (moduleFilter === 'all') return true;
                    if (moduleFilter === 'greetings') return !lesson.module || lesson.module === 'greetings';
                    if (moduleFilter === 'questions') return lesson.module === 'questions';
                    if (moduleFilter === 'demonstratives') return lesson.module === 'demonstratives';
                    if (moduleFilter === 'anatomy') return lesson.module === 'anatomy';
                    if (moduleFilter === 'food') return lesson.module === 'food';
                    if (moduleFilter === 'family') return lesson.module === 'family';
                    if (moduleFilter === 'animals') return lesson.module === 'animals';
                    if (moduleFilter === 'health') return lesson.module === 'health';
                    if (moduleFilter === 'mourning') return lesson.module === 'mourning';
                    if (moduleFilter === 'proverbs') return lesson.module === 'proverbs';
                    if (moduleFilter === 'time') return lesson.module === 'time';
                    if (moduleFilter === 'numbers') return lesson.module === 'numbers';
                    if (moduleFilter === 'education') return lesson.module === 'education';
                    return true;
                  }).map((lesson) => {
                    const parsedTitle = getChapterTitle(lesson.lesson_id, lesson.lesson_title);
                    
                    // Determine quiz completion state
                    const quizAttempt = progress.quizAttempts[lesson.lesson_id];
                    const isPassed = quizAttempt?.passed;

                    return (
                      <div
                        key={lesson.lesson_id}
                        id={`lesson-card-${lesson.lesson_id}`}
                        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-5 ${
                          isPassed ? 'border-emerald-200 bg-emerald-50/5' : 'border-[#E0D8CC] hover:border-[#5A6A51]/40'
                        }`}
                      >
                        {/* Upper Meta row */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-extrabold text-[#5C564D] uppercase tracking-wider bg-[#F8F5F1] border border-[#E0D8CC]/60 px-2.5 py-1 rounded-lg">
                              Ref Code: {lesson.source_reference}
                            </span>
                            
                            {isPassed ? (
                              <span className="flex items-center gap-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-bold font-mono px-2 py-0.5 rounded-full select-none animate-pulse">
                                Passed (High: {quizAttempt.highscore})
                              </span>
                            ) : (
                              <span className="text-zinc-400 text-xs font-mono">Uncompleted</span>
                            )}
                          </div>

                          {/* Numerals matched Title: "ምዕራፍ [Ge'ez Numeral] — Meraf [Arabic Num]: [Topic]" */}
                          <h4 className="text-lg font-sans font-extrabold text-zinc-900 tracking-tight leading-snug font-serif">
                            {parsedTitle}
                          </h4>
                        </div>

                        {/* Middle Content Wrapper */}
                        <div className="space-y-4 pt-1">
                          {/* Vocabulary List */}
                          <div className="space-y-2.5">
                            <p className="text-[10px] font-mono uppercase tracking-widest text-[#5C564D] font-black block border-b border-[#E0D8CC]/80 pb-1">
                              Vocabulary Builder Items ({lesson.vocabulary.length}):
                            </p>
                            <div className={`space-y-1.5 ${lesson.sentences ? 'max-h-[110px]' : 'max-h-[170px]'} overflow-y-auto pr-1`}>
                              {lesson.vocabulary.map((vocab, i) => (
                                <div
                                  key={i}
                                  id={`lesson-vocab-row-${lesson.lesson_id}-${i}`}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-2 bg-[#FBFBF9] hover:bg-[#EDE7DD]/30 border border-[#E0D8CC]/30 rounded-xl transition"
                                >
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="font-serif text-sm font-extrabold text-[#2D3329]" title={vocab.grammatical_context}>
                                      {vocab.geez}
                                    </span>
                                    <span className="font-sans text-[10px] text-[#5C564D] italic">
                                      ({vocab.english_transliteration})
                                    </span>
                                  </div>
                                  <div className="flex flex-col sm:items-end">
                                    <span className="font-sans text-[11px] font-bold text-[#C87A55]">
                                      {vocab.english_translation}
                                    </span>
                                    {vocab.amharic_context && vocab.amharic_context !== vocab.geez && (
                                      <span className="font-serif text-[10px] text-zinc-400">
                                        ({vocab.amharic_context})
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Render Syntax-Diagrammed Sentences specifically for lessons having sentences (like Lesson 16) */}
                          {lesson.sentences && lesson.sentences.length > 0 && (
                            <div className="space-y-2.5 pt-2 border-t border-[#E0D8CC]/45">
                              <p className="text-[10px] font-mono uppercase tracking-widest text-[#5A6A51] font-black block">
                                Sentences & Grammar Breakdown:
                              </p>
                              <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
                                {lesson.sentences.map((sentence, idx) => (
                                  <div 
                                    key={idx}
                                    className="p-3 bg-[#F8F5F1] rounded-2xl border border-[#E0D8CC] space-y-2 hover:border-[#5A6A51]/40 transition duration-250"
                                  >
                                    <div className="flex flex-wrap justify-between items-baseline gap-2">
                                      <span className="font-serif text-sm font-bold text-[#2D3329]">
                                        {sentence.geez_phrase}
                                      </span>
                                      <span className="font-sans text-[11px] font-extrabold text-[#C87A55]">
                                        "{sentence.english_translation}"
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-[#5C564D] font-sans">
                                      <span className="font-bold text-[#5A6A51]">Amharic counterpart:</span> {sentence.amharic_phrase}
                                    </p>
                                    
                                    {/* Syntax Pills Breakdown */}
                                    <div className="flex flex-wrap gap-1.5 pt-1 border-t border-dashed border-[#E0D8CC]/70">
                                      {Object.entries(sentence.syntax_breakdown).map(([key, val], i) => (
                                        <span 
                                          key={i}
                                          className="text-[9px] font-semibold font-mono bg-white px-2 py-0.5 rounded-lg border border-[#E0D8CC] text-[#2D3329]"
                                        >
                                          <span className="text-[#C87A55] uppercase font-bold text-[8px] mr-1">{key}:</span>
                                          {val}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Bottom action panel */}
                        <div className="border-t border-zinc-100 pt-4 flex items-center justify-between gap-3">
                          
                          <button
                            id={`lesson-flashcards-btn-${lesson.lesson_id}`}
                            onClick={() => handleStartFlashcardsForLesson(lesson.lesson_id)}
                            className="px-4 py-2 border border-zinc-300 text-zinc-700 hover:border-[#5A6A51] hover:text-[#2D3329] rounded-xl transition text-xs font-mono font-medium cursor-pointer bg-[#FBFBF9]"
                          >
                            Explore Flashcards
                          </button>

                          <button
                            id={`lesson-quiz-btn-${lesson.lesson_id}`}
                            onClick={() => handleStartQuizForLesson(lesson.lesson_id)}
                            className="px-4 py-2 bg-[#5A6A51] text-white hover:bg-[#2D3329] rounded-xl transition text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <span>Start Quiz Practice</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* View Tab B: Vocabulary Builders Sliding Cards */}
            {activeTab === 'flashcards' && (
              <VocabularyFlashcards 
                progress={progress} 
                onUpdateProgress={handleUpdateProgress} 
                initialLessonId={activeLessonIdForFlashcards}
              />
            )}

            {/* View Tab C: Guised Quizzing Arena */}
            {activeTab === 'quiz' && (
              <InteractiveExercises 
                progress={progress} 
                onUpdateProgress={handleUpdateProgress} 
                activeLessonId={activeLessonIdForQuiz}
              />
            )}

            {/* View Tab D: English Grammar Deep Dive */}
            {activeTab === 'grammar' && (
              <GrammarGuide />
            )}

            {/* View Tab E: Simulated Peer Connection Leaderboard */}
            {activeTab === 'leaderboard' && (
              <Leaderboard progress={progress} />
            )}

            {/* View Tab F: Progress Analytics and user profiles */}
            {activeTab === 'progress' && (
              <ProgressDashboard 
                progress={progress} 
                onUpdateProgress={handleUpdateProgress}
                onNavigateToTab={(tab) => setActiveTab(tab)}
              />
            )}

            {/* View Tab G: Ge'ez Classical Dictionary and Search Finder */}
            {activeTab === 'dictionary' && (
              <GeezDictionary />
            )}

          </motion.div>
        </AnimatePresence>

      </main>

      {/* Main Footer credentials block */}
      <footer id="app-footer-bar" className="bg-white border-t border-zinc-200 mt-12 py-6 text-center text-xs space-y-1.5 font-mono text-zinc-500">
        <p className="font-semibold text-zinc-700">Ge'ez Learning Hub &copy; 2026. All rights reserved.</p>
        <p>HabKids Class Series • Offline Sandboxed Integration</p>
      </footer>

    </div>
  );
}
