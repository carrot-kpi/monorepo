import { useKPITokenTemplates } from "@carrot-kpi/react";
import { Button, Typography, SwiperCarousel } from "@carrot-kpi/ui";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalSpacing } from "../../../components/ui/horizontal-spacing";
import { KPITokenTemplateCard } from "../../../components/ui/template-card";

interface TemplatesSectionProps {
    templateId?: number;
}

const TOKEN_TEMPLATE_AMOUNTS = 5;

const placeholder = new Array(TOKEN_TEMPLATE_AMOUNTS)
    .fill(null)
    .map((_, index) => <KPITokenTemplateCard key={index} />);

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
            <SwiperCarousel>
                {loading
                    ? placeholder
                    : templates.map((template) => (
                          <KPITokenTemplateCard
                              key={template.id}
                              template={template}
                          />
                      ))}
            </SwiperCarousel>
            <HorizontalSpacing>
                <Button>{t("templates.viewAll")}</Button>
            </HorizontalSpacing>
        </div>
    );
};
