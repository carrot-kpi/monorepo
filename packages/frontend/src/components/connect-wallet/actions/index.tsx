import { Chip } from "@carrot-kpi/ui";
import React, { useCallback, useState, type FC } from "react";
import { Transactions } from "./types/transactions/transactions";
import { Drafts } from "./types/drafts";
import { useTranslation } from "react-i18next";

type ActionType = "transactions" | "drafts";

const ACTIONS: {
    type: ActionType;
    label: "actions.transactions.label" | "actions.drafts.label";
}[] = [
    {
        type: "transactions",
        label: "actions.transactions.label",
    },
    {
        type: "drafts",
        label: "actions.drafts.label",
    },
];

const ACTION_COMPONENT_BY_TYPE: { [T in ActionType]: FC } = {
    transactions: Transactions,
    drafts: Drafts,
};

export const Actions = () => {
    const { t } = useTranslation();
    const [selectedAction, setSelectedAction] =
        useState<ActionType>("transactions");

    const handleActionSwitch = useCallback((action: ActionType) => {
        setSelectedAction(action);
    }, []);

    const ActionComponent = ACTION_COMPONENT_BY_TYPE[selectedAction];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-4">
                {ACTIONS.map(({ type, label }) => (
                    <Chip
                        key={type}
                        size="big"
                        clickable
                        active={type === selectedAction}
                        onClick={() => handleActionSwitch(type)}
                    >
                        {(t(label) as string).toUpperCase()}
                    </Chip>
                ))}
            </div>
            <ActionComponent />
        </div>
    );
};
