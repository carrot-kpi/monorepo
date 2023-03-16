export default [
    {
        inputs: [
            {
                internalType: "address",
                name: "_kpiTokensManager",
                type: "address",
            },
            {
                internalType: "address",
                name: "_oraclesManager",
                type: "address",
            },
            {
                internalType: "address",
                name: "_feeReceiver",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "InvalidIndices",
        type: "error",
    },
    {
        inputs: [],
        name: "ZeroAddressFeeReceiver",
        type: "error",
    },
    {
        inputs: [],
        name: "ZeroAddressKpiTokensManager",
        type: "error",
    },
    {
        inputs: [],
        name: "ZeroAddressOraclesManager",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "CreateToken",
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
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "feeReceiver",
                type: "address",
            },
        ],
        name: "SetFeeReceiver",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "kpiTokensManager",
                type: "address",
            },
        ],
        name: "SetKpiTokensManager",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "oraclesManager",
                type: "address",
            },
        ],
        name: "SetOraclesManager",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "allowOraclesCreation",
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
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "_description",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "_expiration",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_initializationData",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "_oraclesInitializationData",
                type: "bytes",
            },
        ],
        name: "createToken",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_fromIndex",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_toIndex",
                type: "uint256",
            },
        ],
        name: "enumerate",
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
        name: "feeReceiver",
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
        inputs: [],
        name: "kpiTokensAmount",
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
        name: "kpiTokensManager",
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
        inputs: [],
        name: "oraclesManager",
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
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_feeReceiver",
                type: "address",
            },
        ],
        name: "setFeeReceiver",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_kpiTokensManager",
                type: "address",
            },
        ],
        name: "setKpiTokensManager",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_oraclesManager",
                type: "address",
            },
        ],
        name: "setOraclesManager",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const;
