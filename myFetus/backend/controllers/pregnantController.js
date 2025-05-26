const client = require('../backend');

const createPregnant = async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO pregnants (user_id) VALUES ($1) RETURNING *',
      [user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPregnants = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pregnants');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPregnant, getPregnants };