import Sequelize from "sequelize";
import db from '../config/database.js';

const Colores = db.define('inv_colores_tbs',{
    col_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    col_descripcion:{
        type:Sequelize.STRING,
        required: true
    },

    col_siglas: {
        type: Sequelize.STRING,
        required: true
    },
    col_creado_por: {
        type: Sequelize.STRING,
        required: true
    },
    col_fechacreado: {
        type: Sequelize.DATE,
        required: true
    },
    col_modificado_por: {
        type: Sequelize.STRING,
        required: true
    },
    col_fechamodificado: {
        type: Sequelize.DATE,
        required: true
    },
    col_cod_paleta: {
        type: Sequelize.STRING,
        required: false
    }
},
    {
        timestamps: false,
    }
);

export default Colores;