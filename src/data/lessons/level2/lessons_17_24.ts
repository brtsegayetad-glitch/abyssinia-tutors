import { Level2LessonDefinition } from "./lessons_1_8";

export const lessons_17_24: Level2LessonDefinition[] = [
  // --- LESSON 17: Transportation ---
  {
    level: 2,
    lessonNumber: 17,
    geezNumber: "፲፯",
    topic: "Transportation",
    theme: "Getting Around (መንገድ)",
    phase: "Level 2 Stage 3: Travel & Narrative",
    subheading: "Learn how to travel by car, train, airplane, and the classic three-wheeled blue 'Bajaj'!",
    imageUrl: "https://images.unsplash.com/photo-1494520744635-3cfdd22d339e?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Select 4 transportation modes in Amharic.",
      "Understand local traffic tools: 'ባጃጅ' and 'ባቡር'.",
      "Translate travel phrases: 'I want to ride the train'.",
      "Use direction particles securely during trip simulations."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "መኪና",
        english: "Mekina",
        meaning: "Car",
        context: "Riding beautiful, safe red cars through the streets of Addis: 'መኪና'!",
        tutorTip: "Very easy word. 'Meh-kee-nah'.",
        imageUrl: "https://images.unsplash.com/photo-1549520744635-3cfdd22d339e?w=505&auto=format&fit=crop",
        audioText: "Mekina. Car."
      },
      {
        fidel: "ባቡር",
        english: "Babur",
        meaning: "Train / Metro",
        context: "The light rail train 'ባቡር' whisks thousands of busy commuters across Addis everyday.",
        tutorTip: "A round vowel sound: 'Baa-boor'.",
        imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=505&auto=format&fit=crop",
        audioText: "Babur. Train."
      },
      {
        fidel: "ባጃጅ",
        english: "Bajaj",
        meaning: "Three-Wheeled Taxi / Auto-Rickshaw",
        context: "The small, cheerful blue 'ባጃጅ' is of paramount use to traverse narrow city lanes.",
        tutorTip: "A fun local word. Speak with high vocal humor: 'Bah-jaaj'.",
        imageUrl: "https://images.unsplash.com/photo-1549520744635-3cfdd22d339e?w=505&auto=format&fit=crop",
        audioText: "Bajaj. Three-wheeled vehicle."
      },
      {
        fidel: "አውሮፕላን",
        english: "Awuroplan",
        meaning: "Airplane / Aircraft",
        context: "Flying high in Ethiopian Airlines 'አውሮፕላን' to land in the majestic Lalibela hills.",
        tutorTip: "Longer loanword. Trace it as 'Ah-woo-roh-plahn'.",
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=505&auto=format&fit=crop",
        audioText: "Awuroplan. Airplane."
      },
      {
        fidel: "ሄድኩ",
        english: "Hedku",
        meaning: "I went / I traveled",
        context: "Tell people where you traveled: 'እኔ ወደ መጽሐፍ ቤት ሄድኩ'.",
        tutorTip: "Primacy action indicator.",
        imageUrl: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=505&auto=format&fit=crop",
        audioText: "Hedku. I went."
      }
    ],
    exercises: [
      {
        amharic: "እኔ በባቡር ሄድኩ።",
        transliteration: "Ene be Babur hedku.",
        english: "I traveled by train.",
        tip: "Mime a moving train wheels gesture!"
      },
      {
        amharic: "ባጃጅ በጣም ፈጣን ነው።",
        transliteration: "Bajaj betam fetan new.",
        english: "The Bajaj is very fast.",
        tip: "Nod with swift motion speed!"
      }
    ],
    dialogue: {
      heading: "💬 TRAVEL dialogues",
      scenario: "Yonas plans a travel route to Auntie's family compound with Helen.",
      roles: [
        {
          character: "Yonas",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሄለን ፣ ወደ አያት ቤት እንዴት እንሄዳለን?",
          transliteration: "Helen, wede ayat bet endet enhedalen?",
          english: "Helen, how are we traveling to grandparent's house?"
        },
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እኛ በባቡር ወይም በባጃጅ እንሄዳለን!",
          transliteration: "Ene be Babur weym be Bajaj enhedalen!",
          english: "We can travel by train or by Bajaj!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Journey to Addis",
      passageAmharic: "ሔኖክ ወደ አዲስ አበባ በታላቅ አውሮፕላን ሄደ። አየር ማረፊያ ውስጥ ብዙ መኪናዎች አየ። ወደ ሆቴሉ ለመሄድ ሰማያዊ ባጃጅ ተሳፈረ። ባቡር ሲያልፍ አየና ደስ ይለው። ጉዞ በጣም ደስ ይላል።",
      passageTransliteration: "Henok wede Addis Ababa be talak Awuroplan hede. Ayer marefya wust bizu mekinawoch aye. Wede hotelu lemehed semayawi Bajaj tesafeere. Babur siyalf ayena des yilew. Guzo betam des yilal.",
      passageEnglish: "Henok went to Addis Ababa inside a grand airplane. At the airport, he saw many cars. To go to his hotel, he rode a blue Bajaj. He saw the light rail train pass and was happy. Journeying is highly exciting.",
      tutorTip: "Focus on how 'Mekina' (car), 'Babur' (train), and 'Bajaj' populate Ethiopian cityscapes."
    },
    writing: {
      heading: "✍️ Traveler Characters",
      instructions: "Practice tracing the active transportation letters መ (Me) and ባ (Ba).",
      lettersToPractice: [
        {
          letter: "መ",
          phonetic: "Me",
          steps: ["Double circular crest", "Slight diagonal", "Base connection flat"]
        },
        {
          letter: "ባ",
          phonetic: "Ba",
          steps: ["High vertical bridge", "Side helper stick", "Base cross bar"]
        }
      ],
      wordChallenge: "መኪና"
    },
    homework: [
      "Find toy transportation cars at home and describe them: 'Mekina' or 'Babur' in Amharic.",
      "Practice chanting 'Awuroplan!' whenever you spot airplanes in the sky.",
      "Trace the traveler characters መ, ሙ, ሚ, ማ, ሜ, ም, ሞ."
    ],
    submissionTip: "Upload your neat drawing of a blue Bajaj labeled in Amharic! 🛺",
    parentActivities: [
      "Ask 'Awuroplan yet new?' (Where is the airplane?) when walking outdoors with kids."
    ],
    tutorPacing: [
      "10 mins: Transit visual check.",
      "25 mins: Travel mode translation dialogues.",
      "15 mins: Interactive spelling match games."
    ],
    tutorTroubleshooting: [
      "If terms are tough, use standard visual wheels prompts to illustrate the Bajaj taxi concept."
    ],
    quiz: [
      {
        questionText: "What is 'ባጃጅ'?",
        options: ["Large Cruise Boat", "Three-Wheeled Vehicle", "Subway Train", "Truck"],
        correctAnswerIndex: 1,
        explanation: "'ባጃጅ' (Bajaj) is the iconic three-wheeled auto-rickshaw taxi of Ethiopia."
      },
      {
        questionText: "How do you say 'Car' in Amharic?",
        options: ["ባቡር", "መኪና", "አውሮፕላን", " ድስት"],
        correctAnswerIndex: 1,
        explanation: "'መኪና' (Mekina) means car."
      },
      {
        questionText: "What is 'ባቡር'?",
        options: ["Bicycle", "Train / Metro", "Helicopter", "Bus"],
        correctAnswerIndex: 1,
        explanation: "'ባቡር' means train."
      },
      {
        questionText: "What does 'ሄድኩ' translate to?",
        options: ["I cooked", "I slept", "I went", "I ate"],
        correctAnswerIndex: 2,
        explanation: "'ሄድኩ' (Hedku) is the pasture action 'I went'."
      }
    ],
    nextLessonTitle: "Visiting Ethiopia"
  },

  // --- LESSON 18: Visiting Ethiopia ---
  {
    level: 2,
    lessonNumber: 18,
    geezNumber: "፲፰",
    topic: "Visiting Ethiopia",
    theme: "Heritage Tour (ኢትዮጵያ)",
    phase: "Level 2 Stage 3: Travel & Narrative",
    subheading: "Explore the stunning castles of Gonder, the rock-hewn Lalibela churches, and Axum's tall obelisks!",
    imageUrl: "https://images.unsplash.com/photo-1547124224-8f47c8f615e4?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Identify 3 legendary historic monuments in Ethiopia.",
      "State travel intentions: 'እኔ ላሊበላ እሄዳለሁ'.",
      "Express heritage pride and tourist terms clearly.",
      "Engage historical conversation exercises."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ኢትዮጵያ",
        english: "Ethiopia",
        meaning: "Ethiopia (Our Heritage)",
        context: "The land of coffee, historical castles, majestic runners, and beautiful children: 'ኢትዮጵያ'!",
        tutorTip: "Build deep pride in this term. 'Ee-tyoh-pyah'.",
        imageUrl: "https://images.unsplash.com/photo-1547124224-8f47c8f615e4?w=505&auto=format&fit=crop",
        audioText: "Ethiopia. Our beautiful heritage country."
      },
      {
        fidel: "ላሊበላ",
        english: "Lalibela",
        meaning: "Lalibela (Holy Rock Churches)",
        context: "The incredible 11 churches carved entirely out of solid red rock underground: 'ላሊበላ'!",
        tutorTip: "A legendary cultural landmark. 'La-lee-beh-la'.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Lalibela. Historic rock carved churches."
      },
      {
        fidel: "ጎንደር",
        english: "Gonder",
        meaning: "Gonder (Imperial Castles)",
        context: "Visit camelot-like stone castles where ancient kings and queens ruled centuries ago: 'ጎንደር'!",
        tutorTip: "Emphasize Gonder Castle. 'Gohn-dehr'.",
        imageUrl: "https://images.unsplash.com/photo-1547124224-8f47c8f615e4?w=505&auto=format&fit=crop",
        audioText: "Gonder. Castle city of emperors."
      },
      {
        fidel: "ጉዞ",
        english: "Guzo",
        meaning: "Journey / Trip",
        context: "Setting on a great adventure or family exploration is called 'ጉዞ'.",
        tutorTip: "Short, crisp: 'Goo-zoh'.",
        imageUrl: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=505&auto=format&fit=crop",
        audioText: "Guzo. Trip or journey."
      },
      {
        fidel: "አየሁ",
        english: "Ayehu",
        meaning: "I saw / I witnessed",
        context: "Use 'አየሁ' to describe seeing lions or ancient towers, like 'I saw Gonder!'.",
        tutorTip: "Active sight past-tense verb.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Ayehu. I saw."
      }
    ],
    exercises: [
      {
        amharic: "እኔ ወደ ላሊበላ እሄዳለሁ።",
        transliteration: "Ene wede Lalibela ehedalehu.",
        english: "I will go to Lalibela.",
        tip: "Point with great journeying posture!"
      },
      {
        amharic: "እኔ ታላቅ ግንብ አየሁ።",
        transliteration: "Ene talak ginb ayehu.",
        english: "I saw a great stone tower/castle.",
        tip: "Form binoculars with your hands!"
      }
    ],
    dialogue: {
      heading: "💬 Heritage Exploration dialogue",
      scenario: "Brook discusses his dream tour itinerary across Ethiopia with Helen.",
      roles: [
        {
          character: "Brook",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሄለን ፣ በጉዞሽ ምን ማየት ትፈልጊያለሽ?",
          transliteration: "Helen, be guzosh min mayet tifeligiyalesh?",
          english: "Helen, what do you want to see on your journey?"
        },
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እኔ የላሊበላ አብያተ ክርስቲያናት ማየት እፈልጋለሁ!",
          transliteration: "Ene ye Lalibela abiyate kristiyanat mayet efeligalehu!",
          english: "I want to see the rock-hewn churches of Lalibela!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Dream Journey",
      passageAmharic: "ኢትዮጵያ ውስጥ ብዙ ታሪካዊ ቦታዎች አሉ። ሔኖክ እና ቤተሰቡ ትልቅ ጉዞ አደረጉ። በመጀመርያ ወደ ላሊበላ ሄዱ ፤ በድንጋይ የተቀረጹትን አብያተ ክርስቲያናት አዩ። ቀጥሎም ወደ ጎንደር ሄደው ቤተመንግስቱን ጎበኙ። ሔኖክ 'ሀገሬ በጣም ታምራለች' አለ።",
      passageTransliteration: "Ethiopia wust bizu tarikawi botawoch alut. Henok ena betesebu tilik Guzo aderegu. Be mejemerya wede Lalibela hedu; be dingay yetekerequten abiyate kristiyanat ayu. Kettilom wede Gonder hedew betemengistun gobengu. Henok 'hagere betam tamralech' ale.",
      passageEnglish: "There are many historical places in Ethiopia. Henok and his family made a grand journey. First they went to Lalibela; they saw the churches carved inside stone. Next they went to Gonder and visited the imperial palace. Henok said 'My country is extremely beautiful'.",
      tutorTip: "Acknowledge the architectural marvels of Lalibela and Gonder and build cultural self-esteem."
    },
    writing: {
      heading: "✍️ Heritage Characters",
      instructions: "Practice tracing the national identity letters ኢ (Ee) and ቶ (To).",
      lettersToPractice: [
        {
          letter: "ኢ",
          phonetic: "Ee",
          steps: ["Vertical start loop", "Center cross separator", "Base curve bracket"]
        },
        {
          letter: "ቶ",
          phonetic: "To",
          steps: ["Pillar t-bar roof", "Right downward bend", "Lower leg anchor"]
        }
      ],
      wordChallenge: "ኢትዮጵያ"
    },
    homework: [
      "Find Ethiopia on a globe/world map and name three cities in Amharic.",
      "Write 'እኔ ሀገሬን እወዳለሁ' (I love my country) on your school drawing board.",
      "Trace the historical characters ኢ, ኡ, ዒ, ኣ, ኤ, እ, ኦ three times."
    ],
    submissionTip: "Upload a picture of your bedroom map labeled 'Ethiopia'! 🗺️",
    parentActivities: [
      "Show children historical travel videos of Lalibela rock churches or Gonder castles to enhance study lessons."
    ],
    tutorPacing: [
      "10 mins: Historic places photo introduction.",
      "25 mins: Travel intent writing practice.",
      "15 mins: Interactive puzzle scramble grids."
    ],
    tutorTroubleshooting: [
      "Assist kids with Gunder castle pronunciations emphasizing: Gohn-dar."
    ],
    quiz: [
      {
        questionText: "Which holy town features churches carved underground in solid rock?",
        options: ["ላሊበላ", "ጎንደር", "አክስም", " አዋሽ"],
        correctAnswerIndex: 0,
        explanation: "'ላሊበላ' (Lalibela) is world-famous for its underground rock-hewn monolith churches."
      },
      {
        questionText: "What does 'ጉዞ' mean?",
        options: ["Pencil case", "Meal", "Journey / Trip", "Homework"],
        correctAnswerIndex: 2,
        explanation: "'ጉዞ' (Guzo) means a journey or trip."
      },
      {
        questionText: "How do you say 'I saw' in Amharic?",
        options: ["በላሁ", "ተኛሁ", "አየሁ", "ነቃሁ"],
        correctAnswerIndex: 2,
        explanation: "'አየሁ' (Ayehu) means 'I saw'."
      },
      {
        questionText: "What castle city is known as Ethiopia's Camelot?",
        options: ["አዲስ አበባ", "ላሊበላ", "ጎንደር", "ሐረር"],
        correctAnswerIndex: 2,
        explanation: "'ጎንደር' (Gonder) has incredible medieval stone palaces built by ancient kings."
      }
    ],
    nextLessonTitle: "Directions & Places"
  },

  // --- LESSON 19: Directions & Places ---
  {
    level: 2,
    lessonNumber: 19,
    geezNumber: "፲፱",
    topic: "Directions & Places",
    theme: "Wayfinding (አቅጣጫ)",
    phase: "Level 2 Stage 3: Travel & Narrative",
    subheading: "Learn how to ask where things are, navigate streets, and use words like left, right, and straight ahead!",
    imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Navigate left, right, and straight direction terms on maps.",
      "Understand positioning terms like 'ፊት ለፊት' (In front).",
      "Request directions politely: 'እባክህ መንገዱ የት ነው?'.",
      "Perform virtual street navigation games."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ቀኝ",
        english: "Kegn",
        meaning: "Right",
        context: "Turn to your 'ቀኝ' representing the side we write with or raise for greetings.",
        tutorTip: "Nasal 'keg-gn'. 'Kehgn'.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Kegn. Right."
      },
      {
        fidel: "ግራ",
        english: "Gira",
        meaning: "Left",
        context: "Turn to your 'ግራ' to find the cozy green beanbag study chair in your bedroom.",
        tutorTip: "Light initial 'G': 'Gih-rah'.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Gira. Left."
      },
      {
        fidel: "ቀጥታ",
        english: "Kettita",
        meaning: "Straight / Ahead",
        context: "Walking 'ቀጥታ' leads you directly down the lane to school front door gate.",
        tutorTip: "Strong sharp double T: 'K'eht-t'ee-t'ah'.",
        imageUrl: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=505&auto=format&fit=crop",
        audioText: "Kettita. Straight."
      },
      {
        fidel: "መንገድ",
        english: "Menged",
        meaning: "Road / Path / Route",
        context: "The broad, safe asphalt 'መንገድ' that carries Bajaj taxis and school busses.",
        tutorTip: "Crisp syllables. 'Mehn-gehd'.",
        imageUrl: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=505&auto=format&fit=crop",
        audioText: "Menged. Road."
      },
      {
        fidel: "ፊት ለፊት",
        english: "Fit Lefit",
        meaning: "In front / Facing",
        context: "The beautiful library is situated 'ፊት ለፊት' directly across the post office.",
        tutorTip: "Double rhythmic pairing: 'Feet Leh-feet'.",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=505&auto=format&fit=crop",
        audioText: "Fit lefit. In front."
      }
    ],
    exercises: [
      {
        amharic: "እባክህ ቀጥታ ሂድ።",
        transliteration: "Ebakih kettita hid.",
        english: "Please, go straight.",
        tip: "Point straight ahead with high purpose!"
      },
      {
        amharic: "ወደ ቀኝ ታጠፍ።",
        transliteration: "Wede kegn tatef.",
        english: "Turn to the right.",
        tip: "Swing your arms pointing rightwards!"
      }
    ],
    dialogue: {
      heading: "💬 Wayfinding Dialogues",
      scenario: "Helen asks a polite bypasser for directions to the national library.",
      roles: [
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "እባክህ መጽሐፍ ቤቱ የት ነው?",
          transliteration: "Ebakih metsihaf betu yet new?",
          english: "Please, where is the library?"
        },
        {
          character: "Bypasser",
          avatar: "👨",
          bubbleSide: "right",
          amharic: "ቀጥታ ሂድና ወደ ግራ ታጠፍ ፤ ፊት ለፊት ነው!",
          transliteration: "Kettita hidna wede Gira tatef, fit lefit new!",
          english: "Go straight and turn left, it is right in front!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: Finding the Ice Cream Shop",
      passageAmharic: "ሔኖክ ጣፋጭ ሙዝ በረዶ መግዛት ፈለገ። ሱቁ የት እንዳለ ግን አላወቀም። 'እባክህ መንገዱ የት ነው?' ብሎ አያቱን ጠየቁ። አያት ፈገግ ብለው 'ቀጥታ ሂድና ወደ ቀኝ ታጠፍ ፤ ፊት ለፊት ነው' አሉት። ሔኖክም 'አመሰግናለሁ!' ብሎ ሄደ።",
      passageTransliteration: "Henok tafach muz beredo megzat felege. Suku yet indale gin alawokem. 'Ebakih mengedu yet new?' bilo ayatun yeteyikal. Ayat fegeg bilew 'kettita hidna wede kegn tatef, fit lefit new' alut. Henokim 'Ameseginalehu!' bilo hede.",
      passageEnglish: "Henok wanted to buy sweet banana ice cream. But he didn't know where the shop was located. 'Please, where is the road?' he asked his grandparent. Grandparent smiled and said, 'Go straight and turn right, it is right in front'. Henok, saying 'Thank you!', departed.",
      tutorTip: "Practice the directions left ('gira'), right ('kegn'), and straight ('kettita') physically in the class."
    },
    writing: {
      heading: "✍️ Navigation Characters",
      instructions: "Practice tracing the direction symbols ቀ (Ke) and ግ (Gi).",
      lettersToPractice: [
        {
          letter: "ቀ",
          phonetic: "Ke",
          steps: ["Loop design head", "Vertical support bar", "Base connector curve"]
        },
        {
          letter: "ግ",
          phonetic: "Gi",
          steps: ["Horizontal roof divider", "Diagonal left leg", "Lower hook wing"]
        }
      ],
      wordChallenge: "ቀኝ"
    },
    homework: [
      "Direct a parent inside the house using 'gira' and 'kegn' tags today.",
      "Write 'ቀጥታ ሂድ' (Go straight) on your bedroom door tag.",
      "Trace the direction characters ቀ, ቁ, ቂ, ቃ, ቄ, ቅ, ቆ."
    ],
    submissionTip: "Upload a photo of your bedroom doors labeled 'ቀጥታ' or 'ቀኝ'! 🚪",
    parentActivities: [
      "Play blindfolded navigation games in the living room guide children using only 'Gira' and 'Kegn' calls."
    ],
    tutorPacing: [
      "10 mins: Directional physical warmups.",
      "22 mins: Virtual map searching games.",
      "18 mins: Interactive spelling blend bubble tap."
    ],
    tutorTroubleshooting: [
      "If children mix left and right, physically link 'Kegn' with writing hands."
    ],
    quiz: [
      {
        questionText: "What does 'ቀኝ' mean?",
        options: ["Left", "Right", "Straight", "Behind"],
        correctAnswerIndex: 1,
        explanation: "'ቀኝ' (Kegn) represents Right."
      },
      {
        questionText: "How do you say 'Left' in Amharic?",
        options: ["ቀኝ", "ቀጥታ", "ግራ", "መንገድ"],
        correctAnswerIndex: 2,
        explanation: "'ግራ' (Gira) means Left."
      },
      {
        questionText: "What is 'ቀጥታ'?",
        options: ["Turn around", "Stop", "Leftwards", "Straight / Ahead"],
        correctAnswerIndex: 3,
        explanation: "'ቀጥታ' (Kettita) means straight ahead."
      },
      {
        questionText: "Which word represents 'Road or Path'?",
        options: ["ልክ", "ቤት", "መንገድ", "ደውል"],
        correctAnswerIndex: 2,
        explanation: "'መንገድ' (Menged) represents path or road."
      }
    ],
    nextLessonTitle: "Community Events"
  },

  // --- LESSON 20: Community Events ---
  {
    level: 2,
    lessonNumber: 20,
    geezNumber: "፳",
    topic: "Community Events",
    theme: "Festivals & Gatherings (በዓል)",
    phase: "Level 2 Stage 3: Travel & Narrative",
    subheading: "Learn about grand celebrations, holiday feasts, music dances, and weddings in Ethiopia!",
    imageUrl: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Name 3 types of community gatherings in Amharic.",
      "Understand the key celebratory word: 'በዓል' (Holiday).",
      "Translate phrases like 'I love beautiful music'.",
      "Engage traditional congratulations etiquette."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "በዓል",
        english: "Be'al",
        meaning: "Holiday / Festival",
        context: "Ethiopians gather in thousands wearing native white woven clothes for major 'በዓል' celebrations.",
        tutorTip: "Glottal stop: 'Beh-ahl'.",
        imageUrl: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?w=505&auto=format&fit=crop",
        audioText: "Be'al. Holiday."
      },
      {
        fidel: "ሙዚቃ",
        english: "Muziqa",
        meaning: "Music / Melodies",
        context: "The upbeat sound of traditional stringed 'Masinko' or hand drum 'Kebero' is 'ሙዚቃ'.",
        tutorTip: "Very easy loanword: 'Moo-zee-kah'.",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=505&auto=format&fit=crop",
        audioText: "Muziqa. Music."
      },
      {
        fidel: "ጨዋታ",
        english: "Chewata",
        meaning: "Game / Playful Dance",
        context: "Weddings are famous for laughter, traditional dances, and fun group 'ጨዋታ' times.",
        tutorTip: "The initial syllable is explosive. 'Cheh-wah-tah'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Chewata. Game."
      },
      {
        fidel: "ሰርግ",
        english: "Serg",
        meaning: "Wedding Celebration",
        context: "Traditional 'ሰርግ' involves horseback rides, singing aunts, and massive banquets.",
        tutorTip: "Clear short syllable: 'Sehrg'.",
        imageUrl: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?w=505&auto=format&fit=crop",
        audioText: "Serg. Wedding."
      },
      {
        fidel: "ደስታ",
        english: "Desta",
        meaning: "Happiness / Joy",
        context: "A cheerful heart full of beautiful ideas and love represents pure energetic 'ደስታ'.",
        tutorTip: "Highly emotional card. Speak warmly: 'Dehs-tah'.",
        imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=505&auto=format&fit=crop",
        audioText: "Desta. Joy."
      }
    ],
    exercises: [
      {
        amharic: "ዛሬ ታላቅ በዓል ነው።",
        transliteration: "Zare talak Be'al new.",
        english: "Today is a great holiday.",
        tip: "Raise arms celebrating with high energy!"
      },
      {
        amharic: "እኔ ሙዚቃ እወዳለሁ።",
        transliteration: "Ene Muziqa ewedalehu.",
        english: "I love music.",
        tip: "Mime clapping on rhythm to a drum beat!"
      }
    ],
    dialogue: {
      heading: "💬 Celebration Conversations",
      scenario: "Binyam tells Blen about attending his cousin's traditional wedding feast.",
      roles: [
        {
          character: "Binyam",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ብሌን ፣ በዓል ላይ ወዴት ትሄዳለህ?",
          transliteration: "Blen, Be'al lay wedet tihedaleh?",
          english: "Blen, where are you going during the holiday?"
        },
        {
          character: "Blen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እኔ ወደ ሰርግ እሄዳለሁ ፤ ጨዋታ እና ሙዚቃ ደስ ይለኛል!",
          transliteration: "Ene wede Serg ehedalehu, chewata ena muziqa des yilignal!",
          english: "I am going to a wedding, I love the games and music!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Festival Joy",
      passageAmharic: "ዛሬ ቋንቋችን ሰርጋችን በዓላችን ነው። ትልቅ በዓል ለመቀበል ቤተሰባችን ተሰበሰቡ። አክስቴ ደስ የሚል ባህላዊ ሙዚቃ ከፈተች። ሁላችንም አብረን ጭፈራና ጨዋታ አደረግን። በቤታችን ውስጥ ደስታ ሞላ።",
      passageTransliteration: "Zare kwankwachin sergachin be'alachin new. Tilik be'al lemekebel betesebachin tesebesebu. Akiste des yemil bahlawi muziqa kefetech. Hulachinim abren chifera ena chewata aderegn. Be betachin wust desta mola.",
      passageEnglish: "Today is our native anniversary festival holiday. To receive the grand festival, our family gathered. My aunt opened delightful traditional music. We all performed song and games together. Happiness filled our home.",
      tutorTip: "Introduce kids to traditional percussion instruments like 'Kebero' and stringed 'Masinko'."
    },
    writing: {
      heading: "✍️ Celebration Characters",
      instructions: "Practice tracing the holiday letters በ (Be) and ሰ (Se).",
      lettersToPractice: [
        {
          letter: "በ",
          phonetic: "Be",
          steps: ["Vertical start left", "Horizontal center bar", "Right vertical pillar"]
        },
        {
          letter: "ሰ",
          phonetic: "Se",
          steps: ["Loop design header", "Internal dip segment", "Right baseline leg"]
        }
      ],
      wordChallenge: "በዓል"
    },
    homework: [
      "Listen to an Ethiopian cultural song on YouTube and describe the rhythm to parents.",
      "Write 'ይህ በዓል ደስ ይላል' (This holiday is joyful) in your notebook.",
      "Trace the celebration characters በ, ቡ, ቢ, ባ, ቤ, ብ, ቦ."
    ],
    submissionTip: "Upload a recording dancing to traditional Ethiopian music loops! 🎵",
    parentActivities: [
      "Tell children stories about traditional Ethiopian weddings ('Serg') and standard family feasts."
    ],
    tutorPacing: [
      "10 mins: Festival sights intro.",
      "22 mins: Translation match grids.",
      "18 mins: Interactive spelling puzzle builder."
    ],
    tutorTroubleshooting: [
      "If children struggle with 'Be'al', model the glottal sound explicitly."
    ],
    quiz: [
      {
        questionText: "What does 'በዓል' mean?",
        options: ["Pencil", "Homework", "Holiday / Festival", "School Card"],
        correctAnswerIndex: 2,
        explanation: "'በዓል' (Be'al) is a holiday or group festival in Ethiopia."
      },
      {
        questionText: "How do you say 'Music'?",
        options: ["ሰዓት", "ሱቅ", "ሙዚቃ", "ብር"],
        correctAnswerIndex: 2,
        explanation: "'ሙዚቃ' (Muziqa) translates to music."
      },
      {
        questionText: "What represents a 'Wedding Celebration'?",
        options: ["ድስት", "ሰርግ", "ላሊበላ", "እንጀራ"],
        correctAnswerIndex: 1,
        explanation: "'ሰርግ' (Serg) means a wedding celebration."
      },
      {
        questionText: "Which emotional word means 'Happiness'?",
        options: ["ስራ", "ዋጋ", "ደስታ", "ጉዞ"],
        correctAnswerIndex: 2,
        explanation: "'ደስታ' (Desta) represents joy or happiness."
      }
    ],
    nextLessonTitle: "Sharing Opinions"
  },

  // --- LESSON 21: Sharing Opinions ---
  {
    level: 2,
    lessonNumber: 21,
    geezNumber: "፳፩",
    topic: "Sharing Opinions",
    theme: "My Thoughts (አስተያየት)",
    phase: "Level 2 Stage 3: Travel & Narrative",
    subheading: "Learn how to express your thoughts, agree politely, and state your preferences nicely!",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "State simple preferences: 'እኔ ጥሩ ይመስለኛል'.",
      "Agree and disagree with classmates politely.",
      "Express 'In my opinion' (በእኔ አስተያየት).",
      "Read short narrative dialogue pieces."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "አስተያየት",
        english: "Asteyayet",
        meaning: "Opinion / Viewpoint",
        context: "Sharing your thought or sweet perspective is called giving an 'አስተያየት'.",
        tutorTip: "Pacing on 'Ahs-teh-yah-yeht'. Emphasize mental sharing.",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=505&auto=format&fit=crop",
        audioText: "Asteyayet. Opinion."
      },
      {
        fidel: "በእኔ አስተያየት",
        english: "Bene Asteyayet",
        meaning: "In my opinion",
        context: "To sound mature and elegant, start ideas with 'በእኔ አስተያየት'.",
        tutorTip: "A vital prefix phrase for advanced kids.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=505&auto=format&fit=crop",
        audioText: "Bene asteyayet. In my opinion."
      },
      {
        fidel: "እስማማለሁ",
        english: "Ismamalehu",
        meaning: "I agree / I support",
        context: "Say 'እስማማለሁ' to support a friend's plan of visiting the green park.",
        tutorTip: "Warm cooperative verb spelling.",
        imageUrl: "https://images.unsplash.com/photo-1521791136368-1a46827d0a16?w=505&auto=format&fit=crop",
        audioText: "Ismamalehu. I agree."
      },
      {
        fidel: "መጥፎ",
        english: "Metfo",
        meaning: "Bad / Unpleasant",
        context: "Salty cookies or grey cold rainy mornings are described as 'መጥፎ'.",
        tutorTip: "Keep initial 'M' strong: 'Meht-foh'.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Metfo. Bad."
      },
      {
        fidel: "እውነት",
        english: "Ewnet",
        meaning: "Truth / Correct",
        context: "If someone tells a factual historical story, say 'እውነት ነው!' (It is true!).",
        tutorTip: "Pronounced gently. 'Ih-wnet'.",
        imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=505&auto=format&fit=crop",
        audioText: "Ewnet. Truth."
      }
    ],
    exercises: [
      {
        amharic: "እኔ ጥሩ ታሪክ እወዳለሁ።",
        transliteration: "Ene tiru tarik ewedalehu.",
        english: "I love good stories.",
        tip: "Form a heart pose over your chest!"
      },
      {
        amharic: "በእኔ አስተያየት ይህ ትክክል ነው።",
        transliteration: "Bene asteyayet yih tikikil new.",
        english: "In my opinion, this is correct.",
        tip: "Nod firmly clicking fingers!"
      }
    ],
    dialogue: {
      heading: "💬 OPINION sharing session",
      scenario: "Ruth and Elias discuss if playing soccer outdoors is the ultimate weekend plan.",
      roles: [
        {
          character: "Ruth",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "ኤልያስ ፣ በእኔ አስተያየት ኳስ መጫወት ምርጥ ነው!",
          transliteration: "Elias, bene asteyayet kwas mechewet mirp new!",
          english: "Elias, in my opinion playing soccer is the best!"
        },
        {
          character: "Elias",
          avatar: "👦",
          bubbleSide: "right",
          amharic: "እስማማለሁ ፤ እኔም ኳስ በጣም እወዳለሁ!",
          transliteration: "Ismamalehu, enem kwas betam ewedalehu!",
          english: "I agree; I also love soccer very much!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Respectful Discussion",
      passageAmharic: "በትምህርት ቤት መምህሩ ተማሪዎችን 'ስዕል መሳል ጥሩ ነው?' ብሎ ጠየቁ። ሔኖክ 'በእኔ አስተያየት ስዕል አእምሮን ያሳድጋል' አለ። ሊያም 'እስማማለሁ ፤ እውነት ነው' ብላ መለሰች። ሁሉም ተስማምተው በጥሩ አስተያየት አጠኑ።",
      passageTransliteration: "Be timihirt bet memhiru temariwochin 'si'il mesal tiru new?' bilo yeteyikal. Henok 'bene asteyayet si'il a'imroyen yasadgewal' ale. Leahim 'ismamalehu, ewnet new' bila melesech. Hulachinim tesmamtew betiru asteyayet atenu.",
      passageEnglish: "At school, the teacher asked students: 'Is drawing artwork good?'. Henok said: 'In my opinion, drawing artwork helps grow our mind.' Leah replied: 'I agree, it is very true.' They all agreed collaborative and studied with good viewpoints.",
      tutorTip: "Acknowledge children's opinions and reward active participation warmly."
    },
    writing: {
      heading: "✍️ Thoughtful Characters",
      instructions: "Practice tracing the intellectual letters አ (A) and ስ (Si).",
      lettersToPractice: [
        {
          letter: "አ",
          phonetic: "A",
          steps: ["Vertical curve line", "Horizontal crossbar", "Root stem"]
        },
        {
          letter: "እ",
          phonetic: "Ih",
          steps: ["Segment divider", "Center hook loop", "Base plate touch"]
        }
      ],
      wordChallenge: "እውነት"
    },
    homework: [
      "Share an opinion 'Bene asteyayet...' about a dinner dish to parents in Amharic.",
      "Practice saying 'Ismamalehu' (I agree) during family chats.",
      "Trace the opinion characters አ, ኡ, ዒ, ኣ, ኤ, እ, ኦ."
    ],
    submissionTip: "Upload a screen of your notebook tracing letters elegantly! 🗒️",
    parentActivities: [
      "Ask kids 'Hisab gobez neh?' and let them confidently respond 'Bene asteyayet' (In my opinion)."
    ],
    tutorPacing: [
      "10 mins: Opinion card introduction.",
      "25 mins: Debate simulation exercises (Soccer vs Painting).",
      "15 mins: Target sound bubble tapping."
    ],
    tutorTroubleshooting: [
      "If children say 'Asteyayet' slowly, break it to: Ahs-teh-yah-yeht."
    ],
    quiz: [
      {
        questionText: "What does 'አስተያየት' represent?",
        options: ["Pencil", "Cooking Pot", "Opinion / Viewpoint", "Clock"],
        correctAnswerIndex: 2,
        explanation: "'አስተያየት' (Asteyayet) means an opinion, perspective, or viewpoint."
      },
      {
        questionText: "How do you say 'In my opinion'?",
        options: ["በእኔ አስተያየት", "እስማማለሁ", "መጥፎ", "እውነት"],
        correctAnswerIndex: 0,
        explanation: "'በእኔ አስተያየት' (Bene asteyayet) is used to preface thoughts."
      },
      {
        questionText: "Which word represents 'I agree'?",
        options: ["እቅዳለሁ", "ሮጥኩ", "እስማማለሁ", "በላሁ"],
        correctAnswerIndex: 2,
        explanation: "'እስማማለሁ' (Ismamalehu) means 'I agree'."
      },
      {
        questionText: "What is the meaning of 'መጥፎ'?",
        options: ["Good", "Beautiful", "Bad / Unpleasant", "Sweet"],
        correctAnswerIndex: 2,
        explanation: "'መጥፎ' means bad."
      }
    ],
    nextLessonTitle: "Telling Short Stories"
  },

  // --- LESSON 22: Telling Short Stories ---
  {
    level: 2,
    lessonNumber: 22,
    geezNumber: "፳፪",
    topic: "Telling Short Stories",
    theme: "Fable Storyteller (ታሪክ)",
    phase: "Level 2 Stage 3: Travel & Narrative",
    subheading: "Master beautiful traditional fables featuring the clever rabbit (Tinchel) and the strong lion (Anbessa)!",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Dramatize 4 unique folklore animal characters in Amharic.",
      "Understand story pacing words like 'አንድ ጊዜ' (Once upon a time).",
      "Explain the moral lessons of clever rabbit fables.",
      "Engage interactive storytelling roles."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "አንድ ጊዜ",
        english: "And Gize",
        meaning: "Once upon a time / Once",
        context: "The magical fairy-tale opener. Use 'አንድ ጊዜ' to start cool animal narratives.",
        tutorTip: "Very nostalgic opening. 'And gee-zeh'.",
        imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=505&auto=format&fit=crop",
        audioText: "And gize. Once upon a time."
      },
      {
        fidel: "አንበሳ",
        english: "Anbessa",
        meaning: "Lion (King of Forest)",
        context: "The mighty 'አንበሳ' represents strength, courage, and is the absolute national symbol of Ethiopia.",
        tutorTip: "Deep roaring voice! 'Ah-beh-sah'.",
        imageUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=505&auto=format&fit=crop",
        audioText: "Anbessa. Lion."
      },
      {
        fidel: "ብልህ",
        english: "Bilih",
        meaning: "Clever / Smart",
        context: "A small bunny is called 'ብልህ' because he outsmarts giants using his brilliant ideas.",
        tutorTip: "Praise children as 'Bilih' during study sessions.",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=505&auto=format&fit=crop",
        audioText: "Bilih. Clever."
      },
      {
        fidel: "ጥንቸል",
        english: "Tinchel",
        meaning: "Rabbit / Bunny",
        context: "The hopping white rabbit 'ጥንቸል' lives under carrots and tells jokes in fables.",
        tutorTip: "A hopping mimic. 'Tihn-chehl'.",
        imageUrl: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=505&auto=format&fit=crop",
        audioText: "Tinchel. Rabbit."
      },
      {
        fidel: "ሞኝ",
        english: "Mogn",
        meaning: "Silly / Foolish",
        context: "In animal rules, big wolves who get tricked are called 'ሞኝ'.",
        tutorTip: "Nasal 'gn' ending: 'Mohgn'.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Mogn. Foolish."
      }
    ],
    exercises: [
      {
        amharic: "እኔ አንድ ጊዜ ታሪክ አውቃለሁ።",
        transliteration: "Ene and gize tarik awkalehu.",
        english: "I know a once-upon-a-time story.",
        tip: "Mime flipping ancient book pages!"
      },
      {
        amharic: "ጥንቸሉ በጣም ብልህ ነው።",
        transliteration: "Tinchelu betam bilih new.",
        english: "The rabbit is very clever.",
        tip: "Point to your ear demonstrating intelligence!"
      }
    ],
    dialogue: {
      heading: "💬 Storytelling dialogues",
      scenario: "Helen recounts a classic animal victory fable to Kidus during bedtime.",
      roles: [
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "ኪዱስ ፣ ትልቅ የአንበሳ ታሪክ ታውቃለህ?",
          transliteration: "Kidus, tilik ye Anbessa tarik tawkaleh?",
          english: "Kidus, do you know a grand story about the lion?"
        },
        {
          character: "Kidus",
          avatar: "👦",
          bubbleSide: "right",
          amharic: "አዎ ፣ አንበሳው ጉልበተኛ ነው ፤ ጥንቸሉ ግን ብልህ ነው!",
          transliteration: "Awo, anbessaw gulbetegnia new, tinchelu gin bilih new!",
          english: "Yes, the lion is strong but the rabbit is clever!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Clever Rabbit's Trick",
      passageAmharic: "አንድ ጊዜ በታላቅ ጫካ ውስጥ ጠንካራ አንበሳ ነበረ። እሱ ሁሉንም እንስሳ ያስፈራ ነበር። አንድ ቀን ግን አንዲት ብልህ ጥንቸል መጣች። ጥንቸሏ አንበሳውን በውሃ መስታወት ውስጥ አሳይታ አታለለችው። አንበሳው ሞኝ ሆነ ፤ ጥንቸሏ ግን በደስታ ኖረች።",
      passageTransliteration: "And gize be talak chaka wust tenkara Anbessa nebere. Esu hulunim ensisa yasfera nebere. And ken gin andit bilih Tinchel metach. Tinchela anbessawn be wha mestawat wust asayta atalelechew. Anbessaw mogn hone; tinchela gin bedesta norech.",
      passageEnglish: "Once upon a time in a master forest, there was a strong lion. He used to scare all animals. One day, however, a clever rabbit arrived. The rabbit tricked the lion by showing him his reflection in water. The lion was silly; the rabbit lived happily.",
      tutorTip: "Review the vocabulary definitions of 'Anbessa' (lion), 'Tinchel' (rabbit), and cleverness 'bilih'."
    },
    writing: {
      heading: "✍️ Story characters",
      instructions: "Practice tracing the story letters ታ (Ta) and ጥ (Ti).",
      lettersToPractice: [
        {
          letter: "ታ",
          phonetic: "Ta",
          steps: ["Vertical loop side helper", "Flat table top line", "Right tail leg"]
        },
        {
          letter: "ጥ",
          phonetic: "Ti",
          steps: ["Horizontal line hats", "Diagonal drop", "Lower bowl curve"]
        }
      ],
      wordChallenge: "ጥንቸል"
    },
    homework: [
      "Tell a simplified animal story using 'Anbessa' and 'Tinchel' labels to parents tonight.",
      "Write 'ጥንቸሉ ብልህ ነው' in your homework notebook.",
      "Trace the clever characters ጥ, ጡ, ጢ, ጣ, ጤ, ጥ, ጦ."
    ],
    submissionTip: "Upload a picture drawing a lion and rabbit, labeled correctly in Amharic! 🦁",
    parentActivities: [
      "Read native moral tales about outsmarting giants to develop sharp problem-solving instincts."
    ],
    tutorPacing: [
      "10 mins: Animal sounds warmup.",
      "22 mins: Narrative walkthrough translation drills.",
      "18 mins: Interactive Syllable Scramble Assembly game."
    ],
    tutorTroubleshooting: [
      "If terms are tough, use standard hand puppets to showcase fables on the webcams."
    ],
    quiz: [
      {
        questionText: "What does 'አንበሳ' represent?",
        options: ["Rabbit", "Lion", "Giraffe", "Elephant"],
        correctAnswerIndex: 1,
        explanation: "'አንበሳ' (Anbessa) is the legendary Lion, representing Ethiopian courage."
      },
      {
        questionText: "What is 'ጥንቸል' in English?",
        options: ["Fox", "Tiger", "Rabbit", "Bear"],
        correctAnswerIndex: 2,
        explanation: "'ጥንቸል' means rabbit."
      },
      {
        questionText: "Which adjective represents 'Clever/Smart'?",
        options: ["ሞኝ", "ብልህ", "መጥፎ", "ቀኝ"],
        correctAnswerIndex: 1,
        explanation: "'ብልህ' (Bilih) translates directly to clever or smart."
      },
      {
        questionText: "How do we open a fairytale: 'Once upon a time'?",
        options: ["አንድ ጊዜ", "ቀጥታ ሂድ", "ዛሬ", "ነገ"],
        correctAnswerIndex: 0,
        explanation: "'አንድ ጊዜ' (And gize) is the classic Amharic fable entrance phrase."
      }
    ],
    nextLessonTitle: "Describing Experiences"
  },

  // --- LESSON 23: Describing Experiences ---
  {
    level: 2,
    lessonNumber: 23,
    geezNumber: "፳፫",
    topic: "Describing Experiences",
    theme: "Vacation Recount (ልምድ)",
    phase: "Level 2 Stage 3: Travel & Narrative",
    subheading: "Learn to describe your historical trips, amazing meals, and fun times from yesterday!",
    imageUrl: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Use past-tense indicators like 'ትናንት' (Yesterday) accurately.",
      "Identify 3 vocabulary adjectives for cool feelings.",
      "Formulate short narrative summaries of your past actions.",
      "Read holiday journey paragraphs."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ትናንት",
        english: "Tinent",
        meaning: "Yesterday",
        context: "Describe things that finished yesterday: 'ትናንት እኔ ሒሳብ አጠናሁ'.",
        tutorTip: "Double 'N' sound format. 'Tee-nehnt'.",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=505&auto=format&fit=crop",
        audioText: "Tinent. Yesterday."
      },
      {
        fidel: "ልምድ",
        english: "Limd",
        meaning: "Experience / Practice Skill",
        context: "Your unique adventures, travel steps, and learning actions are called 'ልምድ'!",
        tutorTip: "Short crisp drop: 'Lihmd'.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=505&auto=format&fit=crop",
        audioText: "Limd. Experience."
      },
      {
        fidel: "ትልቅ",
        english: "Tilik",
        meaning: "Big / Grand",
        context: "Ethiopia features a 'ትልቅ' blue sky and 'ትልቅ' mountains for mountain hiking.",
        tutorTip: "The initials are explosive. 'Tee-lihk'.",
        imageUrl: "https://images.unsplash.com/photo-1547124224-8f47c8f615e4?w=505&auto=format&fit=crop",
        audioText: "Tilik. Big."
      },
      {
        fidel: "አየሁ",
        english: "Ayehu",
        meaning: "I saw / I observed",
        context: "Using your eyes to see fun things: 'እኔ አንበሳ አየሁ' (I saw a lion yesterday).",
        tutorTip: "Active past-tense vision indicator.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Ayehu. I saw."
      },
      {
        fidel: "በጣም",
        english: "Betam",
        meaning: "Very / Extremely",
        context: "Combine to amplify, like 'በጣም ጣፋጭ' (very delicious) or 'በጣም ጥሩ' (extremely good).",
        tutorTip: "A core daily booster word. 'Beh-taam'.",
        imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=505&auto=format&fit=crop",
        audioText: "Betam. Very."
      }
    ],
    exercises: [
      {
        amharic: "ትናንት እኔ መጽሐፍ አየሁ።",
        transliteration: "Tinent ene metsihaf ayehu.",
        english: "Yesterday I saw a book.",
        tip: "Point rearwards indicating past timeline!"
      },
      {
        amharic: "ይህ በጣም ትልቅ መኪና ነው።",
        transliteration: "Yih betam tilik mekina new.",
        english: "This is a very big car.",
        tip: "Form maximum broad space with arms!"
      }
    ],
    dialogue: {
      heading: "💬 Experience sharing sessions",
      scenario: "Yonas describes his vacation safari fun to Eleni.",
      roles: [
        {
          character: "Yonas",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "እሌኒ ፣ ትናንት በጉዞህ ምን አየህ?",
          transliteration: "Eleni, tinent be guzoh min ayeh?",
          english: "Eleni, what did you see on your trip yesterday?"
        },
        {
          character: "Eleni",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እኔ ትናንት ትልቅ መኪና እና አንበሳ አየሁ!",
          transliteration: "Ene tinent tilik mekina ena Anbessa ayehu!",
          english: "Yesterday, I saw a very big car and a lion!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: Yesterday's Big Adventure",
      passageAmharic: "ትናንት እሁድ ቀን ነበረ። እኔና አጎቴ ወደ ትልቅ ገበያ ሄደን ነበር። በዚያ ብዙ ብርቱካንና ሙዝ አየሁ። ገበያው በጣም የሚበዛበት ነበረ። እኔ ጣፋጭ ወተት ጠጣሁ። ትናንት በጣም ደስ የሚል ልምድ ነበረኝ።",
      passageTransliteration: "Tinent Ehud ken nebere. Ene ena agote wede tilik gebeya heden nebere. Beziya bizu birtukan ena muz ayehu. Gebeyaw betam yemibezabet nebere. Ene tafach wetet tettahu. Tinent betam des yemil limd neberegn.",
      passageEnglish: "Yesterday was Sunday. My uncle and I had gone to a big market. There I saw many oranges and bananas. The market was extremely crowded. I drank delicious milk. Yesterday I had a very joyful experience.",
      tutorTip: "Point out the past narrative structure using time indicator 'Tinent' (yesterday)."
    },
    writing: {
      heading: "✍️ Experience Characters",
      instructions: "Practice tracing the past letters ት (Ti) and ል (Li).",
      lettersToPractice: [
        {
          letter: "ት",
          phonetic: "Ti",
          steps: ["Vertical loop side hanger", "Flat base bridge", "Lower right leg"]
        },
        {
          letter: "ል",
          phonetic: "Li",
          steps: ["Roof hook hangers", "Diagonal branch drops", "Center foot leg"]
        }
      ],
      wordChallenge: "ልምድ"
    },
    homework: [
      "Tell parents three things you completed yesterday in Amharic using 'Tinent' prefacing.",
      "Write 'ትናንት እኔ ተጫወትኩ' in notebook.",
      "Trace the historical characters ት, ቱ, ቲ, ታ, ቴ, ት, ቶ."
    ],
    submissionTip: "Upload your completed page tracing 'Tinent' clearly in pencil! 🗒️",
    parentActivities: [
      "Review the child's photo collection and encourage them to say 'Ayehu' (I saw) in front of photos."
    ],
    tutorPacing: [
      "10 mins: Past homework evaluation.",
      "25 mins: Past activities narrative creation drills.",
      "15 mins: Scrambled assembly bubble tapping."
    ],
    tutorTroubleshooting: [
      "If they say 'Limd' like English 'limbed', correct the brief vocal loop of 'Lihmd'."
    ],
    quiz: [
      {
        questionText: "What does 'ትናንት' mean?",
        options: ["Today", "Tomorrow", "Yesterday", "Holiday"],
        correctAnswerIndex: 2,
        explanation: "'ትናንት' (Tinent) represents yesterday."
      },
      {
        questionText: "How do you say 'Big'?",
        options: ["ጥሩ", "ትንሽ", "ትልቅ", "መጥፎ"],
        correctAnswerIndex: 2,
        explanation: "'ትልቅ' (Tilik) means big or grand."
      },
      {
        questionText: "What is the meaning of 'ደስ የሚል ልምድ'?",
        options: ["Bad study habits", "Joyful experience", "School notebook", "Cooking stew"],
        correctAnswerIndex: 1,
        explanation: "'ደስ የሚል ልምድ' translates to joyful or pleasant experience."
      },
      {
        questionText: "Which word amplifies adjectives to mean 'Very'?",
        options: ["ቀጥታ", "ማን", "በጣም", "አምጣ"],
        correctAnswerIndex: 2,
        explanation: "'በጣም' (Betam) translates to 'very' or 'extremely'."
      }
    ],
    nextLessonTitle: "Level Review & Celebration"
  },

  // --- LESSON 24: Level Review & Celebration ---
  {
    level: 2,
    lessonNumber: 24,
    geezNumber: "፳፬",
    topic: "Level Review & Celebration",
    theme: "Graduation Celebration! (በዓል)",
    phase: "Level 2 Stage 3: Travel & Narrative",
    subheading: "Celebrate your amazing Amharic journey! Get your gold certificate, count your stars, and cheer!",
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Review prime daily routine, questions, and meals. GD",
      "Express ultimate pride for Amharic learning accomplishments.",
      "Receive the dynamic classroom gold certificate of achievement.",
      "Participate in the graduation spelling celebration game!"
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ተመረቅኩ",
        english: "Temereqku",
        meaning: "I graduated / Completed",
        context: "Say 'ተመረቅኩ!' proudly matching claps when you finish the final Level 2 curriculum module!",
        tutorTip: "A magnificent high pride word. 'Teh-meh-rehk-ku'.",
        imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=505&auto=format&fit=crop",
        audioText: "Temereqku. I graduated."
      },
      {
        fidel: "የምስክር ወረቀት",
        english: "Yemisikir Wereket",
        meaning: "Gold Certificate",
        context: "Your official certified document showing you are an outstanding Amharic child hero!",
        tutorTip: "Hold a certificate on screen, 'Yeh-mih-see-kihr Weh-reh-keht'.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=505&auto=format&fit=crop",
        audioText: "Yemisikir wereket. Certificate."
      },
      {
        fidel: "ኮከብ",
        english: "Kokeb",
        meaning: "Star",
        context: "Outstanding effort earns you shiny golden 'ኮከብ' marks to decorate your classroom profile.",
        tutorTip: "Point to the star meters. 'Koh-kehb'.",
        imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=505&auto=format&fit=crop",
        audioText: "Kokeb. Star."
      },
      {
        fidel: "ጀግና",
        english: "Jegna",
        meaning: "Hero / Brave",
        context: "Ethiopian history praises kind, intelligent, and strong kids as a 'ጀግና'.",
        tutorTip: "Encouragement keyword. 'Jehg-nah'.",
        imageUrl: "https://images.unsplash.com/photo-1547124224-8f47c8f615e4?w=505&auto=format&fit=crop",
        audioText: "Jegna. Hero."
      },
      {
        fidel: "ደስ ይላል",
        english: "Des Yilal",
        meaning: "It is pleasing / Happy times",
        context: "Used whenever learning Amharic or celebrating goals with family: 'በጣም ደስ ይላል'!",
        tutorTip: "Rhythmic clapping phrase.",
        imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=505&auto=format&fit=crop",
        audioText: "Des yilal. It is pleasing."
      }
    ],
    exercises: [
      {
        amharic: "እኔ ዛሬ ተመረቅኩ!",
        transliteration: "Ene zare temereqku!",
        english: "I graduated today!",
        tip: "Toss an imaginary velvet graduation cap skyward!"
      },
      {
        amharic: "እኔ ጎበዝ ጀግና ነኝ።",
        transliteration: "Ene gobez jegna negn.",
        english: "I am a smart hero.",
        tip: "Stand strong placing fists on hips proudly!"
      }
    ],
    dialogue: {
      heading: "💬 Graduation Ceremony Talk",
      scenario: "Brook receives his gold medal certificate from his proud Tutor, Ato Solomon.",
      roles: [
        {
          character: "Ato Solomon (Tutor)",
          avatar: "👨",
          bubbleSide: "left",
          amharic: "እንኳን ደስ አለህ ጀግናዬ ፣ ዛሬ ተመረቅክ!",
          transliteration: "Enkuan des aleh jegnaye, zare temereqk!",
          english: "Congratulations my hero, you graduated today!"
        },
        {
          character: "Brook (Graduate)",
          avatar: "👦",
          bubbleSide: "right",
          amharic: "አስተማሪዬ አመሰግናለሁ ፤ በጣም ደስ ይላል!",
          transliteration: "Astemariye ameseginalehu, betam des yilal!",
          english: "Thank you my teacher, this is extremely pleasing!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Story of our Hero",
      passageAmharic: "ሔኖክ ሁሉንም የደረጃ ሁለት ምዕራፎች አጠናቀቀ። ዛሬ ትልቅ በዓል ነው። እሱ በክፍሉ ውስጥ ታላቅ የምስክር ወረቀት ወሰደ። አጎቱ፣ አክስቱ፣ አያቱ ሁሉም ተሰብስበው 'እንኳን ደስ አለህ ጀግናው!' አሉት። ሔኖክ በጣም ደስ አለው።",
      passageTransliteration: "Henok hulunim ye dereja hulet me'arafoch atenaqeke. Zare tilik Be'al new. Esu be kiflu wust talak Yemisikir Wereket wesede. Agotu, akistu, ayatuni hulachinim tesebsbew 'Enkuan des aleh jegnaw!' alut. Henok betam des alew.",
      passageEnglish: "Henok completed all Level 2 chapters. Today is a great celebration. Inside his classroom, he received an outstanding gold certificate. His uncle, aunt, and grandparents gathered together and said, 'Congratulations our hero!'. Henok felt extremely happy.",
      tutorTip: "Celebrate progress and offer congratulations ('Enkuan des aleh') to students warmly."
    },
    writing: {
      heading: "✍️ Graduation Characters",
      instructions: "Practice tracing the hero letters ጀ (Je) and ኮ (Ko).",
      lettersToPractice: [
        {
          letter: "ጀ",
          phonetic: "Je",
          steps: ["Horizontal wave top", "Veritcal split hanging", "Root leg loop bottom"]
        },
        {
          letter: "ኮ",
          phonetic: "Ko",
          steps: ["Two side helper brackets", "Horizontal separator line", "Upper circular ring"]
        }
      ],
      wordChallenge: "ጀግና"
    },
    homework: [
      "Recite your favorite five Amharic words from Level 2 chapters to parents.",
      "Hang your homework paper labeled 'ጀግና' on the bedroom mirrors.",
      "Register details for the next higher level program."
    ],
    submissionTip: "Upload a photo holding your gold certificate on school dashboard! 🎓",
    parentActivities: [
      "Present a real star sticker or chocolate treat saying 'Enkuan des aleh' to reward your brave graduate."
    ],
    tutorPacing: [
      "10 mins: Warm rewards ceremony.",
      "25 mins: General level vocabulary review game show.",
      "15 mins: Interactive graduation star popping."
    ],
    tutorTroubleshooting: [
      "Make sure to display extreme celebratory gestures with claps and whistles."
    ],
    quiz: [
      {
        questionText: "What does 'ተመረቅኩ' mean?",
        options: ["I woke up", "I graduated / Completed", "I ran", "I chopped"],
        correctAnswerIndex: 1,
        explanation: "'ተመረቅኩ' (Temereqku) is the pasture statement 'I graduated'."
      },
      {
        questionText: "How do you say 'Gold Certificate'?",
        options: ["ደብተር", "ርሳስ", "የምስክር ወረቀት", "እቅድ"],
        correctAnswerIndex: 2,
        explanation: "'የምስክር ወረቀት' (Yemisikir Wereket) means certificate of honor."
      },
      {
        questionText: "What is 'ጀግና' in English?",
        options: ["Silly", "Bad", "Hero / Brave", "Pencil"],
        correctAnswerIndex: 2,
        explanation: "'ጀግና' (Jegna) represents a hero or brave person."
      },
      {
        questionText: "Which word represents 'Star'?",
        options: ["ወር", "ብር", "ኮከብ", "ጊዜ"],
        correctAnswerIndex: 2,
        explanation: "'ኮከብ' (Kokeb) means star."
      }
    ],
    nextLessonTitle: "Level 3: Advanced Conversation"
  }
];
