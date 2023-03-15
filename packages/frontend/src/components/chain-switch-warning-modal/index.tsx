import React from "react";
import { Button, Modal, Typography } from "@carrot-kpi/ui";
import { useCallback, useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { ReactComponent as ChainChanged } from "../../assets/chain-changed.svg";
import { useTranslation } from "react-i18next";

interface ChainSwitchWarningModalProps {
    onDismiss: () => void;
}

export const ChainSwitchWarningModal = ({
    onDismiss,
}: ChainSwitchWarningModalProps) => {
    const { chain } = useNetwork();
    const { t } = useTranslation();
    const [originalChain, setOriginalChain] = useState(chain);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!originalChain && chain) setOriginalChain(chain);
    }, [chain, originalChain]);

    useEffect(() => {
        setOpen(!!originalChain && !!chain && originalChain.id !== chain.id);
    }, [chain, originalChain]);

    const handleDismiss = useCallback(() => {
        setOpen(false);
        onDismiss();
    }, [onDismiss]);

    return (
        <Modal open={open}>
            <div className="bg-white border border-black rounded-xl p-6 flex flex-col items-center gap-4 z-[1] max-w-md">
                <ChainChanged className="w-52" />
                <Typography variant="h5">
                    {t("network.switch.disabled.title")}
                </Typography>
                <Typography>
                    {t("network.switch.disabled.description", {
                        chainName: originalChain?.name,
                    })}
                </Typography>
                <Button onClick={handleDismiss} className={{ root: "w-full" }}>
                    {t("network.switch.disabled.action")}
                </Button>
            </div>
        </Modal>
    );
};
