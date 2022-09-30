import Sequelize from "sequelize";
import db from '../config/database.js';

const InvSubDepartamentos = db.define('inv_sub_departamentos_tbs',{
    sub_depa_codigo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    sub_depa_departamento: {
        type: Sequelize.INTEGER,
        require:true
    },
    sub_depa_siglas: {
        type: Sequelize.STRING,
        required: true
    },
    sub_depa_descripcion: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default InvSubDepartamentos;