import Roles from '../models/Roles.js';
import ErrorLog from "../models/ErrorLog.js";

//Obtiene los colores del inventario
const obtenerRoles = async (req, res) => {
    try {        
        const roles = await Roles.findAll();
        res.json(roles);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerRoles",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Crea una nuevo color
const crearRoles =  async (req, res) => {
    const rol = new Roles(req.body);    
    try {
        // Creamos
        const rolAlmacenado =  await rol.save();
        res.json(rolAlmacenado);
    
    } catch (error) {
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "crearRoles",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

// Actualizar Departamento
const editarRol = async (req, res ) => {
    const { id } =  req.params;
    try {
        const rol = await Roles.findByPk(id);
        
        rol.rol_descripcion = req.body.rol_descripcion || rol.rol_descripcion;

        const rolAlmacenado = await rol.save();
        res.json(rolAlmacenado);
        
    } catch (error) {       
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "editarRol",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

const elimninarRol = async (req, res) => {
    const { id } =  req.params;

    try {

        const rol = await Roles.findByPk(id);
        
        if(rol){
            await rol.destroy();
        }else{
            const error =  new Error("El rol ya fue eliminado o no existe.")
            return res.status(404).json({msg: error.message });
        }
        
        res.json({msg: 'Rol Eliminado.'});

        
    } catch (error) {       
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "elimninarRol",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}



export{
    obtenerRoles,
    crearRoles,
    editarRol,
    elimninarRol
}