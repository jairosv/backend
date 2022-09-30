import Sequelize from "sequelize";
import db from '../config/database.js';

const ListaPrecios = db.define('inv_lista_precios_tbs',{
    list_preci_codigo: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    list_preci_descripcion:{
        type:Sequelize.STRING,
        required: true
    },
    list_preci_impuesto:{
        type: Sequelize.FLOAT,
        required: true
    },
    list_preci_principal:{
        type: Sequelize.STRING,
        required: true
    },
    list_preci_tipolist:{
        type: Sequelize.STRING,
        required: true
    },
    list_preci_creado_por:{
        type: Sequelize.STRING,
        required: true
    },
    list_preci_fechacreado:{
        type: Sequelize.DATE,
        required: true
    },
    list_preci_modificado:{
        type: Sequelize.STRING
    },
    list_preci_fechamodificado:{
        type: Sequelize.DATE,
        required: true
    }
},
    {
        timestamps: false,
    }
);

export default ListaPrecios;