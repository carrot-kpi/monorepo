import { ChainId } from '../commons/constants'

export class Currency {
  public readonly decimals: number
  public readonly symbol: string
  public readonly name: string

  public static readonly USD: Currency = new Currency('USD', 'US dollar', 18)
  public static readonly ETHER: Currency = new Currency('ETH', 'Ether', 18)
  public static readonly XDAI: Currency = new Currency('XDAI', 'xDAI', 18)
  private static readonly NATIVE_CURRENCY: { [chainId in ChainId]: Currency } = {
    [ChainId.MAINNET]: Currency.ETHER,
    [ChainId.RINKEBY]: Currency.ETHER,
    [ChainId.GOERLI]: Currency.ETHER,
    [ChainId.GNOSIS]: Currency.XDAI,
  }

  protected constructor(symbol: string, name: string, decimals: number) {
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }

  public static isNative(currency: Currency): boolean {
    return Object.values(Currency.NATIVE_CURRENCY).indexOf(currency) >= 0
  }

  public static getNative(chainId: ChainId): Currency {
    return Currency.NATIVE_CURRENCY[chainId]
  }
}
