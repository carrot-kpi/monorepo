export interface TemplateData {
    id: string;
    managerId: string;
    rawAddress: string;
    version: number;
    specificationCid: string;
    specification?: {
        name?: string;
        description?: string;
        tags?: string[];
        repository?: string;
        commitHash?: string;
    };
}

export const TemplateDataFields = `
    id
    managerId
    rawAddress: address
    version
    specificationCid
    specification {
        name
        description
        tags
        repository
        commitHash
    }
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
    rawOwner: string;
    descriptionCid: string;
    description?: {
        title?: string;
        description?: string;
        tags?: string[];
    };
    expiration: string;
    creationTimestamp: string;
    template: TemplateData;
    oracles: OracleData[];
    finalized: boolean;
}

export interface KPITokenSearchData {
    kpiToken: KPITokenData;
}

const KPITokenDataFields = `
    rawAddress: id
    rawOwner: owner
    descriptionCid
    description {
        title
        description
        tags
    }
    finalized
    expiration
    creationTimestamp
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

export interface GetKPITokensAmountQueryResponse {
    factory?: {
        kpiTokensAmount: string;
    };
}

export const GetKPITokensAmountQuery = `
    query getKPITokensAmountInFactory($factoryAddress: ID!) {
        factory(id: $factoryAddress) {
            kpiTokensAmount
        }
    }
`;

export interface GetKPITokenAddressesQueryResponse {
    tokens?: {
        rawAddress: string;
    }[];
}

export const GetKPITokenAddressesQuery = `
    query getKPITokenAddresses($skip: Int!, $limit: Int!) {
        tokens: kpitokens(skip: $skip, limit: $limit) {
            rawAddress: id
        }
    }
`;

export interface GetKPITokensQueryResponse {
    tokens: KPITokenData[];
}

export interface GetKPITokenSearchQueryResponse {
    kpiTokenSearch: [{ kpiToken: KPITokenData }];
}

export const getKPITokenBySearchQuery = `
query getKPITokensBySearch($query: String){
    kpiTokenSearch(text: $query) {
        kpiToken {
            ${KPITokenDataFields}
        }
   }
} 
`;

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
    manager?: { templateSets: { templates: TemplateData[] }[] };
}

export const GetLatestVersionKPITokenTemplatesOfManagerByIdQuery = `
    query getKPITokenTemplatesOfManagerById(
        $managerAddress: ID!
        $ids: [BigInt!]!
    ) {
        manager: kpitokensManager(id: $managerAddress) {
            templateSets(where: { managerId_in: $ids, active: true }) {
                templates(orderBy: version, orderDirection: desc, first: 1) {
                    ${TemplateDataFields}
                }
            }
        }
    }
`;

export const GetLatestVersionKPITokenTemplatesOfManagerQuery = `
    query getKPITokenTemplatesOfManager(
        $managerAddress: ID!
        $limit: Int!
        $lastID: Bytes
    ) {
        manager: kpitokensManager(id: $managerAddress) {
            templateSets(first: $limit, where: { id_gt: $lastID, active: true }) {
                templates(orderBy: version, orderDirection: desc, first: 1) {
                    ${TemplateDataFields}
                }
            }
        }
    }
`;

export const GetOracleTemplatesOfManagerByIdQuery = `
    query getOracleTemplatesOfManagerById($managerAddress: ID!, $ids: [BigInt!]!) {
        manager: oraclesManager(id: $managerAddress) {
            templateSets(where: { managerId_in: $ids, active: true }) {
                templates(orderBy: version, orderDirection: desc, first: 1) {
                    ${TemplateDataFields}
                }
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
            templateSets(where: { id_gt: $lastID, active: true }) {
                templates(orderBy: version, orderDirection: desc, first: 1) {
                    ${TemplateDataFields}
                }
            }
        }
    }
`;
