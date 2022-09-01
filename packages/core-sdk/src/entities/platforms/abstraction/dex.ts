import { TvlPlatform } from './tvl'
import { TokenPricePlatform } from './token-price'
import { TokenMarketCapPlatform } from './token-market-cap'
import { ChartDataPoint } from '../../chart-data-point'
import { Token } from '../../token'

export interface DexPlatform extends TvlPlatform, TokenPricePlatform, TokenMarketCapPlatform {
  pairTvl(tokenA: Token, tokenB: Token, from: Date, to: Date, granularity: number): Promise<ChartDataPoint[]>

  tokenTvl(token: Token, from: Date, to: Date, granularity: number): Promise<ChartDataPoint[]>
}
