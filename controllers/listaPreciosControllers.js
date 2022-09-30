import ListaPrecios from '../models/ListaPrecios.js';


//Obtiene los colores del inventario
const obtenerListaPrecios = async (req, res) => {
    try {        
        const listaprecios = await ListaPrecios.findAll();
        res.json(listaprecios);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }
}

//Crea una nuevo color
const crearListaPrecios =  async (req, res) => {
    const listaprecios = new ListaPrecios(req.body);
    listaprecios.list_preci_creado_por = req.usuario.USU_LOGIN;
    listaprecios.list_preci_fechacreado = Date.now();
    //listaprecios.col_modificado_por = null;
    //listaprecios.col_fechamodificado = null;
    try {
        // Creamos
        const listapreciosAlmacenado =  await listaprecios.save();
        res.json(listapreciosAlmacenado);
    
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Actualizar Departamento
const editarListaPrecios = async (req, res ) => {
    const { id } =  req.params;
    try {
        const listaprecios = await ListaPrecios.findByPk(id);
        
        listaprecios.list_preci_descripcion = req.body.descripcion || listaprecios.list_preci_descripcion;
        listaprecios.list_preci_impuesto = req.body.impuesto || listaprecios.list_preci_impuesto;
        listaprecios.list_preci_principal = req.body.principal || listaprecios.list_preci_principal;
        listaprecios.list_preci_impuesto = req.body.impuesto || listaprecios.list_preci_principal;
        listaprecios.list_preci_tipolist = req.body.tipolista || listaprecios.list_preci_tipolist;
        listaprecios.list_preci_modificado = req.usuario.USU_LOGIN|| listaprecios.list_preci_modificado
        listaprecios.list_preci_fechamodificado = Date.now() || listaprecios.list_preci_fechamodificado

        const listaprecioAlmacenado = await listaprecios.save();
        res.json(listaprecioAlmacenado);
        
    } catch (error) {       
        res.status(404).json(error);
        console.log(error);
    }
}

const elimninarListaPrecios = async (req, res) => {
    const { id } =  req.params;

    try {

        const listaprecios = await ListaPrecios.findByPk(id);
        
        if(listaprecios){
            await listaprecios.destroy();
        }else{
            const error =  new Error("La lista de precios ya fue eliminado o no existe.")
            return res.status(404).json({msg: error.message });
        }
        
        res.json({msg: 'Lista Eliminado.'});

        
    } catch (error) {       
        res.status(404).json(error);
        console.log(error);
    }

}



export{
    obtenerListaPrecios,
    crearListaPrecios,
    editarListaPrecios,
    elimninarListaPrecios
}