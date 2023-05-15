import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

export interface MarqueeProps {
    children: ReactNode[];
    color?: "green" | "yellow";
}

const marqueeMainStyles = cva(["cui-flex cui-overflow-x-hidden"], {
    variants: {
        color: {
            green: ["cui-bg-green"],
            yellow: ["cui-bg-yellow"],
        },
    },
});

const marqueeRowStyles = cva(
    ["cui-relative cui-flex cui-items-center cui-p-4 cui-space-x-6"],
    {
        variants: {
            color: {
                green: ["cui-animate-marquee-fast"],
                yellow: ["cui-animate-marquee-slow"],
            },
        },
    }
);

export const Marquee = ({ children, color = "green" }: MarqueeProps) => {
    return (
        <div className={marqueeMainStyles({ color })}>
            <div className={marqueeRowStyles({ color })}>{children}</div>
        </div>
    );
};
