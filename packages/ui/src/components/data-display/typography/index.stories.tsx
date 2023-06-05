import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Typography as TypographyComponent } from ".";

export default {
    title: "Data display/Typography",
    component: TypographyComponent,
} as Meta<typeof TypographyComponent>;

export const Typography: StoryObj<typeof TypographyComponent> = {
    render: () => {
        return (
            <div className="flex flex-col gap-2">
                <TypographyComponent variant="h1">
                    H1 heading
                </TypographyComponent>
                <TypographyComponent variant="h2">
                    H2 heading
                </TypographyComponent>
                <TypographyComponent variant="h3">
                    H3 heading
                </TypographyComponent>
                <TypographyComponent variant="h4">
                    H4 heading
                </TypographyComponent>
                <TypographyComponent variant="xl">
                    Extra large regular text
                </TypographyComponent>
                <TypographyComponent variant="lg">
                    Large regular text
                </TypographyComponent>
                <TypographyComponent variant="base">
                    Base regular text
                </TypographyComponent>
                <TypographyComponent variant="sm">
                    Small regular text
                </TypographyComponent>
                <TypographyComponent variant="xs">
                    Extra small regular text
                </TypographyComponent>
            </div>
        );
    },
};
