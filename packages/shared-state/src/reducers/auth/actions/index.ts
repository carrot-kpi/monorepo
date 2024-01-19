import { createAction } from "@reduxjs/toolkit";

export const setDataUploaderJWT = createAction<string>(
    "auth/setDataUploaderJWT",
);
