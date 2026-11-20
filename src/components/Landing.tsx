import { PropsWithChildren } from "react";
import SkillOrbit from "./SkillOrbit";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">

          {/* LEFT — Name + Roles stacked */}
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              SAI KIRAN
              <br />
              <span>RAVIPATI</span>
            </h1>
            <div className="landing-roles">
              <span>AI Engineer</span>
              <span>Data Engineer</span>
              <span>Cloud Engineer</span>
            </div>
          </div>

          {/* RIGHT — Skill Orbit (shown after scan) */}
          <SkillOrbit />

        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
