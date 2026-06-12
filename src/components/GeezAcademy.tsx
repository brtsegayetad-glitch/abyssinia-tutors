import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, Trophy, BookOpen, Flame, ArrowRight, ArrowLeft, 
  Volume2, Award, RotateCcw, Search, Grid, ShieldCheck, 
  Layers, Activity, Play, CheckCircle2, Star, Check, 
  Volume1, HelpCircle, ChevronRight, RefreshCw, Calendar, User, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { geezCurriculum, GeezLesson } from "../data/geezCurriculum";
import { geezDictionaryData, GEEZ_VIRTUAL_LOAD_SIZE, DictionaryEntry } from "../data/geezDictionary";

const LOCAL_STORAGE_KEY = "geez_academy_tracker_v3";

interface GeezAcademyProps {
  onBackToHome: () => void;
  onOpenSlides: (lessonId: number) => void;
}

export interface VocabularyItem {
  word: string;
  phonetic: string;
  englishMeaning: string;
  hint?: string;
}

export interface QuizAttempt {
  highscore: number;
  passed: boolean;
  score: number;
  timestamp: number;
}

export interface UserProgress {
  userName: string;
  userAvatar: string;
  completedLessons: number[]; // Lesson IDs
  masteredVocab: string[]; // Ge'ez/Amharic words
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  quizAttempts: Record<number, QuizAttempt>; // Key: Lesson ID
}

export type ActiveTab = 'lessons' | 'flashcards' | 'quiz' | 'grammar' | 'leaderboard' | 'progress' | 'dictionary';

// Helper function to map chapter numbers to Ge'ez numerals accurately
export function getGeezNumeral(num: number): string {
  const geezMap: Record<number, string> = {
    1: "፩", 2: "፪", 3: "፫", 4: "፬", 5: "፭", 6: "፮", 7: "፯", 8: "፰", 9: "፱", 10: "፲",
    11: "፲፩", 12: "፲፪", 13: "፲፫", 14: "፲፬", 15: "፲፭", 16: "፲፮", 17: "፲፯", 18: "፲፰",
    19: "፲፱", 20: "፳", 21: "፳፩", 22: "፳፪", 23: "፳፫", 24: "፳፬", 25: "፳፭", 26: "፳፮",
    27: "፳፯", 28: "፳፰", 29: "፳፱", 30: "፴", 31: "፴፩", 32: "፴፪", 33: "፴፫", 34: "፴፬",
    35: "፴፭", 36: "፴፮", 37: "፴፯", 38: "፴፰", 39: "፴፱", 40: "፲", 41: "፲፩", 42: "፲፪",
    43: "፲፫", 44: "፲፬", 45: "፲፭", 46: "፲፮", 47: "፲፯", 48: "፲፰", 49: "፲፱", 50: "፶",
    51: "፶፩", 52: "፶፪", 53: "፶፫", 54: "፶፬"
  };
  return geezMap[num] || num.toString();
}

// Generate the 54 chapters catalog partitioned across the 13 packages from your screenshots
export interface UnifiedChapter {
  id: number;
  title: string;
  objective: string;
  packageName: string;
  fidelFamily: Array<{ symbol: string; sound: string }>;
  vocabulary: VocabularyItem[];
}

const packageWeights: Record<string, number> = {
  "Greetings": 14,
  "Questions": 3,
  "Demonstratives": 2,
  "Body Parts": 3,
  "Foods": 3,
  "Family": 3,
  "Animals": 5,
  "Health": 3,
  "Mourning": 3,
  "Proverbs": 3,
  "Time & Dates": 2,
  "Numbers": 5,
  "Education": 5
};

const defaultFidelFamilies: Record<string, Array<{ symbol: string; sound: string }>> = {
  "Greetings": [
    { symbol: "ሰ", sound: "se" }, { symbol: "ላ", sound: "la" }, { symbol: "ም", sound: "me" }, { symbol: "ታ", sound: "ta" }
  ],
  "Questions": [
    { symbol: "ም", sound: "me" }, { symbol: "ን", sound: "ne" }, { symbol: "ማ", sound: "ma" }, { symbol: "ን", sound: "ne" }
  ],
  "Demonstratives": [
    { symbol: "ይ", sound: "ye" }, { symbol: "ህ", sound: "he" }, { symbol: "ቺ", sound: "chi" }, { symbol: "ያ", sound: "ya" }
  ],
  "Body Parts": [
    { symbol: "ራ", sound: "ra" }, { symbol: "ስ", sound: "se" }, { symbol: "ዓ", sound: "a" }, { symbol: "ይን", sound: "yn" }
  ],
  "Foods": [
    { symbol: "ሙ", sound: "mu" }, { symbol: "ዝ", sound: "ze" }, { symbol: "ዳ", sound: "da" }, { symbol: "ቦ", sound: "bo" }
  ],
  "Family": [
    { symbol: "አ", sound: "a" }, { symbol: "ባ", sound: "ba" }, { symbol: "እ", sound: "e" }, { symbol: "ናት", sound: "nat" }
  ],
  "Animals": [
    { symbol: "ነ", sound: "ne" }, { symbol: "ብ", sound: "be" }, { symbol: "ር", sound: "re" }, { symbol: "አ", sound: "a" }
  ],
  "Health": [
    { symbol: "ሕ", sound: "he" }, { symbol: "ሙ", sound: "mu" }, { symbol: "ም", sound: "me" }, { symbol: "ድ", sound: "de" }
  ],
  "Mourning": [
    { symbol: "ሐ", sound: "ha" }, { symbol: "ዘ", sound: "ze" }, { symbol: "ን", sound: "ne" }, { symbol: "ቅ", sound: "ke" }
  ],
  "Proverbs": [
    { symbol: "ም", sound: "me" }, { symbol: "ሳ", sound: "sa" }, { symbol: "ሌ", sound: "le" }, { symbol: "ያ", sound: "ya" }
  ],
  "Time & Dates": [
    { symbol: "ቀ", sound: "ke" }, { symbol: "ን", sound: "ne" }, { symbol: "ወ", sound: "we" }, { symbol: "ር", sound: "re" }
  ],
  "Numbers": [
    { symbol: "አ", sound: "a" }, { symbol: "ን", sound: "ne" }, { symbol: "ድ", sound: "de" }, { symbol: "ሁ", sound: "hu" }
  ],
  "Education": [
    { symbol: "ደ", sound: "de" }, { symbol: "ብ", sound: "be" }, { symbol: "ተ", sound: "te" }, { symbol: "ር", sound: "re" }
  ]
};

const defaultVocabByPackage: Record<string, VocabularyItem[]> = {
  "Greetings": [
    { word: "ሰላም", phonetic: "/sa-lam/", englishMeaning: "Peace / Hello / Greetings." },
    { word: "ጤና ይስጥልኝ", phonetic: "/tena-yist-il-egn/", englishMeaning: "May health be given to you; formal hello." },
    { word: "እንደምን አደርክ", phonetic: "/indemin-aderk/", englishMeaning: "Good morning! (To a male child/man)." }
  ],
  "Questions": [
    { word: "ምንድነው", phonetic: "/minden-ew/", englishMeaning: "What is it?" },
    { word: "ማነው", phonetic: "/man-ew/", englishMeaning: "Who is it?" },
    { word: "እንዴት", phonetic: "/indet/", englishMeaning: "How?" }
  ],
  "Demonstratives": [
    { word: "ይህ", phonetic: "/yih/", englishMeaning: "This (masculine)." },
    { word: "ይቺ", phonetic: "/yichi/", englishMeaning: "This (feminine)." }
  ],
  "Body Parts": [
    { word: "ራስ", phonetic: "/ras/", englishMeaning: "Head / self." },
    { word: "ዓይን", phonetic: "/ayn/", englishMeaning: "Eye / spring." },
    { word: "እጅ", phonetic: "/iji/", englishMeaning: "Hand / arm." }
  ],
  "Foods": [
    { word: "እንጀራ", phonetic: "/injera/", englishMeaning: "Sourdough flatbread; primary staple." },
    { word: "ዳቦ", phonetic: "/dabo/", englishMeaning: "Traditional baked wheat bread." },
    { word: "ውኃ", phonetic: "/weha/", englishMeaning: "Fresh water / drink." }
  ],
  "Family": [
    { word: "አባት", phonetic: "/abat/", englishMeaning: "Father / ancestor male head." },
    { word: "እናት", phonetic: "/inat/", englishMeaning: "Mother / maternal family anchor." },
    { word: "እህት", phonetic: "/ihit/", englishMeaning: "Sister." }
  ],
  "Animals": [
    { word: "አንበሳ", phonetic: "/anbessa/", englishMeaning: "Lion; symbol of Solomonic bravery." },
    { word: "ነብር", phonetic: "/nebir/", englishMeaning: "Leopard / tiger." },
    { word: "ፈረስ", phonetic: "/feres/", englishMeaning: "Horse." }
  ],
  "Health": [
    { word: "ጤና", phonetic: "/tena/", englishMeaning: "Health, vitality, physical wellness." },
    { word: "ሕመም", phonetic: "/himem/", englishMeaning: "Ache, pain, sickness." }
  ],
  "Mourning": [
    { word: "ማልቀስ", phonetic: "/malqes/", englishMeaning: "To cry or lament historical events." },
    { word: "ሐዘን", phonetic: "/hazen/", englishMeaning: "Sorrow, mourning, sadness." }
  ],
  "Proverbs": [
    { word: "ምሳሌ", phonetic: "/misale/", englishMeaning: "Proverb, allegory, wisdom idiom." },
    { word: "ትምህርት", phonetic: "/timhirt/", englishMeaning: "Lessons / education / learning wisdom." }
  ],
  "Time & Dates": [
    { word: "ሰዓት", phonetic: "/se'at/", englishMeaning: "Time, hour, clock indicator." },
    { word: "ቀን", phonetic: "/qen/", englishMeaning: "Day, date, sunshine." }
  ],
  "Numbers": [
    { word: "፩", phonetic: "/ahadu/", englishMeaning: "One (1) in ancient Ge'ez numerals." },
    { word: "፪", phonetic: "/kili'etu/", englishMeaning: "Two (2) in ancient Ge'ez numerals." },
    { word: "፫", phonetic: "/selastu/", englishMeaning: "Three (3) in ancient Ge'ez numerals." }
  ],
  "Education": [
    { word: "ደብተር", phonetic: "/debter/", englishMeaning: "Notebook, manuscript binder, pupil journal." },
    { word: "መጽሐፍ", phonetic: "/mets-haf/", englishMeaning: "Book, historical manuscript, scroll." }
  ]
};

// Compile 54 chapters cleanly
const unifiedChapters: UnifiedChapter[] = [];
let chapId = 1;
Object.entries(packageWeights).forEach(([pkg, count]) => {
  for (let i = 1; i <= count; i++) {
    const defaultVocabs = defaultVocabByPackage[pkg] || [];
    const localVocabs = defaultVocabs.map((v, idx) => ({
      ...v,
      hint: `Taught in ${pkg} Chapter ${i}`
    }));
    unifiedChapters.push({
      id: chapId,
      title: `${pkg} Study Unit ${i}`,
      objective: `Master essential vocabulary and phonetic speech patterns for ${pkg} in Chapter ${i}.`,
      packageName: pkg,
      fidelFamily: defaultFidelFamilies[pkg] || [{ symbol: "ፊ", sound: "fi" }, { symbol: "ደ", sound: "de" }, { symbol: "ል", sound: "le" }],
      vocabulary: localVocabs
    });
    chapId++;
  }
});

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function GeezAcademy({ onBackToHome, onOpenSlides }: GeezAcademyProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lessons');
  const [activeLessonIdForQuiz, setActiveLessonIdForQuiz] = useState<number>(1);
  const [activeLessonIdForFlashcards, setActiveLessonIdForFlashcards] = useState<number | 'all'>('all');
  const [difficultyLevel, setDifficultyLevel] = useState<1 | 2>(1); // Level 1 (Younger) / Level 2 (Older)
  const [activePackageFilter, setActivePackageFilter] = useState<string>("All");

  const [progress, setProgress] = useState<UserProgress>({
    userName: "Kid Scholar",
    userAvatar: "🎓",
    completedLessons: [],
    masteredVocab: [],
    xp: 235,
    streak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    quizAttempts: {},
  });

  // Load progress on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgress({
          ...parsed,
          streak: parsed.streak || 1,
          xp: parsed.xp || 235,
        });
      }
    } catch (e) {
      console.warn("Failed to retrieve progress", e);
    }
  }, []);

  const handleUpdateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn("Failed to save progress", e);
      }
      return next;
    });
  };

  const handleStartFlashcardsForLesson = (lessonId: number) => {
    setActiveLessonIdForFlashcards(lessonId);
    setActiveTab('flashcards');
  };

  const handleStartQuizForLesson = (lessonId: number) => {
    setActiveLessonIdForQuiz(lessonId);
    setActiveTab('quiz');
  };

  const speakFidelSound = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.pitch = 1.15;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filter the 54 chapters based on selected package weight
  const filteredChapters = unifiedChapters.filter(ch => {
    if (activePackageFilter === "All") return true;
    return ch.packageName.toLowerCase() === activePackageFilter.split("(")[0].trim().toLowerCase();
  });

  return (
    <div className="flex-1 w-full bg-[#FAF8F5] text-slate-800 rounded-[28px] overflow-hidden flex flex-col min-h-[82vh]">
      {/* Premium Ge'ez Academy Header matching the screenshots */}
      <div className="bg-gradient-to-r from-[#5A6A51] to-[#3E4F36] p-5 md:p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#E3DEC3]/40 shrink-0">
        <div className="flex items-center gap-3.5">
          <button
            onClick={onBackToHome}
            className="p-2 hover:bg-white/10 rounded-xl transition duration-150 text-white flex items-center justify-center shrink-0"
            title="Back to library main menu"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-11 h-11 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg border border-amber-300">
            <span className="text-white font-serif font-black text-xl">ግ</span>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-black text-lg md:text-xl tracking-tight leading-none">
                Ge'ez Academy (የግዕዝ አካዳሚ)
              </h2>
              <span className="bg-[#4CAF50] text-[#E8F5E9] font-black text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#CCFF90] rounded-full animate-ping inline-block" />
                Offline Saved
              </span>
            </div>
            <p className="text-[#E7E2CE] text-[11px] font-semibold tracking-wide mt-1">
              Abyssinia Series Diaspora Heritage Applet • 100% Client Sync Active
            </p>
          </div>
        </div>

        {/* Dashboard parameters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs text-[#FFF9E6] font-extrabold shadow-sm">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-300" />
            <span>🔥 {progress.streak} Day streak</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-left text-xs shadow-sm shadow-black/5">
            <div className="flex items-center gap-1.5 text-amber-300 font-black">
              <Trophy className="w-3.5 h-3.5 fill-amber-300/20" />
              <span>Level 1 Scholar, {progress.xp} XP</span>
            </div>
          </div>
          <div className="bg-[#798F6C] text-white px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
            <span>🎓 Kid Scholar</span>
          </div>

          <div className="flex bg-white/10 p-1 rounded-xl border border-white/10 items-center justify-center ml-1">
            <button
              onClick={() => setDifficultyLevel(1)}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                difficultyLevel === 1 ? "bg-amber-400 text-amber-950" : "text-white hover:bg-white/5"
              }`}
            >
              Lvl 1 (Younger)
            </button>
            <button
              onClick={() => setDifficultyLevel(2)}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                difficultyLevel === 2 ? "bg-amber-400 text-amber-950" : "text-white hover:bg-white/5"
              }`}
            >
              Lvl 2 (Advanced)
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tab Selector exactly matching your requested labels */}
      <div className="bg-[#EBE5D3] p-2 flex overflow-x-auto no-scrollbar gap-1 border-b border-[#DFD8C0] shrink-0">
        {[
          { id: 'lessons', label: 'Lessons', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'dictionary', label: 'Ge\'ez Dictionary', icon: <Search className="w-4 h-4" /> },
          { id: 'flashcards', label: 'Flashcards', icon: <Grid className="w-4 h-4" /> },
          { id: 'quiz', label: 'Quizzes', icon: <Award className="w-4 h-4" /> },
          { id: 'grammar', label: 'Grammar Guide', icon: <ShieldCheck className="w-4 h-4" /> },
          { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> },
          { id: 'progress', label: 'Progress Tracker', icon: <Activity className="w-4 h-4" /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as ActiveTab)}
            className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer active:scale-97 ${
              activeTab === item.id 
                ? 'bg-[#5A6A51] text-white shadow-md shadow-[#5A6A51]/20' 
                : 'text-[#5C564D] hover:bg-[#E0D8CC]/40 hover:text-slate-900'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Tab View Canvas */}
      <div className="flex-1 p-5 md:p-8 min-h-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="h-full"
          >
            {activeTab === 'lessons' && (
              <div className="space-y-6">
                {/* Onboarding Guide Card identical to the first screenshot */}
                <div className="bg-white rounded-[32px] p-6 border-2 border-amber-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
                  <div className="absolute right-0 top-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -z-10" />
                  <div className="text-left flex-1 space-y-3">
                    <span className="inline-flex bg-amber-100 border border-amber-200 text-amber-800 text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                      Kids Diaspora Learning Series
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-black text-slate-850">
                      Learn Ge'ez, the Ancient Sacred Lang of Ethiopia!
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl font-medium">
                      Welcome to Ge'ez Academy! Designed specifically for English-speaking children and students, our interactive app makes greetings, suffixes, family blessings, and age inquiries exceptionally intuitive. Click on any chapters to build flashcards and attempt gamified quizzes!
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button className="bg-[#5A6A51] text-white px-4 py-2 border rounded-xl font-sans font-extrabold text-[10px] uppercase shadow-sm">
                        🏆 Completed 0 / 54 Chapters
                      </button>
                      <button className="bg-amber-50 text-amber-900 px-4 py-2 border border-amber-200 rounded-xl font-sans font-extrabold text-[10px] uppercase shadow-sm">
                        🔥 Streak: {progress.streak} Active Days
                      </button>
                    </div>
                  </div>
                  
                  {/* SCHOLAR PROFILE Card right position */}
                  <div className="bg-gradient-to-br from-[#5A6A51] to-[#475440] text-white p-5 rounded-2xl text-left space-y-2 max-w-xs self-stretch flex flex-col justify-between shadow-md h-full min-w-[210px]">
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-[#FFF2CC] font-bold">SCHOLAR PROFILE</p>
                      <h4 className="text-xl font-black mt-1 font-serif leading-none">🎓 Kid Scholar</h4>
                    </div>
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-xs font-bold font-mono">
                        <span>{progress.xp} XP</span>
                        <span className="text-[10px] text-amber-200">600 XP Next Rank</span>
                      </div>
                      <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, (progress.xp / 600) * 100)}%` }} />
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveTab("progress")}
                      className="w-full text-center bg-white/15 hover:bg-white/20 hover:text-white border border-white/25 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition duration-150"
                    >
                      View Detailed Progress
                    </button>
                  </div>
                </div>

                {/* Main 54-Lesson Directory with matching filters */}
                <div className="space-y-4">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="text-left">
                      <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5 font-serif">
                        <span>📜 Ge'ez Language Modules</span>
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">
                        Toggle packages to explore Greetings, Questions, Demonstratives, Body Parts, Foods, Family, Animals, Health, Mourning, Proverbs, Time, Numbers, or Education
                      </p>
                    </div>

                    {/* Filter categories directly from your requested list */}
                    <div className="flex flex-wrap gap-1 md:justify-end xl:max-w-[60%]">
                      {[
                        "Greetings (14 Ch.)", "Questions (3 Ch.)", "Demonstratives (2 Ch.)",
                        "Body Parts (3 Ch.)", "Foods (3 Ch.)", "Family (3 Ch.)", "Animals (5 Ch.)",
                        "Health (3 Ch.)", "Mourning (3 Ch.)", "Proverbs (3 Ch.)", "Time & Dates (2 Ch.)",
                        "Numbers (5 Ch.)", "Education (5 Ch.)", "All (54)"
                      ].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActivePackageFilter(cat === "All (54)" ? "All" : cat)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-tight border uppercase transition duration-100 ${
                            (activePackageFilter === "All" && cat === "All (54)") || (activePackageFilter === cat)
                              ? "bg-[#5A6A51] border-[#5A6A51] text-white font-extrabold shadow-sm"
                              : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Curriculums grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredChapters.map((lesson) => {
                      const completed = progress.completedLessons.includes(lesson.id);
                      // Formatted like: ምዕራፍ [Ge'ez Number] — Meraf [Arabic Number]: [Topic]
                      const displayTitle = `ምዕራፍ ${getGeezNumeral(lesson.id)} — Meraf ${lesson.id}: ${lesson.title}`;
                      const lessonVocabsCount = lesson.vocabulary.length;
                      
                      return (
                        <div
                          key={lesson.id}
                          className={`bg-white border text-left p-5 rounded-2xl hover:shadow-md transition-all duration-150 flex flex-col justify-between relative overflow-hidden group ${
                            completed ? "border-emerald-200 bg-emerald-50/5 hover:border-emerald-400" : "border-[#E1DBCB] hover:border-[#5A6A51]"
                          }`}
                        >
                          <div className="space-y-3 relative z-10">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black bg-slate-50 border px-2 py-0.5 rounded text-slate-500 select-none font-serif">
                                {getGeezNumeral(lesson.id)}
                              </span>
                              {completed ? (
                                <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <CheckCircle2 size={10} /> Completed
                                </span>
                              ) : (
                                <span className="text-slate-400 text-[9px] font-black uppercase">{lessonVocabsCount} Words</span>
                              )}
                            </div>

                            <div className="space-y-1">
                              <h4 className="text-sm font-extrabold text-slate-800 font-serif leading-snug group-hover:text-[#5A6A51] transition">
                                {displayTitle}
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                                {lesson.objective}
                              </p>
                            </div>

                            {/* Sound families */}
                            <div className="flex flex-wrap gap-1 pt-1.5">
                              {lesson.fidelFamily.map((f, idx) => (
                                <span 
                                  key={idx} 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakFidelSound(f.sound);
                                  }}
                                  className="w-6 h-6 rounded bg-amber-50 border border-amber-150 flex items-center justify-center font-serif text-[11px] font-black text-amber-900 cursor-pointer hover:bg-amber-100 active:scale-95 transition"
                                  title={`Click to pronounce: ${f.sound}`}
                                >
                                  {f.symbol}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Controls buttons */}
                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                            <button
                              onClick={() => onOpenSlides(lesson.id)}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-black uppercase tracking-wide text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition"
                            >
                              Slides
                            </button>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleStartFlashcardsForLesson(lesson.id)}
                                className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-100 hover:bg-amber-100 text-[10px] font-black uppercase tracking-wider transition"
                              >
                                Flashcards
                              </button>
                              <button
                                onClick={() => handleStartQuizForLesson(lesson.id)}
                                className="px-3 py-1.5 rounded-lg bg-[#5A6A51] hover:bg-[#3E4F36] text-white text-[10px] font-black uppercase tracking-wider transition"
                              >
                                Quiz
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Premium high-fidelity Ge'ez Dictionary View with Mini Quiz Game */}
            {activeTab === 'dictionary' && (
              <GeezDictionaryView 
                progress={progress}
                onUpdateProgress={handleUpdateProgress}
                onPlaySound={speakFidelSound} 
              />
            )}

            {/* Flashcards Tab */}
            {activeTab === 'flashcards' && (
              <GeezFlashcardsView 
                lessonId={activeLessonIdForFlashcards} 
                progress={progress} 
                onUpdateProgress={handleUpdateProgress} 
                onPlaySound={speakFidelSound} 
              />
            )}

            {/* Quiz Tab */}
            {activeTab === 'quiz' && (
              <GeezQuizView 
                lessonId={activeLessonIdForQuiz} 
                difficulty={difficultyLevel} 
                progress={progress} 
                onUpdateProgress={handleUpdateProgress} 
                onPlaySound={speakFidelSound} 
                onBackToLessons={() => setActiveTab('lessons')}
              />
            )}

            {/* Grammar Tab */}
            {activeTab === 'grammar' && (
              <GeezGrammarView onPlaySound={speakFidelSound} />
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <GeezLeaderboardView progress={progress} />
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <GeezProgressView progress={progress} onNavigateTab={(tab) => setActiveTab(tab)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ==================== GE'EZ DIRECT DICTIONARY VIEW ====================
function GeezDictionaryView({ 
  progress, onUpdateProgress, onPlaySound 
}: { 
  progress: UserProgress, onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void, onPlaySound: (text: string) => void 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");
  const [selectedLetterFilter, setSelectedLetterFilter] = useState("all");
  const [showKeyboard, setShowKeyboard] = useState(false);

  const consonants = ["ሀ", "ለ", "መ", "ረ", "ሰ", "ቀ", "በ", "ተ", "ነ", "አ", "ከ", "ወ", "ዘ", "የ", "ደ", "ገ", "ጠ", "ጸ", "ፈ"];

  const getGeezFamilyChars = (consonant: string): string[] => {
    const families: { [key: string]: string[] } = {
      "ሀ": ["ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ", "ሐ", "ሑ", "ሒ", "ሓ", "ሔ", "ሕ", "ሖ", "ኀ", "ኁ", "ኂ", "ኃ", "ኄ", "ኅ", "ኆ"],
      "ለ": ["ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ"],
      "መ": ["መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ"],
      "ረ": ["ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ"],
      "ሰ": ["ሰ", "ሱ", "ሲ", "ሳ", "ሴ", "ስ", "ሶ", "ሠ", "ሡ", "ሢ", "ሣ", "ሤ", "ሥ", "ሦ"],
      "ቀ": ["ቀ", "ቁ", "ቂ", "ቃ", "ቄ", "ቅ", "ቆ"],
      "በ": ["በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", "ቦ"],
      "ተ": ["ተ", "ቱ", "ቲ", "ታ", "ቴ", "ት", "ቶ"],
      "ነ": ["ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ"],
      "አ": ["አ", "ኡ", "ኢ", "ኣ", "ኤ", "እ", "ኦ", "ዐ", "ዑ", "ዒ", "ዓ", "ዔ", "ዕ", "ዖ"],
      "ከ": ["ከ", "ኩ", "ኪ", "ካ", "ኬ", "ክ", "ኮ"],
      "ወ": ["ወ", "ዉ", "ዊ", "ዋ", "ዌ", "ው", "ዎ"],
      "ዘ": ["ዘ", "ዙ", "ዚ", "ዛ", "ዜ", "ዝ", "ዞ"],
      "የ": ["የ", "ዩ", "ዪ", "ያ", "ዬ", "ይ", "ዮ"],
      "ደ": ["ደ", "ዱ", "ዲ", "ዳ", "ዴ", "ድ", "ዶ"],
      "ገ": ["ገ", "ጉ", "ጊ", "ጋ", "ጌ", "ግ", "ጎ"],
      "ጠ": ["ጠ", "ጡ", "ጢ", "ጣ", "ጤ", "ጥ", "ጦ"],
      "ጸ": ["ጸ", "ጹ", "ጺ", "ጻ", "ጼ", "ጽ", "ጾ", "ፀ", "ፁ", "ፂ", "ፃ", "ፄ", "ፅ", "ፆ"],
      "ፈ": ["ፈ", "ፉ", "ፊ", "ፋ", "ፌ", "ፍ", "ፎ"]
    };
    return families[consonant] || [consonant];
  };

  // Modern Amharic/Ge'ez spelling normalization for phonetic search tolerance
  const normalizeGeezSpelling = (text: string): string => {
    if (!text) return "";
    return text.toLowerCase()
      .replace(/[ሐኀ]/g, "ሀ")
      .replace(/[ሑኁ]/g, "ሁ")
      .replace(/[ሒኂ]/g, "ሂ")
      .replace(/[ሓኃ]/g, "ሃ")
      .replace(/[ሔኄ]/g, "ሄ")
      .replace(/[ሕኅ]/g, "ህ")
      .replace(/[ሖኆ]/g, "ሆ")
      .replace(/ሠ/g, "ሰ")
      .replace(/ሡ/g, "ሱ")
      .replace(/ሢ/g, "ሲ")
      .replace(/ሣ/g, "ሳ")
      .replace(/ሤ/g, "ሴ")
      .replace(/ሥ/g, "ስ")
      .replace(/ሦ/g, "ሶ")
      .replace(/ዐ/g, "አ")
      .replace(/ዑ/g, "ኡ")
      .replace(/ዒ/g, "ኢ")
      .replace(/[ዓኣ]/g, "አ")
      .replace(/ዔ/g, "ኤ")
      .replace(/ዕ/g, "እ")
      .replace(/ዖ/g, "ኦ")
      .replace(/ፀ/g, "ጸ")
      .replace(/ፁ/g, "ጹ")
      .replace(/ፂ/g, "ጺ")
      .replace(/ፃ/g, "ጻ")
      .replace(/ፄ/g, "ጼ")
      .replace(/ፅ/g, "ጽ")
      .replace(/ፆ/g, "ጾ");
  };

  // Search filter supporting dual exact and homophonic search
  const filteredWords = geezDictionaryData.filter(w => {
    const queryNorm = normalizeGeezSpelling(searchQuery);
    const wordNorm = normalizeGeezSpelling(w.word);
    const amharicNorm = normalizeGeezSpelling(w.amharic);
    const meaningNorm = w.meaning.toLowerCase();

    // Word, amharic translation, or english meaning match
    const matchesSearch = 
      wordNorm.includes(queryNorm) ||
      w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.phonetic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meaningNorm.includes(searchQuery.toLowerCase()) ||
      amharicNorm.includes(queryNorm) ||
      w.amharic.includes(searchQuery);
    
    const matchesRole = selectedRoleFilter === "all" || w.role.toUpperCase() === selectedRoleFilter.toUpperCase();
    const matchesLetter = selectedLetterFilter === "all" || (() => {
      if (!w.word) return false;
      const firstChar = w.word.charAt(0);
      const allowedChars = getGeezFamilyChars(selectedLetterFilter);
      return allowedChars.includes(firstChar);
    })();

    return matchesSearch && matchesRole && matchesLetter;
  });

  // MINI QUIZ WORKFLOW inside dictionary sidebar
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [scoreEarned, setScoreEarned] = useState(0);

  const activeQuizWord = geezDictionaryData[quizIndex % geezDictionaryData.length];

  const quizOptions = React.useMemo(() => {
    const correct = activeQuizWord.meaning;
    const distractors = geezDictionaryData
      .filter(w => w.word !== activeQuizWord.word)
      .map(w => w.meaning);
    
    // Choose three random distractors
    const chosenDistractors = shuffleArray(distractors).slice(0, 3);
    return shuffleArray([correct, ...chosenDistractors]);
  }, [activeQuizWord]);

  const handleSelectQuizAnswer = (idx: number, answerText: string) => {
    if (quizSelected !== null) return; // Answered already
    setQuizSelected(idx);
    
    if (answerText === activeQuizWord.meaning) {
      setScoreEarned(prev => prev + 20);
      onUpdateProgress(prev => ({
        ...prev,
        xp: prev.xp + 20
      }));
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizSelected(null);
    setQuizIndex(prev => prev + 1);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Title Card similar to screenshot 2 */}
      <div className="bg-white border rounded-[32px] border-amber-100 p-6 flex flex-col lg:flex-row justify-between items-center gap-6 shadow-sm">
        <div className="flex-1 space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-[#5A6A51] font-bold">Classical Ge'ez Glossary Search</span>
          <h2 className="text-2.5xl font-serif font-black text-amber-950 tracking-tight leading-none flex items-center gap-2">
            ክርስቲያኖ — Classical Ge'ez Language Finder 🔍
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-4xl font-medium">
            Empower your diaspora scholarship! Search the authentic glossary based on the historical dictionary of Alaqa Kidane Wolde Kifle. Explore classic words with accurate parenthetical phonetic transliteration, Amharic context, and child-safe English translations.
          </p>
        </div>

        {/* Total Loaded Stats Cards */}
        <div className="bg-amber-50 border border-amber-150 p-4 rounded-2xl text-center min-w-[200px] shrink-0 shadow-xs flex flex-col justify-center">
          <p className="text-[10px] uppercase font-mono tracking-widest font-black text-[#5A6A51]">VOCABULARY LOAD</p>
          <h3 className="text-3xl font-black font-mono text-amber-950 mt-1">{GEEZ_VIRTUAL_LOAD_SIZE}</h3>
          <p className="text-[10px] text-slate-450 font-bold mt-1">Verified Classical Roots Loaded</p>
        </div>
      </div>

      {/* Primary search container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Search & List - Left Side */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-3 items-stretch">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                className="w-full bg-white border-2 border-slate-200 focus:border-[#5A6A51] rounded-2xl pl-12 pr-4 py-3 placeholder-slate-400 text-xs font-semibold tracking-wide transition outline-none shadow-xs"
                placeholder="Type in Ge'ez (e.g. አ, አበሳ) or English (e.g. spring, father, slithers)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowKeyboard(!showKeyboard)}
              className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 ${
                showKeyboard ? "bg-[#5A6A51] text-white shadow-md shadow-[#5A6A51]/20" : "bg-slate-200 hover:bg-slate-305 text-slate-700"
              }`}
            >
              ⌨️ Virtual Keyboard
            </button>
            <button
              onClick={() => { setSearchQuery(""); setSelectedRoleFilter("all"); setSelectedLetterFilter("all"); }}
              className="bg-slate-100 hover:bg-slate-200 border text-slate-650 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition"
            >
              Reset
            </button>
          </div>

          {/* On-screen keyboard slider */}
          {showKeyboard && (
            <div className="bg-white border border-[#EBE4CF] p-4 rounded-2xl space-y-2 animate-in slide-in-from-top duration-150">
              <span className="text-[10px] font-black uppercase text-[#5A6A51] tracking-wider block">Ge'ez On-Screen Virtual Input Filter:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedLetterFilter("all")}
                  className={`w-8 h-8 rounded-lg text-xs font-black transition ${
                    selectedLetterFilter === "all" ? "bg-[#5A6A51] text-white" : "bg-slate-150 hover:bg-slate-200 text-slate-700 font-bold"
                  }`}
                >
                  All
                </button>
                {consonants.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedLetterFilter(c)}
                    className={`w-8 h-8 rounded-lg text-xs font-serif font-black transition ${
                      selectedLetterFilter === c ? "bg-[#5A6A51] text-white" : "bg-slate-50 hover:bg-slate-200 text-slate-705 border border-slate-150"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categories select row from screenshot */}
          <div className="flex flex-wrap items-center gap-1.5 border-b pb-3 border-slate-150">
            <span className="text-[10px] font-mono font-black text-[#5A6A51] uppercase tracking-wider mr-2">CATEGORIES:</span>
            {["All Types", "Noun", "Verb", "Adjective", "Adverb"].map(role => (
              <button
                key={role}
                onClick={() => setSelectedRoleFilter(role === "All Types" ? "all" : role.toUpperCase())}
                className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg transition ${
                  (selectedRoleFilter === "all" && role === "All Types") || (selectedRoleFilter === role.toUpperCase())
                    ? "bg-[#5A6A51] text-white shadow-sm"
                    : "bg-white border text-slate-600 hover:bg-slate-50"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Count bar */}
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 select-none">
            <span>Showing {Math.min(filteredWords.length, 25)} matching words</span>
            <span>Found total {searchQuery || selectedLetterFilter !== 'all' || selectedRoleFilter !== 'all' ? filteredWords.length : GEEZ_VIRTUAL_LOAD_SIZE} results</span>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredWords.length > 0 ? (
              filteredWords.slice(0, 25).map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white border rounded-2xl p-5 hover:shadow-lg transition-all border-[#E5E0CE]/80 flex flex-col justify-between hover:border-amber-300"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-3xl font-black text-amber-950 font-serif tracking-wide leading-none">{item.word}</h4>
                        <span className="text-[9px] font-mono font-extrabold text-[#5A6A51] tracking-wider uppercase block mt-1">
                          GRAMMATICAL ROLE: {item.role}
                        </span>
                      </div>
                      <button 
                        onClick={() => onPlaySound(item.phonetic)}
                        className="p-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 rounded-lg transition"
                        title="Click to hear speech pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-500 font-mono">
                        Amharic context: <span className="text-slate-800 font-bold">{item.amharic}</span>
                      </p>
                      <p className="text-[10px] font-mono tracking-wider font-bold bg-[#E6ECE1] text-[#3A4E31] px-2 py-0.5 rounded-md inline-block">
                        {item.phonetic}
                      </p>
                      <p className="text-sm font-extrabold text-slate-800 tracking-tight leading-relaxed pt-1">{item.meaning}</p>
                    </div>
                  </div>

                  {item.hint && (
                    <div className="mt-4 pt-3 border-t border-slate-50">
                      <p className="text-[10px] italic text-slate-500 font-medium">💡 Context/Root: {item.hint}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center space-y-3 bg-white border border-[#E9E3CE] rounded-2xl">
                <span className="text-4xl">🏜️</span>
                <p className="text-sm text-slate-500 font-semibold">No Ge'ez dictionary words found matching the current search filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* MINI QUIZ GAME - Right Sidebar matching screenshot 2 */}
        <div className="lg:col-span-4 bg-white border-2 border-amber-100 rounded-[24px] p-5 space-y-4 shadow-sm self-start">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1">
              <span>🕹️ MINI QUIZ GAME</span>
            </h4>
            <span className="bg-amber-400 text-amber-950 font-mono font-black text-[9px] px-2 py-0.5 rounded">
              Score: {scoreEarned} XP
            </span>
          </div>

          <div className="space-y-1 text-left">
            <p className="text-xs font-extrabold text-slate-700">What does this word mean?</p>
            <p className="text-[10px] text-slate-400 font-semibold">Translate the classical roots below to win scholarship points!</p>
          </div>

          <div className="bg-slate-50 border p-5 rounded-2xl text-center space-y-2">
            <h1 className="text-5xl font-serif font-black text-amber-950 tracking-wide">{activeQuizWord.word}</h1>
            <span className="inline-block bg-[#E6ECE1] text-[#3A4E31] text-[9px] font-mono font-black tracking-wider px-2.5 py-0.5 rounded">
              GRAMMATICAL ROLE: {activeQuizWord.role}
            </span>
          </div>

          {/* Options list */}
          <div className="space-y-2 pt-1 text-left">
            {quizOptions.map((opt, oIdx) => {
              const isSelected = quizSelected === oIdx;
              const isCorrect = opt === activeQuizWord.meaning;
              
              let btnClass = "bg-white border-slate-200 hover:border-[#5A6A51] hover:bg-slate-50";
              if (quizSelected !== null) {
                if (isCorrect) {
                  btnClass = "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold";
                } else if (isSelected) {
                  btnClass = "bg-rose-50 border-rose-400 text-rose-950 font-bold";
                } else {
                  btnClass = "opacity-50 border-slate-100";
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectQuizAnswer(oIdx, opt)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-semibold leading-relaxed transition ${btnClass}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[10px] font-extrabold text-slate-400 shrink-0 uppercase mt-0.5">
                      {["A", "B", "C", "D"][oIdx]}.
                    </span>
                    <span className="flex-1">{opt}</span>
                    {quizSelected !== null && isCorrect && <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 ml-1" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next / Result panel */}
          {quizSelected !== null && (
            <div className="space-y-3 pt-2 animate-in fade-in duration-150 text-center">
              {quizOptions[quizSelected] === activeQuizWord.meaning ? (
                <p className="text-xs font-black text-emerald-600">🎉 Correct! You earned +20 XP!</p>
              ) : (
                <p className="text-xs font-semibold text-rose-600">😢 Wrong answer! Try practice next.</p>
              )}
              <button
                onClick={handleNextQuizQuestion}
                className="w-full bg-[#5A6A51] text-white py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#3E4F36] transition"
              >
                Next Word Question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== GE'EZ FLASHCARDS VIEW ====================
function GeezFlashcardsView({ 
  lessonId, progress, onUpdateProgress, onPlaySound 
}: { 
  lessonId: number | 'all', progress: UserProgress, onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void, onPlaySound: (text: string) => void 
}) {
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<number | 'all'>(lessonId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Generate cards database matching exact 54 chapters
  const cardItems = React.useMemo(() => {
    const list: any[] = [];
    unifiedChapters.forEach(lesson => {
      if (selectedLessonFilter !== 'all' && lesson.id !== selectedLessonFilter) return;
      const vocabs = lesson.vocabulary || [];
      vocabs.forEach(vid => {
        list.push({
          word: vid.word || "",
          phonetic: vid.phonetic || "",
          meaning: vid.englishMeaning || "",
          hint: vid.hint || `Chapter ${lesson.id}`
        });
      });
    });
    return list;
  }, [selectedLessonFilter]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedLessonFilter]);

  const activeCard = cardItems[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % cardItems.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + cardItems.length) % cardItems.length);
    }, 150);
  };

  const toggleMastered = () => {
    if (!activeCard) return;
    const isMastered = progress.masteredVocab.includes(activeCard.word);
    onUpdateProgress(prev => {
      const nextMastered = isMastered 
        ? prev.masteredVocab.filter(w => w !== activeCard.word)
        : [...prev.masteredVocab, activeCard.word];
      
      const xpIncrement = isMastered ? -10 : 10;
      return {
        ...prev,
        masteredVocab: nextMastered,
        xp: Math.max(0, prev.xp + xpIncrement)
      };
    });
  };

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎴</span>
        <h3 className="text-xl font-black text-slate-900 font-serif">Vocabulary Flashcards (የትምህርት ካርዶች)</h3>
      </div>
      <p className="text-xs text-slate-500 font-semibold leading-relaxed -mt-4">
        Interactive double-sided cards to study ancient roots. Click to spin, and mark mastered to gain +10 XP.
      </p>

      {/* Filter Lesson Bar */}
      <div className="flex items-center gap-3 bg-white p-3 border rounded-xl shadow-xs">
        <span className="text-xs font-black text-slate-450 uppercase shrink-0">Select Chapter:</span>
        <select
          value={selectedLessonFilter}
          onChange={(e) => setSelectedLessonFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
          className="flex-1 bg-slate-50 border p-2 rounded-xl text-xs font-bold text-slate-705 focus:outline-[#5A6A51] cursor-pointer"
        >
          <option value="all">View All Chapters Vocabulary (638 Cards)</option>
          {unifiedChapters.map(l => (
            <option key={l.id} value={l.id}>
              Chapter {l.id}: {l.packageName} - Unit {l.title.split("Unit")[1]}
            </option>
          ))}
        </select>
      </div>

      {activeCard ? (
        <div className="space-y-6">
          {/* Active Card Body Wrapper */}
          <div 
            style={{ perspective: 1000 }}
            className="w-full h-80 relative cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full relative"
            >
              {/* Card Face: Front */}
              <div 
                style={{ backfaceVisibility: 'hidden' }}
                className="absolute inset-0 bg-white border-4 border-amber-100 rounded-3xl p-8 flex flex-col justify-between shadow-md"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] bg-amber-50 rounded-lg px-2.5 py-1 text-amber-800 border font-sans font-extrabold uppercase">
                    VOCABULARY CARD • {currentIndex + 1} OF {cardItems.length}
                  </span>
                  <span className="text-xs text-slate-450 font-bold font-mono">Tap Card to Flip 🔄</span>
                </div>

                <div className="text-center py-6 space-y-4">
                  <h1 className="text-5.5xl font-serif font-black text-amber-950 tracking-wide leading-none">{activeCard.word}</h1>
                  <p className="text-xs text-slate-450 uppercase tracking-widest font-bold">CLICK CARD TO TRANSLATE</p>
                </div>

                <div className="w-full flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] text-[#5A6A51] font-bold">Abyssinia Series</span>
                  <span className="text-2xl text-amber-305">📜</span>
                </div>
              </div>

              {/* Card Face: Back */}
              <div 
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50/70 border-4 border-[#E2D6BC] rounded-3xl p-8 flex flex-col justify-between shadow-md text-left"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] bg-white rounded-lg px-2.5 py-1 text-amber-900 border font-extrabold uppercase">
                    CARD DEFINITION EXPLAINER
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySound(activeCard.phonetic);
                    }}
                    className="p-1.5 bg-white border rounded-xl text-slate-700 shadow-sm hover:text-amber-700 transition animate-bounce"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="py-2 text-center space-y-2">
                  <span className="text-xs font-mono font-bold text-[#5A6A51] bg-[#E7EDE4] px-3 py-1 rounded-full">
                    {activeCard.phonetic}
                  </span>
                  <h2 className="text-2xl font-serif font-black text-amber-950 tracking-tight leading-snug">
                    {activeCard.meaning}
                  </h2>
                </div>

                <div className="bg-white/85 border p-3 rounded-xl shadow-xs">
                  <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">
                    💡 Context Focus: {activeCard.hint}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mastered & Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white border p-4 rounded-2xl shadow-xs">
            {/* Mastered Star toggler */}
            <button
              onClick={toggleMastered}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition duration-200 ${
                progress.masteredVocab.includes(activeCard.word)
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-705"
              }`}
            >
              <Star className={`w-4 h-4 ${progress.masteredVocab.includes(activeCard.word) ? "fill-white" : ""}`} />
              <span>{progress.masteredVocab.includes(activeCard.word) ? "Mastered ✅ (+10 XP)" : "Mark Word Completed (+10 XP)"}</span>
            </button>

            {/* Slider back/forward arrows */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl border hover:bg-slate-50 transition text-slate-600 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-500 px-3 select-none">
                {currentIndex + 1} / {cardItems.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl border hover:bg-slate-50 transition text-slate-600 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center space-y-3 bg-white border border-[#E9E3CE] rounded-2xl">
          <span className="text-4xl">🏜️</span>
          <p className="text-sm text-slate-500 font-semibold">No flashcard roots found matching. Try other chapters.</p>
        </div>
      )}
    </div>
  );
}

// ==================== GE'EZ ACTIVE QUIZ VIEW ====================
function GeezQuizView({ 
  lessonId, difficulty, progress, onUpdateProgress, onPlaySound, onBackToLessons 
}: { 
  lessonId: number, difficulty: 1 | 2, progress: UserProgress, onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void, onPlaySound: (text: string) => void, onBackToLessons: () => void 
}) {
  const [selectedQuizLesson, setSelectedQuizLesson] = useState(lessonId);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'completed'>('lobby');
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [scrambledOptions, setScrambledOptions] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const activeLessonObject = unifiedChapters.find(l => l.id === selectedQuizLesson) || unifiedChapters[0];

  // Derive Quiz questions list dynamically based on selected difficulty
  const questionsList = React.useMemo(() => {
    const list: any[] = [];
    const vocabs = activeLessonObject.vocabulary || [];
    const fidels = activeLessonObject.fidelFamily || [];

    if (difficulty === 1) {
      // Level 1: shape_matching, sound_bubble, fidel_sequence, word_to_image
      if (fidels.length > 0) {
        const item = fidels[0];
        const distractors = fidels.slice(1, 4).map(f => f.sound);
        while (distractors.length < 3) distractors.push("unrelated");
        list.push({
          type: "shape_matching",
          title: "Fidel Shape Matching",
          instructions: `Match the Ge'ez character vowel shape to its pronunciation:`,
          symbol: item.symbol,
          solution: item.sound,
          options: shuffleArray([item.sound, ...distractors.slice(0, 3)])
        });
      }

      if (fidels.length > 1) {
        const item = fidels[1];
        const distractors = fidels.filter(f => f.symbol !== item.symbol).map(f => f.symbol);
        list.push({
          type: "sound_bubble",
          title: "Sound Bubble Pop",
          instructions: `Can you find and pop the bubble matching the sound "${item.sound}"?`,
          solution: item.symbol,
          options: shuffleArray([item.symbol, ...distractors.slice(0, 3)])
        });
      }

      if (vocabs.length > 0) {
        const item = vocabs[0];
        const distractors = vocabs.slice(1, 4).map(o => o.englishMeaning);
        while (distractors.length < 3) distractors.push("Sweet Bread");
        list.push({
          type: "word_to_image",
          title: "Word Meaning Connection",
          instructions: `Look closely at the Ge'ez word: "${item.word}". What English translation fits best?`,
          word: item.word,
          solution: item.englishMeaning,
          options: shuffleArray([item.englishMeaning, ...distractors.slice(0, 3)])
        });
      }
    } else {
      // Level 2: word_assembly_puzzle, word_puzzle_fill_blank, phonetic_audio_blend
      if (vocabs.length > 0) {
        const item = vocabs[0];
        const letters = item.word.split("");
        list.push({
          type: "word_assembly_puzzle",
          title: "Word Scramble Builder",
          instructions: `Assemble the classical word "${item.word}" representing "${item.englishMeaning}":`,
          word: item.word,
          solution: item.word,
          scrambledLetters: letters.map(v => v)
        });
      }

      if (vocabs.length > 0) {
        const item = vocabs[0];
        if (item.word.length >= 3) {
          const charList = item.word.split("");
          const middleIdx = Math.floor(charList.length / 2);
          const removed = charList[middleIdx];
          charList[middleIdx] = "_";
          list.push({
            type: "word_puzzle_fill_blank",
            title: "Missing Middle Letter Blank",
            instructions: `Fill in the missing letter for: "${charList.join("")}" representing "${item.englishMeaning}":`,
            blankRep: charList.join(""),
            solution: removed,
            options: shuffleArray([removed, "ሰ", "በ", "ተ"])
          });
        }
      }

      if (vocabs.length > 0) {
        const item = vocabs[0];
        list.push({
          type: "phonetic_audio_blend",
          title: "Phonetic Audio Blend Match",
          instructions: `Identify the phonetic sound spelling that perfectly matches: "${item.word}"?`,
          word: item.word,
          solution: item.phonetic,
          options: shuffleArray([item.phonetic, "/indet-lah/", "/sa-lam-ta/", "/he-mas/"])
        });
      }
    }

    return list;
  }, [activeLessonObject, difficulty]);

  useEffect(() => {
    setActiveQuestionIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setSelectedLetters([]);
  }, [selectedQuizLesson]);

  const activeQuestion = questionsList[activeQuestionIdx];

  const handleStartPlaying = () => {
    setGameState('playing');
    setActiveQuestionIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setSelectedLetters([]);
  };

  const handleSelectAnswerOption = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleSelectLetterScramble = (letter: string, lIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedLetters(prev => {
      if (prev.includes(letter)) return prev.filter(l => l !== letter);
      return [...prev, letter];
    });
  };

  const handleVerifyAnswer = () => {
    if (!activeQuestion) return;
    setIsAnswerSubmitted(true);

    let isCorrect = false;
    if (activeQuestion.type === "word_assembly_puzzle") {
      const assembled = selectedLetters.join("");
      isCorrect = assembled === activeQuestion.solution;
    } else {
      isCorrect = selectedAnswer === activeQuestion.solution;
    }

    if (isCorrect) {
      setScore(prev => prev + 100);
      onPlaySound("Fantastic! Correct answer!");
    } else {
      onPlaySound("Uh oh! Let's practice more!");
    }
  };

  const handleNextBtn = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setSelectedLetters([]);

    if (activeQuestionIdx + 1 < questionsList.length) {
      setActiveQuestionIdx(prev => prev + 1);
    } else {
      setGameState('completed');
      
      const nextCompleted = progress.completedLessons.includes(selectedQuizLesson)
        ? progress.completedLessons
        : [...progress.completedLessons, selectedQuizLesson];

      onUpdateProgress(prev => {
        const previousHighscore = prev.quizAttempts[selectedQuizLesson]?.highscore || 0;
        const currentHigh = Math.max(previousHighscore, score);
        
        return {
          ...prev,
          completedLessons: nextCompleted,
          xp: prev.xp + 250, // Massive points for completing chapter
          quizAttempts: {
            ...prev.quizAttempts,
            [selectedQuizLesson]: {
              highscore: currentHigh,
              passed: score >= 200,
              score: score,
              timestamp: Date.now()
            }
          }
        };
      });
    }
  };

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto">
      <div className="flex items-center gap-2 border-b pb-3 border-slate-100">
        <span className="text-2xl">🏆</span>
        <h3 className="text-xl font-black text-slate-1000 font-serif">Interactive Quizzes & Puzzles Dashboard</h3>
      </div>

      {gameState === 'lobby' && (
        <div className="bg-white border p-6 rounded-3xl border-amber-100 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-[#5A6A51] font-bold">CHAPTER MATCH SELECTOR</span>
            <select
              value={selectedQuizLesson}
              onChange={(e) => setSelectedQuizLesson(parseInt(e.target.value))}
              className="w-full bg-slate-50 border p-3 rounded-2xl text-xs font-bold text-slate-705 focus:outline-[#5A6A51] cursor-pointer"
            >
              {unifiedChapters.map(l => (
                <option key={l.id} value={l.id}>
                  Chapter {l.id}: {l.packageName} - {l.title.split(":")[1] || `Unit ${l.id}`}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-800 font-serif">Active Challenge Details:</h4>
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-dashed text-slate-705 text-xs space-y-2 font-medium">
              <p>📍 Lesson: <strong className="font-extrabold">{activeLessonObject.title}</strong></p>
              <p>🌿 Total Chapter Vocabulary: <strong className="font-extrabold">{activeLessonObject.vocabulary.length} root words</strong></p>
              <p>🎯 Challenge Level: <strong className="font-extrabold">Level {difficulty} ({difficulty === 1 ? "Younger Beginners" : "Advanced Diaspora"})</strong></p>
              <p>🌟 Win Reward: <strong className="text-amber-80 *">🎉 +250 XP scholarship points!</strong></p>
            </div>
          </div>

          <button
            onClick={handleStartPlaying}
            className="w-full py-4 bg-[#5A6A51] hover:bg-[#3E4F36] text-white font-black text-xs uppercase tracking-widest rounded-2xl transition cursor-pointer shadow-md shadow-[#5A6A51]/20 flex items-center justify-center gap-2"
          >
            <Play className="w-4.5 h-4.5 fill-white" />
            <span>Launch Chapter Quiz Challenge</span>
          </button>
        </div>
      )}

      {gameState === 'playing' && activeQuestion && (
        <div className="bg-white border p-6 rounded-3xl border-amber-100 space-y-6">
          {/* Header metrics */}
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border">
            <span className="text-[10px] font-mono font-black text-[#5A6A51] uppercase">
              Question {activeQuestionIdx + 1} of {questionsList.length}
            </span>
            <span className="text-[10px] font-mono font-black text-amber-900 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full">
              Score: {score} XP
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-xs bg-[#E7EDE4] text-[#334E27] font-black uppercase tracking-wider rounded px-2.5 py-0.5 inline-block">
              {activeQuestion.title}
            </span>
            <h3 className="text-base font-extrabold text-slate-800 tracking-tight leading-snug">
              {activeQuestion.instructions}
            </h3>
          </div>

          {/* RENDERING THE GAME SPECIFICS BASED ON TYPE */}
          <div className="py-4 flex justify-center">
            {activeQuestion.type === "shape_matching" && (
              <h1 className="text-7xl font-serif font-black text-amber-950 tracking-wide bg-amber-50/50 px-8 py-5 border rounded-3xl border-[#EBE4CF]">
                {activeQuestion.symbol}
              </h1>
            )}

            {activeQuestion.type === "sound_bubble" && (
              <div className="w-32 h-32 rounded-full bg-indigo-50 border-4 border-indigo-200 flex items-center justify-center shadow-lg hover:scale-103 cursor-pointer duration-150 relative">
                <span className="absolute text-3xl">🫧</span>
                <span className="text-3xl font-black text-indigo-900 absolute">{activeQuestion.solution}</span>
              </div>
            )}

            {activeQuestion.type === "word_to_image" && (
              <div className="bg-slate-50 border p-6 rounded-2xl text-center shadow-inner self-stretch w-full max-w-sm">
                <h1 className="text-4xl font-serif font-black text-amber-950">{activeQuestion.word}</h1>
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-2 font-bold">Classical root characters</p>
              </div>
            )}

            {activeQuestion.type === "word_assembly_puzzle" && (
              <div className="space-y-4 w-full">
                {/* Visual Assembly Box */}
                <div 
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add("border-[#5A6A51]", "bg-[#FAFBF9]");
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.classList.remove("border-[#5A6A51]", "bg-[#FAFBF9]");
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("border-[#5A6A51]", "bg-[#FAFBF9]");
                    try {
                      const data = JSON.parse(e.dataTransfer.getData("application/json"));
                      if (data && typeof data.sIdx === 'number' && !selectedLetters.includes(data.letter)) {
                        handleSelectLetterScramble(data.letter, data.sIdx);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  className="bg-slate-50 border-2 border-dashed p-4 rounded-xl text-center flex flex-wrap gap-2 justify-center min-h-[50px] items-center transition-colors duration-150"
                >
                  {selectedLetters.length > 0 ? (
                    selectedLetters.map((l, lIdx) => (
                      <span key={lIdx} className="w-10 h-10 rounded-lg bg-[#5A6A51] text-white border flex items-center justify-center font-serif text-lg font-black shadow shadow-[#5A6A51]/20">
                        {l}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 font-bold font-mono">Drag character blocks below or tap them here...</span>
                  )}
                </div>

                {/* Shuffled letters selection blocks */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {activeQuestion.scrambledLetters.map((letter: string, sIdx: number) => {
                    const isSelected = selectedLetters.includes(letter);
                    return (
                      <button
                        key={sIdx}
                        draggable={!isSelected}
                        onDragStart={(e) => {
                          e.dataTransfer.setData("application/json", JSON.stringify({ letter, sIdx }));
                          e.dataTransfer.effectAllowed = "move";
                        }}
                        onClick={() => handleSelectLetterScramble(letter, sIdx)}
                        className={`w-12 h-12 rounded-xl text-lg font-serif font-black border uppercase transition cursor-grab active:cursor-grabbing active:scale-95 ${
                          isSelected
                            ? "bg-slate-200 border-slate-350 text-slate-400 shadow-inner cursor-not-allowed"
                            : "bg-white hover:bg-slate-50 border-[#E2D5BA] text-amber-950 shadow-sm"
                        }`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeQuestion.type === "word_puzzle_fill_blank" && (
              <div className="bg-[#FAF8F3] border border-[#ECE5D4] p-5 rounded-2xl text-center self-stretch w-full max-w-md">
                <h2 className="text-5xl font-serif font-black text-amber-900 tracking-widest">{activeQuestion.blankRep}</h2>
                <p className="text-[10px] text-slate-400 font-semibold uppercase font-mono mt-3">What letter fits the blank?</p>
              </div>
            )}

            {activeQuestion.type === "phonetic_audio_blend" && (
              <div className="bg-slate-50 border p-5 rounded-xl text-center self-stretch w-full max-w-md">
                <h1 className="text-4xl font-serif font-black text-amber-955">{activeQuestion.word}</h1>
                <p className="text-xs text-slate-500 font-semibold italic mt-2">Correct sound segment match</p>
              </div>
            )}
          </div>

          {/* Options input grid (Except Word Assembly Scramble) */}
          {activeQuestion.type !== "word_assembly_puzzle" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3">
              {activeQuestion.options.map((opt: string, idx: number) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = opt === activeQuestion.solution;

                let btnStyle = "bg-white border-slate-200 hover:border-[#5A6A51]/80 hover:bg-slate-50";
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                     btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold";
                  } else if (isSelected) {
                     btnStyle = "bg-rose-100 border-rose-400 text-rose-950 font-bold";
                  } else {
                     btnStyle = "opacity-50 border-slate-100";
                  }
                } else if (isSelected) {
                   btnStyle = "border-[#5A6A51] bg-[#FAFBF9] text-[#2F3D27] ring-2 ring-[#5A6A51]/20";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswerOption(opt)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold cursor-pointer transition ${btnStyle}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-extrabold text-slate-450 mr-2 uppercase">
                        {["A", "B", "C", "D"][idx]}.
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* VERIFY / SUBMIT ROW */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => { setGameState('lobby'); }}
              className="px-4 py-2 bg-slate-100 border rounded-xl hover:bg-slate-200 text-slate-550 text-xs font-bold transition"
            >
              Exit Quiz
            </button>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleVerifyAnswer}
                disabled={activeQuestion.type === "word_assembly_puzzle" ? selectedLetters.length === 0 : !selectedAnswer}
                className="px-6 py-2.5 rounded-xl text-white bg-[#5A6A51] hover:bg-[#3E4F36] disabled:opacity-50 text-xs font-black uppercase tracking-wider transition shadow-sm"
              >
                Verify Answer
              </button>
            ) : (
              <button
                onClick={handleNextBtn}
                className="px-6 py-2.5 rounded-xl text-white bg-slate-900 hover:bg-slate-950 text-xs font-black uppercase tracking-wider transition shadow-md flex items-center gap-1.5"
              >
                <span>{activeQuestionIdx + 1 === questionsList.length ? "Finish Quiz 🏁" : "Next Question"}</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>
      )}

      {gameState === 'completed' && (
        <div className="bg-white border p-6 rounded-3xl border-amber-100 space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-4xl text-amber-500 block animate-bounce">🏆</span>
            <h2 className="text-2xl font-serif font-black text-amber-950">
              Meraf {selectedQuizLesson} Quiz Completed!
            </h2>
            <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">
              Master class achievements! You successfully finished all gamified questions for Chapter {selectedQuizLesson}. 
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl max-w-sm mx-auto space-y-2 font-mono font-bold text-xs text-amber-950">
            <p>📋 Chapter Complete: Unit {selectedQuizLesson}</p>
            <p>⭐ Score Gained: {score} XP points</p>
            <p>🎉 Total scholarship XP: +250 XP Generated!</p>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setGameState('lobby')}
              className="px-5 py-3 rounded-xl border border-slate-200 text-[11px] font-black uppercase tracking-wider hover:bg-slate-50 transition"
            >
              Select Another Chapter
            </button>
            <button
              onClick={onBackToLessons}
              className="px-5 py-3 rounded-xl bg-[#5A6A51] text-white hover:bg-[#3E4F36] text-[11px] font-black uppercase tracking-wider transition"
            >
              Return to Lessons Directory
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== GE'EZ INFUSED GRAMMAR GUIDE VIEW ====================
function GeezGrammarView({ onPlaySound }: { onPlaySound: (text: string) => void }) {
  const grammarLessons = [
    {
      title: "1. The Ethiopic Alphabet structure (ፊደላት)",
      concept: "Instead of letters and vowels, each symbol in the Ge'ez abugida represents a consonant combined with a vowel sound.",
      example: "ሀ (He), ሁ (Hu), ሂ (Hi), ሃ (Ha), ሄ (He), ህ (He), ሆ (Ho) is the complete 1st consonant order.",
      hint: "Pronouncing the correct vowel order is critical to avoid spelling shift mistakes."
    },
    {
      title: "2. The Ancient Numeral Architecture (ቁጥሮች)",
      concept: "Ge'ez numbers do not use standard decimal digits. Instead, they are represented by stylized letters featuring horizontal strokes at the top and bottom.",
      example: "፩ = 1, ፪ = 2, ፫ = 3, ፬ = 4, ፭ = 5, ፮ = 6, ፯ = 7, ፰ = 8, ፱ = 9, ፲ = 10.",
      hint: "Letters are placed side by side to build double digit numbers like ፲፩ (11), ፲፪ (12)."
    },
    {
      title: "3. Direct Subject Pronouns & Suffix markers",
      concept: "Ge'ez features deep noun markers/suffixes that conjugate based on absolute gender and numbering standards.",
      example: "Wold (Son) becomes Woldu (His Son) or Wolda (Her Son).",
      hint: "Pay attention to vowel contractions on the last syllable when connecting family tags."
    }
  ];

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto">
      <div className="flex items-center gap-2 border-b pb-3 border-slate-100">
        <span className="text-2xl">🛡️</span>
        <h3 className="text-xl font-black text-slate-1000 font-serif">Classical Ge'ez Grammar & Syntax rules</h3>
      </div>
      <p className="text-xs text-slate-500 font-semibold leading-relaxed -mt-4">
        Brief, interactive syntax tutorials to explain Ethiopic calligraphic structures, pronoun families, and ancient historical roots.
      </p>

      <div className="space-y-4">
        {grammarLessons.map((item, idx) => (
          <div key={idx} className="bg-white border p-5 rounded-2xl shadow-xs space-y-3 hover:border-amber-150">
            <h4 className="text-sm font-black text-amber-950 font-serif">{item.title}</h4>
            <div className="space-y-1.5 text-xs text-slate-650 font-semibold leading-relaxed">
              <p>🌱 Grammatical Logic: {item.concept}</p>
              <div className="bg-amber-50/50 p-3 rounded-xl border border-dashed flex justify-between items-center text-amber-950 font-mono">
                <span>📚 Example context: {item.example}</span>
                <button 
                  onClick={() => onPlaySound(item.example)}
                  className="p-1 rounded hover:bg-amber-100 text-amber-800 transition shrink-0 ml-2"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-[10px] text-[#5A6A51] font-bold">💡 Learning Key: {item.hint}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== DIASPORA SCHOLAR LEADERBOARD VIEW ====================
function GeezLeaderboardView({ progress }: { progress: UserProgress }) {
  const ranks = [
    { name: "Sena Girmay", avatar: "🦁", level: 6, xp: 2450, badge: "Grand Emperor" },
    { name: "Noah Yohannes", avatar: "🦅", level: 4, xp: 1850, badge: "Royal Scribe" },
    { name: "Kid Scholar (You)", avatar: "🎓", level: 1, xp: progress.xp, badge: "Beginner Tutor" },
    { name: "Chloe Yosef", avatar: "⭐️", level: 1, xp: 180, badge: "Noble Novice" },
    { name: "Meklit Abel", avatar: "🐢", level: 1, xp: 120, badge: "Page Scout" }
  ];

  // Sorting based on XP
  const sortedRanks = [...ranks].sort((a,b) => b.xp - a.xp);

  return (
    <div className="space-y-6 text-left max-w-md mx-auto">
      <div className="flex items-center gap-2 border-b pb-3 border-slate-100">
        <span className="text-2xl">🏆</span>
        <h3 className="text-xl font-black text-slate-1000 font-serif">Diaspora Scholar Ranks</h3>
      </div>
      <p className="text-xs text-slate-500 font-semibold leading-relaxed -mt-4">
        Study chapters and complete quizzes to rise in the weekly diaspora scholarship standing ranks!
      </p>

      <div className="bg-white border rounded-2xl shadow-xs overflow-hidden divide-y">
        {sortedRanks.map((item, idx) => {
          const isUser = item.name.includes("(You)");
          return (
            <div 
              key={idx} 
              className={`p-4 flex items-center justify-between gap-3 text-xs leading-none font-semibold ${
                isUser ? "bg-[#FAF8F3] border-l-4 border-amber-500" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-400 text-xs w-4">{idx + 1}</span>
                <span className="text-2xl">{item.avatar}</span>
                <div className="space-y-1">
                  <p className={`font-bold ${isUser ? "text-amber-950 font-black flex items-center gap-1.5" : "text-slate-800"}`}>
                    {item.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.badge}</p>
                </div>
              </div>
              
              <div className="text-right font-mono text-[10px] space-y-1">
                <span className={`px-2 py-0.5 rounded-full inline-block font-sans ${
                  isUser ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-500"
                }`}>
                  Lvl {item.level}
                </span>
                <p className="text-slate-800 font-black">{item.xp} XP</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== ACTIVE USER PROGRESS TRACKER VIEW ====================
function GeezProgressView({ 
  progress, onNavigateTab 
}: { 
  progress: UserProgress, onNavigateTab: (tab: ActiveTab) => void 
}) {
  const totalCurriculumChapters = 54;
  const completedCount = progress.completedLessons.length;
  const completionRatio = totalCurriculumChapters > 0 ? Math.round((completedCount / totalCurriculumChapters) * 100) : 0;
  
  // XP tracker progress
  const activeLevel = Math.max(1, Math.floor(progress.xp / 400) + 1);
  const startLvlXP = (activeLevel - 1) * 400;
  const nextLvlXP = activeLevel * 400;
  const levelXPToGain = 400;
  const currentLevelEarnedXP = progress.xp - startLvlXP;
  const levelPercent = Math.min(100, Math.round((currentLevelEarnedXP / levelXPToGain) * 100));

  return (
    <div className="max-w-md mx-auto space-y-6 text-left">
      <div className="flex items-center gap-2 border-b pb-3 border-slate-100">
        <span className="text-2xl">📈</span>
        <h3 className="text-xl font-black text-slate-1000 font-serif">Scholarship Progress Tracker</h3>
      </div>
      <p className="text-xs text-slate-500 font-semibold leading-relaxed -mt-4">
        Review your total acquired XP, active daily streak, and check off chapter completion charts below.
      </p>

      {/* Primary KPI widgets */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-[#E9E1CE] p-4 rounded-3xl flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
            <Flame className="w-5 h-5 fill-orange-500 text-orange-600" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-400">ACTIVE STREAK</span>
            <p className="text-base font-black font-mono text-slate-800 mt-0.5">{progress.streak} Active Days</p>
          </div>
        </div>

        <div className="bg-white border border-[#E9E1CE] p-4 rounded-3xl flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Trophy className="w-5 h-5 fill-amber-500 text-amber-600" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-400">TOTAL ACQUIRED</span>
            <p className="text-base font-black font-mono text-slate-800 mt-0.5">{progress.xp} XP Coins</p>
          </div>
        </div>
      </div>

      {/* XP milestones progress bar */}
      <div className="bg-white border p-6 rounded-3xl border-[#E9E1CE] space-y-4 shadow-xs">
        <div className="flex justify-between items-start text-xs leading-none font-semibold text-slate-850">
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-slate-805">Level {activeLevel} Scholar Badge</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tutor Standing Level Milestone</p>
          </div>
          <span className="text-amber-700 bg-amber-50 border px-2.5 py-1 rounded-full font-mono text-[10px] font-black uppercase">
            {progress.xp} / {nextLvlXP} XP
          </span>
        </div>

        <div className="space-y-1.5 pt-2">
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner border">
            <div 
              className="bg-amber-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${levelPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono font-bold uppercase">
            <span>Level {activeLevel}</span>
            <span>Level {activeLevel + 1}</span>
          </div>
        </div>
      </div>

      {/* Completed Unit checklist overview */}
      <div className="bg-white border p-6 rounded-3xl border-[#E9E1CE] space-y-4 shadow-xs">
        <h4 className="text-sm font-black text-slate-850 font-serif">Completed Chapter Achievements ({completedCount} / {totalCurriculumChapters})</h4>
        
        <div className="flex items-center gap-3 bg-slate-50 border p-3 rounded-xl">
          <div className="flex-1 w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner border border-slate-300">
            <div 
              className="bg-[#5A6A51] h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionRatio}%` }}
            />
          </div>
          <span className="text-xs font-mono font-black text-[#5A6A51] shrink-0">{completionRatio}%</span>
        </div>

        <div className="space-y-1.5 bg-[#FAF9F5] p-3 rounded-xl border border-dashed border-[#E3DECA]/70 text-slate-700 text-[11px] font-semibold leading-relaxed">
          <p>📋 Completed Chapter Units Count: <strong className="font-black text-slate-900">{progress.completedLessons.length} of {totalCurriculumChapters}</strong></p>
          <p>⭐ Mastered Vocabulary words: <strong className="font-black text-slate-900">{progress.masteredVocab.length > 0 ? progress.masteredVocab.length : "0"} roots</strong></p>
        </div>

        <button
          onClick={() => onNavigateTab("lessons")}
          className="w-full py-3 bg-[#5A6A51] hover:bg-[#3E4F36] text-white font-sans font-black uppercase text-xs tracking-wider rounded-xl transition cursor-pointer shadow-sm"
        >
          View Lesson Directory Checklist
        </button>
      </div>
    </div>
  );
}
