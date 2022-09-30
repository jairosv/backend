import Sequelize from "sequelize";
import db from '../config/database.js';

const DetalleContraPedido = db.define('fac_detalle_contra_pedido_tbs',{
    det_contpedi_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    det_contpedi_contrapedido:{
        type:Sequelize.INTEGER,
        required: true
    },
    det_contpedi_descripcion: {
        type: Sequelize.STRING,
        required: true
    },
    det_contpedi_detalle: {
        type: Sequelize.DECIMAL,
        required: true
    },
    det_contpedi_url: {
        type: Sequelize.STRING,
        required: true
    },
    det_contpedi_urlimagen: {
        type: Sequelize.STRING,
        required: true
    },
    det_contpedi_proveedor: {
        type: Sequelize.STRING,
        required: true
    },
    det_contpedi_departamento: {
        type: Sequelize.INTEGER,
        required: true
    },
    det_contpedi_subdepartamento: {
        type: Sequelize.INTEGER,
        required: true
    },
    det_contpedi_mayor: {
        type: Sequelize.DECIMAL,
        required: true
    },
    det_contpedi_tuboutique: {
        type: Sequelize.DECIMAL,
        required: true
    },
    det_contpedi_nombre: {
        type: Sequelize.STRING,
        required: true
    },
    det_contpedi_sku: {
        type: Sequelize.STRING,
        required: true
    }

},
    {
        timestamps: false,
    }
);

export default DetalleContraPedido;