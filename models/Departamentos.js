import Sequelize from "sequelize";
import db from '../config/database.js';

const Departamentos = db.define('inv_departamentos_tbs',{
    dep_codigo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dep_siglasdepa:{
        type:Sequelize.STRING,
        required: true
    },

    dep_descripcion: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);
export default Departamentos;