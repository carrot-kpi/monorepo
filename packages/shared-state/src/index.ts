import { combineReducers, configureStore } from "@reduxjs/toolkit";
import debounce from "lodash.debounce";
import { preferencesReducer } from "./reducers/preferences/reducer";
import { loadState, storeState } from "./utils";
import { authReducer } from "./reducers/auth/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    preferences: preferencesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
});

store.subscribe(() => {
    const debounced = debounce(() => {
        storeState(store.getState());
    }, 500);
    debounced();
});

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;

export * from "./reducers";
export * from "./connectors";
