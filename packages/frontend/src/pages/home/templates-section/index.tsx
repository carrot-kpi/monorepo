import { useKpiTokenTemplates } from "@carrot-kpi/react";
import { Button, Title } from "@carrot-kpi/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { TemplateCard } from "../../../components/ui/template-card";

export const TemplatesSection = () => {
    const { t } = useTranslation();
    const { loading, templates } = useKpiTokenTemplates();

    return (
        <div className="relative space-y-16">
            <Title size="6xl">{t("home.templates")}</Title>
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
            <Link to="/templates">
                <Button>{t("templates.viewAll")}</Button>
            </Link>
        </div>
    );
};
