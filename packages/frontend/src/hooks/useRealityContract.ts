import { ChainId } from '@carrot-kpi/core-sdk'
import { useContract, useActiveWeb3React } from '@carrot-kpi/react'
import { Contract } from '@ethersproject/contracts'
import { REALITY3_ABI, REALITY3_ADDRESS } from '../constants'

export function useRealityContract(withSignerIfPossible = false): Contract | null {
  const { chainId } = useActiveWeb3React()
  // FIXME: use mainnet as the default key
  return useContract(REALITY3_ADDRESS[(chainId || ChainId.GNOSIS) as ChainId], REALITY3_ABI, withSignerIfPossible)
}
