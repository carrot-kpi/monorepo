import { Currency } from '@carrot-kpi/sdk'
import { useNetwork, chain as wagmiChain } from 'wagmi'

export function useNativeCurrency(): Currency {
  const { chain } = useNetwork()
  // fallback to ether if chain id is not defined
  if (!chain) return wagmiChain.mainnet.nativeCurrency!
  return chain.nativeCurrency!
}
