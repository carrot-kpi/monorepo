import type { SupportedChain } from "@carrot-kpi/sdk";
import { type Config } from "wagmi";

declare module "wagmi" {
    interface Register {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: Config<readonly [SupportedChain, ...SupportedChain[]], any>;
    }
}
