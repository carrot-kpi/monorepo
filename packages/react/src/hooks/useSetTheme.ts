import { type Theme, setTheme, useDispatch } from "@carrot-kpi/shared-state";

export const useSetTheme = () => {
    const dispatch = useDispatch();

    return (theme: Theme) => {
        dispatch(setTheme(theme));
    };
};
