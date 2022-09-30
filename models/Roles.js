import Sequelize from "sequelize";
import db from '../config/database.js';

const Roles = db.define('seg_rol_tb',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rol_descripcion: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default Roles;