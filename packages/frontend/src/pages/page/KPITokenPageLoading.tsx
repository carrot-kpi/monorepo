import React from "react";
import { GridPatternBg } from "../../components/ui/grid-pattern-bg";

export const KPITokenPageLoading = () => (
    <>
        <div className="relative w-full h-64 bg-orange">
            <GridPatternBg bg="orange" />
        </div>
        <div className="flex items-center justify-center my-28 text-orange">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-12 h-12 cui-animate-spin"
            >
                <circle
                    opacity="0.25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    opacity="0.75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>
    </>
);
