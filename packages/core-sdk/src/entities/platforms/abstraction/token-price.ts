import { Platform } from './platform'
import { ChartDataPoint } from '../../chart-data-point'
import { Token } from '../../token'

export interface TokenPricePlatform extends Platform {
  tokenPrice(token: Token, from: Date, to: Date, granularity: number): Promise<ChartDataPoint[]>
}
