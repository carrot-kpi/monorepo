import { Popover } from "@carrot-kpi/ui";
import React, { ReactNode, useCallback, useRef, useState } from "react";
import { ReactComponent as Info } from "../../assets/info.svg";

interface InfoPopoverProps {
    children?: ReactNode;
}

export const InfoPopover = ({ children }: InfoPopoverProps) => {
    const iconRef = useRef<SVGSVGElement>(null);

    const [show, setShow] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setShow(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setShow(false);
    }, []);

    return (
        <>
            <Info
                className="w-5 h-5 text-sm text-gray-500 dark:text-gray-600"
                ref={iconRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <Popover
                anchor={iconRef.current}
                open={show}
                placement="auto"
                className={{ root: "z-50 px-3 py-2" }}
            >
                {children}
            </Popover>
        </>
    );
};
