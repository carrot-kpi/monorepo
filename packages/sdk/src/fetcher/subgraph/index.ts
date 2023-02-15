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
import { Template, TemplateSpecification } from "../../entities/template";
import { Oracle } from "../../entities/oracle";
import { query } from "../../utils/subgraph";
import { CoreFetcher } from "../core";

const PAGE_SIZE = 100;

const mapRawTemplate = async (rawOracleTemplate: TemplateData) => {
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
            await CoreFetcher.fetchContentFromIPFS({ cids: [cid] })
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

const mapRawOracle = async (chainId: ChainId, rawOracle: OracleData) => {
    return new Oracle(
        chainId,
        getAddress(rawOracle.rawAddress),
        await mapRawTemplate(rawOracle.template),
        rawOracle.finalized
    );
};

const mapRawKPIToken = async (chainId: ChainId, rawKPIToken: KPITokenData) => {
    let title, description, tags;
    if (
        !rawKPIToken.description ||
        !rawKPIToken.description.title ||
        !rawKPIToken.description.description ||
        !rawKPIToken.description.tags
    ) {
        const cid = rawKPIToken.descriptionCid;
        const rawDescription = (
            await CoreFetcher.fetchContentFromIPFS({ cids: [cid] })
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
        await mapRawTemplate(rawKPIToken.template),
        await Promise.all(
            rawKPIToken.oracles.map(async (rawOracle) => {
                return mapRawOracle(chainId, rawOracle);
            })
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
                    .slice(fromIndex, toIndex + 1)
                    .map((address) => address.toLowerCase());
                const { tokens: rawKPITokens } =
                    await query<GetKPITokensQueryResponse>(
                        subgraphURL,
                        GetKPITokenByAddressesQuery,
                        { addresses: addressesChunk }
                    );
                if (rawKPITokens.length === 0) break;
                await Promise.all(
                    rawKPITokens.map(async (rawKPIToken) => {
                        const kpiToken = await mapRawKPIToken(
                            chainId,
                            rawKPIToken
                        );
                        kpiTokens[kpiToken.address] = kpiToken;
                    })
                );
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
                await Promise.all(
                    page.map(async (rawKPIToken) => {
                        const kpiToken = await mapRawKPIToken(
                            chainId,
                            rawKPIToken
                        );
                        kpiTokens[kpiToken.address] = kpiToken;
                    })
                );
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
                    .slice(fromIndex, toIndex + 1)
                    .map((address) => address.toLowerCase());
                const { oracles: rawOracles } =
                    await query<GetOraclesQueryResponse>(
                        subgraphURL,
                        GetOracleByAddressesQuery,
                        { addresses: addressesChunk }
                    );
                if (rawOracles.length === 0) break;
                await Promise.all(
                    rawOracles.map(async (rawOracle) => {
                        const oracle = await mapRawOracle(chainId, rawOracle);
                        oracles[oracle.address] = oracle;
                    })
                );
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
                await Promise.all(
                    page.map(async (rawOracle) => {
                        const oracle = await mapRawOracle(chainId, rawOracle);
                        oracles[oracle.address] = oracle;
                    })
                );
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
