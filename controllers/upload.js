const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital (tipo)'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se selécciono ningun archivo'
        })
    }

    // Procesar imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');  // foto.1.12.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extención
    const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extencionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extención permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err) => {

        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}

const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathing = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // Imagen por defecto
    if (fs.existsSync(pathing)) {
        res.sendFile(pathing);
    } else {
        const pathing = path.join(__dirname, `../uploads/no-avialable.png`);
        res.sendFile(pathing)
    }
}


module.exports = {
    fileUpload,
    retornaImagen
}