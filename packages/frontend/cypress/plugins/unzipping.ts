import decompress from "decompress";

export const unzip = ({ path, file }) =>
    decompress(path + file, path + "unzip/" + file.replace(".zip", ""));