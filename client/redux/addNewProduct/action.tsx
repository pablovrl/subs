import imgType from "../../interfaces/fileInput";

const addImg = (img: imgType) => {
	return {
		type: "addPhoto",
		payload: img,
	};
};

const deleteImg = (img: imgType) => {
	return {
		type: "deleteImg",
		payload: img,
	};
};

export { deleteImg, addImg };
