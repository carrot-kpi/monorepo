import React, {
    useCallback,
    useEffect,
    type Dispatch,
    type SetStateAction,
} from "react";
import {
    KPITokenCreationForm,
    usePreferDecentralization,
    type SerializableObject,
    type TemplateComponentStateUpdater,
    useIPFSGatewayURL,
} from "@carrot-kpi/react";
import { useState } from "react";
import { Fetcher, type ResolvedTemplate } from "@carrot-kpi/sdk";
import {
    useBlocker,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {
    Button,
    ErrorFeedback,
    Loader,
    Modal,
    Typography,
} from "@carrot-kpi/ui";
import { useTranslation } from "react-i18next";
import { useInvalidateLatestKPITokens } from "../hooks/useInvalidateLatestKPITokens";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useAccount, usePublicClient } from "wagmi";
import { useAddDraft } from "../hooks/useAddDraft";
import { useDraft } from "../hooks/useDraft";
import dayjs from "dayjs";
import { clearDraftState, sha256 } from "../utils/draft";
import { useDebounce } from "react-use";

export function CampaignCreationForm<S extends SerializableObject<S>>() {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const { templateId, draftId } = useParams();
    const publicClient = usePublicClient();
    const { state } = useLocation();
    const { address, chain } = useAccount();
    const addTransaction = useAddTransaction();
    const addDraft = useAddDraft();
    const invalidateLatestKPITokens = useInvalidateLatestKPITokens();
    const preferDecentralization = usePreferDecentralization();
    const ipfsGatewayURL = useIPFSGatewayURL();

    const [loading, setLoading] = useState(false);
    const [template, setTemplate] = useState<ResolvedTemplate | null>(
        state && "specification" in state.template ? state.template : null,
    );
    const [formKey, setFormKey] = useState(0);
    const [currentDraftId, setCurrentDraftId] = useState<number>(0);

    const existingDraft = useDraft(currentDraftId);
    const [draftState, setDraftState] = useState<{
        templateId?: number;
        state: S;
    }>({
        templateId: undefined,
        state: {} as S,
    });

    const [snapshotDraftHash, setSnapshotDraftHash] = useState<
        string | undefined
    >(undefined);
    const [currentDraftHash, setCurrentDraftHash] = useState<
        string | undefined
    >(undefined);

    const handleCreateDraft = useCallback(() => {
        if (!template) {
            console.log("couldn't create draft, missing template id");
            return;
        }
        addDraft(currentDraftId, template?.id, draftState.state);
    }, [currentDraftId, addDraft, draftState, template]);

    const snapshotDraft = useCallback(
        async (
            data: S,
            updater: Dispatch<SetStateAction<string | undefined>>,
        ) => {
            const hash = await sha256(JSON.stringify(clearDraftState(data)));
            updater(hash);
        },
        [],
    );

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            snapshotDraftHash !== currentDraftHash &&
            currentLocation.pathname !== nextLocation.pathname,
    );

    // set the initial snapshot hash
    useEffect(() => {
        if (!!snapshotDraftHash || Object.keys(draftState.state).length === 0)
            return;
        snapshotDraft(draftState.state, setSnapshotDraftHash);
    }, [draftState, snapshotDraftHash, snapshotDraft]);

    // updates the snapshot hash on draft update
    useEffect(() => {
        if (!existingDraft) return;
        snapshotDraft(existingDraft.body as S, setSnapshotDraftHash);
    }, [existingDraft, snapshotDraft]);

    // updates the current draf hash on every change
    useDebounce(
        () => {
            snapshotDraft(draftState.state, setCurrentDraftHash);
        },
        100,
        [draftState.state, snapshotDraft],
    );

    useEffect(() => {
        const beforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            // the returnValue value doesn't matter, it gets overrided by the browser
            return (event.returnValue = "unsaved");
        };

        if (snapshotDraftHash !== currentDraftHash)
            window.addEventListener("beforeunload", beforeUnload);

        return () => {
            window.removeEventListener("beforeunload", beforeUnload);
        };
    }, [snapshotDraftHash, currentDraftHash]);

    // every time the chain, the connected address or the draft id changes,
    // reset the creation form state
    useEffect(() => {
        setFormKey((prevState) => prevState + 1);
    }, [chain, address, currentDraftId]);

    // initialize the current draft id
    useEffect(() => {
        // if (currentDraftId) return;
        setCurrentDraftId(draftId ? parseInt(draftId) : dayjs().unix());
    }, [currentDraftId, draftId]);

    useEffect(() => {
        if (!!existingDraft?.id) {
            setDraftState({
                templateId: existingDraft.templateId,
                state: existingDraft.body as S,
            });
        }
    }, [existingDraft]);

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
        if (!publicClient) {
            console.warn("no public client");
            return;
        }
        if (!chain) {
            console.warn("no chain");
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
                    preferDecentralization,
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
        chain,
        ipfsGatewayURL,
        preferDecentralization,
        publicClient,
        state?.template,
        templateId,
    ]);

    const handleStateChange = useCallback(
        async (stateOrUpdater: S | TemplateComponentStateUpdater<S>) => {
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
        <>
            <Modal open={blocker.state === "blocked"} onDismiss={blocker.reset}>
                <div className="bg-white border border-black rounded-xl p-8 flex flex-col items-center gap-4 z-[1] max-w-md">
                    <Typography variant="h4">
                        {t("drafts.unsaved.changes.title")}
                    </Typography>
                    <Typography>
                        {t("drafts.unsaved.changes.description")}
                    </Typography>
                    <div className="flex gap-4">
                        <Button
                            size="small"
                            variant="secondary"
                            onClick={blocker.proceed}
                        >
                            {t("drafts.unsaved.changes.leave")}
                        </Button>
                        <Button size="small" onClick={blocker.reset}>
                            {t("drafts.unsaved.changes.save")}
                        </Button>
                    </div>
                </div>
            </Modal>
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
                onCreateDraft={handleCreateDraft}
            />
        </>
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
