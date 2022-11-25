import express from 'express';
import {
        obtieneUsuarios, 
        autenticar,
        registrar,
        editarUsuario,
        confirmar,
        olvidePassword,
        comprobarToken,
        nuevoPassword,
        perfil,
        obtenerPermisosMenu,
        obtenerPermisosForma,
        obtienePermisoForma,
        modificarPassword
         
 } from '../controllers/authControllers.js';


import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

//Autentificacion, Registro y Confirmacion de Usuarios

router.post("/registrar",checkAuth,registrar);//crear un nuevo usuario
router.post('/login',autenticar);

router.post('/olvide-password',olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);
router.post('/modificapassword',checkAuth,modificarPassword);

router.get('/',checkAuth,obtieneUsuarios);
router.get('/confirmar/:token', confirmar);
router.get('/perfil',checkAuth, perfil);
router.get('/cargamenu',checkAuth,obtenerPermisosMenu);
router.get('/cargaforma/:id',checkAuth,obtenerPermisosForma);
router.get('/permisoforma/:id',checkAuth,obtienePermisoForma);
router.post('/:id',checkAuth,editarUsuario);

export default router;