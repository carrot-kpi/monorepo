import React from "react";
import type { ReactElement } from "react";
import ChevronDown from "../../../icons/chevron-down";
import { Button, type ButtonProps } from "../../button";

export type NextButtonProps = ButtonProps;

export const NextStepButton = ({
    children,
    ...rest
}: NextButtonProps): ReactElement => {
    return (
        <div className="cui-absolute cui-bottom-0 cui-left-1/2 cui-transform -cui-translate-x-1/2 cui-translate-y-1/2">
            <Button
                {...rest}
                size="small"
                className={{
                    // FIXME: find out why important is needed, fix
                    // the root cause and remove it
                    root: "cui-w-44 cui-h-20 !cui-rounded-3xl cui-bg-orange",
                    contentWrapper: "cui-pt-3",
                }}
            >
                <div className="cui-flex cui-flex-col cui-items-center">
                    {children}
                    <ChevronDown />
                </div>
            </Button>
        </div>
    );
};
