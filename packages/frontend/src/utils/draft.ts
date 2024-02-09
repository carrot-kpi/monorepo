export const sha256 = async (message: string) => {
    return Array.from(
        new Uint8Array(
            await crypto.subtle.digest(
                "SHA-256",
                new TextEncoder().encode(message),
            ),
        ),
    )
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
};

interface StateObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export const clearDraftState = (state: StateObject) => {
    const cleanedState: StateObject = {};

    for (const key in state) {
        if (typeof state[key] === "object") {
            cleanedState[key] = clearDraftState(state[key]);
        } else if (!!state[key] && state[key] !== "<p></p>") {
            cleanedState[key] = state[key];
        }
    }

    return cleanedState;
};
