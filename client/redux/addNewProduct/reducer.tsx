import imgType from "../../interfaces/fileInput";

const intialState = {
	images: [],
};

const state = (state = intialState, action: any, payload: any) => {
	switch (action.type) {
	case "addImg": {
		return {
			images: payload
		};
	}
	case "deleteImg": {
		return {
			images: payload
		};
	}

	default: {
		return state;
	}
	}
};

export default state;