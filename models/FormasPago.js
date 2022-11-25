import Sequelize from "sequelize";
import db from '../config/database.js';

const FormasPago = db.define('fac_formas_pago_tbs',{
    form_pag_codigo: {
        type: Sequelize.STRING,
        primaryKey: true
        //autoIncrement: true,
    },
    form_pag_descripcion:{
        type:Sequelize.STRING,
        required: true
    },
    form_pag_mostrarcombo:{
        type:Sequelize.CHAR,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default FormasPago;