import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const RING_R = 92;
const RING_C = 2 * Math.PI * RING_R;

// Nothing on the loader reveals who this is — that happens after the face scan
const STEPS = [
  "Booting secure node",
  "Loading neural weights",
  "Rendering 3D avatar",
  "Calibrating face scanner",
  "Encrypting identity",
];
const GLYPHS = "ABCDEF0123456789#$%&@*?";
const scramble = (n: number) =>
  Array.from({ length: n }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("");

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [code, setCode] = useState(() => scramble(12));

  const pct = Math.min(100, Math.max(0, percent));
  const step = STEPS[Math.min(STEPS.length - 1, Math.floor((pct / 100) * STEPS.length))];

  // Hide the real page title until the scan reveals the site
  useEffect(() => {
    const root = document.documentElement;
    if (!root.dataset.realTitle) root.dataset.realTitle = document.title;
    document.title = "Identity classified…";
  }, []);

  // The subject ID keeps scrambling — it never resolves here
  useEffect(() => {
    if (loaded) return;
    const id = setInterval(() => setCode(scramble(12)), 90);
    return () => clearInterval(id);
  }, [loaded]);

  // 100% → "identity locked" → hand over to the face scan
  useEffect(() => {
    if (pct < 100 || loaded) return;
    const t1 = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(t1);
  }, [pct, loaded]);

  useEffect(() => {
    if (!loaded) return;
    let cancelled = false;
    const t = setTimeout(() => {
      import("./utils/initialFX").then((module) => {
        if (cancelled) return;
        setClicked(true);
        setTimeout(() => {
          module.initialFX?.();
          setIsLoading(false);
        }, 1000);
      });
    }, 1300);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [loaded]);

  return (
    <div className={`loader ${loaded ? "loader-done" : ""} ${clicked ? "loader-exit" : ""}`}>
      <div className="loader-grid" />
      <div className="loader-aurora loader-aurora-1" />
      <div className="loader-aurora loader-aurora-2" />

      <div className="loading-header">
        <span className="loader-title">
          <b>◉</b> SECURE&nbsp;NODE
        </span>
        <span className="loader-status">
          <i /> {loaded ? "Identity locked" : "Encrypted"}
        </span>
      </div>

      <div className="loader-center">
        <div className="loader-orb">
          <div className="loader-conic" />

          <svg className="loader-ring" viewBox="0 0 220 220">
            <defs>
              <linearGradient id="loaderGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5eead4" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <circle className="loader-track" cx="110" cy="110" r={RING_R} />
            <circle
              className="loader-progress"
              cx="110"
              cy="110"
              r={RING_R}
              stroke="url(#loaderGrad)"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C * (1 - pct / 100)}
            />
            <circle className="loader-ticks" cx="110" cy="110" r="104" />
          </svg>

          <div className="loader-orbit loader-orbit-a"><span /></div>
          <div className="loader-orbit loader-orbit-b"><span /></div>
          <div className="loader-orbit loader-orbit-c"><span /></div>

          <div className="loader-core">
            {/* fingerprint with a sweeping scan beam */}
            <svg className="loader-print" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M18 22c3-6 8-9 14-9s11 3 14 9" />
              <path d="M14 30c1-10 8-16 18-16s17 6 18 16" />
              <path d="M20 46c-2-4-3-8-3-13 0-8 7-14 15-14s15 6 15 14c0 3 0 6-1 9" />
              <path d="M26 50c-3-5-4-10-4-15 0-6 4-10 10-10s10 4 10 10c0 5-1 9-3 13" />
              <path d="M32 52c-2-5-4-11-4-17 0-3 2-5 4-5s4 2 4 5c0 6-1 11-3 16" />
              <path d="M38 50c1-3 2-7 2-11" />
            </svg>
            <span className="loader-beam" />
            <div className="loader-percent">{loaded ? "LOCKED" : `${pct}%`}</div>
          </div>
        </div>

        <div className="loader-subject">
          <span className="loader-subject-label">SUBJECT</span>
          <span className="loader-subject-code">{code}</span>
        </div>
        <div className="loader-classified">
          {loaded ? (
            <>
              Identity locked · <em>face scan required</em>
            </>
          ) : (
            <>
              Identity <em>classified</em>
            </>
          )}
        </div>

        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="loader-step" key={loaded ? "done" : step}>
          <span>&gt;</span> {loaded ? "Awaiting face scan" : step}
          <i className="loader-caret" />
        </div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  function cancel() {
    clearInterval(interval);
  }
  return { loaded, percent, clear, cancel };
};
