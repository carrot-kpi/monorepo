import React from "react";
import type { SVGIcon } from "./types";

const ChevronUp = (props: SVGIcon) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M15 11.6667L10 6.66675L5 11.6667"
            stroke="currentColor"
            strokeLinecap="round"
        />
    </svg>
);

export default ChevronUp;
