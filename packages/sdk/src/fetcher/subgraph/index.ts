import { KPIToken } from "../../entities/kpi-token";

import {
    FetchEntitiesParams,
    FetchKPITokenAddressesParams,
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
    getKPITokenBySearchQuery,
    GetKPITokenSearchQueryResponse,
} from "./queries";
import { ChainId, SUBGRAPH_URL } from "../../commons";
import { getAddress } from "@ethersproject/address";
import { Template, TemplateSpecification } from "../../entities/template";
import { Oracle } from "../../entities/oracle";
import { query } from "../../utils/subgraph";
import { CoreFetcher } from "../core";
import { Provider } from "@ethersproject/providers";
import { BaseFetcher } from "../base";

const PAGE_SIZE = 100;

type KPITokensProp = { [address: string]: KPIToken };
type OraclesProp = { [address: string]: Oracle };

// TODO: check if validation can be extracted in its own function
class Fetcher extends BaseFetcher implements IPartialCarrotFetcher {
    constructor(provider: Provider, ipfsGatewayURL: string) {
        super(provider, ipfsGatewayURL);
    }

    public supportedInChain({ chainId }: SupportedInChainParams): boolean {
        return !!SUBGRAPH_URL[chainId];
    }

    // todo check if can make it private
    public mapRawKPIToken = async (rawKPIToken: KPITokenData) => {
        const { chainId } = await this.getChainId();
        let title, description, tags;
        if (
            !rawKPIToken.description ||
            !rawKPIToken.description.title ||
            !rawKPIToken.description.description ||
            !rawKPIToken.description.tags
        ) {
            const cid = rawKPIToken.descriptionCid;
            const rawDescription = (
                await CoreFetcher(
                    this.provider,
                    this.ipfsGatewayURL
                ).fetchContentFromIPFS({
                    cids: [cid],
                })
            )[cid];
            const ipfsDescription = JSON.parse(rawDescription);
            title = ipfsDescription.title;
            description = ipfsDescription.description;
            tags = ipfsDescription.tags;
        } else {
            title = rawKPIToken.description.title;
            description = rawKPIToken.description.description;
            tags = rawKPIToken.description.tags;
        }

        return new KPIToken(
            chainId,
            getAddress(rawKPIToken.rawAddress),
            getAddress(rawKPIToken.rawOwner),
            await this.mapRawTemplate(rawKPIToken.template),

            await Promise.all(
                rawKPIToken.oracles.map(async (rawOracle) =>
                    this.mapRawOracle(chainId, rawOracle)
                )
            ),
            {
                ipfsHash: rawKPIToken.descriptionCid,
                title,
                description,
                tags,
            },
            parseInt(rawKPIToken.expiration),
            parseInt(rawKPIToken.creationTimestamp),
            rawKPIToken.finalized
        );
    };

    // todo check if can make it private
    public mapRawTemplate = async (rawOracleTemplate: TemplateData) => {
        let name, description, tags, repository, commitHash;
        if (
            !rawOracleTemplate.specification ||
            !rawOracleTemplate.specification.name ||
            !rawOracleTemplate.specification.description ||
            !rawOracleTemplate.specification.tags ||
            !rawOracleTemplate.specification.repository ||
            !rawOracleTemplate.specification.commitHash
        ) {
            const cid = rawOracleTemplate.specificationCid;
            const rawSpecification = (
                await CoreFetcher(
                    this.provider,
                    this.ipfsGatewayURL
                ).fetchContentFromIPFS({
                    cids: [cid],
                })
            )[cid];
            const specification = JSON.parse(rawSpecification);
            name = specification.name;
            description = specification.description;
            tags = specification.tags;
            repository = specification.repository;
            commitHash = specification.commitHash;
        } else {
            name = rawOracleTemplate.specification.name;
            description = rawOracleTemplate.specification.description;
            tags = rawOracleTemplate.specification.tags;
            repository = rawOracleTemplate.specification.repository;
            commitHash = rawOracleTemplate.specification.commitHash;
        }
        return new Template(
            parseInt(rawOracleTemplate.managerId),
            getAddress(rawOracleTemplate.rawAddress),
            rawOracleTemplate.version,
            new TemplateSpecification(
                rawOracleTemplate.specificationCid,
                name,
                description,
                tags,
                repository,
                commitHash
            )
        );
    };

    // todo check if can make it private
    public mapRawOracle = async (chainId: ChainId, rawOracle: OracleData) => {
        return new Oracle(
            chainId,
            getAddress(rawOracle.rawAddress),
            await this.mapRawTemplate(rawOracle.template),
            rawOracle.finalized
        );
    };

    public async fetchKPITokensAmount(): Promise<number> {
        const { subgraphURL, chainAddresses } =
            await this.getChainIdSubgraphAndChainAddresses();

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
        fromIndex,
        toIndex,
    }: FetchKPITokenAddressesParams): Promise<string[]> {
        const { subgraphURL } = await this.getChainIdAndSubgraphURL();
        const finalFromIndex = !fromIndex || fromIndex < 0 ? 0 : fromIndex;
        const finalToIndex = !toIndex
            ? await this.fetchKPITokensAmount()
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
        rawTokensList: KPITokenSearchData[] | KPITokenData[]
    ) => {
        const kpiTokens: KPITokensProp = {};
        await Promise.all(
            rawTokensList.map(async (rawToken) => {
                const kpiToken = await this.mapRawKPIToken(
                    "kpiToken" in rawToken ? rawToken.kpiToken : rawToken
                );
                kpiTokens[kpiToken.address] = kpiToken;
            })
        );

        return kpiTokens;
    };

    public async fetchKPITokens({
        addresses,
        searchQuery,
    }: FetchEntitiesParams): Promise<KPITokensProp> {
        const { subgraphURL } = await this.getChainIdAndSubgraphURL();

        if (!!searchQuery) {
            const { kpiTokenSearch } =
                await query<GetKPITokenSearchQueryResponse>(
                    subgraphURL,
                    getKPITokenBySearchQuery,
                    { query: searchQuery }
                );

            return this.normalizeKpiTokens(kpiTokenSearch);
        }

        if (!!addresses) {
            const addressesLength = addresses.length;
            if (addressesLength === 0) return {};
            const finalIndex = addressesLength - 1;
            let fromIndex = 0;
            let toIndex =
                fromIndex + PAGE_SIZE > finalIndex
                    ? finalIndex
                    : fromIndex + PAGE_SIZE;
            let kpiTokens: Promise<KPITokensProp> | KPITokensProp = {};
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

                kpiTokens = this.normalizeKpiTokens(rawKPITokens);

                fromIndex += PAGE_SIZE;
                toIndex =
                    fromIndex + PAGE_SIZE > finalIndex
                        ? finalIndex
                        : fromIndex + PAGE_SIZE;
            }
            return kpiTokens;
        } else {
            let page: KPITokenData[] = [];
            let kpiTokens: Promise<KPITokensProp> | KPITokensProp = {};
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
                kpiTokens = this.normalizeKpiTokens(page);
                lastID = page[page.length - 1].rawAddress;
            } while (page.length === PAGE_SIZE);
            return kpiTokens;
        }
    }

    public normalizeOracle = async (
        oraclesList: OracleData[],
        chainId: ChainId
    ) => {
        const oracles: OraclesProp = {};

        await Promise.all(
            oraclesList.map(async (rawOracle) => {
                const oracle = await this.mapRawOracle(chainId, rawOracle);
                oracles[oracle.address] = oracle;
            })
        );

        return oracles;
    };

    public async fetchOracles({
        addresses,
    }: FetchEntitiesParams): Promise<OraclesProp> {
        const { subgraphURL, chainId } = await this.getChainIdAndSubgraphURL();
        let oracles: Promise<OraclesProp> | OraclesProp = {};

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
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const { chainAddresses, subgraphURL } =
            await this.getChainIdSubgraphAndChainAddresses();

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
                            await this.mapRawTemplate(templateSet.templates[0])
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
                        templates.push(await this.mapRawTemplate(rawTemplate));
                    })
                );
                lastID = page[page.length - 1].id;
            } while (page.length === PAGE_SIZE);
            return templates;
        }
    }

    public async fetchOracleTemplates({
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const { subgraphURL, chainAddresses } =
            await this.getChainIdSubgraphAndChainAddresses();

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
                            await this.mapRawTemplate(templateSet.templates[0])
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
                        templates.push(await this.mapRawTemplate(rawTemplate));
                    })
                );
                lastID = page[page.length - 1].id;
            } while (page.length === PAGE_SIZE);
            return templates;
        }
    }
}

export const SubgraphFetcher = (provider: Provider, ipfsGatewayURL: string) =>
    new Fetcher(provider, ipfsGatewayURL);
