import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

/**
 * NarrationPlayer — shared play/pause/replay component for story narration.
 * Uses the Web Speech API (SpeechSynthesis) to read text aloud.
 *
 * Props:
 *   text        — the full story text to narrate
 *   className   — optional extra class on the wrapper
 */
export default function NarrationPlayer({ text, className = '' }) {
  const [state, setState] = useState('idle'); // idle | playing | paused | ended
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [ttsAvailable, setTtsAvailable] = useState(true);

  const synthRef = useRef(null);
  const chunksRef = useRef([]);
  const pausedAtRef = useRef(0);

  // Check TTS availability once
  useEffect(() => {
    const synth = window.speechSynthesis || window.webkitSpeechSynthesis;
    if (!synth) {
      setTtsAvailable(false);
      return;
    }
    synthRef.current = synth;
  }, []);

  // Split text into speakable chunks (sentences)
  const chunks = useMemo(() => {
    if (!text) return [];
    // Split on sentence-ending punctuation, keeping the delimiter
    return text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [text]);

  useEffect(() => {
    chunksRef.current = chunks;
  }, [chunks]);

  // Speak a chunk by index
  const speakChunk = useCallback(
    (idx) => {
      const synth = synthRef.current;
      if (!synth || idx >= chunksRef.current.length) {
        setState('ended');
        setCurrentIdx(-1);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunksRef.current[idx]);
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Prefer a natural-sounding English voice
      const voices = synth.getVoices();
      const preferred = voices.find(
        (v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha'))
      );
      if (preferred) utterance.voice = preferred;

      utterance.onend = () => {
        speakChunk(idx + 1);
      };

      utterance.onerror = (e) => {
        // 'interrupted' and 'canceled' are expected during pause/stop
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          setState('ended');
          setCurrentIdx(-1);
        }
      };

      setCurrentIdx(idx);
      setState('playing');
      synth.speak(utterance);
    },
    []
  );

  // Play / Resume
  const handlePlay = useCallback(() => {
    const synth = synthRef.current;
    if (!synth) return;

    if (state === 'paused') {
      // Resume from where we paused — SpeechSynthesis doesn't expose cursor,
      // so we resume the current utterance.
      synth.resume();
      setState('playing');
      return;
    }

    // Start from beginning or from current index
    const startIdx = currentIdx >= 0 ? currentIdx : 0;
    speakChunk(startIdx);
  }, [state, currentIdx, speakChunk]);

  // Pause
  const handlePause = useCallback(() => {
    const synth = synthRef.current;
    if (!synth) return;
    synth.pause();
    setState('paused');
  }, []);

  // Stop (internal helper)
  const stopSpeaking = useCallback(() => {
    const synth = synthRef.current;
    if (!synth) return;
    synth.cancel();
  }, []);

  // Replay
  const handleReplay = useCallback(() => {
    stopSpeaking();
    setCurrentIdx(-1);
    // Small delay so cancel takes effect before new speech starts
    setTimeout(() => {
      speakChunk(0);
    }, 100);
  }, [stopSpeaking, speakChunk]);

  // Reset when text changes
  useEffect(() => {
    stopSpeaking();
    setState('idle');
    setCurrentIdx(-1);
  }, [text, stopSpeaking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopSpeaking();
  }, [stopSpeaking]);

  // Derive button label / icon / action
  let btnIcon, btnLabel, btnAction, stateLabel;
  if (!ttsAvailable) {
    btnIcon = <VolumeX size={14} />;
    btnLabel = 'Narration unavailable';
    btnAction = null;
    stateLabel = '';
  } else if (state === 'playing') {
    btnIcon = <Pause size={14} />;
    btnLabel = 'Pause';
    btnAction = handlePause;
    stateLabel = 'Playing narrative…';
  } else if (state === 'paused') {
    btnIcon = <Play size={14} />;
    btnLabel = 'Resume';
    btnAction = handlePlay;
    stateLabel = 'Paused';
  } else if (state === 'ended') {
    btnIcon = <RotateCcw size={14} />;
    btnLabel = 'Replay';
    btnAction = handleReplay;
    stateLabel = 'Narration complete';
  } else {
    btnIcon = <Play size={14} />;
    btnLabel = 'Play Narrative';
    btnAction = handlePlay;
    stateLabel = '';
  }

  return (
    <div className={`np-wrapper ${className}`}>
      <button
        className={`np-btn np-btn--${state}`}
        onClick={btnAction || undefined}
        disabled={!ttsAvailable}
        title={ttsAvailable ? 'Listen to the story' : 'Text-to-speech not supported in this browser'}
        aria-label={btnLabel}
        aria-pressed={state === 'playing'}
      >
        {btnIcon}
        <span className="np-btn-label">{btnLabel}</span>
      </button>
      {stateLabel && <span className="np-state-label">{stateLabel}</span>}
      <span className="np-sr-only" aria-live="polite">
        {stateLabel}
      </span>
    </div>
  );
}
