import { KpiToken as SdkKpiToken } from '@carrot-kpi/v1-sdk'

interface KpiTokenProps {
  kpiToken: SdkKpiToken
}

export const KpiToken = ({ kpiToken }: KpiTokenProps) => {
  return (
    <>
      <h2>KPI token</h2>
    </>
  )
}
