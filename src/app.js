import express from "express";
import morgan from "morgan";
import gatoRoutes from "./routes/gato.routes.js";
import cors from "cors";
import sendEmails from "./sendEmail.js";
import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import nodemailer from "nodemailer";
import Gato from "./model/gatito.model.js";
import axios from "axios"; // Importa axios para manejar peticiones HTTP
import stream from "stream"; // Importa stream para manejar streams de datos
import { promisify } from "util";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/gatos", gatoRoutes);

// Crear __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/registro", async (req, res) => {
  const { correo, nombre, apellido, carts } = req.body;
  console.log("Recibiendo datos:", req.body);

  try {
    // Crear el PDF
    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, "gatos.pdf");
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    doc.fontSize(25).text("Gatos en tu Lista de Interés", { align: "center" });
    doc.moveDown(2);

    let yPosition = doc.y + 30; // Posición inicial de Y después del encabezado

    for (const cartId of carts) {
      const gato = await Gato.findById(cartId.productId);

      if (gato) {
        // Descargar la imagen si existe
        let imagePath = null;
        if (gato.imagen) {
          const response = await axios({
            url: gato.imagen,
            method: "GET",
            responseType: "stream",
          });

          const finished = promisify(stream.finished);

          imagePath = path.join(__dirname, `${gato.nombre}.jpg`);
          const writer = fs.createWriteStream(imagePath);
          response.data.pipe(writer);

          await finished(writer);
        }

        // Escribir los datos en la primera columna
        doc.fontSize(14).text(`Nombre: ${gato.nombre}`, 100, yPosition);
        doc.text(`Raza: ${gato.raza}`, 100, yPosition + 15);
        doc.text(`Edad: ${gato.edad}`, 100, yPosition + 30);
        doc.text(`Género: ${gato.sexo}`, 100, yPosition + 45);

        // Colocar la imagen en la segunda columna
        if (imagePath) {
          doc.image(imagePath, 300, yPosition, {
            fit: [150, 150],
          });

          fs.unlinkSync(imagePath); // Eliminar la imagen temporal después de usarla
        }

        yPosition += 200; // Ajustar la posición Y para la próxima fila
      } else {
        doc
          .fontSize(14)
          .text(`Gato con ID ${cartId} no encontrado.`, 100, yPosition);
        yPosition += 20;
      }
    }

    doc
      .fontSize(14)
      .text("Gracias por tu interés en adoptar un gatito!", 100, yPosition);

    doc.end();

    writeStream.on("finish", async () => {
      // Configurar nodemailer para enviar
      // Configurar nod

      // Configurar nodemailer para enviar el correo
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "microservicios485@gmail.com",
          pass: "f y g u q d e k z j n c t b j l",
        },
      });

      // Configurar el contenido del correo
      let mailOptions = {
        from: "tuemail@gmail.com",
        to: correo,
        subject: "¡Gracias por tu interés en adoptar un gatito!",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
        <h1>¡Felicidades, ${nombre} ${apellido}!</h1>
        <p>Querido amante de los animales,</p>
        <p>¡Gracias por tu interés en darle una oportunidad de amor a un gatito! Nos alegra saber que estás dispuesto a ofrecerle un hogar lleno de cariño y atención a uno de nuestros adorables felinos.</p>  
        <p>Tu solicitud ha sido recibida y será revisada cuidadosamente. Nos pondremos en contacto contigo pronto para guiarte a través del siguiente paso en el proceso de adopción. Mientras tanto, si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros.</p>
        <p>Estamos emocionados de trabajar contigo para encontrar el compañero perfecto para ti y tu familia.</p>
        <p>¡Gracias de nuevo por tu compasión y dedicación!</p>
        <p>Atentamente,<br>El equipo de Adopción de Gatitos</p>
        </div>
          `,
        attachments: [
          {
            filename: "gatos.pdf",
            path: pdfPath,
          },
        ],
      };

      // Enviar el correo
      await transporter.sendMail(mailOptions);

      // Eliminar el archivo PDF después de enviar el correo
      fs.unlinkSync(pdfPath);

      return res.status(200).json({
        successMessage:
          "Felicidades por tu interés en adoptar un gatito. Revisa tu correo electrónico para más detalles.",
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message:
        "Hubo un error al enviar el correo. Por favor, intenta nuevamente más tarde.",
    });
  }
});
export default app; // Exporta 'app'
