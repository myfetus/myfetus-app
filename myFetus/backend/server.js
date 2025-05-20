const express = require('express');
const cors = require('cors');
const app = express();

// Configuração do CORS
app.use(cors());

app.use(express.json());

const userRoutes = require('./routes/users');

app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log('servidor rodando na porta 3000')
})