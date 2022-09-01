import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { Interface } from '@ethersproject/abi'
import { MULTICALL2_ADDRESS, MULTICALL2_ABI, ChainId } from './commons/constants'
import { Token } from './entities/token'
import ERC20_ABI from './abis/erc20.json'
import BYTES_NAME_ERC20_ABI from './abis/erc20-name-bytes.json'
import BYTES_SYMBOL_ERC20_ABI from './abis/erc20-symbol-bytes.json'
import { BLOCK_SUBGRAPH_CLIENT } from './commons/graphql'
import { gql } from '@apollo/client'

// FIXME: consider using localstorage instead of this ephemeral cache
const TOKEN_CACHE: Record<ChainId, { [address: string]: Token }> = {
  [ChainId.MAINNET]: {},
  [ChainId.RINKEBY]: {},
  [ChainId.GOERLI]: {},
  [ChainId.GNOSIS]: {},
}

// erc20 related interfaces
const STANDARD_ERC20_INTERFACE = new Interface(ERC20_ABI)
const BYTES_NAME_ERC20_INTERFACE = new Interface(BYTES_NAME_ERC20_ABI)
const BYTES_SYMBOL_ERC20_INTERFACE = new Interface(BYTES_SYMBOL_ERC20_ABI)

// erc20 related functions
const ERC20_NAME_FUNCTION = STANDARD_ERC20_INTERFACE.getFunction('name()')
const ERC20_SYMBOL_FUNCTION = STANDARD_ERC20_INTERFACE.getFunction('symbol()')
const ERC20_DECIMALS_FUNCTION = STANDARD_ERC20_INTERFACE.getFunction('decimals()')
const ERC20_BYTES_NAME_FUNCTION = BYTES_NAME_ERC20_INTERFACE.getFunction('name()')
const ERC20_BYTES_SYMBOL_FUNCTION = BYTES_SYMBOL_ERC20_INTERFACE.getFunction('symbol()')

// erc20 related function datas
const ERC20_NAME_FUNCTION_DATA = STANDARD_ERC20_INTERFACE.encodeFunctionData(
  STANDARD_ERC20_INTERFACE.getFunction('name()')
)
const ERC20_SYMBOL_FUNCTION_DATA = STANDARD_ERC20_INTERFACE.encodeFunctionData(
  STANDARD_ERC20_INTERFACE.getFunction('symbol()')
)
const ERC20_DECIMALS_FUNCTION_DATA = STANDARD_ERC20_INTERFACE.encodeFunctionData(
  STANDARD_ERC20_INTERFACE.getFunction('decimals()')
)
const ERC20_BYTES_NAME_FUNCTION_DATA = BYTES_NAME_ERC20_INTERFACE.encodeFunctionData(
  BYTES_NAME_ERC20_INTERFACE.getFunction('name()')
)
const ERC20_BYTES_SYMBOL_FUNCTION_DATA = BYTES_SYMBOL_ERC20_INTERFACE.encodeFunctionData(
  BYTES_SYMBOL_ERC20_INTERFACE.getFunction('symbol()')
)

export abstract class Fetcher {
  public static async fetchErc20Tokens(
    chainId: ChainId,
    addresses: string[],
    provider: Web3Provider
  ): Promise<{ [address: string]: Token }> {
    const { cachedTokens, missingTokens } = addresses.reduce(
      (accumulator: { cachedTokens: { [address: string]: Token }; missingTokens: string[] }, address) => {
        const cachedToken = TOKEN_CACHE[chainId as ChainId][address]
        if (!!cachedToken) accumulator.cachedTokens[address] = cachedToken
        else accumulator.missingTokens.push(address)
        return accumulator
      },
      { cachedTokens: {}, missingTokens: [] }
    )
    if (missingTokens.length === 0) return cachedTokens

    const multicall2 = new Contract(MULTICALL2_ADDRESS[provider.network.chainId as ChainId], MULTICALL2_ABI, provider)

    const calls = addresses.flatMap((address: string) => [
      [address, ERC20_NAME_FUNCTION_DATA],
      [address, ERC20_SYMBOL_FUNCTION_DATA],
      [address, ERC20_DECIMALS_FUNCTION_DATA],
      [address, ERC20_BYTES_NAME_FUNCTION_DATA],
      [address, ERC20_BYTES_SYMBOL_FUNCTION_DATA],
    ])

    const result = await multicall2.tryAggregate(false, calls)
    const fetchedTokens = missingTokens.reduce((accumulator: { [address: string]: Token }, missingToken, index) => {
      const wrappedName = result[index * 5]
      const wrappedSymbol = result[index * 5 + 1]
      const wrappedDecimals = result[index * 5 + 2]
      const wrappedBytesName = result[index * 5 + 3]
      const wrappedBytesSymbol = result[index * 5 + 4]
      if (
        (!wrappedSymbol.success && !wrappedBytesSymbol.success) ||
        (!wrappedName.success && wrappedBytesName.success) ||
        !wrappedDecimals.success
      ) {
        console.warn(`could not fetch ERC20 data for address ${missingToken}`)
        return accumulator
      }

      let name
      try {
        name = STANDARD_ERC20_INTERFACE.decodeFunctionResult(ERC20_NAME_FUNCTION, wrappedName.returnData)[0]
      } catch (error) {
        try {
          name = BYTES_NAME_ERC20_INTERFACE.decodeFunctionResult(
            ERC20_BYTES_NAME_FUNCTION,
            wrappedBytesName.returnData
          )[0]
        } catch (error) {
          console.warn(`could not decode ERC20 token name for address ${missingToken}`)
          return accumulator
        }
      }

      let symbol
      try {
        symbol = STANDARD_ERC20_INTERFACE.decodeFunctionResult(ERC20_SYMBOL_FUNCTION, wrappedSymbol.returnData)[0]
      } catch (error) {
        try {
          symbol = BYTES_SYMBOL_ERC20_INTERFACE.decodeFunctionResult(
            ERC20_BYTES_SYMBOL_FUNCTION,
            wrappedBytesSymbol.returnData
          )[0]
        } catch (error) {
          console.warn(`could not decode ERC20 token symbol for address ${missingToken}`)
          return accumulator
        }
      }

      try {
        const token = new Token(
          chainId,
          missingToken,
          STANDARD_ERC20_INTERFACE.decodeFunctionResult(ERC20_DECIMALS_FUNCTION, wrappedDecimals.returnData)[0],
          symbol,
          name
        )
        TOKEN_CACHE[chainId as ChainId][missingToken] = token
        accumulator[missingToken] = token
      } catch (error) {
        console.error(`error decoding ERC20 data for address ${missingToken}`)
        throw error
      }
      return accumulator
    }, {})

    return { ...cachedTokens, ...fetchedTokens }
  }

  public static blocksFromTimestamps = async (
    chainId: ChainId,
    timestamps: number[]
  ): Promise<{ number: number; timestamp: number }[]> => {
    if (!timestamps || timestamps.length === 0) return []

    const blocksSubgraph = BLOCK_SUBGRAPH_CLIENT[chainId]
    if (!blocksSubgraph) return []

    const promises = timestamps.map((timestamp) =>
      blocksSubgraph.query<{
        [timestampString: string]: { number: string }[]
      }>({
        query: gql`
          query blocks {
              t${timestamp}: blocks(
                first: 1
                orderBy: number
                orderDirection: asc
                where: { timestamp_gt: ${Math.floor(timestamp / 1000)} }
              ) {
              number
            }
          }
        `,
      })
    )

    return (await Promise.all(promises)).reduce((accumulator: { timestamp: number; number: number }[], { data }) => {
      for (const [timestampString, blocks] of Object.entries(data)) {
        if (blocks.length > 0) {
          accumulator.push({
            timestamp: parseInt(timestampString.substring(1)),
            number: parseInt(blocks[0].number),
          })
        }
      }
      return accumulator
    }, [])
  }
}
