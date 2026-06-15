import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  CheckCircle2, 
  Loader2, 
  Globe, 
  Send, 
  Award, 
  Heart, 
  GraduationCap, 
  Video, 
  DollarSign, 
  Clock, 
  BookOpen, 
  Image, 
  Sparkles, 
  Check, 
  Flame,
  Camera,
  Upload
} from 'lucide-react';
import { cn } from '../lib/utils';
import { submitTutorApplication, createTutor, subscribeToSettings } from '../services/dataService';
import BrandLogo from '../components/BrandLogo';

const AVATAR_TEMPLATES = [
  {
    name: "Martha",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=260"
  },
  {
    name: "Eden",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=260"
  },
  {
    name: "Solomon",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=260"
  },
  {
    name: "Daniel",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=260"
  }
];

function normalizeYoutubeUrl(url: string) {
  if (!url) return '';
  const cleanUrl = url.trim();

  // Support YouTube shorts
  if (cleanUrl.includes('/shorts/')) {
    const parts = cleanUrl.split('/shorts/');
    if (parts.length > 1) {
      const idPart = parts[1].split(/[?&]/)[0];
      if (idPart.length >= 11) {
        return `https://www.youtube.com/embed/${idPart.substring(0, 11)}`;
      }
    }
  }

  if (cleanUrl.includes('/embed/')) {
    return cleanUrl.split('?')[0];
  }

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = cleanUrl.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return cleanUrl;
}

export default function BecomeTutorPage() {
  const navigate = useNavigate();
  
  const [logoUrl, setLogoUrl] = useState('/logo_option_one.png');
  const [academyName, setAcademyName] = useState('HabKids');

  useEffect(() => {
    const unsubscribe = subscribeToSettings((data) => {
      if (data) {
        if (data.activeLogoUrl) {
          setLogoUrl(data.activeLogoUrl);
        }
        if (data.academyName) {
          setAcademyName(data.academyName);
        }
      }
    });
    return () => unsubscribe();
  }, []);
  
  // Standard fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [timezone, setTimezone] = useState('EST (New York / Washington DC)');
  const [experience, setExperience] = useState('');
  const [expertise, setExpertise] = useState('Amharic');
  
  // Professional premium fields
  const [hourlyRate, setHourlyRate] = useState('25');
  const [yearsOfExperience, setYearsOfExperience] = useState('3-5 years');
  const [quote, setQuote] = useState('');
  const [detailedBio, setDetailedBio] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [targetAge, setTargetAge] = useState('All Children (Ages 6-12)');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_TEMPLATES[0].url);
  const [uploadedPhotoBase64, setUploadedPhotoBase64] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'placeholder' | 'url'>('upload');
  const [isCertified, setIsCertified] = useState(false);
  const [isCustomAvatar, setIsCustomAvatar] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Please select a portrait photo smaller than 2MB for optimized loading speed!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhotoBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Connection mapping - OFF by default to route through coordinator approval first!
  const [instantDemoOnboard, setInstantDemoOnboard] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorStatus('');

    // Field Validations
    if (!fullName.trim()) {
      setErrorStatus('Full name is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorStatus('Please enter a valid email address.');
      return;
    }
    if (!whatsapp.trim()) {
      setErrorStatus('WhatsApp phone number is required.');
      return;
    }
    if (!experience.trim()) {
      setErrorStatus('Please provide a short summary of your teaching experience.');
      return;
    }
    if (!detailedBio.trim()) {
      setErrorStatus('Please write teaching methodology or details for parents to review.');
      return;
    }
    if (!quote.trim()) {
      setErrorStatus('Please write a warm welcoming quote or greeting phrase (e.g. ሰላም ልጆች!).');
      return;
    }

    setIsSubmitting(true);
    try {
      const avatarToUse = uploadMethod === 'upload' && uploadedPhotoBase64
        ? uploadedPhotoBase64
        : (uploadMethod === 'url' && customAvatarUrl.trim()
          ? customAvatarUrl.trim()
          : selectedAvatar);

      const normalizedVideo = videoUrl.trim() 
        ? normalizeYoutubeUrl(videoUrl.trim()) 
        : "";

      // 1. Save standard structured application in tutor_applications collection for admin tracking
      const result = await submitTutorApplication({
        fullName,
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp.trim(),
        experience: experience.trim(),
        expertise,
        timezone,
        hourlyRate,
        yearsOfExperience,
        quote: quote.trim(),
        detailedBio: detailedBio.trim(),
        videoUrl: normalizedVideo,
        avatarUrl: avatarToUse,
        targetAge,
        instantDemoOnboard
      });

      if (!result.success) {
        setErrorStatus(result.error || 'Failed to submit application. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // 2. Connect directly to "Choose Tutors" page if Active Directory Sync is selected!
      if (instantDemoOnboard) {
        await createTutor({
          displayName: fullName,
          email: email.trim().toLowerCase(),
          expertise: expertise,
          bio: detailedBio.trim(),
          languages_taught: ['Amharic', 'English', 'Ge\'ez'],
          years_of_experience: yearsOfExperience === '10+ years' ? 10 : (yearsOfExperience === '5-10 years' ? 7 : (yearsOfExperience === '3-5 years' ? 4 : 2)),
          avatar: avatarToUse,
          videoUrl: normalizedVideo,
          rating: '5.0', // Certified stars!
          reviewsCount: '1',
          location: `Ethiopia / ${timezone.split(' ')[0]} Partner`,
          stats: 'Newly Approved • Active',
          quote: quote.trim(),
          ageSpecialty: targetAge
        });
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorStatus(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      {/* Navbar/Header */}
      <header className="bg-white border-b border-slate-100 py-5 px-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
              <BrandLogo 
                logoUrl={logoUrl} 
                className="w-full h-full"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary font-serif">{academyName}</span>
          </Link>
          
          <Link 
            to="/" 
            className="flex items-center gap-2 text-slate-650 hover:text-primary transition-colors text-sm font-bold"
          >
            <ChevronLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Requirements & Standard Information */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <div>
            <span className="px-3 py-1 bg-indigo-55 text-white text-[10px] font-black uppercase tracking-widest rounded-full inline-block mb-3 shadow-sm">
              አስተማሪ ይሁኑ • Join Staff
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-black text-[#2D3329] leading-tight">
              Bring language roots to <span className="text-indigo-65 font-bold">young minds</span>.
            </h1>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed font-sans">
              Help children in North America and Europe speak, understand, and read Amharic or Ge'ez. Share our rich cultural legacy with highly interactive, gamified lesson material.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center shrink-0 border border-indigo-100/30">
                <Heart size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-xs">Patience is Prime</h3>
                <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                  Diaspora youth are starting from scratch. We emphasize supportive speech loops, high encouragement, and games.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0 border border-amber-100/30">
                <Award size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-xs">Aesthetic Profiles</h3>
                <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                  Provide a clean professional portrait tagline and lesson introductory video. This makes booking selections warm and premium.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100/30">
                <GraduationCap size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-xs">Tutor Registry Sync</h3>
                <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                  Your submitted profile will automatically join our tutor directory, ready for parents to book trial runs in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Professional Form */}
        <div className="lg:col-span-8 bg-white rounded-[32px] border border-slate-100 shadow-xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="tutor-apply-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold font-serif text-slate-900">Professional Application</h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Fill in your portfolio details. Completed entries appear directly inside our selective parent bookings list!
                  </p>
                </div>

                {errorStatus && (
                  <div className="p-4 bg-rose-50 text-rose-700 text-xs rounded-2xl border border-rose-100 font-bold space-y-1">
                    <p className="font-sans">🚨 Submission Error:</p>
                    <p className="font-mono text-[11px] font-normal">{errorStatus}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Section 1: Core Contact */}
                  <div className="bg-slate-55/40 p-6 rounded-3xl border border-slate-100/60 space-y-5">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                      <Globe size={14} className="text-slate-400" />
                      1. Contact & Location
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Martha Hailu"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 tracking-tight"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. martha@heritage.academy"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 tracking-tight"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          WhatsApp Number
                        </label>
                        <input 
                          type="text" 
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="e.g. +251 911 234 567"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 font-mono"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Primary Timezone
                        </label>
                        <select 
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 cursor-pointer"
                        >
                          <option value="EST (New York / Washington DC)">EST (New York / DC)</option>
                          <option value="CST (Chicago)">CST (Chicago)</option>
                          <option value="PST (Los Angeles / Seattle)">PST (Los Angeles)</option>
                          <option value="GMT (London / UK)">GMT (London / UK)</option>
                          <option value="EAT (Addis Ababa)">EAT (Addis Ababa)</option>
                          <option value="Europe (Paris / Berlin)">Europe (Paris / Berlin)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Professional Qualifications */}
                  <div className="bg-slate-55/40 p-6 rounded-3xl border border-slate-100/60 space-y-5">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                      <Award size={14} className="text-slate-400" />
                      2. Tutor Credentials & Rate
                    </h3>

                    <div className="grid grid-cols-1 gap-5">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Primary Syllabus Specialization
                        </label>
                        <select 
                          value={expertise}
                          onChange={(e) => setExpertise(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 cursor-pointer"
                        >
                          <option value="Amharic">Amharic</option>
                          <option value="Ge'ez">Ge'ez</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Years of Language Teaching
                        </label>
                        <select 
                          value={yearsOfExperience}
                          onChange={(e) => setYearsOfExperience(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 cursor-pointer"
                        >
                          <option value="1-2 years">1-2 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5-10 years">5-10 years</option>
                          <option value="10+ years">10+ years</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                          <span>Hourly Rate Requirement (USD/hr)</span>
                          <span className="text-[9px] text-emerald-650 font-black font-mono">Suggested: $20 - $35</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono text-xs">$</span>
                          <input 
                            type="number" 
                            min="10" 
                            max="75"
                            required
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            placeholder="25"
                            className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-16 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 font-mono font-bold"
                          />
                          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold">USD</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 cursor-pointer hover:border-indigo-100 transition shadow-sm select-none">
                        <input 
                          type="checkbox" 
                          checked={isCertified}
                          onChange={(e) => setIsCertified(e.target.checked)}
                          className="w-4.5 h-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-55"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-800">I hold a certified teaching degree or language credentials</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Displays a distinctive "Certified Educator" ribbon badge on your public booking card.</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Section 3: Visual Marketing Card Profile */}
                  <div className="bg-slate-55/40 p-6 rounded-3xl border border-slate-100/60 space-y-5">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                      <Sparkles size={14} className="text-slate-400" />
                      3. Public Profile Portfolio Design
                    </h3>

                    <div className="space-y-4">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Portrait Profile Image Method
                      </label>
                      
                      {/* Photo Method Select Tabs */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-100/60 p-1.5 rounded-2xl border border-slate-200/50">
                        <button
                          type="button"
                          onClick={() => setUploadMethod('upload')}
                          className={cn(
                            "py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5",
                            uploadMethod === 'upload'
                              ? "bg-white text-indigo-700 shadow-sm"
                              : "text-slate-500 hover:text-slate-700 hover:bg-slate-50/50"
                          )}
                        >
                          <Camera size={13} />
                          Upload Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => setUploadMethod('placeholder')}
                          className={cn(
                            "py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5",
                            uploadMethod === 'placeholder'
                              ? "bg-white text-indigo-700 shadow-sm"
                              : "text-slate-500 hover:text-slate-700 hover:bg-slate-50/50"
                          )}
                        >
                          <Image size={13} />
                          Placeholders
                        </button>
                        <button
                          type="button"
                          onClick={() => setUploadMethod('url')}
                          className={cn(
                            "py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5",
                            uploadMethod === 'url'
                              ? "bg-white text-indigo-700 shadow-sm"
                              : "text-slate-500 hover:text-slate-700 hover:bg-slate-50/50"
                          )}
                        >
                          <Globe size={13} />
                          Custom URL
                        </button>
                      </div>

                      {/* Content Panels based on chosen method */}
                      {uploadMethod === 'upload' && (
                        <div className="space-y-4 animate-in fade-in duration-200">
                          {uploadedPhotoBase64 ? (
                            <div className="flex flex-col items-center gap-3 p-5 bg-white border border-slate-150 rounded-2xl">
                              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-50 shadow-md">
                                <img 
                                  src={uploadedPhotoBase64} 
                                  alt="Real-time upload preview" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="text-center">
                                <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                                  Live Image Ready!
                                </span>
                                <p className="text-[10px] text-slate-500 mt-1">This high-resolution file will render perfectly in our staff index.</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setUploadedPhotoBase64('')}
                                className="text-[10px] font-bold text-rose-500 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                              >
                                Try another picture
                              </button>
                            </div>
                          ) : (
                            <label className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-white p-6 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center group">
                              <input 
                                type="file" 
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden" 
                              />
                              <div className="w-10 h-10 bg-indigo-50 group-hover:bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 transition-colors">
                                <Upload size={18} />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-slate-800 block">Select Profile Portrait Photo</span>
                                <span className="text-[10px] text-slate-450 block mt-0.5">Supports PNG, JPG, or WEBP up to 2MB</span>
                              </div>
                            </label>
                          )}
                        </div>
                      )}

                      {uploadMethod === 'placeholder' && (
                        <div className="flex flex-wrap gap-4 items-center animate-in fade-in duration-200">
                          {AVATAR_TEMPLATES.map((avatar) => {
                            const isSelected = selectedAvatar === avatar.url;
                            return (
                              <button
                                key={avatar.name}
                                type="button"
                                onClick={() => {
                                  setSelectedAvatar(avatar.url);
                                }}
                                className={cn(
                                  "flex flex-col items-center gap-1.5 p-1.5 px-3.5 rounded-2xl border cursor-pointer transition-all",
                                  isSelected 
                                    ? "bg-indigo-50 border-indigo-55 text-indigo-700/90 font-bold scale-105"
                                    : "bg-white border-slate-100 hover:border-slate-200 text-slate-600"
                                )}
                              >
                                <img 
                                  src={avatar.url} 
                                  alt={avatar.name} 
                                  className="w-11 h-11 rounded-full object-cover border border-slate-100 shadow-sm"
                                  referrerPolicy="no-referrer"
                                />
                                <span className="text-[10px] font-semibold">{avatar.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {uploadMethod === 'url' && (
                        <div className="space-y-2 animate-in fade-in duration-200">
                          <input 
                            type="url"
                            value={customAvatarUrl}
                            onChange={(e) => setCustomAvatarUrl(e.target.value)}
                            placeholder="https://images.unsplash.com/your-custom-portrait.jpg"
                            className="w-full bg-white border border-slate-205 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/25 font-mono"
                          />
                          <p className="text-[9px] text-slate-400 leading-relaxed">Paste direct URL endpoints representing generic JPG/PNG web portrait photos.</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                        <span>Ato/Wro Welcome Quote Tagline</span>
                        <span className="text-[9px] text-slate-450 font-bold">Amharic Characters Preferred!</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        placeholder="e.g. ሰላም ልጆች! I cannot wait to explore early Ge'ez puzzles with you! Let's play together."
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 tracking-tight italic"
                      />
                      <p className="text-[9px] text-slate-400 mt-0.5">This greeting displays right inside the welcome speech box on your booking profile.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Short Summary of Experiences
                      </label>
                      <input 
                        type="text" 
                        required
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="e.g. Certified public school tutor with 4 years hosting diaspora speech camps"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Detailed Bio & Teaching Philosophy (Profile Paragraph)
                      </label>
                      <textarea 
                        required
                        value={detailedBio}
                        onChange={(e) => setDetailedBio(e.target.value)}
                        placeholder="Explain your approach to helping diaspora kids. For example, how you combine sound bubbles, gamified shape matches, and Amharic letter songs to build confidence..."
                        rows={4}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 leading-relaxed resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                        <span>YouTube Introductory Presentation Video link</span>
                        <span className="text-[9px] text-slate-400 font-medium">Standard or Shortened Links OK</span>
                      </label>
                      <div className="relative">
                        <Video size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="url" 
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                          className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 font-mono"
                        />
                      </div>
                      <p className="text-[9px] text-slate-400 mt-0.5">Please provide an intro clip presenting your background. Displays an interactive modal window for parents.</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform shadow-lg shadow-indigo-600/10 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Submitting Your Application...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Submit Professional Staff Application</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="tutor-apply-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center space-y-6"
              >
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100 shadow-inner">
                  <CheckCircle2 size={40} />
                </div>
                
                <div className="space-y-1">
                  <h2 className="text-3xl font-black font-serif text-slate-900 leading-tight">
                    Application Logged!
                  </h2>
                  <h3 className="text-lg font-bold font-serif text-emerald-700">
                    እናመሰግናለን (Thank You)
                  </h3>
                </div>
                
                <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
                  We've received your professional tutoring profile, <strong>{fullName}</strong>. Our coordination team will review your profile credentials and methodology. We will notify you via email/WhatsApp once approved!
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
                  <button 
                    onClick={() => navigate('/')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer flex-1"
                  >
                    Return Home
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-10 px-6 border-t border-slate-800 shrink-0 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium tracking-wide">
          <p>© 2026 HabKids. All pedagogical content is property of HabKids.</p>
        </div>
      </footer>
    </div>
  );
}
