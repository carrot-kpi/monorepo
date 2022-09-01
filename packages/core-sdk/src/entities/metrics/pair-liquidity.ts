import { ChartDataPoint } from '../chart-data-point'
import { DexPlatform } from '../platforms/abstraction/dex'
import { Token } from '../token'
import { Metric } from './abstraction/metric'

export class PairLiquidityMetric extends Metric {
  private readonly tokenA: Token
  private readonly tokenB: Token
  private readonly platform: DexPlatform

  constructor(tokenA: Token, tokenB: Token, platform: DexPlatform, from: Date, to: Date, granularity: number) {
    super(from, to, granularity)
    this.tokenA = tokenA
    this.tokenB = tokenB
    this.platform = platform
  }

  get name(): string {
    return `${this.tokenA.symbol}/${this.tokenB.symbol} USD liquidity on ${this.platform.name}`
  }

  public async chartData(): Promise<ChartDataPoint[]> {
    return this.platform.pairTvl(this.tokenA, this.tokenB, this.from, this.to, this.granularity)
  }
}
