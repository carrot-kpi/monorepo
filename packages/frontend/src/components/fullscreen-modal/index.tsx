import React, { ReactNode, useEffect } from "react";
import { Navbar, NavbarProps } from "../ui/navbar";
import { animated, SpringValue } from "@react-spring/web";
import { cva } from "class-variance-authority";
import { setModalIsOpen } from "../../state/reducers/modals";
import { useDispatch } from "../../state/connector";

const rootStyles = cva(
    [
        "fixed",
        "top-0",
        "left-0",
        "h-screen",
        "w-screen",
        "overflow-y-auto",
        "overflow-x-hidden",
    ],
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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setModalIsOpen({ isOpen: true }));

        return () => {
            dispatch(setModalIsOpen({ isOpen: false }));
        };
    }, [dispatch]);

    return (
        <animated.div style={springStyle} className={rootStyles({ bgColor })}>
            <div className="flex flex-col w-full h-full">
                <Navbar mode="modal" bgColor={bgColor} onDismiss={onDismiss} />
                <div className="flex-grow">{children}</div>
            </div>
        </animated.div>
    );
};
