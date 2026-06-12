import { useState, useMemo, useEffect } from 'react';
import { Lesson, UserProgress, VocabularyItem } from '../types';
import { GEEZ_CURRICULUM } from '../data';
import { Volume2, CheckCircle2, RotateCcw, AlertCircle, ArrowLeft, ArrowRight, HelpCircle, Eye } from 'lucide-react';

interface VocabularyFlashcardsProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  initialLessonId?: number | 'all';
}

export default function VocabularyFlashcards({ progress, onUpdateProgress, initialLessonId = 'all' }: VocabularyFlashcardsProps) {
  const [selectedLessonId, setSelectedLessonId] = useState<number | 'all'>(initialLessonId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showPhoneticTip, setShowPhoneticTip] = useState(false);
  const [audioSimulationState, setAudioSimulationState] = useState<'idle' | 'playing'>('idle');

  // Synchronize internal select state if the initialLessonId changes from parent router
  useEffect(() => {
    setSelectedLessonId(initialLessonId);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowPhoneticTip(false);
  }, [initialLessonId]);

  // Flat list of vocab based on selection
  const vocabularyList = useMemo(() => {
    if (selectedLessonId === 'all') {
      return GEEZ_CURRICULUM.flatMap((l) =>
        l.vocabulary.map((v) => ({ ...v, lessonId: l.lesson_id, lessonTitle: l.lesson_title }))
      );
    }
    const target = GEEZ_CURRICULUM.find((l) => l.lesson_id === selectedLessonId);
    if (!target) return [];
    return target.vocabulary.map((v) => ({ ...v, lessonId: target.lesson_id, lessonTitle: target.lesson_title }));
  }, [selectedLessonId]);

  // Handle boundary
  const currentItem = vocabularyList[currentIndex] || null;

  // Reset index when lesson changes
  const handleLessonChange = (val: string) => {
    const parsedId = val === 'all' ? 'all' : parseInt(val, 10);
    setSelectedLessonId(parsedId);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowPhoneticTip(false);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setShowPhoneticTip(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % vocabularyList.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowPhoneticTip(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + vocabularyList.length) % vocabularyList.length);
    }, 150);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const isMastered = useMemo(() => {
    if (!currentItem) return false;
    return progress.masteredVocab.includes(currentItem.geez);
  }, [currentItem, progress.masteredVocab]);

  const toggleMastery = () => {
    if (!currentItem) return;
    const wordRef = currentItem.geez;

    onUpdateProgress((prev) => {
      const alreadyMastered = prev.masteredVocab.includes(wordRef);
      let nextMastered = [...prev.masteredVocab];
      let xpEarned = 0;

      if (alreadyMastered) {
        nextMastered = nextMastered.filter((w) => w !== wordRef);
      } else {
        nextMastered.push(wordRef);
        xpEarned = 15; // Earn 15 XP for mastering a word!
      }

      return {
        ...prev,
        masteredVocab: nextMastered,
        xp: prev.xp + xpEarned,
      };
    });
  };

  const simulateSpeech = () => {
    if (!currentItem || audioSimulationState === 'playing') return;

    setAudioSimulationState('playing');

    // Use Speech Synthesis with generic fallback representation or nice visual bubble timer
    if ('speechSynthesis' in window) {
      // Speak transliteration for easier grasp
      const utterance = new SpeechSynthesisUtterance(currentItem.english_transliteration);
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => {
      setAudioSimulationState('idle');
    }, 1200);
  };

  return (
    <div id="flashcards-section" className="space-y-6 max-w-4xl mx-auto py-4 px-2">
      
      {/* Upper options drawer */}
      <div id="flashcard-controls-panel" className="bg-white rounded-3xl p-6 shadow-[0_4px_25px_rgba(90,106,81,0.05)] border border-[#E0D8CC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#2D3329] tracking-tight">Vocabulary Flashcards</h2>
          <p className="text-xs font-sans text-[#5C564D] mt-0.5">Test your recognition of Ge'ez greetings. Tap any card to flip.</p>
        </div>
        
        {/* Dropdown filters */}
        <div className="flex items-center gap-2">
          <label htmlFor="vocab-lesson-select" className="text-xs font-mono text-[#5C564D] font-bold uppercase tracking-wider">Topic:</label>
          <select
            id="vocab-lesson-select"
            value={selectedLessonId}
            onChange={(e) => handleLessonChange(e.target.value)}
            className="rounded-xl bg-[#F8F5F1] border border-[#E0D8CC] text-[#2D3329] text-sm px-4 py-2.5 font-sans font-semibold focus:ring-2 focus:ring-[#5A6A51] focus:border-[#5A6A51] outline-none transition cursor-pointer"
          >
            <option value="all">All Vocabulary ({GEEZ_CURRICULUM.flatMap(l=>l.vocabulary).length})</option>
            {GEEZ_CURRICULUM.map((lesson) => (
              <option key={lesson.lesson_id} value={lesson.lesson_id}>
                L{lesson.lesson_id}: {lesson.lesson_title.substring(0, 32)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {vocabularyList.length === 0 ? (
        <div id="no-vocab-alert" className="text-center p-12 bg-white rounded-2xl border border-dashed border-zinc-300">
          <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
          <h3 className="text-zinc-700 font-semibold text-lg">No cards match this criteria</h3>
        </div>
      ) : (
        <div id="flashcard-deck-viewport" className="space-y-6">
          
          {/* Card Meta Indicator */}
          <div className="flex items-center justify-between px-2 text-sm font-mono text-zinc-500">
            <span>Card {currentIndex + 1} of {vocabularyList.length}</span>
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-bold">
              {isMastered ? '✓ Mastered' : 'Practice Card'}
            </span>
          </div>

          {/* Interactive Card Body */}
          <div 
            id="flashcard-box"
            onClick={handleFlip}
            className={`relative min-h-[340px] md:min-h-[380px] w-full bg-white rounded-3xl border-2 cursor-pointer transition-all duration-300 transform select-none ${
              isFlipped 
                ? 'border-[#C87A55] bg-[#EDE7DD]/10 shadow-[0_12px_45px_-12px_rgba(90,106,81,0.12)] scale-[1.01]' 
                : 'border-[#E0D8CC] shadow-sm hover:border-[#5A6A51] hover:-translate-y-0.5'
            }`}
          >
            <div className="p-8 flex flex-col justify-between min-h-[340px] md:min-h-[380px]">
              
              {/* Card Header information */}
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 bg-zinc-100 px-2 py-1 rounded">
                  {currentItem?.lessonTitle || 'Core Vocabulary'}
                </span>
                
                {/* Visual Hint */}
                <button
                  id="flip-hint-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFlip();
                  }}
                  className="p-1 px-2.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 transition flex items-center gap-1.5 text-xs font-mono"
                >
                  <Eye className="w-3 px-0 h-3" />
                  Flip Info
                </button>
              </div>

              {/* Main Content Pane */}
              <div className="my-auto py-4 text-center space-y-4">
                
                {/* ALWAYS visible Ge'ez word */}
                <h3 className="text-5xl md:text-6xl font-serif text-zinc-900 font-bold tracking-normal py-2 text-zinc-800 animate-fade-in">
                  {currentItem?.geez}
                </h3>

                {/* Conditional detail fields based on FLIPPED state */}
                {!isFlipped ? (
                  <div className="space-y-4">
                    <p className="text-zinc-500 text-sm font-sans italic">Click card or tap below to reveal the English reading, Amharic equivalent & grammar tips</p>
                    <div className="pt-2 flex justify-center">
                      <button
                        id="reveal-meaning-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFlip();
                        }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#5A6A51] hover:bg-[#4B5A42] text-white text-xs font-bold rounded-xl shadow-md transition-all scale-100 hover:scale-105 cursor-pointer select-none"
                      >
                        <span>Reveal English Meaning 📖</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fade-in">
                    
                    {/* English transliteration  */}
                    <div>
                      <span className="text-xs font-mono font-medium tracking-wider text-amber-800 uppercase block mb-1">Pronunciation Helper</span>
                      <p className="text-2xl font-sans font-bold text-amber-700">
                        {currentItem?.english_transliteration}
                      </p>
                    </div>

                    {/* English translation */}
                    <div>
                      <span className="text-xs font-mono font-medium tracking-wider text-zinc-400 uppercase block mb-0.5">English Translation</span>
                      <p className="text-xl font-serif text-zinc-900 font-semibold">
                        {currentItem?.english_translation}
                      </p>
                    </div>

                    {/* Amharic Equivalence Context */}
                    <div className="inline-flex gap-2 items-center bg-zinc-100 px-3 py-1.5 rounded-lg text-sm border border-zinc-200">
                      <span className="text-xs font-mono text-zinc-500">Amharic:</span>
                      <span className="font-sans font-medium text-zinc-800">{currentItem?.amharic_context}</span>
                    </div>

                  </div>
                )}
              </div>

              {/* Card Footer: Context and speaker simulation */}
              <div className="border-t border-zinc-100 pt-4 mt-2 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                
                {/* Grammatical category indicator */}
                <div className="text-left">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Grammar Class</span>
                  <p className="text-xs font-mono text-zinc-600 truncate max-w-xs">
                    {currentItem?.grammatical_context || 'N/A'}
                  </p>
                </div>

                {/* Actions inside card bar */}
                <div className="flex gap-2 justify-end">
                  
                  {/* Simulate voice playback */}
                  <button
                    id="speech-simulation-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      simulateSpeech();
                    }}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition ${
                      audioSimulationState === 'playing'
                        ? 'bg-amber-100 text-amber-700 border-amber-300 animate-pulse'
                        : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-700'
                    }`}
                    title="Speak Transliteration"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="text-xs font-mono">Audio Guide</span>
                    {audioSimulationState === 'playing' && (
                      <span className="flex gap-0.5 items-end h-3">
                        <span className="w-0.5 h-3 bg-amber-600 animate-bounce" style={{animationDelay: '0.1s'}} />
                        <span className="w-0.5 h-2 bg-amber-600 animate-bounce" style={{animationDelay: '0.2s'}} />
                        <span className="w-0.5 h-3 bg-amber-600 animate-bounce" style={{animationDelay: '0.3s'}} />
                      </span>
                    )}
                  </button>

                  {/* Mark as Mastered button */}
                  <button
                    id="vocab-mastery-toggle-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMastery();
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition flex items-center gap-1.5 ${
                      isMastered
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-zinc-100 hover:bg-emerald-50 text-zinc-700 hover:text-emerald-700 hover:border-emerald-200 border border-zinc-200'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isMastered ? 'text-emerald-600 fill-emerald-100' : ''}`} />
                    <span>{isMastered ? 'Mastered!' : 'Earn 15 XP'}</span>
                  </button>

                </div>
              </div>

            </div>
          </div>

          {/* Stepper controls */}
          <div id="deck-stepper-panel" className="flex items-center justify-between gap-4">
            <button
              id="flashcard-prev-btn"
              onClick={handlePrev}
              className="px-4 py-3 bg-white border border-zinc-300 text-zinc-700 rounded-xl hover:bg-zinc-50 transition font-medium flex items-center gap-2 cursor-pointer shadow-sm text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <span className="text-xs font-mono text-zinc-500">
              Practice card to earn streak points!
            </span>

            <button
              id="flashcard-next-btn"
              onClick={handleNext}
              className="px-4 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition font-medium flex items-center gap-2 cursor-pointer shadow-sm text-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Useful contextual prompt for diaspora youngsters */}
          <div id="flashcard-educational-pro-tip" className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 flex gap-3 text-zinc-700">
            <RotateCcw className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-amber-900">Did you know?</p>
              <p className="font-sans leading-relaxed">
                Ge'ez is one of the oldest African writing systems still used today. It has a spiritual history of over 2000 years! Use the flip mechanism to get comfortable reading vocal glyphs like <span className="font-semibold text-zinc-900">ሰ</span> (Se), <span className="font-semibold text-zinc-900">ላ</span> (La), and <span className="font-semibold text-zinc-900">ም</span> (M).
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
