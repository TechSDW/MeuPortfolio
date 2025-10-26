import { Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import React from 'react';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: string;
  description?: string;
  created_at: string;
}

export function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/certifications');
      if (!response.ok) {
        throw new Error('Failed to fetch certifications');
      }
      const data = await response.json();
      console.log("Certificados recebidos:", data)
      setCertifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="certifications-section">
        <div className="container">
          <h2 className="certifications-title">Cursos e Certificações</h2>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3">Carregando certificações...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="certifications-section">
        <div className="container">
          <h2 className="certifications-title">Cursos e Certificações</h2>
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Erro ao carregar certificações</h4>
            <p>{error}</p>
            <hr />
            <button className="btn btn-outline-danger" onClick={fetchCertifications}>
              Tentar novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="certifications-section">
      <div className="container">
        <h2 className="certifications-title">Cursos e Certificações</h2>
        
        <div className="certifications-grid">
          {certifications.map((cert) => (
            <div key={cert.id} className="certification-card">
              <div className="card-header">
                <div className="certification-header">
                  <div className="certification-icon">
                    <Award className="certification-icon-svg" />
                  </div>
                  <div className="certification-info">
                    <h3 className="certification-title">{cert.title}</h3>
                    <p className="certification-issuer">{cert.issuer}</p>
                  </div>
                  <span className="certification-badge">{cert.category}</span>
                </div>
              </div>
              <div className="card-content">
                <p className="certification-date">{cert.date}</p>
                {cert.description && (
                  <p className="certification-description">{cert.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
