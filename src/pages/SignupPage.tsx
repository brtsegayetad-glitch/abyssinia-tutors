import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Loader2, Lock, Mail, User, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function SignupPage() {
  const { user, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract from URL query parameters
  const emailParam = searchParams.get('email') || '';
  const nameParam = searchParams.get('name') || '';

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill fields on mount or parameter changes
  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
    if (nameParam) {
      setFullName(nameParam);
    }
  }, [emailParam, nameParam]);

  // If already authenticated, redirect to appropriate role portal
  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Create user using our hybrid custom portal creator
      const registered = await signUpWithEmail(email, password, fullName);
      console.log("Parent registered successfully and profile metadata stored in Firestore.", registered);
      const role = registered?.role || 'parent';
      navigate(`/${role}`);
    } catch (err: any) {
      console.error("Signup failed:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError('An account already exists with this email address. Please sign in instead.');
      } else {
        setError(err.message || 'Failed to complete registration. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex md:items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left: Brand/Context Info */}
        <div className="md:w-1/2 bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <Link to="/" className="flex items-center gap-2 relative z-10">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-primary font-serif text-2xl font-bold">A</span>
            </div>
            <span className="font-serif text-2xl font-bold text-white tracking-tight">Abyssinia Tutors</span>
          </Link>
          
          <div className="relative z-10 my-8">
            <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 bg-white/10 rounded-full text-secondary mb-4 inline-block">Step 2 of 2</span>
            <h1 className="text-4xl font-serif font-bold italic mb-6 leading-tight">Create your parent workspace.</h1>
            <p className="text-white/60 leading-relaxed">
              Complete your registration to access your private Parent Dashboard! Here you can track classes, manage student milestones, communicate with your tutor, and coordinate upcoming assessments.
            </p>
          </div>

          <div className="space-y-3 relative z-10 text-xs text-white/50 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-400" />
              <span>Free assessment request is recorded</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-400" />
              <span>Full private portal registration</span>
            </div>
          </div>
          
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Right: Registration Form */}
        <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-primary mb-2">Portal Registration</h2>
            <p className="text-gray-500 text-sm">Please choose a password to complete your account registration.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all text-sm"
                  placeholder="Parent's Name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all text-sm"
                  placeholder="parent@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 text-primary font-bold">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-3.5 text-gray-400 animate-pulse" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all text-sm font-mono placeholder:font-sans"
                  placeholder="••••••••"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all text-sm font-mono placeholder:font-sans"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-3.5 font-bold text-sm shadow-lg shadow-primary/10 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Complete Account Creation'
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-gray-50 text-center">
            <p className="text-xs text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Sign in to Portal
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
