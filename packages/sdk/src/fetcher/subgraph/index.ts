import { KPIToken } from "../../entities/kpi-token";
import type {
    FetchEntitiesParams,
    FetchKPITokenAddressesParams,
    FetchKPITokensAmountParams,
    FetchLatestKpiTokenAddressesParams,
    FetchTemplatesParams,
    IPartialCarrotFetcher,
    SupportedInChainParams,
} from "../abstraction";
import type {
    KPITokenData,
    KPITokenSearchData,
    TemplateData,
    OracleData,
    GetKPITokensQueryResponse,
    GetOraclesQueryResponse,
    GetTemplatesQueryResponse,
    GetKPITokensAmountQueryResponse,
    GetKPITokenAddressesQueryResponse,
    GetLatestKPITokenAddressesQueryResponse,
} from "./queries";
import {
    GetKPITokensQuery,
    GetKPITokenByAddressesQuery,
    GetOracleByAddressesQuery,
    GetOraclesQuery,
    GetLatestVersionKPITokenTemplatesOfManagerByIdQuery,
    GetLatestVersionKPITokenTemplatesOfManagerQuery,
    GetOracleTemplatesOfManagerByIdQuery,
    GetOracleTemplatesOfManagerQuery,
    GetKPITokensAmountQuery,
    GetKPITokenAddressesQuery,
    GetLatestKPITokenAddressesQuery,
} from "./queries";
import { ChainId, SUBGRAPH_URL, CHAIN_ADDRESSES } from "../../commons";
import { enforce } from "../../utils";
import { type Address, getAddress } from "viem";
import { Template } from "../../entities/template";
import { Oracle } from "../../entities/oracle";
import { query } from "../../utils/subgraph";
import type { ChainKPITokensMap, ChainOraclesMap } from "../types";

const PAGE_SIZE = 100;

const mapRawTemplate = (rawOracleTemplate: TemplateData) => {
    return new Template(
        parseInt(rawOracleTemplate.managerId),
        getAddress(rawOracleTemplate.rawAddress),
        rawOracleTemplate.version,
        rawOracleTemplate.specificationCid
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
        getAddress(rawKPIToken.rawOwner),
        mapRawTemplate(rawKPIToken.template),
        rawKPIToken.oracles.map((rawOracle) =>
            mapRawOracle(chainId, rawOracle)
        ),
        rawKPIToken.descriptionCid,
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
        publicClient,
    }: FetchKPITokensAmountParams): Promise<number> {
        const chainId = await publicClient.getChainId();
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

    public async fetchLatestKPITokenAddresses({
        publicClient,
        limit,
    }: FetchLatestKpiTokenAddressesParams): Promise<Address[]> {
        const chainId = await publicClient.getChainId();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const subgraphURL = SUBGRAPH_URL[chainId as ChainId];
        enforce(!!subgraphURL, `no subgraph available in chain ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        enforce(!!chainAddresses, `no addresses available in chain ${chainId}`);
        const { tokens } = await query<GetLatestKPITokenAddressesQueryResponse>(
            subgraphURL,
            GetLatestKPITokenAddressesQuery,
            { limit: limit || 5 }
        );
        return !tokens
            ? []
            : tokens.map(({ rawAddress }) => getAddress(rawAddress));
    }

    public async fetchKPITokenAddresses({
        publicClient,
        fromIndex,
        toIndex,
    }: FetchKPITokenAddressesParams): Promise<Address[]> {
        const chainId = await publicClient.getChainId();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const subgraphURL = SUBGRAPH_URL[chainId as ChainId];
        enforce(!!subgraphURL, `no subgraph available in chain ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        enforce(!!chainAddresses, `no addresses available in chain ${chainId}`);
        const finalFromIndex = !fromIndex || fromIndex < 0 ? 0 : fromIndex;
        const finalToIndex = !toIndex
            ? await this.fetchKPITokensAmount({ publicClient })
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

    public normalizeKpiTokens = async (
        rawTokensList: KPITokenSearchData[] | KPITokenData[],
        chainId: ChainId
    ) => {
        const kpiTokens: ChainKPITokensMap = {};
        rawTokensList.map((rawToken) => {
            const kpiToken = mapRawKPIToken(
                chainId,
                "kpiToken" in rawToken ? rawToken.kpiToken : rawToken
            );
            kpiTokens[kpiToken.address] = kpiToken;
        });

        return kpiTokens;
    };

    public async fetchKPITokens({
        publicClient,
        addresses,
    }: FetchEntitiesParams): Promise<ChainKPITokensMap> {
        const chainId = await publicClient.getChainId();
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
            let kpiTokens: Promise<ChainKPITokensMap> | ChainKPITokensMap = {};
            while (toIndex < addressesLength) {
                const addressesChunk = addresses
                    .slice(fromIndex, toIndex + 1)
                    .map((address) => address.toLowerCase());
                const { tokens: rawKPITokens } =
                    await query<GetKPITokensQueryResponse>(
                        subgraphURL,
                        GetKPITokenByAddressesQuery,
                        { addresses: addressesChunk }
                    );
                if (rawKPITokens.length === 0) break;

                kpiTokens = this.normalizeKpiTokens(rawKPITokens, chainId);

                fromIndex += PAGE_SIZE;
                toIndex =
                    fromIndex + PAGE_SIZE > finalIndex
                        ? finalIndex
                        : fromIndex + PAGE_SIZE;
            }
            return kpiTokens;
        } else {
            let page: KPITokenData[] = [];
            let kpiTokens: Promise<ChainKPITokensMap> | ChainKPITokensMap = {};
            let lastID = "";
            do {
                const { tokens: rawTokens } =
                    await query<GetKPITokensQueryResponse>(
                        subgraphURL,
                        GetKPITokensQuery,
                        { limit: PAGE_SIZE, lastID }
                    );
                page = rawTokens;
                if (page.length === 0) break;
                kpiTokens = this.normalizeKpiTokens(page, chainId);
                lastID = page[page.length - 1].rawAddress;
            } while (page.length === PAGE_SIZE);
            return kpiTokens;
        }
    }

    public normalizeOracle = async (
        oraclesList: OracleData[],
        chainId: ChainId
    ) => {
        const oracles: ChainOraclesMap = {};

        oraclesList.map(async (rawOracle) => {
            const oracle = mapRawOracle(chainId, rawOracle);
            oracles[oracle.address] = oracle;
        });

        return oracles;
    };

    public async fetchOracles({
        publicClient,
        addresses,
    }: FetchEntitiesParams): Promise<ChainOraclesMap> {
        const chainId = await publicClient.getChainId();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const subgraphURL = SUBGRAPH_URL[chainId as ChainId];
        enforce(!!subgraphURL, `no subgraph available in chain ${chainId}`);
        let oracles: Promise<ChainOraclesMap> | ChainOraclesMap = {};

        if (!!addresses) {
            const addressesLength = addresses.length;
            if (addressesLength === 0) return {};
            const finalIndex = addressesLength - 1;
            let fromIndex = 0;
            let toIndex =
                fromIndex + PAGE_SIZE > finalIndex
                    ? finalIndex
                    : fromIndex + PAGE_SIZE;

            while (toIndex < addressesLength) {
                const addressesChunk = addresses
                    .slice(fromIndex, toIndex + 1)
                    .map((address) => address.toLowerCase());
                const { oracles: rawOracles } =
                    await query<GetOraclesQueryResponse>(
                        subgraphURL,
                        GetOracleByAddressesQuery,
                        { addresses: addressesChunk }
                    );
                if (rawOracles.length === 0) break;
                oracles = this.normalizeOracle(rawOracles, chainId);

                fromIndex += PAGE_SIZE;
                toIndex =
                    fromIndex + PAGE_SIZE > finalIndex
                        ? finalIndex
                        : fromIndex + PAGE_SIZE;
            }
            return oracles;
        } else {
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
                oracles = this.normalizeOracle(page, chainId);
                lastID = page[page.length - 1].rawAddress;
            } while (page.length === PAGE_SIZE);
            return oracles;
        }
    }

    public async fetchKPITokenTemplates({
        publicClient,
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const chainId = await publicClient.getChainId();
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
                const idsChunk = ids.slice(fromIndex, toIndex + 1);
                const { manager } = await query<GetTemplatesQueryResponse>(
                    subgraphURL,
                    GetLatestVersionKPITokenTemplatesOfManagerByIdQuery,
                    { managerAddress, ids: idsChunk }
                );
                if (!manager || manager.templateSets.length === 0) break;
                manager.templateSets.map((templateSet) => {
                    if (
                        !templateSet.templates ||
                        templateSet.templates.length === 0
                    )
                        return;
                    templates.push(mapRawTemplate(templateSet.templates[0]));
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
                    GetLatestVersionKPITokenTemplatesOfManagerQuery,
                    {
                        managerAddress,
                        limit: PAGE_SIZE,
                        lastID,
                    }
                );
                if (!manager || manager.templateSets.length === 0) break;
                page = manager.templateSets.reduce(
                    (accumulator: TemplateData[], templateSet) => {
                        if (
                            !!templateSet.templates &&
                            templateSet.templates.length > 0
                        )
                            accumulator.push(templateSet.templates[0]);
                        return accumulator;
                    },
                    []
                );
                if (page.length === 0) break;
                page.map((rawTemplate) => {
                    templates.push(mapRawTemplate(rawTemplate));
                });
                lastID = page[page.length - 1].id;
            } while (page.length === PAGE_SIZE);
            return templates;
        }
    }

    public async fetchOracleTemplates({
        publicClient,
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const chainId = await publicClient.getChainId();
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
                const idsChunk = ids.slice(fromIndex, toIndex + 1);
                const { manager } = await query<GetTemplatesQueryResponse>(
                    subgraphURL,
                    GetOracleTemplatesOfManagerByIdQuery,
                    { managerAddress, ids: idsChunk }
                );
                if (!manager || manager.templateSets.length === 0) break;
                manager.templateSets.map((templateSet) => {
                    if (
                        !templateSet.templates ||
                        templateSet.templates.length === 0
                    )
                        return;
                    templates.push(mapRawTemplate(templateSet.templates[0]));
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
                if (!manager) break;
                page = manager.templateSets.reduce(
                    (accumulator: TemplateData[], templateSet) => {
                        if (
                            !!templateSet.templates &&
                            templateSet.templates.length > 0
                        )
                            accumulator.push(templateSet.templates[0]);
                        return accumulator;
                    },
                    []
                );
                if (page.length === 0) break;
                page.map((rawTemplate) => {
                    templates.push(mapRawTemplate(rawTemplate));
                });
                lastID = page[page.length - 1].id;
            } while (page.length === PAGE_SIZE);
            return templates;
        }
    }
}

export const SubgraphFetcher = new Fetcher();
