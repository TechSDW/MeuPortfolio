import React from 'react';
import { Header } from './components/Header';
import { Biography } from './components/Biography';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { SocialLinks } from './components/SocialLinks';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <Biography />
      <Education />
      <Certifications />
      <Projects />
      <Skills />
      <SocialLinks />
      <Footer />
    </div>
  );
}
