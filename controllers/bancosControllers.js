import Bancos from '../models/Bancos.js';


//Obtiene los bancos.
const obtenerBancos = async (req, res) => {
    try {        
        const bancos = await Bancos.findAll();
        res.json(bancos);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const nuevoBanco = async (req, res) => {
    const banco =  new Bancos(req.body);    
    banco.ban_fechaingreso = Date.now()

    try {
        const bancoAlmacenado =  await banco.save();
        res.json(bancoAlmacenado);        
        
    } catch (error) {
        console.log(error);        
        return res.status(401).json(error);
    }
}

const editarBanco = async (req, res) => {
    const { id } =  req.params;

    try {
        const banco = await Bancos.findByPk(id);
        
        banco.ban_nombre = req.body.nombre || banco.ban_nombre;
        banco.ban_siglas = req.body.siglas || banco.ban_siglas;        
        banco.ban_mostrar_web = req.body.mostrarweb || banco.ban_mostrar_web;

        const bancoAlmacenado = await banco.save();
        res.json(bancoAlmacenado);
        
    } catch (error) {       
        res.status(404).json(error);
        console.log(error);
    }
}

const elimninarBanco = async (req, res) => {
    const { id } =  req.params;

    try {

        const banco = await Bancos.findByPk(id);
        
        if(banco){
            await banco.destroy();
        }else{
            const error =  new Error("El banco ya fue eliminado o no existe.")
            return res.status(404).json({msg: error.message });
        }
        
        res.json({msg: 'Banco Eliminado.'});

        
    } catch (error) {       
        res.status(404).json(error);
        console.log(error);
    }

}



export {
    obtenerBancos,
    nuevoBanco,
    editarBanco,
    elimninarBanco
}
