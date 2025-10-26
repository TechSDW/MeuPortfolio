import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import React from 'react';

export function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="header-image">
                        <ImageWithFallback
                        src="/src/public/ProfilePicture.jpeg"
                        alt="Foto de perfil"
                        className="profile-image"
                        />
                    </div>

                    <div className="header-info">
                        <div className="header-text">
                            <h1 className="header-name">Fábio Hiromitsu Nawa</h1>
                            <p className="header-description">Estudante na Fatec Prof. Jessen Vidal em Análise e Desenvolvimento de Sistemas</p>
                        </div>

                        <div className="contact-grid">
                            <div className="contact-item">
                                <Mail className="contact-icon" />
                                <span>fbnawa@gmail.com</span>
                            </div>
                            <div className="contact-item">
                                <Phone className="contact-icon" />
                                <span>(12) 98119-6396</span>
                            </div>
                            <div className="contact-item">
                                <MapPin className="contact-icon" />
                                <span>São José dos Campos, SP</span>
                            </div>
                        </div>
    
                        <div className="social-links">
                            <a className="social-link" href='https://www.linkedin.com/in/f%C3%A1biohnawa/'>
                                <Linkedin/>
                                Fábio Hiromitsu Nawa
                            </a>
                            <a className="social-link" href='https://github.com/TechSDW'>
                                <Github/>
                                TechSDW
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}