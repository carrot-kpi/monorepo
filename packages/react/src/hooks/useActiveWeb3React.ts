import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ChainId, WEB3_NETWORK_CONTEXT_NAME } from '@carrot-kpi/core-sdk'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & { chainId?: ChainId } {
  const context = useWeb3React<Web3Provider>()
  const contextNetwork = useWeb3React<Web3Provider>(WEB3_NETWORK_CONTEXT_NAME)
  return context.active ? context : contextNetwork
}
