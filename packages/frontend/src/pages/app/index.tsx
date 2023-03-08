import React, { useCallback, useEffect, useState } from "react";
import {
    Route,
    Routes,
    useLocation,
    matchPath,
    Location,
    useNavigate,
} from "react-router-dom";
import { Home } from "../home";
import { Page } from "../page";
import { Create } from "../create";
import { Campaigns } from "../campaigns";
import { CreateWithTemplateId } from "../create-with-template-id";
import { usePreviousDistinct } from "react-use";
import {
    useSetPreferDecentralization,
    useSetKPITokenTemplateBaseURL,
    useSetOracleTemplateBaseURL,
    useSetDevMode,
} from "@carrot-kpi/react";

const CREATE_ROUTE_PATH = { path: "/create/:templateId", key: "create" };
const PAGE_ROUTE_PATH = { path: "/campaigns/:address", key: "page" };

const MODAL_ROUTE_PATHS = [CREATE_ROUTE_PATH, PAGE_ROUTE_PATH];

const DEFAULT_LOCATION = {
    pathname: "/",
    state: undefined,
    key: "",
    search: "",
    hash: "",
};

interface AppProps {
    kpiTokenTemplateBaseURL?: string;
    oracleTemplateBaseURL?: string;
    templateId?: number;
}

export const App = ({
    kpiTokenTemplateBaseURL,
    oracleTemplateBaseURL,
    templateId,
}: AppProps) => {
    const location = useLocation();
    const previousLocation = usePreviousDistinct(location);
    const navigate = useNavigate();
    const setPreferDecentralization = useSetPreferDecentralization();
    const setDevMode = useSetDevMode();
    const setKPITokenTemplateBaseURL = useSetKPITokenTemplateBaseURL();
    const setOracleTemplateBaseURL = useSetOracleTemplateBaseURL();

    if (__PREVIEW_MODE__) setPreferDecentralization(true);
    setDevMode(__PREVIEW_MODE__);
    setKPITokenTemplateBaseURL(kpiTokenTemplateBaseURL);
    setOracleTemplateBaseURL(oracleTemplateBaseURL);

    const [modalLocation, setModalLocation] = useState<Location | undefined>();
    const [closingModalId, setClosingModalId] = useState("");
    const [mainLocation, setMainLocation] = useState(location);

    useEffect(() => {
        // detect modal opening and setup. If the previous distinct
        // location was not a modal route, and the current one is,
        // the previous location is set as the main route to prevent
        // the modal background from unmounting, while the new location
        // is set as the modals one in order to correctly mount the
        // component with animations etc etc.
        const openingModal = MODAL_ROUTE_PATHS.find(({ path }) =>
            matchPath({ path }, location.pathname)
        );
        if (openingModal) {
            // in case previous location is not there (for example when
            // coming in through an external link), set the homepage as
            // the main location
            document.documentElement.classList.add("overflow-hidden");

            const isPreviousLocationModal =
                previousLocation &&
                !!MODAL_ROUTE_PATHS.find(({ path }) =>
                    matchPath({ path }, previousLocation.pathname)
                );
            // if the previous location was a modal (i.e. if we're switching
            // through modals) set default location as main
            setMainLocation(
                isPreviousLocationModal
                    ? DEFAULT_LOCATION
                    : previousLocation || DEFAULT_LOCATION
            );
            setModalLocation(location);
            return;
        }

        // detect modal closing and teardown. If the previous distinct
        // location was a modal route, and the current one isn't, trigger
        // the modal close.
        let closingModalId = "";
        if (previousLocation && !!modalLocation) {
            for (let i = 0; i < MODAL_ROUTE_PATHS.length; i++) {
                const { path, key } = MODAL_ROUTE_PATHS[i];
                if (matchPath({ path }, previousLocation.pathname)) {
                    closingModalId = key;
                    break;
                }
            }
        }
        if (closingModalId) {
            setModalLocation(previousLocation);
            setClosingModalId(closingModalId);
            return;
        }

        // if not coming from a modal or going to one, scroll to top on
        // distinct main location changes
        if (!location.state?.navigatingAwayFromModal) setMainLocation(location);
    }, [location, mainLocation, modalLocation, previousLocation]);

    const handleAnimationEnd = useCallback(() => {
        document.documentElement.classList.remove("overflow-hidden");
        setClosingModalId("");
        setModalLocation(undefined);
        navigate(mainLocation, { state: { navigatingAwayFromModal: true } });
    }, [mainLocation, navigate]);

    return (
        <>
            <Routes location={mainLocation}>
                <Route path="/" element={<Home templateId={templateId} />} />
                <Route path="/create" element={<Create />} />
                <Route path="/campaigns" element={<Campaigns />} />
            </Routes>
            {modalLocation && (
                <Routes location={modalLocation}>
                    <Route
                        path={CREATE_ROUTE_PATH.path}
                        element={
                            <CreateWithTemplateId
                                closing={
                                    closingModalId === CREATE_ROUTE_PATH.key
                                }
                                onOutAnimationEnd={handleAnimationEnd}
                            />
                        }
                    />
                    <Route
                        path={PAGE_ROUTE_PATH.path}
                        element={
                            <Page
                                closing={closingModalId === PAGE_ROUTE_PATH.key}
                                onOutAnimationEnd={handleAnimationEnd}
                            />
                        }
                    />
                </Routes>
            )}
        </>
    );
};
