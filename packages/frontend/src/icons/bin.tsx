import React from "react";
import { SVGIcon } from "./types";

const Arrow = (props: SVGIcon) => (
    <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M12.722 4.58561H3.38867"
            stroke="currentColor"
            strokeLinecap="round"
        />
        <path
            d="M9.38737 3.9196H6.7207"
            stroke="currentColor"
            strokeLinecap="round"
        />
        <path
            d="M4.05469 7.25293V14.5863H12.0547C12.0547 13.9196 12.0547 7.25293 12.0547 7.25293"
            stroke="currentColor"
            strokeLinecap="round"
        />
    </svg>
);

export default Arrow;
