import React, { useCallback, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
    Modal as ModalComponent,
    type ModalProps,
} from "../src/components/modal";
import { Button } from "../src/components/button";
import { Typography } from "../src/components/typography";

export default {
    title: "Utils/Modal",
    component: ModalComponent,
} as Meta<typeof ModalComponent>;

const Component = (props: ModalProps) => {
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleDismiss = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <Button onClick={handleClick}>Open</Button>
            <ModalComponent {...props} open={open} onDismiss={handleDismiss}>
                <div className="cui-bg-white dark:cui-bg-black cui-text-black dark:cui-white-black cui-p-3 cui-rounded-xl">
                    <Typography>Hello world!</Typography>
                </div>
            </ModalComponent>
        </>
    );
};

export const Modal: StoryObj<typeof ModalComponent> = {
    render: Component,
};
