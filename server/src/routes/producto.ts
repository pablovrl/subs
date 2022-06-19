import express from "express";
import {
  createProducto,
  getProductos,
  getProductoById,
} from "../controllers/producto";

const productoRouter = express.Router();

productoRouter.get("/", getProductos);
productoRouter.get("/:id", getProductoById);
productoRouter.post("/", createProducto);

export default productoRouter;
