import React, { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import squarePatternLight from "../../../assets/square-pattern-light.svg";
import squarePatternDark from "../../../assets/square-pattern-dark.svg";
import { usePreferences } from "@carrot-kpi/react";

type Background = "white" | "black" | "orange";

const URL_MAP: Record<Background, string> = {
    orange: squarePatternLight,
    white: squarePatternLight,
    black: squarePatternDark,
};

const containerStyles = cva(["absolute"], {
    variants: {
        fullSize: {
            true: ["w-full h-full top-0"],
            false: ["w-[92.45%] h-[72.5%] top-0 md:top-8 left-[5%]"],
        },
    },
    defaultVariants: {
        fullSize: false,
    },
});

interface GridPatterBgProps {
    bg?: Background;
    fullSize?: boolean;
    className?: string;
}

export const GridPatternBg = ({
    bg,
    fullSize,
    className,
}: GridPatterBgProps) => {
    const { theme } = usePreferences();

    const [chosenBg, setChosenBg] = useState(bg);

    useEffect(() => {
        if (!!bg) {
            setChosenBg(bg);
            return;
        }
        if (theme === "dark") {
            setChosenBg("black");
            return;
        }
        if (theme === "light") {
            setChosenBg("white");
            return;
        }
        let cancelled = false;
        const match = window.matchMedia("(prefers-color-scheme: light)");
        const handleChange = () => {
            if (!cancelled) setChosenBg(match.matches ? "white" : "black");
        };

        match.addEventListener("change", handleChange);
        setChosenBg(match.matches ? "white" : "black");

        return () => {
            cancelled = true;
            match.removeEventListener("change", handleChange);
        };
    }, [bg, theme]);

    return (
        <div className={containerStyles({ fullSize })}>
            <div
                style={
                    !!chosenBg
                        ? { backgroundImage: `url(${URL_MAP[chosenBg]})` }
                        : {}
                }
                className={`w-full h-full bg-center bg-2 md:bg-4 ${className}`}
            />
        </div>
    );
};
