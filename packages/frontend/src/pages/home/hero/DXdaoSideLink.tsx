import React from "react";

export const DXdaoSideLink = () => (
    <a
        href="https://dxdao.eth.limo/"
        className="flex items-center justify-center rotate-180"
        style={{ writingMode: "vertical-rl" }}
    >
        <div className="w-2 h-2 mb-2 bg-black rounded-full"></div>
        <p className="font-mono uppercase">By DXdao</p>
    </a>
);
