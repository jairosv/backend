import Tallas from '../models/Tallas.js';
import ErrorLog from "../models/ErrorLog.js";

//Obtiener
const obtenerTallas = async (req, res) => {
    try {        
        const tallas = await Tallas.findAll();
        res.json(tallas);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerTallas",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Crea
const crearTalla =  async (req, res) => {
    const talla = new Tallas(req.body);

    try {
        // Creamos
        const tallaAlmacenado =  await talla.save();
        res.json(tallaAlmacenado);
    
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "crearTalla",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

// Actualizar
const editarTalla = async (req, res ) => {
    const { id } =  req.params;
    try {
        const talla = await Tallas.findByPk(id);
        
        talla.tal_pren_descripcion = req.body.tal_pren_descripcion || talla.tal_pren_descripcion;
        
        const tallaAlmacenado = await talla.save();
        res.json(tallaAlmacenado);
        
    } catch (error) {       
        res.status(404).json(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "editarTalla",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Elimina
const elimninarTalla = async (req, res) => {
    const { id } =  req.params;

    try {

        const talla = await Tallas.findByPk(id);
        
        if(talla){
            await talla.destroy();
        }else{
            const error =  new Error("La talla ya fue eliminado o no existe.")
            //return res.status(404).json({msg: error.message });
            const data = {
                log_user: req.usuario.USU_CODIGO,
                log_login: req.usuario.USU_LOGIN,
                log_proceso: "elimninarTalla",
                log_jsonerror: error,
                log_fecha: Date.now()
            } 
            const errorlog =  new ErrorLog(data);
            const newerrorlog = await errorlog.save(data);
            return res.status(500).send(newerrorlog);
        }
        
        res.json({msg: 'Talla Eliminado.'});

        
    } catch (error) {       
        res.status(404).json(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "elimninarTalla",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }

}



export{
    obtenerTallas,
    crearTalla,
    editarTalla,
    elimninarTalla
}