import { createAction } from "@reduxjs/toolkit";

export const setPinningProxyJWT = createAction<string>(
    "auth/setPinningProxyJWT"
);
