import { Token } from '../entities/token'
import { CACHER } from '../commons'
import { warn } from './invariant'

export const erc20TokenCachingKey = (chainId: number, address: string) =>
  `erc20-${chainId}-${address}`

interface SerializedErc20Token {
  chainId: number
  address: string
  decimals: number
  symbol: string
  name: string
}

export const cacheErc20Token = (token: Token, validUntil?: number) => {
  if (!validUntil || validUntil < Date.now()) {
    validUntil = Date.now() + 172_800_000 // 2 days by default
    warn(true, `invalid valid until while caching erc20 token`)
  }
  CACHER.set<SerializedErc20Token>(
    `erc20-${token.chainId}-${token.address}`,
    {
      chainId: token.chainId,
      address: token.address,
      decimals: token.decimals,
      symbol: token.symbol,
      name: token.name,
    },
    validUntil
  )
}

export const getCachedErc20Token = (
  chainId: number,
  address: string
): Token | undefined => {
  const serializedErc20Token = CACHER.get<SerializedErc20Token>(
    erc20TokenCachingKey(chainId, address)
  )
  if (!!!serializedErc20Token) return
  return new Token(
    serializedErc20Token.chainId,
    serializedErc20Token.address,
    serializedErc20Token.decimals,
    serializedErc20Token.symbol,
    serializedErc20Token.name
  )
}
