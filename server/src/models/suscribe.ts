import { db } from "../config/database";
import { DataTypes } from "sequelize";
import Suscriptor from "./suscriptor";
import Periodo from "./periodo";

const Suscribe = db.define(
  "suscribe",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Suscriptor.hasMany(Suscribe);
Suscribe.belongsTo(Suscriptor);

Periodo.hasOne(Suscribe);
Suscribe.belongsTo(Periodo);

export default Suscribe;
