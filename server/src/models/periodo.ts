import { db } from "../config/database";
import { DataTypes } from "sequelize";
import Producto from "./producto";

const Periodo = db.define(
  "periodo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Periodo;
