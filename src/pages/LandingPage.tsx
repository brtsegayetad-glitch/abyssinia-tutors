import { BookOpen, Star, Clock, Globe, MessageSquare, ChevronRight, Menu, X, LayoutDashboard, Linkedin, Facebook, Youtube, ChevronDown, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { subscribeToSettings } from '../services/dataService';

const faqs = [
  {
    question: "What teaching methods do Abyssinia Tutors use for diaspora children?",
    answer: "We employ a play-based, highly interactive curriculum tailored specifically for children aged 6–12. Our lessons connect kids to their heritage using localized storytelling, gamified Ge'ez alphabet exercises, sound-bubble matches, and digital flashcards that make learning feel natural and engaging."
  },
  {
    question: "How does the Ge'ez script curriculum adapt to different age groups?",
    answer: "We support two tailored learning pathways. For younger children and absolute beginners (Level 1), we focus on foundational shapes, sound recognition, and word-to-image association. For older or more advanced children (Level 2+), the curriculum ramps up to advanced word architectural puzzles, phonetic blending, sentence structure, and conversational confidence."
  },
  {
    question: "What is the scheduling system like? Can we customize hours?",
    answer: "Yes, absolute scheduling flexibility is at the core of our platform. Parents can access the scheduling panel to select trial sessions, set reoccurring weekly spots, view tutors' real-time calendars matching your system's timezone detector (e.g. Africa/Nairobi, EST, PST), and cancel or reschedule sessions with ease."
  },
  {
    question: "Who are the tutors at Abyssinia Tutors?",
    answer: "Our educators are highly trained, native-speaking veteran Amharic teachers experienced in instructing children in international and diaspora environments. They are patient, child-centric, and vetted to supply welcoming, secure, and encouraging spaces for interactive bilingual learning."
  },
  {
    question: "How long is each live tutoring session?",
    answer: "Regular sessions are typically 45 to 60 minutes long—the optimized window of attention for children in this age group. This duration is perfectly balanced with our interactive game suites, quizzes, and live vocal drills to maximize retention without causing screen fatigue."
  },
  {
    question: "Can parents track their child's language-learning progress?",
    answer: "Absolutely! Parents get detailed, comprehensive performance insights inside the Parent Portal. Following trial sessions and milestone assessments, you will receive exhaustive Evaluation Reports outlining their accuracy in specific letter families, spelling progress, and speech confidence."
  }
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { user, signOut } = useAuth();
  
  const [settings, setSettings] = useState({
    academyName: 'Abyssinia Tutors',
    founderName: 'Biruk Tadesse',
    founderLinkedIn: 'https://www.linkedin.com/in/biruk-tadesse-1750a3223/',
    welcomeMotto: 'Expanding heritage language tutoring and curriculum worldwide',
    instagramUrl: 'https://www.instagram.com/abyssiniatutors',
    whatsappUrl: 'https://wa.me/15550192834',
    facebookUrl: 'https://www.facebook.com/abyssiniatutors',
    youtubeUrl: 'https://www.youtube.com/@abyssiniatutors',
    activeLogoUrl: ''
  });

  useEffect(() => {
    const unsubscribe = subscribeToSettings((data) => {
      if (data) {
        const rawName = data.founderName || '';
        const rawLink = data.founderLinkedIn || '';
        setSettings({
          academyName: data.academyName || 'Abyssinia Tutors',
          founderName: (!rawName || rawName === 'Brtsegaye Tad') ? 'Biruk Tadesse' : rawName,
          founderLinkedIn: (!rawLink || rawLink.includes('brtsegayetad')) ? 'https://www.linkedin.com/in/biruk-tadesse-1750a3223/' : rawLink,
          welcomeMotto: data.welcomeMotto || 'Expanding heritage language tutoring and curriculum worldwide',
          instagramUrl: data.instagramUrl || 'https://www.instagram.com/abyssiniatutors',
          whatsappUrl: data.whatsappUrl || 'https://wa.me/15550192834',
          facebookUrl: data.facebookUrl || 'https://www.facebook.com/abyssiniatutors',
          youtubeUrl: data.youtubeUrl || 'https://www.youtube.com/@abyssiniatutors',
          activeLogoUrl: data.activeLogoUrl || ''
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            {settings.activeLogoUrl ? (
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1 shadow-inner border border-slate-100 shrink-0">
                <img 
                  src={settings.activeLogoUrl} 
                  alt="Abyssinia Tutors Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center font-bold text-white text-xl shrink-0">
                A
              </div>
            )}
            <span className="text-2xl font-bold tracking-tight text-primary">{settings.academyName}</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#why-us" className="text-slate-600 font-medium hover:text-primary transition-colors text-sm">Why us</a>
            <a href="#how-it-works" className="text-slate-600 font-medium hover:text-primary transition-colors text-sm">How it works</a>
            <Link to="/become-tutor" className="text-slate-600 font-medium hover:text-primary transition-colors text-sm font-bold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-100">Become a Tutor</Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link to={`/${user.role}`} className="flex items-center gap-2 btn-primary py-2 px-5 text-sm">
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    window.location.reload();
                  }}
                  className="text-slate-600 hover:text-rose-600 font-semibold transition-colors text-sm cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 font-medium hover:text-primary transition-colors text-sm">Portal Access</Link>
                <Link to="/book-trial" className="btn-primary py-2 px-6">Book Free Trial</Link>
              </>
            )}
          </div>

          <button className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl">
            <a href="#why-us" className="text-slate-600 font-bold" onClick={() => setIsMenuOpen(false)}>Why us</a>
            <a href="#how-it-works" className="text-slate-600 font-bold" onClick={() => setIsMenuOpen(false)}>How it works</a>
            <Link to="/become-tutor" className="text-indigo-650 font-bold" onClick={() => setIsMenuOpen(false)}>Become a Tutor</Link>
            {user ? (
              <>
                <Link to={`/${user.role}`} className="btn-primary w-full text-center py-2.5" onClick={() => setIsMenuOpen(false)}>
                  Go to {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    setIsMenuOpen(false);
                    window.location.reload();
                  }}
                  className="w-full text-center font-bold text-rose-600 bg-rose-50 rounded-xl py-2 cursor-pointer transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 font-bold" onClick={() => setIsMenuOpen(false)}>Portal Access</Link>
                <Link to="/book-trial" className="btn-primary w-full text-center py-2.5" onClick={() => setIsMenuOpen(false)}>Book Free Trial</Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              🇪🇹 Ethio-Diaspora Education
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-primary leading-[0.9] mb-8 tracking-tighter">
              Amharic for the <br /><span className="text-secondary italic">Next Gen</span>.
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg">
              Tailored Ge'ez script and Amharic language lessons for children living abroad. Modern, engaging pedagogy that connects them to their heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Link to={`/${user.role}`} className="btn-primary text-lg px-10">
                  Enter Your Portal
                  <ChevronRight size={20} />
                </Link>
              ) : (
                <Link to="/book-trial" className="btn-primary text-lg px-10">
                  Book Free Trial
                  <ChevronRight size={20} />
                </Link>
              )}
              <a href="#how-it-works" className="btn-secondary text-sm">
                How it works
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                ))}
              </div>
              <div className="text-xs">
                <div className="flex text-secondary mb-0.5">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-widest">500+ Families Joined</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] bg-white rounded-[40px] overflow-hidden relative shadow-sm border border-slate-100">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-[120px] font-black text-slate-50 select-none">ሀለሐ</div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1544717297-fa154daaf761?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover opacity-90 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                alt="Ethiopian child learning"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card p-6 max-w-[220px] -rotate-2">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-3">
                <Globe size={20} />
              </div>
              <p className="text-sm font-bold text-slate-900 leading-tight">Specifically designed for Diaspora children's cognitive needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-4">The Student Experience</p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Why Modern Families Choose Abyssinia</h2>
            <p className="text-slate-500 text-lg">Connecting heritage through patient, specialized pedagogy and native expertise.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <BookOpen />, 
                title: "Curriculum", 
                desc: "Proprietary course design specifically for non-native children in English-speaking societies."
              },
              { 
                icon: <Star />, 
                title: "Native Experts", 
                desc: "Every tutor is specialized in teaching children abroad with patience and cultural nuance."
              },
              { 
                icon: <Clock />, 
                title: "Flexible Hours", 
                desc: "Times optimized for USA (EST/PST), UK, and EU. We work around your child's local school life."
              },
              { 
                icon: <MessageSquare />, 
                title: "WhatsApp Flow", 
                desc: "Direct access to tutors and admins for easy updates, progress reports, and reminders."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-transparent hover:border-secondary/20 transition-all group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm group-hover:bg-secondary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="section-padding bg-surface/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-12">Three Steps to Fluency</h2>
              <div className="space-y-12">
                {[
                  { step: "01", title: "Book a Free Trial", desc: "Start with a 30-minute introductory session to meet your tutor and assess your child's level." },
                  { step: "02", title: "Personal Assessment", desc: "Receive a detailed report on child's current level and a recommended learning path." },
                  { step: "03", title: "Start Weekly Learning", desc: "Join our recurring weekly sessions (1, 2, or 3 times a week) and watch the progress happen." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <span className="text-5xl font-serif font-bold text-secondary-dark/30">{item.step}</span>
                    <div>
                      <h4 className="text-2xl font-serif font-bold text-primary mb-2">{item.title}</h4>
                      <p className="text-gray-600 mb-4">{item.desc}</p>
                      <div className="h-px bg-gray-200 w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 bg-primary p-12 rounded-[60px] text-white">
              <div className="aspect-square bg-white/10 rounded-[40px] p-8 flex flex-col justify-center gap-6 backdrop-blur-sm border border-white/10">
                <div className="bg-secondary text-primary w-fit px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2">Live Session</div>
                <h3 className="text-4xl font-serif font-bold italic leading-tight">Interactive, screen-shared digital classrooms.</h3>
                <p className="opacity-80 leading-relaxed">We use interactive games, digital flashcards, and live drawing to keep children engaged for the full duration of the lesson.</p>
                <Link to="/book-trial" className="btn-secondary w-full">Start trial now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="section-padding bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Founder Photo / Avatar badge */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-square w-full max-w-sm mx-auto bg-gradient-to-tr from-secondary/10 to-indigo-50 rounded-[32px] border border-slate-200/60 p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-secondary/10 rounded-full blur-2xl"></div>
                
                {/* Visual Amharic Stamp */}
                <div className="text-[100px] sm:text-[120px] font-black text-secondary/15 select-none absolute inset-0 flex items-center justify-center pointer-events-none">
                  ሰላም
                </div>

                <div className="flex justify-between items-start relative z-10">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md font-serif text-3xl text-primary font-bold">
                    🇪🇹
                  </div>
                  <a 
                    href={settings.founderLinkedIn} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#0a66c2] hover:bg-[#004182] text-white p-3 rounded-full shadow-md transition-all hover:scale-105 duration-300"
                    title="Connect on LinkedIn"
                  >
                    <Linkedin size={22} fill="currentColor" />
                  </a>
                </div>

                <div className="relative z-10 space-y-2 mt-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                     Platform Founder
                  </div>
                  <h3 className="text-3xl font-bold text-primary tracking-tight font-sans">
                    {settings.founderName}
                  </h3>
                  <p className="text-slate-500 font-mono text-xs font-bold uppercase tracking-wider">
                    Abyssinia Tutors Network
                  </p>
                </div>
              </div>
            </div>

            {/* Founder Message / Pitch / LinkedIn details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-secondary font-black text-xs uppercase tracking-widest block">FOUNDER'S VISION</span>
              <h2 className="text-4xl md:text-5xl font-sans lg:leading-[1.1] font-bold text-primary tracking-tight">
                Connecting Ethiopian Diaspora Children with their Heritage
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                As the Founder of <strong>{settings.academyName}</strong>, my mission is to deliver an authentic, patient, and modern online curriculum designed with the cultural nuances needed for diaspora families. By integrating interactive language apps and veteran instructional talent, we are preserving our beautiful Amharic language and Ge'ez script for future generations around the globe.
              </p>
              
              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <a 
                  href={settings.founderLinkedIn} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-3 bg-[#0a66c2]/95 hover:bg-[#0a66c2] text-white px-7 py-4 rounded-xl font-bold tracking-tight shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
                >
                  <Linkedin size={20} fill="currentColor" />
                  <span>Connect with the Founder on LinkedIn</span>
                </a>
                
                <span className="text-slate-400 text-xs sm:pt-0 font-medium">
                  Updated profile & project milestones live on LinkedIn
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="py-24 px-6 bg-slate-50/50 border-t border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-secondary font-black text-xs uppercase tracking-widest block">HELP & KNOWLEDGE BASE</span>
            <h2 className="text-4xl font-sans font-bold text-primary tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">
              Everything you need to know about our modern Amharic tutoring, Ge'ez script curriculum, and responsive scheduling system.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className={`bg-white rounded-[24px] border transition-all duration-300 ${
                    isOpen 
                      ? "border-primary/20 shadow-xl shadow-slate-100/40" 
                      : "border-slate-100 hover:border-slate-200 shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left px-8 py-6 flex items-center justify-between gap-6 cursor-pointer focus:outline-none group"
                  >
                    <span className="font-sans font-bold text-[17px] text-primary leading-snug group-hover:text-secondary transition-colors">
                      {faq.question}
                    </span>
                    <div className={`p-2 rounded-xl shrink-0 transition-all duration-300 ${
                      isOpen ? "bg-primary text-white animate-pulse" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                    }`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-8 pb-6 text-slate-500 leading-relaxed text-sm md:text-base border-t border-slate-50 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Trial Conversion Card */}
          <div className="mt-16 bg-gradient-to-br from-primary to-[#0f1d2e] text-white rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(circle_at_bottom_right,var(--color-secondary)_0%,transparent_60%)] opacity-30 select-none pointer-events-none" />
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold font-sans tracking-tight">Ready to see Abyssinia Tutors in action?</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Book a risk-free, complimentary 1-on-1 trial session. Our expert tutors will perform a quick milestone assessment and custom-tailor a learning pathway for your child.
              </p>
              <div className="pt-2">
                <Link 
                  to="/book-trial" 
                  className="inline-flex items-center gap-2 bg-secondary text-primary hover:bg-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
                >
                  <span>Book Complementary Trial</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-8">
              {settings.activeLogoUrl ? (
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1 shadow-inner shrink-0">
                  <img 
                    src={settings.activeLogoUrl} 
                    alt="Abyssinia Tutors Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-2xl">A</span>
                </div>
              )}
              <span className="text-2xl font-bold text-white tracking-tight">{settings.academyName}</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              Empowering the next generation of the Ethiopian diaspora to speak, read, and write Amharic through personalized online pedagogy.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h5 className="font-bold text-lg mb-6 text-white">Platform</h5>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-secondary transition-colors text-sm">Curriculum</a></li>
                <li><Link to="/become-tutor" className="hover:text-secondary transition-colors text-sm">Become a Tutor</Link></li>
                <li><a href="#" className="hover:text-secondary transition-colors text-sm">Diagnostic Test</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-lg mb-6 text-white">Portal Access</h5>
              <ul className="space-y-4 text-slate-400">
                <li><Link to="/login" className="hover:text-secondary transition-colors text-sm">Admin Dashboard</Link></li>
                <li><Link to="/login" className="hover:text-secondary transition-colors text-sm">Tutor Portal</Link></li>
                <li><Link to="/login" className="hover:text-secondary transition-colors text-sm">Parent Portal</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <p>© 2024 Abyssinia Tutors. All rights reserved.</p>
          <div className="flex flex-wrap gap-5 items-center justify-center">
            <a href={settings.founderLinkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 bg-[#0a66c2]/10 px-2.5 py-1 rounded-md text-slate-300">
              <Linkedin size={13} fill="currentColor" />
              <span>LinkedIn</span>
            </a>
            <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300">
              <Facebook size={13} />
              <span>Facebook</span>
            </a>
            <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-slate-300">Instagram</a>
            <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300">
              <Youtube size={13} />
              <span>YouTube</span>
            </a>
            <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-slate-300">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
