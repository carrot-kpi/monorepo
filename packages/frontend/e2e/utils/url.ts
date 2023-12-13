import dotenv from "dotenv";
/**
 * @exports class which handles environments
 */

dotenv.config();

const ENV: string = process.env.ENV || "stage";

export class Urls {
    static getBaseUrl = () => {
        switch (ENV) {
            case "stage":
                return this.stage;
            case "local":
                return this.local;
            default:
                return "";
        }
    };
    // Environment URLs
    static stage =
        "https://app.staging.carrot.community/#/?chain=polygon+mumbai";
    static local = "http://localhost:3000";
}
