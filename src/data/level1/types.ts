export interface LessonDefinition {
  lessonNumber: number;
  geezNumber: string;
  topic: string; // e.g., "Introducing Yourself", "Respectful Greetings"
  theme: string; // e.g., "Warm Amharic Greetings"
  phase: string; // e.g., "Phase 1: Social Connections"
  subheading: string;
  imageUrl: string;
  objectives: string[];
  duration?: string;
  
  vocabularies: {
    fidel: string;
    english: string;
    meaning: string;
    context: string;
    tutorTip: string;
    imageUrl: string;
    audioText: string;
  }[];

  exercises: {
    amharic: string;
    transliteration: string;
    english: string;
    tip: string;
  }[];

  dialogue: {
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
  };

  reading: {
    heading: string;
    passageAmharic: string;
    passageTransliteration: string;
    passageEnglish: string;
    tutorTip: string;
  };

  writing: {
    heading: string;
    instructions: string;
    lettersToPractice: {
      letter: string;
      phonetic: string;
      steps: string[];
    }[];
    wordChallenge: string;
  };

  homework: string[];
  submissionTip: string;

  parentActivities: string[];
  
  tutorPacing: string[];
  tutorTroubleshooting: string[];

  quiz: {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  }[]; // EXACTLY 4 questions!

  nextLessonTitle: string;
}
