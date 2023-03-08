export interface TransactionsState {
    [chainId: number]: {
        [txHash: string]: string;
    };
}
