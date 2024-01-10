import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ConnectWallet } from "../connect-wallet";
import { Typography } from "@carrot-kpi/ui";
import type { NavbarLink } from "../../constants";
import { cva } from "class-variance-authority";
import Logo from "../../icons/logo";
import LogoIcon from "../../icons/logo-icon";

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
        "w-full",
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
    const [, setOpen] = useState(false);

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

    return (
        <>
            <div className={rootStyles({ bgColor })}>
                <div className="w-full h-24 md:h-32 max-w-screen-2xl relative flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center">
                            <NavLink to="/" onClick={() => setOpen(false)}>
                                <Logo className="hidden md:block h-10 md:h-14 xl:h-16 w-auto text-black" />
                                <LogoIcon className="md:hidden h-16 w-auto text-black" />
                            </NavLink>
                        </div>
                    </div>
                    <nav className="w-3/4 min-w-fit fixed z-10 bottom-2 left-1/2 -translate-x-1/2 md:bottom-0 md:w-auto md:left-auto md:transform-none md:z-0 md:relative flex gap-2 bg-white dark:bg-black border border-black dark:border-white py-3 px-[10px] rounded-xl">
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
                        <ConnectWallet
                            className={{
                                connectButton:
                                    "h-11 px-3 w-full xl:w-fit rounded-lg",
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
