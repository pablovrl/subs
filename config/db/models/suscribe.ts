import { db } from "../database";
import {
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from "sequelize";
import Suscriptor from "./suscriptor";
import Periodo from "./periodo";
import Producto from "./producto";

interface SuscribeModel
	extends Model<
		InferAttributes<SuscribeModel>,
		InferCreationAttributes<SuscribeModel>
	> {
	id: number;
	fechaInicio: string;
	activa: boolean;
	suscriptorId?: number;
	productoId?: number;

}

const Suscribe = db.define<SuscribeModel>(
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
			defaultValue: DataTypes.NOW,
		},
		activa: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
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
