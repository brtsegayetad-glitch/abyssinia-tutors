import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, Loader2, Globe, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { captureLead, getTutorsWithAvailability, scheduleTrial } from '../services/dataService';

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

export default function BookingPage() {
  const { user, signUpWithEmail, signInWithEmail, signInWithGoogle } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState('');
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
      const result = await captureLead({
        ...leadPayload,
        childName: childNames,
        childAge: mainAge,
        children: cleanedChildren
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
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[40px] p-12 text-center shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Trial Request Received!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Ameseginalehu! We've received your request for <strong>{children.map(c => c.name).filter(Boolean).join(' & ') || 'your children'}</strong>. Our administrator will contact you via WhatsApp or email within 24 hours to assign a tutor and schedule the session.
          </p>
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/')}
              className="btn-primary w-full"
            >
              Back to Home
            </button>
            <p className="text-xs text-gray-400">You'll receive a confirmation email shortly.</p>
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
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-primary font-serif text-xl font-bold">A</span>
          </div>
          <span className="font-serif text-xl font-bold text-white tracking-tight">Abyssinia Tutors</span>
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
          <Link to="/" className="md:hidden flex items-center gap-2 text-primary mb-8">
            <ChevronLeft size={20} />
            <span className="font-medium text-sm">Back</span>
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">Book a Free Trial Session</h1>
            <p className="text-gray-500">Provide 3 time options that work for you, and we'll match you with a tutor.</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                // Set default/placeholder so empty submission handles cleanly
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
    </div>
  );
}
