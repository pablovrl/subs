import Category from "./Category";

interface Product {
	id: number;
	nombre: string;
	detalles: string;
	stock: number;
	vendedorId: number;
	categoria: Category[];
	vendedor: {
		id: number;
		nombreCompleto: string;
		nombreTienda: string;
		imagenTienda: string;
	};
	images: {
		id: number;
		ruta: string;
		posicion: number;
	}[];
	periodos: {
		id: number;
		duracion: string;
		precio: number;
	}[];
}

export default Product;