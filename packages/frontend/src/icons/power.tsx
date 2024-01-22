import React from "react";
import type { SVGIcon } from "./types";

const Power = (props: SVGIcon) => (
    <svg width="24" height="26" viewBox="0 0 24 26" fill="none" {...props}>
        <path
            d="M12.1305 1.02393L12.1305 10.2139"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.19204 2.66286C3.43235 4.24585 0 8.73553 0 14.0269C0 20.6396 5.36066 26.0002 11.9734 26.0002C18.5861 26.0002 23.9467 20.6396 23.9467 14.0269C23.9467 8.85279 20.6648 4.44524 16.0692 2.77236V4.93063C19.5346 6.49347 21.9467 9.97848 21.9467 14.0269C21.9467 19.535 17.4815 24.0002 11.9734 24.0002C6.46523 24.0002 2 19.535 2 14.0269C2 9.85712 4.55891 6.28502 8.19204 4.7953V2.66286Z"
            fill="currentColor"
        />
    </svg>
);

export default Power;
