import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, Loader2, Globe, Send, Award, Heart, GraduationCap, Languages } from 'lucide-react';
import { cn } from '../lib/utils';
import { submitTutorApplication } from '../services/dataService';

export default function BecomeTutorPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [timezone, setTimezone] = useState('EST (New York)');
  const [experience, setExperience] = useState('');
  const [expertise, setExpertise] = useState('Amharic for Beginners');
  const [motivation, setMotivation] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorStatus('');

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
      setErrorStatus('Please describe your teaching experience.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitTutorApplication({
        fullName,
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp.trim(),
        experience: experience.trim(),
        expertise,
        timezone,
      });

      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorStatus(result.error || 'Failed to submit application. Please try again.');
      }
    } catch (err: any) {
      setErrorStatus(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      {/* Navbar/Header */}
      <header className="bg-white border-b border-slate-100 py-6 px-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center font-bold text-white text-xl">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">Abyssinia Tutors</span>
          </Link>
          
          <Link 
            to="/" 
            className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors text-sm font-bold"
          >
            <ChevronLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Context, Requirements, and Motivations */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          <div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest border border-indigo-100 rounded-full inline-block mb-4">
              አስተማሪ ይሁኑ • Join Our Staff
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight tracking-tight">
              Teach Amharic to the <span className="text-secondary italic">Next Gen</span>.
            </h1>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Empower diaspora children living in the US, Canada, UK, and Europe to read, write, and speak our beautiful language. Connect them back to their historic heritage.
            </p>
          </div>

          {/* Cards of requirements */}
          <div className="space-y-4">
            <div className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
                <Heart size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Patience & Care</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Diaspora kids need a warm, patient environment. We prioritize highly engaging, interactive teaching.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                <Award size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Language Expertise</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Native power or high fluency in spelling/speaking both Amharic and Ge'ez alphabets correctly.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Consistent Schedulers</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Select key slots in EST/PST afternoons when families are off from standard day schools.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 bg-white rounded-[32px] border border-slate-100 shadow-xl p-8 md:p-12">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="tutor-apply-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-primary font-serif">Application Form</h2>
                  <p className="text-slate-400 text-xs mt-1">Provide your credentials below. Our academic coordinators will evaluate and schedule an interview.</p>
                </div>

                {errorStatus && (
                  <div className="mb-6 p-4 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-100 font-bold">
                    {errorStatus}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Martha Hailu"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 tracking-tight"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="martha@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 tracking-tight"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        WhatsApp Number
                      </label>
                      <input 
                        type="text" 
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="e.g. +251 911..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 tracking-tight font-mono"
                      />
                    </div>
                  </div>

                  {/* Expertise area */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Select Primary Expertise
                      </label>
                      <select 
                        value={expertise}
                        onChange={(e) => setExpertise(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 cursor-pointer"
                      >
                        <option value="Amharic alphabet for Beginners (Fidel)">Amharic alphabet for Beginners (Fidel)</option>
                        <option value="Advanced Amharic Conversational Dialogues">Advanced Amharic Conversational Dialogues</option>
                        <option value="Classical Ge'ez Script & Manuscripts">Classical Ge'ez Script & Manuscripts</option>
                        <option value="General Ethiopic Heritage Studies">General Ethiopic Heritage Studies</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Primary Timezone
                      </label>
                      <select 
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 cursor-pointer"
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

                  {/* Teaching Experience */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Describe Teaching Experience
                    </label>
                    <textarea 
                      required
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Share some details about how you have taught children, schools, private sessions or language institutes..."
                      rows={3}
                      className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform shadow-md cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit Application</span>
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
                className="py-8 text-center flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 border border-emerald-100 shadow-inner animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                
                <h2 className="text-3xl font-black font-serif text-slate-900 leading-tight">
                  Application Logged!
                </h2>
                <h3 className="text-xl font-bold font-serif text-emerald-700 mt-1">
                  እናመሰግናለን (Thank You)
                </h3>
                
                <p className="text-slate-500 text-sm max-w-sm mt-4 leading-relaxed font-semibold">
                  We have received your application, <strong>{fullName}</strong>. Our lead administrator will review your background and reach out to your email <strong>{email}</strong> or WhatsApp to schedule a live interview.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm">
                  <Link 
                    to="/" 
                    className="btn-primary py-3 px-6 rounded-xl text-center shadow-lg shadow-primary/10 w-full text-xs font-black uppercase tracking-widest"
                  >
                    Return Home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-10 px-6 border-t border-white/5 shrink-0 mt-12 bg-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <p>© 2026 Abyssinia Tutors. All pedagogical content is property of LinguKid.</p>
        </div>
      </footer>
    </div>
  );
}
