import DetalleTalla from "../models/DetalleTallas.js";
import ErrorLog from "../models/ErrorLog.js";

const obtenerDetalleTalla = async (req, res) => {
    const { id } =  req.params;
    try {
        const detatalla = await DetalleTalla.findAll({
            where:{
                det_tal_pren_talla: id
            }
        });
        res.json(detatalla);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerDetalleTalla",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Crear
 const crearDetaTalla =  async (req, res) => {
     const detatalla =  new DetalleTalla(req.body);
     try {
         const detaTallaAlmacenado = await detatalla.save();
         res.json(detaTallaAlmacenado);
      } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "crearDetaTalla",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
      }
}

// Actualizar
const editarDetaTalla = async (req, res ) => {
    const { id } =  req.params;
    
    try {
        const detatalla = await DetalleTalla.findByPk(id);
        
        detatalla.det_tal_pren_talla = req.body.det_tal_pren_talla || detatalla.det_tal_pren_talla
        detatalla.det_tal_pren_detalle = req.body.det_tal_pren_detalle || detatalla.det_tal_pren_detalle;

        console.log(detatalla);

        const detatallaAlmacenado = await detatalla.save();
        res.json(detatallaAlmacenado);
        
    } catch (error) {       
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "editarDetaTalla",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
        console.log(error);
    }
}

//Elminar
const elimninarDetalleTalla = async (req, res) => {
    const { id } =  req.params;

    try {

        const detatalla = await DetalleTalla.findByPk(id);
        
        if(detatalla){
            await detatalla.destroy();
        }else{
            const error =  new Error("El detalle de la talla ya fue eliminado o no existe.")
            return res.status(404).json({msg: error.message });
        }
        
        res.json({msg: 'Detalle de la talla Eliminada.'});

        
    } catch (error) { 
        console.log(error);      
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "elimninarDetalleTalla",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }

}

export {
    obtenerDetalleTalla,
    crearDetaTalla,
    editarDetaTalla,
    elimninarDetalleTalla    
}