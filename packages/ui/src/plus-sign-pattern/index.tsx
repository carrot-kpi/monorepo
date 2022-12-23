import React from "react";
import { cva } from "class-variance-authority";

const plusSignPatternStyles = cva(
    ["cui-invisible", "md:cui-visible", "cui-absolute"],
    {
        variants: {
            x: {
                left: ["cui-left-4"],
                right: ["cui-right-4"],
            },
            y: {
                top: ["cui-top-10"],
                middle: ["cui-top-1/3"],
                bottom: ["cui-bottom-10"],
            },
        },
    }
);

export interface PlusSignPatternProps {
    x?: "left" | "right";
    y?: "top" | "bottom" | "middle";
}

export const PlusSignPattern = ({ x, y }: PlusSignPatternProps) => (
    <div className={plusSignPatternStyles({ x: x, y: y })}>
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <line
                y1="-0.5"
                x2="24"
                y2="-0.5"
                transform="matrix(-3.91102e-08 1 1 4.88539e-08 12.0005 0)"
                stroke="black"
            />
            <line
                y1="-0.5"
                x2="24"
                y2="-0.5"
                transform="matrix(-1 0 0 1 24 12.0017)"
                stroke="black"
            />
        </svg>
    </div>
);
