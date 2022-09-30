import express from 'express';
import {
    obtenerTallas,
    crearTalla,
    editarTalla,
    elimninarTalla

}from '../controllers/tallasControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')
    .get(checkAuth,obtenerTallas)
    .post(checkAuth,crearTalla);

router
    .route('/:id')
    .put(checkAuth,editarTalla)
    .delete(checkAuth,elimninarTalla);



export default router;