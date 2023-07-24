import React from "react";
import type { SVGIcon } from "./types";

const Info = (props: SVGIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        {...props}
    >
        <path strokeLinecap="round" d="M10 12.5V10" stroke="currentColor" />
        <path
            fillRule="evenodd"
            stroke="currentColor"
            d="M10 6.667a.833.833 0 1 0 0 1.667.833.833 0 0 0 0-1.667Z"
            clipRule="evenodd"
        />
        <path
            d="M10 18.333a8.333 8.333 0 1 0 0-16.667 8.333 8.333 0 0 0 0 16.667Z"
            stroke="currentColor"
            clipRule="evenodd"
        />
    </svg>
);

export default Info;
