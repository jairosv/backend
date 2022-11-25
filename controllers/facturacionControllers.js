import db from '../config/database.js';
import ErrorLog from "../models/ErrorLog.js";
import { emailPedido } from '../helpers/email.js';

//Obtiene los datos del articulo
const obtieneArticulosFacturar = async (req, res) => {
    const {articulo, nombre } = req.body;

    try {
        const resultado = await db.query('CALL web_fac_lista_articulos(:Pvi_articulo, :Pvi_nombre);',{
            replacements: {
                Pvi_articulo: articulo || null,
                Pvi_nombre: nombre || null
            }
        });
        res.json(resultado);

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

//Obtiene los datos del articulo
const obtieneArticulosPedido = async (req, res) => {
    const { id, linea } = req.params;
    let paramlinea;    

    if (linea === 'undefined'){
        
        paramlinea = null
    }else{
        paramlinea = linea
    }
    try {
        const resultado = await db.query('CALL web_fac_list_detpedidos(:Pni_pedido, :Pni_linea);',{
            replacements:{
                Pni_pedido: id,
                Pni_linea: paramlinea || null
            }
        });
        res.json(resultado);

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

//Obtiene los datos del articulo
const obtieneListaDetalleFactura = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query('CALL web_fac_list_detallefactura(:Pni_transaccion);',{
            replacements:{
                Pni_transaccion: id
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneListaDetalleFactura",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Obtiene los pedidos del sistema depende del estado
const obtieneListaPedidos = async (req, res) => {
    const { id } = req.params;
    const pedido = req.body;
    
    try {
        const resultado = await db.query('CALL web_fac_list_pedidos_pr(:Pni_pedido,:Pvi_estado,:Pni_usuarioid, :Pvi_ind_comprasweb, :Pni_cliente, :Pvi_nombre, :Pvi_tipopedido);',{
            replacements:{
                Pni_pedido: pedido.Pni_pedido || null,
                Pvi_estado: pedido.Pvi_estado || null,
                Pni_usuarioid: req.usuario.USU_CODIGO,
                Pvi_ind_comprasweb: id || null,
                Pni_cliente: pedido.Pni_cliente || null,
                Pvi_nombre: pedido.Pvi_nombre || null,
                Pvi_tipopedido: pedido.Pvi_tipopedido || null
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneListaPedidos",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Generar pedido cliente
const generarPedidoCliente =  async (req, res) => {
    const pedido = req.body;

    try {
        const resultado =  await db.query('CALL web_inst_pedido(:clienteid,:nombrecliente,:tipopedido,:usuario, :costoenvio );',{
            replacements: {
                clienteid: pedido.clienteid,
                nombrecliente: pedido.nombrecliente,
                tipopedido: pedido.tipopedido,
                usuario:  req.usuario.USU_LOGIN,
                costoenvio: pedido.costoenvio
            }
        });

        //Enviar el email de confirmacion
        if(process.env.PARAM_ACTIVA_EMAIL === 'S' && req.body.email !== undefined){
            emailPedido({
                email: pedido.email,
                nombre: pedido.nombrecliente,
                pedido: resultado[0].Ln_pedidoid
            });
        }

        res.json(resultado);
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "generarPedidoCliente",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Proceso detalle pedido
const procesoDetallePedido = async (req, res) => {
    const { id, linea } = req.params;
    const detpedido = req.body;
    try {
        const resultado =  await db.query('CALL web_fac_valida_detallepedido(:pedido, :linea, :articulo, :nombreart, :codigobarras, :precio, :cantidad, :tipoaccion, :ind_despacho);',{
            replacements: {
                pedido: id,
                linea: linea || null,
                articulo: detpedido.articulo || null,
                nombreart: detpedido.nombreart || null,
                codigobarras: detpedido.codigobarras || null,
                precio: detpedido.precio || null,
                cantidad: detpedido.cantidad || 0,
                tipoaccion: detpedido.tipoaccion,
                ind_despacho: detpedido.inddespacho || null
            }
        });

        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){

                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "procesoDetallePedido",
                    log_jsonerror: resultado[0],
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                res.status(500).send(newerrorlog);

            }else if(resultado[0].Level === 'Validate') {
                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "procesoDetallePedido",
                    log_jsonerror: resultado[0],
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                res.status(500).send(newerrorlog);   
            }else{
                res.send(resultado[0]);
            }
        }else{
            res.json({msg: 'Proceso realizado con exito.'});
        }

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "procesoDetallePedido",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Proceso de pedidos
const procesoPedido = async (req, res) => {
    const parametros = req.body;

    try {
        const resultado =  await db.query('CALL web_procesos_pedidos_pr(:pedido, :proceso, :usuarioid, :usuario, :costoenvio, :tipoenvio, :numeroguia, :tipofactura, :descuento);',{
            replacements: {
                pedido: parametros.pedido,
                proceso: parametros.proceso,
                usuarioid: parametros.usuarioid || null,
                usuario: req.usuario.USU_LOGIN,
                costoenvio: parametros.costoenvio || 0,
                tipoenvio: parametros.tipoenvio || null,
                numeroguia: parametros.numeroguia || null,
                tipofactura:parametros.tipofactura,
                descuento: parametros.descuento || null

            }
        });
        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){

                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "procesoPedido/Warning-Error",
                    log_jsonerror: resultado[0],
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                res.status(500).send(newerrorlog);
            }else if(resultado[0].Level === 'Validate') {
                
                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "procesoPedido/Valide",
                    log_jsonerror: resultado[0],
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                res.status(500).send(newerrorlog);

            }else if(resultado[0].Ln_transaccion !== null){
                return res.json(resultado[0]);
            }else{
                return res.json({msg:"Proceso realizado con exito"});
            }
        }
        
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "procesoPedido/General",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }

}

//Obtiene las facturas del sistema
const obtieneListaFacturas = async (req, res) => {
    const { id } =  req.params;
    
    try {
        const resultado = await db.query('CALL web_fac_listado_facturas_pr(:Pni_transaccion, :Pni_cliente, :Pvi_nombre, :Pni_factura, :Pni_pedido, :Pvi_simbolo, :Pdi_fechafact, :Pni_vendedor, :Pni_estado,:Pvi_identificacion,:Pvi_tipofactura,:Pvi_simbolosaldo,:Pni_saldofactura);',{
            replacements:{
                Pni_transaccion:  req.body.transaccion || null,
                Pni_cliente: id || null,
                Pvi_nombre: req.body.nombre || null,
                Pni_factura: req.body.factura || null,
                Pni_pedido: req.body.pedido || null,
                Pvi_simbolo: req.body.simbolo || null,
                Pdi_fechafact: req.body.fechafact || null,
                Pni_vendedor: req.body.vendedor || null,
                Pni_estado: req.body.estado || null,
                Pvi_identificacion: req.body.identificacion || null,
                Pvi_tipofactura: req.body.tipofactura || null,
                Pvi_simbolosaldo: req.body.simbolosaldo || null,
                Pni_saldofactura: req.body.saldofactura || null
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneListaPedidos",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Actualiza datos generales de la factura
const actualizaDatosGeneralesFactura = async (req, res) => {
    const { id } = req.params;
    const parametros = req.body;
    try {
        const resultado =  await db.query('CALL web_fac_act_factura(:Pni_transaccion, :Pni_provincia, :Pni_canton, :Pni_distrito, :Pvi_direccion, :Pvi_observaciones, :Pvi_usuario, :Pvi_tipoenvio, :Pvi_numeroguia );',{
            replacements: {
                Pni_transaccion: id,
                Pni_provincia: parametros.fac_provincia || null,
                Pni_canton: parametros.fac_canton || null,
                Pni_distrito: parametros.fac_distrito || null,
                Pvi_direccion: parametros.fac_direccion || null,
                Pvi_observaciones: parametros.fac_observaciones || null,
                Pvi_usuario: req.usuario.USU_LOGIN,
                Pvi_tipoenvio: parametros.fac_tipo_transporte || null,
                Pvi_numeroguia: parametros.fac_numero_guia || null
            }
        });
        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){
                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: `actualizaDatosGeneralesFactura/${resultado[0].Level}`,
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);
            }else{
                return res.json(resultado[0]);
            }
        }
        res.json({msg: "Proceso realizado con exito."});
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "actualizaDatosGeneralesFactura/General",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Actualiza datos generales de la factura
const procesoDetalleFactura = async (req, res) => {
    const { id } = req.params;
    const parametros = req.body;

    try {
        const resultado =  await db.query('CALL web_fac_inst_act_del_detallefactura( :Pni_transaccion, :Pni_linea, :Pni_codigoart, :Pvi_descripcion, :Pvi_codigobarras, :Pni_cantidad, :Pni_precio, :Pni_descuento, :Pni_iva, :Pni_porc_descuento, :Pni_porc_iva, :Pvi_tipoaccion );',{
            replacements: {
                Pni_transaccion: id,
                Pni_linea : parametros.det_linea,
                Pni_codigoart: parametros.det_ato_codigo,
                Pvi_descripcion: parametros.det_ato_descripcion,
                Pvi_codigobarras: parametros.det_codigobarras,
                Pni_cantidad: parametros.det_cantidad,
                Pni_precio: parametros.det_precio_articulo,
                Pni_descuento: parametros.det_descuento,
                Pni_iva: parametros.det_iva,
                Pni_porc_descuento: parametros.det_porc_descuento,
                Pni_porc_iva: parametros.det_porc_iva,
                Pvi_tipoaccion: parametros.tipoaccion
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
            }else if(resultado[0].Message !== null && resultado[0].Message !== undefined) {
                
                const error =  new Error(resultado[0].Message);
                return res.status(401).json({
                    Level:'Validación Interna',
                    Code: 2000,
                    msg:error.message
                });    
            }else if(resultado[0].Pni_linea !== null){
                return res.json(resultado[0]);
            }
        }
        res.json({msg: "Proceso realizado con exito."});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

//Obtiene Listado de seguimiento de contra pedido resumido y al detalle
const obtieneListSeguiContraPedido = async (req, res) => {
    const { id } = req.params;
    const parametros = req.body;
    try {
        const resultado = await db.query('CALL web_fac_list_seguicontpedido(:Pni_pedidoId, :Pvi_tipo);',{
            replacements:{
                Pni_pedidoId: parametros.Pni_pedidoId,
                Pvi_tipo: id
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

//Proceso notas credito
const procesoNotasCredito = async (req, res) => {
    const { id } = req.params;
    const parametros = req.body;

    try {
        const resultado =  await db.query('CALL web_fac_procesos_notas_cr_db(:Pni_transaccion, :Pvi_tipoaccion, :Pni_Linea, :Pvi_devgar, :Pvi_usuario );',{
            replacements: {
                Pni_transaccion: id,
                Pvi_tipoaccion: parametros.tipoaccion,
                Pni_Linea: parametros.linea.toString() || null,
                Pvi_devgar: parametros.devarg || null,
                Pvi_usuario: req.usuario.USU_LOGIN
            }
        });
        
        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error' || resultado[0].Level === 'Validate'){
                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: `procesoNotasCredito/${resultado[0].Level}`,
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);
              
            }else{
                return res.json(resultado[0]);
            }
        }
        res.json({msg: "Proceso realizado con exito."});
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "procesoNotasCredito/Generico",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Obtiene las notas de credito
const obtieneListadoNotasCR = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await db.query('CALL web_fac_listado_notas_cr_db(:Pni_transaccion, :Pni_transnota, :Pvi_simbolo, :Pdi_fecha1, :Pdi_fecha2, :Pvi_tiponota, :Pvi_estado);',{
            replacements:{
                Pni_transaccion: id || -1,
                Pni_transnota: req.body.transnota || null,
                Pvi_simbolo: req.body.simbolo || null,
                Pdi_fecha1: req.body.fecha1 || null,
                Pdi_fecha2: req.body.fecha2 || null,
                Pvi_tiponota: req.body.tiponota || null,
                Pvi_estado: req.body.estado || null
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneListadoNotasCR/Generico",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Obtiene el detalle las notas de credito
const obtieneDetalleListadoNotasCR = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query('CALL web_fac_list_detalle_nota_crdb_pr(:Pni_transaccion);',{
            replacements:{
                Pni_transaccion: id
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneListadoNotasCR/Generico",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Proceso detalle pago factura
const procesoDetallePagoFactura = async (req, res) => {
    const parametros = req.body;
    const { id } =  req.params;

    try {
        const resultado =  await db.query('CALL web_fac_valida_det_pago_factura(:Pni_transaccionFac, :Pni_consDeposito, :Pni_MontoAplicar ,:Pvi_usuario, :Pvi_formapago );',{
            replacements: {
                Pni_transaccionFac: id,
                Pni_consDeposito: parametros.Pni_consDeposito,
                Pni_MontoAplicar: parametros.Pni_MontoAplicar,
                Pvi_usuario: req.usuario.USU_LOGIN,
                Pvi_formapago: parametros.Pvi_formapago || null
            }
        });
        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){
                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: `procesoDetallePagoFactura / ${resultado[0].Level}`,
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);
            }
        }
        res.json({msg: "Proceso realizado con exito."});
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "procesoDetallePagoFactura / General",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Proceso detalle pago factura
const procesoPagoFactura = async (req, res) => {
    const parametros = req.body;
    const fechadeposito = parametros.fecha +' ' + parametros.hora

    try {
        const resultado =  await db.query('CALL fac_genera_pago_factura(:Pni_clienteid, :Pni_transaccionFac, :Pni_banco ,:Pvi_formapago, :Pni_deposito, :Pvi_detalle, :Pdi_fechadeposito, :Pni_monto, :Pvi_usuario );',{
            replacements: {
                Pni_clienteid: parametros.clienteid,
                Pni_transaccionFac: parametros.transaccionfact,
                Pni_banco: parametros.bancoid,
                Pvi_formapago: parametros.formapago || null,
                Pni_deposito: parametros.documento,
                Pvi_detalle: parametros.detalle,
                Pdi_fechadeposito: fechadeposito || Date.now(),
                Pni_monto: parametros.monto,
                Pvi_usuario: req.usuario.USU_LOGIN
                
            }
        });
        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){
                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: `procesoDetallePagoFactura / ${resultado[0].Level}`,
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);
            }
        }
        res.json({msg: "Proceso realizado con exito."});
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "procesoDetallePagoFactura / General",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Proceso cambia el tipo de pedido
const procesoCambiaTipoPedido = async (req, res) => {
    const parametros = req.body;
    

    try {
        const resultado =  await db.query('CALL web_proceso_cambia_tipopedido( :Pni_pedido, :Pvi_tipopedido );',{
            replacements: {
                Pni_pedido: parametros.Pni_pedido,
                Pvi_tipopedido: parametros.Pvi_tipopedido
            }
        });
        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error' || resultado[0].Level === 'Validate'){
                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: `procesoCambiaTipoPedido / ${resultado[0].Level}`,
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);
                
            }else if(resultado[0].Ln_trannota !== null){
                return res.json(resultado[0]);
            }
        }
        res.json(resultado);
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "procesoDetallePagoFactura / General",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Precio articulo
const obtienerPrecioArticulo = async (req, res) => {
    const {id} = req.params;
    try {
        const resultado = await db.query('CALL web_inv_consulta_articulo_precio(:Pvi_parametro);',{
            replacements:{
                Pvi_parametro: id || null
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtienerPrecioArticulo / General",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Obtiene el detalle pago de una factura
const obtieneDetallePagoFactura = async (req, res) => {
    const {id} = req.params;
    try {
        const resultado = await db.query('CALL web_list_det_pago_fact(:Pni_transaccion);',{
            replacements:{
                Pni_transaccion: id
            }
        });
        res.json(resultado);

    } catch (error) {
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneDetallePagoFactura / General",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}



export {
    obtieneArticulosFacturar,
    obtieneArticulosPedido,
    obtieneListaDetalleFactura,
    obtieneListaPedidos,
    obtieneListaFacturas,    
    generarPedidoCliente,
    procesoDetallePedido,
    procesoPedido,
    actualizaDatosGeneralesFactura,
    procesoDetalleFactura,
    obtieneListSeguiContraPedido,
    procesoNotasCredito,
    obtieneListadoNotasCR,
    obtieneDetalleListadoNotasCR,
    procesoDetallePagoFactura,
    procesoCambiaTipoPedido,
    obtienerPrecioArticulo,
    obtieneDetallePagoFactura,
    procesoPagoFactura
}