import Producto from "../models/producto";
import { Request, Response } from "express";
import Vendedor from "../models/vendedor";
import Pertenece from "../models/pertenece";
import Image from "../models/image";
import Categoria from "../models/categoria";
import { Op } from "sequelize";

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
  const categoryId = req.query.categoria;
  const search = req.query.nombre;

  if (categoryId) {
    const productos = await Producto.findAll({
      include: [
        { model: Categoria, where: { id: categoryId } },
        Vendedor,
        Image,
      ],
    });
    return res.json(productos);
  }

  if (search) {
    const productsByName = await Producto.findAll({
      include: [{ model: Categoria }, Vendedor, Image],
      where: {
        nombre: {
          [Op.substring]: `%${search}%`,
        },
      },
    });

    const productsByCategory = await Producto.findAll({
      include: [
        {
          model: Categoria,
          where: { nombre: { [Op.substring]: `%${search}%` } },
        },
        Vendedor,
        Image,
      ],
    });

    const productos = [...new Set([...productsByName, ...productsByCategory])];

    return res.json(productos);
  }

  const productos = await Producto.findAll({
    include: [Categoria, Vendedor, Image],
  });
  return res.json(productos);
};

export { createProducto, getProductos };
