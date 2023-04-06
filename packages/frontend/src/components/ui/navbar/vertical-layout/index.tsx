import React, { MouseEventHandler, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { NavbarProps } from "..";
import { ConnectWallet } from "../../../connect-wallet";
import { ReactComponent as Logo } from "../../../../assets/logo.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/x.svg";

interface NavbarVerticalLayoutProps {
    mode: NavbarProps["mode"];
    links: NavbarProps["links"];
    onNavbarClose: MouseEventHandler;
}

export const NavbarVerticalLayout = ({
    mode,
    links,
    onNavbarClose,
}: NavbarVerticalLayoutProps): ReactElement => {
    return (
        <div className="absolute w-full z-10">
            <div className="flex h-screen justify-between bg-orange px-6 py-8">
                <div className="flex flex-col gap-6">
                    <div className="mt-2">
                        {mode === "modal" ? (
                            <Logo className="w-32 h-8 text-black" />
                        ) : (
                            <NavLink to="/" onClick={onNavbarClose}>
                                <Logo className="w-32 h-8 text-black" />
                            </NavLink>
                        )}
                    </div>
                    <nav>
                        <ul className="flex flex-col gap-6">
                            {(links || []).map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        className="flex items-start space-x-2 cursor-pointer"
                                        to={link.to}
                                        onClick={onNavbarClose}
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
                    <div className="w-fit">
                        <ConnectWallet />
                    </div>
                </div>
                {mode !== "modal" && (
                    <CloseIcon
                        className="cursor-pointer"
                        onClick={onNavbarClose}
                    />
                )}
            </div>
        </div>
    );
};
