import { Request, Response } from "npm:express@4.18.2";
import personajeModel from "../db/personaje.ts"
const getPersonaje = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const personaje = await personajeModel.findOne({ _id:id }).exec();
    if (!personaje) {
      res.status(404).send("personaje no encontrado");
      return;
    }
    res.status(200).send({
      nombre:personaje.nombre,
      raza:personaje.raza,
      habilidades: personaje.habilidades,
      descripcion:personaje.descripcion,
      id: personaje._id.toString(),
     
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getPersonaje;
