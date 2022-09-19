import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useKpiToken, KpiTokenPage } from '@carrot-kpi/react'

export function Campaign(): ReactElement {
  const { address: kpiTokenAddress } = useParams()
  const { loading, kpiToken } = useKpiToken(kpiTokenAddress)

  if (loading || !kpiToken) return <>Loading...</>
  return <KpiTokenPage kpiToken={kpiToken} />
}
