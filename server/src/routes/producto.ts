import express from "express";
import { createProducto, getProductos } from "../controllers/producto";

const productoRouter = express.Router();
productoRouter.get("/", getProductos);
productoRouter.post("/", createProducto);

export default productoRouter;
