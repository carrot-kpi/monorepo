import { KPIToken } from "../../entities/kpi-token";
import {
    FetchEntitiesParams,
    FetchKPITokenAddressesParams,
    FetchKPITokensAmountParams,
    FetchTemplatesParams,
    IPartialCarrotFetcher,
    SupportedInChainParams,
} from "../abstraction";
import {
    KPITokenData,
    TemplateData,
    OracleData,
    GetKPITokensQuery,
    GetKPITokensQueryResponse,
    GetKPITokenByAddressesQuery,
    GetOracleByAddressesQuery,
    GetOraclesQueryResponse,
    GetOraclesQuery,
    GetTemplatesQueryResponse,
    GetKPITokenTemplatesOfManagerByIdQuery,
    GetKPITokenTemplatesOfManagerQuery,
    GetOracleTemplatesOfManagerByIdQuery,
    GetOracleTemplatesOfManagerQuery,
    GetKPITokensAmountQueryResponse,
    GetKPITokensAmountQuery,
    GetKPITokenAddressesQueryResponse,
    GetKPITokenAddressesQuery,
} from "./queries";
import { ChainId, SUBGRAPH_URL, CHAIN_ADDRESSES } from "../../commons";
import { enforce } from "../../utils";
import { getAddress } from "@ethersproject/address";
import { Template, TemplateSpecification } from "../../entities/template";
import { Oracle } from "../../entities/oracle";
import { query } from "../../utils/graphql";

const PAGE_SIZE = 100;

const mapRawTemplate = (rawOracleTemplate: TemplateData) => {
    return new Template(
        parseInt(rawOracleTemplate.managerId),
        getAddress(rawOracleTemplate.rawAddress),
        rawOracleTemplate.version,
        new TemplateSpecification(
            rawOracleTemplate.specificationCid,
            rawOracleTemplate.name,
            rawOracleTemplate.description,
            rawOracleTemplate.tags,
            rawOracleTemplate.repository,
            rawOracleTemplate.commitHash
        )
    );
};

const mapRawOracle = (chainId: ChainId, rawOracle: OracleData) => {
    return new Oracle(
        chainId,
        getAddress(rawOracle.rawAddress),
        mapRawTemplate(rawOracle.template),
        rawOracle.finalized
    );
};

const mapRawKPIToken = (chainId: ChainId, rawKPIToken: KPITokenData) => {
    return new KPIToken(
        chainId,
        getAddress(rawKPIToken.rawAddress),
        mapRawTemplate(rawKPIToken.template),
        rawKPIToken.oracles.map((rawOracle) => {
            return mapRawOracle(chainId, rawOracle);
        }),
        {
            ipfsHash: rawKPIToken.descriptionCid,
            title: rawKPIToken.title,
            description: rawKPIToken.description,
            tags: rawKPIToken.tags,
        },
        parseInt(rawKPIToken.expiration),
        parseInt(rawKPIToken.creationTimestamp),
        rawKPIToken.finalized
    );
};

// TODO: check if validation can be extracted in its own function
class Fetcher implements IPartialCarrotFetcher {
    public supportedInChain({ chainId }: SupportedInChainParams): boolean {
        return !!SUBGRAPH_URL[chainId];
    }

    public async fetchKPITokensAmount({
        provider,
    }: FetchKPITokensAmountParams): Promise<number> {
        const { chainId } = await provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const subgraphURL = SUBGRAPH_URL[chainId as ChainId];
        enforce(!!subgraphURL, `no subgraph available in chain ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        enforce(!!chainAddresses, `no addresses available in chain ${chainId}`);
        const { factory } = await query<GetKPITokensAmountQueryResponse>(
            subgraphURL,
            GetKPITokensAmountQuery,
            { factoryAddress: chainAddresses.factory.toLowerCase() }
        );
        if (!factory || !factory.kpiTokensAmount) return 0;
        const kpiTokensAmount = parseInt(factory.kpiTokensAmount);
        return isNaN(kpiTokensAmount) ? 0 : kpiTokensAmount;
    }

    public async fetchKPITokenAddresses({
        provider,
        fromIndex,
        toIndex,
    }: FetchKPITokenAddressesParams): Promise<string[]> {
        const { chainId } = await provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const subgraphURL = SUBGRAPH_URL[chainId as ChainId];
        enforce(!!subgraphURL, `no subgraph available in chain ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        enforce(!!chainAddresses, `no addresses available in chain ${chainId}`);
        const finalFromIndex = !fromIndex || fromIndex < 0 ? 0 : fromIndex;
        const finalToIndex = !toIndex
            ? await this.fetchKPITokensAmount({ provider })
            : toIndex;
        const { tokens } = await query<GetKPITokenAddressesQueryResponse>(
            subgraphURL,
            GetKPITokenAddressesQuery,
            { skip: finalFromIndex, limit: finalToIndex }
        );
        return !tokens
            ? []
            : tokens.map(({ rawAddress }) => getAddress(rawAddress));
    }

    public async fetchKPITokens({
        provider,
        addresses,
    }: FetchEntitiesParams): Promise<{ [address: string]: KPIToken }> {
        const { chainId } = await provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const subgraphURL = SUBGRAPH_URL[chainId as ChainId];
        enforce(!!subgraphURL, `no subgraph available in chain ${chainId}`);
        if (!!addresses) {
            const addressesLength = addresses.length;
            if (addressesLength === 0) return {};
            const finalIndex = addressesLength - 1;
            let fromIndex = 0;
            let toIndex =
                fromIndex + PAGE_SIZE > finalIndex
                    ? finalIndex
                    : fromIndex + PAGE_SIZE;
            const kpiTokens: { [address: string]: KPIToken } = {};
            while (toIndex < addressesLength) {
                const addressesChunk = addresses
                    .slice(fromIndex, toIndex)
                    .map((address) => address.toLowerCase());
                const { tokens: rawKPITokens } =
                    await query<GetKPITokensQueryResponse>(
                        subgraphURL,
                        GetKPITokenByAddressesQuery,
                        { addresses: addressesChunk }
                    );
                rawKPITokens.forEach((rawKPIToken) => {
                    const kpiToken = mapRawKPIToken(chainId, rawKPIToken);
                    kpiTokens[kpiToken.address] = kpiToken;
                });
                fromIndex += PAGE_SIZE;
                toIndex =
                    fromIndex + PAGE_SIZE > finalIndex
                        ? finalIndex
                        : fromIndex + PAGE_SIZE;
            }
            return kpiTokens;
        } else {
            const kpiTokens: { [address: string]: KPIToken } = {};
            let lastID = "";
            let page: KPITokenData[] = [];
            do {
                const { tokens: rawTokens } =
                    await query<GetKPITokensQueryResponse>(
                        subgraphURL,
                        GetKPITokensQuery,
                        { limit: PAGE_SIZE, lastID }
                    );
                page = rawTokens;
                if (page.length === 0) break;
                page.forEach((rawKPIToken) => {
                    const kpiToken = mapRawKPIToken(chainId, rawKPIToken);
                    kpiTokens[kpiToken.address] = kpiToken;
                });
                lastID = page[page.length - 1].rawAddress;
            } while (page.length === PAGE_SIZE);
            return kpiTokens;
        }
    }

    public async fetchOracles({
        provider,
        addresses,
    }: FetchEntitiesParams): Promise<{ [address: string]: Oracle }> {
        const { chainId } = await provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const subgraphURL = SUBGRAPH_URL[chainId as ChainId];
        enforce(!!subgraphURL, `no subgraph available in chain ${chainId}`);
        if (!!addresses) {
            const addressesLength = addresses.length;
            if (addressesLength === 0) return {};
            const finalIndex = addressesLength - 1;
            let fromIndex = 0;
            let toIndex =
                fromIndex + PAGE_SIZE > finalIndex
                    ? finalIndex
                    : fromIndex + PAGE_SIZE;
            const oracles: { [address: string]: Oracle } = {};
            while (toIndex < addressesLength) {
                const addressesChunk = addresses
                    .slice(fromIndex, toIndex)
                    .map((address) => address.toLowerCase());
                const { oracles: rawOracles } =
                    await query<GetOraclesQueryResponse>(
                        subgraphURL,
                        GetOracleByAddressesQuery,
                        { addresses: addressesChunk }
                    );
                rawOracles.forEach((rawOracle) => {
                    const oracle = mapRawOracle(chainId, rawOracle);
                    oracles[oracle.address] = oracle;
                });
                fromIndex += PAGE_SIZE;
                toIndex =
                    fromIndex + PAGE_SIZE > finalIndex
                        ? finalIndex
                        : fromIndex + PAGE_SIZE;
            }
            return oracles;
        } else {
            const oracles: { [address: string]: Oracle } = {};
            let lastID = "";
            let page: OracleData[] = [];
            do {
                const result = await query<GetOraclesQueryResponse>(
                    subgraphURL,
                    GetOraclesQuery,
                    { limit: PAGE_SIZE, lastID }
                );
                page = result.oracles;
                if (page.length === 0) break;
                page.forEach((rawOracle) => {
                    const oracle = mapRawOracle(chainId, rawOracle);
                    oracles[oracle.address] = oracle;
                });
                lastID = page[page.length - 1].rawAddress;
            } while (page.length === PAGE_SIZE);
            return oracles;
        }
    }

    public async fetchKPITokenTemplates({
        provider,
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const { chainId } = await provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const subgraphURL = SUBGRAPH_URL[chainId as ChainId];
        enforce(!!subgraphURL, `no subgraph available in chain ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        enforce(!!chainAddresses, `no addresses available in chain ${chainId}`);
        const managerAddress = chainAddresses.kpiTokensManager.toLowerCase();
        if (!!ids) {
            const idsLength = ids.length;
            if (idsLength === 0) return [];
            const finalIndex = idsLength - 1;
            let fromIndex = 0;
            let toIndex =
                fromIndex + PAGE_SIZE > finalIndex
                    ? finalIndex
                    : fromIndex + PAGE_SIZE;
            const templates: Template[] = [];
            while (toIndex < idsLength) {
                const idsChunk = ids.slice(fromIndex, toIndex);
                const { manager } = await query<GetTemplatesQueryResponse>(
                    subgraphURL,
                    GetKPITokenTemplatesOfManagerByIdQuery,
                    { managerAddress, ids: idsChunk }
                );
                if (!manager) return [];
                manager.templates.forEach((rawTemplate) => {
                    templates.push(mapRawTemplate(rawTemplate));
                });
                fromIndex += PAGE_SIZE;
                toIndex =
                    fromIndex + PAGE_SIZE > finalIndex
                        ? finalIndex
                        : fromIndex + PAGE_SIZE;
            }
            return templates;
        } else {
            const templates: Template[] = [];
            let lastID = "";
            let page: TemplateData[] = [];
            do {
                const { manager } = await query<GetTemplatesQueryResponse>(
                    subgraphURL,
                    GetKPITokenTemplatesOfManagerQuery,
                    {
                        managerAddress,
                        limit: PAGE_SIZE,
                        lastID,
                    }
                );
                if (!manager) return [];
                page = manager.templates;
                if (page.length === 0) break;
                page.forEach((rawTemplate) => {
                    templates.push(mapRawTemplate(rawTemplate));
                });
                lastID = page[page.length - 1].id;
            } while (page.length === PAGE_SIZE);
            return templates;
        }
    }

    public async fetchOracleTemplates({
        provider,
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const { chainId } = await provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const subgraphURL = SUBGRAPH_URL[chainId as ChainId];
        enforce(!!subgraphURL, `no subgraph available in chain ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        enforce(!!chainAddresses, `no addresses available in chain ${chainId}`);
        const managerAddress = chainAddresses.oraclesManager.toLowerCase();
        if (!!ids) {
            const idsLength = ids.length;
            if (idsLength === 0) return [];
            const finalIndex = idsLength - 1;
            let fromIndex = 0;
            let toIndex =
                fromIndex + PAGE_SIZE > finalIndex
                    ? finalIndex
                    : fromIndex + PAGE_SIZE;
            const templates: Template[] = [];
            while (toIndex < idsLength) {
                const idsChunk = ids.slice(fromIndex, toIndex);
                const { manager } = await query<GetTemplatesQueryResponse>(
                    subgraphURL,
                    GetOracleTemplatesOfManagerByIdQuery,
                    { managerAddress, ids: idsChunk }
                );
                if (!manager) return [];
                manager.templates.forEach((rawTemplate) => {
                    templates.push(mapRawTemplate(rawTemplate));
                });
                fromIndex += PAGE_SIZE;
                toIndex =
                    fromIndex + PAGE_SIZE > finalIndex
                        ? finalIndex
                        : fromIndex + PAGE_SIZE;
            }
            return templates;
        } else {
            const templates: Template[] = [];
            let lastID = "";
            let page: TemplateData[] = [];
            do {
                const { manager } = await query<GetTemplatesQueryResponse>(
                    subgraphURL,
                    GetOracleTemplatesOfManagerQuery,
                    {
                        managerAddress,
                        limit: PAGE_SIZE,
                        lastID,
                    }
                );
                if (!manager) return [];
                page = manager.templates;
                if (page.length === 0) break;
                page.forEach((rawTemplate) => {
                    templates.push(mapRawTemplate(rawTemplate));
                });
                lastID = page[page.length - 1].id;
            } while (page.length === PAGE_SIZE);
            return templates;
        }
    }
}

export const SubgraphFetcher = new Fetcher();
