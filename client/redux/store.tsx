import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import arrayImg from "./addNewProduct/reducerImages";
import arrayCategories from "./addNewProduct/reducerCategories";


const reducers = combineReducers({
	arrayImg,arrayCategories
});

const store = createStore(reducers, composeWithDevTools());

export default store;
