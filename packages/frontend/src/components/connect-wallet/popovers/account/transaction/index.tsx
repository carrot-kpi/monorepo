import React from "react";
import { Tx, TxType } from "@carrot-kpi/react";
import { Skeleton, Typography } from "@carrot-kpi/ui";
import { useTransactionSummary } from "../../../../../hooks/useTransactionSummary";
import { ReactComponent as External } from "../../../../../assets/external.svg";
import { getTransactionExplorerLink } from "../../../../../utils/explorers";
import dayjs from "dayjs";
import { useNetwork } from "wagmi";

export const Transaction = <T extends TxType>(tx: Tx<T>) => {
    const { chain } = useNetwork();
    const { loading, summary } = useTransactionSummary(tx);

    const href = chain?.blockExplorers?.default
        ? `${getTransactionExplorerLink(chain.blockExplorers.default.url)}/tx/${
              tx.hash
          }`
        : undefined;
    return (
        <div className="h-16 flex w-full justify-between gap-5">
            <div className="flex flex-col overflow-hidden">
                {loading ? (
                    <Skeleton width="40%" />
                ) : (
                    <Typography
                        className={{
                            root: "overflow-hidden text-ellipsis whitespace-nowrap",
                        }}
                    >
                        {summary}
                    </Typography>
                )}
                <Typography variant="xs" className={{ root: "text-gray-500" }}>
                    {dayjs.unix(tx.timestamp).format("L HH:mm:ss")}
                </Typography>
            </div>
            <a href={href} target="_blank" rel="noopener noreferrer">
                <External className="w-5 h-5 cursor-pointer" />
            </a>
        </div>
    );
};
