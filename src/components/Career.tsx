import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern - Trainee</h4>
                <h5>Virtusa</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Gained hands-on experience with Google Cloud Platform (GCP), including 
              Compute Engine, Storage, Networking, IAM, and BigQuery through training 
              and real-time projects. Built a strong foundation in cloud solution design 
              and data analysis.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Associate Engineer</h4>
                <h5>Virtusa</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building GenAI and LLM-powered solutions, including Gemini API integrations
              and NLP, and deploying them on GCP and AWS. Designing scalable ETL and
              real-time streaming pipelines with Python, SQL, PySpark, BigQuery and Kafka,
              and supporting cloud migration projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
