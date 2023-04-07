import { createAction } from "@reduxjs/toolkit";

export const setModalIsOpen = createAction<{
    isOpen: boolean;
}>("modals/setModalIsOpen");
