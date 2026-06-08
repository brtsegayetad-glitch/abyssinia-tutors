/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, HelpCircle, Star, ShieldAlert } from 'lucide-react';
import { audioSynth } from '../utils/audio';

interface ReverseFidelDecryptionProps {
  game: {
    game_id: string;
    game_type: string;
    title?: string;
    instructions_en?: string;
    target_phonetic_label: string;
    options: string[];
    correct_answer: string;
    points_reward?: number;
    success_audio?: string;
  };
  onSuccess: (scoreReward: number) => void;
  onNext: () => void;
}

export default function ReverseFidelDecryption({ game, onSuccess, onNext }: ReverseFidelDecryptionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shakingOption, setShakingOption] = useState<string | null>(null);

  useEffect(() => {
    // Speak level instructions on load
    const promptText = game.instructions_en || "Final Boss Challenge! Decode the spelling to find the matching Amharic letter!";
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
        audioSynth.speakInstructions(`Perfect decoding! ${option} stands for ${game.target_phonetic_label}!`);
      }, 700);

      onSuccess(game.points_reward || 30);
    } else {
      setShakingOption(option);
      audioSynth.playIncorrect();
      setTimeout(() => {
        setShakingOption(null);
      }, 600);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 md:p-6" id="game_reverse_decryption">
      {/* Description header */}
      <div className="w-full text-center mb-6 px-4">
        <span className="text-xs font-black uppercase tracking-widest text-[#d97706] bg-amber-100/60 px-3.5 py-1.5 rounded-full mb-3 inline-flex items-center gap-1 border-2 border-amber-200">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} /> Final Boss Decoder
        </span>
        <h3 className="text-base md:text-lg font-bold text-slate-800">
          {game.instructions_en || "Match the native English phonetic spelling with its correct Amharic character counterpart."}
        </h3>
      </div>

      {/* Futuristic Decoder Terminal */}
      <div className="w-full bg-slate-900 rounded-[2.5rem] border-8 border-yellow-400 p-8 flex flex-col items-center justify-center shadow-2xl relative mb-8 overflow-hidden">
        {/* Decorative alert logo */}
        <div className="absolute top-3 right-4 text-yellow-400/20">
          <ShieldAlert className="w-20 h-20 animate-pulse" />
        </div>

        <span className="text-[10px] text-yellow-400 font-extrabold uppercase tracking-widest bg-yellow-400/10 px-3.5 py-1 rounded-full mb-4 border border-yellow-405/20">
          Target Phonetic Code
        </span>

        {/* Dynamic target phonetic term badge */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="bg-yellow-400/15 rounded-3xl border-4 border-dashed border-yellow-400 px-8 py-5 text-center mb-1"
        >
          <span className="text-3xl md:text-4xl font-black text-yellow-400 font-mono tracking-wide">
            {game.target_phonetic_label}
          </span>
        </motion.div>
      </div>

      {/* Selection Options */}
      <div className="w-full flex flex-col items-center gap-4 mb-8">
        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
          Tap the correct Amharic decoder key!
        </span>

        <div className="grid grid-cols-4 gap-3 w-full max-w-md justify-center">
          {game.options.map((option, index) => {
            const isShaking = shakingOption === option;
            const isCorrect = option === game.correct_answer;
            const isChosen = selectedOption === option;

            return (
              <motion.div
                key={`opt-decode-${index}`}
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
                  id={`btn_decoder_option_${index}`}
                >
                  <span>{option}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Success Badge Banner */}
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
            
            <h4 className="text-2xl font-black mb-1">Incredible Work! ድንቅ ነው!</h4>
            <p className="text-emerald-50 text-sm max-w-md mx-auto mb-5 leading-normal">
              You completely decoded the boss challenge! You are an official Amharic Alphabet master! 🌟
            </p>

            <button
              onClick={onNext}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black px-8 py-3.5 rounded-2xl shadow-[0_4px_0_#ca8a04] active:translate-y-1 active:shadow-none transition-all inline-flex items-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
              id="btn_decryption_next"
            >
              <span>Finish Finale!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
