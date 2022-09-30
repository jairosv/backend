import Ejecutables from '../models/Ejecutables.js';
import RolEjecutables from '../models/RolEjecutables.js';
import db from '../config/database.js';
import ErrorLog from "../models/ErrorLog.js";

//Obtiene los bancos.
const obtenerEjecutables = async (req, res) => {
    try {        
        const ejecutables = await Ejecutables.findAll();
        res.json(ejecutables);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerEjecutables",
            log_jsonerror: resultado,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);

    }
}

//Obtiene los bancos.
const obtenerRolesEjecutables = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await db.query('CALL seg_list_rolesejecutables(:Pni_rol);',{
            replacements: {
                Pni_rol: id
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerRolesEjecutables",
            log_jsonerror: resultado,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

const asignarRolEjecutable = async (req, res) => {
    const rolejecutable =  new RolEjecutables(req.body);    

    rolejecutable.rol_eje_fechacreado = Date.now();
    rolejecutable.rol_eje_creadopor = req.usuario.USU_LOGIN;

    try {
        const rolejecutableAlmacenado =  await rolejecutable.save();
        res.json(rolejecutableAlmacenado);
        
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "asignarRolEjecutable",
            log_jsonerror: resultado,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

const elimninarRolEjecutable = async (req, res) => {
    const { id,ejeid } =  req.params;

    try {
        
        await RolEjecutables.destroy({
                where:{
                    rol_eje_rolid: id,
                    rol_eje_ejecutableid: ejeid
                }
            });
        
        
        res.json({msg: 'Eliminado.'});
        
    } catch (error) {       
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "elimninarRolEjecutable/NoControlado",
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
    obtenerEjecutables,
    obtenerRolesEjecutables,
    asignarRolEjecutable,
    elimninarRolEjecutable
}