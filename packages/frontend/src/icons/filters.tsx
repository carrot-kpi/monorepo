import React from "react";
import type { SVGIcon } from "./types";

const Filters = (props: SVGIcon) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M14 17L10 17" stroke="currentColor" strokeLinecap="round" />
        <path d="M18 12L6 12" stroke="currentColor" strokeLinecap="round" />
        <path d="M21 7L3 7" stroke="currentColor" strokeLinecap="round" />
    </svg>
);

export default Filters;
