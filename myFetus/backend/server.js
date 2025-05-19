const express = require('express');
const app = express()

app.use(express.json());

const userRoutes = require('./routes/users');

app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log('servidor rodando na porta 3000')
})