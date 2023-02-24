export type Theme = "dark" | "light" | "system";

export interface PreferencesState {
    theme: Theme;
    preferDecentralization: boolean;

    // templates/libs will know when the platform is being run locally
    // in order to develop templates, and will be able to act accordingly
    devMode: boolean;

    // the base URL from which to load federated KPI token templates.
    // It should be undefined in production and default to IPFS,
    // but it should be defined when dealing with local development, as
    // the templates would be hosted on dev servers such as Webpack.
    kpiTokenTemplateBaseURL?: string;

    // see above. It's important for the 2 base URLs to be separated
    // because when dealing with oracle development, we will be using
    // official KPI token templates hosted and loaded from IPFS. In a
    // production environment, these KPI token templates would load oracle
    // templates in their oracle pickers from IPFS too, unless this variable
    // has a value. This allows us to set custom URLs multiple levels down
    // nested module federation by having this library package shared and
    // having all modules read from here before loading templates
    oracleTemplateBaseURL?: string;
}
