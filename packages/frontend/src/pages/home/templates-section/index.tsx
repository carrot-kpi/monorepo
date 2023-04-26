import { useKPITokenTemplates } from "@carrot-kpi/react";
import { Typography } from "@carrot-kpi/ui";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { Empty } from "../../../components/ui/empty";
import { KPITokenTemplateCard } from "../../../components/ui/template-card";

interface TemplatesSectionProps {
    templateId?: number;
}

export const TemplatesSection = ({ templateId }: TemplatesSectionProps) => {
    const { t } = useTranslation();
    const ids = useMemo(() => {
        return !templateId ? undefined : [templateId];
    }, [templateId]);
    const { loading, templates } = useKPITokenTemplates(ids);

    return (
        <div className="relative space-y-16">
            <Typography
                variant="h2"
                className={{ root: "px-6 md:px-10 lg:px-32" }}
            >
                {t("home.templates")}
            </Typography>
            <CardHorizontal className="px-6 md:px-10 lg:px-32">
                {loading ? (
                    <>
                        <KPITokenTemplateCard />
                        <KPITokenTemplateCard />
                        <KPITokenTemplateCard />
                        <KPITokenTemplateCard />
                    </>
                ) : templates.length > 0 ? (
                    templates.map((template) => (
                        <KPITokenTemplateCard
                            key={template.id}
                            template={template}
                        />
                    ))
                ) : (
                    <Empty />
                )}
            </CardHorizontal>
            {/* TODO: implement templates page */}
            {/* <Button>{t("templates.viewAll")}</Button> */}
        </div>
    );
};
