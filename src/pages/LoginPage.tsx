import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, Globe, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  // Watch for user changes and navigate automatically
  useEffect(() => {
    if (user) {
      if (user.role) {
        navigate(`/${user.role}`);
      } else {
        navigate('/parent'); // Fallback default
      }
    }
  }, [user, navigate]);

  const handleQuickDemoLogin = async (role: 'parent' | 'tutor' | 'admin') => {
    setDemoLoading(role);
    setErrorMsg('');
    const demoEmail = `${role}-demo@selam.io`;
    const demoName = `Sample ${role.charAt(0).toUpperCase() + role.slice(1)}`;
    const pass = "password150";
    
    // Explicitly allow sandbox controls for this session
    localStorage.setItem('show_sandbox_controls', 'true');
    
    try {
      // First try signing in
      await signInWithEmail(demoEmail, pass);
    } catch (err) {
      // If sign in fails, automatically sign up a demo user
      try {
        await signUpWithEmail(demoEmail, pass, demoName);
      } catch (signUpErr: any) {
        setErrorMsg("Failed to launch Sandbox session: " + signUpErr.message);
        localStorage.removeItem('show_sandbox_controls');
      }
    } finally {
      setDemoLoading(null);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    localStorage.removeItem('show_sandbox_controls'); // Clean standard login
    try {
      await signInWithGoogle();
    } catch (error: any) {
      const errCode = error?.code || '';
      const errMsg = error?.message || '';
      if (
        errCode === 'auth/cancelled-popup-request' ||
        errCode === 'auth/popup-blocked' ||
        errCode === 'auth/popup-closed-by-user' ||
        errMsg.toLowerCase().includes('popup') ||
        errMsg.toLowerCase().includes('cancel')
      ) {
        console.warn("Login popup was blocked or cancelled in the sandbox iframe wrapper:", error);
        setErrorMsg("Google Sign-In popup was blocked or closed. Because this app runs inside an iframe-based editor, browsers often restrict authenticating popups. Tip: Click 'Open in New Tab' in the top right to use secure Google Auth, or use our Sandbox Quick-Access logins below to instantly explore roles!");
      } else {
        console.error("Login failed", error);
        setErrorMsg(errMsg || 'Google Sign-In failed. Please check your network and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setEmailLoading(true);
    
    // Clean flag unless they explicitly use a demo account to sign in manually
    if (!email.includes('demo')) {
      localStorage.removeItem('show_sandbox_controls');
    } else {
      localStorage.setItem('show_sandbox_controls', 'true');
    }
    
    try {
      await signInWithEmail(email, password);
    } catch (error: any) {
      console.error("Credentials login failed", error);
      setErrorMsg(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex md:items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left: Brand */}
        <div className="md:w-1/2 bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <Link to="/" className="flex items-center gap-2 relative z-10">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-primary font-serif text-2xl font-bold">A</span>
            </div>
            <span className="font-serif text-2xl font-bold text-white tracking-tight">Abyssinia Tutors</span>
          </Link>
          
          <div className="relative z-10">
            <h1 className="text-5xl font-serif font-bold italic mb-6 leading-tight">Welcome back to Heritage Learning.</h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Access your personalized learning portal to track progress, manage sessions, and connect with your tutor.
            </p>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=l${i}`} className="w-8 h-8 rounded-full border-2 border-primary" alt="user" />)}
            </div>
            <span className="text-sm text-white/40">Trusted by the global diaspora.</span>
          </div>
          
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Right: Login Content */}
        <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-primary mb-1">Portal Sign In</h2>
            <p className="text-gray-500 text-xs">Access your personalized Amharic learning dashboard.</p>
          </div>

          <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-2 mb-2 text-amber-800">
              <span className="text-sm">🧪</span>
              <span className="text-xs font-bold uppercase tracking-wider">Sandbox Demo Access</span>
            </div>
            <p className="text-[11px] text-amber-900/70 mb-3 leading-relaxed font-medium">
              Click any button below to instantly explore the real dashboards in 1-click Demo mode. Perfect for evaluation!
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(['parent', 'tutor', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  disabled={!!demoLoading}
                  onClick={() => handleQuickDemoLogin(r)}
                  className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold py-2 px-1.5 rounded-xl text-[10px] uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm flex flex-col items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {demoLoading === r ? (
                    <Loader2 size={12} className="animate-spin text-amber-600" />
                  ) : (
                    <span>{r === 'parent' ? '👦' : r === 'tutor' ? '👩‍🏫' : '🔑'}</span>
                  )}
                  <span className="text-[9px] font-bold tracking-tight text-slate-800 font-sans">{r}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <button 
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl hover:bg-surface transition-all shadow-sm font-bold text-gray-700"
            >
              <svg className="w-6 h-6" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.64,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.251-2.221,4.155-4.067,5.551l6.232,5.274C39.69,35.048,44,29.897,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              Sign in with Google
            </button>

            <div className="flex items-center gap-4 text-gray-300">
               <div className="h-px bg-gray-100 flex-1"></div>
               <span className="text-xs font-bold whitespace-nowrap">OR SIGN IN WITH PASSWORD</span>
               <div className="h-px bg-gray-100 flex-1"></div>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-[14px] border border-red-100 font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-3 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all text-sm"
                    placeholder="parent@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-3 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all text-sm font-mono placeholder:font-sans"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={emailLoading}
                className="w-full bg-primary hover:bg-opacity-95 text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {emailLoading ? <Loader2 size={16} className="animate-spin" /> : 'Portal Sign In'}
              </button>
            </form>

            <div className="flex items-center gap-4 text-gray-300">
               <div className="h-px bg-gray-100 flex-1"></div>
               <span className="text-xs font-bold whitespace-nowrap">AUTHORIZED PORTAL ONLY</span>
               <div className="h-px bg-gray-100 flex-1"></div>
            </div>

            <div className="p-4 bg-surface rounded-2xl border border-secondary/20 flex gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                <Lock size={18} />
              </div>
              <p className="text-xs text-gray-500 leading-tight">
                This is a secure gateway. Access is monitored and logged for security purposes. If you are a tutor or admin, please use your official credentials.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-50 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm text-gray-400">
            <p>
              New to Abyssinia? <Link to="/book-trial" className="text-primary font-bold hover:underline">Book a trial session</Link>
            </p>
            <span className="hidden sm:inline text-gray-200">|</span>
            <p>
              Create accounts <Link to="/signup" className="text-primary font-bold hover:underline">Sign up here</Link>
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      )}
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
