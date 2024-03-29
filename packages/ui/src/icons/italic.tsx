import React from "react";
import type { SVGIcon } from "./types";

const Italic = (props: SVGIcon) => (
    <svg
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M11 6.5V9.5H13.21L9.79 17.5H7V20.5H15V17.5H12.79L16.21 9.5H19V6.5L11 6.5Z"
            fill="#B3B3B3"
        />
    </svg>
);

export default Italic;
