import React from "react";
import { useOracleTemplates, useResolvedTemplates } from "@carrot-kpi/react";
import { CheckboxesFilter } from "../checkboxes-filter";
import { useTranslation } from "react-i18next";

export const OraclesFilter = ({
    selectedOracles,

    setSelectedOracles,
}: {
    selectedOracles: Set<string>;
    setSelectedOracles: (newSelectedOracles: Set<string>) => void;
}) => {
    const { t } = useTranslation();
    const { templates } = useOracleTemplates();
    const { loading, resolvedTemplates } = useResolvedTemplates(templates);

    return (
        <CheckboxesFilter
            title={t("sideFilters.oracles")}
            groupId="campaigns-oracles"
            loading={loading}
            items={resolvedTemplates}
            selected={selectedOracles}
            setSelected={setSelectedOracles}
        />
    );
};
