const client = require('../backend');

const createUser = async (req, res) => {
  const { name, email, password, birthdate } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO users (name, email, password, birthdate) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, birthdate]
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
  const { name, email, password, birthdate } = req.body;
  try {
    const result = await client.query(
      'UPDATE users SET name = $1, email = $2, password = $3, birthdate = $4 WHERE id = $5 RETURNING *',
      [name, email, password, birthdate, req.params.id]
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