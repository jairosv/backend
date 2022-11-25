import jwt from 'jsonwebtoken';
import Usuarios from "../models/Usuarios.js"


const checkAuth = async (req, res, next) => {
    let token;  
    if(req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.usuario = await Usuarios.findByPk(decoded.id,{
                attributes: {exclude: ['USU_PASSWORD', 'USU_TOKEN', 'USU_CONFIRMADO']}
            });

            return next();
            
        } catch (error) {
            console.log(error);
            return res.status(404).json({msg:error});
        }
    }

    if(!token) {
        const error = new Error('Token no válido');
        return res.status(400).json({msg: error.message});
    }
    next();

}

export default checkAuth;