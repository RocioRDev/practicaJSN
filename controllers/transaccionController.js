const Transaccion = require('../models/transaccionModel');

exports.getTransaccion = async (req, res) => {
  try {
    const transaccion = await Transaccion.find();

    res.status(200).json({
      status: 'success',
        results: transaccion.length,
        data: {
            transaccion
        }
    });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createTransaccion = async (req, res) => {
    try {
        const newTransaccion = await Transaccion.create(req.body);
    
        res.status(201).json({
        status: 'success',
        data: {
            transaccion: newTransaccion
        }
        });
    } catch (err) {
        res.status(400).json({
        status: 'fail',
        message: err
        });
    }
};
