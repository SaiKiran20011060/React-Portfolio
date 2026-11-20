import { useEffect, useState } from 'react';
import Scene3D from '../3D/Scene3D';
import './Hero.css';

export default function Hero() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    'AI Engineer',
    'GCP Professional',
    'AWS Practitioner',
    'Data Engineer',
    'Cloud Engineer',
    'Python Developer'
  ];

  useEffect(() => {
    let charIndex = 0;
    const currentRole = roles[roleIndex];
    
    const typeInterval = setInterval(() => {
      if (charIndex <= currentRole.length) {
        setText(currentRole.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            if (charIndex > 0) {
              charIndex--;
              setText(currentRole.substring(0, charIndex));
            } else {
              clearInterval(deleteInterval);
              setRoleIndex((prev) => (prev + 1) % roles.length);
            }
          }, 50);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [roleIndex]);

  return (
    <section id="home" className="hero">
      <Scene3D />
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-line">Hi, I'm</span>
            <span className="title-line main-name">Sai Kiran Ravipati</span>
            <span className="title-line subtitle">{text}<span className="cursor">|</span></span>
          </h1>
          <p className="hero-description">
            Transforming data into insights with cutting-edge AI/ML solutions and cloud technologies. 
            Passionate about building scalable data pipelines and intelligent systems.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">&gt;3</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Certifications</span>
            </div>
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Projects</span>
            </div>
          </div>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="https://saikiran20011060.github.io/Sai-s_blog/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">My Blog</a>
            <a href="#contact" className="btn btn-secondary">Let's Connect</a>
          </div>
        </div>
      </div>
    </section>
  );
}
