import React, { useCallback } from "react";
import { useDrafts } from "../../../../hooks/useDrafts";
import { Typography } from "@carrot-kpi/ui";
import dayjs from "dayjs";
import { useDeleteDraft } from "../../../../hooks/useDeleteDraft";
import { Link } from "react-router-dom";
import X from "../../../../icons/x";
import { cva } from "class-variance-authority";

const draftStyles = cva([
    "group",
    "w-full",
    "p-5",
    "flex",
    "justify-between",
    "items-center",
    "rounded-xl",
    "hover:cursor-pointer",
    "hover:bg-black",
    "dark:hover:bg-white",
    "transition-all",
    "duration-200",
]);

const deleteDraftButtonStyles = cva([
    "flex",
    "items-center",
    "h-8",
    "w-8",
    "text-black",
    "dark:text-white",
    "bg-white",
    "dark:bg-black",
    "rounded-full",
    "opacity-0",
    "group-hover:opacity-100",
    "transition-all",
    "duration-200",
]);

const textStyles = cva([
    "group-hover:text-white",
    "dark:group-hover:text-black",
    "transition-all duration-200",
]);

export const Drafts = () => {
    const drafts = useDrafts();
    const deleteDraft = useDeleteDraft();

    const handleDeleteClick = useCallback(
        (event: React.MouseEvent) => {
            deleteDraft(parseInt((event.target as HTMLElement).id));
        },
        [deleteDraft],
    );

    return (
        <div className="gap-3 flex-col flex -translate-x-5">
            {drafts.map((draft) => (
                <div key={draft.id} className={draftStyles()}>
                    <Link
                        to={`/create/${draft.templateId}/draft/${draft.id}`}
                        className="flex-grow"
                    >
                        <div className="flex flex-col gap-1">
                            <Typography
                                weight="bold"
                                className={{
                                    root: textStyles(),
                                }}
                            >
                                {(draft.body as { title: string }).title}
                            </Typography>
                            <Typography
                                className={{
                                    root: textStyles(),
                                }}
                            >
                                {dayjs.unix(draft.id).format("L HH:mm:ss")}
                            </Typography>
                        </div>
                    </Link>
                    <div className={deleteDraftButtonStyles()}>
                        <X
                            id={draft.id.toString()}
                            className="h-5"
                            onClick={handleDeleteClick}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
