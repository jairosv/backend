import Sequelize from "sequelize";
import db from '../config/database.js';

const Ejecutables = db.define('seg_ejecutables_tbs',{
    EJE_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Eje_descripcion:{
        type:Sequelize.STRING,
        required: true
    },
    EJE_PATH:{
        type:Sequelize.STRING,
        required: true
    },
    Eje_version:{
        type:Sequelize.STRING,
        required: true
    },
    eje_modulo:{
        type:Sequelize.INTEGER,
        required: true
    },
    eje_tipo:{
        type:Sequelize.STRING,
        require: true
    },
    eje_padreid:{
        type:Sequelize.INTEGER,
        require: true
    },
    eje_urlimagen:{
        type:Sequelize.STRING,
        require: true
    },
    eje_detalle:{
        type:Sequelize.STRING,
        require: true
    }
},
    {
        timestamps: false,
    }
);

export default Ejecutables;