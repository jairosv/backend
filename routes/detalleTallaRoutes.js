import express from 'express';
import {
    obtenerDetalleTalla,
    crearDetaTalla,
    editarDetaTalla,
    elimninarDetalleTalla  
} from '../controllers/detatallaControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router.post('/',checkAuth, crearDetaTalla);

router
    .route('/:id')
    .get(checkAuth,obtenerDetalleTalla)
    .put(checkAuth,editarDetaTalla)
    .delete(checkAuth,elimninarDetalleTalla);


export default router;