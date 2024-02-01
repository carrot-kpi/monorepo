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
} from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HostStateContext = createContext<any>(null);

export const useStore = createStoreHook(HostStateContext);
export const useDispatch = createDispatchHook(HostStateContext);
export const useSelector = createSelectorHook(HostStateContext);
export const createCarrotApi = buildCreateApi(
    coreModule(),
    reactHooksModule({ hooks: { useStore, useDispatch, useSelector } }),
);
