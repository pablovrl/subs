import { db } from "../config/database";
import { DataTypes } from "sequelize";
import Producto from "./producto";
import Pertenece from "./pertenece";

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

Categoria.belongsToMany(Producto, { through: Pertenece });

export default Categoria;
