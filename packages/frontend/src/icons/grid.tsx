import React from "react";
import type { SVGIcon } from "./types";

const Grid = (props: SVGIcon) => (
    <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
        <path
            d="M3 5V19H21V5H3ZM19 11H15.67V7H19V11ZM13.67 11H10.34V7H13.67V11ZM8.33 7V11H5V7H8.33ZM5 17V13H8.33V17H5ZM10.33 17V13H13.66V17H10.33ZM15.67 17V13H19V17H15.67Z"
            fill="currentColor"
        />
    </svg>
);

export default Grid;
