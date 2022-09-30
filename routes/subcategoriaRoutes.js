import express from 'express';
import {
    obtenerSubCategoria,
    crearSubCategoria,
    editarSubCategoria,
    elimninarSubCategoria
} from '../controllers/subcategoriaControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')    
    .post(checkAuth,crearSubCategoria);

router
    .route('/:id')
    .get(checkAuth,obtenerSubCategoria)
    .put(checkAuth,editarSubCategoria)
    .delete(checkAuth,elimninarSubCategoria);



export default router;