import * as yup from "yup";

const validationSchema = yup.object({
	name: yup
		.string()
		.min(3, "El nombre tiene que contener minimo 3 letras")
		.max(15, "El nombre tiene que contener menos de 15 letras")
		.required("Por favor ingresa un nombre")
		.matches(/^[aA-zZ\s]+$/, "El nombre solo puede contener letras y espacios"),

	description: yup
		.string()
		.min(10, "La descripción tiene que contener minimo 10 letras")
		.max(60, "La descripción tiene que contener menos de 60 letras")
		.required("Por favor ingrese una descripción")
		.matches(/^[aA-zZ\s]+$/, "La descripcion solo puede contener letras"),

	stock: yup
		.string()
		.required("Por favor ingrese el número de stock de su producto")
		.matches(/^([0-9])*$/, "El precio solo puede contener números"),

	oneMonth: yup
		.string()
		.required("Por favor ingrese un valor")
		.matches(/^([0-9])*$/, "El precio solo puede contener números"),
	threeMonth: yup
		.string()
		.required("Por favor ingrese un valor")
		.matches(/^([0-9])*$/, "El precio solo puede contener números"),
	sixMonth: yup
		.string()
		.required("Por favor ingrese un valor")
		.matches(/^([0-9])*$/, "El precio solo puede contener números"),
	twelveMonth: yup
		.string()
		.required("Por favor ingrese un valor")
		.matches(/^([0-9])*$/, "El precio solo puede contener números"),
});

export default validationSchema;
