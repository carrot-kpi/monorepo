interface GetSiteEventsResponse {
    object: string;
    url: string;
    has_more: boolean;
    data: SiteEvent[];
}

export interface SiteEvent {
    id: string;
    object: "event";
    name: string;
    currency: string | null;
    created_at: string;
}

export class FathomClient {
    constructor(
        private readonly siteId: string,
        private readonly authToken: string
    ) {}

    async getSiteEvents() {
        let siteEvents: SiteEvent[] = [];
        let startingAfter = "";

        do {
            const response = await fetch(
                `https://api.usefathom.com/v1/sites/${this.siteId}/events?limit=100&starting_after=${startingAfter}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.authToken}`,
                    },
                }
            );

            const responseJson =
                (await response.json()) as GetSiteEventsResponse;

            if (responseJson.has_more)
                startingAfter =
                    responseJson.data[responseJson.data.length - 1].id;
            else startingAfter = "";

            siteEvents = [...siteEvents, ...responseJson.data];
        } while (!!startingAfter);

        return siteEvents;
    }

    async postSiteEvents(events: string[]) {
        return await Promise.all(
            events.map(async (event) => {
                const response = await fetch(
                    `https://api.usefathom.com/v1/sites/${this.siteId}/events`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.authToken}`,
                        },
                        body: JSON.stringify({
                            name: event,
                        }),
                    }
                );

                const jsonResponse = (await response.json()) as SiteEvent;
                return jsonResponse;
            })
        );
    }
}
