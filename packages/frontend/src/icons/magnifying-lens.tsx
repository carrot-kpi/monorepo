import React from "react";
import type { SVGIcon } from "./types";

const MagnifyingLens = (props: SVGIcon) => (
    <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M14.4121 14.9131L20 20.501"
            stroke="currentColor"
            strokeLinecap="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 16.501C13.3137 16.501 16 13.8147 16 10.501C16 7.18727 13.3137 4.50098 10 4.50098C6.68629 4.50098 4 7.18727 4 10.501C4 13.8147 6.68629 16.501 10 16.501Z"
            stroke="currentColor"
        />
    </svg>
);

export default MagnifyingLens;
