import React, { useEffect, useState } from "react";
import { Button } from "@carrot-kpi/ui";
import { useTranslation } from "react-i18next";
import {
    useKPITokenTemplates,
    usePreferDecentralization,
} from "@carrot-kpi/react";
import { Link } from "react-router-dom";
import { Fetcher, ResolvedTemplate } from "@carrot-kpi/sdk";
import { useIPFSGatewayURL } from "@carrot-kpi/react";
import { DATA_CDN_URL } from "../constants";

interface CreateCampaignButtonProps {
    primary?: boolean;
}

export const CreateCampaignButton = ({
    primary,
}: CreateCampaignButtonProps) => {
    const { t } = useTranslation();
    const { loading, templates } = useKPITokenTemplates();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const preferDecentralization = usePreferDecentralization();

    const [href, setHref] = useState("");
    const [resolvingTemplate, setResolvingTemplate] = useState(false);
    const [resolvedTemplate, setResolvedTemplate] =
        useState<ResolvedTemplate | null>(null);

    useEffect(() => {
        let cancelled = false;
        if (loading) return;
        if (templates.length === 0) setHref("");
        else if (templates.length === 1) {
            const resolveTemplates = async () => {
                const template = templates[0];
                if (!cancelled) setResolvingTemplate(true);
                try {
                    const resolved = await Fetcher.resolveTemplates({
                        ipfsGatewayURL,
                        dataCDNURL: DATA_CDN_URL,
                        preferDecentralization,
                        templates: [template],
                    });
                    if (resolved.length !== 1)
                        throw new Error("inconsistent resolved array length");
                    if (!cancelled) setResolvedTemplate(resolved[0]);
                    if (!cancelled) setHref(`/create/${template.id}/draft`);
                } catch (error) {
                    console.warn(
                        `error while resolving template with id ${template.id}`,
                        error,
                    );
                } finally {
                    if (!cancelled) setResolvingTemplate(false);
                }
            };
            void resolveTemplates();
        } else setHref("/create");
        return () => {
            cancelled = true;
        };
    }, [loading, templates, ipfsGatewayURL, preferDecentralization]);

    return (
        <Link to={href} state={{ template: resolvedTemplate }}>
            <Button
                data-testid="create-campaign-button"
                loading={loading || resolvingTemplate}
                disabled={!href}
                variant={primary ? "primary" : "secondary"}
                size="big"
            >
                {t("create.campaign")}
            </Button>
        </Link>
    );
};
