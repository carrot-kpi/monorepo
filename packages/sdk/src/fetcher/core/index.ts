import {
    MULTICALL_ABI,
    ChainId,
    ERC20_ABI,
    CHAIN_ADDRESSES,
} from "../../commons";
import {
    cacheERC20Token,
    enforce,
    getCachedERC20Token,
    warn,
} from "../../utils";
import {
    Address,
    getContract,
    encodeFunctionData,
    decodeFunctionResult,
} from "viem";
import { Token } from "../../entities/token";
import BYTES_NAME_ERC20_ABI from "../../abis/erc20-name-bytes";
import BYTES_SYMBOL_ERC20_ABI from "../../abis/erc20-symbol-bytes";
import {
    FetchContentFromIPFSParams,
    FetchERC20TokensParams,
    ICoreFetcher,
    ResolveKPITokensParams,
    ResolveOraclesParams,
    ResolveTemplatesParams,
} from "../abstraction";
import { KPIToken, ResolvedKPIToken } from "../../entities/kpi-token";
import { Oracle, ResolvedOracle } from "../../entities/oracle";
import {
    ResolvedTemplate,
    TemplateSpecification,
} from "../../entities/template";
import { ResolvedKPITokensMap, ResolvedOraclesMap } from "../types";

// erc20 related function datas
const ERC20_NAME_FUNCTION_DATA = encodeFunctionData({
    abi: ERC20_ABI,
    functionName: "name",
});
const ERC20_SYMBOL_FUNCTION_DATA = encodeFunctionData({
    abi: ERC20_ABI,
    functionName: "symbol",
});
const ERC20_DECIMALS_FUNCTION_DATA = encodeFunctionData({
    abi: ERC20_ABI,
    functionName: "decimals",
});
const ERC20_BYTES_NAME_FUNCTION_DATA = encodeFunctionData({
    abi: BYTES_NAME_ERC20_ABI,
    functionName: "name",
});
const ERC20_BYTES_SYMBOL_FUNCTION_DATA = encodeFunctionData({
    abi: BYTES_SYMBOL_ERC20_ABI,
    functionName: "symbol",
});

// TODO: check if validation can be extracted in its own function
export class CoreFetcher implements ICoreFetcher {
    public async fetchERC20Tokens({
        publicClient,
        addresses,
    }: FetchERC20TokensParams): Promise<{ [address: Address]: Token }> {
        const chainId = (await publicClient.getChainId()) as ChainId;
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const { cachedTokens, missingTokens } = addresses.reduce(
            (
                accumulator: {
                    cachedTokens: { [address: Address]: Token };
                    missingTokens: Address[];
                },
                address
            ) => {
                const cachedToken = getCachedERC20Token(chainId, address);
                if (!!cachedToken)
                    accumulator.cachedTokens[address] = cachedToken;
                else accumulator.missingTokens.push(address);
                return accumulator;
            },
            { cachedTokens: {}, missingTokens: [] }
        );
        if (missingTokens.length === 0) return cachedTokens;

        const multicall = getContract({
            address: CHAIN_ADDRESSES[chainId].multicall,
            abi: MULTICALL_ABI,
            publicClient: publicClient,
        });

        const calls = addresses.flatMap((target) => [
            { target, callData: ERC20_NAME_FUNCTION_DATA },
            { target, callData: ERC20_SYMBOL_FUNCTION_DATA },
            { target, callData: ERC20_DECIMALS_FUNCTION_DATA },
            { target, callData: ERC20_BYTES_NAME_FUNCTION_DATA },
            { target, callData: ERC20_BYTES_SYMBOL_FUNCTION_DATA },
        ]);

        const { result } = await multicall.simulate.tryAggregate([
            false,
            calls,
        ]);
        const fetchedTokens = missingTokens.reduce(
            (
                accumulator: { [address: string]: Token },
                missingToken,
                index
            ) => {
                const wrappedName = result[index * 5];
                const wrappedSymbol = result[index * 5 + 1];
                const wrappedDecimals = result[index * 5 + 2];
                const wrappedBytesName = result[index * 5 + 3];
                const wrappedBytesSymbol = result[index * 5 + 4];
                if (
                    (!wrappedSymbol.success && !wrappedBytesSymbol.success) ||
                    (!wrappedName.success && wrappedBytesName.success) ||
                    !wrappedDecimals.success
                ) {
                    console.warn(
                        `could not fetch ERC20 data for address ${missingToken}`
                    );
                    return accumulator;
                }

                let name;
                try {
                    name = decodeFunctionResult({
                        abi: ERC20_ABI,
                        functionName: "name",
                        data: wrappedName.returnData,
                    })[0];
                } catch (error) {
                    try {
                        name = decodeFunctionResult({
                            abi: BYTES_NAME_ERC20_ABI,
                            functionName: "name",
                            data: wrappedBytesName.returnData,
                        })[0];
                    } catch (error) {
                        console.warn(
                            `could not decode ERC20 token name for address ${missingToken}`
                        );
                        return accumulator;
                    }
                }

                let symbol;
                try {
                    symbol = decodeFunctionResult({
                        abi: ERC20_ABI,
                        functionName: "symbol",
                        data: wrappedSymbol.returnData,
                    })[0];
                } catch (error) {
                    try {
                        symbol = decodeFunctionResult({
                            abi: BYTES_SYMBOL_ERC20_ABI,
                            functionName: "symbol",
                            data: wrappedBytesSymbol.returnData,
                        });
                    } catch (error) {
                        console.warn(
                            `could not decode ERC20 token symbol for address ${missingToken}`
                        );
                        return accumulator;
                    }
                }

                try {
                    const token = new Token(
                        chainId,
                        missingToken,
                        decodeFunctionResult({
                            abi: ERC20_ABI,
                            functionName: "decimals",
                            data: wrappedDecimals.returnData,
                        }),
                        symbol,
                        name
                    );
                    cacheERC20Token(token);
                    accumulator[missingToken] = token;
                } catch (error) {
                    console.error(
                        `error decoding ERC20 data for address ${missingToken}`
                    );
                    throw error;
                }
                return accumulator;
            },
            {}
        );

        return { ...cachedTokens, ...fetchedTokens };
    }

    public async fetchContentFromIPFS({
        ipfsGatewayURL,
        cids,
    }: FetchContentFromIPFSParams): Promise<{ [cid: string]: string }> {
        const allContents = await Promise.allSettled(
            cids.map(async (cid) => {
                const response = await fetch(`${ipfsGatewayURL}/ipfs/${cid}`);
                const responseOk = response.ok;
                warn(responseOk, `could not fetch content with cid ${cid}`);
                return {
                    cid,
                    content: responseOk ? await response.text() : null,
                };
            })
        );
        const contents: { [cid: string]: string } = {};
        for (const contentPromise of allContents) {
            if (contentPromise.status !== "fulfilled") continue;
            const { cid, content } = contentPromise.value;
            if (!content) continue;
            contents[cid] = content;
        }
        return contents;
    }

    public async resolveTemplates({
        ipfsGatewayURL,
        templates,
    }: ResolveTemplatesParams): Promise<ResolvedTemplate[]> {
        return Promise.all(
            templates.map(async (template) => {
                const templateSpecificationCID = template.specificationCID;
                const resolvedTemplateSpecificationCID = `${templateSpecificationCID}/base.json`;
                const rawTemplateSpecification = (
                    await this.fetchContentFromIPFS({
                        ipfsGatewayURL,
                        cids: [resolvedTemplateSpecificationCID],
                    })
                )[resolvedTemplateSpecificationCID];
                if (!rawTemplateSpecification)
                    throw new Error(
                        `couldn't fetch template specification with cid ${templateSpecificationCID}`
                    );
                const parsedTemplateSpecification = JSON.parse(
                    rawTemplateSpecification
                );
                const specification = new TemplateSpecification(
                    templateSpecificationCID,
                    parsedTemplateSpecification.name,
                    parsedTemplateSpecification.description,
                    parsedTemplateSpecification.tags,
                    parsedTemplateSpecification.repository,
                    parsedTemplateSpecification.commitHash,
                    parsedTemplateSpecification.stagingURL
                );
                return ResolvedTemplate.from(template, specification);
            })
        );
    }

    protected async resolveEntity<T extends KPIToken | Oracle = KPIToken>({
        ipfsGatewayURL,
        entity,
    }: {
        entity: T;
        ipfsGatewayURL: string;
    }): Promise<T extends KPIToken ? ResolvedKPIToken : ResolvedOracle> {
        const template = (
            await this.resolveTemplates({
                ipfsGatewayURL,
                templates: [entity.template],
            })
        )[0];

        if (!("oracles" in entity))
            // FIXME: this is ugly but the ts compiler is complaining otherwise (not sure why)
            return ResolvedOracle.from(entity, template) as T extends KPIToken
                ? ResolvedKPIToken
                : ResolvedOracle;

        const oracles = await Promise.all(
            entity.oracles.map(async (oracle) => {
                return ResolvedOracle.from(
                    oracle,
                    (
                        await this.resolveTemplates({
                            ipfsGatewayURL,
                            templates: [oracle.template],
                        })
                    )[0]
                );
            })
        );

        const resolvedKPITokenSpecification = (
            await this.fetchContentFromIPFS({
                ipfsGatewayURL,
                cids: [entity.specificationCID],
            })
        )[entity.specificationCID];
        if (!resolvedKPITokenSpecification)
            throw new Error(
                `couldn't fetch kpi token specification with cid ${entity.specificationCID}`
            );

        return ResolvedKPIToken.from(
            entity,
            template,
            oracles,
            JSON.parse(resolvedKPITokenSpecification)
        );
    }

    public async resolveKPITokens({
        ipfsGatewayURL,
        kpiTokens,
    }: ResolveKPITokensParams): Promise<ResolvedKPITokensMap> {
        const resolvedKPITokens = await Promise.allSettled(
            kpiTokens.map(async (kpiToken) =>
                this.resolveEntity({
                    ipfsGatewayURL,
                    entity: kpiToken,
                })
            )
        );
        return resolvedKPITokens.reduce(
            (accumulator: ResolvedKPITokensMap, kpiToken) => {
                if (kpiToken.status === "fulfilled")
                    accumulator[kpiToken.value.address] = kpiToken.value;
                return accumulator;
            },
            {}
        );
    }

    public async resolveOracles({
        ipfsGatewayURL,
        oracles,
    }: ResolveOraclesParams): Promise<ResolvedOraclesMap> {
        const resolvedOracles = await Promise.allSettled(
            oracles.map(async (oracle) =>
                this.resolveEntity({
                    ipfsGatewayURL,
                    entity: oracle,
                })
            )
        );
        return resolvedOracles.reduce(
            (accumulator: ResolvedOraclesMap, oracle) => {
                if (oracle.status === "fulfilled")
                    accumulator[oracle.value.address] = oracle.value;
                return accumulator;
            },
            {}
        );
    }
}
