

interface initial {
	email: string,
	typeUser: string
}

interface act {
  type: string,
  addEmail: string,
  addTypeUser: string
}

const intialState:initial = {
    email: "",
    typeUser: ""
};

const state = (state = intialState, action: act) => {
	switch (action.type) {
	case "addUser": {
		return {
			...state,
			email: action.addEmail,
      typeUser: action.addTypeUser
		};
	}
	default: {
		return state;
	}
	}
};

export default state;