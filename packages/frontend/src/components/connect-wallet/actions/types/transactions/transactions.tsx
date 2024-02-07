import React from "react";
import { Transaction } from "./transaction";
import { useTransactions } from "../../../../../hooks/useTransactions";
import { useClearTransactions } from "../../../../../hooks/useClearTransactions";
import { Typography } from "@carrot-kpi/ui";
import Bin from "../../../../../icons/bin";
import { Empty } from "../../../../ui/empty";
import { useTranslation } from "react-i18next";

export const Transactions = () => {
    const { t } = useTranslation();
    const transactions = useTransactions();
    const clearTransactions = useClearTransactions();

    return (
        <div className="gap-3 flex-col flex">
            {transactions.length > 0 && (
                <>
                    <div className="h-[1px] w-full bg-black" />
                    <div
                        className="flex gap-4 items-center cursor-pointer"
                        onClick={clearTransactions}
                    >
                        <Bin />
                        <Typography uppercase variant="sm">
                            {t("actions.transactions.clear")}
                        </Typography>
                    </div>
                    <div className="h-[1px] w-full bg-black" />
                </>
            )}
            {transactions.length === 0 ? (
                <Empty
                    title={t("empty.transactions.title")}
                    vertical
                    titleVariant="h4"
                    descriptionVariant="sm"
                    className={{ icon: "h-20" }}
                />
            ) : (
                <div className="flex flex-col gap-3 h-72 md:h-[620px] overflow-y-auto cui-scrollbar">
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
