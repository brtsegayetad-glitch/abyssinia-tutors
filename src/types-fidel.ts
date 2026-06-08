/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GameType = 'shape_matching' | 'sound_bubble' | 'word_to_image' | 'fidel_sequence' | 'fidel_sequence_advanced' | 'phonetic_audio_blend' | 'word_puzzle_fill_blank' | 'reverse_fidel_decryption' | 'word_assembly_puzzle';

export interface BaseGame {
  game_id: string;
  game_type: GameType;
  title?: string;
  instructions_en?: string;
}

export interface ShapeMatchingGame extends BaseGame {
  game_type: 'shape_matching';
  instructions_audio?: string;
  target_shape: string;
  options: string[];
  correct_answer: string;
  success_audio?: string;
  pronunciation_label?: string;
  visual_theme?: 'sunny_yellow' | 'coral_pink' | 'emerald_green' | string;
}

export interface SoundBubbleGame extends BaseGame {
  game_type: 'sound_bubble';
  target_audio: string;
  target_text?: string;
  target_symbol?: string;
  target_pronunciation?: string;
  floating_options: string[];
  correct_answer: string;
  points_reward?: number;
}

export interface FidelSequenceGame extends BaseGame {
  game_type: 'fidel_sequence';
  sequence_display: string;
  options: string[];
  correct_answer: string;
  target_pronunciation?: string;
  success_audio?: string;
}

export interface WordToImageOption {
  word: string;
  phonetic: string;
}

export interface WordToImageGame extends BaseGame {
  game_type: 'word_to_image';
  image_url: string;
  word_options?: string[];
  options?: (WordToImageOption | string)[];
  correct_answer: string;
  success_audio?: string;
  tips_en?: string;
  object_label?: string;
}

export interface SuccessScreen {
  headline_en: string;
  headline_am: string;
  audio_feedback?: string;
}

export interface FidelSequenceAdvancedGame extends BaseGame {
  game_type: 'fidel_sequence_advanced';
  sequence_display: string;
  options: string[];
  correct_answer: string;
  target_pronunciation?: string;
  success_audio?: string;
  points_reward?: number;
}

export interface PhoneticAudioBlendGame extends BaseGame {
  game_type: 'phonetic_audio_blend';
  target_audio: string;
  target_phonetic_description?: string;
  options: string[];
  correct_answer: string;
  points_reward?: number;
}

export interface WordPuzzleFillBlankGame extends BaseGame {
  game_type: 'word_puzzle_fill_blank';
  word_display_with_blank: string;
  tips_en?: string;
  image_url: string;
  options: string[];
  correct_answer: string;
  success_audio?: string;
  points_reward?: number;
}

export interface ReverseFidelDecryptionGame extends BaseGame {
  game_type: 'reverse_fidel_decryption';
  target_phonetic_label: string;
  options: string[];
  correct_answer: string;
  success_audio?: string;
  points_reward?: number;
}

export interface WordAssemblyPuzzleGame extends BaseGame {
  game_type: 'word_assembly_puzzle';
  scrambled_letters: string[];
  correct_answer: string;
  tips_en?: string;
  english_translation?: string;
  image_url?: string;
  points_reward?: number;
}

export type Game = ShapeMatchingGame | SoundBubbleGame | WordToImageGame | FidelSequenceGame | FidelSequenceAdvancedGame | PhoneticAudioBlendGame | WordPuzzleFillBlankGame | ReverseFidelDecryptionGame | WordAssemblyPuzzleGame;

export interface Unit {
  unit_id: string;
  unit_title?: string;
  module?: string;
  success_screen?: SuccessScreen;
  games: Game[];
}

export interface UserStats {
  score: number;
  streak: number;
  completedGames: { [gameId: string]: boolean };
  currentLevel: number;
}
