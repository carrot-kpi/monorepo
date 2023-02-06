import React, { ReactNode } from "react";

export function matchChildByName<T>(child: ReactNode, name: T) {
    return (
        React.isValidElement(child) &&
        (child.type as unknown as () => void).name === name
    );
}

export const formatCountDownString = (milliseconds: number) => {
    if (milliseconds <= 0) {
        return "00D 00H 00M";
    }

    const daysLeft = milliseconds / 1000 / 60 / 60 / 24;
    const hoursLeft = (milliseconds / 1000 / 60 / 60) % 24;
    const minutesLeft = (milliseconds / 1000 / 60) % 60;

    return `${Math.floor(daysLeft)}D ${Math.floor(hoursLeft)}H ${Math.floor(
        minutesLeft
    )}M`;
};
