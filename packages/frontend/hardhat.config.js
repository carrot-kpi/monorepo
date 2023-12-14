/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    forks: {
        [100]: {
            url: "https://rpc.gnosischain.com",
        },
    },
    networks: {
        hardhat: {
            forking: {
                url: "https://rpc.gnosischain.com",
            },
        },
    },
};
