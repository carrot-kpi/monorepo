import { NavLink } from "react-router-dom";

export const navbarLinks = [
    {
        Component: NavLink,
        title: "About",
        to: "/about",
    },
    {
        Component: NavLink,
        title: "Campaigns",
        to: "/campaigns",
    },
    {
        title: "Community",
        to: "/community",
    },
];
