import { Wallet } from "@ethersproject/wallet";
import { Oracle } from "../../src/entities/oracle.js";
import { ChainId } from "../../src/commons.js";
import {
    Template,
    TemplateSpecification,
} from "../../src/entities/template.js";

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
