const express = require('express');
const router = express.Router();
const multer = require('multer');

const { uploadDocument, getDocuments } = require('../controllers/documents');

const upload = multer({ dest: 'uploads/' }); // pasta para salvar arquivos temporariamente

router.post('/documents', upload.single('document'), uploadDocument);
router.get('/documents', getDocuments);

module.exports = router;