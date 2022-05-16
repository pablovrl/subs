import express from "express";
import { createCategoria, getCategorias} from "../controllers/categoria";

const categoriaRouter = express.Router();
categoriaRouter.post("/", createCategoria);
categoriaRouter.get("/", getCategorias);

export default categoriaRouter;