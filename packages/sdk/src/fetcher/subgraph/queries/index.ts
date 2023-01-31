export interface TemplateData {
    id: string;
    managerId: string;
    rawAddress: string;
    version: number;
    specificationCid: string;
    name: string;
    description: string;
    tags: string[];
    repository: string;
    commitHash: string;
}

export const TemplateDataFields = `
    id
    managerId
    rawAddress: address
    version
    specificationCid
    name
    description
    tags
    repository
    commitHash
`;

export interface OracleData {
    rawAddress: string;
    template: TemplateData;
    finalized: boolean;
}

const OracleDataFields = `
    rawAddress: id
    template {
        ${TemplateDataFields}
    }
    finalized
`;

export interface KPITokenData {
    rawAddress: string;
    descriptionCid: string;
    title: string;
    description: string;
    tags: string[];
    expiration: string;
    template: TemplateData;
    oracles: OracleData[];
    finalized: boolean;
}

const KPITokenDataFields = `
    rawAddress: id
    owner
    descriptionCid
    title
    description
    tags
    finalized
    expiration
    template {
        ${TemplateDataFields}
    }
    oracles {
        rawAddress: id
        template {
            ${TemplateDataFields}
        }
        finalized
    }
    finalized
`;

export interface GetKPITokensQueryResponse {
    tokens: KPITokenData[];
}

export const GetKPITokenByAddressesQuery = `
    query getKPITokenByAddresses($addresses: [Bytes!]!) {
        tokens: kpitokens(where: { id_in: $addresses }) {
            ${KPITokenDataFields}
        }
    }
`;

export const GetKPITokensQuery = `
    query getKPITokens($limit: Int!, $lastID: Bytes) {
        tokens: kpitokens(first: $limit, where: { id_gt: $lastID }) {
            ${KPITokenDataFields}
        }
    }
`;

export interface GetOraclesQueryResponse {
    oracles: OracleData[];
}

export const GetOracleByAddressesQuery = `
    query getOracleByAddresses($addresses: [Bytes!]!) {
        oracles(where: { id_in: $addresses }) {
            ${OracleDataFields}
        }
    }
`;

export const GetOraclesQuery = `
    query getOracles($limit: Int!, $lastID: Bytes) {
        oracles(first: $limit, where: { id_gt: $lastID }) {
            ${OracleDataFields}
        }
    }
`;

export interface GetTemplatesQueryResponse {
    manager?: { templates: TemplateData[] };
}

export const GetKPITokenTemplatesOfManagerByIdQuery = `
    query getKPITokenTemplatesOfManagerById(
        $managerAddress: ID!
        $ids: [BigInt!]!
    ) {
        manager: kpitokensManager(id: $managerAddress) {
            templates(where: { managerId_in: $ids }) {
                ${TemplateDataFields}
            }
        }
    }
`;

export const GetKPITokenTemplatesOfManagerQuery = `
    query getKPITokenTemplatesOfManager(
        $managerAddress: ID!
        $limit: Int!
        $lastID: Bytes
    ) {
        manager: kpitokensManager(id: $managerAddress) {
            templates(first: $limit, where: { id_gt: $lastID }) {
                ${TemplateDataFields}
            }
        }
    }
`;

export const GetOracleTemplatesOfManagerByIdQuery = `
    query getOracleTemplatesOfManagerById($managerAddress: ID!, $ids: [BigInt!]!) {
        manager: oraclesManager(id: $managerAddress) {
            templates(where: { managerId_in: $ids }) {
                ${TemplateDataFields}
            }
        }
    }
`;

export const GetOracleTemplatesOfManagerQuery = `
    query getOracleTemplatesOfManager(
        $managerAddress: ID!
        $limit: Int!
        $lastID: Bytes
    ) {
        manager: oraclesManager(id: $managerAddress) {
            templates(first: $limit, where: { id_gt: $lastID }) {
                ${TemplateDataFields}
            }
        }
    }
`;
