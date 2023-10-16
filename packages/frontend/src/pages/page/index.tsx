import React from "react";
import { KPITokenPage, useWatchKPIToken } from "@carrot-kpi/react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ErrorFeedback, Loader } from "@carrot-kpi/ui";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useBlacklistedTokens } from "../../hooks/useBlacklistedTokens";
import { Navbar } from "../../components/ui/navbar";

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

    return (
        <div className="flex flex-col w-screen h-screen overflow-y-auto overflow-x-hidden bg-orange">
            <Navbar />
            <div className="flex-grow bg-grid-light bg-left-top">
                <KPITokenPage
                    kpiToken={watchedKPITokenWithData}
                    i18n={i18n}
                    fallback={
                        <div className="py-10 text-black flex justify-center">
                            <Loader />
                        </div>
                    }
                    error={
                        <div className="bg-grid-light py-10 flex justify-center">
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
        </div>
    );
};
