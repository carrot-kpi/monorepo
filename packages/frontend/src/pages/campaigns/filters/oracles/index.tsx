import React from "react";
import { useOracleTemplates } from "@carrot-kpi/react";
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
    const { loading, templates } = useOracleTemplates();

    return (
        <CheckboxesFilter
            title={t("filters.oracles")}
            groupId="campaigns-oracles"
            loading={loading}
            items={templates}
            selected={selectedOracles}
            setSelected={setSelectedOracles}
        />
    );
};
