import React from "react";
import { t } from "i18next";
import ErrorIcon from "../icons/error";
import { Button, Typography } from "@carrot-kpi/ui";
import { useAccount } from "wagmi";
import { DISCORD_LINK } from "../constants";
import { WalletDisconnected } from "./wallet-disconnected";

interface PermissionedProps {
    onBack: () => void;
}

export const Permissioned = ({ onBack }: PermissionedProps) => {
    const { address } = useAccount();

    return (
        <div className="w-full h-full flex justify-center">
            <div className="h-fit flex flex-col gap-4 items-center p-8 max-w-lg rounded-xl border border-black dark:border-white bg-white dark:bg-black mx-4">
                {address ? (
                    <>
                        <ErrorIcon className="w-52 h-52" />
                        <Typography
                            variant="h4"
                            className={{ root: "text-center" }}
                        >
                            {t("permissioned.mode.title")}
                        </Typography>
                        <Typography
                            className={{
                                root: "text-center mb-4",
                            }}
                        >
                            {t("permissioned.mode.description")}
                        </Typography>
                        <div className="flex gap-4">
                            <Button
                                size="small"
                                variant="secondary"
                                onClick={onBack}
                            >
                                {t("permissioned.mode.back")}
                            </Button>
                            <Button
                                size="small"
                                href={DISCORD_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t("permissioned.mode.discord")}
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
