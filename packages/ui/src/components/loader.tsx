import React from "react";
import LoaderIcon from "../icons/loader";
import { mergedCx } from "../utils/components";

export interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
    <LoaderIcon className={mergedCx("cui-animate-pulse", className)} />
);
