import React from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import debounce from "lodash.debounce";
import { draftsReducer } from "./reducers/drafts/reducer";
import { transactionsReducer } from "./reducers/transactions/reducer";
import { modalsReducer } from "./reducers/modals/reducer";
import { loadState, storeState } from "../utils/state";
import { applicationApi, staticApi } from "./api";
import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { HostStateContext } from "./hooks";

const rootReducer = combineReducers({
    drafts: draftsReducer,
    transactions: transactionsReducer,
    modals: modalsReducer,
    [staticApi.reducerPath]: staticApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: [
                    staticApi.reducerPath,
                    applicationApi.reducerPath,
                ],
            },
        })
            .concat(staticApi.middleware)
            .concat(applicationApi.middleware),
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

interface HostStateProviderProps {
    children: ReactNode;
}

export const HostStateProvider = ({ children }: HostStateProviderProps) => {
    return (
        <Provider store={store} context={HostStateContext}>
            {children}
        </Provider>
    );
};
