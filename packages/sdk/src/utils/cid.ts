import { CID } from "multiformats/cid";

export const isCID = (cid: string) => {
    try {
        const parsed = CID.parse(cid);
        return !!parsed;
    } catch {
        return false;
    }
};
