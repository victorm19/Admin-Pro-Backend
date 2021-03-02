const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const usuario = require("../models/usuario");


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });
        // Verificar email
        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: "Email no encontrado"
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: "La contraseña no es valida"
            });
        }

        // Generar token - JWT
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado .. revisar logs'
        })
    }

}

const googleSingIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {
        const { email, name, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            // No existe Usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // Existe Usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en BD
        await usuario.save();

        // Generar el token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es valido'
        });
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Obteneer usuario
    const usuario = await Usuario.findById(uid);

    // Generar JWT
    const token = await generarJWT(uid)
    res.json({
        ok: true,
        token,
        usuario
    })
}

module.exports = {
    login,
    googleSingIn,
    renewToken
}
