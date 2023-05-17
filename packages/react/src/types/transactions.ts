import type { Address, Hex } from "viem";

export interface TxReceipt {
    to: Address;
    from: Address;
    contractAddress: Address;
    transactionIndex: number;
    blockHash: Hex;
    transactionHash: Hex;
    blockNumber: number;
    status?: number;
}

export enum TxType {
    CUSTOM,
    KPI_TOKEN_CREATION,
    ERC20_APPROVAL,
    KPI_TOKEN_REDEMPTION,
    ORACLE_FINALIZATION,
}

export interface CustomTxPayload {
    summary: string;
}

export interface ERC20ApprovalTxPayload {
    token: Address;
    amount: bigint;
    spender: Address;
}

export interface KPITokenFinalizeTxPayload {
    address: Address;
}

export interface KPITokenRedemptionTxPayload {
    address: Address;
}

export interface OracleFinalizationTxPayload {
    address: Address;
}

export interface OracleCreationTxPayload {
    address: Address;
}

export type TxPayload = {
    [TxType.CUSTOM]: CustomTxPayload;
    [TxType.ERC20_APPROVAL]: ERC20ApprovalTxPayload;
    [TxType.KPI_TOKEN_CREATION]: OracleCreationTxPayload;
    [TxType.KPI_TOKEN_REDEMPTION]: KPITokenRedemptionTxPayload;
    [TxType.ORACLE_FINALIZATION]: OracleFinalizationTxPayload;
};

export interface Tx<T extends TxType> {
    hash: Hex;
    from: Address;
    timestamp: number;
    receipt: TxReceipt;
    type: T;
    payload: TxPayload[T];
}
