import { ChartDataPoint } from '../chart-data-point'
import { DexPlatform } from '../platforms/abstraction/dex'
import { Token } from '../token'
import { Metric } from './abstraction/metric'

export class TokenLiquidityMetric extends Metric {
  private readonly token: Token
  private readonly platform: DexPlatform

  constructor(token: Token, platform: DexPlatform, from: Date, to: Date, granularity: number) {
    super(from, to, granularity)
    this.token = token
    this.platform = platform
  }

  get name(): string {
    return `${this.token.symbol} USD liquidity on ${this.platform.name}`
  }

  public async chartData(): Promise<ChartDataPoint[]> {
    return this.platform.tokenTvl(this.token, this.from, this.to, this.granularity)
  }
}
