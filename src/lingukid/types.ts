export interface VocabularyItem {
  geez: string;
  amharic_context: string;
  english_transliteration: string;
  english_translation: string;
  grammatical_context: string;
}

export interface Lesson {
  lesson_id: number;
  lesson_title: string;
  source_reference: string;
  vocabulary: VocabularyItem[];
  module?: 'greetings' | 'demonstratives' | 'anatomy' | 'food' | 'family' | 'animals' | 'questions' | 'education' | 'health' | 'mourning' | 'proverbs' | 'time' | 'numbers';
  sentences?: Array<{
    amharic_phrase: string;
    geez_phrase: string;
    english_translation: string;
    syntax_breakdown: Record<string, string>;
  }>;
}

export interface QuizAttempt {
  highscore: number;
  passed: boolean;
  score: number;
  timestamp: number;
}

export interface UserProgress {
  userName: string;
  userAvatar: string;
  completedLessons: number[]; // Lesson IDs
  masteredVocab: string[]; // Ge'ez words
  xp: number;
  streak: number;
  lastActiveDate: string; // ISO String or YYYY-MM-DD
  quizAttempts: Record<number, QuizAttempt>; // Key: Lesson ID
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  badge: string;
  isCurrentUser?: boolean;
}

export type ActiveTab = 'lessons' | 'flashcards' | 'quiz' | 'grammar' | 'leaderboard' | 'progress' | 'dictionary';
