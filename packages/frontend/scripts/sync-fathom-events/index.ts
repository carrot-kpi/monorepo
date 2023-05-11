import { writeFile } from "fs/promises";
import { FathomClient } from "./fathom-client";
import { generateEventsCode } from "./generate-events-code";

const TX_FATHOM_EVENTS = [
    "TX_CUSTOM",
    "TX_ERC20_APPROVAL",
    "TX_KPI_TOKEN_CREATION",
    "TX_KPI_TOKEN_REDEMPTION",
    "TX_ORACLE_FINALIZATION",
];

// any new Fathom event must be included in this array; this array acts
// as the single source of events for Fathom (event deletion should be handled manually
// both from the array and on Fathom dashboard)
const FATHOM_EVENTS = [...TX_FATHOM_EVENTS];

/**
 * Syncronize the local events with the Fathom remote site by creating any new
 * events existing in the local array but missing on the remote, and by generating any new
 * events on Fathom but missing locally.
 *
 * @param siteId Site id of Fathom
 * @param authToken Authorization token of Fathom API
 */
const syncFathomEvents = async (siteId?: string, authToken?: string) => {
    try {
        if (!siteId || !authToken) {
            throw new Error("missing siteId or authToken");
        }

        const fathomClient = new FathomClient(siteId, authToken);

        const fathomSiteEvents = await fathomClient.getSiteEvents();
        const eventNamesToCreate = FATHOM_EVENTS.filter(
            (eventName) =>
                !fathomSiteEvents.find(
                    (siteEvent) => siteEvent.name === eventName
                )
        );
        const newSiteEvents = await fathomClient.postSiteEvents(
            eventNamesToCreate
        );

        const syncedEvents = [...fathomSiteEvents, ...newSiteEvents];
        await writeFile(
            `${__dirname}/../../src/analytics/fathom/generated.ts`,
            generateEventsCode({
                siteId,
                events: syncedEvents,
                timestamp: new Date().getTime(),
            })
        );

        console.log(`fathom sync ok`);
        console.table({
            created: newSiteEvents.length,
            synced: fathomSiteEvents.length,
        });
    } catch (error) {
        console.error("fathom events sync ko", error);
        process.exit(1);
    }
};

syncFathomEvents(
    process.env.REACT_APP_FATHOM_SITE_ID,
    process.env.REACT_APP_FATHOM_API_KEY
);
