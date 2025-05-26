const client = require('../backend');

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('Nenhum arquivo enviado.');

    const { pregnant_id } = req.body;
    if (!pregnant_id) return res.status(400).send('pregnant_id é obrigatório.');

    const { originalname, filename, mimetype, size } = req.file;

    const result = await client.query(
      `INSERT INTO documents (pregnant_id, filename, originalname, mimetype, size) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [pregnant_id, filename, originalname, mimetype, size]
    );

    res.status(201).json({
      message: 'Documento enviado e associado com sucesso!',
      document: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDocuments = async (req, res) => {
    const { pregnant_id } = req.query;

    if (!pregnant_id){
        return res.status(400).json({error: 'Parâmetro pregnant_id é obrigatório'})
    }
  try {
    const result = await client.query('SELECT * FROM documents WHERE pregnant_id = $1', [pregnant_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
};