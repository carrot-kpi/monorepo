import { combineReducers, configureStore } from "@reduxjs/toolkit";
import debounce from "lodash.debounce";
import { transactionsReducer } from "./reducers/transactions/reducer";
import { loadState, storeState } from "../utils/state";

const rootReducer = combineReducers({
    transactions: transactionsReducer,
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

export type HostState = ReturnType<typeof rootReducer>;
export type HostDispatch = typeof store.dispatch;
