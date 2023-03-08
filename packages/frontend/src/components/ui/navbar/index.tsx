import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { cva } from "class-variance-authority";
import { ReactComponent as CloseIcon } from "../../../assets/x.svg";
import { ReactComponent as MenuIcon } from "../../../assets/menu.svg";
import { ConnectWallet } from "../../connect-wallet";
import { ReactComponent as X } from "../../../assets/x.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import { Button } from "@carrot-kpi/ui";
import { PreferencesPopover } from "./popovers/preferences";
import { useClickAway } from "react-use";

const navWrapperStyles = cva([""], {
    variants: {
        bgColor: {
            green: ["bg-green"],
            orange: ["bg-orange"],
        },
        isOpen: {
            true: ["fixed top-0 left-0 z-10 h-screen w-full"],
        },
    },
});

const navbarStyles = cva(
    ["relative flex items-center justify-between py-8 xl:py-11"],
    {
        variants: {
            bgColor: {
                green: ["bg-green"],
                orange: ["bg-orange"],
            },
            isOpen: {
                true: ["z-10"],
            },
            mode: {
                standard: ["px-6 xl:px-32"],
                modal: ["px-6 xl:px-10"],
            },
        },
    }
);

const navStyles = cva(["flex items-center gap-4"], {
    variants: {
        isOpen: {
            true: [
                "absolute grid grid-cols-1 gap-6 top-28 left-0 px-6 py-12 w-full",
            ],
            false: ["hidden xl:flex xl:order-3"],
        },
    },
});

const navLinksStyles = cva(["flex"], {
    variants: {
        isOpen: {
            true: ["flex-col items-start space-y-7 relative"],
            false: [
                "items-center space-x-8 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 xl:top-[68px]",
            ],
        },
    },
});

interface LinkProps {
    title: string;
    to: string;
}

export interface NavbarProps {
    bgColor?: "green" | "orange";
    mode?: "standard" | "modal";
    onDismiss?: () => void;
    links?: LinkProps[];
}

export const Navbar = ({
    bgColor,
    mode = "standard",
    onDismiss,
    links,
}: NavbarProps) => {
    const preferencesRef = useRef<HTMLButtonElement>(null);
    const preferencesPopoverRef = useRef<HTMLDivElement>(null);

    const [isOpen, setOpen] = useState(false);
    const [preferencesPopoverOpen, setPreferencesPopoverOpen] = useState(false);

    useClickAway(preferencesPopoverRef, () => {
        setPreferencesPopoverOpen(false);
    });

    useEffect(() => {
        const closeMenuOnResizeToDesktop = () => {
            if (window.innerWidth > 700) setOpen(false);
        };
        // TODO: use size observer to increase performance
        window.addEventListener("resize", closeMenuOnResizeToDesktop);
        return () => {
            window.removeEventListener("resize", closeMenuOnResizeToDesktop);
        };
    }, [isOpen]);

    const handlePreferencesPopoverOpen = useCallback(() => {
        setPreferencesPopoverOpen(true);
    }, []);

    return (
        <div className={navWrapperStyles({ isOpen, bgColor })}>
            <div className={navbarStyles({ bgColor, isOpen, mode })}>
                {mode === "modal" ? (
                    <Logo className="w-32 h-auto xl:w-[188px] text-black" />
                ) : (
                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                        className="xl:order-1"
                    >
                        <Logo className="w-32 h-auto xl:w-[188px] text-black" />
                    </NavLink>
                )}
                <nav className={navStyles({ isOpen })}>
                    <ConnectWallet />
                    <Button
                        ref={preferencesRef}
                        size="small"
                        onClick={handlePreferencesPopoverOpen}
                        icon={SettingsIcon}
                        className={{
                            root: "w-12 h-12 p-0 flex justify-center items-center",
                        }}
                    />
                    <PreferencesPopover
                        open={preferencesPopoverOpen}
                        anchor={preferencesRef.current}
                        ref={preferencesPopoverRef}
                    />
                    <ul className={navLinksStyles({ isOpen })}>
                        {(links || []).map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    className="flex items-start space-x-2 cursor-pointer"
                                    to={link.to}
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="font-mono text-2xl xl:text-base">
                                        ↳
                                    </span>
                                    <p className="font-mono text-black text-2xl hover:underline xl:text-base uppercase underline-offset-[12px]">
                                        {link.title}
                                    </p>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center xl:order-2">
                        {mode !== "modal" && (
                            <div
                                className="xl:hidden"
                                onClick={() => setOpen(!isOpen)}
                            >
                                {isOpen ? <CloseIcon /> : <MenuIcon />}
                            </div>
                        )}
                        {mode === "modal" && (
                            <div
                                className="flex items-center justify-center w-10 h-10 bg-white border border-black rounded-full cursor-pointer xl:w-16 xl:h-16"
                                onClick={onDismiss}
                            >
                                <X className="w-8 h-8" />
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
};
