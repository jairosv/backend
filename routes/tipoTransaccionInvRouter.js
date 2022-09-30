import express from 'express';
import {
    obtenerTiposTransaccion,
    crearTipoTransaccion,
    editarTipoTransaccion,
    elimninarTipoTransaccion,
    obtenerTiposTransaccionSalida,
    obtenerTiposTransaccionEntrada

}from '../controllers/tipotransacInvControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')
    .get(checkAuth,obtenerTiposTransaccion)
    .post(checkAuth,crearTipoTransaccion);

router
    .route('/:id')
    .put(checkAuth,editarTipoTransaccion)
    .delete(checkAuth,elimninarTipoTransaccion);

router.get('/obtienetransalida',checkAuth,obtenerTiposTransaccionSalida);
router.get('/obtienetranentrada',checkAuth,obtenerTiposTransaccionEntrada);



export default router;