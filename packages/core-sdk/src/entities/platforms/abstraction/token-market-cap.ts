import { Platform } from './platform'
import { ChartDataPoint } from '../../chart-data-point'
import { TotalSupplyToken } from '../../token'

export interface TokenMarketCapPlatform extends Platform {
  tokenMarketCap(token: TotalSupplyToken, from: Date, to: Date, granularity: number): Promise<ChartDataPoint[]>
}
