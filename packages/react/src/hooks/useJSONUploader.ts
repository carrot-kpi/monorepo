import { useSelector, type State } from "@carrot-kpi/shared-state";
import type { SerializableObject } from "../types/templates";
import { useCallback } from "react";
import { useDevMode } from "./useDevMode";
import { useAccount } from "wagmi";

export type JsonUploader<S extends SerializableObject<S>> = (
    content: S,
) => Promise<string>;

export const useJSONUploader = <
    S extends SerializableObject<S>,
>(): JsonUploader<S> => {
    const devMode = useDevMode();
    const dataManagerJWT = useSelector<State, State["auth"]["dataManagerJWT"]>(
        (state) => state.auth.dataManagerJWT,
    );
    const { chain } = useAccount();

    const localUploader = useCallback(async (content: S): Promise<string> => {
        const formData = new FormData();
        formData.append(
            "file",
            new File([JSON.stringify(content)], "carrot-content", {
                type: "application/json",
            }),
        );
        const response = await fetch("http://localhost:5002/api/v0/add", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: formData,
        });
        if (!response.ok)
            throw new Error(
                `could not upload content to ipfs, request failed with status ${response.status}`,
            );
        const { Hash } = (await response.json()) as { Hash: string };
        return Hash;
    }, []);

    const remoteUploader = useCallback(
        async (data: S): Promise<string> => {
            if (!chain) throw new Error("undefined chain");
            const response = await fetch(
                `${chain.serviceUrls.dataManager}/data/s3/json`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${dataManagerJWT}`,
                    },
                    body: JSON.stringify({ data }),
                },
            );
            if (!response.ok)
                throw new Error(
                    `could not upload content to ipfs, request failed with status ${response.status}`,
                );
            const { cid } = (await response.json()) as { cid: string };
            return cid;
        },
        [dataManagerJWT, chain],
    );

    return devMode ? localUploader : remoteUploader;
};
