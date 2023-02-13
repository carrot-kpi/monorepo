import { Wallet } from "@ethersproject/wallet";
import { KPIToken, KPITokenSpecification } from ".";
import { ChainId } from "../../commons";
import { Oracle } from "../oracle";
import { Template, TemplateSpecification } from "../template";

describe("kpi token", () => {
    let templateSpecification: TemplateSpecification;
    let template: Template;
    let oracle: Oracle;
    let kpiTokenSpecification: KPITokenSpecification;

    beforeAll(() => {
        templateSpecification = new TemplateSpecification(
            "CID",
            "Name",
            "Template specification description",
            ["tag 1", "tag 2"],
            "Repository",
            "Commit hash"
        );
        template = new Template(
            0,
            Wallet.createRandom().address,
            1,
            templateSpecification
        );
        oracle = new Oracle(
            ChainId.GOERLI,
            Wallet.createRandom().address,
            template,
            false
        );
        kpiTokenSpecification = {
            ipfsHash: "IPFS hash",
            title: "Title",
            description: "Description",
            tags: ["tag 1", "tag 2"],
        };
    });

    test("instantiates correctly", () => {
        const kpiTokenAddress = Wallet.createRandom().address;
        const kpiToken = new KPIToken(
            ChainId.GOERLI,
            kpiTokenAddress,
            template,
            [oracle],
            kpiTokenSpecification,
            123456789,
            123456788,
            false
        );
        expect(kpiToken.chainId).toBe(ChainId.GOERLI);
        expect(kpiToken.address).toBe(kpiTokenAddress);
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

            const kpiToken = new KPIToken(
                ChainId.GOERLI,
                Wallet.createRandom().address,
                template,
                [oracle],
                kpiTokenSpecification,
                Math.floor(pastDate.getTime() / 1000),
                Math.floor(pastDate.getTime() / 1000) - 1,
                false
            );
            expect(kpiToken.expired).toBeTruthy();
        });

        test("returns false if the kpi token is not expired", () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 1);

            const kpiToken = new KPIToken(
                ChainId.GOERLI,
                Wallet.createRandom().address,
                template,
                [oracle],
                kpiTokenSpecification,
                Math.floor(futureDate.getTime() / 1000),
                Math.floor(futureDate.getTime() / 1000) - 1,
                false
            );
            expect(kpiToken.expired).toBeFalsy();
        });
    });
});
