import { LessonDefinition } from "../../level1/types";

export interface Level3LessonDefinition extends LessonDefinition {
  level: number;
}

export const lessons_1_8: Level3LessonDefinition[] = [
  // --- LESSON 1: Talking About Hobbies ---
  {
    level: 3,
    lessonNumber: 1,
    geezNumber: "፩",
    topic: "Talking About Hobbies",
    theme: "Free Time & Passions (ትርፍ ጊዜ)",
    phase: "Level 3 Stage 1: Social Connections",
    subheading: "Learn to discuss your favorite activities, sports, reading, and creative projects in fluent Amharic!",
    imageUrl: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Express personal hobbies using 'እወዳለሁ' (I like/love).",
      "List 4 recreational activities in authentic Amharic.",
      "Inquire about classmates' hobbies politely.",
      "Differentiate between physical sports and mental hobbies."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ትርፍ ጊዜ",
        english: "Terf Gize",
        meaning: "Free time / Spare time",
        context: "Doing what makes your heart sing during your 'ትርፍ ጊዜ' after school chores are done.",
        tutorTip: "A combination of 'terf' (extra) and 'gize' (time). 'Tehrf Gee-zeh'.",
        imageUrl: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=505&auto=format&fit=crop",
        audioText: "Terf gize. Free time."
      },
      {
        fidel: "ስዕል መሳል",
        english: "Si'il Mesal",
        meaning: "Drawing / Painting",
        context: "Using colorful markers and paper templates to create art is called 'ስዕል መሳል'.",
        tutorTip: "Praise creativity: 'See-ihl Meh-saal'.",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=505&auto=format&fit=crop",
        audioText: "Si'il mesal. Drawing or painting."
      },
      {
        fidel: "እግር ኳስ",
        english: "Egir Kwas",
        meaning: "Soccer / Football",
        context: "The ultimate national game: kicking a ball 'እግር ኳስ' in the neighborhood fields.",
        tutorTip: "Literally 'foot ball'. Connect 'Egir' (foot) and 'Kwas' (ball). 'Eh-gihr Kwas'.",
        imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=505&auto=format&fit=crop",
        audioText: "Egir kwas. Soccer."
      },
      {
        fidel: "መሰብሰብ",
        english: "Mesebseb",
        meaning: "To collect / Gathering",
        context: "Whether you collect stamps, beautiful stones, or traditional toys, it is 'መሰብሰብ'.",
        tutorTip: "A useful active infinitive group: 'Meh-sehb-sehb'.",
        imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=505&auto=format&fit=crop",
        audioText: "Mesebseb. To collect."
      },
      {
        fidel: "ዋና",
        english: "Wana",
        meaning: "Swimming",
        context: "Splashing cool refreshing water on a warm afternoon is 'ዋና' time.",
        tutorTip: "Short, crisp syllables: 'Wah-nah'.",
        imageUrl: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=505&auto=format&fit=crop",
        audioText: "Wana. Swimming."
      }
    ],
    exercises: [
      {
        amharic: "እኔ በትርፍ ጊዜዬ እግር ኳስ እጫወታለሁ።",
        transliteration: "Ene be terf gizeye egir kwas echewetalehu.",
        english: "I play soccer in my free time.",
        tip: "Mime kicking a soccer ball!"
      },
      {
        amharic: "ትርፍ ጊዜህ ምን ማድረግ ትወዳለህ?",
        transliteration: "Terf gizeh min madreg tiwedaleh?",
        english: "What do you like to do in your free time?",
        tip: "Point with questioning curiosity!"
      }
    ],
    dialogue: {
      heading: "💬 Free Time Chats",
      scenario: "Semere asks Helen about her weekend passions and creative hobbies.",
      roles: [
        {
          character: "Semere",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሄለን ፣ በትርፍ ጊዜሽ ምን ማድረግ ትወዳለሽ?",
          transliteration: "Helen, be terf gizesh min madreg tiwedalesh?",
          english: "Helen, what do you like to do in your free time?"
        },
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እኔ ስዕል መሳል እና ዋና እወዳለሁ። አንተስ?",
          transliteration: "Ene si'il mesal ena wana ewedalehu. Antes?",
          english: "I love drawing and swimming. What about you?"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Weekend Passions",
      passageAmharic: "ሔኖክ ትርፍ ጊዜ ሲኖረው በጣም ደስ ይለዋል። እሱና እህቱ ሳሮን የተለያዩ ልምዶች አሏቸው። ሔኖክ ከጓደኞቹ ጋር ሜዳ ላይ እግር ኳስ መጫወት ይወዳል። ሳሮን ግን ቤት ውስጥ ቁጭ ብላ መጽሐፍ ማንበብና ስዕል መሳል ትመርጣለች። በጋራ ደግሞ ቅዳሜ ቀን ዋና ይሄዳሉ።",
      passageTransliteration: "Henok terf gize sinorew betam des yilewal. Esu ena ehetu Saron yelelayu limdoch aluachew. Henok ke gwadeñochu gar meda lay egir kwas mechewet yiwedal. Saron gin bet wust kuch bila metsihaf manbebina si'il mesal timertalech. Be gara degmo Kidame ken wana yihedalu.",
      passageEnglish: "Henok is very happy when he has free time. He and his sister Saron have different hobbies. Henok loves playing soccer on the field with his friends. Saron, however, prefers to sit at home, reading books and drawing. Together, they go swimming on Saturdays.",
      tutorTip: "Contrast active verbs like 'mechewet' (to play) with quiet ones like 'manbeb' (to read)."
    },
    writing: {
      heading: "✍️ Hobbies Characters",
      instructions: "Practice tracing the active root letters ት (Te) and ኳ (Kwa).",
      lettersToPractice: [
        {
          letter: "ት",
          phonetic: "Te",
          steps: ["Vertical loop side helper", "Flat top roof", "Base tail"]
        },
        {
          letter: "ኳ",
          phonetic: "Kwa",
          steps: ["High crown header", "Internal loop crossing", "Right tail bend"]
        }
      ],
      wordChallenge: "እግር ኳስ"
    },
    homework: [
      "Explain your favorite after-school hobby to parents using 'Terf gize'." ,
      "Write 'እኔ ዋና እወዳለሁ' (I love swimming) in your notebook.",
      "Trace the characters ት, ቱ, ቲ, ታ, ቴ, ት, ቶ in your school ledger."
    ],
    submissionTip: "Upload a photo of your drawing labeled 'Si'il'! 🎨",
    parentActivities: [
      "Do a hobby activity together (like drawing) and ask your child: 'Min eyadergsh new?' (What are you doing?)."
    ],
    tutorPacing: [
      "10 mins: Warmup hobby photos.",
      "22 mins: Conversational vocabulary matching.",
      "18 mins: Spelling scramble builders."
    ],
    tutorTroubleshooting: [
      "Help children distinguish the complex letter ኳ (Kwa) which merges 'Ko' sounds with 'A'."
    ],
    quiz: [
      {
        questionText: "What does 'ትርፍ ጊዜ' translate to?",
        options: ["School homework", "Eating lunch", "Free time / Spare time", "Early morning"],
        correctAnswerIndex: 2,
        explanation: "'ትርፍ ጊዜ' (Terf Gize) means spare time or free time."
      },
      {
        questionText: "How do you say 'Soccer' in Amharic?",
        options: ["ውሃ መዋኘት", "እግር ኳስ", "ምግብ መብላት", "ቤት መጻፍ"],
        correctAnswerIndex: 1,
        explanation: "'እግር ኳስ' (Egir Kwas) translates literally to 'foot ball'."
      },
      {
        questionText: "What is 'ስዕል መሳል'?",
        options: ["Singing songs", "Running fast", "Drawing / Painting", "Cooking dinner"],
        correctAnswerIndex: 2,
        explanation: "'ስዕል መሳል' (Si'il Mesal) is the art of drawing or painting."
      },
      {
        questionText: "What is the meaning of 'ዋና'?",
        options: ["Swimming", "Sleeping", "Dancing", "Studying"],
        correctAnswerIndex: 0,
        explanation: "'ዋና' means swimming."
      }
    ],
    nextLessonTitle: "Describing Friends"
  },

  // --- LESSON 2: Describing Friends ---
  {
    level: 3,
    lessonNumber: 2,
    geezNumber: "፪",
    topic: "Describing Friends",
    theme: "Friendship & Qualities (ጓደኝነት)",
    phase: "Level 3 Stage 1: Social Connections",
    subheading: "Learn how to describe your best friends, their personalities, physical descriptors, and sweet character traits!",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "State 'My friend is...' using helpful adjectives.",
      "Compare personality qualities like kindness and humor.",
      "Differentiate masculine and feminine relative pronouns.",
      "Engage friendly descriptive dialogues."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ጓደኛ",
        english: "Gwadeña",
        meaning: "Friend",
        context: "The companion with whom you share smiles, play games, and finish group math tasks: 'ጓደኛ'.",
        tutorTip: "A very common word. Learn to pronounce 'Gwa-deh-gnya'.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Gwadeña. Friend."
      },
      {
        fidel: "ደግ",
        english: "Deg",
        meaning: "Kind / Generous",
        context: "A loving person who shares their crayons and protects companions is 'ደግ'.",
        tutorTip: "Short, soft final G: 'Dehg'.",
        imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=505&auto=format&fit=crop",
        audioText: "Deg. Kind or generous."
      },
      {
        fidel: "ጎበዝ",
        english: "Gobez",
        meaning: "Smart / Capable",
        context: "Praise children who work hard: 'ጎበዝ ነህ!' (You are smart/clever!).",
        tutorTip: "A vital positive reinforcement vocabulary: 'Goh-behz'.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=505&auto=format&fit=crop",
        audioText: "Gobez. Smart or hardworking."
      },
      {
        fidel: "ቀልደኛ",
        english: "Keldeña",
        meaning: "Funny / Joker",
        context: "A silly comrade who tells funny stories or acts out cartoon mimics: 'ቀልደኛ'.",
        tutorTip: "Highlight the happy root 'Keld' (Joke). 'Kehl-deh-gnya'.",
        imageUrl: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=505&auto=format&fit=crop",
        audioText: "Keldeña. Funny friend."
      },
      {
        fidel: "ቁመተ ረጅም",
        english: "Kumete Rejim",
        meaning: "Tall / Heighted",
        context: "Describes someone tall, like a high-reaching basketball player or national track star.",
        tutorTip: "Direct compound: 'Koo-meh-teh Reh-jeem'.",
        imageUrl: "https://images.unsplash.com/photo-1521791136368-1a46827d0a16?w=505&auto=format&fit=crop",
        audioText: "Kumete rejim. Tall height."
      }
    ],
    exercises: [
      {
        amharic: "ጓደኛዬ በጣም ደግ ነው።",
        transliteration: "Gwadeñaye betam deg new.",
        english: "My friend is very kind.",
        tip: "Place your right hand over your heart demonstrating warmth!"
      },
      {
        amharic: "እሱ ጎበዝ እና ቀልደኛ ነው።",
        transliteration: "Esu gobez ena keldeña new.",
        english: "He is smart and funny.",
        tip: "Smile broadly and snap with satisfaction!"
      }
    ],
    dialogue: {
      heading: "💬 Friends Spotlight",
      scenario: "Dawit tells Lydia about his classmate Brook's funny personality.",
      roles: [
        {
          character: "Dawit",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሊዲያ ፣ ምርጥ ጓደኛሽ ማን ነው?",
          transliteration: "Lydia, mirt gwadeñash man new?",
          english: "Lydia, who is your best friend?"
        },
        {
          character: "Lydia",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "ጓደኛዬ ሳምራዊት ናት። እሷ በጣም ደግ እና ጎበዝ ናት!",
          transliteration: "Gwadeñaye Samrawit nat. Esua betam deg ena gobez nat!",
          english: "My friend is Samrawit. She is very kind and smart!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Dream Friend Group",
      passageAmharic: "ሊያ ትምህርት ቤት ውስጥ ብዙ ጓደኞች አሏት። ከሁሉም በበለጠ ግን አሮን የቅርብ ጓደኛዋ ነው። አሮን ሲያወራ ቀልደኛ ነው ፤ መምህሩ ሲጠይቁት ደግሞ መልስ አውቆ ጎበዝ ነው። ሁልጊዜ በትርፍ ጊዜያቸው አብረው ደብተር ይጋራሉ ፤ የአንዱን እርሳስ ለሌላው ይሰጣሉ። ደግ መሆን ጓደኝነትን ያሳድጋል።",
      passageTransliteration: "Leah timihirt bet wust bizu gwadeñoch aluat. Kehulun bebete gin Aron ye kirb gwadeñawa new. Aron siyawera keldeña new; memhiru siyeteyikut degmo mels awko gobez new. Hulgize be terf gizeyachew abrew debter yigaralu; yeandun ersas lelelawn yisetalu. Deg mehon gwadeñinetin yasadgewal.",
      passageEnglish: "Leah has many friends at school. More than anyone, however, Aron is her close friend. Aaron is funny when he speaks; when the teacher asks, he knows the answer and is smart. They always share notebooks in their free time; giving one's pencil to the other. Being kind grows friendship.",
      tutorTip: "Focus on how 'Gwadeña' is described with positive adjectives like 'deg' and 'gobez'."
    },
    writing: {
      heading: "✍️ Friendship Tracing",
      instructions: "Practice tracing the relative pronoun characters ጓ (Gwa) and ኛ (Gnya).",
      lettersToPractice: [
        {
          letter: "ጓ",
          phonetic: "Gwa",
          steps: ["High crown line", "Internal parallel stalks", "Base loop anchor"]
        },
        {
          letter: "ኛ",
          phonetic: "Gnya",
          steps: ["Forked start", "Center dip marker", "Right downward foot"]
        }
      ],
      wordChallenge: "ጓደኛ"
    },
    homework: [
      "Describe three cool traits of your best friend to your parents.",
      "Write 'ጓደኛዬ ጎበዝ ነው' (My friend is smart) on your notebook cover.",
      "Trace the characters ኛ, ኙ, ኚ, ኛ, ኜ, ኝ, ኞ three times."
    ],
    submissionTip: "Upload a cute labeled drawing of your best friend! 👥",
    parentActivities: [
      "Ask your child to translate their friends' names and qualities: 'Who is kind?' (Man new deg?)."
    ],
    tutorPacing: [
      "10 mins: Friendly traits vocabulary quiz.",
      "22 mins: Creative comparison slides.",
      "18 mins: Interactive spelling assembly grids."
    ],
    tutorTroubleshooting: [
      "Remind children of gender markers: 'new' for boy, 'nat' for girl."
    ],
    quiz: [
      {
        questionText: "What does 'ደግ' mean?",
        options: ["Silly", "Kind / Generous", "Tall", "Bad"],
        correctAnswerIndex: 1,
        explanation: "'ደግ' (Deg) represents a kind or generous heart."
      },
      {
        questionText: "How do you say 'Friend' in Amharic?",
        options: ["ጓደኛ", "ትምህርት", "ደብተር", "መኪና"],
        correctAnswerIndex: 0,
        explanation: "'ጓደኛ' (Gwadeña) translates directly to friend."
      },
      {
        questionText: "What is the meaning of 'ቀልደኛ'?",
        options: ["Strict teacher", "Funny / Joker", "Angry animal", "Silent room"],
        correctAnswerIndex: 1,
        explanation: "'ቀልደኛ' (Keldeña) is a person who loves telling jokes."
      },
      {
        questionText: "How do you describe a tall person?",
        options: ["ቁመተ ረጅም", "አጭር", "ጎበዝ", "ደግ"],
        correctAnswerIndex: 0,
        explanation: "'ቁመተ ረጅም' (Kumete Rejim) is a tall height."
      }
    ],
    nextLessonTitle: "Invitations & Visiting"
  },

  // --- LESSON 3: Invitations & Visiting ---
  {
    level: 3,
    lessonNumber: 3,
    geezNumber: "፫",
    topic: "Invitations & Visiting",
    theme: "Hospitality & Guests (ግብዣ)",
    phase: "Level 3 Stage 1: Social Connections",
    subheading: "Learn how to politely invite guests, say 'Please enter', and practice welcoming family to your dinner table!",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Use greeting hospitality phrases like 'ግባ' and 'ግቢ'.",
      "Express polite invitation structures correctly.",
      "Utilize 'Injera' sharing phrases neatly.",
      "Roleplay family dining visits."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ግብዣ",
        english: "Gibzha",
        meaning: "Invitation / Feast Order",
        context: "Extending a warm card or invitation to delicious coffee or dinner feast: 'ግብዣ'.",
        tutorTip: "Clear, separate pacing: 'Gihb-zhah'. Focus on welcoming vibes.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Gibzha. Invitation."
      },
      {
        fidel: "እንግዳ",
        english: "Engida",
        meaning: "Guest / Visitor",
        context: "The honored guest who arrives with smiles and is seated in the best living room armchair.",
        tutorTip: "A vital cultural concept in Ethiopia: 'Ehn-gih-dah'.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Engida. Guest or visitor."
      },
      {
        fidel: "ግባ",
        english: "Giba",
        meaning: "Enter! (to a boy)",
        context: "Open the door of your study room and welcome your brother: 'እባክህ ግባ!'.",
        tutorTip: "Short command for masculine: 'Gih-bah'.",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=505&auto=format&fit=crop",
        audioText: "Giba. Enter (masculine)."
      },
      {
        fidel: "ግቢ",
        english: "Gibi",
        meaning: "Enter! (to a girl)",
        context: "Politely welcoming your aunt inside the warm living room hearth: 'እባክሽ ግቢ!'.",
        tutorTip: "Feminine format change: 'Gih-bee'.",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=505&auto=format&fit=crop",
        audioText: "Gibi. Enter (feminine)."
      },
      {
        fidel: "ኑ",
        english: "Nu",
        meaning: "Come in / Draw closer (Plural/Respectful)",
        context: "Waving hands inviting grandparents or multiple friends to share your honey pancake snacks.",
        tutorTip: "A plural friendly welcome call: 'Noo'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Nu. Come in."
      }
    ],
    exercises: [
      {
        amharic: "እባክህ ግባ ፤ እንግዳችን ሁን።",
        transliteration: "Ebakih giba, engidachin hun.",
        english: "Please enter, be our guest.",
        tip: "Bow slightly holding hands outward!"
      },
      {
        amharic: "ኑ! አብረን እንብላ።",
        transliteration: "Nu, abren enbela.",
        english: "Come! Let's eat together.",
        tip: "Mime dividing and popping an Injera rollup!"
      }
    ],
    dialogue: {
      heading: "💬 Doorstep Welcoming",
      scenario: "Blen welcomes Auntie Martha to their household tea afternoon.",
      roles: [
        {
          character: "Blen",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "አክስቴ ማርታ ፤ እንዴት ነሽ? እባክሽ ግቢ!",
          transliteration: "Akiste Martha, endet nesh? Ebakish gibi!",
          english: "Auntie Martha, how are you? Please enter!"
        },
        {
          character: "Aunt Martha",
          avatar: "👩",
          bubbleSide: "right",
          amharic: "አመሰግናለሁ ልጄ! ዛሬ እኔ የእናንተ እንግዳ ነኝ።",
          transliteration: "Ameseginalehu lije! Zare ene ye'enante engida negn.",
          english: "Thank you my child! Today I am your guest."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Guest in the House",
      passageAmharic: "ዛሬ እሁድ በቤታችን ትልቅ ግብዣ አለ። አባቴ ታላቅ ጓደኛውን ጋበዘ። ጓደኛው ወደ በራችን ሲመጣ አባቴ 'እንኳን ደህና መጣህ ፤ እባክህ ግባ!' አለው። እኛም 'እንቅስቃሴ እና ቁርስ አብረን እንውሰድ' አልነው። እንግዳ መቀበል በኢትዮጵያ ባህል ውስጥ ትልቅ ደስታ ነው።",
      passageTransliteration: "Zare Ehud be betachin tilik gibzha ale. Abate talak gwadeñawn gabeze. Gwadeñaw wede berachin simeta abate 'Enkuan dehna metah, ebakih giba!' alew. Egnam 'Enksikase ena kurs abren enwsed' alnew. Engida mekebel be Ethiopia bahil wust tilik desta new.",
      passageEnglish: "Today Sunday, there is a grand feast invitation in our house. My father invited his great friend. When his friend arrived at our door, my father said: 'Welcome, please enter!'. We also said: 'Let's take activities and breakfast together'. Receiving guests is a major joy in Ethiopian culture.",
      tutorTip: "Talk about 'Gursha' (feeding a loved one one bite) to illustrate Ethiopian greeting dining."
    },
    writing: {
      heading: "✍️ Hospitality Characters",
      instructions: "Practice tracing the welcoming letters ግ (Gi) and ኑ (Nu).",
      lettersToPractice: [
        {
          letter: "ግ",
          phonetic: "Gi",
          steps: ["Horizontal loop hat", "Lower left diagonal", "Right leg hook"]
        },
        {
          letter: "ኑ",
          phonetic: "Nu",
          steps: ["Pillar vertical", "Central joint", "Right side circle indicator"]
        }
      ],
      wordChallenge: "እንግዳ"
    },
    homework: [
      "Practice welcoming a sister or brother into your bedroom using 'Giba' or 'Gibi'.",
      "Write 'እባክሽ ግቢ' (Please enter - she) in your study book.",
      "Trace the characters ግ, ጉ, ጊ, ጋ, ጌ, ግ, ጎ three times."
    ],
    submissionTip: "Upload a drawing of a door labeled 'ግባ' in beautiful letters! 🚪",
    parentActivities: [
      "Roleplay guest greeting scenarios. Let kids pretend to open the front door and announce: 'Engida metach!'."
    ],
    tutorPacing: [
      "10 mins: Host roles introduction.",
      "25 mins: Interactive dialogue and translation loops.",
      "15 mins: Interactive puzzle scramble solver."
    ],
    tutorTroubleshooting: [
      "Make sure boys receive 'Giba' and girls receive 'Gibi' commands correctly."
    ],
    quiz: [
      {
        questionText: "What does 'እንግዳ' mean?",
        options: ["Pencil case", "Guest / Visitor", "Silly animal", "School bus"],
        correctAnswerIndex: 1,
        explanation: "'እንግዳ' (Engida) is the respected guest."
      },
      {
        questionText: "How do you welcome a girl entering the room?",
        options: ["እባክህ ግባ", "እባክሽ ግቢ", "አውቃለሁ", "ሄድኩ"],
        correctAnswerIndex: 1,
        explanation: "Use 'ግቢ' (Gibi) for females."
      },
      {
        questionText: "How do you invite a group: 'Come in'?",
        options: ["ኑ", "ቀኝ", "ምን", "ውሃ"],
        correctAnswerIndex: 0,
        explanation: "'ኑ' (Nu) is the plural/respectful come-in invitation."
      },
      {
        questionText: "What is 'ግብዣ'?",
        options: ["Opinion", "Train ride", "Invitation / Feast", "Homework task"],
        correctAnswerIndex: 2,
        explanation: "'ግብዣ' (Gibzha) is an invitation."
      }
    ],
    nextLessonTitle: "Telephone Conversations"
  },

  // --- LESSON 4: Telephone Conversations ---
  {
    level: 3,
    lessonNumber: 4,
    geezNumber: "፬",
    topic: "Telephone Conversations",
    theme: "Talkative Calls (የስልክ ጨዋታ)",
    phase: "Level 3 Stage 1: Social Connections",
    subheading: "Learn phone greetings, how to query 'Who is speaking?', ask for someone, and hang up politely!",
    imageUrl: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Answer the phone: 'ሃሎ' and ask: 'ማን ልበል?'.",
      "Request specific individuals politely: '... አለ?'.",
      "Express 'Pleased to talk' or call completions cleanly.",
      "Conduct interactive dual telephone simulators."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ስልክ",
        english: "Silk",
        meaning: "Telephone / Cellphone",
        context: "The cool gadget we dial and tap to chat with cousins in faraway Addis Ababa: 'ስልክ'.",
        tutorTip: "Very easy word. 'Sihlk'. Pronounce it with a sharp k.",
        imageUrl: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=505&auto=format&fit=crop",
        audioText: "Silk. Telephone."
      },
      {
        fidel: "ደወልኩ",
        english: "Dewelku",
        meaning: "I called / I rang",
        context: "Using the telephone lines to connect with distant families is 'ደወልኩ'.",
        tutorTip: "Past action indicator: 'Deh-wehl-koo'.",
        imageUrl: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=505&auto=format&fit=crop",
        audioText: "Dewelku. I called."
      },
      {
        fidel: "ማን ልበል",
        english: "Man Libel",
        meaning: "Who is speaking? / Who should I say?",
        context: "When a mysterious happy voice rings your doorbell or telephone line, ask 'ማን ልበል?'.",
        tutorTip: "Polite questioning framework: 'Mahn Lih-behl'.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Man libel. Who is speaking?"
      },
      {
        fidel: "ሃሎ",
        english: "Halo",
        meaning: "Hello",
        context: "The universal greeting spoken whenever we hold receivers to our ears.",
        tutorTip: "Direct borrow. Express with happy pitch: 'Hah-loh'.",
        imageUrl: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=505&auto=format&fit=crop",
        audioText: "Halo. Hello."
      },
      {
        fidel: "ደህና ሁን",
        english: "Dehna Hun",
        meaning: "Goodbye / Stay well (to a boy)",
        context: "Completing your happy telephone chat politely with a brother or uncle.",
        tutorTip: "Literally 'Be healthy': 'Deh-nah Hoon'.",
        imageUrl: "https://images.unsplash.com/photo-1506784081820-9486c6f3e9f?w=505&auto=format&fit=crop",
        audioText: "Dehna hun. Goodbye."
      }
    ],
    exercises: [
      {
        amharic: "ሃሎ ፤ እባክህ ማን ልበል?",
        transliteration: "Halo, ebakih man libel?",
        english: "Hello, please, who is speaking?",
        tip: "Hold an imaginary telephone to your ear!"
      },
      {
        amharic: "እኔ ለእናቴ ደወልኩ።",
        transliteration: "Ene le'enate dewelku.",
        english: "I called my mother.",
        tip: "Mime dialing and pressing keypads!"
      }
    ],
    dialogue: {
      heading: "💬 Telephone Calling",
      scenario: "Yonas rings Martha's home seeking to talk with cousin Brook.",
      roles: [
        {
          character: "Yonas",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሃሎ ፤ አክስቴ ማርታ? እባክሽ ብሩክ አለ?",
          transliteration: "Halo, akiste Martha? Ebakish Brook ale?",
          english: "Hello, Auntie Martha? Please, is Brook there?"
        },
        {
          character: "Aunt Martha",
          avatar: "👩",
          bubbleSide: "right",
          amharic: "አዎ አለ ፤ ማን ልበል? ስልኩን እሰጠዋለሁ።",
          transliteration: "Awo ale, man libel? Silkun isetewalehu.",
          english: "Yes he is here, who is speaking? I will give him the phone."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: Calling Grandmother",
      passageAmharic: "ትናንት ማታ ሳሮን የእጅ ስልክ ወሰደች። ወደ አያቷ ቤት ልትደውል ፈለገች። ስልኩን ስታነሳ ሃሎ አለች። አያቷ 'ማን ልበል?' ብለው ጠየቁ። ሳሮን 'ሳሮን ነኝ! እንዴት ኖት?' ብላ መለሰች። አያት በጣም ደስ አላቸው። በደስታ አውርተው 'ደህና ሁኚ' ብለው ዘጉ።",
      passageTransliteration: "Tinent mata Saron ye-eji silk wesedech. Wede ayatua bet litdewil felegech. Silkun sitanesa Halo alech. Ayatua 'man libel?' bilew yeteyiku. Saron 'Saron negn! Endet not?' bila melesech. Ayat betam des alachew. Be desta awritew 'Dehna hugni' bilew zegu.",
      passageEnglish: "Yesterday night Saron picked up the cell-phone. She wanted to call her grandmother's house. When she lifted the receiver she said 'Hello'. Her grandmother asked 'Who is speaking?'. Saron replied 'It's Saron! How are you (formal)?'. Grandmother was extremely happy. Talking in joy, they ended saying 'Stay well'.",
      tutorTip: "Review the polite plural/respectful 'not' vs 'neh/nesh' for grandparents on calls."
    },
    writing: {
      heading: "✍️ Caller Characters",
      instructions: "Practice tracing the telephone letters ስ (Si) and ደ (De).",
      lettersToPractice: [
        {
          letter: "ስ",
          phonetic: "Si",
          steps: ["Forked crest", "Internal dip", "Right baseline hook"]
        },
        {
          letter: "ደ",
          phonetic: "De",
          steps: ["Vertical start", "Center diagonal loop", "Slight bottom stand"]
        }
      ],
      wordChallenge: "ስልክ"
    },
    homework: [
      "Simulate calling your tutor using 'Halo, man libel?' today.",
      "Write 'ማን ልበል' (Who is speaking?) in your workbook.",
      "Trace the characters ስ, ሱ, ሲ, ሳ, ሴ, ስ, ሶ thrice."
    ],
    submissionTip: "Upload a cute photo using a toy telephone speaking Amharic! ☎️",
    parentActivities: [
      "Let kids call grandparents using real phones and handle the first 6 seconds of greetings entirely in Amharic."
    ],
    tutorPacing: [
      "10 mins: Telephone prop introduction.",
      "25 mins: Simulated classroom phone calls.",
      "15 mins: Target sound bubble pop game."
    ],
    tutorTroubleshooting: [
      "Ensure children wait and listen when asked 'Man libel?' before shouting their names."
    ],
    quiz: [
      {
        questionText: "What does 'ስልክ' translate to?",
        options: ["Pencil", "Telephone", "Stained Glass", "Football"],
        correctAnswerIndex: 1,
        explanation: "'ስልክ' (Silk) represents the telephone."
      },
      {
        questionText: "How do you ask: 'Who is speaking?' on a call?",
        options: ["ውሃ አለ?", "ማን ልበል?", "ምን በላህ?", "እስማማለሁ"],
        correctAnswerIndex: 1,
        explanation: "'ማን ልበል' (Man libel) means who is speaking."
      },
      {
        questionText: "What does 'ደወልኩ' mean?",
        options: ["I danced", "I called / I rang", "I cooked", "I slept"],
        correctAnswerIndex: 1,
        explanation: "'ደወልኩ' (Dewelku) means I called."
      },
      {
        questionText: "How do say goodbye to a boy: 'Stay well'?",
        options: ["ደህና ሁን", "ደህና ሁኚ", "ግባ", "ኑ"],
        correctAnswerIndex: 0,
        explanation: "Use 'ደህና ሁን' (Dehna hun) for males."
      }
    ],
    nextLessonTitle: "Study Habits"
  },

  // --- LESSON 5: Study Habits ---
  {
    level: 3,
    lessonNumber: 5,
    geezNumber: "፭",
    topic: "Study Habits",
    theme: "Academic Mindset (ማጥናት)",
    phase: "Level 3 Stage 1: Social Connections",
    subheading: "Learn vocabulary for school homework, active libraries, subject writing, and scheduling learning blocks!",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Differentiate active studying vocabulary: 'ደብተር' versus 'ትምህርት'.",
      "Express schedule intents: 'እኔ ዛሬ እቅዳለሁ'.",
      "Detail typical study schedules clearly of parents.",
      "Utilize active learning structures securely."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ማጥናት",
        english: "Matnat",
        meaning: "To study / Academic practice",
        context: "The cool habit of flipping books and memorizing beautiful codes everyday: 'ማጥናት'.",
        tutorTip: "A continuous action infinitive. Pronounce 'Maat-naat'.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=505&auto=format&fit=crop",
        audioText: "Matnat. To study."
      },
      {
        fidel: "የክፍል ስራ",
        english: "YeKifil Sira",
        meaning: "Classwork / Shared schoolwork",
        context: "The interactive exercises we puzzle over together under teacher's smart supervisions.",
        tutorTip: "Combination: 'Ye-kih-fihl Sih-rah'.",
        imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=505&auto=format&fit=crop",
        audioText: "YeKifil Sira. Classwork."
      },
      {
        fidel: "ቤተመጻሕፍት",
        english: "Betemetsahift",
        meaning: "Library / Book Hall",
        context: "A quiet, spectacular room packed with thousands of history, language, and coding books.",
        tutorTip: "Slightly longer. Break it: 'Beh-teh-meh-tsah-hihft'.",
        imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=505&auto=format&fit=crop",
        audioText: "Betemetsahift. Library."
      },
      {
        fidel: "እቅድ",
        english: "Ekid",
        meaning: "Schedule / Plan",
        context: "Dividing your hours cleanly to allocate space for study, play, and dinner is 'እቅድ'.",
        tutorTip: "Crisp syllables: 'Eh-kihd'. Points to progress.",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=505&auto=format&fit=crop",
        audioText: "Ekid. Schedule or plan."
      },
      {
        fidel: "እችላለሁ",
        english: "Echilalehu",
        meaning: "I can / I am capable",
        context: "Say 'እችላለሁ' to declare confidence in fixing hard mathematical equations.",
        tutorTip: "Empowering active verb: 'Eh-chih-lah-lehoo'.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Echilalehu. I can."
      }
    ],
    exercises: [
      {
        amharic: "እኔ በትምህርት ቤት ማጥናት እወዳለሁ።",
        transliteration: "Ene be timihirt bet matnat ewedalehu.",
        english: "I love studying at school.",
        tip: "Form binoculars representing sharp reading eyes!"
      },
      {
        amharic: "እኔ ሒሳብ መስራት እችላለሁ።",
        transliteration: "Ene hisab mesrat echilalehu.",
        english: "I can do mathematics calculations.",
        tip: "Flex biceps representing brainpower!"
      }
    ],
    dialogue: {
      heading: "💬 Study Success Routine",
      scenario: "Leah and Natnael plan their after-school study project inside library.",
      roles: [
        {
          character: "Leah",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "ናትናኤል ፣ ዛሬ ከክፍል በኋላ የት ታጠናለህ?",
          transliteration: "Natnael, zare ke kifil behuala yet tatenaleh?",
          english: "Natnael, where are you studying after class today?"
        },
        {
          character: "Natnael",
          avatar: "👦",
          bubbleSide: "right",
          amharic: "እኔ ቤተመጻሕፍት ውስጥ አጠናለሁ ፤ እቅድ አለኝ!",
          transliteration: "Ene betemetsahift wust atenalehu, ekid alegn!",
          english: "I am studying inside the library, I have a plan!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Library Focus",
      passageAmharic: "ሔኖክ ጎበዝ ተማሪ ነው። እሱ ሁልጊዜ ከትምህርት በኋላ ጥሩ እቅድ ያወጣል። መጀመርያ ወደ ቤተመጻሕፍት ይሄዳል ፤ በዚያም ፀጥ ባለ ቦታ ቁጭ ብሎ የክፍል ስራውን ይሰራል። ሔኖክ 'እኔ ማጥናትና ውጤት ማምጣት እችላለሁ' ብሎ ያስባል። ስራው ሲያልቅ በደስታ ከጓደኞቹ ጋር ይጫወታል።",
      passageTransliteration: "Henok gobez temari new. Esu hulgize ke timihirt behuala tiru ekid yawetal. Mejemerya wede betemetsahift yihedal; beziyam tset bale bota kuch bilo ye-kifil sirawn yiseral. Henok 'ene matnat ena wetet mamtat echilalehu' bilo yasbal. Siraw siyalk be desta ke gwadeñochu gar yichewetal.",
      passageEnglish: "Henok is a smart student. He always makes a good plan after school. First, he goes to the library; there, sitting in a quiet spot, he does his classwork. Henok thinks: 'I can study and bring results'. When his work is finished, he plays happily with his friends.",
      tutorTip: "Talk about academic achievement goals with children to reinforce self-belief indicators."
    },
    writing: {
      heading: "✍️ Academic Characters",
      instructions: "Practice tracing the focus letters እ (Ih) and ች (Chi).",
      lettersToPractice: [
        {
          letter: "እ",
          phonetic: "Ih",
          steps: ["Vertical loop side curve", "Center connector", "Root stem baseline"]
        },
        {
          letter: "ች",
          phonetic: "Chi",
          steps: ["High crown umbrella", "Lower loop", "Base flat support"]
        }
      ],
      wordChallenge: "እቅድ"
    },
    homework: [
      "Draft a basic study plan outlining homework times in Amharic tags.",
      "Write 'እኔ ማጥናት እችላለሁ' in clean letters in your notebook.",
      "Trace the study characters እ, ኡ, ዒ, ኣ, ኤ, እ, ኦ three times."
    ],
    submissionTip: "Upload a photo of your cozy library studying corner labeled 'Betemetsahift'! 📚",
    parentActivities: [
      "Sit with your child for 20 minutes and verify they utilize 'Echilalehu' (I can) when completing tough homeworks."
    ],
    tutorPacing: [
      "10 mins: Classwork focus check.",
      "25 mins: Interactive verb conjugations (Echilalehu, Techilalesh).",
      "15 mins: Scramble builder games."
    ],
    tutorTroubleshooting: [
      "Work with pronunciation of the compound 'Betemetsahift' - break to: Bete. Metsahift."
    ],
    quiz: [
      {
        questionText: "What does 'ቤተመጻሕፍት' mean?",
        options: ["Kitchen", "Library / Book Hall", "Playground", "Zoo"],
        correctAnswerIndex: 1,
        explanation: "'ቤተመጻሕፍት' (Betemetsahift) is the library or hall of books."
      },
      {
        questionText: "How do you translate 'I can'?",
        options: ["እቅዳለሁ", "ተኛሁ", "እችላለሁ", " በላሁ"],
        correctAnswerIndex: 2,
        explanation: "'እችላለሁ' (Echilalehu) translates to 'I can'."
      },
      {
        questionText: "What represents 'To study'?",
        options: ["ዋና", "ማጥናት", "መንገድ", "ቁርስ"],
        correctAnswerIndex: 1,
        explanation: "'ማጥናት' (Matnat) represents the act of studying."
      },
      {
        questionText: "What is 'እቅድ' in English?",
        options: ["Clock face", "Homework book", "Schedule / Plan", "Red car"],
        correctAnswerIndex: 2,
        explanation: "'እቅድ' (Ekid) represents a schedule or plan."
      }
    ],
    nextLessonTitle: "Goals & Dreams"
  },

  // --- LESSON 6: Goals & Dreams ---
  {
    level: 3,
    lessonNumber: 6,
    geezNumber: "፮",
    topic: "Goals & Dreams",
    theme: "Vision & Wishes (ህልም)",
    phase: "Level 3 Stage 1: Social Connections",
    subheading: "Learn to express what you want to be when you grow up - doctor, software engineer, astronaut, or artist!",
    imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Identify 4 modern professions in Amharic.",
      "Formulate dream goal sentences: 'እኔ ዶክተር መሆን እፈልጋለሁ'.",
      "Understand future tense conditional prefixes correctly.",
      "Present virtual classroom dream poster boards."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ህልም",
        english: "Hilm",
        meaning: "Dream / Vision",
        context: "The beautiful mental picture of your future achievements and happy profession choices: 'ህልም'.",
        tutorTip: "Warm, soft breathy start: 'Hihlm'. Pronounce both consonants clearly.",
        imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=505&auto=format&fit=crop",
        audioText: "Hilm. Dream."
      },
      {
        fidel: "መሆን",
        english: "Mehon",
        meaning: "To become / Be",
        context: "Studying hard is the golden key 'መሆን' to become whatever you dream of.",
        tutorTip: "Action infinitive: 'Meh-hohn'. Points to transformation.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Mehon. To become."
      },
      {
        fidel: "ዶክተር",
        english: "Doctor",
        meaning: "Medical Doctor / Physician",
        context: "A brilliant health specialist who heals fevers and listens to hearts: 'ዶክተር'.",
        tutorTip: "Loanword. Pronounce cleanly: 'Dohk-tehr'.",
        imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=505&auto=format&fit=crop",
        audioText: "Doctor. Doctor."
      },
      {
        fidel: "مهንዲሰ",
        english: "Mehandis",
        meaning: "Engineer",
        context: "A smart logic developer design building block apps or coding software tools.",
        tutorTip: "A loan helper tag: 'Meh-hahn-dihs'.",
        imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=505&auto=format&fit=crop",
        audioText: "Mehandis. Engineer."
      },
      {
        fidel: "ምኞት",
        english: "Miñot",
        meaning: "Goal / Wish",
        context: "Wishing well on birthdays or declaring your unique goals during graduations has high 'ምኞት' value.",
        tutorTip: "A noble, sweet aspiration word: 'Mih-gnyoht'.",
        imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=505&auto=format&fit=crop",
        audioText: "Miñot. Wish or goal."
      }
    ],
    exercises: [
      {
        amharic: "እኔ ዶክተር መሆን እፈልጋለሁ።",
        transliteration: "Ene doctor mehon efeligalehu.",
        english: "I want to become a doctor.",
        tip: "Mime holding a stethoscope over your heart!"
      },
      {
        amharic: "የእኔ ህልም ትልቅ መሀንዲስ መሆን ነው።",
        transliteration: "Yene hilm tilik mehandis mehon new.",
        english: "My dream is to become a great engineer.",
        tip: "Mime coding on an imaginary laptop keyboard!"
      }
    ],
    dialogue: {
      heading: "💬 Future Aspirations",
      scenario: "Brook and Sarah share their career goals in the classroom.",
      roles: [
        {
          character: "Brook",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሳራ ፣ ወደፊት ምን መሆን ትፈልጊያለሽ?",
          transliteration: "Sarah, wedefit min mehon tifeligiyalesh?",
          english: "Sarah, what do you want to become in the future?"
        },
        {
          character: "Sarah",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እኔ መሀንዲስ መሆን እፈልጋለሁ! አንተስ?",
          transliteration: "Ene mehandis mehon efeligalehu! Antes?",
          english: "I want to become an engineer! How about you?"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Dream School Poster",
      passageAmharic: "በትምህርት ቤት ውስጥ መምህር ማርታ 'ምኞትና ህልማችሁ ምንድን ነው?' ብለው ተማሪዎችን ጠየቁ። ሔኖክ ፈጥኖ ተነሳና 'የእኔ ህልም መሀንዲስ መሆን ነው ፤ ታላላቅ ድልድዮችን እሰራለሁ' አለ። ሊያም ፈገግ ብላ 'እኔ ዶክተር መሆን እፈልጋለሁ ፤ ሰዎችን እፈውሳለሁ' አለች። ሁሉም ተማሪ የራሱን ምኞት ጻፈ።",
      passageTransliteration: "Be timihirt bet wust Memhir Martha 'miñot ena hilmachih mindin new?' bilew temariwochinteyiku. Henok fetno tenesana 'Yene hilm mehandis mehon new, talalak dildiyochin eseralu' ale. Leahim fegeg bila 'Ene doctor mehon efeligalehu, sewochin efewsalu' alech. Hulunim temari ye rasun miñot tsafe.",
      passageEnglish: "At school, Teacher Martha asked the students: 'What are your wishes and dreams?'. Henok arose quickly and said: 'My dream is to become an engineer; I will build grand bridges'. Leah smiled and said: 'I want to become a doctor; I will heal people'. Every student wrote their own goals.",
      tutorTip: "Acknowledge child goals with validation and link their dreams to active study habits."
    },
    writing: {
      heading: "✍️ Dreamer Characters",
      instructions: "Practice tracing the futuristic letters ህ (Hi) and ም (Mi).",
      lettersToPractice: [
        {
          letter: "ህ",
          phonetic: "Hi",
          steps: ["Forked start", "Center dip marker", "Right downward foot"]
        },
        {
          letter: "ም",
          phonetic: "Mi",
          steps: ["Closed bottom loop", "Lower stem connector", "Base horizontal base"]
        }
      ],
      wordChallenge: "ምኞት"
    },
    homework: [
      "Share your future dream profession with your parents using 'Mehon efeligalehu'.",
      "Write 'የእኔ ህልም' (My dream) on a colorful piece of paper and paste it in your bedroom.",
      "Trace the characters ህ, ሁ, ሂ, ሃ, ሄ, ህ, ሆ thrice."
    ],
    submissionTip: "Upload a photo pointing to your career dream drawing! 🧑‍⚕️",
    parentActivities: [
      "Ask your child: 'Wedefit min mehon tifeligaleh?' and practice answering using Amharic names for doctor/engineer."
    ],
    tutorPacing: [
      "10 mins: Career visual guessing.",
      "25 mins: Professional terminology flashcards.",
      "15 mins: Interactive puzzle scramble grids."
    ],
    tutorTroubleshooting: [
      "Check that children pronounce 'Mehandis' with a clear breathy sound on 'ha'."
    ],
    quiz: [
      {
        questionText: "What does 'መሆን' mean?",
        options: ["To eat", "To sleep", "To become / Be", "To travel"],
        correctAnswerIndex: 2,
        explanation: "'መሆን' (Mehon) translates directly to 'to become'."
      },
      {
        questionText: "How do you say 'Doctor' in Amharic?",
        options: ["መሀንዲስ", "ዶክተር", "እንግዳ", "ስልክ"],
        correctAnswerIndex: 1,
        explanation: "'ዶክተር' (Doctor) represents a physician."
      },
      {
        questionText: "What is 'ህልም'?",
        options: ["Pencil case", "Dream / Vision", "Road route", "Classwork book"],
        correctAnswerIndex: 1,
        explanation: "'ህልም' (Hilm) is a dream or vision of the future."
      },
      {
        questionText: "What is the meaning of 'ምኞት'?",
        options: ["Wish / Goal", "Soccer ball", "Bad helper", "Morning routine"],
        correctAnswerIndex: 0,
        explanation: "'ምኞት' (Miñot) represents one's wish or goal."
      }
    ],
    nextLessonTitle: "Problem Solving"
  },

  // --- LESSON 7: Problem Solving ---
  {
    level: 3,
    lessonNumber: 7,
    geezNumber: "፯",
    topic: "Problem Solving",
    theme: "Logic & Resolutions (ችግር መፍታት)",
    phase: "Level 3 Stage 1: Social Connections",
    subheading: "Learn vocabulary for diagnosing issues, thinking logically, seeking council, and celebrating solutions!",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Detail active logic: 'ችግር' (problem) and 'መፍትሔ' (solution).",
      "Express polite queries seeking logic assistance correctly.",
      "Utilize helper verbs securely during simulations.",
      "Participate in virtual interactive maze solving tasks."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ችግር",
        english: "Chigir",
        meaning: "Problem / Mystery puzzle",
        context: "A difficult homework calculation or broken toy block represents a small 'ችግር'.",
        tutorTip: "The initial syllable is explosive. Pronounce 'Cheeh-gihr'.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Chigir. Problem."
      },
      {
        fidel: "መፍትሔ",
        english: "Meftehe",
        meaning: "Solution / Resolution",
        context: "Using your quick brain ideas to resolve puzzles and fix things is finding the 'መፍትሔ'!",
        tutorTip: "Slight breathy ending: 'Mehf-tih-heh'. Points to progress.",
        imageUrl: "https://images.unsplash.com/photo-1521791136368-1a46827d0a16?w=505&auto=format&fit=crop",
        audioText: "Meftehe. Solution."
      },
      {
        fidel: "ማሰብ",
        english: "Maseb",
        meaning: "To think / Ponder",
        context: "Sitting quietly to brainstorm beautiful lines and formulate strategies is 'ማሰብ'.",
        tutorTip: "An active cognitive root verb: 'Mah-sehb'.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=505&auto=format&fit=crop",
        audioText: "Maseb. To think."
      },
      {
        fidel: "መርዳት",
        english: "Merdat",
        meaning: "To help / Support",
        context: "Lending assistance to younger sisters when they are stranded is 'መርዳት'.",
        tutorTip: "Deep social value indicator: 'Mehr-daat'.",
        imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=505&auto=format&fit=crop",
        audioText: "Merdat. To help."
      },
      {
        fidel: "እንዴት",
        english: "Endet",
        meaning: "How",
        context: "Use 'እንዴት' to interrogate the function of devices: 'እንዴት ይዘጋል?' (How does it close?).",
        tutorTip: "Syllabic stress: 'Ehn-deht'.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Endet. How."
      }
    ],
    exercises: [
      {
        amharic: "እኔ መፍትሔ ማሰብ እወዳለሁ።",
        transliteration: "Ene meftehe maseb ewedalehu.",
        english: "I love thinking of solutions.",
        tip: "Tap your temple with index fingers reflecting deep thought!"
      },
      {
        amharic: "እባክህ ጓደኛህን መርዳት አለብህ።",
        transliteration: "Ebakih gwadeñahin merdat alebih.",
        english: "Please, you must help your friend.",
        tip: "Reach hands forward in a helping gesture!"
      }
    ],
    dialogue: {
      heading: "💬 Analytical Dialogue",
      scenario: "Yared seeks Helen's help to solve a tough mathematics exercise.",
      roles: [
        {
          character: "Yared",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሄለን ፣ ይህ የቤት ስራ ትልቅ ችግር ነው። እንዴት ይፈታል?",
          transliteration: "Helen, yih ye bet sira tilik chigir new. Endet yifetal?",
          english: "Helen, this homework is a big problem. How is it solved?"
        },
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አይዞህ ያሬድ! እኔ መፍትሔውን አውቃለሁ ፤ እረዳሃለሁ።",
          transliteration: "Ayzoh Yared! Ene meftehewn awkalehu, eredahalehu.",
          english: "Do not worry Yared! I know the solution, I will help you."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: Finding the Magic Solution",
      passageAmharic: "ሳሮን በትምህርት ቤት የኮምፒውተር ጨዋታ ስትጫወት ችግር ገጠማት። ኮምፒውተሯ አልሰራም አለ። ሳሮን በንዴት አላለቀሰችም። እጆቿን አጣምራ በጥልቅ 'እንዴት እፈታዋለሁ?' ብላ አሰበች። በመጀመርያ ስልኩን አስተካከለች ፤ ከዚያም ለጓደኛዋ ደወለች። እሱም ረዳትና መፍትሔ አገኙ። ጨዋታው በድጋሚ መስራት ሲጀምር ሳሮን በደስታ ፈነጠዘች።",
      passageTransliteration: "Saron be timihirt bet ye computer chewata sitchewet chigir getemat. Computera alseram ale. Saron be nidet alaleqesechm. Ejochuan atamra betilik 'endet efetawelehu?' bila asebech. Be mejemerya silkun astekelech; keziyam le gwadeñawa dewelech. Esu degmo redatna meftehe agegnu. Chewataw be digami mesrat sijejmir Saron be desta fenetezech.",
      passageEnglish: "Saron faced a problem while playing a computer game at school. Her computer refused to work. Saron did not cry in frustration. Folding her hands, she thought deeply: 'How do I solve it?'. First she adjusted the cord; then she called her friend. He helped her and they found a solution. When the game restarted working, Saron jumped in joy.",
      tutorTip: "Reinforce constructive problem-solving attitudes rather than yielding to minor study blockages."
    },
    writing: {
      heading: "✍️ Analytical Characters",
      instructions: "Practice tracing the problem-solving letters ች (Chi) and ፍ (Fi).",
      lettersToPractice: [
        {
          letter: "ች",
          phonetic: "Chi",
          steps: ["High umbrella line", "Lower leg anchor", "Flat foot connection"]
        },
        {
          letter: "ፍ",
          phonetic: "Fi",
          steps: ["Leftward curl", "Right horizontal joiner", "Downward tail bend"]
        }
      ],
      wordChallenge: "ችግር"
    },
    homework: [
      "Describe a time you solved a simple daily puzzle at home using 'Meftehe'." ,
      "Write 'እኔ ማሰብ እችላለሁ' (I can think) in clean characters in your homework pad.",
      "Trace the characters ች, ቹ, ቺ, ቻ, ቼ, ች, ቾ three times."
    ],
    submissionTip: "Upload a screen of your successfully solved maze or crossword math page labeled in Amharic! 🧩",
    parentActivities: [
      "Help children solve puzzles and encourage them to vocalize their thoughts using 'Meftehe yet new?' (Where is the solution?)."
    ],
    tutorPacing: [
      "10 mins: Riddle warmups.",
      "22 mins: Contextual translation drills.",
      "18 mins: Interactive spelling blend bubble tap."
    ],
    tutorTroubleshooting: [
      "If terms are tough, use standard building blocks to visually demonstrate the concept of a puzzle getting resolved."
    ],
    quiz: [
      {
        questionText: "What does 'ችግር' translate to?",
        options: ["Cold ice", "Problem / Mystery", "Happy dance", "Quiet room"],
        correctAnswerIndex: 1,
        explanation: "'ችግር' (Chigir) represents a puzzle, difficulty or problem."
      },
      {
        questionText: "How do you say 'Solution'?",
        options: ["መፍትሔ", "መንገድ", "ደግ", "ዋና"],
        correctAnswerIndex: 0,
        explanation: "'መፍትሔ' (Meftehe) means solution or resolution."
      },
      {
        questionText: "What represents the action 'To help'?",
        options: ["መብላት", "መርዳት", "መተኛት", "መጻፍ"],
        correctAnswerIndex: 1,
        explanation: "'መርዳት' (Merdat) is to help or support."
      },
      {
        questionText: "What is 'ማሰብ'?",
        options: ["To think", "To jump", "To run", "To travel"],
        correctAnswerIndex: 0,
        explanation: "'ማሰብ' (Maseb) translates to 'to think'."
      }
    ],
    nextLessonTitle: "Teamwork & Cooperation"
  },

  // --- LESSON 8: Teamwork & Cooperation ---
  {
    level: 3,
    lessonNumber: 8,
    geezNumber: "፰",
    topic: "Teamwork & Cooperation",
    theme: "Collaborative Unity (አንድነት)",
    phase: "Level 3 Stage 1: Social Connections",
    subheading: "Learn to declare unit, say 'Let's work together', build collective structures, and practice group cooperation!",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Name 3 teamwork vocabulary: 'አብሮ መስራት' and 'አንድነት'.",
      "Express 'Let's perform...' during team study sessions.",
      "Translate friendly group goals politely.",
      "Roleplay collaborative school assignments."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "አብሮ መስራት",
        english: "Abro Mesrat",
        meaning: "To work together / Collaboration",
        context: "The beautiful technique of combining minds to build school castles or code apps: 'አብሮ መስራት'.",
        tutorTip: "A compound phrase. Break down as 'Abro' (together) and 'Mesrat' (to work). 'Ahb-roh Mehs-raat'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Abro mesrat. Working together."
      },
      {
        fidel: "አንድነት",
        english: "Andinet",
        meaning: "Unity / Togetherness",
        context: "The strength that emerges when whole classrooms of children help each other finish tasks neatly.",
        tutorTip: "Highly patriotic/moral term: 'Ahn-dih-neht'. Speak with high conviction.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Andinet. Unity."
      },
      {
        fidel: "ቡድን",
        english: "Budin",
        meaning: "Team / Group",
        context: "Your unique soccer group, learning panel, or creative quiz panel represents a 'ቡድን'.",
        tutorTip: "Short, crisp: 'Boo-dihn'.",
        imageUrl: "https://images.unsplash.com/photo-15111295742364-92767fa62d9f?w=505&auto=format&fit=crop",
        audioText: "Budin. Team."
      },
      {
        fidel: "ትውልድ",
        english: "Tiwlid",
        meaning: "Generation",
        context: "The bright diaspora kids learning Amharic today represents a brilliant 'ትውልድ'.",
        tutorTip: "A deep cultural nouns descriptor: 'Tih-wlihd'.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Tiwlid. Generation."
      },
      {
        fidel: "መጋራት",
        english: "Megarat",
        meaning: "To share / Distribute",
        context: "Sharing your lunchbox or pencils with a desk companion who forgot theirs represents sweet 'መጋራት'.",
        tutorTip: "Social value connector. 'Meh-gah-raat'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Megarat. To share."
      }
    ],
    exercises: [
      {
        amharic: "እኛ በቡድን አብረን እንሰራለን።",
        transliteration: "Ene be budin abren enseralen.",
        english: "We work together in a team.",
        tip: "Hold hands in a circle and raise them celebrating!"
      },
      {
        amharic: "አንድነት በጣም ታላቅ ኃይል ነው።",
        transliteration: "Andinet betam talak hayil new.",
        english: "Unity is a very great strength.",
        tip: "Form tight fist of strength!"
      }
    ],
    dialogue: {
      heading: "💬 Co-op Discussions",
      scenario: "Elias and Martha organize their group project team roles politely.",
      roles: [
        {
          character: "Elias",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ማርታ ፣ እኛ በአንድነት መስራት እንችላለን?",
          transliteration: "Martha, egn be Andinet mesrat enchilalen?",
          english: "Martha, can we work together in unity?"
        },
        {
          character: "Martha",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አዎ ፤ ቡድናችን አብሮ በመስራት ትልቅ ስራ ይሰራል!",
          transliteration: "Awo, budinachin abro bemesrat tilik sira yiseral!",
          english: "Yes, our team will do great work by working together!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Ant Colony's Lesson",
      passageAmharic: "ሔኖክ ጓሮ ውስጥ ቁጭ ብሎ ብዙ ትናንሽ ጉንዳኖች አየ። ጉንዳኖቹ ትልቅ ምግቦችን በአንድነት ተሸክመው ይሄዱ ነበር። አንዱ ጉንዳን ብቻውን መስራት አልቻለም ፤ ነገር ግን በቡድን ተሰባስበው 'አብሮ መስራት' ቻሉ። ሔኖክ ፈገግ አለና 'በእውነት አንድነት ታላቅ ኃይል ነው ፤ እኛም በትምህርት ቤት እንደ ጉንዳኖቹ መተባበር አለብን' ብሎ አሰበ።",
      passageTransliteration: "Henok guaro wust kuch bilo bizu tinanish gundanoche aye. Gundanoche tilik migbochin be andinet teshekmew yihedu nebere. Andu gundan bichawn mesrat alchalem; neger gin be budin tesebasbew 'abro mesrat' chalu. Henok fegeg alena 'Bewnet andinet talak hayil new; egnam be timihirt bet ende gundanoche metebaber alebin' bilo asebe.",
      passageEnglish: "Henok was sitting in the backyard when he saw tiny ants. The ants were carrying large foods in unity. One ant was unable to do it alone; but gathered in a group, they were able to 'work together'. Henok smiled and thought: 'Truly unity is a great strength; we also at school must cooperate like the ants'.",
      tutorTip: "Acknowledge the role of cooperation and mutual help in team tasks."
    },
    writing: {
      heading: "✍️ Collaborative Characters",
      instructions: "Practice tracing the united letters ቡ (Bu) and ድ (Di).",
      lettersToPractice: [
        {
          letter: "ቡ",
          phonetic: "Bu",
          steps: ["Vertical start left", "Horizontal center connector", "Lower loop indicator"]
        },
        {
          letter: "ድ",
          phonetic: "Di",
          steps: ["Vertical line segment", "Central horizontal drop", "Base bottom foot"]
        }
      ],
      wordChallenge: "ቡድን"
    },
    homework: [
      "Share a chores teamwork task you completed at home with your system tutor.",
      "Write 'አንድነት ኃይል ነው' (Unity is strength) in bold letters on your drawing paper.",
      "Trace the characters ድ, ዱ, ዲ, ዳ, ዴ, ድ, ዶ three times."
    ],
    submissionTip: "Upload a cute photo of your household chore team (you and parents labeled)! 👨‍👩‍👦",
    parentActivities: [
      "Engage kids in daily chores like setting plates and shout: 'Budinachin gobez new!' (Our team is smart!)."
    ],
    tutorPacing: [
      "10 mins: Teamwork puzzle warmup.",
      "22 mins: Collective action conjugation drills.",
      "18 mins: Interactive Syllable Scramble builder."
    ],
    tutorTroubleshooting: [
      "Help children pronounce the compound 'Abro mesrat' focusing clearly on the 'Abro' segment first."
    ],
    quiz: [
      {
        questionText: "What does 'አብሮ መስራት' mean?",
        options: ["To play alone", "To work together / Collaboration", "To eat fast", "To sleep early"],
        correctAnswerIndex: 1,
        explanation: "'አብሮ መስራት' (Abro Mesrat) represents collaborative work or team action."
      },
      {
        questionText: "How do say 'Unity' in Amharic?",
        options: ["አንድነት", "ችግር", "እንግዳ", "ስልክ"],
        correctAnswerIndex: 0,
        explanation: "'አንድነት' (Andinet) translates directly to unity."
      },
      {
        questionText: "What is the meaning of 'ቡድን'?",
        options: ["Pencil box", "Torn book", "Team / Group", "Cold wind"],
        correctAnswerIndex: 2,
        explanation: "'ቡድን' (Budin) represents a team or panel."
      },
      {
        questionText: "What does 'መጋራት' mean?",
        options: ["To share / Distribute", "To run fast", "To swim deep", "To wake up"],
        correctAnswerIndex: 0,
        explanation: "'መጋራት' (Megarat) is the beautiful act of sharing."
      }
    ],
    nextLessonTitle: "Ethiopian Holidays"
  }
];
