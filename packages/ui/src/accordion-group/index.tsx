import React, { ReactElement, useState } from "react";

import { TextMono } from "../text-mono";
import { ReactComponent as CircleCheckActive } from "../assets/circle-check-active.svg";
import { ReactComponent as CircleCheck } from "../assets/circle-check.svg";
import { ReactComponent as ChevronUp } from "../assets/chevron-up.svg";
import { ReactComponent as ChevronDown } from "../assets/chevron-down.svg";
import { cva } from "class-variance-authority";

const accordionGroupStyles = cva([
    "cui-font-mono cui-rounded-xxl cui-border cui-border-black",
]);

const accordionStyles = cva(
    ["hover:cui-cursor-pointer cui-flex cui-justify-between cui-p-3"],
    {
        variants: {
            active: {
                true: ["cui-bg-green cui-rounded-b-none"],
                false: ["cui-bg-white"],
            },
            first: {
                true: ["cui-rounded-t-xxl cui-border-none"],
                false: ["cui-border-t cui-border-black"],
            },
            lastNotActive: {
                true: ["cui-rounded-b-xxl"],
            },
        },
        defaultVariants: {
            active: false,
        },
    }
);

const contentWrapperStyles = cva(["cui-p-3"], {
    variants: {
        active: {
            true: ["cui-block"],
            false: ["cui-hidden"],
        },
    },
    defaultVariants: {
        active: false,
    },
});

interface Accordion {
    title: string;
    isCompleted: boolean;
    content: ReactElement;
}

export interface AccordionGroupProps {
    accordions: Accordion[];
    className?: string;
    variant?: "primary" | "secondary";
}

export const AccordionGroup = ({
    accordions,
    className,
}: AccordionGroupProps): ReactElement => {
    const [activeAccordion, setActiveAccordion] = useState<number>(0);

    return (
        <div
            className={accordionGroupStyles({
                className,
            })}
        >
            {accordions.map((accordion, index) => {
                const active = activeAccordion === index;
                const first = index === 0;
                const last = index === accordions.length - 1;

                return (
                    <div key={index} onClick={() => setActiveAccordion(index)}>
                        <div
                            className={accordionStyles({
                                active,
                                first,
                                lastNotActive: last && !active,
                            })}
                        >
                            <div className="cui-flex cui-gap-2">
                                {accordion.isCompleted ? (
                                    <CircleCheckActive />
                                ) : (
                                    <CircleCheck />
                                )}
                                <TextMono mediumWeight={true} size="lg">
                                    {accordion.title}
                                </TextMono>
                            </div>
                            {active ? <ChevronUp /> : <ChevronDown />}
                        </div>
                        <div
                            className={contentWrapperStyles({
                                active,
                            })}
                        >
                            {accordion.content}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
