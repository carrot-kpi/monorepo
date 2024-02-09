import { Typography, type TypographyProps } from "@carrot-kpi/ui";
import { cva, cx } from "class-variance-authority";
import React from "react";
import EmptyIllustration from "../../icons/empty";

const rootStyles = cva(
    [
        "flex",
        "flex-col",
        "justify-center",
        "text-center",
        "items-center",
        "gap-6",
    ],
    {
        variants: {
            vertical: {
                true: [
                    "flex-col",
                    "justify-center",
                    "text-center",
                    "text-center",
                ],
                false: ["md:flex-row", "md:text-left"],
            },
        },
    },
);

interface EmptyProps {
    title: string;
    description?: string;
    vertical?: boolean;
    titleVariant?: TypographyProps["variant"];
    descriptionVariant?: TypographyProps["variant"];
    className?: {
        root?: string;
        icon?: string;
    };
}

export const Empty = ({
    title,
    description,
    vertical,
    titleVariant,
    descriptionVariant,
    className,
}: EmptyProps) => {
    return (
        <div
            className={rootStyles({
                vertical: !!vertical,
                className: className?.root,
            })}
        >
            <EmptyIllustration
                className={cx("h-40 w-40 text-gray-500", className?.icon)}
            />
            <div className="flex flex-col gap-3">
                <Typography
                    data-testid="empty-title-text"
                    variant={titleVariant || "h3"}
                >
                    {title}
                </Typography>
                {description && (
                    <Typography
                        data-testid="empty-no-data-found-text"
                        variant={descriptionVariant || "base"}
                    >
                        {description}
                    </Typography>
                )}
            </div>
        </div>
    );
};
