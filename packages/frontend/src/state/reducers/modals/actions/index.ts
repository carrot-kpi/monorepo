import { createAction } from "@reduxjs/toolkit";

export const setModalOpen = createAction<{
    open: boolean;
}>("modals/setModalOpen");
