import { createAction } from "@reduxjs/toolkit";
import type { PreferencesState } from "../types";

export const setTheme = createAction<PreferencesState["theme"]>(
    "preferences/setTheme",
);

export const setPreferDecentralization = createAction<
    PreferencesState["preferDecentralization"]
>("preferences/setPreferDecentralization");

export const setIPFSGatewayURL = createAction<
    PreferencesState["ipfsGatewayURL"]
>("preferences/setIPFSGatewayURL");

export const setEnvironment = createAction<PreferencesState["environment"]>(
    "preferences/setEnvironment",
);

export const setTemplatePreviewMode = createAction<
    PreferencesState["templatePreviewMode"]
>("preferences/setTemplatePreviewMode");

export const setKPITokenTemplateBaseURL = createAction<
    PreferencesState["kpiTokenTemplateBaseURL"]
>("preferences/setKPITokenTemplateBaseURL");

export const setOracleTemplateBaseURL = createAction<
    PreferencesState["oracleTemplateBaseURL"]
>("preferences/setOracleTemplateBaseURL");
