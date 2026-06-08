import { LessonDefinition } from "../../level1/types";

export interface Level4LessonDefinition extends LessonDefinition {
  level: number;
}

export const lessons_1_8: Level4LessonDefinition[] = [
  // --- LESSON 1: Discussing Daily Responsibilities ---
  {
    level: 4,
    lessonNumber: 1,
    geezNumber: "፩",
    topic: "Discussing Daily Responsibilities",
    theme: "Responsibility & Routines (ኃላፊነት)",
    phase: "Level 4 Stage 1: Advanced Self-Expression & Society",
    subheading: "Discuss daily duties, chore sharing, personal obligations, and accountability in a fluent household dialogue.",
    imageUrl: "https://images.unsplash.com/photo-1516534775068-ba3e84589d90?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Articulate daily home and school responsibilities using 'ኃላፊነት' (responsibility).",
      "Explain daily routines with advanced action verb conjugations.",
      "Debate chore distributions respectfully with family members.",
      "Discuss the benefits of discipline, order, and time management."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ኃላፊነት",
        english: "Halafinet",
        meaning: "Responsibility / Duty",
        context: "Every household member has a 'ኃላፊነት' to keep their living space peaceful and cleanly.",
        tutorTip: "Double stress on l. 'Ha-lah-fih-neht'. Speak about mature growth.",
        imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=505&auto=format&fit=crop",
        audioText: "Halafinet. Responsibility."
      },
      {
        fidel: "ተግባር",
        english: "Tegbar",
        meaning: "Task / Action / Duty",
        context: "Putting plans into active motion is a vital 'ተግባር' for successful students.",
        tutorTip: "Refers to physical deeds. 'Tehg-baar'.",
        imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=505&auto=format&fit=crop",
        audioText: "Tegbar. Task."
      },
      {
        fidel: "ውሳኔ",
        english: "Wisane",
        meaning: "Decision / Resolve",
        context: "Making a wise 'ውሳኔ' to complete research papers before attending local movie screens.",
        tutorTip: "A strong cognitive noun: 'Wih-sah-neh'.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=505&auto=format&fit=crop",
        audioText: "Wisane. Decision."
      },
      {
        fidel: "ሰዓት ማክበር",
        english: "Se'at Makber",
        meaning: "Punctuality / Respecting time",
        context: "Arriving exactly on schedule for classes is described as 'ሰዓት ማክበር'.",
        tutorTip: "A vital social virtue compound: 'Seh-aht Mahk-behr'.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Se'at makber. Punctuality."
      },
      {
        fidel: "እቅድ",
        english: "Ekid",
        meaning: "Plan / Agenda",
        context: "Writing down your weekly goals inside a study journal represents a perfect 'እቅድ'.",
        tutorTip: "Crisp consonants: 'Eh-kihd'.",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=505&auto=format&fit=crop",
        audioText: "Ekid. Plan."
      }
    ],
    exercises: [
      {
        amharic: "የእኔ ዋነኛ ኃላፊነት በትምህርቴ ላይ ማተኮር ነው።",
        transliteration: "Yene wanenya halafinet be timihirte lay matekor new.",
        english: "My primary responsibility is to focus on my education.",
        tip: "Point confidently to your study book!"
      },
      {
        amharic: "እኛ የእለት ተግባራችንን በጊዜ እንጨርሳለን።",
        transliteration: "Egna ye'elet tegbarachinin be gize enchenresalen.",
        english: "We finish our daily tasks on time.",
        tip: "Mime tapping a wrist clock with precision!"
      }
    ],
    dialogue: {
      heading: "💬 Organizing Household Duties",
      scenario: "Helen and her brother Kebede coordinate their weekly home chores.",
      roles: [
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "ከበደ ፤ ዛሬ ሳህኖችን የማጠብ ኃላፊነት የእንተ ነው። እቅድህ ምንድነው?",
          transliteration: "Kebede, zare sahnochen yematib halafinet ye'ante new. Ekidih mindnew?",
          english: "Kebede, today the responsibility of washing dishes is yours. What is your plan?"
        },
        {
          character: "Kebede",
          avatar: "👦",
          bubbleSide: "right",
          amharic: "ትክክል ነሽ ፤ ይህንን ተግባር በደስታ እወጣለሁ። ሰዓት ማክበር እፈልጋለሁ!",
          transliteration: "Tikkikl nesh, yihinni tegbar be desta ewitalehu. Se'at makber efeligalehu!",
          english: "You are correct, I will carry out this task with joy. I want to respect the time!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Architecture of Daily Chores",
      passageAmharic: "አልማዝ በትልቅ ከተማ ውስጥ የምትኖር የአስራ አምስት አመት ጎበዝ ተማሪ ናት። እሷ በቤተሰቧ ውስጥ ትልቅ ኃላፊነት አለባት። በየቀኑ ጠዋት በማለዳ ተነስታ ክፍሏን የማጽዳት ተግባር በደስታ ትወጣለች። እሷ 'እቅድ ማውጣትና ሰዓት ማክበር ቀኑን ሙሉ የተረጋጋና ውጤታማ ያደርገኛል' ብላ ታምናለች። ወላጆቿም የእሷን ብልህ ውሳኔ አይተው በታላቅ ኩራት ያበረታቷታል። በአንድነት የሚሰሩ ቤተሰቦች ሁልጊዜ ሰላም እና ስኬትን ያገኛሉ።",
      passageTransliteration: "Almaz be tilik ketema wust yemtinor ye asra amist amet gobez temari nat. Esua be betesebua wust tilik halafinet alebat. Beye-qenu tewat be-maleda tenesta kifluan ye-matsdat tegbar be-desta tewitalech. Esua 'ekid mawtat ena se'at makber qenun mulu ye-teregaga ena wetetama yadergegalehu' bila tamnalech. Welajochuam ye-esuan bilih wisane aytew be-talak kurat yabertatua-tal. Be-andinet yemiseru beteseboch hulgize selam ena siket-in yagegnalu.",
      passageEnglish: "Almaz is a smart fifteen-year-old student living in a big city. She has a huge responsibility in her family. Every morning she rises early to joyfully carry out her room cleaning duties. She believes, 'Drafting plans and keeping time makes my entire day calm and productive'. Her parents, seeing her wise resolve, encourage her with grand pride. Families working in unity always find peace and success.",
      tutorTip: "Praise her proactive routine to encourage personal ownership."
    },
    writing: {
      heading: "✍️ Character Tracing Studio",
      instructions: "Practice tracing the responsibility letters ኃ (Ha) and ተግባር (Teg).",
      lettersToPractice: [
        {
          letter: "ኃ",
          phonetic: "Ha",
          steps: ["Top curved horizontal loop", "Underneath vertical line", "Base leg curl"]
        },
        {
          letter: "ተ",
          phonetic: "Te",
          steps: ["Vertical start left", "Horizontal bridge", "Right downward foot"]
        }
      ],
      wordChallenge: "ኃላፊነት"
    },
    homework: [
      "Detail three daily household chores in Amharic in your language ledger.",
      "Engage a sibling using 'se'at makber' during household events.",
      "Practice tracing the characters ኃ, ኁ, ኂ, ኃ, ኄ, ህ, ሖ five times."
    ],
    submissionTip: "Upload a list of your daily household rules written in Amharic script! 📝",
    parentActivities: [
      "Create a weekly chore chart with children where labels are marked in Amharic: 'ተግባር' and 'ኃላፊነት'."
    ],
    tutorPacing: [
      "10 mins: Icebreaker discussion on household chores.",
      "25 mins: Vocabulary drilling and reading translation analysis.",
      "15 mins: Interactive spelling and game review sessions."
    ],
    tutorTroubleshooting: [
      "Make sure students grasp the throat-friction sound of the character ኃ (Ha)."
    ],
    quiz: [
      {
        questionText: "What does 'ኃላፊነት' mean?",
        options: ["Pencil", "Responsibility / Duty", "Delicious breakfast", "Bicycle"],
        correctAnswerIndex: 1,
        explanation: "'ኃላፊነት' translates directly to responsibility."
      },
      {
        questionText: "Which word represents 'punctuality'?",
        options: ["ውሳኔ", "እቅድ", "ሰዓት ማክበር", "ተግባር"],
        correctAnswerIndex: 2,
        explanation: "'ሰዓት ማክበር' means respecting time / punctuality."
      },
      {
        questionText: "What does 'ውሳኔ' mean?",
        options: ["Decision / Resolve", "To sleep", "Water cup", "Yesterday"],
        correctAnswerIndex: 0,
        explanation: "'ውሳኔ' represents a decision."
      },
      {
        questionText: "How do you say 'Task' or 'Duty'?",
        options: ["ጉብኝት", "ተግባር", "ሙያ", "ባህል"],
        correctAnswerIndex: 1,
        explanation: "'ተግባር' (Tegbar) represents a task or deed."
      }
    ],
    nextLessonTitle: "Solving Everyday Problems"
  },

  // --- LESSON 2: Solving Everyday Problems ---
  {
    level: 4,
    lessonNumber: 2,
    geezNumber: "፪",
    topic: "Solving Everyday Problems",
    theme: "Logic & Solutions (ችግር መፍታት)",
    phase: "Level 4 Stage 1: Advanced Self-Expression & Society",
    subheading: "Gain standard mental resilience and cognitive vocabulary to analyze roadblocks, trace ideas, and implement answers.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Define conflict-resolution compounds: 'ችግር መፍታት' (problem solving).",
      "Explain logic blocks: 'ምክንያት' (reason) and 'መፍትሔ' (solution).",
      "Express alternative viewpoints with compound connectors.",
      "Simulate collaborative boardgame and playground team solutions."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ችግር",
        english: "Chiggir",
        meaning: "Problem / Challenge / Trouble",
        context: "Encountering a complex math test or damaged study desk represents a temporary 'ችግር'.",
        tutorTip: "Double stress on g: 'Chihg-gihr'. Frame as an opportunity.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Chiggir. Problem."
      },
      {
        fidel: "መፍትሔ",
        english: "Meftehe",
        meaning: "Solution / Answer / Remedy",
        context: "With clean collaboration, students will discover the perfect 'መፍትሔ' to classroom hurdles.",
        tutorTip: "Glottal ending: 'Mehf-teh-heh'. Sound of discovery.",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=505&auto=format&fit=crop",
        audioText: "Meftehe. Solution."
      },
      {
        fidel: "ምክንያት",
        english: "Mikniyat",
        meaning: "Reason / Cause / Motive",
        context: "Investigating the true 'ምክንያት' of a system error resolves software bugs perfectly.",
        tutorTip: "Three smooth segments: 'Mihk-nih-yaht'.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=505&auto=format&fit=crop",
        audioText: "Mikniyat. Reason."
      },
      {
        fidel: "ግልጽ",
        english: "Gilts",
        meaning: "Clear / Evident / Obvious",
        context: "Providing a 'ግልጽ' instruction permits team players to complete projects without confusion.",
        tutorTip: "Explosive explosive: 'Gihlts'. Hold on ts.",
        imageUrl: "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?w=505&auto=format&fit=crop",
        audioText: "Gilts. Clear."
      },
      {
        fidel: "ትዕግስት",
        english: "Tigist",
        meaning: "Patience / Tolerance",
        context: "Solving difficult programming and logic loops requires deep 'ትዕግስት' and focus.",
        tutorTip: "Glottal pause in middle: 'Tih-gist'. Elegant noun.",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=505&auto=format&fit=crop",
        audioText: "Tigist. Patience."
      }
    ],
    exercises: [
      {
        amharic: "ለእያንዳንዱ ችግር ሁልጊዜ መፍትሔ አለ።",
        transliteration: "Le'eyandandu chiggir hulgize meftehe ale.",
        english: "For every problem, there is always a solution.",
        tip: "Form a secure key-lock circle with your fingers!"
      },
      {
        amharic: "ችግሩን ለመፍታት ግልጽ ምክንያት እና ትዕግስት ያስፈልገናል።",
        transliteration: "Chiggirun lemefitat gilts mikniyat ena tigist yasfeligenal.",
        english: "To solve the problem, we need a clear reason and patience.",
        tip: "Inhale deeply expressing total calm composure!"
      }
    ],
    dialogue: {
      heading: "💬 Debating Solutions",
      scenario: "Yared helps Sarah figure out why their heritage school project website isn't rendering.",
      roles: [
        {
          character: "Yared",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሳራ ፤ ትልቁ ችግር ምንድነው? ምንም ነገር አልታየኝም።",
          transliteration: "Sarah, tiliku chiggir mindnew? Minim neger altayegn.",
          english: "Sarah, what is the major problem? I cannot see anything."
        },
        {
          character: "Sarah",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "ምክንያቱ ግልጽ አይደለም። ነገር ግን በትዕግስት መፍትሔ መፈለግ አለብን።",
          transliteration: "Mikniyatu gilts aydelem. Neger gin be-tigist meftehe mefeleg alebin.",
          english: "The cause is not clear. But we must seek a solution with patience."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Mystery of the Broken Artifact",
      passageAmharic: "ባለፈው ሳምንት ዳዊትና ጓደኞቹ በታሪካዊ ውይይት ክፍል ውስጥ ትልቅ ችግር አጋጠማቸው። ውድ የሆነው የባህል ቅርጽ ተሰበረ። ሁሉም ተማሪዎች በድንጋጤ ሲጮሁ ፤ ዳዊት በረጋ መንፈስ 'ትዕግስት ይኑረን' አለ። እሱም የተሰበረበትን ምክንያት መጀመሪያ መረመረ። መፍትሔውም ቅርጹን በልዩ የሙጫ አይነት መልሶ ማገናኘት ነበረ። እቅዳቸውን ግልጽ አድርገው በጋራ ሰሩት። በዚህም ምክንያት አስተማሪዋ በመልካም ችግር አፈታት ክህሎታቸው በታላቅ ኩራት አመሰገነቻቸው።",
      passageTransliteration: "Balefew samint Dawit ena gwadeñochu be tarikawi wiyiyit kifil wust tilik chiggir agate machew. Wud yehonew ye bahil qirts tesebere. Hullu temarioch be dngate sichehu; Dawit be rega menfes 'tigist yinuren' ale. Esum yeteseberebetin mikniyat mejemerya meremere. Meftehewim qirtsun be liyu ye mucha aynet melso mageñyet nebere. Ekidachewn gilts adergew be gara serut. Be-zihm mikniyat astemariwa be melkam chiggir afetat kihlotachew be talak kurat amesgenechathew.",
      passageEnglish: "Last week, Dawit and his friends encountered a major problem inside their historic discussion class. The precious cultural artifact broke. While all students cried out in shock, Dawit said in a calm spirit, 'Let's have patience'. He first investigated the cause of its breakage. The solution was to reconnect the artifact using a special glue formulation. Detailing their plan clearly, they worked in cooperation. For this reason, the mentor proudly thanked them for their exceptional trouble-solving expertise.",
      tutorTip: "Dwell on problem solving being a source of character growth."
    },
    writing: {
      heading: "✍️ Design Character Tracing",
      instructions: "Practice tracing the logic characters ች (Chi) and ፍ (Fi).",
      lettersToPractice: [
        {
          letter: "ች",
          phonetic: "Chi",
          steps: ["Pillar with rightward horizontal cap", "Vertical backbone", "Lower rightward floor anchor"]
        },
        {
          letter: "ፍ",
          phonetic: "Fi",
          steps: ["Leftward rounded loop", "Horizontal bridge", "Right loop matching base support"]
        }
      ],
      wordChallenge: "መፍትሔ"
    },
    homework: [
      "Think of a chore difficulty and write a 'meftehe' plan in Amharic script.",
      "Address household situations with 'Tigist' and document the outcomes.",
      "Trace the characters ች, ቹ, ቺ, ቻ, ቼ, ች, ጮ three times."
    ],
    submissionTip: "Draw a map path where a obstacle is blocked, labeling the detour as 'Meftehe'! 🗺️",
    parentActivities: [
      "Ask parents to recount a tough life problem they solved, discussing the 'mikniyat' (reason) and 'meftehe' (solution) in Amharic."
    ],
    tutorPacing: [
      "10 mins: Brainstorming playground problems.",
      "25 mins: Vocabulary parsing and reading analysis.",
      "15 mins: Scrabble builder games."
    ],
    tutorTroubleshooting: [
      "Check that children differentiate 'Mikniyat' (reason) from 'Meftehe' (solution) conceptually."
    ],
    quiz: [
      {
        questionText: "What does 'መፍትሔ' translate to?",
        options: ["Pencil case", "Solution / Answer", "Cattle farm", "Red dress"],
        correctAnswerIndex: 1,
        explanation: "'መፍትሔ' means solution or answer."
      },
      {
        questionText: "Which word represents 'Reason' or 'Cause'?",
        options: ["ችግር", "ምክንያት", "ትዕግስት", "ግልጽ"],
        correctAnswerIndex: 1,
        explanation: "'ምክንያት' represents the reason or cause."
      },
      {
        questionText: "What represents 'clear/evident'?",
        options: ["ግልጽ", "ጥቁር", "ድንጋይ", "ብረት"],
        correctAnswerIndex: 0,
        explanation: "'ግልጽ' (Gilts) means clear."
      },
      {
        questionText: "What is the meaning of 'ትዕግስት'?",
        options: ["Anger", "Patience / Tolerance", "Speed", "Wealth"],
        correctAnswerIndex: 1,
        explanation: "'ትዕግስት' (Tigist) is patience."
      }
    ],
    nextLessonTitle: "Giving Advice"
  },

  // --- LESSON 3: Giving Advice ---
  {
    level: 4,
    lessonNumber: 3,
    geezNumber: "፫",
    topic: "Giving Advice",
    theme: "Mentorship & Guidance (ምክር መስጠት)",
    phase: "Level 4 Stage 1: Advanced Self-Expression & Society",
    subheading: "Learn how to politely mentor a friend, construct advice using 'ብትሞክር' (if you try), and share constructive tips.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Deliver polite recommendations using 'ምክር' (advice).",
      "Structure conditional recommendation statements: 'ብትሞክር' (if you try) and 'ይሻላል' (it is better).",
      "Express support values using 'መርዳት' (to help).",
      "Synthesize constructive feedback loops in roleplays."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ምክር",
        english: "Mikir",
        meaning: "Advice / Counsel / Tip",
        context: "Receiving grandfather's wise historical 'ምክር' protects kids from making simple blunders.",
        tutorTip: "Guttural backing: 'Mih-kihr'. High value noun.",
        imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=505&auto=format&fit=crop",
        audioText: "Mikir. Advice."
      },
      {
        fidel: "ይሻላል",
        english: "Yishalal",
        meaning: "It is better / Preferable",
        context: "Studying your vocabulary slides now 'ይሻላል' than postponing it till exam mornings.",
        tutorTip: "A comparative evaluation verb: 'Yee-shah-laal'.",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=505&auto=format&fit=crop",
        audioText: "Yishalal. It is better."
      },
      {
        fidel: "መርዳት",
        english: "Merdat",
        meaning: "To help / Support / Aid",
        context: "Volunteering to 'መርዳት' classmate circles creates a beautiful learning environment.",
        tutorTip: "Altruistic infinitive: 'Mehr-daat'.",
        imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=505&auto=format&fit=crop",
        audioText: "Merdat. To help."
      },
      {
        fidel: "መልካም",
        english: "Melkam",
        meaning: "Good / Nobel / Pleasant",
        context: "Greeting peer circles with a 'መልካም' facial expression brings bright joy into community halls.",
        tutorTip: "A positive adjective: 'Mehl-kaam'. Connect with good wishes.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Melkam. Good."
      },
      {
        fidel: "ብትሞክር",
        english: "Bitmokir",
        meaning: "If you try / If you attempt",
        context: "Using the conditional phrase: 'ይህንን ጨዋታ ብትሞክር...' when supporting peer struggles.",
        tutorTip: "Conditional helper: 'Bih-t'moh-kihr'. Key to suggesting.",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=505&auto=format&fit=crop",
        audioText: "Bitmokir. If you try."
      }
    ],
    exercises: [
      {
        amharic: "በየቀኑ ብታጠና በጣም ይሻላል።",
        transliteration: "Beye-qenu bitatena betam yishalal.",
        english: "If you study every day, it is much better.",
        tip: "Mime flipping notebook pages smoothly!"
      },
      {
        amharic: "እኔ ጓደኛዬን በመልካም ምክር መርዳት እወዳለሁ።",
        transliteration: "Ene gwadeñayen be-melkam mikir merdat ewedalehu.",
        english: "I love to support my friend with good advice.",
        tip: "Place arm over imaginary shoulder supporting them!"
      }
    ],
    dialogue: {
      heading: "💬 Gentle Interventions",
      scenario: "Yonas consoles Lydia on her language exam challenges.",
      roles: [
        {
          character: "Yonas",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሊዲያ ፤ የቋንቋ ፈተናውን ለመጨረስ ይህንን እቅድ ብትሞክሪ ይሻላል።",
          transliteration: "Lydia, ye-quanqua fetenawun lemechenres yihinni ekid bitmokri yishalal.",
          english: "Lydia, to finish the language exam, if you try this plan, it is better."
        },
        {
          character: "Lydia",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አመሰግናለሁ ዮናስ ፤ እኔን መርዳትህ መልካም ነገር ነው። ምክርህን እከተላለሁ!",
          transliteration: "Ameseginalehu Yonas, enen merdatih melkam neger new. Mikirhin eketelahlehu!",
          english: "Thank you Yonas, your helping me is a good thing. I will follow your advice!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Whispering Eucalyptus Forest",
      passageAmharic: "በጥንት ዘመን በአንድ ውብ የእርሻ መንደር ውስጥ ሔኖክ የሚባል ብልህ አያት ይኖር ነበር። ልጆች ሁልጊዜ ከአያታቸው መልካም ምክር ለመስማት ወደ ማር ማከማቻው ክፍል ይመጡ ነበር። አንድ ቀን ታናሽ እህቱ ሳሮን 'አያቴ ፤ የአማርኛ ንግግር ችሎታዬን ለማሳደግ ምን ላድርግ?' ብላ ጠየቀችው። አያት ሔኖክም ፈገግ ብሎ 'በየቀኑ አዳዲስ ቃላቶችን በድምፅ ብትሞክሪና ታላላቆችሽን መርዳት ብትለማመጂ ይሻላል' አላት። ሳሮንም ይህንን መልካም ምክር በልቧ አስቀመጠች። ህክምናውንም ተከትላ በጉባኤ ፊት ደፋር ተናጋሪ ሆነች።",
      passageTransliteration: "Be-tint zemen be-and wub ye-ersha mender wust Henok yemibal bilih ayat yinor nebere. Lijoch hulgize ke-ayatachew melkam mikir lemesmat wede mar makemachaw kifil yemetu nebere. And qen tanash ehetu Saron 'Ayate; ye-Amharic nigigir chilotayen lemasadeg min ladrig?' bila yeteyeqechew. Ayat Henok-im fegeg bilo 'beye-qenu adadis qalatin be-dimts bitmokri ena talalaqoshish-in merdat bitlemameji yishalal' alat. Saron-im yihinni melkam mikir be-libua asqemetech. Hikminawunim teketila be-gubae fit defar tenagari honech.",
      passageEnglish: "In ancient times, in a beautiful farming village, there lived a wise grandfather named Henok. Children always came to his honey storage room to listen to his good counsel. One day, his little sister Saron asked: 'Grandfather, what should I do to grow my Amharic presentation abilities?'. Grandfather Henok smiled and stated: 'If you try practicing new vocabularies verbally every day and make helping your elders a habit, it is better'. Saron deposited this good tip in her chest. Following this remedy, she became a brave orator before public crowds.",
      tutorTip: "Illustrate elder consulting as a hallmark of cultural wisdom."
    },
    writing: {
      heading: "✍️ Counselor Letters Studio",
      instructions: "Practice tracing the advisory letters ም (Mi) and ክ (Ki).",
      lettersToPractice: [
        {
          letter: "ም",
          phonetic: "Mi",
          steps: ["Closed bottom loop", "Lower stem connector", "Base horizontal base"]
        },
        {
          letter: "ክ",
          phonetic: "Ki",
          steps: ["Pillar with upper curved roof loop", "Center vertical drop", "Lower stabilizing leg"]
        }
      ],
      wordChallenge: "ይሻላል"
    },
    homework: [
      "Compose three sentences offering advice in Amharic using 'Bitmokir'."
    ],
    submissionTip: "Record a 30-second speech advising a friend to eat healthy food in Amharic! 🍏",
    parentActivities: [
      "Have parents share their childhood stories, matching outcomes with 'Bitmokir' advice structures."
    ],
    tutorPacing: [
      "10 mins: Peer counseling setup simulation.",
      "25 mins: Conditional sentence parsing.",
      "15 mins: Interactive game configurations."
    ],
    tutorTroubleshooting: [
      "Ensure students master the difference between 'Bitmokir' (male) and 'Bitmokri' (female)."
    ],
    quiz: [
      {
        questionText: "What does 'ምክር' translate to?",
        options: ["Pencil sharpener", "Advice / Tip", "Soccer shoe", "Red rose"],
        correctAnswerIndex: 1,
        explanation: "'ምክር' represents advice or counsel."
      },
      {
        questionText: "How do say 'It is better'?",
        options: ["ውሃ", "ይሻላል", "መፍትሔ", "ችግር"],
        correctAnswerIndex: 1,
        explanation: "'ይሻላል' means it is better."
      },
      {
        questionText: "What represents the action 'to help'?",
        options: ["መርዳት", "መብላት", "መተኛት", "መሮጥ"],
        correctAnswerIndex: 0,
        explanation: "'መርዳት' (Merdat) means to help."
      },
      {
        questionText: "What does 'ብትሞክር' mean?",
        options: ["If you try", "You are bad", "Sleep now", "Yesterday"],
        correctAnswerIndex: 0,
        explanation: "'ብትሞክር' (Bitmokir) translates to 'if you try'."
      }
    ],
    nextLessonTitle: "Expressing Agreement & Disagreement"
  },

  // --- LESSON 4: Expressing Agreement & Disagreement ---
  {
    level: 4,
    lessonNumber: 4,
    geezNumber: "፬",
    topic: "Expressing Agreement & Disagreement",
    theme: "Respectful Dialogues (መስማማት)",
    phase: "Level 4 Stage 1: Advanced Self-Expression & Society",
    subheading: "Gain rich diplomatic vocabulary to express solid consensus or polite differences without introducing vocal arguments.",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Declare alignment respectfully: 'እስማማለሁ' (I agree).",
      "Express alternative viewpoints politely: 'አልስማማም' (I disagree).",
      "Utilize compromise connectors: 'ቢሆንም' (even though).",
      "Conduct interactive diplomacy simulations."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "እስማማለሁ",
        english: "Esmamalehu",
        meaning: "I agree / Align",
        context: "When your classmate proposes cleaning the whiteboard first before class ends: 'እሱ ላይ እስማማለሁ!'.",
        tutorTip: "A strong active alignment phrase: 'Eh-smah-mah-lehoo'. Double key on m.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Esmamalehu. I agree."
      },
      {
        fidel: "አልስማማም",
        english: "Alsmamam",
        meaning: "I disagree / Diverge",
        context: "Shedding light on alternative routes politely when a map direction seems incorrect.",
        tutorTip: "Negative prefix al- and suffix -m block agreement: 'Ahl-smah-mahm'.",
        imageUrl: "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?w=505&auto=format&fit=crop",
        audioText: "Alsmamam. I disagree."
      },
      {
        fidel: "ሀሳብ",
        english: "Hasab",
        meaning: "Idea / Thought / Proposal",
        context: "Sharing a beautiful creative 'ሀሳብ' with classroom peers during brainstorming circles.",
        tutorTip: "Short, breathy syllables: 'Ha-sahb'. Soft h.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Hasab. Idea."
      },
      {
        fidel: "ትክክል",
        english: "Tikkikl",
        meaning: "Correct / Accurate / Exactly",
        context: "When your team member solves the historic math challenge perfectly: 'ሀሳብህ ትክክል ነው!'.",
        tutorTip: "High stress on k. 'Tih-kih-kihl'. Pronounce confidently.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=505&auto=format&fit=crop",
        audioText: "Tikkikl. Correct."
      },
      {
        fidel: "ቢሆንም",
        english: "Bihonim",
        meaning: "Even though / However",
        context: "Using contrast markers to link multiple ideas: 'ቆንጆ ቢሆንም ውድ ነው' (Even though beautiful, it is high priced).",
        tutorTip: "Conjunction linking clauses: 'Bee-hoh-nihm'. Refers to contrast.",
        imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=505&auto=format&fit=crop",
        audioText: "Bihonim. Even though."
      }
    ],
    exercises: [
      {
        amharic: "እኔ ከእርስዎ ሀሳብ ጋር ሙሉ በሙሉ እስማማለሁ።",
        transliteration: "Ene ke-erswo hasab gar mulu be-mulu esmamalehu.",
        english: "I completely agree with your idea.",
        tip: "Nod your head with an elegant smile!"
      },
      {
        amharic: "ይህ እቅድ ጥሩ ቢሆንም ፥ እኔ ግን አልስማማም ምክንያቱም ውድ ነው።",
        transliteration: "Yih ekid tiru bihonim, ene gin alsmamam mikniyatu wid new.",
        english: "Even though this plan is good, I don't agree because it is costly.",
        tip: "Form a soft waving hand indicating polite divergence!"
      }
    ],
    dialogue: {
      heading: "💬 High Table Agreements",
      scenario: "Yonas and Elizabeth negotiate their weekend museum study routines.",
      roles: [
        {
          character: "Yonas",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ኤልሳቤጥ ፤ ቅዳሜ ጠዋት በባቡር ወደ ባህል ሙዚየም ብንሄድ ይሻላል። ምን ይመስልሻል?",
          transliteration: "Elizabeth, qidame tewat be babur wede bahil museum binhed yishalal. Min yimeslishal?",
          english: "Elizabeth, if we go to the cultural museum by train Saturday morning, it is better. What does it look like to you?"
        },
        {
          character: "Elizabeth",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "በሀሳብህ እስማማለሁ ፤ ትክክል ነህ ፥ ባቡሩ ፈጣን እና ርካሽ ነው!",
          transliteration: "Be-hasabih esmamalehu, tikkikl neh, baburu fetan ena rikash new!",
          english: "I agree with your idea; you are correct, the train is fast and cheap!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Court of Grand Consensus",
      passageAmharic: "ትናንትና በትምህርት ቤቱ የስነ-ዜጋ ምክር ቤት ውስጥ ተማሪዎች ትልቅ ውይይት አደረጉ። አርዕስቱም 'ለአካባቢ ጥበቃ የትኛው እቅድ ይሻላል?' የሚል ነበረ። ሳምሶን 'ሁላችንም በየሳምንቱ አዳዲስ ዛፎችን መትከል አለብን' የሚል ሀሳብ አቀረበ። ሊዲያም 'በሀሳብህ እስማማለሁ ፥ እሱ ትክክል ነው' አለች። ነገር ግን ሰለሞን 'እቅዱ ጥሩ ቢሆንም ፥ ጊዜ የለንም ፤ ስለዚህ አልስማማም' አለ። ከረዥም ውይይት በኋላ ተማሪዎቹ በትዕግስት ተነጋግረው የእለት ተግባራቸውን በጋራ ለመከፋፈል ሙሉ መስማማት ላይ ደረሱ።",
      passageTransliteration: "Tinentina be timihirt betu ye-sine-zega mikir bet wust temarioch tilik wiyiyit aderegu. Arts-tum 'le-akababi tibeqa yetgnow ekid yishalal?' yemil nebere. Samson 'hullachinim beye-samintu adadis zafochen metkel alebin' yemil hasab aqerebe. Lydia-m 'be-hasabih esmamalehu, esu tikkikl new' alech. Neger gin Solomon 'ekidu tiru bihonim, gize yelenim; selezihi alsmamam' ale. Ke-rejim wiyiyit behuala temariochu be-tigist tenegagrew ye-elet tegbarachewn be-gara lemekefafel mulu mesmamat lay deresu.",
      passageEnglish: "Yesterday, inside the school civics council chamber, the students had a grand discussion. The topic was 'which plan is better for environment protection?'. Samson proposed an idea stating, 'We must all plant new trees every single week'. Lydia said, 'I agree with your idea, it is correct'. However, Solomon argued: 'Even though the plan is good, we lack time; therefore, I disagree'. After a long debate, the students conversed with patience and arrived at full consensus to divide their daily actions together.",
      tutorTip: "Dwell on respectful dissent being a highly valued democratic trait."
    },
    writing: {
      heading: "✍️ Assembly Letters Studio",
      instructions: "Practice tracing the consensus letters ሀ (Ha) and ስ (Si).",
      lettersToPractice: [
        {
          letter: "ሀ",
          phonetic: "Ha",
          steps: ["Vertical line start", "Center horizontal connector", "Right downward leg segment"]
        },
        {
          letter: "ስ",
          phonetic: "Si",
          steps: ["Forked start", "Mid horizontal support beam", "Lower right leg"]
        }
      ],
      wordChallenge: "እስማማለሁ"
    },
    homework: [
      "Ask a family member their view on a topic and express 'Esmamalehu' or 'Alsmamam' politely in Amharic."
    ],
    submissionTip: "Upload a photo holding a sign saying 'እስማማለሁ' or 'አልስማማም'! 🤝",
    parentActivities: [
      "Engage children in mock diplomacy games talking about dinner menu plans where terms are used gracefully."
    ],
    tutorPacing: [
      "10 mins: Constructive dissent icebreaker.",
      "25 mins: Clauses links with 'Bihonim' analysis.",
      "15 mins: Interactive matching pair test."
    ],
    tutorTroubleshooting: [
      "Remind kids to soften the guttural start on 'Alsmamam'."
    ],
    quiz: [
      {
        questionText: "How do say 'I agree' in Amharic?",
        options: ["አልስማማም", "እስማማለሁ", "ውሃ በላሁ", "ባቡር ጎተተኝ"],
        correctAnswerIndex: 1,
        explanation: "'እስማማለሁ' represents consensus / agreement."
      },
      {
        questionText: "What is the opposite of 'እስማማለሁ'?",
        options: ["አልስማማም", "ይሻላል", "ምክር", "ውሳኔ"],
        correctAnswerIndex: 0,
        explanation: "'አልስማማም' represents disagreement."
      },
      {
        questionText: "What does 'ሀሳብ' mean?",
        options: ["Idea / Thought", "Bicycle lane", "Wooden cup", "Yellow shoe"],
        correctAnswerIndex: 0,
        explanation: "'ሀሳብ' translates to idea or opinion."
      },
      {
        questionText: "Select correct word for 'Even though / However':",
        options: ["ትክክል", "ቢሆንም", "ግልጽ", "ችግር"],
        correctAnswerIndex: 1,
        explanation: "'ቢሆንም' represents even though / however."
      }
    ],
    nextLessonTitle: "Career Interests"
  },

  // --- LESSON 5: Career Interests ---
  {
    level: 4,
    lessonNumber: 5,
    geezNumber: "፭",
    topic: "Career Interests",
    theme: "Careers & Talents (የሙያ ፍላጎት)",
    phase: "Level 4 Stage 1: Advanced Self-Expression & Society",
    subheading: "Explore prospective professional pathways, discuss coding, medicine, art, and express personal passion matching future callings.",
    imageUrl: "https://images.unsplash.com/photo-1541560052-5e137f229371?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "List advanced professional career pathways: 'ሐኪም' (physician) and 'مهندس' (engineer).",
      "Express passion and interests: 'ሙያ' (career) and 'ፍላጎት' (interest).",
      "Draft interactive professional objectives.",
      "Engage conversational mentorship dialogues."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ሙያ",
        english: "Muya",
        meaning: "Career / Profession / Trade",
        context: "Discovering your vocational 'ሙያ' guarantees long term career fulfillment and community value.",
        tutorTip: "Soft and short: 'Moo-yah'. Speaks of talent.",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=505&auto=format&fit=crop",
        audioText: "Muya. Career."
      },
      {
        fidel: "ፍላጎት",
        english: "Filagot",
        meaning: "Interest / Desire / Ambition",
        context: "Every student has a unique 'ፍላጎት' to learn digital coding or play traditional musical strings.",
        tutorTip: "Stretched mid-syllable: 'Fih-lah-goht'. Connected with passion.",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=505&auto=format&fit=crop",
        audioText: "Filagot. Interest."
      },
      {
        fidel: "ሐኪም",
        english: "Hakim",
        meaning: "Physician / Doctor",
        context: "The helpful healthcare expert who diagnostics ailments and keeps community children strong: 'የጤና ሐኪም'.",
        tutorTip: "Soft throat-breath: 'Hah-keem'. Contrast with academic doctor.",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=505&auto=format&fit=crop",
        audioText: "Hakim. Doctor."
      },
      {
        fidel: "መሐንዲስ",
        english: "Mehandis",
        meaning: "Engineer / Builder",
        context: "Designing massive steel bridges and writing clean software algorithms represents a 'መሐንዲስ' job.",
        tutorTip: "Guttural middle: 'Meh-hahn-dihs'. Matches developer goals.",
        imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=505&auto=format&fit=crop",
        audioText: "Mehandis. Engineer."
      },
      {
        fidel: "ውጤታማ",
        english: "Witetama",
        meaning: "Successful / Productive",
        context: "Practicing Amharic daily registers you as a 'ውጤታማ' bilingual communicator.",
        tutorTip: "High pitch: 'Wih-teh-tah-mah'. Built on result.",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=505&auto=format&fit=crop",
        audioText: "Witetama. Successful."
      }
    ],
    exercises: [
      {
        amharic: "የእኔ ዋነኛ ፍላጎት ጎበዝ መሐንዲስ መሆን ነው።",
        transliteration: "Yene wanenya filagot gobez mehandis mehon new.",
        english: "My primary desire is to become a skilled engineer.",
        tip: "Mime drafting structural bridge plans on boards!"
      },
      {
        amharic: "እሱ በሙያው በጣም ውጤታማ ሰው ነው።",
        transliteration: "Esu be-muyaw betam witetama sew new.",
        english: "He is a very successful person in his profession.",
        tip: "Thumb up expressing grand professional standards!"
      }
    ],
    dialogue: {
      heading: "💬 Choosing Prospective Paths",
      scenario: "Elias tells his mentor Lydia of his career aspirations.",
      roles: [
        {
          character: "Elias",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሊዲያ ፤ ወደፊት ምን ዓይነት ሙያ መምረጥ ትፈልጊያለሽ? የእኔ ፍላጎት ሐኪም መሆን ነው።",
          transliteration: "Lydia, wedefit min aynet muya memret tifeligiyalesh? Yene filagot Hakim mehon new.",
          english: "Lydia, what kind of career do you want to choose in the future? My desire is to become a doctor."
        },
        {
          character: "Lydia",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እኔ መሐንዲስ ለመሆን እቅድ አለኝ። በትምህርታችን ውጤታማ እንሆናለን!",
          transliteration: "Ene mehandis lemehon ekid alegn. Be-timihirtachin witetama enhonalen!",
          english: "I have plans to become an engineer. We will be successful in our education!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Master Builders of Gondar",
      passageAmharic: "በትናንትናው እቅድ መምህር በለጡ ክፍላቸውን ስለወደፊት ሙያ ምርጫ ጠየቁ። ብዙ ተማሪዎች የተለያዩ ምኞቶችን ተናገሩ። ሳምሶን 'ለህብረተሰቡ ጤና ማሰብ እፈልጋለሁ ፤ ፍላጎቴ ሐኪም መሆን ነው' አለ። ሊዲያ ግን የኮምፒውተር መሐንዲስ ሆና ትላልቅ መተግበሪያዎችን ለመስራት እንደምታስብ ገለጸች። አቶ በለጡም 'ሁሉም ሙያ ታላቅና ጠቃሚ እሴት አለው። በሙያ ለማደግ ግን ሰዓት ማክበርና ለስራው ትዕግስት ማሳየት ዋነኛ መፍትሔ ነው' የሚል ምክር አጋሩ። ተማሪዎቹም ምክራቸውን ሰምተው በተረጋጋ መንፈስ ውጤታማ ለመሆን ወሰኑ።",
      passageTransliteration: "Be tinantnaw ekid memhir Beletu kifilachewn sile wedefit muya mircha teyequ. Bizu temarioch yetelayayu mignotochin tenageru. Samson 'lehibratesebu tena maseb efeligalehu; filagote Hakim mehon new' ale. Lydia gin ye-computer mehandis hona tilalaq metegberiyachin lemesrat endemitasib gelechech. Ato Beletu-m 'hullum muya talak-ina teqami eset alew. Be-muya lemadeg gin se'at makber ena le-siraw tigist masayet wanenya meftehe new' yemil mikir agaru. Temariochu-m mikirachewn semitew be-teregaga menfes witetama lemehon wesenu.",
      passageEnglish: "In yesterday's schedule, Teacher Beletu asked his classroom about future career selections. Many students declared diverse desires. Samson said, 'I want to care for community safety; my desire is to become a medical physician'. But Lydia detailed her dream of becoming a computer software engineer to construct massive digital applications. Mr. Beletu shared counseling: 'Every single profession has grand and useful values. Yet to grow in careers, respecting time and showing patience for the work is the primary key'. The students listened to the counsel and resolved in a calm spirit to be highly productive.",
      tutorTip: "Dwell on both sciences and humanities careers with matching importance."
    },
    writing: {
      heading: "✍️ Vocational Characters Studio",
      instructions: "Practice tracing the professional letters ሐ (Ha) and ፍ (Fi).",
      lettersToPractice: [
        {
          letter: "ሐ",
          phonetic: "Ha",
          steps: ["Vertical left drop", "Horizontal bridge", "Vertical right drop with bottom curl"]
        },
        {
          letter: "ሙ",
          phonetic: "Mu",
          steps: ["Closed bottom loop with vertical stem modifier", "Mid support beam", "Right accent indicator"]
        }
      ],
      wordChallenge: "ሐኪም"
    },
    homework: [
      "Detail your favorite dream professional career in Amharic inside your notebook."
    ],
    submissionTip: "Draw a sketch of yourself in your future career gears, labeled with your Amharic 'Muya'! 🩺",
    parentActivities: [
      "Let children interview parents about their daily jobs and compile the tasks in Amharic vocabulary terms."
    ],
    tutorPacing: [
      "10 mins: Career interests guessing game.",
      "25 mins: Role definitions and pronunciation focus.",
      "15 mins: Interactive spelling assembly grids."
    ],
    tutorTroubleshooting: [
      "Make sure students grasp the distinction between the soft throat ሐ (Ha) and heavy ኃ (Ha)."
    ],
    quiz: [
      {
        questionText: "What does 'ሙያ' mean?",
        options: ["Pencil", "Career / Profession", "Bacon sandwich", "Yellow flag"],
        correctAnswerIndex: 1,
        explanation: "'ሙያ' equates to profession or career."
      },
      {
        questionText: "Select correct word for 'Engineer':",
        options: ["ሐኪም", "መሐንዲስ", "አስተማሪ", "ነጋዴ"],
        correctAnswerIndex: 1,
        explanation: "'መሐንዲስ' translates to engineer."
      },
      {
        questionText: "What does 'ሐኪም' represent?",
        options: ["Physician / Doctor", "Farmer", "Pilot", "Chef"],
        correctAnswerIndex: 0,
        explanation: "'ሐኪም' represents a medical doctor."
      },
      {
        questionText: "What is 'ፍላጎት'?",
        options: ["Cold ice", "Interest / Desire", "Clean road", "Sharp pencil"],
        correctAnswerIndex: 1,
        explanation: "'ፍላጎት' relates to interest or desire."
      }
    ],
    nextLessonTitle: "University & Education Goals"
  },

  // --- LESSON 6: University & Education Goals ---
  {
    level: 4,
    lessonNumber: 6,
    geezNumber: "፮",
    topic: "University & Education Goals",
    theme: "Education & Ambitions (ትምህርት ቤት)",
    phase: "Level 4 Stage 1: Advanced Self-Expression & Society",
    subheading: "Define academic paths, colleges, specialized degrees, study challenges, and outline your educational horizons.",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Explain educational goals: 'ከፍተኛ ትምህርት' (higher education).",
      "Identify university terminology: 'ዩኒቨርሲቲ' (university) and 'ዕውቀት' (knowledge).",
      "Structure multi-clause sentences using academic verbs.",
      "Synthesize prospective study timetables."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ዩኒቨርሲቲ",
        english: "University",
        meaning: "University / Higher college",
        context: "Entering a prestigious 'ዩኒቨርሲቲ' provides you with high-value technical tools for future jobs.",
        tutorTip: "A modern loan word: 'Yoo-nih-vehr-sih-tee'. High prestige.",
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=505&auto=format&fit=crop",
        audioText: "University. University."
      },
      {
        fidel: "ዕውቀት",
        english: "Ewqet",
        meaning: "Knowledge / Understanding",
        context: "Gathering deep 'ዕውቀት' allows you to decode cultural histories and build systems.",
        tutorTip: "Starts with diagnostic glottal character: 'Ehuh-qeht'. Accent on q.",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=505&auto=format&fit=crop",
        audioText: "Ewqet. Knowledge."
      },
      {
        fidel: "ማጥናት",
        english: "Matnat",
        meaning: "To study / Research",
        context: "Dedicating quiet night hours to 'ማጥናት' books keeps your grades at stellar levels.",
        tutorTip: "Refers to cognitive research: 'Mah-t'naat'.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=505&auto=format&fit=crop",
        audioText: "Matnat. To study."
      },
      {
        fidel: "ውጤት",
        english: "Witet",
        meaning: "Result / Score / Grade",
        context: "Receiving your academic report cards with outstanding 'ውጤት' makes parents smile.",
        tutorTip: "Two sharp syllables: 'Wih-teht'. Focus on final t.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=505&auto=format&fit=crop",
        audioText: "Witet. Result."
      },
      {
        fidel: "ዕድል",
        english: "Edil",
        meaning: "Opportunity / Chance / Luck",
        context: "Earning a fully funded academic scholarship is described as a glorious 'ዕድል'.",
        tutorTip: "Glottal start: 'Eh-dihl'. Essential positive noun.",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=505&auto=format&fit=crop",
        audioText: "Edil. Opportunity."
      }
    ],
    exercises: [
      {
        amharic: "እኔ በዩኒቨርሲቲ ውስጥ አዲስ ዕውቀት ማግኘት እፈልጋለሁ።",
        transliteration: "Ene be-university wust adis ewqet mageñet efeligalehu.",
        english: "I want to acquire new knowledge inside the university.",
        tip: "Mime flipping massive library index books!"
      },
      {
        amharic: "ጎበዝ ተማሪዎች በትጋት በማጥናት ጥሩ ውጤት ያገኛሉ።",
        transliteration: "Gobez temarioch be-tigat be-matnat tiru witet yagegnalu.",
        english: "Smart students acquire outstanding results by studying with diligence.",
        tip: "Hold a certificate high with victorious gestures!"
      }
    ],
    dialogue: {
      heading: "💬 Academic Transitions Discussion",
      scenario: "Yared and Brook debate their preferred university sciences and humanities concentrations.",
      roles: [
        {
          character: "Yared",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ብሩክ ፤ ወደፊት በዩኒቨርሲቲ ምን ዓይነት ትምህርት ለማጥናት እቅድ አለህ?",
          transliteration: "Brook, wedefit be-university min aynet timihirt lematnat ekid aleh?",
          english: "Brook, what kind of education do you plan to study at the university in the future?"
        },
        {
          character: "Brook",
          avatar: "👨",
          bubbleSide: "right",
          amharic: "እኔ የኮምፒውተር ሳይንስ ፍላጎት አለኝ ፤ ይህ ትልቅ ዕድል ነው። ጥሩ ውጤት አገኛለሁ!",
          transliteration: "Ene ye-computer science filagot alegn, yih tilik edil new. Tiru witet agenyalehu!",
          english: "I have interest in computer science; this represents a great opportunity. I will achieve high scores!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Flame of Higher Learning",
      passageAmharic: "በትናንትናው እቅድ ሳሮን ከትልቅ ቤተ-መጽሐፍት ውስጥ አዳዲስ የታሪክ መጻሕፍትን ስታነብ አመሸች። እሷ 'ለእኔ ከፍተኛ ትምህርት ማግኘት በጣም ታላቅ ግብ ነው። በዩኒቨርሲቲ ውስጥ አዲስ የሳይንስ ዕውቀትን ማግኘት እፈልጋለሁ' ትላለች። ወላጆቿም በትጋት የማጥናት ልምዷን አይተው ደስ አላቸው። እሷ በፈተና አርአያ የሚሆን ከፍተኛ ውጤት አስመዘገበች። ለሳሮን ይህ ትልቅ ዕድል የተሻለ ነገን ለመገንባት መድረክ ይከፍታል። ትምህርት ሁልጊዜ የጨለማን መንገድ የሚያበራ ታላቅ ፋኖስ ነው።",
      passageTransliteration: "Be tinantnaw ekid Saron ke tilik betemetsahift wust adadis ye-tarik mitsahiftin sitaneb ameshech. Esua 'le-ene kefteña timihirt mageñet betam talak gib new. Be-university wust adis ye-science ewqetin mageñet efeligalehu' tilalech. Welajochuam be-tigat ye-matnat limduan aytew des alachew. Esua be-fetena ar'aya yemihon kefteña witet asmezgebech. Le-Saron yih tilik edil yeteshele negen lemegenbat medreh yikeftal. Timihirt hulgize ye-cheleman menged yemiyabera talak fanos new.",
      passageEnglish: "In yesterday's schedule, Saron spent her evening reading new historical books inside the grand library archive. She declares: 'For me, acquiring higher education represents a very great goal. I want to access new scientific knowledge inside the university'. Her parents, seeing her industrious study habit, felt deeply pleased. She registered exemplary high scores on her examination. For Saron, this great opportunity opens up public platforms to build a better future. Education is always a magnificent lantern illuminating dark pathways.",
      tutorTip: "Discuss university environments to build dynamic academic vocabulary."
    },
    writing: {
      heading: "✍️ Academic Characters Studio",
      instructions: "Practice tracing the cognitive letters ዕ (E) and ው (Wi).",
      lettersToPractice: [
        {
          letter: "ዕ",
          phonetic: "E",
          steps: ["Vertical start left", "Horizontal center block", "Base support loop"]
        },
        {
          letter: "ው",
          phonetic: "Wi",
          steps: ["Top curved loop", "Mid decline line Segment", "Lower right leg base"]
        }
      ],
      wordChallenge: "ዕውቀት"
    },
    homework: [
      "Select three global universities and write 'University' next to their names in Amharic script."
    ],
    submissionTip: "Upload a postcard illustrating your future college major labeled in Amharic! 🎓",
    parentActivities: [
      "Encourage parents to map realistic college application timelines while children translate the names in Amharic."
    ],
    tutorPacing: [
      "10 mins: Educational goals alignment discussion.",
      "25 mins: Vocabulary recitation and context translation.",
      "15 mins: Scramble assembly game review."
    ],
    tutorTroubleshooting: [
      "Help children pronounce the diagnostic glottal character ዕ (E) without skipping it."
    ],
    quiz: [
      {
        questionText: "What does 'ዩኒቨርሲቲ' translate to?",
        options: ["Pencil sharpener", "University / College", "Swimming pool", "Red apple"],
        correctAnswerIndex: 1,
        explanation: "'ዩኒቨርሲቲ' represents a university."
      },
      {
        questionText: "Which word represents 'Knowledge'?",
        options: ["ውጤት", "ዕውቀት", "ማጥናት", "ዕድል"],
        correctAnswerIndex: 1,
        explanation: "'ዕውቀት' means knowledge."
      },
      {
        questionText: "What does 'ማጥናት' mean?",
        options: ["To study / Research", "To sleep late", "Eating bananas", "Playing guitar"],
        correctAnswerIndex: 0,
        explanation: "'ማጥናት' is to study."
      },
      {
        questionText: "What is 'ዕድል'?",
        options: ["Patience", "Opportunity / Chance", "Clear map", "Problem solved"],
        correctAnswerIndex: 1,
        explanation: "'ዕድል' translates to opportunity or chance."
      }
    ],
    nextLessonTitle: "Technology & Social Media"
  },

  // --- LESSON 7: Technology & Social Media ---
  {
    level: 4,
    lessonNumber: 7,
    geezNumber: "፯",
    topic: "Technology & Social Media",
    theme: "Digital World (ቴክኖሎጂ)",
    phase: "Level 4 Stage 1: Advanced Self-Expression & Society",
    subheading: "Examine smartphones, networks, algorithmic parameters, online manners, and express tech utility safely.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Detail digital technological developments: 'ቴክኖሎጂ' (technology).",
      "Identify interactive media elements: 'ማህበራዊ ሚዲያ' (social media) and 'ስልክ' (phone).",
      "Explain the critical necessity of online digital safety rules.",
      "Engage debate regarding screens time usage."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ቴክኖሎጂ",
        english: "Technology",
        meaning: "Technology / IT systems",
        context: "Using modern 'ቴክኖሎጂ' wisely allows programmers to construct helpful platforms.",
        tutorTip: "A vital modern loan: 'Tehk-noh-loh-jee'. Emphasis on tech.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=505&auto=format&fit=crop",
        audioText: "Technology. Technology."
      },
      {
        fidel: "ማህበራዊ ሚዲያ",
        english: "Mahberawi Media",
        meaning: "Social Media / Digital network",
        context: "Connecting with distant diaspora cousins via high-speed 'ማህበራዊ ሚዲያ' networks.",
        tutorTip: "A compound of 'mahberawi' (social) and 'media'. 'Mahh-beh-rah-wee Mee-dee-ya'.",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=505&auto=format&fit=crop",
        audioText: "Mahberawi media. Social media."
      },
      {
        fidel: "ስልክ",
        english: "Silk",
        meaning: "Phone / Cellphone / Wire",
        context: "Tapping your smart screen 'ስልክ' to read family text notifications instantly.",
        tutorTip: "Refers to both phone and communication line: 'Sihlk'.",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=505&auto=format&fit=crop",
        audioText: "Silk. Phone."
      },
      {
        fidel: "አደገኛ",
        english: "Adegeña",
        meaning: "Dangerous / Risky",
        context: "Sharing confidential private house passwords online is highly 'አደገኛ' and unsafe.",
        tutorTip: "Stretched ending: 'Ah-deh-geh-nyah'. Use with caution.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Adegeña. Dangerous."
      },
      {
        fidel: "ጠቃሚ",
        english: "Teqami",
        meaning: "Useful / Beneficial",
        context: "Studying multilingual dictionaries represents a highly 'ጠቃሚ' habit for students.",
        tutorTip: "Refers to utility: 'Teh-qah-mee'. Soft q.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=505&auto=format&fit=crop",
        audioText: "Teqami. Useful."
      }
    ],
    exercises: [
      {
        amharic: "ዘመናዊ ቴክኖሎጂ በትምህርታችን ውስጥ ጠቃሚ መሳሪያ ነው።",
        transliteration: "Zemenawi technology be-timihirtachin wust teqami mesariya new.",
        english: "Modern technology is a useful tool in our education.",
        tip: "Mime typing rapidly on an imaginary digital keyboard!"
      },
      {
        amharic: "ስልክ ላይ ብዙ ጊዜ ማጥፋት በጣም አደገኛ ነገር ነው።",
        transliteration: "Silk lay bizu gize matfat betam adegeña neger new.",
        english: "Wasting too much time on the phone is a very dangerous thing.",
        tip: "Cross your arms forming a strict defensive stop gesture!"
      }
    ],
    dialogue: {
      heading: "💬 Screen Time Negotiations",
      scenario: "Yonas cautions Elizabeth regarding excessive social media scrollings.",
      roles: [
        {
          character: "Yonas",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ኤልሳቤጥ ፤ ዛሬ ማህበራዊ ሚዲያ ላይ ብዙ ሰዓት ማጥፋትሽ አደገኛ ነው። እቅድሽ ምንድነው?",
          transliteration: "Elizabeth, zare mahberawi media lay bizu se'at matfatish adegeña new. Ekidish mindnew?",
          english: "Elizabeth, your spending too much time on social media today is dangerous. What is your plan?"
        },
        {
          character: "Elizabeth",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "ትክክል ነህ ፤ ቴክኖሎጂ ጠቃሚ ቢሆንም ፥ ስልኬን ዘግቼ ማጥናት ይሻላል!",
          transliteration: "Tikkikl neh, technology teqami bihonim, silkien zegiche matnat yishalal!",
          english: "You are correct; even though technology is useful, closing my phone and studying is better!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Digital Shield of the Scribe",
      passageAmharic: "ባለፈው ሳምንት ሔኖክ አዲስ ዘመናዊ ስልክ ከወላጆቹ ተቀበለ። እሱም በከፍተኛ ደስታ 'ይህ ቴክኖሎጂ መጻሕፍትን በድምፅ ለማንበብና አዲስ ዕውቀት ለማግኘት ጠቃሚ ነው' አለ። ነገር ግን መምህሯ ማህበራዊ ሚዲያ በብዛት መጠቀም ጊዜን ስለሚያጠፋ አደገኛ እንደሆነ በጥብቅ አስጠነቀቁት። ሔኖክም የብልህ ውሳኔ ባለቤት መሆኑን ለማሳየት የዕለት ተግባሩን ሰዓት ጠብቆ አደራጀ። እሱ 'ቴክኖሎጂን ከትምህርት ጋር ማመጣጠን ይሻላል' የሚል ምክር ለክፍሉ ልጆች አካፈለ። ተማሪዎቹም ይህንን መልካም ሀሳብ ተቀብለው ትዕግስትን ተማሩ።",
      passageTransliteration: "Balefew samint Henok adis zemenawi silk ke-welajochu teqebele. Esu-m be-kefteña desta 'yih technology mitsahiftin be-dimts lemanbeb ena adis ewqet lemageñet teqami new' ale. Neger gin memhirua mahberawi media be-bizat meteqem gizen silemiyatfa adegeña endehone betibq asteneqequt. Henok-im ye-bilih wisane balebet mehonun lemasayet ye-elet tegbarun se'at tebiqo aderaje. Esu 'technology-n ke-timihirt gar mametaten yishalal' yemil mikir le-kifilu lijoch akafele. Temariochu-m yihinni melkam hasab teqebelow tigist-in temaru.",
      passageEnglish: "Last week, Henok received a brand new modern smartphone from his parents. In great joy, he said: 'This technology is useful to verbally read books and access new knowledge'. However, his teacher strictly warned him that using social media in excess is dangerous as it wastes valuable time. Henok, showing he is a master of wise resolve, organized his daily routines keeping exact time. He shared advice with the classroom children: 'Balancing technology with education is better'. The students accepted this pleasant idea and learned patience.",
      tutorTip: "Dwell on internet manners and cybersecurity standards using Amharic vocabulary."
    },
    writing: {
      heading: "✍️ Cybersecurity Letters Studio",
      instructions: "Practice tracing the digital letters ቴክ (Tek) and ሰ (Se).",
      lettersToPractice: [
        {
          letter: "ቴክ",
          phonetic: "Tek",
          steps: ["Vertical start left", "Horizontal center connector", "Rightward wing stabilizer"]
        },
        {
          letter: "ሰ",
          phonetic: "Se",
          steps: ["Loop connector left", "Horizontal mid support", "Rightward vertical downward drop"]
        }
      ],
      wordChallenge: "ጠቃሚ"
    },
    homework: [
      "Track your screen time today and list three productive tech tasks in Amharic."
    ],
    submissionTip: "Upload a poster illustrating digital security rules labeled with Amharic 'Adegeña' alerts! 🛡️",
    parentActivities: [
      "Implement a family digital-free zone after dinner, using the terms 'Silk' and 'Teqami' safely."
    ],
    tutorPacing: [
      "10 mins: Educational tech benefits brainstorm.",
      "25 mins: Vocabulary parsing and screen time debate.",
      "15 mins: Interactive spelling block assembler."
    ],
    tutorTroubleshooting: [
      "Ensure students don't confuse 'Silk' (phone) with 'Sile' (about)."
    ],
    quiz: [
      {
        questionText: "What does 'ቴክኖሎጂ' translate to?",
        options: ["Wooden fork", "Technology / IT", "Ski equipment", "Red car"],
        correctAnswerIndex: 1,
        explanation: "'ቴክኖሎጂ' relates to digital technology."
      },
      {
        questionText: "Select correct compound for 'Social Media':",
        options: ["ማህበራዊ ሚዲያ", "ሰዓት ማክበር", "ዕውቀት ቤት", "ትልቅ መሐንዲስ"],
        correctAnswerIndex: 0,
        explanation: "'ማህበራዊ ሚዲያ' translates to social media."
      },
      {
        questionText: "What does 'አደገኛ' mean?",
        options: ["Dangerous / Risky", "Beautiful", "Clean space", "Punctual"],
        correctAnswerIndex: 0,
        explanation: "'አደገኛ' translates to dangerous."
      },
      {
        questionText: "What is 'ጠቃሚ'?",
        options: ["Silly", "Useful / Beneficial", "Expensive", "Yesterday"],
        correctAnswerIndex: 1,
        explanation: "'ጠቃሚ' yields useful or beneficial."
      }
    ],
    nextLessonTitle: "Leadership & Responsibility"
  },

  // --- LESSON 8: Leadership & Responsibility ---
  {
    level: 4,
    lessonNumber: 8,
    geezNumber: "፰",
    topic: "Leadership & Responsibility",
    theme: "Youth Leadership (መሪነት)",
    phase: "Level 4 Stage 1: Advanced Self-Expression & Society",
    subheading: "Define elite leading values, team cooperation, visionary leadership, guidance, and community ownership.",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Detail primary leadership elements: 'መሪነት' (leadership).",
      "Explain strategic definitions: 'መሪ' (leader) and 'ታማኝነት' (loyalty/faithfulness).",
      "Formulate active visionary command sentences beautifully.",
      "Conduct simulated community organization mock projects."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "መሪነት",
        english: "Merinet",
        meaning: "Leadership / Guidance",
        context: "Shedding light on path challenges to support community progress stands for 'መሪነት'.",
        tutorTip: "Drawn from 'meri' (leader): 'Meh-rih-neht'. Speaks of vision.",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=505&auto=format&fit=crop",
        audioText: "Merinet. Leadership."
      },
      {
        fidel: "መሪ",
        english: "Meri",
        meaning: "Leader / Guide",
        context: "The visionary 'መሪ' is one who inspires classroom circles to maintain top clean habits.",
        tutorTip: "Two quick syllables: 'Meh-ree'. Express alignment.",
        imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=505&auto=format&fit=crop",
        audioText: "Meri. Leader."
      },
      {
        fidel: "ታማኝነት",
        english: "Tamagninet",
        meaning: "Loyalty / Faithfulness / Integrity",
        context: "Keeping promises and preserving team configurations represents ultimate 'ታማኝነት'.",
        tutorTip: "Complex suffix system: 'Tah-mah-gnyih-neht'. Heavy nasal gny.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Tamagninet. Loyalty."
      },
      {
        fidel: "መከተል",
        english: "Meketel",
        meaning: "To follow / Accompany",
        context: "Diligently taking notes and choosing to 'መከተል' parents' wise heritage instructions.",
        tutorTip: "Infinitive of step: 'Meh-keh-tehl'. Focus on t.",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=505&auto=format&fit=crop",
        audioText: "Meketel. To follow."
      },
      {
        fidel: "ተምሳሌት",
        english: "Temsalet",
        meaning: "Role model / Example",
        context: "A student achieving outstanding grade ranks is a 'ተምሳሌት' to younger sibling circles.",
        tutorTip: "Literally pattern or symbol: 'Tehm-sah-leht'.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Temsalet. Role model."
      }
    ],
    exercises: [
      {
        amharic: "እውነተኛ መሪነት ሰዎችን በመልካም ምሳሌ መርዳት ነው።",
        transliteration: "Ewnetegna merinet sewochin be-melkam misale merdat new.",
        english: "True leadership is helping people through good example.",
        tip: "Stand straight with hand over heart firmly!"
      },
      {
        amharic: "እኛ የእርሱን ታማኝነት እና መልካም ተግባር እንከተላለን።",
        transliteration: "Egna ye-ersun tamagninet ena melkam tegbar enketelalen.",
        english: "We follow his loyalty and good actions.",
        tip: "Mime marching forward in perfect synchronized alignment!"
      }
    ],
    dialogue: {
      heading: "💬 Leadership Qualities Discussion",
      scenario: "Sarah and Dawit debate student council campaign requirements.",
      roles: [
        {
          character: "Sarah",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "ዳዊት ፤ በትምህርት ቤታችን ጥሩ መሪ ለመሆን ምን ዓይነት ባህሪ ያስፈልጋል?",
          transliteration: "Dawit, be timihirt betachin tiru meri lemehon min aynet bahri yasfeligal?",
          english: "Dawit, what kind of character is needed to become a good leader in our school?"
        },
        {
          character: "Dawit",
          avatar: "👦",
          bubbleSide: "right",
          amharic: "ታማኝነት ዋነኛው እሴት ነው ፤ መሪው ለሌሎች መልካም ምሳሌ ሆኖ ተምሳሌት መሆን አለበት።",
          transliteration: "Tamagninet wanenyaw eset new, meriw le-leloch melkam misale hono temsalet mehon alebet.",
          english: "Loyalty is the primary value; the leader must serve as a role model by setting a good example for others."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Shield of the Shepherd King",
      passageAmharic: "በትናንትናው እቅድ ዳዊት የክፍላችን አዲስ ተማሪዎች መሪ በመሆን ተመረጠ። እሱ በትምህርት ቤቱ የስነ-ምግባር ጉባኤ ውስጥ አርአያ የሚሆን ታማኝነት አሳዬ። ዳዊት 'እውነተኛ መሪነት ሰዎችን ማዘዝ ሳይሆን መርዳትና በመልካም መንገድ መምራት ነው' የሚል ሀሳብ አቀረበ። እሱ የዕለት ተግባራትን ሁሉንም እኩል በማካፈል ታላቅ ተምሳሌት ሆነ። ሁሉም ተማሪዎች የእርሱን ብልህ ውሳኔ ለመከተል ሙሉ መስማማት ላይ ደረሱ። በዚህም ምክንያት ክፍላችን በዩኒቨርሲቲው አውራጃ ውስጥ ከፍተኛውን የስኬት ውጤት ማግኘት ቻለ።",
      passageTransliteration: "Be tinantnaw ekid Dawit ye kiflachin adis temarioch meri bemehon temerete. Esu be timihirt betu ye sine-migbar gubae wust ar'aya yemihon tamagninet asaye. Dawit 'ewnetegna merinet sewochin mazej sayihon merdat ena be melkam menged memrat new' yemil hasab aqerebe. Esu ye-elet tegbaratin hullunim ekul be-mekefafel talak temsalet hone. Hullum temarioch ye-ersun bilih wisane lemeketel mulu mesmamat lay deresu. Be-zihm mikniyat kiflachin be-university-w awraja wust kefteñawun ye-siket witet mageñet chale.",
      passageEnglish: "In yesterday's schedule, Dawit was elected as the leader of our classroom's new students. He demonstrated exemplary loyalty inside the school's integrity assembly. Dawit proposed an idea stating, 'True leadership is not ordering people but supporting them and guiding them on a pleasant route'. He became a grand role model by sharing all daily actions equally. All students arrived at full consensus to follow his wise decisions. For this reason, our classroom succeeded in securing the highest victory score in the university district.",
      tutorTip: "Dwell on historical Ethiopian leaders (like Emperor Menelik) for context."
    },
    writing: {
      heading: "✍️ Leadership Letters Studio",
      instructions: "Practice tracing the leader letters መሪ (Me) and ታ (Ta).",
      lettersToPractice: [
        {
          letter: "መ",
          phonetic: "Me",
          steps: ["Top curved loop", "Horizontal connector", "Base horizontal support"]
        },
        {
          letter: "ታ",
          phonetic: "Ta",
          steps: ["Vertical line segment with upper crown", "Mid horizontal support", "Lower right leg"]
        }
      ],
      wordChallenge: "ታማኝነት"
    },
    homework: [
      "Write three distinct qualities of an outstanding leader in Amharic script."
    ],
    submissionTip: "Record a short 30-second speech declaring your commitment to be a good 'Meri' sibling! 📣",
    parentActivities: [
      "Let kids coordinates family weekend cleaning details acting as safety directors labeled in Amharic."
    ],
    tutorPacing: [
      "10 mins: Leadership qualities brainstorm.",
      "25 mins: Reading analysis and sentence formulation.",
      "15 mins: Interactive word search and matching games."
    ],
    tutorTroubleshooting: [
      "Confirm that students isolate each syllable of 'Tamagninet' carefully during pronunciation."
    ],
    quiz: [
      {
        questionText: "What does 'መሪነት' mean?",
        options: ["Pencil case", "Leadership / Guidance", "Eating fruit", "Sleeping late"],
        correctAnswerIndex: 1,
        explanation: "'መሪነት' translates directly to leadership."
      },
      {
        questionText: "Which word represents 'Loyalty/Faithfulness'?",
        options: ["ውሳኔ", "ታማኝነት", "መፍትሔ", "ችግር"],
        correctAnswerIndex: 1,
        explanation: "'ታማኝነት' signifies loyalty and integrity."
      },
      {
        questionText: "What is 'መሪ'?",
        options: ["Leader / Guide", "Farming tool", "School textbook", "Red jacket"],
        correctAnswerIndex: 0,
        explanation: "'መሪ' (Meri) is a leader."
      },
      {
        questionText: "What does 'መከተል' represent?",
        options: ["To follow", "To run fast", "To write notes", "To sleep deeply"],
        correctAnswerIndex: 0,
        explanation: "'መከተል' yields the action to follow or accompany."
      }
    ],
    nextLessonTitle: "Ethiopian History Stories"
  }
];
