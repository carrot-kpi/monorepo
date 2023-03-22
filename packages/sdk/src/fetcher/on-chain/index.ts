import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { Interface } from "@ethersproject/abi";
import {
    KPI_TOKENS_MANAGER_ABI,
    CHAIN_ADDRESSES,
    KPI_TOKEN_ABI,
    ORACLE_ABI,
    FACTORY_ABI,
    MULTICALL_ABI,
    ChainId,
    ORACLES_MANAGER_ABI,
} from "../../commons";
import { KPIToken } from "../../entities/kpi-token";
import { Template, TemplateSpecification } from "../../entities/template";
import { Oracle } from "../../entities/oracle";
import { isCID, enforce } from "../../utils";
import { CoreFetcher } from "../core";
import {
    FetchEntitiesParams,
    FetchKPITokenAddressesParams,
    FetchKPITokensAmountParams,
    FetchTemplatesParams,
    IPartialCarrotFetcher,
} from "../abstraction";
import { searchKPItokens } from "../search";
import { KPITokensObject } from "../serializer";

// platform related interfaces
const KPI_TOKEN_INTERFACE = new Interface(KPI_TOKEN_ABI);
const ORACLE_INTERFACE = new Interface(ORACLE_ABI);
const KPI_TOKENS_MANAGER_INTERFACE = new Interface(KPI_TOKENS_MANAGER_ABI);

// platform related functions
const KPI_TOKEN_TEMPLATE_FUNCTION =
    KPI_TOKEN_INTERFACE.getFunction("template()");
const KPI_TOKEN_FINALIZED_FUNCTION =
    KPI_TOKEN_INTERFACE.getFunction("finalized()");
const KPI_TOKEN_DESCRIPTION_FUNCTION =
    KPI_TOKEN_INTERFACE.getFunction("description()");
const KPI_TOKEN_ORACLES_FUNCTION = KPI_TOKEN_INTERFACE.getFunction("oracles()");
const KPI_TOKEN_EXPIRATION_FUNCTION =
    KPI_TOKEN_INTERFACE.getFunction("expiration()");
const KPI_TOKEN_CREATION_TIMESTAMP_FUNCTION = KPI_TOKEN_INTERFACE.getFunction(
    "creationTimestamp()"
);
const KPI_TOKEN_OWNER_FUNCTION = KPI_TOKEN_INTERFACE.getFunction("owner()");

const ORACLE_TEMPLATE_FUNCTION = ORACLE_INTERFACE.getFunction("template()");
const ORACLE_FINALIZED_FUNCTION =
    KPI_TOKEN_INTERFACE.getFunction("finalized()");

const MANAGER_TEMPLATE_FUNCTION =
    KPI_TOKENS_MANAGER_INTERFACE.getFunction("template(uint256)");

// platform related function data
const KPI_TOKEN_TEMPLATE_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(
    KPI_TOKEN_TEMPLATE_FUNCTION
);
const KPI_TOKEN_FINALIZED_FUNCTION_DATA =
    KPI_TOKEN_INTERFACE.encodeFunctionData(KPI_TOKEN_FINALIZED_FUNCTION);
const KPI_TOKEN_DESCRIPTION_FUNCTION_DATA =
    KPI_TOKEN_INTERFACE.encodeFunctionData(KPI_TOKEN_DESCRIPTION_FUNCTION);
const KPI_TOKEN_ORACLES_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(
    KPI_TOKEN_ORACLES_FUNCTION
);
const KPI_TOKEN_EXPIRATION_FUNCTION_DATA =
    KPI_TOKEN_INTERFACE.encodeFunctionData(KPI_TOKEN_EXPIRATION_FUNCTION);
const KPI_TOKEN_CREATION_TIMESTAMP_FUNCTION_DATA =
    KPI_TOKEN_INTERFACE.encodeFunctionData(
        KPI_TOKEN_CREATION_TIMESTAMP_FUNCTION
    );
const KPI_TOKEN_OWNER_FUNCTION_DATA = KPI_TOKEN_INTERFACE.encodeFunctionData(
    KPI_TOKEN_OWNER_FUNCTION
);

const ORACLE_TEMPLATE_FUNCTION_DATA = ORACLE_INTERFACE.encodeFunctionData(
    ORACLE_TEMPLATE_FUNCTION
);
const ORACLE_FINALIZED_FUNCTION_DATA = ORACLE_INTERFACE.encodeFunctionData(
    ORACLE_FINALIZED_FUNCTION
);

// TODO: check if validation can be extracted in its own function
class Fetcher implements IPartialCarrotFetcher {
    public supportedInChain(): boolean {
        return true;
    }

    public async fetchKPITokensAmount({
        provider,
    }: FetchKPITokensAmountParams): Promise<number> {
        const { chainId } = await provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        const factoryContract = new Contract(
            chainAddresses.factory,
            FACTORY_ABI,
            provider
        );
        return (await factoryContract.kpiTokensAmount()).toNumber();
    }

    public async fetchKPITokenAddresses({
        provider,
        fromIndex,
        toIndex,
    }: FetchKPITokenAddressesParams): Promise<string[]> {
        const { chainId } = await provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        const factoryContract = new Contract(
            chainAddresses.factory,
            FACTORY_ABI,
            provider
        );
        const finalFromIndex = !fromIndex || fromIndex < 0 ? 0 : fromIndex;
        const finalToIndex = !toIndex
            ? await this.fetchKPITokensAmount({ provider })
            : toIndex;
        return await factoryContract.enumerate(finalFromIndex, finalToIndex);
    }

    public async fetchKPITokens({
        provider,
        ipfsGatewayURL,
        addresses,
        searchQuery,
    }: FetchEntitiesParams): Promise<{ [address: string]: KPIToken }> {
        const { chainId } = await provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        const multicall = new Contract(
            chainAddresses.multicall,
            MULTICALL_ABI,
            provider
        );
        const factoryContract = new Contract(
            chainAddresses.factory,
            FACTORY_ABI,
            provider
        );

        let tokenAddresses;
        let kpiTokenAmounts;
        if (addresses && addresses.length > 0) {
            kpiTokenAmounts = addresses.length;
            tokenAddresses = addresses;
        } else {
            kpiTokenAmounts = await this.fetchKPITokensAmount({
                provider,
            });
            if (kpiTokenAmounts === 0) return {};
            tokenAddresses = await factoryContract.enumerate(
                0,
                kpiTokenAmounts
            );
        }

        const [, kpiTokenResult] = await multicall.callStatic.aggregate(
            tokenAddresses.flatMap((address: string) => {
                return [
                    [address, KPI_TOKEN_FINALIZED_FUNCTION_DATA],
                    [address, KPI_TOKEN_DESCRIPTION_FUNCTION_DATA],
                    [address, KPI_TOKEN_TEMPLATE_FUNCTION_DATA],
                    [address, KPI_TOKEN_ORACLES_FUNCTION_DATA],
                    [address, KPI_TOKEN_EXPIRATION_FUNCTION_DATA],
                    [address, KPI_TOKEN_CREATION_TIMESTAMP_FUNCTION_DATA],
                    [address, KPI_TOKEN_OWNER_FUNCTION_DATA],
                ];
            })
        );

        const allKPITokenTemplateSpecificationCids: string[] = [];
        for (let i = 2; i < kpiTokenResult.length; i += 7) {
            const cid = KPI_TOKEN_INTERFACE.decodeFunctionResult(
                KPI_TOKEN_TEMPLATE_FUNCTION,
                kpiTokenResult[i]
            )[0].specification;
            if (
                !!isCID(cid) &&
                allKPITokenTemplateSpecificationCids.indexOf(cid) < 0
            )
                allKPITokenTemplateSpecificationCids.push(cid);
        }
        const kpiTokenTemplateSpecifications =
            await CoreFetcher.fetchContentFromIPFS({
                ipfsGatewayURL,
                cids: allKPITokenTemplateSpecificationCids.map(
                    (cid) => `${cid}/base.json`
                ),
            });

        const allKPITokenDescriptionCids: string[] = [];
        for (let i = 1; i < kpiTokenResult.length; i += 7) {
            const cid = KPI_TOKEN_INTERFACE.decodeFunctionResult(
                KPI_TOKEN_DESCRIPTION_FUNCTION,
                kpiTokenResult[i]
            )[0];
            if (!!isCID(cid) && allKPITokenDescriptionCids.indexOf(cid) < 0)
                allKPITokenDescriptionCids.push(cid);
        }
        const kpiTokenDescriptions = await CoreFetcher.fetchContentFromIPFS({
            ipfsGatewayURL,
            cids: allKPITokenDescriptionCids,
        });

        const allOracleAddresses: string[] = [];
        for (let i = 3; i < kpiTokenResult.length; i += 7)
            allOracleAddresses.push(
                ...KPI_TOKEN_INTERFACE.decodeFunctionResult(
                    KPI_TOKEN_ORACLES_FUNCTION,
                    kpiTokenResult[i]
                )[0]
            );

        const oracles = await this.fetchOracles({
            provider,
            ipfsGatewayURL,
            addresses: allOracleAddresses,
        });

        const allKPITokens: KPITokensObject = {};
        const iUpperLimit =
            addresses && addresses.length > 0
                ? addresses.length
                : kpiTokenAmounts;
        outerLoop: for (let i = 0; i < iUpperLimit; i++) {
            const kpiTokenTemplate = KPI_TOKEN_INTERFACE.decodeFunctionResult(
                KPI_TOKEN_TEMPLATE_FUNCTION,
                kpiTokenResult[i * 7 + 2]
            )[0];
            const rawKPITokenTemplateSpecification = JSON.parse(
                kpiTokenTemplateSpecifications[
                    `${kpiTokenTemplate.specification}/base.json`
                ]
            );
            if (!rawKPITokenTemplateSpecification) continue;

            const kpiTokenFinalized = KPI_TOKEN_INTERFACE.decodeFunctionResult(
                KPI_TOKEN_FINALIZED_FUNCTION,
                kpiTokenResult[i * 7]
            )[0];
            const kpiTokenDescriptionCid =
                KPI_TOKEN_INTERFACE.decodeFunctionResult(
                    KPI_TOKEN_DESCRIPTION_FUNCTION,
                    kpiTokenResult[i * 7 + 1]
                )[0];
            const description = JSON.parse(
                kpiTokenDescriptions[kpiTokenDescriptionCid]
            );
            if (!description) continue;
            const kpiTokenOracleAddresses =
                KPI_TOKEN_INTERFACE.decodeFunctionResult(
                    KPI_TOKEN_ORACLES_FUNCTION,
                    kpiTokenResult[i * 7 + 3]
                )[0];
            const kpiTokenExpiration = KPI_TOKEN_INTERFACE.decodeFunctionResult(
                KPI_TOKEN_EXPIRATION_FUNCTION,
                kpiTokenResult[i * 7 + 4]
            )[0].toNumber();
            const kpiTokenCreationTimestamp =
                KPI_TOKEN_INTERFACE.decodeFunctionResult(
                    KPI_TOKEN_CREATION_TIMESTAMP_FUNCTION,
                    kpiTokenResult[i * 7 + 5]
                )[0].toNumber();
            const kpiTokenOwner = KPI_TOKEN_INTERFACE.decodeFunctionResult(
                KPI_TOKEN_OWNER_FUNCTION,
                kpiTokenResult[i * 7 + 6]
            )[0];

            const kpiTokenOracles: Oracle[] = [];
            for (const address of kpiTokenOracleAddresses) {
                const oracle = oracles[address];
                if (!oracle) continue outerLoop;
                kpiTokenOracles.push(oracle);
            }

            const template = new Template(
                kpiTokenTemplate.id.toNumber(),
                kpiTokenTemplate.addrezz,
                kpiTokenTemplate.version,
                new TemplateSpecification(
                    kpiTokenTemplate.specification,
                    rawKPITokenTemplateSpecification.name,
                    rawKPITokenTemplateSpecification.description,
                    rawKPITokenTemplateSpecification.tags,
                    rawKPITokenTemplateSpecification.repository,
                    rawKPITokenTemplateSpecification.commitHash
                )
            );

            const kpiTokenAddress = tokenAddresses[i];
            allKPITokens[kpiTokenAddress] = new KPIToken(
                chainId,
                kpiTokenAddress,
                kpiTokenOwner,
                template,
                kpiTokenOracles,
                description,
                kpiTokenExpiration,
                kpiTokenCreationTimestamp,
                kpiTokenFinalized
            );
        }

        if (searchQuery) return searchKPItokens(searchQuery, allKPITokens);

        return allKPITokens;
    }

    public async fetchOracles({
        provider,
        ipfsGatewayURL,
        addresses,
    }: FetchEntitiesParams): Promise<{ [address: string]: Oracle }> {
        const { chainId } = await provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        const multicall = new Contract(
            chainAddresses.multicall,
            MULTICALL_ABI,
            provider
        );
        const oraclesManagerContract = new Contract(
            chainAddresses.oraclesManager,
            ORACLES_MANAGER_ABI,
            provider
        );

        const oracleAmounts = await oraclesManagerContract.templatesAmount();
        if (oracleAmounts.isZero()) return {};
        const oracleAddresses =
            addresses && addresses.length > 0
                ? addresses
                : await oraclesManagerContract.enumerate(0, oracleAmounts);

        const [, oraclesResult] = await multicall.callStatic.aggregate(
            oracleAddresses.flatMap((address: string) => {
                return [
                    [address, ORACLE_TEMPLATE_FUNCTION_DATA],
                    [address, ORACLE_FINALIZED_FUNCTION_DATA],
                ];
            })
        );

        const allOracleSpecificationCids: string[] = [];
        for (let i = 0; i < oraclesResult.length; i += 2) {
            const cid = ORACLE_INTERFACE.decodeFunctionResult(
                ORACLE_TEMPLATE_FUNCTION,
                oraclesResult[i]
            )[0].specification;
            if (!!isCID(cid) && allOracleSpecificationCids.indexOf(cid) < 0)
                allOracleSpecificationCids.push(cid);
        }
        const oracleTemplateSpecifications =
            await CoreFetcher.fetchContentFromIPFS({
                ipfsGatewayURL,
                cids: allOracleSpecificationCids.map(
                    (cid) => `${cid}/base.json`
                ),
            });

        const oracles: { [address: string]: Oracle } = {};
        for (let i = 0; i < oracleAddresses.length; i++) {
            const {
                id: templateId,
                addrezz: templateAddress,
                specification,
                version,
            } = ORACLE_INTERFACE.decodeFunctionResult(
                ORACLE_TEMPLATE_FUNCTION,
                oraclesResult[i * 2]
            )[0];
            const unparsedSpecification =
                oracleTemplateSpecifications[`${specification}/base.json`];
            if (!unparsedSpecification) continue;
            const parsedSpecification = JSON.parse(unparsedSpecification);
            const oracleAddress = oracleAddresses[i];
            const template = new Template(
                templateId,
                templateAddress,
                version,
                new TemplateSpecification(
                    specification,
                    parsedSpecification.name,
                    parsedSpecification.description,
                    parsedSpecification.tags,
                    parsedSpecification.repository,
                    parsedSpecification.commitHash
                )
            );
            oracles[oracleAddress] = new Oracle(
                chainId,
                oracleAddress,
                template,
                ORACLE_INTERFACE.decodeFunctionResult(
                    ORACLE_FINALIZED_FUNCTION,
                    oraclesResult[i * 2 + 1]
                )[0]
            );
        }
        return oracles;
    }

    private async fetchTemplates(
        chainId: ChainId,
        ipfsGatewayURL: string,
        managerContract: Contract,
        ids?: BigNumberish[]
    ): Promise<Template[]> {
        let rawTemplates: {
            id: BigNumber;
            addrezz: string;
            version: BigNumber;
            specification: string;
        }[];
        if (ids && ids.length > 0) {
            const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
            const multicall = new Contract(
                chainAddresses.multicall,
                MULTICALL_ABI,
                managerContract.provider
            );
            const [, result] = await multicall.callStatic.aggregate(
                ids.map((id) => {
                    return [
                        managerContract.address,
                        KPI_TOKENS_MANAGER_INTERFACE.encodeFunctionData(
                            MANAGER_TEMPLATE_FUNCTION,
                            [id]
                        ),
                    ];
                })
            );
            rawTemplates = result.map(
                // eslint-disable-next-line
                (wrappedTemplate: any) =>
                    KPI_TOKENS_MANAGER_INTERFACE.decodeFunctionResult(
                        MANAGER_TEMPLATE_FUNCTION,
                        wrappedTemplate
                    )[0]
            );
        } else {
            const templatesAmount = await managerContract.templatesAmount();
            if (templatesAmount == 0) return [];
            rawTemplates = await managerContract.enumerate(0, templatesAmount);
        }

        const specifications = await CoreFetcher.fetchContentFromIPFS({
            ipfsGatewayURL,
            cids: rawTemplates.map(
                (rawTemplate) => `${rawTemplate.specification}/base.json`
            ),
        });

        return rawTemplates.map((rawTemplate) => {
            const parsedSpecification = JSON.parse(
                specifications[`${rawTemplate.specification}/base.json`]
            );
            return new Template(
                rawTemplate.id.toNumber(),
                rawTemplate.addrezz,
                rawTemplate.version.toNumber(),
                new TemplateSpecification(
                    rawTemplate.specification,
                    parsedSpecification.name,
                    parsedSpecification.description,
                    parsedSpecification.tags,
                    parsedSpecification.repository,
                    parsedSpecification.commitHash
                )
            );
        });
    }

    public async fetchKPITokenTemplates({
        provider,
        ipfsGatewayURL,
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const { chainId } = await provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        return await this.fetchTemplates(
            chainId,
            ipfsGatewayURL,
            new Contract(
                CHAIN_ADDRESSES[chainId as ChainId].kpiTokensManager,
                KPI_TOKENS_MANAGER_ABI,
                provider
            ),
            ids
        );
    }

    public async fetchOracleTemplates({
        provider,
        ipfsGatewayURL,
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const { chainId } = await provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        return await this.fetchTemplates(
            chainId,
            ipfsGatewayURL,
            new Contract(
                CHAIN_ADDRESSES[chainId as ChainId].oraclesManager,
                ORACLES_MANAGER_ABI,
                provider
            ),
            ids
        );
    }
}

export const OnChainFetcher = new Fetcher();
