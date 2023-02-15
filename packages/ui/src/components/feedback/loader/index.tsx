import { cx } from "class-variance-authority";
import React from "react";
import { ReactComponent as LoaderSvg } from "../../../assets/loader.svg";

export interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
    <LoaderSvg className={cx("cui-animate-pulse", className)} />
);
