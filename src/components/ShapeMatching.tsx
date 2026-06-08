/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, CheckCircle, HelpCircle } from 'lucide-react';
import { ShapeMatchingGame } from '../types';
import { audioSynth } from '../utils/audio';

interface ShapeMatchingProps {
  game: ShapeMatchingGame;
  onSuccess: (scoreReward: number) => void;
  onNext: () => void;
}

export default function ShapeMatching({ game, onSuccess, onNext }: ShapeMatchingProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [shakingOption, setShakingOption] = useState<string | null>(null);

  // Dynamically resolve options placeholders
  const getResolvedOptions = (): string[] => {
    if (!game.options || game.options.includes('matching_placeholder') || game.options.length <= 1) {
      if (game.target_shape === 'ሸ') {
        return ['ሸ', 'ሹ', 'ሺ'];
      }
      return [game.correct_answer, 'ሪ', 'ለ'];
    }
    return game.options;
  };

  const resolvedOptions = getResolvedOptions();

  useEffect(() => {
    // Speak general instructions when game loads
    const textToSpeak = game.instructions_en || "Match the fidel: Find the symbol that is exactly like the target shape.";
    audioSynth.speakInstructions(textToSpeak);
  }, [game]);

  const handleOptionClick = (option: string) => {
    if (isDone) return;

    // Play pronunciation synth
    audioSynth.speakFidel(option);

    if (option === game.correct_answer) {
      setSelectedOption(option);
      setIsDone(true);
      audioSynth.playCorrect();
      // Wait a tiny bit and speak the correct word
      setTimeout(() => {
        audioSynth.speakFidel(option);
      }, 500);
      onSuccess(5); // Reward 5 points
    } else {
      // Set shake feedback
      setShakingOption(option);
      audioSynth.playIncorrect();
      setTimeout(() => {
        setShakingOption(null);
      }, 600);
    }
  };

  const handleSpeechInstructions = () => {
    const textToSpeak = game.instructions_en || `Match the target symbol: ${game.target_shape}`;
    audioSynth.speakInstructions(textToSpeak);
  };

  // Theme definition mapping
  const bgTheme = game.visual_theme === 'sunny_yellow' 
    ? 'from-amber-50 to-amber-100 border-amber-200' 
    : 'from-blue-50 to-blue-100 border-blue-200';

  const cardTheme = game.visual_theme === 'sunny_yellow'
    ? 'bg-amber-100 hover:bg-amber-200 text-amber-800'
    : 'bg-blue-100 hover:bg-blue-200 text-blue-800';

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 md:p-6" id="game_shape_matching">
      {/* Target card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="w-full flex flex-col items-center relative mb-8"
      >
        <button 
          onClick={handleSpeechInstructions}
          className="absolute top-2 right-2 md:top-4 md:right-4 w-12 h-12 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center shadow-md border-2 border-white transition-all text-white text-lg cursor-pointer"
          title="Play Instructions"
          id="btn_play_instructions"
        >
          🔊
        </button>

        <span className="text-xs font-black uppercase text-orange-500 tracking-widest bg-orange-100/50 px-3.5 py-1.5 rounded-full mb-3">
          Match the Fidel
        </span>

        <h3 className="text-base md:text-lg font-bold text-slate-500 text-center mb-6 px-4">
          {game.instructions_en || "Find the symbol that is exactly like the target shape"}
        </h3>

        {/* Big target character container */}
        <motion.div 
          onClick={() => audioSynth.speakFidel(game.target_shape)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-60 h-60 bg-yellow-100 rounded-[3rem] border-4 border-dashed border-yellow-400 flex items-center justify-center shadow-inner cursor-pointer relative"
        >
          <span className="text-[120px] font-black text-orange-600 leading-none">
            {game.target_shape}
          </span>
          <div className="absolute bottom-4 right-4 text-orange-400 bg-white/55 p-1.5 rounded-full shadow-xs">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
        </motion.div>

        <p className="mt-4 text-xs text-amber-700 font-mono tracking-wide bg-amber-50 px-3 py-1 rounded-full flex items-center gap-1.5 border border-amber-200">
          <HelpCircle className="w-3.5 h-3.5 inline" /> Pronounced as: <strong className="font-extrabold text-amber-900">“{game.pronunciation_label || 'Re'}”</strong>
        </p>
      </motion.div>

      {/* Matching Options */}
      <div className="w-full flex gap-4 md:gap-6 justify-center items-center mb-8 flex-wrap">
        {resolvedOptions.map((option, idx) => {
          const isCorrect = option === game.correct_answer;
          const isCurrentlyShaking = shakingOption === option;
          const isSelectedCorrect = isDone && selectedOption === option;

          return (
            <motion.button
              key={`${game.game_id}-opt-${idx}`}
              onClick={() => handleOptionClick(option)}
              disabled={isDone}
              animate={isCurrentlyShaking ? {
                x: [-6, 6, -6, 6, 0],
                transition: { duration: 0.4 }
              } : {}}
              whileHover={!isDone ? { scale: 1.06, y: -4 } : {}}
              whileTap={!isDone ? { scale: 0.95 } : {}}
              className={`w-32 h-32 sm:w-40 sm:h-40 rounded-3xl flex items-center justify-center border-4 text-5xl sm:text-7xl font-bold relative transition-all duration-200 cursor-pointer
                ${isSelectedCorrect 
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-600 shadow-xl scale-105' 
                  : isDone
                    ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed opacity-40'
                    : 'bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700 shadow-lg'
                }
              `}
              id={`opt_match_${idx}`}
            >
              <span>{option}</span>
              {isSelectedCorrect && (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow"
                >
                  <span className="text-white text-xs font-black">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback panel */}
      <AnimatePresence>
        {isDone && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-emerald-500 text-white rounded-3xl p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="bg-white/20 p-2.5 rounded-xl text-white">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm md:text-base">Perfect Match! ልክ ነህ/ነሽ!</h4>
                <p className="text-emerald-100 text-xs md:text-sm">You selected <span className="font-bold underline">“{game.correct_answer}”</span> representing Roman phonetic {game.pronunciation_label || 'Re'}.</p>
              </div>
            </div>

            <button 
              onClick={onNext}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-8 py-3 rounded-2xl font-black text-sm md:text-base transition-all shadow-[0_4px_0_#ca8a04] active:translate-y-1 active:shadow-none cursor-pointer"
              id="btn_shape_match_next"
            >
              CONTINUE →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
