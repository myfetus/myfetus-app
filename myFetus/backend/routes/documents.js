const express = require('express');
const router = express.Router();
const multer = require('multer');

const { uploadDocument, getDocuments, getDocumentById, deleteDocument } = require('../controllers/documents');

const upload = multer({ dest: 'uploads/' }); // pasta para salvar arquivos temporariamente

router.post('/documents', upload.single('document'), uploadDocument);
router.get('/documents', getDocuments); // lista por pregnant_id (query param)
router.get('/documents/:id', getDocumentById); // busca o doc por id
router.delete('/documents/:id', deleteDocument);

module.exports = router;