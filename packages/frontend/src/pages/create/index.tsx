import React from "react";
import { useKPITokenTemplates, useResetPageScroll } from "@carrot-kpi/react";
import { Template } from "@carrot-kpi/sdk/lib/entities/template";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Layout } from "../../components/layout";

export const Create = () => {
    useResetPageScroll();
    const { t } = useTranslation();
    const { loading, templates } = useKPITokenTemplates();

    return (
        <Layout>
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
                                <Link to={`/create/${template.id}`}>
                                    {t("create.template.use")}
                                </Link>
                            </div>
                        ))}
                    </ul>
                </>
            )}
            {!loading && templates.length === 0 && (
                <>{t("create.noKPIToken")}</>
            )}
        </Layout>
    );
};
