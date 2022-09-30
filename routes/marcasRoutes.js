import express from 'express';
import {
    obtenerMarcas,
    crearMarca,
    editarMarca,
    elimninarMarca

}from '../controllers/marcaControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')
    .get(checkAuth,obtenerMarcas)
    .post(checkAuth,crearMarca);

router
    .route('/:id')
    .put(checkAuth,editarMarca)
    .delete(checkAuth,elimninarMarca);



export default router;