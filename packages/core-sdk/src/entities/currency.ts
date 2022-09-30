export class Currency {
  protected constructor(
    public readonly symbol: string,
    public readonly name: string,
    public readonly decimals: number
  ) {}
}
