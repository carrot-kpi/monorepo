import React from "react";
import type { SVGIcon } from "./types";

const Warning = (props: SVGIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            d="M12 6.49L19.53 19.5H4.47L12 6.49ZM12 2.5L1 21.5H23L12 2.5ZM13 16.5H11V18.5H13V16.5ZM13 10.5H11V14.5H13V10.5Z"
            fill="currentColor"
        />
    </svg>
);

export default Warning;
