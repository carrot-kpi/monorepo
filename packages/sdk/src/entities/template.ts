import { type Address } from "viem";
import type { Environment } from "@carrot-kpi/shared-state";

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
        public readonly specificationCID: string,
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
        public readonly previewUrl?: {
            [Environment.Development]?: string;
            [Environment.Staging]?: string;
        },
    ) {}
}
export class ResolvedTemplate {
    constructor(
        public readonly id: number,
        public readonly address: Address,
        public readonly version: number,
        public readonly specification: TemplateSpecification,
    ) {}

    public static from(
        template: Template,
        specification: TemplateSpecification,
    ) {
        return new ResolvedTemplate(
            template.id,
            template.address,
            template.version,
            specification,
        );
    }
}
