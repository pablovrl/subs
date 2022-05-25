import * as yup from "yup";

const validationSchema = yup.object({
	name: yup
		.string()
		.min(3, "El nombre debe contener mínimo 3 letras.")
		.max(50, "El nombre debe contener menos de 15 letras.")
		.required("Por favor, ingresa un nombre.")
		.matches(/^[aA-zZ\s]+$/, "El nombre solo puede contener letras y espacios."),

	description: yup
		.string()
		.min(10, "La descripción debe contener mínimo 10 letras.")
		.max(200, "La descripción debe contener menos de 60 letras.")
		.required("Por favor, ingrese una descripción.")
		.matches(/^[aA-zZ\s]+$/, "La descripción solo puede contener letras."),
	
	stock: yup
		.string()
		.min(2, "El stock debe ser superior a 10.")
		.max(7, "El sotck no puede superar las 7 cifras.")
		.required("Por favor, ingrese el número de stock de su producto.")
		.matches(/^([0-9])*$/, "El precio solo puede contener números."),

	oneMonth: yup
		.string()
		.min(4, "El precio debe ser superior a $1000.")
		.max(7, "El precio no puede superar las 7 cifras.")
		.required("Por favor, ingrese un valor.")
		.matches(/^([0-9])*$/, "El precio solo puede contener números."),
	threeMonth: yup
		.string()
		.min(4, "El precio debe ser superior a $1000.")
		.max(7, "El precio no puede superar las 7 cifras.")
		.required("Por favor, ingrese un valor.")
		.matches(/^([0-9])*$/, "El precio solo puede contener números."),
	sixMonth: yup
		.string()
		.min(4, "El precio debe ser superior a $1000.")
		.max(7, "El precio no puede superar las 7 cifras.")
		.required("Por favor, ingrese un valor.")
		.matches(/^([0-9])*$/, "El precio solo puede contener números."),
	twelveMonth: yup
		.string()
		.min(4, "El precio debe ser superior a $1000.")
		.max(7, "El precio no puede superar las 7 cifras.")
		.required("Por favor, ingrese un valor.")
		.matches(/^([0-9])*$/, "El precio solo puede contener números."),
});

export default validationSchema;
