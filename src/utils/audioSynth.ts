// Pure Web Audio API Synthesizer for Peace Sanctuary & Meditation Chimes

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted() {
    return this.isMuted;
  }

  // Plays a crystal singing bowl / warm meditative bell tone
  public playSingingBowl(freq: number = 432, duration: number = 3.5) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 2.76, now); // soft bell overtone

      // Gain envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);

      osc.stop(now + duration);
      oscHarmonic.stop(now + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Plays a gentle breath cycle cue
  public playBreathCue(type: 'inhale' | 'hold' | 'exhale') {
    if (this.isMuted) return;
    if (type === 'inhale') {
      this.playSingingBowl(349.23, 2.5); // F4 tone
    } else if (type === 'hold') {
      this.playSingingBowl(440.0, 1.8); // A4 tone
    } else {
      this.playSingingBowl(261.63, 3.0); // C4 tone
    }
  }

  // Soft affirmation chime
  public playAffirmationChime() {
    if (this.isMuted) return;
    const notes = [329.63, 392.0, 493.88, 587.33]; // E, G, B, D chord
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playSingingBowl(freq, 2.0);
      }, index * 120);
    });
  }
}

export const soundManager = new AudioSynthesizer();
