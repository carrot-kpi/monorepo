import React from "react";
import type { SVGIcon } from "./types";

const Code = (props: SVGIcon) => (
    <svg
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M10.4 18.1L5.8 13.5L10.4 8.9L9 7.5L3 13.5L9 19.5L10.4 18.1ZM15.6 18.1L20.2 13.5L15.6 8.9L17 7.5L23 13.5L17 19.5L15.6 18.1Z"
            fill="#B3B3B3"
        />
    </svg>
);

export default Code;
