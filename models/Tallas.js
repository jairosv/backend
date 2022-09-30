import Sequelize from "sequelize";
import db from '../config/database.js';

const Tallas = db.define('inv_talla_prenda_tb',{
    tal_pren_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    tal_pren_descripcion: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default Tallas;