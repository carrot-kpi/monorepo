import { utils } from 'ethers'
import { Currency } from '../currency'
import { enforce } from '../../utils/invariant'

export class Token extends Currency {
  public readonly address: string

  public constructor(
    public readonly chainId: number,
    address: string,
    decimals: number,
    symbol: string,
    name: string
  ) {
    super(symbol, name, decimals)
    enforce(utils.isAddress(address), `${address} is not a valid address.`)
    this.address = utils.getAddress(address)
  }

  public equals(other: Token): boolean {
    return (
      this === other || (this.chainId === other.chainId && this.address === other.address)
    )
  }
}

export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token)
    return currencyA.equals(currencyB)
  else if (currencyA instanceof Token) return false
  else if (currencyB instanceof Token) return false
  else return currencyA === currencyB
}
