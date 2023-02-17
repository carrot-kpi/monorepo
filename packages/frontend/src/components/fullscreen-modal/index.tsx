import React, { ReactNode } from "react";
import { Navbar, NavbarProps } from "../ui/navbar";
import { animated, SpringValue } from "@react-spring/web";
import { cva } from "class-variance-authority";

const rootStyles = cva(
    ["fixed", "top-0", "left-0", "h-screen", "w-screen", "overflow-y-auto"],
    {
        variants: {
            bgColor: {
                orange: ["bg-orange"],
                green: ["bg-green"],
            },
        },
    }
);

interface FullscreenModalProps {
    bgColor?: NavbarProps["bgColor"];
    springStyle: { [key: string]: SpringValue };
    onDismiss: () => void;
    children: ReactNode;
}

export const AnimatedFullscreenModal = ({
    bgColor = "orange",
    springStyle,
    onDismiss,
    children,
}: FullscreenModalProps) => {
    return (
        <animated.div style={springStyle} className={rootStyles({ bgColor })}>
            <div className="flex flex-col h-full w-full">
                <Navbar mode="modal" bgColor={bgColor} onDismiss={onDismiss} />
                <div className="flex-grow">{children}</div>
            </div>
        </animated.div>
    );
};
