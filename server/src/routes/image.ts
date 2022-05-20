import express from "express";
import { createImage } from "../controllers/image";

const imageRouter = express.Router();
imageRouter.post("/", createImage);

export default imageRouter;
