import { validateAndParseAddress } from '../utils'
import { ChainId } from '../commons/constants'
import { Currency } from './currency'
import { Amount } from '..'

export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public static readonly WETH: { [key: number]: Token } = {
    [ChainId.MAINNET]: new Token(
      ChainId.RINKEBY,
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      18,
      'WETH',
      'Wrapped Ether'
    ),
    [ChainId.RINKEBY]: new Token(
      ChainId.RINKEBY,
      '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      18,
      'WETH',
      'Wrapped Ether'
    ),
    [ChainId.GOERLI]: new Token(
      ChainId.GOERLI,
      '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
      18,
      'WETH',
      'Wrapped Ether'
    ),
    [ChainId.GNOSIS]: new Token(
      ChainId.GNOSIS,
      '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
      18,
      'WETH',
      'Wrapped Ether on xDai'
    ),
  }

  public static readonly WXDAI: { [key: number]: Token } = {
    [ChainId.GNOSIS]: new Token(
      ChainId.GNOSIS,
      '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
      18,
      'WXDAI',
      'Wrapped xDAI'
    ),
  }

  private static readonly NATIVE_CURRENCY_WRAPPER: { [chainId in ChainId]: Token } = {
    [ChainId.MAINNET]: Token.WETH[ChainId.MAINNET],
    [ChainId.RINKEBY]: Token.WETH[ChainId.RINKEBY],
    [ChainId.GOERLI]: Token.WETH[ChainId.GOERLI],
    [ChainId.GNOSIS]: Token.WXDAI[ChainId.GNOSIS],
  }

  public constructor(chainId: ChainId, address: string, decimals: number, symbol: string, name: string) {
    super(symbol, name, decimals)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  public equals(other: Token): boolean {
    return this === other || (this.chainId === other.chainId && this.address === other.address)
  }

  public static getNativeWrapper(chainId: ChainId): Token {
    return Token.NATIVE_CURRENCY_WRAPPER[chainId]
  }
}

export class TotalSupplyToken extends Token {
  private readonly getTotalSupply: (token: Token) => Promise<Amount<Token>>

  constructor(
    chainId: ChainId,
    address: string,
    decimals: number,
    symbol: string,
    name: string,
    totalSupplyGetterLogic: (token: Token) => Promise<Amount<Token>>
  ) {
    super(chainId, address, decimals, symbol, name)
    this.getTotalSupply = totalSupplyGetterLogic
  }

  public async totalSupply(): Promise<Amount<Token>> {
    return this.getTotalSupply(this)
  }
}

export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) return currencyA.equals(currencyB)
  else if (currencyA instanceof Token) return false
  else if (currencyB instanceof Token) return false
  else return currencyA === currencyB
}
