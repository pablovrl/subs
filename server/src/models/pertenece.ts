import { db } from "../config/database";
const Pertenece = db.define("pertenece", {}, { timestamps: false });


export default Pertenece;
