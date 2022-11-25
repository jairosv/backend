import FormasPago from "../models/FormasPago.js";
import ErrorLog from "../models/ErrorLog.js";

//Obtiene las forma de pago.
const obtenerFormasPago = async (req, res) => {
    try {        
        const formapago = await FormasPago.findAll({
            where:{
                form_pag_mostrarcombo: 'S'
            },
            order: [
                ['form_pag_descripcion','ASC']
            ]
        });
        res.json(formapago);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneArticulosPedido",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Crea la nueva forma de pago
const nuevaFormaPago = async (req, res) => {
    const formapago =  new FormasPago(req.body);    

    try {
        const formapagoAlmacenado =  await formapago.save();
        res.json(formapagoAlmacenado);        
        
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneArticulosPedido",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Editar Forma de pago
const editarFormaPago = async (req, res) => {
    const { id } =  req.params;

    try {
        const formapago = await FormasPago.findByPk(id);
        
        formapago.form_pag_descripcion = req.body.nombre || formapago.form_pag_descripcion;       
        formapago.form_pag_mostrarcombo = req.body.mostrarweb || formapago.form_pag_mostrarcombo;

        const formapagoAlmacenado = await FormasPago.save();
        res.json(formapagoAlmacenado);
        
    } catch (error) {       
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneArticulosPedido",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

const elimninarFormaPago = async (req, res) => {
    const { id } =  req.params;

    try {

        const formapago = await FormasPago.findByPk(id);
        
        if(formapago){
            await formapago.destroy();
        }else{
            const error =  new Error("El banco ya fue eliminado o no existe.")
            const data = {
                log_user: req.usuario.USU_CODIGO,
                log_login: req.usuario.USU_LOGIN,
                log_proceso: "obtieneArticulosPedido",
                log_jsonerror: error,
                log_fecha: Date.now()
            } 
            const errorlog =  new ErrorLog(data);
            const newerrorlog = await errorlog.save(data);
            res.status(500).send(newerrorlog);
        }
        
        res.json({msg: 'Banco Eliminado.'});

        
    } catch (error) {       
        res.status(404).json(error);
        console.log(error);
    }

}

export{
    obtenerFormasPago,
    nuevaFormaPago,
    editarFormaPago,
    elimninarFormaPago
}