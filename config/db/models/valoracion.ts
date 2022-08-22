import { db } from "../database";
import { DataTypes } from "sequelize";
import Suscribe from "./suscribe";

const Valoracion = db.define(
	"valoracion",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		titulo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		comentario: {
			type: DataTypes.STRING(510),
			allowNull: false,
		},
		estrellas: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{ timestamps: false }
);

Valoracion.belongsTo(Suscribe);
Suscribe.hasMany(Valoracion);

export default Valoracion;
