import { db } from "../config/database";
import { DataTypes } from "sequelize";
import Vendedor from "./vendedor";
import Image from "./image";

const Producto = db.define(
  "producto",
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
    detalles: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Producto.belongsTo(Vendedor);
Vendedor.hasMany(Producto);

Image.belongsTo(Producto);
Producto.hasMany(Image);

export default Producto;
