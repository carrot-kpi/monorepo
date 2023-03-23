import { Template } from "./template.js";
import { Oracle, OracleWithData } from "./oracle.js";
import { ChainId } from "../commons.js";

export interface KPITokenSpecification {
    ipfsHash: string;
    title: string;
    description: string;
    tags: string[];
}

export class KPIToken {
    constructor(
        public readonly chainId: ChainId,
        public readonly address: string,
        public readonly owner: string,
        public readonly template: Template,
        public readonly oracles: Oracle[],
        public readonly specification: KPITokenSpecification,
        public readonly expiration: number,
        public readonly creationTimestamp: number,
        public readonly finalized: boolean
    ) {}

    public get expired(): boolean {
        return this.expiration <= Math.floor(Date.now() / 1_000);
    }
}

export class KPITokenWithData {
    constructor(
        public readonly chainId: ChainId,
        public readonly address: string,
        public readonly owner: string,
        public readonly template: Template,
        public readonly oracles: OracleWithData[],
        public readonly specification: KPITokenSpecification,
        public readonly expiration: number,
        public readonly creationTimestamp: number,
        public readonly finalized: boolean,
        public readonly data: string
    ) {}

    public get expired(): boolean {
        return this.expiration <= Math.floor(Date.now() / 1_000);
    }
}
