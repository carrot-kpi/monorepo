import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Popover, Typography } from "@carrot-kpi/ui";
import { forwardRef } from "react";
import { Address, useConnect, useEnsName, useNetwork } from "wagmi";
import { ReadonlyConnector } from "../../../../connectors/readonly";
import { shortenAddress } from "../../../../utils/address";
import { Avatar } from "../../avatar";
import Power from "../../../../icons/power";
import External from "../../../../icons/external";
import Copy from "../../../../icons/copy";
import Tick from "../../../../icons/tick";
import Bin from "../../../../icons/bin";
import { useCopyToClipboard } from "react-use";
import { cva } from "class-variance-authority";
import { useTransactions } from "../../../../hooks/useTransactions";
import { useClearTransactions } from "../../../../hooks/useClearTransactions";
import { Empty } from "../../../ui/empty";
import { Transaction } from "./transaction";
import { t } from "i18next";

const copyAddressStyles = cva(["w-10", "h-10", "p-0"], {
    variants: {
        copiedToClipboard: {
            true: [
                "bg-green",
                "hover:bg-green",
                "text-black",
                "hover:text-black",
            ],
        },
    },
});

interface AccountPopoverProps {
    address: string;
    open: boolean;
    onClose: () => void;
    anchor?: HTMLElement | null;
}

export const AccountPopover = forwardRef<HTMLDivElement, AccountPopoverProps>(
    function AccountPopover({ address, open, anchor, onClose }, ref) {
        const { chain } = useNetwork();
        const { data: ensName } = useEnsName({
            address: address as Address,
            enabled: !!(
                chain &&
                chain.contracts &&
                chain.contracts.ensRegistry
            ),
        });
        const transactions = useTransactions();
        const clearTransactions = useClearTransactions();
        const { connectors, connect } = useConnect();
        const readonlyConnector = useMemo(() => {
            return connectors.find(
                (connector) => connector instanceof ReadonlyConnector
            );
        }, [connectors]);
        const blockExplorerHref = useMemo(() => {
            if (!address || !chain || !chain.blockExplorers) return "";
            return `${chain.blockExplorers.default.url}/address/${address}`;
        }, [address, chain]);

        const [clipboardState, copyToClipboard] = useCopyToClipboard();
        const [copiedToClipboard, setCopiedToClipboard] = useState(false);

        useEffect(() => {
            if (!clipboardState.value) return;

            setCopiedToClipboard(true);
            const timer = setTimeout(() => {
                clipboardState.value = undefined;
                setCopiedToClipboard(false);
            }, 1000);

            return () => {
                clearTimeout(timer);
            };
        }, [clipboardState]);

        const handleDisconnectClick = useCallback(() => {
            if (!!readonlyConnector)
                connect({ connector: readonlyConnector, chainId: chain?.id });
            onClose();
        }, [connect, onClose, readonlyConnector, chain?.id]);

        const handleCopyToClipboardClick = useCallback(() => {
            copyToClipboard(address);
        }, [address, copyToClipboard]);

        return (
            <Popover
                placement="bottom-start"
                open={open}
                anchor={anchor}
                ref={ref}
                className={{
                    root: "w-fit md:w-96 p-4 flex flex-col gap-7",
                }}
            >
                <div className="w-full flex justify-between gap-5">
                    <div className="flex gap-3 items-center">
                        <Avatar address={address} variant="lg" />
                        <Typography>
                            {ensName || shortenAddress(address)}
                        </Typography>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Button
                            size="xsmall"
                            icon={copiedToClipboard ? Tick : Copy}
                            onClick={handleCopyToClipboardClick}
                            className={{
                                root: copyAddressStyles({ copiedToClipboard }),
                            }}
                        />
                        {!__PREVIEW_MODE__ && (
                            <Button
                                size="xsmall"
                                icon={External}
                                disabled={!blockExplorerHref}
                                href={blockExplorerHref || ""}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={{
                                    root: "hidden md:flex w-10 h-10 p-0",
                                }}
                            />
                        )}
                        <Button
                            size="xsmall"
                            icon={Power}
                            onClick={handleDisconnectClick}
                            className={{ root: "w-10 h-10 p-0" }}
                        />
                    </div>
                </div>
                <div className="w-full hidden md:flex justify-between items-center gap-6">
                    <Typography weight="medium" uppercase>
                        {t("activity.recent")}
                    </Typography>
                    <Button
                        size="xsmall"
                        icon={Bin}
                        disabled={transactions.length === 0}
                        onClick={clearTransactions}
                        className={{
                            root: "w-10 h-10 p-0",
                        }}
                    />
                </div>
                <div className="w-full hidden md:flex">
                    {transactions.length === 0 ? (
                        <Empty
                            vertical
                            titleVariant="h4"
                            descriptionVariant="sm"
                            className={{ icon: "h-20" }}
                        />
                    ) : (
                        <div className="h-64 pr-0.5 overflow-y-auto cui-scrollbar">
                            {transactions
                                .sort((a, b) => b.timestamp - a.timestamp)
                                .map((tx) => {
                                    return (
                                        <Transaction key={tx.hash} {...tx} />
                                    );
                                })}
                        </div>
                    )}
                </div>
            </Popover>
        );
    }
);
