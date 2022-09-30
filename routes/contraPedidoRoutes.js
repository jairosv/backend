import express from 'express';
import{
    obtenerContraPedido,
    crearContraPedido,
    editarContraPedido,
    elimninarContraPedido
} from '../controllers/contraPedidoControllers.js';

import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')
    .get(checkAuth,obtenerContraPedido)
    .post(checkAuth,crearContraPedido);

router
    .route('/:id')
    .put(checkAuth,editarContraPedido)
    .delete(checkAuth,elimninarContraPedido);



export default router;