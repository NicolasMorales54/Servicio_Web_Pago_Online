import mongoose from "mongoose";

const GatitoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  edad: {
    type: String,
    required: true,
  },
  raza: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  tamano: {
    type: String,
    required: true,
  },
  peso: {
    type: String,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  disponible: {
    type: Boolean,
    required: true,
    default: false,
  },
  vacunado: {
    type: Boolean,
    required: true,
  },
  precio: {
    type: String,
    required: true,
  },
  esterilizado: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
    timestamps: true
});

export default mongoose.model("gatito", GatitoSchema);