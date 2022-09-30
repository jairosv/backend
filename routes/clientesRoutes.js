import express from 'express';
import {
    obtieneListaClientes,
    obtieneListaDepositosClientes,
    webInstactCliente,
    procesosDepositosClientes,
    obtieneListDepositosCliente

} from '../controllers/clientesControllers.js';

import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

router
    .route('/')
    .post(checkAuth, webInstactCliente);

router.post('/obtieneclientes',checkAuth,obtieneListaClientes)

router.post('/despositocliente',checkAuth,obtieneListaDepositosClientes);
router.post('/procesodeposito',checkAuth,procesosDepositosClientes);
router.post('/listdepositocliente',checkAuth,obtieneListDepositosCliente);


export default router;