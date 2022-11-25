import Usuarios from '../models/Usuarios.js';
import db from '../config/database.js';
import generarJWT from "../helpers/generarJWT.js";
import generarId from '../helpers/generarId.js';
import { emailRegistro, emailOlvidePassword, emailEditarUsuario } from "../helpers/email.js";
import ErrorLog from "../models/ErrorLog.js";

//Obtiene los usuarios del sistema
const obtieneUsuarios = async (req, res) => {
    try {        
        const usuarios = await Usuarios.findAll({
            attributes: {exclude: ['USU_PASSWORD']}
        });
        res.json(usuarios);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtieneUsuarios",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        await errorlog.save(data);
        res.status(500).send(error);
    }
}


//Registra
const registrar = async (req, res) => {    
   
    try {
        const newUsuario =  new Usuarios(req.body);        
        newUsuario.USU_TOKEN = generarId();
        newUsuario.USU_CREADO_POR = req.usuario.USU_LOGIN;
        newUsuario.USU_PASSWORD = process.env.ADMIN_AUTH;
        const nuevosuario = await newUsuario.save();

        //Enviar el email de confirmacion
        if(process.env.PARAM_ACTIVA_EMAIL === 'S'){
            emailRegistro({
                email: newUsuario.USU_EMAIL,
                nombre: newUsuario.USU_NOMBRE,
                token: newUsuario.USU_TOKEN
            });
        }
        

        res.json(nuevosuario);
        
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "registrar",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        await errorlog.save(data);
        res.status(500).send(error);
    }

}

const editarUsuario = async (req, res) => {
    const { id } =  req.params;
    try {                

        const usuario = await Usuarios.findByPk(id);
        //USU_CODIGO  ,USU_NOMBRE, USU_LOGIN, USU_EMAIL, USU_CEDULA, USU_CELULAR, USU_STATE
        
        
        usuario.USU_NOMBRE = req.body.USU_NOMBRE || usuario.USU_NOMBRE;
        usuario.USU_LOGIN = req.body.USU_LOGIN || usuario.USU_LOGIN;        
        usuario.USU_EMAIL = req.body.USU_EMAIL || usuario.USU_EMAIL;
        usuario.USU_CEDULA = req.body.USU_CEDULA || usuario.USU_CEDULA;
        usuario.USU_CELULAR = req.body.USU_CELULAR || usuario.USU_CELULAR;
        usuario.USU_STATE = req.body.USU_STATE
        usuario.USU_PASSWORD = req.body.USU_PASSWORD || usuario.USU_PASSWORD;
        usuario.USU_MODIFICADO_POR = req.usuario.USU_LOGIN;

        const usuarioAlmacenado = await usuario.save();

        //Enviar el email de confirmacion
        if(process.env.PARAM_ACTIVA_EMAIL === 'S' && req.body.USU_PASSWORD !== undefined){
            emailEditarUsuario({
                email: usuario.USU_EMAIL,
                nombre: usuario.USU_NOMBRE,
                password: req.body.USU_PASSWORD
            });
        }


        res.json(usuarioAlmacenado);

        
    } catch (error) { 
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "editarUsuario",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        await errorlog.save(data);      
        res.status(404).json(error);
        
    }
}

//Autentica
const autenticar = async (req, res) => {
    const {usuario, password } = req.body;

    try {
        const resultado =  await  db.query('CALL web_loginusuario_pr(:usuario, :password);',{
            replacements : { 
                usuario : usuario,
                password : password
            }
        });
        
        if(resultado[0].IsValido === 'UN'){
            return res.status(400).json({msg: 'El usuario no existe'});
        }else if(resultado[0].IsValido === 'CI'){
            return res.status(400).json({msg: 'Password Incorrecto'});
        }else if(resultado[0].IsValido === 'IN'){
            return res.status(400).json({msg: 'Usuario Inactivo o No existe.'});
        }else{
            res.json({
                id: resultado[0].USU_CODIGO,
                nombre: resultado[0].USU_NOMBRE,
                login: resultado[0].USU_LOGIN,
                email: resultado[0].USU_EMAIL,
                token: generarJWT(resultado[0].USU_CODIGO)
            })
        }

     //res.json(resultado);
     } catch (error) {
       console.log(error);
       const data = {
        log_user: req.usuario.USU_CODIGO,
        log_login: req.usuario.USU_LOGIN,
        log_proceso: "autenticar",
        log_jsonerror: error,
        log_fecha: Date.now()
       }
       const errorlog =  new ErrorLog(data);
       await errorlog.save(data);      
       res.status(500).send(error);
     }
}
const confirmar = async (req, res) => {
    const { token } = req.params;
    
    const usuarioConfirmar = await Usuarios.findOne({
        where: {
            USU_TOKEN: token
        }
    });

    if(!usuarioConfirmar){
        const error = new Error('Token no valido.');
        return res.status(400).json({msg: error.message});
    }

    try {
        usuarioConfirmar.USU_CONFIRMADO = true;
        usuarioConfirmar.USU_TOKEN = "";
        await usuarioConfirmar.save();
        res.json({msg: 'Usuario Confirmado Correctamente.'})
        
    } catch (error) {
        console.log(error);
        
    }
}

const olvidePassword = async (req, res) => {
    const {email, user} = req.body;
    //Comprobar si el usuario existe
    const usuario = await Usuarios.findOne({
        where:{
            USU_EMAIL: email
        }
    });

    if(!usuario) {
        const error = new Error('El Usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    try {
        usuario.USU_TOKEN= generarId();
        usuario.USU_MODIFICADO_POR = user;
        await usuario.save();
        
        //Enviar el email
        emailOlvidePassword({
            email: usuario.USU_EMAIL,
            nombre: usuario.USU_NOMBRE,
            token: usuario.USU_TOKEN
        })

        res.json({msg:'Hemos enviado un email con las instrucciones.'});
        
    } catch (error) {
        console.log(error)
        
    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    
    //Comprobar si el usuario existe
    const tokenValido = await Usuarios.findOne({
        where:{
            USU_TOKEN: token
        }
    });
    
    if(tokenValido) {
        res.json({msg:'Token válido y el Usuario existe.'});
    }else{
        const error = new Error('Token no válido.');
        return res.status(400).json({msg: error.message});
    }
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    //Comprobar si el usuario existe
    const usuario = await Usuarios.findOne({
        where:{
            USU_TOKEN: token
        }
    });
    
    if(usuario) {
        usuario.USU_PASSWORD = password;
        usuario.USU_TOKEN = '';
        try {
            await usuario.save();

            res.json({msg: "Password modificado."})
        } catch (error) {
            console.log(error);
        }
    }else{
        const error = new Error('Token no válido.');
        return res.status(400).json({msg: error.message});
    }
}

//Obtiene la lista de permisos a los menu
const obtenerPermisosMenu = async (req, res) => {
    try {
        const resultado =  await  db.query('CALL seg_acceso_menu_formas(:Pni_usuario, :Pvi_tipo, :Pni_padreid);',{
            replacements : { 
                Pni_usuario : req.usuario.USU_CODIGO,
                Pvi_tipo : 'MENU',
                Pni_padreid: null
            }
        });

     res.json(resultado);
     } catch (error) {
       console.log(error);
       res.status(500).send(error);
     }
}

//Obtiene la lista de permisos a los menu
const obtenerPermisosForma = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado =  await  db.query('CALL seg_acceso_menu_formas(:Pni_usuario, :Pvi_tipo, :Pni_padreid);',{
            replacements : { 
                Pni_usuario : req.usuario.USU_CODIGO,
                Pvi_tipo : 'FORM',
                Pni_padreid: id
            }
        });

     res.json(resultado);
     } catch (error) {
       console.log(error);
       res.status(500).send(error);
     }
}

//Obtiene la lista de permisos a los menu
const obtienePermisoForma = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado =  await  db.query('select modajemadmin_pruebas.fv_permiso_componente(:Pni_ejecutable, :Pni_usuario);',{
            replacements : { 
                Pni_ejecutable: id,
                Pni_usuario : req.usuario.USU_CODIGO
            }
        });

     res.json(resultado);
     } catch (error) {
       console.log(error);
       res.status(500).send(error);
     }
}

//Modifica clave
const modificarPassword = async (req, res) => {
    const { id } =  req.params;

    try {
        const usuario = await Usuarios.findByPk(id);
        //USU_CODIGO  ,USU_NOMBRE, USU_LOGIN, USU_EMAIL, USU_CEDULA, USU_CELULAR, USU_STATE 
        
        usuario.USU_PASSWORD = req.body.password || usuario.USU_PASSWORD;        

        await usuario.save();
        res.json({msg:"Clave modificada"});
        
    } catch (error) {  
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "Error al registrar al usuario",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        await errorlog.save(data);     
        res.status(404).json(error);
        
    }
}





const perfil = async (req, res) => {
    const { usuario } = req;
    res.json(usuario);
}

export{ 
        obtieneUsuarios,
        registrar, 
        editarUsuario,
        autenticar,
        confirmar, 
        olvidePassword, 
        comprobarToken, 
        nuevoPassword, 
        perfil, 
        obtenerPermisosMenu,
        obtenerPermisosForma,
        obtienePermisoForma,
        modificarPassword
    }