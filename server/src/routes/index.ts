import express from "express";
import credencialRouter from "./credencial";
import vendedorRouter from "./vendedor";
import productoRouter from "./producto";
import categoriaRouter from "./categoria";
import imageRouter from "./image";

const router = express.Router();
router.use("/credencial", credencialRouter);
router.use("/vendedor", vendedorRouter);
router.use("/producto", productoRouter);
router.use("/categoria", categoriaRouter);
router.use("/image", imageRouter);

export default router;
