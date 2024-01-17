import React from "react";
import type { SVGIcon } from "./types";

const CaretDown = (props: SVGIcon) => (
    <svg
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M1 1.75L7 8.25L13 1.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default CaretDown;
