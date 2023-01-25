import React, { useCallback, useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Modal as ModalComponent, ModalProps } from ".";
import { Button } from "../button";
import { Text } from "../text";

export default {
    title: "Utils/Modal",
    component: ModalComponent,
} as ComponentMeta<typeof ModalComponent>;

const Template: Story<ModalProps> = (props: ModalProps) => {
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
                    <Text mono>Hello world!</Text>
                </div>
            </ModalComponent>
        </>
    );
};

export const Modal: Story<ModalProps> = Template.bind({});
Modal.args = {};
