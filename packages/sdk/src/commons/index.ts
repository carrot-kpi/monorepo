import FACTORY_ABI from '../abis/factory.json'
import KPI_TOKEN_ABI from '../abis/kpi-token.json'
import ORACLE_ABI from '../abis/oracle.json'
import KPI_TOKENS_MANAGER_ABI from '../abis/kpi-tokens-manager.json'
import ORACLES_MANAGER_ABI from '../abis/oracles-manager.json'
import MULTICALL_ABI from '../abis/multicall.json'
import ERC20_ABI from '../abis/erc20.json'
import { Cacher } from '../cacher'

export enum ChainId {
  GOERLI = 5,
}

export const INFURA_PROJECT_ID = '0ebf4dd05d6740f482938b8a80860d13'
export const POCKET_ID = '61d8970ca065f5003a112e86'
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs/'

export const CACHER = new Cacher('carrot-sdk')

interface ChainAddresses {
  multicall: string
  factory: string
  kpiTokensManager: string
  oraclesManager: string
}

export const CHAIN_ADDRESSES: Record<ChainId, ChainAddresses> = {
  [ChainId.GOERLI]: {
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11',
    factory: '0x59429Bcc86FF13f9B66Af412Ff62dD2c9eF8e607',
    kpiTokensManager: '0x9bED1f20E296c186e287Bf3e443581e9F252aA75',
    oraclesManager: '0x839903e7829635dB2ba5E3F6355FD341F9Eec436',
  },
}

export {
  FACTORY_ABI,
  KPI_TOKEN_ABI,
  ORACLE_ABI,
  KPI_TOKENS_MANAGER_ABI,
  ORACLES_MANAGER_ABI,
  MULTICALL_ABI,
  ERC20_ABI,
}
