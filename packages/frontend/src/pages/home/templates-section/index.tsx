import { useKPITokenTemplates } from "@carrot-kpi/react";
import { Button, Typography } from "@carrot-kpi/ui";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { KPITokenTemplateCard } from "../../../components/ui/template-card";

interface TemplatesSectionProps {
    templateId?: number;
}

export const TemplatesSection = ({ templateId }: TemplatesSectionProps) => {
    const { t } = useTranslation();
    // FIXME: instead of a useMemo, have a useKPITokenTemplate hook which fetches a single template
    const ids = useMemo(() => {
        return !templateId ? [] : [templateId];
    }, [templateId]);
    const { loading, templates } = useKPITokenTemplates(ids);

    return (
        <div className="relative space-y-16">
            <Typography variant="h2">{t("home.templates")}</Typography>
            <CardHorizontal>
                {loading ? (
                    <>
                        <KPITokenTemplateCard />
                        <KPITokenTemplateCard />
                        <KPITokenTemplateCard />
                        <KPITokenTemplateCard />
                    </>
                ) : (
                    templates.map((template) => (
                        <KPITokenTemplateCard
                            key={template.id}
                            template={template}
                        />
                    ))
                )}
            </CardHorizontal>
            <Button>{t("templates.viewAll")}</Button>
        </div>
    );
};
