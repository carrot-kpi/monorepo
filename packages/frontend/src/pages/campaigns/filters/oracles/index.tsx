import React from "react";
import { useOracleTemplates } from "@carrot-kpi/react";
import { CARROT_DEFAULT_ORACLE_TEMPLATE } from "../utils";
import { Template } from "@carrot-kpi/sdk";
import { CheckboxesFilter } from "../checkboxes-filter";

export const OraclesFilter = ({
    selectedOracles,
    setSelectedOracles,
}: {
    selectedOracles: Set<number>;
    setSelectedOracles: (newSelectedOracles: Set<number>) => void;
}) => {
    const { loading, templates } = useOracleTemplates();

    const defaultChecked = (item: Template) =>
        item.id === CARROT_DEFAULT_ORACLE_TEMPLATE;

    return (
        <CheckboxesFilter
            title="Oracles"
            groupId="campaigns-oracles"
            loading={loading}
            defaultChecked={defaultChecked}
            items={templates}
            selected={selectedOracles}
            setSelected={setSelectedOracles}
        />
    );
};
