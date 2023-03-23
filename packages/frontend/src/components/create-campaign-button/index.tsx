import React, { useEffect, useState } from "react";
import { Button } from "@carrot-kpi/ui";
import { useTranslation } from "react-i18next";
import { useKPITokenTemplates } from "@carrot-kpi/react";
import { Link } from "react-router-dom";
import { Template } from "@carrot-kpi/sdk/lib/entities/template";

interface CreateCampaignButtonProps {
    primary?: boolean;
}

export const CreateCampaignButton = ({
    primary,
}: CreateCampaignButtonProps) => {
    const { t } = useTranslation();
    const { loading, templates } = useKPITokenTemplates();

    const [href, setHref] = useState("");
    const [template, setTemplate] = useState<Template | null>(null);

    useEffect(() => {
        if (loading) return;
        if (templates.length === 0) setHref("");
        else if (templates.length === 1) {
            setTemplate(templates[0]);
            setHref(`/create/${templates[0].id}`);
        } else setHref("/create");
    }, [loading, templates]);

    return (
        <Link to={href} state={{ template }}>
            <Button
                loading={loading}
                disabled={!href}
                variant={primary ? "primary" : "secondary"}
                size="big"
            >
                {t("create.campaign")}
            </Button>
        </Link>
    );
};
