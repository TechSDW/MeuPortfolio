# Portfolio Acadêmico - Full Stack Implementation

Este projeto implementa um portfólio acadêmico completo com frontend React e backend Node.js/Express, incluindo todas as funcionalidades solicitadas.

## 🚀 Funcionalidades Implementadas

### ✅ Backend (Node.js/Express)
- **Servidor Express** com rotas configuradas
- **EJS Templating Engine** para renderização dinâmica
- **SQLite Database** para armazenar cursos e certificações
- **API RESTful** completa com operações CRUD
- **CORS** configurado para comunicação com frontend

### ✅ Frontend (React)
- **Interface moderna** com CSS customizado (sem Tailwind)
- **Consumo de API** para buscar dados dinamicamente
- **Estados de loading e erro** para melhor UX
- **Componentes responsivos** e acessíveis

### ✅ HTTP Requests Implementados
- **GET** - Listar todos os cursos/certificações
- **GET** - Buscar item específico por ID
- **POST** - Criar novos cursos/certificações
- **PUT** - Atualizar cursos/certificações existentes
- **DELETE** - Remover cursos/certificações

### ✅ EJS Templates com Renderização Dinâmica
- **Página inicial** com informações dinâmicas
- **Página de cursos** com dados do banco
- **Página de certificações** com dados do banco
- **Formulários interativos** para adicionar novos itens
- **Testes de API** integrados nas páginas

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- EJS (Embedded JavaScript)
- SQLite3
- CORS
- Body-parser

### Frontend
- React 18
- TypeScript
- Lucide React (ícones)
- CSS Customizado
- Fetch API

## 📁 Estrutura do Projeto

```
Portfólio Acadêmico/
├── backend/
│   ├── server.js          # Servidor principal
│   ├── package.json       # Dependências do backend
│   ├── database.sqlite    # Banco de dados SQLite
│   └── views/             # Templates EJS
│       ├── index.ejs      # Página inicial
│       ├── courses.ejs    # Página de cursos
│       └── certifications.ejs # Página de certificações
├── src/                   # Frontend React
│   ├── components/        # Componentes React
│   ├── index.css         # Estilos customizados
│   └── App.tsx           # Componente principal
└── package.json          # Dependências do frontend
```

## 🚀 Como Executar

### 1. Backend (Porta 3001)
```bash
cd backend
npm install
npm start
```

### 2. Frontend (Porta 3000)
```bash
npm install
npm run dev
```

## 📡 Endpoints da API

### Cursos
- `GET /api/courses` - Listar todos os cursos
- `GET /api/courses/:id` - Buscar curso por ID
- `POST /api/courses` - Criar novo curso
- `PUT /api/courses/:id` - Atualizar curso
- `DELETE /api/courses/:id` - Deletar curso

### Certificações
- `GET /api/certifications` - Listar todas as certificações
- `GET /api/certifications/:id` - Buscar certificação por ID
- `POST /api/certifications` - Criar nova certificação
- `PUT /api/certifications/:id` - Atualizar certificação
- `DELETE /api/certifications/:id` - Deletar certificação

## 🎨 Páginas EJS

### Página Inicial (`/`)
- Apresentação do portfólio
- Links para outras seções
- Documentação da API
- Informações sobre as tecnologias

### Página de Cursos (`/courses`)
- Lista dinâmica de cursos do banco
- Formulário para adicionar novos cursos
- Testes interativos da API
- Renderização com variáveis EJS

### Página de Certificações (`/certifications`)
- Lista dinâmica de certificações do banco
- Formulário para adicionar novas certificações
- Testes interativos da API
- Renderização com variáveis EJS

## 💾 Banco de Dados

### Tabela `courses`
- `id` (INTEGER PRIMARY KEY)
- `title` (TEXT NOT NULL)
- `issuer` (TEXT NOT NULL)
- `date` (TEXT NOT NULL)
- `category` (TEXT NOT NULL)
- `description` (TEXT)
- `created_at` (DATETIME)

### Tabela `certifications`
- `id` (INTEGER PRIMARY KEY)
- `title` (TEXT NOT NULL)
- `issuer` (TEXT NOT NULL)
- `date` (TEXT NOT NULL)
- `category` (TEXT NOT NULL)
- `description` (TEXT)
- `created_at` (DATETIME)

## 🔧 Funcionalidades Especiais

### Renderização Dinâmica EJS
- Uso de variáveis `<%= variable %>` para exibir dados
- Loops `<% array.forEach() %>` para listar itens
- Condicionais `<% if (condition) %>` para lógica
- Layouts reutilizáveis com `<%- body %>`

### API RESTful Completa
- Validação de dados de entrada
- Tratamento de erros HTTP
- Respostas JSON padronizadas
- CORS configurado para frontend

### Frontend Reativo
- Estados de loading durante requisições
- Tratamento de erros com retry
- Interface responsiva
- Consumo dinâmico da API

## 📝 Exemplo de Uso da API

### Adicionar Novo Curso
```javascript
const response = await fetch('http://localhost:3001/api/courses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'React Avançado',
    issuer: 'Alura',
    date: 'Dezembro 2024',
    category: 'Web',
    description: 'Curso avançado de React com hooks e context'
  })
});
```

### Buscar Certificações
```javascript
const response = await fetch('http://localhost:3001/api/certifications');
const certifications = await response.json();
```

## 🎯 Objetivos Alcançados

✅ **Rotas Configuradas** - Express com rotas para páginas e API  
✅ **Renderização Dinâmica EJS** - Templates com variáveis e lógica  
✅ **Exibição de Variáveis** - Dados do banco renderizados em HTML  
✅ **HTTP Requests** - GET, POST, PUT, DELETE implementados  
✅ **SQLite Database** - Banco para cursos e certificações  
✅ **Frontend Integrado** - React consumindo a API  
✅ **Interface Completa** - Formulários e testes de API  

## 👨‍💻 Autor

**Fábio Hiromitsu Nawa**  
Estudante de Engenharia de Software - Fatec Prof. Jessen Vidal

---

*Projeto desenvolvido como portfólio acadêmico demonstrando conhecimentos em desenvolvimento full-stack.*