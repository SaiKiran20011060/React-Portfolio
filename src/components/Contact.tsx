import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:saikiranravipati24@gmail.com" data-cursor="disable">
                saikiranravipati24@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p className="contact-edu">
              MBA in Data Science <span>(Pursuing)</span>
              <br />
              BTech in Computer Science
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/SaiKiran20011060"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/sai-kiran-ravipati-019239193/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://saikiran20011060.github.io/Sai-s_blog/index.html"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              My Blog <MdArrowOutward />
            </a>

            <h4 className="contact-subhead">Coding</h4>
            <div className="contact-coding">
              <a
                href="https://www.hackerrank.com/profile/saikiranravipat1"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                HackerRank <MdArrowOutward />
              </a>
              <a
                href="https://leetcode.com/u/saikiranravipati1060/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                LeetCode <MdArrowOutward />
              </a>
              <a
                href="https://www.codechef.com/users/saikiran_01"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                CodeChef <MdArrowOutward />
              </a>
            </div>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Sai Kiran Ravipati</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
