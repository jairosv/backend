import express from 'express';
import {
    obtenerRoles,
    crearRoles,
    editarRol,
    elimninarRol

} from '../controllers/rolControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')
    .get(checkAuth,obtenerRoles)
    .post(checkAuth,crearRoles);

router
    .route('/:id')
    .put(checkAuth,editarRol)
    .delete(checkAuth,elimninarRol);



export default router;