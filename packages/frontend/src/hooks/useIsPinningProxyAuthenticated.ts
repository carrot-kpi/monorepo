import { PINNING_PROXY_JWT_ISSUER } from "../constants";
import { useSelector, type State } from "@carrot-kpi/shared-state";
import decodeJWT, { type JwtPayload } from "jwt-decode";

export function useIsPinningProxyAuthenticated() {
    return useSelector<State, boolean>((state) => {
        const jwt = state.auth.pinningProxyJWT;
        if (!jwt) return false;
        const decoded = decodeJWT<JwtPayload>(jwt, { header: false });
        return (
            !!decoded &&
            decoded.iss === PINNING_PROXY_JWT_ISSUER &&
            !!decoded.exp &&
            decoded.exp > Math.floor(Date.now() / 1000)
        );
    });
}
