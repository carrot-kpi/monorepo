import { TokenPricePlatform } from '../platforms/abstraction/token-price'
import { TvlPlatform } from '../platforms/abstraction/tvl'
import { ChainId } from '../../commons/constants'
import { Metric } from './abstraction/metric'
import { ChartDataPoint } from '../chart-data-point'

export class TvlMetric extends Metric {
  private readonly chainId: ChainId
  private readonly pricingPlatform: TokenPricePlatform
  private readonly platform: TvlPlatform

  constructor(
    chainId: ChainId,
    pricingPlatform: TokenPricePlatform,
    platform: TvlPlatform,
    from: Date,
    to: Date,
    granularity: number
  ) {
    super(from, to, granularity)
    this.chainId = chainId
    this.pricingPlatform = pricingPlatform
    this.platform = platform
  }

  get name(): string {
    return `${this.platform.name} TVL`
  }

  public async chartData(): Promise<ChartDataPoint[]> {
    return this.platform.overallTvl(this.chainId, this.pricingPlatform, this.from, this.to, this.granularity)
  }
}
