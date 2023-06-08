import React, { forwardRef } from "react";
import type { ReactElement } from "react";
import RcSwitch, {
    type SwitchChangeEventHandler,
    type SwitchClickEventHandler,
} from "rc-switch";

export interface SwitchProps
    extends Omit<
        React.HTMLAttributes<HTMLButtonElement>,
        "onChange" | "onClick" | "dangerouslySetInnerHTML"
    > {
    className?: string;
    disabled?: boolean;
    checkedChildren?: React.ReactNode;
    unCheckedChildren?: React.ReactNode;
    onChange?: SwitchChangeEventHandler;
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
    onClick?: SwitchClickEventHandler;
    tabIndex?: number;
    checked?: boolean;
    defaultChecked?: boolean;
    loadingIcon?: React.ReactNode;
    style?: React.CSSProperties;
    title?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
    function Switch(props, ref): ReactElement {
        return <RcSwitch prefixCls="cui-switch" {...props} ref={ref} />;
    }
);
