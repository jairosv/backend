import express from 'express';
import {
    obtenerRolUsuario,
    crearRolUsuario,
    //editarColor,
    elimninarRolUsuario

}from '../controllers/rolusuarioControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')
    .post(checkAuth,crearRolUsuario);

router.get('/:id',checkAuth,obtenerRolUsuario);

router
    .route('/:id/:idrol')
    .delete(checkAuth,elimninarRolUsuario);



export default router;