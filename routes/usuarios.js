//Rutas para crear users
const express = require('express')
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');


//Crea un user
//api/usuarios, al enviar un post hacia esta parte se ejecutara el code
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','Agrega un email valido').isEmail(),
    check('password','Usar minimo 6 caracteres').isLength({ min:6 })
],
    usuarioController.crearUsuario
);

module.exports = router;