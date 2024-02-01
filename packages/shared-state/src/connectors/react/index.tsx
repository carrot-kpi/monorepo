/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createContext, type ReactNode } from "react";
import {
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
    Provider,
} from "react-redux";
import { store } from "../..";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SharedStateContext = createContext<any>(null);

export const useStore = createStoreHook(SharedStateContext);
export const useDispatch = createDispatchHook(SharedStateContext);
export const useSelector = createSelectorHook(SharedStateContext);

interface ReactSharedStateProvider {
    children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ReactSharedStateProvider = ({
    children,
}: ReactSharedStateProvider) => {
    return (
        <Provider context={SharedStateContext} store={store}>
            {children}
        </Provider>
    );
};
