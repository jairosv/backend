import express from 'express';
import {
    obtenerDetContraPedido,
    crearContraPeidoDetalle,
    editarDetalleContraPedido,
    elimninarDetalleContraPedido
} from '../controllers/contrapedidoDetControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/:id')
    .get(checkAuth,obtenerDetContraPedido)
    .post(checkAuth,crearContraPeidoDetalle)
    .put(checkAuth,editarDetalleContraPedido)
    .delete(checkAuth,elimninarDetalleContraPedido);

/*router
    .route('/:id')
    .put(checkAuth,editarColor)
    .delete(checkAuth,elimninarColor);*/



export default router;