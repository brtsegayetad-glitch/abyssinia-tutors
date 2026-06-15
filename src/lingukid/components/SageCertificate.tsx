import React, { useRef, useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { ShieldCheck, Sparkles, Award, Printer, Share2, Clipboard, CheckCircle2, ChevronRight, BookOpen, Crown } from 'lucide-react';
import { subscribeToSettings } from '../../services/dataService';
import BrandLogo from '../../components/BrandLogo';

interface SageCertificateProps {
  progress: UserProgress;
}

export default function SageCertificate({ progress }: SageCertificateProps) {
  const [selectedType, setSelectedType] = useState<'novice' | 'sage'>(progress.xp >= 1000 ? 'sage' : 'novice');
  const [copiedLink, setCopiedLink] = useState(false);
  const [deanName, setDeanName] = useState("Ato Solomon");
  const [isSignEditable, setIsSignEditable] = useState(false);
  const [activeLogo, setActiveLogo] = useState<string>("/logo_option_one.png");

  useEffect(() => {
    const unsub = subscribeToSettings((settings) => {
      if (settings && settings.activeLogoUrl) {
        setActiveLogo(settings.activeLogoUrl);
      }
    });
    return () => unsub();
  }, []);

  // Benchmarks
  const isNoviceUnlocked = progress.xp >= 200;
  const isSageUnlocked = progress.xp >= 1000;

  const handlePrint = () => {
    // Add print styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #printable-sage-certificate, #printable-sage-certificate * {
          visibility: visible;
        }
        #printable-sage-certificate {
          position: absolute;
          left: 0;
          top: 0;
          width: 297mm; /* A4 Landscape width */
          height: 210mm; /* A4 Landscape height */
          margin: 0;
          padding: 20px;
          box-sizing: border-box;
          transform: scale(0.95);
          transform-origin: top left;
        }
        /* Hide unnecessary interactive buttons during print */
        .print-hide {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    // Cleanup afterwards
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1000);
  };

  const handleCopyCredential = () => {
    const credId = `ABYSSINIA-LIT-${progress.userName.toUpperCase().replace(/\s+/g, '-')}-${progress.xp}`;
    const shareText = `Official Global Literacy Credential: ${progress.userName} earned the Abyssinia Ge'ez ${selectedType === 'sage' ? 'High Sage' : 'Novice Scribe'} Certificate! Verification Code: ${credId}`;
    navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const certificateId = `ABY-LIT-${progress.userName.toUpperCase().replace(/[^A-Z0-9]/g, '') || 'SCHOLAR'}-${progress.xp}`;
  const currentDateString = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div id="credential-academic-center" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-zinc-200 space-y-6">
      
      {/* Dynamic Header for High-Quality Global-Literacy */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
        <div className="space-y-1">
          <span className="text-xs uppercase font-mono bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full font-extrabold tracking-wider inline-flex items-center gap-1">
            <Crown size={12} className="fill-amber-300" />
            <span>GLOBAL LITERACY ALIGNMENT Framework</span>
          </span>
          <h3 className="text-xl font-serif font-black text-zinc-900 tracking-tight">
            Academic Credentials & Sage Certification
          </h3>
          <p className="text-xs text-zinc-500 max-w-2xl">
            HabKids structures your child's Ge'ez and Amharic learning path following standard international language acquisition guidelines, translating gamified XP into accredited global certificates.
          </p>
        </div>

        {/* Certificate switches */}
        <div className="flex bg-zinc-100 p-1 rounded-xl self-start md:self-auto print-hide border border-zinc-200">
          <button
            onClick={() => setSelectedType('novice')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedType === 'novice' 
                ? 'bg-white text-zinc-900 shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Novice Scribe
          </button>
          <button
            onClick={() => {
              if (isSageUnlocked) {
                setSelectedType('sage');
              } else {
                alert(`Locked! Earn at least 1,000 XP to unlock the High Sage Literacy Certificate (Current: ${progress.xp} XP). Keep practicing!`);
              }
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
              selectedType === 'sage' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <span>High Sage</span>
            {!isSageUnlocked && <span className="text-[9px] bg-zinc-200 text-zinc-700 font-mono px-1 border border-zinc-300 rounded font-bold">1k XP</span>}
          </button>
        </div>
      </div>

      {/* Main interactive Certificate Visual canvas wrapper */}
      <div className="bg-zinc-50 rounded-2xl p-4 sm:p-8 flex flex-col items-center justify-center border border-zinc-200 overflow-x-auto print-hide">
        
        {/* Actual Diploma Frame component */}
        <div 
          id="printable-sage-certificate" 
          className={`w-full max-w-3xl aspect-[1.414/1] bg-[#FCFAF5] border-8 border-double ${selectedType === 'sage' ? 'border-amber-600/70' : 'border-[#5A6A51]/60'} rounded-2xl p-6 sm:p-12 relative shadow-md flex flex-col justify-between text-center select-none font-sans overflow-hidden`}
          style={{ backgroundImage: 'radial-gradient(#F5EFE0 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        >
          {/* Ornamental corner seals */}
          <div className="absolute top-2 left-2 text-[#5A6A51]/30 font-serif text-2xl font-bold">ሀ</div>
          <div className="absolute top-2 right-2 text-[#5A6A51]/30 font-serif text-2xl font-bold">ለ</div>
          <div className="absolute bottom-2 left-2 text-[#5A6A51]/30 font-serif text-2xl font-bold">ሐ</div>
          <div className="absolute bottom-2 right-2 text-[#5A6A51]/30 font-serif text-2xl font-bold">መ</div>

          {/* Faint elegant center badge seal watermarked background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] select-none">
            <BrandLogo logoUrl={activeLogo} className="w-64 h-64 grayscale" />
          </div>

          {/* Header Title block */}
          <div className="space-y-1 z-10">
            <span className="text-[#8B5E3C] tracking-widest uppercase text-[10px] sm:text-xs font-mono font-bold block">
              Abyssinia Scholastic Global Literacy Council
            </span>
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#8B5E3C]/30 to-transparent w-48 mx-auto" />
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#2D3329] tracking-tight pt-1">
              የምስክር ወረቀት
            </h1>
            <p className={`text-xs sm:text-sm font-sans font-bold uppercase ${selectedType === 'sage' ? 'text-amber-700' : 'text-[#5A6A51]'} tracking-widest`}>
              {selectedType === 'sage' ? "Global High Sage Certificate of Literacy" : "Global Novice Scribe Certificate"}
            </p>
          </div>

          {/* Statement body */}
          <div className="space-y-4 my-2 z-10">
            <span className="text-xs text-zinc-500 italic block">
              This prestigious academic credential is high-standingly awarded to:
            </span>

            {/* Student Name */}
            <div>
              <h2 className="text-xl sm:text-3xl font-serif font-extrabold text-[#1B2217] tracking-tight border-b-2 border-zinc-200 w-fit mx-auto px-6 pb-1">
                {progress.userName}
              </h2>
            </div>

            {/* Achievement description */}
            <p className="text-xs text-zinc-600 max-w-xl mx-auto leading-relaxed px-4">
              In recognition of successful, outstanding performance across the rigorous <strong className="text-zinc-800 font-bold">Open Abyssinia Ge'ez Curriculum</strong>. Overcoming benchmarks in vocabulary identification, ancient orthographic script structures, interactive phonetic audio blends, and gamified syntactical puzzles with an academic rating of <span className="text-emerald-700 font-bold">Grade A Excellence</span>.
            </p>
          </div>

          {/* Lower signatures and stamps */}
          <div className="grid grid-cols-3 gap-2 items-end pt-4 border-t border-zinc-200/50 z-10">
            
            {/* Left Signator */}
            <div className="text-center">
              <span className="text-[14px] font-serif text-[#81654C] italic block select-text">
                {deanName}
              </span>
              <div className="h-[1px] bg-zinc-300 w-2/3 mx-auto my-1" />
              <span className="text-[8px] sm:text-[10px] uppercase font-mono block text-zinc-400 font-bold leading-none">
                Director of Pedagogy
              </span>
            </div>

            {/* Center Official Gold Seal Emblem */}
            <div className="flex flex-col items-center justify-center relative">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 ${selectedType === 'sage' ? 'bg-[#D4AF37]' : 'bg-[#5A6A51]'} rounded-full flex items-center justify-center text-white font-mono text-xl sm:text-2xl font-bold border-4 border-white shadow-md relative group select-none`}>
                <span>ቅ</span>
                {/* Visual ribbons */}
                <div className={`absolute -bottom-2 -left-1 w-3 h-6 ${selectedType === 'sage' ? 'bg-[#B4942A]' : 'bg-[#404D39]'} transform -rotate-12 -z-10`} />
                <div className={`absolute -bottom-2 -right-1 w-3 h-6 ${selectedType === 'sage' ? 'bg-[#987C1D]' : 'bg-[#313B2C]'} transform rotate-12 -z-10`} />
              </div>
              <span className="text-[7px] sm:text-[9px] font-mono uppercase text-zinc-400 tracking-wider font-bold mt-3 block">
                Verification # {progress.xp}XP
              </span>
            </div>

            {/* Right Signator */}
            <div className="text-center">
              <span className="text-[14px] font-serif text-zinc-800 italic block">
                HabKids
              </span>
              <div className="h-[1px] bg-zinc-300 w-2/3 mx-auto my-1" />
              <span className="text-[8px] sm:text-[10px] uppercase font-mono block text-zinc-400 font-bold leading-none">
                Academic Registrar
              </span>
            </div>

          </div>

          {/* Unique credential identifier footnote block */}
          <div className="flex justify-between items-center text-[7 sm:text-[9px] font-mono text-zinc-400 pt-3 border-t border-zinc-100 font-medium z-10">
            <span>ISSUED ON: {currentDateString}</span>
            <span className="hidden sm:inline">OFFICIAL DIGITAL CREDENTIAL ID: {certificateId}</span>
            <span>VERIFIED SECURE: 100% PASS</span>
          </div>

        </div>

      </div>

      {/* Auxiliary interactive console controls to modify signature or print credentials */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-zinc-800 font-sans flex items-center gap-1">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Co-Sign with your Real-World Tutor</span>
          </h4>
          <p className="text-xs text-zinc-500 leading-normal max-w-lg">
            To make this certificate deeply personal, parents are permitted to alter the co-signing <strong>Director of Pedagogy</strong>'s name to match their child's real-life Abyssinia Tutor. 
          </p>
          
          <div className="pt-1.5 flex items-center gap-2">
            {!isSignEditable ? (
              <button 
                onClick={() => setIsSignEditable(true)}
                className="text-[11px] font-mono font-bold text-amber-700 hover:underline cursor-pointer"
              >
                ✏️ Edit Director Sign: "{deanName}"
              </button>
            ) : (
              <div className="flex items-center gap-1 bg-white p-1 rounded border border-zinc-300">
                <input 
                  type="text" 
                  value={deanName} 
                  onChange={(e) => setDeanName(e.target.value)}
                  className="text-xs outline-none px-2 py-0.5"
                  maxLength={25}
                />
                <button 
                  onClick={() => setIsSignEditable(false)}
                  className="text-[10px] font-mono bg-zinc-900 text-white font-bold px-2 py-0.5 rounded cursor-pointer"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={handleCopyCredential}
            className="flex-1 md:flex-none px-4 py-2 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-xl font-bold font-sans text-xs text-zinc-700 inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copiedLink ? (
              <>
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Copied Code!</span>
              </>
            ) : (
              <>
                <Share2 size={14} />
                <span>Share Credential</span>
              </>
            )}
          </button>
          
          <button
            onClick={handlePrint}
            className={`flex-1 md:flex-none px-4 py-2 ${selectedType === 'sage' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#5A6A51] hover:bg-[#4a5843]'} text-white rounded-xl font-bold font-sans text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-sm`}
          >
            <Printer size={14} />
            <span>Print Certificate</span>
          </button>
        </div>
      </div>

      {/* Prestige Safeguards Notice */}
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-4 text-xs space-y-2">
        <h4 className="font-bold text-amber-900 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-amber-700" />
          <span>Security Safeguards & Academic Standing Notice</span>
        </h4>
        <p className="text-zinc-600 leading-relaxed text-[11px]">
          Does enabling light customization decrease the credential's value? <strong>No, because the core elements are strictly locked and secure:</strong>
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-zinc-600 text-[11px] list-disc list-inside pl-1">
          <li>
            <strong className="text-zinc-800">Tamper-Proof Student Name:</strong> The student's name on the diploma is automatically locked to their verified login account and cannot be modified.
          </li>
          <li>
            <strong className="text-zinc-800">Progression-Locked Tiers:</strong> The High Sage Certificate remains locked and unreachable until students successfully cross the threshold of <strong>1,000 XP</strong> of academic work.
          </li>
          <li>
            <strong className="text-zinc-800">Digital Registry ID:</strong> Each certificate bears a deterministic credential identifier hash key (e.g., <code className="bg-zinc-150 px-1 rounded font-mono text-[10px] text-zinc-800">{certificateId}</code>) which HabKids retains for official global registration.
          </li>
        </ul>
      </div>

    </div>
  );
}
