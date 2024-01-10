import { Button, Typography } from "@carrot-kpi/ui";
import React, { useCallback, useEffect, useState } from "react";
import LogoIcon from "../icons/logo-icon";
import { t } from "i18next";
import { useAccount, useSignMessage } from "wagmi";
import { useSetPinningProxyJWT } from "../hooks/useSetPinningProxyJWT";
import { PINNING_PROXY_URL } from "../constants";
import { WalletDisconnected } from "./wallet-disconnected";

interface AuthenticateProps {
    onCancel: () => void;
}

export const Authenticate = ({ onCancel }: AuthenticateProps) => {
    const { address } = useAccount();
    const setPinningProxyJWT = useSetPinningProxyJWT();

    const [loading, setLoading] = useState(false);

    const { data: signedLoginMessage, signMessage } = useSignMessage();

    useEffect(() => {
        const fetchData = async () => {
            if (!address || !signedLoginMessage) return;
            setLoading(true);
            try {
                const response = await fetch(`${PINNING_PROXY_URL}/token`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        address,
                        signature: signedLoginMessage,
                    }),
                });
                if (!response.ok) throw new Error(await response.text());
                const { token } = (await response.json()) as { token: string };
                setPinningProxyJWT(token);
                setLoading(false);
            } catch (error) {
                console.error(
                    "could not get jwt from signed login message",
                    error,
                );
                setLoading(false);
            }
        };
        fetchData();
    }, [address, setPinningProxyJWT, signedLoginMessage]);

    const handleSign = useCallback(() => {
        const fetchSignableMessage = async () => {
            if (!address) return;
            setLoading(true);
            try {
                const response = await fetch(
                    `${PINNING_PROXY_URL}/login-message/${address}`,
                );
                if (!response.ok) throw new Error(await response.text());
                const { message } = (await response.json()) as {
                    message: string;
                };
                signMessage({ message });
            } catch (error) {
                console.error(
                    `could not get and sign the login message for address ${address}`,
                    error,
                );
                setLoading(false);
            }
        };
        fetchSignableMessage();
    }, [address, signMessage]);

    return (
        <div className="w-full h-full flex justify-center">
            <div className="h-fit flex flex-col gap-4 items-center p-8 max-w-lg rounded-xl border border-black dark:border-white bg-white dark:bg-black mx-4">
                {address ? (
                    <>
                        <LogoIcon className="w-40 h-40" />
                        <Typography
                            data-testid="welcome-to-carrot-modal-title"
                            variant="xl"
                            weight="bold"
                            className={{ root: "text-center" }}
                        >
                            {t("authenticate.title")}
                        </Typography>
                        <Typography
                            data-testid="welcome-to-carrot-modal-description"
                            className={{
                                root: "text-center mb-4",
                            }}
                        >
                            {t("authenticate.summary")}
                        </Typography>
                        <div className="flex gap-4">
                            <Button
                                data-testid="welcome-to-carrot-modal-cancel-button"
                                variant="secondary"
                                size="small"
                                onClick={onCancel}
                            >
                                {t("authenticate.cancel")}
                            </Button>
                            <Button
                                data-testid="welcome-to-carrot-modal-sign-message-button"
                                size="small"
                                onClick={handleSign}
                                loading={loading}
                            >
                                {t("authenticate.sign")}
                            </Button>
                        </div>
                    </>
                ) : (
                    <WalletDisconnected />
                )}
            </div>
        </div>
    );
};
