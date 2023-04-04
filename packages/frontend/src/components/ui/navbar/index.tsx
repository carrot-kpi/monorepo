import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { cva } from "class-variance-authority";
import { ReactComponent as MenuIcon } from "../../../assets/menu.svg";
import { ConnectWallet } from "../../connect-wallet";
import { ReactComponent as X } from "../../../assets/x.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import { Button } from "@carrot-kpi/ui";
import { PreferencesPopover } from "./popovers/preferences";
import { useClickAway, useWindowSize } from "react-use";
import { NavbarVerticalLayout } from "./vertical-layout";

const navWrapperStyles = cva([], {
    variants: {
        bgColor: {
            green: ["bg-green"],
            orange: ["bg-orange"],
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
            mode: {
                standard: ["px-6 xl:px-32"],
                modal: ["px-6 xl:px-10"],
            },
        },
    }
);

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
    const [preferencesAnchor, setPreferencesAnchor] =
        useState<HTMLButtonElement | null>(null);
    const preferencesPopoverRef = useRef<HTMLDivElement>(null);
    const { width } = useWindowSize();

    const [isOpen, setOpen] = useState(false);
    const [preferencesPopoverOpen, setPreferencesPopoverOpen] = useState(false);

    useClickAway(preferencesPopoverRef, () => {
        setPreferencesPopoverOpen(false);
    });

    // TODO: use size observer to increase performance
    useEffect(() => {
        if (width > 700) setOpen(false);
    }, [width]);

    const handlePreferencesPopoverOpen = useCallback(() => {
        setPreferencesPopoverOpen(true);
    }, []);

    return isOpen ? (
        <NavbarVerticalLayout
            mode={mode}
            links={links}
            onNavbarClose={() => setOpen(false)}
        />
    ) : (
        <div className={navWrapperStyles({ bgColor })}>
            <div className={navbarStyles({ bgColor, mode })}>
                {mode === "modal" ? (
                    <Logo className="w-32 h-auto xl:w-[188px] text-black" />
                ) : (
                    <NavLink to="/" onClick={() => setOpen(false)}>
                        <Logo className="w-32 h-auto xl:w-[188px] text-black" />
                    </NavLink>
                )}
                <nav className="items-center gap-4 hidden xl:flex">
                    <ul className="flex items-center space-x-8 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 xl:top-[68px]">
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
                </nav>
                <div className="flex items-center gap-4">
                    <div className="hidden xl:block">
                        <ConnectWallet />
                    </div>
                    <Button
                        ref={setPreferencesAnchor}
                        size="small"
                        onClick={handlePreferencesPopoverOpen}
                        icon={SettingsIcon}
                        className={{
                            root: "w-12 h-12 p-0 flex justify-center items-center",
                        }}
                    />
                    <PreferencesPopover
                        open={preferencesPopoverOpen}
                        anchor={preferencesAnchor}
                        ref={preferencesPopoverRef}
                    />
                    <div className="flex items-center">
                        {mode !== "modal" && (
                            <MenuIcon
                                className="xl:hidden"
                                onClick={() => setOpen(!isOpen)}
                            />
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
                </div>
            </div>
        </div>
    );
};
