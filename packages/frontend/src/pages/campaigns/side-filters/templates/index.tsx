import React from "react";
import { useKPITokenTemplates, useResolvedTemplates } from "@carrot-kpi/react";
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
    const { templates } = useKPITokenTemplates();
    const { loading, resolvedTemplates } = useResolvedTemplates(templates);

    return (
        <CheckboxesFilter
            title={t("sideFilters.templates")}
            groupId="campaigns-templates"
            loading={loading}
            items={resolvedTemplates}
            selected={selectedTemplates}
            setSelected={setSelectedTemplates}
        />
    );
};
