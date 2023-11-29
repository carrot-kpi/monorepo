import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../icons/logo";
import MenuIcon from "../../../icons/menu";
import { ConnectWallet } from "../../connect-wallet";
import X from "../../../icons/x";
import SettingsIcon from "../../../icons/settings";
import { Button } from "@carrot-kpi/ui";
import { PreferencesPopover } from "./popovers/preferences";
import { useClickAway } from "react-use";
import { NavbarVerticalLayout } from "./vertical-layout";
import type { NavbarLink } from "../../../constants";
import { cva } from "class-variance-authority";

const rootStyles = cva(
    [
        "flex",
        "justify-center",
        "px-4",
        "xl:px-32",
        "bg-grid-light",
        "bg-left-top",
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

export interface NavbarProps {
    mode?: "standard" | "modal";
    bgColor?: "transparent" | "orange" | "green";
    onDismiss?: () => void;
    links?: NavbarLink[];
}

export const Navbar = ({
    mode = "standard",
    bgColor = "transparent",
    onDismiss,
    links = [],
}: NavbarProps) => {
    const [preferencesAnchor, setPreferencesAnchor] =
        useState<HTMLButtonElement | null>(null);
    const preferencesPopoverRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);
    const [preferencesPopoverOpen, setPreferencesPopoverOpen] = useState(false);

    useClickAway(preferencesPopoverRef, () => {
        setPreferencesPopoverOpen(false);
    });

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect;
            if (width > 640) setOpen(false);
        });

        resizeObserver.observe(document.body);
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            resizeObserver.unobserve(document.body);
        };
    });

    const handlePreferencesPopoverOpen = useCallback(() => {
        setPreferencesPopoverOpen(true);
    }, []);

    return (
        <>
            <NavbarVerticalLayout
                mode={mode}
                open={open}
                links={links}
                onNavbarClose={() => setOpen(false)}
            />
            <div className={rootStyles({ bgColor })}>
                <div className="w-full h-24 md:h-32 max-w-screen-2xl relative flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center">
                            {mode !== "modal" && (
                                <MenuIcon
                                    className="w-8 h-8 cursor-pointer md:hidden mr-4"
                                    onClick={() => setOpen(!open)}
                                />
                            )}
                            {mode === "modal" ? (
                                <Logo className="h-10 xl:h-10 w-auto text-black" />
                            ) : (
                                <NavLink to="/" onClick={() => setOpen(false)}>
                                    <Logo className="h-10 xl:h-10 w-auto text-black" />
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <nav className="absolute w-full hidden md:flex justify-center space-x-8">
                        {links.map((link) => {
                            const additionalProps = link.external
                                ? {
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                  }
                                : {};
                            return (
                                <NavLink
                                    className="flex items-start space-x-2 cursor-pointer"
                                    to={link.to}
                                    onClick={() => setOpen(false)}
                                    key={link.to}
                                    {...additionalProps}
                                >
                                    <span className="font-mono text-2xl xl:text-base">
                                        ↳
                                    </span>
                                    <p
                                        data-testid={`header-${link.title}-button`}
                                        className="font-mono text-black text-2xl hover:underline xl:text-base uppercase underline-offset-[12px]"
                                    >
                                        {link.title}
                                    </p>
                                </NavLink>
                            );
                        })}
                    </nav>
                    <div className="flex md:flex-row items-center gap-4">
                        <div className="hidden md:block">
                            <ConnectWallet
                                className={{
                                    connectButton: "h-12 px-3 w-full xl:w-fit",
                                }}
                            />
                        </div>
                        <Button
                            data-testid="settings-button"
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
        </>
    );
};
