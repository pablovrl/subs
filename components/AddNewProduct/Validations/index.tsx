import * as yup from "yup";

const validationSchema = yup.object({
	name: yup
		.string()
		.min(3, "El nombre debe contener mínimo 3 letras.")
		.max(50, "El nombre debe contener menos de 15 letras.")
		.required("Por favor, ingresa un nombre.")
		.matches(/^[aA-zZÀ-ÿ\s]+$/, "El nombre solo puede contener letras y espacios."),

	description: yup
		.string()
		.min(10, "La descripción debe contener mínimo 10 letras.")
		.max(250, "La descripción debe contener menos de 250 letras.")
		.required("Por favor, ingrese una descripción.")
		.matches(/^[A-Za-z0-9À-ÿ /,\u00f1\u00d1.]+$/g, "La descripción solo puede contener letras, números, puntos y comas."),
	
	stock: yup
		.string()
		.max(7, "El stock no puede superar las 7 cifras.")
		.required("Por favor, ingrese el número de stock de su producto.")
		.matches(/^[0-9]\d*$/, "El stock solo puede contener números")
		.matches(/^[1-9]\d*$/, "El stock debe ser superior a 0"),

	oneMonth: yup 
		.string()
		.max(7, "El precio no puede superar las 7 cifras.")
		.required("Por favor, ingrese un valor.")
		.matches(/^[0-9]\d*$/, "El precio solo puede contener números")
		.matches(/^[1-9]\d*$/, "Introduzca un valor mayor a 1"),

	threeMonth: yup
		.string()
		.max(7, "El precio no puede superar las 7 cifras.")
		.required("Por favor, ingrese un valor.")
		.matches(/^[0-9]\d*$/, "El precio solo puede contener números")
		.matches(/^[1-9]\d*$/, "Introduzca un valor mayor a 1"),

	sixMonth: yup
		.string()
		.max(7, "El precio no puede superar las 7 cifras.")
		.required("Por favor, ingrese un valor.")
		.matches(/^[0-9]\d*$/, "El precio solo puede contener números")
		.matches(/^[1-9]\d*$/, "Introduzca un valor mayor a 1"),

	twelveMonth: yup
		.string()
		.max(7, "El precio no puede superar las 7 cifras.")
		.required("Por favor, ingrese un valor.")
		.matches(/^[0-9]\d*$/, "El precio solo puede contener números")
		.matches(/^[1-9]\d*$/, "Introduzca un valor mayor a 1"),
});

export default validationSchema;
