const Transaccion = require('../models/transaccionModel');

exports.getAllTransaccion = async (req, res) => {
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

exports.getTransaccion = async (req, res) => {
    try {
        const transaccion = await Transaccion.findById(req.params.id);

        res.status(200).json({
        status: 'success',
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

exports.deleteTransaccion = async (req, res) => {
    console.log("Borrando transaccion");
    try {
        const deleteTransaccion = await Transaccion.findByIdAndDelete(req.params.id);
        console.log("Transaccion borrada: " + deleteTransaccion);

        res.status(204).json({
        status: 'success',
        data: null
        });
    } catch (err) {
        res.status(404).json({
        status: 'fail',
        message: err
        });
    }
}