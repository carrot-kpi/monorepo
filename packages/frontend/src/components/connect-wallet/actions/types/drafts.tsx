import React, { useCallback } from "react";
import { useDrafts } from "../../../../hooks/useDrafts";
import { Button, Typography } from "@carrot-kpi/ui";
import dayjs from "dayjs";
import { useDeleteDraft } from "../../../../hooks/useDeleteDraft";
import Bin from "../../../../icons/bin";
import Open from "../../../../icons/open";
import { Link } from "react-router-dom";

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
        <div className="gap-3 flex-col flex">
            {drafts.map((draft) => (
                <div
                    key={draft.id}
                    className="w-full h-16 flex justify-between items-center"
                >
                    <div className="flex flex-col gap-1">
                        <Typography uppercase weight="bold">
                            {(draft.body as { title: string }).title}
                        </Typography>
                        <Typography>
                            {dayjs.unix(draft.id).format("L HH:mm:ss")}
                        </Typography>
                    </div>
                    <div className="flex gap-1">
                        <Button
                            id={draft.id.toString()}
                            size="xsmall"
                            icon={Bin}
                            onClick={handleDeleteClick}
                            className={{
                                root: "w-10 h-10 p-0 rounded-lg",
                            }}
                        />
                        <Link
                            to={`/create/${draft.templateId}/draft/${draft.id}`}
                        >
                            <Button
                                size="xsmall"
                                icon={Open}
                                className={{
                                    root: "w-10 h-10 p-0 rounded-lg",
                                }}
                            />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};
