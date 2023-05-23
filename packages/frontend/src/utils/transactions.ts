import { Tx, TxType } from "@carrot-kpi/react";
import { TFunction } from "i18next";
import { shortenAddress } from "./address";
import { Fetcher, Token } from "@carrot-kpi/sdk";
import { PublicClient } from "wagmi";
import { formatUnits } from "viem";

type PayloadSerializer<T extends TxType> = (
    serializable: Tx<T>["payload"]
) => object;

const defaultSerializablePayloadGetter = <T extends TxType>(
    payload: Tx<T>["payload"]
) => payload;

const SERIALIZABLE_PAYLOAD_GETTER: {
    [T in TxType]: PayloadSerializer<T>;
} = {
    [TxType.CUSTOM]: defaultSerializablePayloadGetter,
    [TxType.ERC20_APPROVAL]: (payload) => {
        return {
            spender: payload.spender,
            token: payload.token,
            amount: payload.amount.toString(),
        };
    },
    [TxType.KPI_TOKEN_CREATION]: defaultSerializablePayloadGetter,
    [TxType.KPI_TOKEN_REDEMPTION]: defaultSerializablePayloadGetter,
    [TxType.ORACLE_FINALIZATION]: defaultSerializablePayloadGetter,
};

export const serializeTransaction = <T extends TxType>(tx: Tx<T>) => {
    return JSON.stringify({
        from: tx.from,
        hash: tx.hash,
        timestamp: tx.timestamp,
        type: tx.type,
        receipt: {
            from: tx.receipt.from,
            to: tx.receipt.to,
            transactionHash: tx.receipt.transactionHash,
            blockHash: tx.receipt.blockHash,
            blockNumber: tx.receipt.blockNumber,
            contractAddress: tx.receipt.contractAddress,
            transactionIndex: tx.receipt.transactionIndex,
            status: tx.receipt.status,
        },
        payload: SERIALIZABLE_PAYLOAD_GETTER[tx.type](tx.payload),
    });
};

type PayloadDeserializer<T extends TxType> = (
    serialized: string
) => Tx<T>["payload"];

const PAYLOAD_DESERIALIZER: {
    [T in TxType]: PayloadDeserializer<T>;
} = {
    [TxType.CUSTOM]: JSON.parse,
    [TxType.ERC20_APPROVAL]: (payload) => {
        const rawDeserialized = JSON.parse(payload);
        return {
            spender: rawDeserialized.spender,
            token: rawDeserialized.token,
            amount: BigInt(rawDeserialized.amount),
        };
    },
    [TxType.KPI_TOKEN_CREATION]: JSON.parse,
    [TxType.KPI_TOKEN_REDEMPTION]: JSON.parse,
    [TxType.ORACLE_FINALIZATION]: JSON.parse,
};

export const deserializeTransaction = <T extends TxType>(
    serialized: string
): Tx<T> => {
    const rawDeserializedTx: Tx<T> = JSON.parse(serialized);
    return {
        ...rawDeserializedTx,
        payload: PAYLOAD_DESERIALIZER[rawDeserializedTx.type](
            JSON.stringify(rawDeserializedTx.payload)
        ),
    };
};

type SummaryGetter<T extends TxType> = (
    t: TFunction,
    publicClient: PublicClient,
    tx: Tx<T>
) => string | Promise<string>;

// used to force implementation for all tx type variants
// through record
const SUMMARY_GETTER: {
    [T in TxType]: SummaryGetter<T>;
} = {
    [TxType.CUSTOM]: (t, _publicClient, tx) => {
        return tx.payload.summary;
    },
    [TxType.ERC20_APPROVAL]: async (t, publicClient, tx) => {
        let token: Token;
        try {
            const tokens = await Fetcher.fetchERC20Tokens({
                publicClient,
                addresses: [tx.payload.token],
            });
            token = tokens[tx.payload.token];
            if (!token)
                throw new Error("could not fetch erc20 token with the fetcher");
        } catch (error) {
            console.warn(
                `could not get erc20 token at address ${tx.payload.token}`
            );
            return t("transactions.erc20.approval", {
                spender: shortenAddress(tx.payload.spender),
            });
        }
        return t("transactions.erc20.approval.data", {
            amount: formatUnits(tx.payload.amount, token.decimals),
            symbol: token.symbol,
            spender: shortenAddress(tx.payload.spender),
        });
    },
    [TxType.KPI_TOKEN_REDEMPTION]: (t, _publicClient, tx) => {
        return t("transactions.kpi.token.redeem", {
            address: shortenAddress(tx.payload.address),
        });
    },
    [TxType.KPI_TOKEN_CREATION]: (t, _publicClient, tx) => {
        return t("transactions.kpi.token.create", {
            address: shortenAddress(tx.payload.address),
        });
    },
    [TxType.ORACLE_FINALIZATION]: (t, _publicClient, tx) => {
        return t("transactions.oracle.finalize", {
            address: shortenAddress(tx.payload.address),
        });
    },
};

export const getTransactionSummary = <T extends TxType>(
    t: TFunction,
    publicClient: PublicClient,
    tx: Tx<T>
) => {
    return SUMMARY_GETTER[tx.type](t, publicClient, tx);
};
