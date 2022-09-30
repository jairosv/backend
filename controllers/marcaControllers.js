import Marcas from '../models/Marcas.js';
import ErrorLog from "../models/ErrorLog.js";


//Obtiene los colores del inventario
const obtenerMarcas = async (req, res) => {
    try {        
        const marcas = await Marcas.findAll({
            order: [
                ['mar_art_descripcion','ASC']
            ]
        });
        res.json(marcas);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerMarcas",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Crea una nuevo color
const crearMarca =  async (req, res) => {
    const marcas = new Marcas(req.body);
    
    try {
        // Creamos
        const marcaAlmacenado =  await marcas.save();
        
        res.json(marcaAlmacenado);
    
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "crearMarca",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

// Actualizar Departamento
const editarMarca = async (req, res ) => {
    const { id } =  req.params;
    try {
        const marcas = await Marcas.findByPk(id);
        
        marcas.mar_art_descripcion = req.body.mar_art_descripcion || marcas.mar_art_descripcion;

        const marcaAlmacenado = await marcas.save();
        res.json(marcaAlmacenado);
        
    } catch (error) {       
        res.status(404).json(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "editarMarca",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

const elimninarMarca = async (req, res) => {
    const { id } =  req.params;

    try {

        const marcas = await Marcas.findByPk(id);
        
        if(marcas){
            await marcas.destroy();
        }else{
            const error =  new Error("La marca ya fue eliminado o no existe.")
            const data = {
                log_user: req.usuario.USU_CODIGO,
                log_login: req.usuario.USU_LOGIN,
                log_proceso: "elimninarMarca",
                log_jsonerror: error,
                log_fecha: Date.now()
            } 
            const errorlog =  new ErrorLog(data);
            const newerrorlog = await errorlog.save(data);
            return res.status(500).send(newerrorlog);
        }
        
        res.json({msg: 'Maca Eliminado.'});

        
    } catch (error) {       
        res.status(404).json(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "elimninarMarca",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }

}



export{
    obtenerMarcas,
    crearMarca,
    editarMarca,
    elimninarMarca
}