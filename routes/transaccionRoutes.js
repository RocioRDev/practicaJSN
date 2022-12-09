const express = require('express');
const transaccion = require('../controllers/transaccionController');

const router = express.Router();

// Get all transacciones
router.get('/todasTransaciones', transaccion.getAllTransaccion);

// Get a transaccion
router.get('/transaccion/:id', transaccion.getTransaccion);

// Create a new transaccion
router.post('/nuevaTransaccion', transaccion.createTransaccion);

// Delete a transaccion
router.delete('/borrarTransaccion/:id', transaccion.deleteTransaccion);

module.exports = router;