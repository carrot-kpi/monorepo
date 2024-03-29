import React from "react";
import type { SVGIcon } from "./types";

const ListOrdered = (props: SVGIcon) => (
    <svg
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M3.5 18.5H5.5V19H4.5V20H5.5V20.5H3.5V21.5H6.5V17.5H3.5V18.5ZM4.5 9.5H5.5V5.5H3.5V6.5H4.5V9.5ZM3.5 12.5H5.3L3.5 14.6V15.5H6.5V14.5H4.7L6.5 12.4V11.5H3.5V12.5ZM8.5 6.5V8.5L22.5 8.5V6.5L8.5 6.5ZM8.5 20.5H22.5V18.5H8.5V20.5ZM8.5 14.5L22.5 14.5V12.5H8.5V14.5Z"
            fill="#B3B3B3"
        />
    </svg>
);

export default ListOrdered;
