import express from 'express';
import {
    obtenerFormasPago,
    nuevaFormaPago,
    editarFormaPago,
    elimninarFormaPago
} from '../controllers/formapagoControllers.js';

import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')
    .get(checkAuth,obtenerFormasPago)
    .post(checkAuth,nuevaFormaPago);

router
    .route("/:id")
    .put(checkAuth,editarFormaPago)
    .delete(checkAuth,elimninarFormaPago);

    
export default router;
