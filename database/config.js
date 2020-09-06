const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('BD online')
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar la base de datos')
    }
}

module.exports = {
    dbConnection
}