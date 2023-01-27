import { Button, PlusSignPattern, Typography } from "@carrot-kpi/ui";
import React from "react";
import { GridPatternBg } from "../../../components/ui/grid-pattern-bg";
import { PageWrapper } from "../../../components/ui/page-wrapper";
import { TemplateCard } from "../../../components/ui/template-card";

export const Hero = () => (
    <div className="relative bg-orange">
        <GridPatternBg />
        <PageWrapper>
            <div className="relative pb-16 space-y-12 pt-7 md:py-24">
                <div className="grid gap-6 grid-area-hero md:gap-x-12 lg:items-start lg:flex-row">
                    <div className="grid-area-left">
                        <TemplateCard
                            used={10}
                            name="GENERIC ERC20 TEMPLATE"
                            description="This template allows you to create a generic erc-20 with conditional rules."
                            address="0xF71364a7939ff3312363a12daB7cd405cbD31659"
                            verified
                            version={1}
                        />
                    </div>
                    <div className="max-w-xl space-y-5 grid-area-top-right">
                        <Typography variant="h1">
                            ERC20 Generic Template
                        </Typography>
                        <div className="flex justify-between space-x-4 space-y-0 md:justify-start">
                            <Button variant="secondary" size="xsmall">
                                share
                            </Button>
                            <Button variant="secondary" size="xsmall">
                                report
                            </Button>
                        </div>
                    </div>
                    <div className="max-w-xl col-span-8 space-y-5 grid-area-right">
                        <Typography>
                            Come in, develop a Carrot template, upload it to
                            IPFS and submit it to the official registry.
                        </Typography>
                        <Button
                            variant="primary"
                            size="big"
                            className={{ root: "w-full lg:w-auto" }}
                        >
                            CREATE CAMPAIGN
                        </Button>
                    </div>
                </div>
            </div>
        </PageWrapper>
        <PlusSignPattern y="middle" x="left" />
        <PlusSignPattern y="middle" x="right" />
    </div>
);
