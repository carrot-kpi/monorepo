import React from "react";
import { ComponentMeta } from "@storybook/react";

import { Accordion, Accordion as AccordionComponent } from ".";
import { Summary } from "../accordion-summary";
import { Details } from "../accordion-details";
import { TextMono } from "../text-mono";

export default {
    title: "Accordions",
    component: AccordionComponent,
} as ComponentMeta<typeof AccordionComponent>;

export const Accordions = () => (
    <div>
        <Accordion>
            <Summary>
                <TextMono size="md" weight="medium">
                    First accordion
                </TextMono>
            </Summary>
            <Details>
                <TextMono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </TextMono>
            </Details>
        </Accordion>
        <Accordion>
            <Summary>
                <TextMono size="md" weight="medium">
                    Second accordion
                </TextMono>
            </Summary>
            <Details>
                <TextMono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </TextMono>
            </Details>
        </Accordion>
        <Accordion>
            <Summary>
                <TextMono size="md" weight="medium">
                    Third accordion
                </TextMono>
            </Summary>
            <Details>
                <TextMono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </TextMono>
            </Details>
        </Accordion>
        <Accordion>
            <Summary>
                <TextMono size="md" weight="medium">
                    Fourth accordion
                </TextMono>
            </Summary>
            <Details>
                <TextMono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </TextMono>
            </Details>
        </Accordion>
        <Accordion>
            <Summary>
                <TextMono size="md" weight="medium">
                    Fifth accordion
                </TextMono>
            </Summary>
            <Details>
                <TextMono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </TextMono>
            </Details>
        </Accordion>
    </div>
);
