import express from 'express';
import {
    obtenerListaPrecios,
    crearListaPrecios,
    editarListaPrecios,
    elimninarListaPrecios

}from '../controllers/listaPreciosControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')
    .get(checkAuth,obtenerListaPrecios)
    .post(checkAuth,crearListaPrecios);

router
    .route('/:id')
    .put(checkAuth,editarListaPrecios)
    .delete(checkAuth,elimninarListaPrecios);



export default router;