import React from "react";
import { Checkbox, Skeleton, Typography } from "@carrot-kpi/ui";
import { useKPITokenTemplates } from "@carrot-kpi/react";

export const TemplatesFilter = () => {
    const { loading, templates } = useKPITokenTemplates();

    return (
        <div className="w-full">
            <Typography variant="lg" weight="medium" uppercase>
                Templates
            </Typography>
            <div className="py-6 space-y-4 border-gray-400">
                {loading ? (
                    <>
                        <Skeleton width="40%" />
                        <Skeleton width="40%" />
                        <Skeleton width="40%" />
                    </>
                ) : (
                    templates.map((template) => {
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
