use std::collections::HashMap;

use ethers::types::Address;
use lazy_static::lazy_static;

use crate::utils::get_address_from_str;

#[derive(Hash, Eq, PartialEq)]
pub enum SupportedChainId {
    Sepolia = 11155111,
    Goerli = 5,
}

impl TryFrom<u32> for SupportedChainId {
    type Error = eyre::Report;

    fn try_from(value: u32) -> Result<Self, Self::Error> {
        match value {
            11155111 => Ok(SupportedChainId::Sepolia),
            5 => Ok(SupportedChainId::Goerli),
            _ => Err(eyre::eyre!(format!(
                "cannot convert {} to supported chain id",
                value
            ))),
        }
    }
}

pub struct ContractInfo {
    pub address: Address,
    pub deployment_block: u32,
}

lazy_static! {
    pub static ref FACTORY_INFO: HashMap<SupportedChainId, ContractInfo> = {
        let mut factory_info = HashMap::new();

        factory_info.insert(
            SupportedChainId::Sepolia,
            ContractInfo {
                address: get_address_from_str(
                    "0xD3Fe5d463dD1fd943CCC2271F2ea980B898B5DA3",
                    Some("could not get sepolia factory address"),
                ),
                deployment_block: 2_211_875,
            },
        );
        factory_info.insert(
            SupportedChainId::Goerli,
            ContractInfo {
                address: get_address_from_str(
                    "0x59429Bcc86FF13f9B66Af412Ff62dD2c9eF8e607",
                    Some("could not get goerli factory address"),
                ),
                deployment_block: 7_669_575,
            },
        );

        factory_info
    };
    pub static ref KPI_TOKENS_MANAGER_INFO: HashMap<SupportedChainId, ContractInfo> = {
        let mut kpi_tokens_manager_info = HashMap::new();

        kpi_tokens_manager_info.insert(
            SupportedChainId::Sepolia,
            ContractInfo {
                address: get_address_from_str(
                    "0xD6e88c910329fE3597498772eB94991a0630306d",
                    Some("could not get sepolia kpi tokens manager address"),
                ),
                deployment_block: 2_211_875,
            },
        );
        kpi_tokens_manager_info.insert(
            SupportedChainId::Goerli,
            ContractInfo {
                address: get_address_from_str(
                    "0x9bED1f20E296c186e287Bf3e443581e9F252aA75",
                    Some("could not get goerli kpi tokens manager address"),
                ),
                deployment_block: 7_669_575,
            },
        );

        kpi_tokens_manager_info
    };
    pub static ref ORACLES_MANAGER_INFO: HashMap<SupportedChainId, ContractInfo> = {
        let mut oracles_manager_info = HashMap::new();

        oracles_manager_info.insert(
            SupportedChainId::Sepolia,
            ContractInfo {
                address: get_address_from_str(
                    "0xe3dA4E4b76C4ed3e4227db20F20d1F25A4507f9b",
                    Some("could not get sepolia oracles manager address"),
                ),
                deployment_block: 2_211_875,
            },
        );
        oracles_manager_info.insert(
            SupportedChainId::Goerli,
            ContractInfo {
                address: get_address_from_str(
                    "0x839903e7829635dB2ba5E3F6355FD341F9Eec436",
                    Some("could not get goerli oracles manager address"),
                ),
                deployment_block: 7_669_575,
            },
        );

        oracles_manager_info
    };
}
