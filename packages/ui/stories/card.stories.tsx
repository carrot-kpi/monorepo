import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Card as CardComponent } from "../src/components/card";
import { CardContent } from "../src/components/card/content";
import { Typography } from "../src/components/typography";
import { Chip } from "../src/components/chip";
import { CardTitle } from "../src/components/card/title";
import { CardActions } from "../src/components/card/actions";
import { Button } from "../src/components/button";

export default {
    title: "Surfaces/Card",
    component: CardComponent,
} as Meta<typeof CardComponent>;

const Component = () => (
    <CardComponent>
        <CardTitle>
            <Typography uppercase>Card title</Typography>
            <Chip className={{ root: "cui-bg-green dark:cui-bg-orange" }}>
                CUSTOM CHIP
            </Chip>
        </CardTitle>
        <CardContent>
            <div className="cui-p-4">
                <Typography>Just a modular and customizable card</Typography>
                <div className="cui-flex cui-gap-2 cui-mt-2">
                    <Chip>UI</Chip>
                    <Chip>CARD</Chip>
                    <Chip>COMPONENT</Chip>
                </div>
            </div>
        </CardContent>
        <CardActions>
            <Button size="xsmall">Action</Button>
            <Button size="xsmall">Another action</Button>
        </CardActions>
    </CardComponent>
);

export const Card: StoryObj<typeof CardComponent> = {
    render: Component,
};
