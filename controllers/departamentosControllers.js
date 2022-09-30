import Departamentos from "../models/Departamentos.js";
import ErrorLog from "../models/ErrorLog.js";

//Obtiener datos
const obtenerDepartamentos = async (req, res) => {
    try {
        const departamentos = await Departamentos.findAll();
        res.json(departamentos);

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

//Crear
 const crearDepartamento =  async (req, res) => {
     const departamento =  new Departamentos(req.body);
     
     try {
         const departamentoAlmacenado = await departamento.save();
         res.json(departamentoAlmacenado);            
      } catch (error) {
        console.log(error);
        //console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "crearDepartamento",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).json(newerrorlog);
      }
}

// Actualizar
const editarDepartamento = async (req, res ) => {
    const { id } =  req.params;
    try {
        const departamento = await Departamentos.findByPk(id);

       
        departamento.dep_siglasdepa = req.body.dep_siglasdepa || departamento.dep_siglasdepa;
        departamento.dep_descripcion = req.body.dep_descripcion || departamento.dep_descripcion;

        const departamentoAlmacenado = await departamento.save();
        res.json(departamentoAlmacenado);
        
    } catch (error) {
        //console.log(error);
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "editarDepartamento",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).json(newerrorlog);
        
    }
}

//Elminar
const elimninarDepartamen = async (req, res) => {
    const { id } =  req.params;

    try {

        const departamento = await Departamentos.findByPk(id);
        
        if(departamento){
            await departamento.destroy();
        }else{
            const error =  new Error("El Departamento ya fue eliminado o no existe.")
            return res.status(404).json({msg: error.message });
        }
        
        res.json({msg: 'Departamento Eliminado.'});

        
    } catch (error) { 
        console.log(error);    
        const data = {
            log_user: req.usuario.USU_CODIGO,
            log_login: req.usuario.USU_LOGIN,
            log_proceso: "elimninarDepartamen",
            log_jsonerror: error,
            log_fecha: Date.now()
        } 
        const errorlog =  new ErrorLog(data);
        const newerrorlog = await errorlog.save(data);
        res.status(500).json(newerrorlog);
    }

}

export {
    obtenerDepartamentos,
    crearDepartamento,
    editarDepartamento,
    elimninarDepartamen    
}