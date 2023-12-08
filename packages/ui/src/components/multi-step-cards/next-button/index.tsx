import React from "react";
import type { ReactElement } from "react";
import ChevronDown from "../../../icons/chevron-down";
import { Button, type ButtonProps } from "../../button";
import { mergedCx } from "../../../utils/components";

export type NextButtonProps = ButtonProps;

export const NextStepButton = ({
    children,
    className,
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
                    // FIXME: some styles don't take effect when the component
                    // is used externally
                    root: mergedCx(
                        [
                            "cui-w-44",
                            "cui-h-20",
                            "!cui-rounded-3xl",
                            "cui-bg-orange",
                        ],
                        className?.root,
                    ),
                    contentWrapper: mergedCx(
                        ["cui-pt-3"],
                        className?.contentWrapper,
                    ),
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
