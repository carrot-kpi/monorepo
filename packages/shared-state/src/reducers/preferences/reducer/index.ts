import { createReducer } from "@reduxjs/toolkit";
import {
    setEnvironment,
    setIPFSGatewayURL,
    setKPITokenTemplateBaseURL,
    setOracleTemplateBaseURL,
    setPreferDecentralization,
    setTemplatePreviewMode,
    setTheme,
} from "../actions";
import { Environment, type PreferencesState } from "../types";

const initialState: PreferencesState = {
    // TODO: use system as a default once the dark theme is available
    theme: "light",
    preferDecentralization: false,
    ipfsGatewayURL: "https://gateway.api.carrot.community",
    environment: Environment.Development,
    templatePreviewMode: false,
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
        .addCase(setEnvironment, (state, action) => {
            state.environment = action.payload;
        })
        .addCase(setTemplatePreviewMode, (state, action) => {
            state.templatePreviewMode = action.payload;
        })
        .addCase(setKPITokenTemplateBaseURL, (state, action) => {
            state.kpiTokenTemplateBaseURL = action.payload;
        })
        .addCase(setOracleTemplateBaseURL, (state, action) => {
            state.oracleTemplateBaseURL = action.payload;
        }),
);
