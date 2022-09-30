import Sequelize from "sequelize";
import db from '../config/database.js';

const Marcas = db.define('inv_marca_articulo_tb',{
    mar_art_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    mar_art_descripcion: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default Marcas;