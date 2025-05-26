const client = require('../backend');

const createPregnancy = async (req, res) => {
  const { pregnant_id, weeks, is_checked = false } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO pregnancies (pregnant_id, weeks, is_checked) VALUES ($1, $2, $3) RETURNING *',
      [pregnant_id, weeks, is_checked]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPregnancies = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pregnancies');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPregnancy, getPregnancies };