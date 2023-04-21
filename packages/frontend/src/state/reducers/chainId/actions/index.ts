import { ChainId } from "@carrot-kpi/sdk";
import { createAction } from "@reduxjs/toolkit";

export const setChainId = createAction<ChainId>("network/setChainId");
