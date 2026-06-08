/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, HelpCircle, Star, Lightbulb } from 'lucide-react';
import { audioSynth } from '../utils/audio';

// @ts-ignore
import papayaImg from '../assets/images/papaya_illustration_1779868256197.png';

interface WordPuzzleFillBlankProps {
  game: {
    game_id: string;
    game_type: string;
    title?: string;
    instructions_en?: string;
    word_display_with_blank: string;
    tips_en?: string;
    image_url: string;
    options: string[];
    correct_answer: string;
    points_reward?: number;
    success_audio?: string;
  };
  onSuccess: (scoreReward: number) => void;
  onNext: () => void;
}

export default function WordPuzzleFillBlank({ game, onSuccess, onNext }: WordPuzzleFillBlankProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shakingOption, setShakingOption] = useState<string | null>(null);

  useEffect(() => {
    // Speak level instructions on load
    const promptText = game.instructions_en || "Find the missing letter to complete the Amharic word!";
    audioSynth.speakInstructions(promptText);
  }, [game]);

  const handleSelectOption = (option: string) => {
    if (isSuccess) return;

    audioSynth.speakFidel(option);

    if (option === game.correct_answer) {
      setSelectedOption(option);
      setIsSuccess(true);
      audioSynth.playCorrect();

      setTimeout(() => {
        audioSynth.speakInstructions(`Excellent! The full word is Papaya!`);
      }, 700);

      onSuccess(game.points_reward || 25);
    } else {
      setShakingOption(option);
      audioSynth.playIncorrect();
      setTimeout(() => {
        setShakingOption(null);
      }, 600);
    }
  };

  // Replace default "__" blank from word_display_with_blank with the correct selected letter or state
  const getRenderWord = () => {
    if (isSuccess) {
      return game.word_display_with_blank.replace('__', game.correct_answer);
    }
    return game.word_display_with_blank;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 md:p-6" id="game_word_puzzle">
      {/* Description header */}
      <div className="w-full text-center mb-6 px-4">
        <span className="text-xs font-black uppercase tracking-widest text-[#93c5fd] bg-blue-100/50 px-3.5 py-1.5 rounded-full mb-3 inline-flex items-center gap-1">
          <Star className="w-4 h-4 fill-blue-500 text-blue-400" /> Word Finish Challenge
        </span>
        <h3 className="text-base md:text-lg font-bold text-slate-800">
          {game.instructions_en || "Look at the incomplete word. What is the missing letter?"}
        </h3>
      </div>

      {/* Main Illustration and Chalkboard Row */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-center">
        {/* Playful Illustration Card */}
        <div className="bg-white rounded-[2.5rem] p-6 border-4 border-slate-200 shadow-md flex flex-col items-center justify-center">
          <div className="w-40 h-40 relative rounded-2xl overflow-hidden bg-amber-50/50 border border-amber-100 p-2 flex items-center justify-center">
            <img 
              src={papayaImg} 
              alt="Papaya Illustration" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-[10px] text-slate-400 font-extrabold uppercase mt-3 tracking-widest">
            Word Puzzle Image
          </span>
        </div>

        {/* Chalkboard Word State */}
        <div className="bg-slate-800 rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center justify-center border-4 border-slate-900 shadow-lg text-center h-full relative">
          <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-4">
            Complete the Word
          </span>
          <div className="text-4xl md:text-5xl font-black text-white tracking-widest leading-relaxed">
            {getRenderWord().split(' ').map((letter, idx) => {
              if (letter === '__') {
                return (
                  <span 
                    key={idx} 
                    className={`inline-block border-b-4 mx-1 min-w-[2.5rem] text-center ${
                      isSuccess ? 'border-emerald-400 text-emerald-400 animate-pulse' : 'border-dashed border-yellow-400 text-yellow-400'
                    }`}
                  >
                    ?
                  </span>
                );
              }
              return (
                <span key={idx} className="mx-1">
                  {letter}
                </span>
              );
            })}
          </div>

          <p className="text-[11px] text-amber-300 font-black mt-5 flex items-center gap-1 justify-center bg-slate-900/40 px-3 py-1.5 rounded-full">
            <Lightbulb className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> {game.tips_en || "The full word is ፓፓያ (pronounced Pa-pa-ya)."}
          </p>
        </div>
      </div>

      {/* Options Picker Grid */}
      <div className="w-full flex flex-col items-center gap-4 mb-8">
        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
          Choose the missing letter to insert!
        </span>

        <div className="grid grid-cols-4 gap-4 w-full max-w-md justify-center">
          {game.options.map((option, index) => {
            const isShaking = shakingOption === option;
            const isCorrect = option === game.correct_answer;
            const isChosen = selectedOption === option;

            return (
              <motion.div
                key={`opt-puzzle-${index}`}
                animate={isShaking ? {
                  x: [-6, 6, -6, 6, 0],
                  transition: { duration: 0.4 }
                } : {}}
                className="relative"
              >
                <button
                  onClick={() => handleSelectOption(option)}
                  disabled={isSuccess}
                  className={`w-full py-5 rounded-2xl border-4 font-black text-3xl flex items-center justify-center transition-all cursor-pointer relative shadow-[0_4px_0_#94a3b8] active:translate-y-1 active:shadow-none ${
                    isSuccess && isCorrect
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-[0_4px_0_#059669]'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-yellow-400 hover:bg-yellow-50/20'
                  }`}
                  id={`btn_puzzle_option_${index}`}
                >
                  <span>{option}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Success Banner */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-emerald-500 text-white rounded-3xl p-6 shadow-xl text-center"
          >
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 rounded-full p-3">
                <Sparkles className="w-7 h-7 animate-bounce text-white" />
              </div>
            </div>
            
            <h4 className="text-2xl font-black mb-1">Awesome! ግሩም ነው!</h4>
            <p className="text-emerald-50 text-sm max-w-md mx-auto mb-5 leading-normal">
              You correctly solved the puzzle! <strong>{game.correct_answer}</strong> fills in the blank space beautifully!
            </p>

            <button
              onClick={onNext}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black px-8 py-3.5 rounded-2xl shadow-[0_4px_0_#ca8a04] active:translate-y-1 active:shadow-none transition-all inline-flex items-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
              id="btn_puzzle_next"
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
