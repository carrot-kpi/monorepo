use super::contracts::{
    factory::FactoryEvents, kpi_token::KPIToken, templates_manager::TemplatesManagerEvents,
};
use ethers::{
    abi::RawLog,
    contract::EthLogDecode,
    providers::{Provider, Ws},
    types::Log,
};
use eyre::{eyre, WrapErr};
use std::sync::Arc;

pub async fn handle_log(log: Log, provider: Arc<Provider<Ws>>) -> eyre::Result<String> {
    let raw_log = RawLog {
        topics: log.topics,
        data: log.data.to_vec(),
    };
    let cid_from_factory_event = match FactoryEvents::decode_log(&raw_log) {
        Ok(FactoryEvents::CreateTokenFilter(data)) => {
            let token = KPIToken::new(data.token, provider.clone());
            let description = token.description().call().await.wrap_err(format!(
                "could not get description cid for token {}",
                data.token
            ))?;
            Some(description)
        }
        _ => None,
    };
    let cid = match cid_from_factory_event {
        Some(cid) => Ok(cid),
        None => match TemplatesManagerEvents::decode_log(&raw_log) {
            Ok(TemplatesManagerEvents::AddTemplateFilter(data)) => Ok(data.specification),
            Ok(TemplatesManagerEvents::UpdateTemplateSpecificationFilter(data)) => {
                Ok(data.new_specification)
            }
            Ok(TemplatesManagerEvents::UpgradeTemplateFilter(data)) => Ok(data.new_specification),
            _ => Err(eyre!("could not decode event")),
        },
    }
    .wrap_err("an unexpected event was passed, bailing")?;

    // TODO: pin cid

    Ok(cid)
}
