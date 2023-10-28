import { Request, Response } from "npm:express@4.18.2";
import PersonajeModel from "../db/personaje.ts"
const updatePersonaje = async (req: Request, res: Response) => {

  try {
    const { id } = req.params;
    const { nombre,raza,habilidades,descripcion } = req.body;
    if (!id ) {
      res.status(400).send("El id no coincide con ningun personaje");
      return;
    }

    const updatePersonaje = await PersonajeModel.findOneAndUpdate(
      { _id:id },
      { nombre, raza, habilidades, descripcion },
      { new: true }
    ).exec();

    if (!updatePersonaje) {
      res.status(500).send("Personaje no encontrado");
      return;
    }

    res.status(200).send({
      nombre: updatePersonaje.nombre,
      raza: updatePersonaje.raza,
      habilidades: updatePersonaje.habilidades,
      descripcion:updatePersonaje.descripcion,
      id: updatePersonaje._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};
export default updatePersonaje;