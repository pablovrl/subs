import { db } from "../config/database";
import { DataTypes } from "sequelize";

const Image = db.define(
  "image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Image;
