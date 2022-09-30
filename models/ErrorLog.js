import Sequelize from "sequelize";
import db from '../config/database.js';

const ErrorLog = db.define('ge_error_logs',{
    log_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    log_user:{
        type:Sequelize.INTEGER,
        required: true
    },
    log_login:{
        type:Sequelize.STRING,
        required: false
    },
    log_proceso:{
        type:Sequelize.STRING,
        required: true
    },
    log_jsonerror:{
        type:Sequelize.JSON,
        require: true
    },
    log_fecha: {
        type: Sequelize.DATE,
        default: Date.now(),
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default ErrorLog;