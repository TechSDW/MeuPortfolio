const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize SQLite Database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  // Create courses table
  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE,
      issuer TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create certifications table
  db.run(`
    CREATE TABLE IF NOT EXISTS certifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      issuer TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert sample data
  insertSampleData();
}

function insertSampleData() {
  // Check if data already exists
  db.get('SELECT COUNT(*) as count FROM courses', (err, row) => {
    if (err) {
      console.error('Error checking courses:', err.message);
      return;
    }
    
    // Only insert if table is empty
    if (row.count === 0) {
      // Sample courses data
      const courses = [
        {
          title: "Ensino Médio Técnico",
          issuer: "Senac - São José dos Campos",
          date: "Dezembro 2023",
          category: "Programação",
          description: "Ensino Médio Técnico em Tecnologia da Informação"
        },
        {
          title: "Ensino Superior",
          issuer: "Fatec Professor Jessen Vidal",
          date: "Agosto 2027",
          category: "Programação",
          description: "Análise e Desenvolvimento de Sistemas"
        },
      ];

      // Insert courses
      courses.forEach(course => {
        db.run(
          `INSERT INTO courses (title, issuer, date, category, description) 
           VALUES (?, ?, ?, ?, ?)`,
          [course.title, course.issuer, course.date, course.category, course.description]
        );
      });
      console.log('Sample courses inserted');
    }
  });

  db.get('SELECT COUNT(*) as count FROM certifications', (err, row) => {
    if (err) {
      console.error('Error checking certifications:', err.message);
      return;
    }
    
    // Only insert if table is empty
    if (row.count === 0) {
      // Sample certifications data
      const certifications = [
        {
          title: "Desenvolvimento Web Mobile",
          issuer: "Senai São José dos Campos",
          date: "Novembro 2024",
          category: "Web",
          description: "Desenvolvimento de páginas web utilizando HTML, CSS e JS"
        },
        {
          title: "Fundamentos da Inteligência Artificial",
          issuer: "IBM",
          date: "Junho 2025",
          category: "IA",
          description: "Conhecimentos básicos sobre a IA"
        },
        {
          title: "Escola de Inovadores",
          issuer: "Centro Paula Souza",
          date: "Julho 2025",
          category: "Empreendedorismo",
          description: "Fundamentos sobre o empreendedorismo"
        },
        {
          title: "Boas Práticas para o Mercado de Trabalho",
          issuer: "Senai São José dos Campos",
          date: "Novembro 2024",
          category: "Mercado de Trabalho",
          description: "Noções sobre o funcionamento do mercado de trabalho"
        },
        {
          title: "Power BI",
          issuer: "Senai São José dos Campos",
          date: "Julho 2023",
          category: "Power BI",
          description: "Noções básicas sobre a utilização da ferramenta"
        }
      ];

      // Insert certifications
      certifications.forEach(cert => {
        db.run(
          `INSERT INTO certifications (title, issuer, date, category, description) 
           VALUES (?, ?, ?, ?, ?)`,
          [cert.title, cert.issuer, cert.date, cert.category, cert.description]
        );
      });
      console.log('Sample certifications inserted');
    }
  });
}

// Routes

// Home page with EJS rendering
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Portfolio - Fábio Hiromitsu Nawa',
    message: 'Bem-vindo ao meu portfólio!'
  });
});

// Courses page with dynamic data
app.get('/courses', (req, res) => {
  db.all('SELECT * FROM courses ORDER BY date DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.render('courses', { 
      title: 'Cursos',
      courses: rows 
    });
  });
});

// Certifications page with dynamic data
app.get('/certifications', (req, res) => {
  db.all('SELECT * FROM certifications ORDER BY date DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.render('certifications', { 
      title: 'Certificações',
      certifications: rows 
    });
  });
});

// API Routes for Courses

// GET all courses
app.get('/api/courses', (req, res) => {
  db.all('SELECT * FROM courses ORDER BY date DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET single course
app.get('/api/courses/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM courses WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(row);
  });
});

// POST new course
app.post('/api/courses', (req, res) => {
  const { title, issuer, date, category, description } = req.body;
  
  if (!title || !issuer || !date || !category) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  db.run(
    'INSERT INTO courses (title, issuer, date, category, description) VALUES (?, ?, ?, ?, ?)',
    [title, issuer, date, category, description],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ 
        id: this.lastID, 
        message: 'Course created successfully' 
      });
    }
  );
});

// PUT update course
app.put('/api/courses/:id', (req, res) => {
  const id = req.params.id;
  const { title, issuer, date, category, description } = req.body;
  
  if (!title || !issuer || !date || !category) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  db.run(
    'UPDATE courses SET title = ?, issuer = ?, date = ?, category = ?, description = ? WHERE id = ?',
    [title, issuer, date, category, description, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Course not found' });
        return;
      }
      res.json({ message: 'Course updated successfully' });
    }
  );
});

// DELETE course
app.delete('/api/courses/:id', (req, res) => {
  const id = req.params.id;
  
  db.run('DELETE FROM courses WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json({ message: 'Course deleted successfully' });
  });
});

// API Routes for Certifications

// GET all certifications
app.get('/api/certifications', (req, res) => {
  db.all('SELECT * FROM certifications ORDER BY date DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET single certification
app.get('/api/certifications/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM certifications WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Certification not found' });
      return;
    }
    res.json(row);
  });
});

// POST new certification
app.post('/api/certifications', (req, res) => {
  const { title, issuer, date, category, description } = req.body;
  
  if (!title || !issuer || !date || !category) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  db.run(
    'INSERT INTO certifications (title, issuer, date, category, description) VALUES (?, ?, ?, ?, ?)',
    [title, issuer, date, category, description],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ 
        id: this.lastID, 
        message: 'Certification created successfully' 
      });
    }
  );
});

// PUT update certification
app.put('/api/certifications/:id', (req, res) => {
  const id = req.params.id;
  const { title, issuer, date, category, description } = req.body;
  
  if (!title || !issuer || !date || !category) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  db.run(
    'UPDATE certifications SET title = ?, issuer = ?, date = ?, category = ?, description = ? WHERE id = ?',
    [title, issuer, date, category, description, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Certification not found' });
        return;
      }
      res.json({ message: 'Certification updated successfully' });
    }
  );
});

// DELETE certification
app.delete('/api/certifications/:id', (req, res) => {
  const id = req.params.id;
  
  db.run('DELETE FROM certifications WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Certification not found' });
      return;
    }
    res.json({ message: 'Certification deleted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});
