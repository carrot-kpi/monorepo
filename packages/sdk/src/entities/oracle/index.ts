import { ChainId } from "../../commons";
import { Template, ResolvedTemplate } from "../template";

export class Oracle {
    constructor(
        public readonly chainId: ChainId,
        public readonly address: string,
        public readonly template: Template,
        public readonly finalized: boolean
    ) {}
}

export class ResolvedOracle {
    constructor(
        public readonly chainId: ChainId,
        public readonly address: string,
        public readonly template: ResolvedTemplate,
        public readonly finalized: boolean
    ) {}

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
