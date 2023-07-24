import React, { useRef, type ReactElement, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { type NavbarProps } from "..";
import { ConnectWallet } from "../../../connect-wallet";
import CloseIcon from "../../../../icons/x";
import { cva } from "class-variance-authority";

const rootStyles = cva(
    [
        "z-10",
        "md:hidden",
        "h-screen",
        "w-3/4",
        "fixed",
        "bg-orange",
        "-translate-x-full",
        "transition-all",
        "border-r border-black dark:border-white",
    ],
    {
        variants: {
            open: {
                true: ["translate-x-0"],
                false: ["-translate-x-full"],
            },
        },
    },
);

const backgroundStyles = cva(
    [
        "md:hidden",
        "z-10",
        "transition-opacity",
        "fixed",
        "h-screen",
        "w-full",
        "bg-black/30",
        "backdrop-blur",
    ],
    {
        variants: {
            open: {
                true: [],
                false: ["hidden"],
            },
        },
    },
);

interface NavbarVerticalLayoutProps {
    mode: NavbarProps["mode"];
    open: boolean;
    links: NavbarProps["links"];
    onNavbarClose: () => void;
}

export const NavbarVerticalLayout = ({
    mode,
    open,
    links = [],
    onNavbarClose,
}: NavbarVerticalLayoutProps): ReactElement => {
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open || !onNavbarClose) return;
        const handleCloseOnClick = (event: MouseEvent) => {
            if (
                !!backgroundRef.current &&
                backgroundRef.current.isSameNode(event.target as Node)
            )
                onNavbarClose();
        };
        document.addEventListener("mousedown", handleCloseOnClick);
        return () => {
            document.removeEventListener("mousedown", handleCloseOnClick);
        };
    }, [onNavbarClose, open]);

    return (
        <>
            <div ref={backgroundRef} className={backgroundStyles({ open })} />
            <div className={rootStyles({ open })}>
                <div className="flex flex-col justify-between">
                    {mode !== "modal" && (
                        <div className="px-6 py-6 border-b border-black dark:border-white">
                            <CloseIcon
                                className="cursor-pointer"
                                onClick={onNavbarClose}
                            />
                        </div>
                    )}
                    <div className="flex flex-col gap-6 px-6">
                        <nav className="mt-8">
                            <ul className="flex flex-col gap-6">
                                {links.map((link) => {
                                    const additionalProps = link.external
                                        ? {
                                              target: "_blank",
                                              rel: "noopener noreferrer",
                                          }
                                        : {};
                                    return (
                                        <li key={link.to}>
                                            <NavLink
                                                className="flex items-start space-x-2 cursor-pointer"
                                                to={link.to}
                                                onClick={onNavbarClose}
                                                {...additionalProps}
                                            >
                                                <span className="font-mono text-2xl xl:text-base">
                                                    ↳
                                                </span>
                                                <p className="font-mono text-black text-2xl hover:underline xl:text-base uppercase underline-offset-[12px]">
                                                    {link.title}
                                                </p>
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                        <div className="w-fit">
                            <ConnectWallet className={{ root: "flex-col" }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
