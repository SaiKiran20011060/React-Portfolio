export interface Project {
  id: number;
  year: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string | null;
  live: string | null;
  /** Optional screenshot/diagram; projects without one show the code card */
  image?: string;
}

// Same order as the main portfolio site (Kafka streaming project first)
export const projects: Project[] = [
  {
    id: 0,
    year: '2026',
    title: 'AI Architectural Assistant',
    category: 'Agentic AI · 3D Automation',
    description: 'A local chat app where a vision-language model edits a 3D house in Blender in real time from natural-language commands and floor-plan images/PDFs. A tool-calling agent (14 JSON-Schema tools with guardrails) updates the house model, a geometry engine generates walls, doors/windows and stairs from room rectangles, and a Blender add-on builds and renders it over a TCP/JSON socket. Runs fully offline.',
    tech: ['Python', 'LM Studio', 'Qwen3-VL', 'Blender API (bpy)', 'Tool Calling'],
    github: null,
    live: null
  },
  {
    id: 1,
    year: '2025',
    title: 'Streaming Data Pipeline for User Activity Analytics',
    category: 'Real-time Data Engineering',
    description: 'Developed a real-time streaming data pipeline connecting Firebase, Kafka, and Snowflake, with a focus on scalability, cloud migration, and production-ready architecture.',
    tech: ['Python', 'Kafka', 'Firebase', 'Snowflake', 'Streaming'],
    github: 'https://github.com/SaiKiran20011060/Streaming-Data-Pipeline-for-User-Activity-Analytics-using-Kafka',
    live: null
  },
  {
    id: 2,
    year: '2025',
    title: 'AI-Data-Normalizer-GCP-AWS',
    category: 'AI/ML Data Processing',
    description: 'An AI-powered data normalization system that automates data cleaning, standardization, and transformation with real-time processing and quality checks across GCP and AWS platforms.',
    tech: ['Python', 'AI/ML', 'GCP', 'AWS', 'Data Processing'],
    github: 'https://github.com/SaiKiran20011060/AI-Data-Normalizer-GCP-AWS',
    live: null
  },
  {
    id: 3,
    year: '2025',
    title: 'Intigrate-Airflow-GCP-ETL-pipeline',
    category: 'Data Engineering',
    description: 'This project demonstrates an end-to-end data pipeline built using Airflow, integrated with Google Cloud Platform services such as Cloud Storage (GCS), BigQuery, and Cloud Data Fusion.',
    tech: ['Python', 'Airflow', 'GCP', 'BigQuery', 'Power BI'],
    github: 'https://github.com/SaiKiran20011060/Intigrate-Airflow-GCP-ETL-pipeline-',
    live: null,
    image: '/Project_img/Integrate-Airfloe-GCP-ETL.jpg'
  },
  {
    id: 4,
    year: '2025',
    title: 'GCP-Employee-Data-ETL-Pipeline',
    category: 'Data Pipeline',
    description: 'A GCP-based ETL pipeline that generates synthetic employee data with Python, stores it in GCS, masks sensitive fields in Data Fusion, loads it into BigQuery, and connects to Power BI for visualization.',
    tech: ['Python', 'GCP', 'BigQuery', 'Power BI'],
    github: 'https://github.com/SaiKiran20011060/GCP-Employee-Data-ETL-Pipeline',
    live: null
  },
  {
    id: 5,
    year: '2024',
    title: 'Excel-AI-Chatbot',
    category: 'Generative AI',
    description: 'A Streamlit-based app that lets users upload Excel files, ask natural language queries, and get insights or visualizations. Powered by Gemini AI to interpret queries and generate Python-based data analysis.',
    tech: ['Python', 'Generative AI', 'Data analysis', 'Streamlit'],
    github: 'https://github.com/SaiKiran20011060/Excel-AI-Chatbot',
    live: null
  },
  {
    id: 6,
    year: '2024',
    title: 'Sentiment Analysis',
    category: 'AI/ML',
    description: 'This project leverages Google Gemini AI and ServiceNow REST APIs to perform sentiment analysis on incident descriptions. The system helps IT service teams understand the emotional tone of incidents and prioritize them accordingly.',
    tech: ['Python', 'Gen AI', 'ServiceNow', 'WebSocket'],
    github: 'https://github.com/SaiKiran20011060/Sentiment-Analysis',
    live: null
  },
  {
    id: 7,
    year: '2024',
    title: 'Files to Dashboards',
    category: 'Web App',
    description: 'A Flask-based web application for managing project tasks and data with session-based user isolation.',
    tech: ['Python', 'Flask', 'HTML'],
    github: 'https://github.com/SaiKiran20011060/Dashboards',
    live: 'https://files-dashboards-syyn.onrender.com'
  },
  {
    id: 8,
    year: '2025',
    title: 'Sai Kiran React Portfolio',
    category: '3D Web Experience',
    description: 'A modern 3D interactive portfolio built with React, TypeScript, and Three.js featuring an animated 3D character, GSAP scroll animations, skill orbit visualization, and dynamic sections.',
    tech: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Vite'],
    github: 'https://github.com/SaiKiran20011060/React-Portfolio',
    live: null
  },
  {
    id: 9,
    year: '2025',
    title: 'Shiny Ecommerce',
    category: 'Web App',
    description: 'A Demo modern e-commerce web application built with Python Shiny, featuring user authentication, shopping cart functionality, order management, and analytics dashboard.',
    tech: ['Python', 'Shiny'],
    github: 'https://github.com/SaiKiran20011060/Shiny-Ecommers',
    live: 'https://01992a0e-dc7c-e0ad-817e-c126b6933dc8.share.connect.posit.cloud/'
  },
  {
    id: 10,
    year: '2022',
    title: 'Quiz Application',
    category: 'Desktop App',
    description: 'A feature-rich desktop quiz application built with Python and tkinter. This application provides a modern user interface, a full user authentication system with different roles, and dynamic quiz content management.',
    tech: ['Python'],
    github: 'https://github.com/SaiKiran20011060/Quiz_Application',
    live: null
  }
];

export const experience = [
  {
    id: 1,
    date: 'January 2024 - Present',
    title: 'Associate Engineer',
    company: 'Virtusa',
    description: [
      'Associate Engineer at Virtusa with ~3 years in software development and cloud technologies, skilled in Python, SQL, and GCP.',
      'Expertise in AI, ML, GenAI, Big Data (Kafka, Spark), and building scalable pipelines.',
      'Adaptable, collaborative, problem-solver aligning tech with business goals.',
      'Driven to explore new technologies, innovate, and deliver impactful solutions.',
      'Assisted in migration projects'
    ]
  },
  {
    id: 2,
    date: 'January 2023 - April 2023',
    title: 'Intern - Trainee',
    company: 'Virtusa',
    description: [
      'Gained hands-on experience with Google Cloud Platform (GCP), including Compute Engine, Storage, Networking, IAM, and BigQuery through training and real-time projects.',
      'Built a strong foundation in cloud solution design and data analysis, equipping me to contribute to scalable and secure GCP-based implementations.'
    ]
  }
];

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  file: string;
  /** Preview image for PDF certificates (first page, pre-rendered) */
  thumb?: string;
}

export const certificates: Certificate[] = [
  { id: 1, title: 'Associate Cloud Engineer', issuer: 'Google', file: '/certificates/Associate Cloud Engineer.png' },
  { id: 2, title: 'AWS Cloud Practitioner', issuer: 'AWS', file: '/certificates/AWS cloud practitioner.jpg' },
  { id: 3, title: 'AWS AI', issuer: 'AWS', file: '/certificates/AWS_AI.png' },
  { id: 4, title: 'Azure AI', issuer: 'Microsoft', file: '/certificates/Azure_AI.jpg' },
  { id: 5, title: 'Oracle Cloud Infrastructure GenAI Professional', issuer: 'Oracle', file: '/certificates/Oracle Cloud Infrastructure 2024 Generative AI Professional.png' },
  { id: 6, title: 'GCP Data Engineering', issuer: 'Google', file: '/certificates/GCP_data_en.jpg' },
  { id: 7, title: 'Data Engineering Master', issuer: 'Udemy', file: '/certificates/Data Engineering Master.jpg' },
  { id: 8, title: 'Airflow', issuer: 'Udemy', file: '/certificates/Airflow.jpg' },
  { id: 9, title: 'Data Structures and Algorithms Analysis', issuer: 'Udemy', file: '/certificates/Data Structures and Algorithms Analysis.png' },
  { id: 10, title: 'Terraform', issuer: 'Udemy', file: '/certificates/Terraform.png' },
  { id: 11, title: 'L400', issuer: 'Google', file: '/certificates/L400.jpg' },
  { id: 12, title: 'Microsoft SQL', issuer: 'Microsoft', file: '/certificates/Microsoft_SQL.jpg' },
  { id: 13, title: 'Excel Skills for Business', issuer: 'Coursera', file: '/certificates/Coursera Excel.pdf', thumb: '/certificates/thumbs/Coursera Excel.jpg' },
  { id: 14, title: 'Business Strategy', issuer: 'Coursera', file: '/certificates/Coursera strategy.pdf', thumb: '/certificates/thumbs/Coursera strategy.jpg' },
  { id: 15, title: 'Financial Accounting', issuer: 'Coursera', file: '/certificates/Financial Accounting.pdf', thumb: '/certificates/thumbs/Financial Accounting.jpg' },
  { id: 16, title: 'Leadership Communication', issuer: 'Coursera', file: '/certificates/Leadership Communication.pdf', thumb: '/certificates/thumbs/Leadership Communication.jpg' },
];
