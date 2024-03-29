import {
    KPI_TOKENS_MANAGER_ABI,
    KPI_TOKEN_ABI,
    ORACLE_ABI,
    FACTORY_ABI,
    ORACLES_MANAGER_ABI,
    type SupportedChain,
} from "../commons";
import { KPIToken } from "../entities/kpi-token";
import { type OnChainTemplate, Template } from "../entities/template";
import { Oracle } from "../entities/oracle";
import { validateChainId } from "../utils";
import type {
    FetchKPITokenAddressesParams,
    FetchKPITokensAmountParams,
    FetchKPITokensParams,
    FetchLatestKpiTokenAddressesParams,
    FetchOraclesParams,
    FetchTemplateFeatureEnabledForParams,
    FetchTemplatesParams,
    IPartialCarrotFetcher,
} from "./abstraction";
import type { Address, PublicClient, Transport } from "viem";

class Fetcher implements IPartialCarrotFetcher {
    public supportedInChain(): boolean {
        return true;
    }

    public async fetchKPITokensAmount({
        publicClient,
    }: FetchKPITokensAmountParams): Promise<number> {
        const chain = await validateChainId(publicClient);
        const amount = await publicClient.readContract({
            abi: FACTORY_ABI,
            address: chain.contracts.factory.address,
            functionName: "kpiTokensAmount",
        });
        return Number(amount);
    }

    public async fetchKPITokenAddresses({
        publicClient,
        blacklisted,
        fromIndex,
        toIndex,
    }: FetchKPITokenAddressesParams): Promise<Address[]> {
        const chain = await validateChainId(publicClient);
        const finalFromIndex = !fromIndex || fromIndex < 0 ? 0 : fromIndex;
        const finalToIndex = !toIndex
            ? await this.fetchKPITokensAmount({ publicClient })
            : toIndex;
        const fetchedKPITokens = (await publicClient.readContract({
            abi: FACTORY_ABI,
            address: chain.contracts.factory.address,
            functionName: "enumerate",
            args: [BigInt(finalFromIndex), BigInt(finalToIndex)],
        })) as Address[];
        return blacklisted && blacklisted.length > 0
            ? fetchedKPITokens.filter(
                  (address) => !blacklisted.includes(address),
              )
            : fetchedKPITokens;
    }

    public async fetchLatestKPITokenAddresses({
        publicClient,
        blacklisted,
        limit,
    }: FetchLatestKpiTokenAddressesParams): Promise<Address[]> {
        const chain = await validateChainId(publicClient);
        const finalLimit = limit || 5;
        const toIndex = await this.fetchKPITokensAmount({ publicClient });

        let fromIndex = toIndex - finalLimit > 0 ? toIndex - finalLimit : 0;
        let finalFetchedKPITokens: Address[] = [];
        while (finalFetchedKPITokens.length < finalLimit) {
            if (fromIndex < 0) break;

            const fetchedKPITokens = (await publicClient.readContract({
                abi: FACTORY_ABI,
                address: chain.contracts.factory.address,
                functionName: "enumerate",
                args: [BigInt(fromIndex), BigInt(toIndex)],
            })) as Address[];

            if (fetchedKPITokens.length === 0) break;
            const nonBlacklistedKPITokens =
                blacklisted && blacklisted.length > 0
                    ? fetchedKPITokens.filter(
                          (address) => !blacklisted.includes(address),
                      )
                    : fetchedKPITokens;
            finalFetchedKPITokens = finalFetchedKPITokens.concat(
                nonBlacklistedKPITokens.filter(
                    (address) => !finalFetchedKPITokens.includes(address),
                ),
            );

            fromIndex = fromIndex - (finalLimit - finalFetchedKPITokens.length);
        }
        return finalFetchedKPITokens;
    }

    public async fetchKPITokens({
        publicClient,
        blacklisted,
        addresses,
    }: FetchKPITokensParams): Promise<{ [address: string]: KPIToken }> {
        const chain = await validateChainId(publicClient);
        let tokenAddresses: Address[];
        let kpiTokenAmounts;
        if (addresses && addresses.length > 0) {
            kpiTokenAmounts = addresses.length;
            tokenAddresses = addresses;
        } else {
            kpiTokenAmounts = await this.fetchKPITokensAmount({
                publicClient,
            });
            if (kpiTokenAmounts === 0) return {};
            tokenAddresses = (await publicClient.readContract({
                abi: FACTORY_ABI,
                address: chain.contracts.factory.address,
                functionName: "enumerate",
                args: [0n, BigInt(kpiTokenAmounts)],
            })) as Address[];
        }

        tokenAddresses =
            blacklisted && blacklisted.length > 0
                ? tokenAddresses.filter(
                      (address) => !blacklisted.includes(address),
                  )
                : tokenAddresses;
        const kpiTokenResult = await publicClient.multicall({
            multicallAddress: chain.contracts.multicall3.address,
            allowFailure: false,
            contracts: tokenAddresses.flatMap((address) => {
                return [
                    {
                        address,
                        abi: KPI_TOKEN_ABI,
                        functionName: "finalized",
                    },
                    {
                        address,
                        abi: KPI_TOKEN_ABI,
                        functionName: "description",
                    },
                    {
                        address,
                        abi: KPI_TOKEN_ABI,
                        functionName: "template",
                    },
                    {
                        address,
                        abi: KPI_TOKEN_ABI,
                        functionName: "oracles",
                    },
                    {
                        address,
                        abi: KPI_TOKEN_ABI,
                        functionName: "expiration",
                    },
                    {
                        address,
                        abi: KPI_TOKEN_ABI,
                        functionName: "creationTimestamp",
                    },
                    {
                        address,
                        abi: KPI_TOKEN_ABI,
                        functionName: "owner",
                    },
                ];
            }),
        });

        const allOracleAddresses: Address[] = [];
        for (let i = 3; i < kpiTokenResult.length; i += 7)
            allOracleAddresses.push(...(kpiTokenResult[i] as Address[]));

        const oracles = await this.fetchOracles({
            publicClient,
            addresses: allOracleAddresses,
        });

        const allKPITokens: Record<string, KPIToken> = {};
        const iUpperLimit =
            tokenAddresses && tokenAddresses.length > 0
                ? tokenAddresses.length
                : kpiTokenAmounts;
        outerLoop: for (let i = 0; i < iUpperLimit; i++) {
            const kpiTokenFinalized = kpiTokenResult[i * 7] as boolean;
            const kpiTokenDescriptionCID = kpiTokenResult[i * 7 + 1] as string;

            const kpiTokenTemplate = kpiTokenResult[
                i * 7 + 2
            ] as OnChainTemplate;

            const kpiTokenOracleAddresses = kpiTokenResult[
                i * 7 + 3
            ] as Address[];
            const kpiTokenExpiration = Number(
                kpiTokenResult[i * 7 + 4] as bigint,
            );
            const kpiTokenCreationTimestamp = Number(
                kpiTokenResult[i * 7 + 5] as bigint,
            );
            const kpiTokenOwner = kpiTokenResult[i * 7 + 6] as Address;

            const kpiTokenOracles: Oracle[] = [];
            for (const address of kpiTokenOracleAddresses) {
                const oracle = oracles[address];
                if (!oracle) continue outerLoop;
                kpiTokenOracles.push(oracle);
            }

            const template = new Template(
                Number(kpiTokenTemplate.id),
                kpiTokenTemplate.addrezz,
                Number(kpiTokenTemplate.version),
                kpiTokenTemplate.specification,
            );

            const kpiTokenAddress = tokenAddresses[i];
            allKPITokens[kpiTokenAddress] = new KPIToken(
                chain.id,
                kpiTokenAddress,
                kpiTokenOwner,
                template,
                kpiTokenOracles,
                kpiTokenDescriptionCID,
                kpiTokenExpiration,
                kpiTokenCreationTimestamp,
                kpiTokenFinalized,
            );
        }
        return allKPITokens;
    }

    public async fetchOracles({
        publicClient,
        addresses,
    }: FetchOraclesParams): Promise<{ [address: string]: Oracle }> {
        const chain = await validateChainId(publicClient);

        const oracleAmounts = await publicClient.readContract({
            abi: ORACLES_MANAGER_ABI,
            address: chain.contracts.oraclesManager.address,
            functionName: "templatesAmount",
        });
        if (oracleAmounts == 0n) return {};
        const oracleAddresses =
            addresses && addresses.length > 0
                ? addresses
                : (
                      await publicClient.readContract({
                          abi: ORACLES_MANAGER_ABI,
                          address: chain.contracts.oraclesManager.address,
                          functionName: "enumerateTemplates",
                          args: [0n, oracleAmounts],
                      })
                  ).map((oracle) => oracle.addrezz);

        const oraclesResult = await publicClient.multicall({
            multicallAddress: chain.contracts.multicall3.address,
            allowFailure: false,
            contracts: oracleAddresses.flatMap((address) => {
                return [
                    { address, abi: ORACLE_ABI, functionName: "template" },
                    { address, abi: ORACLE_ABI, functionName: "finalized" },
                ];
            }),
        });

        const oracles: { [address: string]: Oracle } = {};
        for (let i = 0; i < oracleAddresses.length; i++) {
            const {
                id: templateId,
                addrezz: templateAddress,
                specification,
                version,
            } = oraclesResult[i * 2] as OnChainTemplate;
            const oracleAddress = oracleAddresses[i];
            const template = new Template(
                Number(templateId),
                templateAddress,
                Number(version),
                specification,
            );
            oracles[oracleAddress] = new Oracle(
                chain.id,
                oracleAddress,
                template,
                oraclesResult[i * 2 + 1] as boolean,
            );
        }
        return oracles;
    }

    private async fetchTemplates(
        publicClient: PublicClient<Transport, SupportedChain | undefined>,
        managerAddress: Address,
        ids?: number[],
    ): Promise<Template[]> {
        const chain = await validateChainId(publicClient);

        let rawTemplates;
        if (ids && ids.length > 0) {
            rawTemplates = (await publicClient.multicall({
                multicallAddress: chain.contracts.multicall3.address,
                allowFailure: false,
                contracts: ids.map((id) => {
                    return {
                        address: managerAddress,
                        abi: KPI_TOKENS_MANAGER_ABI,
                        functionName: "template",
                        args: [BigInt(id)],
                    };
                }),
            })) as unknown as OnChainTemplate[];
        } else {
            const templatesAmount = await publicClient.readContract({
                abi: KPI_TOKENS_MANAGER_ABI,
                address: managerAddress,
                functionName: "templatesAmount",
            });
            if (templatesAmount == 0n) return [];
            rawTemplates = await publicClient.readContract({
                abi: KPI_TOKENS_MANAGER_ABI,
                address: managerAddress,
                functionName: "enumerateTemplates",
                args: [0n, templatesAmount],
            });
        }

        return rawTemplates.map((rawTemplate) => {
            return new Template(
                Number(rawTemplate.id),
                rawTemplate.addrezz,
                Number(rawTemplate.version),
                rawTemplate.specification,
            );
        });
    }

    public async fetchKPITokenTemplates({
        publicClient,
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const chain = await validateChainId(publicClient);
        return await this.fetchTemplates(
            publicClient,
            chain.contracts.kpiTokensManager.address,
            ids,
        );
    }

    public async fetchOracleTemplates({
        publicClient,
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const chain = await validateChainId(publicClient);
        return await this.fetchTemplates(
            publicClient,
            chain.contracts.oraclesManager.address,
            ids,
        );
    }

    private async fetchTemplateFeatureEnabledFor(
        publicClient: PublicClient,
        managerAddress: Address,
        templateId: number,
        featureId: number,
        account: Address,
    ): Promise<boolean> {
        return await publicClient.readContract({
            address: managerAddress,
            abi: KPI_TOKENS_MANAGER_ABI,
            functionName: "isTemplateFeatureEnabledFor",
            args: [BigInt(templateId), BigInt(featureId), account],
        });
    }

    public async fetchKPITokenTemplateFeatureEnabledFor({
        publicClient,
        templateId,
        featureId,
        account,
    }: FetchTemplateFeatureEnabledForParams): Promise<boolean> {
        const chain = await validateChainId(publicClient);
        return await this.fetchTemplateFeatureEnabledFor(
            publicClient,
            chain.contracts.kpiTokensManager.address,
            templateId,
            featureId,
            account,
        );
    }

    public async fetchOracleTemplateFeatureEnabledFor({
        publicClient,
        templateId,
        featureId,
        account,
    }: FetchTemplateFeatureEnabledForParams): Promise<boolean> {
        const chain = await validateChainId(publicClient);
        return await this.fetchTemplateFeatureEnabledFor(
            publicClient,
            chain.contracts.oraclesManager.address,
            templateId,
            featureId,
            account,
        );
    }
}

export const OnChainFetcher = new Fetcher();
