import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useKpiToken } from '@carrot-kpi/react'
// import { KpiToken } from '../../components/kpi-token'
import { Oracle } from '../../components/oracle'

export function Campaign(): ReactElement {
  const { address: kpiTokenAddress } = useParams()
  const { loading, kpiToken } = useKpiToken(kpiTokenAddress)

  if (loading || !kpiToken) return <>Loading...</>
  return (
    <>
      {/* <KpiToken kpiToken={kpiToken} /> */}
      <div style={{ height: 16 }} />
      <hr />
      <div style={{ height: 16 }} />
      <h2>Oracles</h2>
      {kpiToken.oracles.map((oracle: any) => {
        return <Oracle key={oracle.address} kpiTokenExpired={kpiToken.expired} oracle={oracle} />
      })}
    </>
  )
}
