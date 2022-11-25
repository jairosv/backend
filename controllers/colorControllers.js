import Colores from '../models/Colores.js';
import ErrorLog from "../models/ErrorLog.js";

//Obtiene los colores del inventario
const obtenerColores = async (req, res) => {
    try {        
        const colores = await Colores.findAll();
        res.json(colores);

    } catch (error) {
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerColores",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Crea una nuevo color
const crearColores =  async (req, res) => {
    const colores = new Colores(req.body);
    colores.col_creado_por = req.usuario.USU_LOGIN;
    colores.col_fechacreado = Date.now();
    colores.col_modificado_por = null;
    colores.col_fechamodificado = null;    
    try {
        // Creamos
        const colorAlmacenado =  await colores.save();
        res.json(colorAlmacenado);
    
    } catch (error) {
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "crearColores",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

// Actualizar Departamento
const editarColor = async (req, res ) => {
    const { id } =  req.params;
    try {
        const color = await Colores.findByPk(id);
        
        color.col_descripcion = req.body.col_descripcion || color.col_descripcion;
        color.col_siglas = req.body.col_siglas || color.col_siglas;        
        color.col_modificado_por = req.usuario.USU_LOGIN|| color.col_modificado_por
        color.col_fechamodificado = Date.now() || color.col_fechamodificado
        color.col_cod_paleta = req.body.col_cod_paleta || color.col_cod_paleta;

        const colorAlmacenado = await color.save();
        res.json(colorAlmacenado);
        
    } catch (error) {       
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "editarColor",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

const elimninarColor = async (req, res) => {
    const { id } =  req.params;

    try {

        const color = await Colores.findByPk(id);
        
        if(color){
            await color.destroy();
        }else{
            const error =  new Error("El color ya fue eliminado o no existe.")
            const data = {
                log_user: req.usuario.USU_CODIGO,
                log_login: req.usuario.USU_LOGIN,
                log_proceso: "elimninarColor",
                log_jsonerror: error,
                log_fecha: Date.now()
            } 
            const errorlog =  new ErrorLog(data);
            const newerrorlog = await errorlog.save(data);
            return res.status(500).send(newerrorlog);
        }
        
        res.json({msg: 'Color Eliminado.'});

        
    } catch (error) {       
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "elimninarColor",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
        console.log(error);
    }

}



export{
    obtenerColores,
    crearColores,
    editarColor,
    elimninarColor
}