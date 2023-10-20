import React from "react";
import { t } from "i18next";
import ErrorIcon from "../../icons/error";
import { Button, Typography } from "@carrot-kpi/ui";

interface PermissionedProps {
    onBack: () => void;
}

export const Permissioned = ({ onBack }: PermissionedProps) => {
    return (
        <div className="w-full h-full flex justify-center">
            <div className="h-fit flex flex-col gap-4 items-center p-8 max-w-lg rounded-xl border border-black dark:border-white bg-white dark:bg-black mx-4">
                <ErrorIcon className="w-40 h-40 fill-orange stroke-orange" />
                <Typography
                    variant="xl"
                    weight="bold"
                    className={{ root: "text-center" }}
                >
                    {t("permissioned.mode.title")}
                </Typography>
                <Typography
                    className={{
                        root: "text-center mb-4",
                    }}
                >
                    {t("permissioned.mode.description")}
                </Typography>
                <Button variant="secondary" size="small" onClick={onBack}>
                    {t("permissioned.mode.back")}
                </Button>
            </div>
        </div>
    );
};
