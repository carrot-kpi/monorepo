import { cva } from "class-variance-authority";
import React, { ReactElement } from "react";
import { matchChildByType } from "../../../utils/components";
import { CardActions } from "./actions";
import { CardContent } from "./content";
import { CardTitle } from "./title";

export * from "./title";
export * from "./content";
export * from "./actions";

const rootStyles = cva([
    "cui-bg-white",
    "dark:cui-bg-black",
    "cui-w-full",
    "cui-rounded-xxl",
    "cui-border",
    "cui-border-black",
    "dark:cui-border-white",
]);

export interface CardProps {
    className?: {
        root?: string;
    };
    children: ReactElement | ReactElement[];
}

export const Card = ({ className, children }: CardProps): ReactElement => {
    const childrenArray = React.Children.toArray(children);

    const titleChildren = childrenArray.find((child) =>
        matchChildByType(child, CardTitle)
    );
    const contentChildren = childrenArray.find((child) =>
        matchChildByType(child, CardContent)
    );
    const actionsChildren = childrenArray.find((child) =>
        matchChildByType(child, CardActions)
    );

    return (
        <div className={rootStyles({ className: className?.root })}>
            {titleChildren}
            {contentChildren}
            {actionsChildren}
        </div>
    );
};
