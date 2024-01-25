import React, { useCallback } from "react";
import { useDrafts } from "../../../../hooks/useDrafts";
import { Typography } from "@carrot-kpi/ui";
import dayjs from "dayjs";
import { useDeleteDraft } from "../../../../hooks/useDeleteDraft";
import { Link } from "react-router-dom";
import X from "../../../../icons/x";
import { cva } from "class-variance-authority";
import { Empty } from "../../../ui/empty";
import { useTranslation } from "react-i18next";

const draftStyles = cva([
    "-translate-x-5",
    "group",
    "w-full",
    "p-5",
    "flex",
    "justify-between",
    "items-center",
    "rounded-xl",
    "border",
    "border-transparent",
    "hover:cursor-pointer",
    "hover:border-black",
    "dark:hover:border-white",
    "transition-all",
    "duration-150",
]);

const deleteDraftButtonStyles = cva([
    "flex",
    "items-center",
    "h-8",
    "w-8",
    "text-black",
    "dark:text-white",
    "border",
    "border-black",
    "dark:border-white",
    "rounded-full",
    "opacity-0",
    "group-hover:opacity-100",
    "transition-all",
    "duration-150",
]);

export const Drafts = () => {
    const { t } = useTranslation();
    const drafts = useDrafts();
    const deleteDraft = useDeleteDraft();

    const handleDeleteClick = useCallback(
        (event: React.MouseEvent) => {
            deleteDraft(parseInt((event.target as HTMLElement).id));
        },
        [deleteDraft],
    );

    return (
        <div className="gap-3 flex-col flex">
            {drafts.length === 0 ? (
                <Empty
                    title={t("empty.drafts.title")}
                    description={t("empty.drafts.description")}
                    vertical
                    titleVariant="h4"
                    descriptionVariant="sm"
                    className={{ icon: "h-20" }}
                />
            ) : (
                drafts.map((draft) => (
                    <div key={draft.id} className={draftStyles()}>
                        <Link
                            to={`/create/${draft.templateId}/draft/${draft.id}`}
                            className="flex-grow"
                        >
                            <div className="flex flex-col gap-1">
                                <Typography uppercase weight="bold">
                                    {(draft.body as { title: string }).title ||
                                        t("draft.title.missing")}
                                </Typography>
                                <Typography>
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
                ))
            )}
        </div>
    );
};
