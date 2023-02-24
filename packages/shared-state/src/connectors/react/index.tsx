/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createContext, ReactNode } from "react";
import {
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
    Provider,
} from "react-redux";
import { store } from "../..";

export const SharedStateContext = createContext(null);

// @ts-ignore
export const useStore = createStoreHook(SharedStateContext);
// @ts-ignore
export const useDispatch = createDispatchHook(SharedStateContext);
// @ts-ignore
export const useSelector = createSelectorHook(SharedStateContext);

interface ReactSharedStateProvider {
    children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ReactSharedStateProvider = ({
    children,
}: ReactSharedStateProvider) => {
    return (
        // @ts-ignore
        <Provider context={SharedStateContext} store={store}>
            {children}
        </Provider>
    );
};
