import express from 'express';
import {
    insertaArticulos,
    actualizaArticulos,
    insertaArticuloTalla,
    actualizaTallaArticulos,
    borrarTallasContraPedidoArticulo,
    actualizainsertaPreciosArticulos,
    generarTomaFisica,
    actualizaDetalleTomaFisica,
    procesaTomaFisica

} from '../controllers/processArtiControllers.js';
import checkAuth from '../middleware/checjAuth.js';

const router =  express.Router();

//Inserta los articulos
router.post('/insertararticulo',
            checkAuth,
            insertaArticulos);

//Actualiza los articulos.
router.post('/actualizaarticulos',
            checkAuth,
            actualizaArticulos);

//Ingresa las tallas de los articulos.
router.post('/insertatallaarti',
            checkAuth,
            insertaArticuloTalla);

//Actualiza las tallas de los articulos.
router.post('/actualizatallasarti',
            checkAuth,
            actualizaTallaArticulos);

//Borra Tallas contra pedido
router.post('/eliminatallacontrapedi',
            checkAuth,
            borrarTallasContraPedidoArticulo);

//Actualiza o inserta Lista de precios.
router.post('/actinsertlistprecio',
            checkAuth,
            actualizainsertaPreciosArticulos);

//Generar Toma Fisica
router.post('/generatomafisica',
            checkAuth,
            generarTomaFisica); 

//Actualiza el detalle de la toma fisica
router.post('/actualizadettomafisica',
            checkAuth,
            actualizaDetalleTomaFisica);

//Procesa Toma Fisica
router.post('/procesatoma',
            checkAuth,
            procesaTomaFisica);


export default router;