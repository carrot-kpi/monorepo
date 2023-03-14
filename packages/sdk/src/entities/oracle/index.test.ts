import { Wallet } from "@ethersproject/wallet";
import { Oracle } from ".";
import { ChainId } from "../../commons";
import { Template, TemplateSpecification } from "../template";

describe("oracle", () => {
    let templateSpecification: TemplateSpecification;
    let template: Template;

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
    });

    test("instantiates correctly", () => {
        const address = Wallet.createRandom().address;
        const oracle = new Oracle(ChainId.SEPOLIA, address, template, false);
        expect(oracle.chainId).toBe(ChainId.SEPOLIA);
        expect(oracle.address).toEqual(address);
        expect(oracle.template).toBe(template);
        expect(oracle.finalized).toBeFalsy();
    });
});
