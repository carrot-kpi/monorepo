import React, { type ReactNode, useEffect } from "react";
import { Navbar, type NavbarProps } from "../ui/navbar";
import { animated, SpringValue } from "@react-spring/web";
import { cva } from "class-variance-authority";
import { setModalOpen } from "../../state/reducers/modals";
import { useDispatch } from "../../state/connector";
import { StagingModeBanner } from "../staging-mode-banner";
import { useStagingMode } from "@carrot-kpi/react";

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
    },
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
    const stagingMode = useStagingMode();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setModalOpen(true));

        return () => {
            dispatch(setModalOpen(false));
        };
    }, [dispatch]);

    return (
        <animated.div style={springStyle} className={rootStyles({ bgColor })}>
            <div className="flex flex-col w-full h-full">
                {stagingMode && <StagingModeBanner />}
                <Navbar mode="modal" bgColor={bgColor} onDismiss={onDismiss} />
                <div className="flex-grow">{children}</div>
            </div>
        </animated.div>
    );
};
