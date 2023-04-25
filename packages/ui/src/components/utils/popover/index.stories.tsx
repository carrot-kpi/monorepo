import React, { useCallback, useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Popover as PopoverComponent, PopoverProps } from ".";
import { Typography } from "../../data-display/typography";

export default {
    title: "Utils/Popover",
    component: PopoverComponent,
} as ComponentMeta<typeof PopoverComponent>;

const Template: Story<PopoverProps> = (props: PopoverProps) => {
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

export const Popover: Story<PopoverProps> = Template.bind({});
Popover.args = {};
