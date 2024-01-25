import { DATA_MANAGER_JWT_ISSUER } from "../constants";
import { useSelector, type State } from "@carrot-kpi/shared-state";
import { jwtDecode } from "jwt-decode";

export function useIsDataManagerAuthenticated() {
    return useSelector<State, boolean>((state) => {
        const jwt = state.auth.dataManagerJWT;
        if (!jwt) return false;
        const decoded = jwtDecode(jwt, { header: false });
        return (
            !!decoded &&
            decoded.iss === DATA_MANAGER_JWT_ISSUER &&
            !!decoded.exp &&
            decoded.exp > Math.floor(Date.now() / 1000)
        );
    });
}
