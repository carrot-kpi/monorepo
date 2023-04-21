declare global {
    interface Window {
        fathom?: Fathom;
    }
}

export interface Fathom {
    siteId: string;
    blockTrackingForMe(): void;
    enableTrackingForMe(): void;
    setSite(siteId: string): void;
    trackGoal(goalId: string, data: number): void;
    trackPageview(params?: { url?: string; referref?: string }): void;
}
