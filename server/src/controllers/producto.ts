import Producto from "../models/producto";
import { Request, Response } from "express";
import Vendedor from "../models/vendedor";
import Pertenece from "../models/pertenece";
import Image from "../models/image";

const createProducto = async (req: Request, res: Response) => {
  const producto = {
    nombre: req.body.nombre,
    detalles: req.body.detalles,
    stock: req.body.stock,
  };

  const imagenes: string[] = req.body.imagenes;

  try {
    const newProducto: any = await Producto.create({
      ...producto,
      vendedorId: 1,
    });
    await Pertenece.create({
      categoriumId: req.body.categoriaId,
      productoId: newProducto.id,
    });

    imagenes.forEach((img, i) => {
      Image.create({
        ruta: img,
        posicion: i + 1,
        productoId: newProducto.id,
      });
    });
    return res.status(201).json(newProducto);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getProductos = async (req: Request, res: Response) => {
  const productos = await Producto.findAll({ include: [Vendedor, Image] });
  return res.json(productos);
};

export { createProducto, getProductos };
