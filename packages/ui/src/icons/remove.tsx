import React from "react";
import { SVGIcon } from "./types";

const Remove = (props: SVGIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        {...props}
    >
        <path
            fillRule="evenodd"
            d="M7.286 16.714a6.667 6.667 0 1 0 9.428-9.428 6.667 6.667 0 0 0-9.428 9.428Z"
            clipRule="evenodd"
        />
        <path
            strokeLinecap="round"
            d="M14.357 14.357 9.643 9.643M9.643 14.357l4.714-4.714"
        />
    </svg>
);

export default Remove;
