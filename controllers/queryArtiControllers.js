import db from '../config/database.js';
import ErrorLog from "../models/ErrorLog.js";

//Obtiene los articulos 
const obtenerArticulos = async (req, res) => {
    const parametros = req.body;

    try {
        const resultado = await db.query('CALL web_listado_articulos(:Pvi_codiarticulo,:Pvi_nombre,:Pni_marca,:Pvi_simbolo,:Pni_cantidad,:Pni_departamento,:Pni_sub_departamento,:Pni_sub_categoria, :Pvi_signofecha,:Pnd_fechaingreso,:Pni_idcolor,:Pni_idtalla);',{
            replacements: {
                Pvi_codiarticulo: parametros.Pvi_codiarticulo || "",
                Pvi_nombre: parametros.Pvi_nombre || "",
                Pni_marca: parametros.Pni_marca || "",
                Pvi_simbolo: parametros.Pvi_simbolo || ">=",
                Pni_cantidad: parametros.Pni_cantidad || 0,
                Pni_departamento: parametros.Pni_departamento || "",
                Pni_sub_departamento: parametros.Pni_sub_departamento || "",
                Pni_sub_categoria: parametros.Pni_sub_categoria || "",
                Pvi_signofecha: parametros.Pvi_signofecha || ">=",
                Pnd_fechaingreso: parametros.Pnd_fechaingreso || "",
                Pni_idcolor: parametros.Pni_idcolor || null,
                Pni_idtalla: parametros.Pni_idtalla || null
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerArticulos",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Obtiene las localizaciones de los articulos.
const obtieneArticulosLocalizacion = async (req, res) => {

    const parametros = req.body;

    try {
        const resultado = await db.query('CALL web_listado_locaarticulos(:ATO_CODIGO);',{
            replacements: {
                ATO_CODIGO: parametros.ATO_CODIGO
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneArticulosLocalizacion",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Obtiene las localizaciones de los articulos.
const obtieneArticulosTallas = async (req, res) => {
    const {id} = req.params;

    try {
        const resultado = await db.query('CALL web_listado_tallas_articulos(:ATO_CODIGO);',{
            replacements: {
                ATO_CODIGO: id
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneArticulosTallas",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Obtiene lista de precios del articulo
const obtieneListaPreciosArt = async (req, res) => {
    const {articulo} =  req.body;

    try {
        const resultado = await db.query('CALL web_listato_listapreciosArt(:codiArt);',{
            replacements : {codiArt: articulo}
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneListaPreciosArt",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Obtiene Las tomas fisicas procesadas.
const obtieneTomasFisicas = async (req, res) => {
    try {
        const resultado = await db.query('CALL web_inv_list_toma_fisica(:Pni_idtoma, :Pvi_descripcion, :Pvi_estado, :Pvi_signo, :Pdi_fecha, :Pvi_usuario)',{
            replacements : {
                Pni_idtoma: req.body.Pni_idtoma || null,
                Pvi_descripcion: req.body.Pvi_descripcion || null,
                Pvi_estado: req.body.Pvi_estado || null,
                Pvi_signo: req.body.Pvi_signo || null,
                Pdi_fecha: req.body.Pdi_fecha || null,
                Pvi_usuario: req.body.Pvi_usuario || null
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneTomasFisicas",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Obtiene el detalle tomas fisicas.
const obtieneDetalleTomasFisicas = async (req, res) => {
    const {id} = req.params;
    try {
        const resultado = await db.query('CALL web_list_detalle_toma_fisica(:Pni_tomaid);',{
            replacements:{ 
                Pni_tomaid: id
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneDetalleTomasFisicas",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Obtiene el detalle tomas fisicas.
const obtieneSeguiArticulo = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query('CALL web_inv_list_segui_articulo(:Pvi_articulo);',{
            replacements:{ 
                Pvi_articulo: id
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneSeguiArticulo",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

export {
    obtenerArticulos,
    obtieneArticulosLocalizacion,
    obtieneArticulosTallas,
    obtieneListaPreciosArt,
    obtieneTomasFisicas,
    obtieneDetalleTomasFisicas,
    obtieneSeguiArticulo    
}