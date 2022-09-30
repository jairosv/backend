import Sequelize from "sequelize";
import db from '../config/database.js';

const DetalleTalla = db.define('inv_det_talla_prenda_tb',{
    det_tal_pren_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    det_tal_pren_talla: {
        type: Sequelize.INTEGER,
        require:true
    },
    det_tal_pren_detalle: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default DetalleTalla;