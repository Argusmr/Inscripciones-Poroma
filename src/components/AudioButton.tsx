import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { AudioKey } from '../types';
import { AUDIO_FILES, AUDIO_TEXTS } from '../config';

interface AudioButtonProps {
  audioKey: AudioKey;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ audioKey, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Stop audio on step changes or unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
    };
  }, [audioKey]);

  const toggleAudio = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    const mp3Url = AUDIO_FILES[audioKey];
    const textFallback = AUDIO_TEXTS[audioKey];

    // Try playing MP3 first
    const audio = new Audio(mp3Url);
    audioRef.current = audio;

    audio.play()
      .then(() => {
        setIsPlaying(true);
        audio.onended = () => setIsPlaying(false);
      })
      .catch(() => {
        // Fallback to Web Speech API if browser supports speech synthesis and MP3 is missing
        if ('speechSynthesis' in window && textFallback) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(textFallback);
          utterance.lang = 'es-BO';
          utterance.rate = 0.9; // Slightly slower for clarity
          utterance.onstart = () => setIsPlaying(true);
          utterance.onend = () => setIsPlaying(false);
          utterance.onerror = () => setIsPlaying(false);
          window.speechSynthesis.speak(utterance);
        } else {
          setIsPlaying(false);
        }
      });
  };

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className={`inline-flex items-center justify-center gap-3 px-5 py-3 rounded-2xl text-lg font-bold border-2 transition-all cursor-pointer shadow-sm ${
        isPlaying
          ? 'bg-[#FF7A00] text-white border-[#FF7A00] animate-pulse'
          : 'bg-[#198C4A]/10 text-[#123D2C] border-[#198C4A] hover:bg-[#198C4A]/20 active:scale-98'
      } ${className}`}
      aria-label={isPlaying ? 'Silenciar explicación en voz' : 'Escuchar explicación en voz'}
      style={{ minHeight: '56px' }}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-7 h-7 text-white" />
          <span>SILENCIAR</span>
        </>
      ) : (
        <>
          <Volume2 className="w-7 h-7 text-[#198C4A]" />
          <span>ESCUCHAR</span>
        </>
      )}
    </button>
  );
};
