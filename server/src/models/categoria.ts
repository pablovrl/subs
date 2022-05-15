import { db } from "../config/database";
import { DataTypes } from "sequelize";

const Categoria = db.define(
  "categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Categoria;
