import { useSelector, type State } from "@carrot-kpi/shared-state";
import { SERVICE_URLS } from "@carrot-kpi/sdk";
import type { SerializableObject } from "../types/templates";
import { useCallback } from "react";
import { useEnvironment } from "./useEnvironment";

export type JsonUploader<S extends SerializableObject<S>> = (
    content: S,
) => Promise<string>;

export const useJSONUploader = <
    S extends SerializableObject<S>,
>(): JsonUploader<S> => {
    const environment = useEnvironment();
    const dataManagerJWT = useSelector<State, State["auth"]["dataManagerJWT"]>(
        (state) => state.auth.dataManagerJWT,
    );

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
            const response = await fetch(
                `${SERVICE_URLS[environment].dataManager}/data/s3/json`,
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
        [dataManagerJWT, environment],
    );

    return environment === "local" ? localUploader : remoteUploader;
};
