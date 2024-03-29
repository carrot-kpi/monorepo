import React from "react";
import type { SVGIcon } from "./types";

const Calendar = (props: SVGIcon) => (
    <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M3 5.65112H21V21.6511H3V5.65112Z"
            stroke="currentColor"
            strokeLinejoin="round"
        />
        <path d="M21 9.65112H3" stroke="currentColor" strokeLinecap="round" />
        <path
            d="M7 5.65112V3.65112"
            stroke="currentColor"
            strokeLinecap="round"
        />
        <path
            d="M17 5.65112V3.65112"
            stroke="currentColor"
            strokeLinecap="round"
        />
    </svg>
);

export default Calendar;
