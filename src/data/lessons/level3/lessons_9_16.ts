import { LessonDefinition } from "../../level1/types";

export interface Level3LessonDefinition extends LessonDefinition {
  level: number;
}

export const lessons_9_16: Level3LessonDefinition[] = [
  // --- LESSON 9: Ethiopian Holidays ---
  {
    level: 3,
    lessonNumber: 9,
    geezNumber: "፱",
    topic: "Ethiopian Holidays",
    theme: "Celebration & Heritage (የበዓላት ባህል)",
    phase: "Level 3 Stage 2: Cultural Identity",
    subheading: "Explore the colors, songs, and traditional dishes of Ethiopian holidays like Enkutatash, Genna, and Meskel!",
    imageUrl: "https://images.unsplash.com/photo-1545231027-63b3f162d20e?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Express wishes like 'እንኳን አደረሳችሁ' (Happy holiday to you all).",
      "List 3 major holiday dates and traditional foods.",
      "Identify traditional seasonal songs.",
      "Roleplay family holiday dinners."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "በዓል",
        english: "Be'al",
        meaning: "Holiday / Festive day",
        context: "A glorious day filled with sweet food, beautiful prayers, and bright sunshine: 'በዓል'.",
        tutorTip: "Warm, guttural sound on the apostrophe check. 'Beh-ahl'.",
        imageUrl: "https://images.unsplash.com/photo-1545231027-63b3f162d20e?w=505&auto=format&fit=crop",
        audioText: "Be'al. Holiday."
      },
      {
        fidel: "እንኳን አደረሳችሁ",
        english: "Enkuan Aderesachihu",
        meaning: "Congratulations/Blessings on reaching this day! (to all)",
        context: "The beautiful seasonal greeting spoken to families and cousins whenever holiday mornings arrive.",
        tutorTip: "A fundamental Amharic blessing string. 'Ehn-koo-ahn Ah-deh-reh-sah-chih-hoo'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Enkuan aderesachihu. Happy Holiday blessing."
      },
      {
        fidel: "አዲስ ዓመት",
        english: "Adis Amet",
        meaning: "New Year (Enkutatash)",
        context: "In September, daisies bloom everywhere as we welcome the beautiful Ethiopian 'አዲስ ዓመት'.",
        tutorTip: "Literally 'New Year'. 'Ah-dees Ah-meht'.",
        imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=505&auto=format&fit=crop",
        audioText: "Adis amet. New Year."
      },
      {
        fidel: "እንጀራ",
        english: "Injera",
        meaning: "Sourdough flatbread",
        context: "The soft, spongy, national flatbread fermented from Teff used to scoop up holiday chicken stew.",
        tutorTip: "Spoken with proud heritage: 'Ehn-jeh-rah'.",
        imageUrl: "https://images.unsplash.com/photo-1545231027-63b3f162d20e?w=505&auto=format&fit=crop",
        audioText: "Injera. Sourdough flatbread."
      },
      {
        fidel: "ዶሮ ወጥ",
        english: "Doro Wet",
        meaning: "Traditional chicken stew",
        context: "A rich, spicy chicken stew simmered slowly with hard-boiled eggs for grand family holiday celebrations.",
        tutorTip: "Compound name. 'Doh-roh Weht'.",
        imageUrl: "https://images.unsplash.com/photo-1545231027-63b3f162d20e?w=505&auto=format&fit=crop",
        audioText: "Doro wet. Chicken stew."
      }
    ],
    exercises: [
      {
        amharic: "እንኳን አደረሳችሁ! መልካም አዲስ ዓመት!",
        transliteration: "Enkuan aderesachihu! Melkam adis amet!",
        english: "Happy New Year blessings to you all!",
        tip: "Bow gracefully holding open greeting hands!"
      },
      {
        amharic: "በበዓል ቀን እኛ ዶሮ ወጥ እንበላለን።",
        transliteration: "Be be'al ken egn doro wet enbelalen.",
        english: "On holiday, we eat doro wet.",
        tip: "Mime enjoying delicious finger food happily!"
      }
    ],
    dialogue: {
      heading: "💬 Holiday Greetings",
      scenario: "Semere wishes Lydia of the beautiful Adis Amet (New Year) morning.",
      roles: [
        {
          character: "Semere",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሊዲያ ፣ እንኳን ለአዲሱ ዓመት በሰላም አደረሰሽ!",
          transliteration: "Lydia, enkuan le adisu amet be selam aderesesh!",
          english: "Lydia, congratulations on reaching the New year in peace!"
        },
        {
          character: "Lydia",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አሜን! አንተም እንኳን አደረሰህ ፤ አብረን ዶሮ ወጥ እንብላ!",
          transliteration: "Amen! Antem enkuan adereseh, abren doro wet enbela!",
          english: "Amen! May blessings reach you too, let's eat chicken stew together!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: Enkutatash Yellow Daisies",
      passageAmharic: "በኢትዮጵያ መስከረም ወር ታላቅ በዓል ነው። አዲስ ዓመት ወይንም 'እንቁጣጣሽ' ይባላል። ዝናቡ አልፎ ቢጫ አደይ አበባዎች መሬቱን ያለብሳሉ። ልጃገረዶች ባህል ልብስ ለብሰው 'አበባየሆሽ' እያሉ ይዘፍናሉ ፤ ወንዶች ደግሞ ቤተሰብ ይጠይቃሉ። ሁሉም ቤት ውስጥ እንጀራ እና ዶሮ ወጥ ይዘጋጃል። በዓል ሰዎችን ያቀራርባል።",
      passageTransliteration: "Be Ethiopia Meskerem wer talak be'al new. Adis amet weynim 'Enkutatash' yibalal. Zinabu alfo bicha Adey abebach maretun yalebsalu. Lijageredoch bahil libs lebsew 'Abebayehosh' eyalu yizefnalu; bandoch degmo beteseb yiteyikalu. Hulunim bet wust injera ena doro wet yizegajewal. Be'al sewochin yakebirewal.",
      passageEnglish: "In Ethiopia September is a grand holiday month. It is called the New Year or 'Enkutatash'. The rain clears, and yellow Adey daisies cover the land. Young girls wear traditional clothing and sing 'Abebayehosh'; while men visit family. Sourdough flatbread and chicken stew is prepared in every home. Holidays bring people closer.",
      tutorTip: "Sing 4 lines of 'Abebayehosh' (flower song) to create interactive musical excitement."
    },
    writing: {
      heading: "✍️ Celebrate Characters",
      instructions: "Practice tracing the holiday letters በ (Be) and ዓ (A).",
      lettersToPractice: [
        {
          letter: "በ",
          phonetic: "Be",
          steps: ["Vertical loop block", "Flat baseline segment", "Right upward spike"]
        },
        {
          letter: "ዓ",
          phonetic: "A",
          steps: ["High leftward crown", "Downward curl joint", "Base round curve"]
        }
      ],
      wordChallenge: "በዓል"
    },
    homework: [
      "Practice wishing 'Enkuan aderesacheh' to your grandparents today.",
      "Draw yellow Adey daisies and write 'Melkam Adis Amet' underneath.",
      "Trace the characters በ, ቡ, ቢ, ባ, ቤ, ብ, ቦ three times."
    ],
    submissionTip: "Upload a photo of your holiday drawing labeled 'Adis Amet'! 🌻",
    parentActivities: [
      "Let kids identify ingredients of traditional dishes (like Teff or cardamom) and name them in Amharic tags."
    ],
    tutorPacing: [
      "10 mins: Holiday song listening.",
      "22 mins: Blessing expression practice slots.",
      "18 mins: Interactive sound pop bubble games."
    ],
    tutorTroubleshooting: [
      "Help children divide the lengthy 'Enkuan aderesachihu' string into easy phonetic beats."
    ],
    quiz: [
      {
        questionText: "What does 'እንኳን አደረሳችሁ' mean?",
        options: ["Happy Birthday", "Stay well always", "Congratulations on reaching this day!", "I am a student"],
        correctAnswerIndex: 2,
        explanation: "'እንኳን አደረሳችሁ' is the standard congratulatory blessing used on holidays."
      },
      {
        questionText: "What is the name of the traditional chicken stew called on holidays?",
        options: ["ውሃ ጠጣሁ", "ዶሮ ወጥ", "ፖስታ ቤት", "ስልክ ጨዋታ"],
        correctAnswerIndex: 1,
        explanation: "'ዶሮ ወጥ' (Doro Wet) is the classic festive chicken stew."
      },
      {
        questionText: "What represents 'New Year' in Amharic?",
        options: ["አዲስ ዓመት", "አሮጌ ደብተር", "እግር ኳስ", "የክፍል ስራ"],
        correctAnswerIndex: 0,
        explanation: "'አዲስ ዓመት' (Adis Amet) means New Year."
      },
      {
        questionText: "What is 'እንጀራ' in English?",
        options: ["Sourdough flatbread", "Apple juice", "Soccer field", "Quiet library"],
        correctAnswerIndex: 0,
        explanation: "'እንጀራ' is sourdough flatbread."
      }
    ],
    nextLessonTitle: "Traditional Clothing"
  },

  // --- LESSON 10: Traditional Clothing ---
  {
    level: 3,
    lessonNumber: 10,
    geezNumber: "፲",
    topic: "Traditional Clothing",
    theme: "Fashion & Identity (የባህል ልብስ)",
    phase: "Level 3 Stage 2: Cultural Identity",
    subheading: "Learn of the beautiful handwoven white 'Habesha Kemis', colorful borders, and traditional shawls of Ethiopia!",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Name 3 traditional garments: 'የባህል ልብስ' and 'ሸማ'.",
      "Explain the details of woven patterns like 'ጥልፍ'.",
      "Describe clothing colors and materials accurately.",
      "Identify gender-specific dress codes politely."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ባህል ልብስ",
        english: "Bahil Libs",
        meaning: "Traditional clothing / Custom garments",
        context: "The pristine white, handwoven cotton dresses worn proudly during national events and holiday gatherings.",
        tutorTip: "Literally 'Culture clothing'. 'Bah-hihl Lihbs'. Connect 'Bahil' (Culture) and 'Libs' (Clothes).",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Bahil libs. Traditional clothes."
      },
      {
        fidel: "ቀሚስ",
        english: "Kemis",
        meaning: "Dress / Gown",
        context: "The flowing hand-crafted cotton 'ቀሚስ' decorated with gold thread borders on the chest.",
        tutorTip: "Feminine clothing item target: 'Keh-mees'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Kemis. Dress."
      },
      {
        fidel: "ነጭ",
        english: "Nech",
        meaning: "White",
        context: "The bright, clean cotton color representing peace and purity inside national dresses: 'ነጭ'.",
        tutorTip: "Very short, explosive ch sound at end: 'Nehch'.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=505&auto=format&fit=crop",
        audioText: "Nech. White."
      },
      {
        fidel: "ነጠላ",
        english: "Netela",
        meaning: "Traditional wrap / Scarf",
        context: "A light, two-layered cotton scarf draped elegantly over shoulders when entering churches.",
        tutorTip: "A vital accessory: 'Neh-teh-lah'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Netela. Traditional shawl."
      },
      {
        fidel: "ጥልፍ",
        english: "Tilf",
        meaning: "Embroidery / Woven borders",
        context: "The multicolored gold and red thread embroidery handwoven at the hemlines to represent heritage symbols.",
        tutorTip: "Double consonant: 'Tihl-f'. Focus on cultural patterns.",
        imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=505&auto=format&fit=crop",
        audioText: "Tilf. Embroidery."
      }
    ],
    exercises: [
      {
        amharic: "እማማ ነጭ የባህል ልብስ ለበሰች።",
        transliteration: "Emama nech ye bahil libs lebesech.",
        english: "Mother wore a white traditional dress.",
        tip: "Mime draping a elegant shawl over your shoulders!"
      },
      {
        amharic: "የቀሚሱ ጥልፍ በጣም ያምራል!",
        transliteration: "Ye kemisu tilf betam yamral!",
        english: "The dress's embroidery is very beautiful!",
        tip: "Trace imaginary thread patterns with index fingers!"
      }
    ],
    dialogue: {
      heading: "💬 Choosing Outfits",
      scenario: "Leah and Yonas review clothing items they will wear for Enkutatash party.",
      roles: [
        {
          character: "Leah",
          avatar: "👧",
          bubbleSide: "left",
          amharic: "ዮናስ ፣ ለበዓል የባህል ልብስ ትለብሳለህ?",
          transliteration: "Yonas, le be'al ye bahil libs tilebsaleh?",
          english: "Yonas, will you wear traditional clothes for the holiday?"
        },
        {
          character: "Yonas",
          avatar: "👦",
          bubbleSide: "right",
          amharic: "አዎ ፤ ነጭ ልብስ እና ነጠላ እለብሳለሁ። አንቺስ?",
          transliteration: "Awo, nech libs ena netela elebsalehu. Anchis?",
          english: "Yes, I will wear white clothes and a shawl wrap. What about you?"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Weaver's Masterpiece",
      passageAmharic: "በኢትዮጵያ ወንዶች 'ሸማኔ' ይባላሉ። እነሱ በእጃቸው ጥሩ የጥጥ ክር በመጠቀም ነጭ የባህል ልብስ ይሰራሉ። ልብሱ ሲጠናቀቅ ሴቶች ደማቅ ጥልፍ መስሪያ ክር ይመርጣሉ። አባቴ ለእናቴ አዲስ የባህል ቀሚስና ነጠላ ገዛላት። በቀሚሱ ጥርፍ ላይ የተለያዩ ትናንሽ ታሪካዊ ምልክቶች ተስለዋል። በበዓላት ቀን ማህበረሰቡ ባህል ልብስ ሲለብስ ያምራል።",
      passageTransliteration: "Be Ethiopia wandoch 'Shemane' yibalalu. Enesu be'ejachew tiru ye-tit kir be-mteqem nech ye bahil libs yiseralu. Libsu sitemanaqeq setoch demak tilf mesriya kir yimertalu. Abate le'enate adis ye bahil kemis ena netela gezalat. Be kemisu tilf lay yelelayu tinanish tarikawi milikitoch teslewal. Be be'alat ken mahiberesebu bahil libs silebis yamral.",
      passageEnglish: "In Ethiopia the weavers are called 'Shemane'. Working with their hands, using quality cotton thread, they fabricate white traditional clothing. When the fabric is completed, women select vibrant embroidery threads. My father bought a new traditional dress and shawl wrap for my mother. Various tiny dynamic symbols are drawn in the dress hemline's embroidery. On holiday days, when the community dresses in heritage wear, it is gorgeous.",
      tutorTip: "Discuss cotton farming and weaving 'Shema' to display hand-craft ingenuity."
    },
    writing: {
      heading: "✍️ Textile Characters",
      instructions: "Practice tracing the garment characters ቀ (Ke) and ጥ (Ti).",
      lettersToPractice: [
        {
          letter: "ቀ",
          phonetic: "Ke",
          steps: ["High circular crown", "Downward pillar stalk", "Slight base curve"]
        },
        {
          letter: "ጥ",
          phonetic: "Ti",
          steps: ["Left small curl", "Center horizontal beam", "Base horizontal plate"]
        }
      ],
      wordChallenge: "ቀሚስ"
    },
    homework: [
      "Let parents show you a Habesha Kemis or traditional scarf at home.",
      "Write 'የባህል ልብስ' (Traditional clothing) in clean lines inside your diary.",
      "Trace the fashion characters ቀ, ቁ, ቂ, ቃ, ቄ, ቅ, ቆ three times."
    ],
    submissionTip: "Upload a photo modeling a traditional shawl or white shirt labeling it 'Netela'! 🧣",
    parentActivities: [
      "Examine traditional woven patterns together and point out geometric symbols in Amharic."
    ],
    tutorPacing: [
      "10 mins: Fabric visual match.",
      "22 mins: Clothing names speaking roleplay.",
      "18 mins: Interactive Syllable Scramble builders."
    ],
    tutorTroubleshooting: [
      "Clarify pronunciation details of 'Kemis' avoiding merging with unrelated terms."
    ],
    quiz: [
      {
        questionText: "What does 'የባህል ልብስ' translate to?",
        options: ["School socks", "Traditional clothing", "Rain coat", "Sport sneaker"],
        correctAnswerIndex: 1,
        explanation: "'የባህል ልብስ' represents traditional custom garments."
      },
      {
        questionText: "How do say 'White' in Amharic?",
        options: ["ነጭ", "ጥቁር", "ቀይ", "ቢጫ"],
        correctAnswerIndex: 0,
        explanation: "'ነጭ' (Nech) means white."
      },
      {
        questionText: "What is a 'ነጠላ'?",
        options: ["A metal tool", "Traditional wrap / Scarf", "A delicious fruit juice", "Pencil sharpener"],
        correctAnswerIndex: 1,
        explanation: "'ነጠላ' (Netela) is a handwoven light cotton shawl wrap."
      },
      {
        questionText: "What is 'ጥልፍ'?",
        options: ["Embroidery / Woven borders", "Kicking balls", "Drinking soup", "Studying library"],
        correctAnswerIndex: 0,
        explanation: "'ጥልፍ' (Tilf) represents embroidery."
      }
    ],
    nextLessonTitle: "Music & Dance"
  },

  // --- LESSON 11: Music & Dance ---
  {
    level: 3,
    lessonNumber: 11,
    geezNumber: "፲፩",
    topic: "Music & Dance",
    theme: "Rhythms & Steps (እስክስታ)",
    phase: "Level 2 Stage 2: Cultural Identity",
    subheading: "Learn to name traditional instruments like the Masinko, Kirar, and Kebero, and practice shoulder dancing 'Eskista'!",
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Name 3 traditional instruments correctly.",
      "Describe shoulder gestures: 'እስክስታ' (shoulders dance).",
      "Express enjoyment of musical songs: 'ዘፈን ደስ ይለኛል'.",
      "Demonstrate virtual clapping beats in timing."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "እስክስታ",
        english: "Eskista",
        meaning: "Traditional shoulder dance",
        context: "The energetic, rhythmic shoulder shaking dance that goes hand-in-hand with joyful Ethiopian celebratory music.",
        tutorTip: "A legendary cultural word. Pronounce 'Ehs-kihs-tah'. Accentuate the double s.",
        imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=505&auto=format&fit=crop",
        audioText: "Eskista. Traditional shoulder dance."
      },
      {
        fidel: "ከበሮ",
        english: "Kebero",
        meaning: "Traditional leather drum",
        context: "The large, leather-bound ceremonial drum beaten rhythmically with palms during holiday festivals.",
        tutorTip: "Easy three syllables: 'Keh-beh-roh'.",
        imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=505&auto=format&fit=crop",
        audioText: "Kebero. Leather drum."
      },
      {
        fidel: "ክራር",
        english: "Kirar",
        meaning: "Traditional five-string lyre",
        context: "A beautiful bowl-shaped, five-string acoustic lyre plucked with thumbs to accompany poetic songs.",
        tutorTip: "Short, rolling double r: 'Kih-raar'.",
        imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=505&auto=format&fit=crop",
        audioText: "Kirar. Traditional lyre."
      },
      {
        fidel: "ዘፈን",
        english: "Zefen",
        meaning: "Song / Melodic dance music",
        context: "The happy, cheerful tunes that bring groups of people together to jump and rejoice.",
        tutorTip: "Soft dynamic: 'Zeh-fehn'.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=505&auto=format&fit=crop",
        audioText: "Zefen. Song."
      },
      {
        fidel: "መሰንቆ",
        english: "Masinko",
        meaning: "Traditional single-string fiddle",
        context: "A diamond-shaped, single-string horsehair fiddle played with a bow by strolling singers.",
        tutorTip: "A brilliant classical instrument: 'Mah-sihn-koh'.",
        imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=505&auto=format&fit=crop",
        audioText: "Masinko. Bowed fiddle."
      }
    ],
    exercises: [
      {
        amharic: "እኔ ክራር መጫወት እወዳለሁ።",
        transliteration: "Ene kirar mechewet ewedalehu.",
        english: "I love playing the traditional lyre.",
        tip: "Mime strumming strings with your thumbs!"
      },
      {
        amharic: "ኑ ፤ እስክስታ አብረን እንውረድ!",
        transliteration: "Nu, eskista abren enwured!",
        english: "Come, let's dance the shoulder dance together!",
        tip: "Mime shaking your shoulders rhythmically!"
      }
    ],
    dialogue: {
      heading: "💬 Music Circle",
      scenario: "Elias tells Helen about the large leather drum they will tap at church school.",
      roles: [
        {
          character: "Elias",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሄለን ፣ ዛሬ ከበሮ በትምህርት ቤት ውስጥ ታያለሽ?",
          transliteration: "Helen, zare kebero be timihirt bet wust tayalesh?",
          english: "Helen, will you see the leather drum in school today?"
        },
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አዎ ፤ እኔ ከበሮ እመታለሁ ፤ አንተ ደግሞ ክራር ተጫወት!",
          transliteration: "Awo, ene kebero emetalehu, ante degmo kirar techewet!",
          english: "Yes, I will strike the drum, and you please play the lyre!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Strolling Minstrel's Song",
      passageAmharic: "በትናንትናው ምሽት ቤታችን ውስጥ ደማቅ ዘፈን ነበረ። አንድ ባህላዊ ዘማሪ 'አዝማሪ' ወደ እኛ መጣ። ረዥም መሰንቆ በአጁ ይዞ በሚያምር ድምፅ ዘፈነ። ድምፁ ሲሰማ አባቴ ከበሮ መታ ፤ አክስቴ ደግሞ ትከሻዋን እያንቀሳቀሰች እስክስታ ወረደች። እኛም በጥልቅ እየሳቅን በክራር የታገዘውን ባህላዊ ሙዚቃ አዳመጥን። ሙዚቃ የልብ መድኃኒት ነው።",
      passageTransliteration: "Be tinantnaw mishit betachin wust demak zefen nebere. And bahlawi zemari 'Azmari' wede egn meta. Rejim masinko be-eju yizo bemiyamir dimts zefene. Dimtsu sisema abate kebero meta; akiste degmo tikeshaun eyanqesaqesech eskista weredech. Egnam betilik eyesaqn be kirar yitagezewn bahlawi muziqa adameatn. Muziqa ye lib medhanit new.",
      passageEnglish: "Last night we had vibrant music in our home. A traditional folk singer called 'Azmari' came to us. Holding a long bowed fiddle in his hand, he sang in a beautiful voice. When the sound erupted, my father struck the leather drum; my aunt, moving her shoulders rhythmically, danced the shoulder dance. Laughing heartily, we listened to the traditional music assisted by the lyre. Music is medicine for the heart.",
      tutorTip: "Allow kids to mimic the sliding sounds of the bowed horsehair Masinko."
    },
    writing: {
      heading: "✍️ Rhythmic Characters",
      instructions: "Practice tracing the melodic letters ከ (Ke) and ዘ (Ze).",
      lettersToPractice: [
        {
          letter: "ከ",
          phonetic: "Ke",
          steps: ["Forked head segment", "Central dip line", "Base downward curved foot"]
        },
        {
          letter: "ዘ",
          phonetic: "Ze",
          steps: ["High crown line", "Vertical stalker drop", "Rightward tail hook"]
        }
      ],
      wordChallenge: "ከበሮ"
    },
    homework: [
      "Clap and practice shoulder movements 'Eskista' with parents tonight.",
      "Write 'እኔ እስክስታ እወዳለሁ' in your homework diary.",
      "Trace the characters ከ, ኩ, ኪ, ካ, ኬ, ክ, ኮ three times."
    ],
    submissionTip: "Upload a mini music clip clapping along with traditional beats! 🥁",
    parentActivities: [
      "Play traditional Amharic instrumental tracks on YouTube and help children spot Masinko vs Kirar sounds."
    ],
    tutorPacing: [
      "10 mins: Instrument sound recognition.",
      "22 mins: Active movement song practice.",
      "18 mins: Interactive sound pop bubble game."
    ],
    tutorTroubleshooting: [
      "Check that children pronounce 'Eskista' without ignoring the silent 's' sounds inside."
    ],
    quiz: [
      {
        questionText: "What does 'እስክስታ' represent?",
        options: ["Drinking milk", "Traditional shoulder dance", "Reading history", "Writing letters"],
        correctAnswerIndex: 1,
        explanation: "'እስክስታ' (Eskista) represents traditional shoulder dancing movements."
      },
      {
        questionText: "Which instrument is a leather drum?",
        options: ["ከበሮ", "ክራር", "መሰንቆ", "ስልክ"],
        correctAnswerIndex: 0,
        explanation: "'ከበሮ' (Kebero) represents the traditional leather drum."
      },
      {
        questionText: "What is a 'ክራር'?",
        options: ["Pencil box", "Five-string acoustic lyre", "Red bus", "Tall person"],
        correctAnswerIndex: 1,
        explanation: "'ክራር' (Kirar) is a five-string lyre."
      },
      {
        questionText: "What does 'ዘፈን' mean?",
        options: ["Song / Music", "Homework paper", "Soccer tournament", "Quiet room"],
        correctAnswerIndex: 0,
        explanation: "'ዘፈን' translates to song."
      }
    ],
    nextLessonTitle: "Respect & Community Values"
  },

  // --- LESSON 12: Respect & Community Values ---
  {
    level: 3,
    lessonNumber: 12,
    geezNumber: "፲፪",
    topic: "Respect & Community Values",
    theme: "Respect & Elders (ክብር)",
    phase: "Level 2 Stage 2: Cultural Identity",
    subheading: "Learn to show deep respect using 'Awo' (polite yes) and honor elders with appropriate plural greetings!",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Employ respectful plural pronouns like 'እርሶ' (formal you).",
      "Explain the moral value of 'ክብር' (respect).",
      "Form sentences honoring parents politely.",
      "Engage conversational polite roleplays."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ክብር",
        english: "Kibir",
        meaning: "Respect / Honor",
        context: "The beautiful moral compass of bowing gracefully and using formal tones with elderly neighbors: 'ክብር'.",
        tutorTip: "Warm, stressed syllable: 'Kih-bihr'. Represents deep ethical behavior.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Kibir. Respect."
      },
      {
        fidel: "ታላቅ",
        english: "Talak",
        meaning: "Elder / Senior / Older sibling",
        context: "Expressing reverence and offering seats inside buses to any 'ታላቅ' person in your family.",
        tutorTip: "Stressed k at end. 'Tah-lahk'.",
        imageUrl: "https://images.unsplash.com/photo-1506784081820-9486c6f3e9f?w=505&auto=format&fit=crop",
        audioText: "Talak. Elder."
      },
      {
        fidel: "እሺ",
        english: "Eshi",
        meaning: "Okay / Yes, with pleasure",
        context: "The sweet, agreeable response spoken when grandparents request assistance fetching water.",
        tutorTip: "A vital daily polite binder: 'Eh-shee'.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Eshi. Okay."
      },
      {
        fidel: "አዎ",
        english: "Awo",
        meaning: "Yes",
        context: "An active, confident declaration used to confirm your positive school homework progress.",
        tutorTip: "Keep it simple. 'Ah-woh'.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Awo. Yes."
      },
      {
        fidel: "እባክዎ",
        english: "Ebakwo",
        meaning: "Please (formal/respectful)",
        context: "The soft, polite connector word used when addressing teachers or asking questions.",
        tutorTip: "A fundamental politeness indicator: 'Eh-bahk-u-oh'.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Ebakwo. Please (formal)."
      }
    ],
    exercises: [
      {
        amharic: "እባክዎ መምህር ይግቡ።",
        transliteration: "Ebakwo memhir yigbu.",
        english: "Please enter, teacher (respectful).",
        tip: "Hold hands together and bow slightly!"
      },
      {
        amharic: "እሺ እማማ ፤ እረዳሻለሁ።",
        transliteration: "Eshi emama, eredashalehu.",
        english: "Okay mother, I will help you.",
        tip: "Nod your head in sweet, respectful agreement!"
      }
    ],
    dialogue: {
      heading: "💬 Polite Requests",
      scenario: "Brook talks with Teacher Martha with respectful formal strings.",
      roles: [
        {
          character: "Brook",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "መምህር ማርታ ፤ እባክዎ ደብተሬን ይመልከቱ?",
          transliteration: "Memhir Martha, ebakwo debteren yimelketu?",
          english: "Teacher Martha, please can you look at my notebook?"
        },
        {
          character: "Teacher Martha",
          avatar: "👩",
          bubbleSide: "right",
          amharic: "እሺ ብሩክ ልጄ ፤ በጣም ጎበዝ ተማሪ ነህ!",
          transliteration: "Eshi Brook lije, betam gobez temari neh!",
          english: "Okay Brook my child, you are a very smart student!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: Honoring Grandmother",
      passageAmharic: "በትውልዳችን ባህል ውስጥ ታላላቅ ሰዎችን ማክበር ትልቅ ህግ ነው። ሔኖክ አያቱ ወደ ክፍል ስትመጣ ፈጥኖ ይነሳል። 'አያቴ ፤ እባክዎ እዚህ ወንበር ላይ ይቀመጡ' ይላቸዋል። አያቱም 'ልጄ ደግ ሁን ፤ ክብር ይስጥልኝ' ብለው ይመርቁታል። ሔኖክ ሁልጊዜ 'እሺ' እያለ በደስታ ይሰማቸዋል። በዚህም ደስ ይላቸዋል።",
      passageTransliteration: "Be tiwlidachin bahil wust talalak sewochin makber tilik hig new. Henok ayatu wede kifil sitmeta fetno yinesal. 'Ayate; ebakwo ezih wenber lay yikeymetu' yilachewal. Ayatun 'lije deg hun; kibir yistilign' bilew yimerquthal. Henok hulgize 'eshi' eyale be desta yisemachewal. Beziyam des yilachewal.",
      passageEnglish: "In our generation's culture, honoring elders is a major law. Henok rises quickly when his grandmother enters the room. He says: 'My grandmother, please sit on this seat'. Grandmother blesses him: 'My child be kind; may God give you honor'. Henok always listens to them happily, saying 'Okay'. They are very pleased with this.",
      tutorTip: "Review 'Kibir Yistilign' (May God give you honor/Thank you) as an ultimate gratitude marker."
    },
    writing: {
      heading: "✍️ Polite Characters",
      instructions: "Practice tracing the respectful letters ክ (Ki) and እ (Ih).",
      lettersToPractice: [
        {
          letter: "ክ",
          phonetic: "Ki",
          steps: ["Vertical start left", "Horizontal cross line", "Lower leg spike"]
        },
        {
          letter: "እ",
          phonetic: "Ih",
          steps: ["Vertical loop side curve", "Center connector", "Root stem baseline"]
        }
      ],
      wordChallenge: "ክብር"
    },
    homework: [
      "Help your parents clear the dining table tonight using 'Eshi' polite responses.",
      "Write 'እሺ እማማ' (Okay mother) in clean lines inside your diary.",
      "Trace the characters ክ, ኩ, ኪ, ካ, ኬ, ክ, ኮ three times."
    ],
    submissionTip: "Upload a mini audio clip saying 'Ebakwo and Kibir Yistilign'! 🗣️",
    parentActivities: [
      "Let kids practice bowing slightly and shaking hands with both palms to show traditional respect landmarks at dinner."
    ],
    tutorPacing: [
      "10 mins: Honor values quiz.",
      "22 mins: Contextual plural greeting dialogue.",
      "18 mins: Interactive Syllable Scramble builder."
    ],
    tutorTroubleshooting: [
      "Clarify that 'Ebakih' is for boys, 'Ebakish' is for girls, but 'Ebakwo' is for elders and teachers."
    ],
    quiz: [
      {
        questionText: "What does 'ክብር' translate to?",
        options: ["Cold ice", "Respect / Honor", "Eating lunch", "Playing soccer"],
        correctAnswerIndex: 1,
        explanation: "'ክብር' (Kibir) represents the core cultural value of respect/honor."
      },
      {
        questionText: "How do say: 'Please' respectfully to a teacher?",
        options: ["እባክዎ", "እባክህ", "እባክሽ", "እሺ"],
        correctAnswerIndex: 0,
        explanation: "'እባክዎ' (Ebakwo) is the formal/respectful form of please."
      },
      {
        questionText: "What is 'እሺ' in English?",
        options: ["No way", "Okay / With pleasure", "Go away", "Pencil box"],
        correctAnswerIndex: 1,
        explanation: "'እሺ' (Eshi) means okay or with pleasure."
      },
      {
        questionText: "What represents 'Elder / Senior sibling'?",
        options: ["ታላቅ", "ታናሽ", "ውሃ", "ቀሚስ"],
        correctAnswerIndex: 0,
        explanation: "'ታላቅ' (Talak) represents an elder or senior sibling."
      }
    ],
    nextLessonTitle: "Describing Past Events"
  },

  // --- LESSON 13: Describing Past Events ---
  {
    level: 3,
    lessonNumber: 13,
    geezNumber: "፲፫",
    topic: "Describing Past Events",
    theme: "History & Past Tense (ያለፈ ጊዜ)",
    phase: "Level 3 Stage 3: Fluent Communication",
    subheading: "Learn how to discuss what you did yesterday, last week, or during summer vacations in clear past tense!",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Express yesterday's actions: 'ትናንትና ሄድኩ'.",
      "Identify 4 past tense verb conjugations.",
      "Distinguish timelines using 'ትናንት' (yesterday) and 'ዛሬ' (today).",
      "Form short stories detailing weekend travels."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ትናንትና",
        english: "Tinentina",
        meaning: "Yesterday",
        context: "Discussing actions that were fully accomplished and closed on the previous sunset: 'ትናንትና'.",
        tutorTip: "Keep rolling syllables: 'Tih-nahn-tih-nah'. Focus on past tense markers.",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=505&auto=format&fit=crop",
        audioText: "Tinentina. Yesterday."
      },
      {
        fidel: "ነበርኩ",
        english: "Nebersh / Neberku",
        meaning: "I was / You were (past state)",
        context: "Declaring your historic presence at school or grandfather's fields: 'እኔ ትናንት እዚያ ነበርኩ'.",
        tutorTip: "Helps construct past continuous strings: 'Neh-behr-koo' (I was).",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=505&auto=format&fit=crop",
        audioText: "Neberku. I was."
      },
      {
        fidel: "ሄድኩ",
        english: "Hedku",
        meaning: "I went",
        context: "Accomplishing walks to study centers or playgrounds is 'ሄድኩ'.",
        tutorTip: "The ending -ku represents first-person past action. 'Hehd-koo'.",
        imageUrl: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=505&auto=format&fit=crop",
        audioText: "Hedku. I went."
      },
      {
        fidel: "ባለፈው ሳምንት",
        english: "Balefew Samint",
        meaning: "Last week",
        context: "Describing events that elapsed seven days ago on your school calendar: 'ባለፈው ሳምንት'.",
        tutorTip: "Compound phrase. 'Bah-leh-fih-uo Sah-mihnt'.",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=505&auto=format&fit=crop",
        audioText: "Balefew samint. Last week."
      },
      {
        fidel: "ጨረስኩ",
        english: "Cheresku",
        meaning: "I finished / Completed",
        context: "Closing cover lids of difficult homework modules and high value games: 'ሁሉንም ጨረስኩ!'.",
        tutorTip: "Satisfying exclamation: 'Cheh-rehs-koo'. Raise hand.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Cheresku. I finished."
      }
    ],
    exercises: [
      {
        amharic: "እኔ ትናንትና ወደ ቤተመጻሕፍት ሄድኩ።",
        transliteration: "Ene tinentina wede betemetsahift hedku.",
        english: "I went to the library yesterday.",
        tip: "Point backward with thumb representing past actions!"
      },
      {
        amharic: "ባለፈው ሳምንት የቤት ስራዬን ጨረስኩ።",
        transliteration: "Balefew samint ye bet siraye cherseku.",
        english: "Last week I finished my homework.",
        tip: "Stamp notebook depicting completed tasks!"
      }
    ],
    dialogue: {
      heading: "💬 Past Encounters",
      scenario: "Dawit asks Samrawit about her weekend travels and homework completions.",
      roles: [
        {
          character: "Dawit",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሳምራዊት ፣ ባለፈው ሳምንት የት ሄድሽ?",
          transliteration: "Samrawit, balefew samint yet hedsh?",
          english: "Samrawit, where did you go last week?"
        },
        {
          character: "Samrawit",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እኔ ወደ አያቴ ቤት ሄድኩ ፤ እዚያ ደስተኛ ነበርኩ!",
          transliteration: "Ene wede ayate bet hedku, ezih destegna neberku!",
          english: "I went to my grandmother's house, I was happy there!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Completed Quest",
      passageAmharic: "ትናንትና ሳሮን ትልቅ እቅድ ነበራት። እሷ ከጠዋቱ ረድታ ቁርስ በላች። ከሰዓት በኋላ ደግሞ ወደ ሜዳ ሄዳ ከጓደኞቿ ጋር እግር ኳስ ተጫወተች። ስራዋ ሲያልቅ 'ሁሉንም ጨረስኩ' ብላ አሰበች። ባለፈው ሳምንትም እንዲሁ ጎበዝ ነበረች። አሁን ዛሬ ግን በሰላም ቤት ውስጥ ቁጭ ብላ ታርፋለች።",
      passageTransliteration: "Tinentina Saron tilik ekid neberat. Esua ke towatu redta kurs belach. Kese'at behuala degmo wede meda heda ke gwadeñochua gar egir kwas techewetech. Sirawa siyalk 'hulunim cheresku' bila asebech. Balefew samintim endihu gobez neberech. Ahun zare gin be selam bet wust kuch bila tarfalech.",
      passageEnglish: "Saron had a big plan yesterday. She helped from the morning and ate breakfast. In the afternoon, she went to the field and played soccer with her friends. When her work finished, she thought: 'I completed everything'. Last week she was also smart like this. Now today, she sits and rests in peace inside the house.",
      tutorTip: "Acknowledge past action markers like 'hedku' (I went) and 'cheresku' (I finished) openly."
    },
    writing: {
      heading: "✍️ Timeline Characters",
      instructions: "Practice tracing the timeline letters ት (Te) and ጨ (Che).",
      lettersToPractice: [
        {
          letter: "ት",
          phonetic: "Te",
          steps: ["Vertical loop side helper", "Flat top roof", "Base tail"]
        },
        {
          letter: "ጨ",
          phonetic: "Che",
          steps: ["High crown line with cross segment", "Vertical drop segments", "Base horizontal plate"]
        }
      ],
      wordChallenge: "ሄድኩ"
    },
    homework: [
      "Detail three tasks you completed yesterday using 'Tinentina ... cherseku'.",
      "Write 'ሁሉንም ጨረስኩ' in bold crayons in your notepad.",
      "Trace the characters ጨ, ጩ, ጪ, ጫ, ጬ, ጭ, ጮ three times."
    ],
    submissionTip: "Upload a photo pointing to yesterday's date on calendar labeling it 'Tinentina'! 📅",
    parentActivities: [
      "Review the child's daily calendar and ask: 'Where did you go?' (Yet hedku?) in Amharic."
    ],
    tutorPacing: [
      "10 mins: Calendar warmups.",
      "22 mins: Dynamic past verb transformation drills.",
      "18 mins: Interactive spelling blend bubble pop game."
    ],
    tutorTroubleshooting: [
      "Make sure children use past 'Hedku' (I went) rather than present verbs on history slides."
    ],
    quiz: [
      {
        questionText: "What does 'ትናንትና' mean?",
        options: ["Next year", "Yesterday", "In five minutes", "Noon time"],
        correctAnswerIndex: 1,
        explanation: "'ትናንትና' represents yesterday."
      },
      {
        questionText: "How do say 'I went' in Amharic?",
        options: ["ሄድኩ", "በላሁ", "ተኛሁ", "አጠናሁ"],
        correctAnswerIndex: 0,
        explanation: "'ሄድኩ' (Hedku) represents first-person 'I went'."
      },
      {
        questionText: "What represents 'Last week'?",
        options: ["ባለፈው ሳምንት", "ነገ ጠዋት", "ቀኝ መንገድ", "ቡድን አባል"],
        correctAnswerIndex: 0,
        explanation: "'ባለፈው ሳምንት' is the compound translating to last week."
      },
      {
        questionText: "What is the meaning of 'ጨረስኩ'?",
        options: ["I started", "I swam", "I finished / Completed", "I ran away"],
        correctAnswerIndex: 2,
        explanation: "'ጨረስኩ' (Cheresku) means I finished."
      }
    ],
    nextLessonTitle: "Telling Funny Stories"
  },

  // --- LESSON 14: Telling Funny Stories ---
  {
    level: 3,
    lessonNumber: 14,
    geezNumber: "፲፬",
    topic: "Telling Funny Stories",
    theme: "Humor & Laughs (የመሳቅ ጨዋታ)",
    phase: "Level 2 Stage 3: Fluent Communication",
    subheading: "Learn vocabulary for jokes, laughing, storytelling triggers, and sharing funny anecdotes with peers!",
    imageUrl: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "Express laughter triggers: 'መሳቅ' (to laugh) and 'ቀልድ' (joke).",
      "Explain simple funny scenarios in Amharic.",
      "Conduct expressive dialogue with happy mimicry.",
      "Identify comedic adjectives properly."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "መሳቅ",
        english: "Mesak",
        meaning: "To laugh / Giggling",
        context: "The sweet sound of friends roaring with joy when someone shares silly cartoon actions: 'መሳቅ'.",
        tutorTip: "Stressed s. 'Meh-sahk'. Suffix 'ewedalehu' goes with it nicely.",
        imageUrl: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=505&auto=format&fit=crop",
        audioText: "Mesak. To laugh."
      },
      {
        fidel: "ቀልድ",
        english: "Keld",
        meaning: "Joke / Silly riddle",
        context: "The funny riddle spoken to clear school fatigue and make faces smile during free times.",
        tutorTip: "Short, sharp: 'Kehld'.",
        imageUrl: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=505&auto=format&fit=crop",
        audioText: "Keld. Joke."
      },
      {
        fidel: "አስቂኝ",
        english: "Askiñ",
        meaning: "Funny / Humorous / Comic",
        context: "A cute monkey wearing glasses or playing drums is described as 'አስቂኝ' image.",
        tutorTip: "Glottal stress. 'Ahs-kihgny'. Point to something funny.",
        imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=505&auto=format&fit=crop",
        audioText: "Askiñ. Funny."
      },
      {
        fidel: "ሰማሁ",
        english: "Semahu",
        meaning: "I heard / Listened",
        context: "Using your ears to receive dynamic stories or radio plays is 'ሰማሁ'.",
        tutorTip: "Ending -hu represents past. 'Seh-mah-hoo'.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Semahu. I heard."
      },
      {
        fidel: "ፈገግታ",
        english: "Fegegta",
        meaning: "Smile / Beam",
        context: "The beautiful curve on your lips when you greet beloved parents after school.",
        tutorTip: "Soft syllables. 'Feh-gehg-tah'. Warm facial expression.",
        imageUrl: "https://images.unsplash.com/photo-1506784081820-9486c6f3e9f?w=505&auto=format&fit=crop",
        audioText: "Fegegta. Smile."
      }
    ],
    exercises: [
      {
        amharic: "እኔ ያንን አስቂኝ ቀልድ ሰማሁ።",
        transliteration: "Ene yanin askiñ keld semahu.",
        english: "I heard that funny joke.",
        tip: "Cupped index hand to ears depicting hearing!"
      },
      {
        amharic: "ቀልዱ በጣም መሳቅ ያመጣል።",
        transliteration: "Keldu betam mesak yametal.",
        english: "The joke brings much laughter.",
        tip: "Mime holding your ribs laughing heartily!"
      }
    ],
    dialogue: {
      heading: "💬 Punchlines",
      scenario: "Elias tells Helen of a comic cat story he heard inside class.",
      roles: [
        {
          character: "Elias",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሄለን ፣ ትናንትና አንድ በጣም አስቂኝ ወሬ ሰማሁ!",
          transliteration: "Helen, tinentina and betam askiñ wore semahu!",
          english: "Helen, I heard a very funny story yesterday!"
        },
        {
          character: "Helen",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እባክህ ቀልዱን ንገረኝ ፤ እኔ መሳቅ እወዳለሁ!",
          transliteration: "Ebakish keldun nigeregn, ene mesak ewedalehu!",
          english: "Please, tell me the joke; I love laughing!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Dog Who Wore Boots",
      passageAmharic: "ሳሮን ትናንት ማታ አንድ አስቂኝ ታሪክ ሰማች። በአያቷ ደብተር ውስጥ የተጻፈ ነው። ታሪኩ 'ቡቲ' ስለሚባል ትንሽ ውሻ ነው። ቡቲ የባህል ጫማ አድርጎ መሰንቆ ለመጫወት ሞከረ። ድምፅ ሲያሰማ ትናንሽ ድመቶች እየሮጡ መጡ። ይሄ በጣም አስቂኝ ነበር። ሳሮን ታሪኩን ስታነብ ትልቅ ፈገግታ ፊቷ ላይ ነበረ። ለጓደኞቿም አውርታ አብረው በደስታ ሳቁ።",
      passageTransliteration: "Saron tinant mata and askiñ tarik semach. Be ayatua debter wust yetetsafe new. Tariku 'Booty' silemibal tinish wusha new. Booty ye bahil chamma adrigo masinko lemechewet mokere. Dimts siyasema tinanish dimetoch eyeroat metsu. Yih betam askiñ nebere. Saron tarikun sitaneb tilik fegegta fitua lay nebere. Le gwadeñochuam awrita abrew be desta saqu.",
      passageEnglish: "Saron heard a funny story last night. It was written in her grandmother's book. The story is about a little dog named 'Booty'. Booty put on traditional shoes and tried to play the bowed horsehair fiddle. When he emitted a sound, little kittens came running. This was extremely comic. Saron had a huge smile on her face when reading the story. Telling it to her friends, they laughed together in joy.",
      tutorTip: "Encourage children to mime playing the fiddle like the dog in the story."
    },
    writing: {
      heading: "✍️ Humorous Characters",
      instructions: "Practice tracing the smiling letters ፈ (Fe) and ሳ (Sa).",
      lettersToPractice: [
        {
          letter: "ፈ",
          phonetic: "Fe",
          steps: ["Loop segment left", "Diagonal connector", "Baseline downward tail"]
        },
        {
          letter: "ሳ",
          phonetic: "Sa",
          steps: ["Segment with fork", "Mid horizontal beam", "Base horizontal rail"]
        }
      ],
      wordChallenge: "ፈገግታ"
    },
    homework: [
      "Share a simple funny joke or story with parents using Amharic expressions.",
      "Write 'መሳቅ እወዳለሁ' (I love laughing) in beautiful colors.",
      "Trace the characters ፈ, ፉ, ፊ, ፋ, ፌ, ፍ, ፎ three times."
    ],
    submissionTip: "Upload a photo making the funniest silly face labeled 'Askiñ'! 😜",
    parentActivities: [
      "Have a laugh session. Share funny riddles and let children label them as 'Askiñ' (funny)."
    ],
    tutorPacing: [
      "10 mins: Silly picture descriptions.",
      "22 mins: Storytelling sentence building.",
      "18 mins: Interactive spelling assembly grids."
    ],
    tutorTroubleshooting: [
      "Help children pronounce the silent glottal marker 'ñ' inside 'Askiñ' correctly."
    ],
    quiz: [
      {
        questionText: "What does 'መሳቅ' translate to?",
        options: ["Eating", "To laugh / Giggling", "Crying", "Sleeping"],
        correctAnswerIndex: 1,
        explanation: "'መሳቅ' (Mesak) represents the act of laughing."
      },
      {
        questionText: "How do you say 'Joke' in Amharic?",
        options: ["ቀልድ", "ደብተር", "መኪና", "ውሃ"],
        correctAnswerIndex: 0,
        explanation: "'ቀልድ' (Keld) means a joke or riddle."
      },
      {
        questionText: "What is 'አስቂኝ' in English?",
        options: ["Funny / Humorous", "Angry", "Sad", "Fast"],
        correctAnswerIndex: 0,
        explanation: "'አስቂኝ' (Askiñ) translates to funny or comic."
      },
      {
        questionText: "What represents 'Smile'?",
        options: ["ፈገግታ", "ትናንትና", "ቡድን", "አንድነት"],
        correctAnswerIndex: 0,
        explanation: "'ፈገግታ' (Fegegta) is a smile."
      }
    ],
    nextLessonTitle: "Giving Opinions"
  },

  // --- LESSON 15: Giving Opinions ---
  {
    level: 3,
    lessonNumber: 15,
    geezNumber: "፲፭",
    topic: "Giving Opinions",
    theme: "My Thoughts (እኔስ እላለሁ)",
    phase: "Level 2 Stage 3: Fluent Communication",
    subheading: "Learn how to politely voice opinions, declare 'I think', agree or disagree respectfully with classmates!",
    imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "State 'In my opinion...' using 'በእኔ አስተያየት'.",
      "Express polite agreement: 'እስማማለሁ' (I agree).",
      "Request feedback: 'ምን ይመስልሃል?' (What do you think?).",
      "Engage friendly debate simulations of school sports."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "አስተያየት",
        english: "Asteyayet",
        meaning: "Opinion / Feedback / View",
        context: "Declaring your thoughtful viewpoint or reaction inside classroom group debates: 'አስተያየት'.",
        tutorTip: "Long but regular spelling. Break it: 'Ahs-teh-yah-yeht'.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Asteyayet. Opinion."
      },
      {
        fidel: "እስማማለሁ",
        english: "Esmamalehu",
        meaning: "I agree",
        context: "Nodding your head gracefully when a schoolmate proposes a great game idea: 'እኔስማማለሁ!'.",
        tutorTip: "A vital active agreement marker: 'Ehs-mah-mah-lehoo'.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Esmamalehu. I agree."
      },
      {
        fidel: "እላለሁ",
        english: "Elalehu",
        meaning: "I say / declare",
        context: "Using your strong vocal confidence to voice choices: 'እኔ ቢጫ አበባ ይሻላል እላለሁ'.",
        tutorTip: "Short, active: 'Eh-lah-lehoo'.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Elalehu. I say."
      },
      {
        fidel: "ይመስልሃል",
        english: "Yimeslihal",
        meaning: "It seems to you / What do you think?",
        context: "Politely querying a brother about his feelings on dinner recipes: 'ምን ይመስልሃል?'.",
        tutorTip: "Question framework: 'Yee-mehs-lih-hahl'.",
        imageUrl: "https://images.unsplash.com/photo-1524661135339-9140b00785e8?w=505&auto=format&fit=crop",
        audioText: "Yimeslihal. What do you think?"
      },
      {
        fidel: "በእኔ አስተያየት",
        english: "Be'ene Asteyayet",
        meaning: "In my opinion / In my view",
        context: "Prefixing your sentences elegantly before detailing preferences inside classroom projects.",
        tutorTip: "Combination phrase: 'Beh-eh-neh Ahs-teh-yah-yeht'.",
        imageUrl: "https://images.unsplash.com/photo-1521791136368-1a46827d0a16?w=505&auto=format&fit=crop",
        audioText: "Be'ene asteyayet. In my opinion."
      }
    ],
    exercises: [
      {
        amharic: "በእኔ አስተያየት ሒሳብ ቀላል ነው።",
        transliteration: "Be'ene asteyayet hisab kelal new.",
        english: "In my opinion, mathematics is easy.",
        tip: "Form questioning loops with index fingers!"
      },
      {
        amharic: "እኔ ከሐሳቡ ጋር እስማማለሁ።",
        transliteration: "Ene ke hasabu gar esmamalehu.",
        english: "I agree with the idea.",
        tip: "Thumb up celebrating consensus!"
      }
    ],
    dialogue: {
      heading: "💬 Debating Passions",
      scenario: "Brook and Sarah discuss holiday foods of Enkutatash feasts.",
      roles: [
        {
          character: "Brook",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሳራ ፣ በእኔ አስተያየት ዶሮ ወጥ ከምንም በላይ ጣፋጭ ነው። ምን ይመስልሻል?",
          transliteration: "Sarah, be'ene asteyayet doro wet keminim belay tafach new. Min yimeslishal?",
          english: "Sarah, in my opinion, doro wet chicken stew is sweet above everything. What do you think (she)?"
        },
        {
          character: "Sarah",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "እኔ ከሃሳቡ ጋር ሙሉ በሙሉ እስማማለሁ! በጣም ጣፋጭ ነው!",
          transliteration: "Ene ke hasabu gar mulu be mulu esmamalehu! Betam tafach new!",
          english: "I agree with the idea completely! It is very delicious!"
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Class Discussion Board",
      passageAmharic: "ዛሬ በትምህርት ቤት መምህሯ 'የትርፍ ጊዜ እንቅስቃሴዎች' ላይ ውይይት ከፈቱ። መጀመርያ ሔኖክ ተነሳና 'በእኔ አስተያየት እግር ኳስ መጫወት ምርጥ ነገር ነው' አለ። ሊያ ግን አልተስማማችም። እሷ 'መጽሐፍ ማንበብ ይሻላል እላለሁ' ብላ አስተያየቷን ሰጠች። መምህሯም 'ሁለታችሁም ሃሳብ ጥሩ ነው ፤ እኔም እስማማለሁ' አሏቸው። ሁሉም የራሱን አስተያየት በነፃነት ተናገረ።",
      passageTransliteration: "Zare be timihirt bet memhirua 'ye-terf gize enksikaseoch' lay wiyiyit kefetu. Mejemerya Henok tenesana 'be'ene asteyayet egir kwas mechewet mirt neger new' ale. Leah gin altesmamachm. Esua 'metsihaf manbeb yishalal elalehu' bila asteyayetuan setech. Memhiruam 'huletachihum hasab tiru new; enem esmamalehu' aluachew. Hulunim ye rasun asteyayet be netsanet tenagere.",
      passageEnglish: "Today at school, the teacher opened a discussion on 'free time activities'. First, Henok arose and said: 'In my opinion, playing soccer is the best thing'. Leah, however, did not agree. She gave her view saying: 'I say reading books is better'. The teacher said: 'The ideas of both of you are quality; I also agree'. Everyone spoke their opinion freely.",
      tutorTip: "Show children that voicing divergent thoughts politely is highly valued in group tasks."
    },
    writing: {
      heading: "✍️ Opinionated Characters",
      instructions: "Practice tracing the debating letters አ (A) and ስ (Si).",
      lettersToPractice: [
        {
          letter: "አ",
          phonetic: "A",
          steps: ["Vertical start left with curl", "Center horizontal connector", "Right stem baseline"]
        },
        {
          letter: "ስ",
          phonetic: "Si",
          steps: ["Forked crest", "Internal dip", "Right baseline hook"]
        }
      ],
      wordChallenge: "እስማማለሁ"
    },
    homework: [
      "Voice an opinion about your favorite household food using 'Be'ene asteyayet'." ,
      "Write 'እኔ እስማማለሁ' (I agree) in bold green crayons.",
      "Trace the characters አ, ኡ, ዒ, ኣ, ኤ, እ, ኦ three times."
    ],
    submissionTip: "Upload a mini voice recording stating: 'Be'ene asteyayet Amharic gobez new'! 🗣️",
    parentActivities: [
      "Ask your child: 'Min yimeslihal?' (What do you think?) during daily decisions of movies or dinners."
    ],
    tutorPacing: [
      "10 mins: Option selection warmup.",
      "22 mins: Opinion expression drills.",
      "18 mins: Interactive Syllable Scramble builders."
    ],
    tutorTroubleshooting: [
      "Pace children through pronouncing 'Asteyayet' - keep the vowel separations clear."
    ],
    quiz: [
      {
        questionText: "What does 'በእኔ አስተያየት' mean?",
        options: ["Goodbye classmate", "In my opinion", "Go eat dinner", "In five mornings"],
        correctAnswerIndex: 1,
        explanation: "'በእኔ አስተያየት' (Be'ene asteyayet) translates to 'In my opinion'."
      },
      {
        questionText: "How do say 'I agree' in Amharic?",
        options: ["እስማማለሁ", "ሄድኩኝ", "ተኛሁኝ", "እቅዳለሁ"],
        correctAnswerIndex: 0,
        explanation: "'እስማማለሁ' (Esmamalehu) translates to I agree."
      },
      {
        questionText: "What does 'ይመስልሃል' represent?",
        options: ["It seems to you", "I walked fast", "A red soccer", "Cold rain"],
        correctAnswerIndex: 0,
        explanation: "'ይመስልሃል' means it seems to you or what do you think (to a boy)."
      },
      {
        questionText: "What is the meaning of 'እላለሁ'?",
        options: ["I say / declare", "I swim", "I sleep", "I forget"],
        correctAnswerIndex: 0,
        explanation: "'እላለሁ' (Elalehu) represents first-person 'I say'."
      }
    ],
    nextLessonTitle: "Comparing Things"
  },

  // --- LESSON 16: Comparing Things ---
  {
    level: 3,
    lessonNumber: 16,
    geezNumber: "፲፮",
    topic: "Comparing Things",
    theme: "Comparisons & Shapes (ማወዳደር)",
    phase: "Level 2 Stage 3: Fluent Communication",
    subheading: "Learn descriptive comparison words like 'ይሻላል' (better), 'ይበልጣል' (exceeds), and compare sizes of items!",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
    objectives: [
      "State comparative attributes like 'ይሻላል' (better) and 'ይበልጣል' (exceeds).",
      "Compare object qualities correctly.",
      "Structure advanced comparative sentences.",
      "Participate in dimension comparison activities."
    ],
    duration: "50 Minutes Session",
    vocabularies: [
      {
        fidel: "ይሻላል",
        english: "Yishalal",
        meaning: "It is better / Preferred",
        context: "Preferring high quality pencils or choosing oranges over sour lemons: 'ብርቱካን ይሻላል'.",
        tutorTip: "A very popular daily comparator: 'Yee-shah-lahl'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Yishalal. It is better."
      },
      {
        fidel: "ይበልጣል",
        english: "Yibeltal",
        meaning: "It exceeds / More / Larger",
        context: "Describing a large towering stadium versus a small local backyard playground fence.",
        tutorTip: "Active comparison verb: 'Yee-behl-tahl'. Compare sizes.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Yibeltal. It exceeds."
      },
      {
        fidel: "ያንስባል",
        english: "Yansal",
        meaning: "It is less / Small / Smaller",
        context: "Describing a small cup of water compared to a vast Addis lake.",
        tutorTip: "Opposite of yibeltal. 'Yahn-sahl'.",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=505&auto=format&fit=crop",
        audioText: "Yansal. It is less."
      },
      {
        fidel: "እኩል",
        english: "Ekul",
        meaning: "Equal / Same size / Identical",
        context: "Two chocolate slices divided symmetrically between brothers have 'እኩል' sizes.",
        tutorTip: "Glottal start. 'Eh-koohl'. Double stress on k.",
        imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=505&auto=format&fit=crop",
        audioText: "Ekul. Equal."
      },
      {
        fidel: "ማወዳደር",
        english: "Mawedader",
        meaning: "To compare / Analogy",
        context: "Weighing options or measuring which sister is taller represents 'ማወዳደር'.",
        tutorTip: "Five syllables: 'Mah-ueh-dah-dehr'.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=505&auto=format&fit=crop",
        audioText: "Mawedader. To compare."
      }
    ],
    exercises: [
      {
        amharic: "እኔ እግር ኳስ መጫወት ይሻላል እላለሁ።",
        transliteration: "Ene egir kwas mechewet yishalal elalehu.",
        english: "I say playing soccer is better.",
        tip: "Form scales using balancing hands!"
      },
      {
        amharic: "ይህ ድንጋይ ከሌላው ይበልጣል።",
        transliteration: "Yih dingay kelelaw yibeltal.",
        english: "This stone is larger than the other.",
        tip: "Form a large circular framing loop depicting size!"
      }
    ],
    dialogue: {
      heading: "💬 Sizing Battles",
      scenario: "Yonas and Lydia compare their study notebooks sizes politely.",
      roles: [
        {
          character: "Yonas",
          avatar: "👦",
          bubbleSide: "left",
          amharic: "ሊዲያ ፣ የእኔ ደብተር ካንቺ ደብተር ይበልጣል?",
          transliteration: "Lydia, yene debter kanchi debter yibeltal?",
          english: "Lydia, does my notebook exceed yours in size?"
        },
        {
          character: "Lydia",
          avatar: "👧",
          bubbleSide: "right",
          amharic: "አይደለም ፤ የእኔ እና ያንተ ደብተሮች እኩል ናቸው።",
          transliteration: "Aydelem, yene ena yante debteroch ekul nachew.",
          english: "No, yours and my notebooks are equal/same size."
        }
      ]
    },
    reading: {
      heading: "📖 Reading: The Sizing Adventure",
      passageAmharic: "በትናንትናው እቅድ ሔኖክ እና ሳሮን ሜዳ ላይ ወጡ። ሔኖክ ሁለት ዛፎችን አየ። አንደኛው ዛፍ ከሌላው ይበልጣል ፤ በጣም ቁመተ ረጅም ነው። ሁለተኛው ዛፍ ግን ያንሳል። ሔኖክ 'ይህኛው ዛፍ ጥላው ይሻላል' አለ። ሳሮን ግን 'አይደለም ፤ ሁለቱም እኩል ጥቅም አላቸው' ብላ መለሰች። ማወዳደር ነገሮችን በጥልቀት ለማወቅ ይረዳል።",
      passageTransliteration: "Be tinantnaw ekid Henok ena Saron meda lay wotu. Henok hulet zafochin aye. Andeñaw zaf kelelaw yibeltal; betam kumete rejim new. Huleteñaw zaf gin yansal. Henok 'yihgnaw zaf tilaw yishalal' ale. Saron gin 'aydelem; huletum ekul tikim alachew' bila melesech. Mawedader negerochin betilket lemawok yiredal.",
      passageEnglish: "In yesterday's schedule, Henok and Saron went out to the field. Henok saw two trees. One tree was larger than the other; it was very tall. The second tree, however, was smaller. Henok said: 'This tree's shade is better'. Saron, however, replied: 'No, both of them have equal value'. Comparing helps to understand things deeply.",
      tutorTip: "Review 'Ekul' (equal) as a fundamental math and social concept."
    },
    writing: {
      heading: "✍️ Analytical Characters",
      instructions: "Practice tracing the comparative letters ይ (Yi) and ል (Li).",
      lettersToPractice: [
        {
          letter: "ይ",
          phonetic: "Yi",
          steps: ["Vertical loop side helper", "Center joint", "Root stem baseline"]
        },
        {
          letter: "ል",
          phonetic: "Li",
          steps: ["Forked start", "Center dip marker", "Right downward foot"]
        }
      ],
      wordChallenge: "እኩል"
    },
    homework: [
      "Compare two household items using 'Yibeltal' (exceeds) or 'Yansal' (less).",
      "Write 'ይህ ይሻላል' (This is better) inside your homework pad.",
      "Trace the characters ይ, ዩ, ዪ, ያ, ዬ, ይ, ዮ three times."
    ],
    submissionTip: "Upload a photo comparing a big book and small cup labeled 'Yibeltal'! 📚",
    parentActivities: [
      "Give children fruits of different sizes and let them declare which fruit 'Yibeltal'."
    ],
    tutorPacing: [
      "10 mins: Dimension comparison game.",
      "22 mins: Contrast dialogue practices.",
      "18 mins: Interactive sound bubble pop games."
    ],
    tutorTroubleshooting: [
      "Make sure children do not confuse 'Yibeltal' (larger) with 'Yansal' (smaller)."
    ],
    quiz: [
      {
        questionText: "What does 'ይበልጣል' mean?",
        options: ["It is smaller", "It exceeds / Larger", "Equal", "I ran yesterday"],
        correctAnswerIndex: 1,
        explanation: "'ይበልጣል' (Yibeltal) represents exceeding or being larger."
      },
      {
        questionText: "How do say 'It is better'?",
        options: ["ይሻላል", "የለም", "ደግ", "ዋና"],
        correctAnswerIndex: 0,
        explanation: "'ይሻላል' (Yishalal) means it is better/preferred."
      },
      {
        questionText: "What is 'እኩል'?",
        options: ["Equal / Identical", "Angry bird", "Red auto", "Big stadium"],
        correctAnswerIndex: 0,
        explanation: "'እኩል' (Ekul) represents equal or symmetry."
      },
      {
        questionText: "What represents 'To compare'?",
        options: ["መብላት", "ማጥናት", "ማወዳደር", "መተኛት"],
        correctAnswerIndex: 2,
        explanation: "'ማወዳደር' (Mawedader) is to compare."
      }
    ],
    nextLessonTitle: "Shopping Conversations"
  }
];
