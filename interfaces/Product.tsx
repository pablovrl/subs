interface Category {
	productoId: number;
	categoriaId: number;
	categoria: {
		id: number;
		nombre: string;
	};
}

interface Product {
	id: number;
	nombre: string;
	detalles: string;
	stock: number;
	vendedorId: number;
	categorias: Category[];
	activo: boolean;
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
	periodo: {
		id: number;
		duracion: string;
		precio: number;
	}[];
}

export default Product;
