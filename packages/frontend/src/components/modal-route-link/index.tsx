import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { LinkProps } from "react-router-dom";

export const ModalRouteLink = ({ children, ...rest }: LinkProps) => {
    const location = useLocation();

    return (
        <Link
            {...rest}
            state={{ ...rest.state, modalBackgroundLocation: location }}
        >
            {children}
        </Link>
    );
};
