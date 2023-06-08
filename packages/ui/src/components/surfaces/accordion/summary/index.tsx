import React, { type ReactElement, type ReactNode } from "react";
import { useAccordionContext } from "../context";
import ChevronUp from "../../../../icons/chevron-up";
import { mergedCva } from "../../../../utils/components";

export interface SummaryProps {
    className?: { root?: string };
    expandIcon?: ReactElement;
    children: ReactNode;
}

const rootStyles = mergedCva(
    [
        "hover:cui-cursor-pointer",
        "cui-flex",
        "cui-justify-between",
        "cui-items-center",
        "cui-select-none",
        "cui-p-3",
    ],
    {
        variants: {
            expanded: {
                true: [
                    "cui-bg-green",
                    "dark:cui-bg-orange",
                    "!cui-rounded-b-none",
                ],
                false: ["cui-bg-white", "dark:cui-bg-black"],
            },
        },
    }
);

const expandIconStyles = mergedCva([], {
    variants: {
        expanded: {
            false: ["cui-rotate-180"],
        },
    },
});

export const AccordionSummary = ({
    className,
    children,
    expandIcon,
    ...rest
}: SummaryProps): ReactElement => {
    const { toggle, expanded } = useAccordionContext();

    return (
        <div
            onClick={toggle}
            {...rest}
            className={rootStyles({ expanded, className: className?.root })}
        >
            {children}
            <div className={expandIconStyles({ expanded })}>
                {expandIcon ? (
                    expandIcon
                ) : (
                    <ChevronUp className="cui-text-black dark:cui-text-white" />
                )}
            </div>
        </div>
    );
};
