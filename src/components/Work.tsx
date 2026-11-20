import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { projects } from "../data/portfolioData";

const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .split("_")
    .slice(0, 3)
    .join("_");

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // No click lock: every click responds immediately and the CSS transition
  // smoothly re-targets mid-slide.
  const goToSlide = useCallback((index: number) => setCurrentIndex(index), []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? projects.length - 1 : i - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((i) => (i === projects.length - 1 ? 0 : i + 1));
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-bg" aria-hidden="true" />
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={project.id}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>{String(index + 1).padStart(2, "0")}</h3>
                      </div>
                      <div className="carousel-details">
                        <p className="carousel-category">
                          {project.category} · {project.year}
                        </p>
                        <h4>{project.title}</h4>
                        <p className="carousel-desc">{project.description}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <div className="tech-chips">
                            {project.tech.map((t) => (
                              <span className="tech-chip" key={t}>{t}</span>
                            ))}
                          </div>
                        </div>
                        <div className="project-actions">
{project.github && (
                          <a
                            className="project-btn"
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="disable"
                          >
                            <FaGithub /> GitHub
                          </a>
                          )}
                          {project.live && (
                            <a
                              className="project-btn project-btn-live"
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor="disable"
                            >
                              Live Demo <MdArrowOutward />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project image if there is one, otherwise a code-window card */}
                    <div className="carousel-image-wrapper">
                      {project.image ? (
                        <a
                          className="code-card image-card"
                          href={project.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="disable"
                          aria-label={`Open ${project.title} image`}
                        >
                          <div className="code-card-bar">
                            <i /><i /><i />
                            <span>architecture.jpg</span>
                          </div>
                          <img src={project.image} alt={`${project.title} architecture`} loading="lazy" />
                        </a>
                      ) : (
                      <div className="code-card">
                        <div className="code-card-bar">
                          <i /><i /><i />
                          <span>{slug(project.title)}.py</span>
                        </div>
                        <pre className="code-card-body">
                          <code>
                            <span className="ck">project</span> = {"{"}
                            {"\n"}  <span className="cp">"name"</span>: <span className="cs">"{project.title}"</span>,
                            {"\n"}  <span className="cp">"type"</span>: <span className="cs">"{project.category}"</span>,
                            {"\n"}  <span className="cp">"year"</span>: <span className="cn">{project.year}</span>,
                            {"\n"}  <span className="cp">"stack"</span>: [
                            {project.tech.map((t, i) => (
                              <span key={t}>
                                {"\n"}    <span className="cs">"{t}"</span>{i < project.tech.length - 1 ? "," : ""}
                              </span>
                            ))}
                            {"\n"}  ],
                            {"\n"}  <span className="cp">"status"</span>: <span className="cs">"{project.live ? "live 🚀" : project.github ? "on GitHub" : "local · offline"}"</span>
                            {"\n"}{"}"}
                          </code>
                        </pre>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {projects.map((p, index) => (
              <button
                key={p.id}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
