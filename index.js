import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import consultaArtiRoutes from './routes/queryArtiRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import processArtiRoutes from './routes/processArtiRoutes.js'
import bancosRoutes from './routes/bancosRoutes.js';
import clientesRoutes from './routes/clientesRoutes.js';
import postOfficeCRRoutes from './routes/postOfficeCRRoutes.js';
import coloresRoutes from './routes/coloresRoutes.js'
import contraPedidoRoutes from './routes/contraPedidoRoutes.js';
import contrapedidoDetRoutes from './routes/contrapedidoDetRoutes.js';
import detalleTallaRoutes from './routes/detalleTallaRoutes.js';
import tipoTransaccionRoutes from './routes/tipoTransaccionInvRouter.js';
import listapreciosRoutes from './routes/listapreciosRoutes.js'
import marcasRoutes from './routes/marcasRoutes.js';
import facturacionRoutes from './routes/facturacionRoutes.js';
import rolesRoutes from './routes/rolesRoutes.js';
import rolusuarioRoutes from './routes/rolusuarioRoutes.js';
import tallasRoutes from './routes/tallasRoutes.js'
import departamentoRoutes from './routes/departamentosRoutes.js'
import subdepartamentoRoutes from './routes/subdepartamentoRoutes.js';
import subcategoriasRoutes from './routes/subcategoriaRoutes.js';
import errorlogRoutes from './routes/errorlogRoutes.js';
import rolejecutablRoutes from './routes/rolejecutableRoutes.js';


const app = express();

app.use(express.json());

dotenv.config();


//Configurar CORS

const whitelist = [ process.env.FRONTEND_URL, process.env.FRONTEND_RED, process.env.FRONTEND_HOSTNAME, process.env.BACKEND_RED, process.env.FRONTEND_HOSTNAME_LAPTOP, process.env.FRONTEND_RED_LAPTOP ];

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            //Puede consultar la API
            callback(null, true);
        } else{
            //No esta permitido.
			console.log("Error");
            callback(new Error("Error de Cors"))

        }
    },
	
}
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

app.use(cors(corsOptions));


//Variables de entorno
const PORT = process.env.PORT || 4000;
const server  = process.env.SERVER || "/pruebas";


//Routing
app.use(`${server}/api/usuarios`,usuariosRoutes);
app.use(`${server}/api/articulos`,consultaArtiRoutes);
app.use(`${server}/api/processarti`,processArtiRoutes);
app.use(`${server}/api/mantebancos`,bancosRoutes);
app.use(`${server}/api/clientes`,clientesRoutes);
app.use(`${server}/api/postofficecr`,postOfficeCRRoutes);
app.use(`${server}/api/color`,coloresRoutes);
app.use(`${server}/api/contrapedido`,contraPedidoRoutes);
app.use(`${server}/api/contrapedidodet`,contrapedidoDetRoutes);
app.use(`${server}/api/subtalla`,detalleTallaRoutes);
app.use(`${server}/api/tipotransaccion`,tipoTransaccionRoutes);
app.use(`${server}/api/listaprecios`,listapreciosRoutes);
app.use(`${server}/api/marcas`,marcasRoutes);
app.use(`${server}/api/facturacion`,facturacionRoutes);
app.use(`${server}/api/roles`,rolesRoutes);
app.use(`${server}/api/rolusuario`,rolusuarioRoutes);
app.use(`${server}/api/tallas`,tallasRoutes);
app.use(`${server}/api/departamento`,departamentoRoutes);
app.use(`${server}/api/subdepartamento`,subdepartamentoRoutes);
app.use(`${server}/api/subcategoria`,subcategoriasRoutes);
app.use(`${server}/api/errorlog`,errorlogRoutes);
app.use(`${server}/api/rolejecutable`,rolejecutablRoutes);



const servidor = app.listen(PORT,() => {
    console.log(`Servidor corriendo en el puerdo ${PORT} server ${server}`);
});

//console.log(servidor);

// Soket.io
/*import { Server } from 'socket.io';

const io = new Server(servidor,{
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});

io.on('connection',(socket) => {
    console.log('Conectado a socket.io');

    //Definir los eventos de socket.io

})*/