import Sequelize from "sequelize";
import db from '../config/database.js';

const InvTiposTransaccion = db.define('inv_tipo_transaccion_tbs',{
    tip_tran_codigo: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    tip_tran_descripcion: {
        type: Sequelize.STRING,
        required:true
    },
    tip_tran_signo: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default InvTiposTransaccion;