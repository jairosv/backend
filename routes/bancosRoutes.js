import express from 'express';

import {
    obtenerBancos,
    nuevoBanco,
    editarBanco,
    elimninarBanco
    
}from '../controllers/bancosControllers.js'
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')
    .get(checkAuth,obtenerBancos)
    .post(checkAuth,nuevoBanco);

router
    .route("/:id")
    .put(checkAuth,editarBanco)
    .delete(checkAuth,elimninarBanco);

    
export default router;
