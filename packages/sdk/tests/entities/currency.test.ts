import { describe, test, expect } from "vitest";
import { Currency } from "../../src/entities/currency";

describe("currency", () => {
    test("instantiates correctly", () => {
        const currency = new Currency("TSC", "Test currency", 18);
        expect(currency.symbol).toEqual("TSC");
        expect(currency.name).toEqual("Test currency");
        expect(currency.decimals).toBe(18);
    });
});
