import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {

    const { email, nombre, token } = datos;    
    
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      //Informacion del email
      const info =  await transport.sendMail({
          from: '"ModaJemCR - Administrador de ModaJeen" <admin@modajemcr.com> ',
          to: email,
          subject: "UpTask - Confirma tu cuenta",
          text: "Comprueba tu cuenta en ModaJem",
          html: `<p>Hola: ${nombre} Comprueba tu cuenta en ModaJem Sistema Inventarios </p>
          <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:

          <a href=" ${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta.</a>

          <p>Si tu no creastes, puedes ignorar el mensaje</p>
          
          
          </p>
          `
      })
};

export const emailOlvidePassword = async (datos) => {

  const { email, nombre, token } = datos;
  
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

    //Informacion del email
    const info =  await transport.sendMail({
        from: '"ModaJemCR - Administrador de ModaJenn" <admin@modajemcr.com> ',
        to: email,
        subject: "ModaJemCR - Restablece tu password",
        text: "Restablece tu password",
        html: `<p>Hola: ${nombre} has solicitado reestablecer tu password </p>
        <p>Sigue el siguiente enlace para generar un nuevo password:

        <a href=" ${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password.</a>

        <p>Si tu no solcitastes email, puedes ignorar el mensaje</p>
        
        
        </p>
        `
    })

};

export const emailEditarUsuario = async (datos) => {

  const { email, nombre, password } = datos;
  
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

    //Informacion del email
    const info =  await transport.sendMail({
        from: '"ModaJemCR - Administrador de ModaJenn" <admin@modajemcr.com> ',
        to: email,
        subject: "ModaJemCR - Cambio Contraceña",
        text: "Cambio de clave",
        html: `<p>Hola: ${nombre} has cambiado tu password(${password}) correctamente. </p>
        
        <p>Si tu no solcitastes el cambio por comunicate con el administrador del sistema</p>
        
        
        </p>
        `
    })
};

export const emailPedido = async (datos) => {

  const { email, nombre, pedido } = datos;
  
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

    //Informacion del email
    if(email !== undefined){
      const info =  await transport.sendMail({
        from: '"ModaJemCR - Administrador de ModaJenn" <admin@modajemcr.com> ',
        to: email,
        subject: `ModaJemCR - Generación de Apartado/Compra directa #${pedido}`,
        text: "Comrpas",
        html: `<p>Hola: ${nombre} es para informale que se ha generado su número de pedido = ${pedido}. </p>

        <p>Si tienes puedes consultar a nuestro whatapp
          <a href="https://api.whatsapp.com/message/SSOJRXV53VVJP1?autoload=1&app_absent=0
          ">Whatapp.</a>
        </p>
        
        <p>Visite nuestra pagina web
          <a href="https://modajemcr.com/">ModaJem Tienda.</a>
        </p>
        
        
        
        </p>
        `
      })

    }
    
};
