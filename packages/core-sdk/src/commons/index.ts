import { Cacher } from '../cacher'
import MULTICALL_ABI from '../abis/multicall.json'
import ERC20_ABI from '../abis/erc20.json'

export const INFURA_PROJECT_ID = '0ebf4dd05d6740f482938b8a80860d13'
export const POCKET_ID = '61d8970ca065f5003a112e86'
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs/'

export const CACHER = new Cacher('carrot-core-sdk')

export enum SupportedChainId {
  GOERLI = 5,
}

export const MULTICALL_ADDRESS: Record<SupportedChainId, string> = {
  [SupportedChainId.GOERLI]: '0xcA11bde05977b3631167028862bE2a173976CA11',
}

export { ERC20_ABI, MULTICALL_ABI }
