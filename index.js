// Aplicacion nodejs principal para el servidor
// Creado por: Rocio Romero

// Configuramos el entorno
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Importamos las librerias necesarias
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoDB = require("./dbConnection");
const cors = require("cors");

// Conectamos a la base de datos
mongoDB();

// Configuramos el puerto
var port = process.env.PORT || 8080;

// Configuramos el body parser para obtener los datos de las peticiones POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// función middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Proxy
app.enable("trust proxy");

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
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

const transaccion = require('./controllers/transaccionController');
// Ruta para peticiones POST de transacciones
//app.post('/', transaccion.createTransaccion);
// app.post('/', function(req, res) {
//   console.log("Peticion POST recibida del front-end");
//   transaccion.createTransaccion(req, res);
//   res.sendFile(__dirname + '/public/index.html');
// });

// Importamos las rutas
const transacionRoutes = require('./routes/transaccionRoutes');

app.use('/api/v1/transaccion', transacionRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

