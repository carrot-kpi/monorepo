import { cva } from "class-variance-authority";
import React, { ReactElement } from "react";
import { matchChildByName } from "../../../utils/components";

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

type CardComponents = "CardContent" | "CardTitle" | "CardActions";

export const Card = ({ className, children }: CardProps): ReactElement => {
    const childrenArray = React.Children.toArray(children);

    const titleChildren = childrenArray.find((child) =>
        matchChildByName<CardComponents>(child, "CardTitle")
    );
    const contentChildren = childrenArray.find((child) =>
        matchChildByName<CardComponents>(child, "CardContent")
    );
    const actionsChildren = childrenArray.find((child) =>
        matchChildByName<CardComponents>(child, "CardActions")
    );

    return (
        <div className={rootStyles({ className: className?.root })}>
            {titleChildren && (
                <div className="cui-flex cui-items-center cui-border-b cui-border-black dark:cui-border-white [&:last-of-type]:cui-border-none">
                    <div className="cui-p-3">
                        <div className="cui-rounded-full cui-bg-blue cui-h-6 cui-w-6" />
                    </div>
                    {titleChildren}
                </div>
            )}
            {contentChildren}
            {actionsChildren && actionsChildren}
        </div>
    );
};
