import Sequelize from "sequelize";
import db from '../config/database.js';

const articuloTallas = db.define('inv_articulo_dettalla_tbs',{
    art_detta_articulo: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    art_detta_talla: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    art_detta_detalletalla: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    art_detta_color: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    art_detta_cantidad: {
        type: Sequelize.DECIMAL,
        required: true
    },
    art_detta_usuario: {
        type: Sequelize.STRING,
        required: true
    },
    art_detta_fechaingreso: {
        type: Sequelize.DATE,
        required: true
    },
    art_detta_modificado: {
        type: Sequelize.STRING,
        required: false
    },
    art_detta_fechamodficado: {
        type: Sequelize.DATE,
        required: false
    },
},
    {
        timestamps: false,
    }
);

export default articuloTallas;