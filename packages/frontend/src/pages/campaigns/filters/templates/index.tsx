import React from "react";
import { useKPITokenTemplates } from "@carrot-kpi/react";
import { CARROT_DEFAULT_TEMPLATE_ID } from "../utils";
import { Template } from "@carrot-kpi/sdk";
import { CheckboxesFilter } from "../checkboxes-filter";

export const TemplatesFilter = ({
    selectedTemplates,
    setSelectedTemplates,
}: {
    selectedTemplates: Set<number>;
    setSelectedTemplates: (newSelectedTemplates: Set<number>) => void;
}) => {
    const { loading, templates } = useKPITokenTemplates();

    const defaultChecked = (item: Template) =>
        item.id === CARROT_DEFAULT_TEMPLATE_ID;

    return (
        <CheckboxesFilter
            title="Templates"
            groupId="campaigns-templates"
            loading={loading}
            items={templates}
            selected={selectedTemplates}
            setSelected={setSelectedTemplates}
            defaultChecked={defaultChecked}
        />
    );
};
