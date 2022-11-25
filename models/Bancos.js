import Sequelize from "sequelize";
import db from '../config/database.js';

const Bancos = db.define('ge_bancos_tbs',{
    ban_codigo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ban_nombre:{
        type:Sequelize.STRING,
        required: true
    },
    ban_siglas:{
        type:Sequelize.STRING,
        required: true
    },
    ban_fechaingreso: {
        type: Sequelize.DATE,
        default: Date.now(),
        required: true
    },
    ban_mostrar_web:{
        type:Sequelize.STRING,
        required: true
    },
    ban_mostrarcombo:{
        type:Sequelize.TINYINT,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default Bancos;