import { Template, ResolvedTemplate } from "./template";
import { Oracle, ResolvedOracle } from "./oracle";
import { ChainId } from "../commons";
import { type Address } from "viem";

export interface KPITokenSpecification {
    title: string;
    description: string;
    tags: string[];
}

export interface FullKPITokenSpecification extends KPITokenSpecification {
    ipfsHash: string;
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
        public readonly specification: FullKPITokenSpecification,
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
        specification: FullKPITokenSpecification,
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

export const isResolvedKPIToken = (
    kpiToken?: KPIToken | ResolvedKPIToken,
): kpiToken is ResolvedKPIToken => {
    return !kpiToken ? false : "specification" in kpiToken;
};
