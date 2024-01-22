import { useSelector, type State } from "@carrot-kpi/shared-state";
import { Service, getServiceURL } from "@carrot-kpi/sdk/utils/services";
import { useDevMode } from "./useDevMode";
import { useStagingMode } from "./useStagingMode";
import type { SerializableObject } from "../types/templates";
import { useCallback } from "react";

export type JsonUploader<S extends SerializableObject<S>> = (
    content: S,
) => Promise<string>;

export const useJSONUploader = <
    S extends SerializableObject<S>,
>(): JsonUploader<S> => {
    const devMode = useDevMode();
    const stagingMode = useStagingMode();
    const dataUploaderJWT = useSelector<
        State,
        State["auth"]["dataUploaderJWT"]
    >((state) => state.auth.dataUploaderJWT);

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
                `${getServiceURL(
                    Service.DATA_UPLOADER,
                    !devMode && !stagingMode,
                )}/data/json/s3`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${dataUploaderJWT}`,
                    },
                    body: JSON.stringify({
                        data: JSON.stringify(data),
                    }),
                },
            );
            if (!response.ok)
                throw new Error(
                    `could not upload content to ipfs, request failed with status ${response.status}`,
                );
            const { cid } = (await response.json()) as { cid: string };
            return cid;
        },
        [dataUploaderJWT, devMode, stagingMode],
    );

    return devMode ? localUploader : remoteUploader;
};
