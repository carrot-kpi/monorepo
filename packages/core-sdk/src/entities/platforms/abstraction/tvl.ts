import { ChainId } from '../../../commons/constants'
import { TokenPricePlatform } from './token-price'
import { Platform } from './platform'
import { ChartDataPoint } from '../../chart-data-point'

export interface TvlPlatform extends Platform {
  overallTvl(
    chainId: ChainId,
    pricingPlatform: TokenPricePlatform,
    from: Date,
    to: Date,
    granularity: number
  ): Promise<ChartDataPoint[]>
}
