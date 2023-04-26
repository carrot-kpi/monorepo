import React from "react";
import { SVGIcon } from "../types";

const Tick = (props: SVGIcon) => (
    <svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M202.044 332.701C216.248 332.701 229.36 327.968 239.923 319.776L153.238 233.122C145.043 243.499 140.308 256.606 140.308 270.988C140.126 305.03 167.807 332.701 202.044 332.701Z"
            fill="white"
        />
        <path
            d="M459.913 270.806C459.913 256.606 455.178 243.499 446.983 232.94L360.298 319.593C370.679 327.785 383.791 332.519 398.178 332.519C432.232 332.701 459.913 305.03 459.913 270.806Z"
            fill="white"
        />
        <path
            d="M503.62 176.689L465.194 215.101C477.942 230.392 485.591 249.689 485.591 271.17C485.591 319.412 446.437 358.552 398.177 358.552C376.87 358.552 357.384 350.906 342.087 338.163L300.019 380.215L257.951 338.163C242.654 350.906 223.35 358.552 201.861 358.552C153.601 358.552 114.447 319.412 114.447 271.17C114.447 249.871 122.096 230.392 134.844 215.101L115.176 195.44L96.4183 176.689C74.5649 212.734 61.9993 254.786 61.9993 299.934C61.9993 431.37 168.534 537.684 299.837 537.684C431.139 537.684 537.674 431.188 537.674 299.934C538.039 254.604 525.473 212.552 503.62 176.689Z"
            fill="white"
        />
        <path
            d="M472.114 135.728C428.954 90.399 367.764 62 300.019 62C232.273 62 171.266 90.399 127.924 135.728C122.096 141.918 116.451 148.472 111.169 155.207L299.837 343.805L488.504 155.025C483.769 148.471 478.124 141.736 472.114 135.728ZM300.019 92.9476C355.745 92.9476 407.465 114.429 446.255 153.569L300.019 299.751L153.783 153.569C192.755 114.429 244.293 92.9476 300.019 92.9476Z"
            fill="white"
        />
    </svg>
);

export default Tick;
