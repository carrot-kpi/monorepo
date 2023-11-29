import React, { useCallback, useEffect } from "react";
import {
    KPITokenCreationForm,
    usePreferDecentralization,
    type SerializableObject,
    type TemplateComponentStateUpdater,
    useIPFSGatewayURL,
} from "@carrot-kpi/react";
import { useState } from "react";
import { Fetcher, type ResolvedTemplate } from "@carrot-kpi/sdk";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorFeedback, Loader } from "@carrot-kpi/ui";
import { useTranslation } from "react-i18next";
import { useInvalidateLatestKPITokens } from "../hooks/useInvalidateLatestKPITokens";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useAccount, useNetwork, usePublicClient } from "wagmi";

export function CampaignCreationForm<S extends SerializableObject<S>>() {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const { templateId } = useParams();
    const publicClient = usePublicClient();
    const { state } = useLocation();
    const { chain } = useNetwork();
    const { address } = useAccount();
    const addTransaction = useAddTransaction();
    const invalidateLatestKPITokens = useInvalidateLatestKPITokens();
    const preferDecentralization = usePreferDecentralization();
    const ipfsGatewayURL = useIPFSGatewayURL();

    const [loading, setLoading] = useState(true);
    const [template, setTemplate] = useState<ResolvedTemplate | null>(
        state && "specification" in state.template ? state.template : null,
    );
    const [formKey, setFormKey] = useState(0);
    const [draftState, setDraftState] = useState<{
        templateId?: number;
        state: S;
    }>({
        templateId: undefined,
        state: {} as S,
    });

    // every time the chain or the connected address changes,
    // reset the creation form state
    useEffect(() => {
        setFormKey((prevState) => prevState + 1);
    }, [chain, address]);

    useEffect(() => {
        if (!!state?.template) {
            setDraftState((previousState) => ({
                templateId: state.template.id,
                state: previousState.state,
            }));
            setTemplate(state.template);
            return;
        }
        if (!templateId) {
            console.warn("no template in state and no template id");
            return;
        }
        const parsedTemplateId = parseInt(templateId);
        if (isNaN(parsedTemplateId)) {
            console.warn(`non numeric template id ${templateId}`);
            return;
        }
        let cancelled = false;
        const fetchData = async () => {
            if (!cancelled) setLoading(true);
            try {
                const templates = await Fetcher.fetchKPITokenTemplates({
                    publicClient,
                    preferDecentralization,
                    ids: [parsedTemplateId],
                });
                if (templates.length !== 1) {
                    console.warn(
                        `inconsistent array length while fetching template with id ${templateId} on ${chain?.name}`,
                    );
                    if (!cancelled) setTemplate(null);
                    return;
                }
                const resolvedTemplates = await Fetcher.resolveTemplates({
                    ipfsGatewayURL,
                    templates: templates,
                });
                if (resolvedTemplates.length !== 1) {
                    console.warn(
                        `inconsistent array length while resolving template with id ${templateId} on ${chain?.name}`,
                    );
                    if (!cancelled) setTemplate(null);
                    return;
                }
                const resolvedTemplate = resolvedTemplates[0];
                setDraftState((previousState) => ({
                    templateId: resolvedTemplate.id,
                    state: previousState.state,
                }));
                if (!cancelled) setTemplate(resolvedTemplate);
            } catch (error) {
                console.error(
                    `could not fetch template with id ${templateId}`,
                    error,
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [
        chain?.name,
        ipfsGatewayURL,
        preferDecentralization,
        publicClient,
        state?.template,
        templateId,
    ]);

    const handleStateChange = useCallback(
        (stateOrUpdater: S | TemplateComponentStateUpdater<S>) => {
            setDraftState((prevState) => {
                const newState =
                    typeof stateOrUpdater === "function"
                        ? stateOrUpdater(prevState.state)
                        : (stateOrUpdater as S);

                return {
                    templateId: prevState.templateId,
                    state: newState,
                };
            });
        },
        [],
    );

    const handleCreate = useCallback(() => {
        invalidateLatestKPITokens();
    }, [invalidateLatestKPITokens]);

    return loading ? (
        <div className="h-screen py-20 text-black flex justify-center">
            <Loader />
        </div>
    ) : template ? (
        <KPITokenCreationForm
            key={formKey}
            template={template}
            fallback={
                <div className="h-screen py-20 text-black flex justify-center">
                    <Loader />
                </div>
            }
            error={
                <div className="h-screen py-20 flex justify-center">
                    <ErrorFeedback
                        messages={{
                            title: t("error.initializing.creation.title"),
                            description: t(
                                "error.initializing.creation.description",
                            ),
                        }}
                    />
                </div>
            }
            i18n={i18n}
            className={{ root: "w-full h-full" }}
            state={draftState.state}
            onStateChange={handleStateChange}
            onCreate={handleCreate}
            navigate={navigate}
            onTx={addTransaction}
        />
    ) : (
        <div className="py-20 flex justify-center">
            <ErrorFeedback
                messages={{
                    title: t("error.initializing.creation.title"),
                    description: t("error.initializing.creation.description"),
                }}
            />
        </div>
    );
}
