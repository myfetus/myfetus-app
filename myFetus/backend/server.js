const express = require('express');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/users');
const pregnantRoutes = require('./routes/pregnants');
const pregnancyRoutes = require('./routes/pregnancies');
const pregnancyEventsRoutes = require('./routes/pregnancyEvents');

//documentos
const documentsRoutes = require('./routes/documents');

app.use('/users', userRoutes);
app.use('/pregnants', pregnantRoutes);
app.use('/pregnancies', pregnancyRoutes);
app.use('/pregnancy-events', pregnancyEventsRoutes);
app.use('/api', documentsRoutes);

app.listen(3000, () => {
    console.log('servidor rodando na porta 3000')
})

/* pra depois:

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
*/