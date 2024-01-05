import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export const getShortDate = (date: Dayjs) => {
    const daysDiff = dayjs().diff(date, "day");
    if (daysDiff === 0) return "TODAY";
    if (daysDiff < 7) return `${daysDiff}D`;

    const weeksDiff = dayjs().diff(date, "week");
    if (weeksDiff < 4) return `${weeksDiff}WE`;

    const monthsDiff = dayjs().diff(date, "month");
    if (monthsDiff < 12) return `${monthsDiff}MO`;

    return `${dayjs().diff(date, "year")}Y`;
};
