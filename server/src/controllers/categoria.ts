import Categoria from "../models/categoria";
import { Request, Response } from "express";

const getCategorias = async (req: Request, res: Response) => {
  const categorias = await Categoria.findAll();
  return res.status(200).json(categorias);
};

const createCategoria = async (req: Request, res: Response) => {
  try {
    const categoria = await Categoria.create(req.body);
    return res.status(201).json(categoria);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { createCategoria, getCategorias };
