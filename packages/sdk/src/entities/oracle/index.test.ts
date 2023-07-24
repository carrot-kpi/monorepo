import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { ResolvedOracle } from ".";
import { ChainId } from "../../commons";
import { ResolvedTemplate, TemplateSpecification } from "../template";

describe("oracle", () => {
    let templateSpecification: TemplateSpecification;
    let template: ResolvedTemplate;

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
    });

    test("instantiates correctly", () => {
        const address = privateKeyToAccount(generatePrivateKey()).address;
        const oracle = new ResolvedOracle(
            ChainId.SEPOLIA,
            address,
            template,
            false,
        );
        expect(oracle.chainId).toBe(ChainId.SEPOLIA);
        expect(oracle.address).toEqual(address);
        expect(oracle.template).toBe(template);
        expect(oracle.finalized).toBeFalsy();
    });
});
