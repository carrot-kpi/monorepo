import React from "react";
import { useKPITokenTemplates } from "@carrot-kpi/react";
import { CheckboxesFilter } from "../checkboxes-filter";

export const TemplatesFilter = ({
    selectedTemplates,
    setSelectedTemplates,
}: {
    selectedTemplates: Set<string>;
    setSelectedTemplates: (newSelectedTemplates: Set<string>) => void;
}) => {
    const { loading, templates } = useKPITokenTemplates();

    return (
        <CheckboxesFilter
            title="Templates"
            groupId="campaigns-templates"
            loading={loading}
            items={templates}
            selected={selectedTemplates}
            setSelected={setSelectedTemplates}
        />
    );
};
