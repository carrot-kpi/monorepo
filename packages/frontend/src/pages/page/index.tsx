import React from "react";
import { KPITokenPage } from "@carrot-kpi/react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/layout";

interface PageProps {
    customBaseURL?: string;
}

export const Page = ({ customBaseURL }: PageProps) => {
    const { address } = useParams();
    const { i18n } = useTranslation();

    return (
        <Layout>
            <KPITokenPage
                address={address}
                i18n={i18n}
                // TODO: use a proper fallback component
                fallback="Loading..."
                customBaseURL={customBaseURL}
            />
        </Layout>
    );
};
