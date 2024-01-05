import React from "react";
import { Transaction } from "./transaction";
import { useTransactions } from "src/hooks/useTransactions";
import { useClearTransactions } from "src/hooks/useClearTransactions";
import { Empty } from "src/components/ui/empty";
import { Button } from "@carrot-kpi/ui";
import Bin from "../../../../../icons/bin";

export const Transactions = () => {
    const transactions = useTransactions();
    const clearTransactions = useClearTransactions();

    return (
        <div className="gap-3 hidden flex-col md:flex">
            {/* TODO: refine */}
            <Button
                size="xsmall"
                icon={Bin}
                disabled={transactions.length === 0}
                onClick={clearTransactions}
                className={{
                    root: "w-10 h-10 p-0 rounded-lg",
                }}
            />
            {transactions.length === 0 ? (
                <Empty
                    vertical
                    titleVariant="h4"
                    descriptionVariant="sm"
                    className={{ icon: "h-20" }}
                />
            ) : (
                <div className="flex flex-col gap-9 h-[590px] overflow-y-auto cui-scrollbar">
                    {transactions
                        .sort((a, b) => b.timestamp - a.timestamp)
                        .map((tx) => {
                            return <Transaction key={tx.hash} {...tx} />;
                        })}
                </div>
            )}
        </div>
    );
};
