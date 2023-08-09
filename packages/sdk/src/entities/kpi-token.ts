import { Template, ResolvedTemplate } from "./template";
import { Oracle, ResolvedOracle, ResolvedOracleWithData } from "./oracle";
import { ChainId } from "../commons";
import { type Address, type Hex } from "viem";

export interface KPITokenSpecification {
    ipfsHash: string;
    title: string;
    description: string;
    tags: string[];
}

export class BaseKPIToken {
    constructor(
        public readonly chainId: ChainId,
        public readonly address: Address,
        public readonly owner: Address,
        public readonly expiration: number,
        public readonly creationTimestamp: number,
        public readonly finalized: boolean,
    ) {}

    public get expired(): boolean {
        return (
            !this.finalized && this.expiration <= Math.floor(Date.now() / 1_000)
        );
    }
}

export class KPIToken extends BaseKPIToken {
    constructor(
        chainId: ChainId,
        address: Address,
        owner: Address,
        public readonly template: Template,
        public readonly oracles: Oracle[],
        public readonly specificationCID: string,
        expiration: number,
        creationTimestamp: number,
        finalized: boolean,
    ) {
        super(
            chainId,
            address,
            owner,
            expiration,
            creationTimestamp,
            finalized,
        );
    }
}

export class ResolvedKPIToken extends BaseKPIToken {
    constructor(
        chainId: ChainId,
        address: Address,
        owner: Address,
        public readonly template: ResolvedTemplate,
        public readonly oracles: ResolvedOracle[],
        public readonly specification: KPITokenSpecification,
        expiration: number,
        creationTimestamp: number,
        finalized: boolean,
    ) {
        super(
            chainId,
            address,
            owner,
            expiration,
            creationTimestamp,
            finalized,
        );
    }

    public static from(
        kpiToken: KPIToken,
        template: ResolvedTemplate,
        oracles: ResolvedOracle[],
        specification: KPITokenSpecification,
    ) {
        return new ResolvedKPIToken(
            kpiToken.chainId,
            kpiToken.address,
            kpiToken.owner,
            template,
            oracles,
            specification,
            kpiToken.expiration,
            kpiToken.creationTimestamp,
            kpiToken.finalized,
        );
    }
}

export class ResolvedKPITokenWithData extends BaseKPIToken {
    constructor(
        chainId: ChainId,
        address: Address,
        owner: Address,
        public readonly template: ResolvedTemplate,
        public readonly oracles: ResolvedOracleWithData[],
        public readonly specification: KPITokenSpecification,
        expiration: number,
        creationTimestamp: number,
        finalized: boolean,
        public readonly data: Hex,
    ) {
        super(
            chainId,
            address,
            owner,
            expiration,
            creationTimestamp,
            finalized,
        );
    }

    public static from(
        kpiToken: ResolvedKPIToken,
        oracles: ResolvedOracleWithData[],
        data: Hex,
        finalized: boolean,
    ) {
        return new ResolvedKPITokenWithData(
            kpiToken.chainId,
            kpiToken.address,
            kpiToken.owner,
            kpiToken.template,
            oracles,
            kpiToken.specification,
            kpiToken.expiration,
            kpiToken.creationTimestamp,
            finalized,
            data,
        );
    }
}

export const isResolvedKPIToken = (
    kpiToken?: KPIToken | ResolvedKPIToken,
): kpiToken is ResolvedKPIToken => {
    return !kpiToken ? false : "specification" in kpiToken;
};
