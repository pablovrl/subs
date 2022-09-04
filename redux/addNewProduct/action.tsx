import imgType from "../../interfaces/fileInput";

interface user {
	email: string,
	typeUser: string;
}


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


//* user

const addUser = (user: user) => {
	return {
		type: "addUser",
		addEmail: user.email,
		addTypeUser: user.typeUser
	};
};

export { addArrayImg, addFirstImg, addSortImg, addCategories, addUser};
