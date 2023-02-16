interface SubgraphError {
    message?: string;
}

export const query = async <R>(
    url: string,
    query: string,
    variables: { [key: string]: unknown }
) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });
    if (!response.ok) {
        throw new Error(
            `response not ok while executing subgraph query: ${await response.text()}`
        );
    }
    const responseJSON = await response.json();
    if (!!responseJSON.errors) {
        const errors = responseJSON.errors as SubgraphError[];
        throw new Error(
            `error returned from subgraph:\n${errors
                .filter((error) => !!error && !!error.message)
                .map((error) => `- ${error.message}`)
                .join("\n")}`
        );
    }
    return responseJSON.data as R;
};
