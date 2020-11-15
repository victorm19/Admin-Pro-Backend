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
// pass: 5soyGdITcnVAgN15
// user: mean_user

// Rutas
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/login', require('./routes/auth'));


app.listen( /*Puerto*/process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto '+ process.env.PORT)
})