import React, {
    type ReactElement,
    type ReactNode,
    useCallback,
    useMemo,
    useState,
} from "react";
import { matchChildByType, mergedCva } from "../../utils/components";
import { AccordionContextProvider } from "./context";
import { AccordionDetails } from "./details";
import { AccordionSummary } from "./summary";

export * from "./details";
export * from "./summary";

const rootStyles = mergedCva([
    "cui-font-mono",
    "odd:cui-border-t",
    "cui-border-r",
    "cui-border-l",
    "odd:cui-border-b",
    "cui-border-black",
    "dark:cui-border-white",
    "[&:first-of-type>div:nth-child(1)]:cui-rounded-t-xxl",
    "[&:first-of-type]:cui-rounded-t-xxl",
    "[&:last-of-type]:cui-rounded-b-xxl",
    "[&:last-of-type>div:nth-child(1)]:cui-rounded-b-xxl",
]);

export interface AccordionProps {
    onChange?: (event: React.MouseEvent, expanded: boolean) => void;
    expanded?: boolean;
    className?: { root?: string };
    children: ReactElement[];
}

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
        [isControlled, expanded, internalExpanded],
    );

    const { summaryChildren, detailsChildren } = useMemo(() => {
        return React.Children.toArray(children).reduce(
            (
                accumulator: {
                    summaryChildren: ReactNode[];
                    detailsChildren: ReactNode[];
                },
                child,
            ) => {
                if (matchChildByType(child, AccordionSummary))
                    accumulator.summaryChildren.push(child);
                else if (matchChildByType(child, AccordionDetails))
                    accumulator.detailsChildren.push(child);
                return accumulator;
            },
            { summaryChildren: [], detailsChildren: [] },
        );
    }, [children]);

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
        [onChange, setInternalExpanded, internalExpanded, isControlled],
    );

    const accordionContextValue = useMemo(
        () => ({
            toggle: handleOnClick,
            expanded: isExpanded,
        }),
        [handleOnClick, isExpanded],
    );

    return (
        <div {...rest} className={rootStyles({ className: className?.root })}>
            <AccordionContextProvider value={accordionContextValue}>
                {summaryChildren}
            </AccordionContextProvider>
            {isExpanded && detailsChildren}
        </div>
    );
};
