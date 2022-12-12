import React from "react";

export const CloseMenuIcon = ({ color = "black" }: { color?: string }) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.51465 1.50073L18.4852 18.4713"
            stroke={color}
            strokeWidth="1.5"
        />
        <path
            d="M1.51465 18.4995L18.4852 1.52895"
            stroke={color}
            strokeWidth="1.5"
        />
    </svg>
);
