export interface FidelFamilyMember {
  symbol: string;
  sound: string;
  form?: string; // Optional: e.g. "Ge'ez (1st)"
}

export interface GeezWord {
  fidel?: string;
  english?: string;
  meaning?: string;
  context?: string;
  tutorTip?: string;
  imageUrl?: string;
  // USER PARAMETERS FOR 100% COMPATIBILITY:
  word?: string;
  phonetic?: string;
  englishMeaning?: string;
  breakdown?: string;
  hint?: string;
  audioName?: string;
}

export interface ReadingPracticeItem {
  amh: string;
  trans: string;
  eng: string;
  tip: string;
}

export interface GameItem {
  type: string;
  title: string;
  instructions?: string;
  options?: string[];
  solution?: string;
  audioHint?: string;
  // USER PARAMETERS FOR 100% COMPATIBILITY:
  gameId?: string;
  gameType?: string;
  target?: string;
  distractors?: string[];
  rewardPoints?: number;
  audioSegments?: string[];
  targetWord?: string;
  cards?: any[];
}

export interface AssessmentQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  // USER PARAMETERS FOR 100% COMPATIBILITY:
  questionId?: string;
  questionType?: string;
  questionText?: string;
  audioUrl?: string;
  correctAnswer?: string;
}

export interface GeezLesson {
  lessonId: number;
  level?: any; // Supports number, e.g., 1 or string, e.g., "Geez Level 1"
  geezNumeral?: string;
  title: string;
  objective: string;
  theme?: string;
  fidelFamily: FidelFamilyMember[];
  vocabulary?: GeezWord[];
  readingPractice?: any[]; // Supports both structured objects and legacy strings
  games?: any[]; // Supports custom user games and original objects
  assessment?: any[]; // Supports goals array and standard test structures
  homework?: string[];
  parentInvolvement?: string[];
  tutorNotes?: {
    pacing: string[];
    troubleshooting: string[];
  };
  // USER ROOT PARAMETERS FOR 100% COMPATIBILITY:
  courseType?: string;
  activities?: any[];
  topic?: string;
  duration?: string;
  vocabularyWords?: any[];
  writingPractice?: string[];
  churchConnection?: {
    title: string;
    description: string;
  };
}

export const geezCurriculum: GeezLesson[] = [
  {
    "lessonId": 1,
    "courseType": "geez",
    "level": "Geez Level 1",
    "title": "The ሀ (Ha) Family & Ancient Words",
    "objective": "Master the structural shapes of the ሀ family characters and read 6 foundational classical Ge'ez vocabulary entries.",
    "fidelFamily": [
      {"symbol": "ሀ", "sound": "ha"},
      {"symbol": "ሁ", "sound": "hu"},
      {"symbol": "ሂ", "sound": "hie"},
      {"symbol": "ሃ", "sound": "haa"},
      {"symbol": "ሄ", "sound": "hee"},
      {"symbol": "ህ", "sound": "hei"},
      {"symbol": "ሆ", "sound": "ho"}
    ],
    "vocabulary": [
      {
        "word": "ሀገር",
        "phonetic": "Ha-gar",
        "englishMeaning": "City or Country",
        "hint": "Uses the 1st form ሀ",
        "imageUrl": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600"
      },
      {
        "word": "ሀሎ",
        "phonetic": "Ha-lo",
        "englishMeaning": "He is present",
        "hint": "Classical existential verb",
        "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600"
      },
      {
        "word": "ሀሊብ",
        "phonetic": "Ha-leeb",
        "englishMeaning": "Milk",
        "hint": "Pure Semitic root for milk",
        "imageUrl": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600"
      },
      {
        "word": "ሁሉ",
        "phonetic": "Hu-lu",
        "englishMeaning": "All or Everything",
        "hint": "Uses the 2nd form ሁ",
        "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600"
      },
      {
        "word": "ሂሩት",
        "phonetic": "Hee-root",
        "englishMeaning": "Virtue or Goodness",
        "hint": "Uses the 3rd form ሂ",
        "imageUrl": "https://images.unsplash.com/photo-1461016951428-745141573f4d?w=600"
      },
      {
        "word": "ሆሣዕና",
        "phonetic": "Ho-sa-na",
        "englishMeaning": "Hosanna (Praise song)",
        "hint": "Uses the 7th form ሆ",
        "imageUrl": "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=600"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ሀ",
        "instructions": "Trace the primary shape of the letter 'ሀ' from top to bottom."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ሀገር'. Which symbol does it start with?",
        "options": ["ሁ", "ሀ", "ሆ"],
        "correctAnswer": "ሀ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ሀገር", "meaning": "City/Country"},
          {"symbol": "ሀሊብ", "meaning": "Milk"},
          {"symbol": "ሁሉ", "meaning": "All"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ሀሊብ",
        "audioClipUrl": "/audio/geez/halib.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_ha",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ሀ",
        "distractors": ["ለ", "ሐ", "መ", "ሀ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["ha", "gar"],
        "targetWord": "ሀገር"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ሀሊብ", "matchId": "milk_match"},
          {"id": 2, "content": "Milk", "matchId": "milk_match"},
          {"id": 3, "content": "ሁሉ", "matchId": "all_match"},
          {"id": 4, "content": "All", "matchId": "all_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What is the classical Ge'ez meaning of the word 'ሂሩት'?",
        "options": ["Virtue/Goodness", "Water", "Country"],
        "correctAnswer": "Virtue/Goodness"
      },
      {
        "questionId": "q2",
        "questionType": "audio_verification",
        "questionText": "Listen to the audio segment. Which pure Ge'ez word was spoken?",
        "audioUrl": "/audio/geez/hagar.mp3",
        "options": ["ሀገር", "ሆሣዕና", "ሀሎ"],
        "correctAnswer": "ሀገር"
      }
    ]
  },
  {
    "lessonId": 2,
    "courseType": "geez",
    "level": "Geez Level 1",
    "title": "The ለ (Le) Family & Ancient Words",
    "objective": "Master the full ለ family from ለ to ሎ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ለ", "sound": "le"},
      {"symbol": "ሉ", "sound": "lu"},
      {"symbol": "ሊ", "sound": "li"},
      {"symbol": "ላ", "sound": "la"},
      {"symbol": "ሌ", "sound": "lei"},
      {"symbol": "ል", "sound": "l"},
      {"symbol": "ሎ", "sound": "lo"}
    ],
    "vocabulary": [
      {
        "word": "ለመለመ",
        "phonetic": "Le-me-le-me",
        "englishMeaning": "It blossomed or grew green",
        "hint": "Classical description of nature flourishing",
        "imageUrl": "https://images.unsplash.com/photo-1501004318641-72ee46df725f?w=600"
      },
      {
        "word": "ሊቅ",
        "phonetic": "Leek",
        "englishMeaning": "Scholar, elder, or chief",
        "hint": "Uses the 3rd form ሊ",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600"
      },
      {
        "word": "ሌሊት",
        "phonetic": "Lee-leet",
        "englishMeaning": "Night",
        "hint": "Starts with the 5th form ሌ",
        "imageUrl": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600"
      },
      {
        "word": "ልብ",
        "phonetic": "Lib",
        "englishMeaning": "Heart or mind",
        "hint": "The seat of wisdom in classical texts",
        "imageUrl": "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=600"
      },
      {
        "word": "ሎቱ",
        "phonetic": "Lo-too",
        "englishMeaning": "To him / For him",
        "hint": "Classical dative pronoun using 7th form ሎ",
        "imageUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600"
      },
      {
        "word": "ላህም",
        "phonetic": "La-him",
        "englishMeaning": "Cow or cattle",
        "hint": "Pure Ge'ez term (distinct from Amharic ላም)",
        "imageUrl": "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ለ",
        "instructions": "Trace the double-legged base structure of the letter 'ለ' smoothly."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ሌሊት'. Which symbol does it start with?",
        "options": ["ሊ", "ሌ", "ሎ"],
        "correctAnswer": "ሌ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ሊቅ", "meaning": "Scholar/Elder"},
          {"symbol": "ሌሊት", "meaning": "Night"},
          {"symbol": "ልብ", "meaning": "Heart"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ላህም",
        "audioClipUrl": "/audio/geez/lahim.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_le",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ለ",
        "distractors": ["ሀ", "ሀ", "ሰ", "ለ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["lee", "leet"],
        "targetWord": "ሌሊት"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ሊቅ", "matchId": "scholar_match"},
          {"id": 2, "content": "Scholar", "matchId": "scholar_match"},
          {"id": 3, "content": "ልብ", "matchId": "heart_match"},
          {"id": 4, "content": "All/Heart", "matchId": "heart_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What is the true classical Ge'ez meaning of the word 'ላህም'?",
        "options": ["Cow/Cattle", "Night", "Scholar"],
        "correctAnswer": "Cow/Cattle"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 7th form (Sabe'e) of the family?",
        "options": ["ሉ", "ሊ", "ሎ"],
        "correctAnswer": "ሎ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Scholar': [ _ ] ቅ",
        "options": ["ለ", "ሊ", "ሌ"],
        "correctAnswer": "ሊ"
      },
      {
        "questionId": "q4",
        "questionType": "audio_verification",
        "questionText": "Listen to the audio segment. Which pure Ge'ez word was spoken?",
        "audioUrl": "/audio/geez/lemeleme.mp3",
        "options": ["ለመለመ", "ሌሊት", "ሎቱ"],
        "correctAnswer": "ለመለመ"
      }
    ]
  },
  {
    "lessonId": 3,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፫",
    "title": "The መ (Me) Family & Ancient Words",
    "objective": "Master the full መ family from መ to ሞ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "መ", "sound": "me"},
      {"symbol": "ሙ", "sound": "mu"},
      {"symbol": "ሚ", "sound": "mi"},
      {"symbol": "ማ", "sound": "maa"},
      {"symbol": "ሜ", "sound": "mee"},
      {"symbol": "ም", "sound": "m"},
      {"symbol": "ሞ", "sound": "mo"}
    ],
    "vocabulary": [
      {
        "word": "ማይ",
        "phonetic": "May",
        "englishMeaning": "Water",
        "hint": "Pure classical Semitic word for water",
        "imageUrl": "https://images.unsplash.com/photo-1548821847-495245770002?w=600"
      },
      {
        "word": "መኑ",
        "phonetic": "Me-nu",
        "englishMeaning": "Who",
        "hint": "Classical interrogative pronoun",
        "imageUrl": "https://images.unsplash.com/photo-1534551767192-78b8dd42b51b?w=600"
      },
      {
        "word": "ምድር",
        "phonetic": "Mi-dir",
        "englishMeaning": "Earth or Land",
        "hint": "The physical ground or world",
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600"
      },
      {
        "word": "ሞት",
        "phonetic": "Mot",
        "englishMeaning": "Death",
        "hint": "Classical noun for passing from life",
        "imageUrl": "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600"
      },
      {
        "word": "ማኅደር",
        "phonetic": "Mah-der",
        "englishMeaning": "Dwelling or Tabernacle",
        "hint": "A place of habitation or sacred spiritual housing",
        "imageUrl": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600"
      },
      {
        "word": "ሚካኤል",
        "phonetic": "Mee-ka-el",
        "englishMeaning": "Michael",
        "hint": "The classical name meaning 'Who is like God?'",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "መ",
        "instructions": "Trace the loop and right-facing tail of the letter 'መ' gently."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ማይ'. Which symbol does it start with?",
        "options": ["ሜ", "ማ", "ሙ"],
        "correctAnswer": "ማ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ማይ", "meaning": "Water"},
          {"symbol": "መኑ", "meaning": "Who"},
          {"symbol": "ምድር", "meaning": "Earth"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ማኅደር",
        "audioClipUrl": "/audio/geez/mahder.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_me",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "መ",
        "distractors": ["ለ", "ሀ", "ሰ", "መ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["me", "nu"],
        "targetWord": "መኑ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ማይ", "matchId": "water_match"},
          {"id": 2, "content": "Water", "matchId": "water_match"},
          {"id": 3, "content": "ሞት", "matchId": "death_match"},
          {"id": 4, "content": "Death", "matchId": "death_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What is the true classical Ge'ez meaning of the word 'ማይ'?",
        "options": ["Water", "Fire", "Earth"],
        "correctAnswer": "Water"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 7th form (Sabe'e) of the family?",
        "options": ["ሙ", "ሚ", "ሞ"],
        "correctAnswer": "ሞ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the classical question particle 'Who': [ _ ] ኑ",
        "options": ["መ", "ማ", "ሜ"],
        "correctAnswer": "መ"
      }
    ]
  },
  {
    "lessonId": 4,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፬",
    "title": "The ሰ (Se) Family & Ancient Words",
    "objective": "Master the full ሰ family from ሰ to ሶ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ሰ", "sound": "se"},
      {"symbol": "ሱ", "sound": "su"},
      {"symbol": "ሲ", "sound": "si"},
      {"symbol": "ሳ", "sound": "saa"},
      {"symbol": "ሴ", "sound": "see"},
      {"symbol": "ስ", "sound": "s"},
      {"symbol": "ሶ", "sound": "so"}
    ],
    "vocabulary": [
      {
        "word": "ሰማይ",
        "phonetic": "Se-may",
        "englishMeaning": "Sky or Heaven",
        "hint": "The celestial heights or heavens",
        "imageUrl": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600"
      },
      {
        "word": "ሰላም",
        "phonetic": "Se-lam",
        "englishMeaning": "Peace",
        "hint": "The deep spiritual blessing of harmony",
        "imageUrl": "https://images.unsplash.com/photo-1494972308805-463bc619b34e?w=600"
      },
      {
        "word": "ሰይፍ",
        "phonetic": "Seyf",
        "englishMeaning": "Sword",
        "hint": "Classical defensive metal weapon",
        "imageUrl": "https://images.unsplash.com/photo-1589715741369-02f5a65345a5?w=600"
      },
      {
        "word": "ሲኦል",
        "phonetic": "See-ol",
        "englishMeaning": "Sheol or Underworld",
        "hint": "The historical term for the realm of the departed",
        "imageUrl": "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?w=600"
      },
      {
        "word": "ሶስት",
        "phonetic": "Sost",
        "englishMeaning": "Three (3)",
        "hint": "Uses the 7th form ሶ",
        "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600"
      },
      {
        "word": "ሰረገላ",
        "phonetic": "Se-re-ge-la",
        "englishMeaning": "Chariot",
        "hint": "Ancient royal wheeled transport vehicle",
        "imageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ሰ",
        "instructions": "Trace the E-shaped wave structure of 'ሰ' from left to right smoothly."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ሲኦል'. Which symbol does it start with?",
        "options": ["ሳ", "ሲ", "ሴ"],
        "correctAnswer": "ሲ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ሰማይ", "meaning": "Heaven"},
          {"symbol": "ሰይፍ", "meaning": "Sword"},
          {"symbol": "ሰረገላ", "meaning": "Chariot"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ሰላም",
        "audioClipUrl": "/audio/geez/selam.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_se",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ሰ",
        "distractors": ["መ", "ሀ", "ለ", "ሰ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["se", "may"],
        "targetWord": "ሰማይ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ሰማይ", "matchId": "heaven_match"},
          {"id": 2, "content": "Heaven", "matchId": "heaven_match"},
          {"id": 3, "content": "ሰይፍ", "matchId": "sword_match"},
          {"id": 4, "content": "Sword", "matchId": "sword_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What is the true classical Ge'ez meaning of the word 'ሰይፍ'?",
        "options": ["Sword", "Peace", "Water"],
        "correctAnswer": "Sword"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 3rd form (Salis) of the family?",
        "options": ["ሱ", "ሲ", "ሳ"],
        "correctAnswer": "ሲ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Heaven / Sky': [ _ ] ማይ",
        "options": ["ሰ", "ሱ", "ሶ"],
        "correctAnswer": "ሰ"
      }
    ]
  },
  {
    "lessonId": 5,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፭",
    "title": "The ረ (Re) Family & Ancient Words",
    "objective": "Master the full ረ family from ረ to ሮ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ረ", "sound": "re"},
      {"symbol": "ሩ", "sound": "ru"},
      {"symbol": "ሪ", "sound": "ri"},
      {"symbol": "ራ", "sound": "ra"},
      {"symbol": "ሬ", "sound": "rie"},
      {"symbol": "ር", "sound": "r"},
      {"symbol": "ሮ", "sound": "ro"}
    ],
    "vocabulary": [
      {
        "word": "ርእስ",
        "phonetic": "Re-es",
        "englishMeaning": "Head, Leader, or Title",
        "hint": "The classical term for head or beginning",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "re'es"
      },
      {
        "word": "ረመፅ",
        "phonetic": "Re-mets",
        "englishMeaning": "Hot ashes or embers",
        "hint": "Features the unique classical ፀ shape",
        "imageUrl": "https://images.unsplash.com/photo-1525184648845-66cbe3b6c59c?w=600",
        "audioName": "remets"
      },
      {
        "word": "ርብቃ",
        "phonetic": "Rib-qa",
        "englishMeaning": "Rebecca",
        "hint": "Classical biblical name using 6th form ር",
        "imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
        "audioName": "rebeqa"
      },
      {
        "word": "ሩቅ",
        "phonetic": "Ruq",
        "englishMeaning": "Distant or Far away",
        "hint": "Uses the 2nd form ሩ",
        "imageUrl": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600",
        "audioName": "ruq"
      },
      {
        "word": "ሮማን",
        "phonetic": "Ro-man",
        "englishMeaning": "Pomegranate",
        "hint": "Ancient fruit mentioned often in classical texts",
        "imageUrl": "https://images.unsplash.com/photo-1541344999736-83ece2511860?w=600",
        "audioName": "roman"
      },
      {
        "word": "ራሔል",
        "phonetic": "Ra-hel",
        "englishMeaning": "Rachel",
        "hint": "Uses the 4th form ራ and classical ሔ",
        "imageUrl": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600",
        "audioName": "rahel"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ረ",
        "instructions": "Trace the smooth single curved stroke of 'ረ' downward from left to right."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ርእስ'. Which symbol does it start with?",
        "options": ["ሪ", "ረ", "ር"],
        "correctAnswer": "ር"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ርእስ", "meaning": "Head/Leader"},
          {"symbol": "ረመፅ", "meaning": "Hot ashes"},
          {"symbol": "ሩቅ", "meaning": "Distant"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ረመፅ",
        "audioClipUrl": "/audio/geez/remets.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_re",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ረ",
        "distractors": ["ለ", "ሐ", "መ", "ረ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["re", "mets"],
        "targetWord": "ረመፅ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ርእስ", "matchId": "head_match"},
          {"id": 2, "content": "Head", "matchId": "head_match"},
          {"id": 3, "content": "ሩቅ", "matchId": "far_match"},
          {"id": 4, "content": "Far", "matchId": "far_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What is the true classical Ge'ez meaning of the word 'ረመፅ'?",
        "options": ["Hot ashes", "Water", "Chariot"],
        "correctAnswer": "Hot ashes"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 7th form (Sabe'e) of the family?",
        "options": ["ሩ", "ሬ", "ሮ"],
        "correctAnswer": "ሮ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Distant / Far': [ _ ] ቅ",
        "options": ["ረ", "ሩ", "ሪ"],
        "correctAnswer": "ሩ"
      }
    ]
  },
  {
    "lessonId": 6,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፮",
    "title": "The ሠ (She) Family & Ancient Words",
    "objective": "Master the full ሠ (Sutu) family from ሠ to ሦ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ሠ", "sound": "se"},
      {"symbol": "ሡ", "sound": "su"},
      {"symbol": "ሢ", "sound": "si"},
      {"symbol": "ሣ", "sound": "sa"},
      {"symbol": "ሤ", "sound": "sie"},
      {"symbol": "ሥ", "sound": "s"},
      {"symbol": "ሦ", "sound": "so"}
    ],
    "vocabulary": [
      {
        "word": "ንጉሥ",
        "phonetic": "Ne-gush",
        "englishMeaning": "King or Ruler",
        "hint": "Ends with the 6th form ሥ",
        "imageUrl": "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=600",
        "audioName": "negus"
      },
      {
        "word": "ምሥዋዕ",
        "phonetic": "Mis-wa'e",
        "englishMeaning": "Altar",
        "hint": "A sacred place of offering in Ge'ez liturgies",
        "imageUrl": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600",
        "audioName": "miswae"
      },
      {
        "word": "ሠረቀ",
        "phonetic": "She-re-qe",
        "englishMeaning": "It rose / It dawned",
        "hint": "Used for the rising sun or moon ('ሠረቀ ፀሐይ')",
        "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
        "audioName": "shereqe"
      },
      {
        "word": "ሥጋ",
        "phonetic": "She-ga",
        "englishMeaning": "Flesh or Body",
        "hint": "Starts with the 6th form ሥ",
        "imageUrl": "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600",
        "audioName": "shega"
      },
      {
        "word": "ሣዕር",
        "phonetic": "Sha-e'er",
        "englishMeaning": "Grass or Vegetation",
        "hint": "Pure classical term for green fields",
        "imageUrl": "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=600",
        "audioName": "shaeer"
      },
      {
        "word": "ሐሠሠ",
        "phonetic": "Ha-she-she",
        "englishMeaning": "He searched / He sought out",
        "hint": "An ancient action verb for seeking wisdom",
        "imageUrl": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600",
        "audioName": "hasheshe"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ሠ",
        "instructions": "Trace the classic trident-style shape of 'ሠ' starting from the center line down."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ንጉሥ'. Which variant of the letter is at the very end?",
        "options": ["ሢ", "ሠ", "ሥ"],
        "correctAnswer": "ሥ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ንጉሥ", "meaning": "King/Ruler"},
          {"symbol": "ምሥዋዕ", "meaning": "Altar"},
          {"symbol": "ሠረቀ", "meaning": "It rose/dawned"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ንጉሥ",
        "audioClipUrl": "/audio/geez/negus.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_she",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ሠ",
        "distractors": ["ሰ", "በ", "ሀ", "ሠ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["ne", "gush"],
        "targetWord": "ንጉሥ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ንጉሥ", "matchId": "king_match"},
          {"id": 2, "content": "King", "matchId": "king_match"},
          {"id": 3, "content": "ሥጋ", "matchId": "flesh_match"},
          {"id": 4, "content": "Flesh", "matchId": "flesh_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the classical word 'ሠረቀ' mean when talking about the sun?",
        "options": ["It set / went down", "It rose / dawned", "It burned"],
        "correctAnswer": "It rose / dawned"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 4th form (Rabe'e) of this family?",
        "options": ["ሡ", "ሢ", "ሣ"],
        "correctAnswer": "ሣ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'King / Ruler': ንጉ [ _ ]",
        "options": ["ሠ", "ሢ", "ሥ"],
        "correctAnswer": "ሥ"
      }
    ]
  },
  {
    "lessonId": 7,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፯",
    "title": "The ሸ (She) Family & Ancient Words",
    "objective": "Master the full ሸ family from ሸ to ሾ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ሸ", "sound": "she_regular"},
      {"symbol": "ሹ", "sound": "shu_regular"},
      {"symbol": "ሺ", "sound": "shi_regular"},
      {"symbol": "ሻ", "sound": "sha_regular"},
      {"symbol": "ሼ", "sound": "shie_regular"},
      {"symbol": "ሽ", "sound": "sh_regular"},
      {"symbol": "ሾ", "sound": "sho_regular"}
    ],
    "vocabulary": [
      {
        "word": "ሾላ",
        "phonetic": "Sho-la",
        "englishMeaning": "Sycamore Fig Tree",
        "hint": "An ancient, massive canopy tree native to Northeast Africa",
        "imageUrl": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600",
        "audioName": "shola"
      },
      {
        "word": "ሹም",
        "phonetic": "Shum",
        "englishMeaning": "Appointed Official or Chief",
        "hint": "Classical administrative title meaning 'the one who is appointed'",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "shum"
      },
      {
        "word": "ሻማ",
        "phonetic": "Sha-ma",
        "englishMeaning": "Candle / Wax Light",
        "hint": "Used for illumination during classical evening studies",
        "imageUrl": "https://images.unsplash.com/photo-1541417904950-b855846fe074?w=600",
        "audioName": "shama"
      },
      {
        "word": "ሸተት",
        "phonetic": "She-tet",
        "englishMeaning": "Fragrance or Aroma",
        "hint": "Starts with the 1st form ሸ",
        "imageUrl": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600",
        "audioName": "shetet"
      },
      {
        "word": "ሽልማት",
        "phonetic": "Shil-mat",
        "englishMeaning": "Prize, Award, or Adornment",
        "hint": "Given to scholars or children who master their lessons",
        "imageUrl": "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600",
        "audioName": "shilmat"
      },
      {
        "word": "ሺሕ",
        "phonetic": "Shih",
        "englishMeaning": "One Thousand (1,000)",
        "hint": "Uses the 3rd form ሺ and ends with the classical ሐ family form ሕ",
        "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600",
        "audioName": "shih"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ሸ",
        "instructions": "Trace the 'ሰ' base first, then draw the small crowning hat on top from left to right."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ሾላ'. Which variant of the letter 'ሸ' opens the word?",
        "options": ["ሻ", "ሼ", "ሾ"],
        "correctAnswer": "ሾ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ሾላ", "meaning": "Sycamore Tree"},
          {"symbol": "ሹም", "meaning": "Appointed Chief"},
          {"symbol": "ሻማ", "meaning": "Candle"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ሻማ",
        "audioClipUrl": "/audio/geez/shama.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_she_reg",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ሸ",
        "distractors": ["ሰ", "በ", "ቀ", "ሸ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["sho", "la"],
        "targetWord": "ሾላ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ሹም", "matchId": "chief_match"},
          {"id": 2, "content": "Chief", "matchId": "chief_match"},
          {"id": 3, "content": "ሻማ", "matchId": "candle_match"},
          {"id": 4, "content": "Candle", "matchId": "candle_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the classical Ge'ez word 'ሹም' mean?",
        "options": ["Appointed Official", "Water", "House"],
        "correctAnswer": "Appointed Official"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 7th form (Sabe'e) of this family?",
        "options": ["ሹ", "ሺ", "ሾ"],
        "correctAnswer": "ሾ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Candle': [ _ ] ማ",
        "options": ["ሸ", "ሻ", "ሼ"],
        "correctAnswer": "ሻ"
      }
    ]
  },
  {
    "lessonId": 8,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፰",
    "title": "The ቀ (Qe) Family & Ancient Words",
    "objective": "Master the full ቀ family from ቀ to ቆ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ቀ", "sound": "qe"},
      {"symbol": "ቁ", "sound": "qu"},
      {"symbol": "ቂ", "sound": "qi"},
      {"symbol": "ቃ", "sound": "qa"},
      {"symbol": "ቄ", "sound": "qie"},
      {"symbol": "ቅ", "sound": "q"},
      {"symbol": "ቆ", "sound": "qo"}
    ],
    "vocabulary": [
      {
        "word": "ቍርባን",
        "phonetic": "Qur-ban",
        "englishMeaning": "Offering or Holy Communion",
        "hint": "A foundational classical term for a sacred offering",
        "imageUrl": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600",
        "audioName": "qurban"
      },
      {
        "word": "ቅዳሴ",
        "phonetic": "Qed-da-sie",
        "englishMeaning": "Liturgical Chant or Sanctification",
        "hint": "The divine service of praise and blessing",
        "imageUrl": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600",
        "audioName": "qeddase"
      },
      {
        "word": "ቃላት",
        "phonetic": "Qa-lat",
        "englishMeaning": "Words",
        "hint": "The plural form of word (ቃል) using the 4th form ቃ",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
        "audioName": "qalat"
      },
      {
        "word": "ቅዱስ",
        "phonetic": "Qe-dus",
        "englishMeaning": "Holy or Saintly",
        "hint": "Starts with the 6th form ቅ",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600",
        "audioName": "qedus"
      },
      {
        "word": "ቆጵሮስ",
        "phonetic": "Qop-ros",
        "englishMeaning": "Cyprus",
        "hint": "Ancient historical region found in classical manuscripts",
        "imageUrl": "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600",
        "audioName": "qopros"
      },
      {
        "word": "ቄደር",
        "phonetic": "Qie-der",
        "englishMeaning": "Kedar (Ancient nomadic dwelling)",
        "hint": "Often used to describe beautiful ancient tents or wilderness",
        "imageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
        "audioName": "qieder"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ቀ",
        "instructions": "Trace the round loop and the sharp central vertical leg of 'ቀ' downwards."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ቅዳሴ'. Which variant of the letter is at the very beginning?",
        "options": ["ቁ", "ቃ", "ቅ"],
        "correctAnswer": "ቅ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ቍርባን", "meaning": "Offering"},
          {"symbol": "ቅዳሴ", "meaning": "Liturgical Chant"},
          {"symbol": "ቃላት", "meaning": "Words"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ቅዱስ",
        "audioClipUrl": "/audio/geez/qedus.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_qe",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ቀ",
        "distractors": ["በ", "መ", "ለ", "ቀ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["qa", "lat"],
        "targetWord": "ቃላት"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ቅዱስ", "matchId": "holy_match"},
          {"id": 2, "content": "Holy", "matchId": "holy_match"},
          {"id": 3, "content": "ቃላት", "matchId": "words_match"},
          {"id": 4, "content": "Words", "matchId": "words_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the classical Ge'ez word 'ቃላት' mean?",
        "options": ["Words", "Water", "Sky"],
        "correctAnswer": "Words"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which symbol represents the 5th form (Hamis) of this family?",
        "options": ["ቂ", "ቃ", "ቄ"],
        "correctAnswer": "ቄ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Holy': [ _ ] ዱስ",
        "options": ["ቀ", "ቁ", "ቅ"],
        "correctAnswer": "ቅ"
      }
    ]
  },
  {
    "lessonId": 9,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፱",
    "title": "The በ (Be) Family & Ancient Words",
    "objective": "Master the full በ family from በ to ቦ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "በ", "sound": "be"},
      {"symbol": "ቡ", "sound": "bu"},
      {"symbol": "ቢ", "sound": "bi"},
      {"symbol": "ባ", "sound": "ba"},
      {"symbol": "ቤ", "sound": "bie"},
      {"symbol": "ብ", "sound": "b"},
      {"symbol": "ቦ", "sound": "bo"}
    ],
    "vocabulary": [
      {
        "word": "ባሕር",
        "phonetic": "Ba-her",
        "englishMeaning": "Sea or Lake",
        "hint": "Features the 4th form ባ and classical ሕ",
        "imageUrl": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600",
        "audioName": "baher"
      },
      {
        "word": "ብእሲ",
        "phonetic": "Be-'e-see",
        "englishMeaning": "Man or Husband",
        "hint": "Pure classical Ge'ez term (completely distinct from Amharic souvenir)",
        "imageUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600",
        "audioName": "beesi"
      },
      {
        "word": "በረከት",
        "phonetic": "Be-re-ket",
        "englishMeaning": "Blessing",
        "hint": "The ancient spiritual gift of abundance",
        "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600",
        "audioName": "berekhet"
      },
      {
        "word": "ቤት",
        "phonetic": "Biet",
        "englishMeaning": "House or Sanctuary",
        "hint": "Uses the 5th form ቤ",
        "imageUrl": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600",
        "audioName": "biet"
      },
      {
        "word": "በግዕ",
        "phonetic": "Be-ge'e",
        "englishMeaning": "Sheep / Lamb",
        "hint": "Features the ancient guttural letter ዕ at the end",
        "imageUrl": "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=600",
        "audioName": "begee"
      },
      {
        "word": "ቦታ",
        "phonetic": "Bo-ta",
        "englishMeaning": "Place",
        "hint": "Starts with the 7th form ቦ",
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
        "audioName": "bota"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "በ",
        "instructions": "Trace the open bucket shape of 'በ' starting from the left wall, down across, and up the right side."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ባሕር'. Which form of the letter 'በ' opens the word?",
        "options": ["በ", "ባ", "ቦ"],
        "correctAnswer": "ባ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ባሕር", "meaning": "Sea/Lake"},
          {"symbol": "ብእሲ", "meaning": "Man"},
          {"symbol": "በረከት", "meaning": "Blessing"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "በረከት",
        "audioClipUrl": "/audio/geez/berekhet.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_be",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "በ",
        "distractors": ["ለ", "ሐ", "ቀ", "በ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["ba", "her"],
        "targetWord": "ባሕር"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ባሕር", "matchId": "sea_match"},
          {"id": 2, "content": "Sea", "matchId": "sea_match"},
          {"id": 3, "content": "ቤት", "matchId": "house_match"},
          {"id": 4, "content": "House", "matchId": "house_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What is the pure classical Ge'ez meaning of the word 'ብእሲ'?",
        "options": ["Man / Husband", "Water", "Chariot"],
        "correctAnswer": "Man / Husband"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 6th form (Sadis) of this family?",
        "options": ["ቡ", "ቢ", "ብ"],
        "correctAnswer": "ብ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Sea / Lake': [ _ ] ሕር",
        "options": ["በ", "ባ", "ቤ"],
        "correctAnswer": "ባ"
      }
    ]
  },
  {
    "lessonId": 10,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፲",
    "title": "ምዕራፍ ፲ — Meraf 10: The ተ (Te) Family & Ancient Words",
    "objective": "Master the full ተ family from ተ to ቶ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ተ", "sound": "te"},
      {"symbol": "ቱ", "sound": "tu"},
      {"symbol": "ቲ", "sound": "ti"},
      {"symbol": "ታ", "sound": "ta"},
      {"symbol": "ቴ", "sound": "tie"},
      {"symbol": "ት", "sound": "t"},
      {"symbol": "ቶ", "sound": "to"}
    ],
    "vocabulary": [
      {
        "word": "ተንሥአ",
        "phonetic": "Ten-se-'a",
        "englishMeaning": "He arose / He stood up",
        "hint": "A foundational classical action verb used frequently in texts",
        "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
        "audioName": "tense'a"
      },
      {
        "word": "ትእዛዝ",
        "phonetic": "Te'e-zaz",
        "englishMeaning": "Commandment or Decree",
        "hint": "Starts with the 6th form ት and uses the classical ዐ family form እ",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600",
        "audioName": "teezaz"
      },
      {
        "word": "ታቦት",
        "phonetic": "Ta-bot",
        "englishMeaning": "Ark of the Covenant / Sanctuary Ark",
        "hint": "An iconic ancient sacred object, starting with the 4th form ታ",
        "imageUrl": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600",
        "audioName": "tabot"
      },
      {
        "word": "ተስፋ",
        "phonetic": "Tes-fa",
        "englishMeaning": "Hope or Promise",
        "hint": "A beautiful classical concept meaning anticipation of good",
        "imageUrl": "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600",
        "audioName": "tesfa"
      },
      {
        "word": "ትካት",
        "phonetic": "Te-kat",
        "englishMeaning": "Of old / Ancient times",
        "hint": "A pure Ge'ez adverb referencing antiquity or the past",
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
        "audioName": "tekat"
      },
      {
        "word": "ቶማስ",
        "phonetic": "To-mas",
        "englishMeaning": "Thomas",
        "hint": "Ancient biblical name starting with the 7th form ቶ",
        "imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
        "audioName": "tomas"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ተ",
        "instructions": "Trace the left vertical leg down, then draw the crossbar and right leg of 'ተ'."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ታቦት'. Which variant of the letter 'ተ' opens the word?",
        "options": ["ተ", "ታ", "ቶ"],
        "correctAnswer": "ታ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ተንሥአ", "meaning": "He arose"},
          {"symbol": "ትእዛዝ", "meaning": "Commandment"},
          {"symbol": "ታቦት", "meaning": "Ark"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ተስፋ",
        "audioClipUrl": "/audio/geez/tesfa.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_te",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ተ",
        "distractors": ["ቸ", "በ", "ቀ", "ተ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["ta", "bot"],
        "targetWord": "ታቦት"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ተስፋ", "matchId": "hope_match"},
          {"id": 2, "content": "Hope", "matchId": "hope_match"},
          {"id": 3, "content": "ትእዛዝ", "matchId": "decree_match"},
          {"id": 4, "content": "Commandment", "matchId": "decree_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the pure classical Ge'ez word 'ትካት' mean?",
        "options": ["Of old / Ancient times", "Water", "Tomorrow"],
        "correctAnswer": "Of old / Ancient times"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 6th form (Sadis) of this family?",
        "options": ["ቱ", "ቲ", "ት"],
        "correctAnswer": "ት"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Hope': [ _ ] ስፋ",
        "options": ["ተ", "ታ", "ቴ"],
        "correctAnswer": "ተ"
      }
    ]
  },
  {
    "lessonId": 11,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፲፩",
    "title": "ምዕራፍ ፲፩ — Meraf 11: The ቸ (Che) Family & Ancient Words",
    "objective": "Master the full ቸ family from ቸ to ቾ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ቸ", "sound": "che"},
      {"symbol": "ቹ", "sound": "chu"},
      {"symbol": "ቺ", "sound": "chi"},
      {"symbol": "ቻ", "sound": "cha"},
      {"symbol": "ቼ", "sound": "chie"},
      {"symbol": "ች", "sound": "ch"},
      {"symbol": "ቾ", "sound": "cho"}
    ],
    "vocabulary": [
      {
        "word": "ምቻ",
        "phonetic": "Me-cha",
        "englishMeaning": "Agreement or Accord",
        "hint": "A verified classical text term for alignment or consensus",
        "imageUrl": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600",
        "audioName": "mecha"
      },
      {
        "word": "ዋቸረ",
        "phonetic": "Wa-che-re",
        "englishMeaning": "He conversed / He conversed wisely",
        "hint": "Ancient action verb for engaging in intellectual dialogue",
        "imageUrl": "https://images.unsplash.com/photo-1521791136366-3e10427ff0e3?w=600",
        "audioName": "wachere"
      },
      {
        "word": "ቸነፈር",
        "phonetic": "Che-ne-fer",
        "englishMeaning": "Plague or Pestilence",
        "hint": "Used in ancient historical texts to describe epidemics or trials",
        "imageUrl": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600",
        "audioName": "chenefer"
      },
      {
        "word": "ችሎታ",
        "phonetic": "Chil-o-ta",
        "englishMeaning": "Capability or Capacity",
        "hint": "Refers to the inherent capacity or judicial power in classical administrative scripts",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
        "audioName": "chilota"
      },
      {
        "word": "ኰረንቾ",
        "phonetic": "Kwer-en-cho",
        "englishMeaning": "Rough terrain / Stony ground",
        "hint": "An ancient topography term ending with the 7th form ቾ",
        "imageUrl": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600",
        "audioName": "kwerencho"
      },
      {
        "word": "ቻና",
        "phonetic": "Cha-na",
        "englishMeaning": "To pack / To saddle an animal",
        "hint": "Ancient caravan movement verb using the 4th form ቻ",
        "imageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
        "audioName": "chana"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ቸ",
        "instructions": "Trace the 'ተ' baseline structure, then explicitly place the small flag on the top center."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ቸነፈር'. Which form of the letter 'ቸ' initiates the word?",
        "options": ["ቸ", "ቻ", "ቾ"],
        "correctAnswer": "ቸ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ምቻ", "meaning": "Agreement"},
          {"symbol": "ዋቸረ", "meaning": "He conversed"},
          {"symbol": "ቸነፈር", "meaning": "Plague"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ቸነፈር",
        "audioClipUrl": "/audio/geez/chenefer.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_che",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ቸ",
        "distractors": ["ተ", "በ", "የ", "ቸ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["me", "cha"],
        "targetWord": "ምቻ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ቸነፈር", "matchId": "plague_match"},
          {"id": 2, "content": "Plague", "matchId": "plague_match"},
          {"id": 3, "content": "ምቻ", "matchId": "accord_match"},
          {"id": 4, "content": "Agreement", "matchId": "accord_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the classical text word 'ቸነፈር' signify?",
        "options": ["Plague or Pestilence", "Harvest", "A Royal Crown"],
        "correctAnswer": "Plague or Pestilence"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 4th form (Rabe'e) of this family?",
        "options": ["ቹ", "ቺ", "ቻ"],
        "correctAnswer": "ቻ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'He conversed wisely': ዋ [ _ ] ረ",
        "options": ["ቸ", "ቺ", "ች"],
        "correctAnswer": "ቸ"
      }
    ]
  },
  {
    "lessonId": 12,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፲፪",
    "title": "ምዕራፍ ፲፪ — Meraf 12: The ኀ (Kha) Family & Ancient Words",
    "objective": "Master the full ኀ family from ኀ to ኆ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ኀ", "sound": "kha"},
      {"symbol": "ኁ", "sound": "khu"},
      {"symbol": "ኂ", "sound": "khi"},
      {"symbol": "ኃ", "sound": "khaa"},
      {"symbol": "ኄ", "sound": "khie"},
      {"symbol": "ኅ", "sound": "kh"},
      {"symbol": "ኆ", "sound": "kho"}
    ],
    "vocabulary": [
      {
        "word": "ኀበለ",
        "phonetic": "Kha-be-le",
        "englishMeaning": "He schemed / He plotted",
        "hint": "An ancient classical narrative verb used to describe strategies or plots",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "khabele"
      },
      {
        "word": "ኃይል",
        "phonetic": "Khayl",
        "englishMeaning": "Power, Might, or Army",
        "hint": "Starts with the 4th form ኃ and represents divine or structural military power",
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
        "audioName": "khayl"
      },
      {
        "word": "ኀቤሃ",
        "phonetic": "Kha-bie-ha",
        "englishMeaning": "Towards her",
        "hint": "A pure classical preposition and directional marker",
        "imageUrl": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600",
        "audioName": "khabieha"
      },
      {
        "word": "ኅብስት",
        "phonetic": "Kheb-ist",
        "englishMeaning": "Bread or Sacred Loaf",
        "hint": "Starts with the 6th form ኅ; foundational in classical liturgical texts",
        "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
        "audioName": "khebist"
      },
      {
        "word": "ኆኅት",
        "phonetic": "Kho-khet",
        "englishMeaning": "Portal, Door, or Gateway",
        "hint": "Features the 7th form ኆ and the 6th form ኅ side by side",
        "imageUrl": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600",
        "audioName": "khokhet"
      },
      {
        "word": "ኀጥአ",
        "phonetic": "Kha-te-'a",
        "englishMeaning": "He missed / He lacked / He sinned",
        "hint": "Classical root meaning to lack a target or commit an infraction",
        "imageUrl": "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?w=600",
        "audioName": "khatea"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ኀ",
        "instructions": "Trace the loop, then draw the two small hanging down-strokes beneath it evenly."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ኃይል'. Which specific form opens the word?",
        "options": ["ኀ", "ኃ", "ኆ"],
        "correctAnswer": "ኃ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ኃይል", "meaning": "Power/Might"},
          {"symbol": "ኅብስት", "meaning": "Sacred Bread"},
          {"symbol": "ኆኅት", "meaning": "Gateway/Door"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ኅብስት",
        "audioClipUrl": "/audio/geez/khebist.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_kha",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ኀ",
        "distractors": ["ሀ", "ለ", "ሐ", "ኀ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["khay", "l"],
        "targetWord": "ኃይል"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ኃይል", "matchId": "power_match"},
          {"id": 2, "content": "Power", "matchId": "power_match"},
          {"id": 3, "content": "ኆኅት", "matchId": "gate_match"},
          {"id": 4, "content": "Gateway", "matchId": "gate_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the pure classical Ge'ez word 'ኆኅት' mean?",
        "options": ["Portal / Gateway", "Water", "Chariot"],
        "correctAnswer": "Portal / Gateway"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 6th form (Sadis) of this family?",
        "options": ["ኁ", "ኂ", "ኅ"],
        "correctAnswer": "ኅ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Sacred Bread': [ _ ] ብስት",
        "options": ["ኀ", "ኃ", "ኅ"],
        "correctAnswer": "ኅ"
      }
    ]
  },
  {
    "lessonId": 13,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፲፫",
    "title": "ምዕራፍ ፲፫ — Meraf 13: The ነ (Ne) Family & Ancient Words",
    "objective": "Master the full ነ family from ነ to ኖ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ነ", "sound": "ne"},
      {"symbol": "ኑ", "sound": "nu"},
      {"symbol": "ኒ", "sound": "ni"},
      {"symbol": "ና", "sound": "na"},
      {"symbol": "ኔ", "sound": "nie"},
      {"symbol": "ን", "sound": "n"},
      {"symbol": "ኖ", "sound": "no"}
    ],
    "vocabulary": [
      {
        "word": "ነቢይ",
        "phonetic": "Ne-beey",
        "englishMeaning": "Prophet",
        "hint": "Classical title for an inspired messenger, starting with the 1st form ነ",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600",
        "audioName": "nebeey"
      },
      {
        "word": "ንዋይ",
        "phonetic": "Ne-way",
        "englishMeaning": "Vessel, Property, or Treasure",
        "hint": "Often used in phrases like 'ንዋየ ቅድሳት' (sacred vessels)",
        "imageUrl": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600",
        "audioName": "neway"
      },
      {
        "word": "ነሥአ",
        "phonetic": "Nes-'a",
        "englishMeaning": "He took / He received",
        "hint": "One of the most frequent action verbs in Ge'ez manuscripts",
        "imageUrl": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600",
        "audioName": "nesaa"
      },
      {
        "word": "ንሥር",
        "phonetic": "Nes-er",
        "englishMeaning": "Eagle",
        "hint": "The classical symbol of high flight and keen sight, using 6th form ን",
        "imageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
        "audioName": "neser"
      },
      {
        "word": "ኖኅ",
        "phonetic": "Nokh",
        "englishMeaning": "Noah",
        "hint": "The classical historical biblical name, starting with the 7th form ኖ",
        "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
        "audioName": "nokh"
      },
      {
        "word": "ናርዶስ",
        "phonetic": "Nar-dos",
        "englishMeaning": "Spikenard (Ancient costly perfume)",
        "hint": "A rare classical aromatic ointment mentioned in ancient texts",
        "imageUrl": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600",
        "audioName": "nardos"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ነ",
        "instructions": "Trace the main upright framework down, making sure to define the unique open base loop of 'ነ'."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ንሥር'. Which variant of the letter 'ነ' acts as the root?",
        "options": ["ነ", "ና", "ን"],
        "correctAnswer": "ን"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ነቢይ", "meaning": "Prophet"},
          {"symbol": "ንዋይ", "meaning": "Vessel/Property"},
          {"symbol": "ንሥር", "meaning": "Eagle"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ንሥር",
        "audioClipUrl": "/audio/geez/neser.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_ne",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ነ",
        "distractors": ["ተ", "በ", "የ", "ነ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["nes", "er"],
        "targetWord": "ንሥር"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ነቢይ", "matchId": "prophet_match"},
          {"id": 2, "content": "Prophet", "matchId": "prophet_match"},
          {"id": 3, "content": "ንዋይ", "matchId": "vessel_match"},
          {"id": 4, "content": "Vessel", "matchId": "vessel_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the classical text word 'ንዋይ' mean?",
        "options": ["Vessel / Property", "Sky / Heaven", "A Roadway"],
        "correctAnswer": "Vessel / Property"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 7th form (Sabe'e) of this family?",
        "options": ["ኑ", "ና", "ኖ"],
        "correctAnswer": "ኖ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Prophet': [ _ ] ቢይ",
        "options": ["ነ", "ኑ", "ን"],
        "correctAnswer": "ነ"
      }
    ]
  },
  {
    "lessonId": 14,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፲፬",
    "title": "ምዕራፍ ፲፬ — Meraf 14: The ኘ (Nye) Family & Ancient Words",
    "objective": "Master the full ኘ family from ኘ to ኞ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ኘ", "sound": "nye"},
      {"symbol": "ኙ", "sound": "nyu"},
      {"symbol": "ኚ", "sound": "nyi"},
      {"symbol": "ኛ", "sound": "nya"},
      {"symbol": "ኜ", "sound": "nyie"},
      {"symbol": "ኝ", "sound": "ny"},
      {"symbol": "ኞ", "sound": "nyo"}
    ],
    "vocabulary": [
      {
        "word": "ጋኛ",
        "phonetic": "Ga-nya",
        "englishMeaning": "Large earthenware storage jar",
        "hint": "An ancient vessel used for storing grains or liquids, ending in the 4th form ኛ",
        "imageUrl": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600",
        "audioName": "ganya"
      },
      {
        "word": "ኘካ",
        "phonetic": "Nye-ka",
        "englishMeaning": "He bit / He gnawed",
        "hint": "An ancient active root verb starting with the 1st form ኘ",
        "imageUrl": "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?w=600",
        "audioName": "nyeka"
      },
      {
        "word": "ፓኛት",
        "phonetic": "Pa-nyat",
        "englishMeaning": "Netting or Woven mesh",
        "hint": "Features the 6th form ኝ inside an ancient textile descriptive noun",
        "imageUrl": "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=600",
        "audioName": "panyat"
      },
      {
        "word": "ኘኀ",
        "phonetic": "Nye-kha",
        "englishMeaning": "To press down / To compress",
        "hint": "An action verb combining the 1st form ኘ and the classical ኀ family",
        "imageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
        "audioName": "nyekha"
      },
      {
        "word": "ዳኛ",
        "phonetic": "Da-nya",
        "englishMeaning": "Arbiter or Counselor",
        "hint": "Refers to a community mediator or judge in ancient legal customs",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "danya"
      },
      {
        "word": "ኞኅ",
        "phonetic": "Nyo-kh",
        "englishMeaning": "To be weary / To faint",
        "hint": "An ancient intransitive verb baseline starting with the 7th form ኞ",
        "imageUrl": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600",
        "audioName": "nyokh"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ኘ",
        "instructions": "Trace the 'ነ' letter layout first, then elegantly place the small wavy flag loop on its top horizontal stroke."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ጋኛ'. Which specific form of the 'ኘ' family finishes this noun?",
        "options": ["ኘ", "ኛ", "ኞ"],
        "correctAnswer": "ኛ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ጋኛ", "meaning": "Storage Jar"},
          {"symbol": "ኘካ", "meaning": "He bit/gnawed"},
          {"symbol": "ዳኛ", "meaning": "Arbiter"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ኘካ",
        "audioClipUrl": "/audio/geez/nyeka.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_nye",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ኘ",
        "distractors": ["ነ", "ተ", "ቸ", "ኘ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["ga", "nya"],
        "targetWord": "ጋኛ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ጋኛ", "matchId": "jar_match"},
          {"id": 2, "content": "Storage Jar", "matchId": "jar_match"},
          {"id": 3, "content": "ዳኛ", "matchId": "judge_match"},
          {"id": 4, "content": "Arbiter", "matchId": "judge_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the pure classical Ge'ez word 'ጋኛ' represent?",
        "options": ["A storage jar", "A high mountain", "A dynamic river"],
        "correctAnswer": "A storage jar"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which symbol represents the 4th form (Rabe'e) of this family?",
        "options": ["ኙ", "ኚ", "ኛ"],
        "correctAnswer": "ኛ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the ancient verb for 'He bit / gnawed': [ _ ] ካ",
        "options": ["ኘ", "ኛ", "ኝ"],
        "correctAnswer": "ኘ"
      }
    ]
  },
  {
    "lessonId": 15,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፲፭",
    "title": "ምዕራፍ ፲፭ — Meraf 15: The አ (Alp) Family & Ancient Words",
    "objective": "Master the full አ family from አ to ኦ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "አ", "sound": "a"},
      {"symbol": "ኡ", "sound": "u"},
      {"symbol": "ኢ", "sound": "i"},
      {"symbol": "ኣ", "sound": "aa"},
      {"symbol": "ኤ", "sound": "ie_alp"},
      {"symbol": "እ", "sound": "e"},
      {"symbol": "ኦ", "sound": "o"}
    ],
    "vocabulary": [
      {
        "word": "አርዌ",
        "phonetic": "Ar-wie",
        "englishMeaning": "Wild beast or Serpent",
        "hint": "An ancient term for wild animals, starting with the 1st form አ",
        "imageUrl": "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600",
        "audioName": "arwie"
      },
      {
        "word": "አንበሳ",
        "phonetic": "An-bes-sa",
        "englishMeaning": "Lion",
        "hint": "The classic symbol of nobility and strength across ancient manuscripts",
        "imageUrl": "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600",
        "audioName": "anbessa"
      },
      {
        "word": "አሜን",
        "phonetic": "A-men",
        "englishMeaning": "Amen / So be it",
        "hint": "The classical cross-cultural absolute declaration of truth and confirmation",
        "imageUrl": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600",
        "audioName": "amen"
      },
      {
        "word": "እግዚአብሔር",
        "phonetic": "Eg-zee-abh-ier",
        "englishMeaning": "God (The Lord of the Land)",
        "hint": "The compound classical term meaning 'Lord of the Earth/Universe', starting with the 6th form እ",
        "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600",
        "audioName": "egziabher"
      },
      {
        "word": "ኦሪት",
        "phonetic": "O-reet",
        "englishMeaning": "Torah / Law / Octateuch",
        "hint": "Refers strictly to ancient foundational books of law, starting with the 7th form ኦ",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
        "audioName": "oreet"
      },
      {
        "word": "ኢየሩሳሌም",
        "phonetic": "Ee-ye-ru-sa-liem",
        "englishMeaning": "Jerusalem",
        "hint": "An iconic historical city found throughout classical texts, starting with the 3rd form ኢ",
        "imageUrl": "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600",
        "audioName": "iyerusalem"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "አ",
        "instructions": "Trace the distinct corner hook on the left side first, then pull the upright framework line down and across."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ኦሪት'. Which specific form of the vowel carrier acts as the anchor?",
        "options": ["ኡ", "እ", "ኦ"],
        "correctAnswer": "ኦ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "አንበሳ", "meaning": "Lion"},
          {"symbol": "እግዚአብሔር", "meaning": "God"},
          {"symbol": "ኦሪት", "meaning": "Ancient Law"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "አሜን",
        "audioClipUrl": "/audio/geez/amen.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_alp",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "አ",
        "distractors": ["በ", "ለ", "ሀ", "አ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["a", "men"],
        "targetWord": "አሜን"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "አንበሳ", "matchId": "lion_match"},
          {"id": 2, "content": "Lion", "matchId": "lion_match"},
          {"id": 3, "content": "ኦሪት", "matchId": "law_match"},
          {"id": 4, "content": "Law", "matchId": "law_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the ancient text descriptor 'ኦሪት' translate to?",
        "options": ["Law / Torah", "A Great Ocean", "A Royal Crown"],
        "correctAnswer": "Law / Torah"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which symbol represents the 6th form (Sadis) of this glottal family?",
        "options": ["ኡ", "ኢ", "እ"],
        "correctAnswer": "እ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Wild beast': [ _ ] ርዌ",
        "options": ["አ", "ኡ", "ኦ"],
        "correctAnswer": "አ"
      }
    ]
  },
  {
    "lessonId": 16,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፲፮",
    "title": "ምዕራፍ ፲፮ — Meraf 16: The ከ (Ke) Family & Ancient Words",
    "objective": "Master the full ከ family from ከ to ኮ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ከ", "sound": "ke"},
      {"symbol": "ኩ", "sound": "ku"},
      {"symbol": "ኪ", "sound": "ki"},
      {"symbol": "ካ", "sound": "ka"},
      {"symbol": "ኬ", "sound": "kie"},
      {"symbol": "ክ", "sound": "k"},
      {"symbol": "ኮ", "sound": "ko"}
    ],
    "vocabulary": [
      {
        "word": "ኪዳን",
        "phonetic": "Kee-dan",
        "englishMeaning": "Covenant, Pact, or Testament",
        "hint": "A foundational theological and historical legal term, starting with the 3rd form ኪ",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600",
        "audioName": "keedan"
      },
      {
        "word": "ኮከብ",
        "phonetic": "Ko-keb",
        "englishMeaning": "Star / Celestial Body",
        "hint": "Features the 7th form ኮ as the opening and the 6th form ክ transformed into its root structure",
        "imageUrl": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600",
        "audioName": "kokeb"
      },
      {
        "word": "ክነፍ",
        "phonetic": "Ke-nef",
        "englishMeaning": "Wing",
        "hint": "The classical word for a bird or spiritual messenger's wing, starting with the 6th form ክ",
        "imageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
        "audioName": "kenef"
      },
      {
        "word": "ከበበ",
        "phonetic": "Ke-be-be",
        "englishMeaning": "He surrounded / He encircled",
        "hint": "An ancient descriptive movement verb using the 1st form ከ",
        "imageUrl": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600",
        "audioName": "kebebe"
      },
      {
        "word": "ካትም",
        "phonetic": "Ka-tem",
        "englishMeaning": "Signet ring / Official seal",
        "hint": "Used by ancient scribes and officials to authorize texts, starting with the 4th form ካ",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "katem"
      },
      {
        "word": "ኩሉ",
        "phonetic": "Koo-loo",
        "englishMeaning": "All / Everything / Entire",
        "hint": "The structural absolute universal quantifier in Ge'ez grammar, starting with the 2nd form ኩ",
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
        "audioName": "kooloo"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ከ",
        "instructions": "Draw the large structural backward hook baseline, then place the right-facing angular bracket frame firmly in the center."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ኪዳን'. Which specific variant of the 'ከ' family initiates this text?",
        "options": ["ከ", "ኪ", "ኮ"],
        "correctAnswer": "ኪ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ኪዳን", "meaning": "Covenant"},
          {"symbol": "ኮከብ", "meaning": "Star"},
          {"symbol": "ክነፍ", "meaning": "Wing"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ኮከብ",
        "audioClipUrl": "/audio/geez/kokeb.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_ke",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ከ",
        "distractors": ["የ", "በ", "ለ", "ከ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["ko", "keb"],
        "targetWord": "ኮከብ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ኪዳን", "matchId": "covenant_match"},
          {"id": 2, "content": "Covenant", "matchId": "covenant_match"},
          {"id": 3, "content": "ኩሉ", "matchId": "all_match"},
          {"id": 4, "content": "All / Everything", "matchId": "all_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the ancient text parameter 'ኩሉ' indicate?",
        "options": ["All / Everything", "A stone wall", "Nightfall"],
        "correctAnswer": "All / Everything"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 7th form (Sabe'e) of this family?",
        "options": ["ኩ", "ኪ", "ኮ"],
        "correctAnswer": "ኮ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Wing': [ _ ] ነፍ",
        "options": ["ከ", "ክ", "ኬ"],
        "correctAnswer": "ክ"
      }
    ]
  },
  {
    "lessonId": 17,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፲፯",
    "title": "ምዕራፍ ፲፯ — Meraf 17: The ኸ (Kha) Family & Ancient Words",
    "objective": "Master the full ኸ family from ኸ to ኾ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ኸ", "sound": "xhe"},
      {"symbol": "ኹ", "sound": "xhu"},
      {"symbol": "ኺ", "sound": "xhi"},
      {"symbol": "ኻ", "sound": "xha"},
      {"symbol": "ኼ", "sound": "xhie"},
      {"symbol": "ኽ", "sound": "xh"},
      {"symbol": "ኾ", "sound": "xho"}
    ],
    "vocabulary": [
      {
        "word": "ኸደነ",
        "phonetic": "Kha-de-ne",
        "englishMeaning": "He covered / He protected",
        "hint": "An ancient protection and sheltering verb starting with the 1st form ኸ",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600",
        "audioName": "khadene"
      },
      {
        "word": "ኽብረ",
        "phonetic": "Khib-re",
        "englishMeaning": "Honor, Glory, or Weight",
        "hint": "Refers to high dignity and value in early scrolls, starting with the 6th form ኽ",
        "imageUrl": "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600",
        "audioName": "khibre"
      },
      {
        "word": "ኻልዕ",
        "phonetic": "Kha-le'e",
        "englishMeaning": "Second / Other",
        "hint": "Classical ordinal number for 'second' in sequences, starting with the 4th form ኻ",
        "imageUrl": "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600",
        "audioName": "khalee"
      },
      {
        "word": "ማኅፈድ",
        "phonetic": "Makh-fed",
        "englishMeaning": "Tower or High Chamber",
        "hint": "A classical defensive tower reference containing the 6th form ኽ variant ኅ inside",
        "imageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
        "audioName": "makhfed"
      },
      {
        "word": "ኺድና",
        "phonetic": "Kheed-na",
        "englishMeaning": "Our journey / Our treaty",
        "hint": "An ancient relational text marker starting with the 3rd form ኺ",
        "imageUrl": "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?w=600",
        "audioName": "kheedna"
      },
      {
        "word": "ኾረ",
        "phonetic": "Kho-re",
        "englishMeaning": "He became / It was",
        "hint": "Classical descriptive state verb starting with the 7th form ኾ",
        "imageUrl": "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=600",
        "audioName": "khore"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ኸ",
        "instructions": "Draw the 'ከ' shape first, then place a distinct horizontal crowning accent on top of the structure."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ኻልዕ'. Which specific form of the ኸ family starts it?",
        "options": ["ኸ", "ኻ", "ኾ"],
        "correctAnswer": "ኻ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ኸደነ", "meaning": "He covered"},
          {"symbol": "ኽብረ", "meaning": "Honor"},
          {"symbol": "ኻልዕ", "meaning": "Second"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ኽብረ",
        "audioClipUrl": "/audio/geez/khibre.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_kha",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ኸ",
        "distractors": ["ከ", "በ", "ለ", "ኸ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["khib", "re"],
        "targetWord": "ኽብረ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ኸደነ", "matchId": "cover_match"},
          {"id": 2, "content": "He covered", "matchId": "cover_match"},
          {"id": 3, "content": "ኻልዕ", "matchId": "second_match"},
          {"id": 4, "content": "Second", "matchId": "second_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the ancient text parameter 'ኽብረ' mean?",
        "options": ["Honor/Glory", "A dark cloud", "An empty field"],
        "correctAnswer": "Honor/Glory"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 7th form (Sabe'e) of this family?",
        "options": ["ኺ", "ኻ", "ኾ"],
        "correctAnswer": "ኾ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'He covered': [ _ ] ደነ",
        "options": ["ኸ", "ኹ", "ኼ"],
        "correctAnswer": "ኸ"
      }
    ]
  },
  {
    "lessonId": 18,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፲፰",
    "title": "ምዕራፍ ፲፰ — Meraf 18: The ወ (We) Family & Ancient Words",
    "objective": "Master the full ወ family from ወ to ዎ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ወ", "sound": "we"},
      {"symbol": "ዉ", "sound": "wu"},
      {"symbol": "ዊ", "sound": "wi"},
      {"symbol": "ዋ", "sound": "wa"},
      {"symbol": "ዌ", "sound": "wie"},
      {"symbol": "ው", "sound": "w"},
      {"symbol": "ዎ", "sound": "wo"}
    ],
    "vocabulary": [
      {
        "word": "ወርኅ",
        "phonetic": "Wer-kh",
        "englishMeaning": "Moon or Month",
        "hint": "A pure classical timekeeping and celestial noun, starting with the 1st form ወ",
        "imageUrl": "https://images.unsplash.com/photo-1532960401447-7dd05bef20b0?w=600",
        "audioName": "werkh"
      },
      {
        "word": "ወልድ",
        "phonetic": "Weld",
        "englishMeaning": "Son or Child",
        "hint": "One of the most frequent foundational nouns in ancient texts, using the 6th form ው as its root anchor",
        "imageUrl": "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600",
        "audioName": "weld"
      },
      {
        "word": "ዋዕይ",
        "phonetic": "Wa-'eey",
        "englishMeaning": "Heat, Burning, or Fervor",
        "hint": "An ancient thermal descriptor starting with the 4th form ዋ and containing the ዐ family",
        "imageUrl": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600",
        "audioName": "waeey"
      },
      {
        "word": "ውቅያኖስ",
        "phonetic": "Weq-ya-nos",
        "englishMeaning": "Ocean or Great Deep",
        "hint": "Classical geocentric geographical term starting with the 6th form ው",
        "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
        "audioName": "weqyanos"
      },
      {
        "word": "ወይን",
        "phonetic": "We-yen",
        "englishMeaning": "Wine or Vineyard",
        "hint": "Ancient agricultural reference item tracking back through earliest manuscripts",
        "imageUrl": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600",
        "audioName": "weyen"
      },
      {
        "word": "ዎፌር",
        "phonetic": "Wo-fier",
        "englishMeaning": "Ophir (Ancient land of gold)",
        "hint": "An ancient geographical historical wealth location starting with the 7th form ዎ",
        "imageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
        "audioName": "wofier"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ወ",
        "instructions": "Trace the smooth circular loop on the left, then transition directly into the wider open base hook upward."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical text 'ዋዕይ'. Which specific variation of the 'ወ' family introduces this concept?",
        "options": ["ወ", "ዋ", "ዎ"],
        "correctAnswer": "ዋ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ወርኅ", "meaning": "Moon / Month"},
          {"symbol": "ወልድ", "meaning": "Son / Child"},
          {"symbol": "ውቅያኖስ", "meaning": "Ocean"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ወርኅ",
        "audioClipUrl": "/audio/geez/werkh.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_we",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ወ",
        "distractors": ["መ", "ለ", "ሀ", "ወ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["wer", "kh"],
        "targetWord": "ወርኅ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ወልድ", "matchId": "child_match"},
          {"id": 2, "content": "Son / Child", "matchId": "child_match"},
          {"id": 3, "content": "ውቅያኖስ", "matchId": "ocean_match"},
          {"id": 4, "content": "Ocean", "matchId": "ocean_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the pure classical Ge'ez word 'ወርኅ' signify?",
        "options": ["Moon or Month", "A desert path", "A dynamic fire"],
        "correctAnswer": "Moon or Month"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 6th form (Sadis) of this family?",
        "options": ["ዉ", "ዊ", "ው"],
        "correctAnswer": "ው"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Son / Child': [ _ ] ልድ",
        "options": ["ወ", "ዋ", "ው"],
        "correctAnswer": "ወ"
      }
    ]
  },
  {
    "lessonId": 19,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፲፱",
    "title": "ምዕራፍ ፲፱ — Meraf 19: The ዐ (Ayn) Family & Ancient Words",
    "objective": "Master the full ዐ family from ዐ to ዖ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ዐ", "sound": "a_ayn"},
      {"symbol": "ዑ", "sound": "u_ayn"},
      {"symbol": "ዒ", "sound": "i_ayn"},
      {"symbol": "ዓ", "sound": "aa_ayn"},
      {"symbol": "ዔ", "sound": "ie_ayn"},
      {"symbol": "ዕ", "sound": "e_ayn"},
      {"symbol": "ዖ", "sound": "o_ayn"}
    ],
    "vocabulary": [
      {
        "word": "ዓለም",
        "phonetic": "Aa-lem",
        "englishMeaning": "World / Universe / Eternity",
        "hint": "Classic administrative and historical term starting with the 4th form ዓ",
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
        "audioName": "aalem"
      },
      {
        "word": "ዐሥርቱ",
        "phonetic": "As-er-too",
        "englishMeaning": "Ten (Masculine counting integer)",
        "hint": "The cardinal numeric root value for ten in classical scripts, starting with 1st form ዐ",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600",
        "audioName": "asertoo"
      },
      {
        "word": "ዕንቁ",
        "phonetic": "En-qoo",
        "englishMeaning": "Precious Gem or Pearl",
        "hint": "Refers to structural jewels and hidden values in manuscripts, starting with 6th form ዕ",
        "imageUrl": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600",
        "audioName": "enqoo"
      },
      {
        "word": "ዐይነ",
        "phonetic": "Ay-ne",
        "englishMeaning": "Eye of / Source of",
        "hint": "The classical physical and symbolic constructive anatomical root starting with 1st form ዐ",
        "imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
        "audioName": "ayne"
      },
      {
        "word": "ዑደት",
        "phonetic": "Oo-det",
        "englishMeaning": "Procession, Circuit, or Cycle",
        "hint": "Refers to astronomical cycles or liturgical walks, starting with the 2nd form ዑ",
        "imageUrl": "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=600",
        "audioName": "oodet"
      },
      {
        "word": "ዖፍ",
        "phonetic": "Of",
        "englishMeaning": "Bird / Fowl",
        "hint": "The specific classical term for winged creatures, starting with the 7th form ዖ",
        "imageUrl": "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600",
        "audioName": "of"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ዐ",
        "instructions": "Draw the lower baseline curves expanding out right, then seamlessly cap the top framework enclosing 'ዐ'."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ዓለም'. Which specific form of the pharyngeal Ayn initializes this noun?",
        "options": ["ዐ", "ዓ", "ዖ"],
        "correctAnswer": "ዓ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ዓለም", "meaning": "World/Universe"},
          {"symbol": "ዕንቁ", "meaning": "Gem/Pearl"},
          {"symbol": "ዖፍ", "meaning": "Bird"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ዓለም",
        "audioClipUrl": "/audio/geez/aalem.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_ayn",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ዐ",
        "distractors": ["አ", "በ", "ዕ", "ዐ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["aa", "lem"],
        "targetWord": "ዓለም"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ዕንቁ", "matchId": "gem_match"},
          {"id": 2, "content": "Precious Gem", "matchId": "gem_match"},
          {"id": 3, "content": "ዖፍ", "matchId": "bird_match"},
          {"id": 4, "content": "Bird", "matchId": "bird_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the ancient text parameter 'ዕንቁ' designate?",
        "options": ["Precious Gem or Pearl", "A strong fortress", "A deep valley"],
        "correctAnswer": "Precious Gem or Pearl"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 7th form (Sabe'e) of this pharyngeal family?",
        "options": ["ዑ", "ዓ", "ዖ"],
        "correctAnswer": "ዖ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'World': [ _ ] ለም",
        "options": ["ዐ", "ዓ", "ዕ"],
        "correctAnswer": "ዓ"
      }
    ]
  },
  {
    "lessonId": 20,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፳",
    "title": "ምዕራፍ ፳ — Meraf 20: The ዘ (Ze) Family & Ancient Words",
    "objective": "Master the full ዘ family from ዘ to ዞ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ዘ", "sound": "ze"},
      {"symbol": "ዙ", "sound": "zu"},
      {"symbol": "ዚ", "sound": "zi"},
      {"symbol": "ዛ", "sound": "za"},
      {"symbol": "ዜ", "sound": "zie"},
      {"symbol": "ዝ", "sound": "z"},
      {"symbol": "ዞ", "sound": "zo"}
    ],
    "vocabulary": [
      {
        "word": "ዘመነ",
        "phonetic": "Ze-me-ne",
        "englishMeaning": "Time, Era, or Epoch",
        "hint": "Critical structural reference marker for historical periods, starting with 1st form ዘ",
        "imageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600",
        "audioName": "zemene"
      },
      {
        "word": "ዜማ",
        "phonetic": "Zie-ma",
        "englishMeaning": "Chant, Melody, or Sacred Song",
        "hint": "The classical technical term for historic liturgical vocal notation, starting with 5th form ዜ",
        "imageUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600",
        "audioName": "ziema"
      },
      {
        "word": "ዝንቱ",
        "phonetic": "Zen-too",
        "englishMeaning": "This / This one (Masculine demonstrative)",
        "hint": "Foundational grammatical demonstrative pronoun starting with the 6th form ዝ",
        "imageUrl": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600",
        "audioName": "zentoo"
      },
      {
        "word": "ዛቲ",
        "phonetic": "Za-tee",
        "englishMeaning": "This / This one (Feminine demonstrative)",
        "hint": "The exact feminine counterpart to ዝንቱ, starting with the 4th form ዛ",
        "imageUrl": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600",
        "audioName": "zatee"
      },
      {
        "word": "ዘርዕ",
        "phonetic": "Zer-e",
        "englishMeaning": "Seed, Lineage, or Offspring",
        "hint": "An agricultural and familial continuity term ending with the 6th form ዐ variant",
        "imageUrl": "https://images.unsplash.com/photo-1532431713501-a0f3a48c0f86?w=600",
        "audioName": "zere"
      },
      {
        "word": "ዞረ",
        "phonetic": "Zo-re",
        "englishMeaning": "He encompassed / He traversed",
        "hint": "Classical physical motion or movement verb starting with the 7th form ዞ",
        "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
        "audioName": "zore"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ዘ",
        "instructions": "Draw the straight horizontal crossbar top line first, then extend the angular center stroke down down-left gracefully."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical legal pronoun 'ዛቲ'. Which specific form from the family starts it?",
        "options": ["ዘ", "ዛ", "ዞ"],
        "correctAnswer": "ዛ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ዘመነ", "meaning": "Time / Era"},
          {"symbol": "ዜማ", "meaning": "Sacred Chant"},
          {"symbol": "ዝንቱ", "meaning": "This (Masculine)"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ዜማ",
        "audioClipUrl": "/audio/geez/ziema.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_ze",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ዘ",
        "distractors": ["የ", "በ", "ከ", "ዘ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["zie", "ma"],
        "targetWord": "ዜማ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ዘመነ", "matchId": "era_match"},
          {"id": 2, "content": "Time / Era", "matchId": "era_match"},
          {"id": 3, "content": "ዛቲ", "matchId": "this_match"},
          {"id": 4, "content": "This (Feminine)", "matchId": "this_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the primary classical demonstrative 'ዝንቱ' mean?",
        "options": ["This one (Masculine)", "That high mountain", "Yesterday morning"],
        "correctAnswer": "This one (Masculine)"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which symbol represents the 5th form (Hamis) of this family?",
        "options": ["ዚ", "ዛ", "ዜ"],
        "correctAnswer": "ዜ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Era / Time': [ _ ] መነ",
        "options": ["ዘ", "ዛ", "ዝ"],
        "correctAnswer": "ዘ"
      }
    ]
  },
  {
    "lessonId": 21,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፳፩",
    "title": "ምዕራፍ ፳፩ — Meraf 21: The ዠ (Zhe) Family & Ancient Words",
    "objective": "Master the full ዠ family from ዠ to ዦ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ዠ", "sound": "zhe"},
      {"symbol": "ዡ", "sound": "zhu"},
      {"symbol": "ዢ", "sound": "zhi"},
      {"symbol": "ዣ", "sound": "zha"},
      {"symbol": "ዤ", "sound": "zhie"},
      {"symbol": "ዥ", "sound": "zh"},
      {"symbol": "ዦ", "sound": "zho"}
    ],
    "vocabulary": [
      {
        "word": "ዋዠረ",
        "phonetic": "Wa-zhe-re",
        "englishMeaning": "He mixed / He intermingled",
        "hint": "An ancient descriptive verb meaning to combine components, using the 1st form ዠ",
        "imageUrl": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600",
        "audioName": "wazhere"
      },
      {
        "word": "ዠንየ",
        "phonetic": "Zhe-nye",
        "englishMeaning": "To flow out / To trickle",
        "hint": "A rare classical text verb describing liquid movement, starting with 1st form ዠ",
        "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
        "audioName": "zhenye"
      },
      {
        "word": "ገዠረ",
        "phonetic": "Ge-zhe-re",
        "englishMeaning": "He grew long / He grew tall",
        "hint": "An ancient measurement or stature descriptor utilizing the 1st form ዠ",
        "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
        "audioName": "gezhere"
      },
      {
        "word": "ዠመረ",
        "phonetic": "Zhe-me-re",
        "englishMeaning": "He assigned a task / He designated",
        "hint": "Classical administrative text root variant denoting an assignment",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "zhemere"
      },
      {
        "word": "ታዠ",
        "phonetic": "Ta-zhe",
        "englishMeaning": "To look upon / To observe closely",
        "hint": "Ancient descriptive text root verb ending with the 1st form ዠ",
        "imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
        "audioName": "tazhe"
      },
      {
        "word": "ዠለፈ",
        "phonetic": "Zhe-le-fe",
        "englishMeaning": "He reproved / He corrected",
        "hint": "A manuscript discipline verb meaning to counsel or admonish",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600",
        "audioName": "zhelefe"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ዠ",
        "instructions": "Trace the 'ዘ' baseline structure first, then place the distinctive horizontal flag across its top crossbar."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical word 'ዠንየ'. Which specific form from this family starts the word?",
        "options": ["ዠ", "ዣ", "ዦ"],
        "correctAnswer": "ዠ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ዋዠረ", "meaning": "He mixed"},
          {"symbol": "ዠንየ", "meaning": "To flow out"},
          {"symbol": "ዠለፈ", "meaning": "He reproved"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ዠንየ",
        "audioClipUrl": "/audio/geez/zhenye.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_zhe",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ዠ",
        "distractors": ["ዘ", "ቸ", "ኘ", "ዠ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["wa", "zhe", "re"],
        "targetWord": "ዋዠረ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ዠለፈ", "matchId": "reprove_match"},
          {"id": 2, "content": "He reproved", "matchId": "reprove_match"},
          {"id": 3, "content": "ገዠረ", "matchId": "tall_match"},
          {"id": 4, "content": "He grew tall", "matchId": "tall_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the classical text verb 'ዠለፈ' mean?",
        "options": ["He reproved / He corrected", "He built a wall", "He swam a river"],
        "correctAnswer": "He reproved / He corrected"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 1st form (Geez) of this family?",
        "options": ["ዠ", "ዢ", "ዥ"],
        "correctAnswer": "ዠ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'To flow out': [ _ ] ንየ",
        "options": ["ዠ", "ዣ", "ዦ"],
        "correctAnswer": "ዠ"
      }
    ]
  },
  {
    "lessonId": 22,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፳፪",
    "title": "ምዕራፍ ፳፪ — Meraf 22: The የ (Ye) Family & Ancient Words",
    "objective": "Master the full የ family from የ to ዮ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "የ", "sound": "ye"},
      {"symbol": "ዩ", "sound": "yu"},
      {"symbol": "ዪ", "sound": "yi"},
      {"symbol": "ያ", "sound": "ya"},
      {"symbol": "ዬ", "sound": "yie"},
      {"symbol": "ይ", "sound": "y"},
      {"symbol": "ዮ", "sound": "yo"}
    ],
    "vocabulary": [
      {
        "word": "ዮም",
        "phonetic": "Yom",
        "englishMeaning": "Today / This day",
        "hint": "A pure, highly prominent classical temporal adverb, starting with the 7th form ዮ",
        "imageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600",
        "audioName": "yom"
      },
      {
        "word": "ያሬድ",
        "phonetic": "Ya-ried",
        "englishMeaning": "Yared (Ancient Sacred Composer)",
        "hint": "The ultimate historical name tied to Ge'ez vocal arts, starting with the 4th form ያ",
        "imageUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600",
        "audioName": "yared"
      },
      {
        "word": "የማን",
        "phonetic": "Ye-man",
        "englishMeaning": "Right side / Right hand",
        "hint": "Classical structural or directional marker meaning the side of honor, starting with 1st form የ",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600",
        "audioName": "yeman"
      },
      {
        "word": "ይሁዳ",
        "phonetic": "Ye-hoo-da",
        "englishMeaning": "Judah",
        "hint": "An iconic ancient text tribal and lineage designation, starting with the 6th form ይ",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
        "audioName": "yehuda"
      },
      {
        "word": "ማርያም",
        "phonetic": "Mar-yam",
        "englishMeaning": "Mary",
        "hint": "A prominent ancient text historical descriptor, utilizing the 6th form ይ at its center block",
        "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600",
        "audioName": "maryam"
      },
      {
        "word": "ዮርዳኖስ",
        "phonetic": "Yor-da-nos",
        "englishMeaning": "Jordan (The River / Body of water)",
        "hint": "Foundational geographic historical reference node, starting with the 7th form ዮ",
        "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
        "audioName": "yordanos"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "የ",
        "instructions": "Draw the lower baseline curve up-right, then add the clear vertical dividing prong straight down the middle center."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical adverb 'ዮም'. Which form of the 'የ' family initiates this text block?",
        "options": ["የ", "ያ", "ዮ"],
        "correctAnswer": "ዮ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ዮም", "meaning": "Today / This day"},
          {"symbol": "የማን", "meaning": "Right side"},
          {"symbol": "ይሁዳ", "meaning": "Judah"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ዮም",
        "audioClipUrl": "/audio/geez/yom.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_ye",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "የ",
        "distractors": ["በ", "ለ", "ተ", "የ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["yo", "m"],
        "targetWord": "ዮም"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "የማን", "matchId": "right_match"},
          {"id": 2, "content": "Right side", "matchId": "right_match"},
          {"id": 3, "content": "ያሬድ", "matchId": "yared_match"},
          {"id": 4, "content": "Yared", "matchId": "yared_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the vital classical temporal term 'ዮም' mean?",
        "options": ["Today / This day", "Tomorrow evening", "Ancient times"],
        "correctAnswer": "Today / This day"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 7th form (Sabe'e) of this family?",
        "options": ["ዩ", "ያ", "ዮ"],
        "correctAnswer": "ዮ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the name for the legendary composer: [ _ ] ሬድ",
        "options": ["የ", "ያ", "ይ"],
        "correctAnswer": "ያ"
      }
    ]
  },
  {
    "lessonId": 23,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፳፫",
    "title": "ምዕራፍ ፳፫ — Meraf 23: The ደ (De) Family & Ancient Words",
    "objective": "Master the full ደ family from ደ to ዶ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ደ", "sound": "de"},
      {"symbol": "ዱ", "sound": "du"},
      {"symbol": "ዲ", "sound": "di"},
      {"symbol": "ዳ", "sound": "da"},
      {"symbol": "ዴ", "sound": "die"},
      {"symbol": "ድ", "sound": "d"},
      {"symbol": "ዶ", "sound": "do"}
    ],
    "vocabulary": [
      {
        "word": "ደም",
        "phonetic": "Dem",
        "englishMeaning": "Blood",
        "hint": "A fundamental organic root noun appearing across earliest source files, starting with 1st form ደ",
        "imageUrl": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600",
        "audioName": "dem"
      },
      {
        "word": "ደብር",
        "phonetic": "Deb-re",
        "englishMeaning": "Mountain or Sanctuary Site",
        "hint": "Refers strictly to highlands or sacred monastic mountaintops in historical contexts",
        "imageUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
        "audioName": "debre"
      },
      {
        "word": "ዳዊት",
        "phonetic": "Da-weet",
        "englishMeaning": "David",
        "hint": "An iconic historical text profile and manuscript collection name, starting with the 4th form ዳ",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
        "audioName": "daweet"
      },
      {
        "word": "ዲያቆን",
        "phonetic": "Dee-ya-qon",
        "englishMeaning": "Deacon / Server",
        "hint": "An ancient administrative liturgical office holder, starting with the 3rd form ዲ",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600",
        "audioName": "deeyaqon"
      },
      {
        "word": "ደናግል",
        "phonetic": "De-na-gel",
        "englishMeaning": "Virgins / Pure ones",
        "hint": "A plural structural descriptive class found throughout classical texts, starting with 1st form ደ",
        "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600",
        "audioName": "denagel"
      },
      {
        "word": "ዶርሆ",
        "phonetic": "Dor-ho",
        "englishMeaning": "Cock / Rooster",
        "hint": "The precise pure classical term for this domestic bird, starting with the 7th form ዶ",
        "imageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
        "audioName": "dorho"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ደ",
        "instructions": "Draw the lower curved shelf structure right, then execute the angled top canopy framework downwards."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical architectural noun 'ደብር'. Which basic letter opens the text entry?",
        "options": ["ደ", "ዲ", "ዶ"],
        "correctAnswer": "ደ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ደብር", "meaning": "Mountain / Sanctuary"},
          {"symbol": "ዳዊት", "meaning": "David"},
          {"symbol": "ዶርሆ", "meaning": "Rooster"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ደብር",
        "audioClipUrl": "/audio/geez/debre.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_de",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ደ",
        "distractors": ["ጀ", "የ", "በ", "ደ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["deb", "re"],
        "targetWord": "ደብር"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ደብር", "matchId": "mount_match"},
          {"id": 2, "content": "Mountain", "matchId": "mount_match"},
          {"id": 3, "content": "ዶርሆ", "matchId": "rooster_match"},
          {"id": 4, "content": "Rooster", "matchId": "rooster_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the pure classical word 'ደብር' mean?",
        "options": ["Mountain or Sanctuary", "A wide ocean", "An iron shield"],
        "correctAnswer": "Mountain or Sanctuary"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which symbol represents the 4th form (Rabe'e) of this family?",
        "options": ["ዱ", "ዲ", "ዳ"],
        "correctAnswer": "ዳ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the ancient term for Rooster: [ _ ] ርሆ",
        "options": ["ደ", "ዳ", "ዶ"],
        "correctAnswer": "ዶ"
      }
    ]
  },
  {
    "lessonId": 24,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፳፬",
    "title": "ምዕራፍ ፳፬ — Meraf 24: The ጀ (Je) Family & Ancient Words",
    "objective": "Master the full ጀ family from ጀ to ጆ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ጀ", "sound": "je"},
      {"symbol": "ጁ", "sound": "ju"},
      {"symbol": "ጂ", "sound": "ji"},
      {"symbol": "ጃ", "sound": "ja"},
      {"symbol": "ጄ", "sound": "jie"},
      {"symbol": "ጅ", "sound": "j"},
      {"symbol": "ጆ", "sound": "jo"}
    ],
    "vocabulary": [
      {
        "word": "ጀብሊ",
        "phonetic": "Jeb-lee",
        "englishMeaning": "Shield or Defensive armor",
        "hint": "An ancient protective military gear noun, starting with the 1st form ጀ",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "jebli"
      },
      {
        "word": "ዋጀ",
        "phonetic": "Wa-je",
        "englishMeaning": "He paid ransom / He redeemed",
        "hint": "A rare classical transaction or legal root verb ending in the 1st form ጀ",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600",
        "audioName": "waje"
      },
      {
        "word": "ማጀር",
        "phonetic": "Ma-jer",
        "englishMeaning": "Sickle or Reaping hook",
        "hint": "An ancient agricultural tool mentioned in harvest texts, using 1st form ጀ at its center",
        "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
        "audioName": "majer"
      },
      {
        "word": "ፈጀ",
        "phonetic": "Fe-je",
        "englishMeaning": "He consumed / He brought to an end",
        "hint": "An active narrative completion root verb ending with the 1st form ጀ",
        "imageUrl": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600",
        "audioName": "feje"
      },
      {
        "word": "ጀርጋ",
        "phonetic": "Jer-ga",
        "englishMeaning": "Woven tapestry or Curtain",
        "hint": "Refers to physical dividers used inside sanctuary spaces, starting with the 1st form ጀ",
        "imageUrl": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600",
        "audioName": "jerga"
      },
      {
        "word": "ጆር",
        "phonetic": "Jor",
        "englishMeaning": "To search out / To track",
        "hint": "An old manuscript hunting or exploring baseline verb starting with the 7th form ጆ",
        "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
        "audioName": "jor"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ጀ",
        "instructions": "Trace the lower horizontal bracket line of 'ደ' first, then add the clear top horizontal flag across the frame apex."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical military noun 'ጀብሊ'. Which specific form opens the word?",
        "options": ["ጀ", "ጃ", "ጆ"],
        "correctAnswer": "ጀ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ጀብሊ", "meaning": "Shield / Armor"},
          {"symbol": "ማጀር", "meaning": "Sickle / Hook"},
          {"symbol": "ጀርጋ", "meaning": "Tapestry"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ጀብሊ",
        "audioClipUrl": "/audio/geez/jebli.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_je",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ጀ",
        "distractors": ["ደ", "ቸ", "ገ", "ጀ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["jeb", "li"],
        "targetWord": "ጀብሊ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ጀብሊ", "matchId": "shield_match"},
          {"id": 2, "content": "Shield", "matchId": "shield_match"},
          {"id": 3, "content": "ማጀር", "matchId": "sickle_match"},
          {"id": 4, "content": "Sickle", "matchId": "sickle_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the pure classical Ge'ez word 'ጀብሊ' represent?",
        "options": ["A shield or armor", "A wide highway", "A crown prince"],
        "correctAnswer": "A shield or armor"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 7th form (Sabe'e) of this family?",
        "options": ["ጁ", "ጄ", "ጆ"],
        "correctAnswer": "ጆ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Sickle': ማ [ _ ] ር",
        "options": ["ጀ", "ጃ", "ጅ"],
        "correctAnswer": "ጀ"
      }
    ]
  },
  {
    "lessonId": 25,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፳፭",
    "title": "ምዕራፍ ፳፭ — Meraf 25: The ገ (Ge) Family & Ancient Words",
    "objective": "Master the full ገ family from ገ to ጎ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ገ", "sound": "ge"},
      {"symbol": "ጉ", "sound": "gu"},
      {"symbol": "ጊ", "sound": "gi"},
      {"symbol": "ጋ", "sound": "ga"},
      {"symbol": "ጌ", "sound": "gie"},
      {"symbol": "ግ", "sound": "g"},
      {"symbol": "ጎ", "sound": "go"}
    ],
    "vocabulary": [
      {
        "word": "ገብዝ",
        "phonetic": "Geb-ez",
        "englishMeaning": "Custodian or Administrator",
        "hint": "Refers strictly to an overseer of a treasury or building, starting with 1st form ገ",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "gebz"
      },
      {
        "word": "ገመድ",
        "phonetic": "Ge-med",
        "englishMeaning": "Measuring cord or Line",
        "hint": "An ancient land or property measurement device, starting with 1st form ገ and ending in ደ",
        "imageUrl": "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=600",
        "audioName": "gemed"
      },
      {
        "word": "ጋሻ",
        "phonetic": "Ga-sha",
        "englishMeaning": "Unit of land measure or Shield",
        "hint": "An old standard geographical land allotment term, starting with the 4th form ጋ",
        "imageUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
        "audioName": "gasha"
      },
      {
        "word": "ግብር",
        "phonetic": "Geb-re",
        "englishMeaning": "Deed, Work, or Tribute",
        "hint": "A major foundational administrative and structural text node, starting with the 6th form ግ",
        "imageUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600",
        "audioName": "gibre"
      },
      {
        "word": "ጉባኤ",
        "phonetic": "Goo-ba-'ie",
        "englishMeaning": "Assembly, Council, or Collection",
        "hint": "Refers to a formal historical gathering or text compilation, starting with the 2nd form ጉ",
        "imageUrl": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
        "audioName": "gubae"
      },
      {
        "word": "ጎልጎታ",
        "phonetic": "Gol-go-ta",
        "englishMeaning": "Golgotha (The historical site)",
        "hint": "A highly specific classical manuscript location noun, starting with the 7th form ጎ",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
        "audioName": "golgota"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ገ",
        "instructions": "Draw the left vertical leg down first, then angle the top bar across and down into the longer right structural leg."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical structural term 'ግብር'. Which specific variant anchors this noun?",
        "options": ["ገ", "ጋ", "ግ"],
        "correctAnswer": "ግ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ገብዝ", "meaning": "Custodian"},
          {"symbol": "ግብር", "meaning": "Work / Deed"},
          {"symbol": "ጉባኤ", "meaning": "Assembly / Council"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ጉባኤ",
        "audioClipUrl": "/audio/geez/gubae.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_ge",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ገ",
        "distractors": ["ሀ", "ለ", "ከ", "ገ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["goo", "ba", "ee"],
        "targetWord": "ጉባኤ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ገብዝ", "matchId": "custodian_match"},
          {"id": 2, "content": "Custodian", "matchId": "custodian_match"},
          {"id": 3, "content": "ጉባኤ", "matchId": "council_match"},
          {"id": 4, "content": "Assembly", "matchId": "council_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the ancient text parameter 'ጉባኤ' mean?",
        "options": ["Assembly or Council", "A deep river", "A gold coin"],
        "correctAnswer": "Assembly or Council"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 6th form (Sadis) of this family?",
        "options": ["ጉ", "ጊ", "ግ"],
        "correctAnswer": "ግ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Custodian': [ _ ] ብዝ",
        "options": ["ገ", "ጋ", "ግ"],
        "correctAnswer": "ገ"
      }
    ]
  },
  {
    "lessonId": 26,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፳፮",
    "title": "ምዕራፍ ፳፮ — Meraf 26: The ጠ (T'e) Family & Ancient Words",
    "objective": "Master the full ጠ family from ጠ to ጦ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ጠ", "sound": "te_ejective"},
      {"symbol": "ጡ", "sound": "tu_ejective"},
      {"symbol": "ጢ", "sound": "ti_ejective"},
      {"symbol": "ጣ", "sound": "ta_ejective"},
      {"symbol": "ጤ", "sound": "tie_ejective"},
      {"symbol": "ጥ", "sound": "t_ejective"},
      {"symbol": "ጦ", "sound": "to_ejective"}
    ],
    "vocabulary": [
      {
        "word": "ጠቢብ",
        "phonetic": "Te-beeb",
        "englishMeaning": "Wise person / Sage / Architect",
        "hint": "Refers to exceptional wisdom or masterful craftsmen in ancient texts, starting with 1st form ጠ",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "tebeeb"
      },
      {
        "word": "ጥላይ",
        "phonetic": "Te-lay",
        "englishMeaning": "Shadow, Shade, or Protection",
        "hint": "A pure metaphorical or physical descriptor for shelter, starting with the 6th form @s",
        "imageUrl": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600",
        "audioName": "tlay"
      },
      {
        "word": "ጣዖት",
        "phonetic": "Ta-'ot",
        "englishMeaning": "Idol or False effigy",
        "hint": "An important text term highlighting historical theological transitions, starting with 4th form ጣ",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600",
        "audioName": "taot"
      },
      {
        "word": "ጥዒና",
        "phonetic": "Tee-na",
        "englishMeaning": "Health / Wholeness / Soundness",
        "hint": "Classical root term for physiological or systemic well-being, starting with the 6th form @s",
        "imageUrl": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600",
        "audioName": "tiina"
      },
      {
        "word": "ጡዋፍ",
        "phonetic": "Too-af",
        "englishMeaning": "Taper, Candle, or Sacred Wax",
        "hint": "Refers to traditional illumination elements inside stone buildings, starting with 2nd form ጡ",
        "imageUrl": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600",
        "audioName": "tooaf"
      },
      {
        "word": "ጦማር",
        "phonetic": "To-mar",
        "englishMeaning": "Scroll, Document, or Epistolary book",
        "hint": "The technical classical term for a written document or parchment sheet, starting with 7th form ጦ",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
        "audioName": "tomar"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ጠ",
        "instructions": "Draw the lower curved loop structure smoothly, capping it off cleanly at the top with a distinct horizontal crossbar line."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical text term 'ጦማር'. Which specific ejective form launches this document noun?",
        "options": ["ጠ", "ጣ", "ጦ"],
        "correctAnswer": "ጦ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ጠቢብ", "meaning": "Wise / Sage"},
          {"symbol": "ጦማር", "meaning": "Scroll / Document"},
          {"symbol": "ጥላይ", "meaning": "Shadow / Shade"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ጦማር",
        "audioClipUrl": "/audio/geez/tomar.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_te",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ጠ",
        "distractors": ["የ", "በ", "ቀ", "ጠ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["to", "mar"],
        "targetWord": "ጦማር"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ጠቢብ", "matchId": "sage_match"},
          {"id": 2, "content": "Wise Person", "matchId": "sage_match"},
          {"id": 3, "content": "ጦማር", "matchId": "scroll_match"},
          {"id": 4, "content": "Scroll / Document", "matchId": "scroll_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the specialized classical word 'ጦማር' mean?",
        "options": ["Scroll / Document", "An iron weapon", "A dynamic river"],
        "correctAnswer": "Scroll / Document"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 7th form (Sabe'e) of this ejective family?",
        "options": ["ጡ", "ጣ", "ጦ"],
        "correctAnswer": "ጦ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Wise person': [ _ ] ቢብ",
        "options": ["ጠ", "ጣ", "ጥ"],
        "correctAnswer": "ጠ"
      }
    ]
  },
  {
    "lessonId": 27,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፳፯",
    "title": "ምዕራፍ ፳፯ — Meraf 27: The ጨ (Ch'e) Family & Ancient Words",
    "objective": "Master the full ጨ family from ጨ to ጮ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ጨ", "sound": "che_ejective"},
      {"symbol": "ጩ", "sound": "chu_ejective"},
      {"symbol": "ጪ", "sound": "chi_ejective"},
      {"symbol": "ጫ", "sound": "cha_ejective"},
      {"symbol": "ጬ", "sound": "chie_ejective"},
      {"symbol": "ጭ", "sound": "ch_ejective"},
      {"symbol": "ጮ", "sound": "cho_ejective"}
    ],
    "vocabulary": [
      {
        "word": "ጨረ",
        "phonetic": "Che-re",
        "englishMeaning": "He shaved / He sheared close",
        "hint": "An ancient legal or descriptive textual verb, using the 1st form ጨ",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "chere"
      },
      {
        "word": "ማጨ",
        "phonetic": "Ma-che",
        "englishMeaning": "He betrothed / He allied by covenant",
        "hint": "A pure classical manuscript agreement root ending in the 1st form ጨ",
        "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600",
        "audioName": "mache"
      },
      {
        "word": "ጭፍሪክ",
        "phonetic": "Chif-reek",
        "englishMeaning": "Thicket or Dense brushwood",
        "hint": "An early geographical land descriptor used in ancient text boundary records, starting with 6th form ጭ",
        "imageUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
        "audioName": "chifrik"
      },
      {
        "word": "ጫሕመ",
        "phonetic": "Chah-me",
        "englishMeaning": "He became gray-haired / He aged gracefully",
        "hint": "A status or physical descriptive verb found in narrative texts, starting with 4th form ጫ",
        "imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
        "audioName": "chahme"
      },
      {
        "word": "ጨለተ",
        "phonetic": "Che-le-te",
        "englishMeaning": "He drank completely / He drained",
        "hint": "An old standard behavioral text root verb utilizing the 1st form ጨ",
        "imageUrl": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600",
        "audioName": "chelete"
      },
      {
        "word": "ጮረ",
        "phonetic": "Cho-re",
        "englishMeaning": "To beam / To flash light",
        "hint": "An illuminating literary root describing high-intensity light sources, starting with 7th form ጮ",
        "imageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600",
        "audioName": "chore"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ጨ",
        "instructions": "Form the base loop system of 'ጠ' first, then append the distinctive horizontal top flag directly across the frame crown."
      },
      {
        "type": "identify",
        "prompt": "Look at the geographical noun 'ጭፍሪክ'. Which specific variant initiates this text block?",
        "options": ["ጨ", "ጫ", "ጭ"],
        "correctAnswer": "ጭ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ማጨ", "meaning": "He betrothed"},
          {"symbol": "ጭፍሪክ", "meaning": "Thicket / Brush"},
          {"symbol": "ጮረ", "meaning": "To beam light"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ጭፍሪክ",
        "audioClipUrl": "/audio/geez/chifrik.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_che",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ጨ",
        "distractors": ["ጠ", "በ", "ጀ", "ጨ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["chif", "reek"],
        "targetWord": "ጭፍሪክ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ማጨ", "matchId": "covenant_match"},
          {"id": 2, "content": "He betrothed", "matchId": "covenant_match"},
          {"id": 3, "content": "ጭፍሪክ", "matchId": "brush_match"},
          {"id": 4, "content": "Thicket / Brushwood", "matchId": "brush_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the ancient land description term 'ጭፍሪክ' mean?",
        "options": ["Thicket or Dense brushwood", "A brick fortress", "A clean waterway"],
        "correctAnswer": "Thicket or Dense brushwood"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 6th form (Sadis) of this ejective family?",
        "options": ["ጪ", "ጬ", "ጭ"],
        "correctAnswer": "ጭ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'He shaved': [ _ ] ረ",
        "options": ["ጨ", "ጫ", "ጮ"],
        "correctAnswer": "ጨ"
      }
    ]
  },
  {
    "lessonId": 28,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፳፰",
    "title": "ምዕራፍ ፳፰ — Meraf 28: The ጰ (P'ey) Family & Ancient Words",
    "objective": "Master the full ጰ family from ጰ to ጶ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ጰ", "sound": "pe_ejective"},
      {"symbol": "ጱ", "sound": "pu_ejective"},
      {"symbol": "ጲ", "sound": "pi_ejective"},
      {"symbol": "ጳ", "sound": "pa_ejective"},
      {"symbol": "ጴ", "sound": "pie_ejective"},
      {"symbol": "ጵ", "sound": "p_ejective"},
      {"symbol": "ጶ", "sound": "po_ejective"}
    ],
    "vocabulary": [
      {
        "word": "ጳጳስ",
        "phonetic": "Pa-pas",
        "englishMeaning": "Bishop / Prelate",
        "hint": "The ultimate classic text title for supreme administrative leadership, utilizing the 4th form ጳ twice",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "papas"
      },
      {
        "word": "ፓትርያርክ",
        "phonetic": "Pa-tree-yar-k",
        "englishMeaning": "Patriarch / Chief Head",
        "hint": "Highest rank governance anchor term within manuscript records, opening with the 4th form ጳ variant",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600",
        "audioName": "pateryan"
      },
      {
        "word": "ጴጥሮስ",
        "phonetic": "Pie-tros",
        "englishMeaning": "Peter (The Rock / Historical name)",
        "hint": "A vital foundational historical profile entry, starting out with the 5th form ጴ",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
        "audioName": "peetros"
      },
      {
        "word": "ጰንጠቆስጤ",
        "phonetic": "Pen-te-qos-tie",
        "englishMeaning": "Pentecost (The ancient festival day)",
        "hint": "A vital chronological text parameter marking historical cycles, opening with 1st form ጰ",
        "imageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600",
        "audioName": "penteqoste"
      },
      {
        "word": "ጲላጦስ",
        "phonetic": "Pee-la-tos",
        "englishMeaning": "Pilate (Historical governance figure)",
        "hint": "An administrative leadership figure name appearing in historical chronicles, starting with 3rd form ጲ",
        "imageUrl": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
        "audioName": "peelatos"
      },
      {
        "word": "ጵርስቅላ",
        "phonetic": "Per-se-qila",
        "englishMeaning": "Priscilla (Historical text profile)",
        "hint": "A specific historical biographical catalog profile, starting with the 6th form ጵ",
        "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600",
        "audioName": "perseqila"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ጰ",
        "instructions": "Draw the lower circular frame loop first, capping the structural setup cleanly with a distinct horizontal header line."
      },
      {
        "type": "identify",
        "prompt": "Look at the historical title 'ጳጳስ'. Which specific variation double-anchors this text entry?",
        "options": ["ጰ", "ጳ", "ጴ"],
        "correctAnswer": "ጳ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ጳጳስ", "meaning": "Bishop"},
          {"symbol": "ጴጥሮስ", "meaning": "Peter"},
          {"symbol": "ጰንጠቆስጤ", "meaning": "Pentecost"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ጳጳስ",
        "audioClipUrl": "/audio/geez/papas.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_pe",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ጰ",
        "distractors": ["በ", "ለ", "ቀ", "ጰ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["pa", "pas"],
        "targetWord": "ጳጳስ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ጳጳስ", "matchId": "bishop_match"},
          {"id": 2, "content": "Bishop / Prelate", "matchId": "bishop_match"},
          {"id": 3, "content": "ጴጥሮስ", "matchId": "peter_match"},
          {"id": 4, "content": "Peter", "matchId": "peter_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the classical text title 'ጳጳስ' represent?",
        "options": ["Bishop or Prelate", "A massive ship", "An iron crown"],
        "correctAnswer": "Bishop or Prelate"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 4th form (Rabe'e) of this ejective family?",
        "options": ["ጰ", "ጲ", "ጳ"],
        "correctAnswer": "ጳ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the name for 'Peter': [ _ ] ጥሮስ",
        "options": ["ጰ", "ጴ", "ጶ"],
        "correctAnswer": "ጴ"
      }
    ]
  },
  {
    "lessonId": 29,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፳፱",
    "title": "ምዕራፍ ፳፱ — Meraf 29: The ጸ (Tsedey) Family & Ancient Words",
    "objective": "Master the full ጸ family from ጸ to ጾ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ጸ", "sound": "tse_ejective"},
      {"symbol": "ጹ", "sound": "tsu_ejective"},
      {"symbol": "ጺ", "sound": "tsi_ejective"},
      {"symbol": "ጻ", "sound": "tsa_ejective"},
      {"symbol": "ጼ", "sound": "tsie_ejective"},
      {"symbol": "ጽ", "sound": "ts_ejective"},
      {"symbol": "ጾ", "sound": "tso_ejective"}
    ],
    "vocabulary": [
      {
        "word": "ጸለምተ",
        "phonetic": "Tse-lem-te",
        "englishMeaning": "They became dark / They were obscured",
        "hint": "A descriptive state verb found in ancient landscape and cosmos descriptions, starting with 1st form ጸ",
        "imageUrl": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600",
        "audioName": "tselmu"
      },
      {
        "word": "ጸዋዕ",
        "phonetic": "Tse-wa'",
        "englishMeaning": "Cup or Chalice or Vessel",
        "hint": "A standard architectural or ceremonial object noun, starting with the 1st form ጸ",
        "imageUrl": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600",
        "audioName": "tsewa"
      },
      {
        "word": "ጻድቅ",
        "phonetic": "Tsad-q",
        "englishMeaning": "Righteous individual / Just one",
        "hint": "A highly prominent ethical character designation in classical text files, starting with 4th form ጻ",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "tsadq"
      },
      {
        "word": "ጽላት",
        "phonetic": "Tsee-lat",
        "englishMeaning": "Tablet or Sacred Slab",
        "hint": "Foundational systemic object descriptor within structural texts, starting with 6th form ጽ",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
        "audioName": "tsilat"
      },
      {
        "word": "ጸሎት",
        "phonetic": "Tse-lot",
        "englishMeaning": "Petition or Prayer",
        "hint": "A foundational text action node representing communication, starting with 1st form ጸ",
        "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600",
        "audioName": "tselot"
      },
      {
        "word": "ጾም",
        "phonetic": "Tsom",
        "englishMeaning": "Abstinence / Fasting period",
        "hint": "A major dynamic structural calendar term in classical manuscripts, starting with 7th form ጾ",
        "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
        "audioName": "tsom"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ጸ",
        "instructions": "Execute the dual loops side-by-side along the base, drawing up into a unified right-angled peak."
      },
      {
        "type": "identify",
        "prompt": "Look at the core noun 'ጽላት'. Which specific structural form sets up this entry?",
        "options": ["ጸ", "ጻ", "ጽ"],
        "correctAnswer": "ጽ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ጻድቅ", "meaning": "Righteous / Just"},
          {"symbol": "ጽላት", "meaning": "Tablet / Slab"},
          {"symbol": "ጾም", "meaning": "Abstinence / Fast"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ጽላት",
        "audioClipUrl": "/audio/geez/tsilat.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_tse",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ጸ",
        "distractors": ["በ", "ቀ", "ዕ", "ጸ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["tsi", "lat"],
        "targetWord": "ጽላት"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ጻድቅ", "matchId": "just_match"},
          {"id": 2, "content": "Righteous", "matchId": "just_match"},
          {"id": 3, "content": "ጾም", "matchId": "fast_match"},
          {"id": 4, "content": "Fasting period", "matchId": "fast_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the vital classical character trait 'ጻድቅ' mean?",
        "options": ["Righteous individual / Just one", "An elite soldier", "A swift horse"],
        "correctAnswer": "Righteous individual / Just one"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 6th form (Sadis) of this family?",
        "options": ["ጹ", "ጺ", "ጽ"],
        "correctAnswer": "ጽ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Cup / Chalice': [ _ ] 瓦ዕ",
        "options": ["ጸ", "ጻ", "ጾ"],
        "correctAnswer": "ጸ"
      }
    ]
  },
  {
    "lessonId": 30,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፴",
    "title": "ምዕራፍ ፴ — Meraf 30: The ፀ (Tsedey Variant) Family & Ancient Words",
    "objective": "Master the full ፀ family from ፀ to ጦ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ፀ", "sound": "ts_sun"},
      {"symbol": "ፁ", "sound": "tsu_sun"},
      {"symbol": "ጺ", "sound": "tsi_sun"},
      {"symbol": "ፃ", "sound": "tsa_sun"},
      {"symbol": "ፄ", "sound": "tsie_sun"},
      {"symbol": "ፅ", "sound": "tsh_sun"},
      {"symbol": "ፆ", "sound": "tso_sun"}
    ],
    "vocabulary": [
      {
        "word": "ፀሐይ",
        "phonetic": "Tse-hay",
        "englishMeaning": "Sun",
        "hint": "The foundational ancient celestial term for the sun, starting with 1st form ፀ",
        "imageUrl": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600",
        "audioName": "tsehay"
      },
      {
        "word": "ፃማ",
        "phonetic": "Tsa-ma",
        "englishMeaning": "Labor, Toil, or Fatigue",
        "hint": "Refers strictly to hard spiritual or physical exertion in manuscripts, starting with 4th form ፃ",
        "imageUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600",
        "audioName": "tsama"
      },
      {
        "word": "ፅላት",
        "phonetic": "Tsee-lat",
        "englishMeaning": "Tablet / Law Slab Variant",
        "hint": "The historic textual spelling variant for sacred law tablets, starting with 6th form ፅ",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
        "audioName": "tsilat_variant"
      },
      {
        "word": "ፀሩ",
        "phonetic": "Tse-roo",
        "englishMeaning": "His Enemy or Adversary",
        "hint": "An ancient descriptive character reference word, starting with 1st form ፀ",
        "imageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "audioName": "tseroo"
      },
      {
        "word": "ፄዋ",
        "phonetic": "Tshie-wa",
        "englishMeaning": "Captive or Prisoner of War",
        "hint": "An administrative or conflict-narrative noun starting with the 5th form ፄ",
        "imageUrl": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600",
        "audioName": "tshiewa"
      },
      {
        "word": "ፆታ",
        "phonetic": "Tso-ta",
        "englishMeaning": "Kind or Gender or Class",
        "hint": "An old manuscript grammatical classification descriptor starting with 7th form ፆ",
        "imageUrl": "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=600",
        "audioName": "tsota"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ፀ",
        "instructions": "Draw the circular lower frame base first, expanding upward into a clean vertical spine that splits into dual prongs at the top apex."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical celestial word 'ፀሐይ'. Which symbol initiates the noun?",
        "options": ["ፀ", "ፃ", "ፆ"],
        "correctAnswer": "ፀ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ፀሐይ", "meaning": "Sun"},
          {"symbol": "ፃማ", "meaning": "Labor / Toil"},
          {"symbol": "ፆታ", "meaning": "Kind / Class"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ፀሐይ",
        "audioClipUrl": "/audio/geez/tsehay.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_tse_sun",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ፀ",
        "distractors": ["ጸ", "በ", "ቀ", "ፀ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["tse", "hay"],
        "targetWord": "ፀሐይ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ፀሐይ", "matchId": "sun_match"},
          {"id": 2, "content": "Sun", "matchId": "sun_match"},
          {"id": 3, "content": "ፃማ", "matchId": "toil_match"},
          {"id": 4, "content": "Labor / Toil", "matchId": "toil_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the elemental classical Ge'ez word 'ፀሐይ' stand for?",
        "options": ["Sun", "Great Sea", "Strong Tower"],
        "correctAnswer": "Sun"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 4th form (Rabe'e) of this family?",
        "options": ["ፁ", "ጺ", "ፃ"],
        "correctAnswer": "ፃ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the word for 'Labor/Toil': [ _ ] ማ",
        "options": ["ፀ", "ፃ", "ፆ"],
        "correctAnswer": "ፃ"
      }
    ]
  },
  {
    "lessonId": 31,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፴፩",
    "title": "ምዕራፍ ፴፩ — Meraf 31: The ፈ (Fe) Family & Ancient Words",
    "objective": "Master the full ፈ family from ፈ to ፎ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ፈ", "sound": "fe"},
      {"symbol": "ፉ", "sound": "fu"},
      {"symbol": "ፊ", "sound": "fi"},
      {"symbol": "ፋ", "sound": "fa"},
      {"symbol": "ፌ", "sound": "fie"},
      {"symbol": "ፍ", "sound": "f"},
      {"symbol": "ፎ", "sound": "fo"}
    ],
    "vocabulary": [
      {
        "word": "ፈሊጥ",
        "phonetic": "Fe-leet",
        "englishMeaning": "Custom or Principle or Metaphor",
        "hint": "Refers to idiomatic expressions or conceptual patterns in text analysis, starting with 1st form ፈ",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
        "audioName": "feleet"
      },
      {
        "word": "ፍሬ",
        "phonetic": "Fre",
        "englishMeaning": "Fruit or Result or Outcome",
        "hint": "A highly prominent agricultural and abstract qualitative noun, starting with 6th form ፍ",
        "imageUrl": "https://images.unsplash.com/photo-1519999482648-25949f85095e?w=600",
        "audioName": "fre"
      },
      {
        "word": "ፋሲካ",
        "phonetic": "Fa-see-ka",
        "englishMeaning": "Passover / Festival Day",
        "hint": "An iconic historical text timeline parameter, starting with the 4th form ፋ",
        "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600",
        "audioName": "fasika"
      },
      {
        "word": "ፈጠረ",
        "phonetic": "Fe-te-re",
        "englishMeaning": "He created / He shaped",
        "hint": "The fundamental cosmic action verb denoting primary creation, starting with 1st form ፈ",
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
        "audioName": "fetere"
      },
      {
        "word": "ፊልጶስ",
        "phonetic": "Fil-pos",
        "englishMeaning": "Philip",
        "hint": "A foundational biological name variant found in ancient annals, starting with 3rd form ፊ",
        "imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
        "audioName": "filpos"
      },
      {
        "word": "ፎቅ",
        "phonetic": "Foq",
        "englishMeaning": "Upper story / Loft",
        "hint": "Rare architectural description indicating elevation inside ancient structures, starting with 7th form ፎ",
        "imageUrl": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600",
        "audioName": "foq"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ፈ",
        "instructions": "Draw the lower baseline horizontal curve, extending upward on the right and locking it with the small loop attachment."
      },
      {
        "type": "identify",
        "prompt": "Look at the classical text verb 'ፈጠረ'. Which specific form launches the action node?",
        "options": ["ፈ", "ፋ", "ፎ"],
        "correctAnswer": "ፈ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ፈሊጥ", "meaning": "Custom / Principle"},
          {"symbol": "ፍሬ", "meaning": "Fruit / Result"},
          {"symbol": "ፋሲካ", "meaning": "Passover"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ፍሬ",
        "audioClipUrl": "/audio/geez/fre.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_fe",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ፈ",
        "distractors": ["በ", "ለ", "ተ", "ፈ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["fa", "see", "ka"],
        "targetWord": "ፋሲካ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ፍሬ", "matchId": "fruit_match"},
          {"id": 2, "content": "Fruit / Result", "matchId": "fruit_match"},
          {"id": 3, "content": "ፋሲካ", "matchId": "festival_match"},
          {"id": 4, "content": "Passover", "matchId": "festival_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the highly dynamic classical word 'ፍሬ' signify?",
        "options": ["Fruit, Result, or Outcome", "An iron boundary wall", "A deep sand track"],
        "correctAnswer": "Fruit, Result, or Outcome"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 6th form (Sadis) of this family?",
        "options": ["ፊ", "ፌ", "ፍ"],
        "correctAnswer": "ፍ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the cosmic action verb for 'He created': [ _ ] ጠረ",
        "options": ["ፈ", "ፋ", "ፎ"],
        "correctAnswer": "ፈ"
      }
    ]
  },
  {
    "lessonId": 32,
    "courseType": "geez",
    "level": "Geez Level 1",
    "geezNumeral": "፴፪",
    "title": "ምዕራፍ ፴፪ — Meraf 32: The ፐ (Pe) Family & Ancient Words",
    "objective": "Master the final alphabet family from ፐ to ፖ in a single view and study 6 classical Ge'ez vocabulary terms.",
    "fidelFamily": [
      {"symbol": "ፐ", "sound": "pe_latin"},
      {"symbol": "ፑ", "sound": "pu_latin"},
      {"symbol": "ፒ", "sound": "pi_latin"},
      {"symbol": "ፓ", "sound": "pa_latin"},
      {"symbol": "ፔ", "sound": "pie_latin"},
      {"symbol": "ፕ", "sound": "p_latin"},
      {"symbol": "ፖ", "sound": "po_latin"}
    ],
    "vocabulary": [
      {
        "word": "ጳውሎስ",
        "phonetic": "Paw-los",
        "englishMeaning": "Paul (Historical name variant)",
        "hint": "An iconic ancient text name profile found across manuscript libraries, utilizing 7th form ፖ at its tail line",
        "imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
        "audioName": "pawlos"
      },
      {
        "word": "ኤፍራት",
        "phonetic": "Eph-rat",
        "englishMeaning": "Euphrates (The ancient river)",
        "hint": "The legendary geopolitical river found in early geographical texts, ending with the structural 6th form ፕ framework",
        "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
        "audioName": "ephrat"
      },
      {
        "word": "ጲላጦስ",
        "phonetic": "Pee-la-tos Variant",
        "englishMeaning": "Pilate Text Marker",
        "hint": "A textual notation structural reference variation ending with the 7th form ፖ",
        "imageUrl": "https://images.unsplash.com/photo-1590076215667-873d6f009a80?w=600",
        "audioName": "pilatos_variant"
      },
      {
        "word": "ፖሊስ",
        "phonetic": "Po-lees",
        "englishMeaning": "City state or Administrative district",
        "hint": "An ancient classical text transcription for civic zones or administrative cities, starting with 7th form ፖ",
        "imageUrl": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600",
        "audioName": "polees"
      },
      {
        "word": "ፓፒረስ",
        "phonetic": "Pa-pee-rus",
        "englishMeaning": "Papyrus / Ancient Writing Sheet",
        "hint": "The historic botanical fiber material used for writing earliest text files, starting with 4th form ፓ",
        "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
        "audioName": "papyrus"
      },
      {
        "word": "ፕላኔት",
        "phonetic": "Pla-niet",
        "englishMeaning": "Wandering Star / Planet",
        "hint": "An astronomical catalog term referencing celestial bodies, starting with the 6th form ፕ",
        "imageUrl": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600",
        "audioName": "planiet"
      }
    ],
    "activities": [
      {
        "type": "trace",
        "targetSymbol": "ፐ",
        "instructions": "Draw the left leg down, loop across smoothly right, then create the long downward right framework spine of 'ፐ'."
      },
      {
        "type": "identify",
        "prompt": "Look at the ancient material term 'ፓፒረስ'. Which form initiates this artifact description?",
        "options": ["ፐ", "ፓ", "ፖ"],
        "correctAnswer": "ፓ"
      },
      {
        "type": "match",
        "pairs": [
          {"symbol": "ፖሊስ", "meaning": "City / Civic Zone"},
          {"symbol": "ፓፒረስ", "meaning": "Papyrus Paper"},
          {"symbol": "ፕላኔት", "meaning": "Wandering Star"}
        ]
      },
      {
        "type": "pronounce",
        "targetWord": "ፓፒረስ",
        "audioClipUrl": "/audio/geez/papyrus.mp3"
      }
    ],
    "games": [
      {
        "gameId": "find_the_pe_latin",
        "gameType": "grid_catch",
        "title": "Find the Target Symbol",
        "target": "ፐ",
        "distractors": ["በ", "ለ", "የ", "ፐ"],
        "rewardPoints": 15
      },
      {
        "gameId": "sound_match_blender",
        "gameType": "syllable_blender",
        "title": "Syllable Audio Blender",
        "audioSegments": ["pa", "py", "rus"],
        "targetWord": "ፓፒረስ"
      },
      {
        "gameId": "memory_cards",
        "gameType": "card_flip",
        "title": "Ge'ez Card Match",
        "cards": [
          {"id": 1, "content": "ፖሊስ", "matchId": "city_match"},
          {"id": 2, "content": "City State", "matchId": "city_match"},
          {"id": 3, "content": "ፓፒረስ", "matchId": "paper_match"},
          {"id": 4, "content": "Papyrus Paper", "matchId": "paper_match"}
        ]
      }
    ],
    "assessment": [
      {
        "questionId": "q1",
        "questionType": "multiple_choice",
        "questionText": "What does the classical script artifact descriptor 'ፓፒረስ' refer to?",
        "options": ["Papyrus / Ancient Writing Sheet", "An iron furnace", "A mountain pathway"],
        "correctAnswer": "Papyrus / Ancient Writing Sheet"
      },
      {
        "questionId": "q2",
        "questionType": "multiple_choice",
        "questionText": "Which letter represents the 7th form (Sabe'e) of this final family?",
        "options": ["ፑ", "ፓ", "ፖ"],
        "correctAnswer": "ፖ"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "questionText": "Complete the cosmic astronomical word for Planet: [ _ ] ላኔት",
        "options": ["ፐ", "ፕ", "ፖ"],
        "correctAnswer": "ፕ"
      }
    ]
  }
];
