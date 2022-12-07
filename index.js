// Aplicacion nodejs principal para el servidor
// Creado por: Rocio Romero

// Configuramos el entorno
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Importamos las librerias necesarias
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoDB = require("./dbConnection");

// Conectamos a la base de datos
mongoDB();

// Configuramos el puerto
var port = process.env.PORT || 8080;

// Configuramos el body parser para obtener los datos de las peticiones POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuramos el CORS para permitir peticiones desde otros dominios
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Ruta de prueba
app.get('/test', function(req, res) {
    console.log("Ruta de prueba");
    res.json({ message: 'Bienvenido a la API de usuarios' });
});

// Ruta para cargar front-end
app.get('/', function(req, res) {
    console.log("Cargando front-end");
    res.sendFile(__dirname + '/public/index.html');
});

// Ruta para cargar front-end
app.post('/nuevaTransaccion', function(req, res) {
    console.log("Transaccion realizada");
    let concepto = req.body.concepto;
    let cantidad = req.body.cantidad;

    // Añadir a la base de datos la transaccion
    

    res.send("Transaccion realizada: " + concepto + " " + cantidad);
});

// Importamos las rutas
const transacionRoutes = require('./routes/transaccionRoutes');

app.use('/api/v1/transaccion', transacionRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
