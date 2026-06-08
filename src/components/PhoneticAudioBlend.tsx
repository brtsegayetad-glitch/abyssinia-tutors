/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, CheckCircle, HelpCircle, ArrowRight, Play, Star } from 'lucide-react';
import { audioSynth } from '../utils/audio';

interface PhoneticAudioBlendProps {
  game: {
    game_id: string;
    game_type: string;
    title?: string;
    instructions_en?: string;
    target_audio?: string;
    target_phonetic_description?: string;
    options: string[];
    correct_answer: string;
    points_reward?: number;
  };
  onSuccess: (scoreReward: number) => void;
  onNext: () => void;
}

export default function PhoneticAudioBlend({ game, onSuccess, onNext }: PhoneticAudioBlendProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shakingOption, setShakingOption] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Speak initial level instructions on load
    const promptText = game.instructions_en || "Listen closely to the sound blend and pick the character that matches!";
    audioSynth.speakInstructions(promptText);
    
    // Auto-play the target phonetic sound once on mount
    const timer = setTimeout(() => {
      handlePlaySound();
    }, 1200);

    return () => clearTimeout(timer);
  }, [game]);

  const handlePlaySound = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Speak a helpful hint first, then the actual sound
    if (game.target_phonetic_description) {
      audioSynth.speakInstructions(`${game.target_phonetic_description}. Listen again:`);
    }

    setTimeout(() => {
      // Use synthesis custom Ge'ez tone for the correct letter
      audioSynth.speakFidel(game.correct_answer);
      setIsPlaying(false);
    }, game.target_phonetic_description ? 2400 : 100);
  };

  const handleSelectOption = (option: string) => {
    if (isSuccess) return;

    audioSynth.speakFidel(option);

    if (option === game.correct_answer) {
      setSelectedOption(option);
      setIsSuccess(true);
      audioSynth.playCorrect();
      
      const parts = game.target_phonetic_description ? `, which represents ${game.target_phonetic_description}` : "";
      setTimeout(() => {
        audioSynth.speakInstructions(`Fantastic! ${option}${parts} is correct!`);
      }, 800);

      onSuccess(game.points_reward || 25);
    } else {
      setShakingOption(option);
      audioSynth.playIncorrect();
      setTimeout(() => {
        setShakingOption(null);
      }, 600);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 md:p-6" id="game_sound_blend">
      {/* Description header */}
      <div className="w-full text-center mb-6 px-4">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-500 bg-emerald-100/50 px-3.5 py-1.5 rounded-full mb-3 inline-flex items-center gap-1">
          <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" /> Master Blend Quest
        </span>
        <h3 className="text-base md:text-lg font-bold text-slate-800">
          {game.instructions_en || "Listen closely to the complex pronunciation blend. Which symbol represents the exact sound you hear?"}
        </h3>
      </div>

      {/* Main Play Audio Stage */}
      <div className="w-full bg-emerald-50/50 rounded-[2.5rem] border-4 border-emerald-200 p-8 flex flex-col items-center justify-center shadow-lg relative mb-8 overflow-hidden">
        {/* Play Button & Sound Rings */}
        <div className="relative flex items-center justify-center w-36 h-36 mb-4">
          <AnimatePresence>
            {isPlaying && (
              <>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-0 bg-emerald-300 rounded-full"
                />
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 2.1, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 bg-emerald-200 rounded-full"
                />
              </>
            )}
          </AnimatePresence>

          <button
            onClick={handlePlaySound}
            className={`w-28 h-28 ${
              isPlaying ? 'bg-emerald-650 scale-95' : 'bg-emerald-500 hover:bg-emerald-650 hover:scale-105'
            } text-white rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-white transition-all cursor-pointer z-10`}
            id="btn_play_audio_blend"
          >
            <Volume2 className="w-10 h-10 mb-1" />
            <span className="text-[10px] font-black uppercase tracking-wider">Listen</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 text-center italic max-w-sm">
          {game.target_phonetic_description || "Click the button to play the Ge'ez custom vocal blend!"}
        </span>
      </div>

      {/* Options Grid */}
      <div className="w-full flex flex-col items-center gap-4 mb-8">
        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
          Select the correct Amharic character!
        </span>

        <div className="grid grid-cols-4 gap-3 w-full max-w-md justify-center">
          {game.options.map((option, index) => {
            const isShaking = shakingOption === option;
            const isCorrect = option === game.correct_answer;
            const isChosen = selectedOption === option;

            return (
              <motion.div
                key={`opt-blend-${index}`}
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
                      : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300 hover:bg-emerald-50/20'
                  }`}
                  id={`btn_blend_option_${index}`}
                >
                  <span>{option}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Success Board */}
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
            
            <h4 className="text-2xl font-black mb-1">Excellent! በጣም ጎበዝ!</h4>
            <p className="text-emerald-50 text-sm max-w-md mx-auto mb-5 leading-normal">
              You matched the phonetic vocal blend! <strong>{game.correct_answer}</strong> represents the sound.
            </p>

            <button
              onClick={onNext}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black px-8 py-3.5 rounded-2xl shadow-[0_4px_0_#ca8a04] active:translate-y-1 active:shadow-none transition-all inline-flex items-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
              id="btn_blend_next"
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
