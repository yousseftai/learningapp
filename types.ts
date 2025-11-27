export interface WordOfTheDay {
  word: string;
  definition: string;
  example: string;
  synonyms: string[];
  emoji: string;
  ipa: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  type: 'multiple-choice' | 'fill-blank';
}

export interface UserStats {
  name: string; // User's display name
  xp: number;
  streak: number;
  lastLoginDate: string; // YYYY-MM-DD
  wordsLearned: number;
  lessonsCompleted: number;
  level: number;
}

export enum Screen {
  HOME = 'HOME',
  DAILY_WORD = 'DAILY_WORD',
  QUIZ = 'QUIZ',
  PROFILE = 'PROFILE',
}

export type ThemeColor = 'teal' | 'yellow' | 'purple' | 'rose';

declare global {
  interface Window {
    confetti: (options?: any) => Promise<any>;
  }
}