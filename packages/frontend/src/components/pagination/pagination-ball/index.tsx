import { cva } from "class-variance-authority";
import React, { type MouseEventHandler, type ReactNode } from "react";

const paginationBallStyles = cva(
    ["flex items-center justify-center", "w-12 h-12", "rounded-full"],
    {
        variants: {
            active: {
                true: "bg-green text-gray-800",
                false: "bg-gray-200",
            },
            isClickable: {
                true: "cursor-pointer hover:bg-green",
            },
        },
    }
);

interface PaginationBallProps {
    number?: number;
    onClick?: MouseEventHandler<HTMLDivElement>;
    currentPage?: number;
    children?: ReactNode;
}

export const PaginationBall = ({
    number,
    onClick,
    currentPage,
    children,
}: PaginationBallProps) => (
    <div
        onClick={onClick}
        className={paginationBallStyles({
            active: Number(number) === currentPage,
            isClickable: !!onClick,
        })}
    >
        {children ? children : number}
    </div>
);
