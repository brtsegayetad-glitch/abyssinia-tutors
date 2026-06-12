import { useState, useEffect, useMemo } from 'react';
import { Lesson, UserProgress } from '../types';
import { GEEZ_CURRICULUM } from '../data';
import { Check, X, Award, HelpCircle, AlertCircle, ChevronRight, Zap, CheckCircle, RotateCcw, AlertTriangle } from 'lucide-react';

interface InteractiveExercisesProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  activeLessonId?: number;
}

interface Question {
  id: string;
  type: 'shape_matching' | 'sound_bubble' | 'fidel_sequence' | 'word_to_image' | 'word_assembly_puzzle' | 'word_puzzle_fill_blank' | 'phonetic_audio_blend';
  prompt: string;
  geezSubject?: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  options: string[];
  contextTip?: string;
}

export default function InteractiveExercises({ progress, onUpdateProgress, activeLessonId }: InteractiveExercisesProps) {
  const [difficultyLevel, setDifficultyLevel] = useState<1 | 2>(1); // Level 1 (Beginners) vs Level 2 (Advanced)
  const [selectedLessonId, setSelectedLessonId] = useState<number>(activeLessonId || 1);
  const [quizState, setQuizState] = useState<'setup' | 'playing' | 'completed'>('setup');
  
  // Quiz progress states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [assembledPhrase, setAssembledPhrase] = useState<string[]>([]); // For word assembly
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState<Array<{ questionPrompt: string; userSelected: string; isCorrect: boolean; correct: string }>>([]);

  // Auto-sync lesson ID when parent triggers changes
  useEffect(() => {
    if (activeLessonId) {
      setSelectedLessonId(activeLessonId);
    }
  }, [activeLessonId]);

  // Generate dynamic quiz based on lesson selection & difficulty level
  const buildQuiz = () => {
    const lesson = GEEZ_CURRICULUM.find((l) => l.lesson_id === selectedLessonId);
    if (!lesson) return;

    const vocabs = lesson.vocabulary;
    const generatedQuestions: Question[] = [];

    // LEVEL 1 Exercise generation
    if (difficultyLevel === 1) {
      vocabs.forEach((item, index) => {
        // Question 1: 'shape_matching' or 'word_to_image'
        if (index % 2 === 0) {
          // Translate Ge'ez word to correct translation
          const wrongOptions = GEEZ_CURRICULUM.flatMap(l => l.vocabulary)
            .filter(v => v.geez !== item.geez)
            .map(v => v.english_translation)
            .slice(0, 3);
          
          const options = [item.english_translation, ...wrongOptions].sort(() => Math.random() - 0.5);

          generatedQuestions.push({
            id: `l${lesson.lesson_id}-q${index}-matching`,
            type: 'word_to_image',
            prompt: `What is the correct English translation of the Ge'ez greeting below?`,
            geezSubject: item.geez,
            correctAnswer: item.english_translation,
            incorrectAnswers: wrongOptions,
            options,
            contextTip: `Grammar Help: This is a ${item.grammatical_context}.`
          });
        } else {
          // Question 2: 'sound_bubble' or 'fidel_sequence'
          // Translate word to correct phonetic transliteration
          const wrongTransliterations = GEEZ_CURRICULUM.flatMap(l => l.vocabulary)
            .filter(v => v.geez !== item.geez)
            .map(v => v.english_transliteration)
            .slice(0, 3);

          const options = [item.english_transliteration, ...wrongTransliterations].sort(() => Math.random() - 0.5);

          generatedQuestions.push({
            id: `l${lesson.lesson_id}-q${index}-sound`,
            type: 'sound_bubble',
            prompt: `Choose the correct phonetic pronunciation (sound bubble) for:`,
            geezSubject: item.geez,
            correctAnswer: item.english_transliteration,
            incorrectAnswers: wrongTransliterations,
            options,
            contextTip: `Amharic reference context: "${item.amharic_context}"`
          });
        }
      });

      // Special Fidel sequence match question
      if (vocabs.length >= 2) {
        const first = vocabs[0];
        const second = vocabs[1];
        generatedQuestions.push({
          id: `l${lesson.lesson_id}-seq`,
          type: 'fidel_sequence',
          prompt: `Complete this sequence block: If '${first.english_translation}' is written as '${first.geez}', then '${second.english_translation}' is written as:`,
          geezSubject: undefined,
          correctAnswer: second.geez,
          incorrectAnswers: [first.geez, ...vocabs.slice(2).map(v => v.geez)].slice(0, 3),
          options: [second.geez, first.geez, ...vocabs.slice(2).map(v => v.geez)].slice(0, 4).sort(() => Math.random() - 0.5),
          contextTip: `Phonetic guide: ${second.english_transliteration}`
        });
      }
    } 
    
    // LEVEL 2 Exercise generation (Advanced, Older Kids)
    else {
      vocabs.forEach((item, index) => {
        // Question 1: 'word_puzzle_fill_blank' e.g. "እፎ ____" where user has to fill word
        if (item.geez.includes(' ')) {
          const splitParts = item.geez.split(' ');
          const firstPart = splitParts[0];
          const secondPart = splitParts.slice(1).join(' ');

          const wrongPartChoices = GEEZ_CURRICULUM.flatMap(l => l.vocabulary)
            .flatMap(v => v.geez.split(' '))
            .filter(w => w !== secondPart && w.length > 2)
            .slice(0, 3);
          
          const options = [secondPart, ...wrongPartChoices].sort(() => Math.random() - 0.5);

          generatedQuestions.push({
            id: `l${lesson.lesson_id}-q${index}-blank`,
            type: 'word_puzzle_fill_blank',
            prompt: `Fill in the missing part of the Ge'ez expression: "${firstPart} __________ ?"`,
            geezSubject: item.english_translation,
            correctAnswer: secondPart,
            incorrectAnswers: wrongPartChoices,
            options,
            contextTip: `Tip: Translates into English as: "${item.english_transliteration}"`
          });
        } else {
          // If phrase is single word, ask translation targeting grammatical context explicitly
          const wrongChoices = GEEZ_CURRICULUM.flatMap(l => l.vocabulary)
            .filter(v => v.geez !== item.geez)
            .map(v => v.geez)
            .slice(0, 3);
          
          const options = [item.geez, ...wrongChoices].sort(() => Math.random() - 0.5);

          generatedQuestions.push({
            id: `l${lesson.lesson_id}-q${index}-grammar_match`,
            type: 'phonetic_audio_blend',
            prompt: `Which Ge'ez expression has this grammar property: "${item.grammatical_context}"?`,
            geezSubject: `English: "${item.english_translation}"`,
            correctAnswer: item.geez,
            incorrectAnswers: wrongChoices,
            options,
            contextTip: `Transliteration tip: ${item.english_transliteration}`
          });
        }

        // Question 2: 'word_assembly_puzzle' - scrambling words
        if (item.geez.split(' ').length >= 2) {
          const parts = item.geez.split(' ');
          const shuffledParts = [...parts].sort(() => Math.random() - 0.5);

          generatedQuestions.push({
            id: `l${lesson.lesson_id}-q${index}-assemble`,
            type: 'word_assembly_puzzle',
            prompt: `Assemble the scrambled words below into the correct Ge'ez greeting for: "${item.english_translation}"`,
            geezSubject: item.english_transliteration,
            correctAnswer: item.geez,
            incorrectAnswers: [],
            options: shuffledParts,
            contextTip: `Amharic context: "${item.amharic_context}"`
          });
        }
      });
    }

    setQuestions(generatedQuestions.slice(0, 6)); // limit to max 6 questions for clean flow
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAssembledPhrase([]);
    setHasSubmitted(false);
    setScore(0);
    setAnswersLog([]);
    setQuizState('playing');
  };

  const handleSelectAnswer = (ans: string) => {
    if (hasSubmitted) return;
    setSelectedAnswer(ans);
  };

  const handleAssembleWord = (word: string) => {
    if (hasSubmitted) return;
    
    setAssembledPhrase((prev) => {
      if (prev.includes(word)) {
        return prev.filter((w) => w !== word);
      } else {
        return [...prev, word];
      }
    });
  };

  const handleClearAssembly = () => {
    if (hasSubmitted) return;
    setAssembledPhrase([]);
  };

  const handleSubmitAnswer = () => {
    if (hasSubmitted || !questions[currentQuestionIndex]) return;

    const activeQ = questions[currentQuestionIndex];
    let isCorrect = false;
    let finalSelection = selectedAnswer || '';

    if (activeQ.type === 'word_assembly_puzzle') {
      const compiled = assembledPhrase.join(' ');
      finalSelection = compiled;
      isCorrect = compiled.trim() === activeQ.correctAnswer.trim();
    } else {
      isCorrect = selectedAnswer === activeQ.correctAnswer;
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswersLog((prev) => [
      ...prev,
      {
        questionPrompt: activeQ.prompt + " " + (activeQ.geezSubject || ''),
        userSelected: finalSelection || 'No selection',
        isCorrect,
        correct: activeQ.correctAnswer,
      },
    ]);

    setHasSubmitted(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setAssembledPhrase([]);
    setHasSubmitted(false);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz Finished! Calculate XP
      const totalPassedXP = score * 30 + (score === questions.length ? 50 : 0); // extra 50 XP if perfect score
      
      onUpdateProgress((prev) => {
        // Record highscore
        const prevQuizStat = prev.quizAttempts[selectedLessonId] || { highscore: 0, passed: false };
        const isPassed = score >= Math.ceil(questions.length / 2);
        
        return {
          ...prev,
          xp: prev.xp + totalPassedXP,
          completedLessons: isPassed && !prev.completedLessons.includes(selectedLessonId) 
            ? [...prev.completedLessons, selectedLessonId] 
            : prev.completedLessons,
          quizAttempts: {
            ...prev.quizAttempts,
            [selectedLessonId]: {
              highscore: Math.max(prevQuizStat.highscore, score),
              passed: prevQuizStat.passed || isPassed,
              score: score,
              timestamp: Date.now()
            }
          }
        };
      });

      setQuizState('completed');
    }
  };

  const activeQuestion = questions[currentQuestionIndex];

  return (
    <div id="interactive-exercises-section" className="space-y-6 max-w-4xl mx-auto py-4 px-2">
      
      {/* Quiz Dashboard Setup state */}
      {quizState === 'setup' && (
        <div id="quiz-settings-card" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-zinc-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-sans font-bold text-zinc-900 tracking-tight">Interactive Practice Quizzes</h2>
              <p className="text-zinc-500 text-sm font-sans mt-0.5">Test your comprehension, gain levels, and earn bonus XP!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Setting 1: Select Lesson Area */}
            <div className="space-y-2">
              <label htmlFor="quiz-lesson-picker" className="block text-sm font-mono font-semibold text-zinc-700">1. Select Chapter Curriculum</label>
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1.5 scrollbar-thin">
                {GEEZ_CURRICULUM.map((lesson) => {
                  const lessonScore = progress.quizAttempts[lesson.lesson_id];
                  const hasPassed = lessonScore?.passed;
                  return (
                    <button
                      key={lesson.lesson_id}
                      id={`lesson-selector-btn-${lesson.lesson_id}`}
                      onClick={() => setSelectedLessonId(lesson.lesson_id)}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition cursor-pointer ${
                        selectedLessonId === lesson.lesson_id
                          ? 'bg-amber-50/70 border-amber-500 ring-1 ring-amber-500'
                          : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-zinc-200 font-mono text-xs font-bold flex items-center justify-center text-zinc-800">
                          {lesson.lesson_id}
                        </span>
                        <div>
                          <p className="font-sans font-bold text-sm text-zinc-800 leading-tight">
                            {lesson.lesson_title}
                          </p>
                          <span className="text-xs font-mono text-zinc-400">
                            {lesson.vocabulary.length} exercises
                          </span>
                        </div>
                      </div>
                      
                      {/* Completion status icon */}
                      {hasPassed ? (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold font-mono">
                          <span>Passed</span>
                          <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        </div>
                      ) : (
                        <span className="text-xs font-mono text-zinc-400">Unstarted</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Setting 2: Choose Difficulty Level (Level 1 vs Level 2) */}
            <div className="space-y-6">
              
              <div className="space-y-2 bg-zinc-50 p-5 rounded-2xl border border-zinc-200">
                <span className="block text-sm font-mono font-semibold text-zinc-700 mb-2">2. Choose Age / Level Difficulty</span>
                
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* LEVEL 1 CARD */}
                  <button
                    id="difficulty-level-1-selector"
                    onClick={() => setDifficultyLevel(1)}
                    className={`p-4 rounded-xl border-2 text-center transition cursor-pointer ${
                      difficultyLevel === 1
                        ? 'border-amber-600 bg-white shadow-sm ring-1 ring-amber-600'
                        : 'border-zinc-200 bg-zinc-100/50 hover:bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <span className="block text-lg font-bold mb-1">Level 1</span>
                    <span className="block text-[11px] font-mono leading-relaxed opacity-90">
                      Younger Kids & Beginners (Shapes, Sound Bubbles, Word to English)
                    </span>
                  </button>

                  {/* LEVEL 2 CARD */}
                  <button
                    id="difficulty-level-2-selector"
                    onClick={() => setDifficultyLevel(2)}
                    className={`p-4 rounded-xl border-2 text-center transition cursor-pointer ${
                      difficultyLevel === 2
                        ? 'border-amber-600 bg-white shadow-sm ring-1 ring-amber-600'
                        : 'border-zinc-200 bg-zinc-100/50 hover:bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <span className="block text-lg font-bold mb-1">Level 2</span>
                    <span className="block text-[11px] font-mono leading-relaxed opacity-90">
                      Older Kids & Advanced (Word builders, Blanks, Grammar blend)
                    </span>
                  </button>

                </div>
              </div>

              {/* Reward notice */}
              <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl text-xs space-y-1">
                <p className="font-bold text-amber-900 flex items-center gap-1">
                  <Zap className="w-4 h-4 fill-amber-300 text-amber-600" />
                  Earn Big Rewards
                </p>
                <p className="text-zinc-600 font-sans leading-relaxed">
                  Every correct question grants <span className="font-semibold text-zinc-800">30 XP</span>. Standard quizzes have 4 to 6 questions. Complete a spelling/grammar level with 100% accuracy to earn a <span className="font-semibold text-zinc-800">+50 XP perfect bonus</span>!
                </p>
              </div>

              {/* Start Trigger */}
              <button
                id="start-quiz-btn"
                onClick={buildQuiz}
                className="w-full py-4 bg-zinc-950 font-sans font-bold rounded-xl text-white hover:bg-zinc-900 transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Launch Interactive Exercises</span>
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

          </div>
        </div>
      )}

      {/* Quiz ACTIVE Playing state */}
      {quizState === 'playing' && activeQuestion && (
        <div id="quiz-question-card" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-zinc-200 space-y-6">
          
          {/* Quiz Header: Progress bar */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <div className="flex items-center gap-2">
              <span className="bg-zinc-100 px-2 py-0.5 rounded">Level {difficultyLevel} Practice</span>
              <span className="text-zinc-800 font-bold">Accuracy: {score}/{currentQuestionIndex}</span>
            </div>
          </div>

          <div className="w-full bg-zinc-100 rounded-full h-2">
            <div 
              className="bg-amber-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            />
          </div>

          {/* Prompt / Subject Space */}
          <div className="space-y-4">
            <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-100 text-center space-y-3">
              <h3 className="text-zinc-800 font-sans font-medium text-lg max-w-2xl mx-auto md:leading-relaxed">
                {activeQuestion.prompt}
              </h3>
              
              {activeQuestion.geezSubject && (
                <div className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 py-2 select-all">
                  {activeQuestion.geezSubject}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Answer Input Choices */}
          
          {/* Choice A: Standard word assembly puzzle using block chips */}
          {activeQuestion.type === 'word_assembly_puzzle' ? (
            <div className="space-y-4">
              <div className="min-h-[70px] bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-xl p-4 flex flex-wrap gap-2 items-center justify-center">
                {assembledPhrase.length === 0 ? (
                  <span className="text-xs font-mono text-zinc-400">Tap word tiles below in the correct sequence of speech</span>
                ) : (
                  assembledPhrase.map((word, i) => (
                    <button
                      key={i}
                      id={`assembled-phrase-chip-${i}`}
                      onClick={() => handleAssembleWord(word)}
                      className="px-4 py-2 bg-amber-600 text-white font-serif font-bold rounded-lg hover:bg-amber-700 transition shadow-sm text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{word}</span>
                      <X className="w-3.5 h-3.5 text-amber-200" />
                    </button>
                  ))
                )}
              </div>

              {/* Scrambled source choices drawer */}
              <div className="flex flex-wrap gap-2.5 justify-center py-2">
                {activeQuestion.options.map((word, index) => {
                  const isUsed = assembledPhrase.includes(word);
                  return (
                    <button
                      key={index}
                      id={`scrambled-tile-${index}`}
                      onClick={() => handleAssembleWord(word)}
                      disabled={isUsed || hasSubmitted}
                      className={`px-4 py-2.5 rounded-lg border font-serif font-bold text-sm transition cursor-pointer ${
                        isUsed
                          ? 'bg-zinc-100 text-zinc-300 border-zinc-100'
                          : 'bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-800 shadow-sm'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>

              {assembledPhrase.length > 0 && !hasSubmitted && (
                <div className="text-right">
                  <button
                    id="clear-assembly-btn"
                    onClick={handleClearAssembly}
                    className="text-xs font-mono text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Choice B: Standard multiple choice options
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {activeQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                
                let optionStyle = 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800';
                if (isSelected) {
                  optionStyle = 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500';
                }
                
                // Overlay correctness styles if submitted
                if (hasSubmitted) {
                  if (option === activeQuestion.correctAnswer) {
                    optionStyle = 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500';
                  } else if (isSelected) {
                    optionStyle = 'border-red-600 bg-red-50 text-red-900 ring-2 ring-red-500';
                  } else {
                    optionStyle = 'opacity-50 border-zinc-100 text-zinc-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    id={`quiz-option-${idx}`}
                    onClick={() => handleSelectAnswer(option)}
                    disabled={hasSubmitted}
                    className={`w-full p-4 rounded-xl border text-left font-sans font-medium text-sm transition flex items-center justify-between cursor-pointer ${optionStyle}`}
                  >
                    <span className="font-serif text-base leading-tight">{option}</span>
                    <div className="flex-shrink-0 ml-2">
                      {isSelected && !hasSubmitted && <div className="w-4 h-4 rounded-full bg-amber-600" />}
                      {hasSubmitted && option === activeQuestion.correctAnswer && (
                        <Check className="w-5 h-5 text-emerald-600" />
                      )}
                      {hasSubmitted && isSelected && option !== activeQuestion.correctAnswer && (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Feedback Section */}
          {hasSubmitted && (
            <div id="quiz-question-feedback" className={`p-4 rounded-xl border ${
              answersLog[currentQuestionIndex]?.isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-800'
            } space-y-1.5`}>
              <div className="flex items-center gap-2">
                {answersLog[currentQuestionIndex]?.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 font-bold" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
                <span className="font-bold text-sm">
                  {answersLog[currentQuestionIndex]?.isCorrect ? 'Stellar! Correct Answer.' : 'Not quite right'}
                </span>
              </div>
              <p className="text-xs font-sans pl-7 leading-relaxed">
                {activeQuestion.contextTip || `Correct expression: "${activeQuestion.correctAnswer}".`}
              </p>
            </div>
          )}

          {/* Active Navigation Panel */}
          <div className="flex justify-end pt-4 border-t border-zinc-100 gap-3">
            {!hasSubmitted ? (
              <button
                id="submit-answer-btn"
                onClick={handleSubmitAnswer}
                disabled={
                  activeQuestion.type === 'word_assembly_puzzle'
                    ? assembledPhrase.length === 0
                    : !selectedAnswer
                }
                className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
              >
                Verify Answer
              </button>
            ) : (
              <button
                id="quiz-next-question-btn"
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition text-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>
                  {currentQuestionIndex + 1 === questions.length ? 'See Final Score' : 'Continue'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      )}

      {/* Quiz COMPLETED finish summary state */}
      {quizState === 'completed' && (
        <div id="quiz-results-card" className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-zinc-200 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-sans font-extrabold text-zinc-900 tracking-tight">Practice Complete!</h2>
            <p className="text-sm font-mono text-zinc-500">How you fared in Category {selectedLessonId}</p>
          </div>

          {/* Large Radial/Score Display */}
          <div className="max-w-xs mx-auto bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-2">
            <span className="block text-4xl font-extrabold text-amber-600 font-mono">
              {Math.round((score / questions.length) * 100)}%
            </span>
            <p className="text-sm text-zinc-700 font-medium font-sans">
              You correctly got <span className="font-bold text-zinc-900">{score}</span> out of <span className="font-bold">{questions.length}</span> exercises.
            </p>
            <div className="pt-2">
              <span className="inline-block bg-amber-100 text-amber-900 font-mono text-xs font-bold px-2.5 py-1 rounded-full">
                +{score * 30 + (score === questions.length ? 50 : 0)} XP Earned
              </span>
            </div>
          </div>

          {/* Feedback review rows */}
          <div className="text-left max-w-lg mx-auto space-y-2">
            <span className="block text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">Review Questions:</span>
            <div className="divide-y divide-zinc-100 max-h-48 overflow-y-auto pr-2">
              {answersLog.map((log, i) => (
                <div key={i} className="py-2 flex items-start gap-2.5 text-xs">
                  {log.isCorrect ? (
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-zinc-800 font-sans leading-tight">
                      {log.questionPrompt}
                    </p>
                    <p className="font-mono text-zinc-500 mt-0.5">
                      Your response: <span className={log.isCorrect ? 'text-emerald-700 font-semibold' : 'text-red-700 font-semibold'}>{log.userSelected}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Close Panel & Replay Trigger */}
          <div className="flex justify-center gap-3 pt-4 border-t border-zinc-100">
            <button
              id="quiz-reset-setup-btn"
              onClick={() => setQuizState('setup')}
              className="px-5 py-3 bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-xl hover:bg-zinc-100 transition text-sm font-semibold flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry / Other Lessons</span>
            </button>

            <button
              id="quiz-accept-score-btn"
              onClick={() => setQuizState('setup')}
              className="px-6 py-3 bg-zinc-950 text-white rounded-xl font-bold hover:bg-zinc-900 transition text-sm cursor-pointer shadow-md"
            >
              Collect Rewards
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
