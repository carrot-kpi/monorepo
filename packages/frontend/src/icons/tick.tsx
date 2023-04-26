import React from "react";
import { SVGIcon } from "./types";

const Tick = (props: SVGIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        width="48"
        viewBox="0 0 48 48"
        {...props}
    >
        <path
            fill="currentColor"
            d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z"
        />
    </svg>
);

export default Tick;
