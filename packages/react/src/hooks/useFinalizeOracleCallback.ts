import { useCallback } from 'react'
import { useContract } from './useContract'

const ORACLE_FINALIZE_ABI = [
  {
    inputs: [],
    name: 'finalize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export function useFinalizeOracleCallback(oracleAddress?: string): () => Promise<void> {
  const oracleContract = useContract(oracleAddress, ORACLE_FINALIZE_ABI, true)

  return useCallback(async () => {
    if (!oracleAddress || oracleContract == null) return
    try {
      return oracleContract.finalize()
    } catch (error) {
      console.error('error finalizing carrot', error)
    }
  }, [oracleAddress, oracleContract])
}
