import React from 'react';
import { Linkedin, Github, FileText, Palette, ExternalLink } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  description: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/joaosilva",
    icon: <Linkedin className="w-5 h-5" />,
    description: "Perfil profissional e networking"
  },
  {
    name: "GitHub",
    url: "https://github.com/joaosilva",
    icon: <Github className="w-5 h-5" />,
    description: "Repositórios e projetos open source"
  },
];

export function SocialLinks() {
  return (
    <section className="social-links-section">
      <div className="container">
        <h2 className="social-links-title">Redes Profissionais</h2>
        
        <div className="social-links-grid">
          {socialLinks.map((link, index) => (
            <div key={index} className="social-link-card">
              <div className="card-header">
                <h3 className="social-link-title">
                  {link.icon}
                  {link.name}
                </h3>
              </div>
              <div className="card-content">
                <p className="social-link-description">{link.description}</p>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="social-link-button">
                  Acessar
                  <ExternalLink className="social-link-icon" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
