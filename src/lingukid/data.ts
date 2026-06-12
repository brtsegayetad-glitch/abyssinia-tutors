import { Lesson, LeaderboardUser } from './types';

export const GEEZ_CURRICULUM: Lesson[] = [
  {
    lesson_id: 1,
    lesson_title: "The Core Foundation of Peace (Basic Hello)",
    source_reference: "5005.jpg",
    vocabulary: [
      {
        geez: "ሰላም",
        amharic_context: "ሰላምታ / ሰላም",
        english_transliteration: "Selam",
        english_translation: "Hello / Peace",
        grammatical_context: "Universal greeting"
      },
      {
        geez: "ሰላም ለከ",
        amharic_context: "ሰላም ላንተ ይሁን",
        english_transliteration: "Selam leke",
        english_translation: "Peace be unto you (masc.)",
        grammatical_context: "2nd person masculine singular (To a single male)"
      },
      {
        geez: "ሰላም ለኪ",
        amharic_context: "ሰላም ላንቺ ይሁን",
        english_transliteration: "Selam leki",
        english_translation: "Peace be unto you (fem.)",
        grammatical_context: "2nd person feminine singular (To a single female)"
      },
      {
        geez: "ሰላም ለክሙ",
        amharic_context: "ሰላም ለናንተ ይሁን ለወንዶች",
        english_transliteration: "Selam lekimu",
        english_translation: "Peace be unto you all (masc./mixed)",
        grammatical_context: "2nd person masculine plural (To a group of men/mixed)"
      },
      {
        geez: "ሰላም ለክን",
        amharic_context: "ሰላም ለናንተ ይሁን ለሴቶች",
        english_transliteration: "Selam lekin",
        english_translation: "Peace be unto you all (fem.)",
        grammatical_context: "2nd person feminine plural (To a group of women)"
      }
    ]
  },
  {
    lesson_id: 2,
    lesson_title: "Third-Person and Self-Blessings",
    source_reference: "5005.jpg & 5006.jpg",
    vocabulary: [
      {
        geez: "ሰላም ሎቱ (ሎቱ)",
        amharic_context: "ሰላም ለእሱ ይሁን",
        english_transliteration: "Selam lotu",
        english_translation: "Peace be unto him",
        grammatical_context: "3rd person masculine singular"
      },
      {
        geez: "ሰላም ሎሙ (ሎቶሙ)",
        amharic_context: "ሰላም ለእነርሱ ይሁን ለወንዶች",
        english_transliteration: "Selam lomu",
        english_translation: "Peace be unto them (masc.)",
        grammatical_context: "3rd person masculine plural"
      },
      {
        geez: "ሰላም ላቲ (ላቲ)",
        amharic_context: "ሰላም ለእሷ ይሁን",
        english_transliteration: "Selam lati",
        english_translation: "Peace be unto her",
        grammatical_context: "3rd person feminine singular"
      },
      {
        geez: "ሰላም ሎን (ሎትን)",
        amharic_context: "ሰላም ለእነርሱ ይሁን ለሴቶች",
        english_transliteration: "Selam lon",
        english_translation: "Peace be unto them (fem.)",
        grammatical_context: "3rd person feminine plural"
      },
      {
        geez: "ሰላም લીተ (ሊተ)",
        amharic_context: "ሰላም ለእኔ ይሁን",
        english_transliteration: "Selam lite",
        english_translation: "Peace be unto me",
        grammatical_context: "1st person singular"
      },
      {
        geez: "ሰላም ለነ",
        amharic_context: "ሰላም ለእኛ ይሁን",
        english_transliteration: "Selam lene",
        english_translation: "Peace be unto us",
        grammatical_context: "1st person plural"
      }
    ]
  },
  {
    lesson_id: 3,
    lesson_title: "Core Interrogatives and State-of-Being Suffixes",
    source_reference: "5006.jpg & 5007.jpg",
    vocabulary: [
      {
        geez: "እፎ",
        amharic_context: "እንዴት",
        english_transliteration: "Ifo",
        english_translation: "How",
        grammatical_context: "Interrogative particle"
      },
      {
        geez: "ኃደረ",
        amharic_context: "አደረ",
        english_transliteration: "Hadere",
        english_translation: "Passed the night",
        grammatical_context: "Verb root (To pass the night)"
      },
      {
        geez: "ውእለ",
        amharic_context: "ዋለ",
        english_transliteration: "Wi'ile",
        english_translation: "Spent the day",
        grammatical_context: "Verb root (To spend the day)"
      },
      {
        geez: "አምሰየ",
        amharic_context: "አመሸ",
        english_transliteration: "Amseye",
        english_translation: "Spent the evening",
        grammatical_context: "Verb root (To spend the evening)"
      }
    ]
  },
  {
    lesson_id: 4,
    lesson_title: "Morning Greetings (How did you pass the night?)",
    source_reference: "5007.jpg & 5008.jpg",
    vocabulary: [
      {
        geez: "እፎ ኃደርከ",
        amharic_context: "እንዴት አደርክ",
        english_transliteration: "Ifo haderke",
        english_translation: "How did you pass the night? (Good morning, masc.)",
        grammatical_context: "2nd person masculine singular"
      },
      {
        geez: "እፎ ኃደርኪ",
        amharic_context: "እንዴት አደርሽ",
        english_transliteration: "Ifo haderki",
        english_translation: "How did you pass the night? (Good morning, fem.)",
        grammatical_context: "2nd person feminine singular"
      },
      {
        geez: "እፎ ኃደርክሙ",
        amharic_context: "እንዴት አደራችሁ ለወንዶች",
        english_transliteration: "Ifo haderkimu",
        english_translation: "How did you all pass the night? (Good morning, masc./mixed)",
        grammatical_context: "2nd person masculine plural"
      },
      {
        geez: "እፎ ኃደርክን",
        amharic_context: "እንዴት አደራችሁ ለሴቶች",
        english_transliteration: "Ifo haderkin",
        english_translation: "How did you all pass the night? (Good morning, fem.)",
        grammatical_context: "2nd person feminine plural"
      },
      {
        geez: "እፎ ኃደርኩ",
        amharic_context: "እንዴት አደርኩ",
        english_transliteration: "Ifo haderku",
        english_translation: "How did I pass the night?",
        grammatical_context: "1st person singular"
      },
      {
        geez: "እፎ ኃደርነ",
        amharic_context: "እንዴት አደርን",
        english_transliteration: "Ifo haderne",
        english_translation: "How did we pass the night?",
        grammatical_context: "1st person plural"
      }
    ]
  },
  {
    lesson_id: 5,
    lesson_title: "Daytime Greetings (How did you spend the day?)",
    source_reference: "5008.jpg & 5009.jpg",
    vocabulary: [
      {
        geez: "እፎ ውእልከ",
        amharic_context: "እንዴት ዋልክ",
        english_transliteration: "Ifo wi'ilke",
        english_translation: "How did you spend the day? (Good afternoon, masc.)",
        grammatical_context: "2nd person masculine singular"
      },
      {
        geez: "እፎ ውእልኪ",
        amharic_context: "እንዴት ዋልሽ",
        english_transliteration: "Ifo wi'ilki",
        english_translation: "How did you spend the day? (Good afternoon, fem.)",
        grammatical_context: "2nd person feminine singular"
      },
      {
        geez: "እፎ ውእልክሙ",
        amharic_context: "እንዴት ዋላችሁ ለወንዶች",
        english_transliteration: "Ifo wi'ilkimu",
        english_translation: "How did you all spend the day? (Good afternoon, masc./mixed)",
        grammatical_context: "2nd person masculine plural"
      },
      {
        geez: "እፎ ውእልክን",
        amharic_context: "እንዴት ዋላችሁ ለሴቶች",
        english_transliteration: "Ifo wi'ilkin",
        english_translation: "How did you all spend the day? (Good afternoon, fem.)",
        grammatical_context: "2nd person feminine plural"
      },
      {
        geez: "እፎ ውእልኩ",
        amharic_context: "እንዴት ዋልኩ",
        english_transliteration: "Ifo wi'ilku",
        english_translation: "How did I spend the day?",
        grammatical_context: "1st person singular"
      },
      {
        geez: "እፎ ውእልነ",
        amharic_context: "እንዴት ዋልን",
        english_transliteration: "Ifo wi'ilne",
        english_translation: "How did we spend the day?",
        grammatical_context: "1st person plural"
      }
    ]
  },
  {
    lesson_id: 6,
    lesson_title: "Evening Greetings (How did you spend the evening?)",
    source_reference: "5009.jpg & 5010.jpg",
    vocabulary: [
      {
        geez: "እፎ አምሰይከ",
        amharic_context: "እንዴት አመሸህ",
        english_transliteration: "Ifo amseyke",
        english_translation: "How did you spend the evening? (Good evening, masc.)",
        grammatical_context: "2nd person masculine singular"
      },
      {
        geez: "እፎ አምሰይኪ",
        amharic_context: "እንዴት አመሸሽ",
        english_transliteration: "Ifo amseyki",
        english_translation: "How did you spend the evening? (Good evening, fem.)",
        grammatical_context: "2nd person feminine singular"
      },
      {
        geez: "እፎ አምሰይክሙ",
        amharic_context: "እንዴት አመሻችሁ ለወንዶች",
        english_transliteration: "Ifo amseykimu",
        english_translation: "How did you all spend the evening? (Good evening, masc./mixed)",
        grammatical_context: "2nd person masculine plural"
      },
      {
        geez: "እፎ አምሰይክን",
        amharic_context: "እንዴት አመሻችሁ ለሴቶች",
        english_transliteration: "Ifo amseykin",
        english_translation: "How did you all spend the evening? (Good evening, fem.)",
        grammatical_context: "2nd person feminine plural"
      },
      {
        geez: "እፎ አምሰይኩ",
        amharic_context: "እንዴት አመሸሁ",
        english_transliteration: "Ifo amseyku",
        english_translation: "How did I spend the evening?",
        grammatical_context: "1st person singular"
      },
      {
        geez: "እፎ አምሰይነ",
        amharic_context: "እንዴት አመሸን",
        english_transliteration: "Ifo amseyne",
        english_translation: "How did we spend the evening?",
        grammatical_context: "1st person plural"
      }
    ]
  },
  {
    lesson_id: 7,
    lesson_title: "Formal Family & Respectful Spiritual Greetings",
    source_reference: "5010.jpg, 5011.jpg & 5012.jpg",
    vocabulary: [
      {
        geez: "እፎ ውእልከ አቡየ እግዚአብሔር ምስሌከ",
        amharic_context: "አባቴ ሆይ እንዴት ዋልክ እግዚአብሔር ካንተጋር ይሁን",
        english_transliteration: "Ifo wi'ilke abuye Egziabhier misleke",
        english_translation: "My Father, how did you spend the day? May God be with you.",
        grammatical_context: "Formal address to an elder male/father figure"
      },
      {
        geez: "ኦ ወልድየ እግዚአብሔር ይሴብሕ አምላከ አበዊነ",
        amharic_context: "ልጄ ሆይ የአባቶቻችን አምላክ እግዚአብሔር ይመስገን",
        english_transliteration: "O weldiyet Egziabhier yisebih amlake abewine",
        english_translation: "Oh my child, praised be God, the God of our fathers.",
        grammatical_context: "Formal blessing/response to a child"
      },
      {
        geez: "እፎ ኃደርኪ ኦ እምየ ጥዒና የሀብኪ ልብ",
        amharic_context: "እናቴ ሆይ እንዴት አደርሽ ጤና ይስጥልኝ",
        english_transliteration: "Ifo haderki o imiye t'ina yehabki lib",
        english_translation: "My Mother, how did you pass the night? May He grant you health and strength of heart.",
        grammatical_context: "Formal address to an elder female/mother figure"
      },
      {
        geez: "እፎ ውእልከ እኁየ እግዚአብሔር የሀሉ ምስሌከ",
        amharic_context: "ወንድሜ ሆይ እንዴት ዋልክ እግዚአብሔር ከአንተ ጋር ይሁን",
        english_transliteration: "Ifo wi'ilke ihuye Egziabhier yehalu misleke",
        english_translation: "My Brother, how did you spend the day? May God be with you.",
        grammatical_context: "Respectful address to a brother/peer male"
      },
      {
        geez: "ሰላም ለኪ",
        amharic_context: "ሰላም ላንቺ ይሁን እህቴ",
        english_transliteration: "Selam leki",
        english_translation: "Peace be unto you, my sister.",
        grammatical_context: "Address to a sister/peer female (Short form shown in 5012.jpg)"
      }
    ]
  },
  {
    lesson_id: 8,
    lesson_title: "Biographical Exchanges (Name, Age, and Origin)",
    source_reference: "5011.jpg, 5013.jpg & 5014.jpg",
    vocabulary: [
      {
        geez: "መኑ ስምከ?",
        amharic_context: "ስምህ ማን ነው",
        english_transliteration: "Menu simke?",
        english_translation: "What is your name?",
        grammatical_context: "Interrogative targeting a male subject"
      },
      {
        geez: "ስምየ _____ ውእቱ::",
        amharic_context: "ስሜ ____ ይባላል",
        english_transliteration: "Simiye _____ wi'itu::",
        english_translation: "My name is _____.",
        grammatical_context: "1st person self-identification template"
      },
      {
        geez: "ኮነ ድኅነ ወልድየ",
        amharic_context: "ደህና ሁን ልጄ",
        english_transliteration: "Kone dihne weldye",
        english_translation: "Goodbye / Stay safe, my child.",
        grammatical_context: "Parting phrase spoken to a younger person"
      },
      {
        geez: "ኮኑ ድኅነ አኃውየ",
        amharic_context: "ደህና ሁኑ ወንድሞቼ",
        english_transliteration: "Konu dihne ahawye",
        english_translation: "Goodbye / Stay safe, my brothers.",
        grammatical_context: "Parting phrase spoken to multiple brothers/peers"
      },
      {
        geez: "እም አይቴ መጻእከ?",
        amharic_context: "ከየት ነው የመጣኸው",
        english_transliteration: "Im aytie metsa'ike?",
        english_translation: "Where did you come from?",
        grammatical_context: "Interrogative regarding origin (to a male)"
      },
      {
        geez: "እስፍት ውእቱ ዕድሜከ?",
        amharic_context: "እድሜህ ስንት ነው",
        english_transliteration: "Isfit wi'itu idmieke?",
        english_translation: "How old are you?",
        grammatical_context: "Interrogative regarding age (to a male)"
      },
      {
        geez: "ዕድሜየ _____ ውእቱ::",
        amharic_context: "እድሜዬ ____ ነው",
        english_transliteration: "Idmieye _____ wi'itu::",
        english_translation: "My age is _____.",
        grammatical_context: "1st person statement of age template"
      },
      {
        geez: "አይቴ ውእቱ ምንባርከ/ኪ?",
        amharic_context: "የት ነው የምትኖረው/ሪው",
        english_transliteration: "Aytie wi'itu minbarke/ki?",
        english_translation: "Where do you live?",
        grammatical_context: "Interrogative regarding current address"
      },
      {
        geez: "ምንባርየ _____ ውእቱ::",
        amharic_context: "የምኖረው ____ ነው",
        english_transliteration: "Minbariye _____ wi'itu::",
        english_translation: "My residence is _____.",
        grammatical_context: "1st person statement of residence template"
      },
      {
        geez: "ሕይወት እፎ ውእቱ?",
        amharic_context: "ህይወት እንዴት ነው",
        english_transliteration: "Hiywot ifo wi'itu?",
        english_translation: "How is life?",
        grammatical_context: "General idiomatic inquiry"
      },
      {
        geez: "ማእዜ ተወለድከ?",
        amharic_context: "መቼ ተወለድክ",
        english_transliteration: "Ma'izie teweledke?",
        english_translation: "When were you born?",
        grammatical_context: "Interrogative regarding birth date"
      },
      {
        geez: "ዘተወለድኩ ____ ዓ.ም ውእቱ::",
        amharic_context: "የተወለድኩት በ ____ ዓ.ም ነው::",
        english_transliteration: "Zeteweledku ____ a.m wi'itu::",
        english_translation: "I was born in the year ____ (Ethiopian Calendar).",
        grammatical_context: "1st person statement of birth year template"
      },
      {
        geez: "አይቴ ተወለድከ?",
        amharic_context: "የት ተወለድክ",
        english_transliteration: "Aytie teweledke?",
        english_translation: "Where were you born?",
        grammatical_context: "Interrogative regarding birth place"
      },
      {
        geez: "ዘተወለድኩ ------ ውእቱ::",
        amharic_context: "የተወለድኩት በ ____ ነው::",
        english_transliteration: "Zeteweledku ------ wi'itu::",
        english_translation: "I was born in ______.",
        grammatical_context: "1st person statement of birth place template"
      }
    ]
  },
  {
    lesson_id: 9,
    lesson_title: "Daily Errands and Navigation",
    source_reference: "5014_2.jpg & 5015.jpg",
    vocabulary: [
      {
        geez: "ኦ እኁየ ኀበ አይቴ ተሐውር?",
        amharic_context: "ወንድሜ ሆይ ወዴት ትሄዳለህ",
        english_transliteration: "O ihuye habe aytie tehawir?",
        english_translation: "Oh my brother, where are you going?",
        grammatical_context: "2nd person masculine singular interrogative"
      },
      {
        geez: "አሐውር ኀበ ቤተ ትምህርት",
        amharic_context: "ወደ ትምህርት ቤት እሄዳለሁ",
        english_transliteration: "Ahawir habe biete timhirt",
        english_translation: "I am going to school.",
        grammatical_context: "1st person continuous action"
      },
      {
        geez: "ኦ እኅትየ እንተስ ኀበ አይቴ ተሐውሪ?",
        amharic_context: "እህቴ ሆይ አንቺስ ወዴት ትሄጃለሽ",
        english_transliteration: "O ihtiye intes habe aytie tehawiri?",
        english_translation: "Oh my sister, where are you going?",
        grammatical_context: "2nd person feminine singular interrogative"
      },
      {
        geez: "አሐውር ኀበ ቤተ ክርስቲያን",
        amharic_context: "ወደ ቤተ ክርስቲያን እሄዳለሁ",
        english_transliteration: "Ahawir habe biete kristiyan",
        english_translation: "I am going to church.",
        grammatical_context: "1st person continuous action"
      }
    ]
  },
  {
    lesson_id: 10,
    lesson_title: "Inquiring About Family Identities",
    source_reference: "5015.jpg & 5016.jpg",
    vocabulary: [
      {
        geez: "መኑ ስመ አቡከ/ኪ?",
        amharic_context: "የአባትህ/ሽ/ ስም ማነው",
        english_transliteration: "Menu sime abuke/ki?",
        english_translation: "What is your father's name?",
        grammatical_context: "Possessive phrase with dual-gender markers"
      },
      {
        geez: "ስመ አቡየ--- ውእቱ::",
        amharic_context: "የአባቴ ስም ___ ነው",
        english_transliteration: "Sime abuye--- wi'itu::",
        english_translation: "My father's name is ___.",
        grammatical_context: "1st person ownership structure"
      },
      {
        geez: "መኑ ስመ እምከ /ኪ/",
        amharic_context: "የእናትህ/ሽ/ ስም ማነው",
        english_transliteration: "Menu sime imke /ki/",
        english_translation: "What is your mother's name?",
        grammatical_context: "Possessive phrase with dual-gender markers"
      },
      {
        geez: "ስመ እምየ --- ውእቱ::",
        amharic_context: "የእናቴ ስም _____ ነው",
        english_transliteration: "Sime imye --- wi'itu::",
        english_translation: "My mother's name is _____.",
        grammatical_context: "1st person ownership structure"
      }
    ]
  },
  {
    lesson_id: 11,
    lesson_title: "Professional and Metaphorical Greetings",
    source_reference: "5016.jpg",
    vocabulary: [
      {
        geez: "ሥራህ/ሽ/ ምንድነው",
        amharic_context: "ስራህ/ሽ/ ምንድነው",
        english_transliteration: "Mint wi'itu gibirh/ki",
        english_translation: "What is your job?",
        grammatical_context: "Inquiry regarding occupation"
      },
      {
        geez: "ግብርየ _____ ውእቱ::",
        amharic_context: "ስራዬ _____ ነው",
        english_transliteration: "Gibirye _____ wi'itu::",
        english_translation: "My job is _____.",
        grammatical_context: "1st person job designation"
      },
      {
        geez: "በሰላም ያገናኘን እናቴ",
        amharic_context: "በሰላም ያገናኘን እናቴ",
        english_transliteration: "Beselam yaslegenen imye",
        english_translation: "May we meet again in peace, my mother.",
        grammatical_context: "Cultural parting blessing"
      },
      {
        geez: "ዐይን ለዐይን ያገናኘን",
        amharic_context: "አይን ለአይን ያገናኘን",
        english_transliteration: "Ayn le'ayn yaslegenen",
        english_translation: "May we meet face to face (eye to eye) again.",
        grammatical_context: "Idiomatic parting idiom"
      }
    ]
  },
  {
    lesson_id: 12,
    lesson_title: "Imperative Leave-Taking",
    source_reference: "5017.jpg & 5018.jpg",
    vocabulary: [
      {
        geez: "ሰላም ሁን",
        amharic_context: "ሰላም ሁን",
        english_transliteration: "Selam kun",
        english_translation: "Be in peace / Goodbye.",
        grammatical_context: "2nd person masculine singular imperative"
      },
      {
        geez: "ሰላም ሁኚ",
        amharic_context: "ሰላም ሁኚ",
        english_transliteration: "Selam kuni",
        english_translation: "Be in peace / Goodbye.",
        grammatical_context: "2nd person feminine singular imperative"
      },
      {
        geez: "ሰላም እደሩ/ ዋሉ/ እመሹ",
        amharic_context: "ሰላም እደሩ/ ዋሉ/ እመሹ",
        english_transliteration: "Selam hideru / walu / amsiyu",
        english_translation: "Good night / Good day / Good evening (To a group).",
        grammatical_context: "2nd person plural conditional farewell"
      }
    ]
  },
  {
    lesson_id: 13,
    lesson_title: "Formal Wishes of Safe Passage",
    source_reference: "5018.jpg & 5019.jpg",
    vocabulary: [
      {
        geez: "ደህና ሁን",
        amharic_context: "ደህና ሁን",
        english_transliteration: "Dehna hun",
        english_translation: "Be safe / Goodbye.",
        grammatical_context: "Masculine singular farewell"
      },
      {
        geez: "ደህና ሁኚ",
        amharic_context: "ደህና ሁኚ",
        english_transliteration: "Dehna kuni",
        english_translation: "Be safe / Goodbye.",
        grammatical_context: "Feminine singular farewell"
      },
      {
        geez: "ደህና እደሩ/ ዋሉ/ እመሹ",
        amharic_context: "ደህና እደሩ/ ዋሉ/ እመሹ",
        english_transliteration: "Dehna hideru / walu / amsiyu",
        english_translation: "Parting well-wishes based on time of day (Group context).",
        grammatical_context: "Plural safety parting"
      }
    ]
  },
  {
    lesson_id: 14,
    lesson_title: "Divine Protection and Parting Benedictions",
    source_reference: "5019.jpg & 5020.jpg",
    vocabulary: [
      {
        geez: "እግዚአብሔር ከባንተ ጋር ይሁን",
        amharic_context: "እግዚአብሔር ከባንተ ጋር ይሁን",
        english_transliteration: "Egziabhier yikun misleke",
        english_translation: "May God be with you.",
        grammatical_context: "Spiritual parting to a male"
      },
      {
        geez: "እግዚአብሔር ከእናንተ ጋር ይሁን",
        amharic_context: "እግዚአብሔር ከእናንተ ጋር ይሁን",
        english_transliteration: "Egziabhier yikun mislekimu",
        english_translation: "May God be with you all.",
        grammatical_context: "Spiritual parting to a group of men/mixed"
      },
      {
        geez: "እግዚአብሔር ከአንቺ ጋር ይሁን",
        amharic_context: "እግዚአብሔር ከአንቺ ጋር ይሁን",
        english_transliteration: "Egziabhier yikun misleki",
        english_translation: "May God be with you.",
        grammatical_context: "Spiritual parting to a female"
      },
      {
        geez: "እግዚአብሔር ከእናንተ ጋር ይሁን (ለሴቶች)",
        amharic_context: "እግዚአብሔር ከእናንተ ጋር ይሁን ለሴቶች",
        english_transliteration: "Egziabhier yikun mislekin",
        english_translation: "May God be with you all.",
        grammatical_context: "Spiritual parting to a group of women"
      },
      {
        geez: "መልካም ቀን ይሁንልህ",
        amharic_context: "መልካም ቀን ይሁንልህ",
        english_transliteration: "Senay ilet yikun leke",
        english_translation: "Have a good day.",
        grammatical_context: "Temporal well-wish to a male"
      },
      {
        geez: "መልካም ቀን ይሁንላችሁ",
        amharic_context: "መልካም ቀን ይሁንላችሁ",
        english_transliteration: "Senay ilet yikun lekimu",
        english_translation: "Have a good day to you all.",
        grammatical_context: "Temporal well-wish to a mixed group"
      }
    ]
  },
  {
    lesson_id: 15,
    lesson_title: "Core Demonstrative Directives",
    source_reference: "5021.jpg & 5022.jpg",
    module: "demonstratives",
    vocabulary: [
      {
        geez: "ዝኩ / ዝክቱ / ዝስቱ / ውእቱ",
        amharic_context: "ያ (ያኛው)",
        english_transliteration: "Ziku / Ziktu / Zistu / Wi'itu",
        english_translation: "That (Far)",
        grammatical_context: "Demonstrative: Masculine Singular - Far"
      },
      {
        geez: "እንተክቲ (እንትኩ)",
        amharic_context: "ያቺ",
        english_transliteration: "Intekiti (Intiku)",
        english_translation: "That (Fem. Far)",
        grammatical_context: "Demonstrative: Feminine Singular - Far"
      },
      {
        geez: "ዝ (ዝንቱ)",
        amharic_context: "ይህ",
        english_transliteration: "Zi (Zintu)",
        english_translation: "This (Masc. Near)",
        grammatical_context: "Demonstrative: Masculine Singular - Near"
      },
      {
        geez: "ዛ (ዛቲ)",
        amharic_context: "ይቺ",
        english_transliteration: "Za (Zati)",
        english_translation: "This (Fem. Near)",
        grammatical_context: "Demonstrative: Feminine Singular - Near"
      },
      {
        geez: "እሙንቱ (እልክቱ)",
        amharic_context: "እነዚያ ለወንዶች",
        english_transliteration: "Emuntu (Elkitu)",
        english_translation: "Those (Masc. Plural Far)",
        grammatical_context: "Demonstrative: Masculine Plural - Far"
      },
      {
        geez: "እማንቱ (እልክን)",
        amharic_context: "እነዚያ ለሴቶች",
        english_transliteration: "Emantu (Elkin)",
        english_translation: "Those (Fem. Plural Far)",
        grammatical_context: "Demonstrative: Feminine Plural - Far"
      },
      {
        geez: "እሉ (እሎንቱ)",
        amharic_context: "እነዚህ ለወንዶች",
        english_transliteration: "Elu (Elontu)",
        english_translation: "These (Masc. Plural Near)",
        grammatical_context: "Demonstrative: Masculine Plural - Near"
      },
      {
        geez: "እላ (እላንቱ)",
        amharic_context: "እነዚህ ለሴቶች",
        english_transliteration: "Ela (Elantu)",
        english_translation: "These (Fem. Plural Near)",
        grammatical_context: "Demonstrative: Feminine Plural - Near"
      }
    ]
  },
  {
    lesson_id: 16,
    lesson_title: "Demonstrative Sentences and Possession",
    source_reference: "5022.jpg",
    module: "demonstratives",
    vocabulary: [
      {
        geez: "ዝንቱ ውእቱ አቡየ",
        amharic_context: "ይህ አባቴ ነው",
        english_transliteration: "Zintu wi'itu abuye",
        english_translation: "This is my father.",
        grammatical_context: "Syntax: ዝንቱ (This) + ውእቱ (is) + አቡየ (my father)"
      },
      {
        geez: "ውእቱ አፍቀረ ኪያሃ",
        amharic_context: "እሱ እሷን ወደደ",
        english_transliteration: "Wi'itu afkere kiyaha",
        english_translation: "He loved her.",
        grammatical_context: "Syntax: ውእቱ (He) + አፍቀረ (loved) + ኪያሃ (her)"
      },
      {
        geez: "ይእቲ ጸውዐት ኪያከ",
        amharic_context: "እሷ አንተን ጠራች",
        english_transliteration: "Yi'iti tsew'at kiyake",
        english_translation: "She called you.",
        grammatical_context: "Syntax: ይእቲ (She) + ጸውዐት (called) + ኪያከ (you, masc.)"
      },
      {
        geez: "ዝንቱ መጽሐፍ ዚአየ ውእቱ",
        amharic_context: "ይህ መጽሐፍ የኔ ነው",
        english_transliteration: "Zintu metshaf zi'aye wi'itu",
        english_translation: "This book is mine.",
        grammatical_context: "Syntax: ዝንቱ (This) + መጽሐፍ (book) + ዚአየ (mine) + ውእቱ (is)"
      },
      {
        geez: "ዛቲ ዓለም ዚአነ ይእቲ",
        amharic_context: "ይቺ ዓለም የኛ ናት",
        english_transliteration: "Zati alem zi'ane yi'iti",
        english_translation: "This world is ours.",
        grammatical_context: "Syntax: ዛቲ (This, fem.) + ዓለም (world) + ዚአነ (ours) + ይእቲ (is)"
      },
      {
        geez: "ዝንቱ ወልድ ዚአሁ ውእቱ",
        amharic_context: "ይህ ልጅ የእርሱ ነው",
        english_transliteration: "Zintu weld zi'ahu wi'itu",
        english_translation: "This child is his.",
        grammatical_context: "Syntax: ዝንቱ (This) + ወልድ (child/son) + ዚአሁ (his) + ውእቱ (is)"
      }
    ],
    sentences: [
      {
        amharic_phrase: "ይህ አባቴ ነው",
        geez_phrase: "ዝንቱ ውእቱ አቡየ",
        english_translation: "This is my father.",
        syntax_breakdown: {
          "demonstrative": "ዝንቱ (This)",
          "copula": "ውእቱ (is)",
          "subject": "አቡየ (my father)"
        }
      },
      {
        amharic_phrase: "እሱ እሷን ወደደ",
        geez_phrase: "ውእቱ አፍቀረ ኪያሃ",
        english_translation: "He loved her.",
        syntax_breakdown: {
          "subject_pronoun": "ውእቱ (He)",
          "verb": "አፍቀረ (loved)",
          "object_pronoun": "ኪያሃ (her)"
        }
      },
      {
        amharic_phrase: "እሷ አንተን ጠራች",
        geez_phrase: "ይእቲ ጸውዐት ኪያከ",
        english_translation: "She called you.",
        syntax_breakdown: {
          "subject_pronoun": "ይእቲ (She)",
          "verb": "ጸውዐት (called)",
          "object_pronoun": "ኪያከ (you, masc.)"
        }
      },
      {
        amharic_phrase: "ይህ መጽሐፍ የኔ ነው",
        geez_phrase: "ዝንቱ መጽሐፍ ዚአየ ውእቱ",
        english_translation: "This book is mine.",
        syntax_breakdown: {
          "demonstrative": "ዝንቱ (This)",
          "noun": "መጽሐፍ (book)",
          "possessive": "ዚአየ (mine)",
          "copula": "ውእቱ (is)"
        }
      },
      {
        amharic_phrase: "ይቺ ዓለም የኛ ናት",
        geez_phrase: "ዛቲ ዓለም ዚአነ ይእቲ",
        english_translation: "This world is ours.",
        syntax_breakdown: {
          "demonstrative": "ዛቲ (This, fem.)",
          "noun": "ዓለም (world)",
          "possessive": "ዚአነ (ours)",
          "copula": "ይእቲ (is)"
        }
      },
      {
        amharic_phrase: "ይህ ልጅ የእርሱ ነው",
        geez_phrase: "ዝንቱ ወልድ ዚአሁ ውእቱ",
        english_translation: "This child is his.",
        syntax_breakdown: {
          "demonstrative": "ዝንቱ (This)",
          "noun": "ወልድ (child/son)",
          "possessive": "ዚአሁ (his)",
          "copula": "ውእቱ (is)"
        }
      }
    ]
  },
  {
    lesson_id: 17,
    lesson_title: "The Head, Face, and Vocal Elements",
    source_reference: "5023.jpg, 5024.jpg, 5025.jpg, 5026.jpg & 5027.jpg",
    module: "anatomy",
    vocabulary: [
      { geez: "ርእስ፤አርእስት", amharic_context: "ራስ፤ራሶች", english_transliteration: "Re'is / Are'ist", english_translation: "Head ፤ Heads", grammatical_context: "Masc. Singular ፤ Plural noun" },
      { geez: "ሲበት", amharic_context: "ሽበት", english_transliteration: "Sibet", english_translation: "Gray Hair", grammatical_context: "Noun: Gray hair" },
      { geez: "ገጽ፤ገጻት", amharic_context: "ፊቶች", english_transliteration: "Gets' / Gets'at", english_translation: "Face ፤ Faces", grammatical_context: "Masc. Singular ፤ Plural noun" },
      { geez: "ድማህ", amharic_context: "መሃል ራስ", english_transliteration: "Dimah", english_translation: "Crown of the Head", grammatical_context: "Noun: Crown of the head" },
      { geez: "ፍጽም", amharic_context: "ግንባር", english_transliteration: "Fits'im", english_translation: "Forehead", grammatical_context: "Noun: Forehead" },
      { geez: "ናላ", amharic_context: "አናት", english_transliteration: "Nala", english_translation: "Top of Skull", grammatical_context: "Noun: Top of head / brain zone" },
      { geez: "ስእርት", amharic_context: "የራስ ፀጉር", english_transliteration: "Si'irt", english_translation: "Hair (of head)", grammatical_context: "Noun: Head hair (fem.)" },
      { geez: "ጽፍሮ", amharic_context: "ሹሩባ", english_transliteration: "Ts'ifro", english_translation: "Braided Hair", grammatical_context: "Noun: Braided/plaited hair" },
      { geez: "ድምድማ", amharic_context: "የተበጠረ ጎፈሬ", english_transliteration: "Dimdima", english_translation: "Combed Afro / Full Hair", grammatical_context: "Noun: Abundant/well-combed hair" },
      { geez: "ቀሪነብ፤ቀራንብት", amharic_context: "ቅንድብ፤ቅንድቦች", english_transliteration: "Kerineb / Keranibt", english_translation: "Eyebrow ፤ Eyebrows", grammatical_context: "Masc. Singular ፤ Plural noun" },
      { geez: "ከዋላ", amharic_context: "ኌላ", english_transliteration: "Kewala", english_translation: "Back of the Head", grammatical_context: "Noun: Backpart/rear of skull" },
      { geez: "ስን፤አስናን", amharic_context: "ጥርሶች", english_transliteration: "Sin / Asnan", english_translation: "Tooth ፤ Teeth", grammatical_context: "Masc. Singular ፤ Plural noun" },
      { geez: "መንከስ", amharic_context: "መንጋጋ", english_transliteration: "Menkes", english_translation: "Jawbone", grammatical_context: "Noun: Jaw or chin" },
      { geez: "መልታሕ፤መለታሕት", amharic_context: "ጉንጭ፤ጉንጮች", english_transliteration: "Meltah / Meletahit", english_translation: "Cheek ፤ Cheeks", grammatical_context: "Masc. Singular ፤ Plural noun" },
      { geez: "ዐይን፤አዕይንት", amharic_context: "አይን፤አይኖች", english_transliteration: "Ayn / A'iynt", english_translation: "Eye ፤ Eyes", grammatical_context: "Fem. Singular ፤ Plural noun" },
      { geez: "እዝን", amharic_context: "ጆሮ", english_transliteration: "Ezin", english_translation: "Ear", grammatical_context: "Fem. Singular noun" },
      { geez: "ምጕንጻፍ", amharic_context: "ሽፋል", english_transliteration: "Migwints'af", english_translation: "Eyelid", grammatical_context: "Noun: Eyelid / eyelash cover" },
      { geez: "አንፍ፤አዕናፍ", amharic_context: "አፍንጫ፤አፍንጫዎች", english_transliteration: "Anf / A'naf", english_translation: "Nose ፤ Noses", grammatical_context: "Masc. Singular ፤ Plural noun" },
      { geez: "አፍ፤አፉህ", amharic_context: "አፍ፤አፎች", english_transliteration: "Af / Afuh", english_translation: "Mouth ፤ Mouths", grammatical_context: "Masc. Singular ፤ Plural" },
      { geez: "ከንፈር፤ከነፍር", amharic_context: "ከንፈር፤ከንፈሮች", english_transliteration: "Kenfer / Kenefr", english_translation: "Lip ፤ Lips", grammatical_context: "Masc. Singular ፤ Plural noun" },
      { geez: "ትናግ", amharic_context: "ላንቃ", english_transliteration: "Tinag", english_translation: "Palate", grammatical_context: "Noun: Roof of the mouth" },
      { geez: "ልሳን", amharic_context: "ምላስ፤አንደበት", english_transliteration: "Lisan", english_translation: "Tongue / Utterance", grammatical_context: "Masc. Singular noun" },
      { geez: "አስተንፍሶ", amharic_context: "ትነፋሽ", english_transliteration: "Astenfiso", english_translation: "Breath", grammatical_context: "Noun: Breath or breathing" },
      { geez: "ቃል", amharic_context: "ቃል", english_transliteration: "Kal", english_translation: "Voice / Word", grammatical_context: "Noun: Voice or spoken sound" },
      { geez: "ጕርዔ", amharic_context: "ጉሮሮ", english_transliteration: "Guri'ie", english_translation: "Throat", grammatical_context: "Noun: Throat or gullet" },
      { geez: "ምራቅ", amharic_context: "ምራቅ", english_transliteration: "Miraq", english_translation: "Saliva", grammatical_context: "Noun" },
      { geez: "ክሳድ", amharic_context: "አንገት", english_transliteration: "Kisad", english_translation: "Neck", grammatical_context: "Noun: Neck / nape" },
      { geez: "ጽሕም", amharic_context: "ጠጅና", english_transliteration: "Ts'ihm", english_translation: "Beard", grammatical_context: "Noun: Beard / whiskers" }
    ]
  },
  {
    lesson_id: 18,
    lesson_title: "Torso, Limbs, and Vital Organs",
    source_reference: "5027.jpg, 5028.jpg, 5029.jpg, 5030.jpg & 5031.jpg",
    module: "anatomy",
    vocabulary: [
      { geez: "መትከፍ", amharic_context: "ትከሻ", english_transliteration: "Metkef", english_translation: "Shoulder", grammatical_context: "Noun: Shoulder piece" },
      { geez: "ዘባን", amharic_context: "ጀርባ", english_transliteration: "Zeban", english_translation: "Upper Back", grammatical_context: "Noun: Back or ridge" },
      { geez: "አንጋድዕ", amharic_context: "ደረት", english_transliteration: "Anngadi'i", english_translation: "Chest", grammatical_context: "Noun: Chest or breastbone" },
      { geez: "ሕፅን", amharic_context: "ጡት", english_transliteration: "Hits'in", english_translation: "Breast / Bosom", grammatical_context: "Noun: Bosom or lap area" },
      { geez: "እድ፤እደው/እደያሁ", amharic_context: "እጅ፤እጆች", english_transliteration: "Id / Idew", english_translation: "Hand/Arm ፤ Hands/Arms", grammatical_context: "Noun: Singular ፤ Plural (fem.)" },
      { geez: "መዘገብት", amharic_context: "መዳፍ", english_transliteration: "Mezegebt", english_translation: "Palm", grammatical_context: "Noun: Palm of the hand" },
      { geez: "ኵርናዕ", amharic_context: "ክርን", english_transliteration: "Kwerna'i", english_translation: "Elbow", grammatical_context: "Noun: Elbow, angle" },
      { geez: "እመት", amharic_context: "ክንድ", english_transliteration: "Imet", english_translation: "Forearm", grammatical_context: "Noun: Forearm / cubit measurement" },
      { geez: "አጽባዕ፤አጻብዕ", amharic_context: "ጣት፤ጣቶች", english_transliteration: "Ats'ba'i / Ats'abi'i", english_translation: "Finger ፤ Fingers", grammatical_context: "Noun: Singular ፤ Plural (fem.)" },
      { geez: "ጽፍር፤ጽፍራት/አጽፋር", amharic_context: "ጥፍር፤ጥፍሮች", english_transliteration: "Ts'ifr / Ts'ifrat", english_translation: "Nail ፤ Nails", grammatical_context: "Noun: Singular ፤ Plural" },
      { geez: "ገቦ፤ገቦአት", amharic_context: "ጎን፤ጎኖች", english_transliteration: "Gebo / Gebo'at", english_translation: "Side ፤ Sides", grammatical_context: "Noun: Singular ፤ Plural" },
      { geez: "ከርስ/ከብድ", amharic_context: "ሆድ", english_transliteration: "Kers / Kebd", english_translation: "Stomach", grammatical_context: "Noun: Belly or abdomen" },
      { geez: "ልብ/ልቡና፤አልባብ", amharic_context: "ልብ፤ልቦች", english_transliteration: "Lib / Libuna", english_translation: "Heart ፤ Hearts", grammatical_context: "Noun: Sing. ፤ Plur. (Masc.)" },
      { geez: "አማዑት", amharic_context: "አንጀት", english_transliteration: "Ama'ut", english_translation: "Intestines", grammatical_context: "Noun plural (bowels/innards)" },
      { geez: "ንዋየ ውስጥ", amharic_context: "ሆድ ዕቃ", english_transliteration: "Niwaye Wist'", english_translation: "Internal Organs", grammatical_context: "Complex Noun: Vessels within" },
      { geez: "ሐቁ", amharic_context: "ወገብ", english_transliteration: "Haqu", english_translation: "Waist", grammatical_context: "Noun: Flank or lumbar region" },
      { geez: "ኵሊት፤ኵላያት", amharic_context: "ኩላሊት", english_transliteration: "Kwlits / Kwlayat", english_translation: "Kidney ፤ Kidneys", grammatical_context: "Noun: Singular ፤ Plural" },
      { geez: "ቁይጽ", amharic_context: "ጭን", english_transliteration: "Kuyts'", english_translation: "Thigh", grammatical_context: "Noun: Hip, thigh, thighbone" },
      { geez: "ብርክ፤አብራክ", amharic_context: "ጉልበት", english_transliteration: "Birk / Abrak", english_translation: "Knee ፤ Knees", grammatical_context: "Noun: Singular ፤ Plural" },
      { geez: "እግር፤አእጋር", amharic_context: "እግር፤እግሮች", english_transliteration: "Egr / A'egar", english_translation: "Foot/Leg ፤ Feet/Legs", grammatical_context: "Noun: Singular ፤ Plural (fem.)" },
      { geez: "ሰኰና", amharic_context: "ተረከዝ", english_transliteration: "Sekona", english_translation: "Heel", grammatical_context: "Noun: Heel or hoof" }
    ]
  },
  {
    lesson_id: 19,
    lesson_title: "Stature, Measurements, and Attributes",
    source_reference: "5031.jpg & 5032.jpg",
    module: "anatomy",
    vocabulary: [
      { geez: "ቆም", amharic_context: "ቁመት", english_transliteration: "K'om", english_translation: "Height / Stature", grammatical_context: "Noun: Stature or standing" },
      { geez: "መልክእ", amharic_context: "መልክ", english_transliteration: "Melki'i", english_translation: "Appearance / Form", grammatical_context: "Noun: Figure, feature, image" },
      { geez: "ቀይሕ፤ቀይሐን", amharic_context: "ቀይ፤ቀዮች", english_transliteration: "K'eyih / K'eyihan", english_translation: "Fair-skinned ፤ Plural", grammatical_context: "Adjective: Masc. Singular ፤ Plural" },
      { geez: "ጸሊም፤ጸሊማን", amharic_context: "ጥቁር፤ጥቁሮች", english_transliteration: "Ts'elim / Ts'eliman", english_translation: "Dark-skinned ፤ Plural", grammatical_context: "Adjective: Masc. Singular ፤ Plural" },
      { geez: "ነዋኅ፤ነዋኃን", amharic_context: "ረጅም፤ረጃጅሞች", english_transliteration: "Newah / Newahan", english_translation: "Tall ፤ Tall Plural", grammatical_context: "Adjective: Masc. Singular ፤ Plural" },
      { geez: "ሐፂር", amharic_context: "አጭር", english_transliteration: "Hats'ir", english_translation: "Short", grammatical_context: "Adjective: Masc. Singular" },
      { geez: "ሰንበል", amharic_context: "ዛላ/ውበት", english_transliteration: "Senbel", english_translation: "Graceful Figure / Splendor", grammatical_context: "Noun: Fine physical stature" },
      { geez: "ዐፅም፤አዕፅምት", amharic_context: "አጥንት", english_transliteration: "Ats'im / A'ts'imt", english_translation: "Bone ፤ Bones", grammatical_context: "Noun: Masc. Singular ፤ Plural" },
      { geez: "ግዙፍ", amharic_context: "ወፍራም", english_transliteration: "Gizuf", english_translation: "Thick / Stout", grammatical_context: "Adjective: Robust or thick" },
      { geez: "ላሕይ", amharic_context: "ደም ግባት", english_transliteration: "Lahiy", english_translation: "Healthy Complexion / Glow", grammatical_context: "Noun: Beauty of face, luster" },
      { geez: "ሐፍ", amharic_context: "ወዝ", english_transliteration: "Haf", english_translation: "Lustre / Sweat", grammatical_context: "Noun: Moisture or sweat" },
      { geez: "ሠናይ", amharic_context: "ቆንጆ", english_transliteration: "Senay", english_translation: "Beautiful", grammatical_context: "Adjective: Good, fine, handsome" }
    ]
  },
  {
    lesson_id: 20,
    lesson_title: "Core Meals, Vegetables, and Basic Stews",
    source_reference: "5033.jpg, 5034.jpg & 5035.jpg",
    module: "food",
    vocabulary: [
      { geez: "ፍተ-ደቅህ", amharic_context: "ቁርስ", english_transliteration: "Fite-Deqih", english_translation: "Breakfast", grammatical_context: "Noun: Breakfast meal" },
      { geez: "ምሳሕ", amharic_context: "ምሳ", english_transliteration: "Misah", english_translation: "Lunch", grammatical_context: "Noun: Lunch meal" },
      { geez: "ድራር", amharic_context: "እራት", english_transliteration: "Dirar", english_translation: "Dinner / Supper", grammatical_context: "Noun: Evening meal" },
      { geez: "ምግብ", amharic_context: "ምግብ", english_transliteration: "Migib", english_translation: "Food", grammatical_context: "Noun" },
      { geez: "ቤተ-ምግብ", amharic_context: "የምግብ አዳራሽ", english_transliteration: "Biete-Migib", english_translation: "Dining Hall / Restaurant", grammatical_context: "Noun: Dining house" },
      { geez: "ተመጋቢ", amharic_context: "ተመጋቢ", english_transliteration: "Temegabi", english_translation: "Consumer / Diner", grammatical_context: "Noun: One who eats" },
      { geez: "መጋቢ", amharic_context: "መጋቢ", english_transliteration: "Megabi", english_translation: "Provider of food / Steward", grammatical_context: "Noun: Provider or manager" },
      { geez: "ፍስሕ", amharic_context: "ግብዣ", english_transliteration: "Fisih", english_translation: "Feast / Banquet / Invitation", grammatical_context: "Noun: Feast or joy" },
      { geez: "ልስሕ", amharic_context: "አልጫ", english_transliteration: "Lisih", english_translation: "Mild dish (non-spicy)", grammatical_context: "Noun / Adjective" },
      { geez: "ጸብሕ", amharic_context: "ወጥ", english_transliteration: "Ts'ebih", english_translation: "Stew / Curry", grammatical_context: "Noun: Traditional stew" },
      { geez: "ጸብሐ ሐሪፅት", amharic_context: "የክክ ወጥ", english_transliteration: "Ts'ebha Harits't", english_translation: "Split pea stew", grammatical_context: "Noun phrase" },
      { geez: "ጸብሐ ለስሕ", amharic_context: "አልጫ ወጥ", english_transliteration: "Ts'ebha Lesih", english_translation: "Mild stew", grammatical_context: "Noun phrase" },
      { geez: "ጸብሐ በቅል", amharic_context: "የባቄላ መረቅ", english_transliteration: "Ts'ebha Beqil", english_translation: "Broad bean broth", grammatical_context: "Noun phrase" },
      { geez: "ኪፋለ ዓሳ", amharic_context: "የሽንብራ ዓሳ", english_transliteration: "Kifale Asa", english_translation: "Chickpea traditional fish dish", grammatical_context: "Noun phrase" },
      { geez: "ሐምል", amharic_context: "ጎመን", english_transliteration: "Hamil", english_translation: "Collard greens / Cabbage", grammatical_context: "Noun: Greens" },
      { geez: "ሐምለ ብሑዕ", amharic_context: "ስልጆ/መደዶ", english_transliteration: "Hamle Bihu'i", english_translation: "Siljo (Fermented dish)", grammatical_context: "Noun phrase" },
      { geez: "አትክልት", amharic_context: "አትክልት", english_transliteration: "Atkilt", english_translation: "Vegetables", grammatical_context: "Noun" },
      { geez: "ጼው", amharic_context: "ጨው", english_transliteration: "Ts'iew", english_translation: "Salt", grammatical_context: "Noun" },
      { geez: "መጺፅ", amharic_context: "ሆምጣጤ", english_transliteration: "Mets'its'", english_translation: "Vinegar / Sour condiment", grammatical_context: "Noun" }
    ]
  },
  {
    lesson_id: 21,
    lesson_title: "Meats, Soups, Staples, and Dining Actions",
    source_reference: "5035.jpg, 5036.jpg, 5037.jpg, 5038.jpg & 5039-5042.jpg",
    module: "food",
    vocabulary: [
      { geez: "መስተካ ወውልዕም", amharic_context: "ጨጓራና ጉበት", english_transliteration: "Mesteka we-wilir'im", english_translation: "Tripe and liver", grammatical_context: "Noun phrase" },
      { geez: "ርጡብ ሥጋ", amharic_context: "እርጥብ ሥጋ", english_transliteration: "Rit'ub Siga", english_translation: "Raw / Fresh meat", grammatical_context: "Noun phrase" },
      { geez: "ጽቡሕ ሥጋ", amharic_context: "ጥብስ ሥጋ/አንቀልባ/", english_transliteration: "Ts'ibuh Siga", english_translation: "Grilled / Roasted meat", grammatical_context: "Noun phrase" },
      { geez: "ጸብሐ ሥጋ", amharic_context: "ሥጋ ወጥ", english_transliteration: "Ts'ebha Siga", english_translation: "Meat stew", grammatical_context: "Noun phrase" },
      { geez: "ቀይሕ ጸብሕ", amharic_context: "ቀይ ወጥ", english_transliteration: "K'eyih Ts'ebih", english_translation: "Spicy red stew", grammatical_context: "Noun phrase" },
      { geez: "እንቆቅሆ በሥጋ", amharic_context: "እንቁላል በሥጋ", english_transliteration: "Enqoqiho be-Siga", english_translation: "Eggs with meat", grammatical_context: "Noun phrase" },
      { geez: "ጸብሐ ደርሆ", amharic_context: "ዶሮ ወጥ", english_transliteration: "Ts'ebha Derho", english_translation: "Chicken stew (Doro Wat)", grammatical_context: "Noun phrase" },
      { geez: "ጸብሐ በግዕ", amharic_context: "የበግ ወጥ", english_transliteration: "Ts'ebha Begi'i", english_translation: "Lamb stew", grammatical_context: "Noun phrase" },
      { geez: "ጸብሐ ላህም", amharic_context: "የበሬ ወጥ", english_transliteration: "Ts'ebha Lahim", english_translation: "Beef stew", grammatical_context: "Noun phrase" },
      { geez: "ጸብሐ ጽቡሕ", amharic_context: "ጥብስ ወጥ", english_transliteration: "Ts'ebha Ts'ibuh", english_translation: "Fried / Sauteed stew", grammatical_context: "Noun phrase" },
      { geez: "መቅጽተ ሲላን", amharic_context: "ምንቸት አቢሽ", english_transliteration: "Meqts'ite Silan", english_translation: "Minced beef stew with fenugreek", grammatical_context: "Noun phrase" },
      { geez: "አቅረበ", amharic_context: "አቀረበ", english_transliteration: "Aqrebe", english_translation: "To serve / Present food", grammatical_context: "Verb" },
      { geez: "አፍአመ", amharic_context: "አጎረሰ", english_transliteration: "Af'ame", english_translation: "To feed someone a mouthful", grammatical_context: "Verb (Causative)" },
      { geez: "ለስሐ", amharic_context: "አልጫ ኰነ", english_transliteration: "Lesiha", english_translation: "To become mild / bland", grammatical_context: "Verb" },
      { geez: "ተኀፅበ", amharic_context: "ታጠበ", english_transliteration: "Tehats'be", english_translation: "To wash oneself", grammatical_context: "Verb" },
      { geez: "አስተዳለወ", amharic_context: "አዘጋጀ", english_transliteration: "Astedalewe", english_translation: "To prepare / Cook", grammatical_context: "Verb (Transitive)" },
      { geez: "ጸውዐ", amharic_context: "ጠራ", english_transliteration: "Ts'ew'e", english_translation: "To invite / Call over", grammatical_context: "Verb" },
      { geez: "ወሰደ", amharic_context: "ወሰደ", english_transliteration: "Wesede", english_translation: "To take", grammatical_context: "Verb" },
      { geez: "ውኅበ", amharic_context: "ሰጠ", english_transliteration: "Wihibe", english_translation: "To give", grammatical_context: "Verb" },
      { geez: "አምጽአ", amharic_context: "አመጣ", english_transliteration: "Amts'i'a", english_translation: "To bring", grammatical_context: "Verb" },
      { geez: "ናሁ", amharic_context: "እሆ", english_transliteration: "Nahu", english_translation: "Here it is / Take this", grammatical_context: "Interjection" },
      { geez: "ቀደመ", amharic_context: "ቀደመ", english_transliteration: "Qedeme", english_translation: "To precede / Go first", grammatical_context: "Verb" },
      { geez: "መገበ", amharic_context: "መገበ", english_transliteration: "Megebe", english_translation: "To nourish / Provide food", grammatical_context: "Verb" },
      { geez: "አስተሐተበ", amharic_context: "አስተናገደ", english_transliteration: "Astehatebe", english_translation: "To host / Serve guests", grammatical_context: "Verb (Stewardship)" },
      { geez: "ወረቀ", amharic_context: "ተፋ", english_transliteration: "Wereqe", english_translation: "To spit out", grammatical_context: "Verb" },
      { geez: "ተብልዐ", amharic_context: "ተበላ", english_transliteration: "Tebli'e", english_translation: "To be eaten", grammatical_context: "Verb (Passive)" },
      { geez: "መብላዕ", amharic_context: "መብላት", english_transliteration: "Mebla'i", english_translation: "Eating / To eat", grammatical_context: "Infinitive Noun" },
      { geez: "ይብላዕኒ", amharic_context: "ይብላኝ", english_transliteration: "Yibla'ini", english_translation: "Woe to me", grammatical_context: "Idiomatic expression" },
      { geez: "በላዒ", amharic_context: "በላተኛ", english_transliteration: "Bela'i", english_translation: "Eater / Big eater", grammatical_context: "Noun: Active eater" },
      { geez: "አብልዐ", amharic_context: "አበላ", english_transliteration: "Abli'e", english_translation: "To feed someone", grammatical_context: "Verb" },
      { geez: "በልዐ", amharic_context: "በላ", english_transliteration: "Beli'e", english_translation: "To eat", grammatical_context: "Verb" },
      { geez: "ዘረወ", amharic_context: "በተነ", english_transliteration: "Zerewe", english_translation: "To scatter / Sprinkle", grammatical_context: "Verb" },
      { geez: "ነደየ", amharic_context: "ረጨ", english_transliteration: "Nedeye", english_translation: "To sprinkle liquid", grammatical_context: "Verb" },
      { geez: "ጸምአ", amharic_context: "ተጠማ", english_transliteration: "Ts'em'a", english_translation: "To be thirsty", grammatical_context: "Verb (State)" },
      { geez: "ደማ", amharic_context: "ደማ", english_transliteration: "Deme", english_translation: "To bleed", grammatical_context: "Verb" },
      { geez: "አጽገበ", amharic_context: "አጠገበ", english_transliteration: "Ats'gebe", english_translation: "To satisfy / Fill someone up", grammatical_context: "Verb" },
      { geez: "አጽጋቢ", amharic_context: "አማጋቢ", english_transliteration: "Ats'gabi", english_translation: "One who fills/satisfies", grammatical_context: "Noun" },
      { geez: "ጸገበ", amharic_context: "ጠገበ", english_transliteration: "Ts'egebe", english_translation: "To be full / Satiated", grammatical_context: "Verb" },
      { geez: "ርኅበ", amharic_context: "ተራበ", english_transliteration: "Rihibe", english_translation: "To be hungry", grammatical_context: "Verb" },
      { geez: "ዘመነ ርኅብ - ምንድቤ/ርኅብ", amharic_context: "የረኃብ ዘመን", english_transliteration: "Zemene Rihib", english_translation: "Time of famine / Hunger crisis", grammatical_context: "Noun phrase" },
      { geez: "ኀበዘ", amharic_context: "ጋገረ", english_transliteration: "Habeze", english_translation: "To bake", grammatical_context: "Verb" },
      { geez: "ጸበበ", amharic_context: "ጠበሰ", english_transliteration: "Tsebebe", english_translation: "To fry / Roast / Grill", grammatical_context: "Verb" },
      { geez: "ማይ", amharic_context: "ውኃ", english_transliteration: "May", english_translation: "Water", grammatical_context: "Noun: Element water" },
      { geez: "ሰተየ", amharic_context: "ጠጣ", english_transliteration: "Seteye", english_translation: "To drink", grammatical_context: "Verb" },
      { geez: "ጸባቂ", amharic_context: "ጠባቂ", english_transliteration: "Ts'ebaqi", english_translation: "Waiter / One who waits", grammatical_context: "Noun" },
      { geez: "ዛም", amharic_context: "መረቅ", english_transliteration: "Zam", english_translation: "Broth / Soup", grammatical_context: "Noun" },
      { geez: "ሱራሄ", amharic_context: "አልጫ መረቅ", english_transliteration: "Surahe", english_translation: "Mild clear broth", grammatical_context: "Noun" },
      { geez: "ዐጽመ ጸብሕ", amharic_context: "የወጥ አጥንት", english_transliteration: "Ats'me Ts'ebih", english_translation: "Stew bone", grammatical_context: "Noun phrase" },
      { geez: "ዐጽመ ሱራሄ", amharic_context: "የአልጫ መረቅ አጥንት", english_transliteration: "Ats'me Surahe", english_translation: "Bone from mild broth", grammatical_context: "Noun phrase" },
      { geez: "መና", amharic_context: "እንጄራ/ዳቦ", english_transliteration: "Mena", english_translation: "Injera / Bread (Staple)", grammatical_context: "Noun: Primary bread" },
      { geez: "ኅብስት", amharic_context: "ዳቦ", english_transliteration: "Hibist", english_translation: "Bread", grammatical_context: "Noun: Bread loaf" }
    ]
  },
  {
    lesson_id: 22,
    lesson_title: "Conversational Phrases and Menu Inquiries",
    source_reference: "5034.jpg, 5035.jpg, 5043.jpg, 5044.jpg & 5045.jpg",
    module: "food",
    vocabulary: [
      { geez: "ሰሰከ ሐሪፅት", amharic_context: "ፍርፍር ሽሮ", english_transliteration: "Seseke Harits't", english_translation: "Shiro Firfir", grammatical_context: "Noun phrase" },
      { geez: "ምንት ምንት ሀሎ?", amharic_context: "ምን ምን አለ?", english_transliteration: "Mint mint halo?", english_translation: "What options are there?", grammatical_context: "Interrogative phrase" },
      { geez: "ፍተ-ደቅህ አው ምሳሕሁ", amharic_context: "ቁርስ ወይንስ ምሳ", english_transliteration: "Fite-Deqih aw Misahihu", english_translation: "Breakfast or lunch?", grammatical_context: "Conversational question" },
      { geez: "/ዘ/ ፍተ-ደቅህ ምንት ሀሎ?", amharic_context: "/የ/ ቁርስ ምን አለ?", english_transliteration: "[Ze] Fite-Deqih mint halo?", english_translation: "What is there for breakfast?", grammatical_context: "Conversational phrase" },
      { geez: "ምሳሕሁ ምንት ምንት ሀሎ?", amharic_context: "ምሳ ምን ምን አለ?", english_transliteration: "Misahihu mint mint halo?", english_translation: "What options are available for lunch?", grammatical_context: "Conversational phrase" },
      { geez: "ዘጾም ሐሪፅት፤ ለስሕ፤ ሰሰከ ሐሪፅት፤ አትክልት በኅብስት", amharic_context: "የጾም ከክ፤ ሽሮ፤ አልጫ፤ ፍርፍር ሽሮ፤ አትክልት በዳቦ", english_transliteration: "Ze-ts'om harits't, lesih, seseke harits't, atkilt be-hibist", english_translation: "Fasting split peas, shiro, mild stew, shiro firfir, vegetables with bread", grammatical_context: "Compound menu entry" },
      { geez: "ኅብስተ ደርሆ፤ ጽቡሕ ሥጋ፤ ጸብሐ ሥጋ፤ ቀይሕ ጸብሕ፤ ጸብሐ በግዕ", amharic_context: "የዶሮ ዳቦ፤ ጥብስ፤ ሥጋ ወጥ፤ ቀይ ወጥ፤ የበግ ወጥ", english_transliteration: "Hibiste derho, ts'ibuh siga, ts'ebha siga, qeyih ts'ebih, ts'ebha begi'i", english_translation: "Chicken bread, fried meat, meat stew, spicy red stew, lamb stew", grammatical_context: "Compound menu entry" },
      { geez: "ሐሊብ፤ ኅብስት", amharic_context: "ወተት፤ ዳቦ", english_transliteration: "Halib, Hibist", english_translation: "Milk and bread", grammatical_context: "Noun pair" },
      { geez: "ሰሰከ እንቆቅሆ ሀሎ?", amharic_context: "እንቁላል ፍርፍር አለ?", english_transliteration: "Seseke enqoqiho halo?", english_translation: "Is there scrambled eggs?", grammatical_context: "Question" },
      { geez: "ኢሀሎ/አልቦ", amharic_context: "የለም", english_transliteration: "Ihalo / Albo", english_translation: "There is none / Not available", grammatical_context: "Negative response" },
      { geez: "ጽቡሕ ይኄይሰኒ", amharic_context: "ጥብስ ይሻለኛል", english_transliteration: "Ts'ibuh yihieyiseni", english_translation: "I prefer fried/roasted meat", grammatical_context: "Conversational phrase" },
      { geez: "አሆ", amharic_context: "እሺ", english_transliteration: "Aho", english_translation: "Okay / Alright", grammatical_context: "Affirmative particle" }
    ]
  },
  {
    lesson_id: 23,
    lesson_title: "Core Family, Marriage, and Immediate Descendants",
    source_reference: "5046.jpg, 5047.jpg & 5048.jpg",
    module: "family",
    vocabulary: [
      { geez: "ብእሲ /ተባዕት፤ተባዕታይ", amharic_context: "ወንድ፤ወንዶች", english_transliteration: "Be'isi / Teba'it", english_translation: "Man / Male ፤ Men / Males", grammatical_context: "Noun: Sing ፤ Plur" },
      { geez: "ብእሲት/አንስት፤አንስት", amharic_context: "ሴት፤ሴቶች", english_transliteration: "Be'isit / Ansist", english_translation: "Woman / Female ፤ Women / Females", grammatical_context: "Noun: Sing ፤ Plur" },
      { geez: "ምቱ፤ብእሲሃ/ምታ", amharic_context: "ባል፤ባልጋ", english_transliteration: "Mitu / Be'isiha", english_translation: "Husband ፤ Husbands", grammatical_context: "Noun: Sing ፤ Plur" },
      { geez: "ብእሲቱ", amharic_context: "ሚስቱ", english_transliteration: "Be'isitu", english_translation: "His wife", grammatical_context: "Noun with possessive suffix" },
      { geez: "ባልታ", amharic_context: "ልጅገረድ", english_transliteration: "Balta", english_translation: "Maiden / Young girl", grammatical_context: "Noun" },
      { geez: "መርዓዊ", amharic_context: "የወንድ ሙሽራ", english_transliteration: "Mer'awi", english_translation: "Groom / Bridegroom", grammatical_context: "Noun: Groom" },
      { geez: "መርዓት", amharic_context: "የሴት ሙሽራ", english_transliteration: "Mer'at", english_translation: "Bride", grammatical_context: "Noun: Bride" },
      { geez: "ክብካብ", amharic_context: "ሠርግ", english_transliteration: "Kibkab", english_translation: "Wedding", grammatical_context: "Noun: Ceremony" },
      { geez: "ቤተ - ክብካብ", amharic_context: "የሠርግ ቤት", english_transliteration: "Biete-Kibkab", english_translation: "Wedding house", grammatical_context: "Noun phrase" },
      { geez: "ወልድ", amharic_context: "ወንድ ልጅ", english_transliteration: "Welid", english_translation: "Son / Boy", grammatical_context: "Noun" },
      { geez: "ወለት", amharic_context: "ሴት ልጅ", english_transliteration: "Welet", english_translation: "Daughter / Girl", grammatical_context: "Noun" },
      { geez: "አብ", amharic_context: "አባት", english_transliteration: "Ab", english_translation: "Father", grammatical_context: "Noun" },
      { geez: "እም", amharic_context: "እናት", english_transliteration: "Em", english_translation: "Mother", grammatical_context: "Noun" },
      { geez: "እማት", amharic_context: "እናቶች", english_transliteration: "Emat", english_translation: "Mothers", grammatical_context: "Noun plural" },
      { geez: "ወላዲ", amharic_context: "ወላጅ አባት", english_transliteration: "Weladi", english_translation: "Biological father", grammatical_context: "Noun / Participle" },
      { geez: "ወላዲት", amharic_context: "ወላጅ እናት", english_transliteration: "Weladit", english_translation: "Biological mother", grammatical_context: "Noun / Participle" }
    ]
  },
  {
    lesson_id: 24,
    lesson_title: "Siblings, Extended Relatives, and Generations",
    source_reference: "5048.jpg, 5049.jpg, 5050.jpg & 5051.jpg",
    module: "family",
    vocabulary: [
      { geez: "ታሕማማ", amharic_context: "አማች", english_transliteration: "Tahmama", english_translation: "In-law", grammatical_context: "Noun" },
      { geez: "አሕማማ", amharic_context: "ወንድ አማች", english_transliteration: "Ahmmama", english_translation: "Brother-in-law", grammatical_context: "Noun" },
      { geez: "ሐማት", amharic_context: "ሴት አማች", english_transliteration: "Hamat", english_translation: "Sister-in-law / Mother-in-law", grammatical_context: "Noun" },
      { geez: "አሕማማት", amharic_context: "አማቾች", english_transliteration: "Ahmmamat", english_translation: "In-laws", grammatical_context: "Noun plural" },
      { geez: "መስተሐምሙ", amharic_context: "ዋርሳ/የባል ታናሽ ወንድም", english_transliteration: "Mestehamimu", english_translation: "Brother-in-law (Husband's younger brother)", grammatical_context: "Noun: Relative" },
      { geez: "ንጉሥ", amharic_context: "ትልቅ ወንድ ልጅ", english_transliteration: "Nigus", english_translation: "Eldest son", grammatical_context: "Noun: Figurative firstson" },
      { geez: "ንዕስት", amharic_context: "ትልቅ ሴት ልጅ", english_transliteration: "Ni'ist", english_translation: "Eldest daughter", grammatical_context: "Noun: Figurative firstdaughter" },
      { geez: "ደቂቅ", amharic_context: "ልጆች", english_transliteration: "Deqiq", english_translation: "Children", grammatical_context: "Noun collective" },
      { geez: "ሕፃናት", amharic_context: "ትንንሽ ልጆች", english_transliteration: "Hits'anat", english_translation: "Infants / Small children", grammatical_context: "Noun plural" },
      { geez: "ሐፃኒ", amharic_context: "አሳዳጊ ሞግዚት/ወንድ/", english_transliteration: "Hats'ani", english_translation: "Male guardian / Tutor", grammatical_context: "Noun: Guardian" },
      { geez: "ሐፃኒት", amharic_context: "አሳዳጊ ሞግዚት/ሴት/", english_transliteration: "Hats'anit", english_translation: "Female guardian / Nanny", grammatical_context: "Noun: Nanny" },
      { geez: "እኅ", amharic_context: "ወንድም", english_transliteration: "Eh", english_translation: "Brother", grammatical_context: "Noun" },
      { geez: "እኀው", amharic_context: "ወንድሞች", english_transliteration: "Ehew", english_translation: "Brothers", grammatical_context: "Noun plural" },
      { geez: "እኅት", amharic_context: "እህት", english_transliteration: "Ehit", english_translation: "Sister", grammatical_context: "Noun" },
      { geez: "አኃት", amharic_context: "እህቶች", english_transliteration: "Ahat", english_translation: "Sisters", grammatical_context: "Noun plural" },
      { geez: "ሐው", amharic_context: "አጎት", english_transliteration: "Haw", english_translation: "Uncle", grammatical_context: "Noun" },
      { geez: "ሐዊት", amharic_context: "አክስት", english_transliteration: "Hawit", english_translation: "Aunt", grammatical_context: "Noun" },
      { geez: "እኅወ አብ", amharic_context: "የአባት ወንድም /አጎት/", english_transliteration: "Ehiwe Ab", english_translation: "Paternal uncle", grammatical_context: "Noun phrase" },
      { geez: "እኅተ አብ", amharic_context: "የአባት እህት/አክስት/", english_transliteration: "Ehite Ab", english_translation: "Paternal aunt", grammatical_context: "Noun phrase" },
      { geez: "እኅወ እም", amharic_context: "የእናት ወንድም/አጎት/", english_transliteration: "Ehiwe Em", english_translation: "Maternal uncle", grammatical_context: "Noun phrase" },
      { geez: "እኅተ እም", amharic_context: "የእናት እህት/አክስት/", english_transliteration: "Ehite Em", english_translation: "Maternal aunt", grammatical_context: "Noun phrase" },
      { geez: "ሐውክ", amharic_context: "ወንድ አያት", english_transliteration: "Hawk", english_translation: "Grandfather", grammatical_context: "Noun" },
      { geez: "ሐውክት", amharic_context: "ሴት አያት", english_transliteration: "Hawkit", english_translation: "Grandmother", grammatical_context: "Noun" },
      { geez: "እምሐውክ", amharic_context: "ወንድ ቅድመ አያት", english_transliteration: "Imihawk", english_translation: "Great-grandfather", grammatical_context: "Noun" },
      { geez: "እመ ሐውክት", amharic_context: "ሴት ቅድመ አያት", english_transliteration: "Ime Hawkit", english_translation: "Great-grandmother", grammatical_context: "Noun" }
    ]
  },
  {
    lesson_id: 25,
    lesson_title: "Social Relations, Lineage, and Life Stages",
    source_reference: "5052.jpg, 5053.jpg & 5054.jpg",
    module: "family",
    vocabulary: [
      { geez: "ቁልዔ", amharic_context: "ወዳጅ(ባልንጀራ)", english_transliteration: "Qul'ie", english_translation: "Companion / Close friend", grammatical_context: "Noun" },
      { geez: "ጎረ ፤ አግዋር", amharic_context: "ጎረቤት ፤ ጎረቤቶች", english_transliteration: "Gore / Agwar", english_translation: "Neighbor ፤ Neighbors", grammatical_context: "Noun: Sing ፤ Plur" },
      { geez: "ፍቁር", amharic_context: "ወዳጅ", english_transliteration: "Fiqur", english_translation: "Beloved / Friend", grammatical_context: "Noun / Adjective" },
      { geez: "ቢጽ ፤ አዕያጽ", amharic_context: "ጓደኛ(ባልንጀራ) ፤ ጓደኞች", english_transliteration: "Bits' / A'iyats'", english_translation: "Peer / Companion ፤ Peers", grammatical_context: "Noun: Sing ፤ Plur" },
      { geez: "እያያ", amharic_context: "ተመሳሳይ(እኩያ)", english_transliteration: "Eyaya", english_translation: "Equal / Contemporary / Peer", grammatical_context: "Noun" },
      { geez: "መካን", amharic_context: "መሃን", english_transliteration: "Mekan", english_translation: "Barren / Sterile", grammatical_context: "Adjective" },
      { geez: "ፅንስት", amharic_context: "እርጉዝ", english_transliteration: "Ts'insit", english_translation: "Pregnant", grammatical_context: "Adjective" },
      { geez: "ትክቶ", amharic_context: "አደፍ (የወር አበባ)", english_transliteration: "Tikto", english_translation: "Menstruation / Period", grammatical_context: "Noun" },
      { geez: "መዋዕለ ትክቶ", amharic_context: "የአደፍ ሰሞን", english_transliteration: "Mewa'ile Tikto", english_translation: "Menstrual period duration", grammatical_context: "Noun phrase" },
      { geez: "ዕለተ ንጽሕ", amharic_context: "የመፅዳት ቀን", english_transliteration: "Ilete Nits'ih", english_translation: "Day of purification", grammatical_context: "Noun phrase" },
      { geez: "ማሕመም", amharic_context: "ምጥ", english_transliteration: "Mahimem", english_translation: "Labor pains / Childbirth labor", grammatical_context: "Noun" },
      { geez: "መወልዲት", amharic_context: "አዋላጅ", english_transliteration: "Mewelidit", english_translation: "Midwife", grammatical_context: "Noun" },
      { geez: "ሰይደል", amharic_context: "አራስ ልጅ", english_transliteration: "Seydel", english_translation: "Newborn baby", grammatical_context: "Noun" },
      { geez: "ዘውግ", amharic_context: "ባልደረባ ፤ ወገን", english_transliteration: "Zewig", english_translation: "Partner / Colleague / Kind ፤ Clan / Fraction", grammatical_context: "Noun" },
      { geez: "ዘመድ ፤ አዝማድ", amharic_context: "ዘመድ ፤ ዘመዶች", english_transliteration: "Zemed / Azmad", english_translation: "Relative / Kin ፤ Relatives", grammatical_context: "Noun: Sing ፤ Plur" },
      { geez: "ነገረ/ኅዳር ፤ ነገረያን/ኅዳርያን", amharic_context: "ቤተሰብ ፤ ቤተሰቦች", english_transliteration: "Negere / Hidar", english_translation: "Household / Family ፤ Households", grammatical_context: "Noun: Sing ፤ Plur" },
      { geez: "አብያታዊ", amharic_context: "ቤተኛ", english_transliteration: "Abyatawi", english_translation: "Intimate acquaintance / Household member", grammatical_context: "Noun / Adjective" }
    ]
  },
  {
    lesson_id: 26,
    lesson_title: "Insects, Reptiles, and Small Creatures",
    source_reference: "5064.jpg",
    module: "animals",
    vocabulary: [
      { geez: "ቁንጽል", amharic_context: "ቀበሮ", english_transliteration: "Qunts'il", english_translation: "Fox / Jackal", grammatical_context: "Noun: Canid" },
      { geez: "ተመን", amharic_context: "ዘንዶ", english_transliteration: "Temen", english_translation: "Python / Large Snake", grammatical_context: "Noun: Serpent" },
      { geez: "አቅማን", amharic_context: "አንበጣ", english_transliteration: "Aqman", english_translation: "Locust / Grasshopper", grammatical_context: "Noun: Insect" },
      { geez: "አቅጦን", amharic_context: "ፈንጣጣ", english_transliteration: "Aqt'on", english_translation: "Grasshopper / Small Cricket variant", grammatical_context: "Noun: Insect" },
      { geez: "ኬሌሜዎን", amharic_context: "እስትነት", english_transliteration: "Kelemeon", english_translation: "Chameleon", grammatical_context: "Noun: Reptile" },
      { geez: "ኩልክልት", amharic_context: "ጉንዳን", english_transliteration: "Kulkilt", english_translation: "Ant", grammatical_context: "Noun: Insect" },
      { geez: "ጽቁን", amharic_context: "ፍልፈል", english_transliteration: "Ts'iqun", english_translation: "Mole / Rodent", grammatical_context: "Noun: Mammal" }
    ]
  },
  {
    lesson_id: 27,
    lesson_title: "Domestic Livestock, Cattle, and Equines",
    source_reference: "5064.jpg & 5055.jpg",
    module: "animals",
    vocabulary: [
      { geez: "ካህ", amharic_context: "ሴት ጥጃ", english_transliteration: "Kah", english_translation: "Heifer / Female Calf", grammatical_context: "Noun: Cattle" },
      { geez: "ላህም ፤ አልህምት", amharic_context: "ላም ፤ ላሞች", english_transliteration: "Lahim / Alhimt", english_translation: "Cow ፤ Cows", grammatical_context: "Noun: Singular & Plural" },
      { geez: "ሶር ፤ አስዋር", amharic_context: "በሬ ፤ በሬዎች", english_transliteration: "Sor / Aswar", english_translation: "Ox ፤ Oxen", grammatical_context: "Noun: Singular & Plural" },
      { geez: "አሁር", amharic_context: "ኮርማ", english_transliteration: "Ahur", english_translation: "Bull", grammatical_context: "Noun: Cattle" },
      { geez: "መርዔት", amharic_context: "መጋዣ ወለማሪያ", english_transliteration: "Mer'iet", english_translation: "Pack Animal / Beast of Burden variant", grammatical_context: "Noun" },
      { geez: "ተፈን", amharic_context: "ወይፈን", english_transliteration: "Tefen", english_translation: "Young Bull / Steer", grammatical_context: "Noun: Cattle" },
      { geez: "ጣዕዋ", amharic_context: "ጥጃ", english_transliteration: "Ta'iwa", english_translation: "Calf", grammatical_context: "Noun: Bovine offspring" },
      { geez: "ሐውር", amharic_context: "አህያ", english_transliteration: "Hawir", english_translation: "Donkey", grammatical_context: "Noun: Equine" }
    ]
  },
  {
    lesson_id: 28,
    lesson_title: "Poultry, Small Livestock, and Dairy Products",
    source_reference: "5056.jpg & 5057.jpg",
    module: "animals",
    vocabulary: [
      { geez: "ደርሆ", amharic_context: "ዶሮ", english_transliteration: "Derho", english_translation: "Chicken / Hen", grammatical_context: "Noun: Bird" },
      { geez: "አንቆቅሆ", amharic_context: "እንቁላል", english_transliteration: "Anqoqiho", english_translation: "Egg", grammatical_context: "Noun" },
      { geez: "ሴቴ ናሆም", amharic_context: "እቅፍ ዶሮ", english_transliteration: "Sete Nahom", english_translation: "Brooding Hen", grammatical_context: "Noun phrase" },
      { geez: "ጠሊ", amharic_context: "ፍየል", english_transliteration: "T'eli", english_translation: "Goat", grammatical_context: "Noun" },
      { geez: "አጣሊ", amharic_context: "ፍየሎች", english_transliteration: "At'ali", english_translation: "Goats", grammatical_context: "Noun Plural" },
      { geez: "ቃውላ", amharic_context: "የፍየል አውራ", english_transliteration: "Qawla", english_translation: "He-goat / Buck", grammatical_context: "Noun" },
      { geez: "በግዕ ፤ አባግዕ", amharic_context: "በግ ፤ በጎች", english_transliteration: "Begi'i / Abagi'i", english_translation: "Sheep", grammatical_context: "Noun: Singular & Plural" },
      { geez: "ሐሊብ", amharic_context: "ወተት", english_transliteration: "Halib", english_translation: "Milk", grammatical_context: "Noun: Dairy" },
      { geez: "ሐሊበ ላህም", amharic_context: "የላም ወተት", english_transliteration: "Halibe Lahim", english_translation: "Cow Milk", grammatical_context: "Noun phrase" },
      { geez: "ራግማ", amharic_context: "እርጎ", english_transliteration: "Ragma", english_translation: "Yogurt / Curdled Milk", grammatical_context: "Noun" },
      { geez: "ሐሳብ", amharic_context: "አይብ", english_transliteration: "Hasab", english_translation: "Cheese / Cottage Cheese", grammatical_context: "Noun" },
      { geez: "ፀባ", amharic_context: "የበግ ወተት", english_transliteration: "Ts'eba", english_translation: "Sheep Milk", grammatical_context: "Noun phrase" },
      { geez: "ቀፋን", amharic_context: "አይብ", english_transliteration: "Qefan", english_translation: "Cheese variant", grammatical_context: "Noun" },
      { geez: "ቅብዕ", amharic_context: "ቅቤ", english_transliteration: "Qib'i", english_translation: "Butter", grammatical_context: "Noun" },
      { geez: "ለዕድ", amharic_context: "ለጋ ቅቤ", english_transliteration: "Le'id", english_translation: "Fresh / Unsalted Butter", grammatical_context: "Noun phrase" },
      { geez: "ሰሊጥ", amharic_context: "የሰሊጥ ቅቤ", english_transliteration: "Selit'", english_translation: "Sesame Oil/Butter", grammatical_context: "Noun" },
      { geez: "ሤልጥ", amharic_context: "ንጥር ቅቤ", english_transliteration: "Sielts'", english_translation: "Clarified / Spiced Butter", grammatical_context: "Noun" }
    ]
  },
  {
    lesson_id: 29,
    lesson_title: "Large Mammals, Wild Cats, and Predators",
    source_reference: "5058.jpg, 5059.jpg, 5060.jpg, 5061.jpg, 5062.jpg & 5063.jpg",
    module: "animals",
    vocabulary: [
      { geez: "ጽንጉል", amharic_context: "ቀጭን", english_transliteration: "Ts'ingul", english_translation: "Giraffe", grammatical_context: "Noun: Herbivore" },
      { geez: "ጎል", amharic_context: "በረከት", english_transliteration: "Gol", english_translation: "Herds / Livestock wealth variant", grammatical_context: "Noun" },
      { geez: "አንበሳ", amharic_context: "አንበሳ", english_transliteration: "Anbessa", english_translation: "Lion", grammatical_context: "Noun: Feline" },
      { geez: "ዝእብ / ሐراድል", amharic_context: "ጅብ (ጅቦች)", english_transliteration: "Zi'ib / Haradil", english_translation: "Hyena", grammatical_context: "Noun: Carnivore" },
      { geez: "ድማህክ", amharic_context: "የአንበሳ ግልገል", english_transliteration: "Dimahik", english_translation: "Lion Cub", grammatical_context: "Noun: Offspring" },
      { geez: "ውዕላ", amharic_context: "ጎሽ", english_transliteration: "Wi'ila", english_translation: "Buffalo", grammatical_context: "Noun: Bovine" },
      { geez: "ቀዘል", amharic_context: "ሜዳቋ", english_transliteration: "Qezel", english_translation: "Duiker / Small Antelope", grammatical_context: "Noun: Herbivore" },
      { geez: "ሐዝሃር", amharic_context: "አጋዘን", english_transliteration: "Hazhar", english_translation: "Deer / Kudu", grammatical_context: "Noun: Herbivore" },
      { geez: "ለይጠል", amharic_context: "ድብ", english_transliteration: "Leyt'el", english_translation: "Bear", grammatical_context: "Noun: Omnivore" },
      { geez: "ነምር", amharic_context: "ነብር", english_transliteration: "Nemir", english_translation: "Leopard / Tiger", grammatical_context: "Noun: Feline" },
      { geez: "ቶራ", amharic_context: "አጋዘን", english_transliteration: "Tora", english_translation: "Antelope / Large Deer variant", grammatical_context: "Noun" },
      { geez: "አቅራብ", amharic_context: "ጌሾ", english_transliteration: "Aqrab", english_translation: "Wild Antelope variant / Rhinoceros alternative context", grammatical_context: "Noun" },
      { geez: "ሄሎን", amharic_context: "አያል", english_transliteration: "Helon", english_translation: "Wild Goat / Ibex", grammatical_context: "Noun" },
      { geez: "ዋርካ", amharic_context: "ዋሊያ", english_transliteration: "Warka", english_translation: "Walia Ibex", grammatical_context: "Noun: Ibex" },
      { geez: "ደስካና", amharic_context: "ጎሽ", english_transliteration: "Deskana", english_translation: "Wild Buffalo variant", grammatical_context: "Noun" },
      { geez: "ዳክመጫ", amharic_context: "ዳክዬ", english_transliteration: "Dakmecha", english_translation: "Duck", grammatical_context: "Noun: Bird" },
      { geez: "መንግሌ/ደስዴዳ", amharic_context: "ጣዎስ", english_transliteration: "Mengile / Desdeda", english_translation: "Peacock", grammatical_context: "Noun: Bird" },
      { geez: "ቃቃር", amharic_context: "ጥቁር ቁራ", english_transliteration: "Qaqar", english_translation: "Black Raven / Crow", grammatical_context: "Noun: Bird" },
      { geez: "ቀርድ", amharic_context: "ዝንጀሮ", english_transliteration: "Qerd", english_translation: "Baboon / Monkey", grammatical_context: "Noun: Primate" },
      { geez: "ንስር", amharic_context: "አሞራ", english_transliteration: "Nisir", english_translation: "Vulture / Large Bird of Prey", grammatical_context: "Noun: Raptor" },
      { geez: "ሐለስትዮን", amharic_context: "የሜዳ አህያ", english_transliteration: "Halestyion", english_translation: "Zebra", grammatical_context: "Noun: Equine" },
      { geez: "አውስት", amharic_context: "ጭልፊት", english_transliteration: "Awsit", english_translation: "Hawk / Falcon", grammatical_context: "Noun: Raptor" },
      { geez: "አንድርዮን", amharic_context: "አይጥ", english_transliteration: "Andriyon", english_translation: "Mouse / Rat", grammatical_context: "Noun: Rodent" },
      { geez: "አድራማኬክ", amharic_context: "ጉጉት", english_transliteration: "Adramatic", english_translation: "Owl", grammatical_context: "Noun: Bird" },
      { geez: "ባባቱ/ጼዴን", amharic_context: "አጋዘን", english_transliteration: "Babatu / Ts'eden", english_translation: "Deer variant", grammatical_context: "Noun" },
      { geez: "ቅንቅንጥርን", amharic_context: "ድንቢጥ", english_transliteration: "Qinqint'irin", english_translation: "Sparrow / Finch", grammatical_context: "Noun: Passerine" },
      { geez: "ሐራውያ", amharic_context: "አንበጣ", english_transliteration: "Harawya", english_translation: "Locust variant", grammatical_context: "Noun: Insect" },
      { geez: "ተረት", amharic_context: "የሌሊት ወፍ", english_transliteration: "Teret", english_translation: "Bat", grammatical_context: "Noun: Mammal" },
      { geez: "ሐለስትዮን", amharic_context: "ጦጣ", english_transliteration: "Halestyion", english_translation: "Vervet Monkey", grammatical_context: "Noun: Primate" },
      { geez: "ዞራን", amharic_context: "ዋኖስ", english_transliteration: "Zoran", english_translation: "Dove / Pigeon", grammatical_context: "Noun: Bird" },
      { geez: "ስሒጥ", amharic_context: "ቀንጭብ", english_transliteration: "Sihit'", english_translation: "Flea / Jumping Insect", grammatical_context: "Noun: Insect" },
      { geez: "ሰማሕ", amharic_context: "ጣኦስ", english_transliteration: "Semah", english_translation: "Peacock variant", grammatical_context: "Noun: Bird" },
      { geez: "መቁጻል", amharic_context: "መጋል/ስብ", english_transliteration: "Mequts'al", english_translation: "Fatling / Fat animal variant", grammatical_context: "Noun" },
      { geez: "አዲማግ", amharic_context: "ትል", english_transliteration: "Adimag", english_translation: "Worm / Maggot", grammatical_context: "Noun: Invertebrate" },
      { geez: "ስርወ ጎራም", amharic_context: "ሽልላ", english_transliteration: "Sirwe Goram", english_translation: "Weasel / Mongoose variant", grammatical_context: "Noun" },
      { geez: "ከልብ ፤ ከላብት", amharic_context: "ውሻ ፤ ውሾች", english_transliteration: "Kelb / Kelabt", english_translation: "Dog ፤ Dogs", grammatical_context: "Noun: Canid" },
      { geez: "ሕንቅቃ", amharic_context: "ቅማል", english_transliteration: "Hinqiqa", english_translation: "Louse / Lice", grammatical_context: "Noun: Parasite" }
    ]
  },
  {
    lesson_id: 30,
    lesson_title: "Felines, Rodents, and Diverse Field Wildlife",
    source_reference: "5065.jpg, 5066.jpg & 5067.jpg",
    module: "animals",
    vocabulary: [
      { geez: "ካዕሌ", amharic_context: "ሰንበር", english_transliteration: "Ka'ilie", english_translation: "Wildcat / Serval", grammatical_context: "Noun: Feline" },
      { geez: "ብርካን", amharic_context: "ወንድ ድመት", english_transliteration: "Birkan", english_translation: "Male cat", grammatical_context: "Noun: Feline" },
      { geez: "ምስፋር", amharic_context: "ሻኛ", english_transliteration: "Misfar", english_translation: "Hump (of an ox/camel)", grammatical_context: "Noun: Anatomy" },
      { geez: "ሐሴሜት", amharic_context: "ሴት ድመት", english_transliteration: "Hasemet", english_translation: "Female cat", grammatical_context: "Noun: Feline" },
      { geez: "ባሶር", amharic_context: "ሥጋ", english_transliteration: "Basor", english_translation: "Meat / Flesh", grammatical_context: "Noun: Staple" },
      { geez: "አጣኒ", amharic_context: "ትልቅ አይጥ", english_transliteration: "At'ani", english_translation: "Rat / Large mouse", grammatical_context: "Noun: Rodent" },
      { geez: "ጽንጽያ", amharic_context: "አይጥ", english_transliteration: "Ts'ints'ya", english_translation: "Mouse", grammatical_context: "Noun: Rodent" },
      { geez: "ትላዕ", amharic_context: "ጠንካራ", english_transliteration: "Tila'i", english_translation: "Strong / Firm (Animal characteristic context)", grammatical_context: "Adjective" },
      { geez: "እቃርን", amharic_context: "ዝንብ", english_transliteration: "Iqarin", english_translation: "Fly (Insect)", grammatical_context: "Noun: Insect" },
      { geez: "ለጽቂት", amharic_context: "እንሽላሊት", english_transliteration: "Lets'qit", english_translation: "Lizard", grammatical_context: "Noun: Reptile" },
      { geez: "ቁስጥያ", amharic_context: "ቅንቅን/ጭንቅን", english_transliteration: "Qust'ya", english_translation: "Mite / Tick", grammatical_context: "Noun: Arachnid" },
      { geez: "ሣሬት", amharic_context: "ሸረሪት", english_transliteration: "Saret", english_translation: "Spider", grammatical_context: "Noun: Arachnid" },
      { geez: "ሰመኖባ", amharic_context: "ላት", english_transliteration: "Semenoba", english_translation: "Fat tail (of sheep)", grammatical_context: "Noun: Anatomy" },
      { geez: "ቀዶ", amharic_context: "ጥንፈዛ", english_transliteration: "Qedo", english_translation: "Beetle / Crawling bug", grammatical_context: "Noun: Insect" },
      { geez: "ግዴዳ", amharic_context: "ጨረባ", english_transliteration: "Gideda", english_translation: "Night jar / Type of bird", grammatical_context: "Noun: Bird" },
      { geez: "ቀጻ", amharic_context: "ቢራቢሮ", english_transliteration: "Qets'a", english_translation: "Butterfly", grammatical_context: "Noun: Insect" },
      { geez: "ግዴኛ", amharic_context: "ሸንኮላ", english_transliteration: "Gidegna", english_translation: "Sugar cane / Reed variant (Foraging context)", grammatical_context: "Noun: Plant" }
    ]
  },
  {
    lesson_id: 31,
    lesson_title: "Who, How, and When",
    source_reference: "5068.jpg & 5069.jpg",
    module: "questions",
    vocabulary: [
      { geez: "መኑ", amharic_context: "ማን", english_transliteration: "Menu", english_translation: "Who", grammatical_context: "Interrogative Pronoun" },
      { geez: "መኑ ውእቱ ዘይነግረኒ", amharic_context: "ማን ነው የሚነግረኝ?", english_transliteration: "Menu wi'itu zeynegireni", english_translation: "Who will tell me?", grammatical_context: "Interrogative Phrase" },
      { geez: "መኑ ውእቱ ስምከ", amharic_context: "ስምህ ማን ነው", english_transliteration: "Menu wi'itu simke", english_translation: "What is your name? (lit. Who is your name?)", grammatical_context: "Interrogative Question" },
      { geez: "መኑ ውእቱ ስመ አቡከ", amharic_context: "የአባትህ ስም ማን ነው", english_transliteration: "Menu wi'itu sime abuke", english_translation: "What is your father's name?", grammatical_context: "Interrogative Question" },
      { geez: "እፎ", amharic_context: "እንዴት", english_transliteration: "Ifo", english_translation: "How", grammatical_context: "Interrogative Particle" },
      { geez: "እፎ ውእቱ ሕይወት", amharic_context: "ሕይወት እንዴት ነው", english_transliteration: "Ifo wi'itu hiywot", english_translation: "How is life?", grammatical_context: "Interrogative Question" },
      { geez: "ማዕዜ", amharic_context: "መቼ", english_transliteration: "Ma'izie", english_translation: "When", grammatical_context: "Interrogative Particle" },
      { geez: "እስከ ማዕዜ (እስከ ማዕዜሁ)", amharic_context: "እስከ መቼ", english_transliteration: "Iske ma'izie (iske ma'iziehu)", english_translation: "Until when / How long", grammatical_context: "Interrogative Phrase" },
      { geez: "ማዕዜ ውእቱ ፈተና", amharic_context: "ፈተና መቼ ነው", english_transliteration: "Ma'izie wi'itu fetena", english_translation: "When is the exam?", grammatical_context: "Interrogative Question" },
      { geez: "ማዕዜ ውእቱ ዘተወለድከ", amharic_context: "መቼ ነው የተወለድከው", english_transliteration: "Ma'izie wi'itu zeteweledke", english_translation: "When were you born?", grammatical_context: "Interrogative Question" }
    ]
  },
  {
    lesson_id: 32,
    lesson_title: "Where and Origin",
    source_reference: "5069.jpg & 5070.jpg",
    module: "questions",
    vocabulary: [
      { geez: "አይቴ", amharic_context: "የት", english_transliteration: "Aytie", english_translation: "Where", grammatical_context: "Interrogative Particle" },
      { geez: "ኃበ አይቴ", amharic_context: "ወደ የት", english_transliteration: "Habe aytie", english_translation: "Whither / To where", grammatical_context: "Interrogative Phrase" },
      { geez: "እም አይቴ", amharic_context: "ከየት", english_transliteration: "Im aytie", english_translation: "From where", grammatical_context: "Interrogative Phrase" },
      { geez: "አይቴ ውእቱ ቤትከ", amharic_context: "ቤትህ የት ነው", english_transliteration: "Aytie wi'itu betke", english_translation: "Where is your house?", grammatical_context: "Interrogative Question" },
      { geez: "አይቴ ይእቲ እምከ", amharic_context: "እናትህ የት ናት", english_transliteration: "Aytie yi'iti imike", english_translation: "Where is your mother?", grammatical_context: "Interrogative Question" },
      { geez: "አይቴ ተወለድከ", amharic_context: "የት ተወለድህ", english_transliteration: "Aytie teweledke", english_translation: "Where were you born?", grammatical_context: "Interrogative Question" },
      { geez: "አይቴ ሖረ አቡከ", amharic_context: "አባትህ የት ሄደ", english_transliteration: "Aytie hore abuke", english_translation: "Where did your father go?", grammatical_context: "Interrogative Question" },
      { geez: "እም አይቴ መጻእከ", amharic_context: "ከየት መጣህ", english_transliteration: "Im aytie metsa'ike", english_translation: "Where did you come from?", grammatical_context: "Interrogative Question" }
    ]
  },
  {
    lesson_id: 33,
    lesson_title: "What and Quantity",
    source_reference: "5070.jpg & 5071.jpg",
    module: "questions",
    vocabulary: [
      { geez: "ምንት", amharic_context: "ምን", english_transliteration: "Mint", english_translation: "What", grammatical_context: "Interrogative Pronoun" },
      { geez: "ምንት ምንት", amharic_context: "ምን ምን", english_transliteration: "Mint mint", english_translation: "What things / What exactly", grammatical_context: "Interrogative Phrase" },
      { geez: "ምንት ውእቱ ዝንቱ", amharic_context: "ይህ ምንድነው", english_transliteration: "Mint wi'itu zintu", english_translation: "What is this?", grammatical_context: "Interrogative Question" },
      { geez: "ምንተ በላዕከ ዮም", amharic_context: "ዛሬ ምን በላህ", english_transliteration: "Minte bela'ike yom", english_translation: "What did you eat today?", grammatical_context: "Interrogative Question" },
      { geez: "አስፎንቱ (ስፎንቱ)", amharic_context: "ስንት", english_transliteration: "Asfontu (sifontu)", english_translation: "How much / How many", grammatical_context: "Interrogative Particle" },
      { geez: "አስፎንቱ ውእቱ ዕድሜከ", amharic_context: "ዕድሜህ ስንት ነው", english_transliteration: "Asfontu wi'itu idme_ike", english_translation: "How old are you?", grammatical_context: "Interrogative Question" },
      { geez: "አስፎንቱ ውእቱ አኃዊከ", amharic_context: "ወንድሞችህ ስንት ናቸው", english_transliteration: "Asfontu wi'itu ahawike", english_translation: "How many brothers do you have?", grammatical_context: "Interrogative Question" }
    ]
  },
  {
    lesson_id: 34,
    lesson_title: "The Verb 'To Teach' (Conjugations)",
    source_reference: "5072.jpg & 5073.jpg",
    module: "education",
    vocabulary: [
      { geez: "መሀርኩ", amharic_context: "አስተማርኩ", english_transliteration: "Mehariku", english_translation: "I taught", grammatical_context: "Verb: Past 1st Pers. Sing." },
      { geez: "መሀርነ", amharic_context: "አስተማርን", english_transliteration: "Meharine", english_translation: "We taught", grammatical_context: "Verb: Past 1st Pers. Plur." },
      { geez: "መሀርከ", amharic_context: "አስተማርክ", english_transliteration: "Meharike", english_translation: "You taught (masculine singular)", grammatical_context: "Verb: Past 2nd Pers. Sing. Masc." },
      { geez: "መሀርኪ", amharic_context: "አስተማርሽ", english_transliteration: "Mehariki", english_translation: "You taught (feminine singular)", grammatical_context: "Verb: Past 2nd Pers. Sing. Fem." },
      { geez: "መሀርክሙ", amharic_context: "አስተማራችሁ ለወንዶች", english_transliteration: "Meharikemu", english_translation: "You all taught (masculine plural)", grammatical_context: "Verb: Past 2nd Pers. Plur. Masc." },
      { geez: "መሀርክን", amharic_context: "አስተማራችሁ ለሴቶች", english_transliteration: "Meharikin", english_translation: "You all taught (feminine plural)", grammatical_context: "Verb: Past 2nd Pers. Plur. Fem." },
      { geez: "መሀረ", amharic_context: "አስተማረ", english_transliteration: "Mehare", english_translation: "He taught", grammatical_context: "Verb: Past 3rd Pers. Sing. Masc." },
      { geez: "መሀረት", amharic_context: "አስተማረች", english_transliteration: "Meharet", english_translation: "She taught", grammatical_context: "Verb: Past 3rd Pers. Sing. Fem." },
      { geez: "መሀሩ", amharic_context: "አስተማሩ ለወንዶች", english_transliteration: "Meharu", english_translation: "They taught (masculine plural)", grammatical_context: "Verb: Past 3rd Pers. Plur. Masc." },
      { geez: "መሀራ", amharic_context: "አስተማሩ ለሴቶች", english_transliteration: "Mehara", english_translation: "They taught (feminine plural)", grammatical_context: "Verb: Past 3rd Pers. Plur. Fem." }
    ]
  },
  {
    lesson_id: 35,
    lesson_title: "Teachers, Students, and Fields of Study",
    source_reference: "5073.jpg, 5074.jpg & 5075.jpg",
    module: "education",
    vocabulary: [
      { geez: "መምህር", amharic_context: "የወንድ አስተማሪ", english_transliteration: "Memihir", english_translation: "Male teacher", grammatical_context: "Noun: Singular Masc." },
      { geez: "መምህርት", amharic_context: "የሴት አስተማሪ", english_transliteration: "Memihirt", english_translation: "Female teacher", grammatical_context: "Noun: Singular Fem." },
      { geez: "መምህራን", amharic_context: "የወንድ አስተማሪዎች", english_transliteration: "Memihiran", english_translation: "Male teachers (plural)", grammatical_context: "Noun: Plural Masc." },
      { geez: "መምህራት", amharic_context: "የሴት አስተማሪዎች", english_transliteration: "Memihirat", english_translation: "Female teachers (plural)", grammatical_context: "Noun: Plural Fem." },
      { geez: "ምሁር", amharic_context: "የተማረ", english_transliteration: "Mihur", english_translation: "Educated / Scholar (masculine)", grammatical_context: "Noun / Adjective: Masc. Sing." },
      { geez: "ምህርት", amharic_context: "የተማረች", english_transliteration: "Mihirt", english_translation: "Educated / Scholar (feminine)", grammatical_context: "Noun / Adjective: Fem. Sing." },
      { geez: "ምሁራን", amharic_context: "የተማሩ ለወንዶች", english_transliteration: "Mihuran", english_translation: "Educated / Scholars (masculine plural)", grammatical_context: "Noun / Adjective: Masc. Plur." },
      { geez: "ምሁራት", amharic_context: "የተማሩ ለሴቶች", english_transliteration: "Mihurat", english_translation: "Educated / Scholars (feminine plural)", grammatical_context: "Noun / Adjective: Fem. Plur." },
      { geez: "መምህረ ንባብ", amharic_context: "የንባብ አስተማሪ", english_transliteration: "Memihire Nibab", english_translation: "Reading teacher", grammatical_context: "Compound Noun" },
      { geez: "መምህረ ዜማ", amharic_context: "የዜማ አስተማሪ", english_transliteration: "Memihire Zema", english_translation: "Chant / Melody teacher", grammatical_context: "Compound Noun" },
      { geez: "መምህረ ቅኔ", amharic_context: "የቅኔ አስተማሪ", english_transliteration: "Memihire Qine", english_translation: "Poetry (Qene) teacher", grammatical_context: "Compound Noun" },
      { geez: "መምህረ መጽሐፍ", amharic_context: "የመጽሐፍ አስተማሪ", english_transliteration: "Memihire Mets'ihaf", english_translation: "Book / Scripture teacher", grammatical_context: "Compound Noun" },
      { geez: "መምህረ ኪን", amharic_context: "የጥበብ አስተማሪ", english_transliteration: "Memihire Kin", english_translation: "Art / Wisdom teacher", grammatical_context: "Compound Noun" },
      { geez: "መምህረ ተግባረ እድ", amharic_context: "የእጅ ስራ አስተማሪ", english_transliteration: "Memihire Tegbare Id", english_translation: "Handicraft / Manual labor teacher", grammatical_context: "Compound Noun" },
      { geez: "መምህረ ሥነ-ምግባር", amharic_context: "የስነ ምግባር አስተማሪ", english_transliteration: "Memihire Sine-Migbar", english_translation: "Ethics / Morality teacher", grammatical_context: "Compound Noun" },
      { geez: "ረድእ", amharic_context: "ተማሪ", english_transliteration: "Red'i", english_translation: "Student / Disciple", grammatical_context: "Noun: Singular Masc." },
      { geez: "አርድእት", amharic_context: "ተማሪዎች", english_transliteration: "Ardi'it", english_translation: "Students / Disciples", grammatical_context: "Noun: Plural" },
      { geez: "አርድእተ ቅኔ", amharic_context: "የቅኔ ተማሪዎች", english_transliteration: "Ardi'ite Qine", english_translation: "Poetry students", grammatical_context: "Compound Noun Plural" },
      { geez: "አርድእተ ቀለም", amharic_context: "የቀለም ትምህርት ተማሪዎች", english_transliteration: "Ardi'ite Qelem", english_translation: "Academic / Literacy students", grammatical_context: "Compound Noun Plural" }
    ]
  },
  {
    lesson_id: 36,
    lesson_title: "Identifying as a Student (Pronouns & Verbs)",
    source_reference: "5075.jpg & 5076.jpg",
    module: "education",
    vocabulary: [
      { geez: "አነ ረድእ", amharic_context: "እኔ ተማሪ ነኝ", english_transliteration: "Ane red'i", english_translation: "I am a student", grammatical_context: "Subject Pronoun + Noun Phrase" },
      { geez: "ንሕነ አርድእት", amharic_context: "እኛ ተማሪዎች ነን", english_transliteration: "Nihine ardi'it", english_translation: "We are students", grammatical_context: "Subject Pronoun + Noun Plural Phrase" },
      { geez: "አንተ ረድእ", amharic_context: "አንተ ተማሪ ነህ", english_transliteration: "Ante red'i", english_translation: "You are a student (masculine)", grammatical_context: "Subject Pronoun + Noun Phrase" },
      { geez: "አንቲ ረድእ", amharic_context: "አንቺ ተማሪ ነሽ", english_transliteration: "Anti red'i", english_translation: "You are a student (feminine)", grammatical_context: "Subject Pronoun + Noun Phrase" },
      { geez: "አንትሙ አርድእት", amharic_context: "እናንተ ተማሪዎች ናችሁ ለወንዶች", english_transliteration: "Antimu ardi'it", english_translation: "You all are students (masculine)", grammatical_context: "Subject Pronoun + Noun Plural Phrase" },
      { geez: "አንትን አርድእት", amharic_context: "እናንተ ተማሪዎች ናችሁ ለሴቶች", english_transliteration: "Antin ardi'it", english_translation: "You all are students (feminine)", grammatical_context: "Subject Pronoun + Noun Plural Phrase" },
      { geez: "ውእቱ ረድእ", amharic_context: "እሱ ተማሪ ነው", english_transliteration: "Wi'itu red'i", english_translation: "He is a student", grammatical_context: "Subject Pronoun + Noun Phrase" },
      { geez: "ይእቲ ረድእ", amharic_context: "እሷ ተማሪ ናት", english_transliteration: "Yi'iti red'i", english_translation: "She is a student", grammatical_context: "Subject Pronoun + Noun Phrase" },
      { geez: "ውእቶሙ አርድእት", amharic_context: "እነሱ ተማሪዎች ናቸው ለወንዶች", english_transliteration: "Wi'itomu ardi'it", english_translation: "They are students (masculine)", grammatical_context: "Subject Pronoun + Noun Plural Phrase" },
      { geez: "ውእቶን አርድእት", amharic_context: "እነሱ ተማሪዎች ናቸው ለሴቶች", english_transliteration: "Wi'iton ardi'it", english_translation: "They are students (feminine)", grammatical_context: "Subject Pronoun + Noun Plural Phrase" }
    ]
  },
  {
    lesson_id: 37,
    lesson_title: "Starting and Finishing School",
    source_reference: "5076.jpg, 5077.jpg & 5078.jpg",
    module: "education",
    vocabulary: [
      { geez: "አነ ወጠንኩ ትምህርተ", amharic_context: "እኔ ትምህርትን ጀመርኩ", english_transliteration: "Ane wet'enku timhirte", english_translation: "I started school / education", grammatical_context: "Clause: Past 1st Pers. Sing." },
      { geez: "ንሕነ ወጠንነ ትምህርተ", amharic_context: "እኛ ትምህርትን ጀመርን", english_transliteration: "Nihine wet'enne timhirte", english_translation: "We started school / education", grammatical_context: "Clause: Past 1st Pers. Plur." },
      { geez: "አንተ ወጠንከ ትምህርተ", amharic_context: "አንተ ትምህርትን ጀመርክ", english_transliteration: "Ante wet'enke timhirte", english_translation: "You started school / education (masculine)", grammatical_context: "Clause: Past 2nd Pers. Sing. Masc." },
      { geez: "አንቲ ወጠንኪ ትምህርተ", amharic_context: "አንቺ ትምህርትን ጀመርሽ", english_transliteration: "Anti wet'enki timhirte", english_translation: "You started school / education (feminine)", grammatical_context: "Clause: Past 2nd Pers. Sing. Fem." },
      { geez: "አንትሙ ወጠንክሙ ትምህርተ", amharic_context: "እናንተ ትምህርትን ጀመራችሁ ለወንዶች", english_transliteration: "Antimu wet'enkemu timhirte", english_translation: "You all started school / education (masculine)", grammatical_context: "Clause: Past 2nd Pers. Plur. Masc." },
      { geez: "አንትን ወጠንክን ትምህርተ", amharic_context: "እናንተ ትምህርትን ጀመራችሁ ለሴቶች", english_transliteration: "Antin wet'enkin timhirte", english_translation: "You all started school / education (feminine)", grammatical_context: "Clause: Past 2nd Pers. Plur. Fem." },
      { geez: "ውእቱ ወጠነ ትምህርተ", amharic_context: "እሱ ትምህርትን ጀመረ", english_transliteration: "Wi'itu wet'ene timhirte", english_translation: "He started school / education", grammatical_context: "Clause: Past 3rd Pers. Sing. Masc." },
      { geez: "ይእቲ ወጠነት ትምህርተ", amharic_context: "እሷ ትምህርትን ጀመረች", english_transliteration: "Yi'iti wet'enet timhirte", english_translation: "She started school / education", grammatical_context: "Clause: Past 3rd Pers. Sing. Fem." },
      { geez: "ውእቶሙ ወጠኑ ትምህርተ", amharic_context: "እነሱ ትምህርትን ጀመሩ ለወንዶች", english_transliteration: "Wi'itomu wet'enu timhirte", english_translation: "They started school / education (masculine)", grammatical_context: "Clause: Past 3rd Pers. Plur. Masc." },
      { geez: "ውእቶን ወጠና ትምህርተ", amharic_context: "እነሱ ትምህርትን ጀመሩ ለሴቶች", english_transliteration: "Wi'iton wet'ena timhirte", english_translation: "They started school / education (feminine)", grammatical_context: "Clause: Past 3rd Pers. Plur. Fem." },
      { geez: "አነ ፈጸምኩ ትምህርተ", amharic_context: "እኔ ትምህርት ጨረስኩ", english_transliteration: "Ane fetsemku timhirte", english_translation: "I finished school / education", grammatical_context: "Clause: Past 1st Pers. Sing." },
      { geez: "አንተ ፈጸምከ ትምህርተ", amharic_context: "አንተ ትምህርት ጨረስክ", english_transliteration: "Ante fetsemke timhirte", english_translation: "You finished school / education (masculine)", grammatical_context: "Clause: Past 2nd Pers. Sing. Masc." },
      { geez: "አንቲ ፈጸምኪ ትምህርተ", amharic_context: "አንቺ ትምህርት ጨረስሽ", english_transliteration: "Anti fetsemki timhirte", english_translation: "You finished school / education (feminine)", grammatical_context: "Clause: Past 2nd Pers. Sing. Fem." },
      { geez: "ውእቱ ፈጸመ ትምህርተ", amharic_context: "እሱ ትምህርት ጨረሰ", english_transliteration: "Wi'itu fetseme timhirte", english_translation: "He finished school / education", grammatical_context: "Clause: Past 3rd Pers. Sing. Masc." },
      { geez: "ይእቲ ፈጸመት ትምህርተ", amharic_context: "እሷ ትምህርት ጨረሰች", english_transliteration: "Yi'iti fetsemet timhirte", english_translation: "She finished school / education", grammatical_context: "Clause: Past 3rd Pers. Sing. Fem." },
      { geez: "ንሕነ አእመርነ ሰዋስወ ግዕዝ", amharic_context: "እኛ የገእዝ ቋንቋን አወቅን", english_transliteration: "Nihine a'imerine sewasive Gi'iz", english_translation: "We knew / mastered the Ge'ez language grammar", grammatical_context: "Clause: Past 1st Pers. Plur." },
      { geez: "ውእቱ አእመሩ ሰዋስወ ግዕዝ", amharic_context: "እነሱ የገእዝ ቋንቋን አወቁ", english_transliteration: "Wi'itoomu a'imeru sewasive Gi'iz", english_translation: "They knew / mastered the Ge'ez language grammar", grammatical_context: "Clause: Past 3rd Pers. Plur." }
    ]
  },
  {
    lesson_id: 38,
    lesson_title: "Writing Letters and Classroom Actions",
    source_reference: "5079.jpg & 5081.jpg",
    module: "education",
    vocabulary: [
      { geez: "አነ ጸሐፍኩ ጠቅሰ", amharic_context: "እኔ ደብዳቤ ጻፍኩ", english_transliteration: "Ane tsehafiku t'eqse", english_translation: "I wrote a letter", grammatical_context: "Clause: Past 1st Pers. Sing." },
      { geez: "ሃና ፈነወት ጠቅሰ ለአቡሃ", amharic_context: "ሃና ለአባቷ ደብዳቤ ላከች", english_transliteration: "Hana fenewet t'eqse le'abuha", english_translation: "Hana sent a letter to her father", grammatical_context: "Clause: Past 3rd Pers. Sing. Fem." },
      { geez: "ዮሴፍ ወብንያም ፈነዉ ጠቅሰ ለአቡሆሙ", amharic_context: "ዮሴፍና ቤንያም ለአባታቸው ደብዳቤ ላኩ", english_transliteration: "Yosef we-Biniyam fenewu t'eqse le'abuhomu", english_translation: "Yosef and Benyam sent a letter to their father", grammatical_context: "Compound Subject Clause" },
      { geez: "እበውእ ኀበ ክፍል", amharic_context: "ወደ ክፍል መግባት እችላለሁ", english_transliteration: "Ibewi'i habe kifil", english_translation: "May I enter the classroom? / I can enter the class", grammatical_context: "Classroom Permission Request" },
      { geez: "አሆ ባእ", amharic_context: "እሺ ግባ", english_transliteration: "Aho ba'i", english_translation: "Okay, enter (masculine)", grammatical_context: "Imperative Response" },
      { geez: "እወፅእ", amharic_context: "መውጣት እችላለሁ", english_transliteration: "Iwets'i'i", english_translation: "May I go out? / I can exit", grammatical_context: "Classroom Permission Request" },
      { geez: "አሆ ፃእ / ፃኢ", amharic_context: "እሺ ውጣ", english_transliteration: "Aho tsa'i / tsa'ee", english_translation: "Okay, go out", grammatical_context: "Imperative Response" },
      { geez: "ምንት ጐንደይከ", amharic_context: "ለምን አረፈድክ", english_transliteration: "Lemint gondeyike", english_translation: "Why are you late?", grammatical_context: "Interrogative Question" }
    ]
  },
  {
    lesson_id: 39,
    lesson_title: "Types of Illnesses and Symptoms",
    source_reference: "5082.jpg, 5083.jpg & 5084.jpg",
    module: "health",
    vocabulary: [
      { geez: "ሕማም", amharic_context: "ሕመም", english_transliteration: "Himam", english_translation: "Illness / Disease / Pain", grammatical_context: "Noun" },
      { geez: "ሕመማት", amharic_context: "በሽታዎች", english_transliteration: "Himemat", english_translation: "Diseases / Illnesses (plural)", grammatical_context: "Noun: Plural" },
      { geez: "ሞትነ / መቅሠፍት", amharic_context: "ቸነፈር (ወረርሽኝ)", english_transliteration: "Motne / Meq'seft", english_translation: "Plague / Epidemic", grammatical_context: "Noun" },
      { geez: "ዓሠር", amharic_context: "ትኩሳት", english_transliteration: "As'er", english_translation: "Fever / Heat", grammatical_context: "Noun" },
      { geez: "ቍር", amharic_context: "ብርድ (ጉንፋን)", english_transliteration: "Qur", english_translation: "Cold / Flu", grammatical_context: "Noun" },
      { geez: "ሕማመ ርእስ", amharic_context: "ራስ ምታት", english_transliteration: "Himame Re'is", english_translation: "Headache", grammatical_context: "Noun Phrase" },
      { geez: "ሕማመ ከርሥ", amharic_context: "የሆድ ቁርጠት", english_transliteration: "Himame Kersi", english_translation: "Stomach ache / Abdominal cramps", grammatical_context: "Noun Phrase" },
      { geez: "ሰዐል", amharic_context: "ሳል", english_transliteration: "Se'al", english_translation: "Cough", grammatical_context: "Noun" },
      { geez: "አንጠሶ", amharic_context: "ማስነጠስ", english_transliteration: "Ant'eso", english_translation: "Sneezing", grammatical_context: "Noun / Verb Root" },
      { geez: "ቁስል", amharic_context: "ቁስል", english_transliteration: "Qusil", english_translation: "Wound / Sore", grammatical_context: "Noun" },
      { geez: "ሕብጥ", amharic_context: "እባጭ (ዕብጠት)", english_transliteration: "Hibt'", english_translation: "Swelling / Tumor", grammatical_context: "Noun" },
      { geez: "ምስጉዝ", amharic_context: "ሽባ", english_transliteration: "Misguz", english_translation: "Paralyzed / Lame", grammatical_context: "Adjective" }
    ]
  },
  {
    lesson_id: 40,
    lesson_title: "Medical Professionals and Institutions",
    source_reference: "5085.jpg & 5086.jpg",
    module: "health",
    vocabulary: [
      { geez: "ባለ መድኃኒት / ፈዋሲ", amharic_context: "ሐኪም (ባለ መድኃኒት)", english_transliteration: "Bale Medhanit / Fewasi", english_translation: "Doctor / Physician / Healer", grammatical_context: "Noun: Profession" },
      { geez: "ፈዋሲት", amharic_context: "ሴት ሐኪም", english_transliteration: "Fewasit", english_translation: "Female doctor / Healer", grammatical_context: "Noun: Feminine Singular" },
      { geez: "ፈወስቲ", amharic_context: "ሐኪሞች", english_transliteration: "Fewesti", english_translation: "Doctors / Physicians (plural)", grammatical_context: "Noun: Plural" },
      { geez: "ፈዋሰ አዕይንት", amharic_context: "የዓይን ሐኪም", english_transliteration: "Fewase A'iyint", english_translation: "Ophthalmologist / Eye doctor", grammatical_context: "Compound Noun" },
      { geez: "ፈዋሰ አስናን", amharic_context: "የጥርስ ሐኪም", english_transliteration: "Fewase Asnan", english_translation: "Dentist", grammatical_context: "Compound Noun" },
      { geez: "ቤተ ፈውስ", amharic_context: "ሕክምና ቤት (ሆስፒታል)", english_transliteration: "Bete Fewus", english_translation: "Hospital / Clinic (lit. House of healing)", grammatical_context: "Noun Phrase" },
      { geez: "ቤተ መድኃኒት", amharic_context: "የመድኃኒት ቤት", english_transliteration: "Bete Medhanit", english_translation: "Pharmacy / Drugstore", grammatical_context: "Noun Phrase" },
      { geez: "ቤተ ድውያን", amharic_context: "የሕመምተኞች ማረፊያ", english_transliteration: "Bete Diwuyan", english_translation: "Sanatorium / Ward for the sick", grammatical_context: "Noun Phrase" }
    ]
  },
  {
    lesson_id: 41,
    lesson_title: "Medicines and Healing Actions",
    source_reference: "5087.jpg, 5088.jpg, 5089.jpg & 5090.jpg",
    module: "health",
    vocabulary: [
      { geez: "መድኃኒት", amharic_context: "መድኃኒት", english_transliteration: "Medhanit", english_translation: "Medicine / Remedy", grammatical_context: "Noun" },
      { geez: "ፈውስ", amharic_context: "ፈውስ", english_transliteration: "Fewus", english_translation: "Healing / Cure", grammatical_context: "Noun" },
      { geez: "ቀመመ መድኃኒተ", amharic_context: "መድኃኒትቀመመ", english_transliteration: "Qememe medhanite", english_translation: "He prepared / compounded medicine", grammatical_context: "Verb Phrase: Past" },
      { geez: "ሐጸበ ቁስለ", amharic_context: "ቁስልን አጠበ", english_transliteration: "Hatsebe qusle", english_translation: "He washed / cleaned a wound", grammatical_context: "Verb Phrase: Past" },
      { geez: "አሰረ ቁስለ", amharic_context: "ቁስልን አሰረ (ጠገነ)", english_transliteration: "Asere qusle", english_translation: "He bandaged / dressed a wound", grammatical_context: "Verb Phrase: Past" },
      { geez: "ሰተየ መድኃኒተ", amharic_context: "መድኃኒት ጠጣ", english_transliteration: "Seteye medhanite", english_translation: "He drank/took medicine", grammatical_context: "Verb Phrase: Past" },
      { geez: "ቀብአ መድኃኒተ", amharic_context: "መድኃኒት ቀባ", english_transliteration: "Qeb'a medhanite", english_translation: "He applied / rubbed ointment or medicine", grammatical_context: "Verb Phrase: Past" },
      { geez: "ሐይወ / ሐወጸ / ተፈወሰ", amharic_context: "ዳነ (ተፈወሰ)", english_transliteration: "Haywe / Hawetse / Tefewese", english_translation: "He recovered / was healed", grammatical_context: "Verb Conjugations: Past" },
      { geez: "ድንገዘ / ጸገበ ሐይወ", amharic_context: "ጤናማ ሆነ", english_transliteration: "Dingeze / Tsegebe haywe", english_translation: "He became healthy / sound", grammatical_context: "Verb Phrase: Past" },
      { geez: "ዕፍረት / ጥዕና", amharic_context: "ጤና", english_transliteration: "Ifrat / T'ina", english_translation: "Health / Well-being", grammatical_context: "Noun" }
    ]
  },
  {
    lesson_id: 42,
    lesson_title: "Death, Burial, and Funeral Practices",
    source_reference: "5091.jpg, 5092.jpg, 5094.jpg & 5095.jpg",
    module: "mourning",
    vocabulary: [
      { geez: "ሞት", amharic_context: "ሞት", english_transliteration: "Mot", english_translation: "Death", grammatical_context: "Noun" },
      { geez: "ሞተ - ግብ", amharic_context: "ድንገተኛ ሞት", english_transliteration: "Mote-gib", english_translation: "Sudden death", grammatical_context: "Noun Phrase" },
      { geez: "ኅልቁ", amharic_context: "ቃሬዛ", english_transliteration: "Hilqu", english_translation: "Stretcher / Bier", grammatical_context: "Noun" },
      { geez: "ኅልቀ በድን", amharic_context: "የሬሳ ሳጥን", english_transliteration: "Hilqe bedin", english_translation: "Coffin / Casket", grammatical_context: "Noun Phrase" },
      { geez: "እያት/ግርበብ", amharic_context: "ከፈን መግነዝ", english_transliteration: "Iyat / Girbeb", english_translation: "Shroud / Burial garment", grammatical_context: "Noun" },
      { geez: "በድን", amharic_context: "እሬሳ", english_transliteration: "Bedin", english_translation: "Corpse / Dead body", grammatical_context: "Noun" },
      { geez: "ጾወርተ በድን", amharic_context: "የሬሳ ተሸካሚ", english_transliteration: "Tsowerte bedin", english_translation: "Pallbearer", grammatical_context: "Compound Noun" },
      { geez: "መካነ ዘጉር", amharic_context: "መቃብር ቆፋሪ", english_transliteration: "Mekane zegur", english_translation: "Grave digger", grammatical_context: "Compound Noun" },
      { geez: "ቀበርንት", amharic_context: "ቀባሪዎች", english_transliteration: "Qeberniti", english_translation: "Buriers / Mourners at a funeral", grammatical_context: "Noun: Plural" },
      { geez: "ፍትሐት", amharic_context: "የፍትሐት ጸሎት", english_transliteration: "Fithat", english_translation: "Absolution prayer / Requiem service", grammatical_context: "Noun: Liturgical" },
      { geez: "ግብአተ መሬት", amharic_context: "መቃብር መግባት", english_transliteration: "Gibi'ate meriet", english_translation: "Burial / Internment (lit. Returning to earth)", grammatical_context: "Noun Phrase" },
      { geez: "ምቅባርተ ዝጉር", amharic_context: "ጉድጓድ", english_transliteration: "Miqibarte zigur", english_translation: "Grave pit / Trench", grammatical_context: "Noun" }
    ]
  },
  {
    lesson_id: 43,
    lesson_title: "Expressions of Grief and Mourners",
    source_reference: "5091.jpg, 5092.jpg, 5093.jpg, 5094.jpg & 5095.jpg",
    module: "mourning",
    vocabulary: [
      { geez: "ላህይ", amharic_context: "ለቅሶ", english_transliteration: "Lahiy", english_translation: "Weeping / Mourning", grammatical_context: "Noun" },
      { geez: "ትያሰ", amharic_context: "የለቅሶ ቦታ", english_transliteration: "Tiyase", english_translation: "Place of mourning", grammatical_context: "Noun" },
      { geez: "እያዜር", amharic_context: "የወንድ አልቃሽ", english_transliteration: "Iyazier", english_translation: "Male professional mourner", grammatical_context: "Noun" },
      { geez: "እያዜርት", amharic_context: "የሴት አልቃሽ", english_transliteration: "Iyaziert", english_translation: "Female professional mourner", grammatical_context: "Noun: Feminine" },
      { geez: "ሰይ ወይ", amharic_context: "ወዮ ወዮ ለቅሶ", english_transliteration: "Sey wey", english_translation: "Wailing / Lamentation cries", grammatical_context: "Interjection" },
      { geez: "ህዙን", amharic_context: "አዛኝ ለወንድ", english_transliteration: "Hizun", english_translation: "Sympathizer / Griever (Male)", grammatical_context: "Noun: Singular Masc." },
      { geez: "ህዙናን", amharic_context: "አዛኞች ለወንዶች", english_transliteration: "Hizunan", english_translation: "Sympathizers / Grievers (Males plural)", grammatical_context: "Noun: Plural Masc." },
      { geez: "ህዝንት", amharic_context: "አዛኝ ለሴት", english_transliteration: "Hizint", english_translation: "Sympathizer / Griever (Female)", grammatical_context: "Noun: Singular Fem." },
      { geez: "ህዝናታት", amharic_context: "አዛኞች ለሴቶች", english_transliteration: "Hiznatat", english_translation: "Sympathizers / Grievers (Females plural)", grammatical_context: "Noun: Plural Fem." },
      { geez: "መስተተሐዝነ", amharic_context: "አስተዛዛዦች ለወንዶች", english_transliteration: "Mestetehazne", english_translation: "Comforters / Condolence extenders (Males)", grammatical_context: "Noun: Plural Masc." },
      { geez: "መስተተሐዝናታት", amharic_context: "አስተዛዛዦች ለሴቶች", english_transliteration: "Mestetehaznatat", english_translation: "Comforters / Condolence extenders (Females)", grammatical_context: "Noun: Plural Fem." }
    ]
  },
  {
    lesson_id: 44,
    lesson_title: "Verb Conjugations for Weeping",
    source_reference: "5092.jpg & 5093.jpg",
    module: "mourning",
    vocabulary: [
      { geez: "አንብዐ", amharic_context: "አለቀሰ", english_transliteration: "Anbi'a", english_translation: "He wept / shed tears", grammatical_context: "Verb: Past 3rd Pers. Sing. Masc." },
      { geez: "አንብዐት", amharic_context: "አለቀሰች", english_transliteration: "Anbi'at", english_translation: "She wept", grammatical_context: "Verb: Past 3rd Pers. Sing. Fem." },
      { geez: "አንብኡ", amharic_context: "አለቀሱ", english_transliteration: "Anbi'u", english_translation: "They wept", grammatical_context: "Verb: Past 3rd Pers. Plur. Masc." },
      { geez: "አንብአከ", amharic_context: "አለቀስክ", english_transliteration: "Anbi'ake", english_translation: "You wept (Male singular)", grammatical_context: "Verb: Past 2nd Pers. Sing. Masc." },
      { geez: "አንብአኪ", amharic_context: "አለቀስሽ", english_transliteration: "Anbi'aki", english_translation: "You wept (Female singular)", grammatical_context: "Verb: Past 2nd Pers. Sing. Fem." },
      { geez: "አንብአክሙ", amharic_context: "አለቀሳችሁ ለወንዶች", english_transliteration: "Anbi'akemu", english_translation: "You wept (Male plural)", grammatical_context: "Verb: Past 2nd Pers. Plur. Masc." },
      { geez: "አንብአክን", amharic_context: "አለቀሳችሁ ለሴቶች", english_transliteration: "Anbi'akin", english_translation: "You wept (Female plural)", grammatical_context: "Verb: Past 2nd Pers. Plur. Fem." },
      { geez: "አንብአነ", amharic_context: "አለቀስን", english_transliteration: "Anbi'ane", english_translation: "We wept", grammatical_context: "Verb: Past 1st Pers. Plur." }
    ]
  },
  {
    lesson_id: 45,
    lesson_title: "Wisdom, Knowledge, and Counsel",
    source_reference: "5096.jpg, 5097.jpg & 5098.jpg",
    module: "proverbs",
    vocabulary: [
      { geez: "ማኅሰ በበራሒ ነገር በምሳሌ ውእቱ", amharic_context: "ነገር በምሳሌ ጠጅ በብርሌ ነው", english_transliteration: "Mahse beberahi neger bemesale wi'itu", english_translation: "Speech is best understood through proverbs, just as mead is best served in a flask.", grammatical_context: "Proverb (Context: Emphasizes the power of metaphors in effectively delivering deep wisdom.)" },
      { geez: "ምክር ዘነዳይ ነቢረኪ መኑ እመ ይሰምዐኪ ውእቱ", amharic_context: "ምክር የደሃ ነብርህ ምን ቢሰማሽ ነው", english_transliteration: "Mikri zeneday nebireki menu ime yesem'aki wi'itu", english_translation: "Even if you possess wisdom, who will listen to the counsel of a poor person?", grammatical_context: "Proverb (Context: A cultural observation on how social status dictates the perceived value of someone's advice.)" },
      { geez: "ለጠቢብ አይሄይዝዎ ለእንበሳ አይመትርፋ", amharic_context: "ለብልህ አይነግሩም ለአንበሳ አይመነጥሩም", english_transliteration: "Letebib ayheyizwo le'inbesa aymetirfa", english_translation: "One does not lecture the wise, nor does one clear the forest for a lion.", grammatical_context: "Proverb (Context: Capable or highly knowledgeable individuals do not require basic guidance.)" },
      { geez: "እም ከመ ኢትጠብሕ አይትአምር ሥጋሁ እም ከመ ትነግር ኢፈትአምር ኪኑ", amharic_context: "ካልታረደ አይታወቅም ስጋቱ ካልተናገረ አይታወቅም ብልሃቱ", english_transliteration: "Im keme itetebih ayeti'amir sigahu im keme tinegir ifeti'amir kinu", english_translation: "The quality of meat is unknown until slaughtered; the brilliance of a mind is unknown until it speaks.", grammatical_context: "Proverb (Context: True capability or character is measured when put into action or articulated.)" }
    ]
  },
  {
    lesson_id: 46,
    lesson_title: "Diligence, Labor, and Unity",
    source_reference: "5097.jpg & 5098.jpg",
    module: "proverbs",
    vocabulary: [
      { geez: "በቃል ዘሀሎ ይትረሳዕ በመጽሐፍ ዘሀሎ ይትወረስ", amharic_context: "በቃል ያለ ይረሳል በጽሑፍ ያለ ይወረሳል", english_transliteration: "Beqal zehalo yetiresa'i bemetshaf zehalo yeteweris", english_translation: "Spoken words are forgotten, but written documentation is inherited.", grammatical_context: "Proverb (Context: Encourages compiling and recording knowledge rather than relying on memory.)" },
      { geez: "ከንፈር ወስን እመይትሀበር ይሴኔ", amharic_context: "ከንፈርና ጥርስ ሲተባበር ያምራል", english_transliteration: "Kenfer wesin emeyithaber yesiene", english_translation: "When lips and teeth work together, they reveal beauty.", grammatical_context: "Proverb (Context: A metaphor demonstrating that unity and mutual cooperation yield beautiful results.)" },
      { geez: "ግብርሰ ለባገረሁ ሦክ ለህፃራሁ ውእቱ", amharic_context: "ሥራ ላገኘው እሸት ለምያውቀው ነው::", english_transliteration: "Gibrise lebagerehu sok lehitsarahu wi'itu", english_translation: "Work belongs to the one who creates it, just as fresh harvest belongs to the one who recognizes its value.", grammatical_context: "Proverb (Context: Points out that opportunities and success reward those who show dedication.)" }
    ]
  },
  {
    lesson_id: 47,
    lesson_title: "Character, Ethics, and Prudence",
    source_reference: "5096.jpg, 5097.jpg & 5098.jpg",
    module: "proverbs",
    vocabulary: [
      { geez: "በጸበ ዲበ ዘሰከረ በማያ ዘክቡር አልቦ", amharic_context: "በአንት የሰከረ በካሳ የከበረ የለም", english_transliteration: "Betsebe dibe zesekere bemaya zekibur albo", english_translation: "No one ever truly got drunk on empty promises, nor has anyone truly prospered on compensation fines.", grammatical_context: "Proverb (Context: Warns against relying on hollow justifications or unreliable assurances.)" },
      { geez: "ሀብተ መነኩሴ ሰርገ ዕውር ዋሕድ ውእቱ", amharic_context: "የመነኩሴ ሀብት የአውር ሽልማት አንድ ነው", english_transliteration: "Habte menekuse serge iwur wahid wi'itu", english_translation: "The wealth of a monk and the adornments given to a blind person are essentially the same.", grammatical_context: "Proverb (Context: Reflects on things that are inherently useless to a person's lifestyle or core being.)" },
      { geez: "መዐዘ እንዘ ይሰርፋ መዐረ ይትናገሩ", amharic_context: "ማር ሲሰሩ ማር ይናገራሉ", english_transliteration: "Me'aze inze yeserifa me'are yetenageru", english_translation: "Those who work with honey speak of honey.", grammatical_context: "Proverb (Context: Implies that a person's conversation naturally reflects their environment or habits.)" },
      { geez: "ጸዲና ይሤርር ኮኖኒ የሐትት", amharic_context: "ጣዝማ ይሰራሰራል ዳኛ ይመረምራል", english_transliteration: "Tsedina yesierir kononi yehatit", english_translation: "Just as the underground bee meticulously builds its hive, a proper judge thoroughly investigates the truth.", grammatical_context: "Proverb (Context: Praises patience, diligence, and deep scrutiny in serious decision-making.)" },
      { geez: "ሰአል ዘይቤሎ ለመሰንቆቱ ጸጋ ዘይቤሎ ለሕንባኡ እያኅጥእ", amharic_context: "ላምን ያለዉ ስልቻዉን ጫማ ያለዉ ኮርቻዉን አያጣም", english_transliteration: "Se'al zeyibelo lemesenqotu tsega zeyibelo lehinba'u eyahit'i", english_translation: "He who owns cattle will not lack a leather bag, and he who owns a horse will not lack a saddle.", grammatical_context: "Proverb (Context: Possessing a major asset naturally brings along its necessary tools or responsibilities.)" },
      { geez: "ዘተቀዋሚ ጸሎተ ዘተረኃት ሐሊበ እየበቁዕ", amharic_context: "የቁም ጸሎት የተረጨ ወተት አይጠቅምም", english_transliteration: "Zeteqewami tselote zeterehat halibe eyebequ'i", english_translation: "Standing prayer without focus is as useless as spilled milk.", grammatical_context: "Proverb (Context: Actions performed mechanically without true intent or heart yield no results.)" },
      { geez: "ምጽልመት አመ ያወትሩ ነጽሮተ በጎደሎ አመ የተምዑ ኢይከውን", amharic_context: "በጨለማ ቢፈጩ በጎደሎ ቢቆጥሩ አይሆንም", english_transliteration: "Metsilmet ame yawetiru netsirote begodelo ame yetem'u eyikewin", english_translation: "Grinding grain in complete darkness or counting with flawed metrics will never succeed.", grammatical_context: "Proverb (Context: Warning that operating without clarity or accurate standards leads to failure.)" },
      { geez: "በግዕ እም ከመ በረረ የዋህ ሰብእ እም ከመ አምረረ ኢይትመየጥ", amharic_context: "በግ ከበረረ የዋህ ሰው ካመረረ አይመለስም", english_transliteration: "Begi'i im keme berere yewah seb'i im keme amrere eyitemeyeti", english_translation: "When a sheep bolts or a gentle person loses their patience completely, they cannot be easily turned back.", grammatical_context: "Proverb (Context: A reminder to treat patient or mild-tempered individuals with respect.)" },
      { geez: "ወዲቁ ይተነሥእ በአድ ኀንዶይ ይከብር በደቂቅ", amharic_context: "ወድቆ ይነሳል በአጅ ዘግይቶ ይከበራል በልጅ", english_transliteration: "Wediqu yetenesi'i be'ad handoy yekebir bedeqiq", english_translation: "One falls down but rises by their own hand; one achieves long-term honor through their children.", grammatical_context: "Proverb (Context: Focuses on personal resilience and the legacy left behind through family.)" },
      { geez: "ጎሣሤ ዓሣ የውጽእ ተመነ ጎሣሤ ሰብእ የኅጥእ ዘርእሶ", amharic_context: "ዓሣ ጎርጓጅ ዘንዶ ያወጣል የሰው ፈላጊ የራሱን ያጣል", english_transliteration: "Gosase asa yewits'i temene gosase seb'i yehit'i zer'iso", english_translation: "The one who over-digs for fish might pull out a python; the one who meddles in others' business loses their own.", grammatical_context: "Proverb (Context: Cautionary tale against reckless curiosity or meddling.)" }
    ]
  },
  {
    lesson_id: 48,
    lesson_title: "Daily Time Expressions",
    source_reference: "5099.jpg & 5100.jpg",
    module: "time",
    vocabulary: [
      { geez: "ዮም", amharic_context: "ዛሬ", english_transliteration: "Yom", english_translation: "Today", grammatical_context: "Adverb of Time" },
      { geez: "ይእዜ", amharic_context: "ዛሬ፤ አሁን", english_transliteration: "Yi'ize", english_translation: "Now / Right now", grammatical_context: "Adverb of Time" },
      { geez: "ትማልም", amharic_context: "ትላንት", english_transliteration: "Timalim", english_translation: "Yesterday", grammatical_context: "Adverb of Time" },
      { geez: "እም ትማልም", amharic_context: "ከትላንት ወዲያ", english_transliteration: "Im timalim", english_translation: "The day before yesterday", grammatical_context: "Adverbial Phrase" },
      { geez: "ጌሠም", amharic_context: "ነገ", english_transliteration: "Giesem", english_translation: "Tomorrow", grammatical_context: "Adverb of Time" },
      { geez: "እም ጌሠም", amharic_context: "ከነገ ወዲያ", english_transliteration: "Im giesem", english_translation: "The day after tomorrow", grammatical_context: "Adverbial Phrase" },
      { geez: "ምሴት", amharic_context: "ምሽት", english_transliteration: "Misiet", english_translation: "Evening / Nightfall", grammatical_context: "Noun of Time" }
    ]
  },
  {
    lesson_id: 49,
    lesson_title: "Weeks, Months, and Calendar Units",
    source_reference: "5100.jpg",
    module: "time",
    vocabulary: [
      { geez: "ሰሙን", amharic_context: "ሳምንት", english_transliteration: "Semun", english_translation: "Week", grammatical_context: "Noun" },
      { geez: "ወርኅ፤ አውራኅ", amharic_context: "ወር ÷ ወሮች", english_transliteration: "Werih / Awrih", english_translation: "Month / Months", grammatical_context: "Noun (Singular & Plural)" },
      { geez: "ርእሰ ሠርቅ", amharic_context: "ወር መባቻ/የወሮች መጀመሪያ", english_transliteration: "Re'ise Sereq", english_translation: "Beginning of the month / New moon", grammatical_context: "Compound Noun" }
    ]
  },
  {
    lesson_id: 50,
    lesson_title: "Numbers 0 to 10",
    source_reference: "5101.jpg & 5102.jpg",
    module: "numbers",
    vocabulary: [
      { geez: "አልቦ", amharic_context: "ዜሮ", english_transliteration: "Albo", english_translation: "Zero", grammatical_context: "Numeral" },
      { geez: "አሐዱ", amharic_context: "አንድ", english_transliteration: "Ahadu", english_translation: "One", grammatical_context: "Numeral (፩)" },
      { geez: "ክሌኤቱ", amharic_context: "ሁለት", english_transliteration: "Kile'etu", english_translation: "Two", grammatical_context: "Numeral (፪)" },
      { geez: "ሠለስቱ", amharic_context: "ሦስት", english_transliteration: "Selestu", english_translation: "Three", grammatical_context: "Numeral (፫)" },
      { geez: "አርባዕቱ", amharic_context: "አራት", english_transliteration: "Arba'itu", english_translation: "Four", grammatical_context: "Numeral (፬)" },
      { geez: "ኃምስቱ", amharic_context: "አምስት", english_transliteration: "Hamistu", english_translation: "Five", grammatical_context: "Numeral (፭)" },
      { geez: "ስድስቱ", amharic_context: "ስድስት", english_transliteration: "Sidistu", english_translation: "Six", grammatical_context: "Numeral (፮)" },
      { geez: "ሰባት", amharic_context: "ሰባት", english_transliteration: "Sebat", english_translation: "Seven", grammatical_context: "Numeral (፯)" },
      { geez: "ሰማንቱ", amharic_context: "ስምንት", english_transliteration: "Semantu", english_translation: "Eight", grammatical_context: "Numeral (፰)" },
      { geez: "ተሰዓቱ", amharic_context: "ዘጠኝ", english_transliteration: "Tese'atu", english_translation: "Nine", grammatical_context: "Numeral (፱)" },
      { geez: "ዐሥርቱ", amharic_context: "አስር", english_transliteration: "Asirtu", english_translation: "Ten", grammatical_context: "Numeral (፲)" }
    ]
  },
  {
    lesson_id: 51,
    lesson_title: "Numbers 11 to 22",
    source_reference: "5102.jpg & 5103.jpg",
    module: "numbers",
    vocabulary: [
      { geez: "ዐሥርቱ ወአሐዱ", amharic_context: "አስራ አንድ", english_transliteration: "Asirtu we-ahadu", english_translation: "Eleven", grammatical_context: "Numeral" },
      { geez: "ዐሥርቱ ወክሌኤቱ", amharic_context: "አስራ ሁለት", english_transliteration: "Asirtu we-kile'etu", english_translation: "Twelve", grammatical_context: "Numeral" },
      { geez: "ዐሥርቱ ወሠለስቱ", amharic_context: "አስራ ሦስት", english_transliteration: "Asirtu we-selestu", english_translation: "Thirteen", grammatical_context: "Numeral" },
      { geez: "ዐሥርቱ ወአርባዕቱ", amharic_context: "አስራ አራት", english_transliteration: "Asirtu we-arba'itu", english_translation: "Fourteen", grammatical_context: "Numeral" },
      { geez: "ዐሥርቱ ወኃምስቱ", amharic_context: "አስራ አምስት", english_transliteration: "Asirtu we-hamistu", english_translation: "Fifteen", grammatical_context: "Numeral" },
      { geez: "ዐሥርቱ ወስድስቱ", amharic_context: "አስራ ስድስት", english_transliteration: "Asirtu we-sidistu", english_translation: "Sixteen", grammatical_context: "Numeral" },
      { geez: "ዐሥርቱ ወሰባት", amharic_context: "አስራ ሰባት", english_transliteration: "Asirtu we-sebat", english_translation: "Seventeen", grammatical_context: "Numeral" },
      { geez: "ዐሥርቱ ወሰማንቱ", amharic_context: "አስራ ስምንት", english_transliteration: "Asirtu we-semantu", english_translation: "Eighteen", grammatical_context: "Numeral" },
      { geez: "ዐሥርቱ ወተሰዓቱ", amharic_context: "አስራ ዘጠኝ", english_transliteration: "Asirtu we-tese'atu", english_translation: "Nineteen", grammatical_context: "Numeral" },
      { geez: "ዕሥራ", amharic_context: "ሀያ", english_transliteration: "Isra", english_translation: "Twenty", grammatical_context: "Numeral" },
      { geez: "ዕሥራ ወአሐዱ", amharic_context: "ሀያ አንድ", english_transliteration: "Isra we-ahadu", english_translation: "Twenty-one", grammatical_context: "Numeral" },
      { geez: "ዕሥራ ወክሌኤቱ", amharic_context: "ሀያ ሁለት", english_transliteration: "Isra we-kile'etu", english_translation: "Twenty-two", grammatical_context: "Numeral" }
    ]
  },
  {
    lesson_id: 52,
    lesson_title: "Tens and Hundreds",
    source_reference: "5103.jpg, 5104.jpg & 5105.jpg",
    module: "numbers",
    vocabulary: [
      { geez: "ሠላሳ", amharic_context: "ሠላሳ", english_transliteration: "Selasa", english_translation: "Thirty", grammatical_context: "Numeral" },
      { geez: "አርብዓ", amharic_context: "አርባ", english_transliteration: "Arbi'a", english_translation: "Forty", grammatical_context: "Numeral" },
      { geez: "ኃምሳ", amharic_context: "ሀምሳ", english_transliteration: "Hamsa", english_translation: "Fifty", grammatical_context: "Numeral" },
      { geez: "ስድሳ", amharic_context: "ስድሳ", english_transliteration: "Sidsa", english_translation: "Sixty", grammatical_context: "Numeral" },
      { geez: "ሰብዓ", amharic_context: "ሰባ", english_transliteration: "Seb'a", english_translation: "Seventy", grammatical_context: "Numeral" },
      { geez: "ሰማንያ", amharic_context: "ሰማንያ", english_transliteration: "Semanya", english_translation: "Eighty", grammatical_context: "Numeral" },
      { geez: "ተስዓ", amharic_context: "ዘጠና", english_transliteration: "Tes'a", english_translation: "Ninety", grammatical_context: "Numeral" },
      { geez: "ምእት", amharic_context: "መቶ", english_transliteration: "Mi'it", english_translation: "One hundred", grammatical_context: "Numeral" },
      { geez: "ምእት ወአሐዱ", amharic_context: "መቶ አንድ", english_transliteration: "Mi'it we-ahadu", english_translation: "One hundred and one", grammatical_context: "Numeral" },
      { geez: "ምእት ወክሌኤቱ", amharic_context: "መቶ ሁለት", english_transliteration: "Mi'it we-kile'etu", english_translation: "One hundred and two", grammatical_context: "Numeral" },
      { geez: "ምእት ወሠለስቱ", amharic_context: "መቶ ሦስት", english_transliteration: "Mi'it we-selestu", english_translation: "One hundred and three", grammatical_context: "Numeral" },
      { geez: "ምእት ወአርባዕቱ", amharic_context: "መቶ አራት", english_transliteration: "Mi'it we-arba'itu", english_translation: "One hundred and four", grammatical_context: "Numeral" },
      { geez: "ምእት ወኃምስቱ", amharic_context: "መቶ አምስት", english_transliteration: "Mi'it we-hamistu", english_translation: "One hundred and five", grammatical_context: "Numeral" },
      { geez: "ምእት ወስድስቱ", amharic_context: "መቶ ስድስት", english_transliteration: "Mi'it we-sidistu", english_translation: "One hundred and six", grammatical_context: "Numeral" },
      { geez: "ምእት ወዐሥርቱ", amharic_context: "መቶ አስር", english_transliteration: "Mi'it we-asirtu", english_translation: "One hundred and ten", grammatical_context: "Numeral" },
      { geez: "ምእት ወዕሥራ", amharic_context: "መቶ ሀያ", english_transliteration: "Mi'it we-isra", english_translation: "One hundred and twenty", grammatical_context: "Numeral" },
      { geez: "ምእት ወሠላሳ", amharic_context: "መቶ ሠላሳ", english_transliteration: "Mi'it we-selasa", english_translation: "One hundred and thirty", grammatical_context: "Numeral" },
      { geez: "ምእት ወአርብዓ", amharic_context: "መቶ አርባ", english_transliteration: "Mi'it we-arbi'a", english_translation: "One hundred and forty", grammatical_context: "Numeral" },
      { geez: "ምእት ወኃምሳ", amharic_context: "መቶ ሀምሳ", english_transliteration: "Mi'it we-hamsa", english_translation: "One hundred and fifty", grammatical_context: "Numeral" },
      { geez: "ምእት ወስድሳ", amharic_context: "መቶ ስድሳ", english_transliteration: "Mi'it we-sidsa", english_translation: "One hundred and sixty", grammatical_context: "Numeral" },
      { geez: "ምእት ወሰብዓ", amharic_context: "መቶ ሰባ", english_transliteration: "Mi'it we-seb'a", english_translation: "One hundred and seventy", grammatical_context: "Numeral" },
      { geez: "ምእት ወሰማንያ", amharic_context: "መቶ ሰማንያ", english_transliteration: "Mi'it we-semanya", english_translation: "One hundred and eighty", grammatical_context: "Numeral" }
    ]
  },
  {
    lesson_id: 53,
    lesson_title: "Multiples of Hundreds",
    source_reference: "5105.jpg",
    module: "numbers",
    vocabulary: [
      { geez: "ክሌኤቱ ምእት", amharic_context: "ሁለት መቶ", english_transliteration: "Kile'etu mi'it", english_translation: "Two hundred", grammatical_context: "Numeral" },
      { geez: "ሠለስቱ ምእት", amharic_context: "ሦስት መቶ", english_transliteration: "Selestu mi'it", english_translation: "Three hundred", grammatical_context: "Numeral" },
      { geez: "አርባዕቱ ምእት", amharic_context: "አራት መቶ", english_transliteration: "Arba'itu mi'it", english_translation: "Four hundred", grammatical_context: "Numeral" },
      { geez: "ኃምስቱ ምእት", amharic_context: "አምስት መቶ", english_transliteration: "Hamistu mi'it", english_translation: "Five hundred", grammatical_context: "Numeral" },
      { geez: "ስድስቱ ምእት", amharic_context: "ስድስት መቶ", english_transliteration: "Sidistu mi'it", english_translation: "Six hundred", grammatical_context: "Numeral" },
      { geez: "ሰባት ምእት", amharic_context: "ሰባት መቶ", english_transliteration: "Sebat mi'it", english_translation: "Seven hundred", grammatical_context: "Numeral" },
      { geez: "ሰማንቱ ምእት", amharic_context: "ስምንት መቶ", english_transliteration: "Semantu mi'it", english_translation: "Eight hundred", grammatical_context: "Numeral" },
      { geez: "ተሰዓቱ ምእት", amharic_context: "ዘጠኝ መቶ", english_transliteration: "Tese'atu mi'it", english_translation: "Nine hundred", grammatical_context: "Numeral" }
    ]
  },
  {
    lesson_id: 54,
    lesson_title: "Thousands, Millions, and Billion",
    source_reference: "5106.jpg, 5107.jpg, 5108.jpg, 5109.jpg & 5110.jpg",
    module: "numbers",
    vocabulary: [
      { geez: "ዐሥርቱ ምእት", amharic_context: "አንድ ሺ", english_transliteration: "Asirtu mi'it", english_translation: "One thousand", grammatical_context: "Numeral" },
      { geez: "ዕሥራ ምእት", amharic_context: "ሁለት ሺ", english_transliteration: "Isra mi'it", english_translation: "Two thousand", grammatical_context: "Numeral" },
      { geez: "ሠላሳ ምእት", amharic_context: "ሦስት ሺ", english_transliteration: "Selasa mi'it", english_translation: "Three thousand", grammatical_context: "Numeral" },
      { geez: "አርብዓ ምእት", amharic_context: "አራት ሺ", english_transliteration: "Arbi'a mi'it", english_translation: "Four thousand", grammatical_context: "Numeral" },
      { geez: "ኃምሳ ምእት", amharic_context: "አምስት ሺ", english_transliteration: "Hamsa mi'it", english_translation: "Five thousand", grammatical_context: "Numeral" },
      { geez: "ስድሳ ምእት", amharic_context: "ስድስት ሺ", english_transliteration: "Sidsa mi'it", english_translation: "Six thousand", grammatical_context: "Numeral" },
      { geez: "ሰብዓ ምእት", amharic_context: "ሰባት ሺ", english_transliteration: "Seb'a mi'it", english_translation: "Seven thousand", grammatical_context: "Numeral" },
      { geez: "ሰማንያ ምእት", amharic_context: "ስምንት ሺ", english_transliteration: "Semanya mi'it", english_translation: "Eight thousand", grammatical_context: "Numeral" },
      { geez: "ተስዓ ምእት", amharic_context: "ዘጠኝ ሺ", english_transliteration: "Tes'a mi'it", english_translation: "Nine thousand", grammatical_context: "Numeral" },
      { geez: "አእላፍ", amharic_context: "አስር ሺ", english_transliteration: "A'ilaf", english_translation: "Ten thousand", grammatical_context: "Numeral" },
      { geez: "ክሌኤቱ አእላፍ", amharic_context: "ሀያ ሺ", english_transliteration: "Kile'etu a'ilaf", english_translation: "Twenty thousand", grammatical_context: "Numeral" },
      { geez: "ሠለስቱ አእላፍ", amharic_context: "ሠላሳ ሺ", english_transliteration: "Selestu a'ilaf", english_translation: "Thirty thousand", grammatical_context: "Numeral" },
      { geez: "አርባዕቱ አእላፍ", amharic_context: "አርባ ሺ", english_transliteration: "Arba'itu a'ilaf", english_translation: "Forty thousand", grammatical_context: "Numeral" },
      { geez: "ኃምስቱ አእላፍ", amharic_context: "ሀምሳ ሺ", english_transliteration: "Hamistu a'ilaf", english_translation: "Fifty thousand", grammatical_context: "Numeral" },
      { geez: "ስድስቱ አእላፍ", amharic_context: "ስድሳ ሺ", english_transliteration: "Sidistu a'ilaf", english_translation: "Sixty thousand", grammatical_context: "Numeral" },
      { geez: "ሰባት አእላፍ", amharic_context: "ሰባ ሺ", english_transliteration: "Sebat a'ilaf", english_translation: "Seventy thousand", grammatical_context: "Numeral" },
      { geez: "ሰማንቱ አእላፍ", amharic_context: "ሰማንያ ሺ", english_transliteration: "Semantu a'ilaf", english_translation: "Eighty thousand", grammatical_context: "Numeral" },
      { geez: "ተሰዓቱ አእላፍ", amharic_context: "ዘጠና ሺ", english_transliteration: "Tese'atu a'ilaf", english_translation: "Ninety thousand", grammatical_context: "Numeral" },
      { geez: "ዐሥርቱ አእላፍ", amharic_context: "መቶ ሺ", english_transliteration: "Asirtu a'ilaf", english_translation: "One hundred thousand", grammatical_context: "Numeral" },
      { geez: "ዕሥራ አእላፍ", amharic_context: "ሁለት መቶ ሺ", english_transliteration: "Isra a'ilaf", english_translation: "Two hundred thousand", grammatical_context: "Numeral" },
      { geez: "ሠላሳ አእላፍ", amharic_context: "ሦስት መቶ ሺ", english_transliteration: "Selasa a'ilaf", english_translation: "Three hundred thousand", grammatical_context: "Numeral" },
      { geez: "አርብዓ አእላፍ", amharic_context: "አራት መቶ ሺ", english_transliteration: "Arbi'a a'ilaf", english_translation: "Four hundred thousand", grammatical_context: "Numeral" },
      { geez: "ኃምሳ አእላፍ", amharic_context: "አምስት መቶ ሺ", english_transliteration: "Hamsa a'ilaf", english_translation: "Five hundred thousand", grammatical_context: "Numeral" },
      { geez: "ስድሳ አእላፍ", amharic_context: "ስድስት መቶ ሺ", english_transliteration: "Sidsa a'ilaf", english_translation: "Six hundred thousand", grammatical_context: "Numeral" },
      { geez: "ሰብዓ አእላፍ", amharic_context: "ሰባት መቶ ሺ", english_transliteration: "Seb'a a'ilaf", english_translation: "Seven hundred thousand", grammatical_context: "Numeral" },
      { geez: "ሰማንያ አእላፍ", amharic_context: "ስምንት መቶ ሺ", english_transliteration: "Semanya a'ilaf", english_translation: "Eight hundred thousand", grammatical_context: "Numeral" },
      { geez: "ተስዓ አእላፍ", amharic_context: "ዘጠኝ መቶ ሺ", english_transliteration: "Tes'a a'ilaf", english_translation: "Nine hundred thousand", grammatical_context: "Numeral" },
      { geez: "አእላፋት", amharic_context: "አንድ ሚሊዮን", english_transliteration: "A'ilafat", english_translation: "One million", grammatical_context: "Numeral" },
      { geez: "ትእልፊት", amharic_context: "አስር ሚሊዮን", english_transliteration: "Ti'ilfit", english_translation: "Ten million", grammatical_context: "Numeral" },
      { geez: "ትእልፊታት", amharic_context: "መቶ ሚሊዮን", english_transliteration: "Ti'ilfitat", english_translation: "One hundred million", grammatical_context: "Numeral" },
      { geez: "ምልአፌት", amharic_context: "አንድ ቢሊዮን", english_transliteration: "Mil'afiet", english_translation: "One billion", grammatical_context: "Numeral" }
    ]
  }
];

export interface GrammarTopic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: Array<{
    geez: string;
    transliteration: string;
    translation: string;
    explanation: string;
  }>;
}

export const GEEZ_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: "pronouns",
    title: "1. Pronominal Suffixes & Greetings",
    description: "In Ge'ez, greetings reflect the gender (masculine, feminine) and quantity (singular, plural) of the person you are speaking with. This logic is handled via endings or suffixes that append directly to basic roots.",
    keyPoints: [
      "No Gender-Neutrality for 'You': You must choose a masculine or feminine ending based on who is being addressed.",
      "Singular Masculine suffix -ke (ከ) is used when greeting a single boy or man.",
      "Singular Feminine suffix -ki (ኪ) is used when greeting a girl or woman.",
      "Plural Masculine/Mixed suffix -kemu (ክሙ) is used for a group of males or a mixed-gender group.",
      "Plural Feminine suffix -kin / -ken (ክን) is used specifically when addressing multiple females."
    ],
    examples: [
      {
        geez: "ሰላም ለከ",
        transliteration: "Selam leke",
        translation: "Peace be unto you (to a male)",
        explanation: "The suffix -ke signifies that the recipient of 'peace' is a single male."
      },
      {
        geez: "ሰላም ለኪ",
        transliteration: "Selam leki",
        translation: "Peace be unto you (to a female)",
        explanation: "The suffix -ki specifies that the recipient is a single female."
      },
      {
        geez: "ሰላም ለክሙ",
        transliteration: "Selam lekimu",
        translation: "Peace be unto you all (to a group)",
        explanation: "The suffix -kemu addresses multiple people (masculine/mixed collective)."
      }
    ]
  },
  {
    id: "third-person",
    title: "2. Third-Person Indirect Object Blessings",
    description: "Greetings can also be extended indirectly to people not active in the current conversation. Suffixes change when referring to 'him', 'her', or 'them'.",
    keyPoints: [
      "To Him (-lotu / ሎቱ): Spoken for a third-person male (e.g. 'Peace be unto him').",
      "To Her (-lati / ላቲ): Spoken for a third-person female ('Peace be unto her').",
      "To Them Masc. (-lomu / ሎሙ): Directed toward a group of males/mixed people.",
      "To Them Fem. (-lon / ሎን): Directed toward a group of females.",
      "To Me (-lite / ሊተ): 'Peace be unto me' (reflexive self-blessing).",
      "To Us (-lene / ለነ): 'Peace be unto us'."
    ],
    examples: [
      {
        geez: "ሰላም ሎቱ",
        transliteration: "Selam lotu",
        translation: "Peace be unto him",
        explanation: "The indirect dative third-person singular suffix is -otu (represented as ሎቱ Lotu)."
      },
      {
        geez: "ሰላም ሊተ",
        transliteration: "Selam lite",
        translation: "Peace be unto me",
        explanation: "The indirect dative first-person suffix is -ite (represented as ሊተ Lite)."
      }
    ]
  },
  {
    id: "verbal-greetings",
    title: "3. Verb-Based Suffix Conjugations",
    description: "Instead of saying 'Good Morning' or 'Good Afternoon' as abstract nouns, Ge'ez uses dynamic verbs that ask 'How did you spend...' the relevant period of time.",
    keyPoints: [
      "ኃደረ (Hadere): To pass the night. This is conjugated to formulate morning greetings.",
      "ውእለ (Wi'ile): To spend the day. This is conjugated to construct afternoon greetings.",
      "አምሰየ (Amseye): To spend the evening. Used for late afternoon and evening greetings.",
      "These verbs take identical endings relative to the subject: -ke (you, masc.), -ki (you, fem.), -kemu (you all, masc.), -kin (you all, fem.), -ku (I), and -ne (we)."
    ],
    examples: [
      {
        geez: "እፎ ኃደርከ",
        transliteration: "Ifo haderke",
        translation: "How did you pass the night? (Good morning, m.)",
        explanation: "Combining 'እፎ' (How) + 'ኃደረ' with the masculine suffix '-ከ' (-ke) asks literally 'how did you pass the night?'"
      },
      {
        geez: "እፎ ውእልኪ",
        transliteration: "Ifo wi'ilki",
        translation: "How did you spend the day? (Good afternoon, f.)",
        explanation: "Verb 'ውእለ' takes the suffix '-ኪ' (-ki) to address a single female during daytime hours."
      },
      {
        geez: "እፎ አምሰይኩ",
        transliteration: "Ifo amseyku",
        translation: "How did I spend the evening?",
        explanation: "Suffix '-ኩ' (-ku) designates first-person singular action ('spent the evening, I')."
      }
    ]
  },
  {
    id: "interrogatives",
    title: "4. Biographical Suffixes and Inquiries",
    description: "When learning about someone's origin, age, or identity, interrogative words link with possessive suffixes like -ke (your) or -ye (my).",
    keyPoints: [
      "መኑ (Menu): Interrogative meaning 'Who' or 'What' (used for names).",
      "አይቴ (Aytie): Interrogative meaning 'Where'. Coupled with 'እም' (from), it is 'እም አይቴ' (from where).",
      "እስፍት (Isfit): Interrogative particle meaning 'How much' / 'How many'.",
      "ማእዜ (Ma'izie): Interrogative meaning 'When'.",
      "ምንባር (Minbar): Suffix template representing 'residence' or 'dwelling state'."
    ],
    examples: [
      {
        geez: "መኑ ስምከ?",
        transliteration: "Menu simke?",
        translation: "What is your name? (m.)",
        explanation: "Asking 'Who/what [is] your name?' where 'ስም' (name) takes the suffix '-ከ' (-ke) for 'your'."
      },
      {
        geez: "እም አይቴ መጻእከ?",
        transliteration: "Im aytie metsa'ike?",
        translation: "Where did you come from? (m.)",
        explanation: "Literally 'From where did you enter/come?' with 'መጻእከ' (you came, masc)."
      }
    ]
  },
  {
    id: "demonstratives",
    title: "5. Demonstrative Pronouns (አመልካች ንግግሮች)",
    description: "Demonstrative pronouns point out specific objects or individuals. Like other words, they must agree with the target's gender (masculine, feminine) and quantity (singular, plural), as well as distance (near vs. far).",
    keyPoints: [
      "Near ('This' / 'These'): Used to point to subjects close by. 'ዝ' (Zi) / 'ዝንቱ' (Zintu) for this (masc), and 'ዛ' / 'ዛቲ' for this (fem).",
      "Far ('That' / 'Those'): Used to point to distant subjects. 'ዝኩ' (Ziku) / 'ውእቱ' (Wi'itu) for that (masc), and 'እንተክቲ' / 'እንትኩ' for that (fem).",
      "Plural Near ('These'): 'እሉ' (Elu) for males/mixed, and 'እላ' (Ela) for females.",
      "Plural Far ('Those'): 'እሙንቱ' (Emuntu) for males/mixed, and 'እማንቱ' (Emantu) for females.",
      "Sentence Order: Usually goes: Demonstrative + Copula Verb ('is/are') + Subject Noun (e.g., 'ዝንቱ ውእቱ አቡየ' -> This is my father)."
    ],
    examples: [
      {
        geez: "ዝንቱ ውእቱ አቡየ",
        transliteration: "Zintu wi'itu abuye",
        translation: "This is my father.",
        explanation: "Combining 'ዝንቱ' (This, near masc.) + 'ውእቱ' (is) + 'አቡየ' (my father)."
      },
      {
        geez: "ዛቲ ዓለም ዚአነ ይእቲ",
        transliteration: "Zati alem zi'ane yi'iti",
        translation: "This world is ours.",
        explanation: "Combining 'ዛቲ' (This, near fem.) + 'ዓለም' (world) + 'ዚአነ' (ours) + 'ይእቲ' (is, fem.)."
      }
    ]
  },
  {
    id: "anatomy",
    title: "6. Human Body Parts & Vital Vocabulary (አካላትና አካላዊ መገለጫዎች)",
    description: "Ge'ez has an extremely rich and precise vocabulary for anatomical features, parts of the body, and physical attributes. It provides dual forms for singular and plural body parts (e.g. eye vs eyes) and descriptive attributes.",
    keyPoints: [
      "Singular & Plural Pairings: Observe standard pluralization prefixes (e.g., ርእስ head -> አርእስት heads; ዐይን eye -> አዕይንት eyes; ገጽ face -> ገጻት faces).",
      "Head and Face: Key core terms like 'ርእስ' (head), 'ገጽ' (face), 'ዐይን' (eye), and 'ልሳን' (tongue).",
      "Measurements & Stature: Physical attributes use adjectives like 'ነዋኅ' (tall), 'ሐፂር' (short), and 'ሠናይ' (beautiful/handsome)."
    ],
    examples: [
      {
        geez: "ሠናይ ገጽ",
        transliteration: "Senay gets'",
        translation: "Beautiful face",
        explanation: "Combining the adjective 'ሠናይ' (beautiful) with the noun 'ገጽ' (face)."
      },
      {
        geez: "ልብ ወልቡና",
        transliteration: "Lib we-libuna",
        translation: "Heart and understanding",
        explanation: "Pairs the bodily heart 'ልብ' with 'ልቡና' (understanding or intellect), a common conceptual grouping."
      }
    ]
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: "Eyob G.", avatar: "🦁", xp: 2450, badge: "Ge'ez Scribe" },
  { rank: 2, name: "Helen T.", avatar: "✨", xp: 1980, badge: "Fluent Orator" },
  { rank: 3, name: "Yared K.", avatar: "🎵", xp: 1720, badge: "Hymnist" },
  { rank: 4, name: "Saba W.", avatar: "👑", xp: 1350, badge: "Scholar" },
  { rank: 5, name: "Samuel B.", avatar: "🦅", xp: 950, badge: "Novice" },
  { rank: 6, name: "Almaz M.", avatar: "🌺", xp: 480, badge: "Beginner" }
];

export const GE_EZ_NUMERALS: Record<number, { geez: string, phonetic: string }> = {
  1: { geez: "፩", phonetic: "unite" },
  2: { geez: "፪", phonetic: "kile" },
  3: { geez: "፫", phonetic: "shalis" },
  4: { geez: "፬", phonetic: "arba'e" },
  5: { geez: "፭", phonetic: "hamis" },
  6: { geez: "፮", phonetic: "sadis" },
  7: { geez: "፯", phonetic: "sabi'e" },
  8: { geez: "፰", phonetic: "samun" },
  9: { geez: "፱", phonetic: "tish'e" },
  10: { geez: "፲", phonetic: "ashir" },
  11: { geez: "፲፩", phonetic: "ashirtu-wa-unite" },
  12: { geez: "፲፪", phonetic: "ashirtu-wa-kile" },
  13: { geez: "፲፫", phonetic: "ashirtu-wa-shalis" },
  14: { geez: "፲፬", phonetic: "ashirtu-wa-arba'e" },
  15: { geez: "፲፭", phonetic: "ashirtu-wa-hamis" },
  16: { geez: "፲፮", phonetic: "ashirtu-wa-sadis" },
  17: { geez: "፲፯", phonetic: "ashirtu-wa-sabi'e" },
  18: { geez: "፲፰", phonetic: "ashirtu-wa-samun" },
  19: { geez: "፲፱", phonetic: "ashirtu-wa-tish'e" },
  20: { geez: "፳", phonetic: "isra" },
  21: { geez: "፳፩", phonetic: "isra-wa-unite" },
  22: { geez: "፳፪", phonetic: "isra-wa-kile" },
  23: { geez: "፳፫", phonetic: "isra-wa-shalis" },
  24: { geez: "፳፬", phonetic: "isra-wa-arba'e" },
  25: { geez: "፳፭", phonetic: "isra-wa-hamis" },
  26: { geez: "፳፮", phonetic: "isra-wa-sadis" },
  27: { geez: "፳፯", phonetic: "isra-wa-sabi'e" },
  28: { geez: "፳፰", phonetic: "isra-wa-samun" },
  29: { geez: "፳፱", phonetic: "isra-wa-tish'e" },
  30: { geez: "፴", phonetic: "selasa" },
  31: { geez: "፴፩", phonetic: "selasa-wa-unite" },
  32: { geez: "፴፪", phonetic: "selasa-wa-kile" },
  33: { geez: "፴፫", phonetic: "selasa-wa-shalis" },
  34: { geez: "፴፬", phonetic: "selasa-wa-arba'e" },
  35: { geez: "፴፭", phonetic: "selasa-wa-hamis" },
  36: { geez: "፴፮", phonetic: "selasa-wa-sadis" },
  37: { geez: "፴፯", phonetic: "selasa-wa-sabi'e" },
  38: { geez: "፴፰", phonetic: "selasa-wa-samun" },
  39: { geez: "፴፱", phonetic: "selasa-wa-tish'e" },
  40: { geez: "፵", phonetic: "arba_a" },
  41: { geez: "፵፩", phonetic: "arba_a-wa-unite" },
  42: { geez: "፵፪", phonetic: "arba_a-wa-kile" },
  43: { geez: "፵፫", phonetic: "arba_a-wa-shalis" },
  44: { geez: "፵፬", phonetic: "arba_a-wa-arba'e" },
  45: { geez: "፵፭", phonetic: "arba_a-wa-hamis" },
  46: { geez: "፵፮", phonetic: "arba_a-wa-sadis" },
  47: { geez: "፵፯", phonetic: "arba_a-wa-sabi'e" },
  48: { geez: "፵፰", phonetic: "arba_a-wa-samun" },
  49: { geez: "፵፱", phonetic: "arba_a-wa-tish'e" },
  50: { geez: "፶", phonetic: "hamsa" },
  51: { geez: "፶፩", phonetic: "hamsa-wa-unite" },
  52: { geez: "፶፪", phonetic: "hamsa-wa-kile" },
  53: { geez: "፶፫", phonetic: "hamsa-wa-shalis" },
  54: { geez: "፶፬", phonetic: "hamsa-wa-arba'e" }
};

// Generates Ge'ez header string matching user requirement: "ምዕራፍ [Ge'ez Number] — Meraf [Arabic Number]: [Topic]"
export function getChapterTitle(lessonId: number, topic: string): string {
  const numeralInfo = GE_EZ_NUMERALS[lessonId] || { geez: "፩" };
  return `ምዕራፍ ${numeralInfo.geez} — Meraf ${lessonId}: ${topic}`;
}
