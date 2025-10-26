import React from 'react';
import { Code2, Users } from 'lucide-react';

const technicalSkills = [
  "JavaScript/TypeScript",
  "React",
  "Node.js",
  "Python",
  "SQL/PostgreSQL",
  "C#",
  "Git/GitHub",
  "HTML/CSS",
  "RESTful APIs",
  "Java",
];

const softSkills = [
  "Trabalho em Equipe",
  "Comunicação Efetiva",
  "Resolução de Problemas",
  "Pensamento Crítico",
  "Gestão de Tempo",
  "Adaptabilidade",
  "Proatividade"
];

export function Skills() {
  return (
    <section className="skills-section">
      <div className="container">
        <h2 className="skills-title">Competências</h2>
        
        <div className="skills-grid">
          <div className="skill-card">
            <div className="card-header">
              <div className="skill-header">
                <div className="skill-icon">
                  <Code2 className="skill-icon-svg" />
                </div>
                <h3 className="skill-card-title">Competências Técnicas</h3>
              </div>
            </div>
            <div className="card-content">
              <div className="skills-list">
                {technicalSkills.map((skill, index) => (
                  <span key={index} className="skill-badge technical-skill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="skill-card">
            <div className="card-header">
              <div className="skill-header">
                <div className="skill-icon">
                  <Users className="skill-icon-svg" />
                </div>
                <h3 className="skill-card-title">Competências Interpessoais</h3>
              </div>
            </div>
            <div className="card-content">
              <div className="skills-list">
                {softSkills.map((skill, index) => (
                  <span key={index} className="skill-badge soft-skill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
