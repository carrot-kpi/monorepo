export class Currency {
    constructor(
        public readonly symbol: string,
        public readonly name: string,
        public readonly decimals: number,
    ) {}
}
