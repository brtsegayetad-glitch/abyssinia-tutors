/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, RefreshCw, CheckCircle, Award } from 'lucide-react';
import { SoundBubbleGame } from '../types';
import { audioSynth } from '../utils/audio-fidel';

interface SoundBubblePopProps {
  game: SoundBubbleGame;
  onSuccess: (scoreReward: number) => void;
  onNext: () => void;
}

interface Bubble {
  id: number;
  label: string;
  x: number; // percentage width 0-100
  y: number; // percentage height 0-100
  size: number; // diameter in px
  vx: number; // velocity x
  vy: number; // velocity y
  color: string;
  isPopped: boolean;
}

export default function SoundBubblePop({ game, onSuccess, onNext }: SoundBubblePopProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastPoppedWrong, setLastPoppedWrong] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize bubbles
  useEffect(() => {
    // Speak automatic level prompt
    const textToSpeak = game.instructions_en || `Bubble Pop Game: Listen to the target sound and pop the bubble that matches it!`;
    audioSynth.speakInstructions(textToSpeak);
    
    const colors = [
      'from-pink-400/80 to-purple-500/80 shadow-pink-200',
      'from-sky-400/80 to-blue-500/80 shadow-sky-200',
      'from-emerald-400/80 to-teal-500/80 shadow-emerald-200',
      'from-amber-400/80 to-orange-500/80 shadow-amber-200',
    ];

    // Build unique bubble list based on options
    const initialBubbles = game.floating_options.map((option, idx) => ({
      id: idx,
      label: option,
      x: 15 + idx * 22, // Space them out nicely horizontally
      y: 35 + (idx % 2) * 20, // Vary starting heights
      size: 80 + Math.random() * 20, // child-friendly size
      vx: (Math.random() - 0.5) * 0.15, // horizontal drift
      vy: -0.05 - Math.random() * 0.1, // vertical glide
      color: colors[idx % colors.length],
      isPopped: false,
    }));

    setBubbles(initialBubbles);
    setIsSuccess(false);
    setLastPoppedWrong(null);

    // Play target sound after 1 sec delay
    const t = setTimeout(() => {
      handlePlayTarget();
    }, 1200);

    return () => {
      clearTimeout(t);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [game]);

  // Floating physics update loop using standard requestAnimationFrame
  useEffect(() => {
    if (isSuccess) return;

    const updatePhysics = () => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((b) => {
          if (b.isPopped) return b;

          let nx = b.x + b.vx;
          let ny = b.y + b.vy;

          // Horizontal bounds reflection (bounce off left/right container edges)
          if (nx < 5) {
            nx = 5;
            b.vx = -b.vx;
          } else if (nx > 85) {
            nx = 85;
            b.vx = -b.vx;
          }

          // Vertical reset (re-enter from bottom when bubble floats out from top)
          if (ny < -15) {
            ny = 105;
          }

          return { ...b, x: nx, y: ny };
        })
      );
      animationRef.current = requestAnimationFrame(updatePhysics);
    };

    animationRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isSuccess]);

  const handlePlayTarget = () => {
    // Direct audio synth pronunciation playback
    const cleanCorrectAnswer = game.correct_answer.replace(/<[^>]*>/g, '').trim();
    audioSynth.speakFidel(cleanCorrectAnswer);
  };

  const handlePopBubble = (bubbleId: number, option: string) => {
    if (isSuccess) return;

    // Trigger sweet bubble popping synthesizer tone
    audioSynth.playPop();

    // Mark bubble as popped
    setBubbles((prev) =>
      prev.map((b) => (b.id === bubbleId ? { ...b, isPopped: true } : b))
    );

    const cleanCorrectAnswer = game.correct_answer.replace(/<[^>]*>/g, '').trim();
    if (option === cleanCorrectAnswer) {
      // Completed!
      audioSynth.playCorrect();
      setIsSuccess(true);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      onSuccess(game.points_reward || 10);
    } else {
      setLastPoppedWrong(option);
      audioSynth.speakFidel(option); // read out what they clicked to teach phonetics!
      
      // Reinforce look for target text
      setTimeout(() => {
        // Regenerate wrong bubble after a splash delay to keep the arena active!
        setBubbles((prev) =>
          prev.map((b) =>
            b.id === bubbleId
              ? {
                  ...b,
                  isPopped: false,
                  y: 110, // respawn at bottom
                  x: 10 + Math.random() * 80,
                }
              : b
          )
        );
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 md:p-6" id="game_sound_bubble_pop">
      {/* Sound Player Controller */}
      <div className="w-full bg-yellow-50/50 border-4 border-dashed border-yellow-300 rounded-[2.5rem] p-6 shadow-xs flex flex-col items-center text-center mb-6">
        <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-100/50 px-3.5 py-1.5 rounded-full mb-3 flex items-center gap-1">
          <Award className="w-4 h-4 text-orange-500 inline" /> Sound Bubble pop
        </span>

        <h3 className="text-sm md:text-base font-bold text-slate-500 mb-4 px-2">
          {game.instructions_en || "Click the golden sound button below, listen carefully, then pop the bubble that matches!"}
        </h3>

        <div className="flex flex-wrap gap-4 items-center justify-center">
          {/* Main listen button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayTarget}
            className="flex items-center gap-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black px-6 py-3.5 rounded-2xl shadow-[0_4px_0_#ca8a04] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            id="btn_play_target_audio"
          >
            <span className="text-xl">🔊</span>
            <span>Listen to Sound</span>
          </motion.button>

          {/* Guide text */}
          <div className="bg-white/90 border-2 border-yellow-200 px-4 py-2 rounded-xl">
            <span className="text-[10px] text-slate-400 font-extrabold block uppercase tracking-wider">Target Symbol</span>
            <span className="text-lg font-black text-orange-600">“{game.target_symbol || game.target_text}” ({game.target_pronunciation || "Mie"})</span>
          </div>
        </div>

        {/* Incorrect popup feed */}
        <AnimatePresence>
          {lastPoppedWrong && !isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-xs font-bold text-amber-800 bg-amber-100/50 border border-amber-200 px-4 py-1.5 rounded-full"
            >
              That bubble was <strong className="font-extrabold underline">“{lastPoppedWrong}”</strong>. Listen again for <strong className="font-extrabold">“{game.target_symbol || game.target_text}”</strong>!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bubble float container canvas area */}
      <div
        ref={containerRef}
        className="w-full h-[325px] md:h-[360px] bg-linear-to-b from-slate-900 via-slate-800 to-indigo-950 border-8 border-yellow-200 rounded-[3rem] relative overflow-hidden shadow-inner flex items-center justify-center mb-6"
        id="bubble_floating_arena"
      >
        {/* Background underwater effect bubbles */}
        <div className="absolute inset-0 z-0 bg-radial-gradient from-indigo-500/10 to-transparent pointer-events-none opacity-50" />

        {/* Floating Bubble Items */}
        <AnimatePresence>
          {bubbles.map((b) => {
            if (b.isPopped) {
              return (
                <motion.div
                  key={`pop-explode-${b.id}`}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute bg-white/40 border border-white rounded-full flex items-center justify-center"
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                    marginLeft: `-${b.size / 2}px`,
                    marginTop: `-${b.size / 2}px`,
                  }}
                >
                  <Sparkles className="w-6 h-6 text-white animate-spin" />
                </motion.div>
              );
            }

            return (
              <motion.div
                key={`bubble-${b.id}`}
                className="absolute z-10 select-none cursor-pointer"
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  marginLeft: `-${b.size / 2}px`,
                  marginTop: `-${b.size / 2}px`,
                }}
                whileHover={{ scale: 1.08 }}
                onClick={() => handlePopBubble(b.id, b.label)}
              >
                {/* Visual bubble layout */}
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-tr ${b.color} p-0.5 border-2 border-white/40 shadow-lg flex items-center justify-center relative shadow-indigo-500/10`}
                >
                  {/* Glass reflective shine */}
                  <div className="absolute top-2 left-2 w-3/4 h-1/3 bg-linear-to-b from-white/30 to-transparent rounded-t-full rotate-[-15deg] pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-white/20 rounded-full blur-xs pointer-events-none" />

                  {/* Character label */}
                  <span className="text-3xl md:text-4xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                    {b.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Instant success overlay inside sandbox */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-slate-900/80 z-20 flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="bg-yellow-400 text-slate-900 rounded-full p-4 mb-4 shadow-xl"
            >
              <span className="text-3xl">✨</span>
            </motion.div>
            <h4 className="text-2xl font-black text-white mb-2">Pop! Perfect!</h4>
            <p className="text-yellow-200 text-sm max-w-sm mb-4">
              You popped the bubble with the pronunciation <strong className="text-white font-black text-lg">“{game.correct_answer.replace(/<[^>]*>/g, '').trim()}”</strong>.
            </p>
          </motion.div>
        )}
      </div>

      {/* Button controls */}
      <div className="w-full flex justify-between items-center gap-4">
        <button
          onClick={() => {
            // Respawn trigger
            const colors = [
              'from-pink-400/80 to-purple-500/80 shadow-pink-200',
              'from-sky-400/80 to-blue-500/80 shadow-sky-200',
              'from-emerald-400/80 to-teal-500/80 shadow-emerald-200',
              'from-amber-400/80 to-orange-500/80 shadow-amber-200',
            ];
            const respawned = game.floating_options.map((option, idx) => ({
              id: idx + Math.random(),
              label: option,
              x: 10 + idx * 24,
              y: 90, // bottom
              size: 85,
              vx: (Math.random() - 0.5) * 0.2,
              vy: -0.05 - Math.random() * 0.1,
              color: colors[idx % colors.length],
              isPopped: false,
            }));
            setBubbles(respawned);
            setIsSuccess(false);
          }}
          className="flex items-center gap-1.5 border-2 border-slate-200 font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-2xl transition duration-150 text-xs tracking-wider uppercase cursor-pointer"
          id="btn_reset_bubbles"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset bubbles</span>
        </button>

        {isSuccess && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={onNext}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-10 py-3 rounded-2xl font-black text-sm md:text-base transition-all shadow-[0_4px_0_#ca8a04] active:translate-y-1 active:shadow-none cursor-pointer"
            id="btn_bubble_next_level"
          >
            CONTINUE →
          </motion.button>
        )}
      </div>
    </div>
  );
}
