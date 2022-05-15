import express from "express";
import credencialRouter from "./credencial";
import vendedorRouter from "./vendedor";

const router = express.Router();
router.use("/credencial", credencialRouter);
router.use("/vendedor", vendedorRouter);

export default router;