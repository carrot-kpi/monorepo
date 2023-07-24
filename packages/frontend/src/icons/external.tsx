import React from "react";
import type { SVGIcon } from "./types";

const External = (props: SVGIcon) => (
    <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M11.423 6.89964V14.3497H2.28906V5.21582H9.72095"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M13.8165 6.83008V2.82221H9.80859"
            stroke="currentColor"
            strokeLinecap="round"
        />
        <path
            d="M13.8184 2.82224L8.35742 8.2832"
            stroke="currentColor"
            strokeLinecap="round"
        />
    </svg>
);

export default External;
