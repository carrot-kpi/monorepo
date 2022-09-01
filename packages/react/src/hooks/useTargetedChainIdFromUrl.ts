import { ChainId } from '@carrot-kpi/core-sdk'
import { useParsedQueryString } from './useParsedQueryString'

export function useTargetedChainIdFromUrl (): ChainId | undefined {
  const { chainId: targetedChainId } = useParsedQueryString()
  if (typeof targetedChainId === 'string') {
    const parsedTargetedChainId = parseInt(targetedChainId)
    return Object.values(ChainId).includes(parsedTargetedChainId) ? parsedTargetedChainId : undefined
  }
  return undefined
}
