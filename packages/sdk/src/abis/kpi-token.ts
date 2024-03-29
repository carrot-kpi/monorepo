export default [
    {
        anonymous: false,
        inputs: [],
        name: "Finalize",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "creator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "creationTimestamp",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "templateId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint128",
                name: "templateVersion",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "string",
                name: "description",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "expiration",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address[]",
                name: "oracles",
                type: "address[]",
            },
        ],
        name: "Initialize",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [],
        name: "creationTimestamp",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "data",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "description",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "expiration",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_result",
                type: "uint256",
            },
        ],
        name: "finalize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "finalized",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "creator",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "oraclesManager",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "kpiTokensManager",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "feeReceiver",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "kpiTokenTemplateId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint128",
                        name: "kpiTokenTemplateVersion",
                        type: "uint128",
                    },
                    {
                        internalType: "string",
                        name: "description",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "expiration",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes",
                        name: "kpiTokenData",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "oraclesData",
                        type: "bytes",
                    },
                ],
                internalType: "struct InitializeKPITokenParams",
                name: "_params",
                type: "tuple",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "oracles",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "redeem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "template",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "addrezz",
                        type: "address",
                    },
                    {
                        internalType: "uint128",
                        name: "version",
                        type: "uint128",
                    },
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "specification",
                        type: "string",
                    },
                ],
                internalType: "struct Template",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const;
