import ContraPedido from '../models/ContraPedido.js';

//Obtiener datos
const obtenerContraPedido = async (req, res) => {
    try {
        const contrapedidos = await ContraPedido.findAll();
        res.json(contrapedidos);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

//Crear
 const crearContraPedido =  async (req, res) => {
     const contrapedido =  new ContraPedido(req.body);
     
     try {
         const contraPedidoAlmacenado = contrapedido.save();
         res.json(contraPedidoAlmacenado);            
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
}

// Actualizar
const editarContraPedido = async (req, res ) => {
    const { id } =  req.params;
    try {
        const contrapedido = await ContraPedido.findByPk(id);
        
        contrapedido.cont_pedi_descripcion = req.body.descripcion || contrapedido.cont_pedi_descripcion;
        contrapedido.cont_pedi_detalle = req.body.detalle || contrapedido.cont_pedi_detalle;
        contrapedido.cont_pedi_detalle = req.body.detalle || contrapedido.cont_pedi_detalle;
        contrapedido.cont_pedi_finicio = req.body.finicio || contrapedido.cont_pedi_finicio;
        contrapedido.cont_pedi_ffin = req.body.ffin || contrapedido.cont_pedi_ffin;
        contrapedido.cont_pedi_estado = req.body.estado || contrapedido.cont_pedi_estado;

        const contraPedidoAlmacenado = await contrapedido.save();
        res.json(contraPedidoAlmacenado);
        
    } catch (error) {       
        res.status(500).json(error);
        console.log(error);
    }
}

//Elminar
const elimninarContraPedido = async (req, res) => {
    const { id } =  req.params;

    try {

        const contrapedido = await ContraPedido.findByPk(id);
        
        if(contrapedido){
            await contrapedido.destroy();
        }else{
            const error =  new Error("El contrapedido ya fue eliminado o no existe.")
            return res.status(404).json({msg: error.message });
        }
        
        res.json({msg: 'Contra Pedido Eliminado.'});

        
    } catch (error) { 
        console.log(error);      
        res.status(500).json(error);
    }

}

export {
    obtenerContraPedido,
    crearContraPedido,
    editarContraPedido,
    elimninarContraPedido
}