import React from "react";
import { ComponentMeta } from "@storybook/react";

import { Accordion, Accordion as AccordionComponent } from ".";
import { AccordionSummary } from "./summary";
import { AccordionDetails } from "./details";
import { TextMono } from "../text-mono";

export default {
    title: "Accordions",
    component: AccordionComponent,
} as ComponentMeta<typeof AccordionComponent>;

export const Accordions = () => (
    <div>
        <Accordion>
            <AccordionSummary>
                <TextMono size="md" weight="medium">
                    First accordion
                </TextMono>
            </AccordionSummary>
            <AccordionDetails>
                <TextMono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </TextMono>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                <TextMono size="md" weight="medium">
                    Second accordion
                </TextMono>
            </AccordionSummary>
            <AccordionDetails>
                <TextMono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </TextMono>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                <TextMono size="md" weight="medium">
                    Third accordion
                </TextMono>
            </AccordionSummary>
            <AccordionDetails>
                <TextMono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </TextMono>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                <TextMono size="md" weight="medium">
                    Fourth accordion
                </TextMono>
            </AccordionSummary>
            <AccordionDetails>
                <TextMono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </TextMono>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                <TextMono size="md" weight="medium">
                    Fifth accordion
                </TextMono>
            </AccordionSummary>
            <AccordionDetails>
                <TextMono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </TextMono>
            </AccordionDetails>
        </Accordion>
    </div>
);
