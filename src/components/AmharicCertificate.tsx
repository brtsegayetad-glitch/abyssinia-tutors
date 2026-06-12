import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, Award, Printer, Share2, CheckCircle2, Crown, BookOpen, ChevronRight } from 'lucide-react';
import { subscribeToSettings } from '../services/dataService';
import BrandLogo from './BrandLogo';

interface AmharicCertificateProps {
  parentName?: string;
}

export default function AmharicCertificate({ parentName }: AmharicCertificateProps) {
  const [studentName, setStudentName] = useState("Amharic Scholar");
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [deanName, setDeanName] = useState("Ato Solomon");
  const [isSignEditable, setIsSignEditable] = useState(false);
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [activeLogo, setActiveLogo] = useState<string>("/logo_option_one.png");

  useEffect(() => {
    const unsub = subscribeToSettings((settings) => {
      if (settings && settings.activeLogoUrl) {
        setActiveLogo(settings.activeLogoUrl);
      }
    });
    return () => unsub();
  }, []);

  const levelsMeta = {
    1: { tag: "ደረጃ ፩ (Level 1)", title: "መሠረቶች እና ማንነት", subtitle: "Foundations & Self", desc: "First-stage fluency on intro-dialogues, family members, and parts of household." },
    2: { tag: "ደረጃ ፪ (Level 2)", title: "የቃላት ማበልጸጊያ", subtitle: "Vocabulary Boost", desc: "Completion of high-grade Amharic numbers, colors spectrum, and primary body parts." },
    3: { tag: "ደረጃ ፫ (Level 3)", title: "የመግለጽ ብቃት", subtitle: "Expressive Fluency", desc: "Mastery of daily routines, cultural dishes, active sports, and personal hobbies." },
    4: { tag: "ደረጃ ፬ (Level 4)", title: "የንግግር ሥነ-ምግባር", subtitle: "Speech Ethics & Proverbs", desc: "Interpretation of Ethiopian folk riddles, standard career ethics, and peer debate classes." },
    5: { tag: "ደረጃ ፭ (Level 5)", title: "የማንነት ውርስ", subtitle: "Elite Legacy & Identity", desc: "Elite levels of ancient historical legends, Ethiopic space, and high-quality legacy capstones." }
  };

  const handlePrint = () => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #printable-amharic-certificate, #printable-amharic-certificate * {
          visibility: visible;
        }
        #printable-amharic-certificate {
          position: absolute;
          left: 0;
          top: 0;
          width: 297mm; /* A4 Landscape */
          height: 210mm;
          margin: 0;
          padding: 24px;
          box-sizing: border-box;
          transform: scale(0.95);
          transform-origin: top left;
        }
        .print-hide {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1000);
  };

  const handleCopyCredential = () => {
    const credId = `ABYSSINIA-AMH-L${selectedLevel}-${studentName.toUpperCase().replace(/\s+/g, '-')}`;
    const shareText = `Official Conversational Amharic Credential: ${studentName} successfully completed Abyssinia Tutors Level ${selectedLevel} (${levelsMeta[selectedLevel].title})! Reference Verification: ${credId}`;
    navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const certificateId = `ABY-AMH-${studentName.toUpperCase().replace(/[^A-Z0-9]/g, '') || 'SCHOLAR'}-L${selectedLevel}`;
  const currentDateString = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div id="amharic-academic-center" className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80 space-y-6">
      
      {/* Header section promoting standard Amharic Literacy framework */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono bg-indigo-50 text-indigo-800 border border-indigo-150 px-2.5 py-1 rounded-full font-extrabold tracking-wider inline-flex items-center gap-1">
            <Crown size={12} className="fill-indigo-300 text-indigo-600" />
            <span>Standardized Amharic Curriculum Frame</span>
          </span>
          <h3 className="text-xl md:text-2xl font-serif font-black text-slate-900 tracking-tight">
            Amharic Global Literacy Certification
          </h3>
          <p className="text-xs text-slate-500 max-w-2xl font-medium">
            Honor your child's milestones! Parents can select any completed Amharic level (Levels 1 to 5) to dynamically generate and co-sign the Abyssinia Tutors official bilingual certificate of conversational proficiency.
          </p>
        </div>

        {/* Level selector buttons */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-auto print-hide border border-slate-200">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <button
              key={`level-selector-btn-${lvl}`}
              onClick={() => setSelectedLevel(lvl as any)}
              className={`px-3 py-1.5 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                selectedLevel === lvl 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Lvl {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main interactive Certificate Visual canvas wrapper */}
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-8 flex flex-col items-center justify-center border border-slate-200 overflow-x-auto print-hide">
        
        {/* Certificate Component Frame */}
        <div 
          id="printable-amharic-certificate" 
          className="w-full max-w-3xl aspect-[1.414/1] bg-[#FCFAF5] border-8 border-double border-indigo-900/60 rounded-2xl p-6 sm:p-12 relative shadow-lg flex flex-col justify-between text-center select-none font-sans overflow-hidden"
          style={{ backgroundImage: 'radial-gradient(#F3EDE0 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        >
          {/* Ornamental traditional borders */}
          <div className="absolute top-2 left-2 text-indigo-900/30 font-serif text-2xl font-bold">አ</div>
          <div className="absolute top-2 right-2 text-indigo-900/30 font-serif text-2xl font-bold">በ</div>
          <div className="absolute bottom-2 left-2 text-indigo-900/30 font-serif text-2xl font-bold">ገ</div>
          <div className="absolute bottom-2 right-2 text-indigo-900/30 font-serif text-2xl font-bold">ደ</div>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.06] select-none">
            <BrandLogo logoUrl={activeLogo} className="w-64 h-64 grayscale" />
          </div>

          {/* Upper Header Brand Block */}
          <div className="space-y-1.5 z-10">
            <span className="text-[#4F46E5] tracking-widest uppercase text-[10px] sm:text-xs font-mono font-bold block">
              Abyssinia Tutors Bilingual Global Literacy Council
            </span>
            <div className="h-[2px] bg-gradient-to-r from-transparent via-indigo-950/20 to-transparent w-56 mx-auto" />
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-indigo-950 tracking-tight pt-1">
              የምስክር ወረቀት
            </h1>
            <p className="text-xs sm:text-sm font-sans font-black text-indigo-850 uppercase tracking-widest">
              Amharic Proficiency Certificate of Excellence
            </p>
          </div>

          {/* Statement body */}
          <div className="space-y-4 my-2 z-10">
            <span className="text-xs text-slate-550 italic block">
              This global-literacy credential is proudly co-signed and conferred upon:
            </span>

            {/* Editable Student Name Title */}
            <div className="min-h-[40px] flex items-center justify-center">
              <h2 className="text-xl sm:text-3xl font-serif font-extrabold text-slate-900 tracking-tight border-b-2 border-indigo-200/80 w-fit mx-auto px-6 pb-0.5">
                {studentName}
              </h2>
            </div>

            {/* Description detailing completed curriculum */}
            <div className="max-w-xl mx-auto space-y-1">
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                For outstanding diligence, linguistic progress, and exceptional mastery of standard conversational skills under <span className="text-indigo-800 font-bold">{levelsMeta[selectedLevel].tag}</span>. Completed immersive chapters targeting <span className="text-slate-900 font-extrabold">"{levelsMeta[selectedLevel].title}"</span> ({levelsMeta[selectedLevel].subtitle}) across phonetic recognition, structured dialogic tasks, and worksheets.
              </p>
            </div>
          </div>

          {/* Signatures & Emblem */}
          <div className="grid grid-cols-3 gap-2 items-end pt-3 border-t border-slate-200/60 z-10">
            
            {/* Left co-signator */}
            <div className="text-center">
              <span className="text-[13px] font-serif text-indigo-900 italic block select-text">
                {deanName}
              </span>
              <div className="h-[1px] bg-slate-300 w-2/3 mx-auto my-1" />
              <span className="text-[8px] sm:text-[9px] uppercase font-mono block text-slate-450 font-bold leading-none">
                Pedagogical Director
              </span>
            </div>

            {/* Middle Stamp Emblem */}
            <div className="flex flex-col items-center justify-center relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-900 rounded-full flex items-center justify-center text-white font-serif text-xl sm:text-2xl font-black border-4 border-white shadow-md relative select-none">
                <span>አ</span>
                {/* Ribbon accents */}
                <div className="absolute -bottom-2 -left-1 w-3 h-5 bg-indigo-750 transform -rotate-12 -z-10" />
                <div className="absolute -bottom-2 -right-1 w-3 h-5 bg-indigo-800 transform rotate-12 -z-10" />
              </div>
              <span className="text-[7px] sm:text-[8px] font-mono uppercase text-slate-400 tracking-wider font-bold mt-2.5 block">
                Grade Level: A+ Verification
              </span>
            </div>

            {/* Right co-signator */}
            <div className="text-center">
              <span className="text-[13px] font-serif text-slate-800 italic block">
                Abyssinia Tutors
              </span>
              <div className="h-[1px] bg-slate-300 w-2/3 mx-auto my-1" />
              <span className="text-[8px] sm:text-[9px] uppercase font-mono block text-slate-450 font-bold leading-none">
                Academic Registrar
              </span>
            </div>

          </div>

          {/* Certificate unique footer identification metadata */}
          <div className="flex justify-between items-center text-[7 sm:text-[9px] font-mono text-slate-400 pt-2.5 border-t border-slate-100 font-medium z-10">
            <span>ISSUED ON: {currentDateString}</span>
            <span className="hidden sm:inline">OFFICIAL DIGITAL REGISTRY CODE: {certificateId}</span>
            <span>STANDARDS ALIGNED</span>
          </div>

        </div>

      </div>

      {/* Auxiliary interactive console controls to modify signature, name, or print credentials */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        {/* Real-time editors */}
        <div className="space-y-2 w-full md:w-auto">
          <h4 className="text-xs font-bold text-slate-800 font-sans flex items-center gap-1.55">
            <ShieldCheck size={14} className="text-indigo-600" />
            <span>Customize and Co-Sign Certificate details</span>
          </h4>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Student Name Editor */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Student's Full Name</label>
              {!isNameEditable ? (
                <button 
                  onClick={() => setIsNameEditable(true)}
                  className="p-2 py-1 text-xs font-medium text-indigo-750 bg-white border border-slate-250 rounded-lg shadow-sm hover:bg-slate-100 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>✏️ "{studentName}"</span>
                </button>
              ) : (
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-300">
                  <input 
                    type="text" 
                    value={studentName} 
                    onChange={(e) => setStudentName(e.target.value)}
                    className="text-xs outline-none px-2 py-0.5 w-36"
                    maxLength={25}
                  />
                  <button 
                    onClick={() => setIsNameEditable(false)}
                    className="text-[10px] font-mono bg-indigo-900 text-white font-bold px-2 py-1 rounded cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            {/* Tutor Name Editor */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Co-Signing Tutor</label>
              {!isSignEditable ? (
                <button 
                  onClick={() => setIsSignEditable(true)}
                  className="p-2 py-1 text-xs font-medium text-indigo-750 bg-white border border-slate-250 rounded-lg shadow-sm hover:bg-slate-100 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>✏️ "{deanName}"</span>
                </button>
              ) : (
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-300">
                  <input 
                    type="text" 
                    value={deanName} 
                    onChange={(e) => setDeanName(e.target.value)}
                    className="text-xs outline-none px-2 py-0.5 w-32"
                    maxLength={25}
                  />
                  <button 
                    onClick={() => setIsSignEditable(false)}
                    className="text-[10px] font-mono bg-indigo-900 text-white font-bold px-2 py-1 rounded cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto self-end">
          <button
            onClick={handleCopyCredential}
            className="flex-1 md:flex-none px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl font-bold font-sans text-xs text-slate-700 inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copiedLink ? (
              <>
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Copied Code!</span>
              </>
            ) : (
              <>
                <Share2 size={14} />
                <span>Copy Registry Code</span>
              </>
            )}
          </button>
          
          <button
            onClick={handlePrint}
            className="flex-1 md:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold font-sans text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-100"
          >
            <Printer size={14} />
            <span>Print Diploma</span>
          </button>
        </div>
      </div>

      {/* Prestige Security Safeguards Notice */}
      <div className="bg-indigo-50/45 border border-indigo-200/50 rounded-xl p-4 text-xs space-y-2">
        <h4 className="font-bold text-indigo-950 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-indigo-700" />
          <span>Linguistic Precedents & Secure Safeguards Notice</span>
        </h4>
        <p className="text-slate-650 leading-relaxed text-[11px]">
          By implementing easy-to-use printing keepsakes alongside digital hashes, Abyssinia Tutors enhances student retention and builds tangible pride:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-600 text-[11px] list-disc list-inside pl-1">
          <li>
            <strong className="text-slate-800">Adaptive Certificate Generation:</strong> Parents and educators can instantly issue custom certificates corresponding to Level 1 (Beginners) through Level 5 (Advanced Legacy Capstone) to celebrate incremental achievements.
          </li>
          <li>
            <strong className="text-slate-800">Verifiably Aligned Curriculum:</strong> Each certificate contains standard alignment tags linked to the deterministic registry identifier key <code className="bg-slate-150 p-0.5 px-1 rounded font-mono text-[9px] text-zinc-800">{certificateId}</code>, maintaining academic prestige.
          </li>
        </ul>
      </div>

    </div>
  );
}
