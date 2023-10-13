import {
    buildCreateApi,
    coreModule,
    reactHooksModule,
} from "@reduxjs/toolkit/query/react";
import { createContext } from "react";
import {
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
    type ReactReduxContextValue,
} from "react-redux";

export const HostStateContext = createContext<ReactReduxContextValue>(
    // I know... super ugly... but: https://redux-toolkit.js.org/rtk-query/usage/customizing-create-api#customizing-the-react-redux-hooks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    null as any,
);

export const useStore = createStoreHook(HostStateContext);
export const useDispatch = createDispatchHook(HostStateContext);
export const useSelector = createSelectorHook(HostStateContext);
export const createCarrotApi = buildCreateApi(
    coreModule(),
    reactHooksModule({ useStore, useDispatch, useSelector }),
);
