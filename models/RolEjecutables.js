import Sequelize from "sequelize";
import db from '../config/database.js';

const RolEjecutables = db.define('seg_rol_ejecutable_tbs',{
    rol_eje_rolid: {
        type: Sequelize.INTEGER,
        primaryKey: true
        
    },
    rol_eje_ejecutableid:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },

    rol_eje_creadopor: {
        type: Sequelize.STRING,
        required: true
    },
    rol_eje_fechacreado: {
        type: Sequelize.DATE,
        default: Date.now(),
        required: true
    },
},
    {
        timestamps: false,
    }
);

export default RolEjecutables;