import React, { forwardRef } from "react";
import type { SVGIcon } from "./types";

const Info = forwardRef<SVGSVGElement, SVGIcon>(function Info(
    props: SVGIcon,
    ref,
) {
    return (
        <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            ref={ref}
        >
            <path
                d="M10.7721 13.2695V10.7695"
                stroke="#B3B3B3"
                strokeLinecap="round"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.7721 7.43587C10.3119 7.43587 9.9388 7.80897 9.9388 8.26921C9.9388 8.72944 10.3119 9.10254 10.7721 9.10254C11.2324 9.10254 11.6055 8.72944 11.6055 8.26921C11.6055 7.80897 11.2324 7.43587 10.7721 7.43587Z"
                fill="#B3B3B3"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.7708 19.1032C15.3732 19.1032 19.1042 15.3722 19.1042 10.7699C19.1042 6.16748 15.3732 2.43652 10.7708 2.43652C6.16846 2.43652 2.4375 6.16748 2.4375 10.7699C2.4375 15.3722 6.16846 19.1032 10.7708 19.1032Z"
                stroke="#B3B3B3"
            />
        </svg>
    );
});

export default Info;
