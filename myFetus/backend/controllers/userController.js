const client = require('../backend');

// TODO: validação

const createUser = async (req, res) => {
  const { name, email, password, birthdate, is_active = true, role = 'user' } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO users (name, email, password, birthdate, is_active, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, password, birthdate, is_active, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).send('Usuário não encontrado');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { name, email, password, birthdate, is_active, role } = req.body;
  try {
    const result = await client.query(
      'UPDATE users SET name = $1, email = $2, password = $3, birthdate = $4, is_active = $5, role = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [name, email, password, birthdate, is_active, role, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).send('Usuário não encontrado');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).send('Usuário não encontrado');
    res.send('Usuário deletado com sucesso');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};