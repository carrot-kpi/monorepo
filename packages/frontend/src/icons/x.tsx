import React from "react";
import type { SVGIcon } from "./types";

const X = (props: SVGIcon) => (
    <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M8.4541 8.43823L27.546 27.5301"
            stroke="black"
            strokeWidth="1.6875"
        />
        <path
            d="M8.4541 27.562L27.546 8.47013"
            stroke="black"
            strokeWidth="1.6875"
        />
    </svg>
);

export default X;
