import { Oracle as SdkOracle } from '@carrot-kpi/v1-sdk'

interface OracleProps {
  oracle: SdkOracle
  kpiTokenExpired: boolean
}

export const Oracle = ({ oracle, kpiTokenExpired }: OracleProps) => {
  return <>Oracle</>
}
