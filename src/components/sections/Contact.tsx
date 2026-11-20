import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Let's Connect</h2>
        <div className="contact-content">
          <p>I'm always interested in new opportunities and collaborations. Feel free to reach out!</p>
          <div className="contact-links">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=saikiranravipati24@gmail.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope /> Email Me
            </a>
            <a href="https://github.com/SaiKiran20011060" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/sai-kiran-ravipati-019239193/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
