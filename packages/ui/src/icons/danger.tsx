import React from "react";
import type { SVGIcon } from "./types";

const Code = (props: SVGIcon) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path strokeLinecap="round" d="M10 8.334v2.5" />
        <path
            fillRule="evenodd"
            d="M10 14.167a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667Z"
            clipRule="evenodd"
        />
        <path
            strokeLinejoin="round"
            d="M9.138 3.965a1 1 0 0 1 1.724 0l6.585 11.195a1 1 0 0 1-.862 1.507H3.415a1 1 0 0 1-.862-1.507L9.138 3.965Z"
            clipRule="evenodd"
        />
    </svg>
);

export default Code;
