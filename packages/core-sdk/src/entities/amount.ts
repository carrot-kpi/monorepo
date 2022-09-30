import { Token, currencyEquals } from './token'
import { Currency } from './currency'
import { BigNumber, utils } from 'ethers'
import Decimal from 'decimal.js-light'
import { enforce } from '../utils'

export type TokenOrCurrency = Token | Currency

export class Amount<T extends TokenOrCurrency> extends Decimal {
  public readonly currency: T
  public readonly raw: BigNumber

  public constructor(currency: T, amount: BigNumber) {
    super(new Decimal(utils.formatUnits(amount, currency.decimals)))
    this.currency = currency
    this.raw = amount
  }

  public plus(other: Amount<TokenOrCurrency>): Amount<T> {
    enforce(
      currencyEquals(this.currency, other.currency),
      'tried to sum different currencies'
    )
    return new Amount<T>(this.currency, this.raw.add(other.raw))
  }

  public minus(other: Amount<T>): Amount<T> {
    enforce(
      currencyEquals(this.currency, other.currency),
      'tried to subtract different currencies'
    )
    return new Amount<T>(this.currency, this.raw.sub(other.raw))
  }

  public multiply<M extends TokenOrCurrency>(other: Amount<M>): Amount<M> {
    return new Amount<M>(
      other.currency,
      BigNumber.from(this.times(other).times(`1e${other.currency.decimals}`).toFixed(0))
    )
  }

  public divide<M extends TokenOrCurrency>(other: Amount<M>): Amount<M> {
    return new Amount<M>(
      other.currency,
      BigNumber.from(
        this.dividedBy(other).times(`1e${other.currency.decimals}`).toFixed(0)
      )
    )
  }
}
