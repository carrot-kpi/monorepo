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
  SEPOLIA = 11155111,
}

export const IPFS_GATEWAY = 'https://ipfs.io/ipfs/'

export const CACHER = new Cacher('carrot-sdk')

export interface ChainAddresses {
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
  [ChainId.SEPOLIA]: {
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11',
    factory: '0xD3Fe5d463dD1fd943CCC2271F2ea980B898B5DA3',
    kpiTokensManager: '0xD6e88c910329fE3597498772eB94991a0630306d',
    oraclesManager: '0xe3dA4E4b76C4ed3e4227db20F20d1F25A4507f9b',
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
