import FACTORY_ABI from '../abis/factory.json'
import KPI_TOKEN_ABI from '../abis/kpi-token.json'
import ORACLE_ABI from '../abis/oracle.json'
import KPI_TOKENS_MANAGER_ABI from '../abis/kpi-tokens-manager.json'
import ORACLES_MANAGER_ABI from '../abis/oracles-manager.json'
import { ChainId, POCKET_ID, INFURA_PROJECT_ID, Cacher } from '@carrot-kpi/core-sdk'

export const CACHER = new Cacher('carrot-v1-sdk')

export const RPC_URL: Record<ChainId, string> = {
  [ChainId.MAINNET]: `https://eth-mainnet.gateway.pokt.network/v1/lb/${POCKET_ID}`,
  [ChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
  [ChainId.GOERLI]: `https://eth-goerli.gateway.pokt.network/v1/lb/${POCKET_ID}`,
  [ChainId.GNOSIS]: `https://poa-xdai.gateway.pokt.network/v1/lb/${POCKET_ID}`,
}

export const FACTORY_ADDRESS: Record<ChainId, string> = {
  [ChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [ChainId.RINKEBY]: '0x3396099B67946F5c5e5EBd5F9674102bce91D051',
  [ChainId.GOERLI]: '0xfB3C168E7b761B8165a25227DB7fB8BfceF90756',
  [ChainId.GNOSIS]: '0x0000000000000000000000000000000000000000',
}

export const KPI_TOKENS_MANAGER_ADDRESS: Record<ChainId, string> = {
  [ChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [ChainId.RINKEBY]: '0x6006EDbA3716B9DE10f7EB90BAc96cB8a088aE6f',
  [ChainId.GOERLI]: '0x1E067451364b07034646cC03b8bF8e2851C7B84b',
  [ChainId.GNOSIS]: '0x0000000000000000000000000000000000000000',
}

export const ORACLES_MANAGER_ADDRESS: Record<ChainId, string> = {
  [ChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [ChainId.RINKEBY]: '0x9AEc467e6f23c2A91A0bD6AfA368E110c7356D4B',
  [ChainId.GOERLI]: '0x2F8e3C513aB9e75D9E2B8F4C683E2577c908a411',
  [ChainId.GNOSIS]: '0x0000000000000000000000000000000000000000',
}

export { FACTORY_ABI, KPI_TOKEN_ABI, ORACLE_ABI, KPI_TOKENS_MANAGER_ABI, ORACLES_MANAGER_ABI }
