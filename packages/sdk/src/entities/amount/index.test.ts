import { describe, test } from "@jest/globals";
import { BigNumber, utils, Wallet } from "ethers";
import { ChainId } from "../../commons";
import { Token } from "../token";
import { Amount } from "./";

describe("token amount", () => {
    let token1: Token, token2: Token;

    beforeAll(() => {
        token1 = new Token(
            ChainId.GOERLI,
            Wallet.createRandom().address,
            18,
            "TST1",
            "Test token 1"
        );
        token2 = new Token(
            ChainId.GOERLI,
            Wallet.createRandom().address,
            6,
            "TST2",
            "Test token 2"
        );
    });

    test("instantiates correctly", () => {
        const value = BigNumber.from("1");
        const amount = new Amount(token1, value);
        expect(amount.currency).toBe(token1);
        expect(amount.raw).toBe(value);
    });

    describe("sum", () => {
        test("throws when summing amounts from different tokens", () => {
            const amount1 = new Amount(token1, BigNumber.from("1"));
            const amount2 = new Amount(token2, BigNumber.from("2"));
            expect(() => {
                amount1.plus(amount2);
            }).toThrow("tried to sum different currencies");
        });

        test("sums correctly when tokens are the same", () => {
            const amount1 = new Amount(token1, BigNumber.from("1"));
            const amount2 = new Amount(token1, BigNumber.from("2"));
            const result = amount1.plus(amount2);
            expect(result.currency).toBe(token1);
            expect(result.raw).toEqual(amount1.raw.add(amount2.raw));
        });
    });

    describe("subtraction", () => {
        test("throws when subtracting amounts from different tokens", () => {
            const amount1 = new Amount(token1, BigNumber.from("2"));
            const amount2 = new Amount(token2, BigNumber.from("1"));
            expect(() => {
                amount1.minus(amount2);
            }).toThrow("tried to subtract different currencies");
        });

        test("throws when subtraction results in a negative amount", () => {
            const amount1 = new Amount(token1, BigNumber.from("1"));
            const amount2 = new Amount(token1, BigNumber.from("2"));
            expect(() => {
                amount1.minus(amount2);
            }).toThrow("subtraction results in a negative amount");
        });

        test("subtracts correctly when tokens are the same and the operation results in a positive amount", () => {
            const amount1 = new Amount(token1, BigNumber.from("2"));
            const amount2 = new Amount(token1, BigNumber.from("1"));
            const result = amount1.minus(amount2);
            expect(result.currency).toBe(token1);
            expect(result.raw).toEqual(amount1.raw.sub(amount2.raw));
        });
    });

    describe("multiplication", () => {
        test("correctly handles multiplying amounts from different tokens (case 1)", () => {
            const value1 = BigNumber.from("2");
            const value2 = BigNumber.from("1");
            const amount1 = new Amount(token1, value1);
            const amount2 = new Amount(token2, value2);
            const result = amount1.multiply(amount2);
            expect(result.currency).toBe(token2);
            expect(result.raw).toEqual(BigNumber.from("0"));
        });

        test("correctly handles multiplying amounts from different tokens (case 2)", () => {
            const value1 = utils.parseUnits("100", token2.decimals);
            const value2 = utils.parseUnits("10", token1.decimals);
            const amount1 = new Amount(token2, value1);
            const amount2 = new Amount(token1, value2);
            const result = amount1.multiply(amount2);
            expect(result.currency).toBe(token1);
            expect(result.raw).toEqual(
                BigNumber.from(
                    amount1
                        .times(amount2)
                        .times(`1e${token1.decimals}`)
                        .toFixed(0)
                )
            );
        });

        test("correctly handles multiplying amounts from different tokens (case 3)", () => {
            const value1 = utils.parseUnits("10", token1.decimals);
            const value2 = utils.parseUnits("100", token2.decimals);
            const amount1 = new Amount(token1, value1);
            const amount2 = new Amount(token2, value2);
            const result = amount1.multiply(amount2);
            expect(result.currency).toBe(token2);
            expect(result.raw).toEqual(
                BigNumber.from(
                    amount1
                        .times(amount2)
                        .times(`1e${token2.decimals}`)
                        .toFixed(0)
                )
            );
        });
    });

    describe("division", () => {
        test("correctly handles dividing amounts from different tokens (case 1)", () => {
            const value1 = BigNumber.from("2");
            const value2 = BigNumber.from("1");
            const amount1 = new Amount(token1, value1);
            const amount2 = new Amount(token2, value2);
            const result = amount1.divide(amount2);
            expect(result.currency).toBe(token2);
            expect(result.raw).toEqual(BigNumber.from("0"));
        });

        test("correctly handles dividing amounts from different tokens (case 2)", () => {
            const value1 = utils.parseUnits("100", token2.decimals);
            const value2 = utils.parseUnits("10", token1.decimals);
            const amount1 = new Amount(token2, value1);
            const amount2 = new Amount(token1, value2);
            const result = amount1.divide(amount2);
            expect(result.currency).toBe(token1);
            expect(result.raw).toEqual(
                BigNumber.from(
                    amount1
                        .dividedBy(amount2)
                        .times(`1e${token1.decimals}`)
                        .toFixed(0)
                )
            );
        });

        test("correctly handles dividing amounts from different tokens (case 3)", () => {
            const value1 = utils.parseUnits("10", token1.decimals);
            const value2 = utils.parseUnits("100", token2.decimals);
            const amount1 = new Amount(token1, value1);
            const amount2 = new Amount(token2, value2);
            const result = amount1.divide(amount2);
            expect(result.currency).toBe(token2);
            expect(result.raw).toEqual(
                BigNumber.from(
                    amount1
                        .dividedBy(amount2)
                        .times(`1e${token2.decimals}`)
                        .toFixed(0)
                )
            );
        });
    });
});
