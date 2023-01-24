import { cva } from "class-variance-authority";
import React, { ReactNode, useEffect, useRef } from "react";

const rootStyles = cva(
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
    ],
    {
        variants: {
            open: {
                true: ["cui-block"],
                false: ["cui-hidden"],
            },
        },
    }
);

export interface ModalProps {
    open?: boolean;
    onDismiss?: () => void;
    children?: ReactNode;
    className?: { root?: string };
}

export const Modal = ({ open, onDismiss, children, className }: ModalProps) => {
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
        document.addEventListener("mousedown", handleCloseOnClick);
        return () => {
            document.removeEventListener("mousedown", handleCloseOnClick);
        };
    }, [onDismiss, open]);

    return (
        <div
            className={rootStyles({ open, className: className?.root })}
            ref={overlayRef}
        >
            {children}
        </div>
    );
};
