import { useKpiTokenTemplates } from "@carrot-kpi/react";
import { Button, Typography } from "@carrot-kpi/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { TemplateCard } from "../../../components/ui/template-card";

export const TemplatesSection = () => {
    const { t } = useTranslation();
    const { loading, templates } = useKpiTokenTemplates();

    return (
        <div className="relative space-y-16">
            <Typography variant="h2">{t("home.templates")}</Typography>
            <CardHorizontal>
                {loading
                    ? t("loading")
                    : templates.map((template) => (
                          <TemplateCard
                              key={template.id}
                              name={template.specification.name}
                              description={template.specification.description}
                              version={template.version}
                              address={template.address}
                              used={0}
                              verified
                          />
                      ))}
            </CardHorizontal>
            <Button>{t("create.campaign")}</Button>
        </div>
    );
};
