import { createReducer } from "@reduxjs/toolkit";
import {
    setDevMode,
    setIPFSGatewayURL,
    setKPITokenTemplateBaseURL,
    setOracleTemplateBaseURL,
    setPreferDecentralization,
    setStagingMode,
    setTheme,
} from "../actions";
import { PreferencesState } from "../types";

const initialState: PreferencesState = {
    // TODO: use system as a default once the dark theme is available
    theme: "light",
    preferDecentralization: false,
    ipfsGatewayURL: "https://gateway.carrot-kpi.dev",
    devMode: false,
    stagingMode: false,
    kpiTokenTemplateBaseURL: undefined,
    oracleTemplateBaseURL: undefined,
};

export const preferencesReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(setTheme, (state, action) => {
            state.theme = action.payload;
        })
        .addCase(setPreferDecentralization, (state, action) => {
            state.preferDecentralization = action.payload;
        })
        .addCase(setIPFSGatewayURL, (state, action) => {
            state.ipfsGatewayURL = action.payload;
        })
        .addCase(setDevMode, (state, action) => {
            state.devMode = action.payload;
        })
        .addCase(setStagingMode, (state, action) => {
            state.stagingMode = action.payload;
        })
        .addCase(setKPITokenTemplateBaseURL, (state, action) => {
            state.kpiTokenTemplateBaseURL = action.payload;
        })
        .addCase(setOracleTemplateBaseURL, (state, action) => {
            state.oracleTemplateBaseURL = action.payload;
        })
);
