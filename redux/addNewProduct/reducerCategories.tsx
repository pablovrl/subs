
interface initial {
	categories: string[]
}

interface act {
	type: string,
	payload: string[]
}
const intialState:initial = {
	categories: []
};

const state = (state = intialState, action: act) => {
	switch (action.type) {
	case "addCategories": {
		return {
			...state,
			categories: action.payload
		};
	}
	default: {
		return state;
	}
	}
};

export default state;