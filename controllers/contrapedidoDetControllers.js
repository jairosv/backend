import DetalleContraPedido from "../models/DetalleContraPedido.js";

//Obtiene los colores del inventario
const obtenerDetContraPedido = async (req, res) => {
    const { id } = req.params;
    
    try {        
        const detallecontrapedido = await DetalleContraPedido.findAll({
            where:{
                det_contpedi_contrapedido: id
            }
        });
        res.json(detallecontrapedido);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }
}

//Crear
const crearContraPeidoDetalle =  async (req, res) => {
    const { id } = req.params;
    const detallecontrapedido =  new DetalleContraPedido(req.body);
    detallecontrapedido.det_contpedi_contrapedido = id;
    
    try {
        const detalleCPAlmacenado = await detallecontrapedido.save();
        res.json(detalleCPAlmacenado);

     } catch (error) {
       console.log(error);
       res.status(500).json(error);
     }
}

const editarDetalleContraPedido = async (req, res) => {
    const { id } =  req.params;
    try {
        const detallecontrapedido = await DetalleContraPedido.findByPk(id);
        
        detallecontrapedido.det_contpedi_descripcion = req.body.descripcion || detallecontrapedido.ban_nombre;
        detallecontrapedido.det_contpedi_detalle = req.body.preciodetalle || detallecontrapedido.det_contpedi_detalle;        
        detallecontrapedido.det_contpedi_url = req.body.url || detallecontrapedido.det_contpedi_url;
        detallecontrapedido.det_contpedi_urlimagen = req.body.urlimagen || detallecontrapedido.det_contpedi_urlimagen;
        detallecontrapedido.det_contpedi_proveedor = req.body.proveedor || detallecontrapedido.det_contpedi_proveedor;
        detallecontrapedido.det_contpedi_departamento = req.body.departamento|| detallecontrapedido.det_contpedi_departamento;
        detallecontrapedido.det_contpedi_subdepartamento = req.body.subdepartamento || detallecontrapedido.det_contpedi_subdepartamento;
        detallecontrapedido.det_contpedi_mayor = req.body.preciomayor || detallecontrapedido.det_contpedi_mayor;
        detallecontrapedido.det_contpedi_tuboutique = req.body.preciotuboutique || detallecontrapedido.det_contpedi_tuboutique;
        detallecontrapedido.det_contpedi_nombre = req.body.nombre || detallecontrapedido.det_contpedi_nombre;
        detallecontrapedido.det_contpedi_sku = req.body.sku || detallecontrapedido.det_contpedi_sku;

        const detContraPedidoAlmacenado = await detallecontrapedido.save();
        res.json(detContraPedidoAlmacenado);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const elimninarDetalleContraPedido = async (req, res) => {
    const { id } =  req.params;

    try {

        const detallecontrapedido = await DetalleContraPedido.findByPk(id);
        
        if(detallecontrapedido){
            await detallecontrapedido.destroy();
        }else{
            const error =  new Error("El Detalle ya fue eliminado o no existe.")
            return res.status(404).json({msg: error.message });
        }
        
        res.json({msg: 'Detalle Eliminado.'});

        
    } catch (error) {       
        res.status(404).json(error);
        console.log(error);
    }

}

export {
    obtenerDetContraPedido,
    crearContraPeidoDetalle,
    editarDetalleContraPedido,
    elimninarDetalleContraPedido
}
