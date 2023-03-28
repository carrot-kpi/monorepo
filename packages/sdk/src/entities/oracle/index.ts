import { ChainId } from "../../commons";
import { Template, ResolvedTemplate } from "../template";

export class BaseOracle {
    constructor(
        public readonly chainId: ChainId,
        public readonly address: string,
        public readonly finalized: boolean
    ) {}
}

export class Oracle extends BaseOracle {
    constructor(
        chainId: ChainId,
        address: string,
        public readonly template: Template,
        finalized: boolean
    ) {
        super(chainId, address, finalized);
    }
}

export class ResolvedOracle extends BaseOracle {
    constructor(
        chainId: ChainId,
        address: string,
        public readonly template: ResolvedTemplate,
        finalized: boolean
    ) {
        super(chainId, address, finalized);
    }

    public static from(oracle: Oracle, template: ResolvedTemplate) {
        return new ResolvedOracle(
            oracle.chainId,
            oracle.address,
            template,
            oracle.finalized
        );
    }
}

export class ResolvedOracleWithData extends ResolvedOracle {
    constructor(
        chainId: ChainId,
        address: string,
        template: ResolvedTemplate,
        finalized: boolean,
        public readonly data: string
    ) {
        super(chainId, address, template, finalized);
    }
}
