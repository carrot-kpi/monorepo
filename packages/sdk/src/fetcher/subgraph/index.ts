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
    KPITokenSearchData,
    TemplateData,
    OracleData,
    GetKPITokensQuery,
    GetKPITokensQueryResponse,
    GetKPITokenByAddressesQuery,
    GetOracleByAddressesQuery,
    GetOraclesQueryResponse,
    GetOraclesQuery,
    GetTemplatesQueryResponse,
    GetLatestVersionKPITokenTemplatesOfManagerByIdQuery,
    GetLatestVersionKPITokenTemplatesOfManagerQuery,
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
import { Template } from "../../entities/template";
import { Oracle } from "../../entities/oracle";
import { query } from "../../utils/subgraph";
import { ChainKPITokensMap, ChainOraclesMap } from "../types";

const PAGE_SIZE = 100;

const mapRawTemplate = async (rawOracleTemplate: TemplateData) => {
    return new Template(
        parseInt(rawOracleTemplate.managerId),
        getAddress(rawOracleTemplate.rawAddress),
        rawOracleTemplate.version,
        rawOracleTemplate.specificationCid
    );
};

const mapRawOracle = async (chainId: ChainId, rawOracle: OracleData) => {
    return new Oracle(
        chainId,
        getAddress(rawOracle.rawAddress),
        await mapRawTemplate(rawOracle.template),
        rawOracle.finalized
    );
};

const mapRawKPIToken = async (chainId: ChainId, rawKPIToken: KPITokenData) => {
    return new KPIToken(
        chainId,
        getAddress(rawKPIToken.rawAddress),
        getAddress(rawKPIToken.rawOwner),
        await mapRawTemplate(rawKPIToken.template),
        await Promise.all(
            rawKPIToken.oracles.map((rawOracle) =>
                mapRawOracle(chainId, rawOracle)
            )
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

    public normalizeKpiTokens = async (
        rawTokensList: KPITokenSearchData[] | KPITokenData[],
        chainId: ChainId
    ) => {
        const kpiTokens: ChainKPITokensMap = {};
        await Promise.all(
            rawTokensList.map(async (rawToken) => {
                const kpiToken = await mapRawKPIToken(
                    chainId,
                    "kpiToken" in rawToken ? rawToken.kpiToken : rawToken
                );
                kpiTokens[kpiToken.address] = kpiToken;
            })
        );

        return kpiTokens;
    };

    public async fetchKPITokens({
        provider,
        addresses,
    }: FetchEntitiesParams): Promise<ChainKPITokensMap> {
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

        await Promise.all(
            oraclesList.map(async (rawOracle) => {
                const oracle = await mapRawOracle(chainId, rawOracle);
                oracles[oracle.address] = oracle;
            })
        );

        return oracles;
    };

    public async fetchOracles({
        provider,
        addresses,
    }: FetchEntitiesParams): Promise<ChainOraclesMap> {
        const { chainId } = await provider.getNetwork();
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
                const idsChunk = ids.slice(fromIndex, toIndex + 1);
                const { manager } = await query<GetTemplatesQueryResponse>(
                    subgraphURL,
                    GetLatestVersionKPITokenTemplatesOfManagerByIdQuery,
                    { managerAddress, ids: idsChunk }
                );
                if (!manager || manager.templateSets.length === 0) break;
                await Promise.all(
                    manager.templateSets.map(async (templateSet) => {
                        if (
                            !templateSet.templates ||
                            templateSet.templates.length === 0
                        )
                            return;
                        templates.push(
                            await mapRawTemplate(templateSet.templates[0])
                        );
                    })
                );
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
                await Promise.all(
                    page.map(async (rawTemplate) => {
                        templates.push(await mapRawTemplate(rawTemplate));
                    })
                );
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
                const idsChunk = ids.slice(fromIndex, toIndex + 1);
                const { manager } = await query<GetTemplatesQueryResponse>(
                    subgraphURL,
                    GetOracleTemplatesOfManagerByIdQuery,
                    { managerAddress, ids: idsChunk }
                );
                if (!manager || manager.templateSets.length === 0) break;
                await Promise.all(
                    manager.templateSets.map(async (templateSet) => {
                        if (
                            !templateSet.templates ||
                            templateSet.templates.length === 0
                        )
                            return;
                        templates.push(
                            await mapRawTemplate(templateSet.templates[0])
                        );
                    })
                );
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
                await Promise.all(
                    page.map(async (rawTemplate) => {
                        templates.push(await mapRawTemplate(rawTemplate));
                    })
                );
                lastID = page[page.length - 1].id;
            } while (page.length === PAGE_SIZE);
            return templates;
        }
    }
}

export const SubgraphFetcher = new Fetcher();
