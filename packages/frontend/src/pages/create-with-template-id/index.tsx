import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CreationForm, useKPITokenTemplates } from "@carrot-kpi/react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BigNumber, providers } from "ethers";
import { Address, usePrepareSendTransaction, useSendTransaction } from "wagmi";
import { Layout } from "../../components/layout";

interface CreateWithTemplateIdProps {
    customBaseURL?: string;
}

export const CreateWithTemplateId = ({
    customBaseURL,
}: CreateWithTemplateIdProps) => {
    const { i18n } = useTranslation();
    const { templateId } = useParams();
    const ids = useMemo(() => {
        return !templateId ? [] : [templateId];
    }, [templateId]);
    const { loading, templates } = useKPITokenTemplates(ids);

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
    const { sendTransactionAsync } = useSendTransaction(config);

    useEffect(() => {
        if (!sendTransactionAsync) return;
        const fetch = async (): Promise<void> => {
            const tx = await sendTransactionAsync();
            await tx.wait();
            console.log("done");
        };
        void fetch();
    }, [sendTransactionAsync]);

    const handleDone = useCallback(
        (to: Address, data: string, value: BigNumber) => {
            setCreationTx({ to, data, value, gasLimit: 10_000_000 });
        },
        []
    );

    return (
        <Layout navbarBackgroundColor="green">
            {loading || !templates || templates.length !== 1 ? (
                <>Loading...</>
            ) : (
                <CreationForm
                    template={templates[0]}
                    // TODO: use a proper fallback component
                    fallback="Loading..."
                    // TODO: use a proper on done callback
                    customBaseURL={customBaseURL}
                    onDone={handleDone}
                    i18n={i18n}
                />
            )}
        </Layout>
    );
};
