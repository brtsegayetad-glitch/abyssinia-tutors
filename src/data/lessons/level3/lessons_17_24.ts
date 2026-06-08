import { LessonDefinition } from "../../level1/types";

export interface Level3LessonDefinition extends LessonDefinition {
  level: number;
}

export const lessons_17_24: Level3LessonDefinition[] = [
  // --- LESSON 17: Shopping Conversations ---
  {
    level: 3,
    lessonNumber: 17,
    geezNumber: "፲፯",
    topic: "Shopping Conversations",
    theme: "Market & Prices (ገበያ)",
    phase: "Level 3 Stage 3: Fluent Communication",
    subheading: "Learn how to ask 'How much?', discuss vegetable prices inside 'Gebeya', and handle simple cash transactions!",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Inquire prices: 'ዋጋው ስንት ነው?'.",
      "Express currency terms: 'ብር' (Birr).",
      "Negotiate politely: 'እባክህ ቀንሰው' (Please reduce it).",
      "Perform interactive merchant roleplays."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ገበያ",
        english: "Gebeya",
        meaning: "Market / Shopping square",
        context: "The bustling market filled with baskets of red onions, sweet bananas, and hand-loomed goods: 'ገበያ'.",
        tutorTip: "Very easy word. 'Geh-beh-yah'. Connect with grocery trips.",
        imageUrl: "https://images.unsplash.com/photo-1543083505-57d4ebd0a4c5?w=505&auto=format&fit=crop",
        audioText: "Gebeya. Market."
      },
      {
        fidel: "ዋጋው ስንት ነው",
        english: "Wagaw Sint New",
        meaning: "How much is the price?",
        context: "The essential question spoken to merchants when seeking beautiful toys or local candy bars.",
        tutorTip: "A fundamental inquiry phrase: 'Wah-gah-u Sihnt Nehu?'.",
        imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=505&auto=format&fit=crop",
        audioText: "Wagaw sint new. How much is the price?"
      },
      {
        fidel: "ብር",
        english: "Birr",
        meaning: "Ethiopian Birr / Money",
        context: "The official paper currency used in Ethiopia to purchase fresh items inside local retail stores.",
        tutorTip: "One quick syllable: 'Bihrr'. Focus on soft rolling r.",
        imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=505&auto=format&fit=crop",
        audioText: "Birr. Money."
      },
      {
        fidel: "ውድ",
        english: "Wid",
        meaning: "Expensive / Costly",
        context: "Describes a pricing level that is too high, like a gold watch or luxury vehicle.",
        tutorTip: "Short vowel: 'Weehd'. Contrast with cheap.",
        imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=505&auto=format&fit=crop",
        audioText: "Wid. Expensive."
      },
      {
        fidel: "ርካሽ",
        english: "Rikash",
        meaning: "Cheap / Value priced",
        context: "An item representing a great price bargain, like a simple wooden pencil or notebook page.",
        tutorTip: "Clear pronunciation: 'Rih-kahsh'.",
        imageUrl: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=505&auto=format&fit=crop",
        audioText: "Rikash. Cheap."
      }
    ],
    exercises: [
      {
        amharic: "እባክህ ይህ ደብተር ዋጋው ስንት ነው?",
        transliteration: "Ebakih yih debter wagaw sint new?",
        english: "Please, how much is this notebook?",
        tip: "Mime pointing to a pricing tag!"
      },
      {
        amharic: "ይሀ እቃ በጣም ውድ ነው።",
        transliteration: "Yih eka betam wid new.",
        english: "This item is very expensive.",
        tip: "Wave hand expressing surprise at a price!"
      }
    ],
    dialogue: {
      heading: "💬 Market Bargains",
      scenario: "Yonas purchases bananas from Lydia the local fruit vendor.",
      roles: [
        {
          character: "Yonas",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሃሎ ፤ የሙዙ ዋጋው ስንት ነው?",
          transliteration: "Halo, ye muzu wagaw sint new?",
          english: "Hello, how much is the price of the banana?"
        },
        {
          character: "Lydia",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "ሙዙ አስር ብር ነው። በጣም ርካሽ ነው!",
          transliteration: "Muzu asir Birr new. Betam rikash new!",
          english: "The banana is ten Birr. It is very cheap!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Weekend Market Journey",
      passageAmharic: "በትናንትናው እቅድ ሳሮን ከእናቷ ጋር ወደ ገበያ ሄደች። ገበያው ፈንጠዝያና ህዝብ የበዛበት ነበር። ሳሮን የሚያምር ቀይ አፕል አየች። እሷም 'ይህ አፕል ዋጋው ስንት ነው?' ብላ ጠየቀች። ነጋዴው 'ሃምሳ ብር ነው' አላት። ሳሮን 'በጣም ውድ ነው ፤ ቀንሰው' አለችው። እሱም በፈገግታ ቀንሶ ሰላሳ ብር አደረገላት። ሳሮን ደስ ብሏት አፕሉን ገዛች።",
      passageTransliteration: "Be tinantnaw ekid Saron ke enatua gar wede gebeya hedech. Gebeyaw fentezyana hizb ye-bezabet nebere. Saron yimeyamir key apple ayech. Esua 'yih apple wagaw sint new?' bila yeteyikech. Negadew 'Hamsa Birr new' alat. Saron 'betam wid new; qenisew' alechiew. Esu-m be fegegta qeniso selasa Birr adergelat. Saron des biluat applun gezach.",
      passageEnglish: "In yesterday's schedule, Saron went to the market with her mother. The market was festive and packed with people. Saron saw a beautiful red apple. She asked: 'How much is this apple's price?'. The merchant told her 'It is fifty Birr'. Saron said 'It is very expensive; please reduce it'. Moving into a smile, he reduced it to thirty Birr. Saron was happy and bought the apple.",
      tutorTip: "Utilize play paper Birre bills to teach hand-exchanges and counting digits."
    },
    writing: {
      heading: "✍️ Retail Characters",
      instructions: "Practice tracing the shopping letters ገ (Ge) and ብ (Bi).",
      lettersToPractice: [
        {
          letter: "ገ",
          phonetic: "Ge",
          steps: ["Vertical start left", "Central loop joint", "Rightward downward foot"]
        },
        {
          letter: "ብ",
          phonetic: "Bi",
          steps: ["Forked start", "Mid horizontal beam", "Base loop anchor"]
        }
      ],
      wordChallenge: "ገበያ"
    },
    homework: [
      "Ask parents the price of a fruit tonight using 'Wagaw sint new?' in Amharic.",
      "Write 'ዋጋው ስንት ነው' in your study ledger.",
      "Trace the characters ገ, ጉ, ጊ, ጋ, ጌ, ግ, ጎ three times."
    ],
    submissionTip: "Upload a drawing of an item tag labeled in Birr! 🏷️",
    parentActivities: [
      "Practice mock retail situations or counting small changes in Birr with kids."
    ],
    tutorPacing: [
      "10 mins: Merchant roleplay setups.",
      "22 mins: Pricing query translations.",
      "18 mins: Interactive Syllable Scramble builders."
    ],
    tutorTroubleshooting: [
      "Help children distinguish currency 'Birr' from other unrelated Amharic words."
    ],
    quiz: [
      {
        questionText: "What does 'ገበያ' mean?",
        options: ["Library", "Market / Shopping square", "Playground soccer", "Bed mattress"],
        correctAnswerIndex: 1,
        explanation: "'ገበያ' (Gebeya) translates directly to market."
      },
      {
        questionText: "How do say: 'How much is the price?'",
        options: ["ዋጋው ስንት ነው?", "ውሃ አለ?", "ምን በላህ?", "እስማማለሁ"],
        correctAnswerIndex: 0,
        explanation: "'ዋጋው ስንት ነው' is the standard way to inquire price."
      },
      {
        questionText: "What represents 'Ethiopian currency'?",
        options: ["ዶላር", "ብር", " ቀሚስ", "ዛፍ"],
        correctAnswerIndex: 1,
        explanation: "'ብር' (Birr) is the official Ethiopian currency name."
      },
      {
        questionText: "What is the meaning of 'ውድ'?",
        options: ["Expensive / Costly", "Cheap", "Equal in size", "Free of cost"],
        correctAnswerIndex: 0,
        explanation: "'ውድ' (Wid) translates to expensive."
      }
    ],
    nextLessonTitle: "Restaurant & Food Orders"
  },

  // --- LESSON 18: Restaurant & Food Orders ---
  {
    level: 3,
    lessonNumber: 18,
    geezNumber: "፲፰",
    topic: "Restaurant & Food Orders",
    theme: "Dining & Orders (ምግብ ቤት)",
    phase: "Level 3 Stage 3: Fluent Communication",
    subheading: "Learn to order traditional foods, call 'አስተናጋጅ' (waiter), ask for 'ሂሳብ' (the bill), and enjoy food hospitality!",
    imageUrl: "https://images.unsplash.com/photo-1545231027-63b3f162d20e?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Order food cleanly: '... እፈልጋለሁ'.",
      "Address servers politely using 'አስተናጋጅ'.",
      "Request payment: 'ሂሳብ እባክዎ'.",
      "Simulate restaurant dining scenes."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ምግብ ቤት",
        english: "Migib Bet",
        meaning: "Restaurant / Dining cafe",
        context: "The joyful family eatery where you smell roasting coffee beans and sizzling meat stews: 'ምግብ ቤት'.",
        tutorTip: "Literally 'Food house'. 'Mih-gihb Beht'.",
        imageUrl: "https://images.unsplash.com/photo-1545231027-63b3f162d20e?w=505&auto=format&fit=crop",
        audioText: "Migib bet. Restaurant."
      },
      {
        fidel: "አስተናጋጅ",
        english: "Astenagaj",
        meaning: "Waiter / Server / Host",
        context: "The helpful professional who brings warm plates and lists delicious beverages with a smile.",
        tutorTip: "Long noun. Break to: 'Ahs-teh-nah-gahj'. Speak with high respect.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Astenagaj. Waiter."
      },
      {
        fidel: "ምግብ",
        english: "Migib",
        meaning: "Food / Dish / Meal",
        context: "Any nourishing healthy treat we chew and swallow, from local honey bread to potato stews.",
        tutorTip: "Short, crisp syllables: 'Mih-gihb'.",
        imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=505&auto=format&fit=crop",
        audioText: "Migib. Food."
      },
      {
        fidel: "ውሃ",
        english: "Wha",
        meaning: "Water",
        context: "The pristine, refreshing cold drink we request first at dining tables to hydrate.",
        tutorTip: "Very easy word. 'W-ha'. Pronounce with breathy emphasis.",
        imageUrl: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=505&auto=format&fit=crop",
        audioText: "Wha. Water."
      },
      {
        fidel: "ሂሳብ",
        english: "Hisab",
        meaning: "Bill / Check / Account math",
        context: "The paper slip showing cash calculations when completing tasty family holiday meals.",
        tutorTip: "Short, crisp: 'Hee-sahb'. Stress on s.",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=505&auto=format&fit=crop",
        audioText: "Hisab. Bill."
      }
    ],
    exercises: [
      {
        amharic: "አስተናጋጅ ፤ እባክህ ምግብ ቤት ውስጥ ውሃ ስጠኝ።",
        transliteration: "Astenagaj, ebakih migib bet wust wha sitegn.",
        english: "Waiter, please give me water in the restaurant.",
        tip: "Mime pouring refreshing water from a jug!"
      },
      {
        amharic: "ሒሳብ እባክዎ ፤ አመሰግናለሁ።",
        transliteration: "Hisab ebakwo, ameseginalehu.",
        english: "The bill please (respectful), thank you.",
        tip: "Mime writing on your palm requesting checks!"
      }
    ],
    dialogue: {
      heading: "💬 Elegant Dining",
      scenario: "Elias orders beef stew from Sarah the helper server.",
      roles: [
        {
          character: "Elias",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "አስተናጋጅ ፤ እባክሽ ምግብ እፈልጋለሁ።",
          transliteration: "Astenagaj, ebakish migib efeligalehu.",
          english: "Waiter, please I want food."
        },
        {
          character: "Sarah",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እሺ ፤ ምን ምግብ ይፈልጋሉ? እንጀራ አለን።",
          transliteration: "Eshi, min migib yifeligalu? Injera alen.",
          english: "Okay, what food would you like? We have sourdough flatbread."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Family Table",
      passageAmharic: "ትናንትና ሔኖክ ከቤተሰቡ ጋር ወደ ትልቅ ምግብ ቤት ሄደ። በዚያም አስተናጋጅ በደስታ ተቀበላቸው። ሔኖክ በጥልቅ ተርቦ 'እባክሽ ጣፋጭ ዶሮ ወጥና እንጀራ እፈልጋለሁ' አላት። ታናሽ እህቱም ቀዝቃዛ ውሃ ጠየቀች። ምግቡ ካለቀ በኋላ አባቱ በክብር 'ሂሳብ እባክዎ' አለ። ይዞላት የመጣችውን ሂሳብ በብር ከፍለው 'ደህና ሁኚ' ብለው ተሰናበቱ።",
      passageTransliteration: "Tinentina Henok ke betesebu gar wede tilik migib bet hedew. Beziyam astenagaj be desta teqebelachew. Henok betilik terbo 'ebakish tafach doro wet ena injera efeligalehu' alat. Tanash ehetum qezqaza wha teyeqech. Migibu kaleqe behuala abatu be kibir 'hisab ebakwo' ale. Yizolat yemetachuiwn hisab be Birr keflew 'dehna hugni' bilew tesenabetu.",
      passageEnglish: "Yesterday Henok went to a huge restaurant with his family. There, the waiter received them in joy. Henok, being very hungry, told her: 'Please, I want delicious chicken stew and sourdough flatbread'. His younger sister asked for cold water. After the meal finished, his father respectfully said: 'The bill please'. Paying the bill she brought in Birr, they said goodbye and parted.",
      tutorTip: "Highlight 'Doro wet' as a national pride culinary masterpiece."
    },
    writing: {
      heading: "✍️ Dining Characters",
      instructions: "Practice tracing the culinary letters ም (Mi) and ሂ (Hi).",
      lettersToPractice: [
        {
          letter: "ም",
          phonetic: "Mi",
          steps: ["Closed bottom loop", "Lower stem connector", "Base horizontal base"]
        },
        {
          letter: "ሂ",
          phonetic: "Hi",
          steps: ["Forked start segment", "Internal horizontal beam", "Base loop indicator"]
        }
      ],
      wordChallenge: "ሂሳብ"
    },
    homework: [
      "Pretend to order your dinner tonight in Amharic using 'Efeligalehu'.",
      "Write 'ሂሳብ እባክዎ' (The bill please) on a small tag paper.",
      "Trace the characters ም, ሙ, ሚ, ማ, ሜ, ም, ሞ three times."
    ],
    submissionTip: "Upload a photo of your dinner plate labeled 'Migib'! 🍽️",
    parentActivities: [
      "Let kids play servers at dinnertime, introducing dishes and requesting 'Hisab'."
    ],
    tutorPacing: [
      "10 mins: Menu cards preview.",
      "22 mins: Active eating dialogue translations.",
      "18 mins: Interactive spelling assembly grids."
    ],
    tutorTroubleshooting: [
      "Help children distinguish 'Migib' (food) from 'Betemetsahift' (library) visually."
    ],
    quiz: [
      {
        questionText: "What does 'ምግብ ቤት' translate to?",
        options: ["Pencil sharpener", "Restaurant / Dining cafe", "Police station", "Track field"],
        correctAnswerIndex: 1,
        explanation: "'ምግብ ቤት' translates directly to food house or restaurant."
      },
      {
        questionText: "How do you request: 'The bill, please'?",
        options: ["ሂሳብ እባክዎ", "ውሃ በላሁ", "ቀልድ ሰማሁ", "እግር ኳስ"],
        correctAnswerIndex: 0,
        explanation: "'ሂሳብ እባክዎ' (Hisab ebakwo) means bill/check please."
      },
      {
        questionText: "What represents the server?",
        options: ["ታላቅ", "አስተናጋጅ", "እንግዳ", "በዓል"],
        correctAnswerIndex: 1,
        explanation: "'አስተናጋጅ' (Astenagaj) is the waiter/host."
      },
      {
        questionText: "What is the meaning of 'ውሃ'?",
        options: ["Water", "Meat stew", "Flatbread", "Cold ice"],
        correctAnswerIndex: 0,
        explanation: "'ውሃ' (Wha) means water."
      }
    ],
    nextLessonTitle: "Travel Situations"
  },

  // --- LESSON 19: Travel Situations ---
  {
    level: 3,
    lessonNumber: 19,
    geezNumber: "፲፱",
    topic: "Travel Situations",
    theme: "Adventures & Routes (ጉዞ)",
    phase: "Level 3 Stage 3: Fluent Communication",
    subheading: "Learn vocabulary for long journeys, packing suitcases, catching buses (ባቡር), and traveling across cities!",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Detail travel vocabulary: 'ጉዞ' (journey) and 'መንገድ' (road).",
      "Explain transit choices: 'ባቡር' and 'አውሮፕላን'.",
      "Formulate travel continuous sentences.",
      "Engage interactive route maps."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ጉዞ",
        english: "Guzo",
        meaning: "Travel / Journey / Transit",
        context: "Packing your colorful suitcases and boarding planes to fly to pristine African destinations: 'ጉዞ'.",
        tutorTip: "Rounded, soft sound: 'Goo-zoh'.",
        imageUrl: "https://images.unsplash.com/photo-1488415038261-96c5750ee107?w=505&auto=format&fit=crop",
        audioText: "Guzo. Travel."
      },
      {
        fidel: "ባቡር",
        english: "Babur",
        meaning: "Train / Rail",
        context: "The high-speed rail that glides along Addis Ababa steel tracks carrying passengers to classes.",
        tutorTip: "Stretched vowels: 'Bah-boohr'.",
        imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=505&auto=format&fit=crop",
        audioText: "Babur. Train."
      },
      {
        fidel: "መንገድ",
        english: "Menged",
        meaning: "Road / Route / Path",
        context: "The wide asphalt road where cars drive and yellow lights direct traffic safety: 'መንገድ'.",
        tutorTip: "Two crisp syllables: 'Mehn-gehd'. Point to a road strip.",
        imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=505&auto=format&fit=crop",
        audioText: "Menged. Road."
      },
      {
        fidel: "አውሮፕላን",
        english: "Awroplan",
        meaning: "Airplane / Flight",
        context: "The massive jet that slices through blue clouds to carry diaspora kids to grandparents' gardens.",
        tutorTip: "Greek loan base. 'Auh-roh-plahn'. Highlight flying wings.",
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=505&auto=format&fit=crop",
        audioText: "Awroplan. Airplane."
      },
      {
        fidel: "ሻንጣ",
        english: "Shanta",
        meaning: "Suitcase / Luggage case",
        context: "The sturdy travel bag containing socks, books, and gifts packed before vacations.",
        tutorTip: "Short, flat: 'Shahn-tah'.",
        imageUrl: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=505&auto=format&fit=crop",
        audioText: "Shanta. Suitcase."
    }
    ],
    exercises: [
      {
        amharic: "እኔ በአውሮፕላን ጉዞ እወዳለሁ።",
        transliteration: "Ene be awroplan guzo ewedalehu.",
        english: "I love traveling by airplane.",
        tip: "Stretch arms wide like airplane wings!"
      },
      {
        amharic: "እባክህ ይህንን ሻንጣ ውሰድ።",
        transliteration: "Ebakih yihin shanta wused.",
        english: "Please, take this suitcase.",
        tip: "Mime lifting a heavy luggage bag!"
      }
    ],
    dialogue: {
      heading: "💬 Flying High",
      scenario: "Yared tells Helen of his summer flight to Addis Ababa flight.",
      roles: [
        {
          character: "Yared",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሄለን ፣ በበጋ ወቅት ጉዞ አለሽ?",
          transliteration: "Helen, be bega wokit guzo alesh?",
          english: "Helen, do you have travel plans in the summer season?"
        },
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አዎ ፤ በአውሮፕላን ወደ ኢትዮጵያ እሄዳለሁ ፤ ሻንጣዬን አዘጋጀሁ!",
          transliteration: "Awo, be awroplan wede Ethiopia ehedelehu, shantayen azegajehu!",
          english: "Yes, I am going to Ethiopia by airplane, I have prepared my suitcase!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Journey across the Mountains",
      passageAmharic: "ባለፈው ሳምንት ሔኖክና እህቱ ትልቅ ጉዞ አደረጉ። መጀመርያ ሻንጣቸውን አዘጋጁ። ከዚያም ወደ ጣቢያው ሄደው በሚያምር ባቡር ተሳፈሩ። ባቡሩ በትልቅ መንገድና በተራሮች መካከል በፍጥነት ይሄድ ነበር። ሔኖክ መስኮት አጠገብ ቁጭ ብሎ 'ባቡር ጉዞ በጣም ደስ ይላል' አለ። ጉዟቸው ሲያልቅ በሰላም ደርሰው አያታቸውን አቀፏት።",
      passageTransliteration: "Balefew samint Henok ena ehetu tilik guzo aderegu. Mejemerya shantachewn azegaju. Keziyam wede tabiyaw hedew bemiyamir babur tesaferu. Baburu be tilik menged ena be teraroch mehal be fihinet yihed nebere. Henok meskot ategeb kuch bilo 'babur guzo betam des yilewal' ale. Guzoyachew siyalk be selam dersew ayatachewn akefuat.",
      passageEnglish: "Last week Henok and his sister made a huge journey. First they prepared their suitcases. Then, going to the station, they boarded a beautiful train. The train traveled fast on a grand track and between mountains. Henok, sitting near the window, said: 'Traveling by train is very delightful'. When their travel finished, arriving in peace, they hugged their grandmother.",
      tutorTip: "Inquire if kids have ever boarded steel trains to build personal connections."
    },
    writing: {
      heading: "✍️ Transit Characters",
      instructions: "Practice tracing the adventure letters ጉ (Gu) and ዞ (Zo).",
      lettersToPractice: [
        {
          letter: "ጉ",
          phonetic: "Gu",
          steps: ["Vertical line segment", "Central loop joint", "Right segment with lower loop"]
        },
        {
          letter: "ዞ",
          phonetic: "Zo",
          steps: ["High crown line with rightward loop segment", "Vertical segment segment", "Base bottom hook"]
        }
      ],
      wordChallenge: "ጉዞ"
    },
    homework: [
      "Draw an airplane and write 'Awroplan' in bold characters on top.",
      "Write 'መንገድ ምርጥ ነው' in your diary sheet.",
      "Trace the characters ጉ, ጓ, ጊ, ጋ, ጌ, ግ, ጎ three times."
    ],
    submissionTip: "Upload a photo pointing to your packed backpack labeled 'Shanta'! 🎒",
    parentActivities: [
      "Encourage children to name packing items (clothes, toys) in Amharic during real travel preparations."
    ],
    tutorPacing: [
      "10 mins: Transit visual guessing.",
      "22 mins: Journey dialogue rollouts.",
      "18 mins: Interactive spelling assembly grids."
    ],
    tutorTroubleshooting: [
      "Ensure children separate the syllables of 'Awroplan' cleanly: Aw-ro-plan."
    ],
    quiz: [
      {
        questionText: "What does 'ጉዞ' translate to?",
        options: ["Pencil case", "Travel / Journey", "Eating dinner", "Sleeping bed"],
        correctAnswerIndex: 1,
        explanation: "'ጉዞ' (Guzo) means travel, journey or transit."
      },
      {
        questionText: "How do say 'Train' in Amharic?",
        options: ["ባቡር", "አውሮፕላን", "ውሃ", "ገበያ"],
        correctAnswerIndex: 0,
        explanation: "'ባቡር' (Babur) means train or rail."
      },
      {
        questionText: "What represents the road?",
        options: ["ደብተር", "መንገድ", "ምን", "ቀኝ"],
        correctAnswerIndex: 1,
        explanation: "'መንገድ' (Menged) represents a road or route."
      },
      {
        questionText: "What is 'ሻንጣ'?",
        options: ["Suitcase / Luggage size", "Soccer grass", "Red car", "Strict teacher"],
        correctAnswerIndex: 0,
        explanation: "'ሻንጣ' (Shanta) is a suitcase."
      }
    ],
    nextLessonTitle: "Asking for Directions"
  },

  // --- LESSON 20: Asking for Directions ---
  {
    level: 3,
    lessonNumber: 20,
    geezNumber: "፳",
    topic: "Asking for Directions",
    theme: "Navigation & Roads (መንገድ መጠየቅ)",
    phase: "Level 3 Stage 3: Fluent Communication",
    subheading: "Learn how to ask 'Where is the road?', master direction markers like 'ቀኝ' (right) and 'ግራ' (left)!",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Query paths politely: '... መንገድ የት ነው?'.",
      "Identify direction markers: 'ቀኝ' (right) and 'ግራ' (left).",
      "Explain navigation commands: 'ሂድ' (Go).",
      "Navigate virtual classroom maps."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "የት ነው",
        english: "Yet New",
        meaning: "Where is it?",
        context: "The paramount questioning loop used to trace missing notebooks or sweet candy bars: 'ደብተሬ የት ነው?'.",
        tutorTip: "Very easy compound. 'Yeht Nehu?'.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Yet new. Where is it?"
      },
      {
        fidel: "ቀኝ",
        english: "Keñ",
        meaning: "Right direction",
        context: "Waving your strong right hand used to balance blocks or trace lines: 'ቀኝ መንገድ'.",
        tutorTip: "End with soft nasal 'ñ': 'Kehgny'. Align with real arm raises.",
        imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=505&auto=format&fit=crop",
        audioText: "Keñ. Right."
      },
      {
        fidel: "ግራ",
        english: "Gra",
        meaning: "Left direction",
        context: "The opposite direction marker representing left-hand maneuvers on map grids: 'ወደ ግራ እጠፍ'.",
        tutorTip: "Short, sharp: 'Grah'. Raise left hand.",
        imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=505&auto=format&fit=crop",
        audioText: "Gra. Left."
      },
      {
        fidel: "ቀጥታ",
        english: "Kettita",
        meaning: "Straight / Direct ahead",
        context: "Walking directly down lanes without turnings is described as heading 'ቀጥታ'.",
        tutorTip: "Double stress on t. 'Keht-tih-tah'. Point forward.",
        imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=505&auto=format&fit=crop",
        audioText: "Kettita. Straight."
      },
      {
        fidel: "ሂድ",
        english: "Hid",
        meaning: "Go! (to a boy)",
        context: "Open the front gate and instruct your brother to skip along trails: 'ቀጥታ ሂድ!'.",
        tutorTip: "Masculine command: 'Heed'. Contrast with feminine.",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=505&auto=format&fit=crop",
        audioText: "Hid. Go."
      }
    ],
    exercises: [
      {
        amharic: "እባክህ ፤ የገበያ መንገድ የት ነው?",
        transliteration: "Ebakih, ye gebeya menged yet new?",
        english: "Please, where is the market road?",
        tip: "Form binoculars seeking roads!"
      },
      {
        amharic: "ወደ ቀኝ ሂድ ፤ ከዚያም ወደ ግራ።",
        transliteration: "Wede keñ hid, keziyam wede gra.",
        english: "Go to the right, then to the left.",
        tip: "Alternate pointing right and left arms!"
      }
    ],
    dialogue: {
      heading: "💬 Wandering Trails",
      scenario: "Dawit seeks school entrance directions from Officer Brook.",
      roles: [
        {
          character: "Dawit",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሃሎ ፤ እባክዎ የትምህርት ቤት መንገድ የት ነው?",
          transliteration: "Halo, ebakwo ye timihirt bet menged yet new?",
          english: "Hello, please, where is the school road?"
        },
        {
          character: "Brook",
          avatar: "👮",
          bubbleSide: "right",
          amharic: "ቀጥታ ሂድ ፤ ከዚያም ወደ ቀኝ ታገኛለህ።",
          transliteration: "Kettita hid, keziyam wede keñ tagañaleh.",
          english: "Go straight; then to the right you will find it."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: Lost in the Daisy Fields",
      passageAmharic: "ትናንትና ሳሮን አደይ አበባ መሰብሰብ ፈልጋ ወደ ሰፊው ሜዳ ሄደች። ነገር ግን መንገዱ ጠፋባት። ሳሮን በጭንቀት አልጮኸችም። በዚያ የሚያልፍ ጎበዝ እረኛ አየች። እሷም 'እባክህ የቤታችን መንገድ የት ነው?' ብላ ጠየቀችው። እረኛው 'አትፍሪ ፤ ቀጥታ ሂጂ ፤ ከዚያም ወደ ግራ እጠፊ' አላት። ሳሮን እሺ በላ አመስግና ወደ ቀኝና ግራ እየተራመደች በሰላም ቤት ደረሰች።",
      passageTransliteration: "Tinentina Saron adey abeba mesebseb feliga wede sefiw meda hedech. Neger gin mengedu tefabat. Saron be chinket alchohechm. Beziyam yemiyalif gobez ereñy ayech. Esua 'ebakih ye betachin menged yet new?' bila yeteyiqechew. Ereñaw 'atfiri; kettita hiji; keziyam wede gra etefi' alat. Saron eshi bela amesgina wede keñ ena gra eyeteramedech be selam bet deresech.",
      passageEnglish: "Yesterday Saron went to the open field wanting to collect yellow daisies. But she lost the path. Saron did not shout in distress. She saw a smart shepherd passing there. She asked him: 'Please, where is our house's road?'. The shepherd told her: 'Do not fear; go straight; then fold to the left'. Saying okay and thanking him, walking right and left, Saron arrived home in peace.",
      tutorTip: "Reinforce physical orientation and direction cues under game configurations."
    },
    writing: {
      heading: "✍️ Compass Characters",
      instructions: "Practice tracing the directional letters የ (Ye) and ኝ (Gni).",
      lettersToPractice: [
        {
          letter: "የ",
          phonetic: "Ye",
          steps: ["Vertical start left with curl", "Center horizontal connector", "Right downward stem"]
        },
        {
          letter: "ኝ",
          phonetic: "Gni",
          steps: ["Forked start segment", "Mid horizontal beam with double dip", "Base horizontal platform"]
        }
      ],
      wordChallenge: "ቀኝ"
    },
    homework: [
      "Instruct an imaginary robot to navigate your bedroom using 'Kettita', 'Keñ', and 'Gra'.",
      "Write 'ቀኝ እና ግራ' in bold crayons inside your diary page.",
      "Trace the characters የ, ዩ, ዪ, ያ, ዬ, ይ, ዮ three times."
    ],
    submissionTip: "Upload a photo pointing to your compass drawing labeling 'Keñ'! 🧭",
    parentActivities: [
      "Let kids lead parents during evening walks directing turns using 'Keñ' (right) and 'Gra' (left)."
    ],
    tutorPacing: [
      "10 mins: Navigation riddle.",
      "22 mins: Active map quest translations.",
      "18 mins: Interactive sound pop bubble games."
    ],
    tutorTroubleshooting: [
      "Check that children raise appropriate left vs right arms when practicing 'Gra' vs 'Keñ'."
    ],
    quiz: [
      {
        questionText: "What does 'የት ነው' mean?",
        options: ["Pencil case", "Where is it?", "Eating dinner", "I agree completely"],
        correctAnswerIndex: 1,
        explanation: "'የት ነው' (Yet new) translates directly to 'Where is it?'."
      },
      {
        questionText: "How do say 'Left' in Amharic?",
        options: ["ቀኝ", "ግራ", "ቀጥታ", "ሂድ"],
        correctAnswerIndex: 1,
        explanation: "'ግራ' (Gra) means left."
      },
      {
        questionText: "What represents heading straight?",
        options: ["ቀጥታ", "ውሃ", "ገበያ", "ባቡር"],
        correctAnswerIndex: 0,
        explanation: "'ቀጥታ' (Kettita) means straight ahead."
      },
      {
        questionText: "How do instruct a boy: 'Go'?",
        options: ["ቀሚስ", "ሂድ", "እንጀራ", "ስልክ"],
        correctAnswerIndex: 1,
        explanation: "'ሂድ' (Hid) is the masculine command for go."
      }
    ],
    nextLessonTitle: "Public Speaking Practice"
  },

  // --- LESSON 21: Public Speaking Practice ---
  {
    level: 3,
    lessonNumber: 21,
    geezNumber: "፳፩",
    topic: "Public Speaking Practice",
    theme: "Voice & Confidence (ንግግር)",
    phase: "Level 3 Stage 4: Presentation Skills",
    subheading: "Learn how to stand tall, address a kid audience with 'ሰላም ለእናንተ ይሁን', and deliver a short introductory speech!",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Deliver warm audience greetings: 'ሰላም ለእናንተ ይሁን'.",
      "Express 'ንግግር' (speech) with high vocal pitch.",
      "Declare personal stories confidently.",
      "Conduct simulated virtual stage podium speech sessions."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ንግግር",
        english: "Nigigir",
        meaning: "Speech / Public address",
        context: "Standing on a beautiful school stage stage to deliver greetings and present Amharic lines: 'ንግግር'.",
        tutorTip: "Double stress on g. 'Nih-gih-gihr'. Speaks of oratorical skills.",
        imageUrl: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=505&auto=format&fit=crop",
        audioText: "Nigigir. Speech."
      },
      {
        fidel: "ሰላም ለእናንተ ይሁን",
        english: "Selam Le'enante Yehun",
        meaning: "Peace be unto you all",
        context: "The ultimate respectful greeting spoken when opening presentations before classmate circles.",
        tutorTip: "A magnificent social binder: 'Seh-laam Leh-eh-nahn-teh Yee-hoon'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Selam le'enante yehun. Peace be unto you all."
      },
      {
        fidel: "ማዳመጥ",
        english: "Madamet",
        meaning: "To listen closely / Attentive ear",
        context: "What good audience members do, keeping silent and focusing on the stage orator's messages.",
        tutorTip: "Action infinitive: 'Mah-dah-meht'. Stress on m.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Madamet. To listen."
      },
      {
        fidel: "ድምፅ",
        english: "Dimts",
        meaning: "Voice / Sound density",
        context: "The powerful vocal projection you emit from chest to speak clear syllables: 'ድምፅህን አሳድግ!'.",
        tutorTip: "Explosive sound on d and ts: 'Dihm-ts'.",
        imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=505&auto=format&fit=crop",
        audioText: "Dimts. Voice."
      },
      {
        fidel: "ደፋር",
        english: "Defar",
        meaning: "Confident / Brave",
        context: "Describing a child student who stands tall without fear to present goals before crowds.",
        tutorTip: "Positive trait: 'Deh-faar'. Connect with boldness.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Defar. Confident."
      }
    ],
    exercises: [
      {
        amharic: "ሰላም ለእናንተ ይሁን ፤ እባክዎ አዳምጡኝ።",
        transliteration: "Selam le'enante yehun, ebakwo adamitugn.",
        english: "Peace be unto you all, please listen to me.",
        tip: "Place right hand over heart and sweep left arm outward!"
      },
      {
        amharic: "እኔ መድረክ ላይ በጣም ደፋር ነኝ።",
        transliteration: "Ene medreh lay betam defar negn.",
        english: "I am very brave on the stage.",
        tip: "Stand straight tall smiling with robust posture!"
      }
    ],
    dialogue: {
      heading: "💬 Podium Presentations",
      scenario: "Leah prepares her classmate Brook to address the graduation audience nicely.",
      roles: [
        {
          character: "Leah",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "ብሩክ ፣ ዛሬ ትልቅ ንግግር አለህ? ድምፅህን አሳድግ!",
          transliteration: "Brook, zare tilik nigigir aleh? Dimtsihin asadig!",
          english: "Brook, do you have a huge speech today? Raise your voice!"
        },
        {
          character: "Brook",
          avatar: "👦",
          bubbleSide: "right",
          amharic: "አዎ ፤ እኔ በመድረክ ላይ ደፋር ነኝ። 'ሰላም ለእናንተ ይሁን' እላለሁ!",
          transliteration: "Awo, ene bemedreh lay defar negn. 'Selam le'enante yehun' elalehu!",
          english: "Yes, I am brave on the stage. I will declare 'Peace be unto you all'!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Courageous Scholar",
      passageAmharic: "በትናንትናው እቅድ በትምህር ቤት ታላቅ የመድረክ በዓል ነበረ። መምህሯ ሔኖክን መድረክ ላይ ጠሩት። እሱ በመጀመርያ ፈገግ ብሎ 'ሰላም ለእናንተ ይሁን' እያለ ታላቅ ንግግር ጀመረ። ታሪኩ ስለ አንድነትና አብሮ መስራት እሴት ነበረ። ትንሿ እህቱና መላው ክፍል በፀጥታ አዳመጡት። ድምፁ ደማቅና ግልጽ ነበር። ሔኖክ ታላቅና ደፋር ተማሪ መሆኑን ስላሳየ መምህሯ በደስታ አመሰገኑት።",
      passageTransliteration: "Be tinantnaw ekid be timihirt bet talak ye medreh be'al nebere. Memhirua Henokin medreh lay terut. Esu be mejemerya fegeg bilo 'selam le'enante yehun' eyale talak nigigir jemere. Tariku sile andinet ena abro mesrat eset nebere. Tinish ehetua ena melaw kifil be tseta adametut. Dimtsu demak ena gilts nebere. Henok talak ena defar temari mehonun silasaye memhirua be desta amesgenut.",
      passageEnglish: "In yesterday's schedule, there was a major stage festival at school. The teacher called Henok up to the stage. First smiling, he started a grand speech declaring 'Peace be unto you all'. The story was about the value of unity and working together. His little sister and the entire class listened in silence. His voice was robust and clear. Because Henok showed he is a great and brave student, the teacher thanked him in joy.",
      tutorTip: "Inquire if kids stand tall during public presentations to trigger personal courage."
    },
    writing: {
      heading: "✍️ Vocals Characters",
      instructions: "Practice tracing the speaking letters ን (Ni) and ድ (Di).",
      lettersToPractice: [
        {
          letter: "ን",
          phonetic: "Ni",
          steps: ["Vertical start segment", "Central loop connector", "Base downward leg Segment"]
        },
        {
          letter: "ድ",
          phonetic: "Di",
          steps: ["Pillar segment helper", "Central drop beam", "Right foot stand Segment"]
        }
      ],
      wordChallenge: "ድምፅ"
    },
    homework: [
      "Deliver the speech 'Selam le'enante yehun' to three household elders today.",
      "Write 'እኔ ደፋር ነኝ' (I am brave) in pretty bold markers.",
      "Trace the characters ን, ኑ, ኒ, ና, ኔ, ን, ኖ three times."
    ],
    submissionTip: "Upload a mini voice speech introducing your favorite holiday! 🎤",
    parentActivities: [
      "Let children stand on a small carpet 'podium' and mock announce dinner recipes."
    ],
    tutorPacing: [
      "10 mins: Vocal warmup drills.",
      "22 mins: Stage greeting sentence builders.",
      "18 mins: Interactive spelling assembly grids."
    ],
    tutorTroubleshooting: [
      "Help kids practice deep breaths to regulate dynamic voice projection on stage slides."
    ],
    quiz: [
      {
        questionText: "What does 'ንግግር' translate to?",
        options: ["Pencil case", "Speech / Public address", "Eating candy", "Sleeping deep"],
        correctAnswerIndex: 1,
        explanation: "'ንግግር' (Nigigir) represents a speech or presentation."
      },
      {
        questionText: "How do say 'Peace be unto you all'?",
        options: ["ሰላም ለእናንተ ይሁን", "ሂሳብ እባክዎ", "ቀልድ ሰማሁ", "ውሃ እፈልጋለሁ"],
        correctAnswerIndex: 0,
        explanation: "'ሰላም ለእናንተ ይሁን' is the formal greeting for gatherings."
      },
      {
        questionText: "What does 'ደፋር' mean?",
        options: ["Brave / Confident", "Silly", "Angry", "Slow tracker"],
        correctAnswerIndex: 0,
        explanation: "'ደፋር' (Defar) translates to brave or confident."
      },
      {
        questionText: "What represents 'To listen closely'?",
        options: ["መብላት", "ማጥናት", "ማዳመጥ", "መጻፍ"],
        correctAnswerIndex: 2,
        explanation: "'ማዳመጥ' (Madamet) is to listen attentively."
      }
    ],
    nextLessonTitle: "Sharing Experiences"
  },

  // --- LESSON 22: Sharing Experiences ---
  {
    level: 3,
    lessonNumber: 22,
    geezNumber: "፳፪",
    topic: "Sharing Experiences",
    theme: "Experience & Wisdom (ልምድ)",
    phase: "Level 3 Stage 4: Presentation Skills",
    subheading: "Learn how to relate your unique school experiences, say 'እኔ አውቃለሁ' (I know), and describe lessons learned!",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Detail personal actions: 'እኔ ልምድ አለኝ'.",
      "Express 'knowing' states: 'እኔ አውቃለሁ'.",
      "Explain lesson reflections correctly.",
      "Engage conversational historic recounts."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ልምድ",
        english: "Limd",
        meaning: "Experience / Practice skill",
        context: "The valuable skill you gather when you practice drawing, swimming, or coding apps day-by-day.",
        tutorTip: "Crisp consonants ending: 'Lihmd'. Connected with knowledge.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Limd. Experience."
      },
      {
        fidel: "አውቃለሁ",
        english: "Awkalehu",
        meaning: "I know / Understand",
        context: "Confidently declaring your perfect grasp of coding scripts or Amharic letters: 'እኔ አውቃለሁ!'.",
        tutorTip: "A strong active declarative: 'Auh-kah-lehoo'. Double key on k.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Awkalehu. I know."
      },
      {
        fidel: "ማካፈል",
        english: "Makafel",
        meaning: "To share / Distribute insights",
        context: "Standing up in class to tell younger classmates how you solved tough mathematical mazes.",
        tutorTip: "Action infinitive: 'Mah-kah-fehl'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Makafel. To share."
      },
      {
        fidel: "ትልቅ ነገር",
        english: "Tilik Neger",
        meaning: "A great thing / Major value",
        context: "Mastering your parents' heritage tongue represents a 'ትልቅ ነገር' for your future.",
        tutorTip: "Direct compound: 'Tih-lihk Neh-gehr'.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Tilik neger. Great thing."
      },
      {
        fidel: "አስተማረኝ",
        english: "Astemaregn",
        meaning: "He/It taught me",
        context: "A loving mentor, smart book, or hard mistake that provided valuable skills: 'ይህ አስተማረኝ'.",
        tutorTip: "Past action focus on me: 'Ahs-teh-mah-reh-gny'.",
        imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=505&auto=format&fit=crop",
        audioText: "Astemaregn. Taught me."
      }
    ],
    exercises: [
      {
        amharic: "እኔ ታሪኩን ማካፈል እወዳለሁ።",
        transliteration: "Ene tarikun makafel ewedalehu.",
        english: "I love to share the stories.",
        tip: "Form book-opening loops with palms!"
      },
      {
        amharic: "እኔ የባህል ልምድ አውቃለሁ።",
        transliteration: "Ene ye bahil limd awkalehu.",
        english: "I know the cultural experiences.",
        tip: "Praise wisdom tapping your temple!"
      }
    ],
    dialogue: {
      heading: "💬 Shared Journeys",
      scenario: "Yared tells Lydia how he learned the Amharic keyboard inside tutoring class.",
      roles: [
        {
          character: "Yared",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሊዲያ ፣ የትናንትናው አዲስ ጨዋታ ምን አስተማረሽ?",
          transliteration: "Lydia, ye tinentina adis chewata min astemaresh?",
          english: "Lydia, what did yesterday's new game teach you (she)?"
        },
        {
          character: "Lydia",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "ስራው አንድነትን አስተማረኝ። እኔ ትልቅ ነገር አውቃለሁ!",
          transliteration: "Siraw andinetin astemaregn. Ene tilik neger awkalehu!",
          english: "The work taught me unity. I understand a great thing!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Shared Soccer Diary",
      passageAmharic: "ትናንትና ሔኖክ ለጓደኞቹ ትልቅ ታሪክ አካፈለ። እሱ ባለፈው ሳምንት በሜዳ ላይ ስለነበረው ትልቅ የእግር ኳስ ውድድር አወራ። ሔኖክ 'እግር ኳስ መጫወት በአንድነት መስራት አስተማረኝ፤ እኔ አሁን ቡድን እንዴት እንደሚረዳ አውቃለሁ' አለ። ሳሮንም ፈገግ ብላ የራሷን የዋና ልምድ አካፈለች። ይህ በእውነት ለክፍሉ ልጆች ትልቅ ነገር ነበረ። መማርና ልምድ ማካፈል ሰዎችን ያጎብዛል።",
      passageTransliteration: "Tinentina Henok le gwadeñochu tilik tarik akafele. Esu balefew samint be meda lay sileneberew tilik ye egir kwas wudidir awera. Henok 'egir kwas mechewet be andinet mesrat astemaregn; ene ahun budin endet endemiyreda awkalehu' ale. Saronim fegeg bila ye rasuan ye wana limd akafelech. Yih bewnet le kifilu lijoch tilik neger nebere. Memarn ena limd makafel sewochin yagobizal.",
      passageEnglish: "Yesterday Henok shared a grand story with his friends. He spoke about the major soccer match they had in the field last week. Henok said: 'Playing soccer taught me to work in unity; I now understand how a team helps'. Saron smiled and shared her own swimming experiences. This was truly a great thing for the classroom children. Learning and sharing skills makes people smart.",
      tutorTip: "Review 'Limd' (experience) as a positive badge of practicing hard."
    },
    writing: {
      heading: "✍️ Wisdom Characters",
      instructions: "Practice tracing the cognitive letters ል (Li) and ም (Mi).",
      lettersToPractice: [
        {
          letter: "ል",
          phonetic: "Li",
          steps: ["Forked start segment", "Center dip marker", "Right downward foot segment"]
        },
        {
          letter: "ም",
          phonetic: "Mi",
          steps: ["Closed bottom loop", "Lower stem connector", "Base horizontal base"]
        }
      ],
      wordChallenge: "ልምድ"
    },
    homework: [
      "Share a lesson you learned at cooking or school with parents using 'Astemaregn'.",
      "Write 'እኔ አውቃለሁ' (I know) in green crayons inside your booklet.",
      "Trace the characters ል, ሉ, ሊ, ላ, ሌ, ል, ሎ three times."
    ],
    submissionTip: "Upload a mini audio telling us: 'Ene Amharic awqalehu'! 🗣️",
    parentActivities: [
      "Let kids summarize what they learned in tutoring session using 'Zare Amharic astemaregn' at dinner."
    ],
    tutorPacing: [
      "10 mins: Experiences guessing puzzle.",
      "22 mins: Contextual storytelling drills.",
      "18 mins: Interactive sound pop bubble game."
    ],
    tutorTroubleshooting: [
      "Pace children through pronouncing 'Astemaregn' - highlight the end sound 'gny'."
    ],
    quiz: [
      {
        questionText: "What does 'ልምድ' translate to?",
        options: ["Pencil sharpener", "Experience / Practice skill", "Eating bread", "Angry animal"],
        correctAnswerIndex: 1,
        explanation: "'ልምድ' (Limd) represents experience or practice skill."
      },
      {
        questionText: "How do say 'I know / Understand'?",
        options: ["አውቃለሁ", "ተኛሁኝ", "ቸገረኝ", "ሄድኩት"],
        correctAnswerIndex: 0,
        explanation: "'አውቃለሁ' (Awkalehu) represents first-person 'I know'."
      },
      {
        questionText: "What is 'ማካፈል'?",
        options: ["To run", "To share / Distribute", "To swim", "To sleep"],
        correctAnswerIndex: 1,
        explanation: "'ማካፈል' (Makafel) is to share or distribute."
      },
      {
        questionText: "What represents 'Taught me'?",
        options: ["አስተማረኝ", "በላሁኝ", "ጻፍኩኝ", "እችላለሁ"],
        correctAnswerIndex: 0,
        explanation: "'አስተማረኝ' (Astemaregn) translates to 'it taught me'."
      }
    ],
    nextLessonTitle: "Mini Presentations"
  },

  // --- LESSON 23: Mini Presentations ---
  {
    level: 3,
    lessonNumber: 23,
    geezNumber: "፳፫",
    topic: "Mini Presentations",
    theme: "Speaking Projects (ማብራሪያ)",
    phase: "Level 2 Stage 4: Presentation Skills",
    subheading: "Learn vocabulary for summarizing, detailing 'ምሳሌ' (examples), presenting items, and accepting classroom praises!",
    imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Name 3 presenter vocabulary: 'ማብራሪያ' and 'ምሳሌ'.",
      "Structure presentations logically using 'መጀመርያ' (firstly).",
      "Use descriptive adjectives confident.",
      "Deliver virtual slide exhibition briefings."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ማብራሪያ",
        english: "Mabrariya",
        meaning: "Explanation / Presentation summary",
        context: "The clear description segment you give describing your beautiful artwork or school history posters: 'ማብራሪያ'.",
        tutorTip: "Five syllables. Break to: 'Mahb-rah-ree-yah'. Points to eloquence.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Mabrariya. Explanation."
      },
      {
        fidel: "ምሳሌ",
        english: "Misale",
        meaning: "Example / Case point",
        context: "Offering helper scenarios to clarify math or dynamic language rules: 'ለአብነት ያህል...'.",
        tutorTip: "Short, crisp: 'Mih-sah-leh'. Highly valued.",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=505&auto=format&fit=crop",
        audioText: "Misale. Example."
      },
      {
        fidel: "መጀመርያ",
        english: "Mejemerya",
        meaning: "Firstly / At start",
        context: "The helpful numbering starter word spoken before detailing plans or story frameworks.",
        tutorTip: "Stretched ending. 'Meh-jeh-meh-ryah'.",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=505&auto=format&fit=crop",
        audioText: "Mejemerya. Firstly."
      },
      {
        fidel: "ውጤት",
        english: "Witet",
        meaning: "Result / Grade / Outcome",
        context: "The amazing grade score of gold stars showing your fantastic school accomplishments.",
        tutorTip: "Glottal stress. 'Uee-teht'. Positive achievement word.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Witet. Result."
      },
      {
        fidel: "ማሳየት",
        english: "Masayet",
        meaning: "To show / Demonstrate",
        context: "Holding your laptop or paper drawing high to show classmates your achievements.",
        tutorTip: "Action infinitive: 'Mah-sah-yeht'.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Masayet. To show."
      }
    ],
    exercises: [
      {
        amharic: "መጀመርያ ፤ እኔ ማብራሪያ እሰጣለሁ።",
        transliteration: "Mejemerya, ene mabrariya esetalehu.",
        english: "Firstly, I will give an explanation.",
        tip: "Hold one index finger up representing numbering start!"
      },
      {
        amharic: "እባክህ ይህንን ውጤት ተመልከት።",
        transliteration: "Ebakih yihin witet temelket.",
        english: "Please, look at this result.",
        tip: "Mime holding a gold star certificate!"
      }
    ],
    dialogue: {
      heading: "💬 Show and Tell",
      scenario: "Brook briefs Martha about his new model bridge explanation.",
      roles: [
        {
          character: "Brook",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ማርታ ፤ ዛሬ እኔ ትልቅ ማብራሪያ ማሳየት እፈልጋለሁ።",
          transliteration: "Martha, zare ene tilik mabrariya masayet efeligalehu.",
          english: "Martha, today I want to show a grand explanation."
        },
        {
          character: "Martha",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እሺ ፤ መጀመርያ ምሳሌ ስጠኝ ፤ ከዚያም ውጤቱን አንድ ላይ እናያለን!",
          transliteration: "Eshi, mejemerya misale sitegn, keziyam witetun and lay enayalen!",
          english: "Okay, firstly give me an example, then we will see the result together!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Science Exhibition Day",
      passageAmharic: "በትናንትናው እቅድ በትምህርት ቤት ትልቅ ማሳየት ነበረ። ሔኖክ የቡድን ውጤቱን ሊያብራራ ወደ መድረክ ወጣ። እሱ መጀመርያ ፈገግ ብሎ 'ሰላም ለእናንተ ይሁን ፤ ዛሬ አጭር ማብራሪያ አለኝ' አለ። ከዚያም በስዕል የታገዘ ትልቅ ምሳሌ ሰጠ። ክፍል ውስጥ የነበሩ መምህራን በፀጥታ አዳመጡት። ሔኖክ ጥሩ ውጤት አገኘ። መላው ክፍል በደስታ አጨበጨቡለት ፤ ይህም ትልቅ ደፋር መሆኑን አሳየ።",
      passageTransliteration: "Be tinantnaw ekid be timihirt bet tilik masayet nebere. Henok ye budin witetun liyabrera wede medreh wota. Esu mejemerya fegeg bilo 'selam le'enante yehun; zare achir mabrariya alegn' ale. Keziyam be si'il yitagezewn tilik misale sete. Kifil wust yeneberu memhiran be tsetsa adametut. Henok tiru witet agegni. Melaw kifil be desta achebechebulet; yihim tilik defar mehonun asaye.",
      passageEnglish: "In yesterday's schedule, there was a major show day at school. Henok went up to the stage to explain his team's result. Firstly smiling, he said: 'Peace be unto you all; today I have a short presentation'. Then he offered a great example assisted by drawing. Teachers in the class listened in silence. Henok found a quality result. The entire class clapped for him in joy, showing that he is very brave.",
      tutorTip: "Review 'Mabrariya' (presentation) with positive validation and praise."
    },
    writing: {
      heading: "✍️ Design Characters",
      instructions: "Practice tracing the presentation letters ማ (Ma) and ዬ (Ye).",
      lettersToPractice: [
        {
          letter: "ማ",
          phonetic: "Ma",
          steps: ["Vertical start with loop", "Central loop indicator", "Base flat support"]
        },
        {
          letter: "ዬ",
          phonetic: "Ye",
          steps: ["High crown line with cross loops", "Vertical segment Segment", "Base bottom foot and horizontal base segment"]
        }
      ],
      wordChallenge: "ምሳሌ"
    },
    homework: [
      "Prepare a 2-sentence explanation of your favorite toy using 'Mejemerya...'.",
      "Write 'ምሳሌ መስጠት' in pretty crayons inside your diary page.",
      "Trace the characters ማ, ሙ, ሚ, ማ, ሜ, ም, ሞ three times."
    ],
    submissionTip: "Upload a photo labeled as 'Mabrariya' pointing to your poster! 📊",
    parentActivities: [
      "Let kids explain classroom projects to family circles tonight, rewarding them with applause."
    ],
    tutorPacing: [
      "10 mins: Presentation picture match.",
      "22 mins: Contextual speech translations.",
      "18 mins: Interactive Syllable Scramble builders."
    ],
    tutorTroubleshooting: [
      "Check that children speak 'Mabrariya' without skipping syllables inside."
    ],
    quiz: [
      {
        questionText: "What does 'ማብራሪያ' mean?",
        options: ["Pencil box", "Explanation / Presentation", "Eating lunch", "Playing soccer"],
        correctAnswerIndex: 1,
        explanation: "'ማብራሪያ' represents explanation or presentation."
      },
      {
        questionText: "How do say 'Firstly / At start'?",
        options: ["መጀመርያ", "ሁለተኛ", "ቀኝ", "ምን"],
        correctAnswerIndex: 0,
        explanation: "'መጀመርያ' (Mejemerya) translates to firstly."
      },
      {
        questionText: "What is 'ምሳሌ'?",
        options: ["Cold water", "Example / Case point", "Red car", "Big map"],
        correctAnswerIndex: 1,
        explanation: "'ምሳሌ' (Misale) is an example."
      },
      {
        questionText: "What represents the grade result?",
        options: ["ውጤት", "ችግር", "እንግዳ", "ስልክ"],
        correctAnswerIndex: 0,
        explanation: "'ውጤት' (Witet) represents the outcome, results or grade."
      }
    ],
    nextLessonTitle: "Level Review & Celebration"
  },

  // --- LESSON 24: Level Review & Celebration ---
  {
    level: 3,
    lessonNumber: 24,
    geezNumber: "፳፬",
    topic: "Level Review & Celebration",
    theme: "Graduation Celebration (ሽልማት)",
    phase: "Level 3 Stage 4: Presentation Skills",
    subheading: "Celebrate your incredible journey, receive virtual awards 'ሽልማት', and review all key intermediate phrases!",
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Synthesize all Level 3 intermediate phrases.",
      "Express celebratory feelings: 'በጣም ደስተኛ ነኝ!'.",
      "Explain graduation achievements with pride.",
      "Accept virtual merit star certificates 'ሽልማት'."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ሽልማት",
        english: "Shilimat",
        meaning: "Award / Prize / Ribbon",
        context: "The beautiful golden medal or starry prize envelope handed to you for succeeding in Amharic: 'ሽልማት'.",
        tutorTip: "Warm, stressed syllables: 'Shih-lih-maat'. Exclaim with high pride.",
        imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=505&auto=format&fit=crop",
        audioText: "Shilimat. Award."
      },
      {
        fidel: "ምረቃ",
        english: "Mireqa",
        meaning: "Graduation / Commencement",
        context: "The majestic celebration day wearing caps and gowns surrounded by loving families: 'ምረቃ'.",
        tutorTip: "Three smooth syllables: 'Mih-reh-kah'. Focus on achievement.",
        imageUrl: "https://images.unsplash.com/photo-1523050854-058b2d74ca77?w=505&auto=format&fit=crop",
        audioText: "Mireqa. Graduation."
      },
      {
        fidel: "ደስተኛ",
        english: "Destegna",
        meaning: "Happy / Pleased / Joyful",
        context: "The beaming, radiant mental warmth that floods your chest when you achieve high value grades.",
        tutorTip: "A primary happy adjective: 'Dehs-teh-gnya'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Destegna. Happy."
      },
      {
        fidel: "ጨረስን",
        english: "Cheresn",
        meaning: "We finished / Accomplished (plural)",
        context: "Lifting our hands together with classmate friends to shout: 'ሁሉንም ጨረስን!'.",
        tutorTip: "Plural past completion: 'Cheh-rehs-neh'. Pronounce with satisfaction.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Cheresn. We finished."
      },
      {
        fidel: "አሸናፊ",
        english: "Ashenafi",
        meaning: "Winner / Champion",
        context: "A hard working diaspora student who beats tough challenges and accomplishes high level skills: 'አሸናፊ'.",
        tutorTip: "Empowering title: 'Ah-sheh-nah-fee'. Use with applause.",
        imageUrl: "https://images.unsplash.com/photo-15111295742364-92767fa62d9f?w=505&auto=format&fit=crop",
        audioText: "Ashenafi. Winner."
      }
    ],
    exercises: [
      {
        amharic: "እኛ ሁሉንም ትምህርት ጨረስን!",
        transliteration: "Egn hulunim timihirt cheresn!",
        english: "We finished all the lessons!",
        tip: "Form high-fives and throw paper caps in the air!"
      },
      {
        amharic: "እኔ አሸናፊ እና በጣም ደስተኛ ነኝ።",
        transliteration: "Ene ashenafi ena betam destegna negn.",
        english: "I am a champion and very happy.",
        tip: "Praise success posing with arms crossed proudly!"
      }
    ],
    dialogue: {
      heading: "💬 Award Cerebrations",
      scenario: "Yonas and Lydia exult after receiving their gold star diplomas.",
      roles: [
        {
          character: "Yonas",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሊዲያ ፣ እኛ ዛሬ ተመረቅን! ይህ ትልቅ ሽልማት ነው!",
          transliteration: "Lydia, egn zare temereqn! Yih tilik shilimat new!",
          english: "Lydia, we graduated today! This is a great award!"
        },
        {
          character: "Lydia",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አዎ ፤ እኛ አሸናፊዎች ነን! ምረቃችን በጣም ደስ ይላል!",
          transliteration: "Awo, egn ashenafiwch nen! Mireqachin betam des yilewal!",
          english: "Yes, we are champions! Our graduation is very delightful!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Champion Generation's Triumph",
      passageAmharic: "ዛሬ በትምህርት ቤት ታላቅ ምረቃ ነው። ሔኖክ እና ሳሮን ሁሉንም Amharic ክፍሎች ጨረሱ። ቤተሰቦቻቸው በሙሉ ትልቅ ባህል ልብስ ለብሰው ወደ መድረክ መጡ። መምህሯ ሔኖክን ጠርተው 'ታላቅ አሸናፊ ነህ' እያሉ የወርቅ ኮከብ ሽልማት ሰጡት። ሳሮንም ፈገግ ብላ 'በጣም ደስተኛ ነኝ ፤ እኛ ጨረስን!' አለች። መላው ማህበረሰብ 'እንኳን ደስ አላችሁ' እያሉ በደስታ እስክስታ ወረዱ። ይህ በእውነት ታሪካዊ ቀን ነበረ።",
      passageTransliteration: "Zare be timihirt bet talak mireqa new. Henok ena Saron hulunim Amharic kiflochin cheresu. Betesebochachewbe mulu tilik bahil libs lebsew wede medreh metu. Memhirua Henokin terteu 'talak ashenafi neh' eyalu ye work kokeb shilimat setut. Saronim fegeg bila 'betam destegna negn; egn cheresn!' alech. Melaw mahibereseb 'enkuan des alachih' eyalu be desta eskista weredu. Yih bewnet tarikawi ken nebere.",
      passageEnglish: "Today is a great graduation day at school. Henok and Saron finished all Amharic classes. Their entire families came to the stage wearing grand traditional clothing. The teacher called Henok and gave him a gold star award saying: 'You are a great champion'. Saron smiled and said: 'I am extremely happy; we completed it!'. The entire community danced the shoulder dance in joy saying 'Congratulations'. This was truly a historic day.",
      tutorTip: "Lead the class in a robust round of applause and play graduation parade themes."
    },
    writing: {
      heading: "✍️ Victorious Characters",
      instructions: "Practice tracing the triumphant letters ሽ (Shi) and ረ (Re).",
      lettersToPractice: [
        {
          letter: "ሽ",
          phonetic: "Shi",
          steps: ["Vertical loop side helper with crown hooks", "Center connector segment", "Baseline downward leg"]
        },
        {
          letter: "ረ",
          phonetic: "Re",
          steps: ["Forked head start", "Vertical segment segment", "Base curve foot segment"]
        }
      ],
      wordChallenge: "ሽልማት"
    },
    homework: [
      "Celebrate your milestone achievements with family telling them 'Ene Amharic cheresku'.",
      "Draw yourself holding a trophy labeled 'Ashenafi' in your booklet.",
      "Trace the characters ሽ, ሹ, ሺ, ሻ, ሼ, ሽ, ሾ three times."
    ],
    submissionTip: "Upload a cute snapshot of your earned star points certificate or stars score! 🏆",
    parentActivities: [
      "Order a sweet cake treat or cook a special holiday-style lunch to appreciate your child's amazing language milestones!"
    ],
    tutorPacing: [
      "10 mins: Grand certificate ceremony.",
      "22 mins: Level review quick contests.",
      "18 mins: Interactive shoulder dancing celebration eskista."
    ],
    tutorTroubleshooting: [
      "Check that children confidently scream the plural completed verb 'Cheresn'!"
    ],
    quiz: [
      {
        questionText: "What does 'ሽልማት' mean?",
        options: ["Pencil case", "Award / Prize", "Eating dinner", "Sleeping bed"],
        correctAnswerIndex: 1,
        explanation: "'ሽልማት' (Shilimat) is an award, trophy or prize."
      },
      {
        questionText: "How do say 'We completed/finished' in Amharic?",
        options: ["ጨረስን", "ውሃ በላን", "ቀልድ ሰማን", "እግር ኳስ"],
        correctAnswerIndex: 0,
        explanation: "'ጨረስን' (Cheresn) translates to 'we finished'."
      },
      {
        questionText: "What is 'አሸናፊ'?",
        options: ["Strict teacher", "Winner / Champion", "Silly monkey", "Broken tool"],
        correctAnswerIndex: 1,
        explanation: "'አሸናፊ' (Ashenafi) translates to winner/champion."
      },
      {
        questionText: "What represents the graduation commencement?",
        options: ["ምረቃ", "ችግር", "እቅድ", "ስልክ"],
        correctAnswerIndex: 0,
        explanation: "'ምረቃ' (Mireqa) is the graduation ceremony."
      }
    ],
    nextLessonTitle: "Course Fully Complete!"
  }
];
