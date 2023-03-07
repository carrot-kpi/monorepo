import { useNetwork } from "wagmi";
import { useDispatch } from "../state/connector";
import { clearTransactions } from "../state/reducers/transactions";

export const useClearTransactions = () => {
    const dispatch = useDispatch();
    const { chain } = useNetwork();

    return () => {
        if (!chain) return;
        dispatch(clearTransactions({ chainId: chain.id }));
    };
};
