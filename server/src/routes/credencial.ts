import express from "express";
import { createCredencial } from "../controllers/credencial";

const credencialRouter = express.Router();
credencialRouter.post("/", createCredencial);

export default credencialRouter;
