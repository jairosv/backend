import Sequelize from "sequelize";
import db from '../config/database.js';

const Provincias = db.define('ge_provincias_tbs',{
    provi_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },

    provi_descripcion: {
        type: Sequelize.STRING,
        required: true
    },
    provi_cant_cantones: {
        type: Sequelize.INTEGER,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default Provincias;