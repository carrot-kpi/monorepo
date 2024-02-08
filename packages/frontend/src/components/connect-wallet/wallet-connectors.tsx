import React from "react";
import { Typography } from "@carrot-kpi/ui";
import { useAccount, useConnect } from "wagmi";
import { READONLY_CONNNECTOR_ID, getConnectorIcon } from "../../connectors";
import { cva } from "class-variance-authority";

const rootStyles = cva(["flex", "flex-col", "gap-4"]);

const connectorStyles = cva([
    "flex",
    "gap-4",
    "cursor-pointer",
    "p-5",
    "rounded-lg",
    "border",
    "border-black",
    "hover:cursor-pointer",
    "hover:border-black",
]);

export const WalletConnectors = () => {
    const { chain } = useAccount();
    const { connectors, connect } = useConnect();

    return (
        <div className={rootStyles()}>
            {connectors.map((connector) => {
                if (connector.id === READONLY_CONNNECTOR_ID) return null;
                const Logo = getConnectorIcon(connector);
                return (
                    <div
                        data-testid={`${connector.name}-wallet-button`}
                        key={connector.id}
                        className={connectorStyles()}
                        onClick={() => {
                            connect({ connector, chainId: chain?.id });
                        }}
                    >
                        {!!Logo && <Logo width={28} height={28} />}
                        <Typography>{connector.name}</Typography>
                    </div>
                );
            })}
        </div>
    );
};
