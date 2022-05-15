import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
} from "../controllers/UserController";

const userRouter = express.Router();
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);

export default userRouter;
