import { Request, Response } from "npm:express@4.18.2";
import PersonajeModel from "../db/personaje.ts";

const get_personajes = async (req: Request, res: Response) => {
  try {
    const personajes = await PersonajeModel.find().exec();

    if (!personajes || personajes.length === 0) {
      res.status(404).send("Personajes no encontrados");
      return;
    }

    const personajesJSON = personajes.map((personaje) => ({
      nombre: personaje.nombre,
      raza: personaje.raza,
      habilidades: personaje.habilidades,
      descripcion: personaje.descripcion,
      id:personaje._id.toString()
    }));

    res.status(200).json(personajesJSON);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default get_personajes;
