import React from "react";
import type { SVGIcon } from "./types";

const DoubleQuotes = (props: SVGIcon) => (
    <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M18.1569 18.574L6.84319 7.26033"
            stroke="black"
            strokeLinecap="round"
        />
        <path
            d="M18.1568 7.26033L6.84311 18.574"
            stroke="black"
            strokeLinecap="round"
        />
    </svg>
);

export default DoubleQuotes;
