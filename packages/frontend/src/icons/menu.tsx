import React from "react";
import type { SVGIcon } from "./types";

const Menu = (props: SVGIcon) => (
    <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect x="4.5" y="7.14258" width="27" height="2" fill="black" />
        <rect x="4.5" y="26.8574" width="27" height="2" fill="black" />
        <rect x="4.5" y="17" width="27" height="2" fill="black" />
    </svg>
);

export default Menu;
