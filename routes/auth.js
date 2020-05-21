//Rutas para AUTENTICAR usuarios
const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

//Iniciar sesion

//api/auth, al enviar un post hacia esta parte se ejecutara el code
router.post('/',
[
    /*check('email','Agrega un email valido').isEmail(),
    check('password','Usar minimo 6 caracteres').isLength({ min:6 })*/
],
    authController.autenticarUsuario
);

//Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado


);

module.exports = router;