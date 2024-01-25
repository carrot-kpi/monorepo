import { useKPITokenTemplates } from "@carrot-kpi/react";
import { Typography } from "@carrot-kpi/ui";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CardHorizontal } from "../../components/ui/cards-horizontal";
import { Empty } from "../../components/ui/empty";
import { KPITokenTemplateCard } from "../../components/ui/template-card";

interface TemplatesSectionProps {
    templateId?: number;
}

export const TemplatesSection = ({ templateId }: TemplatesSectionProps) => {
    const { t } = useTranslation();
    const ids = useMemo(() => {
        return !templateId ? undefined : [templateId];
    }, [templateId]);
    const { loading, templates } = useKPITokenTemplates({ ids });

    return (
        <div className="w-full max-w-screen-2xl relative flex flex-col gap-16">
            <Typography data-testid="templates-title-text" variant="h1">
                {t("home.templates")}
            </Typography>
            <CardHorizontal>
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
                    <div className="w-full flex justify-center">
                        <Empty
                            title={t("empty.title")}
                            description={t("empty.description")}
                            vertical
                        />
                    </div>
                )}
            </CardHorizontal>
            {/* TODO: implement templates page */}
            {/* <Button>{t("templates.viewAll")}</Button> */}
        </div>
    );
};
