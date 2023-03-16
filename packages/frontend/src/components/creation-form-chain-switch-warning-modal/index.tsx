import React from "react";
import { Button, Loader, Modal, Typography } from "@carrot-kpi/ui";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { ReactComponent as ChainChanged } from "../../assets/chain-changed.svg";
import { useTranslation } from "react-i18next";
import { useKPITokenTemplate } from "@carrot-kpi/react";
import { Template } from "@carrot-kpi/sdk";

interface CreationFormChainSwitchWarningModalProps {
    templateId?: number;
    onDismiss: () => void;
    onSwitch: (template: Template) => void;
}

export const CreationFormChainSwitchWarningModal = ({
    templateId,
    onDismiss,
    onSwitch,
}: CreationFormChainSwitchWarningModalProps) => {
    const { connector: activeConnector } = useAccount();
    const { chain } = useNetwork();
    const { t } = useTranslation();

    const [originalChain, setOriginalChain] = useState(chain);
    const [open, setOpen] = useState(false);

    const { loading, template } = useKPITokenTemplate(templateId);

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

    const handleSwitch = useCallback(() => {
        if (!template) return;
        setOriginalChain(chain);
        onSwitch(template);
    }, [chain, onSwitch, template]);

    return (
        <Modal open={open}>
            <div className="bg-white border border-black rounded-xl p-6 flex flex-col items-center gap-4 z-[1] max-w-md">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <ChainChanged className="w-52" />
                        <Typography variant="h5">
                            {t("network.switch.disabled.title")}
                        </Typography>
                        <Typography>
                            {t(
                                "network.switch.disabled.description.creationForm.templateExistsOnTargetChain.1"
                            )}
                        </Typography>
                        <Typography>
                            {t(
                                "network.switch.disabled.description.creationForm.templateExistsOnTargetChain.2",
                                { chainName: originalChain?.name }
                            )}
                        </Typography>
                        <div className="w-full flex justify-end gap-3">
                            {template && (
                                <Button
                                    onClick={handleSwitch}
                                    disabled={!activeConnector?.switchChain}
                                    variant="secondary"
                                >
                                    {t("network.switch.disabled.switch", {
                                        chainName: chain?.name,
                                    })}
                                </Button>
                            )}
                            <Button onClick={handleDismiss}>
                                {t("network.switch.disabled.close")}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};
