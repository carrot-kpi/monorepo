import { unzip } from "./unzipping";

module.exports = (on, config) => {
    on("task", {
        unzipping: unzip,
    });
};
