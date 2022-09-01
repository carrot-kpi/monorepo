import { Metric } from './abstraction/metric'
import { ChartDataPoint } from '../chart-data-point'

export class EmptyMetric extends Metric {
  constructor(from: Date) {
    const to = new Date()
    to.setTime(0)
    super(from, to, 0)
  }

  get name(): string {
    return ''
  }

  public async chartData(): Promise<ChartDataPoint[]> {
    return []
  }
}
