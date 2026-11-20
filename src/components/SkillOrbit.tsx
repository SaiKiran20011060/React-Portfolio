import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { smoother } from './Navbar';
import './SkillOrbit.css';

const skills: { name: string; icon: string; light?: boolean }[] = [
  // AI/ML first: the first icon sits at the top of the ring
  { name: 'GenAI / LLMs', icon: '/images/genai.svg' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'PyTorch',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
  { name: 'Python',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'GCP',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'AWS',       icon: '/images/aws.svg' },
  { name: 'SQL',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', light: true },
  { name: 'BigQuery',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg' },
  { name: 'Airflow',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg' },
  { name: 'Docker',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
  { name: 'Spark',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg' },
  { name: 'Kafka',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg', light: true },
  { name: 'Azure',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'Git',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

const SkillOrbit = () => {
  const [visible, setVisible] = useState(false);
  const wrapperRef            = useRef<HTMLDivElement>(null);
  const scalerRef             = useRef<HTMLDivElement>(null);

  // Show after scan completes
  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener('scanComplete', handler);
    return () => window.removeEventListener('scanComplete', handler);
  }, []);

  // Grow / shrink with scroll position. Driven by GSAP's ticker and the smoothed
  // scroll value (no layout reads), so it stays in sync with ScrollSmoother.
  useEffect(() => {
    let last = -1;
    const tick = () => {
      const scaler = scalerRef.current;
      if (!scaler) return;
      // Smaller screens: fixed compact size (scroll shrink is desktop-only)
      let next = window.innerWidth < 600 ? 0.36 : 0.6;
      if (window.innerWidth > 1024) {
        const y = smoother ? smoother.scrollTop() : window.scrollY;
        const max = window.innerHeight / 2 + 200;
        next = Math.round(Math.max(0.25, 1 - y / max) * 1000) / 1000;
      }
      if (next !== last) {
        scaler.style.transform = `scale(${next})`;
        last = next;
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`skill-orbit-wrapper ${visible ? 'orbit-visible' : ''}`}
    >
     <div ref={scalerRef} className="orbit-scaler">
      {/* ── Center: "Skills" text ── */}
      <div className="orbit-center">
        <span className="orbit-center-label">Skills</span>
      </div>

      {/* ── Orbit rings ── */}
      <div className="orbit-ring" />
      <div className="orbit-ring orbit-ring-2" />

      {/* ── Orbiting icons ── */}
      {skills.map((skill, i) => {
        const angle = (360 / skills.length) * i;
        const delay = `${i * 0.08}s`;
        return (
          <div
            key={skill.name}
            className="orbit-icon"
            style={{ '--angle': `${angle}deg`, '--delay': delay } as React.CSSProperties}
          >
            <div className="orbit-icon-inner">
              <img src={skill.icon} alt={skill.name} className={skill.light ? 'icon-light' : undefined} />
              <span className="orbit-tooltip">{skill.name}</span>
            </div>
          </div>
        );
      })}
     </div>
    </div>
  );
};

export default SkillOrbit;
