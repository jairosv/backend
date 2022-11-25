import db from '../config/database.js';
import ErrorLog from "../models/ErrorLog.js";

//Procedimiento que inserta el articulo
const insertaArticulos = async (req, res) => {
    const producto = req.body;
    try {
        const resultado =  await db.query('CALL web_inst_articulos_pr(:nombre,:descripcion,:codbarras,:marca,:pesoneto,:urimagen1,:urlimagen2,:urlimagen3,:urlimagen4,:urlimagen5,:urimagen6,:departamento,:subdepartamento,:subcategoria,:cantidad,:costoarticulo,:preciomayor,:preciodetalle,:preciotuboutique,:usuario)',{
            replacements: {nombre: producto.nombre,
                           descripcion: producto.descripcion,
                           codbarras: null,
                           marca: producto.marcaid,
                           pesoneto: producto.pesoneto,
                           urimagen1: producto.urlimagen1,
                           urlimagen2: producto.urlimagen2 || null,
                           urlimagen3: producto.urlimagen3 || null,
                           urlimagen4: producto.urlimagen4 || null,
                           urlimagen5: producto.urlimagen5 || null,
                           urimagen6: producto.urlimagen6 || null,
                           departamento: producto.departamento,
                           subdepartamento: producto.subdepartamento,
                           subcategoria: producto.subcategoria,
                           cantidad: producto.sumaCantidades,
                           costoarticulo: producto.costoarticulo || 0,
                           preciomayor: producto.preciomayor,
                           preciodetalle: producto.preciodetalle,
                           preciotuboutique: producto.preciotuboutique,
                           usuario: req.usuario.USU_LOGIN
            }
        });
        console.log(resultado)
        if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){
            
            const data = {
                log_user: req.usuario.USU_CODIGO,
                log_login: req.usuario.USU_LOGIN,
                log_proceso: "insertaArticulos",
                log_jsonerror: resultado,
                log_fecha: Date.now()
            } 
            const errorlog =  new ErrorLog(data);
            const newerrorlog = await errorlog.save(data);
            return res.status(500).send(newerrorlog);

            /*return res.status(500).json({
                Level:resultado[0].Level,
                Code: resultado[0].Code,
                msg:error.message
            });*/
        }
        res.json(resultado[0]);
        

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "insertaArticulos",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Procedimiento que actualiza el articulo
const actualizaArticulos = async (req, res) => {
    const producto = req.body;

    try {
        const resultado =  await db.query('CALL web_act_articulos_pr(:codigo,:nombre,:descripcion,:codbarras,:marca,:pesoneto,:departamento,:subdepartamento,:subcatengoria,:imagen1, :imagen2, :imagen3, :imagen4, :imagen5, :imagen6)',{
            replacements: {codigo: producto.ATO_CODIGO,
                           nombre: producto.ATO_NOMBRE,
                           descripcion: producto.ATO_DESCRIPCION,
                           codbarras: null,
                           marca: producto.ATO_MAR_MARCA,
                           pesoneto: producto.ATO_PESO_NETO,
                           departamento: producto.ATO_DEPARTAMENTO,
                           subdepartamento: producto.ATO_SUB_DEPARTAMENTO,
                           subcatengoria: producto.ATO_SUB_CATEGORIA,
                           imagen1: producto.ATO_IMAGEN1,
                           imagen2: producto.ATO_IMAGEN2,
                           imagen3: producto.ATO_IMAGEN3,
                           imagen4: producto.ATO_IMAGEN4,
                           imagen5: producto.ATO_IMAGEN5,
                           imagen6: producto.ATO_IMAGEN6
            }
        });

        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){

                const error =  new Error(resultado[0].Message);
                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "actualizaArticulos",
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);
            }
        }
        
        res.json({
            msg:`La actualización del articulo ${producto.ATO_CODIGO} fue exitosa.`
        });

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "actualizaArticulos",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        return res.status(500).send(newerrorlog);
    }
}

//Ingresa las tallas de los articulos
const insertaArticuloTalla = async (req, res ) => {
    const parametros =  req.body;

    try {
        const resultado =  await db.query('CALL web_inst_articulotalla_pr(:codiArt, :talla, :detatalla, :color, :codigoBarras, :cantidad, :afectainv, :usuario, :detallecontrapedido, :Pni_transaccion,:Pvi_codbarraExt)',{
            replacements: {
                codiArt: parametros.codiArt,
                talla: parametros.idtalla,
                detatalla: parametros.iddetatalla,
                color: parametros.idcolor,
                codigoBarras: parametros.codbarras,
                cantidad: parametros.cantidad,
                afectainv: parametros.afectainventario,
                usuario: req.usuario.USU_LOGIN,
                detallecontrapedido: parametros.detacontrapedido || null,
                Pni_transaccion: parametros.Pni_transaccion || null,
                Pvi_codbarraExt: parametros.codbarrasexterno || null
            }
        });

        if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){
            const data = {
                log_user: req.usuario.USU_CODIGO,
                log_login: req.usuario.USU_LOGIN,
                log_proceso: "insertaArticuloTalla",
                log_jsonerror: resultado,
                log_fecha: Date.now()
            } 
            const errorlog =  new ErrorLog(data);
            const newerrorlog = await errorlog.save(data);
            return res.status(500).send(newerrorlog);
        }
        

        
        res.json(resultado[0]);
        
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "insertaArticuloTalla",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Actualiza las tallas de los articulos.
const actualizaTallaArticulos =  async (req, res) => {
    const parametros =  req.body;
    

    try {
        const resultado =  await db.query('CALL web_inv_val_proceso_talla(:consecutivo,:codiArt,:cantidad, :cantactual,:tipotransac, :documento, :fechadocu, :tipoaccion, :observacion, :usuario,:codbarraext)',{
            replacements: {consecutivo: parametros.consecutivo,
                           codiArt: parametros.codiArt,
                           cantidad: parametros.cantidad || null,
                           cantactual: parametros.cantactual || null,
                           tipotransac: parametros.tipotransac || null,
                           documento: parametros.documento || null,
                           fechadocu: parametros.fechadocu || null,
                           tipoaccion: parametros.tipoaccion,
                           observacion: parametros.observacion || null,
                           usuario: req.usuario.USU_LOGIN,
                           codbarraext: parametros.codbarrasext || null
            }
        });

        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){
                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "actualizaTallaArticulos",
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);
            }else {
                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "actualizaTallaArticulos",
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);   
            }
        }

        res.json({
            msg:'Proceso se genero correctamente'
        });
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "actualizaTallaArticulos",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Borra tallas de contra pedido y articulos
const borrarTallasContraPedidoArticulo =  async (req, res) => {
    const { Pni_consecutivo } = req.body

    try {
        const resultado =  await db.query('CALL web_elimina_tallas_contrapedido_articulo(:Pni_consecutivo)',{
            replacements: {
                Pni_consecutivo: Pni_consecutivo
            }
        });
        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){

                const error =  new Error(resultado[0].Message);
    
                return res.status(500).json({
                    Level:resultado[0].Level,
                    Code: resultado[0].Code,
                    msg:error.message
                });
            }
        }

        res.json({
            msg:'La talla del contra pedido se elimino correctamente.'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

//Actualiza o inserta un Precio del articulo.
const actualizainsertaPreciosArticulos =  async (req, res) => {

    const parametros =  req.body;

    try {
        const resultado =  await db.query('CALL web_inst_act_detallelistaprecios_pr(:codiArt, :listaprecio, :pmayor, :pdetalle, :ptuboutique, :impuesto, :iva, :mostrar,:accion,:usuario)',{
            replacements: {
                codiArt: parametros.codiArt || null,
                listaprecio: parametros.listaprecio,
                pmayor: parametros.pmayor || null,
                pdetalle: parametros.pdetalle || null,
                ptuboutique: parametros.ptuboutique || null,
                impuesto: Number(parametros.pmayor || null)*Number(parametros.iva || 0),
                iva: parametros.iva || 0,
                mostrar: parametros.mostrar || 'N',
                accion:parametros.accion,
                usuario: req.usuario.USU_LOGIN
            }
        });

        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){

                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "actualizainsertaPreciosArticulos",
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);
            }
        }

         res.json({
            msg:'El proceso se ejecuto correctamente.'
        });
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "actualizainsertaPreciosArticulos",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        return res.status(500).send(newerrorlog);
    }
}

//Genera la toma Fisicas
const generarTomaFisica =  async (req, res) => {
    const parametros =  req.body;

    try {
        const resultado =  await db.query('CALL web_inv_generar_toma_fisica_pr(:Pvi_descripcion, :Pvi_usuario, :Pni_departamento, :Pni_subdepartamento, :Pni_subcategoria, :Pvi_articulo )',{
            replacements: {
                Pvi_descripcion: parametros.Pvi_descripcion,
                Pvi_usuario: req.usuario.USU_LOGIN,
                Pni_departamento: parametros.Pni_departamento || null,
                Pni_subdepartamento: parametros.Pni_subdepartamento || null,
                Pni_subcategoria: parametros.Pni_subcategoria || null,
                Pvi_articulo: parametros.Pvi_articulo || null
            }
        });
        
        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error' || resultado[0].Level === 'Not Found' ){
    
                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "generarTomaFisica",
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);
            }
        }

         res.json({
            msg:'Se ha generado el número toma: ' + resultado[0].Ln_tomaid
        });
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "generarTomaFisica",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Actualiza el detalle de la toma Fisicas
const actualizaDetalleTomaFisica =  async (req, res) => {
    const parametros =  req.body;    
   
    try {
        const resultado =  await db.query('CALL web_act_detalle_toma_fisica(:Pni_tomaid, :Pni_linea, :Pni_cantidad )',{
            replacements: {Pni_tomaid: parametros.Pni_tomaid,
                           Pni_linea: parametros.Pni_linea,
                           Pni_cantidad: parametros.Pni_cantidad
            }
        });
        
        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){

                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "generarTomaFisica",
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);
            }
        }
        res.json({msg:'El proceso se ejecuto correctamente.'});
        
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "generarTomaFisica",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//procesar toma fisica
const procesaTomaFisica =  async (req, res) => {
    const parametros =  req.body;

    try {
        const resultado =  await db.query('CALL web_valida_proceso_tomafisica(:Pni_TomaId, :Pvi_usuario, :Pvi_tipoaccion )',{
            replacements: {
                Pni_TomaId: parametros.Pni_TomaId,
                Pvi_usuario: req.usuario.USU_LOGIN,
                Pvi_tipoaccion: parametros.Pvi_tipoaccion
            }
        });
        
        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error' || resultado[0].Level === 'Unauthorized'){

                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "procesaTomaFisica",
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);
            }
        }
        res.json({msg:'El proceso se ejecuto correctamente.'});
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "procesaTomaFisica",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}



export {
    insertaArticulos,
    actualizaArticulos,
    insertaArticuloTalla,
    actualizaTallaArticulos,
    borrarTallasContraPedidoArticulo,
    actualizainsertaPreciosArticulos,
    generarTomaFisica,
    actualizaDetalleTomaFisica,
    procesaTomaFisica
}