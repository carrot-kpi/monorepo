import React, { useCallback, useEffect, useState } from "react";
import { CreationForm, usePreferences } from "@carrot-kpi/react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BigNumber, providers } from "ethers";
import {
    Address,
    usePrepareSendTransaction,
    useProvider,
    useSendTransaction,
} from "wagmi";
import { Layout } from "../../components/layout";
import { Fetcher } from "@carrot-kpi/sdk";

interface CreateWithTemplateIdProps {
    customBaseURL?: string;
}

export const CreateWithTemplateId = ({
    customBaseURL,
}: CreateWithTemplateIdProps) => {
    const { i18n } = useTranslation();
    const { state } = useLocation();
    const { templateId } = useParams();
    const provider = useProvider();
    const { preferDecentralization } = usePreferences();
    const [loading, setLoading] = useState(false);
    const [template, setTemplate] = useState(state.template);

    useEffect(() => {
        if (!!state.template) {
            setTemplate(state.template);
            return;
        }
        if (!templateId) {
            console.warn("no template in state and no template id");
            return;
        }
        let cancelled = false;
        const fetchData = async () => {
            if (!cancelled) setLoading(true);
            try {
                const templates = await Fetcher.fetchKPITokenTemplates(
                    provider,
                    preferDecentralization,
                    [templateId]
                );
                if (templates.length === 0)
                    console.warn(`no template with id ${templateId} found`);
                if (!cancelled) setTemplate(templates[0]);
            } catch (error) {
                console.error(
                    `could not fetch template with id ${templateId}`,
                    error
                );
            }
        };
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [preferDecentralization, provider, state.template, templateId]);

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
            {loading || !template ? (
                <>Loading...</>
            ) : (
                <CreationForm
                    template={template}
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
