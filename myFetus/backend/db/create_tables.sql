CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  birthdate DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de gestantes
CREATE TABLE IF NOT EXISTS pregnants (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de gestações
CREATE TABLE IF NOT EXISTS pregnancies (
  id SERIAL PRIMARY KEY,
  pregnant_id INTEGER REFERENCES pregnants(id) ON DELETE CASCADE,
  weeks INTEGER NOT NULL,
  is_checked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de eventos da gestação
CREATE TABLE IF NOT EXISTS pregnancy_events (
  id SERIAL PRIMARY KEY,
  pregnancy_id INTEGER REFERENCES pregnancies(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  event_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

 -- Tabela de documentos da gestante
CREATE TABLE IF NOT EXISTS pregnant_documents (
  id SERIAL PRIMARY KEY,
  pregnant_id INTEGER NOT NULL REFERENCES pregnants(id) ON DELETE CASCADE,
  document_name VARCHAR(255) NOT NULL,
  document_type VARCHAR(100),       -- tipo do documento (ex: RG, exame, laudo, receita)
  file_path TEXT NOT NULL,           -- caminho do arquivo no servidor ou URL (se armazenar externamente)
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);