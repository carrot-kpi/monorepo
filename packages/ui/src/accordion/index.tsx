import { cva } from "class-variance-authority";
import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { AccordionContextProvider } from "./context";

export interface AccordionProps {
    onChange?: (event: React.MouseEvent, expanded: boolean) => void;
    expanded?: boolean;
    className?: string;
    children: ReactElement[];
}

const accordionStyles = cva(
    [
        "cui-font-mono odd:cui-border-t cui-border-r cui-border-l odd:cui-border-b cui-border-black [&:first-of-type>div:nth-child(1)]:cui-rounded-t-xxl [&:first-of-type]:cui-rounded-t-xxl [&:last-of-type]:cui-rounded-b-xxl [&:last-of-type>div:nth-child(1)]:cui-rounded-b-xxl",
    ],
    {
        variants: {},
    }
);

export const Accordion = ({
    onChange,
    expanded,
    className,
    children,
    ...rest
}: AccordionProps): ReactElement => {
    const [internalExpanded, setInternalExpanded] = useState<boolean>(false);

    const isControlled = useMemo(() => expanded !== undefined, [expanded]);
    const isExpanded = useMemo(
        () => (isControlled ? !!expanded : internalExpanded),
        [isControlled, expanded, internalExpanded]
    );

    const summaryChildren = children[0];
    const detailsChildren = children[1];

    const handleOnClick = useCallback(
        (event: React.MouseEvent) => {
            if (onChange) {
                onChange(event, internalExpanded);
            }

            // update the internal state if the component is not controlled
            if (!isControlled) {
                setInternalExpanded(!internalExpanded);
            }
        },
        [onChange, setInternalExpanded, internalExpanded, isControlled]
    );

    const accordionContextValue = useMemo(
        () => ({
            toggle: handleOnClick,
            expanded: isExpanded,
        }),
        [handleOnClick, isExpanded]
    );

    return (
        <div {...rest} className={accordionStyles({ className })}>
            <AccordionContextProvider value={accordionContextValue}>
                {summaryChildren}
            </AccordionContextProvider>
            {isExpanded && detailsChildren}
        </div>
    );
};
