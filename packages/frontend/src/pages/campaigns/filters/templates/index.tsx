import React from "react";
import { Checkbox, Skeleton, Typography } from "@carrot-kpi/ui";
import { useKPITokenTemplates, useResolvedTemplates } from "@carrot-kpi/react";

export const TemplatesFilter = () => {
    const { loading: loadingTemplates, templates } = useKPITokenTemplates();
    const { loading: resolvingTemplates, resolvedTemplates } =
        useResolvedTemplates(templates);

    return (
        <div className="w-full">
            <Typography variant="lg" weight="medium" uppercase>
                Templates
            </Typography>
            <div className="py-6 space-y-4 border-gray-400">
                {loadingTemplates ||
                resolvingTemplates ||
                !resolvedTemplates ? (
                    <>
                        <Skeleton width="40%" />
                        <Skeleton width="40%" />
                        <Skeleton width="40%" />
                    </>
                ) : (
                    resolvedTemplates.map((template) => {
                        return (
                            <Checkbox
                                key={template.id}
                                id={template.id.toString()}
                                label={template.specification.name}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};
