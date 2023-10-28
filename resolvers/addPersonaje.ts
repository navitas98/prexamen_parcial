import { Request, Response } from "npm:express@4.18.2";

import PersonajeModel from "../db/personaje.ts"
const nuevo_personaje = async (req: Request, res: Response) => {
  try {
    const { nombre, raza, descripcion, habilidades } = req.body;
    if (!nombre || !raza|| !descripcion||!habilidades ){
      res.status(400).send("Los campos nombre, raza, descripcion y habilidades son campos requeridos");
      return;
    }

    const alreadyExists = await PersonajeModel.findOne({ nombre, raza, descripcion,habilidades }).exec();
    if (alreadyExists) {
      res.status(400).send("El personaje ya existe");
      return;
    }

    const newPersonaje = new PersonajeModel({ nombre, raza, descripcion,habilidades });
    await newPersonaje.save();

    res.status(200).send({
      nombre: newPersonaje.nombre,
      raza: newPersonaje.raza,
      habilidades: newPersonaje.habilidades,
      descripcion:newPersonaje.descripcion,
      id: newPersonaje._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default nuevo_personaje;
