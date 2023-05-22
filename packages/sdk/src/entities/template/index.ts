import { type Address } from "viem";

export interface OnChainTemplate {
    addrezz: Address;
    version: bigint;
    id: bigint;
    specification: string;
}

export class Template {
    constructor(
        public readonly id: number,
        public readonly address: Address,
        public readonly version: number,
        public readonly specificationCID: string
    ) {}
}

export class TemplateSpecification {
    constructor(
        public readonly cid: string,
        public readonly name: string,
        public readonly description: string,
        public readonly tags: string[],
        public readonly repository: string,
        public readonly commitHash: string,
        public readonly stagingURL?: string
    ) {}
}
export class ResolvedTemplate {
    constructor(
        public readonly id: number,
        public readonly address: Address,
        public readonly version: number,
        public readonly specification: TemplateSpecification
    ) {}

    public static from(
        template: Template,
        specification: TemplateSpecification
    ) {
        return new ResolvedTemplate(
            template.id,
            template.address,
            template.version,
            specification
        );
    }
}
