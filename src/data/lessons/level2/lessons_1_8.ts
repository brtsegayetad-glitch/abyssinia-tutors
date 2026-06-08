import { LessonDefinition } from "../../level1/types";

export interface Level2LessonDefinition extends LessonDefinition {
  level: number;
}

export const lessons_1_8: Level2LessonDefinition[] = [
  // --- LESSON 1: Talking About Your Day ---
  {
    level: 2,
    lessonNumber: 1,
    geezNumber: "፩",
    topic: "Talking About Your Day",
    theme: "My Daily Routine",
    phase: "Level 2 Stage 1: Social Connections",
    subheading: "Let's learn how to talk about what you do from morning to night in Amharic! Walk us through your daily routine.",
    imageUrl: "https://images.unsplash.com/photo-1512413313758-0cbcfc239474?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Describe morning, afternoon, and evening habits inside your day.",
      "Identify 5 key Amharic verbs for daily actions.",
      "Understand gender-specific conjugations for simple verbs.",
      "Create basic present-tense sentences about your actions."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ነቃሁ",
        english: "Nekahu",
        meaning: "I woke up",
        context: "Use 'ነቃሁ' when your eyes first pop open of the beautiful Addis morning.",
        tutorTip: "Stretch your arms and yawn as you pronounce 'Ne-ka-hu'.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1670002476161-5d08694a0439?q=80&w=1124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioText: "Nekahu. I woke up."
      },
      {
        fidel: "ውሃ ጠጣሁ",
        english: "Wha Tettahu",
        meaning: "I drank water",
        context: "Drinking refreshing water keeps you bright and healthy for school tasks.",
        tutorTip: "Pretend to drink from a glass when introducing 'Wha Tet-tah-u'.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1670426502021-a1d1b7b1aaed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioText: "Wha tettahu. I drank water."
      },
      {
        fidel: "ቁርስ በላሁ",
        english: "Kurs Belahu",
        meaning: "I ate breakfast",
        context: "Ready for your morning tea or local honey and firfir!",
        tutorTip: "The word 'Belahu' ends in -u, indicating 'I did it'.",
        imageUrl: "https://images.unsplash.com/photo-1713812358708-29cd1547f5a8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioText: "Kurs belahu. I ate breakfast."
      },
      {
        fidel: "አጠናሁ",
        english: "Atenahu",
        meaning: "I studied",
        context: "Great diaspora kids always set aside time to study and learn new codes.",
        tutorTip: "Points to progress and intelligence indicators.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=505&auto=format&fit=crop",
        audioText: "Atenahu. I studied."
      },
      {
        fidel: "ተኛሁ",
        english: "Tegnahu",
        meaning: "I slept",
        context: "When night falls, we rest to grow strong and healthy.",
        tutorTip: "Rest your head on folded palms as you say 'Teg-nah-u'.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1661397087554-2774b7e7332f?q=80&w=1170&auto=format&fit=crop",
        audioText: "Tegnahu. I slept."
      }
    ],
    exercises: [
      {
        amharic: "እኔ ጠዋት ነቃሁ።",
        transliteration: "Ene towat nekahu.",
        english: "I woke up in the morning.",
        tip: "Keep the vowel sound in 'towat' sweet and short."
      },
      {
        amharic: "እኔ ጥሩ ቁርስ በላሁ።",
        transliteration: "Ene tiru kurs belahu.",
        english: "I ate a good breakfast.",
        tip: "Frictionless tongue flow for 'tiru' representing 'good'!"
      }
    ],
    dialogue: {
      heading: "💬 Let's Chat: My Daily Steps!",
      scenario: "Yared tells his friend Blen what he did after waking up today.",
      roles: [
        {
          character: "Yared",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ብሌን ፣ ዛሬ ጠዋት መቼ ነቃሽ?",
          transliteration: "Blen, zare towat meche nekash?",
          english: "Blen, when did you wake up this morning?"
        },
        {
          character: "Blen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እኔ በጠዋት ነቃሁ እና ቁርስ በላሁ።",
          transliteration: "Ene betowat nekahu ena kurs belahu.",
          english: "I woke up early and ate breakfast."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: Almaz's Busy Day",
      passageAmharic: "አልማዝ ጠዋት ነቃች። እሷ ጣፋጭ ሻይ ጠጣች እና ደብተር ይዛ ወደ ትምህርት ቤት ሄደች። በትምህርት ቤት ውስጥ በጥሩ ሁኔታ አጠናች። ማታ ስትመለስ ደግሞ በደስታ ተኛች።",
      passageTransliteration: "Almaz towat nekach. Esswa tyafach shay tettach ena debter yiza wede timihirt bet hedech. Be timihirt bet wust betiru huneta atenach. Mata sitmeles degmo bedesta tegnach.",
      passageEnglish: "Almaz woke up in the morning. She drank sweet tea, took her notebook, and went to school. She studied very well in school. Returning in the evening, she slept happily.",
      tutorTip: "Focus on the feminine verbs: 'nekach' (she woke up) versus 'nekahu' (I woke up)."
    },
    writing: {
      heading: "✍️ Daily Action Characters",
      instructions: "Trace the characters that start our action verbs: ነ (Ne) and ቁ (Ku).",
      lettersToPractice: [
        {
          letter: "ነ",
          phonetic: "Ne",
          steps: ["Vertical line", "Left loop", "Flat base"]
        },
        {
          letter: "ቁ",
          phonetic: "Ku",
          steps: ["Circular head", "Right loop hook", "Base line"]
        }
      ],
      wordChallenge: "ነቃሁ"
    },
    homework: [
      "Write three actions you did today in your Amharic notebook.",
      "Trace the characters ነ, ኑ, ኒ, ና, ኔ, ን, ኖ three times.",
      "Practice reading Almaz's Busy Day passage aloud to a sibling."
    ],
    submissionTip: "Upload a picture of your notebook drawing your morning routine!",
    parentActivities: [
      "Ask your child 'Zare meche nekash?' or 'nekah?' in the morning.",
      "Use 'belahu' (I ate) and 'tettahu' (I drank) during dinner times."
    ],
    tutorPacing: [
      "10 mins: Daily routine brainstorm.",
      "20 mins: Verb conjugation drills.",
      "20 mins: Active speaking roleplay."
    ],
    tutorTroubleshooting: [
      "If terms are tough, use the physical wake-up gesture mimics."
    ],
    quiz: [
      {
        questionText: "What does 'ነቃሁ' mean?",
        options: ["I slept", "I woke up", "I studied", "I ran"],
        correctAnswerIndex: 1,
        explanation: "'ነቃሁ' (Nekahu) translates directly to 'I woke up' in Amharic."
      },
      {
        questionText: "How do you say 'I drank water'?",
        options: ["ቁርስ በላሁ", "ውሃ ጠጣሁ", "ትምህርት ቤት ሄድኩ", "ሻይ ፈለግኩ"],
        correctAnswerIndex: 1,
        explanation: "'ውሃ ጠጣሁ' means 'I drank water'."
      },
      {
        questionText: "Which word represents 'breakfast'?",
        options: ["ምሳ", "ቁርስ", "እራት", "ሻይ"],
        correctAnswerIndex: 1,
        explanation: "'ቁርስ' (Kurs) means breakfast."
      },
      {
        questionText: "For a female, how do we say 'she woke up'?",
        options: ["ነቃሁ", "ነቃህ", "ነቃች", "ነቃሽ"],
        correctAnswerIndex: 2,
        explanation: "'ነቃች' (Nekach) has the feminine ending for 'she woke up'."
      }
    ],
    nextLessonTitle: "Asking Simple Questions"
  },

  // --- LESSON 2: Asking Simple Questions ---
  {
    level: 2,
    lessonNumber: 2,
    geezNumber: "፪",
    topic: "Asking Simple Questions",
    theme: "Curiosity Amharic",
    phase: "Level 2 Stage 1: Social Connections",
    subheading: "Learn to ask who, what, when, where, and why in beautiful Amharic! Speak like a conversational detective.",
    imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Use question particles like 'ማን', 'ምንድን', and 'የት'.",
      "Formulate basic questions about items, people, and directions.",
      "Use rising pitch properly for question phrasing.",
      "Engage search inquiry dialogues correctly."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ማን",
        english: "Man",
        meaning: "Who",
        context: "Use 'ማн' to discover who did something cool, like 'Who is that trainer?'.",
        tutorTip: "A quick, sharp 'Man' sound gets instant replies.",
        imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=505&auto=format&fit=crop",
        audioText: "Man. It means Who."
      },
      {
        fidel: "ምንድን",
        english: "Minden",
        meaning: "What",
        context: "Used as 'ምንድን ነው?' meaning 'What is it?'. Excellent for pointing at new foods!",
        tutorTip: "The '-en' sound should be crisp.",
        imageUrl: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=505&auto=format&fit=crop",
        audioText: "Minden. It means What."
      },
      {
        fidel: "የት",
        english: "Yet",
        meaning: "Where",
        context: "To locate Ethiopia, the bathroom, or your missing soccer ball: 'የት ነው?'",
        tutorTip: "Keep it short, like the English word 'yet'.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Yet. It means Where."
      },
      {
        fidel: "መቼ",
        english: "Meche",
        meaning: "When",
        context: "Asking 'መቼ' tells you whether something is happening today or tomorrow.",
        tutorTip: "Emphasize the second syllable 'che'.",
        imageUrl: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=505&auto=format&fit=crop",
        audioText: "Meche. It means When."
      },
      {
        fidel: "እንዴት",
        english: "Endet",
        meaning: "How",
        context: "Use 'እንዴት' in 'እንዴት ነህ?' to ask people how they are doing warmly.",
        tutorTip: "A core social greeting particle.",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=505&auto=format&fit=crop",
        audioText: "Endet. It means How."
      }
    ],
    exercises: [
      {
        amharic: "ይህ ምንድን ነው?",
        transliteration: "Yih minden new?",
        english: "What is this?",
        tip: "Point playfully at an object on screen."
      },
      {
        amharic: "ትምህርት ቤት የት ነው?",
        transliteration: "Timihirt bet yet new?",
        english: "Where is the school?",
        tip: "Rise your tone on the word 'new'."
      }
    ],
    dialogue: {
      heading: "💬 Inquiry Dialogue: The Lost Toy!",
      scenario: "Kidus is searching for his red toy car and asks sister Feker.",
      roles: [
        {
          character: "Kidus",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ፍቅር ፣ መኪናዬ የት ነው?",
          transliteration: "Feker, mekinaye yet new?",
          english: "Feker, where is my car?"
        },
        {
          character: "Feker",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "ይህ ምንድን ነው? በሳጥኑ ውስጥ ነው።",
          transliteration: "Yih minden new? Be satnu wust new.",
          english: "What is this? It is inside the box."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: Asking Questions at the Table",
      passageAmharic: "በማዕድ ላይ አባባ 'ምሳ ምንድን ነው?' ብሎ ይጠይቃል። እማማ 'ጣፋጭ እንጀራ ነው' ትላለች። መቼ እንበላለን? አሁን እንበላለን! ሁላችንም በደስታ እንጫወታለን።",
      passageTransliteration: "Be ma'id lay ababa 'misa minden new?' bilo yeteyikal. Emama 'tyafach injera new' tilalech. Meche enbelalen? Ahun enbelalen! Hulachinim bedesta enchewatalen.",
      passageEnglish: "At the dining table, Dad asks 'What is lunch?'. Mom says 'It is delicious injera!'. When do we eat? We eat now! We all play happily.",
      tutorTip: "Help kids notice how 'misa' (lunch) and 'minden' (what) pair up."
    },
    writing: {
      heading: "✍️ Curiosity Characters",
      instructions: "Trace the inquisitive character ማ (Ma) and የ (Ye) used for location searches.",
      lettersToPractice: [
        {
          letter: "ማ",
          phonetic: "Ma",
          steps: ["Left small circle", "Horizontal wave", "Upright pillar"]
        },
        {
          letter: "የ",
          phonetic: "Ye",
          steps: ["U-shape", "Right leg hook", "Base line"]
        }
      ],
      wordChallenge: "ማን"
    },
    homework: [
      "Ask your parents three 'Yet new?' (Where is?) questions today.",
      "Write 'ይህ ምንድን ነው?' on your homework card.",
      "Trace the characters የ, ዩ, ዪ, ያ, ዬ, ይ, ዮ."
    ],
    submissionTip: "Upload a small recording of you asking 'Yet new?' with your toy!",
    parentActivities: [
      "Hide a toy and encourage your child to ask 'Mekinaye yet new?' (Where is my car?).",
      "Point at dinner items and ask 'Yih minden new?'."
    ],
    tutorPacing: [
      "10 mins: Question keywords review.",
      "25 mins: Hide and find question game.",
      "15 mins: Interactive spelling quiz."
    ],
    tutorTroubleshooting: [
      "If children confuse 'Meche' (When) and 'Minden' (What), link 'Minden' with objects."
    ],
    quiz: [
      {
        questionText: "How do you say 'Who' in Amharic?",
        options: ["የት", "መቼ", "ማን", "እንዴት"],
        correctAnswerIndex: 2,
        explanation: "'ማን' (Man) means who."
      },
      {
        questionText: "What does 'የት ነው?' mean?",
        options: ["Who is it?", "Where is it?", "What is it?", "When is it?"],
        correctAnswerIndex: 1,
        explanation: "'የት ነው?' (Yet new?) means 'Where is it?'."
      },
      {
        questionText: "Which question represents 'What is this?'?",
        options: ["ይህ ማን ነው?", "ይህ የት ነው?", "ይህ ምንድን ነው?", "ይህ መቼ ነው?"],
        correctAnswerIndex: 2,
        explanation: "'ይህ ምንድን ነው?' translates to 'What is this?'."
      },
      {
        questionText: "What is the meaning of 'መቼ'?",
        options: ["How", "Why", "Where", "When"],
        correctAnswerIndex: 3,
        explanation: "'መቼ' (Meche) represents 'When'."
      }
    ],
    nextLessonTitle: "Visiting Family"
  },

  // --- LESSON 3: Visiting Family ---
  {
    level: 2,
    lessonNumber: 3,
    geezNumber: "፫",
    topic: "Visiting Family",
    theme: "Family Bonds (ቤተሰብ)",
    phase: "Level 2 Stage 1: Social Connections",
    subheading: "Learn vocabulary for grandparents, uncles, aunts, and cousins! Experience the joy of Ethiopian family visits.",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Label 5 extended family members in Amharic.",
      "Express affection and respect towards elders.",
      "Translate phrases like 'I love my grandmother'.",
      "Engage greetings dialogues for relatives."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "አያት",
        english: "Ayat",
        meaning: "Grandparent",
        context: "We respect our 'አያት' for their wisdom, kind smiles, and traditional stories.",
        tutorTip: "A warm family keyword. Can apply to grandmother or grandfather.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Ayat. Grandparent."
      },
      {
        fidel: "አጎት",
        english: "Agot",
        meaning: "Uncle",
        context: "Your 'አጎት' always brings sweet local honey, fruits, and sports news.",
        tutorTip: "Emphasize the 'A-got' syllables.",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=505&auto=format&fit=crop",
        audioText: "Agot. Uncle."
      },
      {
        fidel: "አክስት",
        english: "Akist",
        meaning: "Aunt",
        context: "Your 'አክስት' helps bake injera and sings lovely lullabies.",
        tutorTip: "The cluster 'kst' should be clean.",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=505&auto=format&fit=crop",
        audioText: "Akist. Aunt."
      },
      {
        fidel: "የአጎት ልጅ",
        english: "Yegot Lij",
        meaning: "Cousin (Uncle's Child)",
        context: "Cousins are your best friends to run and play soccer with at the compound.",
        tutorTip: "Combining 'Yegot' (uncle's) + 'Lij' (child).",
        imageUrl: "https://images.unsplash.com/photo-1484662029-3a258c5 e8b15?w=505&auto=format&fit=crop",
        audioText: "Yegot lij. Cousin."
      },
      {
        fidel: "እወድሻለሁ",
        english: "Ewedishalehu",
        meaning: "I love you (to a Girl)",
        context: "Say 'እወድሻለሁ' to your mother, aunt, or grandmother to melt their hearts.",
        tutorTip: "Help kids with the emotional tone.",
        imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=505&auto=format&fit=crop",
        audioText: "Ewedishalehu. I love you."
      }
    ],
    exercises: [
      {
        amharic: "እኔ አያቴን እወዳለሁ።",
        transliteration: "Ene ayaten ewedalehu.",
        english: "I love my grandparent.",
        tip: "Form a heart shape with your hands!"
      },
      {
        amharic: "አጎቴ መጣ!",
        transliteration: "Agote metta!",
        english: "My uncle arrived!",
        tip: "Exclaim with extreme joy!"
      }
    ],
    dialogue: {
      heading: "💬 Relative visit Dialogue",
      scenario: "Helen visits grandmother Ayat's beautiful garden in Bahir Dar.",
      roles: [
        {
          character: "Ayat (Grandmother)",
          avatar: "👵",
          bubbleSide: "left",
          amharic: "ሄለን ልጄ ፣ እንደምን አደርሽ?",
          transliteration: "Helen lije, endemin adersh?",
          english: "Helen my child, good morning?"
        },
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አያቴ ደህና ነኝ ፣ እወድሻለሁ!",
          transliteration: "Ayate dehna negn, ewedishalehu!",
          english: "I am fine grandmother, I love you!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: A Warm Weekend Visit",
      passageAmharic: "በሳምንቱ መጨረሻ እኛ ወደ አያታችን ቤት እንሄዳለን። በዚያ አጎቴና አክስቴ አብረው ይኖራሉ። የአጎቴ ልጅ ቶሎ መጥቶ ኳስ ይሰጠኛል። ሁላችንም አብረን እንጫወታለን።",
      passageTransliteration: "Be samintu mecheresha ene wede ayatachin bet enhedalen. Beziya agote ena akiste abrew yinoralu. Yegote lij tolo metto kwas yisetegnal. Hulachinim abren enchewatalen.",
      passageEnglish: "At the end of the week, we go to our grandparent's house. There, my uncle and my aunt live together. My cousin quickly comes and gives me a ball. We all play together.",
      tutorTip: "Highlight the hospitality of Ethiopian extended family dynamics!"
    },
    writing: {
      heading: "✍️ Family Honor Characters",
      instructions: "Trace the respectful symbols አ (A) and ያ (Ya) used for grandparents.",
      lettersToPractice: [
        {
          letter: "አ",
          phonetic: "A",
          steps: ["Left pillar curve", "Right horizontal slash", "Center line"]
        },
        {
          letter: "ያ",
          phonetic: "Ya",
          steps: ["Vertical loop", "Hanger hook", "Bottom base bar"]
        }
      ],
      wordChallenge: "አያት"
    },
    homework: [
      "Call an uncle or aunt and greet them in Amharic: 'Selam!'",
      "Write 'እኔ አያቴን እወዳለሁ' on your drawing card.",
      "Draw your family tree with Amharic labels."
    ],
    submissionTip: "Post a screenshot of your labeled family tree artwork!",
    parentActivities: [
      "Teach children the difference between 'Agot' (Uncle) and 'Akist' (Aunt) visually with photo frames."
    ],
    tutorPacing: [
      "15 mins: Review relatives words.",
      "20 mins: Affection phrases translation exercise.",
      "15 mins: Interactive spelling game."
    ],
    tutorTroubleshooting: [
      "If kids say 'Ayat' incorrectly, prompt them with the word 'eye-at' phonetic guide."
    ],
    quiz: [
      {
        questionText: "What is 'አያት' in English?",
        options: ["Cousin", "Brother", "Grandparent", "Uncle"],
        correctAnswerIndex: 2,
        explanation: "'አያት' (Ayat) means grandparent."
      },
      {
        questionText: "How do you say 'Uncle' in Amharic?",
        options: ["አጎት", "አክስት", "አያት", "ልጅ"],
        correctAnswerIndex: 0,
        explanation: "'አጎት' (Agot) translates to uncle."
      },
      {
        questionText: "Which word represents 'Aunt'?",
        options: ["እህት", "አክስት", "ናት", "ድስት"],
        correctAnswerIndex: 1,
        explanation: "'አክስት' (Akist) means aunt."
      },
      {
        questionText: "What does 'እወድሻለሁ' mean?",
        options: ["I hate you", "I love you (to a Girl)", "I see you", "I miss you"],
        correctAnswerIndex: 1,
        explanation: "'እወድሻለሁ' is 'I love you' addressed to a female."
      }
    ],
    nextLessonTitle: "Weekend Activities"
  },

  // --- LESSON 4: Weekend Activities ---
  {
    level: 2,
    lessonNumber: 4,
    geezNumber: "፬",
    topic: "Weekend Activities",
    theme: "Saturdays & Sundays (ቅዳሜና እሁድ)",
    phase: "Level 2 Stage 1: Social Connections",
    subheading: "Learn to discuss sports, park trips, and cooking over dynamic weekends in Amharic!",
    imageUrl: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Say Saturday and Sunday in Amharic.",
      "Name 3 favorite weekend leisure actions.",
      "Conjugate 'I played' and 'I ran' correctly.",
      "Understand passive weekend routines."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ቅዳሜ",
        english: "Kidame",
        meaning: "Saturday",
        context: "ቅዳሜ is the prime day for playing outside and help pack picnic foods.",
        tutorTip: "Gentle cadence on 'Ki-da-me'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Kidame. Saturday."
      },
      {
        fidel: "እሁድ",
        english: "Ehud",
        meaning: "Sunday",
        context: "እሁድ represents family reunions, delicious dinners, and cozy movies.",
        tutorTip: "The 'E-hud' should be short.",
        imageUrl: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?w=505&auto=format&fit=crop",
        audioText: "Ehud. Sunday."
      },
      {
        fidel: "ተጫወትኩ",
        english: "Techawetku",
        meaning: "I played",
        context: "Use 'ተጫወትኩ' to describe video games, board games, or park sports tag.",
        tutorTip: "Help build confidence over the longer word.",
        imageUrl: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?w=505&auto=format&fit=crop",
        audioText: "Techawetku. I played."
      },
      {
        fidel: "ሮጥኩ",
        english: "Rotku",
        meaning: "I ran",
        context: "Running fast in soccer makes you feel like an Ethiopian Olympic track star!",
        tutorTip: "A quick word. 'Rot-ku'.",
        imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=505&auto=format&fit=crop",
        audioText: "Rotku. I ran."
      },
      {
        fidel: "ፓርክ",
        english: "Park",
        meaning: "Park",
        context: "Beautiful green grass under tall trees is called a 'ፓርክ'.",
        tutorTip: "Direct borrow loanword.",
        imageUrl: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=505&auto=format&fit=crop",
        audioText: "Park. Park."
      }
    ],
    exercises: [
      {
        amharic: "እኔ ቅዳሜ ፓርክ ሄድኩ።",
        transliteration: "Ene Kidame park hedku.",
        english: "I went to the park on Saturday.",
        tip: "Point with enthusiasm as if traveling."
      },
      {
        amharic: "እኔ ከጓደኛዬ ጋር ተጫወትኩ።",
        transliteration: "Ene kegwadegnaye gar techawetku.",
        english: "I played with my friend.",
        tip: "Smile and wave your index fingers."
      }
    ],
    dialogue: {
      heading: "💬 Dialogue: Weekend Fun!",
      scenario: "Yonas asks his cousin Selam what she is doing this weekend.",
      roles: [
        {
          character: "Yonas",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሰላም ፣ እሁድ ምን ታደርጊያለሽ?",
          transliteration: "Selam, Ehud min tadergiyalesh?",
          english: "Selam, what are you doing on Sunday?"
        },
        {
          character: "Selam",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እኔ እሁድ ፓርክ ውስጥ እሮጣለሁ!",
          transliteration: "Ene Ehud park wust erotalehu!",
          english: "I will run inside the park on Sunday!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: Saturday Joy",
      passageAmharic: "ዛሬ ቅዳሜ ነው። ጠዋት ላይ እኔና አጎቴ ወደ ትልቅ ፓርክ ሄድን። በፓርኩ ውስጥ በደስታ ሮጥኩ እና ኳስ ተጫወትኩ። ማታ ላይ ደስ የሚል ምግብ በላን። ቅዳሜ በጣም ደስ ይላል።",
      passageTransliteration: "Zare Kidame new. Towat lay ene ena agote wede tilik park hedn. Be parku wust bedesta rotku ena kwas techawetku. Mata lay des yemil migib belan. Kidame betam des yilal.",
      passageEnglish: "Today is Saturday. In the morning, my uncle and I went to a big park. In the park, I ran happily and played soccer. In the evening, we ate delightful food. Saturday is so joyful.",
      tutorTip: "Emphasize how 'Kidame' acts as Saturday and is a peak action day."
    },
    writing: {
      heading: "✍️ Weekend Letters",
      instructions: "Practice tracing the weekend letters ቅ (Ki) and እ (I).",
      lettersToPractice: [
        {
          letter: "ቅ",
          phonetic: "Ki",
          steps: ["Upper loop", "Vertical leg", "Small right arm hook"]
        },
        {
          letter: "እ",
          phonetic: "I",
          steps: ["Inverted crescent", "Middle divider", "Base loop"]
        }
      ],
      wordChallenge: "ቅዳሜ"
    },
    homework: [
      "Tell your tutor what you usually do on Sunday in Amharic.",
      "Write 'እኔ እሁድ ተጫወትኩ' in your diary.",
      "Trace the characters ቅ, ቁ, ቂ, ቃ, ቄ, ቅ, ቆ."
    ],
    submissionTip: "Upload a picture of you playing your favorite weekend game!",
    parentActivities: [
      "Ask your child on Friday: 'Kidame min tadergah?' (What will you do on Saturday?)."
    ],
    tutorPacing: [
      "10 mins: Calendar review.",
      "25 mins: Weekend action verbs roleplay.",
      "15 mins: Scrambled spelling games."
    ],
    tutorTroubleshooting: [
      "If 'Techawetku' is long, slow it down to: Te-cha-wet-ku."
    ],
    quiz: [
      {
        questionText: "What does 'ቅዳሜ' mean?",
        options: ["Friday", "Sunday", "Saturday", "Monday"],
        correctAnswerIndex: 2,
        explanation: "'ቅዳሜ' (Kidame) represents Saturday."
      },
      {
        questionText: "How do you say 'I played'?",
        options: ["ሮጥኩ", "ተጫወትኩ", "በላሁ", "ተኛሁ"],
        correctAnswerIndex: 1,
        explanation: "'ተጫወትኩ' means I played."
      },
      {
        questionText: "What is 'Sunday' in Amharic?",
        options: ["ቅዳሜ", "ማክሰኞ", "እሁድ", "ሀሙስ"],
        correctAnswerIndex: 2,
        explanation: "'እሁድ' (Ehud) is Sunday."
      },
      {
        questionText: "What is a 'ፓርክ'?",
        options: ["School", "Park", "House", "Stadium"],
        correctAnswerIndex: 1,
        explanation: "'ፓርክ' translates to Park."
      }
    ],
    nextLessonTitle: "Subjects in School"
  },

  // --- LESSON 5: Subjects in School ---
  {
    level: 2,
    lessonNumber: 5,
    geezNumber: "፭",
    topic: "Subjects in School",
    theme: "Learning & Subjects (ትምህርት)",
    phase: "Level 2 Stage 1: Social Connections",
    subheading: "Learn to say Math, Science, Art, and History in Amharic! Express your favorite educational subjects.",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Identify 4 school subject names in Amharic.",
      "State your absolute favorite subject using correct grammar.",
      "Read short academic vocabulary blocks.",
      "Formulate basic study routines."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ሒሳብ",
        english: "Hisab",
        meaning: "Math",
        context: "We compute numbers, solve fractions, and do cool counts in 'ሒሳብ'.",
        tutorTip: "Very easy to pronounce. 'Hee-saab'. Also represents money bills!",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=505&auto=format&fit=crop",
        audioText: "Hisab. Math."
      },
      {
        fidel: "ሳይንስ",
        english: "Science",
        meaning: "Science",
        context: "Discovering stars, plants, and chemical reactions inside the 'ሳይንስ' lab.",
        tutorTip: "Loanword similar to english phonetic sound.",
        imageUrl: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=505&auto=format&fit=crop",
        audioText: "Science. Science."
      },
      {
        fidel: "ታሪክ",
        english: "Tarik",
        meaning: "History",
        context: "We study Lalibela, the battle of Adwa, and heroic leaders in 'ታሪክ' class.",
        tutorTip: "Roll the 'R' lightly. 'Taa-reek'.",
        imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=505&auto=format&fit=crop",
        audioText: "Tarik. History."
      },
      {
        fidel: "ስዕል",
        english: "Si'il",
        meaning: "Art / Painting",
        context: "Splashing green, yellow, and red colors on canvas happens in 'ስዕል' class.",
        tutorTip: "A glottal stop can lead up to the 'il' ending.",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=505&auto=format&fit=crop",
        audioText: "Si'il. Art."
      },
      {
        fidel: "እወዳለሁ",
        english: "Ewedalehu",
        meaning: "I love / I like",
        context: "Say 'እወዳለሁ' to express what you enjoy doing, like 'I like history class!'.",
        tutorTip: "Gender neutral when applied to objects or classes.",
        imageUrl: "https://images.unsplash.com/photo-1547124224-8f47c8f615e4?w=505&auto=format&fit=crop",
        audioText: "Ewedalehu. I love."
      }
    ],
    exercises: [
      {
        amharic: "እኔ ሒሳብ እወዳለሁ።",
        transliteration: "Ene Hisab ewedalehu.",
        english: "I love Math.",
        tip: "Tap your head denoting intelligence!"
      },
      {
        amharic: "ዛሬ የሳይንስ ክፍል አለኝ።",
        transliteration: "Zare ye Science kifil alegn.",
        english: "I have Science class today.",
        tip: "Stand upright and look structured."
      }
    ],
    dialogue: {
      heading: "💬 Classroom Dialogue: Favorite Classes",
      scenario: "Brook asks Leah what class she is studying in school today.",
      roles: [
        {
          character: "Brook",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሊያ ፣ ትምህርት ቤት ምን ትወጃለሽ?",
          transliteration: "Leah, timihirt bet min tiwejalesh?",
          english: "Leah, what do you like at school?"
        },
        {
          character: "Leah",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እኔ ታሪክ እና ስዕል እወዳለሁ!",
          transliteration: "Ene Tarik ena Si'il ewedalehu!",
          english: "I love History and Art!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: My school Schedule",
      passageAmharic: "ትምህርት ቤት በጣም ደስ ይላል። ሰኞ ጠዋት እኛ ሒሳብ እናጠናለን። ከሰዓት በኋላ ደግሞ የሳይንስ ክፍል አለን። እኔ ስዕል ሳልም በጣም ደስ ይለኛል። ታሪክ ማጥናት ደግሞ አእምሮዬን ያሳድገዋል።",
      passageTransliteration: "Timihirt bet betam des yilal. Segno towat ene Hisab enatenalen. Kese'at behuala degmo ye Science kifil alen. Ene si'il salim betam des yilignal. Tarik matnat degmo a'imroyen yasadgewal.",
      passageEnglish: "School is so pleasant. On Monday morning, we study Math. In the afternoon, we have Science class. I feel very happy when I draw artwork. Studying History helps grow my mind.",
      tutorTip: "Acknowledge the balance of science, art, and numbers inside their minds."
    },
    writing: {
      heading: "✍️ Academic Letters",
      instructions: "Practice tracing the learning letters ሂ (Hee) and ታ (Ta).",
      lettersToPractice: [
        {
          letter: "ሂ",
          phonetic: "Hee",
          steps: ["Two parallel legs", "Horizontal roof line", "Center horizontal cross"]
        },
        {
          letter: "ታ",
          phonetic: "Ta",
          steps: ["Left vertical hook", "Right leg bend", "Cross-bar hat"]
        }
      ],
      wordChallenge: "ሒሳብ"
    },
    homework: [
      "Ask a sibling what their favorite school subject is in Amharic.",
      "Draw a picture representing 'ስዕል' (Art) and label it in Amharic.",
      "Trace the academic characters ታ, ቱ, ቲ, ታ, ቴ, ት, ቶ."
    ],
    submissionTip: "Upload your beautiful drawing labeled 'Si'il'! 🎨",
    parentActivities: [
      "Ask 'Zare Hisab atenah?' (Did you study Math today?) after they return home."
    ],
    tutorPacing: [
      "10 mins: Educational icebreaker.",
      "25 mins: Academic subject translation grids.",
      "15 mins: Interactive spelling quest."
    ],
    tutorTroubleshooting: [
      "If they struggle with 'Si'il', explain that it has a brief silent internal stop."
    ],
    quiz: [
      {
        questionText: "What does 'ሒሳብ' represent?",
        options: ["History", "Art", "Math", "Science"],
        correctAnswerIndex: 2,
        explanation: "'ሒሳብ' (Hisab) is Math."
      },
      {
        questionText: "How do you say 'I love / I like'?",
        options: ["እወዳለሁ", "አጠናለሁ", "እሮጣለሁ", "ምናገራለሁ"],
        correctAnswerIndex: 0,
        explanation: "'እወዳለሁ' (Ewedalehu) means I love / I like."
      },
      {
        questionText: "Which subject discusses global events and heritage?",
        options: ["ሳይንስ", "ሒሳብ", "ታሪክ", "ስዕል"],
        correctAnswerIndex: 2,
        explanation: "'ታሪክ' (Tarik) means History."
      },
      {
        questionText: "What is 'ስዕል' in English?",
        options: ["Science", "Art", "Break time", "Library"],
        correctAnswerIndex: 1,
        explanation: "'ስዕል' (Si'il) means Art or Painting."
      }
    ],
    nextLessonTitle: "Classroom Conversations"
  },

  // --- LESSON 6: Classroom Conversations ---
  {
    level: 2,
    lessonNumber: 6,
    geezNumber: "፮",
    topic: "Classroom Conversations",
    theme: "School Conversations",
    phase: "Level 2 Stage 1: Social Connections",
    subheading: "Learn to ask for a pencil, open a book, and converse with classmates and teachers!",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Ask for learning supplies like pencils and books politely.",
      "Understand standard teacher instructions like 'sit down'.",
      "Gain confidence using school etiquette phrases.",
      "Translate sentences like 'Check your notebook'."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "እባክህ",
        english: "Ebakih",
        meaning: "Please (to a Boy)",
        context: "Politeness is highly valued! Use 'እባክህ' when borrowing a classmate's pencil.",
        tutorTip: "The '-h' suffix denotes talking to a male.",
        imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=505&auto=format&fit=crop",
        audioText: "Ebakih. Please to a boy."
      },
      {
        fidel: "እርሳስ",
        english: "Ersas",
        meaning: "Pencil",
        context: "We draw colorful landscapes and solve Math equations with our handy 'እርሳስ'.",
        tutorTip: "A crisp double 'S' sound. 'Ihr-saas'.",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=505&auto=format&fit=crop",
        audioText: "Ersas. Pencil."
      },
      {
        fidel: "ደብተር",
        english: "Debter",
        meaning: "Notebook",
        context: "Open your green 'ደብተር' to capture Amharic syllables daily.",
        tutorTip: "Highly authentic academic word.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=505&auto=format&fit=crop",
        audioText: "Debter. Notebook."
      },
      {
        fidel: "ቁጭ በል",
        english: "Kuch Bel",
        meaning: "Sit Down (to a Boy)",
        context: "A teacher says 'ቁጭ በል' so that students are seated and ready for study.",
        tutorTip: "Action indicator. Encourage quick seat gestures.",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=505&auto=format&fit=crop",
        audioText: "Kuch bel. Sit down."
      },
      {
        fidel: "አምጣ",
        english: "Amta",
        meaning: "Bring / Give (to a Boy)",
        context: "Used to request things politely, like 'Bring me the book, please.'",
        tutorTip: "Sharp focus on the 'T' sound.",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=505&auto=format&fit=crop",
        audioText: "Amta. Bring."
      }
    ],
    exercises: [
      {
        amharic: "እባክህ እርሳስ አምጣ።",
        transliteration: "Ebakih ersas amta.",
        english: "Please, bring a pencil.",
        tip: "Form an open receiving hand gesture."
      },
      {
        amharic: "ደብተርክን ክፈት።",
        transliteration: "Debterikin kifet.",
        english: "Open your notebook.",
        tip: "Mime opening a book dramatically!"
      }
    ],
    dialogue: {
      heading: "💬 Classroom SUPPLIES Talk",
      scenario: "Abel asks his seatmate Kidus for an extra pencil during painting class.",
      roles: [
        {
          character: "Abel",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ኪዱስ እባክህ እርሳስ አምጣ?",
          transliteration: "Kidus ebakih ersas amta?",
          english: "Kidus, please can you bring a pencil?"
        },
        {
          character: "Kidus",
          avatar: "👦",
          bubbleSide: "right",
          amharic: "እሺ ፣ ይኸው እርሳስ!",
          transliteration: "Eshi, yihew ersas!",
          english: "Okay, here is the pencil!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Respectful Student",
      passageAmharic: "ክፍል ውስጥ መምህሩ ገባ። ተማሪዎቹ በፍጥነት 'ቁጭ በሉ' ተባሉ። መምህሩ 'ደብተር ክፈቱ' አለ። አቤል እርሳስ አልነበረውም። 'እባክህ እርሳስ አምጣ' ብሎ ለመነ። ሁሉም ተባብረው አጠኑ።",
      passageTransliteration: "Kifil wust memhiru geba. Temariwochu be-fignat 'kuch belu' tebalu. Memhiru 'debter kifetu' ale. Abel ersas alnebirew. 'Ebakih ersas amta' bilo lemene. Hulachinim tebabrew atenu.",
      passageEnglish: "The teacher entered the classroom. The students were quickly told 'Please sit down'. The teacher said 'Open notebooks'. Abel did not have a pencil. He politely requested 'Please bring me a pencil'. They all studied collaboratively.",
      tutorTip: "Acknowledge the community values of sharing learning materials at school."
    },
    writing: {
      heading: "✍️ Etiquette Characters",
      instructions: "Trace the sharing letters እ (E) and እ (Ih) showing classroom support.",
      lettersToPractice: [
        {
          letter: "እ",
          phonetic: "E",
          steps: ["Curved left shield", "Center slash", "Lower hook foot"]
        },
        {
          letter: "ር",
          phonetic: "Re",
          steps: ["Vertical start", "Slight diagonal drop", "Base tail"]
        }
      ],
      wordChallenge: "እርሳስ"
    },
    homework: [
      "Find three study items at home and label them physically or in notebook using 'እርሳስ' or 'ደብተር'.",
      "Practice saying 'Ebakih' or 'Ebakish' to family members when borrowing things."
    ],
    submissionTip: "Upload a picture of your pencil labeled 'እርሳስ' in notebook!",
    parentActivities: [
      "Request objects with 'Ersas amta' (bring a pencil) or 'Debter amta' during homework sessions."
    ],
    tutorPacing: [
      "10 mins: Supply names flashcards.",
      "25 mins: Command execution game (Simon Says).",
      "15 mins: Syllable writing test."
    ],
    tutorTroubleshooting: [
      "If pupils say 'Kuch' like English, teach them the crisp explosion 'K' in Amharic."
    ],
    quiz: [
      {
        questionText: "What does 'እርሳስ' mean?",
        options: ["Notebook", "Pencil", "Desk", "Eraser"],
        correctAnswerIndex: 1,
        explanation: "'እርሳስ' (Ersas) represents a pencil."
      },
      {
        questionText: "How do you ask for something 'Please' to a boy?",
        options: ["አምጣ", "ቁጭ በል", "እባክህ", "እሺ"],
        correctAnswerIndex: 2,
        explanation: "'እባክህ' (Ebakih) means please to a male classmate."
      },
      {
        questionText: "What is 'ደብተር'?",
        options: ["Pencil case", "Calculator", "Notebook", "Blackboard"],
        correctAnswerIndex: 2,
        explanation: "'ደብተር' (Debter) means notebook."
      },
      {
        questionText: "What command is 'ቁጭ በል'?",
        options: ["Stand up", "Read aloud", "Sit down", "Open book"],
        correctAnswerIndex: 2,
        explanation: "'ቁጭ በል' translates directly to sit down."
      }
    ],
    nextLessonTitle: "Asking for Help"
  },

  // --- LESSON 7: Asking for Help ---
  {
    level: 2,
    lessonNumber: 7,
    geezNumber: "፯",
    topic: "Asking for Help",
    theme: "Help & Community (እርዳታ)",
    phase: "Level 2 Stage 1: Social Connections",
    subheading: "Learn how to ask for help, ask directions, and express difficulties politely in Amharic!",
    imageUrl: "https://images.unsplash.com/photo-1521791136368-1a46827d0a16?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Express need of assistance politely: 'እባክህ እርዳኝ'.",
      "State if something is unclear: 'አልገባኝም'.",
      "Respond graciously to answers or help given.",
      "Use support vocabulary during exercises."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "እርዳኝ",
        english: "Irdagn",
        meaning: "Help me (to a Boy)",
        context: "Used whenever you need assist in tie your shoes or solving a tough math puzzle.",
        tutorTip: "A supportive word. 'Ihr-dagn' ends with a soft nasal 'gn'.",
        imageUrl: "https://images.unsplash.com/photo-1484662029-3a258c5e8b15?w=505&auto=format&fit=crop",
        audioText: "Irdagn. Help me."
      },
      {
        fidel: "አልገባኝም",
        english: "Algebagnim",
        meaning: "I don't understand",
        context: "Perfectly normal for learning! Say 'አልገባኝም' if a phonetic symbol looks confusing.",
        tutorTip: "Encourage honest learning reflection.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Algebagnim. I don't understand."
      },
      {
        fidel: "አመሰግናለሁ",
        english: "Ameseginalehu",
        meaning: "Thank you",
        context: "Say 'አመሰግናለሁ' to people who open doors, write notes, or teach you skills.",
        tutorTip: "Essential social etiquette word. Practice multiple times.",
        imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=505&auto=format&fit=crop",
        audioText: "Ameseginalehu. Thank you."
      },
      {
        fidel: "ጥያቄ",
        english: "Tiyake",
        meaning: "Question / Inquiry",
        context: "If you want to discover more, say 'ጥያቄ አለኝ' meaning 'I have a question!'.",
        tutorTip: "The glottal popping 'T' in 'Tiyake' represents active curiosity.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Tiyake. Question."
      },
      {
        fidel: "እባክሽ",
        english: "Ebakish",
        meaning: "Please (to a Girl)",
        context: "Used to request things politely to females like aunties, moms, or sisters.",
        tutorTip: "Ensure final 'sh' sound is emphasized nicely.",
        imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=505&auto=format&fit=crop",
        audioText: "Ebakish. Please."
      }
    ],
    exercises: [
      {
        amharic: "እባክህ እርዳኝ ፣ አልገባኝም!",
        transliteration: "Ebakih irdagn, algebagnim!",
        english: "Please help me, I don't understand!",
        tip: "Hold hands open asking for help."
      },
      {
        amharic: "አስተማሪዬ ፣ ጥያቄ አለኝ።",
        transliteration: "Astemariye, tiyake alegn.",
        english: "My teacher, I have a question.",
        tip: "Raise your hand proudly as if in a real classroom!"
      }
    ],
    dialogue: {
      heading: "💬 asking support Dialogues",
      scenario: "Ruth seeks assistance with Amharic syllables from her supportive tutor, Ato Solomon.",
      roles: [
        {
          character: "Ruth",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "አስተማሪዬ እባክህ እርዳኝ ፣ አልገባኝም።",
          transliteration: "Astemariye ebakih irdagn, algebagnim.",
          english: "My teacher please help me, I don't understand physics."
        },
        {
          character: "Ato Solomon",
          avatar: "👨",
          bubbleSide: "right",
          amharic: "እሺ ፣ ቶሎ እረዳሻለሁ!",
          transliteration: "Eshi, tolo eredashalehu!",
          english: "Okay, I will help you quickly!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: Asking for Support",
      passageAmharic: "ተማሪው በትምህርት ቤት ሒሳብ አጠና። አንድ ትልቅ ጥያቄ ነበረው። በጣም ስላልገባው 'እርዳኝ' ብሎ መለሰ። መምህሩ መጥቶ ረዳው። ተማሪው በጣም ደስ ብሎት 'አመሰግናለሁ!' አለ።",
      passageTransliteration: "Temariw be timihirt bet Hisab atena. And tilik tiyake neberew. Betam silalgebaw 'irdagn' bilo melese. Memhiru metto redaw. Temariw betam des bilot 'Ameseginalehu!' ale.",
      passageEnglish: "The student studied Math at school. He had a big question. Since he didn't understand, he replied 'Help me'. The teacher came and assisted him. Being very happy, the student said 'Thank you!'.",
      tutorTip: "Focus on how gratitude 'Ameseginalehu' resolves difficulties pleasantly."
    },
    writing: {
      heading: "✍️ Support Letters",
      instructions: "Practice tracing the supportive letters እ (Ir) and ጥ (Ti).",
      lettersToPractice: [
        {
          letter: "እ",
          phonetic: "Ir",
          steps: ["Left moon shape", "Middle bar", "Bottom connector"]
        },
        {
          letter: "ጥ",
          phonetic: "Ti",
          steps: ["Horizontal roof", "Looping hanger", "Base bracket touch"]
        }
      ],
      wordChallenge: "ጥያቄ"
    },
    homework: [
      "Practice saying 'Ameseginalehu' (Thank you) multiple times today at table.",
      "Raise your hand and say 'Tiyake alegn' in your online tutoring sessions.",
      "Trace the question syllables ጥ, ጡ, ጢ, ጣ, ጤ, ጥ, ጦ."
    ],
    submissionTip: "Upload a picture of your notebook tracing letters clearly!",
    parentActivities: [
      "Create opportunities for children to tell you 'Ameseginalehu' by handing them homework tools."
    ],
    tutorPacing: [
      "10 mins: Etiquette drill.",
      "25 mins: 'I don't understand' classroom scenario mimicry.",
      "15 mins: Matchmaking bubble challenges."
    ],
    tutorTroubleshooting: [
      "Help children say 'Ameseginalehu' smoothly by segmenting: Ah-meh-seh-gih-nah-leh-hoo."
    ],
    quiz: [
      {
        questionText: "What does 'አልገባኝም' mean?",
        options: ["I understand", "I don't understand", "I don't like it", "Where is it?"],
        correctAnswerIndex: 1,
        explanation: "'አልገባኝም' (Algebagnim) means 'I don't understand'."
      },
      {
        questionText: "How do you say 'Thank you'?",
        options: ["እሺ", "እባክህ", "እርዳኝ", "አመሰግናለሁ"],
        correctAnswerIndex: 3,
        explanation: "'አመሰግናለሁ' translates to thank you."
      },
      {
        questionText: "Which word represents 'Question'?",
        options: ["ደብተር", "ርሳስ", "ጥያቄ", "መልስ"],
        correctAnswerIndex: 2,
        explanation: "'ጥያቄ' (Tiyake) means question."
      },
      {
        questionText: "How do you ask a female 'Please'?",
        options: ["እባክህ", "እባክሽ", "እርዳኝ", "አምጣ"],
        correctAnswerIndex: 1,
        explanation: "'እባክሽ' is the correct female-addressed version of please."
      }
    ],
    nextLessonTitle: "Reading Together"
  },

  // --- LESSON 8: Reading Together ---
  {
    level: 2,
    lessonNumber: 8,
    geezNumber: "፰",
    topic: "Reading Together",
    theme: "Heritage Books (መጻሕፍት)",
    phase: "Level 2 Stage 1: Social Connections",
    subheading: "Learn vocabulary for book reading, storytelling, and library visits in Amharic!",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Learn school supply vocabulary for books: 'መጽሐፍ'.",
      "Express active reading actions: 'አነባለሁ'.",
      "Say story or folklore words nicely: 'ታሪክ'.",
      "Engage story reading challenges."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "መጽሐፍ",
        english: "Metsihaf",
        meaning: "Book",
        context: "We open a colorful 'መጽሐፍ' to read about lions, castles, and great kingdoms.",
        tutorTip: "The 'M-tsi-haf' should be read clearly.",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=505&auto=format&fit=crop",
        audioText: "Metsihaf. Book."
      },
      {
        fidel: "አነባለሁ",
        english: "Anebalehu",
        meaning: "I read / I am reading",
        context: "Say 'አነባለሁ' when holding a book up under the study desk or near bed.",
        tutorTip: "Action indicator. Encourage holding books.",
        imageUrl: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=505&auto=format&fit=crop",
        audioText: "Anebalehu. I read."
      },
      {
        fidel: "ታሪክ",
        english: "Tarik",
        meaning: "Story / Heritage Tales",
        context: "Ethiopia has thousands of epic ancient tales and folklore stories ('ታሪክ') for kids.",
        tutorTip: "Encourage active dramatic expression.",
        imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=505&auto=format&fit=crop",
        audioText: "Tarik. Story."
      },
      {
        fidel: "ጥሩ",
        english: "Tiru",
        meaning: "Good / Fine",
        context: "Used to describe pleasant things, like 'Metsihaf tiru new' (The book is good).",
        tutorTip: "Light tongue tickle on 'Tiru'.",
        imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=505&auto=format&fit=crop",
        audioText: "Tiru. Good."
      },
      {
        fidel: "ገጽ",
        english: "Gets",
        meaning: "Page",
        context: "Turn the 'ገጽ' to find what happens next to the clever golden monkey story!",
        tutorTip: "Quick stop. 'Gets'.",
        imageUrl: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=505&auto=format&fit=crop",
        audioText: "Gets. Page."
      }
    ],
    exercises: [
      {
        amharic: "እኔ መጽሐፍ አነባለሁ።",
        transliteration: "Ene metsihaf anebalehu.",
        english: "I read books.",
        tip: "Hold an imaginary book study pose!"
      },
      {
        amharic: "ይህ ታሪክ በጣም ጥሩ ነው።",
        transliteration: "Yih tarik betam tiru new.",
        english: "This story is very good.",
        tip: "Nod your head with appreciation!"
      }
    ],
    dialogue: {
      heading: "💬 Co-Reading Dialogue",
      scenario: "Elias reads an adventure animal fairytale book with his cousin Leah.",
      roles: [
        {
          character: "Elias",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሊያ ፣ ይህን መጽሐፍ ታነቢያለሽ?",
          transliteration: "Leah, yihin metsihaf tanebiyalesh?",
          english: "Leah, are you reading this book?"
        },
        {
          character: "Leah",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አዎ ፣ ታሪኩ በጣም ጥሩ ነው!",
          transliteration: "Awo, tariku betam tiru new!",
          english: "Yes, the story is very good!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: Cozy Story Time",
      passageAmharic: "ማታ ላይ እኛ መጽሐፍ አነበብን። አጎቴ ደስ የሚል ጥንታዊ ታሪክ ነገረን። መጽሐፉ ብዙ ገጾች አሉት። ታሪኩ በጣም ጥሩ ሰለነበረ ሁላችንም በደስታ አጨበጨብን። መጻሕፍት ውድ ናቸው።",
      passageTransliteration: "Mata lay ene metsihaf anebebn. Agote des yemil tintawi tarik negeren. Metsihafu bizu getsoch alut. Tariku betam tiru selenbere hulachinim bedesta achebechebn. Metsiahift wid nachew.",
      passageEnglish: "In the evening, we read a book. My uncle told us a delightful ancient story. The book has many pages. Because the story was very good, we all clapped with joy. Books are precious.",
      tutorTip: "Review the vocabulary meaning of 'Metsihaf' and clapping joy 'achebechebn'."
    },
    writing: {
      heading: "✍️ Storytelling Characters",
      instructions: "Practice tracing the intellectual characters መ (Me) and ጽ (Tsi).",
      lettersToPractice: [
        {
          letter: "መ",
          phonetic: "Me",
          steps: ["Two loops side-by-side", "Base connection", "Right vertical bar"]
        },
        {
          letter: "ጽ",
          phonetic: "Tsi",
          steps: ["Horizontal line", "Cross vertical line", "Right tail loop"]
        }
      ],
      wordChallenge: "መጽሐፍ"
    },
    homework: [
      "Open your favorite English storybook and describe it using 'metsihaf tiru' to parents.",
      "Write 'እነ መጽሐፍ አነባለሁ' in a colorful pencil.",
      "Trace the book characters መ, ሙ, ሚ, ማ, ሜ, ም, ሞ."
    ],
    submissionTip: "Upload a photo holding your favorite book labeled in Amharic! 📖",
    parentActivities: [
      "Set aside 10 minutes to point at books and practice saying 'Metsihaf' with children."
    ],
    tutorPacing: [
      "10 mins: Homework checking.",
      "25 mins: Joint reading passage translation practice.",
      "15 mins: Interactive spelling blender game."
    ],
    tutorTroubleshooting: [
      "Help children distinguish 'Metsihaf' from other sounds using visual prompts."
    ],
    quiz: [
      {
        questionText: "What is 'መጽሐፍ' in English?",
        options: ["Pencil", "Book", "Eraser", "Notebook"],
        correctAnswerIndex: 1,
        explanation: "'መጽሐፍ' (Metsihaf) means book."
      },
      {
        questionText: "How do you say 'I read / I am reading'?",
        options: ["እሮጣለሁ", "አነባለሁ", "እተኛለሁ", "በላሁ"],
        correctAnswerIndex: 1,
        explanation: "'አነባለሁ' (Anebalehu) translates to 'I read'."
      },
      {
        questionText: "Which word represents 'Story / Heritage Tale'?",
        options: ["ሒሳብ", "ታሪክ", "ሳይንስ", "ገጽ"],
        correctAnswerIndex: 1,
        explanation: "'ታሪክ' (Tarik) means story as well as history."
      },
      {
        questionText: "What is 'ገጽ'?",
        options: ["Story", "Page", "Section", "Title"],
        correctAnswerIndex: 1,
        explanation: "'ገጽ' (Gets) represents page."
      }
    ],
    nextLessonTitle: "Days of the Week"
  }
];
