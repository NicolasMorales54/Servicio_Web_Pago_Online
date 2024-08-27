import Gato from "../model/gatito.model.js";
import sendEmails from "../sendEmail.js";

export const getGatos = async (req, res) => {
  try {
    console.log("Attempting to find gatos...");
    const gatos = await Gato.find();
    console.log("Estos son los gatos:", gatos);
    res.json(gatos);
  } catch (error) {
    console.error("Error al obtener gatos:", error);
    return res.status(404).json({ message: "Gatos no encontrados" });
  }
};

export const getGato = async (req, res) => {
  try {
    const { id } = req.params;
    const gato = await Gato.findById(id);
    res.json(gato);
  } catch (error) {
    console.error("Error al obtener gato:", error);
    return res.status(404).json({ message: "Gato no encontrado" });
  }
};

export const createGato = async (req, res) => {
  try {
    // Crear un nuevo objeto Gato con los datos recibidos
    const {
      nombre,
      edad,
      raza,
      color,
      peso,
      sexo,
      disponibilidad,
      esterilizado,
      vacunado,
      precio,
      image,
    } = req.body;

    const nuevoGato = new Gato({
      nombre,
      edad,
      raza,
      color,
      peso,
      sexo,
      disponibilidad,
      esterilizado,
      vacunado,
      precio,
      image,
    });

    // Guardar el nuevo gato en la base de datos
    const gatoGuardado = await nuevoGato.save();

    // Enviar la respuesta con el gato creado
    res.status(201).json(gatoGuardado);
  } catch (error) {
    console.error("Error al crear el gato:", error);
    res.status(500).json({ message: "Hubo un problema al crear el gato" });
  }
};

export const registro = async (req, res) => {
    const { correo, nombre, apellido } = req.body;

    console.log('Recibiendo datos:', req.body); // Agrega un log para verificar los datos

    try {
        const subject = "¡Gracias por tu interés en adoptar un gatito!";

        const htmlToSend = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h1>¡Felicidades, ${nombre} ${apellido}!</h1>
                <p>Querido amante de los animales,</p>
                <p>¡Gracias por tu interés en darle una oportunidad de amor a un gatito! Nos alegra saber que estás dispuesto a ofrecerle un hogar lleno de cariño y atención a uno de nuestros adorables felinos.</p>
                <p>Tu solicitud ha sido recibida y será revisada cuidadosamente. Nos pondremos en contacto contigo pronto para guiarte a través del siguiente paso en el proceso de adopción. Mientras tanto, si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros.</p>
                <p>Estamos emocionados de trabajar contigo para encontrar el compañero perfecto para ti y tu familia.</p>
                <p>¡Gracias de nuevo por tu compasión y dedicación!</p>
                <p>Atentamente,<br>El equipo de Adopción de Gatitos</p>
            </div>
        `;

        await sendEmails(correo, subject, htmlToSend);

        return res.status(200).json({ successMessage: "Felicidades por tu interés en adoptar un gatito. Revisa tu correo electrónico para más detalles." });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Hubo un error al enviar el correo. Por favor, intenta nuevamente más tarde." });
    }
};
