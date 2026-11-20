import './About.css';

export default function About() {
  const skills = [
    { name: 'Python', level: 90 },
    { name: 'SQL', level: 85 },
    { name: 'Power BI', level: 60 },
    { name: 'Google Cloud', level: 92 },
    { name: 'AWS', level: 70 },
    { name: 'Generative AI', level: 60 }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              AI Engineer with 3+ years of experience developing AI/ML and Generative AI solutions using Python, LLMs, NLP, and cloud technologies. Experienced in building scalable intelligent systems, integrating Gemini/LLM APIs, and deploying AI services in cloud environments. Skilled in designing scalable ETL pipelines, cloud-native data architectures, and AI-integrated data systems across GCP and AWS, with strong expertise in Python, SQL, PySpark, and BigQuery. Passionate about building high-performance AI and data platforms that power analytics, ML, and business intelligence.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <span>📧 saikiranravipati24@gmail.com</span>
              </div>
              <div className="contact-item">
                <span>📍 Ongole, Andhra Pradesh, India</span>
              </div>
            </div>
          </div>
          <div className="skills-container">
            {skills.map((skill) => (
              <div key={skill.name} className="skill">
                <span className="skill-name">{skill.name}</span>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
