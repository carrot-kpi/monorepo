import React, { type ReactNode, useEffect } from "react";
import { Navbar } from "./ui/navbar";
import { animated, SpringValue } from "@react-spring/web";
import { cva } from "class-variance-authority";
import { setModalOpen } from "../state/reducers/modals";
import { useDispatch } from "../state/hooks";
import { StagingModeBanner } from "./staging-mode-banner";
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
                transparent: ["bg-transparent"],
            },
        },
    },
);

interface FullscreenModalProps {
    bgColor?: "green" | "orange" | "transparent";
    springStyle: { [key: string]: SpringValue };
    onDismiss: () => void;
    children: ReactNode;
}

export const AnimatedFullscreenModal = ({
    bgColor = "transparent",
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
                <Navbar mode="modal" onDismiss={onDismiss} />
                <div className="flex-grow bg-grid-light bg-left-top">
                    {children}
                </div>
            </div>
        </animated.div>
    );
};
