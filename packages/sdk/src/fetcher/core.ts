import {
    MULTICALL_ABI,
    ChainId,
    ERC20_ABI,
    CHAIN_ADDRESSES,
    CACHER,
} from "../commons";
import { cacheErc20Token, enforce, getCachedErc20Token, warn } from "../utils";
import { ethers, Contract } from "ethers";
import { Token } from "../entities/token";
import BYTES_NAME_ERC20_ABI from "../abis/erc20-name-bytes.json";
import BYTES_SYMBOL_ERC20_ABI from "../abis/erc20-symbol-bytes.json";
import { IpfsService } from "../services";
import { Fetcher } from ".";

// erc20 related interfaces
const STANDARD_ERC20_INTERFACE = new ethers.utils.Interface(ERC20_ABI);
const BYTES_NAME_ERC20_INTERFACE = new ethers.utils.Interface(
    BYTES_NAME_ERC20_ABI
);
const BYTES_SYMBOL_ERC20_INTERFACE = new ethers.utils.Interface(
    BYTES_SYMBOL_ERC20_ABI
);

// erc20 related functions
const ERC20_NAME_FUNCTION = STANDARD_ERC20_INTERFACE.getFunction("name()");
const ERC20_SYMBOL_FUNCTION = STANDARD_ERC20_INTERFACE.getFunction("symbol()");
const ERC20_DECIMALS_FUNCTION =
    STANDARD_ERC20_INTERFACE.getFunction("decimals()");
const ERC20_BYTES_NAME_FUNCTION =
    BYTES_NAME_ERC20_INTERFACE.getFunction("name()");
const ERC20_BYTES_SYMBOL_FUNCTION =
    BYTES_SYMBOL_ERC20_INTERFACE.getFunction("symbol()");

// erc20 related function datas
const ERC20_NAME_FUNCTION_DATA = STANDARD_ERC20_INTERFACE.encodeFunctionData(
    STANDARD_ERC20_INTERFACE.getFunction("name()")
);
const ERC20_SYMBOL_FUNCTION_DATA = STANDARD_ERC20_INTERFACE.encodeFunctionData(
    STANDARD_ERC20_INTERFACE.getFunction("symbol()")
);
const ERC20_DECIMALS_FUNCTION_DATA =
    STANDARD_ERC20_INTERFACE.encodeFunctionData(
        STANDARD_ERC20_INTERFACE.getFunction("decimals()")
    );
const ERC20_BYTES_NAME_FUNCTION_DATA =
    BYTES_NAME_ERC20_INTERFACE.encodeFunctionData(
        BYTES_NAME_ERC20_INTERFACE.getFunction("name()")
    );
const ERC20_BYTES_SYMBOL_FUNCTION_DATA =
    BYTES_SYMBOL_ERC20_INTERFACE.encodeFunctionData(
        BYTES_SYMBOL_ERC20_INTERFACE.getFunction("symbol()")
    );

export abstract class CoreFetcher {
    public static async fetchErc20Tokens(
        addresses: string[],
        provider: ethers.providers.Provider
    ): Promise<{ [address: string]: Token }> {
        const chainId = (await provider.getNetwork()).chainId as ChainId;
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        const { cachedTokens, missingTokens } = addresses.reduce(
            (
                accumulator: {
                    cachedTokens: { [address: string]: Token };
                    missingTokens: string[];
                },
                address
            ) => {
                const cachedToken = getCachedErc20Token(chainId, address);
                if (!!cachedToken)
                    accumulator.cachedTokens[address] = cachedToken;
                else accumulator.missingTokens.push(address);
                return accumulator;
            },
            { cachedTokens: {}, missingTokens: [] }
        );
        if (missingTokens.length === 0) return cachedTokens;

        const multicall = new Contract(
            CHAIN_ADDRESSES[chainId].multicall,
            MULTICALL_ABI,
            provider
        );

        const calls = addresses.flatMap((address: string) => [
            [address, ERC20_NAME_FUNCTION_DATA],
            [address, ERC20_SYMBOL_FUNCTION_DATA],
            [address, ERC20_DECIMALS_FUNCTION_DATA],
            [address, ERC20_BYTES_NAME_FUNCTION_DATA],
            [address, ERC20_BYTES_SYMBOL_FUNCTION_DATA],
        ]);

        const result = await multicall.callStatic.tryAggregate(false, calls);
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
                    name = STANDARD_ERC20_INTERFACE.decodeFunctionResult(
                        ERC20_NAME_FUNCTION,
                        wrappedName.returnData
                    )[0];
                } catch (error) {
                    try {
                        name = BYTES_NAME_ERC20_INTERFACE.decodeFunctionResult(
                            ERC20_BYTES_NAME_FUNCTION,
                            wrappedBytesName.returnData
                        )[0];
                    } catch (error) {
                        console.warn(
                            `could not decode ERC20 token name for address ${missingToken}`
                        );
                        return accumulator;
                    }
                }

                let symbol;
                try {
                    symbol = STANDARD_ERC20_INTERFACE.decodeFunctionResult(
                        ERC20_SYMBOL_FUNCTION,
                        wrappedSymbol.returnData
                    )[0];
                } catch (error) {
                    try {
                        symbol =
                            BYTES_SYMBOL_ERC20_INTERFACE.decodeFunctionResult(
                                ERC20_BYTES_SYMBOL_FUNCTION,
                                wrappedBytesSymbol.returnData
                            )[0];
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
                        STANDARD_ERC20_INTERFACE.decodeFunctionResult(
                            ERC20_DECIMALS_FUNCTION,
                            wrappedDecimals.returnData
                        )[0],
                        symbol,
                        name
                    );
                    cacheErc20Token(token);
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

    private static async fetchContentFromIpfsWithLocalStorageCache(
        cacheableCids: string[]
    ) {
        const cachedCids: { [cid: string]: string } = {};
        const uncachedCids = [];
        for (const cid of cacheableCids) {
            const cachedContent = CACHER.get<string>(cid);
            if (!!cachedContent) cachedCids[cid] = cachedContent;
            else uncachedCids.push(cid);
        }
        if (uncachedCids.length > 0) {
            const uncachedContent = await Promise.all(
                uncachedCids.map(async (cid) => {
                    const response = await fetch(
                        `${IpfsService.gateway}/ipfs/${cid}`
                    );
                    const responseOk = response.ok;
                    warn(responseOk, `could not fetch content with cid ${cid}`);
                    return {
                        cid,
                        content: responseOk ? await response.text() : null,
                    };
                })
            );
            for (const { cid, content } of uncachedContent) {
                if (!content) continue;
                cachedCids[cid] = content;
                CACHER.set(cid, content, Number.MAX_SAFE_INTEGER);
            }
        }
        return cachedCids;
    }

    public static async fetchContentFromIpfs(
        cids: string[]
    ): Promise<{ [cid: string]: string }> {
        if (process.env.NODE_ENV === "development")
            return Fetcher.fetchContentFromIpfsWithLocalStorageCache(cids);
        // we come here only if we are in production. in this case the service
        // worker will handle the calls, so we can just not worry about it
        const allContents = await Promise.all(
            cids.map(async (cid) => {
                const response = await fetch(
                    `${IpfsService.gateway}/ipfs/${cid}`
                );
                const responseOk = response.ok;
                warn(responseOk, `could not fetch content with cid ${cid}`);
                return {
                    cid,
                    content: responseOk ? await response.text() : null,
                };
            })
        );
        const contents: { [cid: string]: string } = {};
        for (const { cid, content } of allContents) {
            if (!content) continue;
            contents[cid] = content;
        }
        return contents;
    }
}
