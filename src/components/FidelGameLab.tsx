import React, { useState } from 'react';
import SoundBubblePop from './SoundBubblePop';
import WordAssemblyPuzzle from './WordAssemblyPuzzle';
import FidelSequence from './FidelSequence';

export default function FidelGameLab() {
  const [activeGame, setActiveGame] = useState<'bubble' | 'assembly' | 'sequence'>('bubble');

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen rounded-2xl shadow-sm">
      {/* Header Banner */}
      <div className="text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl text-white">
        <h1 className="text-3xl font-bold tracking-tight">Abyssinia Tutors - Interactive Game Lab</h1>
        <p className="mt-2 text-indigo-100 text-sm">Fun and immersive Fidel fundamentals for kids living abroad</p>
      </div>

      {/* Game Selector Menu Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveGame('bubble')}
          className={`px-5 py-2.5 rounded-lg font-medium transition ${
            activeGame === 'bubble' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          🎈 Sound Bubble Pop
        </button>
        <button
          onClick={() => setActiveGame('assembly')}
          className={`px-5 py-2.5 rounded-lg font-medium transition ${
            activeGame === 'assembly' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          🧩 Word Assembly
        </button>
        <button
          onClick={() => setActiveGame('sequence')}
          className={`px-5 py-2.5 rounded-lg font-medium transition ${
            activeGame === 'sequence' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          🔢 Fidel Sequence
        </button>
      </div>

      {/* Active Game Display Board */}
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm min-h-[500px] flex items-center justify-center">
        {activeGame === 'bubble' && <SoundBubblePop />}
        {activeGame === 'assembly' && <WordAssemblyPuzzle />}
        {activeGame === 'sequence' && <FidelSequence />}
      </div>
    </div>
  );
}
