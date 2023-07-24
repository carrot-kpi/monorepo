/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createContext, type ReactNode } from "react";
import {
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
    Provider,
    type ReactReduxContextValue,
} from "react-redux";
import { store } from "../";

export const HostStateContext = createContext<ReactReduxContextValue>(
    // I know... super ugly... but: https://redux-toolkit.js.org/rtk-query/usage/customizing-create-api#customizing-the-react-redux-hooks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    null as any,
);

export const useStore = createStoreHook(HostStateContext);
export const useDispatch = createDispatchHook(HostStateContext);
export const useSelector = createSelectorHook(HostStateContext);

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
