import React from "react";
import { correctColor } from "../../campaign-card/utils";

export const VerifiedIcon = ({ color = "black" }: { color?: string }) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M9.99996 18.3333C10.9713 18.3333 11.8132 17.7794 12.2271 16.9702C12.4142 16.6043 12.9628 16.3771 13.3538 16.5035C14.2186 16.783 15.2057 16.5794 15.8925 15.8925C16.5793 15.2057 16.783 14.2187 16.5035 13.3538C16.3771 12.9628 16.6043 12.4142 16.9702 12.2271C17.7794 11.8132 18.3333 10.9713 18.3333 9.99996C18.3333 9.02865 17.7794 8.18671 16.9702 7.77282C16.6043 7.58569 16.3771 7.03713 16.5035 6.64612C16.783 5.78127 16.5794 4.79423 15.8925 4.10741C15.2057 3.42058 14.2187 3.21693 13.3538 3.49646C12.9628 3.62283 12.4142 3.3956 12.2271 3.02975C11.8132 2.22056 10.9713 1.66663 9.99996 1.66663C9.02865 1.66663 8.18671 2.22056 7.77282 3.02975C7.58569 3.39559 7.03713 3.62281 6.64612 3.49644C5.78127 3.21691 4.79423 3.42056 4.10741 4.10739C3.42058 4.79421 3.21693 5.78124 3.49646 6.64609C3.62283 7.03711 3.3956 7.58569 3.02975 7.77281C2.22056 8.18671 1.66663 9.02864 1.66663 9.99996C1.66663 10.9713 2.22056 11.8132 3.02975 12.2271C3.39559 12.4142 3.62281 12.9628 3.49644 13.3538C3.21691 14.2186 3.42056 15.2057 4.10739 15.8925C4.79421 16.5793 5.78124 16.783 6.64609 16.5035C7.0371 16.3771 7.58569 16.6043 7.77281 16.9702C8.1867 17.7794 9.02864 18.3333 9.99996 18.3333Z"
            fill={color}
            stroke={color}
            strokeLinecap="round"
        />
        <path
            d="M6.66663 10.4166L8.74996 12.5L13.3333 7.91663"
            stroke={correctColor(color)}
            strokeLinecap="round"
        />
    </svg>
);
