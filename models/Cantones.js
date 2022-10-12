import Sequelize from "sequelize";
import db from '../config/database.js';

const Cantones = db.define('ge_cantones_tbs',{
    can_cod_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },

    can_cod_provinciaid: {
        type: Sequelize.STRING,
        required: true
    },
    can_descripcion: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default Cantones;