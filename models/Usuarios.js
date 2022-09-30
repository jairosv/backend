import {BOOLEAN, Sequelize} from "sequelize";
import db from '../config/database.js';

const Usuarios = db.define('seg_usuarios_tbs',{
    USU_CODIGO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    USU_NOMBRE:{
        type:Sequelize.STRING,
        required: true
    },
    USU_LOGIN: {
        type: Sequelize.STRING,
        required: true
    },
    USU_EMAIL: {
        type: Sequelize.STRING
    },
    USU_PASSWORD: {
        type: Sequelize.STRING,
        required: true
    },
    USU_CEDULA: {
        type: Sequelize.STRING,
        required: true
    },
    USU_CELULAR: {
        type: Sequelize.STRING,
        required: true
    },
    USU_STATE: {
        type: Sequelize.BOOLEAN,
        required: true
    },
    USU_CREADO_POR: {
        type: Sequelize.STRING,
        required: true
    },
    USU_FECHA_CREADO: {
        type: Sequelize.DATE,
        required: true
    },
    USU_MODIFICADO_POR: {
        type: Sequelize.STRING
    },
    USU_FECHA_MODIFICADO: {
        type: Sequelize.DATE
    },
    USU_CONFIRMADO: {
        type: Boolean,
        default:false
    }, 
    USU_TOKEN: {
        type: Sequelize.BLOB
    }


},
    {
        timestamps: false,
    }
);

export default Usuarios;