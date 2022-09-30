import Sequelize from "sequelize";
import db from '../config/database.js';

const RolUsuarios = db.define('seg_rol_usuario_tbs',{
    rol_usu_usuarioid: {
        type: Sequelize.INTEGER,
        primaryKey: true
        
    },
    rol_usu_rolid:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },

    rol_usu_creadopor: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default RolUsuarios;