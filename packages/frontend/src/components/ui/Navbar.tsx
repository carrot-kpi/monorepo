import React, { ReactNode } from "react";
import { TextMono } from "./TextMono";
import { Logo } from "./Logo";

const NavLink = ({ children }: { children: ReactNode }) => (
    <li className="flex items-start space-x-2 cursor-pointer">
        <span className="font-mono">↳</span>
        <TextMono className="hover:underline underline-offset-[12px]" caps>
            {children}
        </TextMono>
    </li>
);

interface NavbarProps {
    bgColorClass?: string;
}

export const Navbar = ({ bgColorClass }: NavbarProps) => {
    return (
        <div className={bgColorClass}>
            <div className="flex items-center justify-between px-6 py-8 md:py-11 lg:px-32">
                <Logo />
                <nav className="hidden md:block">
                    <ul className="flex items-center space-x-8">
                        <NavLink>About</NavLink>
                        <NavLink>Campaigns</NavLink>
                        <NavLink>Community</NavLink>
                    </ul>
                </nav>
                <button className="px-4 py-2 border rounded-xl">
                    Connect wallet
                </button>
            </div>
        </div>
    );
};
