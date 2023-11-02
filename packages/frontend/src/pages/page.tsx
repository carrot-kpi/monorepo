import React, { useEffect } from "react";
import { KPITokenPage, useWatchKPIToken } from "@carrot-kpi/react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ErrorFeedback, Loader } from "@carrot-kpi/ui";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useBlacklistedTokens } from "../hooks/useBlacklistedTokens";
import { Layout } from "../components/layout";

export const Page = () => {
    const { i18n, t } = useTranslation();
    const { state } = useLocation();
    const { address } = useParams();
    const addTransaction = useAddTransaction();
    const { blacklistedKPITokens } = useBlacklistedTokens();

    const watchedKPITokenWithData = useWatchKPIToken({
        kpiTokenOrAddress: state?.kpiToken || address,
        blacklisted: blacklistedKPITokens,
    });

    useEffect(() => {
        const bodyElement = window.document.getElementById("__app_body");
        if (!bodyElement) return;
        bodyElement.scrollIntoView();
    }, []);

    return (
        <Layout navbarBgColor="orange">
            <div className="h-fit flex-grow bg-grid-light bg-left-top bg-orange">
                <KPITokenPage
                    kpiToken={watchedKPITokenWithData}
                    i18n={i18n}
                    fallback={
                        <div className="h-screen py-20 text-black flex justify-center items-center">
                            <Loader />
                        </div>
                    }
                    error={
                        <div className="h-screen py-20 bg-grid-light flex justify-center items-center">
                            <ErrorFeedback
                                messages={{
                                    title: t("error.initializing.page.title"),
                                    description: t(
                                        "error.initializing.page.description",
                                    ),
                                }}
                            />
                        </div>
                    }
                    className={{ root: "w-full h-full" }}
                    onTx={addTransaction}
                />
            </div>
        </Layout>
    );
};
