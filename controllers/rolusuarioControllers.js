import RolUsuarios from "../models/RolUsuarios.js";
import db from '../config/database.js';
import ErrorLog from "../models/ErrorLog.js";

//Obtiene los colores del inventario
const obtenerRolUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await db.query('CALL web_seg_listado_roluser(:Pni_usuario)',{
            replacements: {
                Pni_usuario: id
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerDepartamentos",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Crea Rol
const crearRolUsuario =  async (req, res) => {
    const rolusuario = new RolUsuarios(req.body);
    rolusuario.rol_usu_creadopor = req.usuario.USU_LOGIN;
    rolusuario.rol_usu_fechacreado = Date.now();
    
    try {
        // Creamos
        const rolusuarioAlmacenado =  await rolusuario.save();
        res.json(rolusuarioAlmacenado);
    
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerDepartamentos",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}


const elimninarRolUsuario = async (req, res) => {
    const { id, idrol } =  req.params;

    try {

        const roluser = await RolUsuarios.findAll({
            where:{
                rol_usu_usuarioid: id,
                rol_usu_rolid: idrol
            }
        });
        
        if(roluser){
            await RolUsuarios.destroy({
                where:{
                    rol_usu_usuarioid: id,
                    rol_usu_rolid: idrol
                }
            });
        }else{
            const error =  new Error("El Rol ya fue eliminado o no existe.")
            return res.status(404).json({message: error.message });
        }
        
        res.json({message: 'Rol Desasignado.'});

        
    } catch (error) {       
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerDepartamentos",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }

}



export{
    obtenerRolUsuario,
    crearRolUsuario,
    //editarColor,
    elimninarRolUsuario
}