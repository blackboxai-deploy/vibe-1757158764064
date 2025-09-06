export type SoundType = 'move' | 'win' | 'draw' | 'click' | 'hover' | 'newGame';

interface SoundConfig {
  frequency: number;
  duration: number;
  type: OscillatorType;
  volume: number;
}

const SOUND_CONFIGS: Record<SoundType, SoundConfig> = {
  move: { frequency: 440, duration: 0.1, type: 'sine', volume: 0.3 },
  win: { frequency: 660, duration: 0.5, type: 'square', volume: 0.5 },
  draw: { frequency: 220, duration: 0.3, type: 'sawtooth', volume: 0.4 },
  click: { frequency: 800, duration: 0.05, type: 'sine', volume: 0.2 },
  hover: { frequency: 1000, duration: 0.03, type: 'sine', volume: 0.1 },
  newGame: { frequency: 523, duration: 0.2, type: 'triangle', volume: 0.4 }
};

export class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled = true;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.warn('Web Audio API not supported:', error);
      }
    }
  }

  private async initializeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (error) {
        console.warn('Failed to resume audio context:', error);
      }
    }
  }

  async playSound(type: SoundType, playerMove = false): Promise<void> {
    if (!this.enabled || !this.audioContext) return;

    try {
      await this.initializeAudioContext();
      
      const config = SOUND_CONFIGS[type];
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.type = config.type;
      
      // Different frequencies for player vs AI moves
      if (type === 'move') {
        oscillator.frequency.setValueAtTime(
          playerMove ? 440 : 330, 
          this.audioContext.currentTime
        );
      } else {
        oscillator.frequency.setValueAtTime(config.frequency, this.audioContext.currentTime);
      }

      // Envelope for smoother sound
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(config.volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + config.duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + config.duration);

      // Special effects for win sound
      if (type === 'win') {
        this.playWinSequence();
      }
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  }

  private async playWinSequence(): Promise<void> {
    const notes = [523, 659, 784]; // C, E, G
    for (let i = 0; i < notes.length; i++) {
      setTimeout(() => {
        this.playNote(notes[i], 0.2, 0.3);
      }, i * 150);
    }
  }

  private playNote(frequency: number, duration: number, volume: number): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  // Initialize audio context on user interaction
  async initializeOnUserGesture(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
}

// Singleton instance
export const soundManager = new SoundManager();