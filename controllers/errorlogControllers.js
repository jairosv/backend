import ErrorLog from "../models/ErrorLog.js";


//Obtiene Log de errores por usuario
const obtenerErroresUser = async (req, res) => {
    try {        
        const logerror = await ErrorLog.findAll({
            where:{
                log_user: req.usuario.USU_CODIGO
            },
            order: [
                ['log_fecha','DESC']
            ]
        });
        res.json(logerror);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export{
    obtenerErroresUser
}