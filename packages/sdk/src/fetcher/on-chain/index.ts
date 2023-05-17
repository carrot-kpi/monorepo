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
import { Template } from "../../entities/template";
import { Oracle } from "../../entities/oracle";
import { enforce } from "../../utils";
import {
    FetchEntitiesParams,
    FetchKPITokenAddressesParams,
    FetchKPITokensAmountParams,
    FetchTemplatesParams,
    IPartialCarrotFetcher,
} from "../abstraction";
import {
    encodeFunctionData,
    type Address,
    decodeFunctionResult,
    getContract,
    PublicClient,
} from "viem";

// platform related functions
const KPI_TOKEN_TEMPLATE_FUNCTION_DATA = encodeFunctionData({
    abi: KPI_TOKEN_ABI,
    functionName: "template",
});
const KPI_TOKEN_FINALIZED_FUNCTION_DATA = encodeFunctionData({
    abi: KPI_TOKEN_ABI,
    functionName: "finalized",
});
const KPI_TOKEN_DESCRIPTION_FUNCTION_DATA = encodeFunctionData({
    abi: KPI_TOKEN_ABI,
    functionName: "description",
});
const KPI_TOKEN_ORACLES_FUNCTION_DATA = encodeFunctionData({
    abi: KPI_TOKEN_ABI,
    functionName: "oracles",
});
const KPI_TOKEN_EXPIRATION_FUNCTION_DATA = encodeFunctionData({
    abi: KPI_TOKEN_ABI,
    functionName: "expiration",
});
const KPI_TOKEN_CREATION_TIMESTAMP_FUNCTION_DATA = encodeFunctionData({
    abi: KPI_TOKEN_ABI,
    functionName: "creationTimestamp",
});
const KPI_TOKEN_OWNER_FUNCTION_DATA = encodeFunctionData({
    abi: KPI_TOKEN_ABI,
    functionName: "owner",
});

const ORACLE_TEMPLATE_FUNCTION_DATA = encodeFunctionData({
    abi: ORACLE_ABI,
    functionName: "template",
});
const ORACLE_FINALIZED_FUNCTION_DATA = encodeFunctionData({
    abi: ORACLE_ABI,
    functionName: "finalized",
});

// TODO: check if validation can be extracted in its own function
class Fetcher implements IPartialCarrotFetcher {
    public supportedInChain(): boolean {
        return true;
    }

    public async fetchKPITokensAmount({
        publicClient,
    }: FetchKPITokensAmountParams): Promise<number> {
        const chainId = await publicClient.getChainId();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        const amount = await publicClient.readContract({
            abi: FACTORY_ABI,
            address: chainAddresses.factory,
            functionName: "kpiTokensAmount",
        });
        return Number(amount);
    }

    public async fetchKPITokenAddresses({
        publicClient,
        fromIndex,
        toIndex,
    }: FetchKPITokenAddressesParams): Promise<Address[]> {
        const chainId = await publicClient.getChainId();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        const finalFromIndex = !fromIndex || fromIndex < 0 ? 0 : fromIndex;
        const finalToIndex = !toIndex
            ? await this.fetchKPITokensAmount({ publicClient })
            : toIndex;
        return (
            await publicClient.readContract({
                abi: FACTORY_ABI,
                address: chainAddresses.factory,
                functionName: "enumerate",
                args: [BigInt(finalFromIndex), BigInt(finalToIndex)],
            })
        ).slice();
    }

    public async fetchKPITokens({
        publicClient,
        addresses,
    }: FetchEntitiesParams): Promise<{ [address: string]: KPIToken }> {
        const chainId = await publicClient.getChainId();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];

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
                address: chainAddresses.factory,
                functionName: "enumerate",
                args: [0n, BigInt(kpiTokenAmounts)],
            })) as Address[];
        }

        // TODO: try to use publicClient.multicall directly
        const {
            result: [, kpiTokenResult],
        } = await publicClient.simulateContract({
            abi: MULTICALL_ABI,
            address: chainAddresses.multicall,
            functionName: "aggregate",
            args: [
                tokenAddresses.flatMap((target) => {
                    return [
                        { target, callData: KPI_TOKEN_FINALIZED_FUNCTION_DATA },
                        {
                            target,
                            callData: KPI_TOKEN_DESCRIPTION_FUNCTION_DATA,
                        },
                        { target, callData: KPI_TOKEN_TEMPLATE_FUNCTION_DATA },
                        { target, callData: KPI_TOKEN_ORACLES_FUNCTION_DATA },
                        {
                            target,
                            callData: KPI_TOKEN_EXPIRATION_FUNCTION_DATA,
                        },
                        {
                            target,
                            callData:
                                KPI_TOKEN_CREATION_TIMESTAMP_FUNCTION_DATA,
                        },
                        { target, callData: KPI_TOKEN_OWNER_FUNCTION_DATA },
                    ];
                }),
            ],
            value: 0n,
        });

        const allOracleAddresses: Address[] = [];
        for (let i = 3; i < kpiTokenResult.length; i += 7)
            allOracleAddresses.push(
                decodeFunctionResult({
                    abi: KPI_TOKEN_ABI,
                    functionName: "oracles",
                    data: kpiTokenResult[i],
                })[0]
            );

        const oracles = await this.fetchOracles({
            publicClient,
            addresses: allOracleAddresses,
        });

        const allKPITokens: Record<string, KPIToken> = {};
        const iUpperLimit =
            addresses && addresses.length > 0
                ? addresses.length
                : kpiTokenAmounts;
        outerLoop: for (let i = 0; i < iUpperLimit; i++) {
            const kpiTokenFinalized = decodeFunctionResult({
                abi: KPI_TOKEN_ABI,
                functionName: "finalized",
                data: kpiTokenResult[i * 7],
            });

            const kpiTokenDescriptionCID = decodeFunctionResult({
                abi: KPI_TOKEN_ABI,
                functionName: "description",
                data: kpiTokenResult[i * 7 + 1],
            });

            const kpiTokenTemplate = decodeFunctionResult({
                abi: KPI_TOKEN_ABI,
                functionName: "template",
                data: kpiTokenResult[i * 7 + 2],
            });

            const kpiTokenOracleAddresses = decodeFunctionResult({
                abi: KPI_TOKEN_ABI,
                functionName: "oracles",
                data: kpiTokenResult[i * 7 + 3],
            });

            const kpiTokenExpiration = Number(
                decodeFunctionResult({
                    abi: KPI_TOKEN_ABI,
                    functionName: "expiration",
                    data: kpiTokenResult[i * 7 + 4],
                })
            );

            const kpiTokenCreationTimestamp = Number(
                decodeFunctionResult({
                    abi: KPI_TOKEN_ABI,
                    functionName: "creationTimestamp",
                    data: kpiTokenResult[i * 7 + 5],
                })
            );

            const kpiTokenOwner = decodeFunctionResult({
                abi: KPI_TOKEN_ABI,
                functionName: "owner",
                data: kpiTokenResult[i * 7 + 6],
            });

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
                kpiTokenTemplate.specification
            );

            const kpiTokenAddress = tokenAddresses[i];
            allKPITokens[kpiTokenAddress] = new KPIToken(
                chainId,
                kpiTokenAddress,
                kpiTokenOwner,
                template,
                kpiTokenOracles,
                kpiTokenDescriptionCID,
                kpiTokenExpiration,
                kpiTokenCreationTimestamp,
                kpiTokenFinalized
            );
        }
        return allKPITokens;
    }

    public async fetchOracles({
        publicClient,
        addresses,
    }: FetchEntitiesParams): Promise<{ [address: string]: Oracle }> {
        const chainId = await publicClient.getChainId();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        const oraclesManager = getContract({
            abi: ORACLES_MANAGER_ABI,
            address: chainAddresses.oraclesManager,
            publicClient: publicClient,
        });

        const oracleAmounts = await oraclesManager.read.templatesAmount();
        if (oracleAmounts == 0n) return {};
        const oracleAddresses =
            addresses && addresses.length > 0
                ? addresses
                : (
                      await oraclesManager.read.enumerate([0n, oracleAmounts])
                  ).map((oracle) => oracle.addrezz);

        const {
            result: [, oraclesResult],
        } = await publicClient.simulateContract({
            abi: MULTICALL_ABI,
            address: chainAddresses.multicall,
            functionName: "aggregate",
            args: [
                oracleAddresses.flatMap((target) => {
                    return [
                        { target, callData: ORACLE_TEMPLATE_FUNCTION_DATA },
                        { target, callData: ORACLE_FINALIZED_FUNCTION_DATA },
                    ];
                }),
            ],
            value: 0n,
        });

        const oracles: { [address: string]: Oracle } = {};
        for (let i = 0; i < oracleAddresses.length; i++) {
            const {
                id: templateId,
                addrezz: templateAddress,
                specification,
                version,
            } = decodeFunctionResult({
                abi: ORACLE_ABI,
                functionName: "template",
                data: oraclesResult[i * 2],
            });
            const oracleAddress = oracleAddresses[i];
            const template = new Template(
                Number(templateId),
                templateAddress,
                Number(version),
                specification
            );
            oracles[oracleAddress] = new Oracle(
                chainId,
                oracleAddress,
                template,
                decodeFunctionResult({
                    abi: ORACLE_ABI,
                    functionName: "finalized",
                    data: oraclesResult[i * 2 + 1],
                })
            );
        }
        return oracles;
    }

    private async fetchTemplates(
        chainId: ChainId,
        publicClient: PublicClient,
        managerAddress: Address,
        ids?: number[]
    ): Promise<Template[]> {
        const managerContract = getContract({
            abi: KPI_TOKENS_MANAGER_ABI,
            address: managerAddress,
            publicClient: publicClient,
        });

        let rawTemplates;
        if (ids && ids.length > 0) {
            const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];

            const {
                result: [, result],
            } = await publicClient.simulateContract({
                abi: MULTICALL_ABI,
                address: chainAddresses.multicall,
                functionName: "aggregate",
                args: [
                    ids.map((id) => {
                        return {
                            target: managerAddress,
                            callData: encodeFunctionData({
                                abi: KPI_TOKENS_MANAGER_ABI,
                                functionName: "template",
                                args: [BigInt(id)],
                            }),
                        };
                    }),
                ],
                value: 0n,
            });
            rawTemplates = result.map(
                // eslint-disable-next-line
                (wrappedTemplate: any) =>
                    decodeFunctionResult({
                        abi: KPI_TOKENS_MANAGER_ABI,
                        functionName: "template",
                        data: wrappedTemplate,
                    })
            );
        } else {
            const templatesAmount =
                await managerContract.read.templatesAmount();
            if (templatesAmount == 0n) return [];
            rawTemplates = await managerContract.read.enumerate([
                0n,
                templatesAmount,
            ]);
        }

        return rawTemplates.map((rawTemplate) => {
            return new Template(
                Number(rawTemplate.id),
                rawTemplate.addrezz,
                Number(rawTemplate.version),
                rawTemplate.specification
            );
        });
    }

    public async fetchKPITokenTemplates({
        publicClient,
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const chainId = await publicClient.getChainId();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        return await this.fetchTemplates(
            chainId,
            publicClient,
            CHAIN_ADDRESSES[chainId as ChainId].kpiTokensManager,
            ids
        );
    }

    public async fetchOracleTemplates({
        publicClient,
        ids,
    }: FetchTemplatesParams): Promise<Template[]> {
        const chainId = await publicClient.getChainId();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        return await this.fetchTemplates(
            chainId,
            publicClient,
            CHAIN_ADDRESSES[chainId as ChainId].oraclesManager,
            ids
        );
    }
}

export const OnChainFetcher = new Fetcher();
