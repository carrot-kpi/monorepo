import React from "react";
import { SVGIcon } from "./types";

const Clock = (props: SVGIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <g>
            <path
                d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12Z"
                stroke="currentColor"
            />
            <path stroke="currentColor" strokeLinecap="round" d="M12 5v7l4 4" />
        </g>
    </svg>
);

export default Clock;
