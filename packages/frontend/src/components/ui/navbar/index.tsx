import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from "../../../icons/menu";
import { ConnectWallet } from "../../connect-wallet";
import { Typography } from "@carrot-kpi/ui";
import { NavbarVerticalLayout } from "./vertical-layout";
import type { NavbarLink } from "../../../constants";
import { cva } from "class-variance-authority";
import Logo from "../../../icons/logo";

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

const navLinkStyles = cva(
    [
        "flex",
        "items-center",
        "gap-2",
        "dark:bg-black",
        "border",
        "border-black",
        "dark:border-white",
        "h-11",
        "p-[11px]",
        "rounded-lg",
        "cursor-pointer",
    ],
    {
        variants: {
            highlighted: {
                true: ["text-white", "bg-black"],
                false: ["bg-white"],
            },
        },
    },
);

export interface NavbarProps {
    bgColor?: "transparent" | "orange" | "green";
    links?: NavbarLink[];
}

export const Navbar = ({
    bgColor = "transparent",
    links = [],
}: NavbarProps) => {
    // const [preferencesAnchor, setPreferencesAnchor] =
    //     useState<HTMLButtonElement | null>(null);
    // const preferencesPopoverRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);
    // const [preferencesPopoverOpen, setPreferencesPopoverOpen] = useState(false);

    // useClickAway(preferencesPopoverRef, () => {
    //     setPreferencesPopoverOpen(false);
    // });

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

    // const handlePreferencesPopoverOpen = useCallback(() => {
    //     setPreferencesPopoverOpen(true);
    // }, []);

    return (
        <>
            <NavbarVerticalLayout
                open={open}
                links={links}
                onNavbarClose={() => setOpen(false)}
            />
            <div className={rootStyles({ bgColor })}>
                <div className="w-full h-24 md:h-32 max-w-screen-2xl relative flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center">
                            <MenuIcon
                                className="w-8 h-8 cursor-pointer md:hidden mr-4"
                                onClick={() => setOpen(!open)}
                            />
                            <NavLink to="/" onClick={() => setOpen(false)}>
                                <Logo className="h-10 md:h-14 xl:h-16 w-auto text-black" />
                            </NavLink>
                        </div>
                    </div>
                    <nav className="hidden md:flex gap-2 bg-white dark:bg-black border border-black dark:border-white py-3 px-[10px] rounded-xl">
                        {links.map(
                            ({ Icon, external, title, to, highlighted }) => {
                                const additionalProps = external
                                    ? {
                                          target: "_blank",
                                          rel: "noopener noreferrer",
                                      }
                                    : {};
                                return (
                                    <NavLink
                                        className={navLinkStyles({
                                            highlighted,
                                        })}
                                        to={to}
                                        onClick={() => setOpen(false)}
                                        key={to}
                                        {...additionalProps}
                                    >
                                        <div className="flex gap-2">
                                            <Icon />
                                        </div>
                                        <Typography
                                            className={{
                                                root: highlighted
                                                    ? "text-white"
                                                    : "",
                                            }}
                                            data-testid={`header-${title}-button`}
                                            uppercase
                                        >
                                            {title}
                                        </Typography>
                                    </NavLink>
                                );
                            },
                        )}
                    </nav>
                    <div className="flex md:flex-row items-center gap-4">
                        <div className="hidden md:block">
                            <ConnectWallet
                                className={{
                                    connectButton:
                                        "h-11 px-3 w-full xl:w-fit rounded-lg",
                                }}
                            />
                        </div>
                        {/* TODO: remove and move into the drawer */}
                        {/* <Button
                            data-testid="settings-button"
                            ref={setPreferencesAnchor}
                            size="small"
                            onClick={handlePreferencesPopoverOpen}
                            icon={SettingsIcon}
                            className={{
                                root: "w-11 h-12 p-0 flex justify-center items-center",
                            }}
                        />
                        <PreferencesPopover
                            open={preferencesPopoverOpen}
                            anchor={preferencesAnchor}
                            ref={preferencesPopoverRef}
                        /> */}
                    </div>
                </div>
            </div>
        </>
    );
};
