import Sequelize from "sequelize";
import db from '../config/database.js';

const InvSubCategorias = db.define('inv_sub_categorias_tbs',{
    sub_cate_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sub_cate_subdepartamento: {
        type: Sequelize.INTEGER,
        required:true
    },
    sub_cate_siglas: {
        type: Sequelize.STRING,
        required: true
    },
    sub_cate_descripcion: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default InvSubCategorias;