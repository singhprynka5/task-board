import { createStore } from "redux";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const config = {
    key: "task-board-tk",
    storage
};

const persistedReducer = persistReducer(config, rootReducer);

export const configureStore = (initialState) => {
    let store = createStore(persistedReducer, initialState);
    let persistor = persistStore(store);
    return { store, persistor };
}