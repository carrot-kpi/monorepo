import React from "react";
import { TextMono } from "./TextMono";

const CardRow = ({ title, value }: { title: string; value: string }) => (
    <div className="flex items-center justify-between w-full text-white border-t border-gray-600">
        <TextMono color="white" size="sm" className="p-4 w-[40%]" caps>
            {title}
        </TextMono>
        <TextMono
            color="white"
            size="sm"
            className="text-right w-[60%] p-4 border-l border-gray-600"
            caps
        >
            {value}
        </TextMono>
    </div>
);

interface CampaignCardProps {
    title: string;
    question: string;
    rewards: string;
    timeLeft: string;
}

export const CampaignCard = ({
    title,
    question,
    rewards,
    timeLeft,
}: CampaignCardProps) => (
    <div className="bg-black min-w-[280px] rounded-2xl w-80 flex flex-col justify-between">
        <div className="h-full">
            <div className="flex items-center w-full border-b border-gray-600">
                <div className="flex items-center h-12 border-r border-gray-600">
                    <div className="w-6 h-6 mx-3 rounded-full bg-blue"></div>
                </div>
                <TextMono className="px-4" color="white" weight="medium" caps>
                    {title}
                </TextMono>
            </div>
            <div className="flex flex-col justify-between p-4 h-52">
                <TextMono color="white">{question}</TextMono>
                <div className="flex items-center space-x-3">
                    <button className="block p-1 font-mono text-xs text-white border border-white rounded-lg">
                        Template name
                    </button>
                    <button className="block p-1 font-mono text-xs text-white border border-white rounded-lg">
                        Gnosis Chain
                    </button>
                </div>
            </div>
        </div>
        <div>
            <CardRow title="Rewards" value={rewards} />
            <CardRow title="Time left" value={timeLeft} />
            <button className="w-full py-5 font-mono text-white border-t border-gray-600">
                ↳ VIEW CAMPAIGN
            </button>
        </div>
    </div>
);
