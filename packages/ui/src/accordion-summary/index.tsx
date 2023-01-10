import { cva } from "class-variance-authority";
import React, { ReactElement } from "react";
import { useAccordionContext } from "../accordion/context";
import { ReactComponent as ChevronUp } from "../assets/chevron-up.svg";

export interface SummaryProps {
    className?: string;
    expandIcon?: ReactElement;
    children: ReactElement;
}

const summaryStyles = cva(
    [
        "hover:cui-cursor-pointer cui-flex cui-justify-between cui-select-none cui-p-3",
    ],
    {
        variants: {
            expanded: {
                true: ["cui-bg-green dark:cui-bg-orange !cui-rounded-b-none"],
                false: ["cui-bg-white dark:cui-bg-black"],
            },
        },
    }
);

const expandIconStyles = cva([], {
    variants: {
        expanded: {
            true: ["cui-rotate-180"],
        },
    },
});

export const Summary = ({
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
            className={summaryStyles({ expanded, className })}
        >
            {children}
            <div className={expandIconStyles({ expanded })}>
                {expandIcon ? expandIcon : <ChevronUp />}
            </div>
        </div>
    );
};
