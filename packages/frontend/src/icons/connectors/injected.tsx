import React from "react";
import type { SVGIcon } from "../types";

const Injected = (props: SVGIcon) => (
    <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.2909 15.2175C20.2909 18.0245 17.5458 20.4807 12.0556 22.5859C6.56541 20.4807 3.82031 18.0245 3.82031 15.2175C3.82031 12.4105 3.82031 8.90173 3.82031 4.6912C7.50986 3.28769 10.255 2.58594 12.0556 2.58594C13.8563 2.58594 16.6014 3.28769 20.2909 4.6912C20.2909 8.90173 20.2909 12.4105 20.2909 15.2175Z"
            stroke="currentColor"
        />
        <path
            d="M14.0547 8.08594H12.0547V12.5859"
            stroke="currentColor"
            strokeLinecap="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.0547 15.0859C14.0547 13.9814 13.1593 13.0859 12.0547 13.0859C10.9501 13.0859 10.0547 13.9814 10.0547 15.0859C10.0547 16.1905 10.9501 17.0859 12.0547 17.0859C13.1593 17.0859 14.0547 16.1905 14.0547 15.0859Z"
            stroke="currentColor"
        />
        <path
            d="M13.5547 10.0859H12.0547"
            stroke="currentColor"
            strokeLinecap="round"
        />
    </svg>
);

export default Injected;
