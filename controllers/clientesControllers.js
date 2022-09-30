import db from '../config/database.js';
import bcrypt from 'bcryptjs';
import ErrorLog from "../models/ErrorLog.js";

//Obtiene los datos de los clientes
const obtieneListaClientes = async (req, res) => {
    const { cliente, nombre, apellidos, provincia, canton, distrito } = req.body;

    try {
        const resultado = await db.query('CALL web_listado_clientes(:Pni_cliente, :Pvi_nombre, :Pvi_apellidos, :Pvi_provincia, :Pvi_canton, :Pvi_distrito);',{
            replacements:{
                Pni_cliente: cliente || null,
                Pvi_nombre: nombre || null,
                Pvi_apellidos: apellidos || null,
                Pvi_provincia: provincia || null,
                Pvi_canton: canton || null,
                Pvi_distrito: distrito || null
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+error);
    }
}

//Consulta los depositos del cliente
const obtieneListaDepositosClientes = async (req, res) => {
    const parametros =  req.body;
    try {        
        const resultado = await db.query('CALL cgl_Lista_deposito_cliente(:Pni_cliente, :Pvi_tipoconsulta, :Pni_pedidoid, :Pvi_tipoaccion, :Pni_banco, :Pni_deposito, :Pvi_estado,:Pvi_simbolo, :Pdi_fechadeposito, :Pni_consecutivo)',{
            replacements: { Pni_cliente: parametros.Pni_cliente || null,
                            Pvi_tipoconsulta:parametros.Pvi_tipoconsulta,
                            Pni_pedidoid: parametros.Pni_pedidoid || null,
                            Pvi_tipoaccion: parametros.Pvi_tipoaccion,
                            Pni_banco: parametros.Pni_banco || null,
                            Pni_deposito: parametros.Pni_deposito || null,
                            Pvi_estado: parametros.Pvi_estado || null,
                            Pvi_simbolo: parametros.Pvi_simbolo || null,
                            Pdi_fechadeposito: parametros.Pdi_fechadeposito || null,
                            Pni_consecutivo: parametros.Pni_consecutivo || null

            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "webInstactCliente",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Inserta el nuevo cliente web
const webInstactCliente = async (req, res) => {
    const cliente =  req.body;

    try {
        let password;
        if(cliente.password !== undefined){
            password = bcrypt.hashSync(cliente.password, 10);
        }

        const resultado = await db.query('CALL web_inst_act_cliente_pr(:codigo, :nombre,:apellidos,:identificacion,:password, :usuarioid,:email,:celular,:provincia,:canton,:distrito,:direccion,:estado,:tipo)',{
            replacements: {
                codigo: cliente.codigo || null,
                nombre:cliente.nombre,
                apellidos:cliente.apellidos,
                identificacion:cliente.identificacion,
                password: password|| null,
                usuarioid:cliente.usaurioid,
                email:cliente.email || null,
                celular:cliente.celular,
                provincia:cliente.provinciaid,
                canton:cliente.cantonid,
                distrito:cliente.distritoid,
                direccion:cliente.direccion,
                estado:cliente.estado || null,
                tipo: cliente.tipo
            }
        });
        
        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){

                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "webInstactCliente",
                    log_jsonerror: resultado,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);

            }else{
                return res.json(resultado);
            }
        }

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "webInstactCliente",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Procesos despositos cliente
const procesosDepositosClientes = async (req, res) => {
    const parametros =  req.body;

    try {
        const resultado = await db.query('CALL web_cgl_proceso_depositos_pr(:Pni_consecutivo,:Pni_pedidoid,:Pni_clienteid,:Pni_banco,:Pni_deposito,:Pvi_detalle,:Pdi_fechadeposito,:Pni_monto,:Pvi_usuario, :Pvi_tipoaccion)',{
            replacements: { 
                Pni_consecutivo: parametros.Pni_consecutivo || null,
                Pni_pedidoid: parametros.Pni_pedidoid || null,
                Pni_clienteid: parametros.Pni_clienteid || null,
                Pni_banco: parametros.Pni_banco || null,
                Pni_deposito: parametros.Pni_deposito || null,
                Pvi_detalle: parametros.Pvi_detalle || null,
                Pdi_fechadeposito: parametros.Pdi_fechadeposito || null,
                Pvi_usuario: req.usuario.USU_LOGIN,
                Pni_monto: parametros.Pni_monto || null,
                Pvi_tipoaccion: parametros.Pvi_tipoaccion
            }
        });
        if(resultado !== undefined){
            if(resultado[0].Level === 'Warning' || resultado[0].Level === 'Error'){

                const data = {
                    log_user: req.usuario.USU_CODIGO,
                    log_login: req.usuario.USU_LOGIN,
                    log_proceso: "procesosDepositosClientes accion: " + Pvi_tipoaccion,
                    log_jsonerror: error,
                    log_fecha: Date.now()
                } 
                const errorlog =  new ErrorLog(data);
                const newerrorlog = await errorlog.save(data);
                return res.status(500).send(newerrorlog);
            }else{
                return res.json(resultado[0]);
            }
        }
        res.json({msg:"Proceso Existoso"});
        
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "procesosDepositosClientes",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//obtiene lista depositos a procesar
const obtieneListDepositosCliente = async (req, res) => {
    const parametros =  req.body;
    try {
        const resultado = await db.query('CALL web_cgl_list_deposito_cliente(:Pni_cliente, :Pni_pedido ,:Pvi_tipoaccion)',{
            replacements: { Pni_cliente: parametros.Pni_cliente,
                            Pni_pedido: parametros.Pni_pedido,
                            Pvi_tipoaccion:parametros.Pvi_tipoaccion
            }
        });
        res.json(resultado);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+error);
    }
}



export {
    obtieneListaClientes,
    obtieneListaDepositosClientes,
    webInstactCliente,
    procesosDepositosClientes,
    obtieneListDepositosCliente    
}