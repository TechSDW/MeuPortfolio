import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: "Site web sobre os fundamentos SCRUM",
    description: "Este trabalho foi desenvolvido durante o primeiro semestre do meu ensino superior, seu propósito é ensinar ao usuário sobre o SCRUM",
    technologies: ["HTML", "CSS", "JavaScript", "Figma"],
    githubUrl: "https://github.com/Os-Python-On/API-OsPythonOn",
  },
  {
    title: "IDE utilizando IA",
    description: "Foi desenvolvida uma IDE com uma IA integrada para que o usuário consiga feedback sobre seu código",
    technologies: ["Ollama", "Java", "MySQL", "Figma"],
    githubUrl: "https://github.com/API-DeepCode/API2"
  },
  {
    title: "Site galeria de loja virtual",
    description: "Aplicativo web com o intuito de criar uma pequena loja virtual, desenvolvido durante o curso de desenvolvimento web/mobile",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Capivarelos/Site-Galeria-de-loja-Virtual",
  },
];

export function Projects() {
  return (
    <section className="projects-section">
      <div className="container">
        <h2 className="projects-title">Projetos Desenvolvidos</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="card-header">
                <h3 className="project-title">{project.title}</h3>
              </div>
              <div className="card-content">
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="technology-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="project-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link github-link">
                      <Github className="link-icon" />
                      Código
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link demo-link">
                      <ExternalLink className="link-icon" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
