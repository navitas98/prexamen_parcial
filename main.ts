import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";



import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { Request, Response } from "npm:express@4.18.2";
import nuevo_personaje from "./resolvers/addPersonaje.ts";
import get_personaje from "./resolvers/getPersonaje.ts";
import deletePersonaje from "./resolvers/deletePersonaje.ts";
import updatePersonaje from "./resolvers/updatePersonaje.ts";
import get_personajes from "./resolvers/getPersonajes.ts";
const env = await load();
const MONGO_URL = env.MONGO_URL;
if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}
await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/", (req:Request, res:Response) => {
    res.send("conectado");
  })
  .post("/api/tierramedia/personajes",nuevo_personaje)
  .get("/api/tierramedia/personajes/:id",get_personaje)
  .get("/api/tierramedia/personajes",get_personajes)
  .delete("/api/tierramedia/personajes/:id", deletePersonaje)
  .put("/api/tierramedia/personajes/:id",updatePersonaje)
 

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
