import React from "react";
import type { SVGIcon } from "./types";

const ChevronDown = (props: SVGIcon) => (
    <svg
        fill="none"
        version="1.1"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="m15 6.4596-5 5-5-5"
            stroke="currentColor"
            strokeLinecap="round"
        />
    </svg>
);

export default ChevronDown;
