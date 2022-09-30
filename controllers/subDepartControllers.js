import InvSubDepartamentos from "../models/InvSubDepartamentos.js";
import ErrorLog from "../models/ErrorLog.js";

//Obtiene los colores del inventario
const obtenerSubDepartamento = async (req, res) => {
    const { id } = req.params;
    try {        
        const subdepartamentos = await InvSubDepartamentos.findAll({
            where:{
                sub_depa_departamento: id
            },
            order: [
                ['sub_depa_descripcion','ASC']
            ]
        });
        res.json(subdepartamentos);

    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "obtenerDepartamentos",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).send(newerrorlog);
    }
}

//Crea una nuevo color
const crearSubDepartamento =  async (req, res) => {
    const subsubdepartamento = new InvSubDepartamentos(req.body);

    try {
        // Creamos
        const subdepaAlmacenado =  await subsubdepartamento.save();
        res.json(subdepaAlmacenado);
    
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "crearSubDepartamento",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).json(newerrorlog);
    }
}

// Actualizar Departamento
const editarSubDepartamento = async (req, res ) => {
    const { id } =  req.params;
    try {
        const subdepartamento = await InvSubDepartamentos.findByPk(id);

        subdepartamento.sub_depa_departamento = req.body.sub_depa_departamento || subdepartamento.sub_depa_departamento;
        subdepartamento.sub_depa_descripcion = req.body.sub_depa_descripcion || subdepartamento.sub_depa_descripcion;
        subdepartamento.sub_depa_siglas = req.body.sub_depa_siglas || subdepartamento.sub_depa_siglas;

        const subdepaAlmacenado = await subdepartamento.save();
        res.json(subdepaAlmacenado);
        
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "editarSubDepartamento",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(404).json(newerrorlog);
        
    }
}

const elimninarSubDepartamento = async (req, res) => {
    const { id } =  req.params;

    try {

        const subdepartamento = await InvSubDepartamentos.findByPk(id);
        
        if(subdepartamento){
            await subdepartamento.destroy();
        }else{
            const error =  new Error("El subdepartamento ya fue eliminado o no existe.")
            return res.status(404).json({msg: error.message });
        }
        
        res.json({msg: 'SubDepartamento Eliminado.'});

        
    } catch (error) {
        console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "elimninarSubDepartamento",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);     
        res.status(404).json(newerrorlog);
        
    }
}

export{
    obtenerSubDepartamento,
    crearSubDepartamento,
    editarSubDepartamento,
    elimninarSubDepartamento
}