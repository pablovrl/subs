import imgType from "../../interfaces/fileInput";

interface initial {
	images: imgType[]
}

interface act {
	type: string,
	payload: imgType
}
const intialState:initial = {
	images: [],
};

const state = (state = intialState, action: act) => {
	switch (action.type) {
	case "addImg": {
		return {
			images: action.payload
		};
	}
	case "deleteImg": {
		return {
			images: action.payload
		};
	}
	default: {
		return state;
	}
	}
};

export default state;