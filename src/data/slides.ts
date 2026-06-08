export interface IntroSlide {
  lessonNumber: number;
  level?: number;
  language?: "amharic" | "geez";
  theme?: string;
  phase?: string;
  slideNumber: number;
  slideType: "intro";
  heading?: string;
  subheading?: string;
  title?: string;
  description?: string;
  imageUrl: string;
  audioUrl?: string;
  audioText?: string;
  themeColor?: string;
  accentColor?: string;
  textColor?: string;
}

export interface ObjectivesSlide {
  lessonNumber: number;
  level?: number;
  slideNumber: number;
  slideType: "objectives";
  heading: string;
  objectives: string[];
  duration: string;
  audioText?: string;
}

export interface VocabularySlide {
  lessonNumber: number;
  level?: number;
  language?: "amharic" | "geez";
  slideNumber: number;
  slideType: "vocabulary";
  fidel?: string;       // e.g. "ሰላም"
  english?: string;     // e.g. "Selam"
  meaning?: string;     // e.g. "Hello / Peace"
  geezScript?: string;
  phonetic?: string;
  englishMeaning?: string;
  context?: string;
  tutorTip?: string;
  imageUrl: string;
  audioUrl?: string;
  audioText?: string;
  pronunciation?: string;
  themeColor?: string;
  accentColor?: string;
  textColor?: string;
}

export interface SpeakingExerciseSlide {
  lessonNumber: number;
  level?: number;
  slideNumber: number;
  slideType: "speaking_exercise";
  heading: string;
  description: string;
  exercises: {
    amharic: string;
    transliteration: string;
    english: string;
    tip: string;
  }[];
  audioText?: string;
}

export interface GuidedDialogueSlide {
  lessonNumber: number;
  level?: number;
  slideNumber: number;
  slideType: "guided_dialogue";
  heading: string;
  scenario: string;
  roles: {
    character: string;
    avatar: string;
    bubbleSide: "left" | "right";
    amharic: string;
    transliteration: string;
    english: string;
  }[];
  audioText?: string;
}

export interface ReadingActivitySlide {
  lessonNumber: number;
  level?: number;
  slideNumber: number;
  slideType: "reading_activity";
  heading: string;
  passageAmharic: string;
  passageTransliteration: string;
  passageEnglish: string;
  tutorTip: string;
  audioText?: string;
}

export interface WritingActivitySlide {
  lessonNumber: number;
  level?: number;
  slideNumber: number;
  slideType: "writing_activity";
  heading: string;
  instructions: string;
  lettersToPractice: {
    letter: string;
    phonetic: string;
    steps: string[];
  }[];
  wordChallenge: string;
  audioText?: string;
}

export interface InteractiveGameSlide {
  lessonNumber: number;
  level?: number;
  slideNumber: number;
  slideType: "interactive_game";
  heading: string;
  gameIndex: number; // 1, 2, or 3
  gameTitle: string;
  gameInstructions: string;
  gameData: any;
  audioText?: string;
}

export interface HomeworkSlide {
  lessonNumber: number;
  level?: number;
  slideNumber: number;
  slideType: "homework";
  heading: string;
  tasks: string[];
  submissionTip: string;
  audioText?: string;
}

export interface ParentInvolvementSlide {
  lessonNumber: number;
  level?: number;
  slideNumber: number;
  slideType: "parent_involvement";
  heading: string;
  goal: string;
  activities: string[];
  audioText?: string;
}

export interface TutorGuidanceSlide {
  lessonNumber: number;
  level?: number;
  slideNumber: number;
  slideType: "tutor_guidance";
  heading: string;
  pacingTips: string[];
  troubleshootingTips: string[];
  audioText?: string;
}

export interface ProgressAssessmentSlide {
  lessonNumber: number;
  level?: number;
  slideNumber: number;
  slideType: "progress_assessment";
  heading: string;
  questions: {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  }[];
  audioText?: string;
}

export interface ConclusionSlide {
  lessonNumber: number;
  level?: number;
  slideNumber: number;
  slideType: "conclusion";
  heading: string;
  subheading: string;
  nextLesson: string;
  progressPercentage: number;
  audioText?: string;
}

export type LessonSlide =
  | IntroSlide
  | ObjectivesSlide
  | VocabularySlide
  | SpeakingExerciseSlide
  | GuidedDialogueSlide
  | ReadingActivitySlide
  | WritingActivitySlide
  | InteractiveGameSlide
  | HomeworkSlide
  | ParentInvolvementSlide
  | TutorGuidanceSlide
  | ProgressAssessmentSlide
  | ConclusionSlide;

import { generateSlidesForLesson } from "./level1/generator";
import { lessons_1_5 } from "./level1/lessons_1_5";
import { lessons_6_10 } from "./level1/lessons_6_10";
import { lessons_11_15 } from "./level1/lessons_11_15";
import { lessons_16_20 } from "./level1/lessons_16_20";
import { lessons_21_24 } from "./level1/lessons_21_24";

import { lessons_1_8 } from "./lessons/level2/lessons_1_8";
import { lessons_9_16 } from "./lessons/level2/lessons_9_16";
import { lessons_17_24 } from "./lessons/level2/lessons_17_24";

import { lessons_1_8 as level3_lessons_1_8 } from "./lessons/level3/lessons_1_8";
import { lessons_9_16 as level3_lessons_9_16 } from "./lessons/level3/lessons_9_16";
import { lessons_17_24 as level3_lessons_17_24 } from "./lessons/level3/lessons_17_24";

import { lessons_1_8 as level4_lessons_1_8 } from "./lessons/level4/lessons_1_8";
import { lessons_9_16 as level4_lessons_9_16 } from "./lessons/level4/lessons_9_16";
import { lessons_17_24 as level4_lessons_17_24 } from "./lessons/level4/lessons_17_24";

import { lessons_1_8 as level5_lessons_1_8 } from "./lessons/level5/lessons_1_8";
import { lessons_9_16 as level5_lessons_9_16 } from "./lessons/level5/lessons_9_16";
import { lessons_17_24 as level5_lessons_17_24 } from "./lessons/level5/lessons_17_24";

import { geezCurriculum } from "./geezCurriculum";

const combinedDefinitionsL1 = [
  ...lessons_1_5,
  ...lessons_6_10,
  ...lessons_11_15,
  ...lessons_16_20,
  ...lessons_21_24,
];

const level1Slides = combinedDefinitionsL1.map(def => {
  const sList = generateSlidesForLesson(def);
  sList.forEach(s => s.level = 1);
  return sList;
}).flat();

const combinedDefinitionsL2 = [
  ...lessons_1_8,
  ...lessons_9_16,
  ...lessons_17_24,
];

const level2Slides = combinedDefinitionsL2.map(def => {
  const sList = generateSlidesForLesson(def);
  sList.forEach(s => s.level = 2);
  return sList;
}).flat();

const combinedDefinitionsL3 = [
  ...level3_lessons_1_8,
  ...level3_lessons_9_16,
  ...level3_lessons_17_24,
];

const level3Slides = combinedDefinitionsL3.map(def => {
  const sList = generateSlidesForLesson(def);
  sList.forEach(s => s.level = 3);
  return sList;
}).flat();

const combinedDefinitionsL4 = [
  ...level4_lessons_1_8,
  ...level4_lessons_9_16,
  ...level4_lessons_17_24,
];

const level4Slides = combinedDefinitionsL4.map(def => {
  const sList = generateSlidesForLesson(def);
  sList.forEach(s => s.level = 4);
  return sList;
}).flat();

const combinedDefinitionsL5 = [
  ...level5_lessons_1_8,
  ...level5_lessons_9_16,
  ...level5_lessons_17_24,
];

const level5Slides = combinedDefinitionsL5.map(def => {
  const sList = generateSlidesForLesson(def);
  sList.forEach(s => s.level = 5);
  return sList;
}).flat();

function generateGeezSlides(): any[] {
  const resultSlides: any[] = [];
  
  geezCurriculum.forEach((lesson) => {
    let slideNum = 1;
    
    // Create robust mappings for arbitrary / custom Lesson schemas provided by the user:
    const geezNumeral = lesson.geezNumeral || "፩";
    const theme = lesson.theme || (lesson as any).topic || "ሀ ቤተሰብ";
    const duration = (lesson as any).duration || "45-60 min";
    
    // Map vocabulary / vocabularyWords safely
    const rawVocab = lesson.vocabulary || (lesson as any).vocabularyWords || [];
    const vocabList = rawVocab.map((v: any) => ({
      fidel: v.fidel || v.word || "",
      english: v.english || v.transliteration || v.phonetic || "",
      meaning: v.meaning || v.englishMeaning || "",
      context: v.context || `A foundational classical Ge'ez word representing sacred heritage.`,
      tutorTip: v.tutorTip || v.hint || `Help the children pronounce and recognize the symbols within this classic word structure.`,
      imageUrl: v.imageUrl || "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=600"
    }));

    // Ensure at least one image is available for slides:
    const firstImg = (vocabList[0] && vocabList[0].imageUrl) || "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=600";
    const secondImg = (vocabList[1] && vocabList[1].imageUrl) || "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=600";

    // Map readingPractice safely
    const readingPracticeList = (lesson.readingPractice || []).map((rp: any) => {
      if (typeof rp === "string") {
        return {
          amh: rp,
          trans: rp,
          eng: "Let's read this classical Ge'ez phrase together!",
          tip: "Encourage soft vocalizations and clean phonetics."
        };
      }
      return {
        amh: rp.amh || "",
        trans: rp.trans || "",
        eng: rp.eng || "",
        tip: rp.tip || "Practice reading with focus."
      };
    });

    const hwList = lesson.homework || (lesson as any).writingPractice || [
      "Practice chanting each letter in the family sequence.",
      "Read your selected Ge'ez vocabulary words out loud."
    ];

    const parentList = lesson.parentInvolvement || [
      "Ask your child to trace the letter shapes with their fingers.",
      "Encourage correct vocalization during everyday play."
    ];

    const tutorPacing = (lesson.tutorNotes && lesson.tutorNotes.pacing) || [
      "Guide children to recognize the distinctive forms.",
      "Explain the phonetic breathing transitions."
    ];

    const tutorTrouble = (lesson.tutorNotes && lesson.tutorNotes.troubleshooting) || [
      "If matching is difficult, focus on oral recognition first."
    ];

    const assessmentList = (lesson.assessment || []).map((q: any) => {
      if (typeof q === "string") {
        // user supplied array of strings
        return {
          questionText: q,
          options: ["Check!", "Need support"],
          correctAnswerIndex: 0,
          explanation: "Self-assess your mastery against this goal."
        };
      }
      return {
        questionText: q.question || q.questionText || "",
        options: q.options || [],
        correctAnswerIndex: typeof q.correctIndex === "number" ? q.correctIndex : (q.options ? q.options.indexOf(q.correctAnswer) : 0),
        explanation: q.explanation || "Correct answer has been selected."
      };
    });

    // 1. Intro Slide
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "intro",
      title: lesson.title,
      description: lesson.objective,
      imageUrl: firstImg,
      theme: theme,
      phase: "Fidel Introduction"
    });
    
    // 2. Objectives Slide
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "objectives",
      heading: `${geezNumeral} — Goals & Target Skills`,
      duration: duration,
      objectives: [
        `Recognize all 7 forms of the family: ${lesson.fidelFamily.map(f => f.symbol).join(', ')}`,
        `Vocalize each pronunciation accurately`,
        `Trace characters correctly with proper strokes`,
        vocabList.length > 0 ? `Identify vocabulary: ${vocabList.map(v => v.fidel).join(', ')}` : "Learn classic oral pronunciations"
      ],
      audioText: `Our goals for Lesson ${lesson.lessonId} are simple. We will unlock the ${lesson.fidelFamily[0] ? lesson.fidelFamily[0].symbol : ""} family and read heritage words.`
    });
    
    // 3. Vowels Intro Slide (Full Family in One View)
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "vocabulary",
      fidel: lesson.fidelFamily.map(f => f.symbol).join(" "),
      english: lesson.fidelFamily.map(f => f.sound.charAt(0).toUpperCase() + f.sound.slice(1)).join(" - "),
      meaning: "The Complete Fidel Family",
      context: lesson.fidelFamily.map(f => `${f.symbol} (${f.sound})`).join(", ") + " represent the entire seven vowel forms of the family.",
      tutorTip: "Encourage children to vocalize all 7 forms from 1st to 7th order smoothly.",
      imageUrl: firstImg
    });
    
    // 4. Speaking Exercise Slide
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "speaking_exercise",
      heading: "Vocal Sound & Vowel Drills",
      description: "Speak these vowel sounds loud and proud! Perfect for building confidence.",
      exercises: [
        {
          amharic: lesson.fidelFamily.map(f => f.symbol).join(" - "),
          transliteration: lesson.fidelFamily.map(f => f.sound.toUpperCase() + "...").join(" "),
          english: "Full family vowel transitions",
          tip: "Vocalize all 7 forms from left to right smoothly."
        }
      ]
    });
    
    // 5. Writing/Tracing Practice Slide
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "writing_activity",
      heading: "Fidel Shape Calligraphy Tracing",
      instructions: "Learn the proper stroke pathways inside the interactive grid below!",
      lettersToPractice: [
        {
          letter: lesson.fidelFamily[0] ? lesson.fidelFamily[0].symbol : "",
          phonetic: lesson.fidelFamily[0] ? lesson.fidelFamily[0].sound : "",
          steps: [
            "Draw the main standing structure downward cleanly.",
            "Complete any loops, crown, or base shapes smoothly."
          ]
        }
      ],
      wordChallenge: `Challenge: Write the full ${lesson.fidelFamily[0] ? lesson.fidelFamily[0].symbol : ""} family sequence twice in your manuscript notebook!`
    });
    
    // 6. Vocabulary Words Slides (3 words)
    vocabList.forEach((voc) => {
      resultSlides.push({
        lessonNumber: lesson.lessonId,
        level: 1,
        language: "geez",
        slideNumber: slideNum++,
        slideType: "vocabulary",
        fidel: voc.fidel,
        english: voc.english,
        meaning: voc.meaning,
        context: voc.context,
        tutorTip: voc.tutorTip,
        imageUrl: voc.imageUrl
      });
    });
    
    // 7. Reading Activity Slide
    if (readingPracticeList.length > 0) {
      resultSlides.push({
        lessonNumber: lesson.lessonId,
        level: 1,
        language: "geez",
        slideNumber: slideNum++,
        slideType: "reading_activity",
        heading: "Guided Liturgical Reading & Culture Spot",
        passageAmharic: readingPracticeList[0].amh,
        passageTransliteration: readingPracticeList[0].trans,
        passageEnglish: readingPracticeList[0].eng,
        tutorTip: readingPracticeList[0].tip
      });
    }
    
    // 8. Games (3 interactive games)
    // Game 1: Character Matchmaker (pairs of Ge'ez vocabulary and english meaning)
    const matchPairs = vocabList.slice(0, 3).map((v, idx) => ({
      id: `pair-${idx}`,
      amharic: v.fidel,
      translation: v.meaning
    }));

    const game1Title = (lesson.games && lesson.games[0]) ? lesson.games[0].title : "Memory Matchmaker";
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "interactive_game",
      heading: `🎮 Game 1: ${game1Title}`,
      gameIndex: 1,
      gameTitle: game1Title,
      gameInstructions: "Match the beautiful Ge'ez words on the left with their correct translation bubbles on the right!",
      gameData: { pairs: matchPairs },
      audioText: "Let's test your memory with custom matching bubbles!"
    });

    // Game 2: Sound Pop (choices and correctFidel from Ge'ez vocabulary/fidel)
    const soundPrompts = vocabList.slice(0, 3).map((v, i) => {
      const otherFidels = vocabList
        .filter((_, idx) => idx !== i)
        .map((ov) => ov.fidel)
        .slice(0, 2);
      const choices = [v.fidel, ...otherFidels].sort(() => Math.random() - 0.5);
      return {
        voice: v.english,
        choices: choices,
        correctFidel: v.fidel
      };
    });

    const game2Title = (lesson.games && lesson.games[1]) ? lesson.games[1].title : "Audio Sound Seeker";
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "interactive_game",
      heading: `🎮 Game 2: ${game2Title}`,
      gameIndex: 2,
      gameTitle: game2Title,
      gameInstructions: "Listen to the voice and click on the bubble that has the correct Ge'ez word matching the sound!",
      gameData: { soundPrompts: soundPrompts },
      audioText: "Listen closely to the audio sound and bubble pop the corresponding Ge'ez characters!"
    });

    // Game 3: Syllable Scramble (split vocabulary word into letters/syllables)
    const scrambles = vocabList.slice(0, 3).map((v) => {
      const syllables = v.fidel.split("");
      const correctOrder = Array.from({ length: syllables.length }, (_, k) => k);
      const shuffledIdxs = Array.from({ length: syllables.length }, (_, k) => k).sort(() => Math.random() - 0.5);
      const shuffledSyllables = shuffledIdxs.map(idx => syllables[idx]);
      const finalOrder = correctOrder.map(co => shuffledIdxs.indexOf(co));

      return {
        wordEnglish: (v.meaning || "").split("/")[0].trim(),
        targetWord: v.english,
        syllables: shuffledSyllables,
        correctOrder: finalOrder
      };
    });

    const game3Title = (lesson.games && lesson.games[2]) ? lesson.games[2].title : "Syllable Scramble Builder";
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "interactive_game",
      heading: `🎮 Game 3: ${game3Title}`,
      gameIndex: 3,
      gameTitle: game3Title,
      gameInstructions: "Spell the word by selecting the scrambled Ge'ez letters in their correct order!",
      gameData: { scrambles: scrambles },
      audioText: "Let's tap the scrambled syllable wind panels to construct high value Ge'ez strings!"
    });
    
    // 9. Parent Involvement Slide
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "parent_involvement",
      heading: "Parent Support & Home Activity",
      goal: "Embedding heritage roots into everyday routines.",
      activities: parentList
    });
    
    // 10. Homework Slide
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "homework",
      heading: "Lesson Homework & Rewards",
      tasks: hwList,
      submissionTip: "Draw a creative illustration of your favorite word next to your practice line!"
    });
    
    // 11. Tutor Guidance Slide
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "tutor_guidance",
      heading: "Teacher & Expert Mentor Pedagogy Notes",
      pacingTips: tutorPacing,
      troubleshootingTips: tutorTrouble
    });
    
    // 12. Assessment Slide
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "progress_assessment",
      heading: "Lesson Progress Check",
      questions: assessmentList
    });
    
    // 13. Conclusion Slide
    resultSlides.push({
      lessonNumber: lesson.lessonId,
      level: 1,
      language: "geez",
      slideNumber: slideNum++,
      slideType: "conclusion",
      heading: `ምዕራፍ ${geezNumeral} — ${lesson.title} Completed!`,
      subheading: `Magnificent progress! You have successfully mastered the ${lesson.theme || lesson.title} elements.`,
      nextLesson: lesson.lessonId === 1 ? "Lesson 2: The ለ (Le) Fidel Family" : "Ready for Level 2 Reading Foundations!",
      progressPercentage: 100
    });
  });
  
  return resultSlides;
}

export const geezSlides: any[] = generateGeezSlides();

export const slides: LessonSlide[] = [
  ...level1Slides,
  ...level2Slides,
  ...level3Slides,
  ...level4Slides,
  ...level5Slides,
  ...geezSlides as any[],
];
