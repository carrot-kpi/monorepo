import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { currencyEquals, Token } from ".";
import { ChainId } from "../../commons";
import { Currency } from "../currency";

describe("token", () => {
    test("instantiates correctly", () => {
        const address = privateKeyToAccount(generatePrivateKey()).address;
        const token = new Token(
            ChainId.SEPOLIA,
            address,
            18,
            "TST",
            "Test token"
        );
        expect(token.chainId).toBe(ChainId.SEPOLIA);
        expect(token.address).toBe(address);
        expect(token.decimals).toBe(18);
        expect(token.symbol).toBe("TST");
        expect(token.name).toBe("Test token");
    });

    describe("equals", () => {
        test("returns true if tokens are the same instance", () => {
            const token = new Token(
                ChainId.SEPOLIA,
                privateKeyToAccount(generatePrivateKey()).address,
                18,
                "TST",
                "Test token"
            );
            expect(token.equals(token)).toBeTruthy();
        });

        test("returns true if tokens have the same chain id and address", () => {
            const address = privateKeyToAccount(generatePrivateKey()).address;
            const token1 = new Token(
                ChainId.SEPOLIA,
                address,
                18,
                "TST1",
                "Test token 1"
            );
            const token2 = new Token(
                ChainId.SEPOLIA,
                address,
                18,
                "TST2",
                "Test token 2"
            );
            expect(token1.equals(token2)).toBeTruthy();
        });
    });

    describe("currencyEquals", () => {
        test("returns true if currencies are both tokens and equal", () => {
            const token = new Token(
                ChainId.SEPOLIA,
                privateKeyToAccount(generatePrivateKey()).address,
                18,
                "TST",
                "Test token"
            );
            expect(currencyEquals(token, token)).toBeTruthy();
        });

        test("returns false if only currency A is a Token", () => {
            const currency = new Currency("TCUR", "Test currency", 18);
            const token = new Token(
                ChainId.SEPOLIA,
                privateKeyToAccount(generatePrivateKey()).address,
                18,
                "TST",
                "Test token"
            );
            expect(currencyEquals(token, currency)).toBeFalsy();
        });

        test("returns false if currency B is a Token", () => {
            const currency = new Currency("TCUR", "Test currency", 18);
            const token = new Token(
                ChainId.SEPOLIA,
                privateKeyToAccount(generatePrivateKey()).address,
                18,
                "TST",
                "Test token"
            );
            expect(currencyEquals(currency, token)).toBeFalsy();
        });

        test("returns true if currencies are the same instance", () => {
            const currency = new Currency("TCUR", "Test currency", 18);
            expect(currencyEquals(currency, currency)).toBeTruthy();
        });
    });
});
