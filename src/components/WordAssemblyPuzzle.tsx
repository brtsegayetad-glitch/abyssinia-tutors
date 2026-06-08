/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, ArrowRight, RefreshCw, Star, HelpCircle, BookOpen } from 'lucide-react';
import { audioSynth } from '../utils/audio-fidel';

// @ts-ignore
import alphabetBookImg from '../assets/images/alphabet_book_illustration_1779825227047.png';

interface WordAssemblyPuzzleProps {
  game: {
    game_id: string;
    game_type: string;
    title?: string;
    instructions_en?: string;
    scrambled_letters: string[];
    correct_answer: string;
    tips_en?: string;
    english_translation?: string;
    image_url?: string;
    points_reward?: number;
  };
  onSuccess: (scoreReward: number) => void;
  onNext: () => void;
}

export default function WordAssemblyPuzzle({ game, onSuccess, onNext }: WordAssemblyPuzzleProps) {
  // Letters that are currently placed in the dynamic slots
  const [placedLetters, setPlacedLetters] = useState<(string | null)[]>(
    Array(game.correct_answer.length).fill(null)
  );
  
  // Scrambled pile. Keep track of available items and their index so we can tap back and forth
  const [availableLetters, setAvailableLetters] = useState<{ id: string; letter: string; isUsed: boolean }[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isErrorShaking, setIsErrorShaking] = useState(false);

  useEffect(() => {
    // Reset component state when game prop changes
    const initialPile = game.scrambled_letters.map((char, index) => ({
      id: `pile-char-${index}-${char}`,
      letter: char,
      isUsed: false
    }));
    setAvailableLetters(initialPile);
    setPlacedLetters(Array(game.correct_answer.length).fill(null));
    setIsSuccess(false);

    // Speak initial level instructions
    const promptText = game.instructions_en || "Assemble the letters in the correct order to form the word!";
    audioSynth.speakInstructions(promptText);
  }, [game]);

  // Handle clicking on a letter in the available scrambled pile
  const handleSelectLetter = (item: { id: string; letter: string; isUsed: boolean }) => {
    if (isSuccess || item.isUsed) return;

    // Pronounce the selected character's syllable
    audioSynth.speakFidel(item.letter);

    // Find the first empty slot in index
    const firstEmptyIndex = placedLetters.indexOf(null);
    if (firstEmptyIndex !== -1) {
      const newPlaced = [...placedLetters];
      newPlaced[firstEmptyIndex] = item.letter;
      setPlacedLetters(newPlaced);

      // Mark this piled letter as used
      setAvailableLetters(prev =>
        prev.map(p => (p.id === item.id ? { ...p, isUsed: true } : p))
      );

      // Check if all slots are filled.
      const updatedPlaced = [...newPlaced];
      const isFull = !updatedPlaced.includes(null);
      if (isFull) {
        verifyWord(updatedPlaced);
      }
    }
  };

  // Click on a slot letter to return it to the available pile
  const handleRemoveLetter = (index: number) => {
    if (isSuccess) return;
    const letter = placedLetters[index];
    if (!letter) return;

    // Find the first matched item in available pile that is used and mark it unused
    const matchingPileItem = availableLetters.find(p => p.letter === letter && p.isUsed);
    if (matchingPileItem) {
      setAvailableLetters(prev =>
        prev.map(p => (p.id === matchingPileItem.id ? { ...p, isUsed: false } : p))
      );
    }

    const newPlaced = [...placedLetters];
    newPlaced[index] = null;
    setPlacedLetters(newPlaced);
  };

  // Reset current selection
  const handleReset = () => {
    if (isSuccess) return;
    setPlacedLetters(Array(game.correct_answer.length).fill(null));
    setAvailableLetters(prev => prev.map(p => ({ ...p, isUsed: false })));
  };

  // Compare completed arrangement with target correct Amharic word
  const verifyWord = (currentWordList: (string | null)[]) => {
    const assembled = currentWordList.join('');
    if (assembled === game.correct_answer) {
      setIsSuccess(true);
      audioSynth.playCorrect();

      // Pronounce success instructions
      setTimeout(() => {
        let msg = `Fantastic! You built the word ${game.correct_answer}!`;
        if (game.english_translation) {
          msg += ` which means ${game.english_translation}`;
        }
        audioSynth.speakInstructions(msg);
      }, 700);

      onSuccess(game.points_reward || 25);
    } else {
      audioSynth.playIncorrect();
      setIsErrorShaking(true);
      setTimeout(() => {
        setIsErrorShaking(false);
        handleReset(); // Reset automatically so children can try again
      }, 1000);
    }
  };

  // Try to find the local imported asset
  const getIllustration = () => {
    if (game.correct_answer === 'ሀሁ') {
      return alphabetBookImg;
    }
    return null;
  };

  const illustrationSrc = getIllustration();

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 md:p-6" id="game_word_assembly">
      {/* Description header */}
      <div className="w-full text-center mb-5 px-4">
        <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-100/50 px-3.5 py-1.5 rounded-full mb-3 inline-flex items-center gap-1">
          <Star className="w-4 h-4 fill-orange-500 text-orange-500" /> Word Assembler Master Task
        </span>
        <h3 className="text-base md:text-lg font-bold text-slate-800">
          {game.instructions_en || "Rearrange the scrambled letters to build the target word!"}
        </h3>
      </div>

      {/* Main Illustration Support Card */}
      <div className="w-full bg-white rounded-[2rem] border-4 border-slate-200 p-5 flex items-center justify-between shadow-xs mb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-orange-50/50 border border-orange-100 flex items-center justify-center p-2 flex-shrink-0">
            {illustrationSrc ? (
              <img 
                src={illustrationSrc} 
                alt="Amharic word support graphic" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <BookOpen className="w-10 h-10 text-orange-400" />
            )}
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-800 tracking-wide uppercase">
              Target: {game.english_translation || "Vocabulary word"}
            </h4>
            <p className="text-xs text-slate-400 font-bold">
              {game.tips_en || "Focus on building the Amharic letters arrangement!"}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          disabled={isSuccess}
          className="p-3 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-500 hover:text-slate-800 rounded-full cursor-pointer transition-all border border-slate-200 shadow-xs"
          id="btn_reset_assembly"
          title="Reset puzzle"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Target Word Slots Area */}
      <div className="w-full mb-8">
        <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block mb-3 text-center">
          Building Blocks Slots
        </span>

        <motion.div
          animate={isErrorShaking ? {
            x: [-10, 10, -10, 10, -5, 5, 0],
            border: "4px solid #ef4444"
          } : {}}
          transition={{ duration: 0.5 }}
          className={`flex gap-3 justify-center items-center w-full py-6 px-4 bg-slate-50 border-4 ${
            isSuccess ? 'border-emerald-400 bg-emerald-50/20' : 'border-slate-200'
          } rounded-[2.5rem]`}
        >
          {placedLetters.map((letter, index) => (
            <button
              key={`slot-${index}`}
              onClick={() => handleRemoveLetter(index)}
              disabled={isSuccess || !letter}
              className={`w-14 h-16 md:w-16 md:h-20 rounded-2xl border-2 transition-all flex items-center justify-center text-3xl font-black relative ${
                letter
                  ? isSuccess
                    ? 'bg-emerald-500 border-emerald-600 text-white shadow-md'
                    : 'bg-white border-orange-400 text-slate-800 shadow-md cursor-pointer hover:bg-slate-50'
                  : 'border-dashed border-slate-300 bg-white/50 text-slate-300'
              }`}
              id={`btn_slot_${index}`}
            >
              {letter || '?'}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Scrambled Available Letters Pile */}
      <div className="w-full flex flex-col items-center gap-3 mb-8">
        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
          {isSuccess ? "Congratulations!" : "Tap to place letter into slots!"}
        </span>

        <div className="flex gap-3 flex-wrap justify-center max-w-sm">
          {availableLetters.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectLetter(item)}
              disabled={item.isUsed || isSuccess}
              className={`w-14 h-14 rounded-2xl border-4 font-black text-2xl flex items-center justify-center transition-all cursor-pointer relative ${
                item.isUsed
                  ? 'opacity-25 bg-slate-100 border-slate-200 text-slate-300 shadow-none pointer-events-none'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-orange-300 hover:scale-105 active:translate-y-0.5 shadow-[0_4px_0_#cbd5e1]'
              }`}
              id={`btn_assembly_letter_${item.letter}`}
            >
              {item.letter}
            </button>
          ))}
        </div>
      </div>

      {/* Success Notification Board */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-emerald-500 text-white rounded-3xl p-6 shadow-xl text-center"
          >
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 rounded-full p-3">
                <Sparkles className="w-7 h-7 text-white animate-bounce" />
              </div>
            </div>
            
            <h4 className="text-2xl font-black mb-1">Excellent Assembly! በጣም ድንቅ!</h4>
            <p className="text-emerald-50 text-sm max-w-md mx-auto mb-5 leading-normal">
              You successfully assembled the word <strong>{game.correct_answer}</strong> (pronounced as {game.english_translation || 'the correct phonetic spelling'})!
            </p>

            <button
              onClick={onNext}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black px-8 py-3.5 rounded-2xl shadow-[0_4px_0_#ca8a04] active:translate-y-1 active:shadow-none transition-all inline-flex items-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
              id="btn_assembly_next"
            >
              <span>Keep Going!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
