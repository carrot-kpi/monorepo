import { ChainId } from '../../../commons/constants'

export interface Platform {
  supportsChain(chainId: ChainId): boolean
  readonly name: string
}
