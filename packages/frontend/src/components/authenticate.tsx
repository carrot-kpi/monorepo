import { Button, Typography } from "@carrot-kpi/ui";
import React, { useCallback, useEffect, useState } from "react";
import LogoIcon from "../icons/logo-icon";
import { t } from "i18next";
import { useAccount, useSignMessage } from "wagmi";
import { useSetDataManagerJWT } from "../hooks/useSetDataManagerJWT";
import { WalletDisconnected } from "./wallet-disconnected";
import { SERVICE_URLS } from "@carrot-kpi/sdk";

interface AuthenticateProps {
    onCancel: () => void;
}

export const Authenticate = ({ onCancel }: AuthenticateProps) => {
    const { address } = useAccount();
    const setDataManagerJWT = useSetDataManagerJWT();

    const [loading, setLoading] = useState(false);

    const { data: signedLoginMessage, signMessage } = useSignMessage();

    useEffect(() => {
        const fetchData = async () => {
            if (!address || !signedLoginMessage) return;
            setLoading(true);
            try {
                const response = await fetch(
                    `${SERVICE_URLS[__ENVIRONMENT__].dataManager}/token`,
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            address,
                            signature: signedLoginMessage,
                        }),
                    },
                );
                if (!response.ok) throw new Error(await response.text());
                const { token } = (await response.json()) as { token: string };
                setDataManagerJWT(token);
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
    }, [address, setDataManagerJWT, signedLoginMessage]);

    const handleSign = useCallback(() => {
        const fetchSignableMessage = async () => {
            if (!address) return;
            setLoading(true);
            try {
                const response = await fetch(
                    `${SERVICE_URLS[__ENVIRONMENT__].dataManager}/login-message/${address}`,
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
                            data-testid="authenticate-modal-title"
                            variant="xl"
                            weight="bold"
                            className={{ root: "text-center" }}
                        >
                            {t("authenticate.title")}
                        </Typography>
                        <Typography
                            data-testid="authenticate-modal-description"
                            className={{
                                root: "text-center mb-4",
                            }}
                        >
                            {t("authenticate.summary")}
                        </Typography>
                        <div className="flex gap-4">
                            <Button
                                data-testid="authenticate-modal-cancel-button"
                                variant="secondary"
                                size="small"
                                onClick={onCancel}
                            >
                                {t("authenticate.cancel")}
                            </Button>
                            <Button
                                data-testid="authenticate-modal-sign-message-button"
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
