import { Level4LessonDefinition } from "./lessons_1_8";

export const lessons_9_16: Level4LessonDefinition[] = [
  // --- LESSON 9: Ethiopian History Stories ---
  {
    level: 4,
    lessonNumber: 9,
    geezNumber: "፱",
    topic: "Ethiopian History Stories",
    theme: "History & Landmarks (ታሪክ)",
    phase: "Level 4 Stage 2: Advanced Culture & Narrative",
    subheading: "Trace structural monuments of Axum, Lalibela ruins, royal histories, and describe glorious heritages.",
    imageUrl: "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Detail key historical events and timelines using 'ታሪክ' (history).",
      "Describe ancient monuments: 'ቅርስ' (heritage/relic) and 'ሀገር' (country).",
      "Express spatial historic narratives beautifully.",
      "Summarize traditional leadership deeds."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ታሪክ",
        english: "Tarik",
        meaning: "History / Chronicles",
        context: "The extensive 'ታሪክ' of Axum contains legendary stories of emperors and ancient civilizations.",
        tutorTip: "A vital noun connecting children to their roots: 'Tah-reek'. Keep the r short.",
        imageUrl: "https://images.unsplash.com/photo-1544085311-11a028465b03?w=505&auto=format&fit=crop",
        audioText: "Tarik. History."
      },
      {
        fidel: "ቅርስ",
        english: "Qirts",
        meaning: "Heritage / Relic / Artifact",
        context: "The rock-hewn holy temples of Lalibela represent a globally recognized cultural 'ቅርስ'.",
        tutorTip: "Hold on the glottal q and ts: 'Qihrts'. Shows extreme value.",
        imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=505&auto=format&fit=crop",
        audioText: "Qirts. Heritage."
      },
      {
        fidel: "ንግሥት",
        english: "Nigist",
        meaning: "Queen / Empress",
        context: "The legendary 'ንግሥት' Sheba travelled vast lands carrying precious gold incense.",
        tutorTip: "Nasal sibilant character: 'Nih-gist'. Elegant title.",
        imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=505&auto=format&fit=crop",
        audioText: "Nigist. Queen."
      },
      {
        fidel: "የጥንት ዘመን",
        english: "Yeti'int Zemen",
        meaning: "Ancient eras / Antiquity",
        context: "In 'የጥንት ዘመን', builders designed beautiful palaces using precise stone masonry.",
        tutorTip: "Compound denoting archaic history: 'Ye-t'ihnt Zeh-mehn'.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Yeti'int zemen. Ancient eras."
      },
      {
        fidel: "ኩራት",
        english: "Kurat",
        meaning: "Pride / Dignity",
        context: "To see our ancient Obelisks standing tall fills our diaspora hearts with huge 'ኩራት'.",
        tutorTip: "Short, positive term: 'Koo-raat'. Speaks of cultural connection.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Kurat. Pride."
      }
    ],
    exercises: [
      {
        amharic: "የኢትዮጵያ ታሪክ በብዙ ጥንታዊ ቅርሶች የተሞላ ነው።",
        transliteration: "Ye-Ethiopia tarik be-bizu tintawi qirtswochin yetemola new.",
        english: "The history of Ethiopia is filled with many ancient relics.",
        tip: "Stand tall referencing grand scale monuments in the air!"
      },
      {
        amharic: "እኛ የታሪካዊ ቅርሶቻችንን ታሪክ በኩራት እንናገራለን።",
        transliteration: "Egna ye-tarikawi qirtsachinin tarik be-kurat ennageralen.",
        english: "We talk about the chronicles of our historic heritages with pride.",
        tip: "Rest thumbs proudly on your shoulders matching dignity!"
      }
    ],
    dialogue: {
      heading: "💬 Debating Historical Relics",
      scenario: "Brook outlines the design parameters of Gondar castles to Helen.",
      roles: [
        {
          character: "Brook",
          avatar: "👨",
          bubbleSide: "left",
          amharic: "ሄለን ፤ የጎንደር ግንቦችን ዓይተሻል? ታሪካዊ ቅርስ በመሆናቸው ታላቅ ኩራት ይሰማኛል።",
          transliteration: "Helen, ye-Gondar ginbochin ayteshal? Tarikawi qirts bemehonachew talak kurat yisemanalehu.",
          english: "Helen, have you seen the castles of Gondar? As they are historic heritages, I feel great pride."
        },
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አዎ ብሩክ ፤ የጥንት ዘመን ንግሥት ሳባም ድንቅ ታሪክ እንዳላት አውቃለሁ።",
          transliteration: "Awo Brook, ye-tint zemen nigist Saba-m dinq tarik endalat awqalehu.",
          english: "Yes Brook, I also know that Queen Sheba of ancient eras has a magnificent history."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Standing Spires of Axum",
      passageAmharic: "አያት በቀለ በየሳምንቱ ቅዳሜ ለልጅ ልጆቻቸው የታሪክ ታሪኮች ያወራሉ። ትናንት ምሽት ስለ ላሊበላ ድንቅ አብያተ-ክርስቲያናት አወሩ። 'ይህ ቅርስ የተሰራው በጥንት ዘመን በአንድ ወጥ ድንጋይ ነው ፤ ይህም በምህንድስናው ዓለም ከፍተኛ ዕውቀት ይታይበታል' አሉ። ተማሪዎቹም የተሰሩበትን አስገራሚ ምክንያት በጥሞና ሰምተው ትልቅ ኩራት አደሩባቸው። መምህራቸውም 'ታሪክን መማር ለአዲሱ ትውልድ ትልቅ ዕድል ነው' የሚል ብልህ ምክር አካፈሉ። ታሪክን የሚያውቅ ትውልድ ሁልጊዜ ጠንካራ መሠረት አለው።",
      passageTransliteration: "Ayat Beqele beye-samintu qidame le-lij lijochachew ye-tarik tariloch yawralu. Tinant mishit sile Lalibela dinq abyate-kristiyanat aweru. 'yih qirts yeteseraw be-tint zemen be-and wet dingay new; yihm be-mihindisinaw alem kefteña ewqet yitayibetaly' alu. Temariochu-m yeteserubetin asgerami mikniyat be-timona semitew tilik kurat aderubachew. Memhirachewm 'tarikin memar le-adisu tiwild tilik edil new' yemil bilih mikir akafelu. Tarikin yemiyawq tiwild hulgize tenkara meseret alew.",
      passageEnglish: "Grandfather Beqele recounts historical chronicles to his grandchildren every Saturday. Last night he spoke of the beautiful monolithic temples of Lalibela. 'This heritage was constructed in ancient eras from a single solid rock; this displays high structural knowledge in the engineering world', he said. The students listened carefully to the surprising reason they were built, expressing huge cultural pride. Their mentor shared wise advice: 'Learning history is a great opportunity for the new generation'. A generation that knows history always possesses a solid foundation.",
      tutorTip: "Integrate regional historic artifacts to make global links."
    },
    writing: {
      heading: "✍️ Historian Letters Studio",
      instructions: "Practice tracing the historic characters ታ (Ta) and ር (Re).",
      lettersToPractice: [
        {
          letter: "ታ",
          phonetic: "Ta",
          steps: ["Vertical start left", "Horizontal center block", "Right downward leg segment"]
        },
        {
          letter: "ር",
          phonetic: "Re",
          steps: ["Slanted drop line left", "Slight bottom curl indicator"]
        }
      ],
      wordChallenge: "ቅርስ"
    },
    homework: [
      "Select an ancient Ethiopian heritage site and write its name in Amharic script."
    ],
    submissionTip: "Upload a sketch of a Lalibela church labeled with 'Qirts' inside your language folder! 🏰",
    parentActivities: [
      "Sit down with grandparents or parents to talk about historical stories from their birth cities."
    ],
    tutorPacing: [
      "10 mins: Historical site naming icebreaker.",
      "25 mins: Chronology drilling and text translation check.",
      "15 mins: Memory matcher card play."
    ],
    tutorTroubleshooting: [
      "Confirm students differentiate between physical 'Qirts' (heritage) and abstract 'Tarik' (history)."
    ],
    quiz: [
      {
        questionText: "What does 'ቅርስ' translate to?",
        options: ["Pencil", "Heritage / Relic", "Water bottle", "Blue sky"],
        correctAnswerIndex: 1,
        explanation: "'ቅርስ' equates directly to heritage or relic."
      },
      {
        questionText: "Which word represents 'Queen'?",
        options: ["ንግሥት", "መሐንዲስ", "ኃላፊነት", "ችግር"],
        correctAnswerIndex: 0,
        explanation: "'ንግሥት' (Nigist) translates to Queen."
      },
      {
        questionText: "What does 'ኩራት' mean?",
        options: ["Pardon", "Pride / Dignity", "Speed", "Wealth"],
        correctAnswerIndex: 1,
        explanation: "'ኩራት' yields cultural pride or dignity."
      },
      {
        questionText: "How do you say 'Ancient eras'?",
        options: ["የዛሬ ቀን", "የጥንት ዘመን", "ነገ ጠዋት", "የሚቀጥለው አመት"],
        correctAnswerIndex: 1,
        explanation: "'የጥንት ዘመን' means ancient times / antiquity."
      }
    ],
    nextLessonTitle: "Cultural Values & Respect"
  },

  // --- LESSON 10: Cultural Values & Respect ---
  {
    level: 4,
    lessonNumber: 10,
    geezNumber: "፲",
    topic: "Cultural Values & Respect",
    theme: "Respect & Values (ባህል)",
    phase: "Level 4 Stage 2: Advanced Culture & Narrative",
    subheading: "Dwell on traditional greeting ethics, bowing respectfully to elders, using formal pronouns, and hospitality customs.",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Master respectful pronouns: 'እርስዎ' (you, polite).",
      "Explain structural social expectations: 'ክብር' (respect) and 'ባህል' (culture).",
      "Demonstrate physical and verbal bowing markers beautifully.",
      "Detail traditional hosting procedures."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ክብር",
        english: "Kibir",
        meaning: "Respect / Honor / Glory",
        context: "Standing up when elders enter school community rooms is a vital symbol of 'ክብር'.",
        tutorTip: "Crisp syllables: 'Kih-bihr'. Vital social currency.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Kibir. Respect."
      },
      {
        fidel: "ባህል",
        english: "Bahil",
        meaning: "Culture / Tradition / Custom",
        context: "Our deep language 'ባህል' values sharing food on a single large mesob plate.",
        tutorTip: "Soft and short: 'Bah-hihl'. The soul of Abyssinia.",
        imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=505&auto=format&fit=crop",
        audioText: "Bahil. Culture."
      },
      {
        fidel: "እርስዎ",
        english: "Erswo",
        meaning: "You (polite/elder format)",
        context: "Addressing your grandfather with 'እርስዎ' instead of the casual 'ante'.",
        tutorTip: "Essential honorific pronoun: 'Ehr-swoh'. Use for seniors.",
        imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=505&auto=format&fit=crop",
        audioText: "Erswo. You, polite."
      },
      {
        fidel: "መረዳዳት",
        english: "Meredadat",
        meaning: "Mutual aid / Reciprocity",
        context: "When families gather to rebuild neighborhood properties, they practice 'መረዳዳት'.",
        tutorTip: "A reflexive cooperative noun: 'Meh-reh-dah-daat'.",
        imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=505&auto=format&fit=crop",
        audioText: "Meredadat. Mutual aid."
      },
      {
        fidel: "ሥርዓት",
        english: "Sir'at",
        meaning: "System / Order / Ettiquete",
        context: "The beautiful coffee brewing ritual represents a highly patterned cultural 'ሥርዓት'.",
        tutorTip: "Glottal stop in center: 'Sihr-aht'. Very important noun.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Sir'at. System or etiquette."
      }
    ],
    exercises: [
      {
        amharic: "እባክዎን እርስዎ ይህንን ቦታ ይቀመጡ ፤ ታላቅ አክብሮት አለን።",
        transliteration: "Ebakwon erswo yihinni bota yiqemetu; talak akbrot alen.",
        english: "Please, you (polite/elder) sit here; we have grand respect.",
        tip: "Bow slightly while sweep-pointing your hand to a chair!"
      },
      {
        amharic: "በእኛ ባህል ውስጥ መረዳዳት እና ሥርዓት ትልቅ ቦታ አላቸው።",
        transliteration: "Be-egna bahil wust meredadat ena sir'at tilik bota alachew.",
        english: "In our culture, mutual aid and clean etiquette have a high place.",
        tip: "Form a secure joined circle expressing mutual support!"
      }
    ],
    dialogue: {
      heading: "💬 Bowing to Elders",
      scenario: "Yared coordinates greeting protocol before grandfather Abel visits.",
      roles: [
        {
          character: "Yared",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሄለን ፤ አያታችን ሲመጡ ሁልጊዜ እርስዎ ብለን በክብር መቃኘት አለብን።",
          transliteration: "Helen, ayatachin simetu hulgize erswo bilen be-kibir meqagnet alebin.",
          english: "Helen, when our grandfather arrives, we must always address him with 'Erswo' respectfully."
        },
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "ትክክል ነህ ፤ በእኛ ባህል ሥርዓት ማክበር የእለት ተግባራችን ነው።",
          transliteration: "Tikkikl neh, be-egna bahil sir'at makber ye-elet tegbarachin new.",
          english: "You are correct; in our culture, respecting etiquette is our daily responsibility."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Architecture of the Mesob",
      passageAmharic: "ሳሊማ በከተማው ውስጥ ልዩ የቡና ሥርዓት በቤቱ ውስጥ ሲዘጋጅ ተመለከተች። የአያቶች መምጣት ሁልጊዜ መረዳዳትና ታላቅ ክብር ይፈጥራል። እሷ ‘በእኛ ባህል አዛውንቶችን በክብር መከተልና በአክብሮት እርስዎ ማለት የእያንዳንዱ ወጣት ኃላፊነት ነው’ ብላ ታምናለች። ወላጆቿም የሳሊማን መልካም አቋም አይተው በታላቅ ኩራት መረቋት። ይህን ድንቅ ሥርዓት ጠብቀን የምንኖር ቤተሰቦች ሁልጊዜ ታማኝነትና ሰላምን እናጭዳለን። ባህላችን ለእኛ ጠቃሚ የማንነት ብርሃን ቅርስ ነው።",
      passageTransliteration: "Salima be-ketemaw wust liyu ye-buna sir'at be-betu wust sizenget temaleketech. Ye-ayatoc h simetu hulgize meredadat-ina talak kibir yifetral. Esua 'be-egna bahil azawntochin be-kibir meketel ena be-akbrot erswo malet ye-eyandandu wetat halafinet new' bila tamnalech. Welajochuam ye-Salima-n melkam aquam aytew be-talak kurat merequat. Yihin dinq sir'at tebiqen yeminnor beteseboch hulgize tamagninet ena selam-in ennachidalen. Bahilachin le-egna teqami yemaninet brihan qirts new.",
      passageEnglish: "Salima observed a special coffee brewing ceremony being prepared inside the house. The arrival of grandparents always creates mutual aid and grand honor. She believes: 'In our culture, following senior citizens with honor and politely addressing them as Erswo is the responsibility of every youth'. Her parents, seeing Salima's good posturing, blessed her with grand pride. Families that protect and live this magnificent etiquette always harvest loyalty and peace. Our culture is a useful heritage lantern of our personal identity.",
      tutorTip: "Train students on proper hand-shaking and bowing mechanics."
    },
    writing: {
      heading: "✍️ Respectful Letters Studio",
      instructions: "Practice tracing the polite letters ሥ (Sir) and ክ (Ki).",
      lettersToPractice: [
        {
          letter: "ሥ",
          phonetic: "Sir",
          steps: ["Horizontal baseline segments", "Cross hairs line on middle vertical segment", "Lower leg anchor"]
        },
        {
          letter: "ክ",
          phonetic: "Ki",
          steps: ["Vertical start left", "Horizontal bridge", "Right wing indicator"]
        }
      ],
      wordChallenge: "ሥርዓት"
    },
    homework: [
      "Engage an uncle or aunt using formal pronouns exclusively today."
    ],
    submissionTip: "Upload a photo bowing respectfully to an elder with hand-over-chest stance! 🤝",
    parentActivities: [
      "Brew traditional tea together, letting children host and greet seniors using honorific Amharic pronouns."
    ],
    tutorPacing: [
      "10 mins: Honorific versus informal pronoun drills.",
      "25 mins: Cultural ethics reading analyses.",
      "15 mins: Interactive puzzle builder games."
    ],
    tutorTroubleshooting: [
      "Ensure kids understand that 'Sir'at' applies to societal etiquette, not just mathematical rules."
    ],
    quiz: [
      {
        questionText: "Which pronoun represents polite 'You' for elders?",
        options: ["አንተ", "እርስዎ", "እሷ", "እነሱ"],
        correctAnswerIndex: 1,
        explanation: "'እርስዎ' (Erswo) is the formal pronouns for elderly individuals."
      },
      {
        questionText: "What does 'ክብር' signify?",
        options: ["Cold water", "Respect / Honor", "Gold spoon", "A high mountain"],
        correctAnswerIndex: 1,
        explanation: "'ክብር' translates directly to respect and honor."
      },
      {
        questionText: "How do say 'Etiquette' or 'Etiquette System'?",
        options: ["ሥርዓት", "ባህል", "ቅርስ", "ታሪክ"],
        correctAnswerIndex: 0,
        explanation: "'ሥርዓት' relates to etiquette system or code."
      },
      {
        questionText: "Select correct word for 'Mutual Aid / Collaboration':",
        options: ["መረዳዳት", "መተኛት", "ችግር", "ብትሞክር"],
        correctAnswerIndex: 0,
        explanation: "'መረዳዳት' represents mutual aid."
      }
    ],
    nextLessonTitle: "Community & Family Roles"
  },

  // --- LESSON 11: Community & Family Roles ---
  {
    level: 4,
    lessonNumber: 11,
    geezNumber: "፲፩",
    topic: "Community & Family Roles",
    theme: "Community Action (ቤተሰብ)",
    phase: "Level 4 Stage 2: Advanced Culture & Narrative",
    subheading: "Define neighborhood connections, volunteer support groups, local councils, and cooperative roles.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Articulate community volunteer efforts: 'ረዳት' (helper).",
      "Explain strategic community bonds: 'ማህበረሰብ' (community) and 'ጎረቤት' (neighbor).",
      "Structure multi-clause community goals cleanly.",
      "Simulate a local food drive organization."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ማህበረሰብ",
        english: "Mahbereseb",
        meaning: "Community / Society",
        context: "A prosperous 'ማህበረሰብ' is formed when households coordinate child safety programs together.",
        tutorTip: "A vital civic noun: 'Mahh-beh-ree-sehb'. Accentuate the h sound.",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=505&auto=format&fit=crop",
        audioText: "Mahbereseb. Community."
      },
      {
        fidel: "ጎረቤት",
        english: "Gorebet",
        meaning: "Neighbor / Adjacent household",
        context: "Exchanging traditional holiday breads with your next-door 'ጎረቤት' builds warm relationships.",
        tutorTip: "Stretched ending vowel: 'Goh-reh-beht'. Represents close friendship.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Gorebet. Neighbor."
      },
      {
        fidel: "ረዳት",
        english: "Redat",
        meaning: "Helper / Assistant / Support",
        context: "Serving as a joyful study room 'ረዳት' for primary kids enhances educational goals.",
        tutorTip: "Refers to volunteer assistants: 'Reh-daat'.",
        imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=505&auto=format&fit=crop",
        audioText: "Redat. Helper."
      },
      {
        fidel: "ድርሻ",
        english: "Dirsha",
        meaning: "Share / Portion / Contribution",
        context: "Completing your designated cleanup 'ድርሻ' ensures school playgrounds remain clean.",
        tutorTip: "Represents personal quota or task share: 'Dihr-shah'.",
        imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=505&auto=format&fit=crop",
        audioText: "Dirsha. Share."
      },
      {
        fidel: "በጎ ፈቃድ",
        english: "Bego Feqad",
        meaning: "Volunteering / Goodwill",
        context: "Investing your free weekend hours in 'በጎ ፈቃድ' activities supports neighborhood food pantry efforts.",
        tutorTip: "Compound meaning good willingness: 'Beh-goh Feh-qaad'. Accent on q.",
        imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=505&auto=format&fit=crop",
        audioText: "Bego feqad. Volunteering."
      }
    ],
    exercises: [
      {
        amharic: "እኛ ለማህበረሰባችን ጠቃሚ በጎ ፈቃድ አገልግሎት እንሰጣለን።",
        transliteration: "Egna le-mahberesebachin teqami bego feqad agelgilot ensetalen.",
        english: "We provide useful volunteer services for our community.",
        tip: "Extend open hands of service forward gracefully!"
      },
      {
        amharic: "ሁሉም ጎረቤት የእርሱን ድርሻ ተቀብሎ በታማኝነት ይሰራል ።",
        transliteration: "Hullum gorebet ye-ersun dirsha tebiqo be-tamagninet yiseral.",
        english: "Every single neighbor accepts their share of tasks and works with loyalty.",
        tip: "Indicate division of tasks calmly with structured sweeps!"
      }
    ],
    dialogue: {
      heading: "💬 Community Cleanup Drives",
      scenario: "Yonas and Elizabeth divide neighborhoods zones for green planting days.",
      roles: [
        {
          character: "Yonas",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ኤልሳቤጥ ፤ ለማህበረሰቡ ድርሻችንን ገብተን በጎ ፈቃድ ማድረግ አለብን።",
          transliteration: "Elizabeth, le-mahberesebu dirshachinin gebten bego feqad madreg alebin.",
          english: "Elizabeth, we must contribute our share to the community and engage in volunteerism."
        },
        {
          character: "Elizabeth",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እስማማለሁ ዮናስ ፤ ጎረቤታችንም እንደ ረዳት ሆኖ እኛን መርዳት ይፈልጋል።",
          transliteration: "Esmamalehu Yonas, gorebetachinim ende redat hono enen merdat yifeligal.",
          english: "I agree Yonas, our neighbor also wants to support us by serving as an assistant."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Strength of the Local Idir",
      passageAmharic: "በትናንትናው እቅድ ሊዲያ ከጎረቤቶቿ ጋር ታላቅ የማህበረሰብ ጉባኤ አደረገች። መሪዎች 'ለሰፈር ልጆች የፈጠራ ማሳደጊያ ምን አይነት መፍትሔ ይሻላል?' የሚል ሀሳብ አነሱ። ሊዲያም 'በበጎ ፈቃድ እንደ ረዳት ሆኜ የታሪክ ክፍሎችን በነጻ ለማስተማር ድርሻዬን እወጣለሁ' አለች። ጎረቤቶቿም የሊዲያንን ብልህ ውሳኔ ሰምተው በታላቅ ኩራት አበረታቷት። ይህን ድንቅ ታማኝነትና መረዳዳት ያሳዩ ጎረቤቶች ሁልጊዜ ሰላማዊ ማህበረሰብ ይገነባሉ። በእኛ ባህል ሥርዓት መረዳዳት ትልቅ ቅርስ ነው።",
      passageTransliteration: "Be tinantnaw ekid Lydia ke gorebetochua gar talak ye-mahbereseb gubae aderegech. Merioch 'lesefer lijoch ye-fetera masadegiya min aynet meftehe yishalal?' yemil hasab anesu. Lydia-m 'be-bego feqad ende redat hoñe ye-tarik kiflochin be-netsa lemasitemar dirshayen ewitalehu' alech. Gorebetochuam ye-Lydiaun bilih wisane semitew be-talak kurat yabertatuat. Yihin dinq tamagninet ena meredadat yasayu gorebetoch hulgize selamawi mahbereseb yigenbalu. Be-egna bahil sir'at meredadat tilik qirts new.",
      passageEnglish: "In yesterday's schedule, Lydia convened an amazing society assembly with her neighbors. The leaders proposed: 'What kind of solution is better to grow local playground children's creativity?'. Lydia stated: 'I will fulfill my share by working in goodwill as an assistant to teach historical classes for free'. Her neighbors, seeing Lydia's wise resolve, supported her with grand pride. Neighbors who demonstrate this extraordinary loyalty and mutual aid always establish peaceful societies. In our cultural system, helping one another is an enduring heritage.",
      tutorTip: "Define the historic 'Idir' (mutual community bank) to explore concepts of unity."
    },
    writing: {
      heading: "✍️ Volunteer Character Tracing",
      instructions: "Practice tracing the neighborhood letters ረ (Re) and ድ (Di).",
      lettersToPractice: [
        {
          letter: "ረ",
          phonetic: "Re",
          steps: ["Slanted drop line left", "Slight bottom curl indicator"]
        },
        {
          letter: "ድ",
          phonetic: "Di",
          steps: ["Pillar on left with crown loop", "Horizontal bridge", "Right downward leg segment"]
        }
      ],
      wordChallenge: "ድርሻ"
    },
    homework: [
      "Define three voluntary family responsibilities you can complete today."
    ],
    submissionTip: "Upload a list of your cooperative actions in Amharic script labeled 'Bego Feqad'! 📝",
    parentActivities: [
      "Prepare simple snack boxes for local municipal library personnel, outlining the task as 'Bego Feqad' in Amharic."
    ],
    tutorPacing: [
      "10 mins: Neighborhood action brainstorming.",
      "25 mins: Vocabulary parsing and civic text recitation.",
      "15 mins: Complete interactive sound seekers games."
    ],
    tutorTroubleshooting: [
      "Ensure students write 'Dirsha' correctly, recognizing the heavy sh sound."
    ],
    quiz: [
      {
        questionText: "What does 'ማህበረሰብ' mean?",
        options: ["Pencil", "Community / Society", "Eating soup", "White paper"],
        correctAnswerIndex: 1,
        explanation: "'ማህበረሰብ' translates to community or society."
      },
      {
        questionText: "Select correct word for 'Neighbor':",
        options: ["ጎረቤት", "መሐንዲስ", "ጠቃሚ", "ውጤት"],
        correctAnswerIndex: 0,
        explanation: "'ጎረቤት' represents neighbor."
      },
      {
        questionText: "What does 'ድርሻ' represent?",
        options: ["Share / Contribution", "Cold drink", "Red umbrella", "School desk"],
        correctAnswerIndex: 0,
        explanation: "'ድርሻ' translates to share or contribution portion."
      },
      {
        questionText: "What is 'በጎ ፈቃድ'?",
        options: ["Volunteering / Goodwill", "To study late", "Hard rock", "To run far"],
        correctAnswerIndex: 0,
        explanation: "'በጎ ፈቃድ' signifies volunteering or goodwill."
      }
    ],
    nextLessonTitle: "Ethiopian Proverbs & Wisdom"
  },

  // --- LESSON 12: Ethiopian Proverbs & Wisdom ---
  {
    level: 4,
    lessonNumber: 12,
    geezNumber: "፲፪",
    topic: "Ethiopian Proverbs & Wisdom",
    theme: "Heritage Proverbs (ምሳሌያዊ አነጋገር)",
    phase: "Level 4 Stage 2: Advanced Culture & Narrative",
    subheading: "Recite proverbs like 'ድርቢያ ድንጋይ' or 'አንድነት ኃይል ነው', and interpret historical metaphors.",
    imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Interpret ancient Amharic idioms: 'ምሳሌያዊ አነጋገር' (proverb).",
      "Express conceptual thoughts using: 'ጥበብ' (wisdom) and 'ተረት' (folktale).",
      "Apply ancient metaphors to current life scenarios.",
      "Engage dialogue of historic advice using parables."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ምሳሌያዊ አነጋገር",
        english: "Mislawi Anegager",
        meaning: "Proverb / Metaphor / Saying",
        context: "Using a sharp 'ምሳሌያዊ አነጋገር' adds colorful flavor and high value to Amharic speeches.",
        tutorTip: "A compound of 'mislawi' (figurative) and 'anegager' (saying). 'Mih-slah-wee Ah-neh-gah-gehr'.",
        imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=505&auto=format&fit=crop",
        audioText: "Mislawi anegager. Proverb."
      },
      {
        fidel: "ጥበብ",
        english: "Tibeb",
        meaning: "Wisdom / Art / Skill",
        context: "The deep 'ጥበብ' of farmers allows them to predict rain seasons using bird wing configurations.",
        tutorTip: "Double glottal sound: 'T'ih-behb'. Speaks of high intelligence and artistry.",
        imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=505&auto=format&fit=crop",
        audioText: "Tibeb. Wisdom."
      },
      {
        fidel: "ተረት",
        english: "Teret",
        meaning: "Folktale / Story / Legend",
        context: "Grandmothers recount an amusing 'ተረት' about the lazy hyena and the smart donkey.",
        tutorTip: "Quick syllables: 'Teh-reht'. Connects to bedtime storytelling loops.",
        imageUrl: "https://images.unsplash.com/photo-1544085311-11a028465b03?w=505&auto=format&fit=crop",
        audioText: "Teret. Folktale."
      },
      {
        fidel: "አንድነት",
        english: "Andinet",
        meaning: "Unity / Oneness / Alliance",
        context: "The famous saying: 'ድር ቢያብር አንበሳ ያስር' reflects the power of 'አንድነት'.",
        tutorTip: "Derived from 'And' (one): 'Ahn-dih-neht'. Speaks of joint strength.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Andinet. Unity."
      },
      {
        fidel: "ትምህርት",
        english: "Timihirt",
        meaning: "Lesson / Study / Message",
        context: "Every historical parable has a deep hidden moral 'ትምህርት' inside its text.",
        tutorTip: "Noun denoting instruction: 'Tih-mih-hrt'. Soft t.",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=505&auto=format&fit=crop",
        audioText: "Timihirt. Lesson."
      }
    ],
    exercises: [
      {
        amharic: "አንድነት ኃይል ነው ፤ ይህ ትልቅ የጥበብ ምሳሌ ነው።",
        transliteration: "Andinet hayl new, yih tilik ye-tibeb misale new.",
        english: "Unity is power; this is a great example of wisdom.",
        tip: "Form a secure double-locked wrist circle expressing unity!"
      },
      {
        amharic: "አያታችን የተረት ትምህርት በምሳሌያዊ አነጋገር ይነግሩናል ።",
        transliteration: "Ayatachin ye-teret timihirt be-mislawi anegager yiseral.",
        english: "Our grandfather tells us the moral lessons of folktales using proverbs.",
        tip: "Mime stroking a long wise beard while pointing upward!"
      }
    ],
    dialogue: {
      heading: "💬 De-coding Traditional Proverbs",
      scenario: "Yared translates the proverb regarding unity to Sarah using advanced terms.",
      roles: [
        {
          character: "Yared",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሳራ ፤ 'ድር ቢያብር አንበሳ ያስር' የሚለው ምሳሌያዊ አነጋገር ትርጉሙ ምንድነው?",
          transliteration: "Sarah, 'dir biyabir anbessa yasir' yemilow mislawi anegager tirgumu mindnew?",
          english: "Sarah, what is the meaning of the proverb: 'If threads unite, they can tie a lion'?"
        },
        {
          character: "Sarah",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "ምክንያቱ ጥበብ ነው ፤ አንድነት ካለን ማንኛውንም ትልቅ ችግር መፍትሔ መስጠት እንችላለን።",
          transliteration: "Mikniyatu tibeb new; andinet kalen manignawnim tilik chiggir meftehe mestet enichilalen.",
          english: "The reason is wisdom; if we possess unity, we can provide a solution to any grand problem."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Sages of the Blue Nile Valley",
      passageAmharic: "በትናንትናው እቅድ መምህር በለጡ ለክፍላችን አዳዲስ ምሳሌያዊ አነጋገር አስተማሩ። እሳቸው 'የአሮጌዎች ጥበብ ሁልጊዜ ጠቃሚ ነው ፤ በአንድነት በበጎ ፈቃድ ከሰራን ውጤታማ እንሆናለን' አሉ። ሳምሶንም ‘ድር ቢያብር አንበሳ ያስር የሚለው ተረት የእውነት ትምህርት አለው’ ብሎ በጥብቅ ያምናል። ክፍላችንም ይህንን መልካም ሀሳብ ተቀብሎ የዕለት ተግባሩን በጋራ ለመስራት ወሰነ። ወላጆቻችን የታሪካችን ዋነኛ መሪዎች በመሆናቸው በታላቅ ኩራት እናመሰግናቸዋለን። ባህላችን የእውቀትና የሰላም ትልቅ ቅርስ ነው።",
      passageTransliteration: "Be tinantnaw ekid memhir Beletu le kiflachin adadis mislawi anegager astemaru. Esachew 'ye-arogewoch tibeb hulgize teqami new; be-andinet be-bego feqad keseran witetama enhonalen' alu. Samson-im 'dir biyabir anbessa yasir yemilow teret ye-ewnet timihirt alew' bilo betibq yamnal. Kiflachinim yihinni melkam hasab teqebelo ye-elet tegbarun be-gara lemesrat wesene. Welajochachin ye-tarikachin wanenya merioch bemehonachew be-talak kurat enamesginachewalen. Bahilachin ye-ewqet-ina ye-selam tilik qirts new.",
      passageEnglish: "In yesterday's schedule, Teacher Beletu taught our classroom new proverbs. He stated: 'The wisdom of elders is always useful; if we work in unity with goodwill, we will be highly successful'. Samson strongly believes: 'The folktale about thread unity tying a lion possesses an authentic message'. Our classroom accepted this pleasant idea and resolved to execute their daily tasks together. Because our parents are the primary guides of our history, we thank them with grand pride. Our culture is an immense heritage of knowledge and peace.",
      tutorTip: "Dwell on linguistic mechanics of metaphor and allegory."
    },
    writing: {
      heading: "✍️ Philosophical Letters Studio",
      instructions: "Practice tracing the wisdom letters ጥ (Ti) and በ (Be).",
      lettersToPractice: [
        {
          letter: "ጥ",
          phonetic: "Ti",
          steps: ["Forked top start with loop", "Vertical stem connector", "Base horizontal base"]
        },
        {
          letter: "በ",
          phonetic: "Be",
          steps: ["Vertical left pillar with loop", "Horizontal bridge", "Right loop matching base support"]
        }
      ],
      wordChallenge: "ጥበብ"
    },
    homework: [
      "Ask parents to tell you an Ethiopian proverb and write down its meaning in Amharic script."
    ],
    submissionTip: "Upload a recording reciting the proverb: 'አንድነት ኃይል ነው'! 🗣️",
    parentActivities: [
      "Engage child-parent dialogue analyzing ancient proverbs and charting modern equivalents in Amharic."
    ],
    tutorPacing: [
      "10 mins: Idiom matching speed test.",
      "25 mins: Reading translation and metaphor check.",
      "15 mins: Interactive puzzle builder games."
    ],
    tutorTroubleshooting: [
      "Patience is needed to help children master the sharp glottal pronunciation of ጥበብ (Tibeb)."
    ],
    quiz: [
      {
        questionText: "What does 'ምሳሌያዊ አነጋገር' translate to?",
        options: ["Pencil case", "Proverb / Saying", "Banana chips", "Distant country"],
        correctAnswerIndex: 1,
        explanation: "'ምሳሌያዊ አነጋገር' yields a figurative saying or proverb."
      },
      {
        questionText: "Select correct word for 'Wisdom':",
        options: ["ጥበብ", "ተረት", "ምክንያት", "መፍትሔ"],
        correctAnswerIndex: 0,
        explanation: "'ጥበብ' (Tibeb) is wisdom."
      },
      {
        questionText: "What does 'ተረት' signify?",
        options: ["Folktale / Story", "Water basin", "Iron spoon", "Yellow hat"],
        correctAnswerIndex: 0,
        explanation: "'ተረት' represents folktale or bedtime legend."
      },
      {
        questionText: "Which word represents 'Unity'?",
        options: ["አንድነት", "ድርሻ", "ስልክ", "ችግር"],
        correctAnswerIndex: 0,
        explanation: "'አንድነት' translates to unity."
      }
    ],
    nextLessonTitle: "Narrating Personal Experiences"
  },

  // --- LESSON 13: Narrating Personal Experiences ---
  {
    level: 4,
    lessonNumber: 13,
    geezNumber: "፲፫",
    topic: "Narrating Personal Experiences",
    theme: "Personal Narratives (ታሪኮች)",
    phase: "Level 4 Stage 2: Advanced Culture & Narrative",
    subheading: "Learn to sequence past life events, introduce stories using 'ቀደም ሲል' (previously), and frame challenges.",
    imageUrl: "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Narrate historic personal timelines using 'ተሞክሮ' (experience).",
      "Explain transitional linking words: 'ቀደም ሲል' (previously) and 'በመጨረሻ' (finally).",
      "Express spatial and sequence markers beautifully.",
      "Conduct simulated camp fire personal logs."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ተሞክሮ",
        english: "Temokro",
        meaning: "Experience / Personal trials",
        context: "Sharing your travel 'ተሞክሮ' with classmates improves cross-cultural appreciation.",
        tutorTip: "A useful active noun: 'Teh-moh-kroh'. Represents personal life log.",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=505&auto=format&fit=crop",
        audioText: "Temokro. Experience."
      },
      {
        fidel: "ቀደም ሲል",
        english: "Qedem Sil",
        meaning: "Previously / Earlier",
        context: "Using transition indicators to sequence events: 'ቀደም ሲል ወደ ትምህርት ቤት ሄድኩ' (Previously I went to school).",
        tutorTip: "A temporal conjunction marker: 'Qeh-dehm Seehl'. Soft d.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Qedem sil. Previously."
      },
      {
        fidel: "በመጨረሻ",
        english: "Bemecheresha",
        meaning: "Finally / Ultimately",
        context: "After hours of hard work, 'በመጨረሻ' we arrived at our destination.",
        tutorTip: "Denotes final outcomes: 'Beh-meh-cheh-reh-shah'. Heavy ch.",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=505&auto=format&fit=crop",
        audioText: "Bemecheresha. Finally."
      },
      {
        fidel: "ክስተት",
        english: "Kistet",
        meaning: "Event / Occurence",
        context: "The beautiful seasonal festival represented an unforgettable 'ክስተት' for kids.",
        tutorTip: "Noun of event: 'Kihs-teht'.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Kistet. Event."
      },
      {
        fidel: "መልስ",
        english: "Mels",
        meaning: "Answer / Reply / Return",
        context: "Providing a prompt polite 'መልስ' when elders call you from across house halls.",
        tutorTip: "Crisp single syllable noun: 'Mehls'. Derived from return.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=505&auto=format&fit=crop",
        audioText: "Mels. Answer."
      }
    ],
    exercises: [
      {
        amharic: "ቀደም ሲል ታላቅ ችግር አጋጥሞኝ ነበር ፤ በመጨረሻ ግን መፍትሔ አገኘሁ።",
        transliteration: "Qedem sil talak chiggir agate mogn neber; bemecheresha gin meftehe agenyehu.",
        english: "Previously I encountered a major problem; but finally I discovered a solution.",
        tip: "Point backward for previously, then stretch hands open for finally!"
      },
      {
        amharic: "የእኔ የግል ተሞክሮ ለማህበረሰቡ ጠቃሚ ትምህርት ይሰጣል ።",
        transliteration: "Yene ye-gil temokro le-mahberesebu teqami timihirt yiseral.",
        english: "My personal experience provides a useful lesson to the community.",
        tip: "Place hands over chest showing deep self-expression!"
      }
    ],
    dialogue: {
      heading: "💬 Timeline Reviews",
      scenario: "Sarah and Helen exchange funny travel accounts from their school trips.",
      roles: [
        {
          character: "Sarah",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "ሄለን ፤ የባህል ሙዚየም የጉብኝት ተሞክሮሽ እንዴት ነበረ? ትልቅ ክስተት ነው?",
          transliteration: "Helen, ye-bahil museum yegubgnyt temokrosh endet nebere? Tilik kistet new?",
          english: "Helen, how was your cultural museum visit experience? Was it a major event?"
        },
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አዎ ሳራ ፤ ቀደም ሲል ባቡሩ ዘግይቶ ነበር ፤ በመጨረሻ ግን በሰላም ደረስን። ድንቅ ታሪክ አለው!",
          transliteration: "Awo Sarah, qedem sil baburu zegyito neber; bemecheresha gin be-selam deresin. Dinq tarik alew!",
          english: "Yes Sarah, previously the train was delayed; but finally we arrived in peace. It has an amazing history!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Journey of the Scribe",
      passageAmharic: "በትናንትናው እቅድ ዮናስ የግል ተሞክሮ ታሪኩን ለክፍሉ አጋራ። እሱ ‘ቀደም ሲል አዲስ ቃላትን ማጥናት ለእኔ አስቸጋሪ ችግር ነበር’ አለ። ነገር ግን በትዕግስት ታማኝነት ተምሳሌት የሆኑትን ወላጆቹን በመከተል በመጨረሻ በቋንቋው በቅልጥፍና መናገር ቻለ። ክፍላችንም ይህን ድንቅ ክስተት ሰምቶ ትልቅ ኩራት አደረባቸው። መምህራቸውም ‘የግል ተሞክሮዎችን በክፍት ሀሳብ መናገር ጠቃሚ እውቀት ነው’ የሚል መልካም ምክር ሰጡ። ሁሉም ተማሪዎች የራሳቸውን ውጤታማ መልስ ለመስጠት ወሰኑ።",
      passageTransliteration: "Be tinantnaw ekid Yonas ye gil temokro tarikun le kifilu agara. Esu 'qedem sil adis qalatin matnat le-ene aschegari chiggir neber' ale. Neger gin be-tigist tamagninet temsalet yehonutin welajochun be-meketel bemecheresha be-quanquaw be-qiltifina menager chale. Kiflachinim yihin dinq kistet semito tilik kurat aderubachew. Memhirachewm 'ye-gil temokrowochin be-kift hasab menager teqami ewqet new' yemil melkam mikir setu. Hullum temarioch ye-rashachewn witetama mels lemestet wesenu.",
      passageEnglish: "In yesterday's schedule, Yonas shared his personal experience story with the classroom. He stated: 'Previously, studying new vocabularies represented a difficult problem for me'. However, with patience following his parents, who are role models of loyalty, he finally succeeded in speaking the language with total fluency. Our classroom heard this great event and felt massive pride. Their teacher shared good counsel: 'Speaking personal experiences with an open mind is useful knowledge'. All students resolved to provide their own successful answer.",
      tutorTip: "Dwell on transitional grammar words to build seamless narrative capacity."
    },
    writing: {
      heading: "✍️ Narrative Letters Studio",
      instructions: "Practice tracing the transition letters ቀ (Qe) and መጨ (Me).",
      lettersToPractice: [
        {
          letter: "ቀ",
          phonetic: "Qe",
          steps: ["Top circular loop segment", "Center vertical spine segment", "Right downward foot curl"]
        },
        {
          letter: "ጫ",
          phonetic: "Cha",
          steps: ["Vertical start left", "Lower horizontal bridge base", "Right downward leg with crown dash"]
        }
      ],
      wordChallenge: "በመጨረሻ"
    },
    homework: [
      "Detail your afternoon schedule using 'Qedem sil' and 'Bemecheresha' in Amharic script."
    ],
    submissionTip: "Record a short 30-second speech narrating your weekend tasks using logical transitions! ⏳",
    parentActivities: [
      "Let kids recount past family beach vacations, sequencing with Amharic timeline transition terms."
    ],
    tutorPacing: [
      "10 mins: Sequencing game speed runs.",
      "25 mins: Text translations and vocabulary checks.",
      "15 mins: Complete spelling bubble assembler."
    ],
    tutorTroubleshooting: [
      "Help children distinguish the heavy ch in 'Bemecheresha'."
    ],
    quiz: [
      {
        questionText: "What does 'ተሞክሮ' mean?",
        options: ["Pencil case", "Experience / Trial", "A red wagon", "A fast train"],
        correctAnswerIndex: 1,
        explanation: "'ተሞክሮ' translates to experience."
      },
      {
        questionText: "Select correct transition for 'Previously':",
        options: ["ቀደም ሲል", "በመጨረሻ", "ጠቃሚ", "አደገኛ"],
        correctAnswerIndex: 0,
        explanation: "'ቀደም ሲል' represents previously / earlier."
      },
      {
        questionText: "What is 'በመጨረሻ'?",
        options: ["Finally / Ultimately", "First step", "Under the tree", "Yesterday morning"],
        correctAnswerIndex: 0,
        explanation: "'በመጨረሻ' represents finally."
      },
      {
        questionText: "What does 'ክስተት' translate to?",
        options: ["Problem", "Event / Occurence", "Hospital", "School book"],
        correctAnswerIndex: 1,
        explanation: "'ክስተት' represents an event."
      }
    ],
    nextLessonTitle: "Debates & Discussions"
  },

  // --- LESSON 14: Debates & Discussions ---
  {
    level: 4,
    lessonNumber: 14,
    geezNumber: "፲፬",
    topic: "Debates & Discussions",
    theme: "Constructive Debates (ክርክር)",
    phase: "Level 4 Stage 2: Advanced Culture & Narrative",
    subheading: "Conduct debates regarding screen usage, uniform rules, define points of arguments, and use formal rebuttal clauses.",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Conduct polite debates using 'ክርክር' (debate/discussion).",
      "Explain logic arguments and perspectives: 'አመለካከት' (viewpoint) and 'ማስረጃ' (evidence).",
      "Structure compound transition linkages elegantly.",
      "Deliver a 1-minute persuasive opening argument."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ክርክር",
        english: "Krikir",
        meaning: "Debate / Argument / Discussion",
        context: "The scholastic 'ክርክር' about space exploration parameters was highly illuminating.",
        tutorTip: "Double repetitive consonants: 'Krih-kihr'. Frame as respectful exchange.",
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=505&auto=format&fit=crop",
        audioText: "Krikir. Debate."
      },
      {
        fidel: "አመለካከት",
        english: "Amelekaket",
        meaning: "Viewpoint / Perspective / Attitude",
        context: "Every team member has a unique 'አመለካከት' regarding local environmental choices.",
        tutorTip: "Extended noun system: 'Ah-meh-leh-kah-keht'. Very expressive.",
        imageUrl: "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?w=505&auto=format&fit=crop",
        audioText: "Amelekaket. Viewpoint."
      },
      {
        fidel: "ማስረጃ",
        english: "Masreja",
        meaning: "Evidence / Proof / Document",
        context: "Providing concrete statistical 'ማስረጃ' confirms your research claims during dialogues.",
        tutorTip: "Nasal sibilant center: 'Mahs-reh-jah'. Connect with truth.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=505&auto=format&fit=crop",
        audioText: "Masreja. Evidence."
      },
      {
        fidel: "መቃወም",
        english: "Meqawem",
        meaning: "To oppose / Object",
        context: "Politely trying to 'መቃወም' views that lack valid research references.",
        tutorTip: "Strong active infinitive: 'Meh-qah-wehm'. Soft q.",
        imageUrl: "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?w=505&auto=format&fit=crop",
        audioText: "Meqawem. To oppose."
      },
      {
        fidel: "ማሳመን",
        english: "Masamen",
        meaning: "To convince / Persuade",
        context: "Using clean logic and calm voice modulations to 'ማሳመን' debate councils.",
        tutorTip: "Active causative verb: 'Mah-sah-mehn'. Accent on m.",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=505&auto=format&fit=crop",
        audioText: "Masamen. To convince."
      }
    ],
    exercises: [
      {
        amharic: "እኔ በክርክሩ ውስጥ ጠንካራ ማስረጃ ማቅረብ እፈልጋለሁ።",
        transliteration: "Ene be-krikiru wust tenkara masreja maqreb efeligalehu.",
        english: "I want to present strong evidence in the debate.",
        tip: "Mime placing a sturdy binder on a desk confidently!"
      },
      {
        amharic: "የእርስዎ አመለካከት ጥሩ ቢሆንም ፥ ማስረጃው ግን አላሳመነኝም።",
        transliteration: "Yerswo amelekaket tiru bihonim, masrejaw gin alasamenegn.",
        english: "Even though your viewpoint is good, the evidence has not convinced me.",
        tip: "Gently wave hand sideways indicating soft doubt!"
      }
    ],
    dialogue: {
      heading: "💬 High-Stakes Rebuttals",
      scenario: "Sarah defends school uniform regulations against Dawit's objections.",
      roles: [
        {
          character: "Sarah",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "ዳዊት ፤ የእኔ አመለካከት ግልጽ ነው ፤ የትምህርት ቤት ዩኒፎርም አንድነት ይፈጥራል የሚል ጠንካራ ማስረጃ አለኝ።",
          transliteration: "Dawit, yene amelekaket gilts new; ye-timihirt bet uniform andinet yifetral yemil tenkara masreja alegn.",
          english: "Dawit, my viewpoint is clear; I have strong evidence that school uniforms create unity."
        },
        {
          character: "Dawit",
          avatar: "👦",
          bubbleSide: "right",
          amharic: "ይህንን ሀሳብ መቃወም እፈልጋለሁ ፤ ምክንያቱም ዩኒፎርም ውድ ነው ፤ በክርክሩ እኔን ለማሳመን ሌላ እቅድ ብትሞክሪ ይሻላል።",
          transliteration: "Yihinni hasab meqawem efeligalehu; mikniyatu uniform wid new; be-krikiru enen lemasamen lela ekid bitmokri yishalal.",
          english: "I want to oppose this idea; because uniforms are expensive; to convince me in the debate, if you try another plan, it is better."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Sages of the Golden Assembly",
      passageAmharic: "በትናንትናው እቅድ በፓርላማ አዳራሽ ውስጥ ታላቅ የክርክር ክስተት ተካሄደ። ጉዳዩም ‘ለልጆች ዘመናዊ ቴክኖሎጂ ጠቃሚ ነው ወይስ አደገኛ?’ የሚል ነበረ። ሳምሶን ‘በእኔ አመለካከት ቴክኖሎጂ ውጤታማ እውቀትን ይሰጣል’ የሚል ማስረጃ አቀረበ። ሊዲያ ግን ይህንን በመቃወም ‘ስልክ ላይ ብዙ ሰዓት ማጥፋት አደገኛ ነው’ ብላ ተከራከረች። ተማሪዎቹም የሁለቱንም ብልህ ሀሳብ ሰምተው በጋራ ለመረዳዳት ሙሉ መስማማት ላይ ደረሱ። መምህራቸውም ‘መልካም ክርክር ሌሎችን ለማሳመንና መፍትሔ ለመፈለግ ትልቅ ጥበብ ነው’ የሚል ምክር አጋሩ።",
      passageTransliteration: "Be tinantnaw ekid be parliament adarash wust talak ye-krikir kistet tekahede. Gudayu-m 'le-lijoch zemenawi technology teqami new weys adegeña?' yemil nebere. Samson 'be-ene amelekaket technology witetama ewqet-in yiseral' yemil masreja aqerebe. Lydia gin yihinni be-meqawem 'silk lay bizu se'at matfat adegeña new' bila tekerakerech. Temariochu-m ye-huletunim bilih hasab semitew be-gara lemeredadat mulu mesmamat lay deresu. Memhirachewm 'melkam krikir le-lelochin lemasamen ena meftehe lemefeleg talak tibeb new' yemil mikir agaru.",
      passageEnglish: "In yesterday's schedule, a grand debate event occurred inside the parliament hall. The issue was: 'Is modern technology useful for children or dangerous?'. Samson presented evidence stating: 'In my viewpoint, technology provides successful knowledge'. But Lydia opposed this, arguing: 'Wasting too much time on phones is dangerous'. The students heard both of their wise opinions and arrived at full consensus to help one another. Their mentor shared advice: 'Good debate is a great art to persuade others and seek solutions'.",
      tutorTip: "Dwell on linguistic decorum and formal transition rules inside academic debates."
    },
    writing: {
      heading: "✍️ Argument Letters Studio",
      instructions: "Practice tracing the debate letters ክር (Kr) and መቃ (Me-Qa).",
      lettersToPractice: [
        {
          letter: "ክ",
          phonetic: "Ki",
          steps: ["Vertical start left", "Horizontal bridge", "Right wing indicator"]
        },
        {
          letter: "ቅ",
          phonetic: "Qi",
          steps: ["Closed loop top with line segment modifier", "Base horizontal baseline anchor", "Right downward curl"]
        }
      ],
      wordChallenge: "ክርክር"
    },
    homework: [
      "Select a debate issue and write down your 'Amelekaket' in Amharic script."
    ],
    submissionTip: "Record a 30-second rebuttal using 'Meqawem' or 'Masamen' rules! 🗣️",
    parentActivities: [
      "Conduct mock kitchen table debates concerning favorite icecreams, demanding Amharic logic evidences."
    ],
    tutorPacing: [
      "10 mins: Debate warmups speaking prompts.",
      "25 mins: Reading comprehension and vocabulary drilling.",
      "15 mins: Interactive matching pair puzzle tests."
    ],
    tutorTroubleshooting: [
      "Help students identify that 'Meqawem' is a respectful verb when modulated calmly."
    ],
    quiz: [
      {
        questionText: "What does 'ክርክር' represent?",
        options: ["Pencil sharpener", "Debate / Argument", "A heavy truck", "Distant farm"],
        correctAnswerIndex: 1,
        explanation: "'ክርክር' yields debate or constructive discussion."
      },
      {
        questionText: "Which word represents 'Viewpoint'?",
        options: ["አመለካከት", "ማስረጃ", "መፍትሔ", "ችግር"],
        correctAnswerIndex: 0,
        explanation: "'አመለካከት' (Amelekaket) yields viewpoint."
      },
      {
        questionText: "What does 'ማስረጃ' mean?",
        options: ["Evidence / Proof", "Swimming pool", "A golden chair", "School notebook"],
        correctAnswerIndex: 0,
        explanation: "'ማስረጃ' equates to evidence or documentation."
      },
      {
        questionText: "What is 'ማሳመን'?",
        options: ["To convince / Persuade", "To sleep late", "Eating cabbage", "To run fast"],
        correctAnswerIndex: 0,
        explanation: "'ማሳመን' represents the action to convince."
      }
    ],
    nextLessonTitle: "Describing Challenges & Success"
  },

  // --- LESSON 15: Describing Challenges & Success ---
  {
    level: 4,
    lessonNumber: 15,
    geezNumber: "፲፭",
    topic: "Describing Challenges & Success",
    theme: "Road to Success (ተግዳሮት)",
    phase: "Level 4 Stage 2: Advanced Culture & Narrative",
    subheading: "Recount athletic, academic, lifestyle challenges, represent them using 'ተግዳሮት', and celebrate 'ስኬት' (success).",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Explain developmental hurdles: 'ተግዳሮት' (challenge).",
      "Express victory and success vocabulary: 'ስኬት' (success) and 'ትጋት' (diligence).",
      "Formulate active encouraging sentences cleanly.",
      "Recount sport championship personal narratives."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ተግዳሮት",
        english: "Tegdarot",
        meaning: "Challenge / Obstacle / Roadblock",
        context: "Training for the national marathon event represents a rigorous physical 'ተግዳሮት'.",
        tutorTip: "A classical formal noun: 'Tehg-dah-roht'. Implies growth.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Tegdarot. Challenge."
      },
      {
        fidel: "ስኬት",
        english: "Siket",
        meaning: "Success / Achievement / Victory",
        context: "Graduating university top of class crowns your years of study with glorious 'ስኬት'.",
        tutorTip: "Extended vocal loop on s: 'See-keht'. The sound of target achieved.",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=505&auto=format&fit=crop",
        audioText: "Siket. Success."
      },
      {
        fidel: "ትጋት",
        english: "Tigat",
        meaning: "Diligence / Industry / Devotion",
        context: "Practicing Amharic characters every evening displays magnificent personal 'ትጋት'.",
        tutorTip: "Sharp, breathy consonants: 'Tih-gaat'. Connect with perseverance.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=505&auto=format&fit=crop",
        audioText: "Tigat. Diligence."
      },
      {
        fidel: "ማለፍ",
        english: "Malef",
        meaning: "To pass / Overcome / Exceed",
        context: "With clean teamwork, students can easily 'ማለፍ' any difficult study blocks.",
        tutorTip: "Active motion infinitive: 'Mah-lehf'. Reflects movement.",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=505&auto=format&fit=crop",
        audioText: "Malef. To pass."
      },
      {
        fidel: "ኩሩ",
        english: "Kuru",
        meaning: "Proud / Dignified",
        context: "The 'ኩሩ' athlete stood tall in the national arena wearing green, yellow, and red ribbons.",
        tutorTip: "Short, rich adjective: 'Koo-roo'. Shows structural self-respect.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Kuru. Proud."
      }
    ],
    exercises: [
      {
        amharic: "እኛ በትጋት በመስራት ተግዳሮቶችን በሙሉ ማለፍ እንችላለን።",
        transliteration: "Egna be-tigat bemesrat tegdarotochen be-mulu malef enichilalen.",
        english: "We can overcome all challenges completely by working with diligence.",
        tip: "Mime climbing a steep mountain face with fierce determination!"
      },
      {
        amharic: "የእርሷ ታላቅ ስኬት ቤተሰቧን ኩሩ አደረገ።",
        transliteration: "Yersua talak siket betesebuan kuru aderege.",
        english: "Her magnificent success made her family proud.",
        tip: "Beat your chest lightly with an elegant proud posture!"
      }
    ],
    dialogue: {
      heading: "💬 Reaching Milestones",
      scenario: "Sarah and Brook celebrate the launch of their community Amharic software app.",
      roles: [
        {
          character: "Sarah",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "ብሩክ ፤ የእኛ ሶፍትዌር ስኬት ታላቅ ክስተት ነው ፤ መሐንዲስ መሆን አስቸጋሪ ተግዳሮት ነበር።",
          transliteration: "Brook, yene software siket talak kistet new, mehandis mehon aschegari tegdarot neber.",
          english: "Brook, our software success is a grand milestone; becoming an engineer was a difficult obstacle."
        },
        {
          character: "Brook",
          avatar: "👨",
          bubbleSide: "right",
          amharic: "ትክክለኛ ነው ሳራ ፤ ነገር ግን በትጋት በመመዘን ተግዳሮቱን ማለፍ ቻልን። አያቶቻችን በእኛ ኩሩ ናቸው!",
          transliteration: "Tikkikl new Sarah, neger gin be-tigat be-memezen tegdarotun malef chalin. Ayatachachin be-egna kuru nachew!",
          english: "Exactly Sarah, but by assessing with diligence we succeeded in passing the roadblock. Our grandparents are proud of us!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Scribe of Lalibela Heights",
      passageAmharic: "በትናንትናው እቅድ ሔኖክ በትምህርት ቤቱ የስፖርት ውድድር ታላቅ ስኬት አስመዘገበ። እሱ ‘ከፍተኛ ተግዳሮት ቢኖርም ፥ በትጋት በማሰልጠን ማለፍ ይቻላል’ ብሎ በጥብቅ ያምናል። ክፍላችንም የእርሱን ውጤታማ ተሞክሮ ሰምቶ ትልቅ ኩራት አደረባቸው። መምህሯም ‘እውነተኛ ስኬት በጥረትና በታማኝነት መስራት ነው’ የሚል መልካም ምክር ሰጡ። ሔኖክ በመጨረሻ በጉባኤው ፊት ሜዳልያ ሲቀበል ኩሩ ባለ ታሪክ ሆነ። ይህ ድንቅ ስኬት ለማህበረሰባችን አርአያ የሚሆን ተምሳሌት ነው።",
      passageTransliteration: "Be tinantnaw ekid Henok be timihirt betu ye-sport wididir talak siket asmezegebe. Esu 'kefteña tegdarot binorim, be-tigat bemaseltin malef yichalal' bilo betibq yamnal. Kiflachinim ye-ersun witetama temokro semito tilik kurat aderubachew. Memhiruam 'ewnetegna siket be-tiretena be-tamagninet mesrat new' yemil melkam mikir setu. Henok bemecheresha be-gubae fit medalya siqebele kuru bale tarik hone. Yih dinq siket le-mahberesebachin ar'aya yemihon temsalet new.",
      passageEnglish: "In yesterday's schedule, Henok registered a grand success inside the school athletic championships. He strongly believes: 'Even though there exists a high obstacle, passing is possible by training with diligence'. Our classroom heard his successful experience and felt significant pride. Their teacher shared good counsel: 'True success is working with personal effort and integrity'. Henok, finally receiving a medal before the assembly, became a proud historical achiever. This magnificent victory is an exemplary role model for our community.",
      tutorTip: "Discuss growth mentality using Amharic motivational phrases."
    },
    writing: {
      heading: "✍️ Victorious Letters Studio",
      instructions: "Practice tracing the triumph letters ስኬ (Si-Ke) and ትጋ (Ti-Ga).",
      lettersToPractice: [
        {
          letter: "ስ",
          phonetic: "Si",
          steps: ["Forked start", "Mid horizontal support beam", "Lower right leg"]
        },
        {
          letter: "ኬ",
          phonetic: "Ke",
          steps: ["Pillar with upper slanted line segment", "Central horizontal drop banner", "Lower stabilizing leg with crown slash"]
        }
      ],
      wordChallenge: "ተግዳሮት"
    },
    homework: [
      "Detail an athletic or academic obstacle you solved and match it with 'Siket' in Amharic script."
    ],
    submissionTip: "Upload a photo holding a trophy or study book with 'ስኬት' label! 🏆",
    parentActivities: [
      "Engage children in family discussions reviewing historical challenges parents overcame utilizing 'Tigat'."
    ],
    tutorPacing: [
      "10 mins: Motivational milestones icebreaker.",
      "25 mins: Reading translation and vocabulary recitation.",
      "15 mins: Interactive sound seekers games."
    ],
    tutorTroubleshooting: [
      "Confirm students differentiate between physical 'Malef' (to pass) and 'Malef' (to cross boundaries)."
    ],
    quiz: [
      {
        questionText: "What does 'ተግዳሮት' mean?",
        options: ["Pencil case", "Challenge / Obstacle", "Fresh fruit", "A yellow school bus"],
        correctAnswerIndex: 1,
        explanation: "'ተግዳሮት' represents challenge or roadblock."
      },
      {
        questionText: "Which word represents 'Success'?",
        options: ["ችግር", "ስኬት", "ትጋት", "ውሳኔ"],
        correctAnswerIndex: 1,
        explanation: "'ስኬት' (Siket) yields success."
      },
      {
        questionText: "What does 'ትጋት' translate to?",
        options: ["Diligence / Devotion", "Soft pillow", "Bicycle wheel", "Yesterday morning"],
        correctAnswerIndex: 0,
        explanation: "'ትጋት' signifies diligence or industry."
      },
      {
        questionText: "What is 'ማለፍ'?",
        options: ["To pass / Overcome", "To sleep late", "To play cards", "To drink soup"],
        correctAnswerIndex: 0,
        explanation: "'ማለፍ' yields the action to pass or overcome."
      }
    ],
    nextLessonTitle: "Comparing Cultures"
  },

  // --- LESSON 16: Comparing Cultures ---
  {
    level: 4,
    lessonNumber: 16,
    geezNumber: "፲፮",
    topic: "Comparing Cultures",
    theme: "Global Heritage (ማወዳደር)",
    phase: "Level 4 Stage 2: Advanced Culture & Narrative",
    subheading: "Contrast architectural milestones of diverse cultures, trace global styles, and appreciate heritage identity.",
    imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Contrast national global habits: 'ማወዳደር' (to compare).",
      "Identify comparison qualifiers: 'ልዩነት' (difference) and 'ተመሳሳይ' (similar).",
      "Formulate comparative clauses cleanly.",
      "Demonstrate comprehensive geographic understandings."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ማወዳደር",
        english: "Mawodader",
        meaning: "To compare / Contrast",
        context: "To 'ማወዳደር' traditional Ethiopian holidays with Western seasonal events helps appreciate diverse beauty.",
        tutorTip: "An active infinitive class: 'Mah-woh-dah-dehr'. Focus on d.",
        imageUrl: "https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?w=505&auto=format&fit=crop",
        audioText: "Mawodader. To compare."
      },
      {
        fidel: "ልዩነት",
        english: "Liyunet",
        meaning: "Difference / Diversity / Contrast",
        context: "Understanding the unique 'ልዩነት' of languages expands a student's cognitive capacities.",
        tutorTip: "Stress on y: 'Lih-yoo-neht'. Reflects variation.",
        imageUrl: "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?w=505&auto=format&fit=crop",
        audioText: "Liyunet. Difference."
      },
      {
        fidel: "ተመሳሳይ",
        english: "Temesasay",
        meaning: "Similar / Alike / Equivalent",
        context: "Even though from different oceans, the historical towers had a 'ተመሳሳይ' building plan.",
        tutorTip: "Repetitive sibilant vowels: 'Teh-mah-sah-sah-yee'.",
        imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=505&auto=format&fit=crop",
        audioText: "Temesasay. Similar."
      },
      {
        fidel: "ልምድ",
        english: "Limd",
        meaning: "Experience / Practice / Custom",
        context: "Sharing traditional holiday 'ልምድ' builds international student respect.",
        tutorTip: "Standard single syllable noun: 'Lihmd'. Holds consonant cluster.",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=505&auto=format&fit=crop",
        audioText: "Limd. Practice."
      },
      {
        fidel: "ዓለም",
        english: "Alem",
        meaning: "World / Earth / Globe",
        context: "Bilingual diaspora students possess tools to connect with the entire global 'ዓለም'.",
        tutorTip: "Glottal start format: 'Ah-lehm'. Traditional term for world.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Alem. World."
      }
    ],
    exercises: [
      {
        amharic: "እኛ በተለያዩ ባህሎች መካከል ያለውን ልዩነት እና ማወዳደር እንማራለን።",
        transliteration: "Egna be-telayayu bahiloch mekalal yalewun liyunet ena mawodader ennmaralen.",
        english: "We learn about the contrasts and comparing between different cultures.",
        tip: "Form balancing scales gestures with both palms calmly!"
      },
      {
        amharic: "የእኛ ታሪካዊ ቅርስ እና ባህላዊ ልምድ ተመሳሳይ እሴት አላቸው።",
        transliteration: "Yene tarikawi qirts ena bahilawi limd temesasay eset alachew.",
        english: "Our historic heritage and cultural custom possess equivalent values.",
        tip: "Align pointers parallel expressing equivalence!"
      }
    ],
    dialogue: {
      heading: "💬 Cultural Symmetries",
      scenario: "Sarah and Helen compare standard Western holiday schedules with Ethiopian coffee ceremonies.",
      roles: [
        {
          character: "Sarah",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "ሄለን ፤ በእርስዎ አመለካከት በአሁንና በጥንት ዘመን ባህሎች መካከል ትልቅ ልዩነት አለ?",
          transliteration: "Helen, be-erswo amelekaket be-ahun ena be-tint zemen bahiloch mekalal tilik liyunet ale?",
          english: "Helen, in your viewpoint is there a massive difference between current and ancient cultures?"
        },
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አዎ ሳራ ፤ ግን ልዩነቱን ማወዳደር ጠቃሚ ልምድ ነው ፥ የዓለም አገሮች በባህል ተመሳሳይ ናቸው።",
          transliteration: "Awo Sarah, gin liyunetun mawodader teqami limd new, ye-alem ageroch be-bahil temesasay nachew.",
          english: "Yes Sarah, but comparing the contrast is a useful practice, the world's nations are similar in culture."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Silk Paths of Alexandria and Axum",
      passageAmharic: "በትናንትናው እቅድ መምህር በለጡ ክፍል ተማሪዎችን የዓለም ባህሎችን እንዲያወዳድሩ አዘዙ። ሁሉም ልጆች በተለያዩ አገሮች ሰንደቅ-ዓላማ ፊት ቀረቡ። ሳምሶን ‘በኢትዮጵያ ባህላዊ ልምድና በዓለም ታሪኮች መካከል አስደናቂ ተመሳሳይ እሴቶች አሉ’ የሚል ማስረጃ አቀረበ። ሊዲያ ግን ይህን በከፊል መቃወም ብትፈልግም ፥ በመጨረሻ በእያንዳንዱ ባህል መካከል ያለውን ልዩነት በታላቅ ኩራት አምና ተቀበለች። መምህራቸውም ‘ልዩነትን በመረዳዳት ማክበር ለማህበረሰባችን ጠቃሚ ጥበብ ነው’ የሚል ምክር አጋሩ። ተማሪዎቹም ይህንን መልካም ሀሳብ በልባቸው አስቀመጡ።",
      passageTransliteration: "Be tinantnaw ekid memhir Beletu kifil temariochin ye-alem bahiloc hn endiyawodadiru azeju. Hullum lijoch be-telayayu ageroch sendeq-alama fit qerebu. Samson 'be-Ethiopia bahilawi limd ena be-alem tariloch mekalal asdenaqi temesasay esetoch alu' yemil masreja aqerebe. Lydia gin yihinni be-kefil meqawem bitfelig-im, bemecheresha be-eyandandu bahil mekalal yalewun liyunet be-talak kurat amna teqebelech. Memhiruam 'liyunetun be-meredadat makber le-mahberesebachin teqami tibeb new' yemil mikir agaru. Temariochu-m yihinni melkam hasab be-libachew asqemetu.",
      passageEnglish: "In yesterday's schedule, Teacher Beletu instructed the classroom to compare World cultures. All children stood before diverse national flags. Samson presented evidence: 'There exist fascinating similar values between Ethiopian cultural custom and global chronicles'. Even though Lydia partially wished to object this, she finally proudly accepted the differences between each culture. Their mentor shared advice: 'Respecting diversity with mutual aid is a useful wisdom for our community'. The students deposited this pleasant opinion inside their hearts.",
      tutorTip: "Integrate comparative cultural diagrams to facilitate student narration."
    },
    writing: {
      heading: "✍️ Comparative Letters Studio",
      instructions: "Practice tracing the diversity letters ልዩ (Li-Yu) and ዓለ (A-Le).",
      lettersToPractice: [
        {
          letter: "ል",
          phonetic: "Li",
          steps: ["Vertical left drop", "Horizontal lower hook segment", "Right upward loop"]
        },
        {
          letter: "ዓ",
          phonetic: "A",
          steps: ["Top circular loop segment", "Mid vertical spine connector", "Right downward leg base"]
        }
      ],
      wordChallenge: "ልዩነት"
    },
    homework: [
      "Select two cultural habits and compare details using 'Temesasay' or 'Liyunet' in Amharic script."
    ],
    submissionTip: "Upload a Venn Diagram comparing Amharic food with Western options labeled in Amharic! 📂",
    parentActivities: [
      "Conduct dinner dialogues comparing parents' hometown routines with current neighborhood lifestyles."
    ],
    tutorPacing: [
      "10 mins: Contrast items guessing race.",
      "25 mins: Vocabulary reciting and reading analyses.",
      "15 mins: Complete interactive Matchmaker game."
    ],
    tutorTroubleshooting: [
      "Help students identify that 'Alem' uses the unique glottal character ዓ."
    ],
    quiz: [
      {
        questionText: "What does 'ማወዳደር' mean?",
        options: ["Pencil sharpener", "To compare / Contrast", "A fast aircraft", "Traditional honey"],
        correctAnswerIndex: 1,
        explanation: "'ማወዳደር' represents the action to compare."
      },
      {
        questionText: "Which word represents 'Difference'?",
        options: ["ልዩነት", "ተመሳሳይ", "ልምድ", "ውጤት"],
        correctAnswerIndex: 0,
        explanation: "'ልዩነት' (Liyunet) signifies difference or contrast."
      },
      {
        questionText: "What is 'ተመሳሳይ'?",
        options: ["Similar / Alike", "Dangerous", "Ugly", "Cold"],
        correctAnswerIndex: 0,
        explanation: "'ተመሳሳይ' translates to similar."
      },
      {
        questionText: "What does 'ዓለም' represent?",
        options: ["World / Globe", "Family house", "Police station", "Red shoe"],
        correctAnswerIndex: 0,
        explanation: "'ዓለም' signifies the world or globe."
      }
    ],
    nextLessonTitle: "Travel Planning"
  }
];
