/*
    Ruta: /api/hospital
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospital');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
// Consultar todos los usuarios
router.get('/', getHospitales);

// Crear un usuario
router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHospital);

router.put(
    '/:id',
    [],
    actualizarHospital);

router.delete(
    '/:id',
    borrarHospital
);


module.exports = router;