import React, { useCallback, useEffect } from "react";
import { useKpiTokenTemplates } from "@carrot-kpi/react";
import { Template } from "@carrot-kpi/sdk";
import { useState } from "react";
import { CreationForm } from "@carrot-kpi/react";
import { useTranslation } from "react-i18next";
import { BigNumber, providers } from "ethers";
import { Address, usePrepareSendTransaction, useSendTransaction } from "wagmi";

export const Create = () => {
    const { t } = useTranslation();
    const { loading, templates } = useKpiTokenTemplates();
    const [pickedTemplate, setPickedTemplate] = useState<Template | null>(null);
    const [creationTx, setCreationTx] = useState<
        providers.TransactionRequest & {
            to: string;
        }
    >({
        to: "",
        data: "",
        value: BigNumber.from("0"),
    });

    const { config } = usePrepareSendTransaction({
        request: creationTx,
    });
    const {
        sendTransaction,
        isLoading: transactionLoading,
        isSuccess,
    } = useSendTransaction(config);

    const handleDone = useCallback(
        (to: Address, data: string, value: BigNumber) => {
            setCreationTx({ to, data, value });
        },
        []
    );

    useEffect(() => {
        if (sendTransaction) sendTransaction();
    }, [sendTransaction]);

    if (transactionLoading) return <>Awaiting confirmation...</>;
    if (isSuccess) return <>Confirmed!</>;
    if (!!pickedTemplate)
        return <CreationForm template={pickedTemplate} onDone={handleDone} />;
    return (
        <>
            {loading && <>{t("create.loading")}...</>}
            {!loading && templates.length > 0 && (
                <>
                    Pick a KPI token template:
                    <br />
                    <ul>
                        {templates.map((template: Template) => (
                            <div key={template.id}>
                                <ul>
                                    <li>
                                        {t("create.template.title")}:{" "}
                                        {template.specification.name}
                                    </li>
                                    <li>
                                        {t("create.template.version")}:{" "}
                                        {template.version.toString()}
                                    </li>
                                    <li>
                                        {t("create.template.id")}:{" "}
                                        {template.id.toString()}
                                    </li>
                                    <li>
                                        {t("create.template.description")}:{" "}
                                        {template.specification.description}
                                    </li>
                                </ul>
                                <button
                                    onClick={() => {
                                        setPickedTemplate(template);
                                    }}
                                >
                                    {t("create.template.use")}
                                </button>
                            </div>
                        ))}
                    </ul>
                </>
            )}
            {!loading && templates.length === 0 && (
                <>{t("create.noKpiToken")}</>
            )}
        </>
    );
};
