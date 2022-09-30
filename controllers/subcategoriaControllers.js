import InvSubCategorias from "../models/InvSubCategorias.js"; 
import ErrorLog from "../models/ErrorLog.js";

//Obtiene los colores del inventario
const obtenerSubCategoria = async (req, res) => {
    const { id } = req.params;
    try {        
        const subcategorias = await InvSubCategorias.findAll({
            where:{
                sub_cate_subdepartamento: id
            },
            order: [
                ['sub_cate_descripcion','ASC']
            ]
        });
        res.json(subcategorias);

    } catch (error) {
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerSubCategoria",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Crea nueva subcategoria
const crearSubCategoria =  async (req, res) => {
    const subcatergoria = new InvSubCategorias(req.body);    
    
    try {
        // Creamos
        const subcateAlmacenado =  await subcatergoria.save();
        res.json(subcateAlmacenado);
    
    } catch (error) {
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "crearSubCategoria",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

// Actualizar Departamento
const editarSubCategoria = async (req, res ) => {
    const { id } =  req.params;
    try {
        const subcategoria = await InvSubCategorias.findByPk(id);
        
        subcategoria.sub_cate_subdepartamento = req.body.sub_cate_subdepartamento || subcategoria.sub_cate_subdepartamento;
        subcategoria.sub_cate_descripcion = req.body.sub_cate_descripcion || subcategoria.sub_cate_descripcion;
        subcategoria.sub_cate_siglas = req.body.sub_cate_siglas || subcategoria.sub_cate_siglas;
        

        const subcateAlmacenado = await subcategoria.save();
        res.json(subcateAlmacenado);
        
    } catch (error) {       
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "editarSubCategoria",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

const elimninarSubCategoria = async (req, res) => {
    const { id } =  req.params;

    try {

        const subcatergoria = await InvSubCategorias.findByPk(id);
        
        if(subcatergoria){
            await subcatergoria.destroy();
        }else{
            const error =  new Error("La categoria ya fue eliminado o no existe.")
            const data = {
                log_user: req.usuario.USU_CODIGO,
                log_login: req.usuario.USU_LOGIN,
                log_proceso: "elimninarSubCategoria",
                log_jsonerror: error,
                log_fecha: Date.now()
            } 
            const errorlog =  new ErrorLog(data);
            const newerrorlog = await errorlog.save(data)
            return res.status(404).json(newerrorlog);
        }
        
        res.json({msg: 'Categoría Eliminado.'});

        
    } catch (error) {       
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "elimninarSubCategoria",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }

}



export{
    obtenerSubCategoria,
    crearSubCategoria,
    editarSubCategoria,
    elimninarSubCategoria
}