import React from "react";
import { ComponentMeta } from "@storybook/react";

import { Card as CardComponent } from ".";
import { CardContent } from "./content";
import { Chip, Typography } from "../../data-display";
import { CardTitle } from "./title";
import { CardActions } from "./actions";
import { Button } from "../../input";

export default {
    title: "Surfaces/Card",
    component: CardComponent,
} as ComponentMeta<typeof CardComponent>;

export const Card = () => (
    <CardComponent>
        <CardTitle>
            <Typography uppercase>Card title</Typography>
            <Chip className={{ root: "cui-bg-green" }}>CUSTOM CHIP</Chip>
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
