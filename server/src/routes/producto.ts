import express from "express";
import {
  createProducto,
  getProductos,
  getProductoById,
  deleteProduct,
} from "../controllers/producto";

const productoRouter = express.Router();

productoRouter.get("/", getProductos);
productoRouter.get("/:id", getProductoById);
productoRouter.post("/", createProducto);
productoRouter.delete("/:id", deleteProduct);

export default productoRouter;
