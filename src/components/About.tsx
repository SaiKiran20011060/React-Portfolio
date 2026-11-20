import { useEffect, useRef } from "react";
import gsap from "gsap";
import { smoother } from "./Navbar";
import "./styles/About.css";

const About = () => {
  const photoRef = useRef<HTMLDivElement>(null);

  // The About block sits partly inside the first screen (it slides up as you
  // scroll), so fade the photo in only once you've actually scrolled toward
  // About; it stays hidden on the landing view and during the face scan.
  useEffect(() => {
    let last = -1;
    const tick = () => {
      const el = photoRef.current;
      if (!el) return;
      const revealed = document.body.classList.contains("site-revealed");
      const y = smoother ? smoother.scrollTop() : window.scrollY;
      const vh = window.innerHeight;
      const t = revealed ? Math.min(1, Math.max(0, (y - vh * 0.2) / (vh * 0.3))) : 0;
      const next = Math.round(t * 100) / 100;
      if (next !== last) {
        el.style.opacity = String(next);
        el.style.transform = `scale(${0.85 + 0.15 * next})`;
        last = next;
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (

    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-head">
          <h3 className="title">About Me</h3>
          <div className="about-photo" ref={photoRef}>
            <img src="/images/me.jpeg" alt="Sai Kiran Ravipati" loading="lazy" />
          </div>
        </div>
        <p className="para">
          AI Engineer with 3+ years of experience developing AI/ML and Generative AI solutions using Python, LLMs, NLP, and cloud technologies. Experienced in building scalable intelligent systems, integrating Gemini/LLM APIs, and deploying AI services in cloud environments. Skilled in designing scalable ETL pipelines, cloud-native data architectures, and AI-integrated data systems across GCP and AWS, with strong expertise in Python, SQL, PySpark, and BigQuery. Passionate about building high-performance AI and data platforms that power analytics, ML, and business intelligence.
        </p>
      </div>
    </div>
  );
};

export default About;
