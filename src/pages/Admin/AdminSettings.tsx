import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  DollarSign, 
  Globe, 
  Mail, 
  Phone, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { subscribeToSettings, saveSettings } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';

export default function AdminSettings() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [formSettings, setFormSettings] = useState({
    standardPrice: 160,
    proPrice: 240,
    masteryPrice: 320,
    academyName: 'Abyssinia Tutors',
    supportEmail: 'info@abyssiniatutors.com',
    supportPhone: '+1 (555) 019-2834',
    welcomeMotto: 'Expanding heritage language tutoring and curriculum worldwide',
    founderName: 'Biruk Tadesse',
    founderLinkedIn: 'https://www.linkedin.com/in/biruk-tadesse-1750a3223/',
    instagramUrl: 'https://www.instagram.com/abyssiniatutors',
    whatsappUrl: 'https://wa.me/15550192834',
    facebookUrl: 'https://www.facebook.com/abyssiniatutors',
    youtubeUrl: 'https://www.youtube.com/@abyssiniatutors',
    activeLogoUrl: ''
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const unsubscribe = subscribeToSettings((data) => {
      if (data) {
        const rawName = data.founderName || '';
        const rawLink = data.founderLinkedIn || '';
        setFormSettings({
          standardPrice: typeof data.standardPrice === 'number' ? data.standardPrice : 160,
          proPrice: typeof data.proPrice === 'number' ? data.proPrice : 240,
          masteryPrice: typeof data.masteryPrice === 'number' ? data.masteryPrice : 320,
          academyName: data.academyName || 'Abyssinia Tutors',
          supportEmail: data.supportEmail || 'info@abyssiniatutors.com',
          supportPhone: data.supportPhone || '+1 (555) 019-2834',
          welcomeMotto: data.welcomeMotto || 'Expanding heritage language tutoring and curriculum worldwide',
          founderName: (!rawName || rawName === 'Brtsegaye Tad') ? 'Biruk Tadesse' : rawName,
          founderLinkedIn: (!rawLink || rawLink.includes('brtsegayetad')) ? 'https://www.linkedin.com/in/biruk-tadesse-1750a3223/' : rawLink,
          instagramUrl: data.instagramUrl || 'https://www.instagram.com/abyssiniatutors',
          whatsappUrl: data.whatsappUrl || 'https://wa.me/15550192834',
          facebookUrl: data.facebookUrl || 'https://www.facebook.com/abyssiniatutors',
          youtubeUrl: data.youtubeUrl || 'https://www.youtube.com/@abyssiniatutors',
          activeLogoUrl: data.activeLogoUrl || ''
        });
      }
      setLoading(false);
    }, () => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');

    const result = await saveSettings(formSettings);

    setIsSaving(false);
    if (result.success) {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      setSaveStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-sm font-medium">Syncing system settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300 text-left">
      <header className="border-b border-slate-150 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Settings size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-950 tracking-tight font-sans">
              {isAdmin ? "Global Platform Configuration" : "Abyssinia Tutors Platform Information"}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {isAdmin 
                ? "Adjust academy brand identity metrics, custom pricing tiers, and messaging constants of the system." 
                : "View brand contact metrics, subscription price limits, and academic parameters."}
            </p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSave} className="space-y-8" id="admin-settings-form">
        {!isAdmin && (
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl flex items-center gap-3 text-slate-600" id="settings-readonly-alert">
            <AlertCircle size={20} className="text-slate-550 shrink-0" />
            <div className="text-xs font-semibold">
              <strong>Read-Only Access:</strong> You are viewing global platform configurations. Modifying variables is restricted to Administrators only.
            </div>
          </div>
        )}

        {saveStatus === 'success' && (
          <div className="bg-emerald-50 border border-emerald-250 p-4 rounded-xl flex items-center gap-3 text-emerald-800 animate-in slide-in-from-top-4 duration-300" id="settings-success-alert">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
            <div className="text-xs font-semibold">
              Platform variables securely committed across Firestore state! Pricing cards are updated on parent flows dynamically.
            </div>
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center gap-3 text-rose-800 animate-in slide-in-from-top-4 duration-300" id="settings-error-alert">
            <AlertCircle size={20} className="text-rose-600 shrink-0" />
            <div className="text-xs font-semibold">
              Permission denied. Make sure you are authenticated with proper system permissions to commit variables.
            </div>
          </div>
        )}

        {/* Pricing Tiers Card */}
        <div className="bg-white rounded-2xl border border-slate-150/85 p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <DollarSign size={20} className="text-slate-400" />
                Subscription Pricing Tiers
              </h2>
              <p className="text-xs text-slate-400 mt-1">Modify monthly costs of active membership tiers. Propagates dynamically to clients.</p>
            </div>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">USD / Month</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Standard Cost */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Standard Plan Price</label>
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-sm font-semibold">
                  $
                </div>
                <input
                  required
                  disabled={!isAdmin}
                  type="number"
                  min="0"
                  value={formSettings.standardPrice}
                  onChange={(e) => setFormSettings({...formSettings, standardPrice: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-14 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none font-bold text-slate-800 disabled:opacity-75 disabled:cursor-not-allowed"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[10px] text-slate-400 font-bold uppercase">
                  /mo
                </div>
              </div>
              <p className="text-[9px] text-slate-400 font-medium">Standard 1-on-1 trial slot entry</p>
            </div>

            {/* Pro Cost */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Pro Plan Price</label>
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-sm font-semibold">
                  $
                </div>
                <input
                  required
                  disabled={!isAdmin}
                  type="number"
                  min="0"
                  value={formSettings.proPrice}
                  onChange={(e) => setFormSettings({...formSettings, proPrice: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-14 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none font-bold text-slate-800 disabled:opacity-75 disabled:cursor-not-allowed"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[10px] text-slate-400 font-bold uppercase">
                  /mo
                </div>
              </div>
              <p className="text-[9px] text-slate-400 font-medium">Flagship biweekly coaching choice</p>
            </div>

            {/* Mastery Cost */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Mastery Plan Price</label>
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-sm font-semibold">
                  $
                </div>
                <input
                  required
                  disabled={!isAdmin}
                  type="number"
                  min="0"
                  value={formSettings.masteryPrice}
                  onChange={(e) => setFormSettings({...formSettings, masteryPrice: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-14 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none font-bold text-slate-800 disabled:opacity-75 disabled:cursor-not-allowed"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[10px] text-slate-400 font-bold uppercase">
                  /mo
                </div>
              </div>
              <p className="text-[9px] text-slate-400 font-medium">Optimal fluency speed tracking plan</p>
            </div>
          </div>
        </div>

        {/* Global Variables Card */}
        <div className="bg-white rounded-2xl border border-slate-150/85 p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-50 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe size={20} className="text-slate-400" />
              Global Brand & platform settings
            </h2>
            <p className="text-xs text-slate-400 mt-1">Manage system constants used in automated emails and customer facing portals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
            {/* Academy Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Academy Brand Name</label>
              <input
                required
                disabled={!isAdmin}
                type="text"
                value={formSettings.academyName}
                onChange={(e) => setFormSettings({...formSettings, academyName: e.target.value})}
                placeholder="Abyssinia Tutors"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none font-medium text-slate-850 disabled:opacity-75 disabled:cursor-not-allowed"
              />
            </div>

            {/* Support Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Support Email Contacts</label>
              <div className="relative rounded-xl shadow-xs">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  required
                  disabled={!isAdmin}
                  type="email"
                  value={formSettings.supportEmail}
                  onChange={(e) => setFormSettings({...formSettings, supportEmail: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-800 disabled:opacity-75 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Support Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Global Contact Line</label>
              <div className="relative rounded-xl shadow-xs">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  required
                  disabled={!isAdmin}
                  type="text"
                  value={formSettings.supportPhone}
                  onChange={(e) => setFormSettings({...formSettings, supportPhone: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-800 disabled:opacity-75 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Welcome Motto */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Welcome Mission Subtitle</label>
              <div className="relative rounded-xl shadow-xs">
                <Sparkles className="absolute left-4 top-14 -translate-y-1/2 text-slate-400" size={16} />
                <textarea
                  required
                  disabled={!isAdmin}
                  rows={2}
                  value={formSettings.welcomeMotto}
                  onChange={(e) => setFormSettings({...formSettings, welcomeMotto: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-800 resize-none disabled:opacity-75 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Founder Profile Info */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Founder Name</label>
              <input
                required
                disabled={!isAdmin}
                type="text"
                value={formSettings.founderName}
                onChange={(e) => setFormSettings({...formSettings, founderName: e.target.value})}
                placeholder="Biruk Tadesse"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none font-medium text-slate-800 disabled:opacity-75 disabled:cursor-not-allowed"
              />
            </div>

            {/* Founder LinkedIn URL */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Founder's LinkedIn URL</label>
              <input
                required
                disabled={!isAdmin}
                type="url"
                value={formSettings.founderLinkedIn}
                onChange={(e) => setFormSettings({...formSettings, founderLinkedIn: e.target.value})}
                placeholder="e.g. https://www.linkedin.com/in/yourprofile"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none font-medium text-slate-800 disabled:opacity-75 disabled:cursor-not-allowed"
              />
            </div>

            {/* Instagram Link */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Instagram Page URL</label>
              <input
                required
                disabled={!isAdmin}
                type="url"
                value={formSettings.instagramUrl}
                onChange={(e) => setFormSettings({...formSettings, instagramUrl: e.target.value})}
                placeholder="e.g. https://www.instagram.com/yourbrand"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none font-medium text-slate-800 disabled:opacity-75 disabled:cursor-not-allowed"
              />
            </div>

            {/* WhatsApp Link */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">WhatsApp Business / Chat URL</label>
              <input
                required
                disabled={!isAdmin}
                type="url"
                value={formSettings.whatsappUrl}
                onChange={(e) => setFormSettings({...formSettings, whatsappUrl: e.target.value})}
                placeholder="e.g. https://wa.me/15550192834"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none font-medium text-slate-800 disabled:opacity-75 disabled:cursor-not-allowed"
              />
            </div>

            {/* Facebook Link */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Facebook Page URL</label>
              <input
                required
                disabled={!isAdmin}
                type="url"
                value={formSettings.facebookUrl}
                onChange={(e) => setFormSettings({...formSettings, facebookUrl: e.target.value})}
                placeholder="e.g. https://www.facebook.com/yourpage"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none font-medium text-slate-800 disabled:opacity-75 disabled:cursor-not-allowed"
              />
            </div>

            {/* YouTube Link */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">YouTube Channel URL</label>
              <input
                required
                disabled={!isAdmin}
                type="url"
                value={formSettings.youtubeUrl}
                onChange={(e) => setFormSettings({...formSettings, youtubeUrl: e.target.value})}
                placeholder="e.g. https://www.youtube.com/@yourchannel"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none font-medium text-slate-800 disabled:opacity-75 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Brand Logo Laboratory Segment */}
        <div className="bg-white rounded-2xl border border-slate-150/85 p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-50 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={20} className="text-secondary animate-pulse" />
              Brand Identity & Logo Concept Lab
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select one of our newly generated professional vector logos. Choosing a concept binds the asset instantly across your main landing page, navigations, and global portal headers!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logo 1 */}
            <div 
              onClick={() => isAdmin && setFormSettings({ ...formSettings, activeLogoUrl: '/logo_option_one.png' })}
              className={`group relative rounded-2xl border-2 p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full bg-slate-50/50 hover:bg-white hover:shadow-md ${
                formSettings.activeLogoUrl === '/logo_option_one.png' 
                  ? 'border-indigo-600 bg-white ring-4 ring-indigo-50 shadow-sm' 
                  : 'border-slate-150/80 hover:border-slate-350'
              }`}
            >
              <div className="space-y-4">
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center p-4 relative group-hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    src="/logo_option_one.png" 
                    alt="Logo Option One: The Modern Traditionalist ፪" 
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  {formSettings.activeLogoUrl === '/logo_option_one.png' && (
                    <span className="absolute top-3 right-3 bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      Active
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    Concept ፪ — Traditional Connection
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                    Features the Ge'ez numeral <strong>፪ (number 2)</strong>, elegantly integrated with a stylized book of wisdom and a bright warm orange star representing children's potential.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">Indigo / Cream / Orange</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  formSettings.activeLogoUrl === '/logo_option_one.png' ? 'text-indigo-650' : 'text-slate-400 group-hover:text-indigo-600'
                }`}>
                  {formSettings.activeLogoUrl === '/logo_option_one.png' ? '✓ Applied' : 'Select'}
                </span>
              </div>
            </div>

            {/* Logo 2 */}
            <div 
              onClick={() => isAdmin && setFormSettings({ ...formSettings, activeLogoUrl: '/logo_option_two.png' })}
              className={`group relative rounded-2xl border-2 p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full bg-slate-50/50 hover:bg-white hover:shadow-md ${
                formSettings.activeLogoUrl === '/logo_option_two.png' 
                  ? 'border-indigo-600 bg-white ring-4 ring-indigo-50 shadow-sm' 
                  : 'border-slate-150/80 hover:border-slate-350'
              }`}
            >
              <div className="space-y-4">
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center p-4 relative group-hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    src="/logo_option_two.png" 
                    alt="Logo Option Two: Corporate Excellence ፻" 
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  {formSettings.activeLogoUrl === '/logo_option_two.png' && (
                    <span className="absolute top-3 right-3 bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      Active
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    Concept ፻ — Century of Brilliance
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                    Incorporates the structural golden <strong>፻ (number 100)</strong> Ge'ez prefix. Communicates masterclass scores, complete visual authority, and academic standard excellence. Let children achieve 100%!
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">Deep Slate / Bronze Gold</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  formSettings.activeLogoUrl === '/logo_option_two.png' ? 'text-indigo-650' : 'text-slate-400 group-hover:text-indigo-600'
                }`}>
                  {formSettings.activeLogoUrl === '/logo_option_two.png' ? '✓ Applied' : 'Select'}
                </span>
              </div>
            </div>

            {/* Logo 3 */}
            <div 
              onClick={() => isAdmin && setFormSettings({ ...formSettings, activeLogoUrl: '/logo_option_three.png' })}
              className={`group relative rounded-2xl border-2 p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full bg-slate-50/50 hover:bg-white hover:shadow-md ${
                formSettings.activeLogoUrl === '/logo_option_three.png' 
                  ? 'border-indigo-600 bg-white ring-4 ring-indigo-50 shadow-sm' 
                  : 'border-slate-150/80 hover:border-slate-350'
              }`}
            >
              <div className="space-y-4">
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center p-4 relative group-hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    src="/logo_option_three.png" 
                    alt="Logo Option Three: Playful Alphabet 'ሀ'" 
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  {formSettings.activeLogoUrl === '/logo_option_three.png' && (
                    <span className="absolute top-3 right-3 bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      Active
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    Concept ሀ — LinguKid Friendly
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                    Features the Ethiopic letter <strong>ሀ ('He' for Beginner alphabet)</strong> designed as a friendly child mascot with smart glasses and an elegant green/gold academic ribbon. Highly child-safe!
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">Warm Emerald / Yellow Gold</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  formSettings.activeLogoUrl === '/logo_option_three.png' ? 'text-indigo-650' : 'text-slate-400 group-hover:text-indigo-600'
                }`}>
                  {formSettings.activeLogoUrl === '/logo_option_three.png' ? '✓ Applied' : 'Select'}
                </span>
              </div>
            </div>
          </div>

          {formSettings.activeLogoUrl && (
            <div className="bg-indigo-50/60 border border-indigo-100 p-4 rounded-xl flex items-center gap-3">
              <Sparkles size={16} className="text-indigo-650 shrink-0" />
              <p className="text-[11px] text-indigo-900 font-semibold leading-relaxed">
                You have staged a dynamic logo. Click <strong>"Commit System Config"</strong> below to write this branding across our central databases permanently!
              </p>
            </div>
          )}
        </div>

        {/* Form Actions */}
        {isAdmin && (
          <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
            <button
              type="submit"
              disabled={isSaving}
              id="commit-settings-btn"
              className="btn-primary flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/10 hover:scale-[1.01] transition-all cursor-pointer font-bold text-sm"
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Saving Credentials...</span>
                </>
              ) : (
                <span>Commit System Config</span>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
