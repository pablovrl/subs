import Vendedor from "../models/vendedor";
import { Request, Response } from "express";

const createVendedor = async (req: Request, res: Response) => {
  try {
    const vendedor = await Vendedor.create(req.body);
    return res.status(201).json(vendedor);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { createVendedor };
