import { ChartDataPoint } from '../chart-data-point'
import { TokenPricePlatform } from '../platforms/abstraction/token-price'
import { Token } from '../token'
import { Metric } from './abstraction/metric'

export class TokenPriceMetric extends Metric {
  private readonly token: Token
  private readonly platform: TokenPricePlatform

  constructor(token: Token, platform: TokenPricePlatform, from: Date, to: Date, granularity: number) {
    super(from, to, granularity)
    this.token = token
    this.platform = platform
  }

  get name(): string {
    return `${this.token.symbol} USD price on ${this.platform.name}`
  }

  public async chartData(): Promise<ChartDataPoint[]> {
    return this.platform.tokenPrice(this.token, this.from, this.to, this.granularity)
  }
}
