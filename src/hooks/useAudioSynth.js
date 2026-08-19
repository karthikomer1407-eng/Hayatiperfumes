import { useState, useRef, useEffect, useCallback } from 'react';

// Tamally Ma'ak Frequencies Fallback
const NOTES = {
  E3: 164.81, FS3: 185.00, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00
};

const TAMALLY_MAAK_SYNTH_MELODY = [
  { note: NOTES.E4, dur: 0.6, pause: 320 },
  { note: NOTES.B3, dur: 0.4, pause: 260 },
  { note: NOTES.C4, dur: 0.4, pause: 260 },
  { note: NOTES.D4, dur: 0.6, pause: 360 },
  { note: NOTES.C4, dur: 0.4, pause: 260 },
  { note: NOTES.B3, dur: 0.4, pause: 260 },
  { note: NOTES.A3, dur: 0.8, pause: 550 },
  { note: NOTES.E4, dur: 0.6, pause: 320 },
  { note: NOTES.B3, dur: 0.4, pause: 260 },
  { note: NOTES.C4, dur: 0.4, pause: 260 },
  { note: NOTES.D4, dur: 0.6, pause: 360 },
  { note: NOTES.C4, dur: 0.4, pause: 260 },
  { note: NOTES.B3, dur: 0.4, pause: 260 },
  { note: NOTES.A3, dur: 0.4, pause: 260 },
  { note: NOTES.B3, dur: 0.4, pause: 260 },
  { note: NOTES.C4, dur: 0.4, pause: 260 },
  { note: NOTES.B3, dur: 0.4, pause: 260 },
  { note: NOTES.A3, dur: 0.4, pause: 260 },
  { note: NOTES.G3, dur: 0.4, pause: 260 },
  { note: NOTES.FS3, dur: 0.5, pause: 320 },
  { note: NOTES.E3, dur: 0.9, pause: 700 }
];

export function useAudioSynth() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const synthCtxRef = useRef(null);
  const synthTimerRef = useRef(null);

  // Initialize HTML5 Audio Element for Real Tamally Ma'ak Song
  useEffect(() => {
    const audio = new Audio('/assets/tamally-maak.mp3');
    audio.loop = true;
    audio.volume = 0.65;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Web Audio Synth Fallback
  const startSynthFallback = useCallback(() => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    synthCtxRef.current = ctx;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
    masterGain.connect(ctx.destination);

    let idx = 0;
    function playNext() {
      if (ctx.state === 'closed') return;
      const step = TAMALLY_MAAK_SYNTH_MELODY[idx % TAMALLY_MAAK_SYNTH_MELODY.length];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(step.note, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + step.dur);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + step.dur);

      idx++;
      synthTimerRef.current = setTimeout(playNext, step.pause);
    }

    playNext();
  }, []);

  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    setIsPlaying(true);

    if (audio) {
      const promise = audio.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          console.warn("Autoplay blocked by browser policy, queuing audio start on first interaction:", err);
          
          const handleFirstTouch = () => {
            audio.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              startSynthFallback();
            });
            window.removeEventListener('pointerdown', handleFirstTouch);
            window.removeEventListener('click', handleFirstTouch);
          };

          window.addEventListener('pointerdown', handleFirstTouch, { once: true });
          window.addEventListener('click', handleFirstTouch, { once: true });
        });
      }
    } else {
      startSynthFallback();
    }
  }, [startSynthFallback]);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    setIsPlaying(false);

    if (audio) {
      audio.pause();
    }
    if (synthTimerRef.current) clearTimeout(synthTimerRef.current);
    if (synthCtxRef.current) {
      synthCtxRef.current.close().catch(() => {});
      synthCtxRef.current = null;
    }
  }, []);

  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, playAudio, pauseAudio]);

  return { isPlaying, toggleAudio, playAudio, pauseAudio };
}
