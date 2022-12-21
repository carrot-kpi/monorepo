import React from "react";
import { cva } from "class-variance-authority";

type CornerCoordinate = { y: "top" | "bottom"; x: "left" | "right" };

const cornersCoordinates: CornerCoordinate[] = [
    { y: "top", x: "left" },
    { y: "top", x: "right" },
    { y: "bottom", x: "left" },
    { y: "bottom", x: "right" },
];

export interface TemplateCardCornersProps {
    color?: "black" | "white";
}

export const TemplateCardCorners = ({ color }: TemplateCardCornersProps) => (
    <>
        {cornersCoordinates.map(({ x, y }) => (
            <MiniCornerSquareIcon key={`${y}/${x}`} y={y} x={x} color={color} />
        ))}
    </>
);

interface MiniCornerSquareIconProps {
    y: "top" | "bottom";
    x: "left" | "right";
    color?: "black" | "white";
}

const MiniCornerSquareIcon = ({ x, y, color }: MiniCornerSquareIconProps) => (
    <div className={cornerSquareStyles({ x, y, color })} />
);

const cornerSquareStyles = cva(["absolute w-2 h-2"], {
    variants: {
        color: {
            black: ["bg-black"],
            white: ["bg-white"],
        },
        x: {
            left: ["-left-1"],
            right: ["-right-1"],
        },
        y: {
            top: ["-top-1"],
            bottom: ["-bottom-1"],
        },
    },
    defaultVariants: {
        color: "black",
    },
});
