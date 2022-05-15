import User from "../models/User";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  return res.json(users);
};

const getUserById = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  return res.json(user);
};

export { getUsers, createUser, getUserById };
