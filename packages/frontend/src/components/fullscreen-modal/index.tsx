import React, { ReactNode, useState, useEffect } from "react";
import { Navbar, NavbarProps } from "../ui/navbar";
import { animated, SpringValue } from "@react-spring/web";
import { cva } from "class-variance-authority";
import { useLocation } from "react-router-dom";

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
    const { pathname } = useLocation();
    const [wideNav, setWideNav] = useState(true);

    const LANDING_RELATIVE_PATH = "/";
    const CREATE_CAMPAIGN_PATH = "/create/1";

    useEffect(() => {
        setWideNav(
            pathname === (LANDING_RELATIVE_PATH || CREATE_CAMPAIGN_PATH)
        );
    }, [pathname]);

    return (
        <animated.div style={springStyle} className={rootStyles({ bgColor })}>
            <div className="flex flex-col w-full h-full">
                <Navbar
                    mode="modal"
                    bgColor={bgColor}
                    onDismiss={onDismiss}
                    className={{ nav: wideNav ? "lg:px-12" : "lg:px-32" }}
                />
                <div className="flex-grow">{children}</div>
            </div>
        </animated.div>
    );
};
