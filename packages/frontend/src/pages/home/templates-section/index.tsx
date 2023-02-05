import { useKPITokenTemplates } from "@carrot-kpi/react";
import { Button, Typography } from "@carrot-kpi/ui";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { TemplateCard } from "../../../components/ui/template-card";

interface TemplatesSectionProps {
    templateId?: number;
}

export const TemplatesSection = ({ templateId }: TemplatesSectionProps) => {
    const { t } = useTranslation();
    const ids = useMemo(() => {
        return !templateId ? [] : [templateId];
    }, [templateId]);
    const { loading, templates } = useKPITokenTemplates(ids);

    return (
        <div className="relative space-y-16">
            <Typography variant="h2">{t("home.templates")}</Typography>
            <CardHorizontal>
                {loading
                    ? t("loading")
                    : templates.map((template) => (
                          <TemplateCard
                              id={template.id}
                              key={template.id}
                              name={template.specification.name}
                              description={template.specification.description}
                              tags={template.specification.tags}
                              version={template.version}
                              address={template.address}
                              used={0}
                              verified
                          />
                      ))}
            </CardHorizontal>
            <Button>{t("templates.viewAll")}</Button>
        </div>
    );
};
