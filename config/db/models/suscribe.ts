import { db } from "../database";
import { DataTypes } from "sequelize";
import Suscriptor from "./suscriptor";
import Periodo from "./periodo";
import Producto from "./producto";

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
			defaultValue: DataTypes.NOW
		},
	},
	{ timestamps: false }
);

Suscriptor.hasMany(Suscribe);
Suscribe.belongsTo(Suscriptor);

Producto.hasMany(Suscribe);
Suscribe.belongsTo(Suscriptor);

Periodo.hasOne(Suscribe);
Suscribe.belongsTo(Periodo);

export default Suscribe;
