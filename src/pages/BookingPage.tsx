import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, Loader2, Globe, Send, Play, Star, Video, X, Award, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { captureLead, getTutorsWithAvailability, scheduleTrial, subscribeToSettings } from '../services/dataService';
import BrandLogo from '../components/BrandLogo';

const schema = z.object({
  parentName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  whatsapp: z.string().min(8, 'Valid WhatsApp number is required'),
  childName: z.string().optional(),
  childAge: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  timezone: z.string().min(2, 'Timezone is required'),
  preferredTime: z.string().min(2, 'Preferred time is required'),
  preferredTime2: z.string().optional(),
  preferredTime3: z.string().optional(),
  learningGoal: z.string().min(10, 'Please tell us more about your goals'),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => !data.password || data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

function getEmbedUrl(url: string) {
  if (!url) return '';
  
  const cleanUrl = url.trim();
  
  // 1. YouTube Shorts support
  if (cleanUrl.includes('/shorts/')) {
    const parts = cleanUrl.split('/shorts/');
    if (parts.length > 1) {
      const idPart = parts[1].split(/[?&]/)[0];
      if (idPart.length >= 11) {
        return `https://www.youtube.com/embed/${idPart.substring(0, 11)}`;
      }
    }
  }

  // 2. Already formatted embed url
  if (cleanUrl.includes('/embed/')) {
    const base = cleanUrl.split('?')[0];
    return base;
  }

  // 3. Standard and short YouTube links
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = cleanUrl.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return cleanUrl;
}

export default function BookingPage() {
  const { user, signUpWithEmail, signInWithEmail, signInWithGoogle } = useAuth();
  
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState('');
  const [tutors, setTutors] = useState<any[]>([]);
  const [selectedTutorId, setSelectedTutorId] = useState<string>("auto-assign");
  const [videoModalTutor, setVideoModalTutor] = useState<any | null>(null);
  const navigate = useNavigate();

  const [children, setChildren] = useState<Array<{ id: string; name: string; age: string; subjects: string[] }>>([
    { id: Math.random().toString(), name: '', age: '', subjects: ['Amharic'] }
  ]);

  const addChild = () => {
    setChildren([...children, { id: Math.random().toString(), name: '', age: '', subjects: ['Amharic'] }]);
  };

  const removeChild = (id: string) => {
    if (children.length > 1) {
      setChildren(children.filter(c => c.id !== id));
    }
  };

  const updateChild = (id: string, field: 'name' | 'age' | 'subjects', value: any) => {
    setChildren(children.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      country: 'USA',
      timezone: 'EST (New York)',
    }
  });

  useEffect(() => {
    if (user) {
      setValue('parentName', user.fullName || '');
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  useEffect(() => {
    getTutorsWithAvailability().then((list) => {
      const dbList = (list as any[] || []).filter((t: any) => t.id !== 'preview-tutor-id');
      setTutors(dbList);
    }).catch(err => {
      console.error("Error loading tutors:", err);
    });
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setErrorStatus('');

      // Validation for each child in the dynamic list
      let valid = true;
      let errMsg = "";
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child.name.trim()) {
          errMsg = `Please enter a name for Child #${i + 1}.`;
          valid = false;
          break;
        }
        if (!child.age || Number(child.age) <= 0) {
          errMsg = `Please enter a valid age for ${child.name || `Child #${i + 1}`}.`;
          valid = false;
          break;
        }
        if (child.subjects.length === 0) {
          errMsg = `Please select at least one language subject (Amharic or Ge'ez) for ${child.name || `Child #${i + 1}`}.`;
          valid = false;
          break;
        }
      }

      if (!valid) {
        setErrorStatus(errMsg);
        setIsSubmitting(false);
        return;
      }
      
      // 1. Sign up and authenticate the parent if not logged in
      if (!user) {
        if (!data.password || data.password.length < 6) {
          setErrorStatus("Please choose a password with at least 6 characters.");
          setIsSubmitting(false);
          return;
        }
        try {
          await signUpWithEmail(data.email, data.password, data.parentName);
        } catch (signUpError: any) {
          const errMsg = signUpError.message || "";
          if (
            errMsg.toLowerCase().includes("exists") ||
            errMsg.toLowerCase().includes("already") ||
            signUpError.code === "auth/email-already-in-use"
          ) {
            // Already registered! Let's log them in automatically in-place
            try {
              await signInWithEmail(data.email, data.password);
            } catch (signInErr: any) {
              setErrorStatus(
                "This email address already has an account inside our system. We tried logging you in, but the password provided was incorrect. Please verify your password or reset it to proceed."
              );
              setIsSubmitting(false);
              return;
            }
          } else {
            setErrorStatus(errMsg || "An error occurred while creating your parent account.");
            setIsSubmitting(false);
            return;
          }
        }
      }

      // 2. Destructure passwords out of data safely before saving to Firestore leads collection
      const { password, confirmPassword, ...leadPayload } = data;

      const cleanedChildren = children.map(c => ({
        name: c.name.trim(),
        age: Number(c.age),
        subjects: c.subjects
      }));

      const childNames = cleanedChildren.map(c => c.name).join(', ');
      const mainAge = Number(cleanedChildren[0]?.age) || 0;

      // 3. Capture lead under their authenticated parent account context
      const chosenTutor = selectedTutorId === "auto-assign" ? null : tutors.find(t => t.id === selectedTutorId);
      const result = await captureLead({
        ...leadPayload,
        childName: childNames,
        childAge: mainAge,
        children: cleanedChildren,
        tutorId: selectedTutorId === "auto-assign" ? "" : selectedTutorId,
        tutorName: selectedTutorId === "auto-assign" ? "System Auto-Assigned" : (chosenTutor?.displayName || chosenTutor?.email || "Selected Tutor")
      });
      
      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorStatus("Booking was successful, but we had trouble starting your parent session. Please contact support.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setErrorStatus(error?.message || "Something went wrong during account creation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const chosenTutor = selectedTutorId === "auto-assign" 
      ? (tutors[0] || null)
      : (tutors.find(t => t.id === selectedTutorId) || null);

    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6 py-12">
        <div className="max-w-2xl w-full bg-white rounded-[40px] p-8 md:p-12 text-center shadow-xl border border-gray-100 space-y-8">
          <div>
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-3">Trial Request Received!</h2>
            <p className="text-gray-600 leading-relaxed max-w-lg mx-auto text-sm">
              Ameseginalehu! We've received your request for <strong>{children.map(c => c.name).filter(Boolean).join(' & ') || 'your children'}</strong>. Our administrator will contact you via WhatsApp or email within 24 hours to schedule the session.
            </p>
          </div>

          {/* Tutor Profile Block */}
          {chosenTutor && (
            <div className="bg-slate-50/80 rounded-[32px] p-6 md:p-8 text-left border border-slate-100 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/50 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full font-sans">
                    {selectedTutorId === "auto-assign" ? "System Class Matching Active" : "Requested Private Tutor"}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-primary mt-2">
                    {selectedTutorId === "auto-assign" ? "Matching Lead Tutor" : "Meet Your Tutor"}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold bg-white px-3 py-1 rounded-full border border-slate-100 self-start sm:self-center">
                  <Star size={12} className="fill-amber-500" />
                  <span>{chosenTutor.rating || "4.9"}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({chosenTutor.reviewsCount || "120"})</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                  <img
                    src={chosenTutor.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=260"}
                    alt={chosenTutor.displayName}
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>

                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      {chosenTutor.displayName}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      {chosenTutor.location || "Addis Ababa Native Speaker"}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {chosenTutor.bio}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-sans">Focus:</span>
                    <span className="text-[9px] font-sans font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg px-2.5 py-0.5">
                      {chosenTutor.specializedSyllabus || "Conversational Amharic • Level 1 Foundations"}
                    </span>
                  </div>
                </div>
              </div>

              {chosenTutor.quote && (
                <div className="bg-white border border-slate-100 p-4 rounded-2xl">
                  <p className="text-xs text-slate-500 font-medium italic relative font-sans leading-relaxed">
                    "{chosenTutor.quote}"
                  </p>
                </div>
              )}
              
              {chosenTutor.videoUrl && (
                <button
                  type="button"
                  onClick={() => setVideoModalTutor(chosenTutor)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-indigo-700 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm hover:border-slate-350"
                >
                  <Play size={12} className="fill-current text-indigo-700" />
                  <span>Watch Presentation Video Intro</span>
                </button>
              )}
            </div>
          )}

          <div className="space-y-4 pt-4">
            <button 
              onClick={() => navigate('/')}
              className="btn-primary w-full py-3.5"
            >
              Back to Home
            </button>
            <p className="text-xs text-slate-400">You'll receive a confirmation email shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface md:flex">
      {/* Left: Content */}
      <div className="hidden md:flex md:w-1/3 bg-primary p-12 flex-col justify-between items-start text-white sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
            <BrandLogo 
              logoUrl={logoUrl} 
              className="w-full h-full"
            />
          </div>
          <span className="font-serif text-xl font-bold text-white tracking-tight">{academyName}</span>
        </Link>
        
        <div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
            <Globe className="text-secondary" />
          </div>
          <h2 className="text-4xl font-serif font-bold mb-6 italic">Join our global community of proud diaspora families.</h2>
          <p className="text-white/60 leading-relaxed">
            Our assessment session is free, no credit card required. It's a risk-free way to see if our methodology works for your child.
          </p>
        </div>
        
        <div className="w-full">
           <div className="flex -space-x-2 mb-4">
              {[1, 2, 3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=b${i}`} className="w-8 h-8 rounded-full border border-primary" alt="parent" />)}
           </div>
           <p className="text-sm text-white/40">50+ trials booked this week</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 p-6 md:p-20 flex flex-col justify-center">
        <div className="max-w-xl mx-auto w-full">
          <div className="md:hidden flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2 text-primary">
              <ChevronLeft size={20} />
              <span className="font-medium text-sm">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2 matches-glow">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                <BrandLogo 
                  logoUrl={logoUrl} 
                  className="w-full h-full"
                />
              </div>
              <span className="font-serif text-xs font-black text-primary uppercase tracking-tight">{academyName}</span>
            </div>
          </div>

          <header className="mb-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">Book a Free Trial Session</h1>
            <p className="text-gray-500">Provide 3 time options that work for you, and we'll match you with a tutor.</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Hybrid Model Tutor Allocation Selection Block */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="p-1 px-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-black">⭐ Opening Choice</span>
                  Select Your Tutor Strategy (Hybrid Model)
                </h3>
                <span className="text-[10px] font-sans font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl">
                  🎉 Hybrid Matching Active
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Choose to select a specific native academic speaker or let Abyssinia automatically pair you with the best matching fit for your selected slot.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedTutorId("auto-assign")}
                  className={cn(
                    "p-5 rounded-[22px] border text-left transition-all cursor-pointer relative overflow-hidden",
                    selectedTutorId === "auto-assign"
                      ? "border-indigo-600 bg-indigo-50/10 shadow-sm ring-2 ring-indigo-600/15"
                      : "border-slate-100 bg-slate-50/40 hover:border-slate-300"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1 px-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-[10px] font-bold font-sans">🔍 Auto</span>
                    <p className="font-extrabold text-xs text-slate-955">Fully Auto-Assign</p>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal font-sans">
                    Fastest match. Highly optimized for parent's listed time zones. Our system allocates the top available educator matching your slot.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const firstTutor = tutors.find(t => t.id !== "auto-assign") || tutors[0];
                    setSelectedTutorId(firstTutor ? firstTutor.id : "auto-assign");
                  }}
                  className={cn(
                    "p-5 rounded-[22px] border text-left transition-all cursor-pointer relative overflow-hidden",
                    selectedTutorId !== "auto-assign"
                      ? "border-indigo-600 bg-indigo-50/10 shadow-sm ring-2 ring-indigo-600/15"
                      : "border-slate-100 bg-slate-50/40 hover:border-slate-300"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1 px-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold font-sans">👤 Choose</span>
                    <p className="font-extrabold text-xs text-slate-955">Parent-Selected Tutor</p>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal font-sans">
                    Review native academic counselors, filter specializations, and request a specific core tutor for your entire study track.
                  </p>
                </button>
              </div>

              {/* Specific tutor picker if manually selected or preferred */}
              {selectedTutorId !== "auto-assign" && (
                <div className="space-y-4 pt-2 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b pb-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Available Native HabKids
                    </p>
                    <span className="text-[9px] text-indigo-600 font-bold font-sans">100% Native Speakers</span>
                  </div>

                  {tutors.length === 0 ? (
                    <div className="p-6 border border-dashed border-slate-100 rounded-2xl bg-slate-50 text-center">
                      <p className="text-xs text-slate-400 font-medium font-sans">
                        No custom tutors listed in directory. Falling back to matching allocation.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {tutors.map((t) => {
                        const isSelected = selectedTutorId === t.id;
                        return (
                          <div
                            key={t.id}
                            className={cn(
                              "bg-white rounded-[24px] border transition-all overflow-hidden flex flex-col h-full relative group",
                              isSelected
                                ? "border-indigo-600 ring-2 ring-indigo-600/15 shadow-sm scale-[1.01]"
                                : "border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md"
                            )}
                          >
                            {/* Checkmark indicator */}
                            {isSelected && (
                              <div className="absolute top-2.5 right-2.5 bg-indigo-600 text-white p-0.5 rounded-full z-10 shadow-sm">
                                <CheckCircle2 size={12} className="fill-white text-indigo-600" />
                              </div>
                            )}

                            {/* Header info */}
                            <div className="p-4 flex gap-3 items-start border-b border-slate-50 bg-slate-50/20">
                              <div className="relative flex-shrink-0">
                                <img
                                  src={t.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=260"}
                                  alt={t.displayName || t.email}
                                  className="w-12 h-12 rounded-xl object-cover border border-slate-150 shadow-sm"
                                  referrerPolicy="no-referrer"
                                />
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                              </div>
                              <div className="space-y-0.5 min-w-0">
                                <h4 className="font-extrabold text-xs text-slate-900 truncate">
                                  {t.displayName || t.email}
                                </h4>
                                <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                                  <Star size={10} className="fill-amber-500" />
                                  <span>{t.rating || "4.9"}</span>
                                  <span className="text-[9px] text-slate-400 font-light">({t.reviewsCount || "120"})</span>
                                </div>
                                <p className="text-[8px] text-slate-400 font-bold tracking-wider uppercase truncate">
                                  {t.location || "Addis Ababa Native Speak"}
                                </p>
                              </div>
                            </div>

                            {/* Body contents */}
                            <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                              <div className="space-y-2">
                                <p className="text-[10px] text-slate-650 leading-relaxed italic line-clamp-3">
                                  "{t.bio || `Specialized native heritage speaker dedicated to helping children speak, read and write classical Amharic.`}"
                                </p>

                                <div className="space-y-0.5">
                                  <p className="text-[8px] font-bold text-slate-400 tracking-wider uppercase font-sans">Course Focus:</p>
                                  <span className="inline-block text-[9px] font-sans font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg px-2 py-0.5 truncate max-w-full">
                                    {t.specializedSyllabus || "Conversational Amharic • Level 1 Core Foundations"}
                                  </span>
                                </div>

                                {t.ageSpecialty && (
                                  <div className="space-y-0.5">
                                    <p className="text-[8px] font-bold text-slate-400 tracking-wider uppercase font-sans">Suited For:</p>
                                    <p className="text-[9px] text-slate-700 font-bold font-sans">{t.ageSpecialty}</p>
                                  </div>
                                )}
                              </div>

                              {/* Actions container inside the card */}
                              <div className="pt-2.5 border-t border-slate-50 flex gap-2 items-center">
                                {/* Watch intro video button */}
                                {t.videoUrl && t.videoUrl.trim() !== '' && (
                                  <button
                                    type="button"
                                    onClick={() => setVideoModalTutor(t)}
                                    className="flex items-center justify-center gap-1 px-2 py-1.5 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[9px] font-extrabold transition-all cursor-pointer flex-1"
                                  >
                                    <Play size={8} className="fill-current text-indigo-700" />
                                    <span>Video Intro</span>
                                  </button>
                                )}

                                {/* Choose Tutor Button */}
                                <button
                                  type="button"
                                  onClick={() => setSelectedTutorId(t.id)}
                                  className={cn(
                                    "px-2 py-1.5 rounded-lg text-[9px] font-black transition-all cursor-pointer flex-1 text-center border",
                                    isSelected
                                      ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-sm"
                                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                                  )}
                                >
                                  {isSelected ? "Select ✓" : "Choose"}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Full Name</label>
                <input {...register('parentName')} className={cn("input-field", errors.parentName && "border-red-500")} placeholder="e.g. Almaz Bekele" />
                {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Email</label>
                <input {...register('email')} className={cn("input-field", errors.email && "border-red-500")} placeholder="email@example.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
                <input {...register('whatsapp')} className={cn("input-field", errors.whatsapp && "border-red-500")} placeholder="+1 234 567 8900" />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Parent's Timezone</label>
                <input {...register('timezone')} className={cn("input-field", errors.timezone && "border-red-500")} placeholder="e.g. London (GMT) or New York (EST)" />
                {errors.timezone && <p className="text-red-500 text-xs mt-1">{errors.timezone.message}</p>}
              </div>
            </div>

            {/* Parent Account Secure Registration */}
            {!user ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#ebf3ff]/40 p-6 rounded-[28px] border border-blue-50/50">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Create Parent Dashboard Password</label>
                  <input {...register('password')} type="password" className={cn("input-field focus:border-blue-600 bg-white", errors.password && "border-red-500")} placeholder="••••••••" />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Confirm Password</label>
                  <input {...register('confirmPassword')} type="password" className={cn("input-field focus:border-blue-600 bg-white", errors.confirmPassword && "border-red-500")} placeholder="••••••••" />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>
                <p className="col-span-full text-xs text-blue-600/80 -mt-2">Creates your secure parent dashboard instantly to track tutors, lesson schedules, feedback notes, and child milestones.</p>
              </div>
            ) : (
              <div className="bg-[#ebf3ff]/40 p-6 rounded-[28px] border border-blue-50/50 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">✓</span>
                <div>
                  <h4 className="text-sm font-bold text-blue-900">Secure Parent Session Active</h4>
                  <p className="text-xs text-blue-700/80">Logged in as <span className="font-bold">{user.email}</span>. Your trial request will link automatically to your dashboard.</p>
                </div>
              </div>
            )}

            {errorStatus && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium">
                {errorStatus}
              </div>
            )}

            <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Globe size={16} className="text-primary" />
                Select 3 Preferred Trial Times (GMT/Your Timezone)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Option 1 (Gold)</label>
                  <input {...register('preferredTime')} className={cn("input-field", errors.preferredTime && "border-red-500")} placeholder="e.g. Saturday 10am" />
                  {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Option 2 (Silver)</label>
                  <input {...register('preferredTime2')} className="input-field" placeholder="e.g. Sunday 2pm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Option 3 (Bronze)</label>
                  <input {...register('preferredTime3')} className="input-field" placeholder="e.g. Monday 5pm" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Learning Motivation & Goals</label>
              <textarea 
                {...register('learningGoal')} 
                className={cn("input-field h-32 resize-none", errors.learningGoal && "border-red-500")} 
                placeholder="What do you want your child to achieve? (e.g. speak with grandparents, read Ge'ez, etc.)" 
              />
              {errors.learningGoal && <p className="text-red-500 text-xs mt-1">{errors.learningGoal.message}</p>}
            </div>

            {/* Dynamic Children / Subject Selection Section */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Child Registration</h3>
                  <p className="text-xs text-slate-400">Register all students who will be receiving tutoring under your account.</p>
                </div>
                <button
                  type="button"
                  onClick={addChild}
                  className="bg-primary/5 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>+ Add Another Child</span>
                </button>
              </div>

              <div className="space-y-6">
                {children.map((child, index) => (
                  <div key={child.id} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 space-y-4 relative animate-in fade-in duration-300">
                    {children.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChild(child.id)}
                        className="absolute top-4 right-4 text-xs font-bold text-red-500 hover:text-red-705 bg-red-50 px-2.5 py-1 rounded-xl cursor-pointer hover:bg-red-100/80 transition-colors"
                        title="Remove child"
                      >
                        ✕ Remove
                      </button>
                    )}
                    
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest">
                      👦 Student #{index + 1} Details
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child's Name</label>
                        <input
                          type="text"
                          value={child.name}
                          onChange={(e) => updateChild(child.id, 'name', e.target.value)}
                          className="input-field bg-white focus:border-primary"
                          placeholder="e.g. Samuel Bekele"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child's Age</label>
                        <input
                          type="number"
                          value={child.age}
                          onChange={(e) => updateChild(child.id, 'age', e.target.value)}
                          className="input-field bg-white focus:border-primary"
                          placeholder="e.g. 8"
                        />
                      </div>
                    </div>

                    {/* Language Subjects Picker */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Select Heritage Subject Courses for {child.name || `Student #${index + 1}`}
                        </label>
                        <p className="text-[10px] text-slate-400">You can enroll this student in one or both linguistic paths simultaneously.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            const current = child.subjects;
                            const newVal = current.includes('Amharic') 
                              ? current.filter(s => s !== 'Amharic') 
                              : [...current, 'Amharic'];
                            updateChild(child.id, 'subjects', newVal);
                          }}
                          className={cn(
                            "flex items-center justify-between p-3 px-4 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                            child.subjects.includes('Amharic')
                              ? "bg-primary/5 border-primary text-primary font-bold shadow-sm"
                              : "bg-white border-slate-200 text-slate-650 hover:border-slate-300"
                          )}
                        >
                          <div className="text-left">
                            <span className="block font-bold">Amharic Course</span>
                            <span className="text-[9px] opacity-70">አማርኛ (Amharic Language)</span>
                          </div>
                          {child.subjects.includes('Amharic') ? (
                            <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold">✓</span>
                          ) : (
                            <span className="w-5 h-5 border border-slate-300 rounded-full bg-white"></span>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const current = child.subjects;
                            const newVal = current.includes('Geez') 
                              ? current.filter(s => s !== 'Geez') 
                              : [...current, 'Geez'];
                            updateChild(child.id, 'subjects', newVal);
                          }}
                          className={cn(
                            "flex items-center justify-between p-3 px-4 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                            child.subjects.includes('Geez')
                              ? "bg-primary/5 border-primary text-primary font-bold shadow-sm"
                              : "bg-white border-slate-200 text-slate-650 hover:border-slate-300"
                          )}
                        >
                          <div className="text-left">
                            <span className="block font-bold">Ge'ez Course</span>
                            <span className="text-[9px] opacity-70">ግዕዝ (Ge'ez Script & History)</span>
                          </div>
                          {child.subjects.includes('Geez') ? (
                            <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold">✓</span>
                          ) : (
                            <span className="w-5 h-5 border border-slate-300 rounded-full bg-white"></span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary w-full py-4 text-lg mt-8 shadow-xl shadow-primary/20 flex items-center justify-center gap-2 animate-pulse"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <span>Confirm & Create Parent Dashboard</span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Immersive Tutor Introduction Profile Page Overlay */}
      {videoModalTutor && (() => {
        const isShorts = videoModalTutor.videoUrl && videoModalTutor.videoUrl.includes('/shorts/');
        return (
          <div 
            className="fixed inset-0 bg-slate-900 z-50 overflow-y-auto flex flex-col lg:flex-row animate-in fade-in duration-200"
            onClick={() => setVideoModalTutor(null)}
          >
            {/* Cinema Video Stage Column */}
            <div 
              className="lg:flex-1 bg-slate-950 flex flex-col justify-center items-center p-4 md:p-8 relative min-h-[50vh] lg:min-h-screen"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button"
                onClick={() => setVideoModalTutor(null)}
                className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold transition-all backdrop-blur-sm cursor-pointer border border-white/5"
              >
                <ChevronLeft size={16} />
                <span>Back to Booking</span>
              </button>

              <div className="w-full max-w-4xl flex flex-col justify-center items-center h-full">
                {/* Responsive Video Presentation Container */}
                <div className={cn(
                  "bg-slate-900 rounded-[28px] relative overflow-hidden shadow-2xl border border-white/10 w-full",
                  isShorts ? "aspect-[9/16] max-w-[340px]" : "aspect-video"
                )}>
                  <iframe
                    src={`${getEmbedUrl(videoModalTutor.videoUrl)}?autoplay=1&mute=0`}
                    title={`${videoModalTutor.displayName} Profile Video`}
                    className="w-full h-full border-0 absolute inset-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Floating Ethiopic Language Card Subtitle Overlay */}
                {videoModalTutor.quote && (
                  <div className="max-w-2xl text-center mt-6 px-4">
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest font-sans flex items-center justify-center gap-1.5 mb-2">
                      <Sparkles size={11} className="animate-pulse" /> Language Coach Motto
                    </p>
                    <p className="text-sm md:text-base text-slate-300 font-medium italic leading-relaxed">
                      "{videoModalTutor.quote}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Detail Desk Column */}
            <div 
              className="w-full lg:w-[440px] shrink-0 bg-white border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col h-full lg:h-screen lg:overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Profile Header Block */}
              <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img 
                    src={videoModalTutor.avatar} 
                    alt={videoModalTutor.displayName} 
                    className="w-24 h-24 rounded-[32px] object-cover border-4 border-white shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-ping"></span>
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif font-black text-slate-900 text-2xl">
                    {videoModalTutor.displayName}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-850 rounded-full text-[10px] font-black uppercase tracking-wider mb-3">
                  Verified Academic Partner
                </div>

                <p className="text-sm text-slate-500 max-w-sm font-sans leading-relaxed">
                  {videoModalTutor.bio || 'Native Amharic speaker dedicated to teaching children through immersive, gamified lessons.'}
                </p>
              </div>

              {/* Stats & Curriculum Detail Blocks */}
              <div className="p-6 md:p-8 space-y-6 flex-1">
                {/* High quality stat pills */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-150/10">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest font-sans">Student Rating</span>
                    <div className="flex items-center gap-1 mt-1 font-bold text-sm text-slate-800">
                      <Star size={14} className="fill-amber-500 text-amber-500" />
                      <span>{videoModalTutor.rating || '5.0'}</span>
                      <span className="text-slate-300 font-normal">({videoModalTutor.reviewsCount || '15'}+ reviews)</span>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-150/10">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest font-sans">Lessons Completed</span>
                    <span className="block text-sm font-bold text-slate-800 mt-1 font-sans">
                      {videoModalTutor.stats || 'Verified Tutor'}
                    </span>
                  </div>
                </div>

                {/* Specialties list */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest font-sans">Syllabus Focus & Methodology</span>
                    <div className="flex flex-wrap gap-2">
                      {(videoModalTutor.specializedSyllabus || videoModalTutor.expertise || 'Conversational Amharic').split('•').map((item: string, idx: number) => (
                        <span key={idx} className="bg-indigo-50 text-indigo-700 text-[11px] font-bold px-3 py-1.5 rounded-xl">
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest font-sans">Ideal Student Age Range</span>
                    <span className="block text-sm font-bold text-slate-900 font-sans">
                      {videoModalTutor.ageSpecialty || 'All children ages 6-12'}
                    </span>
                  </div>

                  {videoModalTutor.location && (
                    <div className="space-y-1">
                      <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest font-sans">Location / Operational Base</span>
                      <span className="block text-xs text-slate-700 font-medium font-sans">
                        {videoModalTutor.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom selection sticky panel */}
              <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex flex-col gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTutorId(videoModalTutor.id);
                    setVideoModalTutor(null);
                  }}
                  className={cn(
                    "w-full py-3.5 rounded-2xl text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-primary/10",
                    selectedTutorId === videoModalTutor.id 
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-100" 
                      : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-100"
                  )}
                >
                  <Award size={16} />
                  <span>{selectedTutorId === videoModalTutor.id ? "Target Selected" : `Select ${videoModalTutor.displayName}`}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVideoModalTutor(null)}
                  className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-650 border border-slate-200 rounded-2xl text-xs font-bold transition-all cursor-pointer text-center"
                >
                  Close & Keep Browsing
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
