import React from "react";
import { Typography } from "@carrot-kpi/ui";

const CheckboxInput = ({ title }: { title: string }) => (
    <div className="flex items-center space-x-2">
        <input type="checkbox" name={title} id={title} className="w-5 h-5" />
        <Typography>{title}</Typography>
    </div>
);

export const CheckOption = ({
    title,
    total,
}: {
    title: string;
    total: number;
}) => (
    <label className="flex items-center justify-between cursor-pointer">
        <CheckboxInput title={title} />
        <Typography variant="sm">{total}</Typography>
    </label>
);
