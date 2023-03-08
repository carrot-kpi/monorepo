import { BigNumber } from "@ethersproject/bignumber";

export interface TxReceipt {
    to: string;
    from: string;
    contractAddress: string;
    transactionIndex: number;
    blockHash: string;
    transactionHash: string;
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
    token: string;
    amount: BigNumber;
    spender: string;
}

export interface KPITokenFinalizeTxPayload {
    address: string;
}

export interface KPITokenRedemptionTxPayload {
    address: string;
}

export interface OracleFinalizationTxPayload {
    address: string;
}

export interface OracleCreationTxPayload {
    address: string;
}

export type TxPayload = {
    [TxType.CUSTOM]: CustomTxPayload;
    [TxType.ERC20_APPROVAL]: ERC20ApprovalTxPayload;
    [TxType.KPI_TOKEN_CREATION]: OracleCreationTxPayload;
    [TxType.KPI_TOKEN_REDEMPTION]: KPITokenRedemptionTxPayload;
    [TxType.ORACLE_FINALIZATION]: OracleFinalizationTxPayload;
};

export interface Tx<T extends TxType> {
    hash: string;
    from: string;
    timestamp: number;
    receipt: TxReceipt;
    type: T;
    payload: TxPayload[T];
}
