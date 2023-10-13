import React from "react";
import type { SVGIcon } from "./types";

const PlayVideo = (props: SVGIcon) => {
    return (
        <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            version="1.1"
            id="svg88"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fill="currentColor"
                d="M 14.5,0 A 14.5,14.5 0 0 0 0,14.5 14.5,14.5 0 0 0 14.5,29 14.5,14.5 0 0 0 29,14.5 14.5,14.5 0 0 0 14.5,0 Z m -2.923828,8.2890625 c 0.259968,-0.00118 0.527394,0.066482 0.777344,0.2167969 l 7.830078,4.7089846 c 0.969299,0.582899 0.969299,1.987413 0,2.570312 l -7.830078,4.708985 C 11.353717,21.09534 10.080078,20.375683 10.080078,19.208984 V 9.7910156 c 0,-0.8749716 0.716188,-1.4984042 1.496094,-1.5019531 z"
            />
        </svg>
    );
};

export default PlayVideo;
