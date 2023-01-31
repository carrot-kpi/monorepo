import { ChainId } from "../../commons";
import { Template } from "../template";

export class Oracle {
    constructor(
        public readonly chainId: ChainId,
        public readonly address: string,
        public readonly template: Template,
        public readonly finalized: boolean
    ) {}
}
