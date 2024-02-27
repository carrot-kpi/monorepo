import { describe, test, beforeAll, expect } from "vitest";
import { parseUnits } from "viem";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { ChainId } from "../../src/commons";
import { Token } from "../../src/entities/token";
import { Amount } from "../../src/entities/amount";
import { formatCurrencyAmount, formatDecimals } from "../../src/utils";

describe("formatting utilities", () => {
    let token: Token;

    beforeAll(() => {
        token = new Token(
            ChainId.Sepolia,
            privateKeyToAccount(generatePrivateKey()).address,
            18,
            "TST1",
            "Test token 1",
        );
    });

    describe("format currency", () => {
        describe("no symbol, no commify", () => {
            test("works with integer numbers < 1000", () => {
                const value = parseUnits("1", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: false,
                        commify: false,
                    }),
                ).toBe("1");
            });

            test("works with integer numbers >= 1000", () => {
                const value = parseUnits("1000", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: false,
                        commify: false,
                    }),
                ).toBe("1000");
            });

            test("works with decimal numbers < 1000", () => {
                const value = parseUnits("1.1", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: false,
                        commify: false,
                    }),
                ).toBe("1.1");
            });

            test("works with decimal numbers >= 1000", () => {
                const value = parseUnits("1000.1", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: false,
                        commify: false,
                    }),
                ).toBe("1000.1");
            });
        });

        describe("with symbol, no commify", () => {
            test("works with integer numbers < 1000", () => {
                const value = parseUnits("1", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: true,
                        commify: false,
                    }),
                ).toBe(`1 ${token.symbol}`);
            });

            test("works with integer numbers >= 1000", () => {
                const value = parseUnits("1000", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: true,
                        commify: false,
                    }),
                ).toBe(`1000 ${token.symbol}`);
            });

            test("works with decimal numbers < 1000", () => {
                const value = parseUnits("1.1", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: true,
                        commify: false,
                    }),
                ).toBe(`1.1 ${token.symbol}`);
            });

            test("works with decimal numbers >= 1000", () => {
                const value = parseUnits("1000.1", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: true,
                        commify: false,
                    }),
                ).toBe(`1000.1 ${token.symbol}`);
            });
        });

        describe("with symbol, with commify", () => {
            test("works with integer numbers < 1000", () => {
                const value = parseUnits("1", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: true,
                        commify: true,
                    }),
                ).toBe(`1 ${token.symbol}`);
            });

            test("works with integer numbers >= 1000", () => {
                const value = parseUnits("1000", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: true,
                        commify: true,
                    }),
                ).toBe(`1,000 ${token.symbol}`);
            });

            test("works with decimal numbers < 1000", () => {
                const value = parseUnits("1.1", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: true,
                        commify: true,
                    }),
                ).toBe(`1.1 ${token.symbol}`);
            });

            test("works with decimal numbers >= 1000", () => {
                const value = parseUnits("1000.1", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: true,
                        commify: true,
                    }),
                ).toBe(`1,000.1 ${token.symbol}`);
            });
        });

        describe("no symbol, with commify", () => {
            test("works with integer numbers < 1000", () => {
                const value = parseUnits("1", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: false,
                        commify: true,
                    }),
                ).toBe("1");
            });

            test("works with integer numbers >= 1000", () => {
                const value = parseUnits("1000", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: false,
                        commify: true,
                    }),
                ).toBe("1,000");
            });

            test("works with decimal numbers < 1000", () => {
                const value = parseUnits("1.1", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: false,
                        commify: true,
                    }),
                ).toBe("1.1");
            });

            test("works with decimal numbers >= 1000", () => {
                const value = parseUnits("1000.1", token.decimals);
                const amount = new Amount(token, value);
                expect(
                    formatCurrencyAmount({
                        amount,
                        withSymbol: false,
                        commify: true,
                    }),
                ).toBe("1,000.1");
            });
        });
    });

    describe("format decimals", () => {
        test("works with integer numbers in the billions", () => {
            expect(
                formatDecimals({
                    number: "10000000000",
                    decimalsAmount: 2,
                }),
            ).toBe("10,000,000,000");
        });
    });
});
