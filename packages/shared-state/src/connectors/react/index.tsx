/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createContext, ReactNode } from "react";
import {
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
    Provider,
    ReactReduxContextValue,
} from "react-redux";
import { store } from "../..";

export const SharedStateContext = createContext<ReactReduxContextValue>(
    // I know... super ugly... but: https://redux-toolkit.js.org/rtk-query/usage/customizing-create-api#customizing-the-react-redux-hooks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    null as any
);

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
