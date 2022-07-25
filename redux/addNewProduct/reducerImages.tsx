import imgType from "../../interfaces/fileInput";

interface initial {
	images: imgType[]
	sortImg: imgType[],
	firstImg: boolean
}

interface act {
	type: string,
	payload: imgType[]
}
const intialState:initial = {
	images: [],
	sortImg: [],
	firstImg: false,
};

const state = (state = intialState, action: act) => {
	switch (action.type) {
	case "addArrayImg": {
		return {
			...state,
			images: action.payload
		};
	}
	case "addFirstImg": {
		return {
			...state,
			firstImg: action.payload
		};
	}
	case "addSortImg": {
		return {
			...state,
			sortImg: action.payload
		};
	}
	default: {
		return state;
	}
	}
};

export default state;