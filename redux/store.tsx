import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import arrayImg from "./addNewProduct/reducerImages";
import arrayCategories from "./addNewProduct/reducerCategories";
import user from "./reducerUser";


const reducers = combineReducers({
	arrayImg,arrayCategories,user
});

const store = createStore(reducers, composeWithDevTools());

export default store;
