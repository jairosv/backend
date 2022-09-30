import express from 'express';
import {
    obtenerDepartamentos,
    crearDepartamento,
    editarDepartamento,
    elimninarDepartamen
} from '../controllers/departamentosControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router = express.Router();

router
    .route('/')
    .get(checkAuth,obtenerDepartamentos)
    .post(checkAuth,crearDepartamento);

router
    .route('/:id')
    .put(checkAuth,editarDepartamento)
    .delete(checkAuth,elimninarDepartamen);



export default router;