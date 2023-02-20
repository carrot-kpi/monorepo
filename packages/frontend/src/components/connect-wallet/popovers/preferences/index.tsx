import React, { useCallback, useMemo } from "react";
import { Button, Popover } from "@carrot-kpi/ui";
import { forwardRef } from "react";
import { useConnect } from "wagmi";
import { ReadonlyConnector } from "../../../../connectors/readonly";

interface PreferencesPopoverProps {
    open: boolean;
    onClose: () => void;
    anchor?: HTMLElement | null;
}

export const PreferencesPopover = forwardRef<
    HTMLDivElement,
    PreferencesPopoverProps
>(function PreferencesPopover({ open, anchor, onClose }, ref) {
    const { connectors, connect } = useConnect();
    const readonlyConnector = useMemo(() => {
        return connectors.find(
            (connector) => connector instanceof ReadonlyConnector
        );
    }, [connectors]);

    const handleDisconnectClick = useCallback(() => {
        if (!!readonlyConnector) connect({ connector: readonlyConnector });
        onClose();
    }, [connect, onClose, readonlyConnector]);

    return (
        <Popover
            open={open}
            anchor={anchor}
            ref={ref}
            className={{ root: "px-6 py-7 flex flex-col gap-4" }}
        >
            <Button onClick={handleDisconnectClick}>Disconnect</Button>
        </Popover>
    );
});
