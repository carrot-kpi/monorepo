import { useContext } from "react";

import { Fetcher } from "@carrot-kpi/sdk";
import { FetcherContext } from "../providers";

export const useFetcher = () => useContext<Fetcher>(FetcherContext);
