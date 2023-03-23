import { ChainId } from "../commons.js";
import { Template } from "./template.js";

export class Oracle {
    constructor(
        public readonly chainId: ChainId,
        public readonly address: string,
        public readonly template: Template,
        public readonly finalized: boolean
    ) {}
}

export class OracleWithData extends Oracle {
    constructor(
        chainId: ChainId,
        address: string,
        template: Template,
        finalized: boolean,
        public readonly data: string
    ) {
        super(chainId, address, template, finalized);
    }
}
