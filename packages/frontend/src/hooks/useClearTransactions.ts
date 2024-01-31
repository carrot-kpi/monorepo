import { useAccount } from "wagmi";
import { useDispatch } from "../state/hooks";
import { clearTransactions } from "../state/reducers/transactions";

export const useClearTransactions = () => {
    const dispatch = useDispatch();
    const { chain } = useAccount();

    return () => {
        if (!chain) return;
        dispatch(clearTransactions({ chainId: chain.id }));
    };
};
