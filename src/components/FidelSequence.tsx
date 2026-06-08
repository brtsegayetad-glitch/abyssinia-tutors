/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, ArrowRight, RefreshCw, Star, HelpCircle } from 'lucide-react';
import { FidelSequenceGame } from '../types';
import { audioSynth } from '../utils/audio-fidel';

interface FidelSequenceProps {
  game: FidelSequenceGame;
  onSuccess: (scoreReward: number) => void;
  onNext: () => void;
}

export default function FidelSequence({ game, onSuccess, onNext }: FidelSequenceProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shakingOption, setShakingOption] = useState<string | null>(null);

  useEffect(() => {
    // Speak level instructions on load
    const promptText = game.instructions_en || `Pattern sequence game: Look at the pattern and find what comes next!`;
    audioSynth.speakInstructions(promptText);
  }, [game]);

  const handlePlaySound = (option: string) => {
    audioSynth.speakFidel(option);
  };

  const handleSelectOption = (option: string) => {
    if (isSuccess) return;

    audioSynth.speakFidel(option);

    if (option === game.correct_answer) {
      setSelectedOption(option);
      setIsSuccess(true);
      audioSynth.playCorrect();
      
      const pronunciationPart = game.target_pronunciation ? ` pronounced ${game.target_pronunciation}` : "";
      setTimeout(() => {
        audioSynth.speakInstructions(`Correct! The next symbol is ${option}${pronunciationPart}!`);
      }, 700);

      onSuccess(15); // Reward 15 points
    } else {
      setShakingOption(option);
      audioSynth.playIncorrect();
      setTimeout(() => {
        setShakingOption(null);
      }, 600);
    }
  };

  // Convert the sequence display string or split it to show beautifully in UI
  const parseSequence = (seq: string) => {
    // splits e.g. "በ ➔ ቡ ➔ [ ? ]" safely
    return seq.split(/➔|→|->/).map(item => item.trim());
  };

  const sequenceSteps = parseSequence(game.sequence_display);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 md:p-6" id="game_fidel_sequence">
      {/* Description header */}
      <div className="w-full text-center mb-8 px-4">
        <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-100/50 px-3.5 py-1.5 rounded-full mb-3 inline-flex items-center gap-1">
          <Star className="w-4 h-4 fill-orange-500 text-orange-500 animate-spin" style={{ animationDuration: '6s' }} /> Sequence Quest
        </span>
        <h3 className="text-base md:text-lg font-bold text-slate-800">
          {game.instructions_en || "Look at the pattern! Select the correct Amharic letter that completes the sequence."}
        </h3>
      </div>

      {/* Sequence Display Box */}
      <div className="w-full bg-amber-50 rounded-[2.5rem] border-4 border-amber-200 p-6 md:p-8 flex flex-col items-center justify-center shadow-lg relative mb-10 overflow-hidden">
        {/* Soft geometric accent */}
        <div className="absolute top-2 right-2 text-amber-200 animate-pulse">
          <HelpCircle className="w-16 h-16 opacity-30" />
        </div>

        <span className="text-[10px] text-amber-600 font-black uppercase tracking-wider mb-4 px-3 py-1 bg-amber-100 rounded-full">
          The Pattern Rule
        </span>

        {/* Horizontal Sequence Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 relative z-10">
          {sequenceSteps.map((step, idx) => {
            const isPlaceholder = step.includes('[') || step.includes('?') || step === '?';
            
            return (
              <React.Fragment key={`seq-step-${idx}`}>
                {idx > 0 && (
                  <span className="text-amber-400 font-extrabold text-xl animate-pulse">➔</span>
                )}
                
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`min-w-[4.5rem] h-18 px-4 rounded-2xl flex flex-col items-center justify-center border-4 ${
                    isPlaceholder
                      ? isSuccess 
                        ? 'bg-emerald-500 border-emerald-600 text-white shadow-md'
                        : 'bg-yellow-100 border-dashed border-yellow-400 text-yellow-700 animate-bounce'
                      : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                  }`}
                >
                  <span className="text-2xl font-black">
                    {isPlaceholder && isSuccess ? game.correct_answer : step}
                  </span>
                  {isPlaceholder && (
                    <span className="text-[9px] uppercase font-black tracking-widest mt-1 opacity-70">
                      {isSuccess ? game.target_pronunciation || "Next" : "Next?"}
                    </span>
                  )}
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Options Picker */}
      <div className="w-full flex flex-col items-center gap-4 mb-8">
        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
          Tap the correct letter to play!
        </span>

        <div className="grid grid-cols-3 gap-4 w-full max-w-md justify-center">
          {game.options.map((option, index) => {
            const isShaking = shakingOption === option;
            const isCorrect = option === game.correct_answer;
            const isChosen = selectedOption === option;

            return (
              <motion.div
                key={`seq-opt-${index}`}
                animate={isShaking ? {
                  x: [-6, 6, -6, 6, 0],
                  transition: { duration: 0.4 }
                } : {}}
                className="relative"
              >
                <button
                  onClick={() => handleSelectOption(option)}
                  disabled={isSuccess}
                  className={`w-full py-5 rounded-3xl border-4 font-black text-3xl flex flex-col items-center justify-center transition-all cursor-pointer relative shadow-[0_4px_0_#94a3b8] active:translate-y-1 active:shadow-none ${
                    isSuccess && isCorrect
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-[0_4px_0_#059669]'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-yellow-400 hover:bg-yellow-50/30'
                  }`}
                  id={`btn_seq_option_${index}`}
                >
                  <span>{option}</span>

                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaySound(option);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        handlePlaySound(option);
                      }
                    }}
                    className={`absolute right-2 top-2 p-1.5 rounded-full border transition-all cursor-pointer z-10 ${
                      isSuccess && isCorrect 
                        ? 'bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-700' 
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-850'
                    }`}
                    title="Speak letter"
                    role="button"
                    tabIndex={0}
                  >
                    <Volume2 className="w-3 h-3" />
                  </span>
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
                <Sparkles className="w-8 h-8 animate-bounce text-white" />
              </div>
            </div>
            
            <h4 className="text-2xl font-black mb-1">Bravo! በጣም ትክክል!</h4>
            <p className="text-emerald-50 text-sm max-w-md mx-auto mb-5 leading-normal">
              You found the pattern rules! <strong>{game.correct_answer}</strong> is the correct next character in the Amharic sequence!
            </p>

            <button
              onClick={onNext}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black px-8 py-3.5 rounded-2xl shadow-[0_4px_0_#ca8a04] active:translate-y-1 active:shadow-none transition-all inline-flex items-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
              id="btn_seq_next"
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
