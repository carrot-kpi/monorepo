import { ChartDataPoint } from '../chart-data-point'
import { TokenMarketCapPlatform } from '../platforms/abstraction/token-market-cap'
import { TotalSupplyToken } from '../token'
import { Metric } from './abstraction/metric'

export class TokenMarketCapMetric extends Metric {
  private readonly token: TotalSupplyToken
  private readonly platform: TokenMarketCapPlatform

  constructor(
    token: TotalSupplyToken,
    platform: TokenMarketCapPlatform,
    from: Date,
    to: Date,
    granularity: number
  ) {
    super(from, to, granularity)
    this.token = token
    this.platform = platform
  }

  get name(): string {
    return `${this.token.symbol} market cap (price feed from ${this.platform.name})`
  }

  public async chartData(): Promise<ChartDataPoint[]> {
    return this.platform.tokenMarketCap(this.token, this.from, this.to, this.granularity)
  }
}
