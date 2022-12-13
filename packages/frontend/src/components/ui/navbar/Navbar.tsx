import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { cva } from "class-variance-authority";
import { Button } from "@carrot-kpi/ui";
import { Logo } from "../Logo";
import { GridPatternBg } from "../GridPatternBg";
import { CloseMenuIcon } from "./CloseMenuIcon";
import { HamburgerMenuIcon } from "./HamburgerMenuIcon";

const navWrapperStyles = cva([""], {
    variants: {
        bgColor: {
            green: ["bg-carrot-green"],
            orange: ["bg-carrot-orange"],
        },
        isOpen: {
            true: ["fixed top-0 left-0 z-10 h-screen w-full"],
        },
    },
});

const navbarStyles = cva(
    ["relative flex items-center justify-between px-6 py-8 md:py-11 lg:px-32"],
    {
        variants: {
            bgColor: {
                green: ["bg-carrot-green"],
                orange: ["bg-carrot-orange"],
            },
            isOpen: {
                true: ["z-10"],
            },
        },
    }
);

const navStyles = cva([], {
    variants: {
        isOpen: {
            true: ["absolute flex flex-col top-28 left-0 px-6 py-16  w-full"],
            false: ["hidden md:flex "],
        },
    },
});

const navLinksStyles = cva(["flex"], {
    variants: {
        isOpen: {
            true: ["flex-col items-start space-y-8 relative"],
            false: ["items-center space-x-8"],
        },
    },
});

interface LinkProps {
    title: string;
    to: string;
}

interface NavbarProps {
    bgColor?: "green" | "orange";
    links?: LinkProps[];
}

export const Navbar = ({ bgColor, links }: NavbarProps) => {
    const [isOpen, setOpen] = useState(false);
    const closeMenuOnResizeToDesktop = () => {
        if (window.innerWidth > 700) {
            setOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", closeMenuOnResizeToDesktop, false);
    }, [isOpen]);

    return (
        <div className={navWrapperStyles({ isOpen, bgColor })}>
            <GridPatternBg className="md:hidden" />
            <div className={navbarStyles({ bgColor, isOpen })}>
                <NavLink to="/" onClick={() => setOpen(false)}>
                    <Logo />
                </NavLink>
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
                <div className="absolute top-[420px] md:static">
                    <Button size="small">Connect wallet</Button>
                </div>
                <div className="md:hidden" onClick={() => setOpen(!isOpen)}>
                    {isOpen ? <CloseMenuIcon /> : <HamburgerMenuIcon />}
                </div>
            </div>
        </div>
    );
};
