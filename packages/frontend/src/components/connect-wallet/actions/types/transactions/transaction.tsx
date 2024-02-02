import React, { useCallback, useState } from "react";
import { type Tx, TxType } from "@carrot-kpi/react";
import { Popover, Skeleton, Typography } from "@carrot-kpi/ui";
import { useTransactionDetails } from "../../../../../hooks/useTransactionSummary";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAccount } from "wagmi";
import Error from "../../../../../icons/error";
import { ChainIcon } from "../../../../chain-icon";
import { SUPPORTED_CHAIN_ICONS } from "../../../../../constants";

dayjs.extend(relativeTime);

export const Transaction = <T extends TxType>(tx: Tx<T>) => {
    const { chain } = useAccount();
    const { loading, icon: Icon, title, summary } = useTransactionDetails(tx);

    const [date, setDate] = useState<HTMLHeadingElement | null>(null);
    const [datePopoverOpen, setDatePopoverOpen] = useState(false);

    const href = chain?.blockExplorers
        ? `${chain.blockExplorers.default.url}/tx/${tx.hash}`
        : "";
    const Logo = !!chain ? SUPPORTED_CHAIN_ICONS[chain.id].logo : Error;

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
                                    !!chain
                                        ? SUPPORTED_CHAIN_ICONS[chain.id]
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
                {dayjs.unix(tx.timestamp).fromNow(true)}
            </Typography>
        </div>
    );
};
