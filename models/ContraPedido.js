import Sequelize from "sequelize";
import db from '../config/database.js';

const ContraPedido = db.define('fac_contra_pedido_tb',{
    cont_pedi_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cont_pedi_descripcion:{
        type:Sequelize.STRING,
        required: true
    },

    cont_pedi_detalle: {
        type: Sequelize.STRING,
        required: true
    },
    cont_pedi_finicio: {
        type: Sequelize.DATE,
        required: true
    },
    cont_pedi_ffin: {
        type: Sequelize.DATE,
        required: true
    },
    cont_pedi_estado: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default ContraPedido;