const express = require('express')
require('dotenv').config();
const cors = require('cors')


const { dbConnection } = require('./database/config')

// Crear el servidor de express
const app = express();
// Configuracion Cors
app.use(cors());

// Lectura y parseo del body
app.use( express.json() )

// Database
dbConnection();

// Directorio publico
app.use( express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospital'));
app.use('/api/medicos', require('./routes/medico'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/upload'));


app.listen( /*Puerto*/process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto '+ process.env.PORT)
})