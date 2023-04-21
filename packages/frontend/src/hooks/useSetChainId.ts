import { useDispatch } from "../state/connector";
import { setChainId } from "../state/reducers/chainId";
import { ChainId } from "@carrot-kpi/sdk";

export const useSetChainId = () => {
    const dispatch = useDispatch();

    return (chainId: ChainId) => {
        dispatch(setChainId(chainId));
    };
};
