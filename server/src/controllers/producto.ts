import Producto from "../models/producto";
import { Request, Response } from "express";
import Vendedor from "../models/vendedor";

const createProducto = async (req: Request, res: Response) => {
  try {
    const producto = await Producto.create({ ...req.body, vendedorId: 1 });
    return res.status(201).json(producto);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getProductos = async (req: Request, res: Response) => {
  const productos = await Producto.findAll({ include: Vendedor });
  return res.json(productos);
};

export { createProducto, getProductos };
