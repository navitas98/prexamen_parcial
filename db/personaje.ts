import mongoose from "npm:mongoose@7.6.3";
import { Personajes } from "../types.ts";

const Schema = mongoose.Schema;
const razasPermitidas = ["Hobbits", "Humanos", "Elfos", "Enanos", "Ents"];
const PersonajesSchema = new Schema(
  {
    nombre: { type: String, required: true, unique:false },
    raza: {
      type: String,
      required: true,
      unique: false,
      enum: razasPermitidas // Utiliza la enumeración de razas permitidas
    },
    descripcion: { type: String, required: true, unique:false },
    habilidades: { type: String, required: true, unique:false },
  },
  { timestamps: true }
);

export type PersonajeModelType = mongoose.Document & Omit<Personajes, "id">;

export default mongoose.model<PersonajeModelType>("Personaje", PersonajesSchema);
