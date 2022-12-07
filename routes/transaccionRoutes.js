const express = require('express');
const transaccion = require('../controllers/transaccionController');

const router = express.Router();

// Get all transacciones
router.get('/todasTransaciones', transaccion.getTransaccion);

// Create a new transaccion
router.post('/nuevaTransaccion', transaccion.createTransaccion);

module.exports = router;