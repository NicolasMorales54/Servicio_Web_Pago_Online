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
