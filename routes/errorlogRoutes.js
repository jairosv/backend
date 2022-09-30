import express from 'express';
import{
    obtenerErroresUser
} from '../controllers/errorlogControllers.js';

import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')
    .get(checkAuth,obtenerErroresUser);


export default router;