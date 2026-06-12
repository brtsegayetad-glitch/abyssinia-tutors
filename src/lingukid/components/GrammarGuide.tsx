import { useState } from 'react';
import { GEEZ_GRAMMAR_TOPICS } from '../data';
import { HelpCircle, Star, BookOpen, ChevronRight, Hash, Bookmark } from 'lucide-react';

export default function GrammarGuide() {
  const [activeTopicId, setActiveTopicId] = useState(GEEZ_GRAMMAR_TOPICS[0]?.id || 'pronouns');

  const selectedTopic = GEEZ_GRAMMAR_TOPICS.find(t => t.id === activeTopicId) || GEEZ_GRAMMAR_TOPICS[0];

  return (
    <div id="grammar-guide-section" className="space-y-6 max-w-4xl mx-auto py-4 px-2">
      
      {/* Overview Intro Banner */}
      <div id="grammar-intro-row" className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded">
            Ge'ez Structural Syntax
          </span>
          <h2 className="text-xl font-sans font-bold text-zinc-900 tracking-tight">Grammar Explained in English</h2>
          <p className="text-xs text-zinc-600 font-sans leading-relaxed max-w-xl">
            Unlike modern English, Ge'ez is highly structured, using consonant roots and vocalic suffixes to designate gender, number, and respect. Browse the modules below to clarify the rules!
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center p-3.5 bg-white rounded-xl border border-amber-200 shadow-sm self-start sm:self-auto">
          <BookOpen className="w-6 h-6 text-amber-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Topic list sidebar */}
        <div id="grammar-topics-sidebar" className="space-y-2.5">
          <span className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider pl-2">Select Topic</span>
          {GEEZ_GRAMMAR_TOPICS.map((topic) => {
            const isActive = activeTopicId === topic.id;
            return (
              <button
                key={topic.id}
                id={`grammar-topic-btn-${topic.id}`}
                onClick={() => setActiveTopicId(topic.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm font-semibold'
                    : 'bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 border-zinc-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bookmark className={`w-4 h-4 ${isActive ? 'text-amber-500 fill-amber-400' : 'text-zinc-400'}`} />
                  <span className="text-sm font-sans leading-snug">{topic.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Topic Detail card */}
        <div id="grammar-content-box" className="md:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-zinc-200 space-y-6">
          
          {/* Header */}
          <div className="space-y-2 pb-4 border-b border-zinc-100">
            <h3 className="text-xl font-sans font-bold text-zinc-900 tracking-tight">
              {selectedTopic.title}
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed font-sans">
              {selectedTopic.description}
            </p>
          </div>

          {/* Key Grammar Rules */}
          <div className="space-y-3">
            <span className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Key Grammar Rules:</span>
            <ul className="space-y-2.5">
              {selectedTopic.keyPoints.map((point, index) => (
                <li key={index} className="flex gap-2.5 text-xs text-zinc-700 font-sans leading-relaxed">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Examples table */}
          {selectedTopic.examples && selectedTopic.examples.length > 0 && (
            <div className="space-y-3 pt-3">
              <span className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Syntax Breakdown & Examples:</span>
              <div className="space-y-3">
                {selectedTopic.examples.map((ex, idx) => (
                  <div key={idx} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2.5 hover:border-zinc-300 transition">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="space-y-1">
                        <span className="text-2xl font-serif text-zinc-900 font-semibold block">{ex.geez}</span>
                        <span className="text-xs font-mono text-amber-700 font-medium block">"{ex.transliteration}"</span>
                      </div>
                      <span className="bg-zinc-200/80 text-zinc-800 text-xs font-serif font-semibold px-2.5 py-1 rounded-lg">
                        {ex.translation}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-zinc-500 pl-2 border-l-2 border-amber-500/80 leading-relaxed">
                      {ex.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
