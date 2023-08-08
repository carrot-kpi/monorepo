import React, { type ReactElement, type ReactNode } from "react";
import { mergedCva } from "../../../utils/components";
import DangerIcon from "../../../icons/danger";
import { Typography, type TypographyProps } from "../typography";

const errorTextWrapperStyles = mergedCva([
    "cui-flex",
    "cui-items-center",
    "cui-gap-2",
    "cui-mt-2",
]);

const errorTextIconStyles = mergedCva(["cui-w-6"], {
    variants: {
        variant: {
            danger: ["cui-stroke-red"],
            info: ["cui-stroke-black", "dark:cui-stroke-white"],
        },
    },
});

const errorTextStyles = mergedCva(["cui-text-red", "dark:cui-text-red"]);

export interface ErrorTextProps {
    className?: {
        root?: string;
        icon?: string;
        text?: TypographyProps["className"];
    };
    children: ReactNode;
}

export const ErrorText = ({
    children,
    className,
}: ErrorTextProps): ReactElement => {
    return (
        <div
            className={errorTextWrapperStyles({
                className: className?.root,
            })}
        >
            <div>
                {typeof children === "string" && !!children && (
                    <DangerIcon
                        className={errorTextIconStyles({
                            variant: "danger",
                            className: className?.icon,
                        })}
                    />
                )}
            </div>
            <Typography
                variant="xs"
                className={{
                    ...className?.text,
                    root: errorTextStyles({
                        className: className?.text?.root,
                    }),
                }}
            >
                {children}
            </Typography>
        </div>
    );
};
