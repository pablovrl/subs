import { db } from "../config/database";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

const Image = db.define(
  "image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ruta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posicion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Image;
