import { useState, useEffect, useRef } from 'react';
import './FaceScanner.css';

type Phase = 'idle' | 'scanning' | 'done' | 'hidden';

/**
 * Runs once per visit: starts as soon as the loader is gone ("startScan" from
 * initialFX), shows a brief "verified" confirmation, then fades out for good
 * and tells the page to light up ("scanComplete").
 */
const FaceScanner = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const startedRef = useRef(false);

  useEffect(() => {
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      setProgress(0);
      setPhase('scanning');
      intervalRef.current = setInterval(() => {
        setProgress((p) => Math.min(100, p + 1.2));
      }, 25);
    };
    window.addEventListener('startScan', start);
    return () => {
      window.removeEventListener('startScan', start);
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'scanning' || progress < 100) return;
    clearInterval(intervalRef.current);
    setPhase('done');
  }, [progress, phase]);

  // Separate effect so the phase change above doesn't cancel these timers
  useEffect(() => {
    if (phase !== 'done') return;
    const t1 = setTimeout(() => window.dispatchEvent(new Event('scanComplete')), 500);
    const t2 = setTimeout(() => setPhase('hidden'), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  if (phase === 'idle' || phase === 'hidden') return null;

  return (
    <div className={`face-scanner-overlay ${phase === 'done' ? 'fs-fade-out' : ''}`}>
      <div className="fs-corner fs-tl" />
      <div className="fs-corner fs-tr" />
      <div className="fs-corner fs-bl" />
      <div className="fs-corner fs-br" />

      {phase === 'scanning' && (
        <>
          <div className="fs-scanline" style={{ top: `${progress}%` }} />
          <div className="fs-grid" />
          <div className="fs-dot" style={{ top: '30%', left: '20%' }} />
          <div className="fs-dot" style={{ top: '45%', left: '75%' }} />
          <div className="fs-dot" style={{ top: '60%', left: '35%' }} />
          <div className="fs-label">SCANNING FACE... {Math.round(progress)}%</div>
        </>
      )}

      {phase === 'done' && <div className="fs-label fs-label-done">✓ IDENTITY VERIFIED</div>}
    </div>
  );
};

export default FaceScanner;
