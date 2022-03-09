import {applyMiddleware, createStore} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {logger} from "redux-logger/src";
import thunk from 'redux-thunk'
import rootReducer from "./rootReducer";

const persistConfig = {
    key: "examApp",
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));

const persistor = persistStore(store);

export {persistor}
export default store;