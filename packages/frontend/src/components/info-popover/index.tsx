import { Popover } from "@carrot-kpi/ui";
import React, { ReactNode, useCallback, useRef, useState } from "react";
import { ReactComponent as X } from "../../assets/x.svg";

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
            {/* FIXME: update icon asap */}
            <X
                className="w-3 h-4 text-sm text-black dark:text-white"
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
