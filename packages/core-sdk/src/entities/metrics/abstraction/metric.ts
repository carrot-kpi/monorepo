import { ChartDataPoint } from '../../chart-data-point'

export abstract class Metric {
  public readonly from: Date
  public readonly to: Date
  protected readonly granularity: number

  constructor(from: Date, to: Date, granularity: number) {
    this.from = from
    this.to = to
    this.granularity = granularity
  }

  abstract chartData(): Promise<ChartDataPoint[]>

  abstract get name(): string
}
