const express = require('express');
const app = express()
const userRoutes = require('./routes/users');

app.use(express.json());
app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log('servidor rodando na porta 3000')
})