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

export { addArrayImg, addFirstImg, addSortImg };
