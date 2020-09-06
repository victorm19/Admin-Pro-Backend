const express = require('express')
require('dotenv').config();
const cors = require('cors')


const { dbConnection } = require('./database/config')

// Crear el servidor de express
const app = express();
// Configuracion Cors
app.use(cors());

// Database
dbConnection();
// pass: 5soyGdITcnVAgN15
// user: mean_user

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "Metodo Get"
    })
});

app.listen( /*Puerto*/process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto '+ process.env.PORT)
})