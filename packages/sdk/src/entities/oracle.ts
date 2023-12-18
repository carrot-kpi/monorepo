import { type Address } from "viem";
import { ChainId } from "../commons";
import { Template, ResolvedTemplate } from "./template";

export class BaseOracle {
    constructor(
        public readonly chainId: ChainId,
        public readonly address: Address,
        public readonly finalized: boolean,
    ) {}
}

export class Oracle extends BaseOracle {
    constructor(
        chainId: ChainId,
        address: Address,
        public readonly template: Template,
        finalized: boolean,
    ) {
        super(chainId, address, finalized);
    }
}

export class ResolvedOracle extends BaseOracle {
    constructor(
        chainId: ChainId,
        address: Address,
        public readonly template: ResolvedTemplate,
        finalized: boolean,
    ) {
        super(chainId, address, finalized);
    }

    public static from(oracle: Oracle, template: ResolvedTemplate) {
        return new ResolvedOracle(
            oracle.chainId,
            oracle.address,
            template,
            oracle.finalized,
        );
    }
}
