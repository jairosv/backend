import InvTiposTransaccion from "../models/InvTiposTransaccion.js";
import ErrorLog from "../models/ErrorLog.js";

const obtenerTiposTransaccion = async (req, res) => {
    try {
        const invtipotransaccion = await InvTiposTransaccion.findAll();
        res.json(invtipotransaccion);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerTiposTransaccion",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

const obtenerTiposTransaccionSalida = async (req, res) => {
    try {
        const invtipotransaccion = await InvTiposTransaccion.findAll({
            where:{
                tip_tran_codigo:['OTSAL','SALACT', 'SALDAN','SALGAR']
            }
        });
        
        res.json(invtipotransaccion);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerTiposTransaccionSalida",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

const obtenerTiposTransaccionEntrada = async (req, res) => {
    try {
        const invtipotransaccion = await InvTiposTransaccion.findAll({
            where:{
                tip_tran_codigo:['ENAJCT','ENINTA']
            }
        });
        
        res.json(invtipotransaccion);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerTiposTransaccionEntrada",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Crear
 const crearTipoTransaccion =  async (req, res) => {
     const tipotransaccion =  new InvTiposTransaccion(req.body);     

     try {
         const tipoTransaccionAlmacenado = await tipotransaccion.save();
         res.json(tipoTransaccionAlmacenado);
      } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "crearTipoTransaccion",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
      }
}

// Actualizar
const editarTipoTransaccion = async (req, res ) => {
    const { id } =  req.params;
    try {
        const tipotransaccion = await InvTiposTransaccion.findByPk(id);
        
        tipotransaccion.tip_tran_descripcion = req.body.tip_tran_descripcion || tipotransaccion.tip_tran_descripcion;
        tipotransaccion.tip_tran_signo =  req.body.tip_tran_signo || tipotransaccion.tip_tran_signo

        const tipoTransaccionAlmacenado = await tipotransaccion.save();
        res.json(tipoTransaccionAlmacenado);
        
    } catch (error) {     
        console.log(error);  
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "editarTipoTransaccion",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
        
    }
}

//Elminar
const elimninarTipoTransaccion = async (req, res) => {
    const { id } =  req.params;

    try {

        const tipotransaccion = await InvTiposTransaccion.findByPk(id);
        
        if(tipotransaccion){
            await tipotransaccion.destroy();
        }else{
            const error =  new Error("El Tipo Transacción ya fue eliminado o no existe.")
            const data = {
                log_user: req.usuario.USU_CODIGO,
                log_login: req.usuario.USU_LOGIN,
                log_proceso: "elimninarTipoTransaccion",
                log_jsonerror: error,
                log_fecha: Date.now()
            } 
            const errorlog =  new ErrorLog(data);
            const newerrorlog = await errorlog.save(data);
            res.status(404).send(newerrorlog);
        }
        
        res.json({msg: 'El tipo de transacción fue eliminado.'});

        
    } catch (error) { 
        console.log(error);      
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "elimninarTipoTransaccion",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }

}

export {
    obtenerTiposTransaccion,
    crearTipoTransaccion,
    editarTipoTransaccion,
    elimninarTipoTransaccion,
    obtenerTiposTransaccionSalida,
    obtenerTiposTransaccionEntrada
}