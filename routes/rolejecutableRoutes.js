import express from 'express';
import{
    obtenerEjecutables,
    obtenerRolesEjecutables,
    asignarRolEjecutable,
    elimninarRolEjecutable

} from '../controllers/rolesejecutableControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
      .route('/:id')
      .get(checkAuth,obtenerRolesEjecutables);      

router
    .route('/')
    .get(checkAuth,obtenerEjecutables)
    .post(checkAuth,asignarRolEjecutable);

router.delete('/:id/:ejeid',checkAuth,elimninarRolEjecutable);

export default router;
