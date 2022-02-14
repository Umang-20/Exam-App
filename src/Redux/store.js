import { applyMiddleware, createStore } from "redux";
import {logger} from "redux-logger/src";
import thunk from 'redux-thunk'
import rootReducer from "./rootReducer";


const Store = createStore(rootReducer,applyMiddleware(thunk,logger));

export default Store;