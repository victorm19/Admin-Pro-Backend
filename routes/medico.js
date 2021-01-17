/*
    Ruta: /api/medico
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medico');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
// Consultar todos los medicos
router.get('/', getMedicos);

// Crear un medico
router.post(
    '/',
    validarJWT,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico);

router.put(
    '/:id',
    [],
    actualizarMedico);

router.delete(
    '/:id',
    borrarMedico
);


module.exports = router;