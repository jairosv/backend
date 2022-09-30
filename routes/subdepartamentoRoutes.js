import express from 'express';
import {
    obtenerSubDepartamento,
    crearSubDepartamento,
    editarSubDepartamento,
    elimninarSubDepartamento
} from '../controllers/subDepartControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')    
    .post(checkAuth,crearSubDepartamento);

router
    .route('/:id')
    .get(checkAuth,obtenerSubDepartamento)
    .put(checkAuth,editarSubDepartamento)
    .delete(checkAuth,elimninarSubDepartamento);



export default router;