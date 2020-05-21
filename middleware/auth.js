const jwt = require('jsonwebtoken');

module.exports =  function(req, res, next) {
    //Leer el token del header
    const token = req.header('x-auth-token');

    console.log(token);
    //Revisar si no hay token
    if(!token) {
        return res.status(401).json({msg: 'No existe token , permiso no valido'})
    }
   

    //Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next(); //para que se dirija al sig middleware
    } catch (error) {
        res.status(401).json({msg: 'Token no valido'});
    }
}