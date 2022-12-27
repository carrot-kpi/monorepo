use std::sync::Arc;

use ethers::{
    contract::EthEvent,
    providers::{Middleware, Provider, Ws},
    types::Filter,
};

use crate::{
    commons::ContractInfo,
    contracts::{
        factory::CreateTokenFilter,
        templates_manager::{
            AddTemplateFilter, UpdateTemplateSpecificationFilter, UpgradeTemplateFilter,
        },
    },
    handler::handle_log,
};

// blocks that are scanned per request
const CHUNK_SIZE: u32 = 10_000;

pub async fn scan_past_blocks(
    factory_info: &ContractInfo,
    kpi_tokens_manager_info: &ContractInfo,
    oracles_manager_info: &ContractInfo,
    until_block: u32,
    provider: Arc<Provider<Ws>>,
) {
    let mut from_block = factory_info.deployment_block;
    let full_range = until_block - from_block;
    tracing::info!("pinning from {} past blocks", until_block - from_block);
    loop {
        let to_block = if from_block + CHUNK_SIZE > until_block {
            until_block
        } else {
            from_block + CHUNK_SIZE
        };
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
            ])
            .from_block(from_block)
            .to_block(to_block);
        let logs = match provider.get_logs(&filter).await {
            Ok(logs) => logs,
            Err(error) => {
                tracing::warn!(
                    "error fetching logs from block {} to {}: {}",
                    from_block,
                    to_block,
                    error
                );
                continue;
            }
        };
        let mut pinned_cids = vec![];
        for log in logs.into_iter() {
            match handle_log(log, provider.clone()).await {
                Ok(pinned_cid) => pinned_cids.push(pinned_cid),
                Err(error) => tracing::error!("{}", error),
            }
        }
        tracing::info!(
            "{} -> {} - {} cids pinned - {}%",
            from_block,
            to_block,
            pinned_cids.len(),
            ((to_block as f32 - factory_info.deployment_block as f32) / full_range as f32) * 100f32
        );
        if to_block == until_block {
            break;
        }
        from_block = to_block + 1;
    }
}
