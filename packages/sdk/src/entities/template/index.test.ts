import { Wallet } from "@ethersproject/wallet";
import { Template, TemplateSpecification } from ".";

describe("template", () => {
    describe("template specification", () => {
        test("instantiates correctly", () => {
            const templateSpecification = new TemplateSpecification(
                "CID",
                "Name",
                "Template specification description",
                ["tag 1", "tag 2"],
                "Repository",
                "Commit hash"
            );
            expect(templateSpecification.cid).toEqual("CID");
            expect(templateSpecification.name).toEqual("Name");
            expect(templateSpecification.description).toEqual(
                "Template specification description"
            );
            expect(templateSpecification.tags).toEqual(["tag 1", "tag 2"]);
            expect(templateSpecification.repository).toEqual("Repository");
            expect(templateSpecification.commitHash).toEqual("Commit hash");
        });
    });

    describe("template", () => {
        test("instantiates correctly", () => {
            const templateSpecification = new TemplateSpecification(
                "CID",
                "Name",
                "Template specification description",
                ["tag 1", "tag 2"],
                "Repository",
                "Commit hash"
            );
            const address = Wallet.createRandom().address;
            const template = new Template(0, address, 1, templateSpecification);
            expect(template.id).toBe(0);
            expect(template.address).toEqual(address);
            expect(template.version).toEqual(1);
            expect(template.specification).toBe(templateSpecification);
        });
    });
});
