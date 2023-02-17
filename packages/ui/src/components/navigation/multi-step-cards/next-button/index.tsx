import React from "react";
import { ReactElement } from "react";
import { ReactComponent as ChevronDown } from "../../../../assets/chevron-down.svg";
import { Button, ButtonProps } from "../../../input";

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
                    root: "!cui-w-20 !cui-h-20 !cui-rounded-full",
                }}
            >
                <div className="cui-flex cui-flex-col cui-gap-2 cui-items-center">
                    {children}
                    <ChevronDown />
                </div>
            </Button>
        </div>
    );
};
