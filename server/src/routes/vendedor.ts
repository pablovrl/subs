import express from "express";
import { createVendedor } from "../controllers/vendedor";

const vendedorRouter = express.Router();
vendedorRouter.get("/", createVendedor);

export default vendedorRouter;
