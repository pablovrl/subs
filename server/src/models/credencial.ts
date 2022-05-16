import { db } from "../config/database";
import { DataTypes } from "sequelize";
import Vendedor from "./vendedor";

const Credencial = db.define(
  "credencial",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoUsuario: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["cliente", "vendedor"]],
      },
    },
  },
  { timestamps: false }
);

Credencial.hasMany(Vendedor);

export default Credencial;
