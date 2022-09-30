import express from 'express';
import {
    obtieneArticulosFacturar,
    obtieneArticulosPedido,
    obtieneListaDetalleFactura,
    obtieneListaPedidos,
    obtieneListaFacturas,
    generarPedidoCliente,
    procesoDetallePedido,
    procesoPedido,
    actualizaDatosGeneralesFactura,
    procesoDetalleFactura,
    obtieneListSeguiContraPedido,
    procesoNotasCredito,
    obtieneListadoNotasCR,
    obtieneDetalleListadoNotasCR,
    procesoDetallePagoFactura,
    procesoCambiaTipoPedido,
    obtienerPrecioArticulo,
    obtieneDetallePagoFactura

} from '../controllers/facturacionControllers.js';

import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

//Metodo get Facturas
router.post('/listartfact',checkAuth,obtieneArticulosFacturar);

//Metodo get pedidos
router.get('/obtieneartipedido/:id/:linea',checkAuth,obtieneArticulosPedido);
router.get('/obtienelistdetfact/:id',checkAuth,obtieneListaDetalleFactura);
router.post('/obtienelistapedidos/:id',checkAuth,obtieneListaPedidos);

//Metodos post procesos pedidos
router.post('/generapedido',checkAuth,generarPedidoCliente);
router.post('/procesodetpedido/:id/:linea',checkAuth,procesoDetallePedido);
router.post('/procesopedido/',checkAuth,procesoPedido);
router.post('/cambiatipopedido',checkAuth,procesoCambiaTipoPedido);

//Metodos precios
router.get('/obtieneprecioart/:id',checkAuth,obtienerPrecioArticulo);

//Metodo Facturas
router.post('/obtienelistadofact/:id',checkAuth,obtieneListaFacturas)
router
    .route('/:id')
    .get(checkAuth,obtieneDetallePagoFactura)//Obtiene el detalle de pago de una factura 
    .put(checkAuth,actualizaDatosGeneralesFactura)
    .post(checkAuth,procesoDetallePagoFactura);

//Metodos detalle factura
router.post('/detallefact/:id',checkAuth,procesoDetalleFactura);

//Metodos notas
router.post('/notas/obtienelistnotas/:id',checkAuth,obtieneListadoNotasCR);

router
    .route('/notas/:id')
    .post(checkAuth,procesoNotasCredito)
    //.get(checkAuth,obtieneListadoNotasCR)
    ;

//Metodo detalle nota
router
    .route('/detnota/:id')
    .get(checkAuth,obtieneDetalleListadoNotasCR)

//ContraPedido
router
    .route('/contrapedido/:id')
    .get(checkAuth,obtieneListSeguiContraPedido);






export default router;