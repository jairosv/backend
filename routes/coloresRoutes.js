import express from 'express';
import {
    obtenerColores,
    crearColores,
    editarColor,
    elimninarColor

}from '../controllers/colorControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')
    .get(checkAuth,obtenerColores)
    .post(checkAuth,crearColores);

router
    .route('/:id')
    .put(checkAuth,editarColor)
    .delete(checkAuth,elimninarColor);



export default router;