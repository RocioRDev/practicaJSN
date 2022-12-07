const mongoose = require('mongoose');

const transaccionSchema = new mongoose.Schema({        
        concepto: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
);

const Transaccion = mongoose.model('Transaccion', transaccionSchema);

module.exports = Transaccion;
