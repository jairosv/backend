import express from 'express';
import {
    obtenerArticulos,
    obtieneArticulosLocalizacion,
    obtieneArticulosTallas,
    obtieneListaPreciosArt,
    obtieneTomasFisicas,
    obtieneDetalleTomasFisicas,
    obtieneSeguiArticulo

} from '../controllers/queryArtiControllers.js';
import checkAuth from '../middleware/checjAuth.js';


const router =  express.Router();

router.post("/obtieneArticulos",
            checkAuth,
            obtenerArticulos            
);

router.post("/obtieneartiLocal",
            checkAuth,
            obtieneArticulosLocalizacion            
);

router.get("/obtieneartitalla/:id",
            checkAuth,
            obtieneArticulosTallas            
);

router.post("/obtienelistaprecioart",
            checkAuth,
            obtieneListaPreciosArt            
);
router.post("/obtienetomasfisicas",
            checkAuth,
            obtieneTomasFisicas
);

router.get("/obtienedettomafisica/:id",
            checkAuth,
            obtieneDetalleTomasFisicas            
);

router.get("/obtieneseguiarticulo/:id",
            checkAuth,
            obtieneSeguiArticulo            
);

export default router;