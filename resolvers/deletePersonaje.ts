import { Request, Response } from "npm:express@4.18.2";
import PersonajeModel from "../db/personaje.ts"
const deletePersonaje = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const personaje = await PersonajeModel.findOneAndDelete({ _id:id }).exec();
    if (!personaje) {
      res.status(404).send("Personaje no encontrado");
      return;
    }
    res.status(200).send("Personaje borrado");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deletePersonaje;
