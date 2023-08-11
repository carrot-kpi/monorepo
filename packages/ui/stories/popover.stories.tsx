import React, { useCallback, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
    Popover as PopoverComponent,
    type PopoverProps,
} from "../src/components/popover";
import { Typography } from "../src/components/typography";

export default {
    title: "Utils/Popover",
    component: PopoverComponent,
} as Meta<typeof PopoverComponent>;

const Component = (props: PopoverProps) => {
    const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setOpen(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <Typography
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={setAnchor}
                className={{ root: "cui-w-fit" }}
            >
                Hover me to show the popover
            </Typography>
            <PopoverComponent {...props} open={open} anchor={anchor}>
                <div className="cui-bg-white dark:cui-bg-black cui-text-black dark:cui-white-black cui-px-3 cui-py-2 cui-rounded-xl">
                    <Typography>Hello world!</Typography>
                </div>
            </PopoverComponent>
        </>
    );
};

export const Popover: StoryObj<typeof PopoverComponent> = {
    render: Component,
};
