import { db } from "../config/database";
import Producto from "./producto";
import Categoria from "./categoria";

const Pertenece = db.define("pertenece", {}, { timestamps: false });

Categoria.belongsToMany(Producto, { through: Pertenece });

export default Pertenece;
