import { describe, test, beforeAll, expect } from "vitest";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import {
    type FullKPITokenSpecification,
    ResolvedKPIToken,
} from "../../src/entities/kpi-token";
import { ChainId } from "../../src/commons";
import { ResolvedOracle } from "../../src/entities/oracle";
import {
    ResolvedTemplate,
    TemplateSpecification,
} from "../../src/entities/template";

describe("kpi token", () => {
    let templateSpecification: TemplateSpecification;
    let template: ResolvedTemplate;
    let oracle: ResolvedOracle;
    let kpiTokenSpecification: FullKPITokenSpecification;

    beforeAll(() => {
        templateSpecification = new TemplateSpecification(
            "CID",
            "Name",
            "Template specification description",
            ["tag 1", "tag 2"],
            "Repository",
            "Commit hash",
            "https://staging-url.com",
        );
        template = new ResolvedTemplate(
            0,
            privateKeyToAccount(generatePrivateKey()).address,
            1,
            templateSpecification,
        );
        oracle = new ResolvedOracle(
            ChainId.Sepolia,
            privateKeyToAccount(generatePrivateKey()).address,
            template,
            false,
        );
        kpiTokenSpecification = {
            ipfsHash: "IPFS hash",
            title: "Title",
            description: "Description",
            tags: ["tag 1", "tag 2"],
        };
    });

    test("instantiates correctly", () => {
        const kpiTokenAddress =
            privateKeyToAccount(generatePrivateKey()).address;
        const kpiTokenOwner = privateKeyToAccount(generatePrivateKey()).address;
        const kpiToken = new ResolvedKPIToken(
            ChainId.Sepolia,
            kpiTokenAddress,
            kpiTokenOwner,
            template,
            [oracle],
            kpiTokenSpecification,
            123456789,
            123456788,
            false,
        );
        expect(kpiToken.chainId).toBe(ChainId.Sepolia);
        expect(kpiToken.address).toBe(kpiTokenAddress);
        expect(kpiToken.owner).toBe(kpiTokenOwner);
        expect(kpiToken.template).toBe(template);
        expect(kpiToken.oracles).toEqual([oracle]);
        expect(kpiToken.specification).toBe(kpiTokenSpecification);
        expect(kpiToken.expiration).toBe(123456789);
        expect(kpiToken.finalized).toBeFalsy();
    });

    describe("expired", () => {
        test("returns true if the kpi token is expired", () => {
            const pastDate = new Date();
            pastDate.setDate(-2);

            const kpiToken = new ResolvedKPIToken(
                ChainId.Sepolia,
                privateKeyToAccount(generatePrivateKey()).address,
                privateKeyToAccount(generatePrivateKey()).address,
                template,
                [oracle],
                kpiTokenSpecification,
                Math.floor(pastDate.getTime() / 1000),
                Math.floor(pastDate.getTime() / 1000) - 1,
                false,
            );
            expect(kpiToken.expired).toBeTruthy();
        });

        test("returns false if the kpi token is not expired", () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 1);

            const kpiToken = new ResolvedKPIToken(
                ChainId.Sepolia,
                privateKeyToAccount(generatePrivateKey()).address,
                privateKeyToAccount(generatePrivateKey()).address,
                template,
                [oracle],
                kpiTokenSpecification,
                Math.floor(futureDate.getTime() / 1000),
                Math.floor(futureDate.getTime() / 1000) - 1,
                false,
            );
            expect(kpiToken.expired).toBeFalsy();
        });
    });
});
