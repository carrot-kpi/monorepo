import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Popover, Typography } from "@carrot-kpi/ui";
import { forwardRef } from "react";
import { Address, useConnect, useEnsName, useNetwork } from "wagmi";
import { ReadonlyConnector } from "../../../../connectors/readonly";
import { shortenAddress } from "../../../../utils/address";
import { Avatar } from "../../avatar";
import { ReactComponent as Power } from "../../../../assets/power.svg";
import { ReactComponent as External } from "../../../../assets/external.svg";
import { ReactComponent as Copy } from "../../../../assets/copy.svg";
import { ReactComponent as Tick } from "../../../../assets/tick.svg";
import { useCopyToClipboard } from "react-use";
import { cva } from "class-variance-authority";

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
        });
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
            if (!!readonlyConnector) connect({ connector: readonlyConnector });
            onClose();
        }, [connect, onClose, readonlyConnector]);

        const handleCopyToClipboardClick = useCallback(() => {
            copyToClipboard(address);
        }, [address, copyToClipboard]);

        return (
            <Popover
                open={open}
                anchor={anchor}
                ref={ref}
                className={{ root: "px-6 py-7 flex gap-5" }}
            >
                <div className="flex gap-4 items-center">
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
                    <Button
                        size="xsmall"
                        icon={External}
                        disabled={!blockExplorerHref}
                        href={blockExplorerHref || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={{ root: "w-10 h-10 p-0" }}
                    />
                    <Button
                        size="xsmall"
                        icon={Power}
                        onClick={handleDisconnectClick}
                        className={{ root: "w-10 h-10 p-0" }}
                    />
                </div>
            </Popover>
        );
    }
);
