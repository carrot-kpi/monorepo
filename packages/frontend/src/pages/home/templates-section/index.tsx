import { useKPITokenTemplates } from "@carrot-kpi/react";
import { Button, Carousel, Typography } from "@carrot-kpi/ui";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalSpacing } from "../../../components/ui/horizontal-spacing";
import { KPITokenTemplateCard } from "../../../components/ui/template-card";

interface TemplatesSectionProps {
    templateId?: number;
}

export const TemplatesSection = ({ templateId }: TemplatesSectionProps) => {
    const { t } = useTranslation();
    // FIXME: instead of a useMemo, have a useKPITokenTemplate hook which fetches a single template
    const ids = useMemo(() => {
        return !templateId ? undefined : [templateId];
    }, [templateId]);
    const { loading, templates } = useKPITokenTemplates(ids);

    return (
        <div className="relative space-y-16">
            <HorizontalSpacing>
                <Typography variant="h2">{t("home.templates")}</Typography>
            </HorizontalSpacing>
            <Carousel>
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
            </Carousel>
            <HorizontalSpacing>
                <Button>{t("templates.viewAll")}</Button>
            </HorizontalSpacing>
        </div>
    );
};
