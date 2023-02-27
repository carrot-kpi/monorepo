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
    [
        "relative",
        "flex items-center justify-between",
        "px-6 py-8 md:py-11",
        "transition-all ease-in delay-75",
    ],
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
                standard: ["px-6"],
                modal: ["px-6 lg:px-10"],
            },
        },
    }
);

const navStyles = cva([], {
    variants: {
        isOpen: {
            true: ["absolute flex flex-col top-28 left-0 px-6 py-16 w-full"],
            false: ["hidden md:flex"],
        },
    },
});

const navLinksStyles = cva(["flex"], {
    variants: {
        isOpen: {
            true: ["flex-col items-start space-y-8 relative"],
            false: [
                "items-center space-x-8 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2",
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
    className?: {
        nav?: string;
    };
}

export const Navbar = ({
    bgColor,
    mode = "standard",
    onDismiss,
    links,
    className,
}: NavbarProps) => {
    const preferencesRef = useRef<HTMLButtonElement>(null);
    const preferencesPopoverRef = useRef<HTMLDivElement>(null);

    const [isOpen, setOpen] = useState(false);
    const [preferencesPopoverOpen, setPreferencesPopoverOpen] = useState(false);

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

    useEffect(() => {
        const handleCloseOnClick = (event: MouseEvent) => {
            if (
                !!preferencesPopoverRef.current &&
                !preferencesPopoverRef.current.contains(event.target as Node)
            )
                setPreferencesPopoverOpen(false);
        };
        document.addEventListener("mousedown", handleCloseOnClick);
        return () => {
            document.removeEventListener("mousedown", handleCloseOnClick);
        };
    }, [preferencesPopoverOpen]);

    const handlePreferencesPopoverOpen = useCallback(() => {
        setPreferencesPopoverOpen(true);
    }, []);

    return (
        <div className={navWrapperStyles({ isOpen, bgColor })}>
            <div
                className={navbarStyles({
                    bgColor,
                    isOpen,
                    mode,
                    className: className?.nav,
                })}
            >
                {mode === "modal" ? (
                    <Logo className="w-32 h-auto md:w-[188px] text-black" />
                ) : (
                    <NavLink to="/" onClick={() => setOpen(false)}>
                        <Logo className="w-32 h-auto md:w-[188px] text-black" />
                    </NavLink>
                )}
                {links && (
                    <nav className={navStyles({ isOpen })}>
                        <ul className={navLinksStyles({ isOpen })}>
                            {links.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setOpen(false)}
                                >
                                    <li className="flex items-start space-x-2 cursor-pointer">
                                        <span className="font-mono text-2xl md:text-base">
                                            ↳
                                        </span>
                                        <p className="font-mono text-black text-2xl hover:underline md:text-base uppercase underline-offset-[12px]">
                                            {link.title}
                                        </p>
                                    </li>
                                </NavLink>
                            ))}
                        </ul>
                    </nav>
                )}
                <div className="flex items-center">
                    <div
                        className={`absolute top-[420px] md:static ${
                            !isOpen && "hidden"
                        } md:block md:top-auto mr-4`}
                    >
                        <ConnectWallet />
                    </div>
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
                    {mode !== "modal" && (
                        <div
                            className="ml-4 md:hidden"
                            onClick={() => setOpen(!isOpen)}
                        >
                            {isOpen ? <CloseIcon /> : <MenuIcon />}
                        </div>
                    )}
                    {mode === "modal" && (
                        <div
                            className="flex items-center justify-center w-10 h-10 ml-10 bg-white border border-black rounded-full cursor-pointer md:w-16 md:h-16"
                            onClick={onDismiss}
                        >
                            <X className="w-8 h-8" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
