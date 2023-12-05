import React, { type ReactNode, useEffect, useRef } from "react";
import { mergedCva } from "../utils/components";

const rootStyles = mergedCva(
    [
        "cui-fixed",
        "cui-top-0",
        "cui-left-0",
        "cui-w-screen",
        "cui-h-screen",
        "cui-z-50",
        "cui-flex",
        "cui-justify-center",
        "cui-items-center",
        "cui-bg-black/30",
        "cui-backdrop-blur",
        "cui-transition-opacity",
    ],
    {
        variants: {
            open: {
                true: [
                    "cui-will-change-contents",
                    "cui-opacity-100",
                    "cui-pointer-events-auto",
                ],
                false: [
                    "cui-will-change-auto",
                    "cui-opacity-0",
                    "cui-pointer-events-none",
                ],
            },
        },
    },
);

export interface ModalProps {
    open?: boolean;
    onDismiss?: () => void;
    children?: ReactNode;
    className?: { root?: string };
}

export const Modal = ({
    open,
    onDismiss,
    children,
    className,
    ...rest
}: ModalProps) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open || !onDismiss) return;
        const handleCloseOnClick = (event: MouseEvent) => {
            if (
                event.button === 0 && // don't close the modal on double clicks
                !!overlayRef.current &&
                overlayRef.current.isSameNode(event.target as Node)
            )
                onDismiss();
        };
        const handleCloseOnKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onDismiss();
        };
        document.addEventListener("mousedown", handleCloseOnClick);
        document.addEventListener("keydown", handleCloseOnKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleCloseOnClick);
            document.removeEventListener("keydown", handleCloseOnKeyDown);
        };
    }, [onDismiss, open]);

    return (
        <div
            className={rootStyles({ open, className: className?.root })}
            ref={overlayRef}
            {...rest}
        >
            {children}
        </div>
    );
};
