import React from "react";
import { SVGIcon } from "./types";

const Arrow = (props: SVGIcon) => (
    <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M3 12.002L21 12.002" stroke="black" strokeLinecap="round" />
        <path
            d="M15 18.002L21 12.002L15 6.00195"
            stroke="black"
            strokeLinecap="round"
        />
    </svg>
);

export default Arrow;
