import React, { useCallback, useState } from "react";
import { type Tx, TxType } from "@carrot-kpi/react";
import type { ChainId } from "@carrot-kpi/sdk";
import { Popover, Skeleton, Typography } from "@carrot-kpi/ui";
import { useTransactionDetails } from "../../../../../hooks/useTransactionSummary";
import { getTransactionExplorerLink } from "../../../../../utils/explorers";
import dayjs from "dayjs";
import { useNetwork } from "wagmi";
import { ENABLED_CHAINS, SUPPORTED_CHAINS } from "../../../../../constants";
import Error from "../../../../../icons/error";
import { getShortDate } from "../../../../../utils/date";
import { ChainIcon } from "../../../../chain-icon";

export const Transaction = <T extends TxType>(tx: Tx<T>) => {
    const { chain } = useNetwork();
    const { loading, icon: Icon, title, summary } = useTransactionDetails(tx);

    const [date, setDate] = useState<HTMLHeadingElement | null>(null);
    const [datePopoverOpen, setDatePopoverOpen] = useState(false);

    const href = `${getTransactionExplorerLink(
        SUPPORTED_CHAINS[(chain?.id || Number.MAX_SAFE_INTEGER) as ChainId]
            .defaultBlockExplorer,
    )}/tx/${tx.hash}`;
    const chainId = chain?.id || Number.MAX_SAFE_INTEGER;
    const supportedChain = !!chainId && !!ENABLED_CHAINS[chainId];
    const Logo = supportedChain
        ? ENABLED_CHAINS[chainId as ChainId].logo
        : Error;

    const handlePopoverOpen = useCallback(() => {
        setDatePopoverOpen(true);
    }, []);
    const handlePopoverClose = useCallback(() => {
        setDatePopoverOpen(false);
    }, []);

    return (
        <div className="h-16 flex w-full justify-between items-center md:items-start gap-5">
            {loading ? (
                <Skeleton width="40%" />
            ) : (
                <a href={href} target="_blank" rel="noopener noreferrer">
                    <div className="flex justify-between items-center gap-3 cursor-pointer">
                        {Icon ? (
                            <Icon />
                        ) : (
                            <ChainIcon
                                backgroundColor={
                                    supportedChain
                                        ? SUPPORTED_CHAINS[chainId as ChainId]
                                              .iconBackgroundColor
                                        : "#ff0000"
                                }
                                variant="lg"
                                rounded
                                logo={<Logo width={18} height={18} />}
                            />
                        )}
                        <div className="flex flex-col gap-1">
                            <Typography uppercase weight="bold">
                                {title}
                            </Typography>
                            <Typography
                                className={{
                                    root: "hidden md:block max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap",
                                }}
                            >
                                {summary}
                            </Typography>
                        </div>
                    </div>
                </a>
            )}
            <Popover
                open={datePopoverOpen}
                className={{ root: "py-1 px-2" }}
                anchor={date}
                placement="top-end"
            >
                <Typography>
                    {dayjs.unix(tx.timestamp).format("L HH:mm:ss")}
                </Typography>
            </Popover>
            <Typography
                weight="bold"
                ref={setDate}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {getShortDate(dayjs.unix(tx.timestamp))}
            </Typography>
        </div>
    );
};
