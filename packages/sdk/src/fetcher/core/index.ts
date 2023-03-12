import { MULTICALL_ABI, ERC20_ABI, CACHER } from "../../commons";
import { cacheERC20Token, getCachedERC20Token, warn } from "../../utils";
import { Contract } from "@ethersproject/contracts";
import { Interface } from "@ethersproject/abi";
import { Token } from "../../entities/token";
import BYTES_NAME_ERC20_ABI from "../../abis/erc20-name-bytes";
import BYTES_SYMBOL_ERC20_ABI from "../../abis/erc20-symbol-bytes";
import {
    FetchContentFromIPFSParams,
    FetchERC20TokensParams,
    ICoreFetcher,
} from "../abstraction";
import { Provider } from "@ethersproject/providers";
import { BaseFetcher } from "../base";

// erc20 related interfaces
const STANDARD_ERC20_INTERFACE = new Interface(ERC20_ABI);
const BYTES_NAME_ERC20_INTERFACE = new Interface(BYTES_NAME_ERC20_ABI);
const BYTES_SYMBOL_ERC20_INTERFACE = new Interface(BYTES_SYMBOL_ERC20_ABI);

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

// TODO: check if validation can be extracted in its own function

class Fetcher extends BaseFetcher implements ICoreFetcher {
    constructor(provider: Provider, ipfsGatewayURL: string) {
        super(provider, ipfsGatewayURL);
    }

    public async fetchERC20Tokens({
        addresses,
    }: FetchERC20TokensParams): Promise<{ [address: string]: Token }> {
        const { chainId, chainAddresses } =
            await this.getChainIdAndChainAddresses();
        const { cachedTokens, missingTokens } = addresses.reduce(
            (
                accumulator: {
                    cachedTokens: { [address: string]: Token };
                    missingTokens: string[];
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

        const multicall = new Contract(
            chainAddresses.multicall,
            MULTICALL_ABI,
            this.provider
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

    // todo: private ??
    public async fetchContentFromIPFSWithLocalStorageCache(
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
                        `${this.ipfsGatewayURL}/ipfs/${cid}`
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

    public async fetchContentFromIPFS({
        cids,
    }: FetchContentFromIPFSParams): Promise<{ [cid: string]: string }> {
        if (process.env.NODE_ENV === "development")
            return this.fetchContentFromIPFSWithLocalStorageCache(cids);
        // we come here only if we are in production. in this case the service
        // worker will handle the calls, so we can just not worry about it
        const allContents = await Promise.all(
            cids.map(async (cid) => {
                const response = await fetch(
                    `${this.ipfsGatewayURL}/ipfs/${cid}`
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

export const CoreFetcher = (provider: Provider, ipfsGatewayURL = "") =>
    new Fetcher(provider, ipfsGatewayURL);
