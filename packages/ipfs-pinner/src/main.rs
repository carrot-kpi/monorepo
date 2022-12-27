mod commons;
mod contracts;
mod handler;
mod scanner;
mod telemetry;
mod utils;

use contracts::{
    factory::{CreateTokenFilter, Factory},
    templates_manager::{
        AddTemplateFilter, UpdateTemplateSpecificationFilter, UpgradeTemplateFilter,
    },
};
use ethers::{
    contract::EthEvent,
    providers::{Middleware, Provider, StreamExt, Ws},
    types::Filter,
};
use eyre::{eyre, WrapErr};
use handler::handle_log;
use std::{env, sync::Arc};

use crate::{
    commons::{SupportedChainId, FACTORY_INFO, KPI_TOKENS_MANAGER_INFO, ORACLES_MANAGER_INFO},
    telemetry::{get_subscriber, init_subscriber},
};

// TODO: maybe directly add TheGraph's node as a peer
#[tokio::main]
async fn main() -> eyre::Result<()> {
    let ws_rpc_endpoint = env::var("WS_RPC_ENDPOINT").wrap_err("no websocket rpc endpoint")?;
    let ipfs_api_endpoint = env::var("IPFS_API_ENDPOINT").wrap_err("no ipfs api endpoint")?;

    let provider = Arc::new(
        Provider::<Ws>::connect(ws_rpc_endpoint)
            .await
            .wrap_err("could not get ws provider")?,
    );

    let chain_id = provider
        .get_chainid()
        .await
        .wrap_err("could not get chain id")?;

    let supported_chain =
        SupportedChainId::try_from(chain_id.as_u32()).wrap_err("unsupported chain id")?;

    let block_number = provider
        .get_block_number()
        .await
        .wrap_err("could not get current block number")?;

    let factory_info = FACTORY_INFO
        .get(&supported_chain)
        .ok_or_else(|| eyre!("unsupported chain id"))?;
    let kpi_tokens_manager_info = KPI_TOKENS_MANAGER_INFO
        .get(&supported_chain)
        .ok_or_else(|| eyre!("unsupported chain id"))?;
    let oracles_manager_info = ORACLES_MANAGER_INFO
        .get(&supported_chain)
        .ok_or_else(|| eyre!("unsupported chain id"))?;

    // initialize tracing
    init_subscriber(get_subscriber("info".into()));
    tracing::info!("pinning by listening on chain id {}", chain_id);

    tokio::spawn(scanner::scan_past_blocks(
        factory_info,
        kpi_tokens_manager_info,
        oracles_manager_info,
        block_number.as_u32(),
        provider.clone(),
    ));

    let filter = Filter::new()
        .address(vec![
            factory_info.address,
            kpi_tokens_manager_info.address,
            oracles_manager_info.address,
        ])
        .events(vec![
            CreateTokenFilter::abi_signature().into_owned(),
            AddTemplateFilter::abi_signature().into_owned(),
            UpdateTemplateSpecificationFilter::abi_signature().into_owned(),
            UpgradeTemplateFilter::abi_signature().into_owned(),
        ]);
    let mut stream = provider
        .subscribe_logs(&filter)
        .await
        .wrap_err("could not watch for logs")?;
    loop {
        if let Some(log) = stream.next().await {
            tracing::info!("ASDASDASD");
            let block_number = log.block_number;
            match handle_log(log, provider.clone()).await {
                Ok(pinned_cid) => {
                    tracing::info!("{} - pinned cid: {}", block_number.unwrap(), pinned_cid);
                }
                Err(error) => tracing::error!("{}", error),
            }
        }
    }
}
