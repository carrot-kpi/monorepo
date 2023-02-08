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
    return (await response.json()).data as R;
};
