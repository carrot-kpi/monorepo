import React from "react";
import { ComponentMeta } from "@storybook/react";

import { SwiperCarousel as SwiperCarouselComponent } from ".";
import { Card, CardContent, CardTitle } from "../../surfaces";
import { Chip, Typography } from "../../data-display";
import { Button } from "../../input";

export default {
    title: "Navigation/Swiper Carousel",
    component: SwiperCarouselComponent,
} as ComponentMeta<typeof SwiperCarouselComponent>;

export const SwiperCarousel = () => {
    return (
        <SwiperCarouselComponent>
            <Card>
                <CardTitle>
                    <Typography uppercase>Card title</Typography>
                    <Chip className={{ root: "cui-bg-magenta" }}>
                        CUSTOM CHIP
                    </Chip>
                </CardTitle>
                <CardContent>
                    <div className="cui-flex cui-flex-col cui-gap-2 cui-p-4">
                        <Typography>
                            Just a modular and customizable card
                        </Typography>
                        <div className="cui-flex cui-gap-2 cui-mt-2">
                            <Chip>UI</Chip>
                            <Chip>CARD</Chip>
                            <Chip>COMPONENT</Chip>
                        </div>
                        <Button size="xsmall">click me</Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardTitle>
                    <Typography uppercase>Card title</Typography>
                    <Chip className={{ root: "cui-bg-green" }}>
                        CUSTOM CHIP
                    </Chip>
                </CardTitle>
                <CardContent>
                    <div className="cui-flex cui-flex-col cui-gap-2 cui-p-4">
                        <Typography>
                            Just a modular and customizable card
                        </Typography>
                        <div className="cui-flex cui-gap-2 cui-mt-2">
                            <Chip>UI</Chip>
                            <Chip>CARD</Chip>
                            <Chip>COMPONENT</Chip>
                        </div>
                        <Button size="xsmall">click me</Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardTitle>
                    <Typography uppercase>Card title</Typography>
                    <Chip className={{ root: "cui-bg-green" }}>
                        CUSTOM CHIP
                    </Chip>
                </CardTitle>
                <CardContent>
                    <div className="cui-flex cui-flex-col cui-gap-2 cui-p-4">
                        <Typography>
                            Just a modular and customizable card
                        </Typography>
                        <div className="cui-flex cui-gap-2 cui-mt-2">
                            <Chip>UI</Chip>
                            <Chip>CARD</Chip>
                            <Chip>COMPONENT</Chip>
                        </div>
                        <Button size="xsmall">click me</Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardTitle>
                    <Typography uppercase>Card title</Typography>
                    <Chip className={{ root: "cui-bg-green" }}>
                        CUSTOM CHIP
                    </Chip>
                </CardTitle>
                <CardContent>
                    <div className="cui-flex cui-flex-col cui-gap-2 cui-p-4">
                        <Typography>
                            Just a modular and customizable card
                        </Typography>
                        <div className="cui-flex cui-gap-2 cui-mt-2">
                            <Chip>UI</Chip>
                            <Chip>CARD</Chip>
                            <Chip>COMPONENT</Chip>
                        </div>
                        <Button size="xsmall">click me</Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardTitle>
                    <Typography uppercase>Card title</Typography>
                    <Chip className={{ root: "cui-bg-green" }}>
                        CUSTOM CHIP
                    </Chip>
                </CardTitle>
                <CardContent>
                    <div className="cui-flex cui-flex-col cui-gap-2 cui-p-4">
                        <Typography>
                            Just a modular and customizable card
                        </Typography>
                        <div className="cui-flex cui-gap-2 cui-mt-2">
                            <Chip>UI</Chip>
                            <Chip>CARD</Chip>
                            <Chip>COMPONENT</Chip>
                        </div>
                        <Button size="xsmall">click me</Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardTitle>
                    <Typography uppercase>Card title</Typography>
                    <Chip className={{ root: "cui-bg-green" }}>
                        CUSTOM CHIP
                    </Chip>
                </CardTitle>
                <CardContent>
                    <div className="cui-flex cui-flex-col cui-gap-2 cui-p-4">
                        <Typography>
                            Just a modular and customizable card
                        </Typography>
                        <div className="cui-flex cui-gap-2 cui-mt-2">
                            <Chip>UI</Chip>
                            <Chip>CARD</Chip>
                            <Chip>COMPONENT</Chip>
                        </div>
                        <Button size="xsmall">click me</Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardTitle>
                    <Typography uppercase>Card title</Typography>
                    <Chip className={{ root: "cui-bg-green" }}>
                        CUSTOM CHIP
                    </Chip>
                </CardTitle>
                <CardContent>
                    <div className="cui-flex cui-flex-col cui-gap-2 cui-p-4">
                        <Typography>
                            Just a modular and customizable card
                        </Typography>
                        <div className="cui-flex cui-gap-2 cui-mt-2">
                            <Chip>UI</Chip>
                            <Chip>CARD</Chip>
                            <Chip>COMPONENT</Chip>
                        </div>
                        <Button size="xsmall">click me</Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardTitle>
                    <Typography uppercase>Card title</Typography>
                    <Chip className={{ root: "cui-bg-orange" }}>
                        CUSTOM CHIP
                    </Chip>
                </CardTitle>
                <CardContent>
                    <div className="cui-flex cui-flex-col cui-gap-2 cui-p-4">
                        <Typography>
                            Just a modular and customizable card
                        </Typography>
                        <div className="cui-flex cui-gap-2 cui-mt-2">
                            <Chip>UI</Chip>
                            <Chip>CARD</Chip>
                            <Chip>COMPONENT</Chip>
                        </div>
                        <Button size="xsmall">click me</Button>
                    </div>
                </CardContent>
            </Card>
        </SwiperCarouselComponent>
    );
};
