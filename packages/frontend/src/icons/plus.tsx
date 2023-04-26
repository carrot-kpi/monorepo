import React from "react";
import { SVGIcon } from "./types";

const Plus = (props: SVGIcon) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <line
            y1="-0.5"
            x2="24"
            y2="-0.5"
            transform="matrix(-3.91102e-08 1 1 4.88539e-08 12.0005 0)"
            stroke="black"
        />
        <line
            y1="-0.5"
            x2="24"
            y2="-0.5"
            transform="matrix(-1 0 0 1 24 12.0017)"
            stroke="black"
        />
    </svg>
);

export default Plus;
