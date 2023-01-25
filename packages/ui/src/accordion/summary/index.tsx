import { cva } from "class-variance-authority";
import React, { ReactElement } from "react";
import { useAccordionContext } from "../context";
import { ReactComponent as ChevronUp } from "../../assets/chevron-up.svg";

export interface SummaryProps {
    className?: { root?: string };
    expandIcon?: ReactElement;
    children: ReactElement;
}

const rootStyles = cva(
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

const expandIconStyles = cva([], {
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
                {expandIcon ? expandIcon : <ChevronUp />}
            </div>
        </div>
    );
};
