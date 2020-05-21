//Los controller tienen metodos que estan asociados a sus endpoints
//importamos el modelo
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req,res) => {

  //Revisar si existen errores de validacion
  const errores = validationResult(req);
  if( !errores.isEmpty() ) {
      return res.status(400).json({errores: errores.array()})
  }


  //Extraer mail y password
  const {email,password} = req.body;


  try {
    //Revisar que user registrado sea unico
    let usuario = await Usuario.findOne({ email });

    if(usuario){
      return res.status(400).json({msg: 'El usuario ya existe'});
    }

    //crea el nuevo usuario
    usuario = new Usuario(req.body);

    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardar usuario
    await usuario.save();

    //crear y firmar el JWT
    const payload = {
        usuario: {
          id: usuario.id
        }
    };

    //firmar el JWT
    jwt.sign(payload, process.env.SECRETA, {
      expiresIn: 3600000
    }, (error, token) => {
      if(error) throw error;

    //mensaje de confirmación
    res.json({ token })

    });


  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
  }
}