/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class AudioSynth {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Pop sound effect for popping bubbles
  playPop() {
    try {
      const ctx = this.initCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Pitch swiftly sweeps up like a bubble pop
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn('Audio context error:', e);
    }
  }

  // Correct match bell chime
  playCorrect() {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      // Two pleasant chime frequencies overlayed
      const playTone = (freq: number, startDelay: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + startDelay);
        
        gain.gain.setValueAtTime(0, now + startDelay);
        gain.gain.linearRampToValueAtTime(0.25, now + startDelay + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + startDelay + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + startDelay);
        osc.stop(now + startDelay + duration);
      };

      // Play major third chime
      playTone(523.25, 0, 0.4); // C5
      playTone(659.25, 0.08, 0.5); // E5
      playTone(783.99, 0.16, 0.6); // G5 (arpeggiate up)
    } catch (e) {
      console.warn('Audio context error:', e);
    }
  }

  // Soft incorrect slide down
  playIncorrect() {
    try {
      const ctx = this.initCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Gentle slide down
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.warn('Audio context error:', e);
    }
  }

  // Delicately synthesize vowel-like formants for character pronunciations
  speakFidel(character: string) {
    try {
      // 1. Try browser Text-to-Speech first to see if Amharic or a decent phonetic speaker is installed
      if ('speechSynthesis' in window) {
        // Amharic characters phonetics mappings
        let amharicPhonetics: { [key: string]: string } = {
          'ረ': 're',
          'ሪ': 'ri',
          'ለ': 'le',
          'መ': 'me',
          'ሙ': 'moo',
          'ሚ': 'mee',
          'ማ': 'ma',
          'ሙዝ': 'mooz',
          'ራስ': 'ras',
        };
        const textToSpeak = amharicPhonetics[character] || character;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        // Find amharic speaker or generic pleasant speaking speed
        utterance.rate = 0.85;
        utterance.pitch = 1.1;
        
        // Try amharic voice if exists
        const voices = window.speechSynthesis.getVoices();
        const amVoice = voices.find(v => v.lang.startsWith('am'));
        if (amVoice) {
          utterance.voice = amVoice;
        } else {
          utterance.lang = 'en-US'; // use as phonetic approximation
        }
        
        window.speechSynthesis.speak(utterance);
      }

      // 2. Play a beautiful synthetic Ge'ez resonant vocal tone using AudioContext
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      
      // Map characters to frequencies representing their pitch/vowel style
      let baseFreq = 261.63; // Do
      if (character === 'ረ') baseFreq = 293.66; // Re
      if (character === 'ሪ' || character === 'ሚ') baseFreq = 392.00; // G (bright High)
      if (character === 'ሙ' || character === 'ሙዝ') baseFreq = 220.00; // A (deep, rounded)
      if (character === 'ለ' || character === 'መ') baseFreq = 329.63; // Mi
      if (character === 'ማ' || character === 'ራስ') baseFreq = 349.23; // Fa

      // Formant simulation: blend multiple sine waves to simulate vocal vowel resonance
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();

      osc1.frequency.setValueAtTime(baseFreq, now);
      osc2.frequency.setValueAtTime(baseFreq * 2.22, now); // Formant peak 1

      // Soft human voice filter (low pass with moderate resonance)
      const biquad = ctx.createBiquadFilter();
      biquad.type = 'lowpass';
      biquad.frequency.setValueAtTime(1200, now);
      biquad.Q.setValueAtTime(3, now);

      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      gain2.gain.setValueAtTime(0.04, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain1);
      osc2.connect(gain2);

      gain1.connect(biquad);
      gain2.connect(biquad);
      biquad.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } catch (e) {
      console.warn('Fidel synthesizer error:', e);
    }
  }

  // Play instructions
  speakInstructions(text: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }
}

export const audioSynth = new AudioSynth();
