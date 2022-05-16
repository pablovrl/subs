import { db } from "../config/database";
import { DataTypes } from "sequelize";

const Vendedor = db.define(
  "vendedor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombreTienda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagenTienda: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  { timestamps: false }
);

export default Vendedor;
