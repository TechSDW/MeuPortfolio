import { GraduationCap, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import React from 'react';

interface EducationItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: string;
  description?: string;
  created_at: string;
}

export function Education() {
  const [courses, setCourses] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      console.log("Cursos recebidos:", data)
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="education-section">
        <div className="container">
          <h2 className="education-title">Formação Acadêmica</h2>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3">Carregando cursos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="education-section">
        <div className="container">
          <h2 className="education-title">Formação Acadêmica</h2>
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Erro ao carregar cursos</h4>
            <p>{error}</p>
            <hr />
            <button className="btn btn-outline-danger" onClick={fetchCourses}>
              Tentar novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="education-section">
      <div className="container">
        <h2 className="education-title">Formação Acadêmica</h2>
        
        <div className="education-grid">
          {courses.map((course) => (
            <div key={course.id} className="education-card">
              <div className="card-header">
                <div className="education-header">
                  <div className="education-icon">
                    <GraduationCap className="education-icon-svg" />
                  </div>
                  <div className="education-info">
                    <h3 className="education-degree">{course.title}</h3>
                    <p className="education-institution">{course.issuer}</p>
                    <div className="education-period">
                      <Calendar className="period-icon" />
                      <span>{course.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <p className="education-description">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
