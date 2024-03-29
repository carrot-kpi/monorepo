import React from "react";
import type { SVGIcon } from "./types";

const Bold = (props: SVGIcon) => (
    <svg
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M16.225 13.29C17.195 12.62 17.875 11.52 17.875 10.5C17.875 8.24 16.125 6.5 13.875 6.5H7.625L7.625 20.5H14.665C16.755 20.5 18.375 18.8 18.375 16.71C18.375 15.19 17.515 13.89 16.225 13.29ZM10.625 9H13.625C14.455 9 15.125 9.67 15.125 10.5C15.125 11.33 14.455 12 13.625 12H10.625V9ZM14.125 18H10.625V15H14.125C14.955 15 15.625 15.67 15.625 16.5C15.625 17.33 14.955 18 14.125 18Z"
            fill="#B3B3B3"
        />
    </svg>
);

export default Bold;
