import Image from "../models/image";
import { Request, Response } from "express";

interface ImageInterface {
  ruta: string;
  posicion: number;
}

const createImage = async (req: Request, res: Response) => {
  const productoId = req.body.productoId;
  const images: ImageInterface[] = req.body.imagenes;

  images.forEach((img) => {
    try {
      Image.create({
        ruta: img.ruta,
        posicion: img.posicion,
        productoId,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  });

  return res.status(201).json({ message: "Imagenes creadas" });
};

export { createImage };
