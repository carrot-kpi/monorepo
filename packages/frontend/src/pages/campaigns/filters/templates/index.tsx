import React from "react";
import { useKPITokenTemplates } from "@carrot-kpi/react";
import { CheckboxesFilter } from "../checkboxes-filter";
import { useTranslation } from "react-i18next";

export const TemplatesFilter = ({
    selectedTemplates,
    setSelectedTemplates,
}: {
    selectedTemplates: Set<string>;
    setSelectedTemplates: (newSelectedTemplates: Set<string>) => void;
}) => {
    const { t } = useTranslation();
    const { loading, templates } = useKPITokenTemplates();

    return (
        <CheckboxesFilter
            title={t("filters.templates")}
            groupId="campaigns-templates"
            loading={loading}
            items={templates}
            selected={selectedTemplates}
            setSelected={setSelectedTemplates}
        />
    );
};
