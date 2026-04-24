const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Solo permitimos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { nombre, email, empresa, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  // Configurar el transporte SMTP con las variables de entorno de Vercel
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_PORT == 465, // true para 465, false para otros
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const mailOptions = {
      from: `"${nombre} (Web)" <${process.env.SMTP_USER}>`, // El correo se envía desde la cuenta SMTP para evitar ser marcado como spam
      replyTo: email, // Permite que al darle "Responder" en tu cliente de correo, vaya al email del cliente
      to: process.env.CONTACT_EMAIL || 'comercial@infinitum.uy', // Tu dirección donde quieres recibir los correos
      subject: `Nuevo mensaje web de: ${nombre}`,
      text: `Has recibido un nuevo mensaje desde el formulario web.\n\nNombre: ${nombre}\nEmail: ${email}\nEmpresa: ${empresa || 'No especificada'}\n\nMensaje:\n${mensaje}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #07090f;">Nuevo contacto desde la web</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Empresa:</strong> ${empresa || 'No especificada'}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${mensaje}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Mensaje enviado con éxito' });
    
  } catch (error) {
    console.error('Error enviando email:', error);
    return res.status(500).json({ message: 'Error interno al enviar el correo' });
  }
}
