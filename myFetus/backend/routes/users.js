const express = require('express');
const router = express.Router();
const client = require('../backend');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

//validação

const validateUser = [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
    body('birthdate').isDate().withMessage('Data de nascimento inválida')
];


router.post('/', validateUser, async (req, res) => {
       const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, birthdate } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await client.query(
            'INSERT INTO users (name, email, password, birthdate) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, hashedPassword, birthdate]
        );
        delete result.rows[0].password;
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT id, name, email, birthdate FROM users'); // Sem senha
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const result = await client.query('SELECT id, name, email, birthdate FROM users WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).send('Usuário não encontrado');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:id', validateUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
     const { name, email, password, birthdate } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await client.query(
            'UPDATE users SET name = $1, email = $2, password = $3, birthdate = $4 WHERE id = $5 RETURNING id, name, email, birthdate',
            [name, email, hashedPassword, birthdate, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).send('Usuário não encontrado');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).send('Usuário não encontrado');
        res.send('Usuário deletado com sucesso');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', [
     body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('Senha é obrigatória')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
   
    const { email, password } = req.body;
    try {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const user = result.rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        delete user.password;

        res.status(200).json({ message: 'Login bem-sucedido', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
