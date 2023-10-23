import React from "react";
import type { SVGIcon } from "./types";

const Arrow = (props: SVGIcon) => (
    <svg
        width="162.98mm"
        height="162.98mm"
        version="1.1"
        viewBox="0 0 162.98 162.98"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g transform="translate(-18.246 -59.087)">
            <circle
                cx="99.737"
                cy="140.58"
                r="74.877"
                fill="none"
                strokeLinejoin="round"
                strokeWidth="13.229"
            />
            <g transform="translate(1.9908 3.9491)">
                <g transform="translate(-2.5,-2.5)">
                    <rect
                        x="92.746"
                        y="92.93"
                        width="15"
                        fill="#000"
                        stroke="#000"
                        height="70"
                        ry="7.5"
                    />
                    <circle
                        cx="100.25"
                        cy="176.83"
                        r="8.5"
                        fill="#000"
                        stroke="#000"
                    />
                </g>
            </g>
        </g>
    </svg>
);

export default Arrow;
