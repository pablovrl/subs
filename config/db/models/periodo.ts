import { db } from "../database";
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

Producto.hasMany(Periodo);
Periodo.belongsTo(Producto);

export default Periodo;
