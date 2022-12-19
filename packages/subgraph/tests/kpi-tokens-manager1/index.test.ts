import {
    assert,
    describe,
    test,
    clearStore,
    afterAll,
    mockIpfsFile,
    createMockedFunction,
} from "matchstick-as/assembly/index";
import { BigInt, Address, ethereum } from "@graphprotocol/graph-ts";
import { Template } from "../../generated/schema";
import { handleAddTemplate } from "../../src/kpi-token-templates-manager1";
import { createAddTemplateEvent } from "./utils";
import { templateId } from "../../src/commons";

describe("KPI tokens manager", () => {
    afterAll(() => {
        clearStore();
    });

    test("Should handle add template events", () => {
        assert.entityCount("Template", 0);

        const id = BigInt.fromI32(1);
        const address = Address.fromString(
            "0x0000000000000000000000000000000000000001"
        );
        const specification = "test-cid";
        mockIpfsFile(
            specification.concat("/base.json"),
            "tests/mocks/template-specification.json"
        );
        createMockedFunction(
            Address.fromString("0xA16081F360e3847006dB660bae1c6d1b2e17eC2A"),
            "owner",
            "owner():(address)"
        ).returns([
            ethereum.Value.fromAddress(
                Address.fromString("0x90cBa2Bbb19ecc291A12066Fd8329D65FA1f1947")
            ),
        ]);
        const newAddTemplateEvent = createAddTemplateEvent(
            id,
            address,
            specification
        );
        handleAddTemplate(newAddTemplateEvent);

        const template = Template.load(templateId(id, BigInt.fromU32(1)));
        if (template === null) throw new Error("unexpected null");
        assert.stringEquals(template.name, "Test name");
        assert.stringEquals(template.description, "Test description");
        assert.bigIntEquals(
            BigInt.fromU32(template.tags.length),
            BigInt.fromU32(1)
        );
        assert.stringEquals(template.tags[0], "Test tag");
        assert.stringEquals(template.repository, "Test repository");
        assert.stringEquals(template.commitHash, "Test commit hash");
    });
});
