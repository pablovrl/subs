import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import arrayImg from "./addNewProduct/reducer";

const reducers = combineReducers({
	arrayImg,
});

const store = createStore(reducers, composeWithDevTools());

export default store;
