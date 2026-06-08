import { LessonSlide } from "../slides";
import { LessonDefinition } from "./types";

export function generateSlidesForLesson(def: LessonDefinition): LessonSlide[] {
  const slides: LessonSlide[] = [];
  let sNum = 1;

  // 1. Intro Slide
  slides.push({
    lessonNumber: def.lessonNumber,
    theme: def.theme,
    phase: def.phase,
    slideNumber: sNum++,
    slideType: "intro",
    heading: `ምዕራፍ ${def.geezNumber} — Meraf ${def.lessonNumber}: ${def.topic}`,
    subheading: def.subheading,
    imageUrl: def.imageUrl,
    audioText: `Welcome to Meraf ${def.lessonNumber}. Today we are exploring ${def.topic}. It's going to be so much fun!`
  });

  // 2. Objectives Slide
  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "objectives",
    heading: "🎯 Today's Learning Journey Goals",
    objectives: def.objectives,
    duration: def.duration || "50 Minutes",
    audioText: "Let's review our learning objectives for today's exciting lesson! We want to master the letters and words."
  });

  // 3. Vocabularies (up to 10 slides, or all defined ones)
  def.vocabularies.forEach((vocab) => {
    slides.push({
      lessonNumber: def.lessonNumber,
      slideNumber: sNum++,
      slideType: "vocabulary",
      fidel: vocab.fidel,
      english: vocab.english,
      meaning: vocab.meaning,
      context: vocab.context,
      tutorTip: vocab.tutorTip,
      imageUrl: vocab.imageUrl,
      audioText: vocab.audioText
    });
  });

  // 4. Speaking Exercise Slide
  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "speaking_exercise",
    heading: `🗣️ Speaking Practice: Voice Echo!`,
    description: "Amharic is musical! Listen and repeat out loud with the correct pronunciation.",
    exercises: def.exercises,
    audioText: "Now let's practice our pronunciation. Repeat each phrase after me, and focus on your tone!"
  });

  // 5. Guided Dialogue Slide
  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "guided_dialogue",
    heading: def.dialogue.heading,
    scenario: def.dialogue.scenario,
    roles: def.dialogue.roles,
    audioText: "Let's practice a real-life conversation together. Take turns speaking each line with your tutor!"
  });

  // 6. Reading Activity Slide
  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "reading_activity",
    heading: def.reading.heading,
    passageAmharic: def.reading.passageAmharic,
    passageTransliteration: def.reading.passageTransliteration,
    passageEnglish: def.reading.passageEnglish,
    tutorTip: def.reading.tutorTip,
    audioText: "It's reading time! Let's read this pleasant short story together and practice your flows."
  });

  // 7. Writing Activity Slide
  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "writing_activity",
    heading: def.writing.heading,
    instructions: def.writing.instructions,
    lettersToPractice: def.writing.lettersToPractice,
    wordChallenge: def.writing.wordChallenge,
    audioText: "Get your pencil and notebook ready! Let's trace and write these authentic Amharic characters."
  });

  // 8. Game 1: Matchmaker (Shape matching / Visual pairs mapping)
  // Construct matching pairs logically from the lesson's vocabularies
  const matchPairs = def.vocabularies.slice(0, 3).map((v, idx) => ({
    id: `pair-${idx}`,
    amharic: v.fidel,
    translation: v.meaning
  }));

  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "interactive_game",
    heading: "🎮 Game 1: Character Matchmaker",
    gameIndex: 1,
    gameTitle: "Memory Matchmaker",
    gameInstructions: "Match the beautiful Amharic words on the left with their correct translation bubbles on the right!",
    gameData: { pairs: matchPairs },
    audioText: "Let's test your memory with custom matching bubbles!"
  });

  // 9. Game 2: Sound Pop (Sound bubble popping)
  // Construct sound prompts logically from the vocabularies
  const soundPrompts = def.vocabularies.slice(0, 3).map((v, i) => {
    // Generate some wrong choices from other characters
    const otherFidels = def.vocabularies
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

  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "interactive_game",
    heading: "🎮 Game 2: Audio Bubble Tap",
    gameIndex: 2,
    gameTitle: "Audio Sound Seeker",
    gameInstructions: "Listen to the voice and click on the bubble that has the correct Amharic word matching the sound!",
    gameData: { soundPrompts: soundPrompts },
    audioText: "Listen closely to the audio sound and bubble pop the corresponding Amharic characters!"
  });

  // 10. Game 3: Syllable Scramble (Fidel sequence assembler)
  const scrambles = def.vocabularies.slice(0, 2).map((v) => {
    // Split into syllables (rough syllable approximation for gameplay)
    const syllables = v.fidel.split("");
    const correctOrder = Array.from({ length: syllables.length }, (_, k) => k);
    // Shuffle syllables to present a scrambled layout
    const shuffledIdxs = Array.from({ length: syllables.length }, (_, k) => k).sort(() => Math.random() - 0.5);
    const shuffledSyllables = shuffledIdxs.map(idx => syllables[idx]);
    // The correctOrder represents the index of each syllable in the shuffled list to assemble the word
    const finalOrder = correctOrder.map(co => shuffledIdxs.indexOf(co));

    return {
      wordEnglish: v.meaning.split("/")[0].trim(),
      targetWord: v.english,
      syllables: shuffledSyllables,
      correctOrder: finalOrder
    };
  });

  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "interactive_game",
    heading: "🎮 Game 3: Word Syllable Assembler",
    gameIndex: 3,
    gameTitle: "Syllable Scramble Builder",
    gameInstructions: "Spell the word by selecting the scrambled Amharic letters in their correct order!",
    gameData: { scrambles: scrambles },
    audioText: "Let's tap the scrambled syllable wind panels to construct high value Amharic strings!"
  });

  // 11. Homework Slide
  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "homework",
    heading: "📝 Take-Home Stars Homework Quest",
    tasks: def.homework,
    submissionTip: def.submissionTip,
    audioText: "Practice makes perfect! Write down these tasks in your diary and share them on our learning platform."
  });

  // 12. Parent Involvement Slide
  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "parent_involvement",
    heading: "👨‍👩‍👧‍👦 Parent & Child Heritage Connection",
    goal: "Strengthen heritage language bonds at home with these fun daily practices.",
    activities: def.parentActivities,
    audioText: "Parents, connect with your children tonight by trying out these simple, delightful mini-greetings at dinner!"
  });

  // 13. Tutor Guidance Slide
  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "tutor_guidance",
    heading: "🎓 Companion Tutor Co-Pilot Guidance",
    pacingTips: def.tutorPacing,
    troubleshootingTips: def.tutorTroubleshooting,
    audioText: "Tutor companions, use these expert guidelines to pace and manage classroom times beautifully!"
  });

  // 14. Progress Assessment (Exactly 4 questions!)
  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "progress_assessment",
    heading: "🌟 Show What You Know! Progress Quiz",
    questions: def.quiz.slice(0, 4), // Guard to ensure EXACTLY 4 questions
    audioText: "Let's see what you've learned today! Answer these four rapid-fire quiz questions."
  });

  // 15. Conclusion Slide
  slides.push({
    lessonNumber: def.lessonNumber,
    slideNumber: sNum++,
    slideType: "conclusion",
    heading: `ምዕራፍ ${def.geezNumber} ተጠናቀቀ! (Module Complete!)`,
    subheading: `Amazing effort! You have successfully completed Meraf ${def.lessonNumber}: ${def.topic}. You've earned 150 gold stars!`,
    nextLesson: def.nextLessonTitle,
    progressPercentage: 100,
    audioText: `Gold stars to you! Meraf ${def.lessonNumber} is fully complete! We can't wait to see you for your next hero learning adventure!`
  });

  return slides;
}
