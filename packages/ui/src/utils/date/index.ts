import dayjs, { Dayjs } from "dayjs";
import durationPlugin, { Duration } from "dayjs/plugin/duration";

dayjs.extend(durationPlugin);

// our interface for a single cell
export interface CalendarCell {
    text: string;
    value: Dayjs;
}

const prepareCell = (date: Dayjs, dayNumber: number) => {
    return {
        text: String(dayNumber),
        value: date.clone().set("date", dayNumber),
    };
};

export const getCalendarCells = (date: Dayjs): CalendarCell[] => {
    const daysInMonth = date.daysInMonth();
    const calendarCells: CalendarCell[] = [];

    // push current month day cells
    for (let i = 0; i < daysInMonth; i++)
        calendarCells.push(prepareCell(date, i + 1));

    // we always aim to have a constant day-week cell array
    // so that the first cell starts at monday and the 7th
    // ends on sunday
    const firstDateDayOfWeek = calendarCells[0].value.day();
    const cellsToPrepend =
        firstDateDayOfWeek === 0 ? 6 : firstDateDayOfWeek - 1;

    // add to start from prev month
    const lastMonth = date.subtract(1, "month");
    for (let i = 0; i < cellsToPrepend; i++)
        calendarCells.unshift(
            prepareCell(lastMonth, lastMonth.daysInMonth() - i)
        );

    // add to end from next month
    const nextMonth = date.add(1, "month");
    const calendarCellsLength = calendarCells.length;
    for (let i = 0; i < 42 - calendarCellsLength; i++)
        calendarCells.push(prepareCell(nextMonth, i + 1));

    return calendarCells;
};

export const resolvedValue = (
    value?: Date | null,
    min?: Date | null,
    max?: Date | null
) => {
    return rectifyDate(value ? dayjs(value) : dayjs(), min, max);
};

export const rectifyDate = (
    value: Dayjs,
    min?: Date | null,
    max?: Date | null
) => {
    if (!!(min && value.isBefore(min))) return dayjs(min);
    if (!!(max && value.isAfter(max))) return dayjs(max);
    return value;
};

export const getDurationFromNowToUNIXTimestamp = (to: number): Duration => {
    const now = dayjs();
    if (to - now.unix() < 0) return dayjs.duration(0);
    return dayjs.duration(dayjs.unix(to).diff(dayjs()));
};
