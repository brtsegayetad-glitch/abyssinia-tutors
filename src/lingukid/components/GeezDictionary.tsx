import { useState, useMemo, useEffect } from 'react';
import geezData from '../data/geez_dictionary.json';
import { Search, Sparkles, BookOpen, Heart, RefreshCw, X, ArrowRight, CornerDownRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GeezWord {
  geez: string;
  amharic: string;
  english: string;
  type: string;
}

const FIDEL_FAMILIES: Record<string, string[]> = {
  "ሀ": ["ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ"],
  "ለ": ["ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ"],
  "ሐ": ["ሐ", "ሑ", "ሒ", "ሓ", "ሔ", "ሕ", "ሖ"],
  "መ": ["መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ"],
  "ሠ": ["ሠ", "ሡ", "ሢ", "ሣ", "ሤ", "ሥ", "ሦ"],
  "ረ": ["ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ"],
  "ሰ": ["ሰ", "ሱ", "ሲ", "ሳ", "ሴ", "ስ", "ሶ"],
  "ቀ": ["ቀ", "ቁ", "ቂ", "ቃ", "ቄ", "ቅ", "ቆ"],
  "በ": ["በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", "ቦ"],
  "ተ": ["ተ", "ተ", "ቲ", "ታ", "ቴ", "ት", "ቶ"],
  "ኀ": ["ኀ", "ኁ", "ኂ", "ኃ", "ኄ", "ኅ", "ኆ"],
  "ነ": ["ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ"],
  "አ": ["አ", "ኡ", "ኢ", "አ", "ኤ", "እ", "ኦ"],
  "ከ": ["ከ", "ኩ", "ኪ", "ካ", "ኬ", "ክ", "ኮ"],
  "ወ": ["ወ", "ዉ", "ዊ", "ዋ", "ዌ", "ው", "ዎ"],
  "ዐ": ["ዐ", "ዑ", "ዒ", "ዓ", "ዔ", "ዕ", "ዖ"],
  "ዘ": ["ዘ", "ዙ", "ዚ", "ዛ", "ዜ", "ዝ", "ዞ"],
  "የ": ["የ", "ዩ", "ዪ", "ያ", "ዬ", "ይ", "ዮ"],
  "ደ": ["ደ", "ዱ", "ዲ", "ዳ", "ዴ", "ድ", "ዶ"],
  "ገ": ["ገ", "ጉ", "ጊ", "ጋ", "ጌ", "ግ", "ጎ"],
  "ጠ": ["ጠ", "ጡ", "ጢ", "ጣ", "ጤ", "ጥ", "ጦ"],
  "ጰ": ["ጰ", "ጱ", "ጲ", "ጳ", "ጴ", "ጵ", "ጶ"],
  "ጸ": ["ጸ", "ጹ", "ጺ", "ጻ", "ጼ", "ጽ", "ጾ"],
  "ፀ": ["ፀ", "ፁ", "ጺ", "ጻ", "ጼ", "ፅ", "ፆ"],
  "ፈ": ["ፈ", "ፉ", "ፊ", "ፋ", "ፌ", "ፍ", "ፎ"],
  "ፐ": ["ፐ", "ፑ", "ፒ", "ፓ", "ፔ", "ፕ", "ፖ"]
};

export default function GeezDictionary() {
  const words = geezData as GeezWord[];
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Noun' | 'Verb' | 'Adjective' | 'Adverb'>('all');
  const [selectedLetterFamily, setSelectedLetterFamily] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(25);
  
  // Virtual Keyboard states
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeFamily, setActiveFamily] = useState<string | null>(null);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('geez_dictionary_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (word: string) => {
    setFavorites(prev => {
      const next = prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word];
      localStorage.setItem('geez_dictionary_favorites', JSON.stringify(next));
      return next;
    });
  };

  // Mini Quiz States
  const [quizWord, setQuizWord] = useState<GeezWord | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizStatus, setQuizStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Load a new quiz question
  const loadNewQuizQuestion = () => {
    if (words.length < 5) return;
    
    // Select a random correct word
    const correctIdx = Math.floor(Math.random() * words.length);
    const correctWord = words[correctIdx];
    
    // Select 3 random wrong English translations
    const wrongOptions: string[] = [];
    while (wrongOptions.length < 3) {
      const randIdx = Math.floor(Math.random() * words.length);
      const randWord = words[randIdx];
      if (randWord.geez !== correctWord.geez && !wrongOptions.includes(randWord.english)) {
        wrongOptions.push(randWord.english);
      }
    }
    
    // Shuffle options
    const options = [correctWord.english, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setQuizWord(correctWord);
    setQuizOptions(options);
    setSelectedAnswer(null);
    setQuizStatus('idle');
  };

  // Initial load of quiz question
  useEffect(() => {
    loadNewQuizQuestion();
  }, []);

  const handleAnswerSelect = (option: string) => {
    if (!quizWord || selectedAnswer !== null) return;
    setSelectedAnswer(option);
    
    if (option === quizWord.english) {
      setQuizStatus('correct');
      setQuizScore(prev => prev + 15);
      setQuizStreak(prev => prev + 1);
    } else {
      setQuizStatus('wrong');
      setQuizStreak(0);
    }
  };

  // Reset search pagination on query or category change
  useEffect(() => {
    setVisibleCount(25);
  }, [searchQuery, selectedCategory, selectedLetterFamily]);

  // Handle virtual keyboard character Insertion
  const handleKeyClick = (char: string) => {
    setSearchQuery(prev => prev + char);
  };

  // Clear query helper
  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveFamily(null);
    setSelectedLetterFamily(null);
  };

  // Filter and search computation with spelling normalization and exact-first ranking
  const filteredWords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // Normalizes Ge'ez homophones for absolute spelling tolerance
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

    const qNorm = normalizeGeezSpelling(q);

    const matches = words.filter(word => {
      // Filter by category
      if (selectedCategory !== 'all' && word.type !== selectedCategory) {
        return false;
      }

      // Filter by selected Ge'ez letter family (e.g. starts with any syllable belonging to that family)
      if (selectedLetterFamily) {
        const familyChars = FIDEL_FAMILIES[selectedLetterFamily] || [];
        const firstChar = (word.geez || "").charAt(0);
        if (!familyChars.includes(firstChar)) {
          return false;
        }
      }
      
      // Filter by query
      if (!q) return true;
      
      const wordGeezLower = (word.geez || "").toLowerCase();
      const wordGeezNorm = normalizeGeezSpelling(word.geez || "");
      const wordAmharicLower = (word.amharic || "").toLowerCase();
      const wordAmharicNorm = normalizeGeezSpelling(word.amharic || "");
      const wordEnglishLower = (word.english || "").toLowerCase();

      return (
        wordGeezLower.includes(q) ||
        wordGeezNorm.includes(qNorm) ||
        wordAmharicLower.includes(q) ||
        wordAmharicNorm.includes(qNorm) ||
        wordEnglishLower.includes(q)
      );
    });

    if (!q) return matches;

    // Rich ranking system to ensure simple words (e.g. ወ, አው, ባህቱ) elevate to the top
    const scored = matches.map(word => {
      let score = 0;
      const wordGeezLower = (word.geez || "").toLowerCase();
      const wordGeezNorm = normalizeGeezSpelling(word.geez || "");
      const wordAmharicLower = (word.amharic || "").toLowerCase();
      const wordAmharicNorm = normalizeGeezSpelling(word.amharic || "");
      const wordEnglishLower = (word.english || "").toLowerCase();

      // Priority 1: Exact matches on Ge'ez word
      if (wordGeezLower === q) {
        score += 5000;
      } else if (wordGeezNorm === qNorm) {
        score += 4000;
      }
      // Priority 2: Word starts with query
      else if (wordGeezLower.startsWith(q)) {
        score += 2000;
      } else if (wordGeezNorm.startsWith(qNorm)) {
        score += 1500;
      }
      // Priority 3: Word includes query
      else if (wordGeezLower.includes(q)) {
        score += 1000;
      } else if (wordGeezNorm.includes(qNorm)) {
        score += 800;
      }

      // Priority 4: Exact/inclusive matches on Amharic definition
      if (wordAmharicLower === q) {
        score += 800;
      } else if (wordAmharicNorm === qNorm) {
        score += 700;
      } else if (wordAmharicLower.includes(q)) {
        score += 400;
      } else if (wordAmharicNorm.includes(qNorm)) {
        score += 300;
      }

      // Priority 5: Matches on English definition
      if (wordEnglishLower === q) {
        score += 800;
      } else if (wordEnglishLower.split(/\b/).includes(q)) {
        score += 400;
      } else if (wordEnglishLower.includes(q)) {
        score += 100;
      }

      return { word, score };
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);
    return scored.map(item => item.word);
  }, [searchQuery, selectedCategory, selectedLetterFamily, words]);

  // Slice results for dynamic performance
  const pageItems = useMemo(() => {
    return filteredWords.slice(0, visibleCount);
  }, [filteredWords, visibleCount]);

  return (
    <div className="space-y-8 pb-10">
      
      {/* Top Banner Hero */}
      <div id="dictionary-hero-banner" className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-zinc-200 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-[#EDE7DD] rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 border border-amber-200 text-xs px-2.5 py-1 rounded-full font-mono font-bold w-fit">
            <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
            <span>Classical Ge'ez Glossary Search</span>
          </div>

          <h2 className="text-3xl font-serif font-black text-zinc-900 tracking-tight leading-none">
            ከርስቲድር — Classical Ge'ez Language Finder
          </h2>

          <p className="text-sm text-zinc-600 font-sans leading-relaxed max-w-2xl">
            Empower your diaspora scholarship! Search the authentic glossary based on the historical dictionary of <strong>Alaqa Kidane Wolde Kifle</strong>. Explore classic words with accurate parenthetical phonetic transliteration, Amharic context, and child-safe English translations.
          </p>
        </div>

        {/* Total stats module */}
        <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#E0D8CC] text-center space-y-1.5 self-center">
          <span className="text-[10px] uppercase font-mono font-extrabold text-[#5C564D] tracking-widest block">Vocabulary Load</span>
          <p className="text-4xl font-serif font-black text-[#5A6A51] select-none">{words.length}</p>
          <span className="text-xs text-zinc-500 font-sans block">Verified Classical Roots Loaded</span>
        </div>
      </div>

      {/* Main Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Search panel and Search Results */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Controls Box */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-200 space-y-4">
            
            {/* Input and virtual keyboard toggle */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Type in Ge'ez (e.g. እ, እብን) or English (e.g. spring, father, slithers)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl font-sans text-sm outline-none focus:bg-white focus:border-[#5A6A51] focus:ring-2 focus:ring-[#5A6A51]/10 transition"
                />
                {searchQuery && (
                  <button 
                    onClick={handleClearSearch}
                    className="absolute right-3 top-3.5 text-zinc-400 hover:text-zinc-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* soft keyboard trigger button */}
              <button
                id="toggle-geez-keyboard-btn"
                onClick={() => setShowKeyboard(!showKeyboard)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition select-none active:scale-95 ${
                  showKeyboard 
                    ? 'bg-[#5A6A51] text-white shadow-sm' 
                    : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 border border-zinc-200'
                }`}
              >
                <span>⌨ Keyboard</span>
              </button>
            </div>

            {/* Collapsible Soft Amharic Keyboard */}
            <AnimatePresence>
              {showKeyboard && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden border border-[#E0D8CC]/70 bg-gradient-to-b from-[#FDFCFB] to-[#F8F5F1] rounded-xl p-4 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#E0D8CC]/50 pb-2">
                    <span className="text-xs font-mono font-bold text-[#5C564D]">Ge'ez Virtual Keyboard Assistant:</span>
                    <button 
                      onClick={() => setShowKeyboard(false)}
                      className="text-zinc-400 hover:text-zinc-700 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Consonant family keys row */}
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {Object.keys(FIDEL_FAMILIES).map((consonant) => {
                      const isActive = activeFamily === consonant;
                      return (
                        <button
                          key={consonant}
                          onClick={() => setActiveFamily(isActive ? null : consonant)}
                          className={`w-9 h-9 flex items-center justify-center rounded-lg font-serif text-sm font-bold border transition cursor-pointer select-none ${
                            isActive 
                              ? 'bg-amber-600 text-white border-amber-600 scale-105 shadow-sm' 
                              : 'bg-white hover:bg-amber-50 hover:text-amber-800 text-[#2D3329] border-zinc-200'
                          }`}
                        >
                          {consonant}
                        </button>
                      );
                    })}
                  </div>

                  {/* Vowel list orders row (Visible when a Base Consonant is active) */}
                  <AnimatePresence mode="wait">
                    {activeFamily && FIDEL_FAMILIES[activeFamily] && (
                      <motion.div
                        key={activeFamily}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex flex-col space-y-2 p-3 bg-amber-50/50 rounded-xl border border-amber-100"
                      >
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-800 uppercase font-bold">
                          <CornerDownRight className="w-3.5 h-3.5" />
                          <span>Select Syllable Order for family "{activeFamily}":</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {FIDEL_FAMILIES[activeFamily].map((fidel, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleKeyClick(fidel)}
                              className="px-3.5 py-1.5 bg-white hover:bg-amber-100 border border-amber-200/50 hover:border-amber-400 text-zinc-900 hover:text-amber-950 rounded-lg font-serif text-sm font-bold transition shadow-sm active:scale-95 cursor-pointer"
                            >
                              {fidel}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ge'ez Letter Family Filter */}
            <div className="flex flex-col gap-2 pt-3 border-t border-zinc-100">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase text-[#5C564D] tracking-wider">
                  Browse by Letter Family (ፊደላት):
                </span>
                {selectedLetterFamily && (
                  <button
                    onClick={() => setSelectedLetterFamily(null)}
                    className="text-[10px] font-sans font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 transition cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
                <button
                  onClick={() => setSelectedLetterFamily(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 h-9 flex items-center ${
                    selectedLetterFamily === null
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
                  }`}
                >
                  🌐 All Families
                </button>
                {Object.keys(FIDEL_FAMILIES).map((consonant) => {
                  const isSelected = selectedLetterFamily === consonant;
                  return (
                    <button
                      key={consonant}
                      onClick={() => setSelectedLetterFamily(isSelected ? null : consonant)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg font-serif text-sm font-black transition-all cursor-pointer shrink-0 border select-none ${
                        isSelected
                          ? 'bg-[#5A6A51] text-white border-[#5A6A51] scale-105 shadow-sm font-extrabold'
                          : 'bg-white hover:bg-zinc-100 hover:text-zinc-800 text-[#2D3329] border-zinc-200'
                      }`}
                      title={`Show words starting with ${consonant} family`}
                    >
                      {consonant}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 pt-1 border-t border-zinc-100 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono font-black uppercase text-[#5C564D] tracking-wider whitespace-nowrap">Categories:</span>
              <div className="flex gap-1.5">
                <button
                  id="tab-cat-all"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-zinc-800 text-white'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
                  }`}
                >
                  📖 All Types
                </button>
                <button
                  id="tab-cat-Noun"
                  onClick={() => setSelectedCategory('Noun')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'Noun'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
                  }`}
                >
                  Noun
                </button>
                <button
                  id="tab-cat-Verb"
                  onClick={() => setSelectedCategory('Verb')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'Verb'
                      ? 'bg-emerald-100 text-emerald-950 border border-emerald-200'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
                  }`}
                >
                  Verb
                </button>
                <button
                  id="tab-cat-Adj"
                  onClick={() => setSelectedCategory('Adjective')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'Adjective'
                      ? 'bg-rose-100 text-rose-950 border border-rose-200'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
                  }`}
                >
                  Adjective
                </button>
                <button
                  id="tab-cat-Adverb"
                  onClick={() => setSelectedCategory('Adverb')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'Adverb'
                      ? 'bg-blue-100 text-blue-950 border border-blue-200'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
                  }`}
                >
                  Adverb
                </button>
              </div>
            </div>
          </div>

          {/* Results feedback indicators */}
          <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Showing <strong className="text-zinc-800">{Math.min(filteredWords.length, visibleCount)}</strong> matching words</span>
            {filteredWords.length > 0 && (
              <span>Found total {filteredWords.length} results</span>
            )}
          </div>

          {/* Words List Grid */}
          {pageItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 space-y-3">
              <BookOpen className="w-12 h-12 text-zinc-300 mx-auto" />
              <p className="font-sans font-bold text-zinc-600">No matching Ge'ez words found.</p>
              <p className="text-xs text-zinc-400 font-mono">Try adjusting your filters, searching for English synonyms, or typing base consonants.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pageItems.map((word, i) => {
                const isFavorite = favorites.includes(word.geez);
                
                // Color mapping for type tags
                let tagColor = 'bg-zinc-100 text-zinc-800';
                if (word.type === 'Noun') tagColor = 'bg-amber-100 border border-amber-200 text-amber-900';
                if (word.type === 'Verb') tagColor = 'bg-emerald-100 border border-emerald-200 text-emerald-950';
                if (word.type === 'Adjective') tagColor = 'bg-rose-100 border border-rose-200 text-rose-950';
                if (word.type === 'Adverb') tagColor = 'bg-blue-100 border border-blue-200 text-blue-950';

                return (
                  <div
                    key={`${word.geez}-${i}`}
                    className="bg-white rounded-2xl p-5 border border-zinc-200 hover:border-[#5A6A51]/40 shadow-sm hover:shadow transition flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded ${tagColor}`}>
                          {word.type || 'Noun'}
                        </span>
                        
                        <button
                          onClick={() => toggleFavorite(word.geez)}
                          className="p-1.5 rounded-lg hover:bg-zinc-100 transition text-zinc-400 hover:text-rose-500 cursor-pointer"
                        >
                          <Heart className={`w-4 h-4 ${isFavorite ? 'text-rose-600 fill-rose-600' : ''}`} />
                        </button>
                      </div>

                      {/* Large Ge'ez syllable spelling */}
                      <h3 className="text-2xl font-serif font-black text-zinc-900 select-all" title="Spelled in Classical Ge'ez script">
                        {word.geez}
                      </h3>

                      {/* Meanings */}
                      <div className="space-y-1.5 font-sans">
                        <p className="text-xs text-zinc-400">
                          <span className="font-bold text-zinc-500 uppercase tracking-wider font-mono text-[9px] mr-1">Amharic:</span>
                          <span className="font-serif font-bold text-zinc-800">{word.amharic}</span>
                        </p>
                        <p className="text-xs text-zinc-600 font-medium">
                          <span className="font-bold text-[#C87A55] uppercase tracking-wider font-mono text-[9px] mr-1">English:</span>
                          {word.english}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {filteredWords.length > visibleCount && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 25)}
                className="px-6 py-2.5 bg-[#5A6A51] hover:bg-[#2D3329] text-white text-xs font-bold font-sans rounded-xl transition shadow shadow-zinc-200/50 active:scale-95 cursor-pointer"
              >
                Load More Results (+25 Entries)
              </button>
            </div>
          )}

        </div>

        {/* Right 1 Column: Quiz Game Widget */}
        <div className="space-y-6">
          
          {/* Mini-Quiz Widget */}
          <div className="bg-[#2B3526] rounded-3xl p-6 text-white border border-[#3E4D37] shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#5A6A51]/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono font-extrabold text-amber-200 bg-[#3E4D37] px-2.5 py-1 rounded-full border border-amber-300/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-amber-300" />
                  <span>Mini Quiz Game</span>
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-zinc-100">Score: <strong className="text-amber-400">{quizScore} XP</strong></span>
                  {quizStreak > 0 && (
                    <span className="text-[10px] font-mono font-bold text-[#C87A55] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">🔥 {quizStreak} Streak</span>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-serif font-bold tracking-tight text-white pt-2">What does this word mean?</h3>
              <p className="text-xs text-zinc-300 font-sans">Translate the classical roots below to win scholarship points!</p>
            </div>

            {/* Huge Ge'ez word display */}
            <div className="bg-[#1C2319] rounded-2xl py-8 px-4 text-center border border-[#3E4D37]/50 shadow-inner flex flex-col items-center justify-center space-y-1">
              <span className="text-4xl sm:text-5xl font-serif font-black text-amber-100 tracking-wide select-none">
                {quizWord?.geez || '...'}
              </span>
              {quizWord?.type && (
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-800 px-2 py-0.5 rounded-full mt-4">
                  Grammatical Role: {quizWord.type}
                </span>
              )}
            </div>

            {/* Answer Options Grid */}
            <div className="space-y-2">
              {quizOptions.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === quizWord?.english;
                
                let btnStyle = 'bg-[#3E4D37] hover:bg-[#4E6045] border-[#4F6246]/60 text-zinc-100';
                if (selectedAnswer !== null) {
                  if (isSelected) {
                    btnStyle = isCorrect 
                      ? 'bg-emerald-600 border-emerald-400 text-white font-bold ring-2 ring-emerald-500/20' 
                      : 'bg-rose-600 border-rose-400 text-white font-bold ring-2 ring-rose-500/20';
                  } else if (isCorrect) {
                    btnStyle = 'bg-emerald-600 border-emerald-400 text-white font-bold ring-2 ring-emerald-500/20';
                  } else {
                    btnStyle = 'bg-zinc-800/40 text-zinc-400 border-transparent';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedAnswer !== null}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-3.5 border rounded-xl text-xs font-medium font-sans transition-all duration-200 select-none cursor-pointer flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {selectedAnswer !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0 ml-2" />}
                    {selectedAnswer !== null && isSelected && !isCorrect && <AlertCircle className="w-4 h-4 text-rose-200 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Feedback notification & next action trigger */}
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3.5 pt-2 border-t border-[#3E4D37]/50"
              >
                <div className="flex items-center gap-2 p-3 bg-zinc-900/40 border border-[#3E4D37] rounded-xl">
                  {quizStatus === 'correct' ? (
                    <div>
                      <p className="text-xs font-extrabold text-emerald-400">Excellent! That's correct!</p>
                      <p className="text-[11px] text-zinc-300 mt-0.5">You gained +15 XP. Keeping the scholarship burning!</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-extrabold text-rose-400">Great effort, but not quite correct.</p>
                      <p className="text-[11px] text-zinc-300 mt-0.5">
                        <strong className="text-emerald-400 font-serif">"{quizWord?.geez}"</strong> means: "{quizWord?.english}"
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={loadNewQuizQuestion}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-[#1C2319] text-xs font-bold font-sans rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow active:scale-95 font-extrabold"
                >
                  <span>Practice Next Word</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Quick Info Box */}
          <div className="bg-white rounded-2xl p-5 border border-zinc-200 space-y-4 shadow-sm">
            <h4 className="text-xs font-mono font-black uppercase text-zinc-500 tracking-wider">Search Hints & Reference:</h4>
            
            <div className="space-y-3 text-xs text-zinc-600 font-sans leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-50 text-amber-800 text-[10px] flex items-center justify-center font-bold font-mono">1</span>
                <p>If you don't have a Ge'ez keyboard installed, click on the <strong className="text-zinc-800">⌨ Keyboard</strong> button to type easily inside results.</p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-50 text-amber-800 text-[10px] flex items-center justify-center font-bold font-mono">2</span>
                <p>You can search in both directions! Type fully spelled English translation words (e.g., <strong>'honey'</strong>, <strong>'stone'</strong>, <strong>'forever'</strong>) or Amharic phrases to see translations.</p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-50 text-amber-800 text-[10px] flex items-center justify-center font-bold font-mono">3</span>
                <p>Use categories like <strong className="text-zinc-800">Noun</strong> or <strong className="text-zinc-800">Verb</strong> to isolate roles based on modern speech styles.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
