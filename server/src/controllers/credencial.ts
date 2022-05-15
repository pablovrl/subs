import Credencial from "../models/credencial";
import { Request, Response } from "express";

const createCredencial = async (req: Request, res: Response) => {
  try {
    const credencial = await Credencial.create(req.body);
    return res.status(201).json(credencial);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { createCredencial };
