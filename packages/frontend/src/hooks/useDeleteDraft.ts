import { useDispatch } from "../state/hooks";
import { deleteDraft } from "../state/reducers/drafts";

export function useDeleteDraft() {
    const dispatch = useDispatch();

    return (id: number) => {
        dispatch(
            deleteDraft({
                id,
            }),
        );
    };
}
