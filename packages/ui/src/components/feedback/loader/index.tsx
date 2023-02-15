import { cx } from "class-variance-authority";
import React from "react";
import { ReactComponent as LoaderSvg } from "../../../assets/loader.svg";

export interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
    <div className="cui-flex cui-items-center cui-justify-center cui-w-full cui-h-full">
        <LoaderSvg className={cx("cui-animate-pulse", className)} />
    </div>
);
