import React from "react";
import { useOracleTemplates } from "@carrot-kpi/react";
import { CheckboxesFilter } from "../checkboxes-filter";

export const OraclesFilter = ({
    selectedOracles,
    setSelectedOracles,
}: {
    selectedOracles: Set<string>;
    setSelectedOracles: (newSelectedOracles: Set<string>) => void;
}) => {
    const { loading, templates } = useOracleTemplates();

    return (
        <CheckboxesFilter
            title="Oracles"
            groupId="campaigns-oracles"
            loading={loading}
            items={templates}
            selected={selectedOracles}
            setSelected={setSelectedOracles}
        />
    );
};
