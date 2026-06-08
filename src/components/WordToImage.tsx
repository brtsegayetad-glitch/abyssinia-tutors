/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, HelpCircle, ArrowRight, RefreshCw, Star } from 'lucide-react';
import { WordToImageGame } from '../types';
import { audioSynth } from '../utils/audio';

// Vite static import of the generated banana and candle image assets
// @ts-ignore
import muzBananaImg from '../assets/images/muz_banana_1779822346797.png';
// @ts-ignore
import candleImg from '../assets/images/candle_illustration_1779824693814.png';
// @ts-ignore
import alphabetBookImg from '../assets/images/alphabet_book_illustration_1779825227047.png';
// @ts-ignore
import headImg from '../assets/images/head_illustration_1779826751478.png';
// @ts-ignore
import juneFlowersImg from '../assets/images/june_flowers_illustration_1779826770767.png';
// @ts-ignore
import butterflyImg from '../assets/images/butterfly_illustration_1779827668060.png';
// @ts-ignore
import birdImg from '../assets/images/bird_illustration_1779828120071.png';
// @ts-ignore
import studentImg from '../assets/images/student_illustration_1779828138506.png';
// @ts-ignore
import eyeImg from '../assets/images/eye_illustration_1779828625883.png';
// @ts-ignore
import zebraImg from '../assets/images/zebra_illustration_1779828642709.png';
// @ts-ignore
import chocolateImg from '../assets/images/chocolate_illustration_1779829432364.png';
// @ts-ignore
import leopardImg from '../assets/images/leopard_illustration_1779829451801.png';
// @ts-ignore
import starImg from '../assets/images/star_illustration_1779829714072.png';
// @ts-ignore
import grapesImg from '../assets/images/grapes_illustration_1779829730710.png';
// @ts-ignore
import umbrellaImg from '../assets/images/umbrella_illustration_1779830061646.png';
// @ts-ignore
import wristwatchImg from '../assets/images/wristwatch_illustration_1779830078446.png';
// @ts-ignore
import notebookImg from '../assets/images/notebook_illustration_1779830496012.png';
// @ts-ignore
import boatImg from '../assets/images/boat_illustration_1779830517371.png';
// @ts-ignore
import gariImg from '../assets/images/gari_illustration_1779830975553.png';
// @ts-ignore
import turumbaImg from '../assets/images/turumba_illustration_1779830993205.png';
// @ts-ignore
import moonImg from '../assets/images/moon_illustration_1779865788367.png';
// @ts-ignore
import pentecostStarImg from '../assets/images/pentecost_star_illustration_1779865808240.png';
// @ts-ignore
import papasImg from '../assets/images/papas_illustration_1779866904641.png';
// @ts-ignore
import cupImg from '../assets/images/cup_illustration_1779867273117.png';
// @ts-ignore
import sunImg from '../assets/images/sun_illustration_1779867290538.png';
// @ts-ignore
import horseImg from '../assets/images/horse_illustration_1779867578962.png';
// @ts-ignore
import envelopeImg from '../assets/images/envelope_illustration_1779868239165.png';
// @ts-ignore
import papayaImg from '../assets/images/papaya_illustration_1779868256197.png';

interface WordToImageProps {
  game: WordToImageGame;
  onSuccess: (scoreReward: number) => void;
  onFinishedAll: () => void;
}

export default function WordToImage({ game, onSuccess, onFinishedAll }: WordToImageProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shakingOption, setShakingOption] = useState<string | null>(null);

  // Dynamically resolve options list to structures
  const resolvedOptions = (game.options && Array.isArray(game.options)
    ? game.options.map(o => typeof o === 'string' ? { word: o, phonetic: o } : o)
    : (game.word_options || []).map(w => ({ word: w, phonetic: w }))
  );

  // Return the correct image resource source
  const getIllustrationSrc = () => {
    const url = (game.image_url || '').toLowerCase();
    if (url.includes('candle') || url.includes('shama')) {
      return candleImg;
    }
    if (url.includes('alphabet') || url.includes('book') || url.includes('hahu')) {
      return alphabetBookImg;
    }
    if (url.includes('head') || url.includes('ras')) {
      return headImg;
    }
    if (url.includes('flowers') || url.includes('sene') || url.includes('june')) {
      return juneFlowersImg;
    }
    if (url.includes('butterfly') || url.includes('birabiro')) {
      return butterflyImg;
    }
    if (url.includes('bird') || url.includes('wef')) {
      return birdImg;
    }
    if (url.includes('student') || url.includes('temari')) {
      return studentImg;
    }
    if (url.includes('eye') || url.includes('ayn')) {
      return eyeImg;
    }
    if (url.includes('zebra')) {
      return zebraImg;
    }
    if (url.includes('chocolate') || url.includes('chikolet')) {
      return chocolateImg;
    }
    if (url.includes('leopard') || url.includes('nebr')) {
      return leopardImg;
    }
    if (url.includes('pentecost') || url.includes('penteqoste')) {
      return pentecostStarImg;
    }
    if (url.includes('papas') || url.includes('pope') || url.includes('bishop')) {
      return papasImg;
    }
    if (url.includes('star') || url.includes('kokeb')) {
      return starImg;
    }
    if (url.includes('grapes') || url.includes('xhemr')) {
      return grapesImg;
    }
    if (url.includes('umbrella') || url.includes('zhentila')) {
      return umbrellaImg;
    }
    if (url.includes('wristwatch') || url.includes('ye_ej_seat') || url.includes('seat')) {
      return wristwatchImg;
    }
    if (url.includes('notebook') || url.includes('debter')) {
      return notebookImg;
    }
    if (url.includes('boat') || url.includes('jelba')) {
      return boatImg;
    }
    if (url.includes('gari') || url.includes('carriage') || url.includes('cart')) {
      return gariImg;
    }
    if (url.includes('trumpet') || url.includes('turumba')) {
      return turumbaImg;
    }
    if (url.includes('moon') || url.includes('chereqa')) {
      return moonImg;
    }
    if (url.includes('cup') || url.includes('tsiwa') || url.includes('chalice')) {
      return cupImg;
    }
    if (url.includes('sun') || url.includes('tsehay')) {
      return sunImg;
    }
    if (url.includes('horse') || url.includes('feres')) {
      return horseImg;
    }
    if (url.includes('envelope') || url.includes('posta') || url.includes('mail')) {
      return envelopeImg;
    }
    if (url.includes('papaya')) {
      return papayaImg;
    }
    return muzBananaImg;
  };

  const illustrationSrc = getIllustrationSrc();

  useEffect(() => {
    // Speak level instructions on load
    const label = game.correct_answer === 'ሙዝ' ? 'banana' : game.correct_answer === 'ሀሁ' ? 'alphabet book' : game.correct_answer === 'ራስ' ? 'head' : game.correct_answer === 'ሰኔ' ? 'sunny month of june' : game.correct_answer === 'ቢራቢሮ' ? 'butterfly' : game.correct_answer === 'ወፍ' ? 'bird' : game.correct_answer === 'ተማሪ' ? 'student' : game.correct_answer === 'ዓይን' ? 'eye' : game.correct_answer === 'ዜብራ' ? 'zebra' : game.correct_answer === 'ቺኮሌት' ? 'chocolate' : game.correct_answer === 'ነብር' ? 'leopard' : game.correct_answer === 'ኮከብ' ? 'star' : game.correct_answer === 'ኸምር' ? 'grapes jar' : game.correct_answer === 'ዠንጥላ' ? 'umbrella' : game.correct_answer === 'የእጅ ሰዓት' ? 'wristwatch' : game.correct_answer === 'ደብተር' ? 'notebook' : game.correct_answer === 'ጀልባ' ? 'boat' : game.correct_answer === 'ጋሪ' ? 'cart' : game.correct_answer === 'ጡሩምባ' ? 'trumpet' : game.correct_answer === 'ጨረቃ' ? 'moon' : game.correct_answer === 'ጰንጠቆስጤ' ? 'pentecost' : game.correct_answer === 'ጳጳስ' ? 'pope' : game.correct_answer === 'ጽዋ' ? 'cup' : game.correct_answer === 'ፀሐይ' ? 'sun' : game.correct_answer === 'ፈረስ' ? 'horse' : game.correct_answer === 'ፖስታ' ? 'envelope' : game.correct_answer === 'ፓፓያ' ? 'papaya' : 'illustrated object';
    const textToSpeak = game.instructions_en || `Vocabulary matching: Drag the ${label} image onto its correct Amharic word, or click the correct word below!`;
    audioSynth.speakInstructions(textToSpeak);
  }, [game]);

  const handleWordSelect = (word: string) => {
    if (isSuccess) return;

    // Play word pronunciation
    audioSynth.speakFidel(word);

    if (word === game.correct_answer) {
      setSelectedWord(word);
      setIsSuccess(true);
      audioSynth.playCorrect();
      
      const matched = resolvedOptions.find(o => o.word === word);
      const phoneticText = matched ? matched.phonetic : word;

      // Speak correct confirmation with the pronunciation
      setTimeout(() => {
        audioSynth.speakFidel(word);
        audioSynth.speakInstructions(`${word} represents ${phoneticText}!`);
      }, 700);

      onSuccess(15); // Reward 15 points
    } else {
      setShakingOption(word);
      audioSynth.playIncorrect();
      setTimeout(() => {
        setShakingOption(null);
      }, 600);
    }
  };

  const handleDragEnd = (event: any, info: any, option: string) => {
    const isOverCorrectBucket = draggedOver === game.correct_answer;
    
    if (isOverCorrectBucket) {
      handleWordSelect(game.correct_answer);
    } else {
      audioSynth.playIncorrect();
    }
    setDraggedOver(null);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 md:p-6" id="game_word_to_image">
      {/* Description header */}
      <div className="w-full text-center mb-6 px-4">
        <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-100/50 px-3.5 py-1.5 rounded-full mb-3 inline-flex items-center gap-1">
          <Star className="w-4 h-4 fill-orange-500 text-orange-500" /> Vocabulary Master
        </span>
        <h3 className="text-base md:text-lg font-bold text-slate-800">
          {game.instructions_en || "Associate the illustrated vocabulary word with its proper Amharic script writing."}
        </h3>
        {game.tips_en && (
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            {game.tips_en}
          </p>
        )}
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center mb-8">
        
        {/* Interactive Image Source card */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-400 font-extrabold mb-2 uppercase tracking-wide">Drag this object</span>
          
          <motion.div 
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.4}
            dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
            onDragStart={() => audioSynth.playPop()}
            onDragEnd={(e, info) => handleDragEnd(e, info, game.correct_answer)}
            whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04 }}
            className="w-56 h-56 bg-yellow-50 rounded-[2.5rem] border-4 border-dashed border-yellow-400 p-4 flex flex-col items-center justify-center shadow-lg relative cursor-grab active:cursor-grabbing hover:shadow-xl transition-shadow"
            id="draggable_vocabulary_card"
          >
            {/* Glossy ring */}
            <div className="absolute inset-2 border-2 border-dashed border-yellow-200 rounded-[2rem] pointer-events-none" />

            {/* Configured illustration graphic */}
            <img 
              src={illustrationSrc} 
              alt={game.correct_answer} 
              className="w-40 h-40 object-contain select-none"
              referrerPolicy="no-referrer"
              id="img_vocabulary_illustration"
            />

            <span className="absolute bottom-3 text-xs bg-yellow-100 text-yellow-800 font-black px-2.5 py-1 rounded-full border border-yellow-200 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> {game.object_label || "What am I?"}
            </span>
          </motion.div>
        </div>

        {/* Targets and Click Options */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] text-slate-400 font-extrabold mb-1 text-center md:text-left uppercase tracking-wide">Drop or Select the Correct Word</span>

          {resolvedOptions.map((opt, index) => {
            const isCorrect = opt.word === game.correct_answer;
            const isCurrentlySelected = selectedWord === opt.word;
            const isShaking = shakingOption === opt.word;

            return (
              <motion.div
                key={`word-opt-${index}`}
                onViewportEnter={() => {}} // dummy
                // Check drag over detection
                onMouseEnter={() => isCorrect && setDraggedOver(opt.word)}
                onMouseLeave={() => setDraggedOver(null)}
                animate={isShaking ? {
                  x: [-6, 6, -6, 6, 0],
                  transition: { duration: 0.4 }
                } : {}}
                className={`w-full p-5 rounded-3xl border-4 flex items-center justify-between transition-all relative ${
                  isSuccess && isCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-md'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-yellow-400 hover:bg-yellow-50/20 shadow-xs'
                }`}
                id={`word_bucket_${index}`}
              >
                <div className="flex flex-col">
                  {/* Amharic characters */}
                  <span className="text-3xl font-black tracking-wide">
                    {opt.word}
                  </span>
                  <span className={`text-xs ${isSuccess && isCorrect ? 'text-emerald-700 font-bold' : 'text-slate-400'} mt-1`}>
                    {opt.phonetic}
                  </span>
                </div>

                {/* Submitting button */}
                <button
                  onClick={() => handleWordSelect(opt.word)}
                  disabled={isSuccess}
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black border-2 border-slate-900 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_2px_0_#1e293b] active:translate-y-0.5 active:shadow-none"
                  id={`btn_verify_word_${index}`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Choose</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Outcome state section */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-emerald-500 text-white rounded-3xl p-6 shadow-xl text-center"
          >
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 rounded-full p-3 select-none">
                <Sparkles className="w-8 h-8 animate-bounce text-white" />
              </div>
            </div>
            
            <h4 className="text-2xl font-black mb-1">Incredible Work! በጣሙን ጎበዝ!</h4>
            <p className="text-emerald-50 text-sm max-w-md mx-auto mb-5 leading-normal">
              You correctly associated the image with its Amharic word <strong className="font-extrabold text-white text-base">“{game.correct_answer}” ({resolvedOptions.find(o => o.word === game.correct_answer)?.phonetic || game.correct_answer})</strong>!
            </p>

            <button
              onClick={onFinishedAll}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black px-8 py-3.5 rounded-2xl shadow-[0_4px_0_#ca8a04] active:translate-y-1 active:shadow-none transition-all inline-flex items-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
              id="btn_finish_unit"
            >
              <span>Graduate Level & Finish Unit!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
