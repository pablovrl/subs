import imgType from "../../interfaces/fileInput";

const addArrayImg = (img: imgType[]) => {
	return {
		type: "addArrayImg",
		payload: img,
	};
};

const addFirstImg = (verificacion: boolean) => {
	return {
		type: "addFirstImg",
		payload: verificacion,
	};
};

const addSortImg = (img: imgType[]) => {
	return {
		type: "addSortImg",
		payload: img,
	};
};

//* categories 

const addCategories = (categories: string[]) => {
	return {
		type: "addCategories",
		payload: categories
	};
};

export { addArrayImg, addFirstImg, addSortImg,addCategories };
