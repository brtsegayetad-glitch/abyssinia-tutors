import React, { useState, useRef, useEffect } from "react";
import { X, ArrowLeft, ArrowRight, Volume2, Sparkles, Award, RotateCcw, BookOpen, Compass, CheckCircle2, Paintbrush, Trash2, Check, Star, Play, MessageSquare, Info, ShieldAlert, Heart, Trophy, Activity, Award as StarIcon, Database, Github, Terminal, Code, ExternalLink, RefreshCw, Layers, GraduationCap, Video, BookOpenCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { slides, LessonSlide, IntroSlide, ObjectivesSlide, VocabularySlide, SpeakingExerciseSlide, GuidedDialogueSlide, ReadingActivitySlide, WritingActivitySlide, InteractiveGameSlide, HomeworkSlide, ParentInvolvementSlide, TutorGuidanceSlide, ProgressAssessmentSlide, ConclusionSlide } from "../data/slides";
import { subscribeToSettings } from "../services/dataService";
import GeezAcademy from "./GeezAcademy";
import HabKidsApp from "../lingukid/App"
import AmharicCertificate from "./AmharicCertificate";

// 1. Safe image fallback dictionary
const localFallbackImages: Record<string, string> = {
  "ሰላም": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500",
  "ጤና ይስጥልኝ": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500",
  "እንደምን አደርክ": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500",
  "እንደምን አደርሽ": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500"
};

interface SlideImageProps {
  fidelKey: string;
  providedUrl: string;
}

export const SlideImage: React.FC<SlideImageProps> = ({ fidelKey, providedUrl }) => {
  const safeSrc = providedUrl?.startsWith('http') ? providedUrl : (localFallbackImages[fidelKey] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500");
  return (
    <img 
      src={safeSrc} 
      alt={fidelKey}
      referrerPolicy="no-referrer"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      className="transition-all duration-300 hover:scale-105"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500";
      }}
    />
  );
};

interface LessonViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

// 24 Curriculum Lesson Meta Catalogue for Level 1
const lessonsMetaDataLevel1 = [
  { num: 1, topic: "Greetings", amh: "ሰላምታ", level: 1, LevelName: "Level 1: Foundations", geez: "፩", desc: "Say Hello and goodbye!" },
  { num: 2, topic: "Introducing Yourself", amh: "ራስን ማስተዋወቅ", level: 1, LevelName: "Level 1: Foundations", geez: "፪", desc: "Introduce your name." },
  { num: 3, topic: "Respectful Greetings", amh: "የአክብሮት ሰላምታ", level: 1, LevelName: "Level 1: Foundations", geez: "፫", desc: "Greetings for elders." },
  { num: 4, topic: "Asking Names", amh: "ስም መጠየቅ", level: 1, LevelName: "Level 1: Foundations", geez: "፬", desc: "Ask what others are called." },
  { num: 5, topic: "Family Members", amh: "የቤተሰብ አባላት", level: 1, LevelName: "Level 1: Foundations", geez: "፭", desc: "Mom, dad, brothers..." },
  { num: 6, topic: "My Home", amh: "ቤቴ", level: 1, LevelName: "Level 1: Foundations", geez: "፮", desc: "Parts of the home." },
  { num: 7, topic: "My Country", amh: "ሀገሬ", level: 1, LevelName: "Level 1: Foundations", geez: "፯", desc: "Beautiful Ethiopia." },
  { num: 8, topic: "My School", amh: "ትምህርት ቤቴ", level: 1, LevelName: "Level 1: Foundations", geez: "፰", desc: "School environments." },

  { num: 9, topic: "Numbers 1-10", amh: "ቁጥሮች ከ፩-፲", level: 2, LevelName: "Level 2: Vocabulary Boost", geez: "፱", desc: "Ge'ez numerals 1-10." },
  { num: 10, topic: "Numbers 11-20", amh: "ቁጥሮች ከ፲፩-፳", level: 2, LevelName: "Level 2: Vocabulary Boost", geez: "፲", desc: "Counting up to 20." },
  { num: 11, topic: "Colors", amh: "ቀለሞች", level: 2, LevelName: "Level 2: Vocabulary Boost", geez: "፲፩", desc: "Green, yellow, red..." },
  { num: 12, topic: "Shapes & Objects", amh: "ቅርጾች እና ዕቃዎች", level: 2, LevelName: "Level 2: Vocabulary Boost", geez: "፲፪", desc: "Circles and squares." },
  { num: 13, topic: "Classroom Objects", amh: "የክፍል ውስጥ ዕቃዎች", level: 2, LevelName: "Level 2: Vocabulary Boost", geez: "፲፫", desc: "Pencils and desks." },
  { num: 14, topic: "Household Items", amh: "የቤት እቃዎች", level: 2, LevelName: "Level 2: Vocabulary Boost", geez: "፲፬", desc: "Beds and tables." },
  { num: 15, topic: "Body Parts", amh: "የሰውነት ክፍሎች", level: 2, LevelName: "Level 2: Vocabulary Boost", geez: "፲፭", desc: "Eyes, ears, hands." },
  { num: 16, topic: "Clothing", amh: "ልบሶች", level: 2, LevelName: "Level 2: Vocabulary Boost", geez: "፲፮", desc: "What we wear." },

  { num: 17, topic: "Daily Routine", amh: "የዕለት ተዕለት ተግባር", level: 3, LevelName: "Level 3: Expressive Fluency", geez: "፲፯", desc: "Daily habits." },
  { num: 18, topic: "Morning Activities", amh: "የጠዋት ተግባራት", level: 3, LevelName: "Level 3: Expressive Fluency", geez: "፲፰", desc: "Waking up!" },
  { num: 19, topic: "Emotions & Feelings", amh: "ስሜቶች", level: 3, LevelName: "Level 3: Expressive Fluency", geez: "፲፱", desc: "Happy, sad, excited!" },
  { num: 20, topic: "Likes & Dislikes", amh: "ምርጫዎች", level: 3, LevelName: "Level 3: Expressive Fluency", geez: "፳", desc: "I like, I don't like." },
  { num: 21, topic: "Ethiopian Foods", amh: "የኢትዮጵያ ምግቦች", level: 3, LevelName: "Level 3: Expressive Fluency", geez: "፳፩", desc: "Injera & doro wot!" },
  { num: 22, topic: "Fruits & Vegetables", amh: "ፍራፍሬዎችና አትክልቶች", level: 3, LevelName: "Level 3: Expressive Fluency", geez: "፳፪", desc: "What grows!" },
  { num: 23, topic: "Animals", amh: "እንስሳት", level: 3, LevelName: "Level 3: Expressive Fluency", geez: "፳፫", desc: "Lions and tigers." },
  { num: 24, topic: "Review & Celebration", amh: "ክለሳ እና በዓል", level: 3, LevelName: "Level 3: Expressive Fluency", geez: "፳፬", desc: "Graduation celebration!" }
];

// 24 Curriculum Lesson Meta Catalogue for Level 2
const lessonsMetaDataLevel2 = [
  { num: 1, topic: "Talking About Your Day", amh: "የዕለት ተዕለት ውሎ", level: 1, LevelName: "Stage 1: Daily Activities", geez: "፩", desc: "Describe your morning routines." },
  { num: 2, topic: "Asking Simple Questions", amh: "ቀላል ጥያቄዎች", level: 1, LevelName: "Stage 1: Daily Activities", geez: "፪", desc: "How to trace and ask nicely." },
  { num: 3, topic: "Visiting Family", amh: "ቤተሰብን መጎብኘት", level: 1, LevelName: "Stage 1: Daily Activities", geez: "፫", desc: "Talk with grandparents." },
  { num: 4, topic: "Weekend Activities", amh: "የቅዳሜና እሁድ ተግባራት", level: 1, LevelName: "Stage 1: Daily Activities", geez: "፬", desc: "Fun sports and recreation." },
  { num: 5, topic: "Subjects in School", amh: "የትምህርት ዓይነቶች", level: 1, LevelName: "Stage 1: Daily Activities", geez: "፭", desc: "Maths, sciences, history." },
  { num: 6, topic: "Classroom Conversations", amh: "የክፍል ውስጥ ውይይቶች", level: 1, LevelName: "Stage 1: Daily Activities", geez: "፮", desc: "Dialogue with classmates." },
  { num: 7, topic: "Asking for Help", amh: "እርዳታ መጠየቅ", level: 1, LevelName: "Stage 1: Daily Activities", geez: "፯", desc: "Polite tutoring requests." },
  { num: 8, topic: "Reading Together", amh: "አብሮ ማንበብ", level: 1, LevelName: "Stage 1: Daily Activities", geez: "፰", desc: "Tracing books in library." },

  { num: 9, topic: "Days of the Week", amh: "የሳምንቱ ቀናት", level: 2, LevelName: "Stage 2: Time & Markets", geez: "፱", desc: "Monday to Sunday names." },
  { num: 10, topic: "Months & Seasons", amh: "ወራት እና ወቅቶች", level: 2, LevelName: "Stage 2: Time & Markets", geez: "፲", desc: "Ethiopian 13-month calendar." },
  { num: 11, topic: "Telling Time", amh: "ሰዓት መናገር", level: 2, LevelName: "Stage 2: Time & Markets", geez: "፲፩", desc: "The unique 6-hour offset." },
  { num: 12, topic: "Planning Activities", amh: "እቅድ ማውጣት", level: 2, LevelName: "Stage 2: Time & Markets", geez: "፲፪", desc: "Schedule tomorrow's agenda." },
  { num: 13, topic: "Buying Food", amh: "ምግብ መግዛት", level: 2, LevelName: "Stage 2: Time & Markets", geez: "፲፬", desc: "Injera, milk, bakery." },
  { num: 14, topic: "At the Market", amh: "በገበያ ውስጥ", level: 2, LevelName: "Stage 2: Time & Markets", geez: "፲፫", desc: "Bargaining fruit prices." },
  { num: 15, topic: "Favorite Meals", amh: "ተወዳጅ ምግቦች", level: 2, LevelName: "Stage 2: Time & Markets", geez: "፲፭", desc: "Spiced stews & kitfo." },
  { num: 16, topic: "Cooking at Home", amh: "ቤት ውስጥ ማብሰል", level: 2, LevelName: "Stage 2: Time & Markets", geez: "፲፮", desc: "Stovetop pot activities." },

  { num: 17, topic: "Transportation", amh: "የትራንስፖርት መንገዶች", level: 3, LevelName: "Stage 3: Travel & Narrative", geez: "፲፯", desc: "Trains, cars, airplanes, bajaj." },
  { num: 18, topic: "Visiting Ethiopia", amh: "ኢትዮጵያን መጎብኘት", level: 3, LevelName: "Stage 3: Travel & Narrative", geez: "፲፰", desc: "Castles of Gonder & churches." },
  { num: 19, topic: "Directions & Places", amh: "አቅጣጫዎች እና ቦታዎች", level: 3, LevelName: "Stage 3: Travel & Narrative", geez: "፲፱", desc: "Left, right, facing ahead." },
  { num: 20, topic: "Community Events", amh: "የማኅበረሰብ ዝግጅቶች", level: 3, LevelName: "Stage 3: Travel & Narrative", geez: "፳", desc: "Weddings, holiday feasts." },
  { num: 21, topic: "Sharing Opinions", amh: "አስተያየት መለዋወጥ", level: 3, LevelName: "Stage 3: Travel & Narrative", geez: "፳፩", desc: "Expressing views politely." },
  { num: 22, topic: "Telling Short Stories", amh: "አጫጭር ታሪኮችን መናገር", level: 3, LevelName: "Stage 3: Travel & Narrative", geez: "፳፪", desc: "Moral animal folklore." },
  { num: 23, topic: "Describing Experiences", amh: "ልምዶችን መግለጽ", level: 3, LevelName: "Stage 3: Travel & Narrative", geez: "፳፫", desc: "Recounting past events." },
  { num: 24, topic: "Level Review & Celebration", amh: "ክለሳ እና በዓል", level: 3, LevelName: "Stage 3: Travel & Narrative", geez: "፳፬", desc: "Brave hero graduation stats!" }
];

// 24 Curriculum Lesson Meta Catalogue for Level 3
const lessonsMetaDataLevel3 = [
  { num: 1, topic: "Talking About Hobbies", amh: "የትርፍ ጊዜ ተግባራት", level: 1, LevelName: "Stage 1: Hobbies & Friends", geez: "፩", desc: "Share your leisure interests and sports." },
  { num: 2, topic: "Describing Friends", amh: "ጓደኞችን መግለጽ", level: 1, LevelName: "Stage 1: Hobbies & Friends", geez: "፪", desc: "Express friendships and companion traits." },
  { num: 3, topic: "Invitations & Visiting", amh: "ግብዣ እና ጉብኝት", level: 1, LevelName: "Stage 1: Hobbies & Friends", geez: "፫", desc: "Invite others to play and visit houses." },
  { num: 4, topic: "Telephone Conversations", amh: "የስልክ ጨዋታ", level: 1, LevelName: "Stage 1: Hobbies & Friends", geez: "፬", desc: "Practise interactive phone greetings." },
  { num: 5, topic: "Study Habits", amh: "የማጥናት ልምድ", level: 1, LevelName: "Stage 1: Hobbies & Friends", geez: "፭", desc: "Discuss libraries, exams, and habits." },
  { num: 6, topic: "Goals & Dreams", amh: "ምኞት እና ህልም", level: 1, LevelName: "Stage 1: Hobbies & Friends", geez: "፮", desc: "Express future hopes and creative plans." },
  { num: 7, topic: "Problem Solving", amh: "ችግር መፍታት", level: 1, LevelName: "Stage 1: Hobbies & Friends", geez: "፯", desc: "Analyze obstacles and discover solutions." },
  { num: 8, topic: "Teamwork & Cooperation", amh: "አብሮ መስራት", level: 1, LevelName: "Stage 1: Hobbies & Friends", geez: "፰", desc: "Collaborate together with helper mates." },

  { num: 9, topic: "Ethiopian Holidays", amh: "የኢትዮጵያ በዓላት", level: 2, LevelName: "Stage 2: Culture & Customs", geez: "፱", desc: "Enkutatash, Meskel, Ledet celebrations." },
  { num: 10, topic: "Traditional Clothing", amh: "የባህል ልብስ", level: 2, LevelName: "Stage 2: Culture & Customs", geez: "፲", desc: "Habesha kemis, Kuta and Netela wear." },
  { num: 11, topic: "Music & Dance", amh: "ሙዚቃ እና እስክስታ", level: 2, LevelName: "Stage 2: Culture & Customs", geez: "፲፩", desc: "Traditional strings beats and shoulder dancing." },
  { num: 12, topic: "Respect & Community Values", amh: "ክብር እና እሴት", level: 2, LevelName: "Stage 2: Culture & Customs", geez: "፲፪", desc: "Elders reverence, community loyalty." },
  { num: 13, topic: "Describing Past Events", amh: "ያለፉ ታሪኮችን", level: 2, LevelName: "Stage 2: Culture & Customs", geez: "፲", desc: "Narrate last month's trips in the past tense." },
  { num: 14, topic: "Telling Funny Stories", amh: "አስቂኝ ጨዋታ", level: 2, LevelName: "Stage 2: Culture & Customs", geez: "፲፬", desc: "Recount jokes and fun cartoon ideas." },
  { num: 15, topic: "Giving Opinions", amh: "አስተያየት መስጠት", level: 2, LevelName: "Stage 2: Culture & Customs", geez: "፲፭", desc: "Politely state likes and reasoning points." },
  { num: 16, topic: "Comparing Things", amh: "ማወዳደር", level: 2, LevelName: "Stage 2: Culture & Customs", geez: "፲፮", desc: "Bigger, faster, heavier comparative terms." },

  { num: 17, topic: "Shopping Conversations", amh: "በገበያ መገበየት", level: 3, LevelName: "Stage 3: Speaking Excellence", geez: "፲፯", desc: "Market bargaining and shopping lines." },
  { num: 18, topic: "Restaurant & Food Orders", amh: "ምግብ ማዘዝ", level: 3, LevelName: "Stage 3: Speaking Excellence", geez: "፲፰", desc: "Order beef stews and summon warm hosts." },
  { num: 19, topic: "Travel Situations", amh: "ጉዞ እና መጓዝ", level: 3, LevelName: "Stage 3: Speaking Excellence", geez: "፲፱", desc: "Buses, airplanes, roads and vacations." },
  { num: 20, topic: "Asking for Directions", amh: "መንገድ መጠየቅ", level: 3, LevelName: "Stage 3: Speaking Excellence", geez: "፳", desc: "Querying pathways, right, left, straight ahead." },
  { num: 21, topic: "Public Speaking Practice", amh: "ንግግር ማሰማት", level: 3, LevelName: "Stage 3: Speaking Excellence", geez: "፳፩", desc: "Confident stage postures and audience greetings." },
  { num: 22, topic: "Sharing Experiences", amh: "ልምድ ማካፈል", level: 3, LevelName: "Stage 3: Speaking Excellence", geez: "፳፪", desc: "Share lessons learned and skill reflections." },
  { num: 23, topic: "Mini Presentations", amh: "አጭር ማብራሪያ", level: 3, LevelName: "Stage 3: Speaking Excellence", geez: "፳፫", desc: "Show-and-tell posters and logic flow." },
  { num: 24, topic: "Level Review & Celebration", amh: "ክለሳ እና ምረቃ", level: 3, LevelName: "Stage 3: Speaking Excellence", geez: "፳፬", desc: "Gold stars graduation, award, and review." }
];

const lessonsMetaDataLevel4 = [
  { num: 1, topic: "Discussing Daily Responsibilities", amh: "የዕለት ተዕለት ኃላፊነት", level: 1, LevelName: "Stage 1: Speech Ethics", geez: "፩", desc: "Express daily commitments." },
  { num: 2, topic: "Solving Everyday Problems", amh: "ችግር መፍታት", level: 1, LevelName: "Stage 1: Speech Ethics", geez: "፪", desc: "Discover common pathways." },
  { num: 3, topic: "Giving Advice", amh: "ምክር መስጠት", level: 1, LevelName: "Stage 1: Speech Ethics", geez: "፫", desc: "Draft guiding comments nicely." },
  { num: 4, topic: "Expressing Agreement & Disagreement", amh: "መስማማት እና አለመስማማት", level: 1, LevelName: "Stage 1: Speech Ethics", geez: "፬", desc: "State logic positions politely." },
  { num: 5, topic: "Career Interests", amh: "የሙያ ፍላጎት", level: 1, LevelName: "Stage 1: Speech Ethics", geez: "፭", desc: "Discuss future careers." },
  { num: 6, topic: "University & Education Goals", amh: "የትምህርት ግቦች", level: 1, LevelName: "Stage 1: Speech Ethics", geez: "፮", desc: "Examine future academic dreams." },
  { num: 7, topic: "Technology & Social Media", amh: "ቴክኖሎጂ እና ማኅበራዊ ሚዲያ", level: 1, LevelName: "Stage 1: Speech Ethics", geez: "፯", desc: "Talk screens and codes." },
  { num: 8, topic: "Leadership & Responsibility", amh: "መሪነት እና ኃላፊነት", level: 1, LevelName: "Stage 1: Speech Ethics", geez: "፰", desc: "Lead community movements." },

  { num: 9, topic: "Ethiopian History Stories", amh: "የኢትዮጵያ ታሪክ", level: 2, LevelName: "Stage 2: Advanced Culture & Narrative", geez: "፱", desc: "Trace ancient dynasties." },
  { num: 10, topic: "Cultural Values & Respect", amh: "ባህላዊ እሴቶች እና ክብር", level: 2, LevelName: "Stage 2: Advanced Culture & Narrative", geez: "፲", desc: "Bowing politely to seniors." },
  { num: 11, topic: "Community & Family Roles", amh: "የማህበረሰብ እና የቤተሰብ ሚና", level: 2, LevelName: "Stage 2: Advanced Culture & Narrative", geez: "፲፩", desc: "Volunteer with neighborhood helper mates." },
  { num: 12, topic: "Ethiopian Proverbs & Wisdom", amh: "የኢትዮጵያ ምሳሌያዊ አነጋገሮች", level: 2, LevelName: "Stage 2: Advanced Culture & Narrative", geez: "፲፪", desc: "Metaphors and folk allegory." },
  { num: 13, topic: "Narrating Personal Experiences", amh: "የግል ልምዶችን መተረክ", level: 2, LevelName: "Stage 2: Advanced Culture & Narrative", geez: "፲፫", desc: "Sequence past life timelines." },
  { num: 14, topic: "Debates & Discussions", amh: "ክርክር እና ውይይቶች", level: 2, LevelName: "Stage 2: Advanced Culture & Narrative", geez: "፲፬", desc: "Engage polite debates with evidence." },
  { num: 15, topic: "Describing Challenges & Success", amh: "ተግዳሮቶች እና ስኬት", level: 2, LevelName: "Stage 2: Advanced Culture & Narrative", geez: "፲፭", desc: "Recount victory over hurdles." },
  { num: 16, topic: "Comparing Cultures", amh: "ባህሎችን ማወዳደር", level: 2, LevelName: "Stage 2: Advanced Culture & Narrative", geez: "፲፮", desc: "Contrast world habits." },

  { num: 17, topic: "Travel Planning", amh: "የጉዞ እቅድ", level: 3, LevelName: "Stage 3: Advanced Forums", geez: "፲፯", desc: "Format summer journey agendas." },
  { num: 18, topic: "At the Airport", amh: "በአውሮፕላን ማረፊያ", level: 3, LevelName: "Stage 3: Advanced Forums", geez: "፲፰", desc: "Navigate customs checks." },
  { num: 19, topic: "Job & Volunteer Conversations", amh: "ሥራ እና አገልግሎት", level: 3, LevelName: "Stage 3: Advanced Forums", geez: "፲፱", desc: "Highlight vocational traits." },
  { num: 20, topic: "Handling Emergencies", amh: "ድንገተኛ አደጋዎች", level: 3, LevelName: "Stage 3: Advanced Forums", geez: "፳", desc: "Submit quick safety decisions." },
  { num: 21, topic: "Public Speaking", amh: "የህዝብ ንግግር", level: 3, LevelName: "Stage 3: Advanced Forums", geez: "፳፩", desc: "Command stage fear with resonance." },
  { num: 22, topic: "Presenting Ideas", amh: "ሀሳቦችን ማቅረብ", level: 3, LevelName: "Stage 3: Advanced Forums", geez: "፳፪", desc: "Pitch science and technology maps." },
  { num: 23, topic: "Interview Practice", amh: "የቃለ መጠይቅ ልምምድ", level: 3, LevelName: "Stage 3: Advanced Forums", geez: "፳፫", desc: "Ace college entrance dialogue." },
  { num: 24, topic: "Level Review & Fluency Celebration", amh: "ክለሳ እና ምረቃ በዓል", level: 3, LevelName: "Stage 3: Advanced Forums", geez: "፳፬", desc: "Graduate Level 4 with pride." }
];

const lessonsMetaDataLevel5 = [
  { num: 1, topic: "Expressing Personal Identity", amh: "ማንነትን መግለጽ", level: 1, LevelName: "Stage 1: Voice & Dialogue", geez: "፩", desc: "Explore heritage, origins, and personal values." },
  { num: 2, topic: "Discussing Life Decisions", amh: "ውሳኔና ዕድል", level: 1, LevelName: "Stage 1: Voice & Dialogue", geez: "፪", desc: "Discuss personal pathways, choices, and consequences." },
  { num: 3, topic: "Conflict Resolution Conversations", amh: "መረዳዳትና እርቅ", level: 1, LevelName: "Stage 1: Voice & Dialogue", geez: "፫", desc: "Resolve peer disputes and find compromise." },
  { num: 4, topic: "Persuasion & Negotiation", amh: "ማሳመንና ድርድር", level: 1, LevelName: "Stage 1: Voice & Dialogue", geez: "፬", desc: "Frame arguments politely to build consensus." },
  { num: 5, topic: "Motivating Others", amh: "ማበረታታትና ተስፋ", level: 1, LevelName: "Stage 1: Voice & Dialogue", geez: "፭", desc: "Inspire family and friends with optimistic sayings." },
  { num: 6, topic: "Community Leadership", amh: "መሪነትና ማህበረሰብ", level: 1, LevelName: "Stage 1: Voice & Dialogue", geez: "፮", desc: "Outline civic expectations and ethical teamwork." },
  { num: 7, topic: "Mentorship & Guidance", amh: "ቅንነትና እገዛ", level: 1, LevelName: "Stage 1: Voice & Dialogue", geez: "፯", desc: "Deliver wisdom and tutoring to younger peers." },
  { num: 8, topic: "Public Influence & Responsibility", amh: "ኃላፊነትና ማህበረሰብ", level: 1, LevelName: "Stage 1: Voice & Dialogue", geez: "፰", desc: "Discuss social responsibilities and ethical duty." },

  { num: 9, topic: "Ethiopian Historical Figures", amh: "ታዋቂ ሰነታዎችና ታሪክ", level: 2, LevelName: "Stage 2: Advanced Culture & Critical Thought", geez: "፱", desc: "Discuss ancient emperors, empresses, and legends." },
  { num: 10, topic: "Philosophy, Respect & Social Wisdom", amh: "የማህበራዊ ጥበብ ፍልስፍና", level: 2, LevelName: "Stage 2: Advanced Culture & Critical Thought", geez: "፲", desc: "Examine traditional proverbs and social wisdom." },
  { num: 11, topic: "Traditional Storytelling & Oral Culture", amh: "ባህላዊ ተረቶችና ወጎች", level: 2, LevelName: "Stage 2: Advanced Culture & Critical Thought", geez: "፲፩", desc: "Share folktales and oral legacy narratives." },
  { num: 12, topic: "Ethiopian Values in Modern Life", amh: "ባህላዊ እሴቶች በዘመናዊ ህይወት", level: 2, LevelName: "Stage 2: Advanced Culture & Critical Thought", geez: "፲፪", desc: "Analyze ancestral heritage alongside technology." },
  { num: 13, topic: "Social Issues & Community Discussions", amh: "ማህበራዊ ጉዳዮችና ህብረተሰብ", level: 2, LevelName: "Stage 2: Advanced Culture & Critical Thought", geez: "፲፫", desc: "Deliberate local development and helper solutions." },
  { num: 14, topic: "Ethical Dilemmas & Opinions", amh: "ግብረገብነትና ህሊና", level: 2, LevelName: "Stage 2: Advanced Culture & Critical Thought", geez: "፲፬", desc: "Deliberate ethics patterns and moral standpoints." },
  { num: 15, topic: "Comparing Global Cultures", amh: "ባህሎችን ማወዳደር", level: 2, LevelName: "Stage 2: Advanced Culture & Critical Thought", geez: "፲፭", desc: "Contrast habits, dietary patterns, and cultural perspectives." },
  { num: 16, topic: "Debate & Critical Argumentation", amh: "ክርክርና እምነት", level: 2, LevelName: "Stage 2: Advanced Culture & Critical Thought", geez: "፲፮", desc: "Construct persuasive logical structures politely." },

  { num: 17, topic: "Job Interviews & Formal Etiquette", amh: "ሥራና ሙያ", level: 3, LevelName: "Stage 3: Professional & Elite Fluency", geez: "፲፯", desc: "Practice high-level interview registers and polite responses." },
  { num: 18, topic: "Entrepreneurship & Business Pitching", amh: "ንግድና ዕቅድ", level: 3, LevelName: "Stage 3: Professional & Elite Fluency", geez: "፲፰", desc: "Promote civic business ventures and market ideas." },
  { num: 19, topic: "Media, News & Critique", amh: "መገናኛና ዜና", level: 3, LevelName: "Stage 3: Professional & Elite Fluency", geez: "፲፱", desc: "Express viewpoints on current news and analyze reports." },
  { num: 20, topic: "Science, Space & Research", amh: "ሳይንስና ምርምር", level: 3, LevelName: "Stage 3: Professional & Elite Fluency", geez: "፳", desc: "Discuss astronomy, nature, and scientific development." },
  { num: 21, topic: "Contemporary Literature & Expression", amh: "ስነ-ጽሑፍና ኪነጥበብ", level: 3, LevelName: "Stage 3: Professional & Elite Fluency", geez: "፳፩", desc: "Express feelings through poetic prose." },
  { num: 22, topic: "Global Citizenship & Representation", amh: "ማንነትና ዓለም", level: 3, LevelName: "Stage 3: Professional & Elite Fluency", geez: "፳፪", desc: "Discuss diaspora heritage representation." },
  { num: 23, topic: "Public Speech & Convincing Speeches", amh: "የንግግር ብቃት", level: 3, LevelName: "Stage 3: Professional & Elite Fluency", geez: "፳፫", desc: "Command public stages with stately rhetoric." },
  { num: 24, topic: "Level 5 Capstone - My Cultural Legacy", amh: "የባህል ውርስና ኩሩ ማንነት", level: 3, LevelName: "Stage 3: Professional & Elite Fluency", geez: "፳፬", desc: "Graduate Level 5 and deliver your final identity declaration." }
];

const lessonsMetaDataGeez = [
  { num: 1, topic: "The ሀ (Ha) Fidel Family", amh: "ሀገር", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፩", desc: "Learn the full ሀ (Ha) family vowels - ሀ ሁ ሂ ሃ ሄ ህ ሆ." },
  { num: 2, topic: "The ለ (Le) Fidel Family", amh: "ልብ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፪", desc: "Learn the full ለ (Le) family vowels - ለ ሉ ሊ ላ ሌ ል ሎ." },
  { num: 3, topic: "The መ (Me) Fidel Family", amh: "ማይ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፫", desc: "Learn the full መ (Me) family vowels - መ ሙ ሚ ማ ሜ ም ሞ." },
  { num: 4, topic: "The ሰ (Se) Fidel Family", amh: "ሰላም", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፬", desc: "Learn the full ሰ (Se) family vowels - ሰ ሱ ሲ ሳ ሴ ስ ሶ." },
  { num: 5, topic: "The ረ (Re) Fidel Family", amh: "ርእስ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፭", desc: "Learn the full ረ (Re) family vowels - ረ ሩ ሪ ራ ሬ ር ሮ." },
  { num: 6, topic: "The ሠ (She) Fidel Family", amh: "ንጉሥ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፮", desc: "Learn the full ሠ (She) family vowels - ሠ ሡ ሢ ሣ ሤ ሥ ሦ." },
  { num: 7, topic: "The ሸ (She) Fidel Family", amh: "ሾላ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፯", desc: "Learn the full ሸ (She) family vowels - ሸ ሹ ሺ ሻ ሼ ሽ ሾ." },
  { num: 8, topic: "The ቀ (Qe) Fidel Family", amh: "ቅዱስ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፰", desc: "Learn the full ቀ (Qe) family vowels - ቀ ቁ ቂ ቃ ቄ ቅ ቆ." },
  { num: 9, topic: "The በ (Be) Fidel Family", amh: "በረከት", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፱", desc: "Learn the full በ (Be) family vowels - በ ቡ ቢ ባ ቤ ብ ቦ." },
  { num: 10, topic: "The ተ (Te) Fidel Family", amh: "ተስፋ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፲", desc: "Learn the full ተ (Te) family vowels - ተ ቱ ቲ ታ ቴ ት ቶ." },
  { num: 11, topic: "The ቸ (Che) Fidel Family", amh: "ምቻ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፲፩", desc: "Learn the full ቸ (Che) family vowels - ቸ ቹ ቺ ቻ ቼ ች ቾ." },
  { num: 12, topic: "The ኀ (Kha) Fidel Family", amh: "ኅብስት", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፲፪", desc: "Learn the full ኀ (Kha) family vowels - ኀ ኁ ኂ ኃ ኄ ኅ ኆ." },
  { num: 13, topic: "The ነ (Ne) Fidel Family", amh: "ነቢይ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፲፫", desc: "Learn the full ነ (Ne) family vowels - ነ ኑ ኒ ና ኔ ን ኖ." },
  { num: 14, topic: "The ኘ (Nye) Fidel Family", amh: "ጋኛ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፲፬", desc: "Learn the full ኘ (Nye) family vowels - ኘ ኙ ኚ ኛ ኜ ኝ ኞ." },
  { num: 15, topic: "The አ (Alp) Fidel Family", amh: "እግዚአብሔር", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፲፭", desc: "Learn the full አ (Alp) family vowels - አ ኡ ኢ ኣ ኤ እ ኦ." },
  { num: 16, topic: "The ከ (Ke) Fidel Family", amh: "ኪዳን", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፲፮", desc: "Learn the full ከ (Ke) family vowels - ከ ኩ ኪ ካ ኬ ክ ኮ." },
  { num: 17, topic: "The ኸ (Kha) Fidel Family", amh: "ኽብረ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፲፯", desc: "Learn the full ኸ (Kha) family vowels - ኸ ኹ ኺ ኻ ኼ ኽ ኾ." },
  { num: 18, topic: "The ወ (We) Fidel Family", amh: "ወርኅ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፲፰", desc: "Learn the full ወ (We) family vowels - ወ ዉ ዊ ዋ ዌ ው ዎ." },
  { num: 19, topic: "The ዐ (Ayn) Fidel Family", amh: "ዓለም", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፲፱", desc: "Learn the full ዐ (Ayn) family vowels - ዐ ዑ ዒ ዓ ዔ ዕ ዖ." },
  { num: 20, topic: "The ዘ (Ze) Fidel Family", amh: "ዜማ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፳", desc: "Learn the full ዘ (Ze) family vowels - ዘ ዙ ዚ ዛ ዜ ዝ ዞ." },
  { num: 21, topic: "The ዠ (Zhe) Fidel Family", amh: "ዋዠረ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፳፩", desc: "Learn the full ዠ (Zhe) family vowels - ዠ ዡ ዢ ዣ ዤ ዥ ዦ." },
  { num: 22, topic: "The የ (Ye) Fidel Family", amh: "ዮም", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፳፪", desc: "Learn the full የ (Ye) family vowels - የ ዩ ዪ ያ ዬ ይ ዮ." },
  { num: 23, topic: "The ደ (De) Fidel Family", amh: "ደብር", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፳፫", desc: "Learn the full ደ (De) family vowels - ደ ዱ ዲ ዳ ዴ ድ ዶ." },
  { num: 24, topic: "The ጀ (Je) Fidel Family", amh: "ጀብሊ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፳፬", desc: "Learn the full ጀ (Je) family vowels - ጀ ጁ ጂ ጃ ጄ ጅ ጆ." },
  { num: 25, topic: "The ገ (Ge) Fidel Family", amh: "ጉባኤ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፳፭", desc: "Learn the full ገ (Ge) family vowels - ገ ጉ ጊ ጋ ጌ ግ ጎ." },
  { num: 26, topic: "The ጠ (T'e) Fidel Family", amh: "ጠቢብ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፳፮", desc: "Learn the full ጠ (T'e) family vowels - ጠ ጡ ጢ ጣ ጤ ጥ ጦ." },
  { num: 27, topic: "The ጨ (Ch'e) Fidel Family", amh: "ማጨ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፳፯", desc: "Learn the full ጨ (Ch'e) family vowels - ጨ ጩ ጪ ጫ ጬ ጭ ጮ." },
  { num: 28, topic: "The ጰ (P'ey) Fidel Family", amh: "ጳጳስ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፳፰", desc: "Learn the full ጰ (P'ey) family vowels - ጰ ጱ ጲ ጳ ጴ ጵ ጶ." },
  { num: 29, topic: "The ጸ (Tsedey) Fidel Family", amh: "ጽላት", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፳፱", desc: "Learn the full ጸ (Tsedey) family vowels - ጸ ጹ ጺ ጻ ጼ ጽ ጾ." },
  { num: 30, topic: "The ፀ (Tsedey Variant) Fidel Family", amh: "ፀሐይ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፴", desc: "Learn the full ፀ (Tsedey Variant) family vowels - ፀ ፁ ጺ ፃ ፄ ፅ ፆ." },
  { num: 31, topic: "The ፈ (Fe) Fidel Family", amh: "ፍሬ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፴፩", desc: "Learn the full ፈ (Fe) family vowels - ፈ ፉ ፊ ፋ ፌ ፍ ፎ." },
  { num: 32, topic: "The ፐ (Pe) Fidel Family", amh: "ፓፒረስ", level: 1, LevelName: "Level 1: Ge'ez Foundations", geez: "፴፪", desc: "Learn the full ፐ (Pe) family vowels - ፐ ፑ ፒ ፓ ፔ ፕ ፖ." }
];

export default function LessonViewer({ isOpen, onClose }: LessonViewerProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<"amharic" | "geez">("amharic");
  const [activeLesson, setActiveLesson] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [activePhraseIdx, setActivePhraseIdx] = useState<number | null>(null);

  // States for dynamic levels and game difficulty configuration
  const [difficulty, setDifficulty] = useState<"level1" | "level2">("level2");
  const [selectedLevelId, setSelectedLevelId] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dynamic curriculum level
  const [curriculumLevel, setCurriculumLevel] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Dynamic view scenes and stage selectors
  const [viewScene, setViewScene] = useState<"home" | "amharic-levels" | "geez-levels" | "lessons" | "session" | "fidel-fundamentals">("home");
  const [geezStage, setGeezStage] = useState<1 | 2>(1);
  const [fidelTab, setFidelTab] = useState<"play" | "git">("play");
  const [fidelIframeKey, setFidelIframeKey] = useState<number>(0);

  // Settings state for dynamic Companion App configurations
  const [settings, setSettings] = useState<any>({
    fidelFundamentalsUrl: "https://brtsegayetad-glitch.github.io/fidel-fundamentals/",
    fidelFundamentalsGit: "https://github.com/brtsegayetad-glitch/fidel-fundamentals"
  });

  useEffect(() => {
    if (isOpen) {
      setViewScene("home");
    }
  }, [isOpen]);

  useEffect(() => {
    const unsub = subscribeToSettings((data) => {
      if (data) {
        setSettings(data);
      }
    });
    return () => unsub();
  }, []);

  // Sound synthesis pronunciation mappings
  const interceptPronunciation = (text: string): string => {
    // Standardize letter transition separators to insert physical pauses
    let preprocessed = text.replace(/\s*-\s*/g, ", ");

    // Pre-mapped lookup values for direct words/sentences/letters
    const wordLetterMap: Record<string, string> = {
      // Complete individual character mappings for lessons 1 to 8
      "ሀ": "hah", "ሁ": "hoo", "ሂ": "hee", "ሃ": "hah", "ሄ": "hay", "ህ": "hih", "ሆ": "hoh",
      "ለ": "leh", "ሉ": "loo", "ሊ": "lee", "ላ": "lah", "ሌ": "lay", "ል": "lih", "ሎ": "loh",
      "መ": "meh", "ሙ": "moo", "ሚ": "mee", "ማ": "mah", "ሜ": "may", "ም": "mih", "ሞ": "moh",
      "ሰ": "seh", "ሱ": "soo", "ሲ": "see", "ሳ": "sah", "ሴ": "say", "ስ": "sih", "ሶ": "soh",
      "ረ": "reh", "ሩ": "roo", "ሪ": "ree", "ራ": "rah", "ሬ": "ray", "ር": "rih", "ሮ": "roh",
      "ሠ": "seh", "ሡ": "soo", "ሢ": "see", "ሣ": "sah", "ሤ": "say", "ሥ": "sih", "ሦ": "soh",
      "ቀ": "qeh", "ቁ": "qoo", "ቂ": "qee", "ቃ": "qah", "ቄ": "qay", "ቅ": "qih", "ቆ": "qoh",
      "በ": "beh", "ቡ": "boo", "ቢ": "bee", "ባ": "bah", "ቤ": "bay", "ብ": "bih", "ቦ": "boh",
      "ተ": "teh", "ቱ": "too", "ቲ": "tee", "ታ": "tah", "ቴ": "tay", "ት": "tih", "ቶ": "toh",
      "ቸ": "cheh", "ቹ": "choo", "ቺ": "chee", "ቻ": "chah", "ቼ": "chay", "ች": "chih", "ቾ": "choh",
      "ኀ": "khah", "ኁ": "khoo", "ኂ": "khee", "ኃ": "khah", "ኄ": "khay", "ኅ": "khih", "ኆ": "khoh",
      "ነ": "neh", "ኑ": "noo", "ኒ": "nee", "ና": "nah", "ኔ": "nay", "ን": "nih", "ኖ": "noh",
      "ኘ": "nyeh", "ኙ": "nyoo", "ኚ": "nyee", "ኛ": "nyah", "ኜ": "nyay", "ኝ": "nyih", "ኞ": "nyoh",
      "አ": "ah", "ኡ": "oo", "ኢ": "ee", "ኣ": "ah", "ኤ": "ay", "እ": "eh", "ኦ": "oh",
      "ከ": "keh", "ኩ": "koo", "ኪ": "kee", "ካ": "kah", "ኬ": "kay", "ክ": "kih", "ኮ": "koh",
      "ኸ": "kheh", "ኹ": "khoo", "ኺ": "khee", "ኻ": "khah", "ኼ": "khay", "ኽ": "khih", "ኾ": "khoh",
      "ወ": "weh", "ዉ": "woo", "ዊ": "wee", "ዋ": "wah", "ዌ": "way", "ው": "wih", "ዎ": "woh",
      "ዐ": "ah", "ዑ": "oo", "ዒ": "ee", "ዓ": "ah", "ዔ": "ay", "ዕ": "eh", "ዖ": "oh",
      "ዘ": "zeh", "ዙ": "zoo", "ዚ": "zee", "ዛ": "zah", "ዜ": "zay", "ዝ": "zih", "ዞ": "zoh",
      "ዠ": "zhe", "ዡ": "zhu", "ዢ": "zhi", "ዣ": "zha", "ዤ": "zhay", "ዥ": "zhih", "ዦ": "zhoh",
      "የ": "yeh", "ዩ": "yoo", "ዪ": "yee", "ያ": "yah", "ዬ": "yay", "ይ": "yih", "ዮ": "yoh",
      "ደ": "deh", "ዱ": "doo", "ዲ": "dee", "ዳ": "dah", "ዴ": "day", "ድ": "dih", "ዶ": "doh",
      "ጀ": "jeh", "ጁ": "joo", "ጂ": "jee", "ጃ": "jah", "ጄ": "jay", "ጅ": "jih", "ጆ": "joh",
      "ገ": "geh", "ጉ": "goo", "ጊ": "gee", "ጋ": "gah", "ጌ": "gay", "ግ": "gih", "ጎ": "goh",
      "ጠ": "teh", "ጡ": "too", "ጢ": "tee", "ጣ": "tah", "ጤ": "tay", "ጥ": "tih", "ጦ": "toh",
      "ጨ": "cheh", "ጩ": "choo", "ጪ": "chee", "ጫ": "chah", "ጬ": "chay", "ጭ": "chih", "ጮ": "choh",
      "ጰ": "peh", "ጱ": "poo", "ጲ": "pee", "ጳ": "pah", "ጴ": "pay", "ጵ": "pih", "ጶ": "poh",
      "ጸ": "tseh", "ጹ": "tsoo", "ጺ": "tsee", "ጻ": "tsah", "ጼ": "tsay", "ጽ": "tsih", "ጾ": "tsoh",
      "ፀ": "tseh", "ፁ": "tsoo", "ፃ": "tsah", "ፄ": "tsay", "ፅ": "tsih", "ፆ": "tsoh",
      "ፈ": "feh", "ፉ": "foo", "ፊ": "fee", "ፋ": "fah", "ፌ": "fay", "ፍ": "fih", "ፎ": "foh",
      "ፐ": "peh", "ፑ": "poo", "ፒ": "pee", "ፓ": "pah", "ፔ": "pay", "ፕ": "pih", "ፖ": "poh",

      // Complete word maps for Lesson 1 to Lesson 8 vocabulary
      "ሀገር": "hah-guhr", "ሀሎ": "hah-loh", "ሆሣዕና": "hoh-sah-nah", "ሀሌሉያ": "hah-lay-loo-yah", "ህያው": "hee-yaw", "ሃይማኖት": "hay-mah-noht",
      "ለመለመ": "leh-meh-leh-meh", "ሊቅ": "leek", "ሌሊት": "lay-leet", "ልብ": "lihb", "ሎቱ": "loh-too", "ላህም": "lah-hihm",
      "ማይ": "mah-y", "መኑ": "meh-noo", "ምድር": "mih-dihr", "ሞት": "moht", "ማኅደር": "mah-deh-r", "ሚካኤል": "mee-kah-ehl",
      "ሰማይ": "seh-mah-y", "ሰላም": "seh-lahm", "ሰይፍ": "sey-f", "ሲኦል": "see-ohl", "ሶስት": "sohs-t", "ሰረገላ": "seh-reh-geh-lah",
      "ርእስ": "reh-ehs", "ረመፅ": "reh-meh-ts", "ርብቃ": "reeb-kah", "ሩቅ": "rook", "ሮማን": "roh-mahn", "ራሔል": "rah-hehl",
      "ንጉሥ": "nuh-goosh", "ምሥዋዕ": "mees-wah-eh", "ሠረቀ": "sheh-reh-keh", "ሥጋ": "shee-gah", "ሣዕር": "shah-uhr", "ሐሠሠ": "hah-sheh-sheh",
      "ቍርባን": "koor-bahn", "ቅዳሴ": "kih-dah-say", "ቃላት": "kah-laht", "ቅዱስ": "kih-doos", "ቆጵሮስ": "kohp-rohs", "ቄደር": "kay-dahr",
      "ባሕር": "bah-hihr", "ብእሲ": "bih-eh-see", "በረከት": "beh-reh-keht", "ቤት": "bayt", "በግዕ": "beh-geh", "ቦታ": "boh-tah",
      "ተንሥአ": "ten-se-ah", "ትእዛዝ": "teh-zhahz", "ታቦት": "tah-boht", "ተስፋ": "tehs-fah", "ትካት": "teh-kaht", "ቶማስ": "toh-mahs",
      "ምቻ": "mih-chah", "ዋቸረ": "wah-cheh-reh", "ቸነፈር": "cheh-neh-fehr", "ችሎታ": "chih-loh-tah", "ኰረንቾ": "kweh-rehn-choh", "ቻና": "chah-nah",
      "ኀበለ": "khah-beh-leh", "ኃይል": "khay-l", "ኀቤሃ": "khah-bay-hah", "ኅብስት": "hih-bihs-t", "ኆኅት": "khoh-hih-t", "ኀጥአ": "khah-tih-ah",
      "ነቢይ": "neh-bee-y", "ንዋይ": "nih-wah-y", "ነሥአ": "neh-seh-ah", "ንሥር": "nih-seh-r", "ኖኅ": "noh-hh", "ናርዶስ": "nahr-dohs",
      "ጋኛ": "gah-nyah", "ኘካ": "nyeh-kah", "ፓኛት": "pah-nyah-t", "ኘኀ": "nyeh-khah", "ዳኛ": "dah-nyah", "ኞኅ": "nyoh-hh",
      "አርዌ": "ahr-way", "አንበሳ": "ahn-behs-sah", "አሜን": "ah-mehn", "እግዚአብሔር": "ehg-zee-ah-bhehr", "ኦሪት": "oh-reet", "ኢየሩሳሌም": "ee-yeh-roo-sah-lehm",
      "ኪዳን": "kee-dahn", "ኮከብ": "koh-kehb", "ክነፍ": "kih-nehf", "ከበበ": "keh-beh-beh", "ካትም": "kah-tihm", "ኩሉ": "koo-loo",
      "ኸደነ": "khah-deh-neh", "ኽብረ": "khih-breh", "ኻልዕ": "khah-lih-eh", "ማኅፈድ": "makh-fehd", "ኺድና": "khee-deh-nah", "ኾረ": "khoh-reh",
      "ወርኅ": "wehr-khih", "ወልድ": "wehl-dih", "ዋዕይ": "wah-ee-y", "ውቅያኖስ": "wih-qih-yah-nohs", "ወይን": "wey-nih", "ዎፌር": "woh-feer",
      "ዓለም": "ah-lehm", "ዐሥርቱ": "ah-sihr-too", "ዕንቁ": "ihn-qoo", "ዐይነ": "ay-neh", "ዑደት": "oo-deht", "ዖፍ": "ohf",
      "ዘመነ": "zeh-meh-neh", "ዜማ": "zee-mah", "ዝንቱ": "zihn-too", "ዛቲ": "zah-tee", "ዘርዕ": "zehr-eh", "ዞረ": "zoh-reh",
      "ዋዠረ": "wa-zhe-re", "ዠንየ": "zhe-nye", "ገዠረ": "ge-zhe-re", "ዠመረ": "zhe-me-re", "ታዠ": "ta-zhe", "ዠለፈ": "zhe-le-fe",
      "ዮም": "yom", "ያሬድ": "ya-red", "የማን": "ye-man", "ይሁዳ": "ye-hoo-da", "ማርያም": "mar-yam", "ዮርዳኖስ": "yor-da-nos",
      "ደም": "dem", "ደብር": "deb-re", "ዳዊት": "da-weet", "ዲያቆን": "deeya-qon", "ደናግል": "de-na-gel", "ዶርሆ": "dor-ho",
      "ጀብሊ": "jeb-lee", "ዋጀ": "wa-je", "ማጀር": "ma-jer", "ፈጀ": "fe-je", "ጀርጋ": "jer-ga", "ጆር": "jor",
      "ገብዝ": "geb-ez", "ገመድ": "gemed", "ጋሻ": "gasha", "ግብር": "gebre", "ጉባኤ": "gubae", "ጎልጎታ": "golgota",
      "ጠቢብ": "tebeeb", "ጥላይ": "telay", "ጣዖት": "taot", "ጥዒና": "tiina", "ጡዋፍ": "tooaf", "ጦማር": "tomar",
      "ጨረ": "chere", "ማጨ": "mache", "ጭፍሪክ": "chifrik", "ጫሕመ": "chahme", "ጨለተ": "chelete", "ጮረ": "chore",
      "ጳጳስ": "papas", "ፓትርያርክ": "parent-patriarch", "ጴጥሮስ": "peetros", "ጰንጠቆስጤ": "penteqoste", "ጲላጦስ": "peelatos", "ጵርስቅላ": "perseqila",
      "ጸለምተ": "tselimte", "ጸዋዕ": "tsewa", "ጻድቅ": "tsadq", "ጽላት": "tsilat", "ጸሎት": "tselot", "ጾም": "tsom",
      "ፀሐይ": "tsehay", "ፃማ": "tsama", "ፅላት": "tsilat", "ፀሩ": "tseroo", "ፄዋ": "tshiewa", "ፆታ": "tsota",
      "ፈሊጥ": "feleet", "ፍሬ": "fre", "ፋሲካ": "fasika", "ፈጠረ": "fetere", "ፊልጶስ": "filpos", "ፎቅ": "foq",
      "ጳውሎስ": "pawlos", "ኤፍራት": "ephrat", "ፖሊስ": "polees", "ፓፒረስ": "papyrus", "ፕላኔት": "planiet"
    };

    // Replace known Amharic text sequences with their easy-to-pronounce phonetic keys
    for (const [key, val] of Object.entries(wordLetterMap)) {
      preprocessed = preprocessed.replace(new RegExp(key, "g"), val);
    }

    return preprocessed.split(/(\s+)/).map(word => {
      if (/^\s+$/.test(word)) return word;
      const match = word.match(/^([^a-zA-Z-']*)([a-zA-Z-']*)([^a-zA-Z-']*)$/);
      if (!match) return word;
      const leadingPunct = match[1];
      let coreWord = match[2];
      const trailingPunct = match[3];
      if (!coreWord) return word;

      let modified = coreWord;
      const lowerCore = coreWord.toLowerCase();

      // Optimize Amharic/Ge'ez phonetics for generic English Speech engines
      if (lowerCore === "selam") modified = "seh-laam";
      else if (lowerCore === "tena") modified = "tay-nah";
      else if (lowerCore === "yistilign") modified = "yees-tih-leegn";
      else if (lowerCore === "endemin") modified = "ehn-deh-mihn";
      else if (lowerCore === "aderk") modified = "ah-dehrk";
      else if (lowerCore === "adersh") modified = "ah-dehrsh";
      else if (lowerCore === "walek") modified = "wah-lehk";
      else if (lowerCore === "walesh") modified = "wah-lehsh";
      else if (lowerCore === "metah") modified = "meh-tah";
      else if (lowerCore === "metash") modified = "meh-tash";
      else if (lowerCore === "hun") modified = "hoon";
      else if (lowerCore === "hugni") modified = "hoogn-ee";
      else if (lowerCore === "egziabher") modified = "ehg-zee-ah-bhee-ehr";
      else if (lowerCore === "yimesgen") modified = "yee-mehs-gehn";
      else if (lowerCore === "ahadu") modified = "ah-ha-doo";
      else if (lowerCore === "kil'etu") modified = "kihl-eh-too";
      else if (lowerCore === "selastu") modified = "seh-lahs-too";
      else if (lowerCore === "arba'etu") modified = "ahr-bah-eh-too";
      else if (lowerCore === "hamestu") modified = "hah-mehs-too";

      // Vowel family letter-specific overrides (for lower case representation triggers)
      else if (lowerCore === "le") modified = "leh";
      else if (lowerCore === "lu") modified = "loo";
      else if (lowerCore === "li") modified = "lee"; // ሊ is lee
      else if (lowerCore === "la") modified = "lah"; // ለ/ላ is lah/leh
      else if (lowerCore === "laa") modified = "lah";
      else if (lowerCore === "lee") modified = "lay";
      else if (lowerCore === "l") modified = "lih"; // ል is lih
      else if (lowerCore === "lo") modified = "loh";
      else if (lowerCore === "lie") modified = "lay"; // ሌ standard

      else if (lowerCore === "me") modified = "meh";
      else if (lowerCore === "mu") modified = "moo";
      else if (lowerCore === "mi") modified = "mee";
      else if (lowerCore === "ma") modified = "mah";
      else if (lowerCore === "maa") modified = "mah";
      else if (lowerCore === "mee") modified = "may";
      else if (lowerCore === "m") modified = "mih"; // ም is mih
      else if (lowerCore === "mo") modified = "moh";

      else if (lowerCore === "se") modified = "seh";
      else if (lowerCore === "su") modified = "soo";
      else if (lowerCore === "si") modified = "see";
      else if (lowerCore === "sa") modified = "sah";
      else if (lowerCore === "saa") modified = "sah";
      else if (lowerCore === "see") modified = "say";
      else if (lowerCore === "s") modified = "sih"; // ስ is sih
      else if (lowerCore === "so") modified = "soh";

      else if (lowerCore === "ha") modified = "hah";
      else if (lowerCore === "hu") modified = "hoo";
      else if (lowerCore === "hi") modified = "hee";
      else if (lowerCore === "haa") modified = "hah";
      else if (lowerCore === "hee") modified = "hay";
      else if (lowerCore === "h") modified = "hih"; // ህ is hih
      else if (lowerCore === "ho") modified = "hoh";
      else if (lowerCore === "hie") modified = "hee"; // ሂ is hee
      else if (lowerCore === "hei") modified = "hih"; // ህ is hih

      return leadingPunct + modified + trailingPunct;
    }).join("");
  };

  const fallbackSpeakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const phoneticText = interceptPronunciation(text);
      const utterance = new SpeechSynthesisUtterance(phoneticText);
      utterance.rate = 0.8; // Friendly pacing
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    const activeChar = text.trim();
    const isEthiopicCharacter = /^[\u1200-\u137F]$/.test(activeChar);

    if (isEthiopicCharacter) {
      const letterAudioFilenameMap: Record<string, string> = {
        "ለ": "le", "ሉ": "lu", "ሊ": "li", "ላ": "la", "ሌ": "lie", "ል": "l", "ሎ": "lo",
        "ሀ": "ha", "ሁ": "hu", "ሂ": "hi", "ሃ": "haa", "ሄ": "hee", "ህ": "hei", "ሆ": "ho",
        "መ": "me", "ሙ": "mu", "ሚ": "mi", "ማ": "maa", "ሜ": "mee", "ም": "m", "ሞ": "mo",
        "ሰ": "se", "ሱ": "su", "ሲ": "si", "ሳ": "saa", "ሴ": "see", "ስ": "s", "ሶ": "so",
        "ረ": "re", "ሩ": "ru", "ሪ": "ri", "ራ": "ra", "ሬ": "rie", "ር": "r", "ሮ": "ro",
        "ሠ": "se", "ሡ": "su", "ሢ": "si", "ሣ": "sa", "ሤ": "sie", "ሥ": "s", "ሦ": "so",
        "ቀ": "qe", "ቁ": "qu", "ቂ": "qi", "ቃ": "qa", "ቄ": "qie", "ቅ": "q", "ቆ": "qo",
        "በ": "be", "ቡ": "bu", "ቢ": "bi", "ባ": "ba", "ቤ": "bie", "ብ": "b", "ቦ": "bo"
      };

      const phoneticName = letterAudioFilenameMap[activeChar];
      const extraFallbacks: Record<string, string[]> = {
        "ል": ["l", "li-sixth", "li"],
        "ህ": ["h", "hih", "hei"],
        "ም": ["m", "mih", "mm"],
        "ስ": ["s", "sih"],
        "ር": ["r", "rih", "r-sixth"],
        "ሥ": ["s", "sih", "s-sixth", "sh", "shih", "sh-sixth"],
        "ሠ": ["she"],
        "ሡ": ["shu"],
        "ሢ": ["shi"],
        "ሣ": ["sha"],
        "ሤ": ["shie"],
        "ሦ": ["sho"],
        "ቅ": ["q", "qih", "q-sixth"],
        "ብ": ["b", "bih", "b-sixth"]
      };

      const fallbacks = extraFallbacks[activeChar] || [];

      const candidatePaths = [
        `/audio/geez/${activeChar}.mp3`,
        phoneticName ? `/audio/geez/${phoneticName}.mp3` : null,
        ...fallbacks.map(f => `/audio/geez/${f}.mp3`),
        `/audio/geez/${activeChar}.wav`,
        phoneticName ? `/audio/geez/${phoneticName}.wav` : null,
        ...fallbacks.map(f => `/audio/geez/${f}.wav`)
      ].filter(Boolean) as string[];

      let attemptIndex = 0;

      const tryPlayNext = () => {
        if (attemptIndex >= candidatePaths.length) {
          fallbackSpeakText(text);
          return;
        }

        const currentPath = candidatePaths[attemptIndex];
        attemptIndex++;

        const audio = new Audio(currentPath);

        audio.oncanplaythrough = () => {
          audio.play().catch((err) => {
            console.warn(`Could not play custom audio path: ${currentPath}:`, err);
            tryPlayNext();
          });
        };

        audio.onerror = () => {
          tryPlayNext();
        };

        audio.load();
      };

      tryPlayNext();
      return;
    }

    fallbackSpeakText(text);
  };

  if (!isOpen) return null;

  const activeLessonsMetaData = selectedLanguage === "geez"
    ? lessonsMetaDataGeez
    : curriculumLevel === 1
    ? lessonsMetaDataLevel1
    : curriculumLevel === 2
    ? lessonsMetaDataLevel2
    : curriculumLevel === 3
    ? lessonsMetaDataLevel3
    : curriculumLevel === 4
    ? lessonsMetaDataLevel4
    : lessonsMetaDataLevel5;

  const allFilteredSlides = slides.filter((s) => {
    const slideLang = (s as any).language || "amharic";
    return slideLang === selectedLanguage;
  });

  const lessons = Array.from(new Set(allFilteredSlides.filter((s) => s.level === curriculumLevel).map((s) => s.lessonNumber))).sort((a, b) => a - b);
  const filteredSlides = allFilteredSlides.filter((s) => s.level === (selectedLanguage === "geez" ? 1 : curriculumLevel) && s.lessonNumber === activeLesson);
  const activeSlide: LessonSlide = filteredSlides[currentIndex] || filteredSlides[0];

  const progressPercent = filteredSlides.length > 0 ? ((currentIndex + 1) / filteredSlides.length) * 100 : 0;

  // Derive title metadata details dynamically
  const currentDef = activeLessonsMetaData.find(l => l.num === activeLesson) || activeLessonsMetaData[0];
  const lessonTitleStr = currentDef ? `${currentDef.amh} (${currentDef.topic}) — ምዕራፍ ${currentDef.geez}` : "Amharic Core Lesson";
  const lessonThemeStr = currentDef ? `${currentDef.amh} • ${selectedLanguage === "geez" ? "Ancient Numeral Heritage" : "Heritage Curriculum"}` : "Open Abyssinia Library";

  const handleLessonChange = (newLesson: number) => {
    setActiveLesson(newLesson);
    setCurrentIndex(0);
    setSelectedLetter(null);
    setActivePhraseIdx(null);
  };

  const handleNext = () => {
    setSelectedLetter(null);
    setActivePhraseIdx(null);
    if (currentIndex < filteredSlides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setSelectedLetter(null);
    setActivePhraseIdx(null);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedLetter(null);
    setActivePhraseIdx(null);
  };

  const displayedLessonsList = selectedLanguage === "geez"
    ? (geezStage === 1 ? lessonsMetaDataGeez.filter(l => l.num <= 16) : lessonsMetaDataGeez.filter(l => l.num >= 17))
    : activeLessonsMetaData;

  return (
    <div id="lesson-viewer-modal" className="fixed inset-0 z-50 overflow-hidden bg-slate-900/85 backdrop-blur-md flex items-center justify-center p-2 md:p-6 font-sans">
      
      <div className="bg-white w-full max-w-7xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col h-[94vh] relative border-4 border-indigo-200 text-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* ================= HEADER BAR ================= */}
        {viewScene !== "session" ? (
          // General Welcome / Catalog Header
          <div className="bg-slate-50 border-b border-slate-150 px-6 py-4 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3 text-left">
              <span className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-md shadow-indigo-100 shrink-0">
                <Sparkles size={20} className="animate-pulse" />
              </span>
              <div>
                <h2 className="text-base md:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  Open Abyssinia Library <span className="text-indigo-600 text-xs font-black bg-indigo-50 border border-indigo-150 rounded-lg px-2 py-0.5">የቋንቋ መዝገብ</span>
                </h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest hidden sm:block">
                  HabKids • East African Dialect Repository
                </p>
              </div>
            </div>

            {/* Quick Hub Switcher */}
            <div className="hidden md:flex bg-slate-100 border p-1 rounded-2xl items-center gap-1 shrink-0">
              <button
                id="btn-header-amharic"
                onClick={() => {
                  setSelectedLanguage("amharic");
                  setViewScene("home");
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition duration-150 cursor-pointer ${
                  selectedLanguage === "amharic" && viewScene !== "geez-levels"
                    ? "bg-indigo-650 text-white shadow-sm"
                    : "text-slate-650 hover:bg-slate-200 text-slate-700"
                }`}
              >
                🇪🇹 Amharic Suite
              </button>
              <button
                id="btn-header-geez"
                onClick={() => {
                  setSelectedLanguage("geez");
                  setViewScene("geez-levels");
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition duration-150 cursor-pointer flex items-center gap-1.5 ${
                  selectedLanguage === "geez" && viewScene === "geez-levels"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-slate-650 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <span>📜 Ge'ez Hub</span>
                <span className="bg-amber-200 text-amber-950 font-black px-1.5 py-0.5 rounded text-[8px] tracking-normal animate-pulse">New</span>
              </button>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 text-slate-450 hover:text-slate-800 rounded-full transition-colors duration-155 cursor-pointer shrink-0 border border-slate-200 shadow-sm bg-white"
              title="Close Library Portal"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          // Clean Active Lesson Session Header
          <div className="bg-slate-50 border-b border-slate-150 px-4 py-3 md:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-left min-w-0">
              <button
                onClick={() => setViewScene("lessons")}
                className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 px-3.5 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-97 shrink-0"
              >
                <ArrowLeft size={14} className="text-indigo-600" />
                <span>Back to Catalog</span>
              </button>

              <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

              <span className="p-2 bg-indigo-100 rounded-xl text-indigo-700 hidden sm:inline-flex shrink-0">
                <Sparkles size={16} className="animate-spin duration-3000" />
              </span>
              <div className="min-w-0">
                <h2 className="text-sm md:text-base font-black text-slate-900 tracking-tight truncate">
                  {lessonTitleStr}
                </h2>
                <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider truncate">
                  Slide {currentIndex + 1} of {filteredSlides.length} • {lessonThemeStr}
                </p>
              </div>
            </div>

            {/* Core Controls */}
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
              <div className="bg-indigo-50 border border-indigo-100 text-indigo-800 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <span>{selectedLanguage === "geez" ? "📜 Ge'ez Master" : `🧸 Level ${curriculumLevel}`}</span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 hover:bg-slate-200 text-slate-450 hover:text-slate-800 rounded-full transition-colors duration-155 cursor-pointer shrink-0"
                title="Close Lesson Session"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Active Lesson Progress slider tracking indicator (Visible only inside active sessions) */}
        {viewScene === "session" && (
          <div className="h-2 bg-slate-150 w-full relative shrink-0">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-300" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* ================= BODY CONTENT PORTAL ================= */}
        <div className="flex-1 overflow-hidden min-h-0 relative bg-slate-50 flex flex-col">
          <AnimatePresence mode="wait">
            {viewScene === "home" && (
              <motion.div
                key="scene-home"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center justify-start text-center max-w-5xl mx-auto w-full space-y-8"
              >
                {/* Brand Welcome Banner */}
                <div className="space-y-4">
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-150 rounded-full text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm">
                    ✨ HabKids • Portfolio Portal
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                    Open Abyssinia Library <span className="block text-xl md:text-3xl text-indigo-600 font-serif font-bold mt-2">የአቢሲኒያ ቤተ-መጻሕፍት</span>
                  </h1>
                  <p className="text-slate-500 max-w-3xl text-sm md:text-base leading-relaxed font-medium">
                    Discover the vibrant language and numeral history of East Africa! Our heritage repository brings diaspora children closest to their ancestral roots through beautifully illustrated calling cards, responsive phonetic voice keys, and exciting interactive exercises.
                  </p>
                </div>

                {/* Main Three Columns of Paths */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pt-4">
                  {/* Amharic Selection Card */}
                  <div className="bg-gradient-to-br from-indigo-50/70 to-violet-50/70 border-2 border-indigo-100 rounded-[28px] p-6 text-left flex flex-col justify-between hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50 duration-200 transition-all group">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-4xl">🇪🇹</span>
                        <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-xl">
                          Standard Conversational
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl md:text-2xl font-bold text-indigo-950 font-sans">
                          Amharic Language (አማርኛ)
                        </h3>
                        <p className="text-slate-550 text-xs font-bold font-serif">
                          120 Interactive Slide Lessons • 5 Skill Levels
                        </p>
                      </div>
                      <p className="text-slate-650 text-xs leading-relaxed font-semibold font-sans">
                        Step-by-step master class for beginner children. Covers speech greetings, introduction conversations, food cultures, hobbies, traditional holidays, and advanced historic debates.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedLanguage("amharic");
                        setViewScene("amharic-levels");
                      }}
                      className="mt-6 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 group-hover:scale-102 duration-150 transition-all text-white font-black text-xs uppercase tracking-widest rounded-2xl cursor-pointer shadow-md shadow-indigo-200 flex items-center justify-center gap-2 animate:pulse"
                    >
                      <span>Explore Amharic Levels</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Ge'ez Selection Card (Ge'ez Hub) */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300 rounded-[28px] p-6 text-left flex flex-col justify-between hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-100 duration-200 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-600 text-white font-black text-[9px] uppercase tracking-widest px-3.5 py-1 rounded-bl-xl shadow-sm">
                      🌟 Hub Access
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-4xl animate-bounce">📜</span>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-xl">
                          Classical Antiquity
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl md:text-2xl font-black text-amber-955 font-serif">
                          Ge'ez Hub (ግዕዝ Hub)
                        </h3>
                        <p className="text-slate-500 text-xs font-bold font-serif">
                          32 Alphabetic Chapters • Quizzes • Live Features
                        </p>
                      </div>
                      <p className="text-slate-650 text-xs leading-relaxed font-semibold">
                        Master the structural roots of Ethiopic calligraphy. Under one single hub: explore 32 original Merafs, level-by-level adaptive quizzes, grammar handbooks, and our rich Ge'ez word dictionary!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedLanguage("geez");
                        setViewScene("geez-levels");
                      }}
                      className="mt-6 w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-650 hover:from-amber-600 hover:to-orange-755 group-hover:scale-102 duration-150 transition-all text-white font-black text-xs uppercase tracking-widest rounded-2xl cursor-pointer shadow-md shadow-amber-200 flex items-center justify-center gap-2"
                    >
                      <span>Open Ge'ez Hub 🚀</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Fidel Fundamentals Selection Card */}
                  <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/70 border-2 border-emerald-100 rounded-[28px] p-6 text-left flex flex-col justify-between hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-50 duration-200 transition-all group" id="card-fidel-fundamentals-launcher">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-4xl">🎮</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-xl">
                          Smart Companion App
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl md:text-2xl font-bold text-emerald-950 font-sans">
                          Fidel Fundamentals (ፊደል)
                        </h3>
                        <p className="text-slate-500 text-xs font-bold font-serif">
                          Interactive Playground & Git Sandbox
                        </p>
                      </div>
                      <p className="text-slate-650 text-xs leading-relaxed font-semibold">
                        Access your custom-built alphabetic game companion! Play live inside the sandbox environment, verify vowel tracing, challenge sound-bubble matchers, or view your source repository.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setViewScene("fidel-fundamentals");
                      }}
                      className="mt-6 w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 group-hover:scale-102 duration-150 transition-all text-white font-black text-xs uppercase tracking-widest rounded-2xl cursor-pointer shadow-md shadow-emerald-250 flex items-center justify-center gap-2"
                    >
                      <span>Open Companion Hub</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Trust Footer line */}
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest pt-4">
                  Developed with kids in mind • Secure Offline Sandbox Learning Environment
                </p>
              </motion.div>
            )}

            {viewScene === "fidel-fundamentals" && (
              <motion.div
                key="scene-fidel-fundamentals"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-1 overflow-hidden p-3 md:p-4 w-full h-full flex flex-col justify-start text-left space-y-3"
              >
                {/* LOW PROFILE SUPER-COMPACT BAR */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 border border-slate-200/80 rounded-2xl shrink-0 shadow-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewScene("home")}
                      className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 border border-slate-200/60 hover:border-slate-300 text-slate-705 hover:text-slate-900 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer active:scale-97 transition-all shrink-0"
                    >
                      <ArrowLeft size={13} />
                      <span>Back</span>
                    </button>
                    <div className="h-4 w-px bg-slate-200" />
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-base select-none">🎮</span>
                      <h1 className="text-xs md:text-sm font-black text-slate-900 tracking-tight truncate">
                        Fidel Fundamentals (ፊደል መሰረታዊያን)
                      </h1>
                      <span className="hidden md:inline-flex bg-emerald-100/90 text-emerald-800 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                        Companion Sandbox
                      </span>
                    </div>
                  </div>

                  {/* Navigation Tabs and Controls */}
                  <div className="flex items-center gap-3">
                    {/* View/Play toggles */}
                    <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 gap-0.5 text-[10px] font-black uppercase tracking-widest shrink-0">
                      <button
                        onClick={() => setFidelTab("play")}
                        className={`py-1 px-3.5 rounded-md cursor-pointer transition-all ${
                          fidelTab === "play"
                            ? "bg-white text-emerald-700 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Play Screen
                      </button>
                      <button
                        onClick={() => setFidelTab("git")}
                        className={`py-1 px-3.5 rounded-md cursor-pointer transition-all ${
                          fidelTab === "git"
                            ? "bg-white text-emerald-700 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Source/Code Setup
                      </button>
                    </div>

                    <div className="h-4 w-px bg-slate-200 hidden sm:block" />

                    {/* Dynamic Action Buttons */}
                    {settings.fidelFundamentalsUrl && (
                      <a
                        href={settings.fidelFundamentalsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] uppercase font-black tracking-widest flex items-center gap-1 transition-all cursor-pointer shadow-xs whitespace-nowrap"
                      >
                        <ExternalLink size={10} />
                        <span className="hidden md:inline">Open Full Screen</span>
                        <span className="md:hidden">Launch</span>
                      </a>
                    )}

                    <button
                      onClick={() => setFidelIframeKey((k) => k + 1)}
                      className="p-1 px-2.5 text-slate-500 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-all shrink-0"
                      title="Reset/Reload Game Sandbox"
                    >
                      <RefreshCw size={10} />
                      <span>Reload</span>
                    </button>
                  </div>
                </div>

                {/* Sub-view Content panels */}
                <div className="w-full flex-1 min-h-0">
                  {fidelTab === "play" ? (
                    /* 100% IMMERSIVE ZERO-SCROLL IFRAME CONTAINER */
                    <div className="w-full h-full bg-slate-900 overflow-hidden relative rounded-[24px] border border-slate-200/80 shadow-md">
                      <iframe
                        key={fidelIframeKey}
                        src={settings.fidelFundamentalsUrl || "https://brtsegayetad-glitch.github.io/fidel-fundamentals/"}
                        className="w-full h-full border-0 absolute inset-0"
                        title="Fidel Fundamentals"
                        referrerPolicy="no-referrer"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full overflow-y-auto space-y-6 pr-1 pb-4">
                      
                      {/* Troubleshooting Section for GitHub Pages & Blank Screens */}
                      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2.5 text-amber-900">
                          <span className="text-xl">⚙️</span>
                          <h4 className="font-sans font-bold text-sm">
                            Vite & GitHub Pages Blank Screen Guide
                          </h4>
                        </div>
                        <p className="text-slate-700 text-xs leading-relaxed font-sans max-w-4xl font-medium">
                          Great! Your GitHub Pages is now live, but it is displaying a <strong>blank white screen</strong>. This is because GitHub is serving the raw source code (like <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-600 font-mono text-[10px]">/src/main.tsx</code>) instead of the compiled production-ready website assets from the <code className="bg-slate-100 px-1 py-0.5 border rounded text-slate-800 font-mono text-[10px]">dist/</code> folder.
                        </p>
                        
                        <div className="bg-white border border-amber-100 p-5 rounded-xl space-y-3 shadow-xs">
                          <p className="text-slate-800 text-xs font-bold font-sans flex items-center gap-1.5">
                            <span className="bg-amber-100 text-amber-800 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wide">
                              STEP-BY-STEP FIX: BUILD & PUBLISH YOUR CODE
                            </span>
                          </p>
                          <p className="text-slate-650 text-[11.5px] leading-relaxed">
                            To convert and compile your code so browsers can run it, run these simple terminal commands inside your local <strong>fidel-fundamentals</strong> project directory:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            {/* Substep 1 */}
                            <div className="space-y-1.5">
                              <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 block">1. Configure base path in vite.config.ts</span>
                              <p className="text-slate-500 text-[11px] leading-relaxed">
                                Open <code className="bg-slate-50 border px-1 rounded text-slate-700 font-mono text-[10px]">vite.config.ts</code> in your code editor and add the <code className="text-rose-600 font-mono text-[10px] font-bold">base</code> property corresponding exactly to your GitHub repository name:
                              </p>
                              <code className="block bg-slate-900 text-pink-300 p-2.5 rounded text-[10px] font-mono leading-relaxed select-all">
                                export default defineConfig(&#123;<br />
                                &nbsp;&nbsp;base: "/fidel-fundamentals/",<br />
                                &nbsp;&nbsp;// other config props...<br />
                                &#125;)
                              </code>
                            </div>

                            {/* Substep 2 */}
                            <div className="space-y-1.5">
                              <span className="text-[10px] uppercase tracking-wider font-bold text-rose-500 block">2. Add deploy script & deploy!</span>
                              <p className="text-slate-500 text-[11px] leading-relaxed">
                                Run these terminal commands to automatically deploy the compiled folder:
                              </p>
                              <code className="block bg-slate-900 text-teal-300 p-2 text-[10px] font-mono leading-relaxed space-y-1">
                                <span className="text-slate-400"># Install the github deployment package:</span>
                                <div>npm install gh-pages --save-dev</div>
                              </code>
                              <p className="text-slate-500 text-[11px] leading-relaxed">
                                Under your <code className="bg-slate-550/10 border px-1 rounded text-slate-700 font-mono text-[10px]">package.json</code>'s "scripts" block, add the deploy action:
                              </p>
                              <code className="block bg-slate-900 text-amber-300 p-1.5 rounded text-[10px] font-mono select-all">
                                "deploy": "gh-pages -d dist"
                              </code>
                              <p className="text-slate-500 text-[11px] leading-relaxed">
                                Now, compile and push live to your branch in one simple go:
                              </p>
                              <code className="block bg-slate-900 text-white p-2.5 rounded text-[10px] font-mono">
                                npm run build && npm run deploy
                              </code>
                              <div className="mt-3 bg-amber-100/50 border border-amber-200/50 p-2.5 rounded-lg space-y-1">
                                <p className="text-amber-950 text-[11px] font-bold">
                                  💡 Stalled with "Failed to get remote.origin.url"?
                                </p>
                                <p className="text-slate-650 text-[10.5px] leading-relaxed">
                                  Your local Git folder's remote connection is not linked to GitHub yet. Run this direct bypass command in your terminal to publish immediately:
                                </p>
                                <code className="block bg-slate-900 text-cyan-300 p-2 rounded text-[10px] font-mono select-all leading-normal whitespace-pre-wrap break-all border border-slate-800">
                                  npx gh-pages -d dist -r https://github.com/brtsegayetad-glitch/fidel-fundamentals.git
                                </code>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Private Repo Info (Alternative collapsed alert) */}
                        <div className="border border-slate-200/60 bg-slate-50 p-4 rounded-xl space-y-2">
                          <p className="text-xs font-bold text-slate-900 font-sans flex items-center gap-1.5">
                            <span>🔒 Private Repo check warning:</span>
                          </p>
                          <p className="text-slate-600 text-[11px] leading-relaxed">
                            For free GitHub accounts, the "Deploy from branch" option is only visible if visibility is set to <strong>Public</strong> under the Danger Zone in repository Settings. Alternatively, you can easily host this directory on <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-indigo-600 underline font-bold">Vercel.com</a> or <a href="https://netlify.com" target="_blank" rel="noreferrer" className="text-indigo-600 underline font-bold">Netlify.com</a> completely for free with high-speed private repository permissions!
                          </p>
                        </div>

                        <div className="text-[11px] text-amber-900 font-bold border-t border-amber-200/50 pt-3 flex flex-wrap items-center gap-1.5">
                          <span>💡 Need to change the deployed URL in this platform?</span>
                          <span className="text-slate-500 font-semibold">You can update the Deployed Application URL inside Admin Settings &gt; System Settings at any time.</span>
                        </div>
                      </div>
                      
                      <div className="bg-emerald-50 border border-emerald-150 rounded-2xl p-4 flex items-start gap-3">
                        <Info className="text-emerald-600 shrink-0 mt-0.5" size={16} />
                        <div className="space-y-1">
                          <p className="text-xs text-emerald-950 font-bold font-sans">
                            Interactive Sandbox Location
                          </p>
                          <p className="text-[10px] text-emerald-800 font-medium leading-relaxed font-sans">
                            This panel displays your live, custom-configured **Fidel Fundamentals** application directly! If you make updates to your export branch on GitHub and deploy them, you'll see the gameplay reflect here instantly. To edit the URL, go to the <strong>Admin Dashboard &gt; System Settings &gt; Companion App Options</strong>.
                          </p>
                        </div>
                      </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Steps Panel Left */}
                      <div className="md:col-span-2 space-y-6">
                        {/* Step 1 */}
                        <div className="bg-white border border-slate-150 rounded-2xl p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 bg-indigo-50 text-indigo-700 flex items-center justify-center rounded-xl font-black text-xs font-mono border border-indigo-150">
                              01
                            </span>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                              Prepare the Export & Clone Repos
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                            Download the code of your exported AI Studio app using the git command or by extracting the exported .ZIP archive file.
                          </p>
                          <div className="bg-slate-900 text-slate-200 font-mono text-[10px] p-4 rounded-xl space-y-1 select-all relative group shadow-inner">
                            <span className="text-teal-400"># Clone your Fidel Fundamentals repository files</span>
                            <div className="text-slate-100 block">git clone {settings.fidelFundamentalsGit || "https://github.com/your-username/fidel-fundamentals.git"}</div>
                            <div className="text-slate-100 block">cd fidel-fundamentals</div>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white border border-slate-150 rounded-2xl p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 bg-indigo-50 text-indigo-700 flex items-center justify-center rounded-xl font-black text-xs font-mono border border-indigo-150">
                              02
                            </span>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                              Relocate Components & Layout Sheets
                            </h3>
                          </div>
                          <div className="space-y-2 text-xs text-slate-500 font-semibold leading-relaxed">
                            <p>
                              Copy your interactive game engines (such as your canvas renderers, shape matches, or phonetic blender cards) into this project:
                            </p>
                            <ul className="list-disc list-inside space-y-1.5 pl-2 text-indigo-950 font-sans">
                              <li>Copy game files into <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold">/src/components/fidel/</code> folder structure.</li>
                              <li>Copy images or sound dictionaries into <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold">/src/data/fidel/</code> directories.</li>
                            </ul>
                          </div>
                          <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 font-mono text-[10px] text-slate-700 space-y-1 select-none">
                            <div className="text-slate-400 font-bold">📂 Suggested Folder Hierarchy:</div>
                            <div>├── src/</div>
                            <div>│   ├── components/</div>
                            <div className="text-emerald-700 font-medium">│   │   ├── fidel/           &lt;-- Place Game Engines here</div>
                            <div className="text-emerald-700 font-medium">│   │   │   ├── VowelTracingCanvas.tsx</div>
                            <div className="text-emerald-700 font-medium">│   │   │   └── SoundBubbleMatcher.tsx</div>
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white border border-slate-150 rounded-2xl p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 bg-indigo-50 text-indigo-700 flex items-center justify-center rounded-xl font-black text-xs font-mono border border-indigo-150">
                              03
                            </span>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                              Declare Local State & Firebase Persistence
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                            You can save student progress directly so parents can view metrics in real-time. Use the provided Firestore wrapper <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-pink-650">saveStudentProgress()</code> to upload final high scores!
                          </p>
                          <div className="bg-slate-900 text-slate-200 font-mono text-[10px] p-4 rounded-xl space-y-2 select-all shadow-inner">
                            <div className="text-slate-400">// Sample function to sync stats in your dynamic component</div>
                            <div className="text-indigo-300">import {`{ saveStudentProgress }`} from '../services/dataService';</div>
                            <div>
                              <span className="text-pink-400">const</span> handleLevelComplete = <span className="text-indigo-300">async</span> (score: number) =&gt; {` {`}
                              <div className="pl-4 text-slate-350">
                                <span className="text-pink-400">await</span> saveStudentProgress(studentId, {`{`}
                                <div className="pl-4">
                                  lessonCompleted: <span className="text-amber-300">"Fidel Foundations Level"</span>,
                                  gameScore: score,
                                  fidelProgress: <span className="text-indigo-300">100</span>,
                                  timestamp: <span className="text-indigo-300">new Date()</span>
                                </div>
                                {`});`}
                              </div>
                              {`};`}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Info Cards Sidebar Right */}
                      <div className="space-y-6">
                        <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl border border-slate-950 space-y-4">
                          <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-800 pb-3">
                            <Database size={14} className="text-emerald-400" />
                            <span>Database State Schema</span>
                          </h4>
                          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                            All interactive game variables, tutor notes, and classroom schedules sync instantly to your enterprise Firestore cluster configured inside AI Studio.
                          </p>
                          <div className="rounded-xl bg-slate-950 p-3 border border-slate-850 font-mono text-[9px] text-teal-400 space-y-1 select-none">
                            <div>collection: 'settings' / 'global'</div>
                            <div>{'  {'}</div>
                            <div className="text-slate-400">{"    academyName: string,"}</div>
                            <div className="text-slate-400">{"    facebookUrl: string,"}</div>
                            <div className="text-emerald-400">{"    fidelFundamentalsUrl: string,"}</div>
                            <div className="text-emerald-400">{"    fidelFundamentalsGit: string"}</div>
                            <div>{'  }'}</div>
                          </div>
                        </div>

                        <div className="bg-emerald-50/50 border border-emerald-100 text-emerald-950 p-6 rounded-2xl space-y-3">
                          <h4 className="text-xs font-black text-emerald-900 uppercase tracking-widest flex items-center gap-1.5">
                            <BookOpenCheck size={14} className="text-emerald-600" />
                            <span>Tutoring Alignment</span>
                          </h4>
                          <p className="text-[10px] text-emerald-800 leading-relaxed font-semibold">
                            Using companion apps alongside weekly 1-on-1 sessions boosts heritage retention rates by up to **85%**. Instructors are automatically prompted of student progression during classroom assessments.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                </div>
              </motion.div>
            )}

            {viewScene === "amharic-levels" && (
              <motion.div
                key="scene-amharic-levels"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 overflow-y-auto p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8"
              >
                {/* Back Link Row */}
                <button
                  onClick={() => setViewScene("home")}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 font-extrabold text-xs uppercase tracking-widest cursor-pointer group"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                  <span>Back to Languages</span>
                </button>

                <div className="space-y-1">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    Select Your Amharic Level
                  </h1>
                  <p className="text-slate-550 text-xs md:text-sm font-semibold">
                    Each level delivers immersive dialect practices, auditory game questions, and colorful cards context.
                  </p>
                </div>

                {/* Level choices list */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { id: 1, tag: "🧸 Level 1 (ደረጃ ፩)", title: "መሠረቶች እና ማንነት", subtitle: "Foundations & Self", color: "indigo", bg: "from-indigo-50 to-sky-50", border: "border-indigo-150", text: "Greetings, Self introduction dialogue, Mom/Dad family members, and parts of the household." },
                    { id: 2, tag: "🚀 Level 2 (ደረጃ ፪)", title: "የቃላት ማበልጸጊያ", subtitle: "Vocabulary Boost", color: "purple", bg: "from-purple-50 to-pink-50", border: "border-purple-150", text: "Ethiopic numbers ፩–፳, colors spectrum, geometric structures, classroom items, and body parts." },
                    { id: 3, tag: "🎓 Level 3 (ደረጃ ፫)", title: "የመግለጽ ብቃት", subtitle: "Expressive Fluency", color: "emerald", bg: "from-emerald-50 to-teal-50", border: "border-emerald-150", text: "Comprehensive daily routine dialogues, emotions, hobbies, fruits and vegetables, and traditional meals." },
                    { id: 4, tag: "👑 Level 4 (ደረጃ ፬)", title: "የንግግር ሥነ-ምግባር", subtitle: "Speech Ethics", color: "amber", bg: "from-amber-50 to-yellow-50", border: "border-amber-150", text: "Ethiopian history chronicles, folk proverbs, career choices, social responsibilities, and supportive peer debates." },
                    { id: 5, tag: "💎 Level 5 (ደረጃ ፭)", title: "የማንነት ውርስ", subtitle: "Elite Legacy & Identity", color: "rose", bg: "from-rose-50 to-red-50", border: "border-rose-150", text: "Ancient wisdom legends, astronomy space terminology, public speaking ethics, and final legacy capstones." }
                  ].map((lvl) => (
                    <div
                      key={`amharic-lvl-${lvl.id}`}
                      onClick={() => {
                        setCurriculumLevel(lvl.id as any);
                        setSelectedLevelId(lvl.id as any);
                        setDifficulty(lvl.id === 1 ? "level1" : "level2");
                        setViewScene("lessons");
                      }}
                      className={`bg-gradient-to-br ${lvl.bg} border-2 ${lvl.border} p-5 rounded-[22px] flex flex-col justify-between hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-98`}
                    >
                      <div className="space-y-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-white rounded-lg border shadow-sm inline-block text-slate-700`}>
                          {lvl.tag}
                        </span>
                        <div className="space-y-0.5">
                          <h3 className="text-lg font-black font-serif text-indigo-950 group-hover:text-indigo-750 transition-colors">
                            {lvl.title}
                          </h3>
                          <p className="text-xs font-semibold text-slate-500">
                            {lvl.subtitle}
                          </p>
                        </div>
                        <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                          {lvl.text}
                        </p>
                      </div>

                      <div className="pt-4 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-500 group-hover:text-indigo-600 transition-colors">
                        <span>8 Lessons available</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 duration-150 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Global Academic Certification Hub for standard Amharic track */}
                <AmharicCertificate />
              </motion.div>
            )}

            {selectedLanguage === "geez" && viewScene === "geez-levels" && (
              <HabKidsApp 
                onBackToHome={() => setViewScene("home")}
              />
            )}

            {viewScene === "lessons" && selectedLanguage === "amharic" && (
              <motion.div
                key="scene-lessons"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex-1 overflow-y-auto p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8"
              >
                {/* Back Link Row */}
                <button
                  onClick={() => setViewScene("amharic-levels")}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 font-extrabold text-xs uppercase tracking-widest cursor-pointer group"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                  <span>Back to Levels</span>
                </button>

                <div className="space-y-1">
                  <h1 className="text-2xl md:text-3.5xl font-black text-slate-950 tracking-tight flex items-center gap-2">
                    {`🇪🇹 Amharic • Level ${curriculumLevel}`}
                    <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-150 font-bold px-2 py-0.5 rounded-lg uppercase">
                      Catalog Index
                    </span>
                  </h1>
                  <p className="text-slate-550 text-xs md:text-sm font-semibold">
                    Select a block lesson chapter milestone to start the clean audio tracing exercises, worksheets, games, and slides:
                  </p>
                </div>

                {/* Lesson Grid Catalogue */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {displayedLessonsList.map((item) => (
                    <div
                      key={`catalog-item-${item.num}`}
                      onClick={() => {
                        handleLessonChange(item.num);
                        setViewScene("session");
                      }}
                      className="bg-white border-2 border-slate-150 hover:border-indigo-400 p-4.5 rounded-[22px] flex items-start gap-4 transition-all duration-200 hover:shadow-md cursor-pointer group active:scale-98"
                    >
                      <span className="w-10 h-10 font-serif shrink-0 rounded-2xl bg-indigo-50 border border-indigo-100 font-black text-slate-800 flex items-center justify-center shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
                        {item.geez}
                      </span>

                      <div className="min-w-0 flex-1 space-y-1 text-left">
                        <span className="text-[9px] font-black text-indigo-500 uppercase tracking-wider block">
                          Meraf {item.num}
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-700 transition-colors tracking-tight leading-snug flex items-center flex-wrap gap-x-1.5">
                          <span className="font-serif font-black text-slate-950">{item.amh}</span>
                          <span className="text-slate-500 font-semibold text-xs font-sans">({item.topic})</span>
                        </h4>
                        <p className="text-[10px] text-slate-450 font-semibold leading-relaxed line-clamp-2">
                          {item.desc || "Interactive letter pronunciations, card matches, and sound blends."}
                        </p>
                        
                        {/* Word spelling focus */}
                        <div className="pt-2 flex items-center gap-1">
                          <span className="text-[9px] bg-slate-100 border font-serif text-slate-600 font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                            Focus: {item.amh}
                          </span>
                        </div>
                      </div>

                      {/* Launch Chevron icon */}
                      <span className="p-1.5 rounded-full bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0">
                        <Play size={12} fill="currentColor" />
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {viewScene === "session" && (
              <motion.div
                key="scene-session"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col overflow-hidden bg-white min-h-0"
              >
                {/* Main Slide Content frame */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col justify-start min-h-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeLesson}-${currentIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18 }}
                      className="w-full h-full"
                    >
                      <ActiveSlideRenderer 
                        slide={activeSlide} 
                        speakText={speakText} 
                        onReset={handleReset}
                        onClose={onClose}
                        difficulty={difficulty}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Bar Navigation Controls */}
                <div className="bg-slate-50 border-t border-slate-100 p-4 md:p-5 flex justify-between items-center shrink-0">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs uppercase font-black tracking-widest rounded-2xl cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-sm active:scale-97"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>

                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-2xl shadow-inner max-w-xs overflow-x-auto">
                    {filteredSlides.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-130 shrink-0 ${
                          i === currentIndex ? 'bg-indigo-600 scale-125 px-2 h-1.5 rounded-full' : 'bg-slate-250 hover:bg-slate-400'
                        }`}
                        title={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  {currentIndex === filteredSlides.length - 1 ? (
                    // Delightful Finish Button on Last Slide
                    <button
                      onClick={() => {
                        speakText("Congratulations! Lesson completed. You are a heritage language superstar!");
                        setViewScene("lessons");
                      }}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase font-black tracking-widest rounded-2xl cursor-pointer transition-all flex items-center gap-1.5 shadow-md shadow-emerald-150 active:scale-97 animate-bounce"
                    >
                      <span>Complete Lesson</span>
                      <Check size={14} className="text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs uppercase font-black tracking-widest rounded-2xl cursor-pointer transition-all flex items-center gap-1.5 shadow-md shadow-indigo-150 active:scale-97"
                    >
                      <span>Next</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// RENDERERS SECTION
// ==========================================
interface ActiveSlideRendererProps {
  slide: LessonSlide;
  speakText: (text: string) => void;
  onReset: () => void;
  onClose: () => void;
  difficulty?: "level1" | "level2";
}

function ActiveSlideRenderer({ slide, speakText, onReset, onClose, difficulty = "level1" }: ActiveSlideRendererProps) {
  switch (slide.slideType) {
    case "intro":
      return <IntroSlideView slide={slide} speakText={speakText} />;
    case "objectives":
      return <ObjectivesSlideView slide={slide} speakText={speakText} />;
    case "vocabulary":
      return <VocabularySlideView slide={slide} speakText={speakText} />;
    case "speaking_exercise":
      return <SpeakingExerciseSlideView slide={slide} speakText={speakText} />;
    case "guided_dialogue":
      return <GuidedDialogueSlideView slide={slide} speakText={speakText} />;
    case "reading_activity":
      return <ReadingActivitySlideView slide={slide} speakText={speakText} />;
    case "writing_activity":
      return <WritingActivitySlideView slide={slide} speakText={speakText} />;
    case "interactive_game":
      return <InteractiveGameSlideView slide={slide} speakText={speakText} difficulty={difficulty} />;
    case "homework":
      return <HomeworkSlideView slide={slide} speakText={speakText} />;
    case "parent_involvement":
      return <ParentInvolvementSlideView slide={slide} speakText={speakText} />;
    case "tutor_guidance":
      return <TutorGuidanceSlideView slide={slide} speakText={speakText} />;
    case "progress_assessment":
      return <ProgressAssessmentSlideView slide={slide} speakText={speakText} />;
    case "conclusion":
      return <ConclusionSlideView slide={slide} speakText={speakText} onReset={onReset} onClose={onClose} />;
    default:
      return (
        <div className="text-center p-12 text-slate-400">
          <Compass size={40} className="mx-auto block mb-2 animate-bounce" />
          <p>Analyzing Amharic Course Module...</p>
        </div>
      );
  }
}

// ----------------------------------------
// SLIDE VIEW COMPONENTS
// ----------------------------------------

function IntroSlideView({ slide, speakText }: { slide: IntroSlide; speakText: (text: string) => void }) {
  const isGeez = (slide as any).language === "geez";
  const displayHeading = slide.heading || slide.title || "";
  const displaySubheading = slide.subheading || slide.description || "";
  const displayPhase = slide.phase || "Ancient History";
  const displayTheme = slide.theme || "Classical Ge'ez";
  const waveText = isGeez ? "Ge'ez numbers are styled like letters with horizontal strokes!" : "Ethiopians wave and say Selam! to make friends instantly!";
  const waveEmoji = isGeez ? "📜" : "👋";
  const waveTitle = isGeez ? "Historical Fact" : "Culture Spot";
  const speakVoiceText = isGeez 
    ? "Welcome to classical Ethiopic numbers, young historian! Let's count together from 1 to 5." 
    : "Smarter learning with greetings. Welcome to Meraf 1. Tap next to begin!";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center text-left py-2">
      <div className="lg:col-span-7 space-y-6">
        <div className="flex gap-2">
          <span className="text-[10px] uppercase font-black bg-rose-100 text-rose-700 px-3 py-1.5 rounded-full inline-block">
            🔔 {displayPhase}
          </span>
          <span className="text-[10px] uppercase font-black bg-indigo-150 text-indigo-700 px-3 py-1.5 rounded-full inline-block">
            💖 {displayTheme}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none">
            {displayHeading}
          </h1>
          <p className="text-slate-550 text-base md:text-lg leading-relaxed font-sans">
            {displaySubheading}
          </p>
        </div>

        {/* Sound prompt button */}
        <div className="flex flex-wrap gap-4 items-center pt-2">
          <button
            onClick={() => speakText(speakVoiceText)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <Volume2 size={16} />
            <span>Listen Hello Voice</span>
          </button>
          
          <div className="text-xs bg-amber-50 border border-amber-150 text-amber-900 px-4 py-3 rounded-xl max-w-sm flex items-start gap-2">
            <span className="text-lg">{waveEmoji}</span>
            <span><strong>{waveTitle}:</strong> {waveText}</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 h-[240px] md:h-[350px] relative rounded-[24px] overflow-hidden shadow-xl border border-slate-100">
        <SlideImage fidelKey="ሰላም" providedUrl={slide.imageUrl} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-slate-150 shadow-md">
          <span className="text-[10px] font-black uppercase text-indigo-600 block">{isGeez ? "Ancient Manuscripts" : "Ethiopia Culture Spot"}</span>
          <strong className="text-xs font-bold text-slate-800">{isGeez ? "Symmetry of Ge'ez Calligraphy" : "Addis Ababa Welcoming Gates"}</strong>
        </div>
      </div>
    </div>
  );
}

function ObjectivesSlideView({ slide, speakText }: { slide: ObjectivesSlide; speakText: (text: string) => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left py-2">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <span className="text-[10px] font-black uppercase bg-violet-100 text-violet-750 px-2.5 py-1 rounded-md mb-1 inline-block">Syllabus Target</span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{slide.heading}</h1>
        </div>
        <div className="bg-indigo-50 border border-indigo-150 p-2 text-indigo-800 rounded-xl text-xs font-black uppercase shrink-0">
          ⏱️ {slide.duration}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-7 space-y-3.5">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Here is what we will unlock together today:</p>
          <div className="space-y-2.5">
            {slide.objectives.map((obj, i) => (
              <div 
                key={i} 
                className="flex items-start gap-3 bg-slate-50 border border-slate-150/80 p-3.5 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50/20 transition-all duration-150"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-slate-700 text-sm md:text-base font-medium">{obj}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => speakText("Our goals are simple today. We will learn ten greetings, play games, trace letters, and practice speaking with confidence!")}
            className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-extrabold text-xs uppercase tracking-wider pt-2"
          >
            <Volume2 size={14} />
            <span>Hear Objective Guide</span>
          </button>
        </div>

        <div className="md:col-span-5 bg-gradient-to-b from-indigo-50/50 to-indigo-100/40 p-5 rounded-[24px] border border-indigo-100 text-slate-800 text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mx-auto">
            <Trophy size={32} className="text-amber-500 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-slate-900 text-sm">Class Reward System</h4>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Earn gold coins and hero stars by completing games and sliding panels. Reach 100% to unlock the Master Greetings badge!
            </p>
          </div>
          <div className="border-t border-indigo-150 pt-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 block mb-1">Lesson Level</span>
            <span className="bg-white px-3 py-1 rounded-full border border-indigo-150 text-indigo-750 font-black text-[10px]">BEGINNER LEVEL 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VocabularySlideView({ slide, speakText }: { slide: VocabularySlide; speakText: (text: string) => void }) {
  const [showHelper, setShowHelper] = useState(false);
  const isGeez = (slide as any).language === "geez";

  const displayFidel = slide.fidel || slide.geezScript || "";
  const displayEnglish = slide.english || slide.phonetic || "";
  const displayMeaning = slide.meaning || slide.englishMeaning || "";
  const displayPronunciation = slide.pronunciation || displayEnglish;
  const displayContext = slide.context || `The ancient numeral '${displayFidel}' corresponds to ${displayMeaning} and is widely used across classical Ethiopic books and calendars.`;
  const displayTutorTip = slide.tutorTip || `Help children draw the symbol '${displayFidel}' and trace the top/bottom horizontal crown. Try using 5 pebbles to represent '${displayEnglish}'!`;
  const speechKey = isGeez ? displayEnglish : displayFidel;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center text-left py-1">
      
      {/* Visual illustration Column */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="w-full h-[250px] md:h-[320px] relative rounded-[28px] overflow-hidden shadow-lg border-2 border-slate-100 bg-slate-50">
          <SlideImage fidelKey={displayFidel} providedUrl={slide.imageUrl} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
          
          {/* Audio text float */}
          <button 
            onClick={() => speakText(speechKey)}
            className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title={isGeez ? "Speak word phonetic" : "Speak word in Amharic"}
          >
            <Volume2 size={20} />
          </button>

          {/* Core Word Badge */}
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">
            📖 {isGeez ? `Numeral ${slide.slideNumber - 1} of 5` : `Word ${slide.slideNumber - 2} of 10`}
          </div>
        </div>
        <p className="text-slate-400 text-[10px] mt-2 italic">Creative Illustration representing {displayEnglish}</p>
      </div>

  // Structured Content Column
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-[9px] uppercase font-black bg-emerald-50 text-emerald-700 border border-emerald-100 rounded px-2 py-0.5 font-mono">
            {isGeez ? "ANCIENT NUMERAL" : "VOCABULARY WORD"}
          </span>
          <span className="text-xs font-bold text-slate-400">• High-Contrast Board</span>
        </div>

        {(() => {
          const words = displayFidel.trim().split(/\s+/);
          const isFamilySlide = words.length > 1;

          if (isFamilySlide) {
            // Split english by dash or space to align with the words
            const englishTranslations = displayEnglish.split(/\s*-\s*/);
            return (
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider font-mono">
                    Tap any letter to hear its sound alone:
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {words.map((word, idx) => {
                      const eng = englishTranslations[idx] || "";
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => speakText(word)}
                          className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 bg-white hover:bg-indigo-50/40 active:bg-indigo-100/60 border border-slate-200 hover:border-indigo-300 shadow-sm rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer group hover:shadow-md"
                        >
                          <span className="text-2xl sm:text-3.5xl font-black text-indigo-950 font-serif mb-0.5 group-hover:scale-110 transition-transform">
                            {word}
                          </span>
                          <span className="text-[9px] sm:text-[11px] font-extrabold text-indigo-600 uppercase font-mono tracking-wide">
                            {eng.toLowerCase()}
                          </span>
                          <div className="mt-1.5 text-[7px] sm:text-[8px] text-slate-400 font-extrabold flex items-center gap-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                            <Volume2 size={8} />
                            <span>Say alone</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider mb-1">Family Summary:</span>
                  <p className="text-slate-600 text-xs font-semibold">
                    {displayMeaning} — {words.length} vowel forms of the family.
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="space-y-1">
                {/* Big display of the Amharic/Ge'ez Fidel */}
                <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-none tracking-tight font-serif text-indigo-750">
                  {displayFidel}
                </h1>
                <div className="flex items-center gap-3.5 pt-1">
                  <h2 className="text-xl md:text-2xl font-black text-indigo-600">{displayEnglish}</h2>
                  <span className="text-slate-300 font-bold">|</span>
                  <span className="text-slate-500 font-medium text-sm md:text-base">{displayMeaning}</span>
                </div>
              </div>
            );
          }
        })()}

        {/* Dynamic pronunciation card */}
        <div className="p-3 bg-slate-50 border border-slate-150/80 rounded-2xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Pronunciation Key:</span>
            <strong className="text-xs font-mono text-slate-700 font-black uppercase tracking-wide">
              {displayPronunciation}
            </strong>
          </div>
          <button 
            onClick={() => speakText(displayEnglish)}
            className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/20 text-indigo-700 font-black text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1 cursor-pointer"
          >
            <Volume2 size={12} />
            <span>Hear Phonics Guide</span>
          </button>
        </div>

        {/* Explain Context */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Script & Historical Context:</span>
          <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed">
            {displayContext}
          </p>
        </div>

        {/* Dynamic Tutor tip wrapper */}
        <div className="bg-amber-50/70 border border-amber-100 p-3.5 rounded-2xl flex items-start gap-3.5">
          <span className="text-lg">💡</span>
          <div className="space-y-0.5 text-left">
            <strong className="text-[10px] uppercase font-black tracking-widest text-amber-900 block">Tutor Action TIP:</strong>
            <p className="text-[11px] md:text-xs text-amber-950 font-semibold leading-relaxed">
              {displayTutorTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpeakingExerciseSlideView({ slide, speakText }: { slide: SpeakingExerciseSlide; speakText: (text: string) => void }) {
  const [activeEx, setActiveEx] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left py-2">
      <div className="space-y-1">
        <span className="bg-rose-50 text-rose-700 border border-rose-100 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md inline-block">
          Active Speaking Activity
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{slide.heading}</h1>
        <p className="text-slate-500 text-xs md:text-sm max-w-3xl leading-relaxed">{slide.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Interactive Exercise List */}
        <div className="space-y-2.5">
          {slide.exercises.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActiveEx(i);
                speakText(ex.amharic);
              }}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                activeEx === i 
                  ? 'bg-rose-50 border-rose-300 shadow-md ring-2 ring-rose-200' 
                  : 'bg-white border-slate-150 hover:bg-slate-50 hover:border-slate-350 shadow-sm'
              }`}
            >
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-black text-rose-500 tracking-widest block font-mono">Exercise {i + 1}</span>
                <strong className={`text-xl font-black font-serif block ${activeEx === i ? 'text-rose-700' : 'text-slate-800'}`}>
                  {ex.amharic}
                </strong>
                <p className="text-slate-500 font-semibold text-[11px] font-mono">{ex.transliteration}</p>
              </div>

              <div className={`p-2.5 rounded-xl shrink-0 transition-all ${
                activeEx === i ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-50 text-rose-600 border border-slate-100'
              }`}>
                <Volume2 size={16} />
              </div>
            </button>
          ))}
        </div>

        {/* Right Dynamic Feedback/Instruction Board */}
        <div className="bg-slate-900 text-white p-5 rounded-[24px] flex flex-col justify-between min-h-[220px] shadow-lg border-2 border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Volume2 size={180} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <MessageSquare size={16} />
              <span className="text-[10px] font-black uppercase tracking-wider">Coached Vocal Instruction</span>
            </div>

            {activeEx !== null ? (
              <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
                <blockquote className="text-base font-black italic border-l-2 border-rose-500 pl-3">
                  "{slide.exercises[activeEx].amharic}"
                </blockquote>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">English Meaning:</span>
                  <p className="text-slate-200 text-xs font-semibold">{slide.exercises[activeEx].english}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Interactive Coaching Tip:</span>
                  <p className="text-amber-300 text-[11px] font-medium leading-relaxed">{slide.exercises[activeEx].tip}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 py-6 text-center text-slate-450">
                <p className="text-xs font-semibold">Click on any exercise on the left to listen, repeat, and see conversational meanings!</p>
                <div className="text-lg animate-bounce pt-2">👆</div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-[10px] text-slate-400">
            <span>🗣️ Tap and Repeat with Tutor</span>
            <span>+10 Coins</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuidedDialogueSlideView({ slide, speakText }: { slide: GuidedDialogueSlide; speakText: (text: string) => void }) {
  const [activeSpeechIdx, setActiveSpeechIdx] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left py-1">
      <div className="space-y-1 pb-2 border-b">
        <span className="bg-indigo-50 text-indigo-700 font-black border border-indigo-100 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md inline-block">
          Guided Conversational Play
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{slide.heading}</h1>
        <p className="text-slate-550 text-xs leading-relaxed max-w-3xl">
          <strong>Scenario Context:</strong> {slide.scenario}
        </p>
      </div>

      {/* Speech Chat Interface */}
      <div className="bg-slate-100 border border-slate-200 rounded-[24px] p-4 md:p-6 space-y-4 shadow-inner max-h-[380px] overflow-y-auto">
        {slide.roles.map((role, i) => {
          const isLeft = role.bubbleSide === "left";
          const isActive = activeSpeechIdx === i;

          return (
            <div 
              key={i} 
              className={`flex items-start gap-3 w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
            >
              {isLeft && (
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xl shrink-0">
                  {role.avatar}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setActiveSpeechIdx(i);
                  speakText(role.amharic);
                }}
                className={`max-w-[70%] p-3.5 rounded-2xl text-left shadow-sm cursor-pointer transition-all duration-200 flex flex-col gap-1 ${
                  isLeft 
                    ? (isActive ? 'bg-indigo-650 text-white ring-4 ring-indigo-200' : 'bg-white hover:bg-slate-50')
                    : (isActive ? 'bg-purple-650 text-white ring-4 ring-purple-200' : 'bg-white hover:bg-slate-50')
                }`}
              >
                <div className="flex items-center justify-between gap-4 border-b border-slate-100/50 pb-1 mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                    {role.character}
                  </span>
                  <Volume2 size={12} className={isActive ? 'text-white' : 'text-slate-450'} />
                </div>

                <strong className={`text-base md:text-lg font-black font-serif block ${isActive ? 'text-white' : 'text-slate-950'}`}>
                  {role.amharic}
                </strong>
                
                <p className={`text-[11px] font-medium font-mono ${isActive ? 'text-white/90' : 'text-indigo-600'}`}>
                  {role.transliteration}
                </p>

                <div className={`mt-1 pt-1.5 border-t ${isActive ? 'border-white/10' : 'border-slate-50'}`}>
                  <span className={`text-[9px] font-bold block ${isActive ? 'text-white/60' : 'text-slate-450'}`}>English Meaning:</span>
                  <p className={`text-xs ${isActive ? 'text-white/90' : 'text-slate-600'}`}>
                    {role.english}
                  </p>
                </div>
              </button>

              {!isLeft && (
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xl shrink-0">
                  {role.avatar}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
          💡 Click speech bubbles to speak each character's role out loud!
        </span>
      </div>
    </div>
  );
}

function ReadingActivitySlideView({ slide, speakText }: { slide: ReadingActivitySlide; speakText: (text: string) => void }) {
  const [showTranslate, setShowTranslate] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left py-2">
      <div className="space-y-1">
        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md inline-block">
          Syllabus Reading Track
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{slide.heading}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Textbook Paragraph Frame */}
        <div className="md:col-span-8 bg-gradient-to-br from-amber-50/20 to-orange-50/20 p-6 md:p-8 rounded-[32px] border-2 border-stone-200/80 shadow-md relative overflow-hidden space-y-5">
          {/* Notebook lines representation */}
          <div className="absolute left-6 right-6 top-0 bottom-0 pointer-events-none border-l border-rose-200 opacity-20" />
          
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Story Reading Board (ነፃ ለማንበብ)</span>
            <button
              onClick={() => speakText(slide.passageAmharic)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] uppercase font-black tracking-wider shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <Volume2 size={12} />
              <span>Speak Full Story</span>
            </button>
          </div>

          {/* Large reading fonts */}
          <div className="space-y-4">
            <p className="text-xl md:text-2xl font-black text-slate-900 leading-relaxed tracking-wide font-serif">
              {slide.passageAmharic}
            </p>
            
            <div className="h-px bg-stone-150" />
            
            <p className="text-slate-500 font-semibold text-xs md:text-sm leading-relaxed font-mono">
              {slide.passageTransliteration}
            </p>
          </div>

          {/* Toggle translation drawer */}
          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setShowTranslate(!showTranslate)}
              className="text-stone-600 hover:text-stone-900 text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer self-start"
            >
              <span className="h-4 w-4 rounded-full bg-stone-200 flex items-center justify-center text-[9px]">
                {showTranslate ? "▼" : "▶"}
              </span>
              <span>{showTranslate ? "Hide English Translate" : "Show English Translate"}</span>
            </button>

            {showTranslate && (
              <p className="bg-white p-3.5 rounded-xl border border-stone-250 text-stone-750 text-xs leading-relaxed font-medium transition-all animate-in slide-in-from-top-1 duration-120">
                {slide.passageEnglish}
              </p>
            )}
          </div>
        </div>

        {/* Highlight definitions sidebar */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-indigo-700">
              <Sparkles size={14} />
              <strong className="text-[10px] font-black uppercase tracking-wider">Sight Word Recognition</strong>
            </div>
            <p className="text-[11px] text-slate-400 block font-semibold leading-relaxed">
              Find these greetings we learned today inside the paragraph and read them with a strong voice:
            </p>
            <div className="space-y-2 pt-1 font-serif">
              <div className="bg-rose-50 p-2 rounded-xl border border-rose-100 flex items-center justify-between text-xs">
                <strong className="text-rose-700 text-[13px] font-black">ሰላም</strong>
                <span className="text-[10px] text-slate-500 font-sans font-semibold">Hello / Peace</span>
              </div>
              <div className="bg-indigo-50 p-2 rounded-xl border border-indigo-100 flex items-center justify-between text-xs">
                <strong className="text-indigo-700 text-[13px] font-black">እንኳን ደህና መጣህ</strong>
                <span className="text-[10px] text-slate-500 font-sans font-semibold">Welcome (Boy)</span>
              </div>
              <div className="bg-amber-50 p-2 rounded-xl border border-amber-100 flex items-center justify-between text-xs">
                <strong className="text-amber-800 text-[13px] font-black">እግዚአብሔር ይመስገን</strong>
                <span className="text-[10px] text-slate-500 font-sans font-semibold">Thank God</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-150 rounded-2xl">
            <span className="text-[10px] font-black text-indigo-900 block uppercase mb-0.5">💡 Tutor Instructions:</span>
            <p className="text-[11px] text-indigo-950 font-medium leading-relaxed">
              {slide.tutorTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WritingActivitySlideView({ slide, speakText }: { slide: WritingActivitySlide; speakText: (text: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [paintbrushColor, setPaintbrushColor] = useState("#4f46e5"); // Indigo default
  const [brushSize, setBrushSize] = useState(7);
  const [orderIdx, setOrderIdx] = useState(0);

  // Initialize Canvas configurations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    }
  }, []);

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    
    // Get correct pointer coordinates relative to canvas bounding box
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = paintbrushColor;
    ctx.lineWidth = brushSize;
    setIsDrawing(true);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId);
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const currentLetterInfo = slide.lettersToPractice[orderIdx] || slide.lettersToPractice[0];

  return (
    <div className="max-w-4xl mx-auto space-y-5 text-left py-1">
      <div className="space-y-1">
        <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md inline-block">
          Interactive Stroke Lab
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{slide.heading}</h1>
        <p className="text-slate-550 text-xs leading-relaxed max-w-3xl">{slide.instructions}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left Side Drawing Board */}
        <div className="md:col-span-8 flex flex-col justify-start">
          <div className="bg-slate-50 border-2 border-indigo-200/60 rounded-[28px] p-4 space-y-3 shadow-inner flex-1 flex flex-col justify-between">
            
            <div className="flex items-center justify-between border-b border-indigo-100/70 pb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-750 flex items-center gap-1.5">
                <Paintbrush size={12} />
                <span>Magic Slate Workspace</span>
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="px-3.5 py-1 bg-white border border-slate-300 hover:border-red-300 hover:text-red-700 text-slate-650 font-black text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={11} />
                  <span>Clears</span>
                </button>
              </div>
            </div>

            {/* Drawing interactive Stage with big grey tracing guide backplate */}
            <div className="relative bg-white rounded-2xl border border-indigo-100 w-full h-[220px] shadow-sm select-none overflow-hidden touch-none flex items-center justify-center">
              
              {/* Giant Faded gray character behind */}
              <div className="absolute inset-0 flex items-center justify-center text-[100px] font-black text-slate-100/75 select-none pointer-events-none font-serif">
                {currentLetterInfo.letter}
              </div>

              {/* Real SVG Paint Layer */}
              <canvas
                ref={canvasRef}
                width={500}
                height={220}
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                className="absolute inset-0 w-full h-full cursor-crosshair z-10"
              />
            </div>

            {/* Canvas configurations controls */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Brush Color:</span>
                <div className="flex bg-white p-1 rounded-xl border border-slate-200 gap-1.5">
                  {["#4f46e5", "#ec4899", "#10b981", "#ff9800"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setPaintbrushColor(color)}
                      className="w-5 h-5 rounded-full transition-all border border-slate-100"
                      style={{ 
                        backgroundColor: color, 
                        transform: paintbrushColor === color ? 'scale(1.2)' : 'none',
                        boxShadow: paintbrushColor === color ? '0 0 6px rgba(0,0,0,0.15)' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="text-[10px] font-bold text-indigo-650 bg-indigo-50 px-3 py-1 rounded-lg">
                ✍️ Trace the big greeting letter above!
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Guide Rules & Selector */}
        <div className="md:col-span-4 space-y-3 flex flex-col justify-start">
          
          {/* Select letter tabs */}
          <div className="bg-white border rounded-2xl p-3 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-black text-slate-400 block tracking-wider">Select Letter To Draw:</span>
            <div className="grid grid-cols-2 gap-2">
              {slide.lettersToPractice.map((info, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setOrderIdx(i);
                    clearCanvas();
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    orderIdx === i 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                      : 'bg-slate-50 border-slate-150 hover:bg-slate-100'
                  }`}
                >
                  <strong className="text-xl font-black font-serif">{info.letter}</strong>
                  <span className={`text-[9px] font-bold ${orderIdx === i ? 'text-indigo-100' : 'text-slate-400'}`}>{info.phonetic}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stroke instructions checklist */}
          <div className="bg-gradient-to-b from-slate-50 to-slate-100/70 border p-4 rounded-[22px] flex-1 flex flex-col justify-between shadow-sm space-y-3">
            <div className="space-y-2">
              <span className="text-[9px] font-black text-slate-550 uppercase block tracking-wider">🎯 Stroke Order Steps:</span>
              <div className="space-y-1.5">
                {currentLetterInfo.steps.map((step, idx) => (
                  <p key={idx} className="text-[11px] text-slate-700 font-semibold leading-relaxed">
                    {step}
                  </p>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-2 text-center text-[11px] font-black text-slate-500">
              ⚡ Challenge: <strong className="text-indigo-700 font-serif">{slide.wordChallenge}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------
// PLAYABLE GAMES VIEW (GAMES 1, 2, 3)
// ----------------------------------------
function InteractiveGameSlideView({ 
  slide, 
  speakText, 
  difficulty = "level1" 
}: { 
  slide: InteractiveGameSlide; 
  speakText: (text: string) => void;
  difficulty?: "level1" | "level2";
}) {
  const { gameIndex, gameTitle, gameInstructions, gameData } = slide;

  // Dynamically load the vocabulary list for active lesson from slides catalog to feed Level 2 games
  const slideLang = (slide as any).language || "amharic";
  const slideLevel = (slide as any).level || 1;
  const activeVocabularies = slides.filter(
    (s) => s.lessonNumber === slide.lessonNumber && 
           s.slideType === "vocabulary" &&
           ((s as any).level || 1) === slideLevel &&
           ((s as any).language || "amharic") === slideLang
  ) as VocabularySlide[];

  return (
    <div className="max-w-4xl mx-auto space-y-5 text-left py-1 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-indigo-50 pb-3">
        <div>
          <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Activity size={12} className="animate-bounce" />
            <span>
              {difficulty === "level2" ? "🚀 Level 2 (Advanced)" : "🧸 Level 1 (Beginner)"} Interactive Game
            </span>
          </span>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mt-1">
            {difficulty === "level2" 
              ? (gameIndex === 1 
                  ? "Word Assembler Spell Board" 
                  : gameIndex === 2 
                  ? "Find the Missing Letter Blank" 
                  : "Phonetic audio syllable Blender") 
              : gameTitle}
          </h1>
        </div>
        <div className="text-[11px] font-bold text-slate-400 bg-slate-50 border px-3 py-1.5 rounded-xl max-w-xs leading-tight">
          🎮 <strong>Instructions:</strong>{" "}
          {difficulty === "level2"
            ? (gameIndex === 1 
                ? "Spell the vocabulary word by tapping scrambled characters in order!" 
                : gameIndex === 2 
                ? "Tap the missing character that fits the word blanket slots!" 
                : "Listen to the segmented voice syllables and blend them into words!")
            : gameInstructions}
        </div>
      </div>

      {difficulty === "level2" ? (
        <div className="space-y-4">
          {gameIndex === 1 && (
            <GameWordAssembly vocabularies={activeVocabularies} speakText={speakText} />
          )}
          {gameIndex === 2 && (
            <GameWordFillBlank vocabularies={activeVocabularies} speakText={speakText} />
          )}
          {gameIndex === 3 && (
            <GamePhoneticBlend vocabularies={activeVocabularies} speakText={speakText} />
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {gameIndex === 1 && <Game1Matchmaker data={gameData} speakText={speakText} />}
          {gameIndex === 2 && <Game2SoundBubblePop data={gameData} speakText={speakText} />}
          {gameIndex === 3 && (
            <div className="space-y-6">
              <Game3SyllableScramble data={gameData} speakText={speakText} />
              
              {/* Also offer the Word to Image Game! */}
              <div className="border-t border-dashed border-slate-200 pt-6">
                <span className="text-[10px] font-black tracking-widest text-slate-400 block mb-3 text-center">
                  🌟 BONUS GAME: WORD TO IMAGE MATCH
                </span>
                <GameWordToImage vocabularies={activeVocabularies} speakText={speakText} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// GAME 1: MATCHING CARDS
function Game1Matchmaker({ data, speakText }: { data: any; speakText: (text: string) => void }) {
  const [cards, setCards] = useState<any[]>([]);
  const [selLeftId, setSelLeftId] = useState<string | null>(null);
  const [selRightId, setSelRightId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Scramble cards on mount
  useEffect(() => {
    resetGame();
  }, [data]);

  const resetGame = () => {
    const listAmh = data.pairs.map((p: any) => ({ ...p, isAmharic: true }));
    const listTrans = data.pairs.map((p: any) => ({ ...p, isAmharic: false }));
    
    // Shuffle arrays
    setCards([...listAmh].sort(() => Math.random() - 0.5));
    setSelLeftId(null);
    setSelRightId(null);
    setMatchedIds([]);
    setScore(0);
    setIsDone(false);
  };

  const handleCardClick = (card: any) => {
    // If already matched, return
    if (matchedIds.includes(card.id)) return;

    if (card.isAmharic) {
      setSelLeftId(card.id);
      speakText(card.amharic);
      // If we already have a translation selected, check for match
      if (selRightId) {
        if (card.id === selRightId) {
          triggerMatch(card.id);
        } else {
          triggerMismatch();
        }
      }
    } else {
      setSelRightId(card.id);
      speakText(card.translation);
      // If we already have an Amharic selected, check for match
      if (selLeftId) {
        if (card.id === selLeftId) {
          triggerMatch(card.id);
        } else {
          triggerMismatch();
        }
      }
    }
  };

  const triggerMatch = (id: string) => {
    setTimeout(() => {
      const newMatched = [...matchedIds, id];
      setMatchedIds(newMatched);
      setScore((prev) => prev + 10);
      setSelLeftId(null);
      setSelRightId(null);
      
      if ("speechSynthesis" in window) {
        speakText("Gobez! Perfect match!");
      }

      if (newMatched.length === data.pairs.length) {
        setIsDone(true);
      }
    }, 250);
  };

  const triggerMismatch = () => {
    setTimeout(() => {
      setSelLeftId(null);
      setSelRightId(null);
      speakText("Try again!");
    }, 400);
  };

  const amharicCards = cards.filter(c => c.isAmharic);
  const englishCards = [...data.pairs].sort(() => Math.random() - 0.5); // Shuffle english to keep layout non-adjacent

  return (
    <div className="bg-gradient-to-br from-indigo-50/20 to-indigo-100/20 p-5 rounded-[28px] border border-indigo-100 space-y-5 shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b">
        <strong className="text-[10px] font-black uppercase text-indigo-700 tracking-wider">Memorize Core Combinations:</strong>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-rose-600">Points Gained: +{score}</span>
          <button onClick={resetGame} className="text-[10px] font-black flex items-center gap-1 bg-white hover:bg-slate-50 border px-2.5 py-1 rounded-xl cursor-pointer shadow-sm">
            <RotateCcw size={10} />
            <span>Reset Matching</span>
          </button>
        </div>
      </div>

      {isDone ? (
        <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-200 bg-white shadow-md p-6 rounded-2xl border border-indigo-100">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto shadow-md">
            🏅
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-base">Perfect Memory Matchmaker Success!</h3>
            <p className="text-stone-500 text-xs">You successfully mapped all greeting combinations. +100 Hero Experience gained! 🌟</p>
          </div>
          <button onClick={resetGame} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md">
            Play Matching Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          
          {/* Amharic Column */}
          <div className="space-y-2 text-center">
            <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest block mb-2">Amharic Greetings (ሰላም)</span>
            <div className="space-y-2">
              {amharicCards.map((card, idx) => {
                const isMatched = matchedIds.includes(card.id);
                const isSelected = selLeftId === card.id;

                return (
                  <button
                    key={`amh-${idx}`}
                    type="button"
                    onClick={() => handleCardClick(card)}
                    style={{ minHeight: '52px' }}
                    className={`w-full p-3 rounded-2xl font-serif text-lg font-black border transition-all duration-180 flex items-center justify-center cursor-pointer shadow-sm ${
                      isMatched 
                        ? 'bg-emerald-50 border-emerald-250 text-emerald-600 scale-95 opacity-50'
                        : isSelected
                        ? 'bg-indigo-650 border-indigo-700 text-white shadow-md scale-102 ring-2 ring-indigo-300'
                        : 'bg-white border-slate-150 hover:bg-indigo-50/10 hover:border-indigo-200'
                    }`}
                  >
                    <span>{card.amharic}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* English meanings Column */}
          <div className="space-y-2 text-center">
            <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest block mb-2">English Meaning Translation</span>
            <div className="space-y-2">
              {englishCards.map((card, idx) => {
                const innerCard = { ...card, isAmharic: false };
                const isMatched = matchedIds.includes(innerCard.id);
                const isSelected = selRightId === innerCard.id;

                return (
                  <button
                    key={`eng-${idx}`}
                    type="button"
                    onClick={() => handleCardClick(innerCard)}
                    style={{ minHeight: '52px' }}
                    className={`w-full p-3 rounded-2xl text-xs font-black border transition-all duration-180 flex items-center justify-center cursor-pointer shadow-sm ${
                      isMatched 
                        ? 'bg-emerald-50 border-emerald-250 text-emerald-600 scale-95 opacity-50 font-medium'
                        : isSelected
                        ? 'bg-purple-600 border-purple-750 text-white shadow-md scale-102 ring-2 ring-purple-300'
                        : 'bg-white border-slate-150 hover:bg-purple-50/10 hover:border-purple-200'
                    }`}
                  >
                    <span>{innerCard.translation}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// GAME 2: SOUND BUBBLES POP
function Game2SoundBubblePop({ data, speakText }: { data: any; speakText: (text: string) => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    resetGame();
  }, [data]);

  const resetGame = () => {
    setQIdx(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setIsDone(false);
  };

  const currentPrompt = data.soundPrompts[qIdx];

  const handleChoiceClick = (choice: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(choice);
    
    if (choice === currentPrompt.correctFidel) {
      setQuizScore((prev) => prev + 25);
      speakText("Very good! That is the correct character.");
    } else {
      speakText("Oh, almost! Try the next one.");
    }
  };

  const handleNextQuestion = () => {
    if (qIdx < data.soundPrompts.length - 1) {
      setQIdx((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsDone(true);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50/20 to-purple-100/20 p-5 rounded-[28px] border border-purple-100 space-y-5 shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-purple-100/80">
        <strong className="text-[10px] font-black uppercase text-purple-700 tracking-wider">Audio Phonics Pop Challenge:</strong>
        <span className="text-xs font-black text-rose-600">Perfect Score: {quizScore}/75</span>
      </div>

      {isDone ? (
        <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-200 bg-white shadow-md p-6 rounded-2xl border border-purple-100">
          <div className="flex justify-center gap-1.5 text-amber-500 text-3xl">
            <Star className="fill-amber-400 animate-bounce duration-500" />
            <Star className="fill-amber-400 animate-bounce duration-700" />
            <Star className="fill-amber-400 animate-bounce duration-900" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-base">Sound Pop Complete! Score: {quizScore}/75</h3>
            <p className="text-stone-500 text-xs">You popped the bubbles that matched the vocal recordings correctly! Star badge rewarded. 🌟</p>
          </div>
          <button onClick={resetGame} className="px-6 py-2 bg-purple-650 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md">
            Restart Sound Quiz
          </button>
        </div>
      ) : (
        <div className="space-y-5 text-center">
          
          {/* Large cartoon speaker trigger bubble container */}
          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm max-w-sm mx-auto space-y-3">
            <span className="text-[9px] uppercase font-black tracking-widest text-slate-400 block">Tap speaker to listen:</span>
            <button
              onClick={() => speakText(currentPrompt.voice)}
              className="w-16 h-16 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center mx-auto shadow-md scale-105 active:scale-95 transition-all text-2xl cursor-pointer hover:rotate-3"
            >
              <Volume2 size={28} />
            </button>
            <p className="text-xs text-purple-950 font-bold">"Click of grandmother starting a morning greet..."</p>
          </div>

          {/* Grid choice bubbles */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-2">
            {currentPrompt.choices.map((choice: string, i: number) => {
              const isCorrect = choice === currentPrompt.correctFidel;
              const isSelected = selectedAnswer === choice;
              
              let bubbleStyle = "bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/10 text-slate-800 scale-100";
              if (selectedAnswer !== null) {
                if (isCorrect) {
                  bubbleStyle = "bg-emerald-500 text-white border-emerald-600 scale-105 shadow-md flex items-center gap-1";
                } else if (isSelected) {
                  bubbleStyle = "bg-red-500 text-white border-red-600 scale-95 opacity-80";
                } else {
                  bubbleStyle = "bg-slate-50 text-slate-300 border-slate-100 scale-90 opacity-40";
                }
              }

              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => handleChoiceClick(choice)}
                  style={{ minWidth: '140px' }}
                  className={`p-4 rounded-full font-serif font-black text-xl border shadow-sm transition-all duration-200 cursor-pointer ${bubbleStyle}`}
                >
                  <span>{choice}</span>
                  {selectedAnswer !== null && isCorrect && isSelected && <Check size={16} />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex justify-center">
            {selectedAnswer !== null && (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-2 bg-slate-900 border hover:bg-slate-850 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1 cursor-pointer"
              >
                <span>{qIdx < data.soundPrompts.length - 1 ? "Next Audio Play" : "Check Totals"}</span>
                <ArrowRight size={12} />
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

// GAME 3: SYLLABLE SCRAMBLE BUILDER
function Game3SyllableScramble({ data, speakText }: { data: any; speakText: (text: string) => void }) {
  const [sIdx, setSIdx] = useState(0);
  const [userSequence, setUserSequence] = useState<number[]>([]); // Array of chosen syllable indices
  const [gScore, setGScore] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    resetGame();
  }, [data]);

  const resetGame = () => {
    setSIdx(0);
    setUserSequence([]);
    setGScore(0);
    setComplete(false);
  };

  const currentScramble = data.scrambles[sIdx];

  const handleSyllableClick = (idx: number) => {
    if (userSequence.includes(idx)) {
      // De-select if clicked again
      setUserSequence(userSequence.filter(v => v !== idx));
    } else {
      const nextSeq = [...userSequence, idx];
      setUserSequence(nextSeq);
      speakText(currentScramble.syllables[idx]);

      // Check order immediately if all chosen
      if (nextSeq.length === currentScramble.syllables.length) {
        // Map sequences to check equality
        const isMatched = nextSeq.every((val, index) => val === currentScramble.correctOrder[index]);
        if (isMatched) {
          setGScore((prev) => prev + 50);
          speakText("Amazing builder skills! You spelled the greeting word perfectly.");
        } else {
          speakText("Oh, almost spelled it correctly! Click re-order to refresh the wind panels.");
          setTimeout(() => {
            setUserSequence([]);
          }, 800);
        }
      }
    }
  };

  const handleNextChallenge = () => {
    if (sIdx < data.scrambles.length - 1) {
      setSIdx((prev) => prev + 1);
      setUserSequence([]);
    } else {
      setComplete(true);
    }
  };

  const isScrambleCorrect = userSequence.length === currentScramble?.syllables.length &&
    userSequence.every((val, index) => val === currentScramble.correctOrder[index]);

  return (
    <div className="bg-gradient-to-br from-emerald-50/25 to-emerald-100/10 p-5 rounded-[28px] border border-emerald-100 space-y-5 shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-emerald-100/80">
        <strong className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">Fidel Syllable Scramble Builder:</strong>
        <span className="text-xs font-black text-rose-600">Perfect Score: {gScore}/100</span>
      </div>

      {complete ? (
        <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-200 bg-white shadow-md p-6 rounded-2xl border border-emerald-100">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto shadow-md">
            👑
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-base">Syllable Builder Quest Mastered! Score: {gScore}/100</h3>
            <p className="text-stone-500 text-xs">You successfully assembled scattered cards into solid greeting values! Trophy awarded. +100 Hero Experience! 🚀</p>
          </div>
          <button onClick={resetGame} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md w-full sm:w-auto">
            Try Spelling Again
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-center">
          
          {/* Target Word Board */}
          <div className="bg-white p-4 rounded-2xl border-2 border-emerald-100 shadow-sm max-w-sm mx-auto space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Spelling Challenge Idea Value:</span>
            <div className="flex justify-center items-center gap-2">
              <strong className="text-xl font-black text-slate-900 font-sans">{currentScramble.wordEnglish}</strong>
              <span className="text-slate-300">➜</span>
              <strong className="text-2xl font-black text-slate-400 font-serif tracking-wider">{currentScramble.targetWord}</strong>
            </div>
          </div>

          {/* Builder area where syllable chunks are slotted */}
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase text-slate-400 block tracking-wide">Building Slate Box:</span>
            <div 
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add("border-emerald-500", "bg-emerald-50/10");
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove("border-emerald-500", "bg-emerald-50/10");
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove("border-emerald-500", "bg-emerald-50/10");
                try {
                  const data = JSON.parse(e.dataTransfer.getData("application/json"));
                  if (data && typeof data.index === 'number') {
                    handleSyllableClick(data.index);
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              className="flex justify-center items-center gap-3 bg-white border border-slate-200 h-[72px] rounded-2xl max-w-sm mx-auto p-2 shadow-inner transition-colors duration-150"
            >
              {userSequence.length > 0 ? (
                userSequence.map((idx) => (
                  <div key={idx} className="bg-indigo-600 text-white text-xl font-black font-serif px-6 py-2.5 rounded-xl border border-indigo-750 shadow-md animate-in zoom-in-95 duration-120">
                    {currentScramble.syllables[idx]}
                  </div>
                ))
              ) : (
                <span className="text-xs text-slate-450 italic">Drag syllables or tap bubbles below in order!</span>
              )}
            </div>
          </div>

          {/* Scattered Bubbles */}
          <div className="space-y-2">
            <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest block">Scattered syllables panels:</span>
            <div className="flex justify-center gap-4">
              {currentScramble.syllables.map((syl: string, index: number) => {
                const isSelected = userSequence.includes(index);
                return (
                  <button
                    key={index}
                    type="button"
                    draggable={!isSelected}
                    onDragStart={(e) => {
                      e.dataTransfer.setData("application/json", JSON.stringify({ index }));
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onClick={() => handleSyllableClick(index)}
                    className={`w-14 h-14 rounded-full font-serif font-black text-xl flex items-center justify-center border transition-all duration-200 cursor-grab active:cursor-grabbing shadow-sm ${
                      isSelected 
                        ? 'bg-slate-100 text-slate-200 border-slate-100 scale-90 opacity-40 cursor-not-allowed' 
                        : 'bg-white border-slate-250 hover:bg-emerald-50/10 hover:border-emerald-300 scale-100 font-black'
                    }`}
                  >
                    <span>{syl}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Correct feedback block */}
          {isScrambleCorrect && (
            <div className="p-3 bg-emerald-50 border border-emerald-150 rounded-2xl max-w-xs mx-auto text-emerald-950 font-black text-xs space-y-2 animate-in fade-in zoom-in-95 duration-150">
              <p>🎉 Gobez! Correctly Spelled: <strong className="font-serif text-sm">{currentScramble.targetWord}</strong>!</p>
              <button
                type="button"
                onClick={handleNextChallenge}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] tracking-wider uppercase rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1 mx-auto cursor-pointer"
              >
                <span>{sIdx < data.scrambles.length - 1 ? "Next Word Scramble" : "Finish Spill Lab"}</span>
                <ArrowRight size={10} />
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

// ============================================================================
// LEVEL 2 ADVANCED INTERACTIVE GAME COMPONENTS
// ============================================================================

// 1. WORD ASSEMBLY PUZZLE (Scrambled Letters Word Builders)
function GameWordAssembly({ vocabularies, speakText }: { vocabularies: any[]; speakText: (text: string) => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [scrambledFidels, setScrambledFidels] = useState<{ char: string; isSelected: boolean; key: string }[]>([]);
  const [selectedSequence, setSelectedSequence] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (vocabularies && vocabularies[qIdx]) {
      const activeWord = vocabularies[qIdx].fidel;
      const chars = activeWord.split("");
      const metaChars = chars.map((c, i) => ({
        char: c,
        isSelected: false,
        key: `${c}-${i}-${Math.random()}`
      }));
      setScrambledFidels([...metaChars].sort(() => Math.random() - 0.5));
      setSelectedSequence([]);
    }
  }, [vocabularies, qIdx]);

  const handleCharacterClick = (charObj: { char: string; isSelected: boolean; key: string }, idx: number) => {
    if (charObj.isSelected) return;

    // Pronounce
    speakText(charObj.char);

    // Update state
    const nextFidels = [...scrambledFidels];
    nextFidels[idx].isSelected = true;
    setScrambledFidels(nextFidels);

    const nextSeq = [...selectedSequence, charObj.char];
    setSelectedSequence(nextSeq);

    // Validate spelling
    const targetWord = vocabularies[qIdx].fidel;
    if (nextSeq.length === targetWord.length) {
      if (nextSeq.join("") === targetWord) {
        setScore((prev) => prev + 25);
        speakText("Gobez! You assembled the word perfectly!");
      } else {
        speakText("Nice try! Combining correct syllables builds strength!");
      }

      setTimeout(() => {
        if (qIdx < vocabularies.length - 1) {
          setQIdx((prev) => prev + 1);
        } else {
          setIsDone(true);
        }
      }, 1400);
    }
  };

  const handleClear = () => {
    if (vocabularies && vocabularies[qIdx]) {
      const activeWord = vocabularies[qIdx].fidel;
      const chars = activeWord.split("");
      const metaChars = chars.map((c, i) => ({
        char: c,
        isSelected: false,
        key: `${c}-${i}-${Math.random()}`
      }));
      setScrambledFidels([...metaChars].sort(() => Math.random() - 0.5));
      setSelectedSequence([]);
    }
  };

  const resetGame = () => {
    setQIdx(0);
    setScore(0);
    setIsDone(false);
  };

  if (!vocabularies || vocabularies.length === 0) {
    return (
      <div className="p-4 text-center text-slate-400 italic">
        Loading Amharic Spelling Quest Assets...
      </div>
    );
  }

  const currentVocab = vocabularies[qIdx];

  return (
    <div className="bg-gradient-to-br from-indigo-50/20 to-indigo-100/20 p-5 rounded-[28px] border border-indigo-100 space-y-4 shadow-inner text-left">
      <div className="flex justify-between items-center pb-2 border-b">
        <strong className="text-xs uppercase font-extrabold text-indigo-700 tracking-wider">
          🧱 Spelling Assembler — Puzzle {qIdx + 1} of {vocabularies.length}
        </strong>
        <span className="text-xs font-black text-rose-600">Quest Points: +{score}</span>
      </div>

      {isDone ? (
        <div className="text-center py-10 space-y-4 bg-white border rounded-2xl p-6 shadow-sm">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
            🎓
          </div>
          <div>
            <h3 className="font-extrabold text-slate-950 text-base">Spelling Assembler Mastered!</h3>
            <p className="text-stone-500 text-xs">You assembled all vocabularies! +100 XP gained! 🌟</p>
          </div>
          <button onClick={resetGame} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl cursor-pointer">
            Play Again
          </button>
        </div>
      ) : (
        <div className="space-y-5 text-center">
          
          {/* Target translations and prompts */}
          <div className="bg-white p-4 rounded-xl border max-w-sm mx-auto shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">English Meaning:</span>
            <strong className="text-xl font-black text-indigo-950 tracking-tight block">{currentVocab.meaning}</strong>
            <p className="text-xs text-slate-400 italic font-medium mt-1">({currentVocab.english})</p>
          </div>

          {/* User's construction tray */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">My Spell Tray:</span>
            <div 
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add("border-indigo-500", "bg-indigo-50/10");
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove("border-indigo-500", "bg-indigo-50/10");
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove("border-indigo-500", "bg-indigo-50/10");
                try {
                  const data = JSON.parse(e.dataTransfer.getData("application/json"));
                  if (data && data.item) {
                    handleCharacterClick(data.item, data.index);
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              className="flex justify-center items-center gap-2 h-14 bg-white border border-slate-200 rounded-2xl max-w-sm mx-auto p-1.5 shadow-inner transition-colors duration-150"
            >
              {selectedSequence.length > 0 ? (
                selectedSequence.map((char, index) => (
                  <span key={index} className="bg-indigo-600 text-white text-lg font-black font-serif px-4 py-2 rounded-xl shadow border">
                    {char}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">Drag letters or tap them below in spelling order...</span>
              )}
            </div>
          </div>

          {/* Letter Choice Deck */}
          <div className="space-y-3">
            <div className="flex justify-center flex-wrap gap-2">
              {scrambledFidels.map((item, i) => (
                <button
                  key={item.key}
                  disabled={item.isSelected}
                  draggable={!item.isSelected}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("application/json", JSON.stringify({ item, index: i }));
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onClick={() => handleCharacterClick(item, i)}
                  className={`w-12 h-12 text-lg font-serif font-black rounded-full flex items-center justify-center border transition-all duration-155 cursor-grab active:cursor-grabbing hover:scale-105 active:scale-95 ${
                    item.isSelected
                      ? "bg-slate-100 border-slate-200 text-slate-200 cursor-not-allowed"
                      : "bg-white border-slate-305 hover:bg-indigo-50 hover:border-indigo-350 shadow-sm"
                  }`}
                >
                  {item.char}
                </button>
              ))}
            </div>

            <button
              onClick={handleClear}
              className="px-3 py-1 text-[10px] font-black uppercase text-slate-400 hover:text-red-500 bg-slate-100 hover:bg-red-50 border rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 mx-auto"
            >
              <RotateCcw size={10} />
              <span>Reset Tray</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

// 2. WORD PUZZLE FILL BLANK (Missing Middle / End Letter)
function GameWordFillBlank({ vocabularies, speakText }: { vocabularies: any[]; speakText: (text: string) => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [blankIndex, setBlankIndex] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (vocabularies && vocabularies[qIdx]) {
      const word = vocabularies[qIdx].fidel;
      
      // Determine index of middle/end character to blank out safely
      const chosenIdx = word.length > 2 ? Math.floor(word.length / 2) : word.length - 1;
      setBlankIndex(chosenIdx);

      const correctChar = word[chosenIdx];
      // Generate standard wrong choices out of Amharic alphabet list
      const fallbackChoices = ["ላ", "ብ", "መ", "ር", "ታ", "ቅ", "ኝ", "ሀ", "ሰ", "ተ", "ው"].filter(c => c !== correctChar);
      const shuffledWrongs = fallbackChoices.sort(() => Math.random() - 0.5).slice(0, 2);

      const pool = [correctChar, ...shuffledWrongs].sort(() => Math.random() - 0.5);
      setChoices(pool);
      setSelectedLetter(null);
    }
  }, [vocabularies, qIdx]);

  const handleChoiceClick = (letter: string) => {
    if (selectedLetter !== null) return;
    setSelectedLetter(letter);

    const correctChar = vocabularies[qIdx].fidel[blankIndex];
    if (letter === correctChar) {
      setScore((prev) => prev + 25);
      speakText("Awesome! Spot on match!");
    } else {
      speakText(`Nice try! The correct letter is ${correctChar}`);
    }

    setTimeout(() => {
      if (qIdx < vocabularies.length - 1) {
        setQIdx((prev) => prev + 1);
      } else {
        setIsDone(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setQIdx(0);
    setScore(0);
    setIsDone(false);
  };

  if (!vocabularies || vocabularies.length === 0) return null;

  const currentVocab = vocabularies[qIdx];
  const charArray = currentVocab.fidel.split("");
  const correctLetter = currentVocab.fidel[blankIndex];

  return (
    <div className="bg-gradient-to-br from-emerald-50/20 to-emerald-100/20 p-5 rounded-[28px] border border-emerald-100 space-y-4 shadow-inner text-left">
      <div className="flex justify-between items-center pb-2 border-b">
        <strong className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
          🔍 Fill in the Blank — Puzzle {qIdx + 1} of {vocabularies.length}
        </strong>
        <span className="text-xs font-black text-rose-600">Points Gained: +{score}</span>
      </div>

      {isDone ? (
        <div className="text-center py-10 space-y-4 bg-white border rounded-2xl p-6 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
            🏅
          </div>
          <div>
            <h3 className="font-extrabold text-slate-950 text-base">Fill Blank Completed!</h3>
            <p className="text-stone-500 text-xs">Excellent literacy mastery of Amharic silent structures! +100 XP rewarded! 🌟</p>
          </div>
          <button onClick={resetGame} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl cursor-pointer">
            Try Quest Again
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-center">
          
          {/* Large Card Word display with blanked indicator */}
          <div className="bg-white p-5 rounded-2xl border max-w-sm mx-auto shadow-sm space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Find the Missing Letter:</span>
            <div className="flex justify-center items-center gap-1.5 font-serif text-3xl font-black text-slate-900">
              {charArray.map((char, index) => {
                if (index === blankIndex) {
                  return (
                    <span 
                      key={index} 
                      className={`inline-block px-3.5 py-1.5 border-b-4 border-dashed font-sans text-xl ${
                        selectedLetter 
                          ? (selectedLetter === correctLetter ? "text-emerald-600 border-emerald-500 scale-105" : "text-rose-500 border-rose-500") 
                          : "text-indigo-600 border-indigo-400 bg-indigo-50/20 animate-pulse"
                      }`}
                    >
                      {selectedLetter ? selectedLetter : "?"}
                    </span>
                  );
                }
                return <span key={index}>{char}</span>;
              })}
            </div>
            
            <p className="text-xs text-stone-500 font-sans font-bold leading-tight pt-1">
              Meaning: <span className="text-indigo-600">{currentVocab.meaning}</span> ({currentVocab.english})
            </p>
          </div>

          {/* Letter option selections */}
          <div className="space-y-2">
            <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-widest">TAP CORRECT OPTION:</span>
            <div className="flex justify-center gap-4">
              {choices.map((choice) => {
                const isSelected = selectedLetter === choice;
                const isCorrect = choice === correctLetter;
                return (
                  <button
                    key={choice}
                    disabled={selectedLetter !== null}
                    onClick={() => handleChoiceClick(choice)}
                    className={`w-14 h-14 rounded-2xl font-serif font-black text-xl flex items-center justify-center border transition-all duration-155 cursor-pointer shadow-sm ${
                      selectedLetter !== null
                        ? (isCorrect 
                            ? "bg-emerald-600 border-emerald-750 text-white shadow-md scale-102" 
                            : isSelected 
                            ? "bg-rose-500 border-rose-750 text-white" 
                            : "bg-slate-50 border-slate-200 text-slate-300")
                        : "bg-white border-slate-250 hover:bg-emerald-50/10 hover:border-emerald-300 hover:scale-105 active:scale-95"
                    }`}
                  >
                    <span>{choice}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// 3. PHONETIC AUDIO BLEND (Segmented Audio clip blended)
function GamePhoneticBlend({ vocabularies, speakText }: { vocabularies: any[]; speakText: (text: string) => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [choices, setChoices] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (vocabularies && vocabularies[qIdx]) {
      const correctVocab = vocabularies[qIdx];
      const otherVocabs = vocabularies.filter((_, idx) => idx !== qIdx);
      const wrongOptions = otherVocabs.sort(() => Math.random() - 0.5).slice(0, 2);

      const pool = [correctVocab, ...wrongOptions].sort(() => Math.random() - 0.5);
      setChoices(pool);
      setSelectedId(null);
    }
  }, [vocabularies, qIdx]);

  const playSegmentedAudio = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const vocab = vocabularies[qIdx];
    const letters = vocab.fidel.split("");
    
    // Play each letter with segment intervals to trigger sound blend training
    speakText("Listen to syllables: ");
    
    let delay = 950;
    letters.forEach((char, idx) => {
      setTimeout(() => {
        speakText(char);
        if (idx === letters.length - 1) {
          setIsPlaying(false);
        }
      }, delay * (idx + 1));
    });
  };

  const handleChoiceClick = (vocabItem: any) => {
    if (selectedId !== null) return;
    setSelectedId(vocabItem.english);

    const correctVocab = vocabularies[qIdx];
    if (vocabItem.english === correctVocab.english) {
      setScore((prev) => prev + 25);
      speakText(`Excellent! You blended phonetic segments into: ${correctVocab.fidel}`);
    } else {
      speakText(`Nice try! The combined word is: ${correctVocab.fidel}`);
    }

    setTimeout(() => {
      if (qIdx < vocabularies.length - 1) {
        setQIdx((prev) => prev + 1);
      } else {
        setIsDone(true);
      }
    }, 1600);
  };

  const resetGame = () => {
    setQIdx(0);
    setScore(0);
    setIsDone(false);
  };

  if (!vocabularies || vocabularies.length === 0) return null;

  const correctVocab = vocabularies[qIdx];

  return (
    <div className="bg-gradient-to-br from-amber-50/20 to-amber-100/20 p-5 rounded-[28px] border border-amber-100 space-y-4 shadow-inner text-left">
      <div className="flex justify-between items-center pb-2 border-b">
        <strong className="text-xs uppercase font-extrabold text-amber-700 tracking-wider">
          🎧 Phonetic Audio Blender — Puzzle {qIdx + 1} of {vocabularies.length}
        </strong>
        <span className="text-xs font-black text-rose-600">Quest Points: +{score}</span>
      </div>

      {isDone ? (
        <div className="text-center py-10 space-y-4 bg-white border rounded-2xl p-6 shadow-sm">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
            🎓
          </div>
          <div>
            <h3 className="font-extrabold text-slate-950 text-base">Phonetic Blender Complete!</h3>
            <p className="text-stone-500 text-xs">Aural comprehension limits boosted! +100 gold stars earned! 🌟</p>
          </div>
          <button onClick={resetGame} className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black rounded-xl cursor-pointer">
            Restart Blender Game
          </button>
        </div>
      ) : (
        <div className="space-y-5 text-center">
          
          {/* Segments Audio Hub trigger */}
          <div className="bg-white p-5 rounded-2xl border max-w-sm mx-auto space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Tap button to listen to syllable segments:</span>
            <button
              onClick={playSegmentedAudio}
              disabled={isPlaying}
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-md transition-all scale-105 active:scale-95 text-xl cursor-pointer ${
                isPlaying 
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed animate-pulse" 
                  : "bg-amber-500 hover:bg-amber-600 text-white hover:rotate-3"
              }`}
            >
              <Volume2 />
            </button>
            <p className="text-xs text-slate-400 italic">"Listen carefully as the teacher segments the sounds..."</p>
          </div>

          {/* Options grid */}
          <div className="space-y-2">
            <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest block">WHICH WORD HAS THESE SOUNDS?</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {choices.map((choice) => {
                const isSelected = selectedId === choice.english;
                const isCorrect = choice.english === correctVocab.english;
                return (
                  <button
                    key={choice.english}
                    disabled={selectedId !== null}
                    onClick={() => handleChoiceClick(choice)}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      selectedId !== null
                        ? (isCorrect 
                            ? "bg-emerald-600 border-emerald-700 text-white shadow-md scale-102"
                            : isSelected 
                            ? "bg-rose-500 border-rose-700 text-white" 
                            : "bg-slate-50 border-slate-200 text-slate-300")
                        : "bg-white border-slate-200 hover:bg-amber-50/10 hover:border-amber-300 hover:shadow-md"
                    }`}
                  >
                    <span className="font-serif text-lg font-black">{choice.fidel}</span>
                    <span className="text-[10px] font-bold mt-1 opacity-70">({choice.english})</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// 4. WORD TO IMAGE (Level 1 / Beginners Option)
function GameWordToImage({ vocabularies, speakText }: { vocabularies: any[]; speakText: (text: string) => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [choices, setChoices] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (vocabularies && vocabularies[qIdx]) {
      const correctVocab = vocabularies[qIdx];
      const otherVocabs = vocabularies.filter((_, idx) => idx !== qIdx);
      const wrongOptions = otherVocabs.sort(() => Math.random() - 0.5).slice(0, 2);

      const pool = [correctVocab, ...wrongOptions].sort(() => Math.random() - 0.5);
      setChoices(pool);
      setSelectedId(null);
    }
  }, [vocabularies, qIdx]);

  const handleChoiceClick = (vocabItem: any) => {
    if (selectedId !== null) return;
    setSelectedId(vocabItem.english);

    const correctVocab = vocabularies[qIdx];
    if (vocabItem.english === correctVocab.english) {
      setScore((prev) => prev + 25);
      speakText(`Spot on! This matches the picture perfectly!`);
    } else {
      speakText(`Almost! Try to match the next picture`);
    }

    setTimeout(() => {
      if (qIdx < vocabularies.length - 1) {
        setQIdx((prev) => prev + 1);
      } else {
        setIsDone(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setQIdx(0);
    setScore(0);
    setIsDone(false);
  };

  if (!vocabularies || vocabularies.length === 0) return null;

  const correctVocab = vocabularies[qIdx];

  return (
    <div className="bg-gradient-to-br from-cyan-50/20 to-cyan-100/20 p-5 rounded-[28px] border border-cyan-100 space-y-4 shadow-inner text-left">
      <div className="flex justify-between items-center pb-2 border-b">
        <strong className="text-xs uppercase font-extrabold text-cyan-700 tracking-wider">
          🖼️ Word to Image Quest — Match {qIdx + 1} of {vocabularies.length}
        </strong>
        <span className="text-xs font-black text-rose-600">Points Gained: +{score}</span>
      </div>

      {isDone ? (
        <div className="text-center py-10 space-y-4 bg-white border rounded-2xl p-6 shadow-sm">
          <div className="w-16 h-16 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
            🏆
          </div>
          <div>
            <h3 className="font-extrabold text-slate-950 text-base">Word matchers Complete!</h3>
            <p className="text-stone-500 text-xs">You matched all characters to visual guides! Star Badge awarded! 🏆</p>
          </div>
          <button onClick={resetGame} className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black rounded-xl cursor-pointer">
            Play Word Match Again
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-center">
          
          {/* Main Flash Word Panel */}
          <div className="bg-white p-5 rounded-3xl border-2 border-cyan-100 max-w-sm mx-auto shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Pronounce and Match Picture:</span>
            <strong className="text-3xl font-serif font-black text-slate-900 tracking-wider block font-black">
              {correctVocab.fidel}
            </strong>
            <button 
              onClick={() => speakText(correctVocab.fidel)}
              className="px-4 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Volume2 size={12} />
              <span>Tap Pronunciation</span>
            </button>
          </div>

          {/* Cards options deck */}
          <div className="space-y-2">
            <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-widest">TAP MATCHING CORNER PICTURE:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {choices.map((choice) => {
                const isSelected = selectedId === choice.english;
                const isCorrect = choice.english === correctVocab.english;
                return (
                  <button
                    key={choice.english}
                    disabled={selectedId !== null}
                    onClick={() => handleChoiceClick(choice)}
                    className={`rounded-2xl border overflow-hidden p-1 bg-white hover:shadow-lg transition-all text-center cursor-pointer ${
                      selectedId !== null
                        ? (isCorrect 
                            ? "border-emerald-500 ring-4 ring-emerald-150 scale-102 bg-emerald-50/20" 
                            : isSelected 
                            ? "border-rose-500 ring-4 ring-rose-150 bg-rose-50/20" 
                            : "opacity-40 border-slate-100 grayscale bg-slate-50")
                        : "border-slate-205 hover:border-cyan-300"
                    }`}
                  >
                    <div className="h-28 w-full rounded-xl overflow-hidden pointer-events-none mb-2">
                      <SlideImage fidelKey={choice.fidel} providedUrl={choice.imageUrl} />
                    </div>
                    <span className="text-xs font-black text-slate-900 block pb-1">
                      {choice.meaning.split("/")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// ----------------------------------------
// HOMEWORK SLIDE VIEW
// ----------------------------------------
function HomeworkSlideView({ slide, speakText }: { slide: HomeworkSlide; speakText: (text: string) => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left py-2">
      <div className="flex items-center gap-3 border-b-2 pb-4">
        <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl shadow-sm">
          <BookOpen size={24} className="animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase bg-amber-50 text-amber-800 border border-amber-100 px-2 py-0.5 rounded-md inline-block">Post-Class Challenge</span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-0.5">{slide.heading}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Quest List */}
        <div className="md:col-span-7 space-y-3">
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">My Independent Target Quests:</p>
          <div className="space-y-2.5">
            {slide.tasks.map((task, i) => (
              <div 
                key={i} 
                className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-150 shadow-sm hover:border-amber-300 hover:bg-amber-50/10 transition-all duration-150"
              >
                <div className="w-7 h-7 bg-amber-100 font-extrabold font-mono text-[13px] text-amber-900 flex items-center justify-center rounded-xl shrink-0">
                  📄
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase font-black tracking-widest text-amber-700">Practice Goal {i + 1}</span>
                  <p className="text-slate-800 text-xs md:text-sm font-semibold leading-relaxed">
                    {task}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quest portal credits instructions */}
        <div className="md:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white p-5 rounded-[28px] border-2 border-slate-800 flex flex-col justify-between min-h-[250px] shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-amber-400">
              <StarIcon size={16} className="animate-spin" />
              <strong className="text-[10px] font-black uppercase tracking-widest">EXP Credits Reward Matrix</strong>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-black">How to Submit Homework:</h4>
              <p className="text-slate-450 text-[11px] leading-relaxed">
                Take a photograph of your colored door hanger greeting card, or record a nice voice note saying Hello to your tutor!
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 p-3 rounded-xl">
              <span className="text-[9px] uppercase font-black text-amber-400 block tracking-wider">TIPS FOR HOMEWORK SUCCESS:</span>
              <p className="text-[10px] text-slate-200 mt-1 leading-normal font-sans">
                {slide.submissionTip}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase">
            <span>📚 independent quest</span>
            <span className="text-amber-400">+50 Coins Gained</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParentInvolvementSlideView({ slide, speakText }: { slide: ParentInvolvementSlide; speakText: (text: string) => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left py-2">
      <div className="flex items-center gap-3 border-b-2 pb-4">
        <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl shadow-sm">
          <Heart size={24} className="fill-emerald-450 text-emerald-700 animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-md inline-block">Family Bonding Rituals</span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-0.5">{slide.heading}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        <div className="space-y-3.5">
          <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-1">
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Coactive Bonding Goal:</span>
            <p className="text-slate-800 text-xs md:text-sm font-semibold leading-relaxed font-sans text-left">
              🗣️ "{slide.goal}"
            </p>
          </div>

          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest pt-1 block">Simple Routines for Tonight:</p>
          <div className="space-y-2">
            {slide.activities.map((act, idx) => (
              <div key={idx} className="bg-white hover:bg-emerald-50/10 hover:border-emerald-250 p-4 border border-slate-150 shadow-sm rounded-xl space-y-1">
                <span className="text-[9px] uppercase font-black text-emerald-600 block tracking-wider">Traditional Routine {idx + 1}</span>
                <p className="text-slate-700 text-xs leading-relaxed font-semibold">
                  {act}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-[28px] border border-slate-850 flex flex-col justify-between min-h-[220px] shadow-lg relative">
          <div className="space-y-4">
            <div className="flex items-center gap-1 text-emerald-400">
              <Sparkles size={14} />
              <strong className="text-[10px] font-black uppercase tracking-widest">The Cultural Narrative connection</strong>
            </div>

            <p className="text-slate-200 text-xs leading-relaxed font-medium">
              In Ethiopia, coffee ceremonies (Buna) and shared family meals (Gursha) are beautiful gathering spaces. Washing hands in respect before eating, and greeting elders with a humble head bow, are ancient acts of social love you are sharing with your child tonight!
            </p>

            <div className="bg-slate-800 border border-slate-705 p-3.5 rounded-2xl flex items-center justify-between text-xs font-black">
              <span className="text-slate-220">👨‍👩‍👧 Family Star EXP Badge</span>
              <span className="text-emerald-400">+100 EXP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TutorGuidanceSlideView({ slide, speakText }: { slide: TutorGuidanceSlide; speakText: (text: string) => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left py-2">
      <div className="flex items-center gap-3 border-b-2 pb-4">
        <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl shadow-sm">
          <Award size={24} className="animate-spin duration-5000" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase bg-indigo-50 text-indigo-800 border border-indigo-100 px-2 py-0.5 rounded-md inline-block">Professional Educator Board</span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-0.5">{slide.heading}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        
        {/* Pacing guide card */}
        <div className="bg-gradient-to-br from-indigo-50/20 to-indigo-100/20 p-5 rounded-[28px] border border-indigo-100/80 shadow-md space-y-3 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center gap-1 text-indigo-800">
              <Activity size={14} />
              <strong className="text-[10px] font-black uppercase tracking-widest">50-Minute Session Pacing Roadmap:</strong>
            </div>
            <div className="space-y-2">
              {slide.pacingTips.map((tip, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <span className="text-indigo-600 font-bold text-xs mt-0.5">⏱️</span>
                  <p className="text-slate-700 text-xs font-semibold leading-relaxed">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-bold border-t pt-2 uppercase tracking-wide">Adjust based on target child's active interest level</p>
        </div>

        {/* Troubleshooting coaching card */}
        <div className="bg-slate-900 text-white p-5 rounded-[28px] border border-slate-800 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-rose-400">
              <ShieldAlert size={15} />
              <strong className="text-[10px] font-black uppercase tracking-widest">Phonics Troubleshooting Tips:</strong>
            </div>
            
            <div className="space-y-2.5 pt-1.5">
              {slide.troubleshootingTips.map((tip, i) => (
                <div key={i} className="p-3 bg-slate-800 border border-slate-700 rounded-xl flex gap-2">
                  <span className="text-md">💡</span>
                  <p className="text-slate-200 text-xs leading-relaxed font-semibold">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-bold border-t border-slate-800 pt-2 flex justify-between">
            <span>📝 Private Teacher Console Guide</span>
            <span className="text-indigo-400">Abyssinia Admin Portal</span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------
// PROGRESS ASSESSMENT MINI QUIZ
// ----------------------------------------
function ProgressAssessmentSlideView({ slide, speakText }: { slide: ProgressAssessmentSlide; speakText: (text: string) => void }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [isAnsSubmitted, setIsAnsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    resetQuiz();
  }, [slide]);

  const resetQuiz = () => {
    setQIdx(0);
    setSelectedAns(null);
    setIsAnsSubmitted(false);
    setScore(0);
    setQuizDone(false);
  };

  const handleOptionClick = (idx: number) => {
    if (isAnsSubmitted) return;
    setSelectedAns(idx);
  };

  const submitAnswer = () => {
    if (selectedAns === null || isAnsSubmitted) return;
    setIsAnsSubmitted(true);
    const correctIdx = slide.questions[qIdx].correctAnswerIndex;
    
    if (selectedAns === correctIdx) {
      setScore((prev) => prev + 1);
      speakText("Perfect answer! Golden star unlocked.");
    } else {
      speakText("Not quite correct, check out the explanation.");
    }
  };

  const nextQuestion = () => {
    if (qIdx < slide.questions.length - 1) {
      setQIdx((prev) => prev + 1);
      setSelectedAns(null);
      setIsAnsSubmitted(false);
    } else {
      setQuizDone(true);
    }
  };

  const currentQuestion = slide.questions[qIdx];
  const totalQuestions = slide.questions.length;

  return (
    <div className="max-w-4xl mx-auto space-y-5 text-left py-1">
      <div className="flex justify-between items-center border-b pb-3.5">
        <div>
          <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full inline-block">
            🌟 Lesson Assessment Quiz
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1">{slide.heading}</h1>
        </div>
        <div className="bg-slate-50 border px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shrink-0">
          🔋 Score: {score}/{totalQuestions} Correct
        </div>
      </div>

      {quizDone ? (
        <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-200 bg-white shadow-md p-6 rounded-2xl border border-indigo-100">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-3xl mx-auto shadow-md">
            🏅
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-base">Assessment Completed!</h3>
            <p className="text-stone-500 text-xs">
              You correctly solved {score} out of {totalQuestions} questions. You got {Math.round((score / totalQuestions) * 100)}%!
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[...Array(score)].map((_, i) => (
              <Star key={i} className="fill-amber-400 text-amber-500 animate-bounce duration-500" size={24} />
            ))}
          </div>

          <div className="pt-2">
            <button 
              type="button" 
              onClick={resetQuiz} 
              className="px-6 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
            >
              Take Assessment Again
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* Question & Options Frame */}
          <div className="md:col-span-8 space-y-4 flex flex-col justify-start">
            <div className="bg-slate-50 border p-5 rounded-[24px] space-y-3.5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono block">Question {qIdx + 1} of {totalQuestions}</span>
              <strong className="text-base md:text-lg font-black block leading-snug">
                {currentQuestion.questionText}
              </strong>
            </div>

            <div className="space-y-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAns === idx;
                const isCorrect = idx === currentQuestion.correctAnswerIndex;
                
                let optionStyle = "bg-white border-slate-150 hover:bg-indigo-50/10 hover:border-indigo-200 text-slate-800";
                if (isAnsSubmitted) {
                  if (isCorrect) {
                     optionStyle = "bg-emerald-500 text-white border-emerald-600 scale-102 font-black shadow-md flex items-center gap-1";
                  } else if (isSelected) {
                     optionStyle = "bg-red-500 text-white border-red-650 opacity-90 scale-98";
                  } else {
                     optionStyle = "bg-slate-50 text-slate-350 border-slate-100 opacity-50 scale-95";
                  }
                } else if (isSelected) {
                  optionStyle = "bg-indigo-50 border-indigo-405 ring-2 ring-indigo-200 font-black text-indigo-700 scale-101";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full text-left p-4 rounded-2xl border font-bold text-xs md:text-sm shadow-sm transition-all duration-180 flex items-center justify-between cursor-pointer ${optionStyle}`}
                  >
                    <span>{idx + 1}. {option}</span>
                    {isSelected && !isAnsSubmitted && <CheckCircle2 size={16} className="text-indigo-600" />}
                    {isAnsSubmitted && isCorrect && <CheckCircle2 size={16} className="text-white" />}
                  </button>
                );
              })}
            </div>

            {/* Assessment triggers button */}
            <div className="pt-2 flex justify-end">
              {!isAnsSubmitted ? (
                <button
                  type="button"
                  disabled={selectedAns === null}
                  onClick={submitAnswer}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs uppercase font-black tracking-widest rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Verify Selection Choice
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextQuestion}
                  className="px-6 py-2.5 bg-slate-950 hover:bg-slate-900 border text-white text-xs uppercase font-black tracking-widest rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1 cursor-pointer"
                >
                  <span>{qIdx < totalQuestions - 1 ? "Next Question" : "View Final Score Report"}</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Explanation panel */}
          <div className="md:col-span-4 flex flex-col justify-start">
            <div className="bg-slate-900 text-white p-5 rounded-[28px] border border-slate-800 flex-1 flex flex-col justify-between min-h-[220px] shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-indigo-400">
                  <Info size={14} />
                  <strong className="text-[10px] font-black uppercase tracking-widest">Coached Expert Explanation</strong>
                </div>

                {isAnsSubmitted ? (
                  <div className="space-y-2 animate-in fade-in duration-150">
                    <span className="text-[9px] uppercase font-black tracking-wider text-amber-400">Quiz Feed:</span>
                    <p className="text-slate-200 text-xs font-semibold leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 py-4 text-center text-slate-450">
                    <p className="text-xs font-semibold">Verify your option selection to receive instant explanation coach notes here!</p>
                    <div className="text-lg animate-bounce pt-2">🎯</div>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-500 font-bold uppercase">
                <span>🔔 Interactive quiz matrix</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

function ConclusionSlideView({ slide, speakText, onReset, onClose }: { slide: ConclusionSlide; speakText: (text: string) => void; onReset: () => void; onClose: () => void }) {
  return (
    <div className="text-center max-w-lg mx-auto space-y-6 py-4 animate-in zoom-in-95 duration-200">
      <div className="w-20 h-20 bg-gradient-to-tr from-emerald-400 to-emerald-600 text-white rounded-[24px] flex items-center justify-center shadow-lg shadow-emerald-200 mx-auto animate-bounce duration-3000">
        <Award size={40} className="text-white" />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full inline-block">
          Meraf Greetings complete!
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          {slide.heading}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 leading-normal font-sans">
          {slide.subheading}
        </p>
      </div>

      {/* Up next presentation */}
      <div className="bg-indigo-50/50 p-4 border border-indigo-100 rounded-2xl text-center space-y-1">
        <span className="text-[9px] uppercase font-black tracking-wider text-indigo-600 block">Up Next in Your Syllabus Model:</span>
        <strong className="text-xs font-black block text-slate-900">
          {slide.nextLesson}
        </strong>
      </div>

      <div className="grid grid-cols-2 gap-3.5 text-center">
        <div className="bg-slate-50 border p-3 rounded-2xl">
          <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Lesson Code Mastery</span>
          <strong className="text-xs md:text-sm font-black text-slate-800">100% Correct</strong>
        </div>
        <div className="bg-slate-50 border p-3 rounded-2xl">
          <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Stars Earned</span>
          <strong className="text-xs md:text-sm font-black text-emerald-600">3 Golden Stars 🌟</strong>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
        <button
          type="button"
          onClick={onReset}
          className="px-5 py-2.5 border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50/20 rounded-2xl text-[10px] uppercase font-black tracking-widest cursor-pointer transition-all flex items-center justify-center gap-1 bg-white"
        >
          <RotateCcw size={12} />
          <span>Replay Lesson</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Finish greetings core session review"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] uppercase font-black tracking-widest cursor-pointer transition-all shadow-md active:scale-97"
        >
          Finish Greetings Module
        </button>
      </div>
    </div>
  );
}
