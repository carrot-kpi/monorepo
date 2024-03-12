import { urls } from "./data";
/**
 @description run test on DEV/STAGE env 
 @exports class that handles environments
 */

let env = Cypress.env("ENV");
export class Utility {
    getBaseUrl() {
        switch (env) {
            case "stage":
                env = urls.stage;
                break;
            case "dev":
                env = urls.dev;
                break;
            case "local":
                env = urls.local;
                break;
        }
        return env;
    }
}
export const utility = new Utility();
