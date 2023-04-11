import React from "react";
import { ReactComponent as LoaderSvg } from "../../../assets/loader.svg";
import { mergedCx } from "../../../utils/components";

export interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
    <LoaderSvg className={mergedCx("cui-animate-pulse", className)} />
);
